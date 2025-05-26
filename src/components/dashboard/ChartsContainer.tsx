import { motion } from 'framer-motion'
import MonthlySpendingChart from '@/components/analysis/MonthlySpendingChart'
import YearlySpendingChart from '@/components/analysis/YearlySpendingChart'
import CategoryWiseSpendingChart from '@/components/analysis/CategoryWiseSpendingChart'
import TopSubscriptionsChart from '@/components/analysis/TopSubscriptionsChart'
import { useSelector } from 'react-redux'
import { RootState } from '@/redux/store'

export default function ChartsContainer() {
	const { user } = useSelector((state: RootState) => state.auth)
	const { subscriptions } = useSelector(
		(state: RootState) => state.subscriptions
	)
	return (
		<motion.div
			className='grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6'
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{ delay: 0.3 }}
		>
			{user && subscriptions && (
				<>
					<MonthlySpendingChart />
					<YearlySpendingChart />
					<CategoryWiseSpendingChart />
					<TopSubscriptionsChart />
				</>
			)}
		</motion.div>
	)
}
