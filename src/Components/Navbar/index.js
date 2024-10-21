import React from 'react'
import {Link} from 'react-router-dom'
import './index.css'
import { FaCode } from "react-icons/fa6";
import { HiOutlineLogin } from "react-icons/hi";

const Navbar = () => {
  return (
    <div className='navbar'>
        <h1><Link to="/"><FaCode size={50} style={{color:'#fff',paddingRight:10}}/>Developers Hub</Link></h1>
        <div>
            <button><Link to="/register">Register</Link></button>
            <button><Link to="/login"><HiOutlineLogin size={30} style={{paddingRight:'5px'}}/>Login</Link></button>
        </div>
    </div>
  )
}

export default Navbar