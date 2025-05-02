import { Lock } from 'lucide-react'
import React from 'react'

const Overlay = () => {
	return (
		<>
			<div className='absolute inset-0 bg-[#0004E8]/10 backdrop-blur-[1px] rounded-2xl' />
			<div className='absolute inset-0 flex flex-col items-center justify-center p-4'>
				<div className='bg-white dark:bg-gray-800 p-3 rounded-full shadow-lg'>
					<Lock className='h-6 w-6 text-[#0004E8] dark:text-blue-400' />
				</div>
				<p className='mt-3 text-sm text-center text-[#0004E8] dark:text-blue-400 font-medium bg-white/90 dark:bg-gray-800/90 px-3 py-1.5 rounded-lg'>
					Managed by Google
				</p>
			</div>
		</>
	)
}

export default Overlay
