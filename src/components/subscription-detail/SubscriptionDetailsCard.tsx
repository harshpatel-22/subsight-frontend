import { Subscription } from '@/types/types'
import { format } from 'date-fns'
import { getRenewalStatus } from '@/utils/subscriptionUtils'
import { Card, CardHeader, CardContent } from '@/components/ui/card'
import { CalendarIcon, ClockIcon, BellIcon, RotateCwIcon } from 'lucide-react'
import { motion } from 'framer-motion'

const fadeIn = {
	initial: { opacity: 0, y: 20 },
	animate: { opacity: 1, y: 0 },
	transition: { duration: 0.4 },
}

interface SubscriptionDetailsCardProps {
	subscription: Subscription
}

export default function SubscriptionDetailsCard({
	subscription,
}: SubscriptionDetailsCardProps) {
	const {
		billingCycle,
		startDate,
		endDate,
		renewalMethod,
		reminderDaysBefore,
	} = subscription
	const renewalStatusText = getRenewalStatus(renewalMethod)

	return (
		<Card className='overflow-hidden bg-white/95 dark:bg-gray-800/95 border-0 shadow-xl'>
			<CardHeader className='border-b border-gray-100 dark:border-gray-700 pb-4 bg-white/95 dark:bg-gray-800/95'>
				<h2 className='text-xl font-semibold'>Subscription Details</h2>
			</CardHeader>
			<CardContent className='p-6'>
				<div className='grid grid-cols-1 sm:grid-cols-2 gap-6'>
					<motion.div variants={fadeIn} className='space-y-6'>
						<div className='group flex items-start gap-4 p-4 rounded-2xl transition-colors hover:bg-white dark:hover:bg-gray-800'>
							<div className='p-3 rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-colors'>
								<ClockIcon className='h-5 w-5' />
							</div>
							<div>
								<p className='text-sm text-gray-500 dark:text-gray-400'>
									Billing Cycle
								</p>
								<p className='font-medium mt-1'>
									{billingCycle === 1
										? 'Monthly'
										: billingCycle === 12
										? 'Annually'
										: billingCycle === 3
										? 'Quarterly'
										: `Every ${billingCycle} months`}
								</p>
							</div>
						</div>

						<div className='group flex items-start gap-4 p-4 rounded-2xl transition-colors hover:bg-white dark:hover:bg-gray-800'>
							<div className='p-3 rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-colors'>
								<CalendarIcon className='h-5 w-5' />
							</div>
							<div>
								<p className='text-sm text-gray-500 dark:text-gray-400'>
									Duration
								</p>
								<p className='font-medium mt-1'>
									{format(new Date(startDate), 'PPP')}
								</p>
								<p className='text-sm text-gray-500 dark:text-gray-400 mt-1'>
									to {format(new Date(endDate), 'PPP')}
								</p>
							</div>
						</div>
					</motion.div>

					<motion.div variants={fadeIn} className='space-y-6'>
						<div className='group flex items-start gap-4 p-4 rounded-2xl transition-colors hover:bg-white dark:hover:bg-gray-800'>
							<div className='p-3 rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-colors'>
								<RotateCwIcon className='h-5 w-5' />
							</div>
							<div>
								<p className='text-sm text-gray-500 dark:text-gray-400'>
									Renewal
								</p>
								<p className='font-medium mt-1'>
									{renewalStatusText}
								</p>
							</div>
						</div>

						<div className='group flex items-start gap-4 p-4 rounded-2xl transition-colors hover:bg-white dark:hover:bg-gray-800'>
							<div className='p-3 rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-colors'>
								<BellIcon className='h-5 w-5' />
							</div>
							<div>
								<p className='text-sm text-gray-500 dark:text-gray-400'>
									Reminder
								</p>
								<p className='font-medium mt-1'>
									{reminderDaysBefore} days before
								</p>
							</div>
						</div>
					</motion.div>
				</div>
			</CardContent>
		</Card>
	)
}
