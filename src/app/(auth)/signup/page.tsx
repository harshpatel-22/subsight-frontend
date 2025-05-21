'use client'

import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '@/redux/store'
import { setLoading } from '@/redux/slices/authSlice'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Mail, Lock, User } from 'lucide-react'
import Navbar from '@/components/Navbar'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { axiosInstance } from '@/utils/axiosInstance'
import GradientBackgroundTop from '@/components/GradientBackgroundTop'
import GradientBackgroundBottom from '@/components/GradientBackgroundBottom'
import GoogleSignInButton from '@/components/GoogleSignInButton'
import { fetchUser } from '@/redux/thunks/authThunks'
import RedirectIfAuthenticated from '@/components/RedirectIfAuthenticated'

export default function SignupPage() {
	const [fullName, setFullName] = useState('')
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [confirmPassword, setConfirmPassword] = useState('')
	const dispatch = useDispatch<AppDispatch>()
	const { loading } = useSelector((state: RootState) => state.auth)
	const router = useRouter()

	const handleSignup = async (e: React.FormEvent) => {
		e.preventDefault()

		if (password !== confirmPassword) {
			toast.error('Password do not match')
			return
		}

		if (password.length < 6) {
			toast.error('Password should be greater than six character')
			return
		}

		dispatch(setLoading(true))

		try {
			await axiosInstance.post('/auth/signup', {
				fullName,
				email,
				password,
			})

			dispatch(fetchUser())
			toast.success('Signed up successfully')

			router.push('/dashboard')
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
		} catch (err: any) {
			toast.error(err.response?.data?.message || 'Signup failed')
		} finally {
			dispatch(setLoading(false))
		}
	}

	return (
		<RedirectIfAuthenticated>
			<div className='bg-white min-h-screen w-full flex flex-col'>
				<Navbar />
				<div className='relative isolate px-6 pt-14 lg:px-8 flex-grow'>
					<GradientBackgroundTop />
					<div className='mx-auto max-w-md flex flex-col justify-center text-center py-12 sm:py-16 lg:py-20'>
						<h1 className='text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl'>
							Sign up
						</h1>
						<p className='mt-4 text-lg leading-8 text-gray-600'>
							Create an account to track and manage all your
							subscriptions.
						</p>

						<form
							onSubmit={handleSignup}
							className='mt-8 space-y-6'
						>
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
										onChange={(e) =>
											setEmail(e.target.value)
										}
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

								<div className='relative'>
									<Lock
										className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500'
										size={18}
									/>
									<Input
										type='password'
										value={confirmPassword}
										onChange={(e) =>
											setConfirmPassword(e.target.value)
										}
										placeholder='Confirm Password'
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
									{loading ? 'Signing up...' : 'Sign up'}
								</Button>
							</div>
						</form>

						<GoogleSignInButton />

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
					<GradientBackgroundBottom />
				</div>
			</div>
		</RedirectIfAuthenticated>
	)
}
