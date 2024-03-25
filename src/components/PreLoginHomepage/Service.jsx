// import React from "react";
import s1 from './../../assest/images/s1.png'
import s2 from './../../assest/images/s2.png'
import s3 from './../../assest/images/s3.png'
function Service(){
    return(
        <section id="services" className="service_section layout_padding">
        <div className="service_container">
          <div className="container services_container d-flex flex-column flex-wrap">
            <div className="heading_container heading_center">
              <h2>
                Our <span>Services</span>
              </h2>
              <p>
              Unlock personalized investment strategies tailored to your financial objectives, guided by expert advisors, and diversified for maximum returns
              </p>
            </div>
            <div className="row">
              <div className="col-md-4 ">
                <div className="box service_box">
                  <div className="img-box">
                    <img src={s1} alt="" />
                  </div>
                  <div className="detail-box">
                    <h5>
                      Diverse Portfolio Options
                    </h5>
                    <p>
                    Explore a wide range of investment opportunities curated by seasoned professionals, tailored to your unique financial goals and risk tolerance.
                    </p>
                   
                  </div>
                </div>
              </div>
              <div className="col-md-4 ">
                <div className="box service_box">
                  <div className="img-box">
                    <img src={s2} alt="" />
                  </div>
                  <div className="detail-box">
                    <h5>
                      Security Storage
                    </h5>
                    <p >
                    Rest assured, your investments are safeguarded with state-of-the-art security measures and robust risk management protocols, ensuring the safety and integrity of your financial assets at every step
                    </p>
                    
                  </div>
                </div>
              </div>
              <div className="col-md-4 ">
                <div className="box service_box">
                  <div className="img-box">
                    <img src={s3} alt="" />
                  </div>
                  <div className="detail-box">
                    <h5>
                      ChatBot Support
                    </h5>
                    <p>
                    Receive ongoing support and guidance from our dedicated chatbot, committed to helping you navigate market fluctuations and maximize your investment potential
                    </p>
                    
                  </div>
                </div>
              </div>
            </div>
            {/* <div className="btn-box">
              <a href="">
                View All
              </a>
            </div> */}
          </div>
        </div>
      </section>
    )
}

export default Service;