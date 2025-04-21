'use client'

import { useSelector } from 'react-redux'
import { useRouter } from 'next/navigation'
import { RootState } from '@/redux/store'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Label } from '@/components/ui/label'
import { Edit, Lock, Mail } from 'lucide-react'
import Overlay from '@/components/Overlay'

export default function ProfilePage() {
	const router = useRouter()
	const { user } = useSelector((state: RootState) => state.auth)
    
	return (
		<div className='container py-8 px-4 sm:px-6 lg:px-8'>
			<div className='max-w-3xl mx-auto space-y-8'>
				<div className='flex justify-between items-center'>
					<h1 className='text-2xl font-bold text-gray-900'>
						Profile
					</h1>
					<Button
						onClick={() => router.push('/profile/edit')}
						className='bg-[#0004E8] hover:bg-[#0004E8]/90'
					>
						<Edit className='mr-2 h-4 w-4' />
						Edit Profile
					</Button>
				</div>

				<div className='space-y-6'>
					<Card className='p-6 space-y-6'>
						<h2 className='text-xl font-semibold text-gray-900'>
							Personal Information
						</h2>

						<div className='flex justify-center'>
							<Avatar className='w-24 h-24 border-2 border-[#0004E8]/20'>
								{user?.profilePicture ? (
									<AvatarImage
										src={user.profilePicture}
                                        alt='Avatar'
									/>
								) : (
									<AvatarFallback className='bg-[#0004E8]/10 text-[#0004E8] text-3xl font-medium'>
										{user?.fullName
											?.charAt(0)
											.toUpperCase() || 'U'}
									</AvatarFallback>
								)}
							</Avatar>
						</div>

						<div className='space-y-2'>
							<Label className='text-gray-500'>Full Name</Label>
							<p className='text-lg font-medium text-gray-900'>
								{user?.fullName || 'Not provided'}
							</p>
						</div>

						<div className='space-y-2'>
							<Label className='text-gray-500'>Email</Label>
							<p className='text-lg font-medium text-gray-900'>
								{user?.email}
							</p>
						</div>

						<div className='space-y-2'>
							<Label className='text-gray-500'>Phone No.</Label>
							<p className='text-lg font-medium text-gray-900'>
								{user?.phoneNumber || 'Not provided'}
							</p>
						</div>
					</Card>

					
					<Card className='p-6 space-y-6 relative'>
						<h2 className='text-xl font-semibold text-gray-900'>
							Account Settings
						</h2>

						<div className='space-y-4 mt-6'>
							<Button
								variant='outline'
								className='w-full justify-start text-gray-700 hover:bg-gray-50'
								onClick={() =>
									!user?.isGoogleSignIn &&
									router.push(
										'/profile/change-password'
									)
								}
								disabled={user?.isGoogleSignIn}
							>
								<Lock className='mr-3 h-5 w-5 text-[#0004E8]' />
								<div className='text-left'>
									<p className='font-medium'>
										Change Password
									</p>
								</div>
							</Button>

							<Button
								variant='outline'
								className='w-full justify-start text-gray-700 hover:bg-gray-50'
								onClick={() =>
									!user?.isGoogleSignIn &&
									router.push(
										'/profile/change-email'
									)
								}
								disabled={user?.isGoogleSignIn}
							>
								<Mail className='mr-3 h-5 w-5 text-[#0004E8]' />
								<div className='text-left'>
									<p className='font-medium'>Change Email</p>
								</div>
							</Button>
						</div>

						{user?.isGoogleSignIn && (
							<Overlay/>
						)}
					</Card>
				</div>
			</div>
		</div>
	)
}
