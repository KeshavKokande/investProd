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
  const targetUrl = `/planDetail/${plan_id}`;

  console.log("kuch", profileData.subscribedPlanIds);

  const formatCurrency = (amount) => {
    const roundedAmount = amount.toFixed(2);
    const formattedAmount = roundedAmount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
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
    const fetchProfileData = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/v1/Client/get-own-details', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          },
          credentials: 'include'
        });

        if (response.ok) {
          const data = await response.json();
          setProfileData(data.client);
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
        console.log("GET ALL PLANS", data);


      } catch (error) {
        console.error('Error fetching plans data:', error.message);
      }
    };

    fetchProfileData();
    fetchPlansData();
  }, []);

  const plan = plansData.find(plan => plan._id === plan_id);
  console.log("PLAN DATA IS:", plan);

  const handleSubscribe = async () => {

    try {
      const response = await fetch(`http://localhost:8000/api/v1/client/subscribePlan/advisor/${plan.advisorId}/plan/${plan_id}`, {
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
        throw new Error('Failed To Buy Plan');
      }

      const data = await response.json();
      console.log('Buy plan response:', data);

      if (data.status === 'success') {
        
        Swal.fire({
          title: 'Success',
          text: 'Plan Bought Successfully!',
          icon: 'success'
        }).then((result) => {
          if (result.isConfirmed) {
            window.location.reload();
          }
        });

      
      }
    } catch (error) {
      console.error('Error buying plan:', error.message);
      Swal.fire('Error', 'Failed to buy plan. Please try again later.', 'error');
    }
  };



  const handleBuyPlan = async () => {
    if (investedAmount < plan.minInvestmentAmount) {
      Swal.fire('Error', 'Invested amount cannot be less than minimum investment amount.', 'error');
      return;
    }

    Swal.fire({
      title: 'Are You Sure?',
      text: 'Do You Want To Buy This Plan?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Buy It!'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await fetch(`http://localhost:8000/api/v1/client/invest-on-a-plan/advisor/${plan.advisorId}/plan/${plan_id}`, {
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
            throw new Error('Failed To Buy Plan');
          }

          const data = await response.json();
          console.log('Buy plan response:', data);


          Swal.fire('Success', 'Plan Bought Successfully!', 'success');
          if (data.status === 'success') {
            navigate('/client_dashboard');// Update success state
          }
        } catch (error) {
          console.error('Error buying plan:', error.message);
          Swal.fire('Error', 'Failed to buy plan. Please try again later.', 'error');
        }
      }
    });
  };

  // Function to handle incrementing the invested amount
  const incrementAmount = () => {
    setInvestedAmount(prevAmount => Math.round((prevAmount + tab.total_current_value + plan.cash) * 100) / 100);
  };

  // Function to handle decrementing the invested amount
  const decrementAmount = () => {
    if (investedAmount > 0) {
      setInvestedAmount(prevAmount => Math.round((prevAmount - tab.total_current_value - plan.cash) * 100) / 100);
    }
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
                {/* <div className={styles.row}>
                  <p className={styles.rowLabel}>
                    Recommended Investment Amount
                  </p>
                  <p className={styles.rowValue}>
                    ₹ {Number(plan.maxVal).toLocaleString('en-IN')}
                  </p>
                </div> */}
                <div className={styles.row}>
                  <p className={styles.rowLabel}>
                    Min. Investment Amount
                  </p>
                  <p className={styles.rowValue}>
                  ₹ {Number(tab.total_current_value).toLocaleString('en-IN', { maximumFractionDigits: 2 })}
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
                {(!plan.isPremium || (plan.isSubscribed) )&& (
                  <div className={styles.row}>
                    <p className={styles.rowLabel}>
                      Stocks
                    </p>
                    <p className={styles.rowValue}>
                      {plan.stocks.map(stock => (
                        <li key={stock._id}>
                          {stock.symbol} ({((stock.qty / plan.stocks.reduce((acc, curr) => acc + curr.qty, 0)) * 100).toFixed(2)}%)
                        </li>
                      ))}
                    </p>
                  </div>
                )}

                {!plan.isPremium||(plan.isSubscribed) ? (
                  <div style={{display: 'grid'}} className={styles.investment_panel_box}>
                    <div className={styles.investment_panel}>
                      <label htmlFor="amt">Amount to be invested</label>
                      <div className={styles.modify_qty}>
                        <input className={styles.modify_qty_input}
                          id='amt'
                          type="text"
                          value={formatCurrency(investedAmount)}
                          onChange={(e) => {
                            const value = e.target.value.replace(/\D/g, ''); // Remove non-numeric characters
                            setInvestedAmount(value);
                          }}
                          placeholder="Enter invested amount"
                          
                          readOnly
                        />
                        <div className={styles.modify_qty_btns}>
                        <button onClick={decrementAmount} className={styles.modify_qty_btn}>-</button>
                        <button onClick={incrementAmount} className={styles.modify_qty_btn} >+</button>
                        </div>
                      </div>
                    </div>
                    <button className={styles.buyButton} onClick={handleBuyPlan}>Buy</button>
                  </div>
                ) : (
                  <div className={styles.investment_panel_box}>
                    <button className={styles.subscribeButton} onClick={handleSubscribe}>
                      Subscribe
                    </button>
                  </div>
                )}
              </div>
            </div>
            <div className={styles.chart}>
              <StockChart stocks={plan.stocks} days={365}/>
            </div>
          </div>

        </div>
      )}
    </div>
  );
}

export default PlanView;

