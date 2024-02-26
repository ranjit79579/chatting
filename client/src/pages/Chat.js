import React, { useEffect, useState } from 'react'
import './Chat.css'
import { user } from './Join'
import socketIo from 'socket.io-client'
import Message from '../components/Message'
import ReactScrollToBottom from 'react-scroll-to-bottom'


let socket
const ENDPOINT = 'http://localhost:8080/'


const Chat = () => {
  const [id, setId] = useState('')
  const [messages, setMessages] = useState([])


  const send = () => {
    const message = document.getElementById('chatInput').value
    socket.emit('message', { message, id,user })
    document.getElementById('chatInput').value = ''
  }


  useEffect(() => {
    socket = socketIo(ENDPOINT, { transports: ['websocket'] })

    socket.on('connect', () => {
      // alert('connected')
      setId(socket.id)
    })
    // console.log(socket)
    socket.emit('joined', { user })

    socket.on('welcome', (data) => {
      setMessages([...messages,data])
      console.log(data.user, data.message)
    })

    socket.on('userjoined', (data) => {
      setMessages([...messages,data])
      console.log(data.user, data.message)
    })

    socket.on('leave', (data) => {
      setMessages([...messages,data])
      console.log(data.user, data.message)
    })

    return () => {
      socket.emit('disconnected')
      socket.off()
    }

  },[])




  useEffect(() => {
    socket.on('sendMessage', (data) => {
      setMessages([...messages,data.message])
      console.log(data.user, data.message, data.id)
    })

    return () => {
socket.off()
    }

  }, [messages])

  return (
    <>
      <div className="chatPage">
        <div className="chatContainer">
          <div className="chatHeader">
            <div className="header">
              <h2>RK CHAT</h2>
              <div className="cross">
              <a href='/'><p>Leave</p></a>
              </div>
            </div>

            <ReactScrollToBottom className="chatBox">
              {messages.map((item,i) => <Message user={item.id === id?'':item.user} message={item.message} classs={item.id === id?'right':'left'}/>)}
            </ReactScrollToBottom>
          </div>
          <div className="inputBox">
            <input type="text" id='chatInput' />
            <button className='sendBtn' onClick={send} >Send</button>
          </div>

        </div>
      </div>
    </>
  )
}

export default Chat
