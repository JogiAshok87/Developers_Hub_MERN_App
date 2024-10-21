import React,{useState} from 'react'
import {Link,Navigate } from 'react-router-dom'
import axios from 'axios';
const Register = () => {
      // State for form fields
  const [auth, setAuth] = useState(false);
  const [data,setData] = useState({
    fullname:"",
    email:"",
    mobile:"",
    skill:"",
    password :"",
    Confirmpassword:""
  });
  const [error, setError] = useState(null);

  const changeHandler = e =>{
    setData({...data,[e.target.name]:e.target.value})
  }

  

  // Handling form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(data)

    // Ensure password and confirmPassword match before sending to backend
    if (data.password !== data.Confirmpassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      const response = await axios.post('https://developers-hub-backend-2zvi.onrender.com/register', data); //http://localhost:5000/register
      localStorage.setItem('token', response.data.token); // Assuming the backend returns a token
      setAuth(true);
    } catch (err) {
      // Handle errors, for example, user already registered or validation errors
      setError(err.response?.data || 'Server Error');
    }
  };

  if (auth) {
    return <Navigate to="/dashboard" />;
  }
  // Handling form submission
  
  return (
    <div className="register-form">
    <h2>Register</h2>
    <form onSubmit={handleSubmit}>
      {/* Name */}
      <div>
        <label>Name:</label>
        <input
          type="text"
          name="fullname"
          
          onChange={changeHandler}
          placeholder="Enter your name"
          required
        />
      </div>
      
      {/* Email */}
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
      
      {/* Mobile */}
      <div>
        <label>Mobile:</label>
        <input
          type="tel"
          name='mobile'
          onChange={changeHandler}
          placeholder="Enter your mobile number"
          required
        />
      </div>
      
      {/* Skill */}
      <div>
        <label>Skill:</label>
        <input
          type="text"
          name='skill'
          onChange={changeHandler}
          placeholder="Enter your skill"
          required
        />
        <p style={{color:'grey',margin:'1px',textAlign:'left'}}><span style={{color:"red"}}>* </span>Please provide skills by separation of comma(,)</p>
      </div>
      
      {/* Password */}
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
      
      {/* Confirm Password */}
      <div>
        <label>Confirm Password:</label>
        <input
          type="password"
    
          name='Confirmpassword'
          onChange={changeHandler}
          placeholder="Confirm your password"
          required
        />
      </div>
      
      {/* Error message */}
      {/* {error && <p style={{ color: 'red' }}>{error}</p>} */}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      
      {/* Register Button */}
      <button type="submit">Register</button>
    </form>

    {/* Already have an account */}
    <p>
      Already have an account? <Link to="/login">Sign In</Link>
    </p>
  </div>
  )
}

export default Register