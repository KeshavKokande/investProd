
import Arraay from './Arraay';
import PlanCardList from './PlanCardList';
// import plansData from './plans.json';
import "../Plans/Plans.css";
import React, { useState, useEffect } from 'react';



function PlansCl() {

  const [plansData, setplansData] = useState([]);

    useEffect(() => {
      const fetchplansData = async () => {
        try {
   
          const response = await fetch('http://localhost:8000/api/v1/Client/get-all-plans', {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json'
            },
            credentials: 'include'
          })
          
    
   
          if (!response.ok) {
            throw new Error('Failed to fetch user data');
          }
          const data = await response.json();
          setplansData(data.plans);

          console.log(data)

      } catch (error) {
          console.error('Error fetching user data:', error.message);
        }
      };
   
      fetchplansData();
    }, []);
  return (
    <>
    
      <Arraay plans={plansData} />
      <br/>
      <hr/>
      <br/>
      <h2 style={{marginBottom:"1rem"}}>Explore Plans</h2>
      <PlanCardList plans={plansData} />
      
    </>
  );
}

export default PlansCl;