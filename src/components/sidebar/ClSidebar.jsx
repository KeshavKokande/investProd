
import { useContext, useEffect, useRef } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import { LIGHT_THEME } from "../../constants/themeConstants";
import LogoBlue from "../../assets/images/logo_blue.svg";
import LogoWhite from "../../assets/images/logo_white.svg";
import Swal from "sweetalert2";
// import axios from 'axios';


import {
  MdOutlineClose,

  MdOutlineGridView,
  MdOutlineLogout,
 
  MdOutlinePeople,

  MdOutlineShoppingBag,
 
} from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { Link, useNavigate } from "react-router-dom";
import "./Sidebar.scss";
import { useLocation } from "react-router-dom";
import { SidebarContext } from "../../context/SidebarContext";


// import { Box,  Button, Drawer, Typography, Avatar, Stack } from '@mui/material';
// import { styled } from '@mui/material/styles';

const ClSidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const { theme } = useContext(ThemeContext);
  const { isSidebarOpen, closeSidebar } = useContext(SidebarContext);
  const navbarRef = useRef(null);


  // Logout function
  const handleLogout = () => {
    Swal.fire({
      title: 'Are You Sure?',
      text: 'You Will Be Logged Out',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, Logout!',
      cancelButtonText: 'No, Cancel!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        logoutUser();
      }
    });
  };
  const logoutUser = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/v1/check-auth/logout", {
        method: "GET", 
        headers: {
          "Content-Type": "application/json",
          
        },
        credentials: "include", // include cookies in the request
      });
      if (response.ok) {

        localStorage.removeItem("token");
        document.cookie = 'name=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
        document.cookie = 'email=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
        sessionStorage.clear();

        // Redirect to login page
          window.location.href = "/login";
      } else {
        console.error("Logout failed:", response.statusText);
        // Handle logout failure, if needed
      }
    } catch (error) {
      console.error("Logout failed:", error);
      // Handle logout failure, if needed
    }
  };

  // closing the navbar when clicked outside the sidebar area
  const handleClickOutside = (event) => {
    if (
      navbarRef.current &&
      !navbarRef.current.contains(event.target) &&
      event.target.className !== "sidebar-open-btn"
    ) {
      closeSidebar();
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
    
  }, []);



  return (
    <nav
      className={`sidebar ${isSidebarOpen ? "sidebar-show" : ""}`}
      ref={navbarRef}
    >
      <div className="sidebar-top">
        <Link to='/client_dashboard'>
          <div className="sidebar-brand">
            <img src={theme === LIGHT_THEME ? LogoBlue : LogoWhite} alt="" />
            <span className="sidebar-brand-text">inVEST</span>
          </div>
        </Link>
        <button className="sidebar-close-btn" onClick={closeSidebar}>
          <MdOutlineClose size={24} />
        </button>
      </div>

{/* 
      <Box  sx={{ mb: 5, mx: 2.5 }}>
        <Link to="/" >
          <div className="box-profile">
            <Avatar  src="https://avatar.iran.liara.run/public/boy" alt="photoURL" />
            <Box sx={{ ml: 2 }}>
              <Typography variant="subtitle2" sx={{ color: 'text.primary' }}>
                {profileInfo.name}
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                {profileInfo.jobRole}
              </Typography>
            </Box>
          </div>
        </Link>
      </Box> */}


      <div className="sidebar-body">
        <div className="sidebar-menu">
          <ul className="menu-list">
            <li className={`menu-item ${location.pathname.includes("/client_dashboard") ? "active" : ""}`}>
              <Link to="/client_dashboard" className="menu-link">
                <span className="menu-link-icon">
                  <MdOutlineGridView size={18} />
                </span>
                <span className="menu-link-text">Dashboard</span>
              </Link>
            </li>
            
            <li className={`menu-item ${location.pathname.includes("/plansList") || location.pathname.includes("/planDetail") ? "active" : ""}`}>
              <Link to="/plansList" className="menu-link">
                <span className="menu-link-icon">
                  <MdOutlineShoppingBag size={20} />
                </span>
                <span className="menu-link-text">Plans</span>
              </Link>
            </li>
            <li className={`menu-item ${location.pathname.includes("/viewAdvisor") || location.pathname.includes("/advisor") ? "active" : ""}`}>
              <Link to="/viewAdvisor" className="menu-link">
                <span className="menu-link-icon">
                  <MdOutlinePeople size={20} />
                </span>
                <span className="menu-link-text">Advisors</span>
              </Link>
            </li>
            
            <li className={`menu-item ${location.pathname.includes("/news") ? "active" : ""}`}>
              <Link to="/news" className="menu-link">
                <span className="menu-link-icon">
                  <MdOutlinePeople size={20} />
                </span>
                <span className="menu-link-text">News</span>
              </Link>
            </li>
          </ul>
        </div>

        <div className="sidebar-menu sidebar-menu2">
          <ul className="menu-list">
            
            <li className={`menu-item ${location.pathname.includes("/profile") || location.pathname.includes("/profile/Edit") ? "active" : ""}`}>
              <Link to="/profile" className="menu-link">
                <span className="menu-link-icon">
                  <CgProfile size={18} />
                </span>
                <span className="menu-link-text">Profile</span>
              </Link>
            </li>

            <li className="menu-item" onClick={handleLogout} style={{ cursor: 'pointer' }}>
              <span className="menu-link">
                <span className="menu-link-icon">
                  <MdOutlineLogout size={20} />
                </span>
                <span className="menu-link-text">Logout</span>
              </span>
            </li>
          </ul>
        </div>
      </div>




    </nav>
  );
};

export default ClSidebar;








  //------> geting profile Name

  // const [profileInfo, setProfileInfo] = useState({
  //   img: '', // Add the img property to store the image data
  //   name: '',
  //   email: '',
  //   age: '',
  //   address: '',
  //   gender: '',
  //   jobRole: ''
   
  // });
 

  // useEffect(() => {
  //   const fetchProfileData = async () => {
  //     try {
  //       const response = await axios.get('http://localhost:8000/api/v1/Client/get-own-details', {
  //         headers: {
  //           'Content-Type': 'application/json'
  //         },
  //         withCredentials: true
  //       });

  //       if (response.status === 200) {
  //         const data = response.data.client;
  //         const imageDataArray = data.ppfoto?.data?.data || []; // Get the image data array
  //         const imageDataUrl = arrayToDataURL(imageDataArray); 
          
          
  //         setProfileInfo({
  //           img: imageDataUrl,
  //           name: data.name || '',
  //           email: data.email || '',
  //           age: data.age || '',
  //           address: data.address || '',
  //           gender: data.gender || '',
  //           jobRole: data.jobRole || ''
           
  //         });
          
  //         console.log(data)
  //         console.log("data name", data.name)
  //       } else {
  //         throw new Error('Failed to fetch profile data');
  //       }
  //     } catch (error) {
  //       console.error('Error fetching profile data:', error.message);
  //     }
  //   };

  //   fetchProfileData();
  // }, []);


  //  // Function to convert array to data URL
  //  const arrayToDataURL = (array) => {
  //   const blob = new Blob([new Uint8Array(array)], { type: 'image/jpeg' });
  //   const urlCreator = window.URL || window.webkitURL;
  //   return urlCreator.createObjectURL(blob);
  // };





  
  // --------------->end
