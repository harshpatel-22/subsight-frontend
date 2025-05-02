'use client'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
	Card,
	CardHeader,
	CardTitle,
	CardDescription,
	CardContent,
	CardFooter,
} from '@/components/ui/card'
import { axiosInstance } from '@/utils/axiosInstance'
import { Check } from 'lucide-react'
import React, { useState } from 'react'
import { loadStripe } from '@stripe/stripe-js'

const UpgradePage = () => {
    const [planType, setPlanType] = useState<'monthly' | 'yearly'>('monthly')
    
	const handleCheckout = async () => {
		try {
			const { data } = await axiosInstance.post(
				'/create-checkout-session',
				{
					planType,
				}
			)

			const stripe = await loadStripe(
				process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
			)
			await stripe?.redirectToCheckout({ sessionId: data.sessionId })
		} catch (error) {
			console.error('Stripe checkout error:', error)
		}
	}

	return (
		<div className='flex justify-center'>
			<Card className='w-full max-w-md border-[#0004E8]/20 hover:border-[#0004E8]/40 transition-colors duration-200'>
				<CardHeader className='pb-4'>
					<div className='flex justify-between items-start'>
						<div>
							<CardTitle className='text-2xl font-semibold'>
								Premium Plan
							</CardTitle>
							<CardDescription className='mt-1'>
								For professionals who need advanced features
							</CardDescription>
						</div>
						{ planType === 'yearly' && <Badge
							variant='outline'
							className='bg-[#0004E8]/10 text-[#0004E8] border-[#0004E8]/20'
						>
							Popular
						</Badge>}
					</div>
				</CardHeader>

				<CardContent className='pb-6'>
					<div className='flex justify-center mb-4'>
						<Button
							variant={
								planType === 'monthly' ? 'default' : 'outline'
							}
							className='mr-2'
							onClick={() => setPlanType('monthly')}
						>
							Monthly
						</Button>
						<Button
							variant={
								planType === 'yearly' ? 'default' : 'outline'
							}
							onClick={() => setPlanType('yearly')}
						>
							Yearly
						</Button>
					</div>

					<div className='flex items-end justify-center'>
						<span className='text-4xl font-bold'>
							{planType === 'monthly' ? '₹499' : '₹4999'}
						</span>
						<span className='text-lg text-muted-foreground ml-1'>
							/{planType === 'monthly' ? 'month' : 'year'}
						</span>
					</div>

					<ul className='mt-6 space-y-3'>
						<li className='flex items-center'>
							<Check className='h-5 w-5 text-[#0004E8] mr-2' />
							<span>Advanced analysis</span>
						</li>
						<li className='flex items-center'>
							<Check className='h-5 w-5 text-[#0004E8] mr-2' />
							<span>Priority support</span>
						</li>
						<li className='flex items-center'>
							<Check className='h-5 w-5 text-[#0004E8] mr-2' />
							<span>Unlimited projects</span>
						</li>
						<li className='flex items-center'>
							<Check className='h-5 w-5 text-[#0004E8] mr-2' />
							<span>Team collaboration</span>
						</li>
					</ul>
				</CardContent>

				<CardFooter>
					<Button
						className='w-full bg-[#0052CC] hover:bg-[#0052CC]/90 h-12 text-lg'
						onClick={handleCheckout}
					>
						Upgrade to{' '}
						{planType === 'monthly' ? 'Monthly' : 'Yearly'} Plan
					</Button>
				</CardFooter>
			</Card>
		</div>
	)
}

export default UpgradePage
