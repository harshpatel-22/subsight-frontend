'use client'

import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'
import Navbar from '@/components/Navbar'
import GradientBackgroundTop from '@/components/GradientBackgroundTop'
import GradientBackgroundBottom from '@/components/GradientBackgroundBottom'
import Image from 'next/image'
import analysisPhoto from '@/images/analysis.jpeg'
import exportImage from '@/images/export.jpg'
import Link from 'next/link'

export default function FeaturesPage() {
	const features = [
		{
			title: 'Export Your Data',
			description:
				'Download your full subscription history in CSV format—perfect for backups or custom reporting.',
			image: exportImage,
			link: 'https://en.wikipedia.org/wiki/Comma-separated_values',
		},
		{
			title: 'Visual Spending Insights',
			description:
				'Track your monthly, yearly, and category-wise spending with beautiful, interactive charts.',
			image: analysisPhoto,
			link: 'https://en.wikipedia.org/wiki/Data_visualization',
		},
	]

	return (
		<div className='bg-white h-[calc(100vh-8rem)] flex flex-col overflow-hidden lg:overflow-y-hidden min-h-screen'>
			<Navbar />
			<div className='relative isolate px-4 pt-24 sm:px-6 lg:px-8 flex-grow overflow-y-auto lg:overflow-hidden'>
				<GradientBackgroundTop />

				<div className='mx-auto max-w-6xl flex flex-col justify-center pb-12'>
					<div className='text-center mb-12'>
						<h1 className='text-3xl sm:text-4xl font-bold text-gray-900'>
							Powerful Subscription Management Features
						</h1>
						<p className='mt-2 text-gray-600 max-w-2xl mx-auto'>
							All the tools you need to track, analyze, and
							optimize your subscriptions.
						</p>
					</div>

					<div className='grid grid-cols-1 md:grid-cols-2 gap-8 mb-16'>
						{features.map((feature, index) => (
							<div
								key={index}
								className='border border-gray-200 rounded-2xl shadow hover:shadow-md transition-all duration-200 overflow-hidden bg-white flex flex-col'
							>
								<div className='relative w-full aspect-[16/9]'>
									<Image
										src={feature.image}
										alt={feature.title}
										fill
										className='object-cover hover:scale-105 transition-transform duration-500 rounded-t-2xl'
									/>
								</div>
								<div className='p-6 flex flex-col flex-grow'>
									<h2 className='text-xl font-semibold text-gray-900 mb-2'>
										{feature.title}
									</h2>
									<p className='text-gray-600 mb-4'>
										{feature.description}
									</p>
									<Link
										href={feature.link}
										target='_blank'
										rel='noopener noreferrer'
										className='text-[#0004E8] hover:underline inline-flex items-center font-medium'
									>
										<Button
											variant='ghost'
											className='cursor-pointer text-[#0004E8] hover:bg-[#0004E8]/10 px-0 mt-auto'
										>
											Learn more{' '}
											<ArrowRight className='ml-2 h-4 w-4' />
										</Button>
									</Link>
								</div>
							</div>
						))}
					</div>
				</div>

				<GradientBackgroundBottom />
			</div>
		</div>
	)
}
