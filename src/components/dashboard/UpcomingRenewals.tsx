import { motion } from 'framer-motion'
import { format } from 'date-fns'
import { formatCurrency } from '@/utils/subscriptionUtils'
import { UpcomingRenewalsProps } from '@/types/types'

export default function UpcomingRenewals({ renewals }: UpcomingRenewalsProps) {
	return (
		<motion.div
			className='space-y-3'
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{ delay: 0.2 }}
		>
			<h3 className='text-xl font-semibold text-gray-900'>
				Upcoming Renewals
			</h3>
			<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
				{renewals.map((sub, index) => (
					<motion.div
						key={index}
						className='p-4 bg-white border rounded-lg shadow-sm'
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 0.2 }}
					>
						<div className='flex justify-between'>
							<div>
								<h4 className='text-lg font-semibold'>
									{sub.name}
								</h4>
								<p className='text-sm text-gray-500'>
									Renews on{' '}
									{format(new Date(sub.endDate), 'PPP')}
								</p>
							</div>
							<div className='text-[#0004E8] font-bold'>
								{formatCurrency(sub.amount, sub.currency)}
							</div>
						</div>
					</motion.div>
				))}
			</div>
		</motion.div>
	)
}
