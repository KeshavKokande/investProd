import React, { useState, useEffect } from 'react';
import historicalData from './symbols_data.json'; // Import historical data JSON file
import StockList from './StockList';

const InvestmentForm = () => {
  const [updatedPlan, setUpdatedPlan] = useState(null);
  const [selectedDate, setSelectedDate] = useState('2022-03-07');
  const [newSymbol, setNewSymbol] = useState('');
  const [newQty, setNewQty] = useState(0);
  const [selectedPrices, setSelectedPrices] = useState({});
  const [totalValue, setTotalValue] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPlanDetailsFromAPI = async (planId) => {
      try {
        const response = await fetch(`http://localhost:8000/api/v1/advisor/get-plan-details/${planId}`, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include'
        });
        const data = await response.json();
        return data.plan;
      } catch (error) {
        console.log('Error fetching plan details:', error);
        return null;
      }
    };

    const fetchData = async () => {
      const planId = "660b9db0b459396b38d7ff3f";
      const updatedPlanData = await fetchPlanDetailsFromAPI(planId);
      if (updatedPlanData) {
        setUpdatedPlan(updatedPlanData);
        setIsLoading(false);
        fetchStockPrices(selectedDate);
      } else {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [selectedDate]);

  const updateSelectedPrices = (prices) => {
    setSelectedPrices(prices);
    calculateTotalValue();
  };

  const updateTotalValue = (val) => {
    setTotalValue(val);
  };

  const calculateTotalValue = () => {
    let total = updatedPlan.cash;
    updatedPlan.stocks.forEach(stock => {
      const price = selectedPrices[stock.symbol];
      if (price) {
        total += stock.qty * price;
      }
    });
    updateTotalValue(total);
  };

  const getPricePercentage = (price) => {
    if (totalValue === 0) return 0;
    return ((price / totalValue) * 100).toFixed(2);
  };

  const handleSellStock = (symbol, qty, price) => {
    const existingStock = updatedPlan.stocks.find(stock => stock.symbol === symbol);

    if (existingStock && existingStock.qty > 0) {
      const updatedCash = updatedPlan.cash + qty * price;
      const updatedStocks = updatedPlan.stocks.map(stock =>
        stock.symbol === symbol ? { ...stock, qty: stock.qty - qty } : stock
      );

      const filteredStocks = updatedStocks.filter(stock => stock.qty > 0);

      setUpdatedPlan({ ...updatedPlan, cash: updatedCash, stocks: filteredStocks });
    } else {
      alert('Cannot sell stocks with zero quantity.');
    }
  };

  const handleBuyStock = (symbol, qty, price) => {
    const totalCost = qty * price;
    if (totalCost <= updatedPlan.cash) {
      const updatedCash = updatedPlan.cash - totalCost;
      const existingStock = updatedPlan.stocks.find(stock => stock.symbol === symbol);
      if (existingStock) {
        existingStock.qty += qty;
      } else {
        updatedPlan.stocks.push({ symbol, qty });
      }
      setUpdatedPlan({ ...updatedPlan, cash: updatedCash });
    } else {
      alert('Not enough cash to buy stocks.');
    }
  };

  const handleAddStock = () => {
    if (newSymbol && newQty > 0) {
      const price = selectedPrices[newSymbol];
      if (price) {
        const totalCost = newQty * price;
        if (totalCost <= updatedPlan.cash) {
          const updatedCash = updatedPlan.cash - totalCost;
          const existingStock = updatedPlan.stocks.find(stock => stock.symbol === newSymbol);
          if (existingStock) {
            existingStock.qty += newQty;
          } else {
            updatedPlan.stocks.push({ symbol: newSymbol, qty: newQty });
          }
          setUpdatedPlan({ ...updatedPlan, cash: updatedCash });
          setNewSymbol('');
          setNewQty(0);
        } else {
          alert('Not enough cash to buy stocks.');
        }
      } else {
        alert('Data Not Available');
      }
    } else {
      alert('Please enter a valid symbol and quantity.');
    }
  };

  const fetchStockPrices = (date) => {
    const prices = {};
    Object.keys(historicalData).forEach(symbol => {
      const symbolData = historicalData[symbol];
      if (symbolData && typeof symbolData === 'object' && symbolData.historical) {
        const priceData = symbolData.historical.find(item => item.date === date);
        if (priceData) {
          prices[symbol] = Math.round(parseFloat(priceData.close));
        }
      }
    });
    updateSelectedPrices(prices);
  };

  const handleSubmit = event => {
    event.preventDefault();
    // console.log('Updated Stocks:', updatedPlan.stocks);
    // console.log('Available Cash Balance:', updatedPlan.cash);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-evenly" }}>
      {updatedPlan && (
        <StockList selectedDate={selectedDate} tv={getPricePercentage} />
      )}
      <div>
        {updatedPlan && (
          <h1>Edit Investment Plan</h1>
        )}
        {updatedPlan && (
          <form onSubmit={handleSubmit}>
            <label htmlFor="cash">Cash Balance:</label>
            <input type="text" id="cash" value={getPricePercentage(updatedPlan.cash)} readOnly />

            <h2>Sell/Buy Stocks</h2>
            {updatedPlan.stocks.map(stock => (
              <div key={stock.symbol}>
                <p>
                  {stock.symbol}: Quantity - {stock.qty} | Price - {stock.qty * getPricePercentage(selectedPrices[stock.symbol])}% of Total Value
                </p>
                <button type="button" onClick={() => handleSellStock(stock.symbol, 1, selectedPrices[stock.symbol])}>Sell (-)</button>
                <button type="button" onClick={() => handleBuyStock(stock.symbol, 1, selectedPrices[stock.symbol])}>Buy (+)</button>
              </div>
            ))}

            <h2>Add New Stock</h2>
            <label htmlFor="newSymbol">Symbol:</label>
            <input type="text" id="newSymbol" value={newSymbol} onChange={e => setNewSymbol(e.target.value)} />
            <label htmlFor="newQty">Quantity:</label>
            <input type="number" id="newQty" value={newQty} onChange={e => setNewQty(parseInt(e.target.value))} />
            <button type="button" onClick={handleAddStock}>Add Stock</button>

            <button type="submit">Save Changes</button>
          </form>
        )}
      </div>
    </div>
  );
};

export default InvestmentForm;
