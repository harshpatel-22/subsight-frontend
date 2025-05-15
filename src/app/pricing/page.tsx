'use client'

import { Button } from '@/components/ui/button'
import { Check } from 'lucide-react'
import { Card, CardContent, CardHeader, CardFooter } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import Navbar from '@/components/Navbar'
import Link from 'next/link'
import GradientBackgroundTop from '@/components/GradientBackgroundTop'
import GradientBackgroundBottom from '@/components/GradientBackgroundBottom'
import { monthlyFeatures, yearlyFeatures } from '@/utils/constants'

export default function PricingPage() {
	return (
		<div className='bg-white min-h-screen h-[calc(100vh-8rem)] overflow-x-hidden flex flex-col'>
			<Navbar />

			<div className='relative isolate px-4 pt-8 sm:px-6 lg:px-8 flex-grow'>
				<GradientBackgroundTop />

				<div className='mx-auto max-w-4xl flex flex-col justify-center py-10'>
					<div className='text-center mb-12'>
						<h1 className='text-3xl sm:text-4xl font-bold text-gray-900'>
							Our Pricing
						</h1>
						<p className='mt-2 text-gray-600'>
							All features included. Cancel anytime.
						</p>
					</div>

					<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
						<Card className='border border-gray-200 rounded-lg shadow hover:shadow-md transition-shadow duration-200 p-4'>
							<CardHeader className='px-4 py-3'>
								<h2 className='text-lg font-semibold text-gray-900'>
									Monthly Plan
								</h2>
								<div className='mt-1 flex items-baseline'>
									<span className='text-2xl font-bold text-gray-900'>
										₹499
									</span>
									<span className='ml-2 text-gray-500'>
										/month
									</span>
								</div>
								<div>
									<Badge
										variant='secondary'
										className='text-xs'
									>
										Unlock Premium for Just ₹499!
									</Badge>
								</div>
							</CardHeader>
							<CardContent className='px-4 min-h-55'>
								<ul className='space-y-2 text-sm'>
									{monthlyFeatures.map((feature, index) => (
										<li
											key={index}
											className='flex items-start'
										>
											<Check className='h-4 w-4 text-green-500 mt-0.5 mr-2 flex-shrink-0' />
											<span className='text-gray-700'>
												{feature}
											</span>
										</li>
									))}
								</ul>
							</CardContent>
							<CardFooter className='px-4 py-3'>
								<Button
									asChild
									className='cursor-pointer w-full text-sm'
								>
									<Link href='/signup'>Get Started</Link>
								</Button>
							</CardFooter>
						</Card>

						<Card className='border-2 border-[#0004E8]/30 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 relative p-4 bg-gradient-to-br from-white via-[#f3f4ff] to-white'>
							<div className='absolute -top-3 -right-3'>
								<Badge className='bg-[#0004E8] text-white px-3 py-1 rounded-full text-xs font-medium shadow-lg'>
									Popular
								</Badge>
							</div>
							<CardHeader className='px-4 py-3'>
								<h2 className='text-lg font-semibold text-gray-900'>
									Yearly Plan
								</h2>
								<div className='mt-1 flex items-baseline'>
									<span className='text-2xl font-bold text-gray-900'>
										₹4,999
									</span>
									<span className='ml-2 text-gray-500'>
										/year
									</span>
								</div>
								<div>
									<Badge
										variant='secondary'
										className='text-xs'
									>
										Save ₹989 (2 months free)
									</Badge>
								</div>
							</CardHeader>
							<CardContent className='px-4 min-h-55'>
								<ul className='space-y-2 text-sm'>
									{yearlyFeatures.map((feature, index) => (
										<li
											key={index}
											className='flex items-start'
										>
											<Check className='h-4 w-4 text-green-500 mt-0.5 mr-2 flex-shrink-0' />
											<span className='text-gray-700'>
												{feature}
											</span>
										</li>
									))}
								</ul>
							</CardContent>
							<CardFooter className='px-4 py-3'>
								<Button
									asChild
									className='cursor-pointer w-full text-sm bg-[#0004E8] hover:bg-[#0004E8]/90'
								>
									<Link href='/signup'>Get Started</Link>
								</Button>
							</CardFooter>
						</Card>
					</div>
				</div>
				<GradientBackgroundBottom />
			</div>
		</div>
	)
}
