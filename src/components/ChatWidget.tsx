'use client'

import { useEffect, useRef, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { X } from 'lucide-react'
import { motion } from 'framer-motion'
import { axiosInstance } from '@/utils/axiosInstance'
import ReactMarkdown from 'react-markdown'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '@/redux/store'
import { fetchUser } from '@/redux/thunks/authThunks'
import { useRouter } from 'next/navigation'

const ChatWidget = () => {
	const [open, setOpen] = useState(false)
	const [input, setInput] = useState('')
	const [messages, setMessages] = useState<
		{ sender: 'user' | 'bot'; text: string }[]
	>([])
	const [loading, setLoading] = useState(false)

	const dispatch = useDispatch<AppDispatch>()
	const { user } = useSelector((state: RootState) => state.auth)

	useEffect(() => {
		dispatch(fetchUser())
	}, [dispatch])

	const MAX_FREE_CHATS = 10
	const isPremium = user?.isPremium ?? false
	const chatCount = user?.chatCount ?? 0
	const remainingChats = isPremium ? Infinity : MAX_FREE_CHATS - chatCount

	const router = useRouter()
	const widgetRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		function handleClickOutside(event: MouseEvent) {
			if (
				widgetRef.current &&
				!widgetRef.current.contains(event.target as Node)
			) {
				setOpen(false)
			}
		}

		document.addEventListener('mousedown', handleClickOutside)
		return () => {
			document.removeEventListener('mousedown', handleClickOutside)
		}
	}, [])

	const sendMessage = async () => {
		if (!input.trim()) return

		const userMessage = input.trim()

		if (userMessage.length > 100) {
			alert('Message too long!')
			return
		}

		setMessages((prev) => [...prev, { sender: 'user', text: userMessage }])
		setInput('')
		setLoading(true)

		try {
			const res = await axiosInstance.post('/chat', {
				message: userMessage,
			})
			const botReply =
				res.data.reply || 'Sorry, I did not understand that.'
			setMessages((prev) => [...prev, { sender: 'bot', text: botReply }])

			// After successful chat, refresh user data to get updated chatCount
			dispatch(fetchUser())
		} catch (err) {
			console.log(err)
			setMessages((prev) => [
				...prev,
				{ sender: 'bot', text: 'Error getting response.' },
			])
		} finally {
			setLoading(false)
		}
	}

	const handleUpgrade = () => {
		router.push('/upgrade')
		setOpen(false)
	}

	const chatDisabled = !isPremium && chatCount >= MAX_FREE_CHATS

	return (
		<>
			{/* Floating Chat Button */}
			<div className='fixed bottom-6 right-6 z-50'>
				<Button
					onClick={setOpen.bind(null, !open)}
					className='rounded-full h-12 w-12 p-0 text-white bg-gradient-to-br from-blue-600 to-blue-700 shadow-xl hover:scale-105 transition-transform'
				>
					💬
				</Button>
			</div>

			{/* Chat Panel */}
			{open && (
				<motion.div
					ref={widgetRef}
					initial={{ opacity: 0, y: 50 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.3 }}
					className='fixed bottom-20 right-4 left-4 sm:left-auto sm:right-6 z-50 w-[90vw] sm:w-[400px] max-w-full bg-white border border-gray-200 shadow-2xl rounded-xl flex flex-col max-h-[80vh]'
				>
					{/* Header */}
					<div className='flex items-center justify-between p-4 border-b bg-gray-50 rounded-t-xl'>
						<h2 className='text-sm font-semibold text-gray-800'>
							SubSight Assistant
						</h2>
						<button
							onClick={() => setOpen(false)}
							className='text-gray-500 hover:text-gray-700'
						>
							<X size={18} />
						</button>
					</div>

					{/* Messages */}

					<div className='flex-1 overflow-y-auto p-4 space-y-3 text-sm'>
						{messages.map((msg, i) => (
							<div
								key={i}
								className={`p-3 rounded-lg max-w-[85%] ${
									msg.sender === 'user'
										? 'bg-blue-100 ml-auto text-gray-800'
										: 'bg-gray-100 text-gray-700'
								}`}
							>
								{msg.sender === 'bot' ? (
									<ReactMarkdown
										components={{
											ul: ({ children }) => (
												<ul className='list-disc pl-4 space-y-1'>
													{children}
												</ul>
											),
											li: ({ children }) => (
												<li className='text-gray-700'>
													{children}
												</li>
											),
											strong: ({ children }) => (
												<strong className='font-semibold'>
													{children}
												</strong>
											),
											p: ({ children }) => (
												<p className='mb-2'>
													{children}
												</p>
											),
										}}
									>
										{msg.text}
									</ReactMarkdown>
								) : (
									msg.text
								)}
							</div>
						))}
						{remainingChats === 0 ? (
							<div className='flex items-center justify-center h-full mt-1 mb-1'>
								<p className='text-red-500 text-sm font-medium'>
									Free Limit Reached
								</p>
							</div>
						) : (
							<></>
						)}

						{loading && (
							<div className='text-xs text-gray-500 animate-pulse'>
								Typing...
							</div>
						)}
					</div>

					{/* Remaining Requests Info */}
					{!isPremium && (
						<div className='px-4 text-xs text-gray-600'>
							Remaining free requests:{' '}
							{remainingChats > 0 ? remainingChats : 0} /{' '}
							{MAX_FREE_CHATS}
						</div>
					)}

					{/* Input & Buttons */}
					<div className='p-4 border-t bg-white rounded-b-xl'>
						<Textarea
							rows={2}
							value={input}
							onChange={(e) => setInput(e.target.value)}
							onKeyDown={(e) =>
								e.key === 'Enter' &&
								!e.shiftKey &&
								(e.preventDefault(), sendMessage())
							}
							placeholder='Ask something...'
							className='resize-none border-gray-300 focus:ring-blue-500'
							disabled={chatDisabled || loading}
						/>
						{chatDisabled ? (
							<Button
								onClick={handleUpgrade}
								className='mt-2 w-full bg-green-600 hover:bg-green-700 text-white'
							>
								Upgrade to Premium
							</Button>
						) : (
							<Button
								onClick={sendMessage}
								disabled={loading || !input.trim()}
								className='mt-2 w-full bg-blue-600 hover:bg-blue-700 text-white'
							>
								Send
							</Button>
						)}
					</div>
				</motion.div>
			)}
		</>
	)
}

export default ChatWidget