import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from "./registerpage.module.css";
import { FcGoogle } from 'react-icons/fc';
import LoginImage from './../../assets/images/loginImage.jpg';

const LoginPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleGoogleSignIn = () => {
    window.location.href = 'http://localhost:8000/api/v1/check-auth/signin-google';
  };

  const handleSubmit = async () => {
    if (!formData.email || !formData.password) {
      setErrorMessage('Please enter both email and password.');
      return;
    }

    try {
      const response = await fetch('http://localhost:8000/api/v1/check-auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData),
        credentials: 'include'
      });

      if (!response.ok) {
        const errorData = await response.json();
        setErrorMessage(`Error: ${errorData.message}`);
        return;
      }

      const data = await response.json();
      console.log(data);
      if (data.user.role === 'client') {
        navigate('/cldash');
      } else {
        navigate('/advisor_dashboard');
      }
    } catch (error) {
      console.error('Error:', error);
      setErrorMessage('An unexpected error occurred. Please try again later.');
    }
  };

  return (
    <div className={styles['register-container']}>
      <div className={styles['register-left']}>
        <img src={LoginImage} alt='' />
      </div>
      <div className={styles['register-right']}>
        <h2> Welcome Back</h2>
        <div className={styles['input-wrapper']} style={{ width: "fit-content" }} >
          <h4>New User!!!<a href='/register'>Register Here</a></h4>
        </div>
        <div className={styles['input-wrapper']}>
          <label>Email</label>
          <input type='email' name='email' value={formData.email} onChange={handleChange} />
        </div>
        <div className={styles['input-wrapper']}>
          <label>Password</label>
          <input type='password' name='password' value={formData.password} onChange={handleChange} />
        </div>
        {errorMessage && <div className={styles['error-message']}><strong>Invalid Email/Passwoard</strong></div>}
        <div>
          <button className={styles['register-btn']} onClick={handleSubmit}>SignIn</button>
        </div>
        <hr />
        <div className={styles['gAuth']} onClick={handleGoogleSignIn}>
          <h2>Continue with</h2>
          <span className={styles['google-icon']}><FcGoogle /></span>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
