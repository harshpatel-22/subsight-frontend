import { JSX } from "react"

export type User = {
	id: string
	email: string
	password: string
	fullName: string
	phoneNumber: string
	subscriptions: string
	profilePicture?: string
	isPremium: boolean
	stripeSubscriptionId: string
	premiumExpiresAt: Date
	createdAt: Date
	updatedAt: Date
    isGoogleSignIn?: boolean
    planType:string
}

export type Subscription = {
	_id: string
	name: string
	amount: number
	currency: string
	convertedAmountInINR: number
	startDate: string
    endDate: string
    notes:string
	billingCycle: number
	category?: string
	reminderDaysBefore: number
	renewalMethod: 'auto' | 'manual'
}
export type Dropdown = {
	value: string
	label: string
}[]

export interface AuthState {
	user: User | null
	loading: boolean
	isAuthenticated: boolean
}

export interface SubscriptionState {
	subscriptions: Subscription[]
	loading: boolean
	error: string | null
}

export interface CategoryIcons {
    [key: string]: JSX.Element
}
