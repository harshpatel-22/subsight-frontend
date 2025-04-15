'use client'

import { Button } from '@/components/ui/button'
import Link from 'next/link'
import Navbar from '@/components/Navbar'

export default function Home() {
	return (
		<div className='bg-white h-screen w-screen overflow-hidden'>
			<Navbar />

			<div className='relative isolate px-6 pt-14 lg:px-8 h-full'>
				<div
					aria-hidden='true'
					className='absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80'
				>
					<div
						style={{
							clipPath:
								'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
						}}
						className='relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]'
					/>
				</div>

				<div className='mx-auto max-w-2xl py-32 sm:py-48 lg:pt-20 flex flex-col items-center justify-center h-full'>
					<div className='hidden sm:mb-8 sm:flex sm:justify-center'>
						<Button
							variant='outline'
							className='rounded-full px-3 py-1 text-sm text-gray-600 hover:bg-gray-50'
							asChild
						>
							<span>No. 1 Subscription Tracking App</span>
						</Button>
					</div>

					<div className='text-center'>
						<h1 className='text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl'>
							Stay ahead of your subscription renewals
						</h1>
						<p className='mt-6 text-lg leading-8 text-gray-600'>
							Tired of surprise charges from forgotten renewals?
							Subscription Tracker App helps you manage all your
							online subscriptions in one place. Get timely
							reminders, track your spending, and take control of
							your digital life.
						</p>
						<div className='mt-10'>
							<Button asChild className='mx-auto'>
								<Link
									href='/signup'
									className='rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500'
								>
									Get started
								</Link>
							</Button>
						</div>
					</div>
				</div>

				<div
					aria-hidden='true'
					className='absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]'
				>
					<div
						style={{
							clipPath:
								'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
						}}
						className='relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]'
					/>
				</div>
			</div>
		</div>
	)
}
