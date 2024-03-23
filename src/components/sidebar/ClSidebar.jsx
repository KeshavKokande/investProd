import { useContext, useEffect, useRef } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import { LIGHT_THEME } from "../../constants/themeConstants";
import LogoBlue from "../../assets/images/logo_blue.svg";
import LogoWhite from "../../assets/images/logo_white.svg";
import Swal from "sweetalert2";
import {
  MdOutlineClose,
  MdOutlineCurrencyExchange,
  MdOutlineGridView,
  MdOutlineLogout,
  MdOutlineMessage,
  MdOutlinePeople,
  MdOutlineSettings,
  MdOutlineShoppingBag,
 
} from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { Link, useNavigate } from "react-router-dom";
import "./Sidebar.scss";
import { useLocation } from "react-router-dom";
import { SidebarContext } from "../../context/SidebarContext";

const ClSidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const { theme } = useContext(ThemeContext);
  const { isSidebarOpen, closeSidebar } = useContext(SidebarContext);
  const navbarRef = useRef(null);

  // Logout function
  const handleLogout = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will be logged out',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, logout!',
      cancelButtonText: 'No, cancel!',
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
        
        console.log("logout success",response);
        localStorage.removeItem("token");

        // Redirect to login page
        navigate("/login");
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
        <Link to='/'>
          <div className="sidebar-brand">
            <img src={theme === LIGHT_THEME ? LogoBlue : LogoWhite} alt="" />
            <span className="sidebar-brand-text">inVEST</span>
          </div>
        </Link>
        <button className="sidebar-close-btn" onClick={closeSidebar}>
          <MdOutlineClose size={24} />
        </button>
      </div>
      <div className="sidebar-body">
        <div className="sidebar-menu">
          <ul className="menu-list">
            <li className={`menu-item ${location.pathname === "/cldash" ? "active" : ""}`}>
              <Link to="/cldash" className="menu-link">
                <span className="menu-link-icon">
                  <MdOutlineGridView size={18} />
                </span>
                <span className="menu-link-text">Dashboard</span>
              </Link>
            </li>
            
            <li className={`menu-item ${location.pathname === "/planscl" ? "active" : ""}`}>
              <Link to="/planscl" className="menu-link">
                <span className="menu-link-icon">
                  <MdOutlineShoppingBag size={20} />
                </span>
                <span className="menu-link-text">Plans</span>
              </Link>
            </li>
            <li className={`menu-item ${location.pathname === "/viewadvi" ? "active" : ""}`}>
              <Link to="/viewadvi" className="menu-link">
                <span className="menu-link-icon">
                  <MdOutlinePeople size={20} />
                </span>
                <span className="menu-link-text">Advisors</span>
              </Link>
            </li>
          </ul>
        </div>

        <div className="sidebar-menu sidebar-menu2">
          <ul className="menu-list">
            {/* <li className="menu-item">
              <Link to="/" className="menu-link">
                <span className="menu-link-icon">
                  <MdOutlineSettings size={20} />
                </span>
                <span className="menu-link-text">Settings</span>
              </Link>
            </li> */}
            <li className={`menu-item ${location.pathname === "/profile" ? "active" : ""}`}>
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
