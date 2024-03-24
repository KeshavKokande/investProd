import Arraay from './Arraay';
import PlanCardList from './PlanCardList';
import React, { useState, useEffect } from 'react';

function PlansCl() {
  const [plansData, setPlansData] = useState([]);

  useEffect(() => {
    const fetchPlansData = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/v1/Client/get-all-plans', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          },
          credentials: 'include'
        });

        if (!response.ok) {
          throw new Error('Failed to fetch plans data');
        }

        const data = await response.json();
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

  return (
    <>
      <Arraay plans={plansWithDecodedImages} />
      <br />
      <hr />
      <br />
      <h2 style={{ marginBottom: "1rem" }}>Explore Plans</h2>
      <PlanCardList plans={plansWithDecodedImages} />
    </>
  );
}

export default PlansCl;