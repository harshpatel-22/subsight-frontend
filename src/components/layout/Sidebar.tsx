import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
	ChevronLeft,
	ChevronRight,
	User2,
	Menu,
	X,
	Clock,
	FileOutput,
	Lock,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import logo from '@/images/logo.svg'
import icon from '@/images/favicon.svg'
import { toast } from 'sonner'
import { SidebarProps } from '@/types/types'

export default function Sidebar({
	isSidebarOpen,
	mobileSidebarOpen,
	toggleSidebar,
	setMobileSidebarOpen,
	isYearlyPlan,
}: SidebarProps) {
	const pathname = usePathname()

	const handleClick = (
		e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
	) => {
		if (!isYearlyPlan) {
			e.preventDefault()
			toast.info(
				'Export Data feature is available for yearly plan subscribers'
			)
		}
	}

	return (
		<>
			{mobileSidebarOpen && (
				<div
					className='fixed inset-0 z-40 bg-black/50 lg:hidden'
					onClick={() => setMobileSidebarOpen(false)}
				/>
			)}
			<aside
				className={cn(
					'fixed lg:relative w-64 bg-white border-r transition-all duration-300 ease-in-out',
					'transform lg:translate-x-0 h-full',
					mobileSidebarOpen
						? 'translate-x-0 z-40'
						: '-translate-x-full',
					isSidebarOpen ? 'lg:w-64' : 'lg:w-20'
				)}
			>
				<div className='flex items-center justify-between p-4 border-b h-16'>
					{isSidebarOpen ? (
						<div className='text-lg font-semibold text-gray-900 whitespace-nowrap'>
                            <Image
                                priority
								alt='Company Logo'
								src={logo}
                                width={32}
								className='h-8 w-auto'
							/>
						</div>
					) : (
						<Image src={icon} height={20} width={20} alt='icon' />
					)}
					<button
						onClick={toggleSidebar}
						className='cursor-pointer hidden lg:flex items-center justify-center p-2 rounded-md text-gray-500 hover:bg-gray-100 hover:text-gray-700'
					>
						{isSidebarOpen ? (
							<ChevronLeft size={20} />
						) : (
							<ChevronRight size={20} />
						)}
					</button>
					<button
						onClick={() => setMobileSidebarOpen(false)}
						className='cursor-pointer lg:hidden p-2 rounded-md text-gray-500 hover:bg-gray-100'
					>
						<X size={20} />
					</button>
				</div>

				<nav className='space-y-1 mt-4 p-2'>
					<Link
						href='/dashboard'
						onClick={() => setMobileSidebarOpen(false)}
						className={cn(
							'flex items-center p-3 rounded-md text-gray-700 hover:bg-gray-100',
							'transition-colors duration-200',
							pathname === '/dashboard'
								? 'bg-[#0004E8]/10 text-[#0004E8] font-medium'
								: '',
							isSidebarOpen ? 'justify-start' : 'justify-center'
						)}
						title='Dashboard'
					>
						<Menu className='w-5 h-5' />
						{isSidebarOpen && (
							<span className='ml-3'>Dashboard</span>
						)}
					</Link>

					<Link
						href='/subscriptions'
						onClick={() => setMobileSidebarOpen(false)}
						className={cn(
							'flex items-center p-3 rounded-md text-gray-700 hover:bg-gray-100',
							'transition-colors duration-200',
							pathname === '/subscriptions'
								? 'bg-[#0004E8]/10 text-[#0004E8] font-medium'
								: '',
							isSidebarOpen ? 'justify-start' : 'justify-center'
						)}
						title='Subscriptions'
					>
						<Clock className='w-5 h-5' />
						{isSidebarOpen && (
							<span className='ml-3'>Subscriptions</span>
						)}
					</Link>
					<Link
						href='/export-data'
						onClick={(e) => {
							setMobileSidebarOpen(false)
							handleClick(e)
						}}
						className={cn(
							'flex items-center p-3 rounded-md',
							'transition-colors duration-200',
							pathname === '/export-data' && isYearlyPlan
								? 'bg-[#0004E8]/10 text-[#0004E8] font-medium'
								: 'text-gray-700 hover:bg-gray-100',
							isSidebarOpen ? 'justify-start' : 'justify-center',
							!isYearlyPlan ? 'opacity-60 cursor-not-allowed' : ''
						)}
						title={
							isYearlyPlan
								? 'Export Data'
								: 'Upgrade to yearly plan to access'
						}
					>
						<FileOutput className='w-5 h-5' />
						{isSidebarOpen && (
							<span className='ml-3 flex items-center'>
								Export Data
								{!isYearlyPlan && (
									<Lock className='w-3 h-3 ml-2' />
								)}
							</span>
						)}
					</Link>

					<Link
						href='/profile'
						onClick={() => setMobileSidebarOpen(false)}
						className={cn(
							'flex items-center p-3 rounded-md text-gray-700 hover:bg-gray-100',
							'transition-colors duration-200',
							pathname === '/profile'
								? 'bg-[#0004E8]/10 text-[#0004E8] font-medium'
								: '',
							isSidebarOpen ? 'justify-start' : 'justify-center'
						)}
						title='Profile'
					>
						<User2 className='w-5 h-5' />
						{isSidebarOpen && <span className='ml-3'>Profile</span>}
					</Link>
				</nav>
			</aside>
		</>
	)
}
