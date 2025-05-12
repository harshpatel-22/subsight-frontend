'use client'

import { useEffect, useState, ReactNode } from 'react'
import { useRouter } from 'next/navigation'
import Loader from '@/components/Loader'
import { axiosInstance } from '../utils/axiosInstance'

interface ProtectedRouteProps {
	children: ReactNode
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
	const router = useRouter()
	const [isLoading, setIsLoading] = useState(false)
	const [isAuthenticated, setIsAuthenticated] = useState(false)

	useEffect(() => {
		const checkAuth = async () => {
            try {
                setIsLoading(true)
				await axiosInstance.get('/user/me')
				setIsAuthenticated(true)
            } catch (error) {
                console.log(error)
				router.replace('/login')
			} finally {
				setIsLoading(false)
			}
		}

		checkAuth()
	}, [])

	if (isLoading) {
		return (
			<div className='flex min-h-screen items-center justify-center'>
				<Loader />
			</div>
		)
	}

	return isAuthenticated ? <>{children}</> : null
}
