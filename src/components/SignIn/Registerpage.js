import { useState } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { useNavigate } from 'react-router-dom';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import styles from './registerpage.module.css';
import RegistrationImage from './../../assets/images/RegFinancialAdvisor.jpg';
import { isElementOfType } from 'react-dom/test-utils';
 
const Register = () => {
  const [userData, setUserData] = useState(null);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    otp:'',
  });
 
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    confirmPassword: '',
    general: '',
  });
  const [getotp,setGetotp]=useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [registrationError, setRegistrationError] = useState('');
 
  const navigate = useNavigate();
 
  const handleChange = (event) => {
    const { name, value } = event.target;
 
    // Validation for name input (proper case) and empty check
    if (name === 'name') {
      const properCaseName = value.replace(/\b\w/g, (char) => char.toUpperCase());
      setFormData((prevData) => ({ ...prevData, [name]: properCaseName }));
      if (value.trim() === '') {
        setErrors((prevErrors) => ({ ...prevErrors, name: 'Name is required' }));
      } else {
        setErrors((prevErrors) => ({ ...prevErrors, name: '' }));
      }
    } else {
      setFormData((prevData) => ({ ...prevData, [name]: value }));
    }
 
    // Validation for email format
    if (name === 'email') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      setRegistrationError('');
      const isValidEmail = emailRegex.test(value);
      setErrors((prevErrors) => ({ ...prevErrors, email: isValidEmail ? '' : 'Invalid email format' }));
    }
 
    // Validation for password and confirm password match
    if (name === 'confirmPassword') {
      const isValidPasswordMatch = value === formData.password;
      setErrors((prevErrors) => ({ ...prevErrors, confirmPassword: isValidPasswordMatch ? '' : 'Passwords do not match' }));
    }
  };
 
  const handleGoogleSignIn = () => {
      window.location.href = 'http://localhost:8000/api/v1/check-auth/signin-google';
    };
function handlegetotp()
{
  fetch('http://localhost:8000/api/v1/otp/send-otp',{
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({email:formData.email})
  });
  setGetotp(true);
 
}
  const handleSubmit = () => {
    console.log(formData);
    fetch('http://localhost:8000/api/v1/check-auth/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
      credentials: 'include',
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to register. Please try again.');
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        // Storing name and email in session storage
        sessionStorage.setItem('name', formData.name);
        sessionStorage.setItem('email', formData.email);
        navigate('/client_registration_form');
      })
      .catch((error) => {
        console.error('Error:', error);
        if (error.message.includes('E11000')) {
          setRegistrationError('Email already exists. Please use a different email.');
        } else {
          setRegistrationError('Email already exists. Please use a different email.');
        }
      });
  };
 
  return (
    <div className={styles['register-container']}>
      <div className={styles['register-left']}>
        <img src={RegistrationImage} alt="Registration" />
      </div>
      <div className={styles['register-right']}>
        <h2 className={styles['h4-welcome-label']}>Welcome Client</h2>
        <div className={styles['input-wrapper']} style={{ width: "fit-content" }} >
          <h4 className={styles['register-label']}>Already a user &nbsp;|&nbsp;&nbsp;<a href='/login' className={styles.register_link}>Login Here</a></h4>
        </div>
        <div className={styles['input-wrapper']}>
          <label>Name</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} />
          {errors.name && <span className={styles['error-message']}>{errors.name}</span>}
        </div>
 
        <div className={styles['input-wrapper']}>
          <label>Email</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} />
          {errors.email && <span className={styles['error-message']}>{errors.email}</span>}
        </div>
 
        <div className={styles['input-wrapper']}>
          <label>Password</label>
          <div className={styles['password-input-wrapper']}>
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
            <button
              type="button"
              className={styles['password-toggle-btn']}
              onClick={() => setShowPassword((prevShowPassword) => !prevShowPassword)}
            >
              {showPassword ? <AiFillEye /> : <AiFillEyeInvisible />}
            </button>
          </div>
        </div>
 
        <div className={styles['input-wrapper']}>
          <label>Confirm Password</label>
          <div className={styles['password-input-wrapper']}>
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
            <button
              type="button"
              className={styles['password-toggle-btn']}
              onClick={() => setShowConfirmPassword((prevShowConfirmPassword) => !prevShowConfirmPassword)}
            >
              {showConfirmPassword ? <AiFillEye /> : <AiFillEyeInvisible />}
            </button>
          </div>
          {errors.confirmPassword && <span className={styles['error-message']}>{errors.confirmPassword}</span>}
        </div>
 
        {errors.general && <span className={styles['error-message']}>{errors.general}</span>}
        {registrationError && <span className={styles['error-message']}>{registrationError}</span>}
        {getotp?<div className={styles['input-wrapper']}>
          <label>Otp</label>
          <input type="number" name="otp" value={formData.otp} onChange={handleChange} />
         
        </div>:null}
        <div style={{width:"100%"}}>
          <button id="landing_signup" className={styles['register-btn']} onClick={!getotp?handlegetotp:handleSubmit}>{getotp?'Register':'Get OTP'}</button>
        </div>
 
        <hr />
 
        {/* <div className={styles['gAuth']}>
          <h2>Continue with </h2>
          <span className={styles['google-icon']}><FcGoogle /></span>
        </div> */}
        <div id="googlebutton" className={styles['gAuth']} onClick={handleGoogleSignIn}>
            <h2>Continue with</h2>
            <span className={styles['google-icon']}><FcGoogle /></span>
          </div>
      </div>
    </div>
  );
};
 
export default Register;
 