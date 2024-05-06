import React, { useState } from 'react';
import logo from '../logogo.png';
import './NavBar.css';
import ppho from '../avatar.jpg';

const NavBar = () => {
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const handleMouseEnter = () => {
    setDropdownVisible(true);
  };

  const handleMouseLeave = () => {
    setDropdownVisible(false);
  };

  return (
    <div className='headerer'>
      <header>
        <div className="logo-container">
          <img src={logo} alt="Logo" className="logo" height="50" />
        </div>
        <div className="profile-container" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
          <img
            src={ppho}
            alt="Profile"
            className="profile-photo"
          />
          {dropdownVisible && (
            <ul className="dropdown-menu">
              <li>Profile</li>
              <li>Dashboard</li>
              <li>Logout</li>
            </ul>
          )}
        </div>
      </header>
    </div>
  );
};

export default NavBar;