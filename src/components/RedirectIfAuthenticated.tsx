'use client'

import { useEffect, useState, ReactNode } from 'react'
import { useRouter } from 'next/navigation'
import Loader from '@/components/Loader'
import { axiosInstance } from '@/utils/axiosInstance'

interface Props {
	children: ReactNode
}

export default function RedirectIfAuthenticated({ children }: Props) {
	const router = useRouter()
	const [checkingAuth, setCheckingAuth] = useState(true)

	useEffect(() => {
		const checkAuth = async () => {
			try {
				await axiosInstance.get('/user/me')
				router.push('/dashboard')
			} catch {
				// user is not authenticated, stay on the page
			} finally {
				setCheckingAuth(false)
			}
		}

		checkAuth()
	}, [])

	if (checkingAuth) {
		return (
			<div className='flex min-h-screen items-center justify-center'>
				<Loader />
			</div>
		)
	}

	return <>{children}</>
}
