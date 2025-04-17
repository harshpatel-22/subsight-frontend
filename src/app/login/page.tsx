/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '@/redux/store'
import { setLoading, setUser } from '@/redux/authSlice'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Lock, Mail } from 'lucide-react'
import Navbar from '@/components/Navbar'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { axiosInstance } from '@/utils/axiosInstance'
import Image from 'next/image'
import { firebaseAuth, googleProvider } from '@/config/firebase'
import { signInWithPopup } from 'firebase/auth'


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
			const response = await axiosInstance.post(
				'/auth/login',
				{
					email,
					password,
				},
				
			)

			const { user } = response.data

			dispatch(setUser(user))
			toast.success('Logged in successfully')

			router.push('/pricing')
		} catch (err: any) {
			toast.error(err.response?.data?.message || 'Login failed')
		} finally {
			dispatch(setLoading(false))
		}
	}

    const handleGoogleSignIn = async () => {
		dispatch(setLoading(true))

		try {
			const result = await signInWithPopup(firebaseAuth, googleProvider)
			const idToken = await result.user.getIdToken()

			// Send the token to the backend
			const response = await axiosInstance.post('/auth/google', {
				token: idToken,
			})

			const { user } = response.data
			dispatch(setUser(user))
			toast.success('Logged in with Google')

			router.push('/pricing') // Or '/about' for signup
		} catch (err: any) {
			console.error(err)
			toast.error(err.response?.data?.message || 'Google sign-in failed')
		} finally {
			dispatch(setLoading(false))
		}
	}

	return (
		<div className='bg-white min-h-screen w-full flex flex-col'>
			<Navbar />

			<div className='relative isolate px-6 pt-14 lg:px-8 flex-grow'>
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

							<div className='relative'>
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
					<div className='mt-6 flex items-center gap-3'>
						<div className='h-px flex-1 bg-gray-300' />
						<p className='text-sm text-gray-500'>or</p>
						<div className='h-px flex-1 bg-gray-300' />
					</div>

					<Button
						onClick={handleGoogleSignIn}
						variant='outline'
						className='mt-4 w-full flex items-center justify-center gap-2 py-2.5 text-sm'
					>
						<Image
							height={20}
							width={20}
							src='/google.svg'
							alt='Google'
						/>
						Continue with Google
					</Button>

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
						<p className='mt-2 text-sm text-gray-500'>
							<Link
								href='/forgot-password'
								className='font-light text-[#0004E8] hover:text-indigo-500'
							>
								Forgot your password?
							</Link>
						</p>
					</div>
				</div>
			</div>
		</div>
	)
}
