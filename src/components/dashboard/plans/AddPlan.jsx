import { useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import styles from "./AdNewPlans.module.css";
import axios from 'axios';
import StockList from './StockList';
import historicalData from './symbols_data.json';

const AddPlan = () => {
  const navigate = useNavigate();
  const [date, setDate] = useState("2022-03-07")

  



  const [formData, setFormData] = useState({
    planName: '',
    risk: '',
    minInvestmentAmount: '',
    advise: '',
    stocks: [],
    cash:0,
    photo: null,
    planFees:0
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const [photoBase64, setPhotoBase64] = useState(null);

  const handlePhotoUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      const base64String = reader.result;
      setPhotoBase64(base64String);

      setFormData({
        ...formData,
        photo: {
          data: base64String.split(',')[1],
          contentType: file.type,
        },
      });
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };


  const [errors, setErrors] = useState({});



  const [newSymbol, setNewSymbol] = useState('');
  const [newQty, setNewQty] = useState(0);
  const [selectedPrices, setSelectedPrices] = useState({}); // State to hold fetched stock prices
 


  const handleAddStock = () => {
    if (newSymbol && newQty > 0) {
      const price = selectedPrices[newSymbol];
      if (price) {
        let updatedStocks = [...formData.stocks];
        const existingStockIndex = updatedStocks.findIndex(stock => stock.symbol === newSymbol);
        if (existingStockIndex !== -1) {
          updatedStocks[existingStockIndex].qty += newQty;
        } else {
          updatedStocks.push({ symbol: newSymbol, qty: newQty });
        }
        // Remove stocks with zero quantity
        updatedStocks = updatedStocks.filter(stock => stock.qty > 0);
        setFormData({ ...formData, stocks: updatedStocks });
        setNewSymbol('');
        setNewQty(0);
      } else {
        alert('Data Not Available');
      }
    } else {
      alert('Please enter a valid symbol and quantity.');
    }
  };
  

  // Function to fetch stock prices for the selected date
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
  };

  useEffect(() => {
    fetchStockPrices(date); // Fetch prices for today's date
  }, []);

  // Function to handle selling stocks
  const handleSellStock = (symbol, qty, price) => {
    const existingStockIndex = formData.stocks.findIndex(stock => stock.symbol === symbol);
    if (existingStockIndex !== -1 && formData.stocks[existingStockIndex].qty >= qty) {
      const updatedStocks = [...formData.stocks];
      updatedStocks[existingStockIndex].qty -= qty;
      // Remove stocks with zero quantity
      const filteredStocks = updatedStocks.filter(stock => stock.qty > 0);
      setFormData({ ...formData, stocks: filteredStocks });
    } else {
      alert('Cannot sell stocks with insufficient quantity.');
    }
  };

  // Function to handle buying stocks
  // Function to handle buying stocks
const handleBuyStock = (symbol, qty, price) => {
    const existingStockIndex = formData.stocks.findIndex(stock => stock.symbol === symbol);
    if (existingStockIndex !== -1) {
      const updatedStocks = [...formData.stocks];
      updatedStocks[existingStockIndex].qty += qty;
      setFormData({ ...formData, stocks: updatedStocks });
    } else {
      const updatedStocks = [...formData.stocks, { symbol, qty }];
      setFormData({ ...formData, stocks: updatedStocks });
    }
  };
  

  // Function to calculate the price percentage relative to total value
  const getPricePercentage = (price) => {
    const totalValue = calculateTotalValue();
    if (totalValue === 0) return 0; // Avoid division by zero
    return ((price / totalValue) * 100).toFixed(2); // Calculate percentage and round to 2 decimal places
  };

  // Function to calculate the total value of the plan including cash balance
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






  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {};
   

    if (!formData.planName) {
      newErrors.planName = 'Plan name is required';
    }


    if (!formData.risk) {
      newErrors.risk = 'Risk is required';
    }

    if (!formData.minInvestmentAmount) {
      newErrors.minInvestmentAmount = 'Minimum investment amount is required';
    }
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
        text: 'You are about to create a new plan.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, create it!'
      }).then((result) => {
        if (result.isConfirmed) {
          console.log('Form data:', formData);
          fetch('http://localhost:8000/api/v1/advisor/add-plans', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData),
            credentials: 'include'
          })
            .then(response => response.json())
            .then(data => {
              console.log('Response:', data);
              navigate('/plan');
            })
            .catch(error => {
              console.error('Error:', error);
            });
        }
      });
    }
  };

  const handleSimplifyStocks = () => {
    // Extract quantities from stocks array
    const quantities = formData.stocks.map(stock => stock.qty);
    // Calculate the GCD of all quantities using the Euclidean algorithm
    const gcd = findGCDArray(quantities);
    // Simplify each quantity by dividing by the GCD
    const simplifiedStocks = formData.stocks.map(stock => ({
      ...stock,
      qty: stock.qty / gcd
    }));
    setFormData({ ...formData, stocks: simplifiedStocks });
  };
  
  const findGCDArray = (arr) => {
    const gcd = (a, b) => {
      if (b === 0) return a;
      return gcd(b, a % b);
    };
    return arr.reduce((acc, curr) => gcd(acc, curr), arr[0]);
  };
  


  
  return (
    <div style={{display:"flex", flexDirection:"row"}}>

      <StockList selectedDate={date}/>




    <div className={styles.addPlan_form_container}>
      <div className={styles.addPlan_image_container}>
        <img src="https://media.istockphoto.com/id/1372102011/vector/business-analyst-financial-data-analysis-advisor-analyzing-financial-report.jpg?s=612x612&w=0&k=20&c=LpfJhQ4yLFPh-yXebLXpPZFHhDhT3lGzjA2mkGioiLw=" alt="Financial Analysis" />
      </div>
      <div className={styles.addPlan_form_section}>
        <form id={styles.new_plan_form} onSubmit={handleSubmit}>
          <div className={styles.formGrp}>
            <label className={styles.addPlan_label} htmlFor="planName">Plan Name<span className={styles.required}>*</span>:</label>
            <input className={styles.addPlan_input} type="text" id="planName" name="planName" value={formData.planName} onChange={handleChange} required />
            {errors.planName && <div className={styles.error}><strong>{errors.planName}</strong></div>}
          </div>

 
          <div className={styles.formGrp}>
            <label className={styles.addPlan_label} htmlFor="risk">Risk<span className={styles.required}>*</span>:</label>
            <select className={styles.addPlan_select} id="risk" name="risk" value={formData.risk} onChange={handleChange} required>
            <option value="">Select</option>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
            {errors.risk && <div className={styles.error}><strong>{errors.risk}</strong></div>}
            
          </div>
 
 
          {/* <div className={`${styles['form-grp']} ${styles['question-container']}`}> */}
          <div x className={styles.formGrp}>
            <label htmlFor="photoId" className={styles.addPlan_label}>Upload Photo<span className={styles.required}>*</span>:</label>
            <input
              type="file"
              id="photoId"
              name="photoId"
              accept="image/*"
              onChange={handlePhotoUpload}
            // className={styles['form-control-file']}
            />
            {errors.photo && <div className={styles.error}><strong>{errors.photo}</strong></div>}
          </div>
 
          <div className={styles.formGrp}>
            <label className={styles.addPlan_label} htmlFor="minInvestmentAmount">Minimum Investment Amount:</label>
            <input className={styles.addPlan_input} type="text" id="minInvestmentAmount" name="minInvestmentAmount" value={formData.minInvestmentAmount} onChange={handleChange} required />
            {errors.minInvestmentAmount && <div className={styles.error}><strong>{errors.minInvestmentAmount}</strong></div>}
          </div>

          <div className={styles.formGrp}>
            <label className={styles.addPlan_label} htmlFor="planFees">planFees:</label>
            <input className={styles.addPlan_input} type="number" id="planFees" name="planFees" value={formData.planFees} onChange={handleChange} required />
            {/* {errors.minInvestmentAmount && <div className={styles.error}><strong>{errors.minInvestmentAmount}</strong></div>} */}
          </div>
 
          <div className={styles.formGrp}>
            <label className={styles.addPlan_label} htmlFor="advise">Advise<span className={styles.required}>*</span>:</label>
            <input className={styles.addPlan_input} type="text" id="advise" name="advise" value={formData.advise} onChange={handleChange} required />
            {errors.advise && <div className={styles.error}><strong>{errors.advise}</strong></div>}
          </div>


          <h2>Add New Stock</h2>
          <label htmlFor="newSymbol">Symbol:</label>
          <input type="text" id="newSymbol" value={newSymbol} onChange={e => setNewSymbol(e.target.value)} />
          <label htmlFor="newQty">Quantity:</label>
          <input type="number" id="newQty" value={newQty}  onChange={e => setNewQty(parseInt(e.target.value))} />
          <button type="button" onClick={handleAddStock}>Add Stock</button>

          {formData.stocks.map(stock => (
            <div key={stock.symbol}>
              <p>
                {stock.symbol}: Quantity - {stock.qty} | Price - {stock.qty * getPricePercentage(selectedPrices[stock.symbol])}% of Total Value
              </p>
              <button type="button" onClick={() => handleSellStock(stock.symbol, 1, selectedPrices[stock.symbol])}>Sell (-)</button>
              <button type="button" onClick={() => handleBuyStock(stock.symbol, 1, selectedPrices[stock.symbol])}>Buy (+)</button>
            </div>
          ))}

          <button type="submit" className={styles.addPlan_add_stock_btn}>Create Plan</button>
          <button type="button" onClick={handleSimplifyStocks} className={styles.addPlan_simplify_btn}>Simplify</button>
        </form>
      </div>
    </div>
    </div>
  );
};

export default AddPlan;


