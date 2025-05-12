'use client'

import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '@/redux/store'
import { useEffect } from 'react'
import { fetchSubscriptions } from '@/redux/thunks/subscriptionThunks'
import {
	Download,
	FileText,
	FileSpreadsheet,
	Shield,
	ArrowRight,
	Info,
	FileX,
} from 'lucide-react'
import { saveAs } from 'file-saver'
import { toast } from 'sonner'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
	CardDescription,
	CardFooter,
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { axiosInstance } from '@/utils/axiosInstance'
import CardLoader from '@/components/CardLoader'
import SubscriptionErrorCard from '@/components/subscriptions/SubscriptionErrorCard'

export default function ExportDataPage() {
	const dispatch = useDispatch<AppDispatch>()
	const { subscriptions, loading, error } = useSelector(
		(state: RootState) => state.subscriptions
	)

	useEffect(() => {
		dispatch(fetchSubscriptions())
	}, [dispatch])

	const handleExportToCSV = async () => {
		try {
			toast.loading('Preparing your data...')

			const response = await axiosInstance.get(
				'/subscriptions/export-data',
				{
					responseType: 'blob',
				}
			)

			const blob = new Blob([response.data], {
				type: 'text/csv;charset=utf-8',
			})

			saveAs(
				blob,
				`subscriptions_${new Date().toISOString().split('T')[0]}.csv`
			)
			toast.dismiss()
			toast.success('Export completed successfully')
		} catch (error) {
			console.log(error)
			toast.dismiss()
			toast.error('Failed to export data. Please try again.')
		}
	}

	if (loading) {
		return <CardLoader />
	}

	if (error) {
		return <SubscriptionErrorCard error={error} />
	}

	const fileSize = subscriptions?.length
		? `${
				Math.round((JSON.stringify(subscriptions).length / 1024) * 10) /
				10
		  } KB`
		: '0 KB'

	return (
		<motion.div
			className='container max-w-4xl mx-auto py-8 px-4 sm:px-6'
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.4 }}
		>
			<Card className='overflow-hidden border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200'>
				<CardHeader className='border-b-1'>
					<div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4'>
						<div className='flex items-center gap-3'>
							<div className='p-2'>
								<Download className='w-5 h-5' />
							</div>
							<div>
								<CardTitle className='text-xl sm:text-2xl font-semibold text-gray-800'>
									Export Data
								</CardTitle>
								<CardDescription className='text-sm text-gray-500 mt-1'>
									Download your subscription records in
									various formats
								</CardDescription>
							</div>
						</div>
						<Badge
							variant='outline'
							className='bg-blue-50 text-blue-700 border-blue-200 px-3 py-1 text-sm'
						>
							{subscriptions?.length || 0}{' '}
							{subscriptions?.length === 1 ? 'Record' : 'Records'}{' '}
							Available
						</Badge>
					</div>
				</CardHeader>

				<CardContent className='pt-6 pb-0'>
					<div className='space-y-6'>
						<motion.div
							initial={{ opacity: 0, scale: 0.98 }}
							animate={{ opacity: 1, scale: 1 }}
							transition={{ delay: 0.2 }}
						>
							<Card className='border border-gray-200 hover:border-blue-300 hover:shadow-sm transition-all duration-200 cursor-pointer group'>
								<CardContent className='pt-6 pb-4'>
									<div className='flex items-start gap-4'>
										<div className='bg-blue-100 p-3 rounded-lg flex-shrink-0 group-hover:bg-blue-200 transition-colors'>
											<FileSpreadsheet className='h-7 w-7 text-blue-600' />
										</div>
										<div className='space-y-2'>
											<h3 className='font-semibold text-gray-900 text-lg'>
												CSV Format
											</h3>
											<p className='text-sm text-gray-600'>
												Compatible with Excel, Google
												Sheets, and most spreadsheet
												applications
											</p>
											<div className='flex items-center gap-2 text-xs text-gray-500 mt-2'>
												<FileText className='h-3 w-3 flex-shrink-0' />
												<span>Approx. {fileSize}</span>
												<span className='mx-1'>•</span>
												<span>
													Includes all visible fields
												</span>
											</div>
										</div>
									</div>
								</CardContent>
								<CardFooter className='border-t bg-gray-50/50 px-6 py-3 flex justify-end'>
									<Button
										onClick={handleExportToCSV}
										disabled={
											!subscriptions ||
											subscriptions.length === 0
										}
										size='sm'
										className='bg-[#0004E8] hover:bg-[#0004E8]/90 text-white cursor-pointer'
										variant={
											!subscriptions ||
											subscriptions.length === 0
												? 'ghost'
												: 'default'
										}
									>
										{!subscriptions ||
										subscriptions.length === 0 ? (
											<>
												<FileX className='h-4 w-4' />
												No data to export
											</>
										) : (
											<>
												Export CSV
												<ArrowRight className='h-4 w-4' />
											</>
										)}
									</Button>
								</CardFooter>
							</Card>
						</motion.div>

						<motion.div
							className='bg-blue-50/70 border border-blue-100 rounded-lg p-4 text-sm text-blue-700'
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							transition={{ delay: 0.4 }}
						>
							<div className='flex items-start gap-3'>
								<div className='flex-shrink-0 p-1 bg-blue-100 rounded-full'>
									<Shield className='h-4 w-4 text-blue-600' />
								</div>
								<div>
									<p className='font-medium flex items-center gap-2'>
										Data Privacy Notice
									</p>
									<p className='mt-1.5 text-blue-700/90'>
										The exported file will contain all
										subscription records visible to your
										account. Please ensure you store this
										data securely.
									</p>
									<p className='mt-2 text-blue-600/80 text-xs flex items-center gap-1'>
										<Info className='h-3 w-3' />
										Files are generated on-demand and not
										stored on our servers
									</p>
								</div>
							</div>
						</motion.div>
					</div>
				</CardContent>
			</Card>
		</motion.div>
	)
}
