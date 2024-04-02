import React, { useState, useEffect } from 'react';
import historicalData from './symbols_data.json'; // Import historical data JSON file
import StockList from './StockList';

const InvestmentForm = () => {
  // Initialize state to hold the updated plan data
  const [updatedPlan, setUpdatedPlan] = useState(null);
  const [selectedDate, setSelectedDate] = useState('2022-03-07');
  const [newSymbol, setNewSymbol] = useState('');
  const [newQty, setNewQty] = useState(0);
  const [selectedPrices, setSelectedPrices] = useState({}); // State to hold fetched stock prices
  const [totalValue, setTotalValue] = useState(0); // State to hold the total value of the plan
  const planId = "660b9db0b459396b38d7ff3f";
  const [loading, setLoading] = useState(true); // Loading state


  // Fetch plan details when component mounts or planId changes
  useEffect(() => {
    const fetchPlanDetails = async () => {
      try {
        const response = await fetch(`http://localhost:8000/api/v1/advisor/get-plan-details/${planId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          },
          credentials: 'include'
        });
        const data = await response.json();
        setUpdatedPlan(data.plan);
        setLoading(false);      
      } catch (error) {
        console.log('Error fetching plan details:', error);
      }
    };

    fetchPlanDetails();
  }, []);



  const calculateTotalValue = () => {
  
      let total = updatedPlan.cash; // Start with the cash balance
      updatedPlan.stocks.forEach(stock => {
        const price = selectedPrices[stock.symbol];
        if (price) {
          total += stock.qty * price;
        }
      });
      setTotalValue(total); // Update the total value state
    
  };
  
  // Fetch stock prices for the selected date
    
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
      setSelectedPrices(prices);
      calculateTotalValue();
      
    };



  

  // if (updatedPlan){}

  // Function to calculate the price percentage relative to total value
  const getPricePercentage = (price) => {
    if (totalValue === 0) return 0; // Avoid division by zero
    return ((price / totalValue) * 100).toFixed(2); // Calculate percentage and round to 2 decimal places
  };

  // Function to handle selling stocks
  const handleSellStock = (symbol, qty, price) => {
    const existingStock = updatedPlan.stocks.find(stock => stock.symbol === symbol);
    if (existingStock && existingStock.qty > 0) {
      const updatedCash = updatedPlan.cash + qty * price;
      const updatedStocks = updatedPlan.stocks.map(stock =>
        stock.symbol === symbol ? { ...stock, qty: stock.qty - qty } : stock
      );
      setUpdatedPlan({ ...updatedPlan, cash: updatedCash, stocks: updatedStocks });
    } else {
      alert('Cannot sell stocks with zero quantity.');
    }
  };

  // Function to handle buying stocks
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

  // Function to handle adding a new stock to the plan
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

  // Function to handle form submission
  const handleSubmit = event => {
    event.preventDefault();
    console.log('Selected Prices:', selectedPrices);
    console.log('Updated Plan:', updatedPlan);
    // Logic to update plan data on form submission (e.g., save to database)
  };

  if (loading) {
    return <div>Loading...</div>; // Show a loading indicator
  }


  return (
    <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-evenly" }}>
      <StockList selectedDate={selectedDate} tv={getPricePercentage} />
      <div>
        <h1>Edit Investment Plan</h1>
        <form onSubmit={handleSubmit}>
          <label htmlFor="cash">Cash Balance:</label>
          <input type="text" id="cash" value={updatedPlan ? getPricePercentage(updatedPlan.cash) : 0} readOnly />

          <h2>Sell/Buy Stocks</h2>
          {updatedPlan && updatedPlan.stocks.map(stock => (
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
          <input type="number" id="newQty" value={newQty} min="1" onChange={e => setNewQty(parseInt(e.target.value))} />
          <button type="button" onClick={handleAddStock}>Add Stock</button>

          <button type="submit">Save Changes</button>
        </form>
      </div>
    </div>
  );
};

export default InvestmentForm;
