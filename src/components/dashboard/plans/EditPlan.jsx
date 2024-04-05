import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import styles from "./AdNewPlans.module.css";

const EditPlan = () => {
  const navigate = useNavigate();
  const { edit } = useParams();

  const [plansData, setPlansData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [formData, setFormData] = useState({
    planName: '',
    capValue: '',
    maxVal: '',
    returnProfit: '',
    risk: '',
    minInvestmentAmount: '',
    advise: '',
    stocks: [],
    photo: null
  });

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchPlansData = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/v1/advisor/list-of-plans", {
          method: "GET",
          headers: {
            'Content-Type': 'application/json'
          },
          credentials: 'include'
        });
        const data = await response.json();
        console.log(data);
        setPlansData(data.plans);
        setIsLoading(false);
      } catch (error) {
        console.log("Error fetching plans data:", error);
      }
    };

    fetchPlansData();

  }, []);

  useEffect(() => {
    console.log('Running useEffect');
    console.log('isLoading:', isLoading);
    console.log('plansData:', plansData);
    console.log('edit:', edit);
  
    if (!isLoading && plansData.length > 0) {
      const pilan = plansData.find((pil) => pil._id === edit);
      console.log("yeh hai ji plan: ", pilan);
      if (pilan) {
        setFormData({
          planName: pilan.planName,
          capValue: pilan.capValue,
          maxVal: pilan.maxVal,
          returnProfit: pilan.returnProfit,
          risk: pilan.risk,
          minInvestmentAmount: pilan.minInvestmentAmount,
          advise: pilan.advise,
          stocks: pilan.stocks,
          photo: null
        });
      }
    }
  }, [isLoading, plansData, edit]);



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

  const handleStockChange = (e, index, field) => {
    const { value } = e.target;
    let updatedStocks = [...formData.stocks];
    updatedStocks[index][field] = value;

    const totalContributions = updatedStocks.reduce((total, stock) => total + Number(stock.contri || 0), 0);

    if (totalContributions <= 100) {
      setFormData({
        ...formData,
        stocks: updatedStocks
      });
      setErrors({}); // Clear errors if total contribution is within limit
    } else {
      setErrors({ totalContributions: 'Total contribution cannot exceed 100%' });
      // Reset the changed value to prevent exceeding 100%
      updatedStocks[index][field] = '';
      setFormData({
        ...formData,
        stocks: updatedStocks
      });
    }
  };

  const handleAddStock = () => {
    setFormData({
      ...formData,
      stocks: [...formData.stocks, { stockName: '', contri: '' }]
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {};
    const totalContributions = formData.stocks.reduce((total, stock) => total + Number(stock.contri || 0), 0);

    if (totalContributions < 100) {
      newErrors.totalContributions = 'Sum of all stock contributions should not be less than 100%';
    }
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
    // // if (formData.photo === null) {
    // //   newErrors.photo = 'Photo upload is required';
    // }

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
          // fetch('http://localhost:8000/api/v1/advisor/add-plans', {
          //   method: 'POST',
          //   headers: {
          //     'Content-Type': 'application/json'
          //   },
          //   body: JSON.stringify(formData),
          //   credentials: 'include'
          // })
          //   .then(response => response.json())
          //   .then(data => {
          //     console.log('Response:', data);
          //     navigate('/plan');
          //   })
          //   .catch(error => {
          //     console.error('Error:', error);
          //   });
        }
      });
    }
  };

  
  return (
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
            <label className={styles.addPlan_label} htmlFor="capValue">Subscription Charges<span className={styles.required}>*</span>:</label>
            <input className={styles.addPlan_input} type="text" id="capValue" name="capValue" value={formData.capValue} onChange={handleChange} required />
            {errors.capValue && <div className={styles.error}><strong>{errors.capValue}</strong></div>}
          </div>
 
          <div className={styles.formGrp}>
            <label className={styles.addPlan_label} htmlFor="maxVal">Recommended Investment Amount<span className={styles.required}>*</span>:</label>
            <input className={styles.addPlan_input} type="text" id="maxVal" name="maxVal" value={formData.maxVal} onChange={handleChange} required />
            {errors.maxVal && <div className={styles.error}><strong>{errors.maxVal}</strong></div>}
          </div>
 
          <div className={styles.formGrp}>
            <label className={styles.addPlan_label} htmlFor="returnProfit">Return Profit<span className={styles.required}>*</span>:</label>
            <input className={styles.addPlan_input} type="text" id="returnProfit" name="returnProfit" value={formData.returnProfit} onChange={handleChange} required />
            {errors.returnProfit && <div className={styles.error}><strong>{errors.returnProfit}</strong></div>}
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
          {/* <div x className={styles.formGrp}>
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
          </div> */}
 
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



          <div className={styles.formGrp2}>
            <div className={styles.addPlan_stocks_label}>
              <label htmlFor="stocks" className={styles.addPlan_label}>Stocks<span className={styles.required}>*</span>:</label>
              <button type="button" className={(styles.addPlan_add_stock_btn, styles.align)} onClick={handleAddStock}>+ Add Stock</button>
            </div>
            {formData.stocks.map((stock, index) => (
              <div key={index} id={styles.stocks}>
                <input
                  style={{ width: '50%' }}
                  type="text"
                  id={`stockName${index}`}
                  name={`stockName${index}`}
                  value={stock.stockName}
                  onChange={(e) => handleStockChange(e, index, 'stockName')}
                  placeholder="Enter Stock Name"
                />
                <input
                  style={{ width: '50%' }}
                  type="number"
                  id={`contri${index}`}
                  name={`contri${index}`}
                  value={stock.contri}
                  onChange={(e) => handleStockChange(e, index, 'contri')}
                  placeholder="Enter Contribution"
                />
              </div>
            ))}
          </div>
          {errors.stock && <div className={styles.error}><strong>{errors.stock}</strong></div>}
          {errors.totalContributions && <div className={styles.error}><strong>{errors.totalContributions}</strong></div>}
          <button type="submit" className={styles.addPlan_add_stock_btn}>Create Plan</button>
        </form>
      </div>
    </div>
  );
};

export default EditPlan;









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




