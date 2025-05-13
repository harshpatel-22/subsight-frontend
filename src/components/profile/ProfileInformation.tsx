import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Label } from '@/components/ui/label'
import { motion } from 'framer-motion'
import { User2, Mail, Phone, Shield, Crown } from 'lucide-react'
import Image from 'next/image'
import { Badge } from '@/components/ui/badge'
import { User } from '@/types/types'

const scaleUp = {
	initial: { scale: 0.95, opacity: 0 },
	animate: { scale: 1, opacity: 1 },
	transition: { duration: 0.3 },
}

interface ProfileInformationProps {
	user: User | null
}

export default function ProfileInformation({ user }: ProfileInformationProps) {
	return (
		<motion.div
			variants={scaleUp}
			className='bg-white/95 dark:bg-gray-800/95 rounded-3xl shadow-xl shadow-blue-900/5 overflow-hidden'
		>
			<div className='relative h-48 bg-gradient-to-r from-blue-500/10 via-blue-400/5 to-blue-500/10 dark:from-blue-600/20 dark:to-blue-400/20'>
				<div className='absolute -bottom-16 left-8'>
					<Avatar className='w-32 h-32 border-4 border-white dark:border-gray-800 shadow-xl rounded-full'>
						{user?.profilePicture ? (
							<AvatarImage
								src={user.profilePicture}
								alt='Profile'
								className='object-cover'
							/>
						) : (
							<AvatarFallback className='bg-blue-50 text-blue-600 dark:bg-blue-950 dark:text-blue-400 text-4xl'>
								{user?.fullName?.charAt(0).toUpperCase() || '?'}
							</AvatarFallback>
						)}
					</Avatar>
				</div>
				<div className='absolute top-4 right-4 flex flex-col gap-2 items-end'>
					{user?.isGoogleSignIn && (
						<Badge className='bg-white/80 dark:bg-gray-800/80 text-blue-600 backdrop-blur-xl shadow-sm flex items-center gap-2 py-1.5 px-3'>
							<Image
								height={4}
								width={4}
								src='/google.svg'
								alt='Google'
								className='w-4 h-4'
							/>
							Google Account
						</Badge>
					)}
					{user?.isPremium && (
						<Badge className='bg-gradient-to-r from-amber-400 to-amber-600 text-white backdrop-blur-xl shadow-sm flex items-center gap-2 py-1.5 px-3'>
							<Crown className='w-4 h-4' />
							Premium Member
						</Badge>
					)}
				</div>
			</div>

			<div className='mt-20 p-8'>
				<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
					<motion.div
						variants={scaleUp}
						className='group p-4 rounded-2xl bg-blue-50/50 dark:bg-gray-800/50 hover:bg-white dark:hover:bg-gray-800/80 transition-all duration-300 hover:shadow-lg'
					>
						<div className='flex items-center gap-3 mb-2'>
							<div className='p-2.5 rounded-xl bg-blue-100 text-blue-600 dark:bg-blue-900/50 dark:text-blue-400 group-hover:scale-110 transition-transform'>
								<User2 className='w-5 h-5' />
							</div>
							<Label className='text-gray-500 dark:text-gray-400'>
								Full Name
							</Label>
						</div>
						<p className='text-lg font-semibold text-gray-900 dark:text-white pl-12'>
							{user?.fullName || 'Not provided'}
						</p>
					</motion.div>

					<motion.div
						variants={scaleUp}
						className='group p-4 rounded-2xl bg-blue-50/50 dark:bg-gray-800/50 hover:bg-white dark:hover:bg-gray-800/80 transition-all duration-300 hover:shadow-lg'
					>
						<div className='flex items-center gap-3 mb-2'>
							<div className='p-2.5 rounded-xl bg-blue-100 text-blue-600 dark:bg-blue-900/50 dark:text-blue-400 group-hover:scale-110 transition-transform'>
								<Mail className='w-5 h-5' />
							</div>
							<Label className='text-gray-500 dark:text-gray-400'>
								Email
							</Label>
						</div>
						<p
							className='text-lg font-semibold text-gray-900 dark:text-white pl-12 truncate'
							title={user?.email}
						>
							{user?.email}
						</p>
					</motion.div>

					<motion.div
						variants={scaleUp}
						className='group p-4 rounded-2xl bg-blue-50/50 dark:bg-gray-800/50 hover:bg-white dark:hover:bg-gray-800/80 transition-all duration-300 hover:shadow-lg'
					>
						<div className='flex items-center gap-3 mb-2'>
							<div className='p-2.5 rounded-xl bg-blue-100 text-blue-600 dark:bg-blue-900/50 dark:text-blue-400 group-hover:scale-110 transition-transform'>
								<Phone className='w-5 h-5' />
							</div>
							<Label className='text-gray-500 dark:text-gray-400'>
								Phone No.
							</Label>
						</div>
						<p className='text-lg font-semibold text-gray-900 dark:text-white pl-12'>
							{user?.phoneNumber || 'Not provided'}
						</p>
					</motion.div>

					<motion.div
						variants={scaleUp}
						className='group p-4 rounded-2xl bg-blue-50/50 dark:bg-gray-800/50 hover:bg-white dark:hover:bg-gray-800/80 transition-all duration-300 hover:shadow-lg'
					>
						<div className='flex items-center gap-3 mb-2'>
							<div className='p-2.5 rounded-xl bg-blue-100 text-blue-600 dark:bg-blue-900/50 dark:text-blue-400 group-hover:scale-110 transition-transform'>
								<Shield className='w-5 h-5' />
							</div>
							<Label className='text-gray-500 dark:text-gray-400'>
								Account Type
							</Label>
						</div>
						<p className='text-lg font-semibold text-gray-900 dark:text-white pl-12'>
							{user?.isGoogleSignIn
								? 'Google Account'
								: 'Email Account'}
						</p>
					</motion.div>
				</div>
			</div>
		</motion.div>
	)
}
