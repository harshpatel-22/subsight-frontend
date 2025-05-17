import type { Metadata } from 'next'
import './globals.css'
import { ReactNode } from 'react'
import ClientLayout from './client-layout'
import { Toaster } from 'sonner'


export const metadata: Metadata = {
	title: 'SubSight',
	description: 'Created by Harsh Patel',
	icons: {
		icon: '/favicon.svg',
	},
}

export default function RootLayout({ children }: { children: ReactNode }) {
	return (
		<html lang='en'>
			<body>
				<ClientLayout>
					{children}
					<Toaster />
				</ClientLayout>
			</body>
		</html>
	)
}
