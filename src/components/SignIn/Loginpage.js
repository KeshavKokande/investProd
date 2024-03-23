import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from "./registerpage.module.css";
import { FcGoogle } from 'react-icons/fc';

const LoginPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

// Handle Google sign-in
const handleGoogleSignIn = () => {
  window.location.href = 'http://localhost:8000/api/v1/check-auth/signin-google'; 
};

  const handleSubmit = async () => {
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
        throw new Error('Failed to sign in');
      }

      const data = await response.json();
      console.log(data);

      if (data.user && data.user.role === 'client') {
        navigate('/cldash');
      } else if (data.user && data.user.role === 'advisor') {
        navigate('/advisor_dashboard');
      } else {
        console.error('User role not recognized');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className={styles['register-container']}>
      <div className={styles['register-left']}>
        <img src='https://us.123rf.com/450wm/topvector/topvector2209/topvector220900965/192918408-financial-advisor-giving-advice-investment-money-market-analysis-management-planning-for-customer.jpg?ver=6' alt='' />
      </div>
      <div className={styles['register-right']}>
        <h2> Welcome Back</h2>
        <div className={styles['input-wrapper']} style={{ width: "fit-content" }} >
          <h4>New User!!!<a href='/register'>   Register Here</a></h4>
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
  );
};

export default LoginPage;

// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import styles from "./registerpage.module.css";
// import { FcGoogle } from 'react-icons/fc';

// const LoginPage = () => {
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     email: "",
//     password: ""
//   });

//   // useEffect(() => {
//   //   const handleGoogleRedirect = async () => {
//   //     if (window.location.pathname === '/login') {
//   //       const urlParams = new URLSearchParams(window.location.search);
//   //       const token = urlParams.get('token');
//   //       const user = JSON.parse(urlParams.get('user'));
        
//   //       if (token && user) {
//   //         localStorage.setItem('token', token);
//   //         localStorage.setItem('user', JSON.stringify(user));

//   //         if (user.role === 'client') {
//   //           navigate('/cldash');
//   //         } else if (user.role === 'advisor') {
//   //           navigate('/advisor_dashboard');
//   //         }
//   //       }
//   //     }
//   //   };

//   //   handleGoogleRedirect();
//   // }, [navigate]);

//   const handleChange = (event) => {
//     const { name, value } = event.target;
//     setFormData((prevData) => ({ ...prevData, [name]: value }));
//   };

//   // const handleGoogleSignIn = async () => {
//   //   // window.location.href = 'http://localhost:8000/api/v1/check-auth/signin-google';
//   //   try {
//   //     const response = await fetch('http://localhost:8000/api/v1/check-auth/triggering-the-sso', {
//   //       method: 'POST',
//   //       headers: {
//   //         'Content-Type': 'application/json'
//   //       },
//   //       body: JSON.stringify(formData),
//   //       credentials: 'include'
//   //     });

//   //     if (!response.ok) {
//   //       throw new Error('Failed to sign in');
//   //     }

//   //     const data = await response.json();
//   //     console.log(data);

//   //     if (data.user && data.user.role === 'client') {
//   //       navigate('/cldash');
//   //     } else if (data.user && data.user.role === 'advisor') {
//   //       navigate('/advisor_dashboard');
//   //     } else {
//   //       console.error('User role not recognized');
//   //     }
//   //   } catch (error) {
//   //     console.error('Error:', error);
//   //   }

//   // };


//   const handleGoogleSignIn = async () => {
//     try {
//       const response = await fetch('http://localhost:8000/api/v1/check-auth/triggering-the-sso', {
//         method: 'GET',
//         headers: {
//           'Content-Type': 'application/json'
//         },
//         credentials: 'include'
//       });
  
//       if (!response.ok) {
//         throw new Error('Failed to sign in');
//       }
  
//       const token = response.headers.get('jwt'); // Get JWT token from response headers
//       const user = JSON.parse(response.headers.get('user')); // Get user object from response headers
  
//       // Store token and user object in local storage
//       localStorage.setItem('token', token);
//       localStorage.setItem('user', JSON.stringify(user));
  
//       // Redirect to appropriate dashboard based on user role
//       if (user.role === 'client') {
//         navigate('/cldash');
//       } else if (user.role === 'advisor') {
//         navigate('/advisor_dashboard');
//       }
//     } catch (error) {
//       console.error('Error:', error);
//     }
//   };
  



//   const handleSubmit = async () => {
//     try {
//       const response = await fetch('http://localhost:8000/api/v1/check-auth/login', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(formData),
//         credentials: 'include'
//       });

//       if (!response.ok) {
//         throw new Error('Failed to sign in');
//       }

//       const data = await response.json();
//       console.log(data);

//       if (data.user && data.user.role === 'client') {
//         navigate('/cldash');
//       } else if (data.user && data.user.role === 'advisor') {
//         navigate('/advisor_dashboard');
//       } else {
//         console.error('User role not recognized');
//       }
//     } catch (error) {
//       console.error('Error:', error);
//     }
//   };

//   return (
//     <div className={styles['register-container']}>
//       <div className={styles['register-left']}>
//         <img src='https://us.123rf.com/450wm/topvector/topvector2209/topvector220900965/192918408-financial-advisor-giving-advice-investment-money-market-analysis-management-planning-for-customer.jpg?ver=6' alt='' />
//       </div>
//       <div className={styles['register-right']}>
//         <h2> Welcome Back</h2>
//         <div className={styles['input-wrapper']} style={{ width: "fit-content" }} >
//           <h4>New User!!!<a href='/register'>   Register Here</a></h4>
//         </div>
//         <div className={styles['input-wrapper']}>
//           <label>Email</label>
//           <input type='email' name='email' value={formData.email} onChange={handleChange}></input>
//         </div>
//         <div className={styles['input-wrapper']}>
//           <label>Password</label>
//           <input type='password' name='password' value={formData.password} onChange={handleChange}></input>
//         </div>
//         <div>
//           <button className={styles['register-btn']} onClick={handleSubmit}>SignIn</button>
//         </div>
//         <hr />
//         <div className={styles['gAuth']} onClick={handleGoogleSignIn}>
//           <h2>Continue with </h2>
//           <span className={styles['google-icon']}><FcGoogle /></span>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LoginPage;
