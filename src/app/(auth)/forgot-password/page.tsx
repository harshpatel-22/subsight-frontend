'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Mail } from 'lucide-react'
import Navbar from '@/components/Navbar'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { axiosInstance } from '@/utils/axiosInstance'
import { toast } from 'sonner'
import GradientBackgroundTop from '@/components/GradientBackgroundTop'
import GradientBackgroundBottom from '@/components/GradientBackgroundBottom'

export default function ForgotPasswordPage() {
	const [email, setEmail] = useState('')
	const [loading, setLoading] = useState(false)
	const router = useRouter()

	const handleForgotPassword = async (e: React.FormEvent) => {
		e.preventDefault()
		setLoading(true)

		try {
			const response = await axiosInstance.post('/auth/forgot-password', {
				email,
			})
			toast.success(
				response.data.message ||
					'Password reset link sent to your email.'
			)
            router.replace('/login')
            setEmail('');
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		} catch (error:any) {
			toast.error(
				error.response?.data?.message ||
					'Failed to send reset link. Please try again.'
			)
		} finally {
			setLoading(false)
		}
	}

	return (
		<div className='bg-white min-h-screen w-full flex flex-col'>
			<Navbar />

			<div className='relative isolate px-6 pt-14 lg:px-8 flex-grow'>
				<GradientBackgroundTop />
				<div className='mx-auto max-w-md flex flex-col justify-center text-center py-12 sm:py-16 lg:py-24'>
					<h1 className='text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl'>
						Forgot Password?
					</h1>
					<p className='mt-4 text-lg leading-8 text-gray-600'>
						Enter your email address to receive a password reset
						link.
					</p>

					<form
						onSubmit={handleForgotPassword}
						className='mt-8 space-y-6'
					>
						<div className='space-y-4'>
							<div className='relative'>
								<Mail
									className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500'
									size={18}
								/>
								<Input
									type='email'
									id='email'
									value={email}
									onChange={(e) => setEmail(e.target.value)}
									placeholder='Email'
									className='pl-10'
									required
								/>
							</div>
						</div>

						<div className='flex flex-col items-center mt-6'>
							<Button
								type='submit'
								className='w-full text-white bg-[#0004E8] hover:bg-indigo-500 py-2.5 px-6 rounded-md'
								disabled={loading}
							>
								{loading
									? 'Sending Link...'
									: 'Send Reset Link'}
							</Button>
						</div>
					</form>

					<div className='mt-6 text-center'>
						<p className='text-sm text-gray-500'>
							Remember your password?{' '}
							<Link
								href='/login'
								className='font-light text-[#0004E8] hover:text-indigo-500'
							>
								Log in
							</Link>
						</p>
					</div>
				</div>
				<GradientBackgroundBottom />
			</div>
		</div>
	)
}
