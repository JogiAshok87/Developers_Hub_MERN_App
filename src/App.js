import React from 'react'
import { BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import Home from './Pages/Home'
//import Navbar from './Components/Navbar'
import Login from './Pages/Login'
import Register from './Pages/Register'
import Dashboard from './Pages/Dashboard'
import Myprofile from './Pages/Myprofile'
import IndividualProfile from './Pages/IndividualProfile'

const App = () => {
  return (
   <Router>
    
    <Routes>
      <Route exact path="/" element={<Home />}/>
      <Route path="/login" element={<Login />}/>
      <Route path="/register" element={<Register />}/>
      <Route path="/dashboard" element={<Dashboard />}/>
      <Route path="/myprofile" element={<Myprofile />}/>
      <Route path="/individualProfile/:id" element={<IndividualProfile />}/>
    </Routes>
   </Router>
  )
}

export default App