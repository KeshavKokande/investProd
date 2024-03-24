import { useParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import dummy from './13429911_5242374.jpg';
import styles from './Plans.module.css';
import Swal from 'sweetalert2';
 
function PlanView() {
  const { plan_id } = useParams();
  const [plansData, setPlansData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [investedAmount, setInvestedAmount] = useState(0);
 
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
        console.log(data);
        setIsLoading(false);
 
      } catch (error) {
        console.error('Error fetching plans data:', error.message);
      }
    };
 
    fetchPlansData();
  }, []);
 
  const plan = plansData.find(plan => plan._id === plan_id);
 
  const handleBuyPlan = async () => {
    if (investedAmount < plan.minInvestmentAmount) {
      Swal.fire('Error', 'Invested amount cannot be less than minimum investment amount.', 'error');
      return;
    }
 
    Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to buy this plan?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, buy it!'
    }).then(async (result) => {
      if (result.isConfirmed) {
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
 
          if (!response.ok) {
            throw new Error('Failed to buy plan');
          }
 
          const data = await response.json();
          console.log('Buy plan response:', data);
 
          Swal.fire('Success', 'Plan bought successfully!', 'success');
        } catch (error) {
          console.error('Error buying plan:', error.message);
          Swal.fire('Error', 'Failed to buy plan. Please try again later.', 'error');
        }
      }
    });
  };
 
  return (
<div>
      {isLoading ? (
<p>Loading...</p>
      ) : (
<div className={styles.bigadv}>
<div className={styles.riga}>
<div className={styles.advleft}>
<img src={dummy} className={styles.planImage} />
</div>
</div>
<div className={styles.lefa}>
<div className={styles.advright}>
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
<button className={styles.buyButton} onClick={handleBuyPlan}>Buy</button>
</div>
</div>
</div>
      )}
</div>
  );
}
 
export default PlanView;