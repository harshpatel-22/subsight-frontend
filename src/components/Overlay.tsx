import { Lock } from 'lucide-react'
import React from 'react'

const Overlay = () => {
  return (
		<>
			<div className='mb-0 absolute inset-0 bg-[#0004E8]/10 backdrop-blur-[1px] rounded-lg' />
			<div className='absolute inset-0 flex flex-col items-center justify-center'>
				<div className='bg-white p-4 rounded-full shadow-lg'>
					<Lock className='h-7 w-7 text-[#0004E8]' />
				</div>
				<p className='mt-4 text-sm text-center text-[#0004E8] font-medium bg-white/80 px-3 py-1 rounded-md'>
					Managed by Google
				</p>
			</div>
		</>
  )
}

export default Overlay
