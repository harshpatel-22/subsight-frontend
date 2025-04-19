'use client'

import {  useEffect  } from 'react'
import Link from 'next/link'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
	Plus,
	Edit2,
	Trash2,
	Music,
	ShoppingBag,
	Film,
	Calendar,
	Tv,
	Gamepad2,
	BookOpen,
	Coffee,
	Cloud,
	Gift,
	Home,
	MoreVertical,
} from 'lucide-react'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useDispatch, useSelector } from 'react-redux'
import { setSubscriptions, setLoading } from '@/redux/subscriptionSlice'
import {axiosInstance} from '@/utils/axiosInstance'
import { RootState } from '@/redux/store'
import { CategoryIcons } from '@/types/types'

const categoryIcons: CategoryIcons = {
	entertainment: <Film className='w-4 h-4' />,
	music: <Music className='w-4 h-4' />,
	shopping: <ShoppingBag className='w-4 h-4' />,
	streaming: <Tv className='w-4 h-4' />,
	gaming: <Gamepad2 className='w-4 h-4' />,
	education: <BookOpen className='w-4 h-4' />,
	food: <Coffee className='w-4 h-4' />,
	cloud: <Cloud className='w-4 h-4' />,
	lifestyle: <Gift className='w-4 h-4' />,
	utilities: <Home className='w-4 h-4' />,
	default: <Calendar className='w-4 h-4' />,
}

