import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import styles from "./registerpage.module.css"; // Import CSS module
import { FcGoogle } from 'react-icons/fc';
// import Swal from 'sweetalert2'
import LoginImage from './../../assets/images/loginImage.jpg'
const LoginPage = () => {
  const navigate = useNavigate();
  const [formData,setFormData]=useState({
    email:"",
    password:""
  });

  const handleChange=(event)=>{
    const {name,value}=event.target;
    setFormData((prevData)=>({...prevData,[name]:value}));
  };

  const handleGoogleSignIn = async () => {
    window.location.href = 'http://localhost:8000/api/v1/check-auth/signin-google';
  
    // Assuming the response returns the user's role along with other data
    await fetch('http://localhost:8000/api/v1/check-auth/signin-google', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData),
      credentials: 'include'
    })
    .then(response => response.json())
    .then(data => {
      console.log(data);
      // Check if the role is 'client'
      if (data.role === 'client') {
        navigate('/cldash');
      } else {
        navigate('/advisor_dashboard');
      }
    })
    .catch(error => {
      console.error('Error:', error);
    });
  };

  const handleSubmit = async () => {
    await fetch('http://localhost:8000/api/v1/check-auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData),
      credentials: 'include'
    })
    .then(response => response.json())
    .then(data => {
      console.log(data);
      if(data.user.role === 'client'){
        navigate('/cldash')
      } else {
        navigate('/advisor_dashboard')
      }
    })
    .catch(error => {
      console.error('Error:', error);
    });
  };

  return (
    <div className={styles['register-container']}>
      <div className={styles['register-left']}>
        <img src={LoginImage} alt='' />
      </div>
      <div className={styles['register-right']}>
        <h2> Welcome Back</h2>
        <div className={styles['input-wrapper']} style={{width:"fit-content"}} >
          <h4>New User!!!
              <a href='/register'>   Register Here</a>
          </h4>
        </div>
        <div className={styles['input-wrapper']}>
          <label>Email</label>
          <input type='email' name='email' value={formData.email} onChange={handleChange}></input>
        </div>
        <div className={styles['input-wrapper']}>
          <label>Password</label>
          <input type='password' name='password' value={formData.password} onChange={handleChange}></input>
        </div>
        <div>
          <button className={styles['register-btn']} onClick={handleSubmit}>SignIn</button>
        </div>
        <hr />
        <div className={styles['gAuth']} onClick={handleGoogleSignIn}>
          <h2>Continue with </h2>
          <span className={styles['google-icon']}><FcGoogle /></span>
        </div>
      </div>
    </div>
  )
}

export default LoginPage;