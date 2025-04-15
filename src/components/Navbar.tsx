'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Menu, X } from 'lucide-react'
import logo from '../../public/logo.svg'

export default function Navbar() {
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

	const navigation = [
		{ name: 'Features', href: '/features' },
		{ name: 'Pricing', href: '/pricing' },
		{ name: 'About', href: '/about' },
	]

	return (
		<header className='absolute inset-x-0 top-0 z-50'>
			<nav
				className='flex items-center justify-between p-6 lg:px-8'
				aria-label='Global'
			>
				<div className='flex lg:flex-1'>
					<Link href='/' className='-m-1.5 p-1.5'>
						<Image
							src={logo}
							alt='Company Logo'
							className='h-8 w-auto'
							width={32}
							height={32}
						/>
					</Link>
				</div>

				{/* Mobile menu button */}
				<div className='flex lg:hidden'>
					<Sheet
						open={mobileMenuOpen}
						onOpenChange={setMobileMenuOpen}
					>
						<SheetTrigger asChild>
							<Button
								variant='ghost'
								size='icon'
								className='-m-2.5 p-2.5 text-gray-700'
								onClick={() => setMobileMenuOpen(true)}
							>
								<Menu className='h-6 w-6' aria-hidden='true' />
							</Button>
						</SheetTrigger>
						<SheetContent
							side='right'
							className='w-full sm:max-w-sm p-6'
						>
							<div className='flex items-center justify-between'>
								<Link
									href='/'
									className='-m-1.5 p-1.5'
									onClick={() => setMobileMenuOpen(false)}
								>
									<Image
										src={logo}
										alt='Company Logo'
										className='h-8 w-auto'
										width={32}
										height={32}
									/>
								</Link>
								<Button
									variant='ghost'
									size='icon'
									onClick={() => setMobileMenuOpen(false)}
									className='-m-2.5 p-2.5 text-gray-700'
								>
									<X className='h-6 w-6' aria-hidden='true' />
								</Button>
							</div>
							<div className='mt-6 flow-root'>
								<div className='-my-6 divide-y divide-gray-500/10'>
									<div className='space-y-2 py-6'>
										{navigation.map((item) => (
											<Link
												key={item.name}
												href={item.href}
												className='-mx-3 block rounded-lg px-3 py-2 text-base font-semibold text-gray-900 hover:bg-gray-50'
												onClick={() =>
													setMobileMenuOpen(false)
												}
											>
												{item.name}
											</Link>
										))}
									</div>
									<div className='py-6'>
										<Link
											href='/login'
											className='-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold text-gray-900 hover:bg-gray-50'
											onClick={() =>
												setMobileMenuOpen(false)
											}
										>
											Log in
										</Link>
									</div>
								</div>
							</div>
						</SheetContent>
					</Sheet>
				</div>

				{/* Desktop navigation */}
				<div className='hidden lg:flex lg:gap-x-12'>
					{navigation.map((item) => (
						<Link
							key={item.name}
							href={item.href}
							className='text-sm font-semibold leading-6 text-gray-900'
						>
							{item.name}
						</Link>
					))}
				</div>

				<div className='hidden lg:flex lg:flex-1 lg:justify-end'>
					<Button variant='link' asChild>
						<Link
							href='/login'
							className='text-sm font-semibold leading-6 text-gray-900'
						>
							Log in <span aria-hidden='true'>&rarr;</span>
						</Link>
					</Button>
				</div>
			</nav>
		</header>
	)
}
