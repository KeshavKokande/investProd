import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import styles from "./AdNewPlans.module.css";
import axios from 'axios';
import StockList from './StockList';

const EditPlan = () => {
  const { edit } = useParams();
  const navigate = useNavigate();
  const [tab, setTab] = useState();
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [newSymbol, setNewSymbol] = useState('');
  const [formData, setFormData] = useState({
    planName: '',
    risk: '',
    advise: '',
    stocks: [],
    cash: 0,
    planFees: 0
  });
  const [errors, setErrors] = useState({});
  const [selectedPrices, setSelectedPrices] = useState({});
  const [newQty, setNewQty] = useState(1);
  const [dataLoading, setDataLoading] = useState(0);
  const [loading, setLoading] = useState(true);
  const [cc, setCc] = useState(0);

  useEffect(() => {
    const fetchPlan = async () => {
      try {
        const response = await fetch(`http://localhost:8000/api/v1/advisor/get-plan-details/${edit}`, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include'
        });
        const data = await response.json();
        console.log("data = ", data);

        setFormData({
          planName: data.plan.planName,
          risk: data.plan.risk,
          advise: data.plan.advise,
          stocks: data.plan.stocks,
          cash: data.plan.cash,
          planFees: data.plan.planFees
        });
        setCc(data.plan.cash);
      } catch (error) {
        console.log('Error fetching plan details:', error);
      }
    };
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/stocks_curr');
        setSelectedPrices(response.data);
        setDataLoading(1);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };



    fetchPlan();
    fetchData();

  }, []);

  useEffect(() => {

    const fetchLate = async () => {
      try {
        const data = {
          stocks: formData.stocks.map(stock => ({
            symbol: stock.symbol,
            qty: stock.qty,
            avg_price: stock.price, // Assuming price is the average price
          }))
        };

        const response = await fetch('http://127.0.0.1:5000/calculate', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        });

        const responseData = await response.json();
        setTab(responseData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchLate();

  }, [dataLoading])

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };


  const handleAddStock = () => {
    if (newSymbol && newQty > 0) {
      const price = selectedPrices[newSymbol];
      if (price) {
        const totalCost = newQty * price;
        if (totalCost <= formData.cash) {
          const updatedCash = formData.cash - totalCost;
          const existingStock = formData.stocks.find(stock => stock.symbol === newSymbol);
          if (existingStock) {
            existingStock.qty += newQty;
          } else {
            formData.stocks.push({ symbol: newSymbol, qty: newQty });
          }
          formData.cash = updatedCash;
          setNewSymbol('');
          setNewQty(1);
        } else {
          alert('Not enough cash to buy stocks.');
        }
      } else {
        alert('Data Not Available');
      }
    } else {
      alert('Please enter a valid symbol and quantity.');
    }
    //calculateMini();
  };

  const handleSellStock = (symbol, qty, price) => {
    const existingStockIndex = formData.stocks.findIndex(stock => stock.symbol === symbol);
    if (existingStockIndex !== -1 && formData.stocks[existingStockIndex].qty >= qty) {
      const updatedStocks = [...formData.stocks];
      const updatedCash = formData.cash + qty * price;
      updatedStocks[existingStockIndex].qty -= qty;
      // Remove stocks with zero quantity
      const filteredStocks = updatedStocks.filter(stock => stock.qty > 0);

      setFormData({ ...formData, stocks: filteredStocks, cash: updatedCash });

      //calculateMini();
    } else {
      alert('Cannot sell stocks with insufficient quantity.');
    }
  };

  const handleBuyStock = (symbol, qty, price) => {
    setFormData(prevState => {
      const totalCost = qty * price;
      if (totalCost <= prevState.cash) {
        const updatedCash = prevState.cash - totalCost;
        const existingStockIndex = prevState.stocks.findIndex(stock => stock.symbol === symbol);

        if (existingStockIndex !== -1) {
          // Stock exists, update qty
          const updatedStocks = [...prevState.stocks];
          updatedStocks[existingStockIndex].qty += qty;
          return {
            ...prevState,
            cash: updatedCash,
            stocks: updatedStocks,
          };
        } else {
          // Stock doesn't exist, add new stock
          return {
            ...prevState,
            cash: updatedCash,
            stocks: [...prevState.stocks, { symbol, qty }],
          };
        }
      } else {
        alert('Not enough cash to buy stocks.');
        return prevState; // Return previous state as no changes are made
      }
    });
  };


  const getPricePercentage = (price) => {
    const totalValue = calculateTotalValue();
    if (totalValue === 0) return 0; // Avoid division by zero
    return ((price / totalValue) * 100).toFixed(2); // Calculate percentage and round to 2 decimal places
  };

  const calculateTotalValue = () => {
    let total = formData.cash; // Start with the cash balance

    // Add the value of each stock based on its quantity and price
    formData.stocks.forEach(stock => {
      const price = selectedPrices[stock.symbol];
      if (price) {
        total += stock.qty * price;
      }
    });

    return total;
  };


  const addPrci = () => {
    formData.stocks.forEach(stock => {
      const { symbol, qty } = stock;
      stock.price = selectedPrices[symbol];
    });

  }

  const handleSubmit = (e) => {
    e.preventDefault();
    addPrci();

    //handleSimplifyStocks();

    const newErrors = {};



    if (formData.stocks.length === 0) {
      newErrors.stocks = 'Add Atleast One Stock';
    }
    if (formData.photo === null) {
      newErrors.photo = 'Photo upload is required';
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      Swal.fire({
        title: 'Are you sure?',
        text: 'You are about to Save the Changes.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, create it!'
      }).then((result) => {
        if (result.isConfirmed) {

          axios.patch(`http://localhost:8000/api/v1/advisor/edit-stocks/${edit}`, formData, { withCredentials: true })
            .then(response => {
              console.log('Response:', response.data);
              navigate('/advisor/planList');
            })
            .catch(error => {
              console.error('Error:', error);
            });
        }
      });
    }
  };

  const handleSimplifyStocks = () => {
    const quantities = formData.stocks.map(stock => stock.qty);
    const gcd = findGCDArray(quantities);
    const simplifiedStocks = formData.stocks.map(stock => ({
      ...stock,
      qty: stock.qty / gcd
    }));
    formData.stocks = [...simplifiedStocks];
  };

  const findGCDArray = (arr) => {
    const gcd = (a, b) => {
      if (b === 0) return a;
      return gcd(b, a % b);
    };
    return arr.reduce((acc, curr) => gcd(acc, curr), arr[0]);
  };

  const calculateMini = () => {
    const ocks = [...formData.stocks];
    const quantities = ocks.map(stock => stock.qty);
    const gcd = findGCDArray(quantities);
    const simplifiedStocks = ocks.map(stock => ({
      ...stock,
      qty: stock.qty / gcd
    }));

    let mini = 0;

    for (const item of simplifiedStocks) {
      const { symbol, qty } = item;
      if (selectedPrices[symbol]) {
        mini += qty * selectedPrices[symbol];
      }
    }
    setFormData({ ...formData, minInvestmentAmount: mini });
  }

  const handleSymbolClick = (symbol) => {
    setNewSymbol(symbol);
  };

  const capitalize = (str) => {
    return str.replace(/\b\w/g, (char) => char.toUpperCase());
  };

  if (loading) { return (<div>Loading.....</div>); }
  return (
    <div style={{ display: "flex", flexDirection: "row" }} className={styles.addPlan_form_container}>
      <StockList selectedDate={date} prices={selectedPrices} handleSymbolClick={handleSymbolClick} tv={getPricePercentage} />

      <hr className={styles.addPlan_hr} />
      <div >
        {/* <div className={styles.addPlan_image_container}>
          <img src="https://media.istockphoto.com/id/1372102011/vector/business-analyst-financial-data-analysis-advisor-analyzing-financial-report.jpg?s=612x612&w=0&k=20&c=LpfJhQ4yLFPh-yXebLXpPZFHhDhT3lGzjA2mkGioiLw=" alt="Financial Analysis" />
        </div> */}
        <div className={styles.addPlan_form_section}>
          <form id={styles.new_plan_form} onSubmit={handleSubmit}>
            <div className={styles.formGrp}>
              <label className={styles.addPlan_label} htmlFor="planName">Plan Name<span className={styles.required}>*</span>:</label>
              <input className={styles.addPlan_input} type="text" id="planName" name="planName" value={formData.planName} onChange={handleChange} readOnly />
              {errors.planName && <div className={styles.error}><strong>{errors.planName}</strong></div>}
            </div>
            <div className={styles.formGrp}>
              <label className={styles.addPlan_label} htmlFor="risk">Risk<span className={styles.required}>*</span>:</label>
              <select className={styles.addPlan_select} id="risk" name="risk" value={formData.risk} onChange={handleChange} readOnly>
                <option value="">Select</option>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
              {errors.risk && <div className={styles.error}><strong>{errors.risk}</strong></div>}
            </div>
            <div className={styles.formGrp}>
              <label className={styles.addPlan_label} htmlFor="minInvestmentAmount">Minimum Investment Amount:</label>
              <input className={styles.addPlan_input} type="text" id="minInvestmentAmount" name="minInvestmentAmount" value={tab.total_current_value + cc} readOnly />
              {errors.minInvestmentAmount && <div className={styles.error}><strong>{errors.minInvestmentAmount}</strong></div>}
            </div>
            <div className={styles.formGrp}>
              <label className={styles.addPlan_label} htmlFor="planFees">Plan Fees:</label>
              <input className={styles.addPlan_input} type="number" id="planFees" name="planFees" value={formData.planFees} onChange={handleChange} required />
            </div>

            <div className={styles.formGrp}>
              <label className={styles.addPlan_label} htmlFor="cash">Diluted Weightage:</label>
              <input className={styles.addPlan_input} type="text" id="cash" value={getPricePercentage(formData.cash)} readOnly />
            </div>

            <div className={`${styles.formGrp} ${styles.formGrp3}`} >
              <label className={styles.addPlan_label} htmlFor="advise">Advise<span className={styles.required}>*</span>:</label>
              <input className={styles.addPlan_input} type="text" id="advise" name="advise" value={capitalize(formData.advise)} onChange={handleChange} required />
              {errors.advise && <div className={styles.error}><strong>{errors.advise}</strong></div>}
            </div>

            <div className={`${styles.formGrp} ${styles.addPlan_stocks}`}>
              <label className={styles.addPlan_label}>Stock</label>
              <input className={styles.addPlan_input} placeholder='Select stock from the list' type="text" id="newSymbol" value={newSymbol} onChange={e => setNewSymbol(e.target.value)} readOnly />
              <button type="button" onClick={handleAddStock}>&#x2713;</button>
            </div>

            {/* <div className={styles.addPlan_stocks}> */}
              

              {/* <div className={styles.formGrp}>
              <label className={styles.addPlan_label} htmlFor="newSymbol">Symbol:</label> */}

              {/* <input type="text" id="newSymbol" value={newSymbol} readOnly /> */}
              {/* </div> */}
              {/* <div className={styles.formGrp}>
              <label className={styles.addPlan_label} htmlFor="newQty">Quantity:</label>
              <input className={styles.addPlan_input} type="number" id="newQty" value={newQty} onChange={e => setNewQty(parseInt(e.target.value))} />
            </div> */}
            {/* </div> */}
            <div style={{ position: 'relative', width: '100%' }}>
              <hr style={{ width: '35.7vw', margin: '0', marginLeft: '0vw'}} />
            </div>
            <div className={styles.addPlan_stock_cards}>
              {formData.stocks.map(stock => (
                <div key={stock.symbol} className={styles.addPlan_card}>
                  <div className={styles.addPlan_card_detail}>
                    <p style={{ fontWeight: '600' }}>{stock.symbol}</p>
                    <p>
                      Weightage - {(stock.qty * getPricePercentage(selectedPrices[stock.symbol])).toFixed(2)}% of Total Value
                    </p>
                    <p>Price:</p>
                  </div>
                  <div className={styles.addPlan_card_button}>
                    <button type="button" onClick={() => handleBuyStock(stock.symbol, 1, selectedPrices[stock.symbol])} style={{ color: 'green' }}>+</button>
                    <button type="button" onClick={() => handleSellStock(stock.symbol, 1, selectedPrices[stock.symbol])} style={{ color: 'red' }}>-</button>
                  </div>
                </div>
              ))}
            </div>

            <button type="submit" className={styles.addPlan_add_stock_btn}>Save</button>
            {/* <button type="button" onClick={handleSimplifyStocks} className={styles.addPlan_simplify_btn}>Simplify</button> */}
          </form>
        </div>
      </div >
    </div >
  );
};

export default EditPlan;
