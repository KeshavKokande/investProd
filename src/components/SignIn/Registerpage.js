import { useState } from 'react';
import styles from "./registerpage.module.css";
import { FcGoogle } from 'react-icons/fc';
import { useNavigate } from 'react-router-dom';
import RegistrationImage from './../../assets/images/RegFinancialAdvisor.jpg'
const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword:""
  });
  const navigate = useNavigate();
  
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = () => {
    fetch('http://localhost:8000/api/v1/check-auth/signup', {
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
      // Storing name and email in session storage
      sessionStorage.setItem('name', formData.name);
      sessionStorage.setItem('email', formData.email);
      navigate('/clform');
    })
    .catch(error => {
      console.error('Error:', error);
    });
  };

  return (
    <div className={styles['register-container']}>
      <div className={styles['register-left']}>
        <img src={RegistrationImage} />
      </div>
      <div className={styles['register-right']}>
         <h2> Welcome User!!!</h2>
         <div className={styles['input-wrapper']}>
            <label>Name</label>
            <input type='text' name='name' value={formData.name} onChange={handleChange}></input>
         </div>
       
         <div className={styles['input-wrapper']}>
            <label>Email</label>
            <input type='email' name='email' value={formData.email} onChange={handleChange}></input>
         </div>

         <div className={styles['input-wrapper']}>
            <label>Password</label>
            <input type='password' name='password' value={formData.password} onChange={handleChange}></input>
         </div>
         <div className={styles['input-wrapper']}>
            <label>Confirm Password</label>
            <input type='password' name='confirmPassword' value={formData.confirmPassword} onChange={handleChange}></input>
         </div>
         
         <div>
            <button className={styles['register-btn']} onClick={handleSubmit}>Register</button>
         </div>
         <hr />
         <div className={styles['gAuth']}>
          <h2>Continue with </h2>
            <span className={styles['google-icon']}><FcGoogle /></span>
        </div>
      </div>
    </div>
  );
}

export default Register;