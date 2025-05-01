'use client'

import { ReactNode } from 'react'
import ReduxProvider from '@/components/providers/ReduxProvider'
import { Toaster } from '@/components/ui/sonner'

export default function ClientLayout({ children }: { children: ReactNode }) {
	return (
		<ReduxProvider>
			{children}
			<Toaster />
		</ReduxProvider>
	)
}
