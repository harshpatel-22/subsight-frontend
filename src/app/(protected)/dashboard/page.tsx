'use client'

import { useEffect, useState } from 'react'
import { Bar, Pie } from 'react-chartjs-2'
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	BarElement,
	ArcElement,
	Title,
	Tooltip,
	Legend,
} from 'chart.js'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import Link from 'next/link'
import { format } from 'date-fns'
import StatCard from '@/components/StatCard'

ChartJS.register(
	CategoryScale,
	LinearScale,
	BarElement,
	ArcElement,
	Title,
	Tooltip,
	Legend
)

type Subscription = {
	name: string
	amount: number
	currency: string
	startDate: string
	endDate: string
	billingCycle: number
	category: string
}

export default function DashboardPage() {
	const [subscriptions, setSubscriptions] = useState<Subscription[]>([])

	useEffect(() => {
		// Simulate fetching data
		const data: Subscription[] = [
			{
				name: 'Jio',
				amount: 149,
				currency: 'INR',
				startDate: '2025-03-27',
				endDate: '2025-04-27',
				billingCycle: 12,
				category: 'entertainment',
			},
			{
				name: 'Netflix',
				amount: 499,
				currency: 'INR',
				startDate: '2025-03-01',
				endDate: '2025-04-01',
				billingCycle: 1,
				category: 'entertainment',
			},
			{
				name: 'AWS',
				amount: 2300,
				currency: 'INR',
				startDate: '2025-03-10',
				endDate: '2025-06-10',
				billingCycle: 3,
				category: 'work',
			},
		]
		setSubscriptions(data)
	}, [])

	// 🧮 Derived Stats
	const totalSubscriptions = subscriptions.length
	const monthlyCost = subscriptions
		.map((s) => s.amount / s.billingCycle)
		.reduce((a, b) => a + b, 0)

	const avgPerSubscription =
		totalSubscriptions > 0 ? monthlyCost / totalSubscriptions : 0

	const upcomingRenewals = subscriptions.filter((sub) => {
		const today = new Date()
		const end = new Date(sub.endDate)
		const diff = (end.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
		return diff >= 0 && diff <= 7
	})

	// 📊 Bar Chart (Spending by Subscription)
	const barData = {
		labels: subscriptions.map((s) => s.name),
		datasets: [
			{
				label: 'Monthly Spending (INR)',
				data: subscriptions.map((s) => s.amount / s.billingCycle),
				backgroundColor: 'rgba(0, 4, 232, 0.2)',
				borderColor: 'rgba(0, 4, 232, 1)',
				borderWidth: 1,
			},
		],
	}

	const barOptions = {
		responsive: true,
		plugins: {
			legend: { position: 'top' as const },
			title: {
				display: true,
				text: 'Monthly Spending per Subscription',
			},
		},
	}

	// 🥧 Pie Chart (Spending by Category)
	const categoryTotals: Record<string, number> = {}
	subscriptions.forEach((s) => {
		const monthly = s.amount / s.billingCycle
		categoryTotals[s.category] = (categoryTotals[s.category] || 0) + monthly
	})

	const pieData = {
		labels: Object.keys(categoryTotals),
		datasets: [
			{
				label: 'Spending by Category',
				data: Object.values(categoryTotals),
				backgroundColor: [
					'#6366F1',
					'#10B981',
					'#F59E0B',
					'#EF4444',
					'#3B82F6',
					'#8B5CF6',
				],
				borderWidth: 1,
			},
		],
	}

	return (
		<div className='space-y-6'>
			{/* Header */}
			<div className='flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4'>
				<h2 className='text-2xl font-bold text-gray-900'>
					Dashboard Overview
				</h2>
				<Link href='/subscriptions/add'>
					<Button className='bg-[#0004E8] hover:bg-[#0004E8]/90 text-white'>
						<Plus className='mr-2 h-4 w-4' />
						Add Subscription
					</Button>
				</Link>
			</div>
			
			<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4'>
				<StatCard
					title='Total Subscriptions'
					value={totalSubscriptions.toString()}
				/>
				<StatCard
					title='Monthly Spend'
					value={`₹${monthlyCost.toFixed(2)}`}
				/>
				<StatCard
					title='Upcoming Renewals'
					value={upcomingRenewals.length.toString()}
				/>
				<StatCard
					title='Avg. per Subscription'
					value={`₹${avgPerSubscription.toFixed(2)}`}
				/>
			</div>

			{/* Upcoming Renewals */}
			{upcomingRenewals.length > 0 && (
				<div className='space-y-3'>
					<h3 className='text-xl font-semibold text-gray-900'>
						Upcoming Renewals
					</h3>
					<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
						{upcomingRenewals.map((sub, index) => (
							<div
								key={index}
								className='p-4 bg-white border rounded-lg shadow-sm'
							>
								<div className='flex justify-between'>
									<div>
										<h4 className='text-lg font-semibold'>
											{sub.name}
										</h4>
										<p className='text-sm text-gray-500'>
											Renews on{' '}
											{format(
												new Date(sub.endDate),
												'PPP'
											)}
										</p>
									</div>
									<div className='text-[#0004E8] font-bold'>
										₹{sub.amount}
									</div>
								</div>
							</div>
						))}
					</div>
				</div>
			)}

			{/* Analytics Charts */}
			<div className='grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6'>
				<div className='bg-white p-4 rounded-lg border shadow-sm'>
					<h3 className='text-lg font-semibold mb-2'>
						Monthly Spending
					</h3>
					<Bar data={barData} options={barOptions} />
				</div>
				<div className='bg-white p-4 rounded-lg border shadow-sm'>
					<h3 className='text-lg font-semibold mb-2'>
						Category-wise Spending
					</h3>
					<Pie data={pieData} />
				</div>
			</div>
		</div>
	)
}
