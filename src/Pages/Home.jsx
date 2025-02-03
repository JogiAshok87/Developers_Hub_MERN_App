import React from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../Components/Navbar'
import '../CSS/homepage.css'

const  Home = () => {
  // const [user,setUser] = useState('Ashok')
  // const [data,setData] =useState([])

  // useEffect(()=>{
    // converting state into synchronous execution
  //   setData((prev) => {
  //     prev.push("s");
  
  //     return prev;
  //   });
  //   console.log(data)
  // },[])
  //output : ['s']

  //  useEffect(()=>{
  //    setUser('Ashok')
  //    console.log(user)
  //  })









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
        <img src="/homeImg6.png" alt=""/>
       </div>
       
        
    </div>
    </>
   
  )
}

export default  Home