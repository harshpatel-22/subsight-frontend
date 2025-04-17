import axios from 'axios'

export const axiosInstance = axios.create({
	baseURL: 'http://localhost:4000/api', // change if your API URL is different
	withCredentials: true, // to allow sending/receiving cookies (e.g. JWT)
	headers: {
		'Content-Type': 'application/json',
	},
})
