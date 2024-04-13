import Arraay from './Arraay';
import PlanCardList from './PlanCardList';
import React, { useState, useEffect } from 'react';
import styles from "./Plans.module.css"
import axios from 'axios';

function PlansCl() {
  const [plansData, setPlansData] = useState([]);
  const [riks, setRiks] = useState([]);
  const [kiks, setKiks] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchPlansData = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/v1/Client/get-all-plans', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          },
          credentials: 'include'
        });

        const ponse = await fetch('http://localhost:8000/api/v1/Client/get-own-details', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          },
          credentials: 'include'
        });
 

        if (!response.ok && !ponse.ok) {
          throw new Error('Failed to fetch plans data');
        }

        const data = await response.json();
        const rik = await ponse.json();

        console.log('ris  ',data);
        

        setRiks(rik.client.question_4)
        setKiks(rik.client.planIds)

        const filteredPlans = data.plans.filter(plan => plan.isActive);
        setPlansData(filteredPlans);
      } catch (error) {
        console.error('Error fetching plans data:', error.message);
      }
    };

    fetchPlansData();
  }, []);

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

  const plansWithDecodedImages = plansData.map(plan => {
    const decodedImageUrl = decodeImageData(plan);
    return { ...plan, decPhoto: decodedImageUrl };
  });

// console.log("riks",riks);
// console.log("kiks",kiks);

if (!kiks){return (<div></div>);}

 

  return (
    <>
      <h2 style={{ marginBottom: "1rem" }} className={styles.heading}>Explore Plans</h2>
      <PlanCardList plans={plansWithDecodedImages} ids={kiks} />
      <br />
      <hr />
      <br />
      <br />
      <Arraay plans={plansWithDecodedImages} risk={riks.toString().toLowerCase()} ids={kiks}/>
    </>
  );
}

export default PlansCl;