import { io } from 'socket.io-client'

const url = 'http://localhost:4000'

const socket = io(url, {
	autoConnect: false,
	withCredentials: true,
})

export default socket
