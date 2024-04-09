import React, {useEffect, useState} from "react";
import { Link } from 'react-router-dom';
import styles from "./ProfileCard.module.css";
import historicalData from '../../components/dashboard/plans/symbols_data.json';

const ProfileCard = ({ plan }) => {

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
    
    const fetchStockPrices = (date, historicalData, plan) => {
      const prices = {};
    
      Object.keys(historicalData).forEach((symbol) => {
        const symbolData = historicalData[symbol];
        if (symbolData && typeof symbolData === "object" && symbolData.historical) {
          const priceData = symbolData.historical.find((item) => item.date === date);
          if (priceData) {
            prices[symbol] = Math.round(parseFloat(priceData.close));
          }
        }
      });
    
      setSelectedPrices(prices);
      calculateTotalValue(plan);
    };
    
    
    fetchStockPrices(selectedDate, historicalData, plan);
    
    return (
        <>
            <div className={styles.containerProfile}>
                <div className={styles.cardProfile}>
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
                        <p><strong style={{ color: "black", fontSize: "15px", fontWeight: "bold" }}>Min. Investment :</strong> {totalValue}</p>
                    </div>
                    <div className={styles.reviews}>
                        <p><strong style={{ color: "black", fontSize: "15px" }}>Risk :</strong> {plan.risk}</p>
                    </div>
                    {/* <div className={styles.reviews}>
                        <p><strong style={{ color: "black", fontSize: "15px" }}>CAGR</strong> {plan.risk}</p>
                    </div> */}
                    <div className={styles.reviews}>
                    {plan.planFees>0 ? <p>Paisa Lagega</p> : <p>lelo bhai free hai</p>}
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
