
// import Carousel from "react-multi-carousel";
import 'react-multi-carousel/lib/styles.css';
import { Link } from 'react-router-dom';

import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import './../../components/AdvisorCardsPage/TestpageAdv.css'


const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 3,
      slidesToScroll: 1
    };

const AdvisorsCarousel = ({ advisors,advisor }) => {
  const associateAdvisors = advisors.filter(advisor => advisor.cat_type === "Associate");
  const advanceAdvisors = advisors.filter(advisor => advisor.cat_type === "Advance");
  const expertAdvisors = advisors.filter(advisor => advisor.cat_type === "Expert");

  

  return (
    <>
    <h2 style={{ marginBottom: "-4rem" }}>Standard Advisors</h2>
    <div className='w-4/4 m-auto '>
      <div className="mt-20 ">
      <Slider {...settings}>
        {associateAdvisors.map((advisor, index) => (
          <div key={index} className="bg-white h-[450px] text-black rounded-xl ">
           
            <div className='h-56 bg-indigo-500 flex justify-center items-center  rounded-t-xl'>
              <img src="https://avatar.iran.liara.run/public/boy" alt="" className="h-44 w-44 rounded-full"/>
             </div>

            <div className="flex flex-col items-center justify-center gap-4 p-4">
              <p className="text-xl font-semibold">{advisor.name}</p>
              <Link to={`/advisor_id/${advisor._id}`}>
               <button className='bg-indigo-500 text-white text-lg px-6 py-1 rounded-xl'>Open Profile</button>
               </Link>
             </div>
            
           </div>
        ))}
      </Slider>
      </div>
      
    </div>
    <div>
      

      <h2 style={{ marginBottom: "-4rem" }}>Exeutive Advisors</h2>
      <div className='w-4/4 m-auto '>
      <div className="mt-20 ">
      <Slider {...settings}>
        {advanceAdvisors.map((advisor, index) => (
          <div key={index} className="bg-white h-[450px] text-black rounded-xl ">
           
            <div className='h-56 bg-indigo-500 flex justify-center items-center  rounded-t-xl'>
              <img src="https://avatar.iran.liara.run/public/boy" alt="" className="h-44 w-44 rounded-full"/>
             </div>

            <div className="flex flex-col items-center justify-center gap-4 p-4">
              <p className="text-xl font-semibold">{advisor.name}</p>
              {/* <p className="text-center">{d.review}</p> */}
              <Link to={`/advisor_id/${advisor._id}`}>
               <button className='bg-indigo-500 text-white text-lg px-6 py-1 rounded-xl'>Open Profile</button>
               </Link>
             </div>
             
           </div>
        ))}
      </Slider>
      </div>
      
    </div>
      

      <h2 style={{ marginBottom: "-4rem" }}>Premium Advisors</h2>
      
      <div className='w-4/4 m-auto '>
      <div className="mt-20">
      <Slider {...settings}>
        {expertAdvisors.map((advisor, index) => (
          <div key={index} className="bg-white h-[450px] text-black rounded-xl">
            
            <div className='h-56 bg-indigo-500 flex justify-center items-center rounded-t-xl'>
              <img src="https://avatar.iran.liara.run/public/boy" alt="" className="h-44 w-44 rounded-full"/>
             </div>

            <div className="flex flex-col items-center justify-center gap-4 p-4">
              <p className="text-xl font-semibold">{advisor.name}</p>
              {/* <p className="text-center">{d.review}</p> */}
              <Link to={`/advisor_id/${advisor._id}`}>
               <button className='bg-indigo-500 text-white text-lg px-6 py-1 rounded-xl'>Open Profile</button>
               </Link>
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


/* <Carousel responsive={responsive} infinite={true} autoPlay={true} autoPlaySpeed={3000}>
        {expertAdvisors.map((advisor, index) => (
          <div key={index}>
            <Link to={`/advisor_id/${advisor._id}`}>
              <AdvisorCard advisor={advisor} />
              <PremiumAdvisor advisor={advisor} />
              
               
            </Link>
          </div>
        ))}
      </Carousel> 



      // <Carousel responsive={responsive} infinite={true} autoPlay={true} autoPlaySpeed={3000}>
      //   {advanceAdvisors.map((advisor, index) => (
      //     <div key={index}>
      //       <Link to={`/advisor_id/${advisor._id}`}>
              
      //         <PremiumAdvisor advisor={advisor} />
      //       </Link>
      //     </div>
      //   ))}
      // </Carousel>



      // <Carousel responsive={responsive} infinite={true} autoPlay={true} autoPlaySpeed={3000}>
      //   {associateAdvisors.map((advisor, index) => (
      //     <div key={index}>
      //       <Link to={`/advisor_id/${advisor._id}`}>
             
              
      //         <PremiumAdvisor advisor={advisor} />
              

             
      //       </Link>
      //     </div>
      //   ))}
      // </Carousel>
      */
