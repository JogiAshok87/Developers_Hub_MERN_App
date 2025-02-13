import React, { useState, useEffect, useContext ,useCallback} from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../Components/Navbar/index.css";
import "../CSS/myprofile.css";
import { IoMdArrowRoundBack } from "react-icons/io";
import { GoCodeReview } from "react-icons/go";
import { FaCode } from "react-icons/fa6";
import { IoMdLogOut } from "react-icons/io";
import { IoPersonSharp } from "react-icons/io5";
import { MdOutlineStar } from "react-icons/md";

import { storeContext } from "../ContextAPI";

const IndividualProfile = () => {
  const { id } = useParams(); // Extract the profile id from the URL
  const [profile, setProfile] = useState(null);
  const [rating, setRating] = useState("");
  // const [taskprovider, setTaskProvider] = useState(null);
  const [workReview, setWorkReview] = useState("");
  const { reviews,setReviews } = useContext(storeContext);
  

  //http://localhost:5000/allprofiles
  //http://localhost:5000/myprofile
  //http://localhost:5000/addreview
  //http://localhost:5000/myreview

  useEffect(() => {
    // Fetch the profile details based on the id

    const fetchProfile = async () => {
      try {
        console.log("Fetching profile for ID:", id);
        const response = await axios.get(
          "http://localhost:5000/allprofiles",
          {
            headers: {
              "x-token": localStorage.getItem("token"),
            },
          }
        );

        const selectedProfile = response.data.find(p => p._id === id);
        console.log("Found profile:", selectedProfile);
        setProfile(selectedProfile);
      } catch (err) {
        console.error("Error fetching profile:", err);
        toast.error("Failed to load profile");
      }
    };

    fetchProfile();
}, [id]);


  const fetchReviews= useCallback(async() => {
    if (!profile?.fullname) {
      console.log("No profile fullname yet, skipping review fetch");
      return;
    }

    try {
      console.log("Fetching reviews for:", profile.fullname);
      const response = await axios.get(
        "http://localhost:5000/myreview",
        {
          headers: {
            "x-token": localStorage.getItem("token"),
          },
        }
      );

      // console.log("Raw reviews response:", response.data);

      // if (Array.isArray(response.data)) {
      //   const filteredReviews = response.data.filter(
      //     review => review.taskworker.toLowerCase() === profile.fullname.toLowerCase()
      //   );
      //   console.log("Filtered reviews:", filteredReviews);
      //   setReviews(filteredReviews);
      // } else {
      //   console.error("Unexpected response format:", response.data);
      // }

      // console.log("All reviews from API", response.data);
      const filteredReviews = response.data.filter(
        (review) => review.taskworker.toLowerCase() === profile.fullname.toLowerCase()
      );
      // console.log("Filtered Reviews", filteredReviews);
      setReviews(filteredReviews);
    } catch (err) {
      console.error("Error fetching reviews:", err);
      toast.error("Failed to load reviews");
    } 
    
  },[profile?.fullname,setReviews]);

  
useEffect(()=>{
    
      fetchReviews()
},[fetchReviews]);




  const submitHandler = async(e) => {
    e.preventDefault();
    try {
      

      const clientResponse = await axios.get("http://localhost:5000/clientProfile",{
        headers:{
          "x-token":localStorage.getItem("token"),
        },
      });

      const clientName = clientResponse.data?.fullName || clientResponse.data?.data?.fullName
      // console.log("client Name",clientName)

      let review = {
        taskprovider :clientName,
        taskworker: profile.fullname,
        rating,
        workReview,
      };
      console.log("review from frontend", review);
      await axios
        .post(
          "http://localhost:5000/addreview",
          review,
          {
            headers: {
              "x-token": localStorage.getItem("token"),
            },
          }
        )
        .then((res) =>{
          // console.log("Server resposne:",res.data)
          if (res.data && res.data.review && res.data.review.taskprovider){

            // console.log("Newly added review :",res.data.review)
            
            setReviews((prevReviews) => [res.data.review,...prevReviews]);
            // fetchReviews();
            // Reset form
          setRating("");
          setWorkReview("");

          
          }

          

          
        });


      toast.success("Rating Add Successfully!", {
        position: "top-right",
      });


    } catch (error) {
      console.error(error);
      toast.error("Failed to add rating. Please try again.", {
        position: "top-right",
      });
    }
  };

  if (!profile) {
    return (
      <div className="loader-container">
        <div className="loader"></div>
      </div>
    );
  }

  return (
    <>
      <ToastContainer />

      <div className="navbar">
        <h1>
          <Link to="/">
            <FaCode size={50} style={{ color: "#fff", paddingRight: 10 }} />
            Developers Hub
          </Link>
        </h1>
        <div>
          <button>
            <Link to="/myprofile">
              <IoPersonSharp
                size={25}
                style={{ paddingRight: "5px", paddingBottom: "5px" }}
              />{" "}
              My Profile
            </Link>
          </button>
          <button>
            <Link to="/login" onClick={() => localStorage.removeItem("token")}>
              Logout <IoMdLogOut size={25} style={{ paddingRight: "5" }} />
            </Link>
          </button>
        </div>
      </div>
      {profile && (
        <div className="myprofilepage">
          <div className="backBtnDiv">
            <Link className="backBtn" to="/dashboard">
              <span>
                <IoMdArrowRoundBack size={25} />
              </span>
              Back To Profiles
            </Link>
          </div>

          <div className="myprofileCard">
            <img src="/image2.png" alt="" style={{ width: 100 }} />
            <div className="profileCardContent">
              <h2>{profile.fullname}</h2>
              <p>{profile.email}</p>
              <p>India</p>
            </div>
          </div>

          <div className="addingRatings">
            <h3>
              <GoCodeReview />
              <span style={{ paddingLeft: 10 }}>Add Reviews and Ratings</span>
            </h3>

            <div className="dynamicallyAddRating">
              {/* <h4>Enter your Rating</h4> */}
              <form onSubmit={submitHandler}>
                <div>
                  <label>Review</label>
                  <input
                    type="text"
                    value={workReview}
                    placeholder="Write your review here..."
                    name="workReview"
                    className="ratinginput"
                    onChange={(e) => setWorkReview(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label>Enter your Rating</label>
                  <input
                    type="text"
                    value={rating}
                    placeholder="Enter your rating out of 5"
                    name="rating"
                    className="ratinginput"
                    onChange={(e) => setRating(e.target.value)}
                    required
                  />
                </div>
                <button type="submit" className="addRatingBtn">
                  Add Rating
                </button>
              </form>
              {/*  */}
            </div>
          </div>

          
          <div style={{ marginTop: "50px", marginLeft: "10px" }}>
            <h3>
              <strong style={{ color: "#FF9D3D" }}>{profile.fullname}'s</strong>{" "}
              Reviews and Ratings
            </h3>
            <div className="displayReviewsandRatings">
              {Array.isArray(reviews) && reviews.length > 0 ? (
                reviews.map((review, index) => (
                  <div key={review._id}>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "flex-start",
                        alignItems: "center",
                      }}>
                      <img src="/commentProfileImg.png" alt="" />
                      <div style={{ marginTop: "10px" }}>
                        <h5>@{review.taskprovider || "unknown"}</h5>
                        <p>
                          <MdOutlineStar
                            size={30}
                            style={{ color: "#f5bc42", paddingRight: "5px" }}
                          />
                          {review.rating}/5
                        </p>
                      </div>
                    </div>
                    <p style={{ paddingLeft: "90px", paddingTop: "0px" ,color: review.workReview ? "black" : "red" }}>
                      {review.workReview || "No Review added yet"}
                    </p>
                  </div>
                ))
              ) : (
                <p className="emptyReview">No Review added yet</p>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default IndividualProfile;
