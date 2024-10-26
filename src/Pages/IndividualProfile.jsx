
import React,{useState,useEffect} from 'react'
import { Link,useParams} from 'react-router-dom'
import axios from 'axios'
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import '../Components/Navbar/index.css'
import '../CSS/myprofile.css'
import { IoMdArrowRoundBack } from "react-icons/io";
import { GoCodeReview } from "react-icons/go";
import { FaCode } from "react-icons/fa6";
import { IoMdLogOut } from "react-icons/io";
import { IoPersonSharp } from "react-icons/io5";
//import { MdOutlineStar } from "react-icons/md";


const IndividualProfile = () => {
    const { id } = useParams(); // Extract the profile id from the URL
  const [profile, setProfile] = useState(null);
  const [rating,setRating ] = useState(null)
  const [taskprovider,setTaskProvider] = useState(null)
  const [workReview, setWorkReview] = useState(null)
  //const [review,setReview] = useState([])

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

      // axios.get('https://developers-hub-backend-2zvi.onrender.com/myreview',{
      //   headers:{
      //     'x-token':localStorage.getItem('token')
      //   }
      // })
      // .then((res)=>(setReview(res.data)))
  }, [id]);


  const submitHandler = e =>{
   e.preventDefault()
  try{
    axios.get('https://developers-hub-backend-2zvi.onrender.com/myprofile',{
      headers:{
          'x-token':localStorage.getItem('token')
      }
     }).then(res => setTaskProvider(res.data.fullname))
  
   let review = {
      taskprovider,
      taskworker:profile.fullname,
      rating,
      workReview
   }
   console.log('review',review)
      axios.post('https://developers-hub-backend-2zvi.onrender.com/addreview',review,{
          headers:{
              'x-token':localStorage.getItem('token')
          }
      }).then(res=> (res.data))
  
      toast.success("Rating Add Successfully!", {
        position: "top-right",
      });

  }catch (error) {
    console.error(error);
    toast.error("Failed to add rating. Please try again.", {
      position: "top-right",
    });
  }
  }

  

  

  if (!profile){
    return(
      <div className="loader-container">
        <div className="loader"></div>
        </div>
    )

  } 

  
  return (
    <>
    <ToastContainer />

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
        <h3><GoCodeReview /><span style={{paddingLeft:10}}>Add Reviews and Ratings</span></h3>
        
        <div className='dynamicallyAddRating'>
          {/* <h4>Enter your Rating</h4> */}
          <form onSubmit={submitHandler}>
          <div>
              <label>Review</label>
              <input 
              type="text" 
              placeholder='Write your review here...' 
              name="workReview" 
              className='ratinginput' 
              onChange={e =>setWorkReview(e.target.value)}
              required
              />

            </div>
            <div>
              <label>Enter your Rating</label>
              <input 
              type="text" 
              placeholder='Enter your rating out of 5' 
              name="rating" 
              className='ratinginput' 
              onChange={e =>setRating(e.target.value)}
              required
              />

            </div>
            <button type="submit" className="addRatingBtn"  >Add Rating</button>
          </form>
          {/*  */}
        </div>
      </div>

      {/* <div>
        <h3>{profile.fullname} Review and Rating</h3>
        <div>
              <div style={{display:"flex",justifyContent:"flex-start",alignItems:"center"}}>
              <img src="/commentProfileImg.png" alt=""/>
              <div style={{marginTop:'10px'}}>
                <h5>@{review.taskprovider}</h5>
                <p><MdOutlineStar size={30} style={{color:"#f5bc42",paddingRight:"5px"}}/>{review.rating}/5</p>
                
              </div>
             </div>
             <p style={{paddingLeft:'90px',paddingTop:"0px"}}>{review.workReview}</p>
            </div>
      </div> */}


  </div>
    )}
    
    </>
  )
}


export default IndividualProfile