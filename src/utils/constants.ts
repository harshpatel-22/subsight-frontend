import { Dropdown } from '@/types/types'


export const currencies: Dropdown = [
	{ value: 'INR', label: 'INR (₹)' },
	{ value: 'USD', label: 'USD ($)' },
	{ value: 'EUR', label: 'EUR (€)' },
	{ value: 'GBP', label: 'GBP (£)' },
	{ value: 'JPY', label: 'JPY (¥)' },
]

export const billingCycles: Dropdown = [
	{ value: 'monthly', label: 'Monthly' },
	{ value: 'quarterly', label: 'Quarterly' },
	{ value: 'yearly', label: 'Yearly' },
]

export const categories: Dropdown = [
	{ value: 'entertainment', label: 'Entertainment' },
	{ value: 'work', label: 'Work' },
	{ value: 'shopping', label: 'Shopping' },
	{ value: 'utilities', label: 'Utilities' },
	{ value: 'health', label: 'Health & Fitness' },
	{ value: 'education', label: 'Education' },
	{ value: 'streaming', label: 'Streaming' },
	{ value: 'music', label: 'Music' },
	{ value: 'gaming', label: 'Gaming' },
	{ value: 'other', label: 'Other' },
]

export const monthlyFeatures = ['Advance Analysis', 'Early reminder', 'AI Assistant']

export const yearlyFeatures = [
	'Advance Analysis',
	'Early reminder',
    'AI Assistant',
	'Export Data',
]