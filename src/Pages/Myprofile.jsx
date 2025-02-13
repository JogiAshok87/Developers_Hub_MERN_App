import React, { useState, useEffect, useContext } from "react";
import { Link, Navigate } from "react-router-dom";

import axios from "axios";

import "../Components/Navbar/index.css";
import "../CSS/myprofile.css";
import { IoMdArrowRoundBack } from "react-icons/io";
import { GoCodeReview } from "react-icons/go";
import { FaCode } from "react-icons/fa6";
import { IoPersonSharp } from "react-icons/io5";
import { IoMdLogOut } from "react-icons/io";
import { MdOutlineStar } from "react-icons/md";

import { storeContext } from "../ContextAPI.js";

const Myprofile = () => {
  const [data, setData] = useState(null);
  //const [review,setReview] = useState([])
  const [loading, setLoading] = useState(true);
  const { reviews, setReviews } = useContext(storeContext);

  //http://localhost:5000/myprofile
  //http://localhost:5000/myreview
  // useEffect(() => {
  //   axios
  //     .get("http://localhost:5000/myprofile", {
  //       headers: {
  //         "x-token": localStorage.getItem("token"),
  //       },
  //     })
  //     .then((res) => setData(res.data))
  //     .catch((err) => console.error("Error fetching profile data:", err));

  //   axios
  //     .get("http://localhost:5000/myreview", {
  //       headers: {
  //         "x-token": localStorage.getItem("token"),
  //       },
  //     })
  //     .then((res) => {
  //       // setReviews(res.data);

  //       const filteredReviews = res.data.filter(
  //         (review) => review.taskworker === data
  //       )

  //       setLoading(false);
  //       console.log("showing his reviews", res.data);
  //     })
  //     .catch((err) => {
  //       console.error("Error fetching reviews:", err);
  //       setLoading(false);
  //     });
  // }, [setReviews]);
  useEffect(() => {
    // Fetch profile and reviews
    const fetchData = async () => {
      try {
        const profileRes = await axios.get("https://developers-hub-backend-2zvi.onrender.com/myprofile", {
          headers: {
            "x-token": localStorage.getItem("token"),
          },
        });
        setData(profileRes.data);
  
        const reviewsRes = await axios.get("https://developers-hub-backend-2zvi.onrender.com/myreview", {
          headers: {
            "x-token": localStorage.getItem("token"),
          },
        });
  
        // Filter reviews where current user is the taskworker
        const filteredReviews = reviewsRes.data.filter(
          (review) => review.taskworker === profileRes.data.fullname
        );
        
        console.log("Filtered reviews:", filteredReviews);
        setReviews(filteredReviews);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching data:", err);
        setLoading(false);
      }
    };
  
    fetchData();
  }, [setReviews]);
  

  if (!localStorage.getItem("token")) {
    return <Navigate to="/login" />;
  }

  return (
    <>
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
              />
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
      {loading ? (
        <div className="loader-container">
          <div className="loader"></div>
        </div>
      ) : (
        data && (
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
                <h2>{data.fullname}</h2>
                <p>{data.email}</p>
                <p>India</p>
              </div>
            </div>

            <div className="addingRatings">
              <h3>
                <GoCodeReview />
                <span style={{ paddingLeft: 10 }}>Reviews and Ratings</span>
              </h3>
              <div className="displayRating">
                {reviews.length > 0 ? (
                  reviews.map((review, index) => (
                    <div>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "flex-start",
                          alignItems: "center",
                        }}>
                        <img src="/commentProfileImg.png" alt="" />
                        <div style={{ marginTop: "10px" }}>
                          <h5>@{review.taskprovider}</h5>
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
                        {review.workReview ||"No Review added yet"}
                      </p>
                    </div>
                  ))
                ) : (
                  <p className="emptyReview">No Review added yet</p>
                )}
              </div>
              {/* <div className='dynamicallyAddRating'>
          <h4>Enter your reviews</h4>
          <form>
            <div>
              <input type="text" placeholder='Enter your rating out of 5' name="rating" className='ratinginput' required/>

            </div>
            <input type="submit" className="addRatingBtn" value="Add Rating"/>
          </form>
        </div> */}
            </div>
          </div>
        )
      )}
    </>
  );
};

export default Myprofile;
