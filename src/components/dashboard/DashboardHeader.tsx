import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import Link from 'next/link'

export default function DashboardHeader() {
	return (
		<motion.div
			className='flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4'
			initial={{ y: 20 }}
			animate={{ y: 0 }}
		>
			<motion.h2
				className='text-2xl font-bold text-gray-900'
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ delay: 0.3 }}
			>
				Dashboard Overview
			</motion.h2>
			<Link href='/subscriptions/add'>
				<Button className='bg-[#0004E8] hover:bg-[#0004E8]/90 text-white cursor-pointer'>
					<Plus className='mr-2 h-4 w-4' />
					Add Subscription
				</Button>
			</Link>
		</motion.div>
	)
}
