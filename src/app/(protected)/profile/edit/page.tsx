'use client'

import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/navigation'
import { RootState, AppDispatch } from '@/redux/store'
import { axiosInstance } from '@/utils/axiosInstance'
import { setLoading, setUser } from '@/redux/authSlice'
import { toast } from 'sonner'
import { X, Check, Upload } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export default function EditProfilePage() {
	const dispatch = useDispatch<AppDispatch>()
	const router = useRouter()
	const { user, loading } = useSelector((state: RootState) => state.auth)

	const [formData, setFormData] = useState({
		fullName: user?.fullName || '',
		phoneNumber: user?.phoneNumber || '',
	})

	const [avatar, setAvatar] = useState<File | null>(null)
	const [avatarPreview, setAvatarPreview] = useState<string | null>(
		user?.profilePicture || null
	)

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target
		setFormData((prev) => ({ ...prev, [name]: value }))
	}

	const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0]
		if (file) {
			setAvatar(file)
			//for preview
			const previewUrl = URL.createObjectURL(file)
			setAvatarPreview(previewUrl)
		}
	}

	useEffect(() => {
		return () => {
			// Only revoke if it's different from user's profile picture
			if (avatarPreview && avatarPreview !== user?.profilePicture) {
				URL.revokeObjectURL(avatarPreview)
			}
		}
	}, [avatarPreview, user?.profilePicture])

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		if (!user) return

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

            console.log(response.data.user)
			dispatch(setUser(response.data.user))
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
		<div className='container py-8 px-4 sm:px-6 lg:px-8'>
			<div className='max-w-3xl mx-auto space-y-8'>
				<div className='flex justify-between items-center'>
					<h1 className='text-2xl font-bold text-gray-900'>
						Edit Profile
					</h1>
				</div>

				<Card className='p-6 sm:p-8'>
					<form onSubmit={handleSubmit} className='space-y-6'>
						<div className='flex flex-col items-center space-y-4'>
							<Avatar className='w-24 h-24 border-2 border-[#0004E8]/20'>
								{avatarPreview ? (
									<AvatarImage
										src={avatarPreview}
										alt='Avatar Preview'
									/>
								) : (
									<AvatarFallback className='bg-[#0004E8]/10 text-[#0004E8] text-3xl font-medium'>
										{formData.fullName
											?.charAt(0)
											.toUpperCase() || 'U'}
									</AvatarFallback>
								)}
							</Avatar>
							<div className='text-center'>
								<div className='flex flex-col sm:flex-row items-center justify-center gap-3'>
									<Label
										htmlFor='avatar-upload'
										className='cursor-pointer text-[#0004E8] hover:text-[#0004E8]/80 flex items-center justify-center'
									>
										<Upload className='mr-2 h-4 w-4' />
										Change Avatar
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
									<p className='text-sm text-gray-500 mt-2'>
										New image selected
									</p>
								)}
							</div>
						</div>

						<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
							<div className='space-y-2'>
								<Label
									htmlFor='fullName'
									className='text-gray-700'
								>
									Full Name
								</Label>
								<Input
									id='fullName'
									name='fullName'
									value={formData.fullName}
									onChange={handleInputChange}
									placeholder='Enter your full name'
								/>
							</div>

							<div className='space-y-2'>
								<Label
									htmlFor='phoneNumber'
									className='text-gray-700'
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
								/>
							</div>
						</div>

						<div className='flex flex-col sm:flex-row sm:justify-end space-y-3 sm:space-y-0 sm:space-x-3 pt-4'>
							<Button
								variant='outline'
								type='button'
								onClick={() =>
									router.push('/profile')
								}
								className='w-full sm:w-auto'
							>
								<X className='mr-2 h-4 w-4' />
								Cancel
							</Button>
							<Button
								type='submit'
								disabled={loading}
								className='w-full sm:w-auto bg-[#0004E8] hover:bg-[#0004E8]/90'
							>
								<Check className='mr-2 h-4 w-4' />
								{loading ? 'Saving...' : 'Save Changes'}
							</Button>
						</div>
					</form>
				</Card>
			</div>
		</div>
	)
}
