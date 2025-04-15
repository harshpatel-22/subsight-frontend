'use client'

import Navbar from '@/components/Navbar'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function AboutPage() {
	return (
		<div className='bg-white min-h-screen w-full overflow-x-hidden flex flex-col'>
			<Navbar />

			<div className='relative isolate px-4 pt-14 sm:px-6 lg:px-8 flex-grow'>
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

				{/* Main Content */}
				<div className='mx-auto max-w-3xl flex flex-col justify-center text-center py-16 sm:py-20 lg:py-24'>
					<h1 className='text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl'>
						About Subscription Tracker
					</h1>

					<p className='mt-6 text-base sm:text-lg leading-7 sm:leading-8 text-gray-600'>
						Many of us subscribe to services like Netflix, Spotify,
						and Prime — and forget when they renew. That leads to
						unwanted charges and wasted money.
					</p>

					<p className='mt-4 text-base sm:text-lg leading-7 sm:leading-8 text-gray-600'>
						The Subscription Tracker App helps you manage all your
						subscriptions in one place. Track your monthly and
						yearly spending, get email reminders before renewals,
						and gain full control over your digital expenses.
					</p>

					<p className='mt-4 text-base sm:text-lg leading-7 sm:leading-8 text-gray-600'>
						Whether you&apos;re tracking one service or twenty, we
						make it easy to stay on top of your digital life —
						clean, smart, and stress-free.
					</p>

					<div className='mt-10 flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-x-6'>
						<Button asChild>
							<Link
								href='/signup'
								className='rounded-md bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500'
							>
								Get Started
							</Link>
						</Button>
						<Button variant='outline' asChild>
							<Link
								href='/'
								className='text-sm font-semibold text-gray-900'
							>
								Back to Home
							</Link>
						</Button>
					</div>
				</div>

				{/* Bottom Background Blur */}
				<div
					aria-hidden='true'
					className='absolute inset-x-0 bottom-0 -z-10 transform-gpu overflow-hidden blur-3xl'
				>
					<div
						style={{
							clipPath:
								'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
						}}
						className='relative left-1/2 aspect-[1155/678] w-[36rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:w-[72rem]'
					/>
				</div>
			</div>
		</div>
	)
}
