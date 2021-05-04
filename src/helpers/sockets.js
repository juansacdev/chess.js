import { io } from "socket.io-client";

export const roomId = window.location.search.split('room=')[1]

const socket = io('http://localhost:5000')

socket.on('connected', () => {
    socket.emit('join room', roomId)
})

export default socket