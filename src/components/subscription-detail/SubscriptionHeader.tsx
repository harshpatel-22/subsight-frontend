import { useRouter } from 'next/navigation'
import { Subscription } from '@/types/types'
import {
	formatCurrency,
	calculateSubscriptionStatus,
} from '@/utils/subscriptionUtils'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ArrowLeftIcon, TagIcon } from 'lucide-react'
import { motion } from 'framer-motion'

const fadeIn = {
	initial: { opacity: 0, y: 20 },
	animate: { opacity: 1, y: 0 },
	transition: { duration: 0.4 },
}

interface SubscriptionHeaderProps {
	subscription: Subscription
	router: ReturnType<typeof useRouter>
}

export default function SubscriptionHeader({
	subscription,
	router,
}: SubscriptionHeaderProps) {
	const { name, amount, currency, category, billingCycle } = subscription
	const status = calculateSubscriptionStatus(
		subscription.startDate,
		subscription.billingCycle,
		subscription.endDate
	)

	return (
		<motion.div
			variants={fadeIn}
			className='flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6'
		>
			<div className='flex items-center gap-3'>
				<Button
					variant='ghost'
					size='icon'
					onClick={() => router.back()}
					className='cursor-pointer hover:bg-white/50 dark:hover:bg-gray-800/50 rounded-full transition-colors'
				>
					<ArrowLeftIcon className='h-5 w-5' />
				</Button>
				<div>
					<h1 className='text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70'>
						{name}
					</h1>
					<div className='flex items-center gap-2 mt-2'>
						<Badge
							variant='outline'
							className='capitalize bg-white dark:bg-gray-800 shadow-sm'
						>
							<TagIcon className='h-3 w-3 mr-1' />
							{category}
						</Badge>
						<Badge
							className={`shadow-sm ${
								status.isExpired
									? 'bg-red-500/10 text-red-600 dark:text-red-400'
									: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
							}`}
						>
							{status.text}
						</Badge>
					</div>
				</div>
			</div>
			<motion.div
				variants={fadeIn}
				className='flex items-center gap-2 bg-white dark:bg-gray-800 p-3 rounded-2xl shadow-sm'
			>
				<div>
					<p className='text-sm text-gray-500 dark:text-gray-400'>
						Amount
					</p>
					<p className='text-2xl font-bold text-primary'>
						{formatCurrency(amount, currency)}
						<span className='text-sm font-normal text-gray-400 ml-1'>
							/{' '}
							{billingCycle === 1
								? 'month'
								: billingCycle === 12
								? 'year'
								: `${billingCycle} months`}
						</span>
					</p>
				</div>
			</motion.div>
		</motion.div>
	)
}
