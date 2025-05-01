import { Skeleton } from '@/components/ui/skeleton'

export default function DashboardSkeleton() {
	return (
		<div className='space-y-6'>
			<div className='flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4'>
				<Skeleton className='h-8 w-48' />
				<Skeleton className='h-10 w-40' />
			</div>

			<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4'>
				{[...Array(4)].map((_, i) => (
					<Skeleton key={i} className='h-24 rounded-lg' />
				))}
			</div>

			<div className='space-y-3'>
				<Skeleton className='h-7 w-48' />
				<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
					{[...Array(3)].map((_, i) => (
						<Skeleton key={i} className='h-32 rounded-lg' />
					))}
				</div>
			</div>

			<div className='grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6'>
				{[...Array(4)].map((_, i) => (
					<Skeleton key={i} className='h-96 rounded-lg' />
				))}
			</div>
		</div>
	)
}
