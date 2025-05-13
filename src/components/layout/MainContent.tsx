import GradientBackgroundTop from '@/components/GradientBackgroundTop'
import GradientBackgroundBottom from '@/components/GradientBackgroundBottom'

interface MainContentProps {
	children: React.ReactNode
}

export default function MainContent({ children }: MainContentProps) {
	return (
		<main className='relative isolate flex-1 overflow-y-auto p-4 sm:p-6 bg-gray-50'>
			<GradientBackgroundTop />
			<div className='max-w-7xl mx-auto'>{children}</div>
			<GradientBackgroundBottom />
		</main>
	)
}
