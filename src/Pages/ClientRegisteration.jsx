import React,{useState} from 'react'
import axios from 'axios'
import {Navigate} from 'react-router-dom'


const ClientRegisteration = () => {
    const [Auth,setAuth] = useState(false)
    const [error,setError] = useState(null)
    const [data,setData] = useState({
        fullName:"",
        email:"",
        password :"",
        confirmPassword:""
      });
     
    
      const changeHandler = e =>{
        setData({...data,[e.target.name]:e.target.value})
      }
    
      
    
      // Handling form submission
      const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(data)

        if(data.password !== data.confirmPassword){
          setError('Passwords does not match');
          return
        }

        try{
          const response =  await axios.post('https://developers-hub-backend-2zvi.onrender.com/clientRegister',data);
          localStorage.setItem('token',response.data.token);
          localStorage.setItem('role',response.data.role);
          setAuth(true)
        }catch(err){
          setError(err.response?.data || 'Server Error')
        }
    
      }

      if(Auth){
        return <Navigate to="/dashboard" />
      }
  return (
    
    
        
    <div className='register-form'>
          <h3 style={{textAlign:"center"}}>Register as client</h3>
      
        <form onSubmit={handleSubmit}>
        <div>
        <label>Name:</label>
        <input
          type="text"
          name="fullName"
          
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
    
          name='confirmPassword'
          onChange={changeHandler}
          placeholder="Confirm your password"
          required
        />
      </div>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <button type="submit">Register</button>
      
        </form>
        
        
    </div>
   
  )
}

export default ClientRegisteration