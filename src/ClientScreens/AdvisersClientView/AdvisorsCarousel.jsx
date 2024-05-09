
// import Carousel from "react-multi-carousel";
import 'react-multi-carousel/lib/styles.css';
import { Link } from 'react-router-dom';

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './../../components/AdvisorCardsPage/TestpageAdv.css'
import styles from './advisorClient.module.css';
import avatarBoy from "../../assets/images/avator.svg";
import './StarRating.css';


const settings = {
  dots: true,
  infinite: false, //keep it false for advisers less than 3 if more than three change to true
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 1
};

const AdvisorsCarousel = ({ advisors }) => {
  const associateAdvisors = advisors.filter(advisor => advisor.category === "standard");
  const advanceAdvisors = advisors.filter(advisor => advisor.category === "executive");
  const expertAdvisors = advisors.filter(advisor => advisor.category === "premium");




  return (
    <>
      <div>

        <h2 style={{ marginBottom: "-4rem", marginTop: "4vh" }} className={styles.heading}>Premium Advisors</h2>
        <div className='w-4/4 m-auto '>
          <div className="mt-20">
            <Slider {...settings}>
              {expertAdvisors.map((advisor, index) => (
                <div key={index} className="bg-white  text-black infocard rounded-xl" style={{ height: "fit-content" }}>

                  <div className='h-56 bg-indigo-500 flex justify-center items-center rounded-t-xl'>
                    <img src={avatarBoy} alt="" className="h-44 w-44 rounded-full" />
                  </div>

                  <div className="flex flex-col items-center justify-center gap-1 p-4">
                    <p className="text-xl font-semibold">{advisor.name}</p>
                    {/* <p className="text-center">{d.review}</p> */}
                    <p style={{ textAlign: "justify" }}>{advisor.description}</p>
                    <div className='rating' style={{ color: "gold" }}>
                    <div className="star-rating" style={{ '--star-width': `${advisor.ratings/2 * 20}%` }}>
                      <i data-star={advisor.ratings/2}></i>
                    </div>
                      <Link to={`/advisor/${advisor._id}`}>
                        <button className='bg-indigo-500 text-white text-lg px-6 py-1 rounded-xl'>Open Profile</button>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </Slider>
          </div>

        </div>

        <h2 style={{ marginBottom: "-4rem", marginTop: "4vh" }} className={styles.heading}>Executive Advisors</h2>
        <div className='w-4/4 m-auto '>
          <div className="mt-20 ">
            <Slider {...settings}>
              {advanceAdvisors.map((advisor, index) => (
                <div key={index} className="bg-white text-black infocard rounded-xl " style={{ height: "fit-content" }}>

                  <div className='h-56 bg-indigo-500 flex justify-center items-center  rounded-t-xl'>
                    <img src={avatarBoy} alt="" className="h-44 w-44 rounded-full" />
                  </div>

                  <div className="flex flex-col items-center justify-center gap-1 p-4">
                    <p className="text-xl font-semibold">{advisor.name}</p>

                    {/* <p className="text-center">{d.review}</p> */}
                    <p style={{ textAlign: "justify" }}>{advisor.description}</p>
                    <div className='rating' style={{ color: "gold" }}>
                    <div className="star-rating" style={{ '--star-width': `${advisor.ratings/2 * 20}%` }}>
                      <i data-star={advisor.ratings/2}></i>
                    </div>
                      <Link to={`/advisor/${advisor._id}`}>
                        <button className='bg-indigo-500 text-white text-lg px-6 py-1 rounded-xl'>Open Profile</button>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </Slider>
          </div>

        </div>
        <h2 style={{ marginBottom: "-4rem" }} className={styles.heading}>Standard Advisors</h2>
        <div className='w-4/4 m-auto '>
          <div className="mt-20 ">
            <Slider {...settings}>
              {associateAdvisors.map((advisor, index) => (
                <div key={index} className="bg-white  text-black infocard rounded-xl " style={{ height: "fit-content" }}>

                  <div className='h-56 bg-indigo-500 flex justify-center items-center  rounded-t-xl'>
                    <img src={avatarBoy} alt="" className="h-44 w-44 rounded-full" />
                  </div>

                  <div className="flex flex-col items-center justify-center gap-1 p-4">
                    <p className="text-xl font-semibold">{advisor.name}</p>
                    <p style={{ textAlign: "justify" }}>{advisor.description}</p>
                    <div className='rating' style={{ color: "gold" }}>
                    <div className="star-rating" style={{ '--star-width': `${advisor.ratings/2 * 20}%` }}>
                      <i data-star={advisor.ratings/2}></i>
                    </div>
                      <Link to={`/advisor/${advisor._id}`}>
                        <button className='bg-indigo-500 text-white text-lg px-6 py-1 rounded-xl'>Open Profile</button>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </Slider>

          </div>

        </div>

      </div>
    </>
  );
};

export default AdvisorsCarousel;