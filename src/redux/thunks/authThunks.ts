import { createAsyncThunk } from '@reduxjs/toolkit'
import { axiosInstance } from '@/utils/axiosInstance'
import { User } from '@/types/types'
import { AxiosError } from 'axios'

export const fetchUser = createAsyncThunk<User>(
	'auth/fetchUser',
	async (_, { rejectWithValue }) => {
		try {
			const response = await axiosInstance.get('/user/me')
			if (process.env.NEXT_PUBLIC_MODE === 'development') {
				console.log('user in thunk', response.data.user)
			}
			return response.data.user as User
		} catch (error: unknown) {
			if (error instanceof AxiosError) {
				return rejectWithValue(
					error.response?.data || 'Failed to fetch'
				)
			} else if (error instanceof Error) {
				return rejectWithValue(error.message)
			} else {
				return rejectWithValue('An unknown error occurred')
			}
		}
	}
)
