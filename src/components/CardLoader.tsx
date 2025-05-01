import Loader from "./Loader"
import { Card , CardContent, CardTitle,CardHeader } from "./ui/card"

interface LoaderProps {
	title?: string
}

const CardLoader = ({ title }: LoaderProps) => {
	return (
		<Card>
			<CardHeader>
				<CardTitle>{title}</CardTitle>
			</CardHeader>
			<CardContent>
				<div className='flex items-center justify-center h-[400px]'>
					<Loader className='h-8 w-8' />
				</div>
			</CardContent>
		</Card>
	)
}

export default CardLoader