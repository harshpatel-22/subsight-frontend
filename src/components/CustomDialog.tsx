import { Button } from "./ui/button"

function CustomDialog({
    open,
    onOpenChange,
    title,
    description,
    onCancel,
    onConfirm,
}: {
    open: boolean
    onOpenChange: (open: boolean) => void
    title: string
    description: string
    onCancel: () => void
    onConfirm: () => Promise<void> | void
    }) {
    
    const handleConfirm = async () => {
        await onConfirm()
        onOpenChange(false)
    }

    if (!open) return null

    return (
        <div className='fixed inset-0 z-50 flex items-center justify-center'>
            <div
                className='fixed inset-0 bg-gray-900/20 backdrop-blur-sm'
                onClick={() => onOpenChange(false)}
            />
            <div className='relative bg-white rounded-xl shadow-2xl max-w-md w-full mx-4 p-6'>
                <h2 className='text-lg font-semibold text-gray-900 tracking-wide'>
                    {title}
                </h2>
                <p className='mt-2 text-sm text-gray-600'>{description}</p>
                <div className='mt-6 flex justify-end space-x-3'>
                    <Button
                        variant='outline'
                        onClick={onCancel}
                        className='text-gray-600 hover:text-gray-900 border-gray-300 hover:border-gray-400 uppercase tracking-wide'
                    >
                        Cancel
                    </Button>
                    <Button
                        className='bg-red-500 hover:bg-red-600 text-white uppercase tracking-wide'
                        onClick={handleConfirm}
                    >
                        Delete
                    </Button>
                </div>
            </div>
        </div>
    )
}


export default CustomDialog;