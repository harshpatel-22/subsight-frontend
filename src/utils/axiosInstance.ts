import axios from 'axios'

const API_URL =
	process.env.NEXT_PUBLIC_MODE === 'development'
		? 'http://localhost:4000/api'
		: 'https://subsight-backend.onrender.com/api'

export const axiosInstance = axios.create({
	baseURL: API_URL,
	withCredentials: true,
	headers: {
		'Content-Type': 'application/json',
	},
})
