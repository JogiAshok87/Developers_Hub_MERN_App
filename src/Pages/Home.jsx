import React from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../Components/Navbar'
import '../CSS/homepage.css'

const  Home = () => {
  return (
    <>
    <Navbar />
    <div className='bgContainer'> 
    <div className='contentDiv'>
      <div>
      <h1>Welcome to Developers Hub</h1>
        <p>Create a developer profile/portfolio, share posts and get help from other devlopers</p>
        <p>Empowering Developers to Find Freelance Opportunities</p>
        <div className='authenticationBtns'>
            <button > <Link to="/register">Sign Up</Link></button>
            <button><Link to="/login">Login</Link></button>
        </div>
      </div>
       
       </div>
       <div className='ImgDiv'>
        <img src="https://i.im.ge/2024/10/19/kCRsMz.image.png" alt=""/>
       </div>
       
        
    </div>
    </>
   
  )
}

export default  Home