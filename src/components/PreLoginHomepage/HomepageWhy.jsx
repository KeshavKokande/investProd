
import w1 from './../../assest/images/w1.png'
import w2 from './../../assest/images/w2.png'
import w3 from './../../assest/images/w3.png'
import w4 from './../../assest/images/w4.png'
import './css/style.css';
function HomepageWhy(){
    return(
        <section className="why_section layout_padding">
        <div className="container d-flex flex-column flex-wrap">
          <div className="heading_container heading_center">
            <h2>
              Why Choose <span>Us</span>
            </h2>
          </div>
          <div className="why_container">
            <div className="box">
              <div className="img-box">
                <img src={w1} alt="" />
              </div>
              <div className="detail-box">
                <h5>
                  Expert Management
                </h5>
                <p>
                From crafting personalized investment portfolios to offering timely advice and insights, our experts are committed to guiding you every step of the way. Trust in our expert management to navigate the complexities of the financial landscape and help you make informed decisions that drive long-term success and prosperity.
                </p>
              </div>
            </div>
            {/* <div className="box">
              <div className="img-box">
                <img src={w2} alt="" />
              </div>
              <div className="detail-box">
                <h5>
                  Secure Investment
                </h5>
                <p>
                  Incidunt odit rerum tenetur alias architecto asperiores omnis cumque doloribus aperiam numquam! Eligendi corrupti, molestias laborum dolores quod nisi vitae voluptate ipsa? In tempore voluptate ducimus officia id, aspernatur nihil.
                  Tempore laborum nesciunt ut veniam, nemo officia ullam repudiandae repellat veritatis unde reiciendis possimus animi autem natus
                </p>
              </div>
            </div> */}
            <div className="box">
              <div className="img-box">
                <img src={w3} alt="" />
              </div>
              <div className="detail-box">
                <h5>
                 High Returns
                </h5>
                <p>
                With a focus on strategic diversification and meticulous risk management, our platform empowers you to achieve impressive returns on your investments, providing a pathway to financial success and prosperity.
                </p>
              </div>
            </div>
            <div className="box">
              <div className="img-box">
                <img src={w4} alt="" />
              </div>
              <div className="detail-box">
                <h5>
                  Happy Customers
                </h5>
                <p>
                Experience the satisfaction of joining a thriving community of investors who have chosen us for their financial journey, achieving remarkable gains and securing their financial future with confidence
                </p>
              </div>
            </div>
          </div>
          {/* <div className="btn-box">
            <a href="">
              Read More
            </a>
          </div> */}
        </div>
      </section>
    )
}

export default HomepageWhy;
