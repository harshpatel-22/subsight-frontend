'use client'

import { useSelector } from 'react-redux'
import { useRouter } from 'next/navigation'
import { RootState } from '@/redux/store'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Label } from '@/components/ui/label'
import {
	Edit2,
	Lock,
	Mail,
	User2,
	Phone,
	Shield,
	Calendar,
	Tag,
    Crown,
} from 'lucide-react'
import Overlay from '@/components/Overlay'
import { motion } from 'framer-motion'
import { Badge } from '@/components/ui/badge'
import Image from 'next/image'

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

const scaleUp = {
	initial: { scale: 0.95, opacity: 0 },
	animate: { scale: 1, opacity: 1 },
	transition: { duration: 0.3 },
}

export default function ProfilePage() {
	const router = useRouter()
	const { user } = useSelector((state: RootState) => state.auth)

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
			initial='initial'
			animate='animate'
			variants={stagger}
			className='min-h-[calc(100vh-8rem)]'
		>
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
					className='bg-[#0004E8] hover:bg-[#0004E8]/90 text-white'
					onClick={() => router.push('/profile/edit')}
				>
					<Edit2 className='h-4 w-4 mr-2' />
					Edit Profile
				</Button>
			</motion.div>

			<div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
				<motion.div variants={fadeIn} className='lg:col-span-2'>
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
											{user?.fullName
												?.charAt(0)
												.toUpperCase() || '?'}
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
				</motion.div>

				<motion.div variants={fadeIn} className='space-y-6'>
					{/* Subscription Status Card */}
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
										{user?.isPremium
											? 'Active'
											: 'Inactive'}
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
												{daysRemaining &&
													daysRemaining > 0 && (
														<p className='text-xs text-blue-600 dark:text-blue-400'>
															{daysRemaining} days
															remaining
														</p>
													)}
											</div>
										</div>
									</>
								)}

								{!user?.isPremium && (
									<div className='pt-2'>
										<Button
											className='w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white'
											onClick={() =>
												router.push('/upgrade')
											}
										>
											Upgrade to Premium
										</Button>
									</div>
								)}
							</div>
						</div>
					</motion.div>

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
									className='w-full justify-start text-gray-700 dark:text-gray-300 hover:bg-blue-50/50 dark:hover:bg-gray-800 group'
									onClick={() =>
										!user?.isGoogleSignIn &&
										router.push('/profile/change-password')
									}
									disabled={user?.isGoogleSignIn}
								>
									<Lock className='mr-3 h-5 w-5 text-blue-600 group-hover:scale-110 transition-transform' />
									<div className='text-left'>
										<p className='font-medium'>
											Change Password
										</p>
									</div>
								</Button>

								<Button
									variant='outline'
									className='w-full justify-start text-gray-700 dark:text-gray-300 hover:bg-blue-50/50 dark:hover:bg-gray-800 group'
									onClick={() =>
										!user?.isGoogleSignIn &&
										router.push('/profile/change-email')
									}
									disabled={user?.isGoogleSignIn}
								>
									<Mail className='mr-3 h-5 w-5 text-blue-600 group-hover:scale-110 transition-transform' />
									<div className='text-left'>
										<p className='font-medium'>
											Change Email
										</p>
									</div>
								</Button>
							</div>
							{user?.isGoogleSignIn && <Overlay />}
						</div>
					</motion.div>
				</motion.div>
			</div>
		</motion.div>
	)
}
