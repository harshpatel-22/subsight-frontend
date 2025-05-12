'use client'

import { useState, useEffect } from 'react'
import { Pie } from 'react-chartjs-2'
import {
	Chart as ChartJS,
	ArcElement,
	Tooltip,
	Legend,
	Title,
	TooltipItem,
	ChartOptions,
} from 'chart.js'
import { axiosInstance } from '@/utils/axiosInstance'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import CardLoader from '../CardLoader'
import { useSelector } from 'react-redux'
import { RootState } from '@/redux/store'
import UpgradePromptCard from '../UpgradePromptCard'

ChartJS.register(ArcElement, Tooltip, Legend, Title)

interface CategoryData {
	[key: string]: number
}

const CategoryWiseSpendingChart = () => {
	const [categoryData, setCategoryData] = useState<CategoryData | null>(null)
	const [loading, setLoading] = useState<boolean>(false)
	const { user } = useSelector((state: RootState) => state.auth)
	const currency = 'INR'

	useEffect(() => {
		const fetchCategoryData = async () => {
			setLoading(true)
			try {
				const response = await axiosInstance.get('/analytics/category')
				setCategoryData(response.data.data)
			} catch (error) {
				console.error('Error fetching category data:', error)
			} finally {
				setLoading(false)
			}
		}
		fetchCategoryData()
	}, [])

	if (loading) {
		return <CardLoader title='Category-Wise Spending' />
	}

	if (!categoryData || Object.keys(categoryData).length === 0) {
		return (
			<Card>
				<CardHeader>
					<CardTitle className='text-lg sm:text-xl'>
						Category-wise Spending
					</CardTitle>
				</CardHeader>
				<CardContent>
					<div className='text-center py-8 text-gray-500'>
						No category-wise spending data available
					</div>
				</CardContent>
			</Card>
		)
	}

	const chartData = {
		labels: Object.keys(categoryData),
		datasets: [
			{
				label: 'Spending by Category',
				data: Object.values(categoryData),
				backgroundColor: [
					'#6366F1',
					'#10B981',
					'#F59E0B',
					'#EF4444',
					'#3B82F6',
					'#8B5CF6',
					'#EC4899',
					'#14B8A6',
					'#F97316',
					'#64748B',
				].slice(0, Object.keys(categoryData).length),
				borderWidth: 1,
			},
		],
	}

	const chartOptions: ChartOptions<'pie'> = {
		responsive: true,
		maintainAspectRatio: false,
		plugins: {
			legend: {
				position: window.innerWidth < 640 ? 'top' : 'right',
				labels: {
					boxWidth: 12,
					padding: window.innerWidth < 640 ? 10 : 20,
					font: {
						size: window.innerWidth < 640 ? 10 : 12,
					},
					usePointStyle: true,
				},
			},
			tooltip: {
				callbacks: {
					label: (context: TooltipItem<'pie'>) => {
						const label = context.label || ''
						const value = context.raw as number
						const total = context.dataset.data.reduce(
							(a: number, b: number) => a + b,
							0
						)
						const percentage = Math.round((value / total) * 100)
						return `${label}: ${new Intl.NumberFormat('en-IN', {
							style: 'currency',
							currency,
						}).format(value)} (${percentage}%)`
					},
				},
				bodyFont: {
					size: 12,
				},
			},
		},
	}

	if (!user?.isPremium) {
		return (
			<UpgradePromptCard title='Category-wise Spending' />
		)
    }
    
	return (
		<Card className='w-full'>
			<CardHeader>
				<CardTitle className='text-lg sm:text-xl'>
					Category-wise Spending
				</CardTitle>
			</CardHeader>
			<CardContent>
				<div className='h-[300px] sm:h-[350px] md:h-[400px] w-full'>
					<Pie data={chartData} options={chartOptions} />
				</div>
			</CardContent>
		</Card>
	)
}

export default CategoryWiseSpendingChart
