import { useState } from 'react'
import Signup from './Signup'
import Login from './Login'
import { Routes, Route} from 'react-router-dom'
import Dashboard from '../Dashboard'
import Home from './Home'



// import Home from './Home'


function App(){
  const [count, setcount]=useState(0)

  return(
  
    <Routes>
      <Route path='/' element={<Home/>}></Route> 
      <Route path='/Dashboard' element={<Dashboard/>}></Route> 
      <Route path='/Signup' element={<Signup/>}></Route>
      <Route path='/Login' element={<Login/>}></Route>
    // </Routes>
  )
}

export default App
