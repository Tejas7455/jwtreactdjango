import React, { useState } from 'react'
import axios from 'axios';

function Register() {

    const [formData, setFormData] = useState({
      username: "",
      email: "",
      password1: "",
      password2: "",
    });

    const [isLoading,setIsLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState(null);
    const [error,setError] = useState(null);

    const handleChange=(e)=>{
        setFormData({
          ...formData,
          [e.target.name]: e.target.value
        });
       
    }
    

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(isLoading){
          return;
        }
        setIsLoading(true);

        try{
          
          const response = await axios.post('http://localhost:8000/api/register/', formData)
          console.log("success",response.data);
          setSuccessMessage("Registration Succesfull!!")
        }catch(error) {
          console.log("Error during registration:", error.response?.data);
          if (error.response && error.response.data) {
            // Server-side error
            Object.keys(error.response.data).forEach(field=>{
              const errorMessages = error.response.data[field];
              if(errorMessages && errorMessages.length > 0){
                setError(errorMessages[0])
              }
            })
            console.log("Server Error:", error.response.data);
          } else if (error.request) {
            // Network error or no response
            console.log("Network error or no response:", error.request);
          } else {
            // Other errors
            console.log("Error during registration:", error.message);
          }
        }finally {
          setIsLoading(false);
      }
    };

  return (
    <>
    <div className='container col-5 mt-5 shadow-lg p-3 mb-5 bg-body rounded'>

        <form>
          {error && <p style={{color:'red'}}>{error}</p>}
          {successMessage && <p style={{color:'green'}}>{successMessage}</p>}
          <h3><center>Register</center></h3>
                <br/>
                <label>Username</label>
                <input type="text" className="form-control" 
                  name="username" value={formData.username} onChange={handleChange} />{" "}
                <br/>
                
                <label >Email address</label>
                <input type="email"  className="form-control"  
                  name="email" value={formData.email} onChange={handleChange}/>{" "}
                <br/>
           
                <label >Password</label>
                <input type="password" className="form-control" 
                  name="password1"  value={formData.password1} onChange={handleChange}
                />{" "}
                <br/>
                <label >Confirm Password</label>
                <input type="password" className="form-control" 
                name="password2" value={formData.password2} onChange={handleChange}
                />{" "}
                <br/>
            
              <button type="submit" disabled={isLoading} onClick={handleSubmit} className="btn btn-primary btn-lg col-6">Register</button>
              <button type="reset" className="btn btn-warning btn-lg col-6">Reset</button>
        </form>
    </div>
    </>
  )
}

export default Register;