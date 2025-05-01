import { Skeleton } from '@/components/ui/skeleton'

export default function SubscriptionsSkeleton() {
	return (
		<div className='space-y-6'>
			<div className='flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4'>
				<div>
					<Skeleton className='h-8 w-48' />
					<Skeleton className='h-4 w-64 mt-2' />
				</div>
				<Skeleton className='h-10 w-40' />
			</div>

			<div className='space-y-4'>
				{[...Array(5)].map((_, i) => (
					<div
						key={i}
						className='flex items-center justify-between p-4 border rounded-lg'
					>
						<div className='flex items-center space-x-4'>
							<Skeleton className='h-10 w-10 rounded-full' />
							<div className='space-y-2'>
								<Skeleton className='h-4 w-32' />
								<Skeleton className='h-3 w-24' />
							</div>
						</div>
						<div className='flex items-center space-x-4'>
							<Skeleton className='h-4 w-20' />
							<Skeleton className='h-10 w-10 rounded-md' />
						</div>
					</div>
				))}
			</div>
		</div>
	)
}
