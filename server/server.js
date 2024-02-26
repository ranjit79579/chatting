const http = require('http')
const express = require('express')
const cors = require('cors')
const socketIo = require('socket.io')
const dotenv = require('dotenv')

dotenv.config()
const app = express()

app.use(cors())

app.get('/', (req, res) => {
    res.send('working')
})

const server = http.createServer(app)
const io = socketIo(server)

const users=[{}]

io.on('connection', (socket) => {
    console.log('new connection')

    socket.on('joined', ({ user }) => {
        users[socket.id]=user
        console.log(`${user} has joined`)

        socket.emit('welcome', {user:'admin', message:`welcome to the chat, ${users[socket.id]}`})

        socket.broadcast.emit('userjoined', {user:'admin', message:`${users[socket.id]} has joined`})
    })

    socket.on('message', (message,id) => {
        io.emit('sendMessage', {user:users[socket.id],message,id})
    })

    socket.on('disconnected', () => {
        socket.broadcast.emit('leave', {user:'admin', message:`${users[socket.id]}, has disconnected`})
        console.log('user left')
    })


})



port = 8080 || process.env.PORT

server.listen(port, () => {
    console.log('server running on port ')
})