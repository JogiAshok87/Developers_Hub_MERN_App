import React,{useState,useEffect} from 'react'
import { Link,Navigate } from 'react-router-dom'
import axios from 'axios'

import '../Components/Navbar/index.css'
import '../CSS/myprofile.css'
import { IoMdArrowRoundBack } from "react-icons/io";
import { GoCodeReview } from "react-icons/go";
import { FaCode } from "react-icons/fa6";
import { IoPersonSharp } from "react-icons/io5";
import { IoMdLogOut } from "react-icons/io";


const Myprofile = () => {
  const [data,setData] = useState(null)
  const [review,setReview] = useState([])

   //http://localhost:5000/myprofile
   //http://localhost:5000/myreview
    useEffect(()=>{
        axios.get('https://developers-hub-backend-2zvi.onrender.com/myprofile',{
            headers:{
                'x-token':localStorage.getItem('token')
            }
        }).then(res=>setData(res.data))

        axios.get('https://developers-hub-backend-2zvi.onrender.com/myreview',{
          headers:{
              'x-token':localStorage.getItem('token')
          }
      })
      .then(res=>{console.log(res.data);setReview(res.data)})
      .catch(err=>{
        console.error('Error fetching reviews:',err)
      })
      
    },[])

    if(!localStorage.getItem('token')){
        return <Navigate to="/login"/>
    }
  return (
    <>
    <div className='navbar'>
        <h1><Link to="/"><FaCode size={50} style={{color:'#fff',paddingRight:10}}/>Developers Hub</Link></h1>
        <div>
            <button><Link to="/myprofile"><IoPersonSharp size={25} style={{paddingRight:'5px',paddingBottom:'5px'}}/>My Profile</Link></button>
            <button><Link to="/login" onClick={()=>localStorage.removeItem('token')}>Logout <IoMdLogOut size={25} style={{paddingRight:'5'}}/></Link></button>
        </div>
    </div>
    {data && (
      <div className="myprofilepage">
        <div className='backBtnDiv'>
        <Link className='backBtn' to="/dashboard"><span><IoMdArrowRoundBack size={25}/></span>Back To Profiles</Link>
        </div>
      
      <div className="myprofileCard">
      <img src="/image2.png" alt="" style={{width:100}}/>

      <div className='profileCardContent'>
        <h2>{data.fullname}</h2>
        <p>{data.email}</p>
        <p>India</p>
      </div>
      </div>

      <div className='addingRatings'>
        <h3><GoCodeReview /><span style={{paddingLeft:10}}>Reviews and Ratings</span></h3>
        <div className='displayRating'>
          
          {review && review.length > 0 ? review.map((review, index) => (
              <div  key={index}>
                <h4><Link>{review.taskprovider}</Link></h4>
                <p>{review.rating}/5</p>
              </div>
            )) : <p className='emptyReview'>No Review added yet</p>}
        </div>
        <div className='dynamicallyAddRating'>
          <h4>Enter your reviews</h4>
          <form>
            <div>
              <input type="text" placeholder='Enter your rating out of 5' name="rating" className='ratinginput' required/>

            </div>
            <input type="submit" className="addRatingBtn" value="Add Rating"/>
          </form>
        </div>
      </div>
  </div>
    )}
    
    </>
  )
}

export default Myprofile