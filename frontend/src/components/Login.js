import React, { useState } from 'react';
import axios from 'axios';

function Login() {

  const [formData, setFormData] = useState({
    email:"",
    password:""
  })

  const handleChange = (e)=>{
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const [isLoading,setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState(null);
  const [error,setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(isLoading){
      return;
    }
    setIsLoading(true);

    try{
      
      const response = await axios.post('http://127.0.0.1:8000/api/login/', formData)
      console.log("success",response.data);
      setSuccessMessage("Login Succesfull!!")
      localStorage.setItem("accessToken",response.data.tokens.access);
      localStorage.setItem("refreshToken",response.data.tokens.refresh);
    }catch(error) {
      console.log("Error during Login:", error.response?.data);
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
    <div>
    <form className='container col-4 mt-5 shadow-lg p-3 mb-5 bg-body rounded'>
    {error && <p style={{color:'red'}}>{error}</p>}
    {successMessage && <p style={{color:'green'}}>{successMessage}</p>}
        <h3><center>Login</center></h3>
                <br/>
               
                <label>Email address</label>
                <input type="email"  className="form-control" name="email"
                  value={formData.email} onChange={handleChange} />
                <br/>
           
                <label>Password</label>
                <input type="password"  className="form-control" name="password"
                  value={formData.password} onChange={handleChange}/>
                <br/>
                
                <div class="d-grid gap-2 mx-auto">
                    <button class="btn btn-primary" disabled={isLoading} onClick={handleSubmit} type="submit">Login</button>
                    <button class="btn btn-warning" type="reset">Reset</button>
                </div>
        </form>
    </div>
    </>
  )
}

export default Login;