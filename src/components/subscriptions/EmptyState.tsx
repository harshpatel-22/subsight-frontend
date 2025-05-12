import { Card } from '@/components/ui/card'
import { Plus } from 'lucide-react'
import Link from 'next/link'
import { Button } from '../ui/button'

export default function EmptyState() {
	return (
		<Card className='text-center p-8 border-dashed'>
			<div className='mx-auto flex flex-col items-center justify-center space-y-4'>
				<div className='rounded-full bg-[#0004E8]/10 p-4'>
					<Plus className='h-8 w-8 text-[#0004E8]' />
				</div>
				<h3 className='text-lg font-medium text-gray-900'>
					No subscriptions yet
				</h3>
				<p className='text-sm text-gray-500'>
					Add your first subscription to get started
				</p>
				<Link href='/subscriptions/add' passHref>
					<Button className='cursor-pointer bg-[#0004E8] hover:bg-[#0004E8]/90 text-white'>
						<Plus className='mr-2 h-4 w-4' />
						Add Subscription
					</Button>
				</Link>
			</div>
		</Card>
	)
}
