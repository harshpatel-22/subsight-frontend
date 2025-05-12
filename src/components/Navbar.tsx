'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { Menu } from 'lucide-react'
import logo from '../../public/logo.svg'

export default function Navbar() {
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

	const navigation = [
		{ name: 'Features', href: '/features' },
		{ name: 'Pricing', href: '/pricing' },
		{ name: 'About', href: '/about' },
	]

	return (
		<header className='fixed inset-x-0 top-0 z-50 backdrop-blur-sm border-b'>
			<nav
				className='flex items-center justify-between p-4 lg:px-8'
				aria-label='Global'
			>
				<div className='flex lg:flex-1'>
					<Link href='/' className='-m-1.5 p-1.5'>
						<Image
							alt='Company Logo'
							src={logo}
							width={32}
							height={32}
							className='h-8 w-auto'
						/>
					</Link>
				</div>
				<div className='flex lg:hidden'>
					<Sheet
						open={mobileMenuOpen}
						onOpenChange={setMobileMenuOpen}
					>
						<SheetTrigger asChild>
							<Button
								variant='ghost'
								size='icon'
								className='cursor-pointer -m-2.5 p-2.5 text-gray-700'
								aria-label='Open main menu'
							>
								<Menu className='h-6 w-6' aria-hidden='true' />
							</Button>
						</SheetTrigger>
						<SheetContent
							side='right'
							className='w-full sm:max-w-sm p-6'
						>
							<SheetHeader>
								<SheetTitle></SheetTitle>
								<SheetDescription></SheetDescription>
							</SheetHeader>
							<div className='flex items-center justify-between'>
								<Link
									href='/'
									className='-m-1.5 p-1.5'
									onClick={() => setMobileMenuOpen(false)}
								>
									<Image
										alt='Company Logo'
										src={logo}
										width={32}
										height={32}
										className='h-8 w-auto'
									/>
								</Link>
								<Button
									variant='ghost'
									size='icon'
									onClick={() => setMobileMenuOpen(false)}
									className='cursor-pointer -m-2.5 p-2.5 text-gray-700'
									aria-label='Close menu'
								></Button>
							</div>
							<div className='mt-6 flow-root'>
								<div className='-my-6 divide-y divide-gray-500/10'>
									<div className='space-y-2 py-6'>
										{navigation.map((item) => (
											<Link
												key={item.name}
												href={item.href}
												className='-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50'
												onClick={() =>
													setMobileMenuOpen(false)
												}
											>
												{item.name}
											</Link>
										))}
									</div>
								</div>
							</div>
						</SheetContent>
					</Sheet>
				</div>
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
			</nav>
		</header>
	)
}
