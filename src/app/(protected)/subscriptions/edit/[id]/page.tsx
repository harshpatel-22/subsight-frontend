'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '@/redux/store'
import { setLoading } from '@/redux/slices/subscriptionSlice'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select'
import { Calendar } from '@/components/ui/calendar'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Textarea } from '@/components/ui/textarea'
import { toast } from 'sonner'
import { CalendarIcon } from 'lucide-react'
import { format, parseISO, isValid } from 'date-fns'
import { cn } from '@/lib/utils'
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover'
import { axiosInstance } from '@/utils/axiosInstance'
import { currencies, billingCycles, categories } from '@/utils/constants'

const billingCycleMap: Record<number, string> = {
	1: 'monthly',
	3: 'quarterly',
	12: 'yearly',
}

export default function EditSubscriptionPage() {
	const router = useRouter()
	const params = useParams()
	const subscriptionId = params.id
	const dispatch = useDispatch<AppDispatch>()

	const [date, setDate] = useState<Date>()
	const [formData, setFormData] = useState({
		name: '',
		amount: '',
		currency: 'INR',
		startDate: '',
		billingCycle: '',
		reminderDays: 3,
		category: 'entertainment',
		notes: '',
		renewalMethod: 'auto',
	})
	const [initialData, setInitialData] = useState<typeof formData | null>(null)
	const [loading, setLoadingState] = useState(true)

	useEffect(() => {
		async function fetchSubscription() {
			try {
				const res = await axiosInstance.get(
					`/subscriptions/${subscriptionId}`
				)
				const sub = res.data.subscription

				const billingCycleInPeriod =
					billingCycleMap[sub.billingCycle] || 'monthly'

				const updatedForm = {
					name: sub.name,
					amount: sub.amount.toString(),
					currency: sub.currency,
					startDate: sub.startDate,
					billingCycle: billingCycleInPeriod,
					reminderDays: sub.reminderDaysBefore,
					category: sub.category,
					notes: sub.notes ?? '',
					renewalMethod: sub.renewalMethod,
				}
				setFormData(updatedForm)
				setInitialData(updatedForm)

				const parsedDate = parseISO(sub.startDate)
				if (isValid(parsedDate)) setDate(parsedDate)
				else console.warn('Invalid date format from backend')
			} catch (error) {
				console.log(error)
				toast.error('Failed to load subscription')
			} finally {
				setLoadingState(false)
			}
		}

		if (subscriptionId) {
			fetchSubscription()
		}
	}, [subscriptionId])

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()

		if (!formData.name || !formData.amount || !date) {
			toast.error('Please fill in all required fields')
			return
		}

		const submissionData = {
			...formData,
			startDate: format(date, 'yyyy-MM-dd'),
			amount: parseFloat(formData.amount),
			reminderDaysBefore: parseInt(
				formData.reminderDays as unknown as string
			),
		}

		try {
			dispatch(setLoading(true))
			await axiosInstance.put(
				`/subscriptions/${subscriptionId}`,
				submissionData
			)
			toast.success('Subscription updated successfully!')
			router.push('/subscriptions')
		} catch (error) {
			console.log(error)
			toast.error('Failed to update subscription.')
		} finally {
			dispatch(setLoading(false))
		}
	}

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		const { name, value } = e.target
		setFormData((prev) => ({ ...prev, [name]: value }))
	}

	const handleSelectChange = (name: string, value: string) => {
		setFormData((prev) => ({ ...prev, [name]: value }))
	}

	const handleReset = () => {
		if (initialData) {
			setFormData(initialData)
			const parsedDate = parseISO(initialData.startDate)
			if (isValid(parsedDate)) setDate(parsedDate)
		}
	}

	if (loading) {
		return (
			<div className='text-center py-20 text-muted-foreground'>
				Loading subscription...
			</div>
		)
	}

	return (
		<div className='space-y-8'>
			<div className='flex items-center justify-between'>
				<h1 className='text-2xl font-bold text-gray-900'>
					Edit Subscription
				</h1>
				<Button variant='outline' onClick={() => router.back()}>
					Back
				</Button>
			</div>
			<div className='bg-white rounded-lg shadow p-6'>
				<form onSubmit={handleSubmit} className='space-y-6'>
					<div className='grid grid-cols-1 gap-6 sm:grid-cols-2'>
						<div className='space-y-2'>
							<Label htmlFor='name'>Subscription Name *</Label>
							<Input
								id='name'
								name='name'
								autoFocus
								aria-label='Subscription name'
								value={formData.name}
								onChange={handleChange}
								required
							/>
						</div>
						<div className='grid grid-cols-2 gap-4'>
							<div className='space-y-2'>
								<Label htmlFor='amount'>Amount *</Label>
								<Input
									id='amount'
									name='amount'
									type='number'
									aria-label='Amount'
									value={formData.amount}
									onChange={handleChange}
									required
								/>
							</div>
							<div className='space-y-2'>
								<Label htmlFor='currency'>Currency *</Label>
								<Select
									value={formData.currency}
									onValueChange={(value) =>
										handleSelectChange('currency', value)
									}
								>
									<SelectTrigger>
										<SelectValue placeholder='Currency' />
									</SelectTrigger>
									<SelectContent>
										{currencies.map((cur) => (
											<SelectItem
												key={cur.value}
												value={cur.value}
											>
												{cur.label}
											</SelectItem>
										))}
									</SelectContent>
								</Select>
							</div>
						</div>
						<div className='space-y-2'>
							<Label>Start Date *</Label>
							<Popover>
								<PopoverTrigger asChild>
									<Button
										variant='outline'
										className={cn(
											'w-full justify-start text-left font-normal',
											!date && 'text-muted-foreground'
										)}
									>
										<CalendarIcon className='mr-2 h-4 w-4' />
										{date
											? format(date, 'PPP')
											: 'Pick a date'}
									</Button>
								</PopoverTrigger>
								<PopoverContent className='w-auto p-0'>
									<Calendar
										mode='single'
										selected={date}
										onSelect={setDate}
										initialFocus
									/>
								</PopoverContent>
							</Popover>
						</div>
						<div className='space-y-2'>
							<Label htmlFor='billingCycle'>
								Billing Cycle *
							</Label>
							<Select
								value={formData.billingCycle}
								onValueChange={(value) =>
									handleSelectChange('billingCycle', value)
								}
							>
								<SelectTrigger>
									<SelectValue placeholder='Billing Cycle' />
								</SelectTrigger>
								<SelectContent>
									{billingCycles.map((cycle) => (
										<SelectItem
											key={cycle.value}
											value={cycle.value}
										>
											{cycle.label}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
						</div>
						<div className='space-y-2'>
							<Label htmlFor='reminderDays'>
								Reminder Days Before *
							</Label>
							<Input
								id='reminderDays'
								name='reminderDays'
								type='number'
								value={formData.reminderDays}
								onChange={handleChange}
								required
							/>
						</div>
						<div className='space-y-2'>
							<Label htmlFor='category'>Category *</Label>
							<Select
								value={formData.category}
								onValueChange={(value) =>
									handleSelectChange('category', value)
								}
							>
								<SelectTrigger>
									<SelectValue placeholder='Category' />
								</SelectTrigger>
								<SelectContent>
									{categories.map((cat) => (
										<SelectItem
											key={cat.value}
											value={cat.value}
										>
											{cat.label}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
						</div>
						<div className='space-y-2'>
							<Label>Renewal Method *</Label>
							<RadioGroup
								value={formData.renewalMethod}
								onValueChange={(value) =>
									handleSelectChange('renewalMethod', value)
								}
								className='flex space-x-4'
							>
								<div className='flex items-center space-x-2'>
									<RadioGroupItem value='auto' id='auto' />
									<Label htmlFor='auto'>Auto</Label>
								</div>
								<div className='flex items-center space-x-2'>
									<RadioGroupItem
										value='manual'
										id='manual'
									/>
									<Label htmlFor='manual'>Manual</Label>
								</div>
							</RadioGroup>
						</div>
						<div className='space-y-2 sm:col-span-2'>
							<Label htmlFor='notes'>Notes</Label>
							<Textarea
								id='notes'
								name='notes'
								value={formData.notes}
								onChange={handleChange}
								rows={3}
							/>
						</div>
					</div>
					<div className='flex justify-end space-x-4 pt-4'>
						<Button
							variant='outline'
							type='button'
							onClick={handleReset}
						>
							Reset
						</Button>
						<Button
							variant='outline'
							type='button'
							onClick={() => router.push('/subscriptions')}
						>
							Cancel
						</Button>
						<Button
							type='submit'
							disabled={loading}
							className='bg-[#0004E8] hover:bg-[#0004E8]/90'
						>
							Update Subscription
						</Button>
					</div>
				</form>
			</div>
		</div>
	)
}
