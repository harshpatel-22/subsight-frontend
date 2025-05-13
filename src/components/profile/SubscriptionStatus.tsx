import { motion } from 'framer-motion'
import { Crown, Tag, Calendar } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import { User } from '@/types/types'

const scaleUp = {
	initial: { scale: 0.95, opacity: 0 },
	animate: { scale: 1, opacity: 1 },
	transition: { duration: 0.3 },
}

interface SubscriptionStatusProps {
	user: User | null
}

export default function SubscriptionStatus({ user }: SubscriptionStatusProps) {
	const router = useRouter()

	const formatExpiryDate = () => {
		if (!user?.premiumExpiresAt) return 'Not available'
		const expiryDate = new Date(user.premiumExpiresAt)
		return expiryDate.toLocaleDateString('en-US', {
			day: 'numeric',
			month: 'long',
			year: 'numeric',
		})
	}

	const getDaysRemaining = () => {
		if (!user?.premiumExpiresAt) return null
		const expiryDate = new Date(user.premiumExpiresAt)
		const today = new Date()
		const diffTime = expiryDate.getTime() - today.getTime()
		const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
		return diffDays
	}

	const daysRemaining = getDaysRemaining()

	return (
		<motion.div
			variants={scaleUp}
			className='bg-[#F3F8FF] dark:bg-gray-800/95 rounded-3xl shadow-xl shadow-blue-900/5 overflow-hidden'
		>
			<div className='p-6'>
				<h2 className='text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center'>
					<Crown className='w-5 h-5 mr-2 text-blue-600' />
					Subscription Status
				</h2>

				<div className='space-y-4'>
					<div className='flex items-center justify-between'>
						<span className='text-gray-500 dark:text-gray-400'>
							Status
						</span>
						<Badge
							className={`${
								user?.isPremium
									? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
									: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
							}`}
						>
							{user?.isPremium ? 'Active' : 'Inactive'}
						</Badge>
					</div>

					{user?.isPremium && (
						<>
							<div className='flex items-center justify-between'>
								<span className='text-gray-500 dark:text-gray-400 flex items-center'>
									<Tag className='w-4 h-4 mr-2' />
									Plan
								</span>
								<Badge className='bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400 capitalize'>
									{user?.planType || 'Standard'}
								</Badge>
							</div>

							<div className='flex items-center justify-between'>
								<span className='text-gray-500 dark:text-gray-400 flex items-center'>
									<Calendar className='w-4 h-4 mr-2' />
									Expires
								</span>
								<div className='text-right'>
									<span className='text-sm font-medium text-gray-900 dark:text-white'>
										{formatExpiryDate()}
									</span>
									{daysRemaining && daysRemaining > 0 && (
										<p className='text-xs text-blue-600 dark:text-blue-400'>
											{daysRemaining} days remaining
										</p>
									)}
								</div>
							</div>
						</>
					)}

					{!user?.isPremium && (
						<div className='pt-2'>
							<Button
								className='cursor-pointer w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white'
								onClick={() => router.push('/upgrade')}
							>
								Upgrade to Premium
							</Button>
						</div>
					)}
				</div>
			</div>
		</motion.div>
	)
}
