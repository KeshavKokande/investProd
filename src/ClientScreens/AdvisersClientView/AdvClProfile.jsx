import { useParams } from 'react-router-dom';
 
import Carousel from "react-multi-carousel";
import 'react-multi-carousel/lib/styles.css';
 
// import "../Plans/Plans.css";
import styles from "./../Plans/Plans.module.css";
import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import ProfileCard from '../Plans/ProfileCard';
import AdvisorProfilePage from '../AdvisorProfilePlans/AdvisorProfilePage';
 
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
    const [clientDetails, setClientDetails] = useState([]);
 
    useEffect(() => {
      window.scrollTo(0, 0);
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
          const clientDetailsResponse = await fetch(`http://localhost:8000/api/v1/Client/get-own-details`, {
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
          const clientDetailsData = await clientDetailsResponse.json();
 
          setAdvisors(advisorsData.listOfNamesOfAdvisors);
          setPlans(plansData.plans);
          setClientDetails(clientDetailsData.client.planIds);
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
    const advisorPlans = plans.filter((plan) => plan.advisorId === advisor_id && plan.isActive);
  
    if (!advisor) {
      return <div>No data available for this advisor</div>;
    }

    const decodeImageData = (plan) => {
      if (plan.photo && plan.photo.contentType) {
        const imageDataArray = plan.photo.data.data;
        const cota = plan.photo.contentType;
        const blob = new Blob([new Uint8Array(imageDataArray)], { type: cota });
        const urlCreator = window.URL || window.webkitURL;
        const imageDataUrl = urlCreator.createObjectURL(blob);
        return imageDataUrl;
      } else {
        console.warn('Missing photo or contentType in plan:', plan);
        return null;
      }
    };

  

    const plansWithDecodedImages = advisorPlans.map(plan => {
      const decodedImageUrl = decodeImageData(plan);
      return { ...plan, decPhoto: decodedImageUrl };
    });


  
    return (
      <div>
       
        <AdvisorProfilePage />
 
        <br />
        <h2 style={{marginBottom:"1rem"}}>{advisor.name.split(" ")[0]}&#39;s Plans</h2>
        <Carousel responsive={responsive} infinite={true} autoPlay={true} autoPlaySpeed={3000} className={styles.Carousel}>
          {plansWithDecodedImages.map((plan, index) => (
            <div key={index}>
            <Link to={`/plan_id/${plan._id}`}>
            <ProfileCard plan={plan} ids={clientDetails}/>
            </Link>
            </div>
          ))}
        </Carousel>
      </div>
    );
 
}
 
export default AdvClProfile ;
 
 
 
 
 
 
 
 /* <div className='bigadv'>
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
 
        */