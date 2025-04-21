import { AuthState, User } from '@/types/types'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const initialState: AuthState = {
	user: null,
	loading: false,
	isAuthenticated: false,
}

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		setLoading(state, action: PayloadAction<boolean>) {
			state.loading = action.payload
		},
		setUser(
			state,
			action: PayloadAction<User>
		) {
			state.user = action.payload
			state.isAuthenticated = true
			state.loading = false
		},
		logout(state) {
			state.user = null
            state.isAuthenticated = false
		},
	},
})

export const { setLoading, setUser, logout } = authSlice.actions
export default authSlice.reducer
