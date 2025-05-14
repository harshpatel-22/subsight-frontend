'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { axiosInstance } from '@/utils/axiosInstance'
import { Subscription } from '@/types/types'
import { motion } from 'framer-motion'
import CardLoader from '@/components/CardLoader'
import SubscriptionHeader from '@/components/subscription-detail/SubscriptionHeader'
import SubscriptionDetailsCard from '@/components/subscription-detail/SubscriptionDetailsCard'
import SubscriptionNotesCard from '@/components/subscription-detail/SubscriptionNotesCard'

const fadeIn = {
	initial: { opacity: 0, y: 20 },
	animate: { opacity: 1, y: 0 },
	transition: { duration: 0.4 },
}

const stagger = {
	animate: {
		transition: {
			staggerChildren: 0.1,
		},
	},
}

export default function SubscriptionDetailPage() {
	const { id } = useParams()
	const router = useRouter()
	const [subscription, setSubscription] = useState<Subscription | null>(null)
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState<string | null>(null)

	useEffect(() => {
		const fetchSubscription = async () => {
			try {
				setLoading(true)
				const res = await axiosInstance.get(`/subscriptions/${id}`)
				setSubscription(res.data.subscription)
			} catch (err) {
				console.error(err)
				setError('Failed to load subscription details.')
			} finally {
				setLoading(false)
			}
		}

		if (id) fetchSubscription()
	}, [id])

	if (loading) return <CardLoader title='Subscription' />
	if (error || !subscription)
		return (
			<p className='p-4 text-center text-red-600'>
				{error || 'Subscription not found.'}
			</p>
		)

	return (
		<motion.div initial='initial' animate='animate' variants={stagger}>
			<div className='max-w-7xl mx-auto'>
				<SubscriptionHeader
					subscription={subscription}
					router={router}
				/>
				<div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
					<motion.div variants={fadeIn} className='lg:col-span-2'>
						<SubscriptionDetailsCard subscription={subscription} />
					</motion.div>
					{subscription.notes && (
						<motion.div variants={fadeIn}>
							<SubscriptionNotesCard notes={subscription.notes} />
						</motion.div>
					)}
				</div>
			</div>
		</motion.div>
	)
}
