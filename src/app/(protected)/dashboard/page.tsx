'use client'
import { motion } from 'framer-motion'
import DashboardHeader from '@/components/dashboard/DashboardHeader'
import StatCards from '@/components/dashboard/StatCards'
import UpcomingRenewals from '@/components/dashboard/UpcomingRenewals'
import ChartsContainer from '@/components/dashboard/ChartsContainer'
import DashboardSkeleton from '@/components/skeletons/DashboardSkeleton'
import SubscriptionErrorCard from '@/components/subscriptions/SubscriptionErrorCard'
import useDashboardData from '@/hooks/useDashboardData'

export default function DashboardPage() {
	const { loading, error, stats, upcomingRenewals } = useDashboardData()

	if (loading) {
		return <DashboardSkeleton />
	}

	if (error) {
		return <SubscriptionErrorCard error={error} />
	}

	return (
		<motion.div
			className='space-y-6'
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
		>
			<DashboardHeader />
			<StatCards stats={stats} />
			{upcomingRenewals.length > 0 && (
				<UpcomingRenewals renewals={upcomingRenewals} />
			)}
			<ChartsContainer />
		</motion.div>
	)
}