export default function SubscriptionsPage() {
	const dispatch = useDispatch()
	const { subscriptions, loading } = useSelector(
		(state:RootState) => state.subscriptions
	)

	useEffect(() => {
		const fetchSubscriptions = async () => {
            try {
                dispatch(setLoading(true))
                const response = await axiosInstance.get('/subscriptions')
                console.log(response.data.subscriptions)
				dispatch(setSubscriptions(response.data.subscriptions))
			} catch (error) {
				console.error('Error fetching subscriptions:', error)
			} finally {
				dispatch(setLoading(false))
			}
		}

		fetchSubscriptions()
	}, [dispatch])

    const getCategoryIcon = (category:string) => {
		return categoryIcons[category?.toLowerCase()] || categoryIcons.default
	}

	// Format currency based on the currency code
	const formatCurrency = (amount:number, currency = 'INR') => {
		return new Intl.NumberFormat('en-IN', {
			style: 'currency',
			currency: currency,
			minimumFractionDigits: 0,
			maximumFractionDigits: 2,
		}).format(amount)
	}

	// Format date to display in readable format
	const formatDate = (dateString:string) => {
		return new Date(dateString).toLocaleDateString('en-US', {
			month: 'short',
			day: 'numeric',
			year: 'numeric',
		})
	}

	// Calculate next billing date based on start date and billing cycle
	const calculateNextBillingDate = (startDate:string, billingCycle:number, endDate:string) => {
		const start = new Date(startDate)
		const end = endDate ? new Date(endDate) : null
		const today = new Date()

		// If the subscription has an end date and it's in the past, return the end date
		if (end && end < today) {
			return formatDate(endDate)
		}

		// Calculate the next billing date based on the billing cycle (in months)
		const nextDate = new Date(start)
		while (nextDate <= today) {
			nextDate.setMonth(nextDate.getMonth() + billingCycle)
		}

		return formatDate(nextDate)
	}

	// Get renewal status
    const getRenewalStatus = (renewalMethod:string) => {
		return renewalMethod === 'auto' ? 'Auto-renews' : 'Manual renewal'
	}

	const handleDeleteSubscription = async (id) => {
		if (
			window.confirm('Are you sure you want to delete this subscription?')
		) {
			try {
				await axiosInstance.delete(`/subscriptions/${id}`)
				const response = await axiosInstance.get('/api/subscriptions')
				dispatch(setSubscriptions(response.data.subscriptions))
			} catch (error) {
				console.error('Error deleting subscription:', error)
			}
		}
	}

	return (
		<div className='space-y-6'>
			<div className='flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4'>
				<div>
					<h2 className='text-2xl font-bold text-gray-900'>
						Your Subscriptions
					</h2>
					{subscriptions.length > 0 && (
						<p className='text-gray-500 mt-1'>
							Managing {subscriptions.length} subscription
							{subscriptions.length !== 1 ? 's' : ''}
						</p>
					)}
				</div>
				<Link href='/dashboard/subscriptions/add' passHref>
					<Button className='bg-[#0004E8] hover:bg-[#0004E8]/90 text-white'>
						<Plus className='mr-2 h-4 w-4' />
						Add Subscription
					</Button>
				</Link>
			</div>

			{/* Loading state */}
			{loading && (
				<div className='flex justify-center items-center h-40'>
					<div className='animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#0004E8]'></div>
				</div>
			)}

			{/* Subscription Cards */}
			{!loading && subscriptions.length > 0 ? (
				<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
					{subscriptions.map((sub) => (
						<Card
							key={sub._id}
							className='hover:shadow-md transition-shadow overflow-hidden'
						>
							<div className='p-5'>
								<div className='flex items-start justify-between'>
									<div className='flex items-center space-x-3'>
										<div className='w-10 h-10 rounded-md bg-gray-100 flex items-center justify-center'>
											{getCategoryIcon(sub.category)}
										</div>
										<div>
											<h3 className='font-semibold text-gray-900'>
												{sub.name}
											</h3>
											<p className='text-xs text-gray-500 capitalize'>
												{sub.category || 'Other'}
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
												href={`/dashboard/subscriptions/edit/${sub._id}`}
												passHref
											>
												<DropdownMenuItem className='cursor-pointer'>
													<Edit2 className='mr-2 h-4 w-4' />
													Edit
												</DropdownMenuItem>
											</Link>
											<DropdownMenuItem
												className='cursor-pointer text-red-600'
												onClick={() =>
													handleDeleteSubscription(
														sub._id
													)
												}
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
												{sub.billingCycle === 1
													? 'Monthly'
													: sub.billingCycle === 12
													? 'Annual'
													: `Every ${sub.billingCycle} months`}
											</p>
											<p className='text-lg font-bold text-[#0004E8]'>
												{formatCurrency(
													sub.amount,
													sub.currency
												)}
											</p>
										</div>
										<div className='text-right'>
											<p className='text-sm text-gray-500'>
												{getRenewalStatus(
													sub.renewalMethod
												)}
											</p>
											<p className='text-sm font-medium'>
												{calculateNextBillingDate(
													sub.startDate,
													sub.billingCycle,
													sub.endDate
												)}
											</p>
										</div>
									</div>
								</div>

								<div className='mt-4 flex space-x-2'>
									<Link
										href={`/dashboard/subscriptions/edit/${sub._id}`}
										passHref
										style={{ width: '50%' }}
									>
										<Button
											variant='outline'
											className='w-full border-[#0004E8] text-[#0004E8] hover:bg-[#0004E8]/10'
										>
											<Edit2 className='mr-2 h-4 w-4' />
											Edit
										</Button>
									</Link>
									<Button
										variant='outline'
										className='w-1/2 border-red-500 text-red-500 hover:bg-red-500/10'
										onClick={() =>
											handleDeleteSubscription(sub._id)
										}
									>
										<Trash2 className='mr-2 h-4 w-4' />
										Cancel
									</Button>
								</div>
							</div>
						</Card>
					))}
				</div>
			) : (
				!loading && (
					<Card className='text-center p-8 border-dashed'>
						<div className='mx-auto flex flex-col items-center justify-center space-y-4'>
							<div className='rounded-full bg-[#0004E8]/10 p-4'>
								<Plus className='h-8 w-8 text-[#0004E8]' />
							</div>
							<h3 className='text-lg font-medium text-gray-900'>
								No subscriptions yet
							</h3>
							<p className='text-sm text-gray-500'>
								Add your first subscription to get started
							</p>
							<Link href='/dashboard/subscriptions/add' passHref>
								<Button className='mt-4 bg-[#0004E8] hover:bg-[#0004E8]/90 text-white'>
									<Plus className='mr-2 h-4 w-4' />
									Add Subscription
								</Button>
							</Link>
						</div>
					</Card>
				)
			)}

			{!loading && subscriptions.length > 0 && (
				<Card className='p-5 mt-6'>
					<h3 className='font-semibold text-gray-900 mb-3'>
						Summary
					</h3>
					<div className='flex flex-wrap gap-4'>
						<div className='bg-gray-50 rounded-lg p-3 flex-1'>
							<p className='text-sm text-gray-500'>
								Total Monthly
							</p>
							<p className='text-xl font-bold text-[#0004E8]'>
								{formatCurrency(
									subscriptions.reduce((acc, sub) => {
										return (
											acc + sub.amount / sub.billingCycle
										)
									}, 0),
									'INR'
								)}
							</p>
						</div>
						<div className='bg-gray-50 rounded-lg p-3 flex-1'>
							<p className='text-sm text-gray-500'>
								Total Annual
							</p>
							<p className='text-xl font-bold text-[#0004E8]'>
								{formatCurrency(
									subscriptions.reduce((acc, sub) => {										
										return (
											acc +
											sub.amount * (12 / sub.billingCycle)
										)
									}, 0),
									'INR'
								)}
							</p>
						</div>
					</div>
				</Card>
			)}
		</div>
	)
}
