import axios from 'axios'

const API_URL =
	process.env.NEXT_PUBLIC_MODE === 'development'
		? process.env.NEXT_PUBLIC_BACKEND_DEV_URL
		: process.env.NEXT_PUBLIC_BACKEND_PROD_URL

export const axiosInstance = axios.create({
	baseURL: API_URL,
	withCredentials: true,
	headers: {
		'Content-Type': 'application/json',
	},
})
