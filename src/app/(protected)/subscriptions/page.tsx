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
import SubscriptionErrorCard from '@/components/subscriptions/SubscriptionErrorCard'

const categoryIcons: CategoryIcons = {
	entertainment: <Film className='w-4 h-4 text-blue-600' />,
	work: <Briefcase className='w-4 h-4 text-blue-600' />,
	shopping: <ShoppingBag className='w-4 h-4 text-blue-600' />,
	utilities: <Home className='w-4 h-4 text-blue-600' />,
	health: <HeartPulse className='w-4 h-4 text-blue-600' />,
	education: <BookOpen className='w-4 h-4 text-blue-600' />,
	streaming: <Tv className='w-4 h-4 text-blue-600' />,
	music: <Music className='w-4 h-4 text-blue-600' />,
	gaming: <Gamepad2 className='w-4 h-4 text-blue-600' />,
	other: <Tag className='w-4 h-4 text-blue-600' />,
	default: <Calendar className='w-4 h-4 text-blue-600' />,
}

export default function SubscriptionsPage() {
	const dispatch = useDispatch<AppDispatch>()
	const { subscriptions, loading, error } = useSelector(
		(state: RootState) => state.subscriptions
	)

	useEffect(() => {
		dispatch(fetchSubscriptions())
	}, [dispatch])

	const handleDeleteSubscription = async (id: string) => {
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

	if (error) {
		return <SubscriptionErrorCard error={error} />
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
					<Button className='bg-[#0004E8] hover:bg-[#0004E8]/90 text-white cursor-pointer'>
						<Plus className='mr-2 h-4 w-4' />
						Add Subscription
					</Button>
				</Link>
			</div>

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
