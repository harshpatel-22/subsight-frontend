'use client'

import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { axiosInstance } from '@/utils/axiosInstance'
import { AppDispatch, RootState } from '@/redux/store'
import { CategoryIcons } from '@/types/types'
import {
	Film,
	Music,
	ShoppingBag,
	Tv,
	Gamepad2,
	BookOpen,
	Home,
	Calendar,
	Plus,
	Briefcase,
	HeartPulse,
	Tag,
} from 'lucide-react'
import SubscriptionList from '@/components/subscriptions/SubscriptionList'
import EmptyState from '@/components/subscriptions/EmptyState'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'
import { fetchSubscriptions } from '@/redux/thunks/subscriptionThunks'

const categoryIcons: CategoryIcons = {
	entertainment: <Film className='w-4 h-4' />,
	work: <Briefcase className='w-4 h-4' />,
	shopping: <ShoppingBag className='w-4 h-4' />,
	utilities: <Home className='w-4 h-4' />,
	health: <HeartPulse className='w-4 h-4' />,
	education: <BookOpen className='w-4 h-4' />,
	streaming: <Tv className='w-4 h-4' />,
	music: <Music className='w-4 h-4' />,
	gaming: <Gamepad2 className='w-4 h-4' />,
	other: <Tag className='w-4 h-4' />,
	default: <Calendar className='w-4 h-4' />,
}

export default function SubscriptionsPage() {
	const dispatch = useDispatch<AppDispatch>()
	const { subscriptions, loading } = useSelector(
		(state: RootState) => state.subscriptions
	)


	useEffect(() => {
		dispatch(fetchSubscriptions())
	}, [dispatch])


	const handleDeleteSubscription = async (id: string) => {
		if (
			window.confirm('Are you sure you want to delete this subscription?')
		) {
			try {
				console.log('id', id)
				const deleteResponse = await axiosInstance.delete(
					`/subscriptions/${id}`
				)
                await dispatch(fetchSubscriptions())
                toast.success(deleteResponse.data.message)
			} catch (error) {
				console.error('Error deleting subscription:', error)
			}
		}
	}

	return (
		<div className='space-y-6'>
			<div className='flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4'>
				<div>
					<h2 className='text-2xl font-bold text-gray-900'>
						Your Subscriptions
					</h2>
					{subscriptions.length > 0 && (
						<p className='text-gray-500 mt-1'>
							Managing {subscriptions.length} subscription
							{subscriptions.length !== 1 ? 's' : ''}
						</p>
					)}
				</div>
				<Link href='/subscriptions/add' passHref>
					<Button className='bg-[#0004E8] hover:bg-[#0004E8]/90 text-white'>
						<Plus className='mr-2 h-4 w-4' />
						Add Subscription
					</Button>
				</Link>
			</div>

			{loading && (
				<div className='flex justify-center items-center h-40'>
					<div className='animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#0004E8]'></div>
				</div>
			)}

			{!loading && subscriptions.length > 0 ? (
				<>
					<SubscriptionList
						subscriptions={subscriptions}
						categoryIcons={categoryIcons}
						onDelete={handleDeleteSubscription}
					/>
				</>
			) : (
				!loading && <EmptyState />
			)}
		</div>
	)
}
