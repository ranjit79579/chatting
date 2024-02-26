import React from 'react'
import Join from './pages/Join'
import Chat from './pages/Chat'
import { Routes, Route } from 'react-router-dom'

const App = () => {
  return (
    <>
      <Routes>
        <Route exact path='/' element={<Join />}></Route>
        <Route exact path='/chat' element={<Chat />}></Route>
      </Routes>
    </>
  )
}

export default App
