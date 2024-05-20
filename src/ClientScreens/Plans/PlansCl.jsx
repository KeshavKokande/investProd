import Arraay from './Arraay';
import PlanCardList from './PlanCardList';
import React, { useState, useEffect } from 'react';
import styles from "./Plans.module.css"
import axios from 'axios';
import loadingGif from "./../../assest/images/Animation.gif";
function PlansCl() {
  const [plansData, setPlansData] = useState([]);
  const [riks, setRiks] = useState([]);
  const [kiks, setKiks] = useState(null);
  const [loading, setLoading] = useState(true); // New state for loading indicator

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchPlansData = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/v1/Client/get-all-plans', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('jwt')}`
          },
        });

        const ponse = await fetch('http://localhost:8000/api/v1/Client/get-own-details', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('jwt')}`
          },
        });

        if (!response.ok && !ponse.ok) {
          throw new Error('Failed to fetch plans data');
        }

        const data = await response.json();
        const rik = await ponse.json();

        setRiks(rik.client.question_4)
        setKiks(rik.client.subscribedPlanIds)

        console.log("RISKS", rik.client.question_4);
        const filteredPlans = data.plans.filter(plan => plan.isActive);
        setPlansData(filteredPlans);
        setLoading(false); // Update loading state when data is fetched
      } catch (error) {
        console.error('Error fetching plans data:', error.message);
        setLoading(false); // Update loading state in case of error
      }
    };

    fetchPlansData();
  }, []);

  const decodeImageData = (plan) => {
    if (plan.photo && plan.photo.contentType && plan.photo.data) {
      const imageData = atob(plan.photo.data); // Decode base64-encoded data
      const cota = plan.photo.contentType; // Use the contentType directly
  
      // Convert the decoded data into a Uint8Array
      const byteArray = new Uint8Array(imageData.length);
      for (let i = 0; i < imageData.length; i++) {
        byteArray[i] = imageData.charCodeAt(i);
      }
  
      // Create a blob from the Uint8Array
      const blob = new Blob([byteArray], { type: cota });
  
      // Create the image URL
      const urlCreator = window.URL || window.webkitURL;
      const imageDataUrl = urlCreator.createObjectURL(blob);
      return imageDataUrl;
    } else {
      console.warn('Missing photo, contentType, or data in plan:', plan);
      return null;
    }
  };

  const plansWithDecodedImages = plansData.map(plan => {
    const decodedImageUrl = decodeImageData(plan);
    return { ...plan, decPhoto: decodedImageUrl };
  });

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <div style={{ position: 'relative', top: '-80px' }}>
        <img src={loadingGif} alt="Loading..." style={{ maxWidth: '100%', maxHeight: '100%' }} />
      </div>
    </div>
    );
  }

  return (
    <>
      <h2 style={{ marginBottom: "1rem" }} className={styles.heading}>Explore Plans</h2>
      <PlanCardList plans={plansWithDecodedImages} ids={kiks} />
      <br />
      <Arraay plans={plansWithDecodedImages} risk={riks.toString().toLowerCase()} ids={kiks}/>
    </>
  );
}

export default PlansCl;
