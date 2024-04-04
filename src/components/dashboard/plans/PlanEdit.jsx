import React, { Component } from 'react';
import historicalData from './symbols_data.json'; // Import historical data JSON file
import StockList from './StockList';

class InvestmentForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      updatedPlan: null,
      selectedDate: '2022-03-07',
      newSymbol: '',
      newQty: 0,
      selectedPrices: {},
      totalValue: null,
      isLoading: true,
    };
  }

  async fetchPlanDetailsFromAPI(planId) {
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
  }

  async componentDidMount() {
    const planId = "660b9db0b459396b38d7ff3f";
    const updatedPlan = await this.fetchPlanDetailsFromAPI(planId);
    if (updatedPlan) {
      this.setState({ updatedPlan, isLoading: false }, () => {
        this.fetchStockPrices(this.state.selectedDate);
      });
    } else {
      this.setState({ isLoading: false });
    }
  }

  updateSelectedPrices(prices) {
    this.setState({ selectedPrices: prices }, this.calculateTotalValue);
  }

  updateTotalValue(val) {
    this.setState({ totalValue: val });
  }

  calculateTotalValue() {
    let total = this.state.updatedPlan.cash;
    this.state.updatedPlan.stocks.forEach(stock => {
      const price = this.state.selectedPrices[stock.symbol];
      if (price) {
        total += stock.qty * price;
      }
    });
    this.updateTotalValue(total);
  }

  getPricePercentage(price) {
    const { totalValue } = this.state;
    if (totalValue === 0) return 0;
    return ((price / totalValue) * 100).toFixed(2);
  }

  handleSellStock(symbol, qty, price) {
    const { updatedPlan } = this.state;
    const existingStock = updatedPlan.stocks.find(stock => stock.symbol === symbol);
  
    if (existingStock && existingStock.qty > 0) {
      const updatedCash = updatedPlan.cash + qty * price;
      const updatedStocks = updatedPlan.stocks.map(stock =>
        stock.symbol === symbol ? { ...stock, qty: stock.qty - qty } : stock
      );
  
      // Filter out stocks with zero quantity
      const filteredStocks = updatedStocks.filter(stock => stock.qty > 0);
  
      this.setState({ 
        updatedPlan: { ...updatedPlan, cash: updatedCash, stocks: filteredStocks } 
      });
    } else {
      alert('Cannot sell stocks with zero quantity.');
    }
  }
  

  handleBuyStock(symbol, qty, price) {
    const { updatedPlan } = this.state;
    const totalCost = qty * price;
    if (totalCost <= updatedPlan.cash) {
      const updatedCash = updatedPlan.cash - totalCost;
      const existingStock = updatedPlan.stocks.find(stock => stock.symbol === symbol);
      if (existingStock) {
        existingStock.qty += qty;
      } else {
        updatedPlan.stocks.push({ symbol, qty });
      }
      this.setState({ updatedPlan: { ...updatedPlan, cash: updatedCash } });
    } else {
      alert('Not enough cash to buy stocks.');
    }
  }

  handleAddStock() {
    const { newSymbol, newQty, selectedPrices, updatedPlan } = this.state;
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
          this.setState({ updatedPlan: { ...updatedPlan, cash: updatedCash }, newSymbol: '', newQty: 0 });
        } else {
          alert('Not enough cash to buy stocks.');
        }
      } else {
        alert('Data Not Available');
      }
    } else {
      alert('Please enter a valid symbol and quantity.');
    }
  }

  fetchStockPrices(date) {
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
    this.updateSelectedPrices(prices);
  }

  handleSubmit = event => {
    event.preventDefault();
    // console.log('Selected Prices:', this.state.selectedPrices);
    console.log('Updated Stocks:', this.state.updatedPlan.stocks);
    console.log('Available Cash Balance:', this.state.updatedPlan.cash);
  };

  render() {
    const { updatedPlan, selectedDate, newSymbol, newQty, selectedPrices, totalValue, isLoading } = this.state;

    if (isLoading) {
      return <div>Loading...</div>;
    }

    return (
      <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-evenly" }}>
        {updatedPlan && (
          <StockList selectedDate={selectedDate} tv={this.getPricePercentage.bind(this)} />
        )}
        <div>
          {updatedPlan && (
            <h1>Edit Investment Plan</h1>
          )}
          {updatedPlan && (
            <form onSubmit={this.handleSubmit}>
              <label htmlFor="cash">Cash Balance:</label>
              <input type="text" id="cash" value={(this.getPricePercentage(updatedPlan.cash))} readOnly />

              <h2>Sell/Buy Stocks</h2>
              {updatedPlan.stocks.map(stock => (
                <div key={stock.symbol}>
                  <p>
                    {stock.symbol}: Quantity - {stock.qty} | Price - {stock.qty * this.getPricePercentage(selectedPrices[stock.symbol])}% of Total Value
                  </p>
                  <button type="button" onClick={() => this.handleSellStock(stock.symbol, 1, selectedPrices[stock.symbol])}>Sell (-)</button>
                  <button type="button" onClick={() => this.handleBuyStock(stock.symbol, 1, selectedPrices[stock.symbol])}>Buy (+)</button>
                </div>
              ))}

              <h2>Add New Stock</h2>
              <label htmlFor="newSymbol">Symbol:</label>
              <input type="text" id="newSymbol" value={newSymbol} onChange={e => this.setState({ newSymbol: e.target.value })} />
              <label htmlFor="newQty">Quantity:</label>
              <input type="number" id="newQty" value={newQty} onChange={e => this.setState({ newQty: parseInt(e.target.value) })} />
              <button type="button" onClick={this.handleAddStock.bind(this)}>Add Stock</button>

              <button type="submit">Save Changes</button>
            </form>
          )}
        </div>
      </div>
    );
  }
}

export default InvestmentForm;
