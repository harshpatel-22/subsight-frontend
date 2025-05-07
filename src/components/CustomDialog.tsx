import { Button } from './ui/button'
import { motion, AnimatePresence } from 'framer-motion'

function CustomDialog({
	open,
	onOpenChange,
	title,
	description,
	onCancel,
	onConfirm,
}: {
	open: boolean
	onOpenChange: (open: boolean) => void
	title: string
	description: string
	onCancel: () => void
	onConfirm: () => Promise<void> | void
}) {
	const handleConfirm = async () => {
		await onConfirm()
		onOpenChange(false)
	}

	const backdropVariants = {
		hidden: { opacity: 0 },
		visible: { opacity: 1 },
	}

	const modalVariants = {
		hidden: {
			opacity: 0,
			scale: 0.8,
			y: 20,
		},
		visible: {
			opacity: 1,
			scale: 1,
			y: 0,
			transition: {
				type: 'spring',
				stiffness: 300,
				damping: 25,
			},
		},
		exit: {
			opacity: 0,
			scale: 0.8,
			transition: {
				duration: 0.2,
			},
		},
	}

	return (
		<AnimatePresence>
			{open && (
				<div className='fixed inset-0 z-50 flex items-center justify-center'>
					<motion.div
						className='fixed inset-0 bg-gray-900/20 backdrop-blur-sm'
						onClick={() => onOpenChange(false)}
						initial='hidden'
						animate='visible'
						exit='hidden'
						variants={backdropVariants}
					/>
					<motion.div
						className='relative bg-white rounded-xl shadow-2xl max-w-md w-full mx-4 p-6'
						initial='hidden'
						animate='visible'
						exit='exit'
						variants={modalVariants}
					>
						<h2 className='text-lg font-semibold text-gray-900 tracking-wide'>
							{title}
						</h2>
						<p className='mt-2 text-sm text-gray-600'>
							{description}
						</p>
						<div className='mt-6 flex justify-end space-x-3'>
							<Button
								variant='outline'
								onClick={onCancel}
								className='text-gray-600 hover:text-gray-900 border-gray-300 hover:border-gray-400 tracking-wide'
							>
								Cancel
							</Button>
							<motion.div whileTap={{ scale: 0.95 }}>
								<Button
									className='bg-red-500 hover:bg-red-600 text-white tracking-wide'
									onClick={handleConfirm}
								>
									Delete
								</Button>
							</motion.div>
						</div>
					</motion.div>
				</div>
			)}
		</AnimatePresence>
	)
}

export default CustomDialog
