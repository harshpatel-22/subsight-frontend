/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '@/redux/store'
import { setLoading } from '@/redux/slices/authSlice'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Lock, Mail } from 'lucide-react'
import Navbar from '@/components/Navbar'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { axiosInstance } from '@/utils/axiosInstance'
import GradientBackgroundTop from '@/components/GradientBackgroundTop'
import GradientBackgroundBottom from '@/components/GradientBackgroundBottom'
import GoogleSignInButton from '@/components/GoogleSignInButton'
import { fetchUser } from '@/redux/thunks/authThunks'

export default function LoginPage() {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const dispatch = useDispatch<AppDispatch>()
	const { loading } = useSelector((state: RootState) => state.auth)
	const router = useRouter()

	const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault()
        
		dispatch(setLoading(true))

		try {
			const response = await axiosInstance.post('/auth/login', {
				email,
				password,
			})

            console.log('response data after login',response.data)
			await dispatch(fetchUser())
			toast.success('Logged in successfully')

			router.push('/dashboard')
		} catch (err: any) {
			toast.error(err.response?.data?.message || 'Server Error')
		} finally {
			dispatch(setLoading(false))
		}
	}

	return (
		<div className='bg-white min-h-screen w-full flex flex-col'>
			<Navbar />

			<div className='relative isolate px-6 pt-14 lg:px-8 flex-grow'>
				<GradientBackgroundTop />
				<div className='mx-auto max-w-md flex flex-col justify-center text-center py-12 sm:py-16 lg:py-24'>
					<h1 className='text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl'>
						Log in
					</h1>
					<p className='mt-4 text-lg leading-8 text-gray-600'>
						Enter your email and password to access your account and
						manage subscriptions.
					</p>

					<form onSubmit={handleLogin} className='mt-8 space-y-6'>
						<div className='space-y-4'>
							<div className='relative'>
								<Mail
									className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500'
									size={18}
								/>
								<Input
									type='email'
									value={email}
									onChange={(e) => setEmail(e.target.value)}
									placeholder='Email'
									className='pl-10'
									required
								/>
							</div>

							<div className='relative mb-0'>
								<Lock
									className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500'
									size={18}
								/>
								<Input
									type='password'
									value={password}
									onChange={(e) =>
										setPassword(e.target.value)
									}
									placeholder='Password'
									className='pl-10'
									required
								/>
							</div>
							<div className='text-right'>
								<Link
									href='/forgot-password'
									className='text-sm font-light text-[#0004E8] hover:text-indigo-500'
								>
									Forgot password?
								</Link>
							</div>
						</div>

						<div className='flex flex-col items-center mt-6'>
							<Button
								type='submit'
								className='w-full text-white bg-[#0004E8] hover:bg-indigo-500 py-2.5 px-6 rounded-md'
								disabled={loading}
							>
								{loading ? 'Logging in...' : 'Log In'}
							</Button>
						</div>
					</form>

					<GoogleSignInButton />

					<div className='mt-6 text-center'>
						<p className='text-sm text-gray-500'>
							Don&apos;t have an account?{' '}
							<Link
								href='/signup'
								className='font-light text-[#0004E8] hover:text-indigo-500'
							>
								Sign up
							</Link>
						</p>
					</div>
				</div>
				<GradientBackgroundBottom />
			</div>
		</div>
	)
}
