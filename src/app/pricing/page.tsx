'use client'

import { Button } from '@/components/ui/button'
import { Package, CheckCircle } from 'lucide-react'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import Navbar from '@/components/Navbar'
import Link from 'next/link'

export default function PricingPage() {
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
				<div className='mx-auto max-w-6xl flex flex-col justify-center text-center py-16 sm:py-20 lg:py-24'>
					<h1 className='text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl'>
						Our Pricing Plans
					</h1>
					<p className='mt-6 text-lg sm:text-xl leading-8 text-gray-600'>
						Choose the perfect plan to manage your subscriptions
						efficiently. Whether you&apos;re just starting or need
						more advanced features, we have a plan for you!
					</p>

					<div className='mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8'>
						{/* Basic Plan */}
						<Card className='shadow-lg border border-gray-200 rounded-lg'>
							<CardHeader className='flex flex-col items-center bg-gradient-to-r from-[#ff80b5] to-[#9089fc] text-white py-6 rounded-t-lg'>
								<Package className='h-12 w-12 mb-4' />
								<h3 className='text-2xl font-bold'>
									Basic Plan
								</h3>
								<Badge className='bg-indigo-500 mt-2'>
									Free
								</Badge>
							</CardHeader>
							<CardContent className='p-6 text-center text-gray-600'>
								<p>
									Perfect for those who are just getting
									started with tracking subscriptions.
								</p>
								<Separator className='my-4' />
								<ul className='space-y-4'>
									<li className='flex items-center justify-center'>
										<CheckCircle className='mr-2 text-green-500' />
										Track up to 5 subscriptions
									</li>
									<li className='flex items-center justify-center'>
										<CheckCircle className='mr-2 text-green-500' />
										Basic spending analytics
									</li>
									<li className='flex items-center justify-center'>
										<CheckCircle className='mr-2 text-green-500' />
										1-day email reminders
									</li>
								</ul>
							</CardContent>
							<div className='px-6 pb-6'>
								<Button asChild className='w-full'>
									<Link
										href='/signup'
										className='text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-500 py-2.5 px-6 rounded-md'
									>
										Get Started
									</Link>
								</Button>
							</div>
						</Card>

						{/* Standard Plan */}
						<Card className='shadow-lg border border-gray-200 rounded-lg'>
							<CardHeader className='flex flex-col items-center bg-gradient-to-r from-[#ff80b5] to-[#9089fc] text-white py-6 rounded-t-lg'>
								<Package className='h-12 w-12 mb-4' />
								<h3 className='text-2xl font-bold'>
									Standard Plan
								</h3>
								<Badge className='bg-indigo-500 mt-2'>
									₹499
								</Badge>
							</CardHeader>
							<CardContent className='p-6 text-center text-gray-600'>
								<p>
									For users who need enhanced features to
									track and manage more subscriptions.
								</p>
								<Separator className='my-4' />
								<ul className='space-y-4'>
									<li className='flex items-center justify-center'>
										<CheckCircle className='mr-2 text-green-500' />
										Track up to 20 subscriptions
									</li>
									<li className='flex items-center justify-center'>
										<CheckCircle className='mr-2 text-green-500' />
										Advanced spending analytics
									</li>
									<li className='flex items-center justify-center'>
										<CheckCircle className='mr-2 text-green-500' />
										1-3 day email reminders
									</li>
								</ul>
							</CardContent>
							<div className='px-6 pb-6'>
								<Button asChild className='w-full'>
									<Link
										href='/signup'
										className='text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-500 py-2.5 px-6 rounded-md'
									>
										Get Started
									</Link>
								</Button>
							</div>
						</Card>

						{/* Premium Plan */}
						<Card className='shadow-lg border border-gray-200 rounded-lg'>
							<CardHeader className='flex flex-col items-center bg-gradient-to-r from-[#ff80b5] to-[#9089fc] text-white py-6 rounded-t-lg'>
								<Package className='h-12 w-12 mb-4' />
								<h3 className='text-2xl font-bold'>
									Premium Plan
								</h3>
								<Badge className='bg-indigo-500 mt-2'>
									₹999
								</Badge>
							</CardHeader>
							<CardContent className='p-6 text-center text-gray-600'>
								<p>
									The ultimate plan for users who need
									complete control over their subscriptions.
								</p>
								<Separator className='my-4' />
								<ul className='space-y-4'>
									<li className='flex items-center justify-center'>
										<CheckCircle className='mr-2 text-green-500' />
										Track unlimited subscriptions
									</li>
									<li className='flex items-center justify-center'>
										<CheckCircle className='mr-2 text-green-500' />
										Advanced analytics with projections
									</li>
									<li className='flex items-center justify-center'>
										<CheckCircle className='mr-2 text-green-500' />
										Customizable email reminders
									</li>
									<li className='flex items-center justify-center'>
										<CheckCircle className='mr-2 text-green-500' />
										Priority customer support
									</li>
									<li className='flex items-center justify-center'>
										<CheckCircle className='mr-2 text-green-500' />
										Data export options (CSV, PDF)
									</li>
								</ul>
							</CardContent>
							<div className='px-6 pb-6'>
								<Button asChild className='w-full'>
									<Link
										href='/signup'
										className='text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-500 py-2.5 px-6 rounded-md'
									>
										Get Started
									</Link>
								</Button>
							</div>
						</Card>
					</div>
				</div>
			</div>
		</div>
	)
}
