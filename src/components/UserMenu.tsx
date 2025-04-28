import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '@/redux/store'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { toast } from 'sonner'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover'
import { User2, LogOut } from 'lucide-react'
import { axiosInstance } from '@/utils/axiosInstance'
import { logout } from '@/redux/slices/authSlice'
import { cn } from '@/lib/utils'

export default function UserMenu() {
	const dispatch = useDispatch<AppDispatch>()
	const router = useRouter()
	const { user } = useSelector((state: RootState) => state.auth)

	const handleLogout = async () => {
		const response = await axiosInstance.post('/auth/logout')
		dispatch(logout())
		toast.success(response.data.message)
		router.push('/login')
	}

	return (
		<Popover>
			<PopoverTrigger asChild>
				<Button
					variant='ghost'
					className='p-0 rounded-full hover:bg-gray-100 focus-visible:ring-2 focus-visible:ring-[#0004E8]'
				>
					<Avatar
						className={cn(
							'h-9 w-9 border-2',
							user?.isPremium
								? 'border-blue-700 ring-2 ring-blue-200' // Premium styling
								: 'border-gray-200' // Regular styling
						)}
					>
						<AvatarImage
							src={user?.profilePicture}
							alt='User Avatar'
						/>
						<AvatarFallback className='bg-[#0004E8]/10 text-[#0004E8]'>
							{user?.fullName?.charAt(0).toUpperCase()}
						</AvatarFallback>
					</Avatar>
				</Button>
			</PopoverTrigger>
			<PopoverContent className='w-48 p-2' align='end'>
				<div className='space-y-1'>
					<Link
						href='/profile'
						className='w-full flex items-center px-3 py-2 text-sm rounded-md text-gray-700 hover:bg-gray-100'
					>
						<User2 className='mr-2 h-4 w-4' />
						<span>View Profile</span>
					</Link>
					<button
						onClick={handleLogout}
						className='w-full flex items-center px-3 py-2 text-sm rounded-md text-gray-700 hover:bg-gray-100'
					>
						<LogOut className='mr-2 h-4 w-4' />
						<span>Logout</span>
					</button>
				</div>
			</PopoverContent>
		</Popover>
	)
}
