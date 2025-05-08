'use client'

import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'
import Navbar from '@/components/Navbar'
import GradientBackgroundTop from '@/components/GradientBackgroundTop'
import GradientBackgroundBottom from '@/components/GradientBackgroundBottom'
import Image from 'next/image'
import analysisPhoto from '../../../public/analysis.jpeg'
import exportImage from '../../../public/export.jpg'

export default function FeaturesPage() {
	const features = [
		{
			title: 'Export Your Data',
			description:
				'Download your full subscription history in CSV format—perfect for backups or custom reporting.',
			image: exportImage,
		},
		{
			title: 'Visual Spending Insights',
			description:
				'Track your monthly, yearly, and category-wise spending with beautiful, interactive charts.',
			image: analysisPhoto,
		},
	]

	return (
		<div className='bg-white h-screen w-full overflow-hidden flex flex-col'>
			<Navbar />

			{/* Add padding-top to avoid overlap with Navbar */}
			<div className='relative isolate px-4 pt-24 sm:px-6 lg:px-8 flex-grow overflow-hidden'>
				<GradientBackgroundTop />

				<div className='mx-auto max-w-6xl flex flex-col justify-center'>
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
									<Button
										variant='ghost'
										className='text-[#0004E8] hover:bg-[#0004E8]/10 px-0 mt-auto'
									>
										Learn more{' '}
										<ArrowRight className='ml-2 h-4 w-4' />
									</Button>
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
