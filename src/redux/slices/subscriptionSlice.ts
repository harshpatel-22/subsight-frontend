import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Subscription, SubscriptionState } from '@/types/types'
import { fetchSubscriptions } from '../thunks/subscriptionThunks'

const initialState: SubscriptionState = {
	subscriptions: [],
	loading: false,
	error: null,
}

const subscriptionSlice = createSlice({
	name: 'subscriptions',
	initialState,
	reducers: {
		addSubscription: (state, action: PayloadAction<Subscription>) => {
			state.subscriptions.push(action.payload)
		},
		setSubscriptions: (state, action: PayloadAction<Subscription[]>) => {
			state.subscriptions = action.payload
		},
		setLoading: (state, action: PayloadAction<boolean>) => {
			state.loading = action.payload
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchSubscriptions.pending, (state) => {
				state.loading = true
				state.error = null
			})
			.addCase(fetchSubscriptions.fulfilled, (state, action) => {
				state.subscriptions = action.payload
				state.loading = false
			})
			.addCase(fetchSubscriptions.rejected, (state, action) => {
				state.error = action.payload as string
				state.loading = false
			})
	},
})

export const { addSubscription, setSubscriptions, setLoading } =
	subscriptionSlice.actions
export default subscriptionSlice.reducer
