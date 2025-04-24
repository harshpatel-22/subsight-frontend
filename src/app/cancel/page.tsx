'use client'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'
import { XCircle } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const CancelPage = () => {
	return (
		<div className='flex justify-center items-center min-h-screen bg-gradient-to-br from-[#f8fafc] to-[#e0e7ff] p-4'>
			<Card className='w-full max-w-md border-[#0004E8]/20'>
				<CardHeader className='pb-4'>
					<div className='flex flex-col items-center text-center'>
						<div className='bg-red-100 p-3 rounded-full mb-4'>
							<XCircle className='h-8 w-8 text-red-600' />
						</div>
						<CardTitle className='text-2xl font-semibold'>
							Payment Cancelled
						</CardTitle>
						<CardDescription className='mt-2'>
							Your upgrade to Premium Plan was not completed
						</CardDescription>
					</div>
				</CardHeader>
				<CardContent className='pb-6'>
					<div className='space-y-4'>
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
							<Badge variant='destructive'>Cancelled</Badge>
						</div>
					</div>
				</CardContent>
				<CardFooter>
					<Link href='/upgrade' className='w-full'>
						<Button className='w-full bg-[#0052CC] hover:bg-[#0052CC]/90 h-12'>
							Try Again
						</Button>
					</Link>
				</CardFooter>
			</Card>
		</div>
	)
}

export default CancelPage
