import { useParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import dummy from './13429911_5242374.jpg';
import styles from './Plans.module.css';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

function PlanView() {
  const navigate = useNavigate();
  const { plan_id } = useParams();
  const [plansData, setPlansData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [investedAmount, setInvestedAmount] = useState(0);

  const formatCurrency = (amount) => {
    const formattedAmount = amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return `₹ ${formattedAmount}`;
  };

  useEffect(() => {
    window.scrollTo(0, 0);
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
    if (investedAmount > plan.maxVal) {
      Swal.fire('Error', 'Invested amount cannot be more than maximum investment amount.', 'error');
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
          if (data.status === 'success') {
            navigate('/cldash');// Update success state
          }
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
          <h2 style={{ marginTop: "2vh" }} className={styles.heading}>{plan.planName}</h2>
          {/* <div className={styles.riga}> */}
          <div className={styles.advleft}>
            <img src={dummy} className={styles.planImage} />
          </div>
          {/* </div> */}

          {/* <div className={styles.lefa}> */}
          <div className={styles.advright}>

            <div className={styles.rowContainer}>
              {/* <h2>Plan Information</h2> */}
              <div className={styles.row}>
                <p className={styles.rowLabel}>
                  Subscription Charge
                </p>
                <p className={styles.rowValue}>
                ₹ {Number(plan.capValue).toLocaleString('en-IN')}
                </p>
              </div>
              <div className={styles.row}>
                <p className={styles.rowLabel}>
                  Created At
                </p>
                <p className={styles.rowValue}>
                  {new Date(plan.createdAt).toLocaleDateString()}
                </p>
              </div>
              <div className={styles.row}>
                <p className={styles.rowLabel}>
                  Recommended Investment Amount
                </p>
                <p className={styles.rowValue}>
                ₹ {Number(plan.maxVal).toLocaleString('en-IN')}
                </p>
              </div>
              <div className={styles.row}>
                <p className={styles.rowLabel}>
                  Min Investment Amount
                </p>
                <p className={styles.rowValue}>
                ₹ {Number(plan.minInvestmentAmount).toLocaleString('en-IN')}
                </p>
              </div>
              <div className={styles.row}>
                <p className={styles.rowLabel}>
                  No of Subscription
                </p>
                <p className={styles.rowValue}>
                  {plan.noOfSubscription}
                </p>
              </div>
              <div className={styles.row}>
                <p className={styles.rowLabel}>
                  Risk
                </p>
                <p className={styles.rowValue}>
                  {plan.risk}
                </p>
              </div>
              <div className={styles.row}>
                <p className={styles.rowLabel}>
                  Advise
                </p>
                <p className={styles.rowValue}>
                  {plan.advise}
                </p>
              </div>
              {/* <div className={styles.row}>
                <p className={styles.rowLabel}>
                  Stocks
                </p>
                <p className={styles.rowValue}>
                  {plan.stocks.map(stock => (
                    <li key={stock._id}>{stock.stockName}</li>
                  ))}
                </p>
              </div> */}

            </div>

            <div>
              <label htmlFor="amt">Amount to be invested</label>
              <input
                id='amt'
                type="text"
                value={formatCurrency(investedAmount)}
                onChange={(e) => {
                  const value = e.target.value.replace(/\D/g, ''); // Remove non-numeric characters
                  setInvestedAmount(value);
                }}
                placeholder="Enter invested amount"
                style={{ marginRight: '10px' }}
              />
            </div>

            <button className={styles.buyButton} onClick={handleBuyPlan}>Buy</button>
          </div>
          {/* </div> */}
        </div>
      )}
    </div>
  );
}

export default PlanView;

