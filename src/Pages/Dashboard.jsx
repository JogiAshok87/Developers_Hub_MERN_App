import React, { useEffect, useState, useContext } from "react";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import "../Components/Navbar/index.css";
import { FaCode } from "react-icons/fa6";
import { TiTick } from "react-icons/ti";
import { IoPersonSharp } from "react-icons/io5";
import { IoMdLogOut } from "react-icons/io";

import { storeContext } from "../ContextAPI";

const Dashboard = () => {
  const { setReviews } = useContext(storeContext);
  //http://localhost:5000/allprofiles
  const [data, setData] = useState([]);
  useEffect(() => {
    axios
      .get("https://developers-hub-backend-2zvi.onrender.com/allprofiles", {
        headers: {
          "x-token": localStorage.getItem("token"),
        },
      })
      .then((res) => setData(res.data));

    axios
      .get("https://developers-hub-backend-2zvi.onrender.com/myreview", {
        headers: {
          "x-token": localStorage.getItem("token"),
        },
      })
      .then((res) => {
        setReviews(res.data);

        console.log("showing his reviews", res.data);
      })
      .catch((err) => {
        console.error("Error fetching reviews:", err);
      });
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
        <div className="dashboardNavbarBtns">
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
      <div className="dashboard">
        <h1>Developers</h1>
        <p className="gap-5">
          <i class="fa-solid fa-globe"></i>
          <span style={{ marginLeft: "5px" }}>
            Browse and connect with developers
          </span>
        </p>
        <div>
          {data.length >= 1 ? (
            data.map((eachprofile, index) => (
              <div className="profileCard" key={index}>
                <div className="cardContent">
                  <div>
                    <img src="/image1.png" alt="" style={{ width: 200 }} />
                  </div>
                  <div>
                    <h2>{eachprofile.fullname}</h2>
                    <p>{eachprofile.email}</p>
                    <p>India</p>
                    <Link
                      className="viewProfileBtn"
                      to={`/individualProfile/${eachprofile._id}`}>
                      View Profile
                    </Link>
                  </div>
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "flex-start",
                    alignItems: "center",
                    paddingRight: "50",
                  }}>
                  <h5>Skills :</h5>
                  <ul>
                    {eachprofile.skill.split(",").map((skill,index) => (
                      <li key={index}>
                        <TiTick size={25} style={{ color: "#0995BA" }} />
                        {skill}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))
          ) : (
            <div className="loader-container">
              <div className="loader"></div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Dashboard;
