import React, { useState } from 'react';
import styles from "./AdNewPlans.module.css";

const StockList = ({  prices, handleSymbolClick, tv }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredSymbols = Object.keys(prices).filter(symbol =>
    symbol.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={styles.stock_list}>
      <div className={styles.stock_list_head}>
        <h3>Stock Prices </h3>
        <div className="search">
          <input
            type="text"
            placeholder='search'
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>
      </div>
      <ul className={styles.stock_list_ul}>
        <li className={styles.stock_list_li}>
      <p className={styles.inline}>symbol:</p> <p className={styles.inline}>Price</p> <p className={styles.inline}>Equivalent Weightage</p>
      </li>
      {filteredSymbols.map(symbol => (
          <li key={symbol} onClick={() => handleSymbolClick(symbol)} className={styles.stock_list_li}>
            <p className={styles.inline}>{symbol}:</p> <p className={styles.inline}>{prices[symbol]}</p>
            {tv ? <p className={styles.inline}>{'('}{tv(prices[symbol])}{'%)'}</p> : null}
            <input type="radio" name="" id="" />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StockList;
