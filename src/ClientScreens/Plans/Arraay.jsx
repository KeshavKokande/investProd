/* eslint react/prop-types: 0 */
import PlanCard from './FlipingCard';
import Carousel from "react-multi-carousel";
import 'react-multi-carousel/lib/styles.css';
import '../Profilepage/style.module.css';
import "../Plans/Plans.css";
import { Link } from 'react-router-dom';


import ProfileCard from './ProfileCard';

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 5
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1
  }
};

const Arraay = ({ plans }) => {
  console.log("PLANS DATA: ", plans);
  const topRatedPlans = plans.sort((a, b) => parseFloat(b.noOfSubscription) - parseFloat(a.noOfSubscription)).slice(0, 5);
 
  const mostOrderedPlans = plans.sort((a, b) => parseInt(b.noOfSubscription) - parseInt(a.noOfSubscription)).slice(0, 5);

  return (
    <div>
      <h2 style={{marginBottom:"1rem"}}>Top Rated Plans</h2>
      
      <Carousel responsive={responsive} infinite={true} style={{}} >
        {topRatedPlans.map((plan, index) => (
          <div key={index}>
            <Link to={`/plan_id/${plan._id}`}></Link>
            <ProfileCard plan={plan} />
            
          </div>
        ))}
        
      </Carousel>

      <h2 style={{marginBottom:"1rem"}}>Most Ordered Plans</h2>
      <Carousel responsive={responsive} infinite={true}  >
        {mostOrderedPlans.map((plan, index) => (
          <div key={index}>
            <Link to={`/plan_id/${plan._id}`}>
            
            <ProfileCard plan={plan} />
            </Link>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default Arraay;