import { useDispatch } from 'react-redux'
import { AppDispatch } from '@/redux/store'
import { setLoading, setUser } from '@/redux/slices/authSlice'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { axiosInstance } from '@/utils/axiosInstance'
import { firebaseAuth, googleProvider } from '@/config/firebase'
import { signInWithPopup } from 'firebase/auth'

export default function GoogleSignInButton() {
	const dispatch = useDispatch<AppDispatch>()
	const router = useRouter()

    const handleGoogleSignIn = async () => {
        
		dispatch(setLoading(true))

		try {
			const result = await signInWithPopup(firebaseAuth, googleProvider)
			const idToken = await result.user.getIdToken()

			const response = await axiosInstance.post('/auth/google', {
				token: idToken,
			})
			const { user } = response.data

			dispatch(setUser(user))
			toast.success('Logged in with Google')
			router.push('/dashboard')
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		} catch (err: any) {
			console.error(err)
			toast.error(err.response?.data?.message || 'Google sign-in failed')
		} finally {
			dispatch(setLoading(false))
		}
	}

	return (
		<>
			<div className='mt-6 flex items-center gap-3'>
				<div className='h-px flex-1 bg-gray-300' />
				<p className='text-sm text-gray-500'>or</p>
				<div className='h-px flex-1 bg-gray-300' />
			</div>

			<Button
				onClick={handleGoogleSignIn}
				variant='outline'
				className='mt-4 w-full flex items-center justify-center gap-2 py-2.5 text-sm'
			>
				<Image height={20} width={20} src='/google.svg' alt='Google' />
				Continue with Google
			</Button>
		</>
	)
}
