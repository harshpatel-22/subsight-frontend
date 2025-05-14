import { Shield, Info } from 'lucide-react'

export default function DataPrivacyNotice() {
	return (
		<div className='flex items-start gap-3'>
			<div className='flex-shrink-0 p-1 bg-blue-100 rounded-full'>
				<Shield className='h-4 w-4 text-blue-600' />
			</div>
			<div>
				<p className='font-medium flex items-center gap-2'>
					Data Privacy Notice
				</p>
				<p className='mt-1.5 text-blue-700/90'>
					The exported file will contain all subscription records
					visible to your account. Please ensure you store this data
					securely.
				</p>
				<p className='mt-2 text-blue-600/80 text-xs flex items-center gap-1'>
					<Info className='h-3 w-3' />
					Files are generated on-demand and not stored on our servers
				</p>
			</div>
		</div>
	)
}
