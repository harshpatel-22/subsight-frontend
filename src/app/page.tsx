'use client'
import GradientBackgroundBottom from '@/components/GradientBackgroundBottom'
import GradientBackgroundTop from '@/components/GradientBackgroundTop'
import Navbar from '@/components/Navbar'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function Home() {
	return (
		<div className='bg-white h-screen w-screen overflow-hidden'>
			<Navbar />

			<div className='relative isolate px-6 pt-14 lg:px-8 h-[calc(100vh-56px)] overflow-hidden'>
				<GradientBackgroundTop />
				<div className='mx-auto max-w-2xl h-full flex flex-col justify-center py-10 sm:py-16 lg:py-20'>
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
						<div className='mt-10 flex items-center justify-center gap-x-6'>
							<Button asChild>
								<Link
									href='/signup'
									className='rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500'
								>
									Get started
								</Link>
							</Button>
							<Button variant='outline' asChild>
								<Link
									href='/login'
									className='text-sm font-semibold text-gray-900'
								>
									Log in
								</Link>
							</Button>
						</div>
					</div>
				</div>
				<GradientBackgroundBottom/>
			</div>
		</div>
	)
}
