import UserMenu from '@/components/UserMenu'
import Link from 'next/link'
import { Menu } from 'lucide-react'
import { User } from '@/types/types'
import Notification from '../Notification'

interface HeaderProps {
	setMobileSidebarOpen: (open: boolean) => void
	user: User | null
	handleManagePlan: () => void
}

export default function Header({
	setMobileSidebarOpen,
	user,
	handleManagePlan,
}: HeaderProps) {
	return (
		<header className='h-16 bg-white border-b flex items-center justify-between px-4 sm:px-6'>
			<div className='flex items-center'>
				<button
					onClick={() => setMobileSidebarOpen(true)}
					className='cursor-pointer lg:hidden p-2 mr-2 rounded-md text-gray-500 hover:bg-gray-100'
				>
					<Menu size={20} />
				</button>
				<h1 className='text-xl font-semibold text-gray-900'></h1>
			</div>

			<div className='flex items-center justify-center space-x-4'>
				{user?.isPremium ? (
					<button
						className='p-[3px] relative'
						onClick={handleManagePlan}
					>
						<div className='absolute inset-0 bg-gradient-to-r from-[#181DEA] to-blue-700 rounded-lg' />
						<div className='px-4 py-1 text-sm text-black bg-white rounded-[5px]  relative group transition duration-200 hover:text-white hover:bg-transparent'>
							Manage Plan
						</div>
					</button>
				) : (
					<Link href='/upgrade'>
						<button className='p-[3px] relative'>
							<div className='absolute inset-0 bg-gradient-to-r from-[#181DEA] to-blue-700 rounded-lg' />
							<div className='px-4 py-1 text-sm text-black bg-white rounded-[5px]  relative group transition duration-200 hover:text-white hover:bg-transparent'>
								Upgrade
							</div>
						</button>
					</Link>
                )}
                <Notification />
				<UserMenu />
			</div>
		</header>
	)
}
