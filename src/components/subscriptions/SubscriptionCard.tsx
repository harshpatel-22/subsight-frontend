import Link from 'next/link'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Edit2, Trash2, MoreVertical } from 'lucide-react'
import { Subscription, CategoryIcons } from '@/types/types'
import {
	formatCurrency,
	getCategoryIcon,
	getRenewalStatus,
    calculateSubscriptionStatus,
} from '@/utils/subscriptionUtils'

interface SubscriptionCardProps {
	subscription: Subscription
	categoryIcons: CategoryIcons
	onDelete: (id: string) => void
}

export default function SubscriptionCard({
	subscription,
	categoryIcons,
	onDelete,
}: SubscriptionCardProps) {
	const {
		_id,
		name,
		category,
		amount,
		currency,
		billingCycle,
		renewalMethod,
		startDate,
		endDate,
	} = subscription

	return (
		<Card className='py-2 hover:shadow-md transition-shadow overflow-hidden'>
			<div className='p-5'>
				<div className='flex items-start justify-between'>
					<div className='flex items-center space-x-3'>
						<div className='w-10 h-10 rounded-md bg-gray-100 flex items-center justify-center'>
							{getCategoryIcon(category, categoryIcons)}
						</div>
						<div>
							<h3 className='font-semibold text-gray-900'>
								{name}
							</h3>
							<p className='text-xs text-gray-500 capitalize'>
								{category || 'Other'}
							</p>
						</div>
					</div>
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button
								variant='ghost'
								size='sm'
								className='h-8 w-8 p-0'
							>
								<MoreVertical className='h-4 w-4' />
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent align='end'>
							<Link
								href={`/dashboard/subscriptions/edit/${_id}`}
								passHref
							>
								<DropdownMenuItem className='cursor-pointer'>
									<Edit2 className='mr-2 h-4 w-4' />
									Edit
								</DropdownMenuItem>
							</Link>
							<DropdownMenuItem
								className='cursor-pointer text-red-600'
								onClick={() => onDelete(_id)}
							>
								<Trash2 className='mr-2 h-4 w-4' />
								Delete
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</div>
				<div className='mt-5 pt-4 border-t'>
					<div className='flex justify-between items-center'>
						<div>
							<p className='text-sm text-gray-500'>
								{billingCycle === 1
									? 'Monthly'
									: billingCycle === 12
									? 'Annual'
									: billingCycle === 3
									? 'Quarterly'
									: `Every ${billingCycle} months`}
							</p>
							<p className='text-lg font-bold text-[#0004E8]'>
								{formatCurrency(amount, currency)}
							</p>
						</div>
						<div className='text-right'>
							<p className='text-sm text-gray-500'>
								{getRenewalStatus(renewalMethod)}
							</p>
							<p
								className={`text-sm font-medium ${
									calculateSubscriptionStatus(
										startDate,
										billingCycle,
										endDate
									).isExpired
										? 'text-red-500'
										: ''
								}`}
							>
								{
									calculateSubscriptionStatus(
										startDate,
										billingCycle,
										endDate
									).text
								}
							</p>
						</div>
					</div>
				</div>
			</div>
		</Card>
	)
}
