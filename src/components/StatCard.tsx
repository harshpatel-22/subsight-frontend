function StatCard({ title, value }: { title: string; value: string }) {
	return (
		<div className='bg-white p-4 rounded-lg border shadow-sm'>
			<h3 className='text-sm font-medium text-gray-500'>{title}</h3>
			<p className='text-2xl font-bold text-gray-900 mt-1'>{value}</p>
		</div>
	)
}

export default StatCard;