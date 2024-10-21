
import React,{useState,useEffect} from 'react'
import { Link,useParams} from 'react-router-dom'
import axios from 'axios'

import '../Components/Navbar/index.css'
import '../CSS/myprofile.css'
import { IoMdArrowRoundBack } from "react-icons/io";
import { GoCodeReview } from "react-icons/go";
import { FaCode } from "react-icons/fa6";
import { IoMdLogOut } from "react-icons/io";
import { IoPersonSharp } from "react-icons/io5";


const IndividualProfile = () => {
    const { id } = useParams(); // Extract the profile id from the URL
  const [profile, setProfile] = useState(null);
  const [rating,setRating ] = useState(null)
  const [taskprovider,setTaskProvider] = useState(null)

  //http://localhost:5000/allprofiles
  //http://localhost:5000/myprofile
  //http://localhost:5000/addreview

  useEffect(() => {
    // Fetch the profile details based on the id
    
    axios.get('https://developers-hub-backend-2zvi.onrender.com/allprofiles',{
        headers:{
            'x-token':localStorage.getItem('token')
        }
    })
      .then(res => {
        const selectedProfile = res.data.find(profile=> profile._id === id);
        setProfile(selectedProfile)
      })
      .catch(err => console.error(err));
  }, [id]);

  const submitHandler = e =>{
   axios.get('https://developers-hub-backend-2zvi.onrender.com/myprofile',{
    headers:{
        'x-token':localStorage.getItem('token')
    }
   }).then(res => setTaskProvider(res.data.fullname))

 let review = {
    taskprovider,
    taskworker:profile.id,
    rating,
 }
    axios.post('https://developers-hub-backend-2zvi.onrender.com/addreview',review,{
        headers:{
            'x-token':localStorage.getItem('token')
        }
    }).then(res=> alert(res.data))
  }

  if (!profile) return <div>Loading...</div>;
  return (
    <>
    <div className='navbar'>
        <h1><Link to="/"><FaCode size={50} style={{color:'#fff',paddingRight:10}}/>Developers Hub</Link></h1>
        <div>
            <button><Link to="/myprofile"><IoPersonSharp size={25} style={{paddingRight:'5px',paddingBottom:'5px'}}/> My Profile</Link></button>
            <button><Link to="/login" onClick={()=>localStorage.removeItem('token')}>Logout <IoMdLogOut size={25} style={{paddingRight:'5'}}/></Link></button>
        </div>
    </div>
    {profile && (
      <div className="myprofilepage">
        <div className='backBtnDiv'>
        <Link className='backBtn' to="/dashboard"><span><IoMdArrowRoundBack size={25}/></span>Back To Profiles</Link>
        </div>
      
      <div className="myprofileCard">
      <img src="/image2.png" alt="" style={{width:100}}/>
      <div className='profileCardContent'>
        <h2>{profile.fullname}</h2>
        <p>{profile.email}</p>
        <p>India</p>
      </div>
      </div>

      <div className='addingRatings'>
        <h3><GoCodeReview /><span style={{paddingLeft:10}}>Reviews and Ratings</span></h3>
        
        <div className='dynamicallyAddRating'>
          <h4>Enter your reviews</h4>
          <form onSubmit={submitHandler}>
            <div>
              <input 
              type="text" 
              placeholder='Enter your rating out of 5' 
              name="rating" 
              className='ratinginput' 
              onChange={e =>setRating(e.target.value)}
              required
              />

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

export default IndividualProfile