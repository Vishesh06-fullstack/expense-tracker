import { useState } from 'react'
import Signup from './Signup'
import Login from './Login'
import { Routes, Route} from 'react-router-dom'
import Dashboard from '../Dashboard'
import Home from './Home'
import AddTransaction from '../AddTransaction'
import OtpVerify from '../OtpVerify'
import ResetPassword from '../ResetPassword'



// import Home from './Home'


function App(){
  const [count, setcount]=useState(0)

  return(
  
    <Routes>
      <Route path='/ResetPassword' element={<ResetPassword/>}></Route>
      <Route path='/OtpVerify' element={<OtpVerify/>}></Route>
      <Route path='/AddTransaction' element={<AddTransaction/>}></Route> 
      <Route path='/' element={<Home/>}></Route>
      <Route path='/Dashboard' element={<Dashboard/>}></Route> 
      <Route path='/Signup' element={<Signup/>}></Route>
      <Route path='/Login' element={<Login/>}></Route>

    </Routes>
  )
}

export default App
