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
import { Check } from 'lucide-react'
import React from 'react'

const page = () => {
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
						<Badge
							variant='outline'
							className='bg-[#0004E8]/10 text-[#0004E8] border-[#0004E8]/20'
						>
							Popular
						</Badge>
					</div>
				</CardHeader>
				<CardContent className='pb-6'>
					<div className='flex items-end'>
						<span className='text-4xl font-bold'>₹499</span>
						<span className='text-lg text-muted-foreground ml-1'>
							/month
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
					<Button className='w-full bg-[#0052CC] hover:bg-[#0052CC]/90 h-12 text-lg'>
						Upgrade Now
					</Button>
				</CardFooter>
			</Card>
		</div>
	)
}

export default page
