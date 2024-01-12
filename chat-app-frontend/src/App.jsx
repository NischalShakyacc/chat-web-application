import './App.css'
import { BrowserRouter, Route, Routes} from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Chatroom from './pages/Chatroom'
import Navigate from './components/Navigate'
import { useSelector } from 'react-redux'
import { useState } from 'react'
import { AppContext, socket } from './context/appContext'

function App() {
  const user = useSelector((state) => state.user)
  const [rooms, setRooms] = useState([]);
  const [currentRoom, setCurrentRoom] = useState([]);
  const [members, setMembers] = useState([]);
  const [messages, setMessages] = useState([]);
  const [newMessages, setNewMessages] = useState({});
  const [privateMessage, setPrivateMessage] = useState({});

  return (
    <>
    <AppContext.Provider value={
      {
        socket, 
        currentRoom,
        setCurrentRoom,
        members,
        setMembers,
        messages,
        setMessages,
        rooms,
        setRooms,
        newMessages,
        setNewMessages,
        privateMessage,
        setPrivateMessage
      }
    }>
      <BrowserRouter>
      <Navigate/>
        <Routes>
          <Route path='/' element={<Home/>} />
          {!user && (
            <>
              <Route path='/login' element={<Login/>} />
              <Route path='/signup' element={<Signup/>} />
            </>
          )}
          <Route path='/chatroom' element={<Chatroom/>} />
          
          
              <Route path='/login' element={<Login/>} />
              <Route path='/signup' element={<Signup/>} />
        </Routes>
      </BrowserRouter>
      </AppContext.Provider>
    </>
  )
}

export default App
