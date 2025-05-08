import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { fetchUser } from '../thunks/authThunks'
import { AuthState, User } from '@/types/types'

const initialState: AuthState = {
	user: null,
	loading: false,
	isAuthenticated: false,
	error: null,
}

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		logout(state) {
			state.user = null
			state.isAuthenticated = false
			state.error = null
		},
		setLoading: (state, action: PayloadAction<boolean>) => {
			state.loading = action.payload
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchUser.pending, (state) => {
				state.loading = true
				state.error = null
			})
			.addCase(
				fetchUser.fulfilled,
				(state, action: PayloadAction<User>) => {
					state.user = action.payload
					state.isAuthenticated = true
					state.loading = false
					state.error = null
				}
			)
			.addCase(fetchUser.rejected, (state, action) => {
				state.user = null
				state.isAuthenticated = false
				state.loading = false
				state.error =
					(action.payload as string) ?? 'Authentication failed'
			})
	},
})

export const { logout, setLoading } = authSlice.actions
export default authSlice.reducer
