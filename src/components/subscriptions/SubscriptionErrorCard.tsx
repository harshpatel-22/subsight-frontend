/* eslint-disable @typescript-eslint/no-explicit-any */
import {
	Card,
	CardTitle,
	CardHeader,
	CardDescription,
	CardContent,
} from '../ui/card'

export default function SubscriptionErrorCard({ error }:any) {

	const getErrorMessage = (error: any): string => {
		if (!error) return 'An unknown error occurred.'
	
		if (error.message) {
			if (error.response?.status === 404) {
				return 'Subscription data not found. Please check your account or try again later.'
			}
			if (error.response?.status === 500) {
				return 'Our servers are having trouble. Please try again later.'
			}
			return error.message
		}

		return 'An unexpected error occurred while loading your subscription data.'
	}

	const errorMessage = getErrorMessage(error)

	return (
		<div className='container max-w-4xl mx-auto py-8'>
			<Card className='border-red-100 bg-red-50'>
				<CardHeader>
					<CardTitle className='text-red-600'>
						Something went wrong
					</CardTitle>
					<CardDescription>
						We encountered an error while loading your subscription
						data.
					</CardDescription>
				</CardHeader>
				<CardContent>
					<p className='text-red-600 text-sm font-mono bg-red-50 p-3 rounded border border-red-200'>
						{errorMessage}
					</p>
					<p className='text-sm text-gray-600 mt-2'>
						Please try refreshing the page or contact support if the
						issue persists.
					</p>
				</CardContent>
			</Card>
		</div>
	)
}
