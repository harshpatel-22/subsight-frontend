import { motion } from 'framer-motion'
import MonthlySpendingChart from '@/components/analysis/MonthlySpendingChart'
import YearlySpendingChart from '@/components/analysis/YearlySpendingChart'
import CategoryWiseSpendingChart from '@/components/analysis/CategoryWiseSpendingChart'
import TopSubscriptionsChart from '@/components/analysis/TopSubscriptionsChart'

export default function ChartsContainer() {
	return (
		<motion.div
			className='grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6'
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{ delay: 0.3 }}
		>
			<MonthlySpendingChart />
			<YearlySpendingChart />
			<CategoryWiseSpendingChart />
			<TopSubscriptionsChart />
		</motion.div>
	)
}
