// StockList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const StockList = ({ selectedDate, prices, handleSymbolClick  }) => {
  
  return (
    <div>
      <h2>Stock Prices for {selectedDate}</h2>
      <ul>
        {Object.keys(prices).map(symbol => (
          <li key={symbol} onClick={() => handleSymbolClick(symbol)}>
            {symbol}: {prices[symbol]}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StockList;
