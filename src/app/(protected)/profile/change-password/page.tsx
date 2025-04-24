'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { axiosInstance } from '@/utils/axiosInstance'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { Lock } from 'lucide-react'
import  {AxiosError}  from 'axios'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '@/redux/store'
import { logout } from '@/redux/slices/authSlice'

export default function ChangePasswordPage() {
	const router = useRouter()
	const [currentPassword, setCurrentPassword] = useState('')
	const [newPassword, setNewPassword] = useState('')
	const [loading, setLoading] = useState(false)

    const dispatch = useDispatch<AppDispatch>()

	const handleChangePassword = async (e: React.FormEvent) => {
		e.preventDefault()
		if (!currentPassword || !newPassword) {
			toast.error('Both fields are required')
			return
		}

		setLoading(true)

		try {
			const response = await axiosInstance.patch('/user/update-password', {
				currentPassword,
				newPassword,
            })
            if (!response.data.success) {
               toast.error('Error updating password') 
            }
			toast.success(response.data.message)
			setCurrentPassword('')
            setNewPassword('')
            await axiosInstance.post('/auth/logout')
            dispatch(logout())
			router.replace('/login')
        } catch (error:unknown) {
 			if (error instanceof AxiosError) {
				const message =
					error.response?.data?.message || 'Something went wrong'
				toast.error(message)
			} else {
				toast.error('An unexpected error occurred')
			}
		} finally {
			setLoading(false)
		}
	}

	return (
		<div className='max-w-md mx-auto'>
			<Card className='shadow-sm border border-gray-200'>
				<CardHeader>
					<CardTitle className='text-xl font-semibold'>
						Change Password
					</CardTitle>
				</CardHeader>
				<CardContent>
					<form onSubmit={handleChangePassword} className='space-y-4'>
						<div className='relative'>
							<Lock
								className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500'
								size={18}
							/>
							<Input
								type='password'
								value={currentPassword}
								onChange={(e) => setCurrentPassword(e.target.value)}
								placeholder='Current Password'
								className='pl-10'
								required
							/>
						</div>
						<div className='relative'>
							<Lock
								className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500'
								size={18}
							/>
							<Input
								type='password'
								value={newPassword}
								onChange={(e) => setNewPassword(e.target.value)}
								placeholder='New Password'
								className='pl-10'
								required
							/>
						</div>
			
						<Button
							type='submit'
							className='mt-4 w-full text-white bg-[#0004E8] hover:bg-indigo-500 py-2.5 px-6 rounded-md'
							disabled={loading}
						>
							{loading ? 'Updating...' : 'Update Password'}
						</Button>
					</form>
				</CardContent>
			</Card>
		</div>
	)
}
