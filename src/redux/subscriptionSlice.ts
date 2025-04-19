import { Subscription, SubscriptionState } from '@/types/types'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

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
})

export const { addSubscription, setSubscriptions, setLoading } =
	subscriptionSlice.actions

export default subscriptionSlice.reducer
