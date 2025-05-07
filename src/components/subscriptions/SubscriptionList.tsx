import { Subscription, CategoryIcons } from '@/types/types'
import SubscriptionCard from './SubscriptionCard'
import { motion } from 'framer-motion'

interface SubscriptionListProps {
	subscriptions: Subscription[]
	categoryIcons: CategoryIcons
	onDelete: (id: string) => Promise<void>
}

export default function SubscriptionList({
	subscriptions,
	categoryIcons,
	onDelete,
}: SubscriptionListProps) {
   
	return (
		<motion.div
			className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'
			initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{duration:0.3}}
		>
			{subscriptions.map((sub) => (
				<SubscriptionCard
					key={sub._id}
					subscription={sub}
					categoryIcons={categoryIcons}
					onDelete={onDelete}
				/>
			))}
		</motion.div>
	)
}
