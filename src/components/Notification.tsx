'use client'

import { Bell, Circle, Check } from 'lucide-react'
import React, { useEffect, useMemo, useState } from 'react'
import { Button } from './ui/button'
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover'
import { useSelector } from 'react-redux'
import { RootState } from '@/redux/store'
import socket from '@/lib/socket'
import { INotification } from '@/types/types'

const Notification = () => {
	const { user } = useSelector((state: RootState) => state.auth)

	// Local state copy to manage UI actions
	const [localNotifications, setLocalNotifications] = useState(
		user?.notifications || []
	)

	// Sync when user updates
	useMemo(() => {
		setLocalNotifications(user?.notifications || [])
	}, [user])

	const markAsRead = (id: string) => {
		setLocalNotifications((prev) =>
			prev.map((notif) =>
				notif._id === id ? { ...notif, unread: false } : notif
			)
		)
		// Optionally dispatch action to update backend
	}

	const markAllAsRead = () => {
		setLocalNotifications((prev) =>
			prev.map((notif) => ({ ...notif, unread: false }))
		)
		// Optionally dispatch action to update backend
	}

	const unreadCount = localNotifications.filter((n) => n.unread).length

	//socket
	useEffect(() => {
		if (!user?._id) return

		socket.connect()
		socket.emit('register', user._id)

		const handleNewReminder = (notification: INotification) => {
			setLocalNotifications((prev) => [notification, ...prev])
		}

		socket.on('newReminder', handleNewReminder)

		return () => {
			socket.off('newReminder', handleNewReminder)
			socket.disconnect()
		}
	}, [user?._id])

	return (
		<Popover>
			<PopoverTrigger asChild>
				<div className='relative group'>
					<Button
						variant='ghost'
						className='bg-[#DADBF4] relative p-3 rounded-full hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 transition-all duration-300 hover:scale-105 focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 shadow-sm hover:shadow-md'
					>
						<Bell className='w-5 h-5 text-gray-600 group-hover:text-blue-600 transition-colors duration-300' />

						{unreadCount > 0 && (
							<div className='absolute inset-0 rounded-xl animate-pulse bg-blue-100 opacity-30'></div>
						)}
					</Button>

					{unreadCount > 0 && (
						<div className='absolute -top-1 -right-1'>
							<span className='relative flex h-5 w-5'>
								<span className='animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75'></span>
								<span className='relative inline-flex items-center justify-center h-5 w-5 rounded-full bg-gradient-to-r from-red-500 to-pink-500 text-[10px] font-bold text-white shadow-lg'>
									{unreadCount > 9 ? '9+' : unreadCount}
								</span>
							</span>
						</div>
					)}
				</div>
			</PopoverTrigger>

			<PopoverContent
				className='w-80 p-0 bg-white/95 backdrop-blur-xl shadow-2xl rounded-2xl border border-gray-200/50 overflow-hidden'
				align='end'
			>
				<div className='bg-blue-700 p-4 text-white'>
					<div className='flex items-center justify-between'>
						<div className='flex items-center gap-2'>
							<Bell className='w-5 h-5' />
							<h3 className='font-semibold text-lg'>
								Notifications
							</h3>
						</div>
						{unreadCount > 0 && (
							<Button
								onClick={markAllAsRead}
								variant='ghost'
								size='sm'
								className='text-white hover:bg-white/20 text-xs h-7 px-3 rounded-lg transition-all duration-200'
							>
								Mark all read
							</Button>
						)}
					</div>
					<p className='text-blue-100 text-sm mt-1'>
						{unreadCount > 0
							? `${unreadCount} unread notifications`
							: 'All caught up!'}
					</p>
				</div>

				<div className='max-h-96 overflow-y-auto'>
					{localNotifications.length > 0 ? (
						<div className='divide-y divide-gray-100'>
							{localNotifications.map((notification) => (
								<div
									key={notification._id}
									className={`p-4 hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 transition-all duration-200 cursor-pointer group ${
										notification.unread
											? 'bg-blue-50/50'
											: ''
									}`}
									onClick={() => markAsRead(notification._id)}
								>
									<div className='flex items-start gap-3'>
										<div className='flex-shrink-0 mt-1'>
											{notification.unread ? (
												<Circle className='w-2 h-2 fill-blue-500 text-blue-500' />
											) : (
												<Check className='w-3 h-3 text-green-500' />
											)}
										</div>
										<div className='flex-1 min-w-0'>
											<p
												className={`text-sm font-medium ${
													notification.unread
														? 'text-gray-900'
														: 'text-gray-600'
												} group-hover:text-blue-700 transition-colors duration-200`}
											>
												{notification.title}
											</p>
										</div>
									</div>
								</div>
							))}
						</div>
					) : (
						<div className='p-8 text-center'>
							<Bell className='w-12 h-12 text-gray-300 mx-auto mb-3' />
							<p className='text-gray-500 text-sm'>
								No notifications yet
							</p>
						</div>
					)}
				</div>
			</PopoverContent>
		</Popover>
	)
}

export default Notification
