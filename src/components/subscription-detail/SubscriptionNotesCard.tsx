import { Card, CardHeader, CardContent } from '@/components/ui/card'

interface SubscriptionNotesCardProps {
	notes: string
}

export default function SubscriptionNotesCard({
	notes,
}: SubscriptionNotesCardProps) {
	return (
		<Card className='bg-white/95 dark:bg-gray-800/95 border-0 shadow-xl h-full'>
			<CardHeader className='border-b border-gray-100 dark:border-gray-700 pb-4 bg-white/95 dark:bg-gray-800/95'>
				<h2 className='text-xl font-semibold'>Notes</h2>
			</CardHeader>
			<CardContent className='p-6'>
				<p className='text-gray-600 dark:text-gray-300 whitespace-pre-line leading-relaxed'>
					{notes}
				</p>
			</CardContent>
		</Card>
	)
}
