// import React from "react";
import aboutimg from './../../assest/images/aboutimg.png';
import "./css/style.css";
function HomepageAbout() {
  return (
  <section id="about" className="about_section layout_padding">

    <div className="container  about-container my-custom-container d-flex flex-column flex-wrap bg-#00204a ">
      <div className="my-custom-container">
        <div className="heading_container heading_center">
          <h2 className='h2about'>
            About <span>Us</span>
          </h2>
          <p>
          Welcome to our investment portal, where seasoned advisors curate tailored investment baskets to help you grow your wealth beyond traditional savings accounts.
          </p>
        </div>
        <div className="row">
          <div className="col-md-6 ">
            <div className="img-box">
              <img src={aboutimg} alt="" />
            </div>
          </div>
          <div className="col-md-6">
            <div className="detail-box">
              <h3>
                We Are InVest
              </h3>
              <p>
              At InVest, we're dedicated to empowering individuals with the knowledge and tools they need to achieve their financial aspirations. As a trusted investment platform, we connect users with seasoned advisors who offer expert guidance on navigating the complexities of the financial market. With a commitment to transparency, integrity, and innovation.<br /> <br />we strive to make investing accessible, straightforward, and rewarding for all. Whether you're a seasoned investor or just starting out, our platform provides a seamless and secure environment to explore, learn, and grow your wealth. Join us on the journey to financial prosperity and unlock the possibilities of tomorrow, today.
              </p>
              
              {/* <a href="">
                Read More
              </a> */}
            </div>
          </div>
        </div>
      </div>
    </div>

  </section>
  )
}

export default HomepageAbout;