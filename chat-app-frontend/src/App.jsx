import './App.css'
import { BrowserRouter, Route, Routes} from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Chatroom from './pages/Chatroom'
import Navigate from './components/Navigate'
import { useSelector } from 'react-redux'

function App() {
  const user = useSelector((state) => state.user)
  return (
    <>
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
          
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
