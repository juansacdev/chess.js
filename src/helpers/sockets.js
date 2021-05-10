import { makeId } from '../utils/makeCode'
const socket = io('https://chessjs-api.herokuapp.com/')

socket.on('room full', handleRoomFull)
const roomInfo = document.getElementById('roomInfo')
const initialScreen = document.getElementById('initialScreen')
const gameCodeInput = document.getElementById('gameCodeInput')
const gameScreen = document.getElementById('gameScreen')
const roomFull = document.getElementById('roomFull')

const joinGameButton = document.getElementById('joinGameButton')
const newCodeButton = document.getElementById('newCodeButton')
const lobbyBtn = document.getElementById('lobbyButton')

joinGameButton.addEventListener('click', joinGame)
newCodeButton.addEventListener('click', newCode)
lobbyBtn.addEventListener('click', handleLobby)

function newCode() {
    const roomId = makeId(6)
    const code = document.getElementById('codeGenerated')
    roomInfo.style.display = 'block'
    code.innerText = roomId
}

function joinGame() {
    const code = gameCodeInput.value
    initialScreen.style.display = 'none'
    roomInfo.style.display = 'none'
    gameScreen.style.display = 'block'
    socket.emit('join room', code)
}

function handleRoomFull() {
    initialScreen.style.display = 'none'
    gameScreen.style.display = 'none'
    roomFull.style.display = 'block'
}

function handleLobby() {
    gameCodeInput.value = ''
    roomInfo.style.display = 'none'
    gameScreen.style.display = 'none'
    roomFull.style.display = 'none'
    initialScreen.style.display = 'block'
}

export default socket