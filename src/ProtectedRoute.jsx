
// import React from 'react'
// import { Navigate } from 'react-router-dom';
// // import { toast } from 'react-toastify';

// function ProtectedRoute({children}) {
// const token=sessionStorage.getItem('token');
// if(!token){
//     sessionStorage.clear();
//     // toast.error('Login then try to access')
//     console.log("token :", token)
//     alert('Login then try to access')
// }
//   return token?children:<Navigate to='/login'/>
// }

// export default ProtectedRoute


// import React from 'react';
// import Dashboard from './screens/dashboard/DashboardScreen'
// import { Route, Navigate } from 'react-router-dom';


// const ProtectedRoute = () => {
//     const isAuthenticated = () => {
//         // Check if the user is authenticated (you can implement your logic here)
//         // For example, check if a token exists in local storage
//         return localStorage.getItem('token') !== null;
//     };

//     return isAuthenticated() ? (
//         <Route element={<Dashboard />} path="/advisor_dashboard" />
//     ) : (
//         <Navigate to="/login" />
//     );
// };

// export default ProtectedRoute;


import React, { useState, useEffect } from 'react';
import { Route, Navigate } from 'react-router-dom';

const ProtectedRoute = ({ component: Component, ...rest }) => {
  // State to track authentication status
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check authentication status here
    const checkAuthStatus = async () => {
      try {
        
        const isAuthenticated = await checkAuthentication(); // Implement this function to check authentication status
        setIsAuthenticated(isAuthenticated);
      } catch (error) {
        console.error('Error checking authentication status:', error);
        setIsAuthenticated(false);
      }
    };

    checkAuthStatus();
  }, []);

  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Navigate to="/login" />
        )
      }
    />
  );
};


const checkAuthentication = async () => {
  
  const token = localStorage.getItem('authToken'); // Example: Retrieve authentication token from local storage
  return !!token; // Example: Return true if token exists, false otherwise
};

export default ProtectedRoute;
