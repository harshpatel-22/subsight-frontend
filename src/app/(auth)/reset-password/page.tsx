'use client'

import { Suspense } from 'react'
import Navbar from '@/components/Navbar'
import GradientBackgroundTop from '@/components/GradientBackgroundTop'
import GradientBackgroundBottom from '@/components/GradientBackgroundBottom'
import ResetPasswordForm from '@/components/ResetPasswordForm'

function ResetPasswordPage() {
	return (
		<div className='bg-white min-h-screen w-full flex flex-col'>
			<Navbar />
			<div className='relative isolate px-6 pt-14 lg:px-8 flex-grow'>
				<GradientBackgroundTop />
				<Suspense
					fallback={
						<div className='min-h-screen flex items-center justify-center'>
							Loading...
						</div>
					}
				>
					<ResetPasswordForm />
				</Suspense>
				<GradientBackgroundBottom />
			</div>
		</div>
	)
}

export default ResetPasswordPage
