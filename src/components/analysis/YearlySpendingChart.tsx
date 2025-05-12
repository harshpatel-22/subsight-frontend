'use client'

import { useState, useEffect } from 'react'
import { Line } from 'react-chartjs-2'
import {
	Chart as ChartJS,
	Title,
	Tooltip,
	Legend,
	LineElement,
	CategoryScale,
	LinearScale,
	PointElement,
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

ChartJS.register(
	Title,
	Tooltip,
	Legend,
	LineElement,
	CategoryScale,
	LinearScale,
	PointElement
)

interface MonthlySpend {
	[key: string]: number
}

interface ResponseData {
	monthlySpend: MonthlySpend
	success: boolean
	total: number
	year: number
}

const YearlySpendingChart = () => {
	const currentYear = new Date().getFullYear()
	const [year, setYear] = useState<number>(currentYear)
	const [spendingData, setSpendingData] = useState<ResponseData>()
	const [loading, setLoading] = useState<boolean>(false)

	const currency = 'INR'

	useEffect(() => {
		const fetchData = async () => {
			setLoading(true)
			try {
				const response = await axiosInstance.get(`/analytics/yearly`, {
					params: { year },
				})
				setSpendingData(response.data)
			} catch (error) {
				console.error('Error fetching yearly data:', error)
			} finally {
				setLoading(false)
			}
		}
		fetchData()
	}, [year])

	if (loading) {
		return <CardLoader title='Yearly Spending' />
	}

	if (!spendingData || !spendingData.monthlySpend) {
		return (
			<Card>
				<CardHeader>
					<CardTitle>Yearly Spending</CardTitle>
				</CardHeader>
				<CardContent>
					<div className='text-center py-8 text-gray-500'>
						No data available for the selected year
					</div>
				</CardContent>
			</Card>
		)
    }
    
	const formattedTotal = new Intl.NumberFormat('en-IN', {
		style: 'currency',
		currency,
		maximumFractionDigits: 2,
    }).format(spendingData.total)
    
	const labels = [
		'Jan',
		'Feb',
		'Mar',
		'Apr',
		'May',
		'Jun',
		'Jul',
		'Aug',
		'Sep',
		'Oct',
		'Nov',
		'Dec',
	]

	const dataPoints = Array.from({ length: 12 }, (_, index) => {
		const monthIndex = (index + 1).toString()
		return spendingData.monthlySpend[monthIndex] || 0
	})

	const chartData = {
		labels,
		datasets: [
			{
				label: 'Total Spending',
				data: dataPoints,
				borderColor: '#3B82F6',
				backgroundColor: '#3B82F6',
				tension: 0.4,
				pointBackgroundColor: '#4A4DFF',
				pointRadius: window.innerWidth < 640 ? 3 : 5,
				pointHoverRadius: window.innerWidth < 640 ? 4 : 6,
				borderWidth: 2,
				fill: true,
			},
		],
	}

	const chartOptions: ChartOptions<'line'> = {
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
				text: `Yearly Spending - ${year}`,
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
					label: (context: TooltipItem<'line'>) => {
						const value = context.raw as number
						return new Intl.NumberFormat('en-IN', {
							style: 'currency',
							currency,
						}).format(value)
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
				grid: {
					display: false,
				},
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
						Yearly Spending
					</CardTitle>
					<div className='w-full sm:w-[150px]'>
						<Select
							value={year.toString()}
							onValueChange={(value) => setYear(Number(value))}
						>
							<SelectTrigger className='cursor-pointer '>
								<SelectValue placeholder='Select Year' />
							</SelectTrigger>
							<SelectContent>
								{Array.from(
									{ length: 10 },
									(_, i) => currentYear - 5 + i
								).map((y) => (
									<SelectItem key={y} value={y.toString()}>
										{y}
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
							{year}
						</p>
					</div>
				</div>
				<div className='h-[250px] sm:h-[350px] md:h-[400px] w-full'>
					<Line data={chartData} options={chartOptions} />
				</div>
			</CardContent>
		</Card>
	)
}

export default YearlySpendingChart
