import { CategoryIcons, Subscription } from '@/types/types'

export const getCategoryIcon = (
	category: string | undefined,
	categoryIcons: CategoryIcons
) => {
	return categoryIcons[category?.toLowerCase() || ''] || categoryIcons.default
}

export const formatCurrency = (amount: number, currency = 'INR'): string => {
	return new Intl.NumberFormat('en-IN', {
		style: 'currency',
		currency,
		minimumFractionDigits: 0,
		maximumFractionDigits: 2,
	}).format(amount)
}

export const calculateNextBillingDate = (
	startDate: string,
	billingCycle: number,
	endDate?: string | undefined
): string => {
	const start = new Date(startDate)
	const end = endDate ? new Date(endDate) : null
	const today = new Date()

	if (end && end < today) {
		return formatDate(endDate || '')
	}

	const nextDate = new Date(start)
	while (nextDate <= today) {
		nextDate.setMonth(nextDate.getMonth() + billingCycle)
	}

	return formatDate(nextDate.toDateString())
}

export const calculateSubscriptionStatus = (
	startDate: string,
	billingCycle: number,
	endDate?: string | undefined
): { text: string; isExpired: boolean } => {
	const start = new Date(startDate)
	const end = endDate ? new Date(endDate) : null
	const today = new Date()

	//date in past showing expired
	if (end && end < today) {
		return {
			text: `Expired at ${formatDate(endDate || '')}`,
			isExpired: true,
		}
	}

	// end date calc
	const nextDate = new Date(start)
	while (nextDate <= today) {
		nextDate.setMonth(nextDate.getMonth() + billingCycle)
	}

	//time diff between today and next billing date
	const timeDiff = nextDate.getTime() - today.getTime()
	const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24))

	//to years , days , month
	let years = 0
	let months = 0
	let days = daysDiff

	if (days >= 365) {
		years = Math.floor(days / 365)
		days %= 365
	}

	if (days >= 30) {
		months = Math.floor(days / 30)
		days %= 30
	}

	//display text formatting
	let expiryText = 'Expires in '
	if (years > 0) {
		expiryText += `${years} ${years === 1 ? 'year' : 'years'} `
	}
	if (months > 0) {
		expiryText += `${months} ${months === 1 ? 'month' : 'months'} `
	}
	if (days > 0 || (years === 0 && months === 0)) {
		expiryText += `${days} ${days === 1 ? 'day' : 'days'}`
	}

	return {
		text: expiryText,
		isExpired: false,
	}
}

export const formatDate = (dateString: string): string => {
	return new Date(dateString).toLocaleDateString('en-US', {
		month: 'short',
		day: 'numeric',
		year: 'numeric',
	})
}


export const getRenewalStatus = (
	renewalMethod: Subscription['renewalMethod']
): string => {
	return renewalMethod === 'auto' ? 'Auto-renewal' : 'Manual renewal'
}

export const calculateTotalMonthly = (
	subscriptions: Subscription[]
): number => {
	return subscriptions.reduce(
		(acc, sub) => acc + sub.amount / sub.billingCycle,
		0
	)
}

export const calculateTotalAnnual = (subscriptions: Subscription[]): number => {
	return subscriptions.reduce(
		(acc, sub) => acc + sub.amount * (12 / sub.billingCycle),
		0
	)
}
