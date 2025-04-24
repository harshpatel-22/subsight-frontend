import { AuthState, User } from '@/types/types'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { fetchUser } from '../thunks/authThunks' 

const initialState: AuthState = {
	user: null,
	loading: false,
	isAuthenticated: false,
}

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		logout(state) {
			state.user = null
			state.isAuthenticated = false
		},
		setLoading: (state, action: PayloadAction<boolean>) => {
			state.loading = action.payload
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchUser.pending, (state) => {
				state.loading = true
			})
			.addCase(
				fetchUser.fulfilled,
				(state, action: PayloadAction<User>) => {
					state.user = action.payload
					state.isAuthenticated = true
					state.loading = false
				}
			)
			.addCase(fetchUser.rejected, (state) => {
				state.user = null
				state.isAuthenticated = false
				state.loading = false
			})
	},
})

export const { logout , setLoading } = authSlice.actions
export default authSlice.reducer
