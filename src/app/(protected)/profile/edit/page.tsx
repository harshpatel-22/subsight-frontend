'use client'

import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/navigation'
import { RootState, AppDispatch } from '@/redux/store'
import { axiosInstance } from '@/utils/axiosInstance'
import { setLoading } from '@/redux/slices/authSlice'
import { toast } from 'sonner'
import { X, Check, Upload, ArrowLeft, UserCircle2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { fetchUser } from '@/redux/thunks/authThunks'
import { motion } from 'framer-motion'

const fadeIn = {
	initial: { opacity: 0, y: 20 },
	animate: { opacity: 1, y: 0 },
	transition: { duration: 0.4 },
}

const scaleUp = {
	initial: { scale: 0.95, opacity: 0 },
	animate: { scale: 1, opacity: 1 },
	transition: { duration: 0.3 },
}

export default function EditProfilePage() {
	const dispatch = useDispatch<AppDispatch>()
	const router = useRouter()
	const { user, loading } = useSelector((state: RootState) => state.auth)

	const [formData, setFormData] = useState({
		fullName: '',
		phoneNumber: '',
	})

	const [avatar, setAvatar] = useState<File | null>(null)
	const [avatarPreview, setAvatarPreview] = useState<string | null>(null)

	const [phoneNumberError, setPhoneNumberError] = useState<string | null>(
		null
	)

	//Update formData when user is available
	useEffect(() => {
		if (user) {
			setFormData({
				fullName: user.fullName || '',
				phoneNumber: user.phoneNumber || '',
			})
			setAvatarPreview(user.profilePicture || null)
		}
	}, [user])

	// Clean up object URLs
	useEffect(() => {
		return () => {
			if (avatarPreview && avatarPreview !== user?.profilePicture) {
				URL.revokeObjectURL(avatarPreview)
			}
		}
	}, [avatarPreview, user?.profilePicture])

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target
		setFormData((prev) => ({ ...prev, [name]: value }))
		if (name === 'phoneNumber') {
			setPhoneNumberError(null)
		}
	}

	const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0]
		if (file) {
			setAvatar(file)
			const previewUrl = URL.createObjectURL(file)
			setAvatarPreview(previewUrl)
		}
	}

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		if (!user) return

		if (
			formData.phoneNumber.length !== 10 &&
			formData.phoneNumber.length !== 0
		) {
			setPhoneNumberError('Phone number must be 10 digits')
			return
		}

		dispatch(setLoading(true))

		try {
			const formDataToSend = new FormData()
			formDataToSend.append('fullName', formData.fullName)
			formDataToSend.append('phoneNumber', formData.phoneNumber)

			if (avatar) {
				formDataToSend.append('avatar', avatar)
			}

			const response = await axiosInstance.patch(
				'/user/update-profile',
				formDataToSend,
				{
					headers: { 'Content-Type': 'multipart/form-data' },
				}
			)

			if (!response.data.success) {
				toast.error('Error updating profile')
				return
			}

			dispatch(fetchUser())
			toast.success('Profile updated successfully')
			router.push('/profile')
		} catch (err) {
			toast.error('Failed to update profile')
			console.error(err)
		} finally {
			dispatch(setLoading(false))
		}
	}

	return (
		<motion.div initial='initial' animate='animate'>
			<div className='max-w-4xl mx-auto'>
				<motion.div
					variants={fadeIn}
					className='flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-2'
				>
					<div className='flex items-center gap-3'>
						<Button
							variant='ghost'
							size='icon'
							onClick={() => router.back()}
							className='cursor-pointer hover:bg-white/50 dark:hover:bg-gray-800/50 rounded-full transition-colors -ml-2'
						>
							<ArrowLeft className='h-5 w-5' />
						</Button>
						<div>
							<h1 className='text-3xl font-bold'>Edit Profile</h1>
							<p className='text-gray-500 dark:text-gray-400'>
								Update your personal information
							</p>
						</div>
					</div>
				</motion.div>

				<motion.div
					variants={scaleUp}
					className='bg-white/95 dark:bg-gray-800/95 rounded-3xl shadow-xl shadow-blue-900/5 overflow-hidden'
				>
					<form onSubmit={handleSubmit} className='p-8'>
						<motion.div
							variants={fadeIn}
							className='flex flex-col items-center space-y-6 mb-8'
						>
							<div className='relative group'>
								<Avatar className='w-32 h-32 border-4 border-white dark:border-gray-800 shadow-xl rounded-full transition-transform group-hover:scale-105'>
									{avatarPreview ? (
										<AvatarImage
											src={avatarPreview}
											alt='Avatar Preview'
											className='object-cover'
										/>
									) : (
										<AvatarFallback className='bg-blue-50 text-blue-600 dark:bg-blue-950 dark:text-blue-400 text-4xl'>
											<UserCircle2 className='w-16 h-16' />
										</AvatarFallback>
									)}
								</Avatar>
								<Label
									htmlFor='avatar-upload'
									className='absolute bottom-0 right-0 p-2 bg-blue-600 text-white rounded-full cursor-pointer shadow-lg hover:bg-blue-700 transition-colors'
								>
									<Upload className='h-5 w-5' />
								</Label>
								<Input
									id='avatar-upload'
									type='file'
									accept='image/*'
									className='hidden'
									onChange={handleAvatarChange}
								/>
							</div>
							{avatar && (
								<motion.p
									initial={{ opacity: 0, y: 10 }}
									animate={{ opacity: 1, y: 0 }}
									className='text-sm text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 px-4 py-2 rounded-full'
								>
									New image selected
								</motion.p>
							)}
						</motion.div>

						<div className='grid grid-cols-1 md:grid-cols-2 gap-6 mb-8'>
							<motion.div variants={fadeIn} className='space-y-2'>
								<Label
									htmlFor='fullName'
									className='text-gray-600 dark:text-gray-400 ml-1'
								>
									Full Name
								</Label>
								<Input
									id='fullName'
									name='fullName'
									value={formData.fullName}
									onChange={handleInputChange}
									placeholder='Enter your full name'
									className='h-12 px-4 rounded-xl border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-blue-600 dark:focus:ring-blue-500 dark:bg-gray-800'
								/>
							</motion.div>

							<motion.div variants={fadeIn} className='space-y-2'>
								<Label
									htmlFor='phoneNumber'
									className='text-gray-600 dark:text-gray-400 ml-1'
								>
									Phone Number
								</Label>
								<Input
									id='phoneNumber'
									name='phoneNumber'
									value={formData.phoneNumber}
									onChange={handleInputChange}
									placeholder='Enter your phone number'
									type='tel'
									className={`h-12 px-4 rounded-xl border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-blue-600 dark:focus:ring-blue-500 dark:bg-gray-800 ${
										phoneNumberError ? 'ring-red-500' : ''
									}`}
								/>
								{phoneNumberError && (
									<p className='text-red-500 text-sm mt-1'>
										{phoneNumberError}
									</p>
								)}
							</motion.div>
						</div>

						<motion.div
							variants={fadeIn}
							className='flex flex-col sm:flex-row sm:justify-end gap-3'
						>
							<Button
								variant='outline'
								type='button'
								onClick={() => router.push('/profile')}
								className='cursor-pointer w-full sm:w-auto rounded-sm border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors'
							>
								<X className='mr-2 h-5 w-5' />
								Cancel
							</Button>
							<Button
								type='submit'
								disabled={loading}
								className='cursor-pointer w-full sm:w-auto rounded-sm bg-blue-600 hover:bg-blue-700 text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed'
							>
								<Check className='mr-2 h-5 w-5' />
								{loading ? 'Saving...' : 'Save Changes'}
							</Button>
						</motion.div>
					</form>
				</motion.div>
			</div>
		</motion.div>
	)
}
