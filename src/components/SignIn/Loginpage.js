import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from "./registerpage.module.css";
import { FcGoogle } from 'react-icons/fc';
import LoginImage from './../../assets/images/loginImage.jpg';
import Swal from 'sweetalert2';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import ReCAPTCHA from "react-google-recaptcha";

const LoginPage = () => {
  const navigate = useNavigate();
  const [verified, setVerified] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  // const [errorMessage, setErrorMessage] = useState("");
  // const [selectedRole, setSelectedRole] = useState("client"); // State to track selected user role

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleGoogleSignIn = () => {
    window.location.href = 'http://localhost:8000/api/v1/check-auth/signin-google';
  };

  const handleSubmit = async () => {
    if (!formData.email || !formData.password) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Please enter both email and password.'
      });
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
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: errorData.message
        });
        return;
      }

      const data = await response.json();
      // console.log(data);

      // Check the selected role to redirect appropriately
      if (data.user.role === 'client') {
        navigate('/client_dashboard');
      } else if (data.user.role === 'advisor') {
        navigate('/advisor_dashboard');
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'You are not authorized to access this dashboard.'
        });
      }
    } catch (error) {
      console.error('Error:', error);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'An unexpected error occurred. Please try again later.'
      });
    }
  };

  useEffect(() => {
    // Check if the cookie is set
    const cookieExists = document.cookie.includes('jwt');

    if (cookieExists) {
      if (sessionStorage.getItem('role') == 'advisor') {
        window.location.href = '/advisor_dashboard';
      }
      else if (sessionStorage.getItem('role') == 'client') {
        window.location.href = '/client_dashboard';
      }
    } else {
      // Cookie is not set
      // Perform any action you want if the cookie is not set, such as redirecting to the login page
      if (!['/login'].includes(window.location.pathname)) {
        window.location.href = '/login';
      }
    }
  }, []);

  function onCheck(value) {
    console.log("Captcha value:", value);
    setVerified(true);
  }

  return (
    <div className={styles['register-container']}>
      <div className={styles['register-left']}>
        <img src={LoginImage} alt='' />
      </div>
      <div className={styles['register-right']}>
        <h2 className={styles.h2_label}> Welcome Back</h2>
        <div className={styles['input-wrapper']} style={{ width: "fit-content" }} >
          <h4 className={styles['h4-register-label']}>New User &nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;<a href='/register' className={styles.register_link}>Register Here</a></h4>
        </div>
        <div className={styles['input-wrapper']}>
          <label>Email</label>
          <input type='email' name='email' value={formData.email} onChange={handleChange} />
        </div>
        <div className={styles['input-wrapper']}>
          <label>Password</label>
          <input type={showPassword ? 'text' : 'password'} name='password' value={formData.password} onChange={handleChange} />
          <button
            type='button'
            className={styles['password-toggle-btn']}
            onClick={() => setShowPassword((prevShowPassword) => !prevShowPassword)}
          >
            {showPassword ? <AiFillEye /> : <AiFillEyeInvisible />}
          </button>
        </div>
        {/* {errorMessage && <div className={styles['error-message']}><strong>Invalid Email/Passwoard</strong></div>} */}
        {/* <div className={styles['input-wrapper']}>
          <select className="role-based-toggle" value={selectedRole} onChange={(e) => setSelectedRole(e.target.value)}>
            <option value="client">Client</option>
            <option value="advisor">Advisor</option>
          </select>
        </div> */}
        
        <ReCAPTCHA
          // sitekey="6LccOscpAAAAAO5FQ0QrItjP-6i0kmbMD6ha2MKW"
          sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
          onChange={onCheck}
        />
        <div style={{ width: "100%" }}>
          <button id="landing_signup" className={styles['register-btn']} onClick={handleSubmit} disabled={!verified}>Sign In</button>
        </div>
        <hr />
        <div id="googlebutton" className={styles['gAuth']} onClick={handleGoogleSignIn}>
          <h2>Continue with</h2>
          <span className={styles['google-icon']}><FcGoogle /></span>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
