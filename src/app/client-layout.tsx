'use client'

import { ReactNode } from 'react'
import ReduxProvider from '@/components/providers/ReduxProvider'

export default function ClientLayout({ children }: { children: ReactNode }) {
	return (
		<ReduxProvider>
			{children}
		</ReduxProvider>
	)
}
