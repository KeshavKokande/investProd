import { useParams, useNavigate, Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import dummy from './13429911_5242374.jpg';
import styles from './Plans.module.css';
import Swal from 'sweetalert2';
import StockChart from '../../components/dashboard/plans/StockChart';
import Modal from './../../PricingModal/Modal/Modal';
import './../../PricingModal/PricingApp/PricingApp.css'
import loadingGif from "./../../assest/images/Animation13.gif";
function PlanView() {
  const navigate = useNavigate();
  const { plan_id } = useParams();
  const [plansData, setPlansData] = useState([]);
  const [profileData, setProfileData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [investedAmount, setInvestedAmount] = useState(0);
  const [cagr, setCagr] = useState(0);
  const targetUrl = `/planDetail/${plan_id}`;
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [quantity, setQuantity] = useState(0);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  // console.log("kuch", profileData.subscribedPlanIds);

  const formatCurrency = (amount) => {
    const roundedAmount = amount.toFixed(2);
    const formattedAmount = roundedAmount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return `₹ ${formattedAmount}`;
  };

  const [tab, setTab] = useState(null);
  //const [anotherAmount, setAnotherAmount] = useState(0);


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

        const response = await fetch('https://team4api.azurewebsites.net/api/v1/stock/calculate', {
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
        const response = await fetch('https://team4api.azurewebsites.net/api/v1/Client/get-own-details', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('jwt')}`
          },
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
        const response = await fetch('https://team4api.azurewebsites.net/api/v1/Client/get-all-plans', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('jwt')}`
          },
        });


        if (!response.ok) {
          throw new Error('Failed to fetch plans data');
        }

        const data = await response.json();
        setPlansData(data.plans);
        // console.log("GET ALL PLANS", data);


      } catch (error) {
        console.error('Error fetching plans data:', error.message);
      }
    };

    fetchProfileData();
    fetchPlansData();
  }, []);

  const plan = plansData.find(plan => plan._id === plan_id);
  // console.log("PLAN DATA IS:", plan);

  const handleSubscribe = async () => {
    // Navigate to pricingApp link
    navigate('/pricingApp');
  };

  const handleBuyPlan = async () => {
    if (investedAmount === 0) {
      alert('Please enter a valid invested amount.');
    } else {
      Swal.fire({
        title: 'Are You Sure?',
        text: 'Do you want to buy this plan?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, Buy It!'
      }).then(async (result) => {
        if (result.isConfirmed) {
          try {
            const response = await fetch(`https://team4api.azurewebsites.net/api/v1/client/invest-on-a-plan/advisor/${plan.advisorId}/plan/${plan_id}`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('jwt')}`
              },

              body: JSON.stringify({
                price: tab.total_current_value,
                qty: quantity,
                
              })
            });

            if (!response.ok) {
              throw new Error('Failed To Buy Plan');
            }

            const data = await response.json();
            // console.log('Buy plan response:', data);


            Swal.fire('Success', 'Plan Bought Successfully!', 'success');
            if (data.status === 'success') {
              navigate('/client/client_dashboard');// Update success state
            }
          } catch (error) {
            console.error('Error buying plan:', error.message);
            Swal.fire('Error', 'Failed to buy plan. Please try again later.', 'error');
          }
        }
      });
    }
  };

  // Function to handle incrementing the invested amount
  const incrementAmount = () => {
    //setAnotherAmount(Number(anotherAmount) + 1);
    setQuantity(quantity+1);
    setInvestedAmount(Math.round((tab.total_current_value+investedAmount) * 100) / 100);
  };

  // Function to handle decrementing the invested amount
  const decrementAmount = () => {
    if (investedAmount > 0) {
      //setAnotherAmount(Number(anotherAmount) - 1);
      setQuantity(quantity-1);
      setInvestedAmount(Math.round((investedAmount-tab.total_current_value) * 100) / 100);
    }
  };


  return (
    <div>
      {isLoading ? (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
          <div style={{ position: 'relative', top: '-80px' }}>
            <img src={loadingGif} alt="Loading..." style={{ maxWidth: '100%', maxHeight: '100%' }} />
          </div>
        </div>
      ) : (
        <div>
          <div className={styles.bigadv}>
            <h2 style={{ marginTop: "2vh" }} className={styles.heading}>{plan.planName}</h2>
            <div className={styles.advleft}>
              <img src={dummy} className={styles.planImage} />
            </div>

            <div className={styles.advright}>

              <div className={styles.rowContainer}>
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
                    {(plan.boughtClientIds).length}
                  </p>
                </div>
                <div className={styles.row}>
                  <p className={styles.rowLabel}>
                    One Year CAGR
                  </p>
                  <p className={styles.rowValue}>
                    {cagr}%
                  </p>
                </div>
                <div className={styles.row}>
                  <p className={styles.rowLabel}>
                    Risk
                  </p>
                  <p className={`${styles.rowValue} ${styles.riskValue}`}>
                    {plan.risk}
                  </p>
                </div>
                <div className={styles.row}>
                  <p className={styles.rowLabel}>
                    Advisor Name
                  </p>
                  <p className={styles.rowValue}>
                    <Link to={`/advisor/${plan.advisorId}`}><h4> <b >{plan.advisorName}</b> &nbsp; <span style={{ fontSize: '0.75em', textTransform: "capitalize" }}><i><b>{plan.category}</b></i></span></h4></Link>
                  </p>
                </div>
                <div className={styles.row}>
                  <p className={styles.rowLabel}>
                    Description
                  </p>
                  <p className={styles.rowValue}>
                    {plan.advise}
                  </p>
                </div>
                {(!plan.isPremium || (plan.isSubscribed)) && (
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

                {!plan.isPremium || (plan.isSubscribed) ? (
                  <div style={{ display: 'grid' }} className={styles.investment_panel_box}>
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
                          <button onClick={decrementAmount} className={`${styles.modify_qty_btn} ${styles.modify_qty_btn1}`}>-</button>
                        <input
                          className={styles.anotherInput}
                          type="text"
                          value={quantity}
                          onChange={(e) => {
                            const value = e.target.value.replace(/\D/g, ''); // Remove non-numeric characters
                            setQuantity(value);
                            setInvestedAmount(value * tab.total_current_value);
                            setQuantity(value);
                          }}
                          placeholder="Enter Lots"
                        />
                          <button onClick={incrementAmount} className={`${styles.modify_qty_btn} ${styles.modify_qty_btn2}`} >+</button>
                        </div>

                      </div>
                    </div>
                    <button className={styles.buyButton} onClick={handleBuyPlan}>Buy</button>
                  </div>
                ) : (
                  <div className={styles.investment_panel_box}>
                    <button className={styles.subscribeButton} onClick={openModal}>
                      Subscribe
                    </button>
                  </div>
                )}
              </div>
            </div>
            <div className={styles.chart}>
              <StockChart stocks={plan.stocks} days={365} setc={setCagr} />
            </div>
          </div>
        </div>
      )}
      {isLoading ? (
        <p></p>
      ) : (<Modal isOpen={modalIsOpen} closeModal={closeModal} planid={plan_id} advisor={plan.advisorId} cat={plan.category}>
      </Modal>)}
    </div>
  );
}

export default PlanView;


