import type { Metadata } from 'next'
import './globals.css'
import { ReactNode } from 'react'
import ClientLayout from './client-layout'
import { Toaster } from 'sonner'


export const metadata: Metadata = {
	title: 'SubSight',
	description:
		'SubSight is a subscription management app created by Harsh Patel. It helps users track and manage their online service subscriptions efficiently, providing reminders for renewals, analytics on spending, and easy subscription editing.',
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
