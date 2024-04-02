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

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await axios.get('http://localhost:8000/api/v1/advisor/get-all-stocks', {
  //         headers: {
  //           'Content-Type': 'application/json'
  //         },
  //         withCredentials: true,
  //         body:{
  //           date: "2022-03-07"
  //         }
  //       });
      
  //       // Handle the response here
  //       setData(response.data.stocks); // Update state with fetched data
  //       console.log(data);
  //     } catch (error) {
  //       // Handle errors here
  //       console.error('Error fetching data:', error.message);
  //     }
  //   };

  //   fetchData(); // Call the fetchData function

  // }, []);



  const [formData, setFormData] = useState({
    planName: '',
    risk: '',
    minInvestmentAmount: '',
    advise: '',
    stocks: [],
    cash:0,
    photo: null
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
 

  // Function to handle date selection
//   const handleDateChange = event => {
//     setSelectedDate(event.target.value);
//      // Fetch prices for the selected date
//   };

  // Function to handle adding a new stock to the plan
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
    if (!formData.capValue) {
      newErrors.capValue = 'Cap value is required';
    }
    if (!formData.maxVal) {
      newErrors.maxVal = 'Max value is required';
    }
    if (!formData.risk) {
      newErrors.risk = 'Risk is required';
    }
    if (!formData.returnProfit) {
      newErrors.returnProfit = 'Return profit is required';
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

    if (parseInt(formData.maxVal) <= parseInt(formData.minInvestmentAmount)) {
      newErrors.minInvestmentAmount = 'cannot be more than Max Value';
      newErrors.maxVal = 'cannot be less than Min Value';
    }

    if (formData.returnProfit > 100 || formData.returnProfit < 0) {
      newErrors.returnProfit = 'Should be between 0-100%';
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
        </form>
      </div>
    </div>
    </div>
  );
};

export default AddPlan;









// import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import Swal from 'sweetalert2';
// import styles from "./AdNewPlans.module.css";
 
// const AddPlan = () => {
//   const navigate = useNavigate();
 
//   const [formData, setFormData] = useState({
//     planName: '',
//     capValue: '',
//     maxVal: '',
//     returnProfit: '',
//     risk: '',
//     minInvestmentAmount: '',
//     advise: '',
//     stocks: [{ stockName: '', contri: '' }],
//     photo: null
//   });
 
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value
//     });
//   };
 
//   const [photoBase64, setPhotoBase64] = useState(null);
 
//   const handlePhotoUpload = (event) => {
//     const file = event.target.files[0];
//     const reader = new FileReader();
 
//     reader.onloadend = () => {
//       const base64String = reader.result;
//       setPhotoBase64(base64String);
 
//       setFormData({
//         ...formData,
//         photo: {
//           data: base64String.split(',')[1],
//           contentType: file.type,
//         },
//       });
//     };
 
//     if (file) {
//       reader.readAsDataURL(file);
//     }
//   };
 
 
//   const [error, setError] = useState('');
 
//   const handleStockChange = (e, index, field) => {
//     const { value } = e.target;
//     let updatedStocks = [...formData.stocks];
//     updatedStocks[index][field] = value;
 
//     const totalContributions = updatedStocks.reduce((total, stock) => total + Number(stock.contri || 0), 0);
 
//     if (totalContributions <= 100) {
//       setFormData({
//         ...formData,
//         stocks: updatedStocks
//       });
//       setError(''); // Clear error if total contribution is within limit
//     } else {
//       setError('Total contribution cannot exceed 100%');
//       // Reset the changed value to prevent exceeding 100%
//       updatedStocks[index][field] = '';
//       setFormData({
//         ...formData,
//         stocks: updatedStocks
//       });
//     }
//   };
 
//   const handleAddStock = () => {
//     setFormData({
//       ...formData,
//       stocks: [...formData.stocks, { stockName: '', contri: '' }]
//     });
//   };
 
//   const handleSubmit = (e) => {
//     e.preventDefault();
 
//     Swal.fire({
//       title: 'Are you sure?',
//       text: 'You are about to create a new plan.',
//       icon: 'warning',
//       showCancelButton: true,
//       confirmButtonColor: '#3085d6',
//       cancelButtonColor: '#d33',
//       confirmButtonText: 'Yes, create it!'
//     }).then((result) => {
//       if (result.isConfirmed) {
//         console.log('Form data:', formData);
//         fetch('http://localhost:8000/api/v1/advisor/add-plans', {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json'
//           },
//           body: JSON.stringify(formData),
//           credentials: 'include'
//         })
//           .then(response => response.json())
//           .then(data => {
//             console.log('Response:', data);
//             navigate('/plan');
//           })
//           .catch(error => {
//             console.error('Error:', error);
//           });
//       }
//     });
//   };
 
//   return (
//     <div className={styles.addPlan_form_container}>
//       <div className={styles.addPlan_image_container}>
//         <img src="https://media.istockphoto.com/id/1372102011/vector/business-analyst-financial-data-analysis-advisor-analyzing-financial-report.jpg?s=612x612&w=0&k=20&c=LpfJhQ4yLFPh-yXebLXpPZFHhDhT3lGzjA2mkGioiLw=" alt="Financial Analysis" />
//       </div>
//       <div className={styles.addPlan_form_section}>
//         <form id={styles.new_plan_form} onSubmit={handleSubmit}>
//         <div className={styles.formGrp}>
//             <label className={styles.addPlan_label} htmlFor="planName">Plan Name:</label>
//             <input className={styles.addPlan_input} type="text" id="planName" name="planName" value={formData.planName} onChange={handleChange} required />
//           </div>
 
//           <div className={styles.formGrp}>
//             <label className={styles.addPlan_label} htmlFor="capValue">Cap Value:</label>
//             <input className={styles.addPlan_input} type="text" id="capValue" name="capValue" value={formData.capValue} onChange={handleChange} required />
//           </div>
 
//           <div className={styles.formGrp}>
//             <label className={styles.addPlan_label} htmlFor="maxVal">Max Value:</label>
//             <input className={styles.addPlan_input} type="text" id="maxVal" name="maxVal" value={formData.maxVal} onChange={handleChange} required />
//           </div>
 
//           <div className={styles.formGrp}>
//             <label className={styles.addPlan_label} htmlFor="returnProfit">Return Profit:</label>
//             <input className={styles.addPlan_input} type="text" id="returnProfit" name="returnProfit" value={formData.returnProfit} onChange={handleChange} required />
//           </div>
 
//           <div className={styles.formGrp}>
//             <label className={styles.addPlan_label} htmlFor="risk">Risk:</label>
//             <select className={styles.addPlan_select} id="risk" name="risk" value={formData.risk} onChange={handleChange} required>
//               <option value="low">Low</option>
//               <option value="medium">Medium</option>
//               <option value="high">High</option>
//             </select>
//           </div>
 
 
//           {/* <div className={`${styles['form-grp']} ${styles['question-container']}`}> */}
//           <div x className={styles.formGrp}>
//             <label htmlFor="photoId" className={styles.addPlan_label}>Upload Photo</label>
//             <input
//               type="file"
//               id="photoId"
//               name="photoId"
//               accept="image/*"
//               onChange={handlePhotoUpload}
//             // className={styles['form-control-file']}
//             />
//           </div>
 
//           <div className={styles.formGrp}>
//             <label className={styles.addPlan_label} htmlFor="minInvestmentAmount">Minimum Investment Amount:</label>
//             <input className={styles.addPlan_input} type="number" id="minInvestmentAmount" name="minInvestmentAmount" value={formData.minInvestmentAmount} onChange={handleChange} required />
//           </div>
 
//           <div className={styles.formGrp}>
//             <label className={styles.addPlan_label} htmlFor="advise">Advise:</label>
//             <input className={styles.addPlan_input} type="text" id="advise" name="advise" value={formData.advise} onChange={handleChange} required />
//           </div>
//           <div className={styles.formGrp2}>
//             <div className={styles.addPlan_stocks_label}>
//               <label htmlFor="stocks" className={styles.addPlan_label}>Stocks:</label>
//               <button type="button" className={(styles.addPlan_add_stock_btn, styles.align)} onClick={handleAddStock}>+ Add Stock</button>
//             </div>
//             {formData.stocks.map((stock, index) => (
//               <div key={index} id={styles.stocks}>
//                 <input
//                   style={{ width: '50%' }}
//                   type="text"
//                   id={`stockName${index}`}
//                   name={`stockName${index}`}
//                   value={stock.stockName}
//                   onChange={(e) => handleStockChange(e, index, 'stockName')}
//                   placeholder="Enter stock name"
//                 />
//                 <input
//                   style={{ width: '50%' }}
//                   type="number"
//                   id={`contri${index}`}
//                   name={`contri${index}`}
//                   value={stock.contri}
//                   onChange={(e) => handleStockChange(e, index, 'contri')}
//                   placeholder="Enter contribution"
//                 />
//               </div>
//             ))}
//           </div>
//           {error && <div className={styles.error}><strong>{error}</strong></div>}
//           <button type="submit" className={styles.addPlan_add_stock_btn}>Create Plan</button>
//         </form>
//       </div>
//     </div>
//   );
// };
 
// export default AddPlan;




