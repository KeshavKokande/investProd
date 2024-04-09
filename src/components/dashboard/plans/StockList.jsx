// StockList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from "./AdNewPlans.module.css";

const StockList = ({ selectedDate, prices, handleSymbolClick }) => {

  return (
    <div className={styles.stock_list}>
      <div className={styles.stock_list_head}>
        <h3>Stock Prices </h3>
        <div className="search">
          {/* <label htmlFor=""></label> */}
          <input type="text" placeholder='search' />
        </div>
      </div>
      <ul className={styles.stock_list_ul}>
        {Object.keys(prices).map(symbol => (
          <li key={symbol} onClick={() => handleSymbolClick(symbol)} className={styles.stock_list_li}>
            <p className={styles.inline}>{symbol}:</p> <p className={styles.inline}>{prices[symbol]}</p> <input type="radio" name="" id="" />
          </li>
        ))}
      </ul>
      
    </div>
  );
};

export default StockList;
