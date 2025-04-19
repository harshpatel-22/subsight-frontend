import { Subscription, CategoryIcons } from '@/types/types'
import SubscriptionCard from './SubscriptionCard'

interface SubscriptionListProps {
	subscriptions: Subscription[]
	categoryIcons: CategoryIcons
	onDelete: (id: string) => void
}

export default function SubscriptionList({
	subscriptions,
	categoryIcons,
	onDelete,
}: SubscriptionListProps) {
	return (
		<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
			{subscriptions.map((sub) => (
				<SubscriptionCard
					key={sub._id}
					subscription={sub}
					categoryIcons={categoryIcons}
					onDelete={onDelete}
				/>
			))}
		</div>
	)
}
