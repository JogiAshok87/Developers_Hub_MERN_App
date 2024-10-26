import React,{useState} from 'react'

import {Link,Navigate} from 'react-router-dom'
import axios from 'axios'

const Login = () => {
  const [auth,setAuth] = useState(false)
  const [data,setData] = useState({
    email:"",
    password :""
  })

  const changeHandler = e =>{
    setData({...data,[e.target.name]:e.target.value})
  }

  // Handling form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('https://developers-hub-backend-2zvi.onrender.com/login',data)
    .then(res=>{
      localStorage.setItem('token',res.data.token);setAuth(true);

    })
    .catch(error => {
      if (error.response) {
          console.log('Error response:', error.response.data);
          console.log('Error status:', error.response.status);
          console.log('Error headers:', error.response.headers);
      } else if (error.request) {
          console.log('Request made but no response received:', error.request);
      } else {
          console.log('Error setting up the request:', error.message);
      }
    })
  
    //console.log(data)
    
   
  }

  if(auth){
    return <Navigate to="/dashboard"/>
  }
  return (
    <div>
        <div className="login-form">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        {/* Input for Email */}
        <div>
          <label>Email:</label>
          <input
            type="email"
            name='email'
            onChange={changeHandler}
            placeholder="Enter your email"
            required
          />
        </div>
        {/* Input for Password */}
        <div>
          <label>Password:</label>
          <input
            type="password"
            name='password'
            onChange={changeHandler}
            placeholder="Enter your password"
            required
          />
        </div>
        {/* Display error if there's any */}
        {/*error && <p style={{ color: 'red' }}>{error}</p>*/}
        {/* Submit Button */}
        <button type="submit">Login</button>
        <div>
            <p>Don't have an account?  <Link to="/register"> Sign Up</Link></p>
        </div>
      </form>
      
    </div>
    </div>
  )
}

export default Login