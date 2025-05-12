/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Lock } from 'lucide-react'
import { toast } from 'sonner'
import { axiosInstance } from '@/utils/axiosInstance'

export default function ResetPasswordForm() {
	const [newPassword, setNewPassword] = useState('')
	const [confirmNewPassword, setConfirmNewPassword] = useState('')
	const [token, setToken] = useState<string | null>(null)
	const [email, setEmail] = useState<string | null>(null)
	const [loading, setLoading] = useState(false)
	const router = useRouter()
	const searchParams = useSearchParams()

	useEffect(() => {
		const tokenFromQuery = searchParams.get('token')
		const emailFromQuery = searchParams.get('email')

		if (tokenFromQuery && emailFromQuery) {
			setToken(tokenFromQuery)
			setEmail(emailFromQuery)
		} else {
			toast.error('Invalid reset password link.')
			router.replace('/login')
		}
	}, [searchParams, router])

	const handleResetPassword = async (e: React.FormEvent) => {
		e.preventDefault()

		if (!token || !email) {
			toast.error('Invalid reset password link.')
			return
		}

		if (newPassword !== confirmNewPassword) {
			toast.error('Passwords do not match.')
			return
		}

		if (newPassword.length < 6) {
			toast.error('Password should be at least 6 characters long.')
			return
		}

		setLoading(true)

		try {
			const response = await axiosInstance.post('/auth/reset-password', {
				token,
				email,
				newPassword,
			})
			toast.success(
				response.data.message ||
					'Password reset successfully. Redirecting to login...'
			)
			router.replace('/login')
		} catch (error: any) {
			toast.error(
				error.response?.data?.message ||
					'Failed to reset password. Please try again.'
			)
		} finally {
			setLoading(false)
		}
	}

	if (!token || !email) {
		return (
			<div className='flex justify-center items-center min-h-screen'>
				Loading...
			</div>
		)
	}

	return (
		<div className='mx-auto max-w-md flex flex-col justify-center text-center py-12 sm:py-16 lg:py-24'>
			<h1 className='text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl'>
				Reset Password
			</h1>
			<p className='mt-4 text-lg leading-8 text-gray-600'>
				Enter your new password below.
			</p>

			<form onSubmit={handleResetPassword} className='mt-8 space-y-6'>
				<div className='space-y-4'>
					<div className='relative'>
						<Lock
							className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500'
							size={18}
						/>
						<Input
							type='password'
							id='newPassword'
							value={newPassword}
							onChange={(e) => setNewPassword(e.target.value)}
							placeholder='New Password'
							className='pl-10'
							required
						/>
					</div>

					<div className='relative'>
						<Lock
							className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500'
							size={18}
						/>
						<Input
							type='password'
							id='confirmNewPassword'
							value={confirmNewPassword}
							onChange={(e) =>
								setConfirmNewPassword(e.target.value)
							}
							placeholder='Confirm New Password'
							className='pl-10'
							required
						/>
					</div>
				</div>

				<div className='flex flex-col items-center mt-6'>
					<Button
						type='submit'
						className='cursor-pointer w-full text-white bg-[#0004E8] hover:bg-indigo-500 py-2.5 px-6 rounded-md'
						disabled={loading}
					>
						{loading ? 'Resetting Password...' : 'Reset Password'}
					</Button>
				</div>
			</form>
		</div>
	)
}
