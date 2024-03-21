// import React from "react";

import "./css/style.css"
function HomepageInfo(){
    return(
<section id="contact" className="info_section layout_padding2">
    <div className="container my-custom-container  d-flex flex-column flex-wrap">
      <div className="row">
        <div className="col-md-6 col-lg-3 info_col">
          <div className="info_contact">
            <h4>
              Address
            </h4>
            <div className="contact_link_box">
              <a href="">
                <i className="fa fa-map-marker" aria-hidden="true"></i>
                <span>
                Plot No.-248, Udyog- Vihar,<br />
Phase-4, Gurgaon,<br />
Haryana, 122015 
                </span>
              </a>
              <a href="">
                <i className="fa fa-phone" aria-hidden="true"></i>
                <span>
                  Call +91 124 4345901
                </span>
              </a>
              <a href="">
                <i className="fa fa-envelope" aria-hidden="true"></i>
                <span>
                  incedo@incedoinc.com
                </span>
              </a>
            </div>
          </div>
          <div className="info_social">
            <a href="">
              <i className="fa fa-facebook" aria-hidden="true"></i>
            </a>
            <a href="">
              <i className="fa fa-twitter" aria-hidden="true"></i>
            </a>
            <a href="">
              <i className="fa fa-linkedin" aria-hidden="true"></i>
            </a>
            <a href="">
              <i className="fa fa-instagram" aria-hidden="true"></i>
            </a>
          </div>
        </div>
        {/* <div className="col-md-6 col-lg-3 info_col">
          <div className="info_detail">
            <h4>
              Info
            </h4>
            <p>
              necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful
            </p>
          </div>
        </div> */}
        <div className="col-md-6 col-lg-2 mx-auto info_col">
          
        </div>
        <div className="col-md-6 col-lg-3 info_col ">
          <h4>
            Subscribe
          </h4>
          <form action="#">
            <input type="text" placeholder="Enter email" />
            <button type="submit">
              Subscribe
            </button>
          </form>
        </div>
      </div>
    </div>
  </section>
    )
}

export default HomepageInfo;