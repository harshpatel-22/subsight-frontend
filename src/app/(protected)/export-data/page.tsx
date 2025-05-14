'use client'

import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '@/redux/store'
import { useEffect } from 'react'
import { fetchSubscriptions } from '@/redux/thunks/subscriptionThunks'
import { motion } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import CardLoader from '@/components/CardLoader'
import SubscriptionErrorCard from '@/components/subscriptions/SubscriptionErrorCard'
import ExportDataHeader from '@/components/export-data/ExportDataHeader'
import ExportDataCard from '@/components/export-data/ExportDataCard'
import DataPrivacyNotice from '@/components/export-data/DataPrivacyNotice'

export default function ExportDataPage() {
	const dispatch = useDispatch<AppDispatch>()
	const { subscriptions, loading, error } = useSelector(
		(state: RootState) => state.subscriptions
	)

	useEffect(() => {
		dispatch(fetchSubscriptions())
	}, [dispatch])

	if (loading) {
		return <CardLoader />
	}

	if (error) {
		return <SubscriptionErrorCard error={error} />
	}

	const fileSize = subscriptions?.length
		? `${
				Math.round((JSON.stringify(subscriptions).length / 1024) * 10) /
				10
		  } KB`
		: '0 KB'

	return (
		<motion.div
			className='container max-w-4xl mx-auto py-8 px-4 sm:px-6'
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.4 }}
		>
			<Card className='overflow-hidden border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200'>
				<ExportDataHeader length={subscriptions.length} />
				<CardContent className='pt-6 pb-0'>
					<div className='space-y-6'>
						<motion.div
							initial={{ opacity: 0, scale: 0.98 }}
							animate={{ opacity: 1, scale: 1 }}
							transition={{ delay: 0.2 }}
						>
							<ExportDataCard
								subscriptions={subscriptions}
								fileSize={fileSize}
							/>
						</motion.div>
						<motion.div
							className='bg-blue-50/70 border border-blue-100 rounded-lg p-4 text-sm text-blue-700'
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							transition={{ delay: 0.4 }}
						>
							<DataPrivacyNotice />
						</motion.div>
					</div>
				</CardContent>
			</Card>
		</motion.div>
	)
}
