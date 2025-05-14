import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { FileSpreadsheet, FileText, FileX, ArrowRight } from 'lucide-react'
import { saveAs } from 'file-saver'
import { toast } from 'sonner'
import { axiosInstance } from '@/utils/axiosInstance'
import { Subscription } from '@/types/types'

interface ExportDataCardProps {
    subscriptions: Subscription[]
    fileSize: string
}
export default function ExportDataCard({ subscriptions, fileSize }:ExportDataCardProps) {
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

	return (
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
							Compatible with Excel, Google Sheets, and most
							spreadsheet applications
						</p>
						<div className='flex items-center gap-2 text-xs text-gray-500 mt-2'>
							<FileText className='h-3 w-3 flex-shrink-0' />
							<span>Approx. {fileSize}</span>
							<span className='mx-1'>•</span>
							<span>Includes all visible fields</span>
						</div>
					</div>
				</div>
			</CardContent>
			<CardFooter className='border-t bg-gray-50/50 px-6 py-3 flex justify-end'>
				<Button
					onClick={handleExportToCSV}
					disabled={!subscriptions || subscriptions.length === 0}
					size='sm'
					className='bg-[#0004E8] hover:bg-[#0004E8]/90 text-white cursor-pointer'
					variant={
						!subscriptions || subscriptions.length === 0
							? 'ghost'
							: 'default'
					}
				>
					{!subscriptions || subscriptions.length === 0 ? (
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
	)
}
