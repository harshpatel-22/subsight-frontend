'use client'

import { useEffect, useState, ReactNode } from 'react'
import { usePathname } from 'next/navigation'
import ReduxProvider from '@/components/providers/ReduxProvider'
import Loader from '@/components/Loader'

export default function ClientLayout({ children }: { children: ReactNode }) {
	const pathname = usePathname()
	const [loading, setLoading] = useState(false)

	useEffect(() => {
		setLoading(true)
		const timeout = setTimeout(() => setLoading(false), 300)
		return () => clearTimeout(timeout)
	}, [pathname])

	return (
		<ReduxProvider>
			{loading && <Loader />}
			{children}
		</ReduxProvider>
	)
}
