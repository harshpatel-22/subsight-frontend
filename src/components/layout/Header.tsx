import { Button } from '@/components/ui/button'
import UserMenu from '@/components/UserMenu'
import Link from 'next/link'
import { Menu } from 'lucide-react'
import { User } from '@/types/types'

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
					<div className='mt-1 relative inline-block p-0.5 overflow-hidden rounded-lg bg-gradient-to-r from-blue-400 via-blue-600 to-blue-800'>
						<Button
							onClick={handleManagePlan}
							className='cursor-pointer relative px-4 py-1 bg-white dark:bg-gray-900 rounded-md font-medium transition-all duration-300 ease-in-out hover:text-white text-blue-700 dark:text-white hover:bg-blue-700'
						>
							Manage Plan
						</Button>
					</div>
				) : (
					<Link href='/upgrade'>
						<div className='mt-1 relative inline-block p-0.5 overflow-hidden rounded-lg bg-gradient-to-r from-blue-400 via-blue-600 to-blue-800'>
							<Button className='cursor-pointer relative px-4 py-1 bg-white dark:bg-gray-900 rounded-md font-medium transition-all duration-300 ease-in-out hover:text-white text-blue-700 dark:text-white hover:bg-blue-700'>
								Upgrade
							</Button>
						</div>
					</Link>
				)}
				<UserMenu />
			</div>
		</header>
	)
}
