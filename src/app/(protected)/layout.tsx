'use client'

import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '@/redux/store'
import { fetchUser } from '@/redux/thunks/authThunks'
import { axiosInstance } from '@/utils/axiosInstance'
import { toast } from 'sonner'
import ProtectedRoute from '@/components/ProtectedRoute'
import Sidebar from '@/components/layout/Sidebar'
import Header from '@/components/layout/Header'
import MainContent from '@/components/layout/MainContent'
import ChatWidget from '@/components/ChatWidget'

export default function DashboardLayout({
	children,
}: {
	children: React.ReactNode
}) {
	const [isSidebarOpen, setIsSidebarOpen] = useState(true)
	const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false)
	const dispatch = useDispatch<AppDispatch>()
	const { user } = useSelector((state: RootState) => state.auth)
	const [isYearlyPlan, setIsYearlyPlan] = useState(false)

	useEffect(() => {
		dispatch(fetchUser())
	}, [dispatch])

	useEffect(() => {
		if (user?.planType === 'yearly') {
			setIsYearlyPlan(true)
		}
	}, [user?.planType])

	const toggleSidebar = () => {
		setIsSidebarOpen((prev) => !prev)
	}

	const handleManagePlan = async () => {
		try {
			const res = await axiosInstance.post('/create-portal-session')
			window.location.href = res.data.url
		} catch (err) {
			console.error('Error redirecting to Stripe portal:', err)
			toast.error('Error redirecting to Stripe portal')
		}
	}

	return (
		<ProtectedRoute>
			<div className='flex h-screen bg-white'>
				<Sidebar
					isSidebarOpen={isSidebarOpen}
					mobileSidebarOpen={mobileSidebarOpen}
					toggleSidebar={toggleSidebar}
					setMobileSidebarOpen={setMobileSidebarOpen}
					isYearlyPlan={isYearlyPlan}
				/>
				<div className='flex-1 flex flex-col overflow-hidden'>
					<Header
						setMobileSidebarOpen={setMobileSidebarOpen}
						user={user}
						handleManagePlan={handleManagePlan}
					/>
					<MainContent>{children}</MainContent>
				</div>
			</div>
			<ChatWidget />
		</ProtectedRoute>
	)
}
