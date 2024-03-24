/* eslint react/prop-types: 0 */
import React from 'react';
import { Link } from 'react-router-dom';
import Carousel from 'react-multi-carousel';
import styles from './Plans.module.css';
import ProfileCard from './ProfileCard';

const responsive = {
  superLargeDesktop: { breakpoint: { max: 4000, min: 3000 }, items: 5 },
  desktop: { breakpoint: { max: 3000, min: 1024 }, items: 3 },
  tablet: { breakpoint: { max: 1024, min: 464 }, items: 2 },
  mobile: { breakpoint: { max: 464, min: 0 }, items: 1 }
};

const Arraay = ({ plans }) => {
  console.log('PLANS DATA: ', plans);
  const topRatedPlans = plans.sort((a, b) => parseFloat(b.noOfSubscription) - parseFloat(a.noOfSubscription)).slice(0, 5);

  const mostOrderedPlans = plans.sort((a, b) => parseInt(b.noOfSubscription) - parseInt(a.noOfSubscription)).slice(0, 5);

  return (
    <div className={styles.CarouselBox}>

      <div className={styles.InnerBox}>
        <h2 className={styles.heading}>Top Rated Plans</h2>
        <Carousel responsive={responsive} infinite={true} className={styles.Carousel}>
          {topRatedPlans.map((plan, index) => (
            <div key={index}>
              <Link to={`/plan_id/${plan._id}`}></Link>
              <ProfileCard plan={plan} />
            </div>
          ))}
        </Carousel>
      </div>

      <div className={styles.InnerBox}>
      <h2 className={styles.heading}>Most Ordered Plans</h2>
      <Carousel responsive={responsive} infinite={true} className={styles.Carousel} >
        {mostOrderedPlans.map((plan, index) => (
          <div key={index}>
            <Link to={`/plan_id/${plan._id}`}>
              <ProfileCard plan={plan} />
            </Link>
          </div>
        ))}
      </Carousel>
      </div>
    </div>
  );
};

export default Arraay;
