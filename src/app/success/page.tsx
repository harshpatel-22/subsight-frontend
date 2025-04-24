'use client'

import { Badge } from '@/components/ui/badge'
import {
	Card,
	CardHeader,
	CardDescription,
	CardTitle,
	CardContent,
} from '@/components/ui/card'
import { CheckCircle, } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { Progress } from '@/components/ui/progress'

const SuccessPage = () => {
	const router = useRouter()
	const [progress, setProgress] = useState(0)
	// const [showActions, setShowActions] = useState(false)

	useEffect(() => {
		const timer = setInterval(() => {
			setProgress((prev) => {
				if (prev >= 100) {
					clearInterval(timer)
					return 100
				}
				return prev + 20
			})
		}, 1000)

		// const actionTimer = setTimeout(() => {
		// 	setShowActions(true)
		// }, 1500)

		return () => {
			clearInterval(timer)
			// clearTimeout(actionTimer)
		}
	}, [])

	useEffect(() => {
		if (progress >= 100) {
			router.push('/dashboard')
		}
	}, [progress, router])

	return (
		<div className='flex justify-center items-center min-h-screen bg-gradient-to-br from-[#f8fafc] to-[#e0e7ff] p-4'>
			<Card className='w-full max-w-md border-[#0004E8]/20 shadow-lg hover:shadow-xl transition-shadow duration-300'>
				<CardHeader className='pb-4'>
					<div className='flex flex-col items-center text-center'>
						<div className='bg-green-100 p-4 rounded-full mb-4 animate-pulse'>
							<CheckCircle className='h-10 w-10 text-green-600' />
						</div>
						<CardTitle className='text-3xl font-bold text-gray-900'>
							Payment Successful!
						</CardTitle>
						<CardDescription className='mt-2 text-lg'>
							Thank you for upgrading to{' '}
							<span className='font-semibold text-[#0004E8]'>
								Premium Plan
							</span>
						</CardDescription>
					</div>
				</CardHeader>

				<CardContent className='pb-6 space-y-6'>
					<div className='space-y-4 p-4 bg-gray-50 rounded-lg'>
						<div className='flex justify-between'>
							<span className='text-muted-foreground'>Plan</span>
							<span className='font-medium'>Premium Plan</span>
						</div>
						<div className='flex justify-between'>
							<span className='text-muted-foreground'>
								Amount
							</span>
							<span className='font-medium'>₹499/month</span>
						</div>
						<div className='flex justify-between'>
							<span className='text-muted-foreground'>
								Status
							</span>
							<Badge className='bg-green-100 text-green-800 hover:bg-green-100'>
								Completed
							</Badge>
						</div>
					</div>

					<div className='space-y-2'>
						<div className='flex justify-between text-sm'>
							<span className='text-muted-foreground'>
								Redirecting to dashboard...
							</span>
							<span>{progress}%</span>
						</div>
						<Progress value={progress} className='h-2' />
					</div>
				</CardContent>

				{/* {showActions && (
					<CardFooter className='flex flex-col gap-3 animate-fade-in'>
						<Button
							className='w-full bg-[#0052CC] hover:bg-[#0052CC]/90 h-12 text-lg gap-2'
							onClick={() => router.push('/dashboard')}
						>
							Go to Dashboard <ArrowRight className='h-5 w-5' />
						</Button>
						<Button
							variant='outline'
							className='w-full h-12 text-lg gap-2 border-[#0004E8]/30'
						>
							Download Invoice <Download className='h-5 w-5' />
						</Button>
					</CardFooter>
				)} */}
			</Card>

			<div className='absolute bottom-6 left-0 right-0 text-center text-sm text-muted-foreground'>
				Need help?{' '}
				<a
					href='mailto:support@example.com'
					className='text-[#0052CC] hover:underline'
				>
					Contact support
				</a>
			</div>
		</div>
	)
}

export default SuccessPage
