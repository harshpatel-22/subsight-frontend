'use client'

import { useState, useEffect } from 'react'
import { Bar } from 'react-chartjs-2'
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend,
} from 'chart.js'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import Link from 'next/link'

// Register the necessary Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

export default function DashboardPage() {
	const [subscriptions, setSubscriptions] = useState([
		'netflix',
		'joihostar',
		'prime',
	])

	// Fetch user's subscriptions data (replace with your data fetching logic)
	useEffect(() => {
		// Simulating fetching data from an API
		const fetchSubscriptions = async () => {
			const data = [
				{ name: 'Netflix', price: 15.99, renewalDate: '2025-05-01' },
				{ name: 'Spotify', price: 9.99, renewalDate: '2025-05-05' },
				{
					name: 'Amazon Prime',
					price: 12.99,
					renewalDate: '2025-06-10',
				},
			]
			setSubscriptions(data)
		}
		fetchSubscriptions()
	}, [])

	// Data for the spending chart
	const chartData = {
		labels: subscriptions.map((sub) => sub.name),
		datasets: [
			{
				label: 'Monthly Spending',
				data: subscriptions.map((sub) => sub.price),
				backgroundColor: 'rgba(0, 4, 232, 0.2)',
				borderColor: 'rgba(0, 4, 232, 1)',
				borderWidth: 1,
			},
		],
	}

	// Chart options
	const options = {
		responsive: true,
		plugins: {
			legend: {
				position: 'top' as const,
			},
			title: {
				display: true,
				text: 'Subscription Spending (Monthly)',
				font: {
					size: 16,
				},
			},
		},
		scales: {
			y: {
				beginAtZero: true,
				ticks: {
					callback: function (value) {
						return '$' + value
					},
				},
			},
		},
	}

	return (
        <div className='space-y-6'>
            
			{/* Header with Add Subscription Button */}
			<div className='flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4'>
				<h2 className='text-2xl font-bold text-gray-900'>
					Dashboard Overview
				</h2>
				<Link href='/dashboard/subscriptions/add' passHref>
					<Button className='bg-[#0004E8] hover:bg-[#0004E8]/90 text-white'>
						<Plus className='mr-2 h-4 w-4' />
						Add Subscription
					</Button>
				</Link>
			</div>

			{/* Stats Cards */}
			<div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
				<div className='bg-white p-4 rounded-lg border shadow-sm'>
					<h3 className='text-sm font-medium text-gray-500'>
						Total Subscriptions
					</h3>
					<p className='text-2xl font-bold text-gray-900 mt-1'>
						{subscriptions.length}
					</p>
				</div>
				<div className='bg-white p-4 rounded-lg border shadow-sm'>
					<h3 className='text-sm font-medium text-gray-500'>
						Monthly Cost
					</h3>
					<p className='text-2xl font-bold text-gray-900 mt-1'>
						$
						{subscriptions
							.reduce((sum, sub) => sum + sub.price, 0)
							.toFixed(2)}
					</p>
				</div>
			</div>

			{/* Subscriptions List */}
			<div className='space-y-4'>
				<div className='flex justify-between items-center'>
					<h3 className='text-xl font-semibold text-gray-900'>
						Your Subscriptions
					</h3>
					<Link
						href='/dashboard/subscriptions'
						className='text-sm text-[#0004E8] hover:underline'
					>
						View All
					</Link>
				</div>

				{subscriptions.length > 0 ? (
					<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
						{subscriptions.slice(0, 3).map((sub, index) => (
							<div
								key={index}
								className='p-4 bg-white border rounded-lg shadow-sm hover:shadow-md transition-shadow'
							>
								<div className='flex justify-between items-start'>
									<div>
										<div className='text-lg font-semibold text-gray-900'>
											{/* {sub.name} */}
											Netflix
										</div>
										<div className='text-sm text-gray-500 mt-1'>
											{/* Renews on {new Date(sub.renewalDate).toLocaleDateString()} */}
											Renews on 1/1/2024
										</div>
									</div>
									<div className='text-lg font-bold text-[#0004E8]'>
										{/* ${sub.price.toFixed(2)} */} ₹129
									</div>
								</div>
								<div className='mt-4 pt-4 border-t'>
									<Button
										variant='outline'
										className='w-full text-[#0004E8] border-[#0004E8] hover:bg-[#0004E8]/10'
									>
										Manage
									</Button>
								</div>
							</div>
						))}
					</div>
				) : (
					<div className='bg-white p-8 rounded-lg border border-dashed text-center'>
						<p className='text-gray-500 mb-4'>
							No subscriptions found
						</p>
						<Link href='/dashboard/subscriptions/add' passHref>
							<Button className='bg-[#0004E8] hover:bg-[#0004E8]/90 text-white'>
								<Plus className='mr-2 h-4 w-4' />
								Add Your First Subscription
							</Button>
						</Link>
					</div>
				)}
			</div>

			{/* Analytics Chart */}
			<div className='mt-6'>
				<h3 className='text-xl font-semibold text-gray-900 mb-4'>
					Spending Analytics
				</h3>
				<div className='bg-white p-4 rounded-lg border shadow-sm'>
					<Bar data={chartData} options={options} />
				</div>
			</div>
		</div>
	)
}
