import React, { useState } from 'react';
import styles from "./AdNewPlans.module.css";

const StockList = ({ prices, handleSymbolClick, tv }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSymbol, setSelectedSymbol] = useState(null);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };


  const filteredSymbols = Object.keys(prices)
    .filter(symbol => symbol.toLowerCase().includes(searchTerm.toLowerCase()))
    .sort((a, b) => a.localeCompare(b));

    const formatCurrency = (amount) => {
      const num = parseFloat(amount);
      if (isNaN(num)) {
        return amount; // or return a default value or format
      }
      return `₹ ${num.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}`;
    };
  
  const handleClick = (symbol) => {
    // Set the radio button to checked for the clicked item
    setSelectedSymbol(symbol);
    // Call handleSymbolClick to perform other actions
    handleSymbolClick(symbol);
    // Reset the search box input field
    setSearchTerm('');
  };

  return (
    <div className={styles.stock_list}>
      <div className={styles.stock_list_head}>
        <h3 className={`${styles.heading_stock_prices}`}>Stock Prices </h3>
        <div className="search">
          <input
            type="text"
            placeholder='Search'
            value={searchTerm}
            onChange={handleSearchChange}
            className={`${styles.search_stock_input}`}
          />
        </div>
      </div>
      <ul className={styles.stock_list_ul}>
        <li className={!tv ? `${styles.stock_list_li} ${styles.small_width}` : `${styles.stock_list_li} ${styles.large_width}`}>
          <p className={`${styles.inline} ${styles.bold}`}>Symbol</p>
          <p className={`${styles.inline} ${styles.bold}`}>Price</p>
          {tv && (<p className={`${styles.inline} ${styles.bold}`}>Eq. Weightage</p>)}
        </li>
        {filteredSymbols.length > 0 && (
          <hr className={styles.stock_list_hr} />
        )}
        <div className={styles.stock_list_stocks}>
          {filteredSymbols.map(symbol => (
            <li key={symbol} onClick={() => handleClick(symbol)} className={styles.stock_list_li}>
              <p className={styles.inline}>{symbol}</p>
              <p className={styles.inline}>{formatCurrency(prices[symbol])}</p>
              {tv &&
                <p className={styles.inline}>{tv(prices[symbol])}%
                </p>
              }
            </li>
          ))}
        </div>
      </ul>
    </div>
  );
};

export default StockList;