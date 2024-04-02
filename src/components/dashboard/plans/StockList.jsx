import React from 'react';
import historicalData from './symbols_data.json';

const StockList = ({ selectedDate }) => {
  const getPriceForDate = (symbol, date) => {
    const symbolData = historicalData[symbol];
    if (symbolData && symbolData.historical) {
      const priceData = symbolData.historical.find(item => item.date === date);
      return priceData ? Math.round(parseFloat(priceData.close)) : null;
    }
    return null;
  };

  return (
    <div>
      <h2>Stock Prices for {selectedDate}</h2>
      <ul>
        {Object.keys(historicalData).map(symbol => {
          const price = getPriceForDate(symbol, selectedDate);
          return price ? (
            <li key={symbol}>
              {symbol}: {(price)}
            </li>
          ) : null;
        })}
      </ul>
    </div>
  );
};

export default StockList;
