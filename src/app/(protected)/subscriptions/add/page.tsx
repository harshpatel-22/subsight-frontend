'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '@/redux/store'
import { addSubscription, setLoading } from '@/redux/slices/subscriptionSlice'
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
import { axiosInstance } from '@/utils/axiosInstance'
import { currencies, billingCycles, categories } from '@/utils/constants'
import { motion } from 'framer-motion'

export default function AddSubscriptionPage() {
	const router = useRouter()
	const dispatch = useDispatch<AppDispatch>()

    const {loading} = useSelector((state:RootState) => state.subscriptions)

    const [date, setDate] = useState<Date>()
    const [open, setOpen] = useState(false);
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
			router.push('/subscriptions')
		} catch (error) {
			console.log(error)
			toast.error('Failed to add subscription. Please try again.')
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

	const handleReset = () => {
		setFormData({
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
		setDate(undefined)
	}

	return (
		<div className='container mx-auto max-w-4xl'>
			<div className='flex items-center justify-between gap-4 mb-8'>
				<h1 className='text-2xl font-bold text-gray-900'>
					Add New Subscription
				</h1>
				<Button
					variant='outline'
					onClick={() => router.back()}
					className='cursor-pointer sm:w-auto'
				>
					Back
				</Button>
			</div>

			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.3 }}
				className='bg-white rounded-lg shadow p-4 sm:p-6'
			>
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

						<div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
							<div className='space-y-2'>
								<Label htmlFor='amount'>Amount *</Label>
								<Input
									id='amount'
									name='amount'
									type='number'
									min='0'
									step='0.01'
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
									<SelectTrigger className='cursor-pointer'>
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
							<Popover open={open} onOpenChange={setOpen}>
								<PopoverTrigger asChild>
									<Button
										variant='outline'
										className={cn(
											'cursor-pointer w-full justify-start text-left font-normal',
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
										onSelect={(newDate) => {
											setDate(newDate)
											setOpen(false)
										}}
										initialFocus
										disabled={(date) => date > new Date()}
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
								<SelectTrigger className='cursor-pointer'>
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
								min={1}
								max={3}
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
								<SelectTrigger className='cursor-pointer'>
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
								className='flex flex-col sm:flex-row gap-4'
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

					<div className='flex flex-col-reverse sm:flex-row justify-end gap-3 pt-6'>
						<Button
							variant='outline'
							type='button'
							onClick={handleReset}
							className='cursor-pointer w-full sm:w-auto'
						>
							Reset
						</Button>
						<Button
							variant='outline'
							type='button'
							onClick={() => router.push('/subscriptions')}
							className='cursor-pointer w-full sm:w-auto'
						>
							Cancel
						</Button>
						<Button
							type='submit'
							className='cursor-pointer w-full sm:w-auto bg-[#0004E8] hover:bg-[#0004E8]/90'
							disabled={loading}
						>
							{loading ? 'Adding.....' : 'Add Subscription'}
						</Button>
					</div>
				</form>
			</motion.div>
		</div>
	)
}
