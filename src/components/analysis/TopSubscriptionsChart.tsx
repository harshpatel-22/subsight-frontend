'use client'

import { useEffect, useState } from 'react'
import { Bar } from 'react-chartjs-2'
import {
	Chart as ChartJS,
	BarElement,
	CategoryScale,
	LinearScale,
	Tooltip,
	Legend,
	Title,
	ChartOptions,
	TooltipItem,
} from 'chart.js'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { axiosInstance } from '@/utils/axiosInstance'
import CardLoader from '../CardLoader'

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend, Title)

interface Subscription {
	name: string
	monthlyCost: number
}

interface TopSubscriptionsResponse {
	success: boolean
	data: Subscription[]
}

const TopSubscriptionsChart = () => {
	const [data, setData] = useState<Subscription[]>([])
	const [loading, setLoading] = useState(false)

	useEffect(() => {
		const fetchData = async () => {
			setLoading(true)
			try {
				const response =
					await axiosInstance.get<TopSubscriptionsResponse>(
						'/analytics/top-subscriptions'
					)
				if (response.data.success) {
					setData(response.data.data)
				}
			} catch (error) {
				console.error('Error fetching top subscriptions:', error)
			} finally {
				setLoading(false)
			}
		}

		fetchData()
	}, [])

    if (loading) {
		return (
			<CardLoader title='Top Subscriptions'/>
		)
	}

	if (!data.length) {
		return (
			<Card>
				<CardHeader>
					<CardTitle className='text-lg sm:text-xl'>
						Top Subscriptions
					</CardTitle>
				</CardHeader>
				<CardContent>
					<div className='text-center py-8 text-gray-500'>
						No data available
					</div>
				</CardContent>
			</Card>
		)
	}

	const currency = 'INR'

	const chartData = {
		labels: data.map((item) => item.name),
		datasets: [
			{
				label: 'Monthly Cost',
				data: data.map((item) => item.monthlyCost),
				backgroundColor: '#00B579',
				borderRadius: 4,
			},
		],
	}

	const chartOptions: ChartOptions<'bar'> = {
		responsive: true,
		maintainAspectRatio: false,
		plugins: {
			legend: {
				display: false,
			},
			title: {
				display: true,
				text: 'Top 5 Subscriptions by Monthly Cost',
				font: {
					size: window.innerWidth < 640 ? 14 : 16,
				},
				padding: {
					top: 10,
					bottom: window.innerWidth < 640 ? 20 : 20,
				},
			},
			tooltip: {
				callbacks: {
					label: (context: TooltipItem<'bar'>) => {
						const value = context.raw as number
						return new Intl.NumberFormat('en-IN', {
							style: 'currency',
							currency,
						}).format(value)
					},
				},
			},
		},
		scales: {
			x: {
				ticks: {
					font: {
						size: window.innerWidth < 640 ? 10 : 12,
					},
				},
			},
			y: {
				beginAtZero: true,
				ticks: {
					font: {
						size: window.innerWidth < 640 ? 10 : 12,
					},
					callback: (tickValue) => {
						const value =
							typeof tickValue === 'string'
								? parseFloat(tickValue)
								: tickValue
						return new Intl.NumberFormat('en-IN', {
							style: 'currency',
							currency,
							maximumFractionDigits: 0,
						}).format(value)
					},
				},
			},
		},
	}

	return (
		<Card className='w-full'>
			<CardHeader>
				<CardTitle className='text-lg sm:text-xl'>
					Top 5 Subscriptions
				</CardTitle>
			</CardHeader>
			<CardContent>
				<div className='h-[250px] sm:h-[350px] md:h-[400px] w-full'>
					<Bar data={chartData} options={chartOptions} />
				</div>
			</CardContent>
		</Card>
	)
}

export default TopSubscriptionsChart
