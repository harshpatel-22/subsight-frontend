import { createAsyncThunk } from '@reduxjs/toolkit'
import { Subscription } from '@/types/types'
import { axiosInstance } from '@/utils/axiosInstance'
import { AxiosError } from 'axios'

export const fetchSubscriptions = createAsyncThunk(
	'subscriptions/fetchAll',
	async (_, { rejectWithValue }) => {
		try {
            const response = await axiosInstance.get('/subscriptions')
            if (process.env.NEXT_PUBLIC_MODE === 'development') {
				console.log('subs in the thunk: ', response.data.subscriptions)
			}
			return response.data.subscriptions as Subscription[]
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
