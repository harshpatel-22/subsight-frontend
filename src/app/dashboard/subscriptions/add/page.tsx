'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { addSubscription, setLoading } from '@/redux/subscriptionSlice'
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
import { format } from 'date-fns'
import { cn } from '@/lib/utils'
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover'
import {axiosInstance} from '@/utils/axiosInstance'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '@/redux/store'
import  { currencies } from '@/utils/constants'
import { billingCycles } from '@/utils/constants'
import { categories } from '@/utils/constants'


export default function AddSubscriptionPage() {
	const router = useRouter()
    const dispatch = useDispatch<AppDispatch>()
    
    const [date, setDate] = useState<Date>()
    
	const [formData, setFormData] = useState({
		name: '',
		amount: '',
		currency: 'INR',
		startDate: '',
		billingCycle: 'monthly',
		reminderDays: 3,
		category: 'entertainment',
		notes: '',
		renewalMethod: 'auto',
	})

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
			const response = await axiosInstance.post(
				'/subscriptions',
				submissionData				
			)

			dispatch(addSubscription(response.data.subscription))
			toast.success('Subscription added successfully!')
			router.push('/dashboard/subscriptions')
		} catch (error) {
			toast.error('Failed to add subscription. Please try again.')
			console.error('Add subscription error:', error)
		} finally {
			dispatch(setLoading(false))
		}
	}

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		const { name, value } = e.target
		setFormData((prev) => ({
			...prev,
			[name]: value,
		}))
	}

	const handleSelectChange = (name: string, value: string) => {
		setFormData((prev) => ({
			...prev,
			[name]: value,
		}))
	}

	return (
		<div className='space-y-8'>
			<div className='flex items-center justify-between'>
				<h1 className='text-2xl font-bold text-gray-900'>
					Add New Subscription
				</h1>
				<Button variant='outline' onClick={() => router.back()}>
					Back
				</Button>
			</div>

			<div className='bg-white rounded-lg shadow p-6'>
				<form onSubmit={handleSubmit} className='space-y-6'>
					<div className='grid grid-cols-1 gap-6 sm:grid-cols-2'>
						{/* Name */}
						<div className='space-y-2'>
							<Label htmlFor='name'>Subscription Name *</Label>
							<Input
								id='name'
								name='name'
								placeholder='e.g., Netflix, Spotify'
								value={formData.name}
								onChange={handleChange}
								required
							/>
						</div>

						{/* Amount + Currency */}
						<div className='grid grid-cols-2 gap-4'>
							<div className='space-y-2'>
								<Label htmlFor='amount'>Amount *</Label>
								<Input
									id='amount'
									name='amount'
									type='number'
									min='0'
									step='0.01'
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
										<SelectValue placeholder='Select currency' />
									</SelectTrigger>
									<SelectContent>
										{currencies.map((currency) => (
											<SelectItem
												key={currency.value}
												value={currency.value}
											>
												{currency.label}
											</SelectItem>
										))}
									</SelectContent>
								</Select>
							</div>
						</div>

						{/* Date Picker */}
						<div className='space-y-2'>
							<Label>Start Date *</Label>
							<Popover>
								<PopoverTrigger asChild>
									<Button
										variant={'outline'}
										className={cn(
											'w-full justify-start text-left font-normal',
											!date && 'text-muted-foreground'
										)}
									>
										<CalendarIcon className='mr-2 h-4 w-4' />
										{date ? (
											format(date, 'PPP')
										) : (
											<span>Pick a date</span>
										)}
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

						{/* Billing Cycle */}
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
									<SelectValue placeholder='Select billing cycle' />
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

						{/* Reminder Days */}
						<div className='space-y-2'>
							<Label htmlFor='reminderDays'>
								Reminder Days Before *
							</Label>
							<Input
								id='reminderDays'
								name='reminderDays'
								type='number'
								min='1'
								max='30'
								value={formData.reminderDays}
								onChange={handleChange}
								required
							/>
						</div>

						{/* Category */}
						<div className='space-y-2'>
							<Label htmlFor='category'>Category *</Label>
							<Select
								value={formData.category}
								onValueChange={(value) =>
									handleSelectChange('category', value)
								}
							>
								<SelectTrigger>
									<SelectValue placeholder='Select category' />
								</SelectTrigger>
								<SelectContent>
									{categories.map((category) => (
										<SelectItem
											key={category.value}
											value={category.value}
										>
											{category.label}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
						</div>

						{/* Renewal Method */}
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

						{/* Notes */}
						<div className='space-y-2 sm:col-span-2'>
							<Label htmlFor='notes'>Notes</Label>
							<Textarea
								id='notes'
								name='notes'
								placeholder='Any additional information...'
								rows={3}
								value={formData.notes}
								onChange={handleChange}
							/>
						</div>
					</div>

					<div className='flex justify-end space-x-4 pt-4'>
						<Button
							variant='outline'
							type='button'
							onClick={() =>
								router.push('/dashboard/subscriptions')
							}
						>
							Cancel
						</Button>
						<Button
							type='submit'
							className='bg-[#0004E8] hover:bg-[#0004E8]/90'
						>
							Add Subscription
						</Button>
					</div>
				</form>
			</div>
		</div>
	)
}
