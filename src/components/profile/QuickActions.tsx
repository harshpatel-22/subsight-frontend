import { motion } from 'framer-motion'
import { Lock, Mail } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import Overlay from '@/components/Overlay'
import { User } from '@/types/types'

const scaleUp = {
	initial: { scale: 0.95, opacity: 0 },
	animate: { scale: 1, opacity: 1 },
	transition: { duration: 0.3 },
}

interface QuickActionsProps {
	user: User | null
}

export default function QuickActions({ user }: QuickActionsProps) {
	const router = useRouter()

	return (
		<motion.div
			variants={scaleUp}
			className='bg-white/95 dark:bg-gray-800/95 rounded-3xl shadow-xl shadow-blue-900/5 overflow-hidden'
		>
			<div className='relative p-6'>
				<h2 className='text-xl font-semibold text-gray-900 dark:text-white mb-6'>
					Quick Actions
				</h2>
				<div className='space-y-3'>
					<Button
						variant='outline'
						className='cursor-pointer w-full justify-start text-gray-700 dark:text-gray-300 hover:bg-blue-50/50 dark:hover:bg-gray-800 group'
						onClick={() =>
							!user?.isGoogleSignIn &&
							router.push('/profile/change-password')
						}
						disabled={user?.isGoogleSignIn}
					>
						<Lock className='mr-3 h-5 w-5 text-blue-600 group-hover:scale-110 transition-transform' />
						<div className='text-left'>
							<p className='font-medium'>Change Password</p>
						</div>
					</Button>

					<Button
						variant='outline'
						className='cursor-pointer w-full justify-start text-gray-700 dark:text-gray-300 hover:bg-blue-50/50 dark:hover:bg-gray-800 group'
						onClick={() =>
							!user?.isGoogleSignIn &&
							router.push('/profile/change-email')
						}
						disabled={user?.isGoogleSignIn}
					>
						<Mail className='mr-3 h-5 w-5 text-blue-600 group-hover:scale-110 transition-transform' />
						<div className='text-left'>
							<p className='font-medium'>Change Email</p>
						</div>
					</Button>
				</div>
				{user?.isGoogleSignIn && <Overlay />}
			</div>
		</motion.div>
	)
}
