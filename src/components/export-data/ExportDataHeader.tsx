import { CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Download } from 'lucide-react'

interface ExportDataHeaderProps {
	length: number
}

export default function ExportDataHeader({
	length,
}: ExportDataHeaderProps) {
	return (
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
							Download your subscription records in various
							formats
						</CardDescription>
					</div>
				</div>
				<Badge
					variant='outline'
					className='bg-blue-50 text-blue-700 border-blue-200 px-3 py-1 text-sm'
				>
					{length || 0}{' '}
					{length === 1 ? 'Record' : 'Records'}{' '}
					Available
				</Badge>
			</div>
		</CardHeader>
	)
}
