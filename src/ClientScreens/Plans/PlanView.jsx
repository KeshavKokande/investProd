import { useParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import dummy from './13429911_5242374.jpg';
import styles from './Plans.module.css';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import StockChart from '../../components/dashboard/plans/StockChart';
import axios from 'axios';

function PlanView() {
  const navigate = useNavigate();
  const { plan_id } = useParams();
  const [plansData, setPlansData] = useState([]);
  const [profileData, setProfileData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [investedAmount, setInvestedAmount] = useState(0);
  

  const formatCurrency = (amount) => {
    const formattedAmount = amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return `₹ ${formattedAmount}`;
  };

  const [tab, setTab] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchData = async () => {
      try {
        const data = {
          stocks: plan.stocks.map(stock => ({
            symbol: stock.symbol,
            qty: stock.qty,
            avg_price: stock.price, // Assuming price is the average price
          }))
        };

        const response = await fetch('http://127.0.0.1:5000/calculate', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        });

        const responseData = await response.json();
        setTab(responseData);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData(); // Call fetchData when the component mounts
  }, [plansData]); // Add stocks to the dependency array to fetch data when stocks change

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchProfileData = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/v1/Client/get-own-details', {
          headers: {
            'Content-Type': 'application/json'
          },
          withCredentials: true
        });
  
        if (response.status === 200) {
          const data = response.data.client;
          setProfileData(data);
          console.log("DATA OF USER", profileData);
        } else {
          throw new Error('Failed to fetch profile data');
        }
      } catch (error) {
        console.error('Error fetching profile data:', error.message);
      }
    };  
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
        setPlansData(data.plans);
        console.log(data);
      

      } catch (error) {
        console.error('Error fetching plans data:', error.message);
      }
    };

    fetchProfileData();
    fetchPlansData();
  }, []);

  const plan = plansData.find(plan => plan._id === plan_id);
  console.log("PLAN DATA IS:", plan);

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
        <div>
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
              {/* <div className={styles.row}>
                <p className={styles.rowLabel}>
                  CAGR
                </p>
                <p className={styles.rowValue}>
                ₹ {Number(plan.capValue).toLocaleString('en-IN')}
                </p>
              </div> */}
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
              {profileData.planIds && profileData.planIds.includes(plan_id) && (
                <div className={styles.row}>
                  <p className={styles.rowLabel}>
                    Stocks
                  </p>
                  <p className={styles.rowValue}>
                    {plan.stocks.map(stock => (
                      <li key={stock._id}>{stock.symbol}</li>
                    ))}
                  </p>
                </div>
              )}

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
          </div>
          <StockChart stocks={plan.stocks} days={30}/>
        </div>
      )}

      
    </div>
  );
}

export default PlanView;

