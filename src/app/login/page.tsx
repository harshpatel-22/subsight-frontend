'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Lock, Mail } from 'lucide-react'
import Navbar from '@/components/Navbar'
import Link from 'next/link'

export default function LoginPage() {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault()
		// Handle login logic (e.g., Firebase auth)
		console.log('Logging in with:', email, password)
	}

	return (
		<div className='bg-white min-h-screen w-full flex flex-col'>
			<Navbar />

			<div className='relative isolate px-6 pt-14 lg:px-8 flex-grow'>
				{/* Top Background Blur */}
				<div
					aria-hidden='true'
					className='absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80'
				>
					<div
						style={{
							clipPath:
								'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
						}}
						className='relative left-1/2 aspect-[1155/678] w-[36rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:w-[72rem]'
					/>
				</div>

				{/* Login Form */}
				<div className='mx-auto max-w-md flex flex-col justify-center text-center py-12 sm:py-16 lg:py-24'>
					<h1 className='text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl'>
						Log in
					</h1>
					<p className='mt-4 text-lg leading-8 text-gray-600'>
						Enter your email and password to access your account and
						manage subscriptions.
					</p>

					<form onSubmit={handleSubmit} className='mt-8 space-y-6'>
						<div className='space-y-4'>
							{/* Email Input */}
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

						{/* Submit Button */}
						<div className='flex flex-col items-center mt-6'>
							<Button
								type='submit'
								className='w-full text-white bg-[#0004E8] hover:bg-indigo-500 py-2.5 px-6 rounded-md'
							>
								Log in
							</Button>
						</div>
					</form>

					{/* Links */}
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
