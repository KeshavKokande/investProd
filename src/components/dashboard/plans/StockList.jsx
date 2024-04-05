// StockList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const StockList = ({ selectedDate }) => {
  const [prices, setPrices] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/stocks_curr');
        setPrices(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h2>Stock Prices for {selectedDate}</h2>
      <ul>
        {Object.keys(prices).map(symbol => (
          <li key={symbol}>
            {symbol}: {prices[symbol]}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StockList;
