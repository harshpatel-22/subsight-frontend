'use client'

import { useEffect, useMemo } from 'react'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import Link from 'next/link'
import { format } from 'date-fns'
import StatCard from '@/components/StatCard'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '@/redux/store'
import { fetchSubscriptions } from '@/redux/thunks/subscriptionThunks'
import MonthlySpendingChart from '@/components/analysis/MonthlySpendingChart'
import YearlySpendingChart from '@/components/analysis/YearlySpendingChart'
import CategoryWiseSpendingChart from '@/components/analysis/CategoryWiseSpendingChart'
import TopSubscriptionsChart from '@/components/analysis/TopSubscriptionsChart'
import DashboardSkeleton from '@/components/skeletons/DashboardSkeleton'
import SubscriptionErrorCard from '@/components/subscriptions/SubscriptionErrorCard'

const formatCurrency = (amount: number, currency: string) =>
	new Intl.NumberFormat('en-IN', {
		style: 'currency',
		currency,
		minimumFractionDigits: 2,
		maximumFractionDigits: 2,
	}).format(amount)

export default function DashboardPage() {
	const dispatch = useDispatch<AppDispatch>()
	const { subscriptions, loading, error } = useSelector(
		(state: RootState) => state.subscriptions
	)

	useEffect(() => {
		dispatch(fetchSubscriptions())
	}, [dispatch])

	//for future up-gradation
	const currentCurrency = 'INR'

	const {
		totalSubscriptions,
		monthlyCost,
		avgPerSubscription,
		upcomingRenewals,
	} = useMemo(() => {
		const totalSubscriptions = subscriptions.length

		const monthlyCost = subscriptions
			.map((s) => s.convertedAmountInINR / s.billingCycle)
			.reduce((a, b) => a + b, 0)

		const avgPerSubscription =
			totalSubscriptions > 0 ? monthlyCost / totalSubscriptions : 0

		const today = new Date()
		const upcomingRenewals = subscriptions.filter((sub) => {
			const end = new Date(sub.endDate)
			const diff =
				(end.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
			return diff >= 0 && diff <= 7
		})

		return {
			totalSubscriptions,
			monthlyCost,
			avgPerSubscription,
			upcomingRenewals,
		}
	}, [subscriptions])

	if (loading) {
		return <DashboardSkeleton />
	}

	if (error) {
		return <SubscriptionErrorCard error={error} />
	}

	return (
		<div className='space-y-6'>
			<div className='flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4'>
				<h2 className='text-2xl font-bold text-gray-900'>
					Dashboard Overview
				</h2>
				<Link href='/subscriptions/add'>
					<Button className='bg-[#0004E8] hover:bg-[#0004E8]/90 text-white cursor-pointer'>
						<Plus className='mr-2 h-4 w-4' />
						Add Subscription
					</Button>
				</Link>
			</div>

			<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4'>
				<StatCard
					title='Total Subscriptions'
					value={totalSubscriptions.toString()}
				/>
				<StatCard
					title='Monthly Spend'
					value={formatCurrency(monthlyCost, currentCurrency)}
				/>
				<StatCard
					title='Upcoming Renewals'
					value={upcomingRenewals.length.toString()}
				/>
				<StatCard
					title='Avg. per Subscription'
					value={formatCurrency(avgPerSubscription, currentCurrency)}
				/>
			</div>

			{/* this filtering is in frontend */}
			{upcomingRenewals.length > 0 && (
				<div className='space-y-3'>
					<h3 className='text-xl font-semibold text-gray-900'>
						Upcoming Renewals
					</h3>
					<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
						{upcomingRenewals.map((sub, index) => (
							<div
								key={index}
								className='p-4 bg-white border rounded-lg shadow-sm'
							>
								<div className='flex justify-between'>
									<div>
										<h4 className='text-lg font-semibold'>
											{sub.name}
										</h4>
										<p className='text-sm text-gray-500'>
											Renews on{' '}
											{format(
												new Date(sub.endDate),
												'PPP'
											)}
										</p>
									</div>
									<div className='text-[#0004E8] font-bold'>
										{formatCurrency(
											sub.amount,
											sub.currency
										)}
									</div>
								</div>
							</div>
						))}
					</div>
				</div>
			)}

			<div className='grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6'>
				<MonthlySpendingChart />
				<YearlySpendingChart />
				<CategoryWiseSpendingChart />
				<TopSubscriptionsChart />
			</div>
		</div>
	)
}
