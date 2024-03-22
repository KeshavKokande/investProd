
import { useParams } from 'react-router-dom';
import clplans from "../Plans/plans.json";
import Carousel from "react-multi-carousel";
import 'react-multi-carousel/lib/styles.css';
import PlanCard from '../Plans/FlipingCard';
import dummy from './grapghup.png';
import advidata from "./advi.json";
import "../Plans/Plans.css";
import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import ProfileCard from '../Plans/ProfileCard';


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

function AdvClProfile() {
    // // Extracting the advisor ID from the URL params
    // const { advisor_id } = useParams();

    // const advisor = advidata.listOfNamesOfAdvisors.find(advisor => advisor._id === advisor_id);

    // const advisorPlans = clplans.filter(plan => plan.advisor_id === advisor_id);

    const { advisor_id } = useParams();
    const [isLoading, setIsLoading] = useState(true);
    const [advisors, setAdvisors] = useState([]);
    const [plans, setPlans] = useState([]);
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const advisorsResponse = await fetch(`http://localhost:8000/api/v1/Client/get-all-advisors`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
            credentials: 'include',
          });
  
          const plansResponse = await fetch(`http://localhost:8000/api/v1/Client/get-all-plans`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
            credentials: 'include',
          });
  
          if (!advisorsResponse.ok || !plansResponse.ok) {
            throw new Error('Failed to fetch data');
          }
  
          const advisorsData = await advisorsResponse.json();
          const plansData = await plansResponse.json();
  
          setAdvisors(advisorsData.listOfNamesOfAdvisors);
          setPlans(plansData.plans);
          setIsLoading(false);
        } catch (error) {
          console.error('Error fetching data:', error.message);
        }
      };
  
      fetchData();
    }, []);
  
    if (isLoading) {
      return <div>Loading...</div>;
    }
  
    const advisor = advisors.find((adv) => adv._id === advisor_id);
    const advisorPlans = plans.filter((plan) => plan.advisorId === advisor_id);
  
    if (!advisor) {
      return <div>No data available for this advisor</div>;
    }
  
    return (
      <div>
        <div className='bigadv'>
            <div className='riga'>
            <div className='advleft'>
                <img className="moneyimg" src="https://avatar.iran.liara.run/public/boy" alt="money" style={{ borderRadius: '1.5rem', width: '8rem', height: '8rem', margin: '0.6rem' }} />
                <img src={dummy} style={{ borderRadius: '1.5rem', width: '10rem', height: '10rem', margin: '0.6rem' }}/>
            </div>
            </div>
            <div className='lefa'>
            <div className='advright'> 
                <h2 style={{marginTop:"0.5rem"}}>{advisor.name}</h2>
                <center><hr style={{ width: '70%' }} /></center>
                <div>📧: {advisor.email} </div>
                <div>🚀: {new Date(advisor.createdAt).toLocaleDateString()}</div>
            </div>
            </div>
        </div>
        <h2 style={{marginBottom:"1rem"}}>{advisor.name.split(" ")[0]}&#39;s Plans</h2>
        <Carousel responsive={responsive} infinite={true} autoPlay={true} autoPlaySpeed={3000}>
          {advisorPlans.map((plan, index) => (
            <div key={index}>
            <Link to={`/plan_id/${plan._id}`}>
            <ProfileCard plan={plan} />
            </Link>
            </div>
          ))}
        </Carousel>
      </div>
    );
  
}

export default AdvClProfile ;