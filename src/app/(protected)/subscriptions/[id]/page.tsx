'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { axiosInstance } from '@/utils/axiosInstance'
import { Subscription } from '@/types/types'
import { format } from 'date-fns'
import {
	formatCurrency,
	calculateSubscriptionStatus,
	getRenewalStatus,
} from '@/utils/subscriptionUtils'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
	CalendarIcon,
	ClockIcon,
	BellIcon,
	RotateCwIcon,
	ArrowLeftIcon,
	CreditCardIcon,
	TagIcon,
} from 'lucide-react'
import CardLoader from '@/components/CardLoader'
import { motion } from 'framer-motion'

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

	const {
		name,
		amount,
		currency,
		category,
		billingCycle,
		startDate,
		endDate,
		notes,
		renewalMethod,
		reminderDaysBefore,
	} = subscription

	const status = calculateSubscriptionStatus(startDate, billingCycle, endDate)
	const renewalStatusText = getRenewalStatus(renewalMethod)

	return (
		<motion.div
			initial='initial'
			animate='animate'
			variants={stagger}
		>
			<div className='max-w-7xl mx-auto'>
				<motion.div
					variants={fadeIn}
					className='flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6'
				>
					<div className='flex items-center gap-3'>
						<Button
							variant='ghost'
							size='icon'
							onClick={() => router.back()}
							className='cursor-pointer hover:bg-white/50 dark:hover:bg-gray-800/50 rounded-full transition-colors'
						>
							<ArrowLeftIcon className='h-5 w-5' />
						</Button>
						<div>
							<h1 className='text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70'>
								{name}
							</h1>
							<div className='flex items-center gap-2 mt-2'>
								<Badge
									variant='outline'
									className='capitalize bg-white dark:bg-gray-800 shadow-sm'
								>
									<TagIcon className='h-3 w-3 mr-1' />
									{category}
								</Badge>
								<Badge
									className={`shadow-sm ${
										status.isExpired
											? 'bg-red-500/10 text-red-600 dark:text-red-400'
											: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
									}`}
								>
									{status.text}
								</Badge>
							</div>
						</div>
					</div>
					<motion.div
						variants={fadeIn}
						className='flex items-center gap-2 bg-white dark:bg-gray-800 p-3 rounded-2xl shadow-sm'
					>
						<CreditCardIcon className='h-5 w-5 text-primary' />
						<div>
							<p className='text-sm text-gray-500 dark:text-gray-400'>
								Amount
							</p>
							<p className='text-2xl font-bold text-primary'>
								{formatCurrency(amount, currency)}
								<span className='text-sm font-normal text-gray-400 ml-1'>
									/{' '}
									{billingCycle === 1
										? 'month'
										: billingCycle === 12
										? 'year'
										: `${billingCycle} months`}
								</span>
							</p>
						</div>
					</motion.div>
				</motion.div>

				<div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
					<motion.div variants={fadeIn} className='lg:col-span-2'>
						<Card className='overflow-hidden bg-white/95 dark:bg-gray-800/95 border-0 shadow-xl'>
							<CardHeader className='border-b border-gray-100 dark:border-gray-700 pb-4 bg-white/95 dark:bg-gray-800/95'>
								<h2 className='text-xl font-semibold'>
									Subscription Details
								</h2>
							</CardHeader>
							<CardContent className='p-6'>
								<div className='grid grid-cols-1 sm:grid-cols-2 gap-6'>
									<motion.div
										variants={fadeIn}
										className='space-y-6'
									>
										<div className='group flex items-start gap-4 p-4 rounded-2xl transition-colors hover:bg-white dark:hover:bg-gray-800'>
											<div className='p-3 rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-colors'>
												<ClockIcon className='h-5 w-5' />
											</div>
											<div>
												<p className='text-sm text-gray-500 dark:text-gray-400'>
													Billing Cycle
												</p>
												<p className='font-medium mt-1'>
													{billingCycle === 1
														? 'Monthly'
														: billingCycle === 12
														? 'Annually'
														: billingCycle === 3
														? 'Quarterly'
														: `Every ${billingCycle} months`}
												</p>
											</div>
										</div>

										<div className='group flex items-start gap-4 p-4 rounded-2xl transition-colors hover:bg-white dark:hover:bg-gray-800'>
											<div className='p-3 rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-colors'>
												<CalendarIcon className='h-5 w-5' />
											</div>
											<div>
												<p className='text-sm text-gray-500 dark:text-gray-400'>
													Duration
												</p>
												<p className='font-medium mt-1'>
													{format(
														new Date(startDate),
														'PPP'
													)}
												</p>
												<p className='text-sm text-gray-500 dark:text-gray-400 mt-1'>
													to{' '}
													{format(
														new Date(endDate),
														'PPP'
													)}
												</p>
											</div>
										</div>
									</motion.div>

									<motion.div
										variants={fadeIn}
										className='space-y-6'
									>
										<div className='group flex items-start gap-4 p-4 rounded-2xl transition-colors hover:bg-white dark:hover:bg-gray-800'>
											<div className='p-3 rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-colors'>
												<RotateCwIcon className='h-5 w-5' />
											</div>
											<div>
												<p className='text-sm text-gray-500 dark:text-gray-400'>
													Renewal
												</p>
												<p className='font-medium mt-1'>
													{renewalStatusText}
												</p>
											</div>
										</div>

										<div className='group flex items-start gap-4 p-4 rounded-2xl transition-colors hover:bg-white dark:hover:bg-gray-800'>
											<div className='p-3 rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-colors'>
												<BellIcon className='h-5 w-5' />
											</div>
											<div>
												<p className='text-sm text-gray-500 dark:text-gray-400'>
													Reminder
												</p>
												<p className='font-medium mt-1'>
													{reminderDaysBefore} days
													before
												</p>
											</div>
										</div>
									</motion.div>
								</div>
							</CardContent>
						</Card>
					</motion.div>

					{notes && (
						<motion.div variants={fadeIn}>
							<Card className='bg-white/95 dark:bg-gray-800/95 border-0 shadow-xl h-full'>
								<CardHeader className='border-b border-gray-100 dark:border-gray-700 pb-4 bg-white/95 dark:bg-gray-800/95'>
									<h2 className='text-xl font-semibold'>
										Notes
									</h2>
								</CardHeader>
								<CardContent className='p-6'>
									<p className='text-gray-600 dark:text-gray-300 whitespace-pre-line leading-relaxed'>
										{notes}
									</p>
								</CardContent>
							</Card>
						</motion.div>
					)}
				</div>
			</div>
		</motion.div>
	)
}
