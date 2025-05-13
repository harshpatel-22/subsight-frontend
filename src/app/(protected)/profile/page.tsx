'use client'

import { useSelector } from 'react-redux'
import { useRouter } from 'next/navigation'
import { RootState } from '@/redux/store'
import { motion } from 'framer-motion'
import ProfileHeader from '@/components/profile/ProfileHeader'
import ProfileInformation from '@/components/profile/ProfileInformation'
import SubscriptionStatus from '@/components/profile/SubscriptionStatus'
import QuickActions from '@/components/profile/QuickActions'

const stagger = {
	animate: {
		transition: {
			staggerChildren: 0.1,
		},
	},
}

const fadeIn = {
	initial: { opacity: 0, y: 20 },
	animate: { opacity: 1, y: 0 },
	transition: { duration: 0.4 },
}

export default function ProfilePage() {
	const router = useRouter()
	const { user } = useSelector((state: RootState) => state.auth)

	return (
		<motion.div
			initial='initial'
			animate='animate'
			variants={stagger}
			className='min-h-[calc(100vh-8rem)]'
		>
			<ProfileHeader onEdit={() => router.push('/profile/edit')} />

			<div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
				<motion.div variants={fadeIn} className='lg:col-span-2'>
					<ProfileInformation user={user} />
				</motion.div>

				<motion.div variants={fadeIn} className='space-y-6'>
					<SubscriptionStatus user={user} />
					<QuickActions user={user} />
				</motion.div>
			</div>
		</motion.div>
	)
}
