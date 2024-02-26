import { useState } from 'react'
import './Join.css'
import { Link } from 'react-router-dom'

let user;
const Join = () => {
  const [name, setName] = useState('')


  const sendUser = () => {
    user = document.getElementById('joinInput').value
    document.getElementById('joinInput').value = ''
    // console.log(name)
  }

  return (
    <>
      <div className="joinPage">
        <div className="joinContainer">
          <div className="chat">
            <h1>RK CHAT</h1>
          </div>
          <div className="input">
            <input type="text" id='joinInput' placeholder='Enter your name' onChange={(e) => setName(e.target.value) }/>
          </div>
          <div className="btn">
            <Link to='/chat' onClick={(event) =>!name?event.preventDefault():null}><button onClick={sendUser}>JOIN</button></Link>
          </div>
        </div>
      </div>
    </>
  )
}

export default Join
export { user }
