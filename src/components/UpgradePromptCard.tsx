import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { LockIcon } from 'lucide-react'

interface UpgradePromptCardProps {
	title: string
}

const UpgradePromptCard: React.FC<UpgradePromptCardProps> = ({ title }) => {
	return (
		<Card className='w-full border border-gray-200 shadow-md overflow-hidden'>
			<CardHeader>
				<CardTitle className='text-lg sm:text-xl font-bold text-gray-800'>
					{title}
				</CardTitle>
			</CardHeader>
			<CardContent className='p-0'>
				<div className='h-[300px] sm:h-[350px] md:h-[400px] w-full flex flex-col items-center justify-center p-6 text-center'>
					<div className='mb-4 text-[#6E70FF]'>
						<LockIcon size={48} />
					</div>
					<h3 className='text-gray-800 text-lg font-medium mb-2'>
						Premium Feature
					</h3>
					<p className='text-gray-600 mb-6 max-w-md'>
						Upgrade to Premium to reveal interactive chart.
					</p>
				</div>
			</CardContent>
		</Card>
	)
}

export default UpgradePromptCard
