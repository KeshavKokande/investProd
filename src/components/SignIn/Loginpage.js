import { useState } from 'react'
import {useNavigate } from 'react-router-dom';
 
import './registerpage.css'
import { FcGoogle } from 'react-icons/fc';
 
const Loginpage = () => {
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
    <div className='register-container'>
     <div className='register-left'>
        <img src='https://us.123rf.com/450wm/topvector/topvector2209/topvector220900965/192918408-financial-advisor-giving-advice-investment-money-market-analysis-management-planning-for-customer.jpg?ver=6' alt=''></img>
      </div>
    <div className='register-right'>
       <h2> Welcome Back</h2>
       <div className='input-wrapper' style={{width:"fit-content"}} >
           <h4>New User!!!
                <a href='/register'>   Register Here</a>
          </h4>
     </div>
       <div className='input-wrapper'>
          <label>Email</label>
          <input type='email' name='email' value={formData.email} onChange={handleChange}></input>
       </div>
 
       <div className='input-wrapper'>
          <label>Password</label>
          <input type='password' name='password' value={formData.password} onChange={handleChange}></input>
       </div>
       <div>
          <button className='register-btn' onClick={handleSubmit}>SignIn</button>
       </div>
       <hr></hr>
 
       <div className='gAuth' onClick={handleGoogleSignIn}>
          <h2>Continue with </h2>
          <span className="google-icon"><FcGoogle /></span>
        </div>
    </div>
 
  </div>
  )
}
 
export default Loginpage;