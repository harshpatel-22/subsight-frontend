'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { axiosInstance } from '@/utils/axiosInstance'
import { Subscription } from '@/types/types'
import { format } from 'date-fns'
import {
	formatCurrency,
	calculateSubscriptionStatus,
	getRenewalStatus,
} from '@/utils/subscriptionUtils'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
	CalendarIcon,
	TagIcon,
	DollarSignIcon,
	ClockIcon,
	BellIcon,
	RotateCwIcon,
	CheckCircleIcon,
	XCircleIcon,
} from 'lucide-react'

export default function SubscriptionDetailPage() {
    const { id } = useParams()
    const router = useRouter()
    const [subscription, setSubscription] = useState<Subscription | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    
    useEffect(() => {
        const fetchSubscription = async () => {
            try {
                const res = await axiosInstance.get(`/subscriptions/${id}`)
                setSubscription(res.data.subscription)
            } catch (err) {
                console.error(err)
                setError('Failed to load subscription details.')
            } finally {
                setLoading(false)
            }
        }

        if (id) fetchSubscription()
    }, [id])

    if (loading)
        return (
            <p className='p-4 text-center'>Loading subscription details...</p>
        )
    if (error || !subscription)
        return (
            <p className='p-4 text-center text-red-600'>
                {error || 'Subscription not found.'}
            </p>
        )
        
    const {
        name,
        amount,
        currency,
        category,
        billingCycle,
        startDate,
        endDate,
        notes,
        renewalMethod,
        reminderDaysBefore,
    } = subscription

    const status = calculateSubscriptionStatus(startDate, billingCycle, endDate)
    const renewalStatusText = getRenewalStatus(renewalMethod)
    
    return (
        <div className='max-w-3xl mx-auto p-4 sm:p-6 md:p-8 lg:p-10 space-y-6'>
            <div className='flex items-center justify-between mb-6'>
                <h1 className='text-xl sm:text-2xl font-bold tracking-tight'>
                    {name}
                </h1>
                <Button
                    variant='outline'
                    onClick={() => router.back()}
                    className='text-sm sm:text-base'
                >
                    Back
                </Button>
            </div>

            <Card className='shadow-md'>
                <CardHeader>
                    <h2 className='text-lg font-semibold tracking-tight'>
                        Subscription Details
                    </h2>
                </CardHeader>
                <CardContent className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                    <div className='flex items-center gap-2 text-sm'>
                        <TagIcon className='h-4 w-4 text-gray-500' />
                        <span className='text-gray-600'>Category:</span>
                        <p className='font-medium capitalize'>{category}</p>
                    </div>
                    <div className='flex items-center gap-2 text-sm'>
                        <DollarSignIcon className='h-4 w-4 text-gray-500' />
                        <span className='text-gray-600'>Amount:</span>
                        <p className='font-medium'>
                            {formatCurrency(amount, currency)}
                        </p>
                    </div>
                    <div className='flex items-center gap-2 text-sm'>
                        <ClockIcon className='h-4 w-4 text-gray-500' />
                        <span className='text-gray-600'>Billing:</span>
                        <p className='font-medium'>
                            {billingCycle === 1
                                ? 'Monthly'
                                : billingCycle === 12
                                    ? 'Annually'
                                    : billingCycle === 3
                                        ? 'Quarterly'
                                        : `Every ${billingCycle} months`}
                        </p>
                    </div>
                    <div className='flex items-center gap-2 text-sm'>
                        <CalendarIcon className='h-4 w-4 text-gray-500' />
                        <span className='text-gray-600'>Start Date:</span>
                        <p className='font-medium'>
                            {format(new Date(startDate), 'PPP')}
                        </p>
                    </div>
                    <div className='flex items-center gap-2 text-sm'>
                        <CalendarIcon className='h-4 w-4 text-gray-500' />
                        <span className='text-gray-600'>End Date:</span>
                        <p className='font-medium'>
                            {format(new Date(endDate), 'PPP')}
                        </p>
                    </div>
                    <div className='flex items-center gap-2 text-sm'>
                        <BellIcon className='h-4 w-4 text-gray-500' />
                        <span className='text-gray-600'>Reminder:</span>
                        <p className='font-medium'>
                            {reminderDaysBefore} days before
                        </p>
                    </div>
                    <div className='flex items-center gap-2 text-sm'>
                        <RotateCwIcon className='h-4 w-4 text-gray-500' />
                        <span className='text-gray-600'>Renewal:</span>
                        <p className='font-medium'>{renewalStatusText}</p>
                    </div>
                    <div className='flex items-center gap-2 text-sm'>
                        {status.isExpired ? (
                            <XCircleIcon className='h-4 w-4 text-red-600' />
                        ) : (
                            <CheckCircleIcon className='h-4 w-4 text-green-600' />
                        )}
                        <span className='text-gray-600'>Status:</span>
                        <Badge>
                            {status.text}
                        </Badge>
                    </div>
                </CardContent>
            </Card>

            {notes && (
                <Card className='shadow-md'>
                    <CardHeader>
                        <h2 className='text-lg font-semibold tracking-tight'>
                            Notes
                        </h2>
                    </CardHeader>
                    <CardContent className='prose prose-sm sm:prose'>
                        <p className='whitespace-pre-line'>{notes}</p>
                    </CardContent>
                </Card>
            )}
        </div>
    )
}