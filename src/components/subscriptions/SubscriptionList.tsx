import { Subscription, CategoryIcons } from '@/types/types'
import SubscriptionCard from './SubscriptionCard'
import { motion } from 'framer-motion'

interface SubscriptionListProps {
	subscriptions: Subscription[]
	categoryIcons: CategoryIcons
	onDelete: (id: string) => Promise<void>
}

const stagger = {
	animate: {
		transition: {
			staggerChildren: 0.02,
		},
	},
}

export default function SubscriptionList({
	subscriptions,
	categoryIcons,
	onDelete,
}: SubscriptionListProps) {
   
	return (
		<motion.div
			className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'
			initial='initial'
			animate='animate'
			variants={stagger}
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
