'use client'
import { useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '@/redux/store'
import { fetchSubscriptions } from '@/redux/thunks/subscriptionThunks'

export default function useDashboardData() {
	const dispatch = useDispatch<AppDispatch>()
	const { subscriptions, loading, error } = useSelector(
		(state: RootState) => state.subscriptions
	)

	useEffect(() => {
		dispatch(fetchSubscriptions())
	}, [dispatch])

	const stats = useMemo(() => {
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
            upcomingRenewalsCount: upcomingRenewals.length,
            upcomingRenewals
		}
	}, [subscriptions])

	return { loading, error, stats, upcomingRenewals: stats.upcomingRenewals }
}
