'use client'

import { useEffect, useState } from 'react'
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
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import logo from '../../../public/logo.svg'
import icon from '../../../public/favicon.svg'
import UserMenu from '@/components/UserMenu'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '@/redux/store'
import { fetchUser } from '@/redux/thunks/authThunks'
import { axiosInstance } from '@/utils/axiosInstance'
import { toast } from 'sonner'
import GradientBackgroundTop from '@/components/GradientBackgroundTop'
import GradientBackgroundBottom from '@/components/GradientBackgroundBottom'
import ProtectedRoute from '@/components/ProtectedRoute'

export default function DashboardLayout({
	children,
}: {
	children: React.ReactNode
}) {
	const [isSidebarOpen, setIsSidebarOpen] = useState(true)
	const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false)
	const pathname = usePathname()
	const toggleSidebar = () => {
		setIsSidebarOpen((prev) => !prev)
	}

    const dispatch = useDispatch<AppDispatch>()
	useEffect(() => {
		dispatch(fetchUser())
	}, [dispatch])

    const { user } = useSelector((state: RootState) => state.auth)
    
	const handleManagePlan = async () => {
		try {
			const res = await axiosInstance.post(
				'/create-portal-session'
			)
			window.location.href = res.data.url
		} catch (err) {
			console.error('Error redirecting to Stripe portal:', err)
			toast.error('Error redirecting to Stripe portal')
		}
	}

	const [isYearlyPlan, setIsYearlyPlan] = useState(false)

	useEffect(() => {
		if (user?.planType === 'yearly') {
			setIsYearlyPlan(true)
		}
	}, [user?.planType])

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
		<ProtectedRoute>
			<div className='flex h-screen bg-white'>
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
									alt='Company Logo'
									src={logo}
									width={32}
									height={32}
									className='h-8 w-auto'
								/>
							</div>
						) : (
							<Image
								src={icon}
								height={20}
								width={20}
								alt='icon'
							/>
						)}
						<button
							onClick={toggleSidebar}
							className='hidden lg:flex items-center justify-center p-2 rounded-md text-gray-500 hover:bg-gray-100 hover:text-gray-700'
						>
							{isSidebarOpen ? (
								<ChevronLeft size={20} />
							) : (
								<ChevronRight size={20} />
							)}
						</button>
						<button
							onClick={() => setMobileSidebarOpen(false)}
							className='lg:hidden p-2 rounded-md text-gray-500 hover:bg-gray-100'
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
								isSidebarOpen
									? 'justify-start'
									: 'justify-center'
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
								isSidebarOpen
									? 'justify-start'
									: 'justify-center'
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
                                handleClick(e);
                             }}
							className={cn(
								'flex items-center p-3 rounded-md',
								'transition-colors duration-200',
								pathname === '/export-data' && isYearlyPlan
									? 'bg-[#0004E8]/10 text-[#0004E8] font-medium'
									: 'text-gray-700 hover:bg-gray-100',
								isSidebarOpen
									? 'justify-start'
									: 'justify-center',
								!isYearlyPlan
									? 'opacity-60 cursor-not-allowed'
									: ''
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
								isSidebarOpen
									? 'justify-start'
									: 'justify-center'
							)}
							title='Profile'
						>
							<User2 className='w-5 h-5' />
							{isSidebarOpen && (
								<span className='ml-3'>Profile</span>
							)}
						</Link>
					</nav>
				</aside>

				<div className='flex-1 flex flex-col overflow-hidden'>
					<header className='h-16 bg-white border-b flex items-center justify-between px-4 sm:px-6'>
						<div className='flex items-center'>
							<button
								onClick={() => setMobileSidebarOpen(true)}
								className='lg:hidden p-2 mr-2 rounded-md text-gray-500 hover:bg-gray-100'
							>
								<Menu size={20} />
							</button>
							<h1 className='text-xl font-semibold text-gray-900'></h1>
						</div>

						<div className='flex items-center space-x-4'>
							{user?.isPremium ? (
								<Button
									onClick={handleManagePlan}
									className='bg-blue-600 hover:bg-blue-700 transition-all duration-200 rounded-full gap-2 text-white'
								>
									Manage Plan
								</Button>
							) : (
								<Link href='/upgrade'>
									<Button className='bg-blue-600 hover:bg-blue-700 transition-all duration-200 rounded-full gap-2 text-white'>
										Upgrade
									</Button>
								</Link>
							)}

							<UserMenu />
						</div>
					</header>

					<main className='relative isolate flex-1 overflow-y-auto p-4 sm:p-6 bg-gray-50'>
						<GradientBackgroundTop />
						<div className='max-w-7xl mx-auto'>{children}</div>{' '}
						<GradientBackgroundBottom />
					</main>
				</div>
			</div>
		</ProtectedRoute>
	)
}
