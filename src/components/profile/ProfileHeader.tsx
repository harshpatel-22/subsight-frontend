import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'
import { Edit2 } from 'lucide-react'

const fadeIn = {
	initial: { opacity: 0, y: 20 },
	animate: { opacity: 1, y: 0 },
	transition: { duration: 0.4 },
}

interface ProfileHeaderProps {
	onEdit: () => void
}

export default function ProfileHeader({ onEdit }: ProfileHeaderProps) {
	return (
		<motion.div
			variants={fadeIn}
			className='ml-1 mb-2 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4'
		>
			<div className='space-y-1'>
				<h1 className='text-3xl font-bold'>My Profile</h1>
				<p className='text-gray-500 dark:text-gray-400'>
					Manage your account settings and preferences
				</p>
			</div>
			<Button
				className='bg-[#0004E8] hover:bg-[#0004E8]/90 text-white cursor-pointer'
				onClick={onEdit}
			>
				<Edit2 className='h-4 w-4 mr-2' />
				Edit Profile
			</Button>
		</motion.div>
	)
}
