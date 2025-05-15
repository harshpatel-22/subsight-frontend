import { motion } from 'framer-motion'
import StatCard from '@/components/StatCard'
import { formatCurrency } from '@/utils/subscriptionUtils'
import { StatCardsProps } from '@/types/types'


export default function StatCards({ stats }: StatCardsProps) {
	const currentCurrency = 'INR'

	return (
		<motion.div
			className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4'
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{ delay: 0.3 }}
		>
			<StatCard
				title='Total Subscriptions'
				value={stats.totalSubscriptions.toString()}
			/>
			<StatCard
				title='Monthly Spend'
				value={formatCurrency(stats.monthlyCost, currentCurrency)}
			/>
			<StatCard
				title='Upcoming Renewals'
				value={stats.upcomingRenewalsCount.toString()}
			/>
			<StatCard
				title='Avg. per Subscription'
				value={formatCurrency(
					stats.avgPerSubscription,
					currentCurrency
				)}
			/>
		</motion.div>
	)
}
