'use client'

import { useState, useEffect } from 'react'
import { Bar } from 'react-chartjs-2'
import {
	Chart as ChartJS,
	Title,
	Tooltip,
	Legend,
	BarElement,
	CategoryScale,
	LinearScale,
	TooltipItem,
	ChartOptions,
} from 'chart.js'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select'
import { axiosInstance } from '@/utils/axiosInstance'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import CardLoader from '../CardLoader'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

interface SpendingData {
	data: { [category: string]: number }
	success: boolean
	total: number
}

const MonthlySpendingChart = () => {
	const currentDate = new Date()
	const [month, setMonth] = useState<number>(currentDate.getMonth() + 1)
	const [year, setYear] = useState<number>(currentDate.getFullYear())
	const [spendingData, setSpendingData] = useState<SpendingData | null>(null)
	const [loading, setLoading] = useState<boolean>(false)

	const currency = 'INR'

	useEffect(() => {
		const fetchData = async () => {
			setLoading(true)
			try {
				const response = await axiosInstance.get(`/analytics/monthly`, {
					params: {
						month: month,
						year: year,
					},
				})
				setSpendingData(response.data)
			} catch (error) {
				console.error('Error fetching data:', error)
			} finally {
				setLoading(false)
			}
		}

		fetchData()
	}, [month, year])

	if (loading) {
		return <CardLoader title='Monthly Spending' />
	}

	if (!spendingData) {
		return (
			<Card>
				<CardHeader>
					<CardTitle>Monthly Spending</CardTitle>
				</CardHeader>
				<CardContent>
					<div className='text-center py-8 text-gray-500'>
						No data available for the selected period
					</div>
				</CardContent>
			</Card>
		)
	}

	const monthName = new Date(year, month - 1).toLocaleString('en', {
		month: 'long',
    })
    
	const formattedTotal = new Intl.NumberFormat('en-IN', {
		style: 'currency',
		currency,
		maximumFractionDigits: 2,
    }).format(spendingData.total)
    
	const categories = Object.keys(spendingData.data)
	const amounts = categories.map((category) => spendingData.data[category])

	const chartData = {
		labels: categories,
		datasets: [
			{
				label: `Spending by Category`,
				data: amounts,
				backgroundColor: ['#6E70FF'].slice(0, categories.length),
				borderRadius: 4,
			},
		],
	}

	const chartOptions: ChartOptions<'bar'> = {
		responsive: true,
		maintainAspectRatio: false,
		plugins: {
			legend: {
				position: 'top',
				labels: {
					boxWidth: 12,
					padding: 20,
					font: {
						size: window.innerWidth < 640 ? 10 : 12,
					},
				},
			},
			title: {
				display: true,
				text: `Monthly Spending - ${monthName} ${year}`,
				font: {
					size: window.innerWidth < 640 ? 14 : 16,
				},
				padding: {
					top: 10,
					bottom: 20,
				},
			},
			tooltip: {
				callbacks: {
					label: (context: TooltipItem<'bar'>) => {
						const label = context.dataset.label || ''
						const value = context.raw as number
						return `${label}: ${new Intl.NumberFormat('en-IN', {
							style: 'currency',
							currency,
						}).format(value)}`
					},
				},
				titleFont: {
					size: 12,
				},
				bodyFont: {
					size: 12,
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
					callback: (tickValue: string | number) => {
						const value =
							typeof tickValue === 'string'
								? parseFloat(tickValue)
								: tickValue
						if (isNaN(value)) return ''
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
				<div className='flex flex-col md:flex-row md:items-center md:justify-between gap-4'>
					<CardTitle className='text-lg sm:text-xl'>
						Monthly Spending
					</CardTitle>
					<div className='flex flex-col sm:flex-row gap-2 w-full sm:w-auto'>
						<Select
							value={month.toString()}
							onValueChange={(value) => setMonth(Number(value))}
						>
							<SelectTrigger className='cursor-pointer w-full sm:w-[150px]'>
								<SelectValue placeholder='Select Month' />
							</SelectTrigger>
							<SelectContent>
								{[...Array(12)].map((_, index) => (
									<SelectItem
										key={index}
										value={(index + 1).toString()}
									>
										{new Date(0, index).toLocaleString(
											'en',
											{ month: 'short' }
										)}
									</SelectItem>
								))}
							</SelectContent>
						</Select>
						<Select
							value={year.toString()}
							onValueChange={(value) => setYear(Number(value))}
						>
							<SelectTrigger className='cursor-pointer w-full sm:w-[120px]'>
								<SelectValue placeholder='Select Year' />
							</SelectTrigger>
							<SelectContent>
								{Array.from(
									{ length: 10 },
									(_, index) =>
										currentDate.getFullYear() - 5 + index
								).map((yearOption) => (
									<SelectItem
										key={yearOption}
										value={yearOption.toString()}
									>
										{yearOption}
									</SelectItem>
								))}
							</SelectContent>
						</Select>
					</div>
				</div>
			</CardHeader>
			<CardContent>
				<div className='mb-4 p-3 sm:p-4 bg-gray-50 rounded-lg'>
					<div className='flex flex-col sm:flex-row justify-between items-start sm:items-center gap-1 sm:gap-2'>
						<div>
							<h3 className='text-xs sm:text-sm font-medium text-gray-500'>
								Total Spending
							</h3>
							<p className='text-xl sm:text-2xl font-semibold'>
								{formattedTotal}
							</p>
						</div>
						<p className='text-xs sm:text-sm text-gray-500'>
							{monthName} {year}
						</p>
					</div>
				</div>

				<div className='h-[250px] sm:h-[350px] md:h-[400px] w-full'>
					<Bar data={chartData} options={chartOptions} />
				</div>
			</CardContent>
		</Card>
	)
}

export default MonthlySpendingChart
