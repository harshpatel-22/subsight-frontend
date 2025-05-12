'use client'

import Link from 'next/link'
import { useState } from 'react'
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
import CustomDialog from '../CustomDialog'
import Tooltip from '@mui/material/Tooltip'

interface SubscriptionCardProps {
	subscription: Subscription
	categoryIcons: CategoryIcons
	onDelete: (id: string) => Promise<void>
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

	const [dialogOpen, setDialogOpen] = useState(false)
	const [dropdownOpen, setDropdownOpen] = useState(false)

	const subscriptionStatus = calculateSubscriptionStatus(
		startDate,
		billingCycle,
		endDate
	)

	const handleDelete = async () => {
		await onDelete(_id)
		setDialogOpen(false)
	}

	return (
		<div>
			<Card className='py-2 hover:shadow-md transition-shadow overflow-hidden'>
				<div className='p-5'>
					<div className='flex items-start justify-between'>
						<Link
							href={`/subscriptions/${_id}`}
							passHref
							className='flex items-center space-x-3 flex-1 min-w-0'
						>
							<div className='w-10 h-10 rounded-md bg-blue-100 hover:bg-blue-200 flex items-center justify-center shrink-0'>
								{getCategoryIcon(category, categoryIcons)}
							</div>
							<div className='min-w-0'>
								<Tooltip title={name} placement='top'>
									<h3 className='font-semibold text-gray-900 truncate'>
										{name}
									</h3>
								</Tooltip>

								<p className='text-xs text-gray-500 capitalize truncate'>
									{category || 'Other'}
								</p>
							</div>
						</Link>

						<DropdownMenu
							open={dropdownOpen}
							onOpenChange={setDropdownOpen}
						>
							<DropdownMenuTrigger asChild>
								<Button
									variant='ghost'
									size='sm'
									className='cursor-pointer h-8 w-8 p-0'
									onClick={(e) => e.stopPropagation()}
								>
									<MoreVertical className='h-4 w-4' />
								</Button>
							</DropdownMenuTrigger>
							<DropdownMenuContent align='end'>
								<Link
									href={`/subscriptions/edit/${_id}`}
									passHref
								>
									<DropdownMenuItem
										className='cursor-pointer'
										onClick={() => setDropdownOpen(false)} // Close dropdown on click
									>
										<Edit2 className='mr-2 h-4 w-4' />
										Edit
									</DropdownMenuItem>
								</Link>
								<DropdownMenuItem
									className='cursor-pointer text-red-600'
									onClick={(e) => {
										e.stopPropagation()
										e.preventDefault()
										setDropdownOpen(false) // Close dropdown
										setDialogOpen(true) // Open dialog
									}}
								>
									<Trash2 className='mr-2 h-4 w-4' />
									Delete
								</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
					</div>

					<div className='mt-5 pt-4 border-t'>
						<div className='flex justify-between items-center gap-1'>
							<div className='min-w-0'>
								<p className='text-sm text-gray-500'>
									{billingCycle === 1
										? 'Monthly'
										: billingCycle === 12
										? 'Annual'
										: billingCycle === 3
										? 'Quarterly'
										: `Every ${billingCycle} months`}
								</p>
								<Tooltip
									title={formatCurrency(amount, currency)}
									placement='top'
								>
									<p className='text-lg font-bold text-[#2563EB] truncate'>
										{formatCurrency(amount, currency)}
									</p>
								</Tooltip>
							</div>
							<div className='flex flex-col items-start text-right max-w-[120px] min-h-[40px] justify-start'>
								<p className='text-sm text-gray-500 w-full truncate'>
									{getRenewalStatus(renewalMethod)}
								</p>
								<Tooltip
									title={subscriptionStatus.text}
									placement='top'
								>
									<p
										className={`text-sm font-medium w-full ${
											subscriptionStatus.isExpired
												? 'text-red-500'
												: ''
										} truncate`}
									>
										{subscriptionStatus.text}
									</p>
								</Tooltip>
							</div>
						</div>
					</div>
				</div>
			</Card>

			<CustomDialog
				open={dialogOpen}
				onOpenChange={setDialogOpen}
				title='Delete Subscription'
				description={`Are you sure you want to delete ${name}? This action cannot be undone.`}
				onCancel={() => setDialogOpen(false)}
				onConfirm={handleDelete}
			/>
		</div>
	)
}
