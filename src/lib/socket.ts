import { io } from 'socket.io-client'

let url
if (process.env.NEXT_PUBLIC_MODE === 'development') {
	url = 'http://localhost:4000'
} else {
	url = 'https://subsight-backend.onrender.com'
}

const socket = io(url, {
	autoConnect: false,
	withCredentials: true,
})

export default socket
