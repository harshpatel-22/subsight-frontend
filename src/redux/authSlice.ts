// src/redux/authSlice.ts

import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface AuthState {
	user: { email: string | null; fullName: string | null } | null
	loading: boolean
	isAuthenticated: boolean
	error: string | null
}

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
		setLoading(state, action: PayloadAction<boolean>) {
			state.loading = action.payload
		},
		setUser(
			state,
			action: PayloadAction<{ email: string; fullName: string }>
		) {
			state.user = action.payload
			state.isAuthenticated = true
			state.loading = false
		},
		setError(state, action: PayloadAction<string | null>) {
			state.error = action.payload
			state.loading = false
		},
		logout(state) {
			state.user = null
			state.isAuthenticated = false
		},
	},
})

export const { setLoading, setUser, setError, logout } = authSlice.actions
export default authSlice.reducer
