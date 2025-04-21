'use client'

import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '@/redux/store'
import { setLoading, setUser } from '@/redux/authSlice'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Mail, Lock, User } from 'lucide-react'
import Navbar from '@/components/Navbar'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { axiosInstance } from '@/utils/axiosInstance'
import Image from 'next/image'
import { firebaseAuth, googleProvider } from '@/config/firebase'
import { signInWithPopup } from 'firebase/auth'
import GradientBackgroundTop from '@/components/GradientBackgroundTop'
import GradientBackgroundBottom from '@/components/GradientBackgroundBottom'

export default function SignupPage() {
	const [fullName, setFullName] = useState('')
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const dispatch = useDispatch<AppDispatch>()
	const { loading } = useSelector((state: RootState) => state.auth)
	const router = useRouter()

	const handleSignup = async (e: React.FormEvent) => {
		e.preventDefault()
		dispatch(setLoading(true))

		try {
			const response = await axiosInstance.post('/auth/signup', {
				fullName,
				email,
				password,
			})

			const { user } = response.data

			dispatch(setUser(user))
			toast.success('Signed up successfully')

			router.push('/dashboard')
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
		} catch (err: any) {
			toast.error(err.response?.data?.message || 'Signup failed')
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

			router.push('/dashboard')
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
		} catch (err: any) {
			console.error(err)
			toast.error(err.response?.data?.message || 'Google sign-in failed')
		} finally {
			dispatch(setLoading(false))
		}
	}

	return (
		<div className='bg-white min-h-screen min-w-full flex flex-col'>
			<Navbar />
			<div className='relative isolate px-6 pt-14 lg:px-8 flex-grow'>
				<GradientBackgroundTop />
				<div className='mx-auto max-w-md flex flex-col justify-center text-center py-12 sm:py-16 lg:py-24'>
					<h1 className='text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl'>
						Sign up
					</h1>
					<p className='mt-4 text-lg leading-8 text-gray-600'>
						Create an account to track and manage all your
						subscriptions.
					</p>

					<form onSubmit={handleSignup} className='mt-8 space-y-6'>
						<div className='space-y-4'>
							<div className='relative'>
								<User
									className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500'
									size={18}
								/>
								<Input
									type='text'
									value={fullName}
									onChange={(e) =>
										setFullName(e.target.value)
									}
									placeholder='Full Name'
									className='pl-10'
									required
								/>
							</div>

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
								{loading ? 'Signing up...' : 'Sign up'}
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
							Already have an account?{' '}
							<Link
								href='/login'
								className='font-light text-[#0004E8] hover:text-indigo-500'
							>
								Log in
							</Link>
						</p>
					</div>
                </div>
                <GradientBackgroundBottom/>
			</div>
		</div>
	)
}
