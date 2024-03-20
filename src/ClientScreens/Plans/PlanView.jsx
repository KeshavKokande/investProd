/* eslint react/prop-types: 0 */

import { useParams } from 'react-router-dom';

import React, { useState, useEffect } from 'react';
// import clplans from "../Plans/plans.json";
// import Carousel from "react-multi-carousel";
// import 'react-multi-carousel/lib/styles.css';
// import PlanCard from '../Plans/FlipingCard';
import dummy from './13429911_5242374.jpg';
// import advidata from "./advi.json";
import "../Plans/Plans.css";
import { Link } from 'react-router-dom';



// const responsive = {
//     superLargeDesktop: {
//       breakpoint: { max: 4000, min: 3000 },
//       items: 5
//     },
//     desktop: {
//       breakpoint: { max: 3000, min: 1024 },
//       items: 3
//     },
//     tablet: {
//       breakpoint: { max: 1024, min: 464 },
//       items: 2
//     },
//     mobile: {
//       breakpoint: { max: 464, min: 0 },
//       items: 1
//     }
//   };


function PlanView() {
  const { plan_id } = useParams();
  const [plansData, setPlansData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [investedAmount, setInvestedAmount] = useState(0); // State for the invested amount

  useEffect(() => {
    const fetchPlansData = async () => {
      console.log("Started fetching plans data");
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
        setPlansData(data.plans);
        console.log(data); // Log the data received from the API
        setIsLoading(false); // Set loading state to false after data is fetched

      } catch (error) {
        console.error('Error fetching plans data:', error.message);
      }
    };

    fetchPlansData();
  }, []);

  const plan = plansData.find(plan => plan._id === plan_id);

  const handleBuyPlan = async () => {
    try {
      const response = await fetch(`http://localhost:8000/api/v1/client/buyPlan/advisor/${plan.advisorId}/plan/${plan_id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({
          investedAmount: parseInt(investedAmount, 10)
        })
      });

      console.log(investedAmount);

      if (!response.ok) {
        throw new Error('Failed to buy plan');
      }

      const data = await response.json();
      console.log('Buy plan response:', data);

      // Add any further logic here after successfully buying the plan
    } catch (error) {
      console.error('Error buying plan:', error.message);
    }
  };


  return (
    <div>
      {isLoading ? (
        <p>Loading...</p> // Display a loading message or spinner while data is being fetched
      ) : (
        <div className='bigadv'>
          <div className='riga'>
            <div className='advleft'>

              <img src={dummy} style={{ borderRadius: '1.5rem', width: 'auto', height: '20rem', margin: '0.6rem' }} />
            </div>
          </div>
          <div className='lefa'>
            <div className='advright'>
              <h2 style={{ marginTop: "0.5rem" }}>{plan.planName}</h2>
              <center><hr style={{ width: '70%' }} /></center>
              <div>📧: {plan.minInvestmentAmount} </div>
              <div>🚀: {new Date(plan.createdAt).toLocaleDateString()}</div>
              <div>More details to be added</div>
              <br />
              <br />
              <input
                type="number"
                value={investedAmount}
                onChange={(e) => setInvestedAmount(e.target.value)}
                placeholder="Enter invested amount"
                style={{ marginRight: '10px' }}
              />
              <br />
              <button style={{
                backgroundColor: "green",
                color: "white",
                padding: "10px 20px",
                borderRadius: "20px",
                border: "none",
                boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                cursor: "pointer"
              }}
                onClick={handleBuyPlan}>Buy</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default PlanView;
