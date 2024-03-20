// import React from "react";
import robot from './../../assest/images/robot.png';
import investlogogo from './../../assest/images/investlogogo.png';
import { Link } from 'react-router-dom';
import './css/style.scss'
import NavbarHeader from './NavbarHeader'
function NavBar() {
  return (
    <div className="hero_area" >
      <div className="header_section">
        <div className="header_left">
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="logogo"><a href="/"><img src={investlogogo} /></a></div>
            
            <NavbarHeader />

          </nav>
          <div className="banner_main">
            <h1 className="banner_taital " >financial <br />Service</h1>
            <p className="banner_text">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever </p>
            <div className="btn_main">
              <div className="more_bt"><a href="#">Read More </a></div>
              <div className="contact_bt"><a href="#">Contact Us</a></div>
            </div>
          </div>
        </div>
        <div className="header_right">
          <img src={robot} className="banner_img" />
        </div>
      </div>


    </div>
  )
}

export default NavBar;