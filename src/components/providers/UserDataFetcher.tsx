'use client'

import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/redux/store'
import { axiosInstance } from '@/utils/axiosInstance'
import { setUser } from '@/redux/authSlice'

export default function UserDataFetcher() {
	const dispatch = useDispatch()
	const auth = useSelector((state: RootState) => state.auth)

	useEffect(() => {
		const fetchUserData = async () => {
			try {
				if (!auth.user) {
					const response = await axiosInstance.get('/user/profile')

					if (response.data) {
						dispatch(setUser(response.data.user))
					}
				}
			} catch (error) {
				console.error('Failed to fetch user data:', error)
			}
		}

		fetchUserData()
	}, [dispatch, auth])

	return null
}
