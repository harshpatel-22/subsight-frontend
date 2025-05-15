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
	status: 'idle' | 'succeeded' | 'loading'
	isAuthenticated: boolean
	error: string | null
}

export interface SubscriptionState {
	subscriptions: Subscription[]
	loading: boolean
	error: string | null
}

export interface CategoryIcons {
    [key: string]: JSX.Element
}


export interface PricingCardProps {
	title: string
	price: string
	period: string
	features: string[]
	badgeText: string
	buttonText: string
	buttonLink: string
	isPopular?: boolean
}

export interface StatCardsProps {
	stats: {
		totalSubscriptions: number
		monthlyCost: number
		avgPerSubscription: number
		upcomingRenewalsCount: number
	}
}

export interface SpendingData {
	data: { [category: string]: number }
	success: boolean
	total: number
}

interface UpcomingRenewal {
	name: string
	endDate: string
	amount: number
	currency: string
}

export interface UpcomingRenewalsProps {
	renewals: UpcomingRenewal[]
}

export interface SidebarProps {
	isSidebarOpen: boolean
	mobileSidebarOpen: boolean
	toggleSidebar: () => void
	setMobileSidebarOpen: (open: boolean) => void
	isYearlyPlan: boolean
}
