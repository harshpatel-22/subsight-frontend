const Loader = () => {
	return (
		<div className='fixed inset-0 z-[9999] bg-white/80 backdrop-blur-sm flex justify-center items-center'>
			<div className='animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#0004E8]'></div>
		</div>
	)
}

export default Loader
