import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import styles from "./ProfileCard.module.css";
import premium from '../../assets/images/premium.png'
import tick from '../../assets/images/tick.png'

const ProfileCard = ({ plan, ids }) => {
  const [tab, setTab] = useState(null);

  let totalValue = 0;
  let selectedPrices = {};
  let selectedDate = "2022-03-07";

  const setTotalValue = (value) => {
    totalValue = value;
  };

  const setSelectedPrices = (prices) => {
    selectedPrices = prices;
  };

  const setSelectedDate = (date) => {
    selectedDate = date;
  };

  const calculateTotalValue = (plan) => {
    let total = plan.cash;

    plan.stocks.forEach((stock) => {
      const price = selectedPrices[stock.symbol];
      if (price) {
        total += stock.qty * price;
      }
    });

    setTotalValue(total);
  };

  const fetchStockPrices = async () => {
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

      if (!response.ok) {
        throw new Error('Network response was not ok.');
      }

      const responseData = await response.json();
      setTab(responseData);
    } catch (error) {
      console.error('Error fetching stock prices:', error);
    }
  };

  useEffect(() => {
    fetchStockPrices();
  }, []);

  if (!tab) { return (<div></div>); }

  return (
    <>
      <div className={styles.containerProfile}>
        


        {/* <div className={styles.ribbon}>
            <img src={ribbon} alt="" />
        </div> */}
        <div className={styles.cardProfile}>
        {plan.planFees > 0 && ( // Render the div only if plan.planfees is greater than 0
          <div className={styles.premium}>
            <img src={premium} alt="" />
          </div>
        )}
          {ids && ids.includes(plan._id) && (
            <div className={styles.purchased}>
              <p>Bought</p>
            </div>
          )}
          <div className={`${styles.image} ${styles.gridPosition}`}>
            <img
              src={plan.decPhoto}
              alt='Profile'
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = 'https://imgur.com/VcypK5c.png';
              }}
              className={styles['profile-image']}
            />
          </div>
          <div className={`${styles.vitamin} ${styles.gridPosition}`}>
            <h2 className={styles.vitaminH2}>{plan.planName}</h2>

          </div>
          <div className={`${styles.reviews} ${styles.gridPosition}`}>
            <p><strong style={{ color: "black", fontSize: "15px", fontWeight: "bold" }}>Min. Investment :</strong> {(tab.total_current_value + plan.cash).toFixed(2)}</p>
          </div>
          <div className={styles.reviews}>
            <p><strong style={{ color: "black", fontSize: "15px" }}>Risk :</strong> {plan.risk}</p>
          </div>
          <div className={`${styles.size} ${styles.position}`}>
            <p style={{ color: "black", fontSize: "15px" }}>👥 : {plan.noOfSubscription}</p>
          </div>

          <div className={`${styles.buttonsProfile} ${styles.gridPosition}`}>
            <button>
              <Link to={`/planDetail/${plan._id}`} style={{ display: 'block', width: '100%', height: '100%', margin: '4px 4px 4px -4px' }}>
                Open
              </Link>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProfileCard;
