import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import styles from "./AdNewPlans.module.css";

const AddPlan = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    planName: '',
    capValue: '',
    maxVal: '',
    returnProfit: '',
    risk: '',
    minInvestmentAmount: '',
    advise: '',
    stocks: [{ stockName: '', contri: '' }],
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

  const handleStockChange = (e, index, field) => {
    const { value } = e.target;
    const updatedStocks = [...formData.stocks];
    updatedStocks[index][field] = value;
    setFormData({
      ...formData,
      stocks: updatedStocks
    });
  };

  const handleAddStock = () => {
    setFormData({
      ...formData,
      stocks: [...formData.stocks, { stockName: '', contri: '' }]
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

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
  };

  return (
    <div className={styles.addPlan_form_container}>
      <div className={styles.addPlan_image_container}>
        <img src="https://media.istockphoto.com/id/1372102011/vector/business-analyst-financial-data-analysis-advisor-analyzing-financial-report.jpg?s=612x612&w=0&k=20&c=LpfJhQ4yLFPh-yXebLXpPZFHhDhT3lGzjA2mkGioiLw=" alt="Financial Analysis" />
      </div>
      <div className={styles.addPlan_form_section}>
        <form id={styles.new_plan_form} onSubmit={handleSubmit}>
          <div className={styles.formGrp}>
            <label className={styles.addPlan_label} htmlFor="planName">Plan Name:</label>
            <input className={styles.addPlan_input} type="text" id="planName" name="planName" value={formData.planName} onChange={handleChange} required />
          </div>

          <div className={styles.formGrp}>
            <label className={styles.addPlan_label} htmlFor="capValue">Cap Value:</label>
            <input className={styles.addPlan_input} type="text" id="capValue" name="capValue" value={formData.capValue} onChange={handleChange} required />
          </div>

          <div className={styles.formGrp}>
            <label className={styles.addPlan_label} htmlFor="maxVal">Max Value:</label>
            <input className={styles.addPlan_input} type="text" id="maxVal" name="maxVal" value={formData.maxVal} onChange={handleChange} required />
          </div>

          <div className={styles.formGrp}>
            <label className={styles.addPlan_label} htmlFor="returnProfit">Return Profit:</label>
            <input className={styles.addPlan_input} type="text" id="returnProfit" name="returnProfit" value={formData.returnProfit} onChange={handleChange} required />
          </div>

          <div className={styles.formGrp}>
            <label className={styles.addPlan_label} htmlFor="risk">Risk:</label>
            <select className={styles.addPlan_select} id="risk" name="risk" value={formData.risk} onChange={handleChange} required>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>


          {/* <div className={`${styles['form-grp']} ${styles['question-container']}`}> */}
          <div x className={styles.formGrp}>
            <label htmlFor="photoId" className={styles.addPlan_label}>Upload Photo</label>
            <input
              type="file"
              id="photoId"
              name="photoId"
              accept="image/*"
              onChange={handlePhotoUpload}
            // className={styles['form-control-file']}
            />
          </div>

          <div className={styles.formGrp}>
            <label className={styles.addPlan_label} htmlFor="minInvestmentAmount">Minimum Investment Amount:</label>
            <input className={styles.addPlan_input} type="number" id="minInvestmentAmount" name="minInvestmentAmount" value={formData.minInvestmentAmount} onChange={handleChange} required />
          </div>

          <div className={styles.formGrp}>
            <label className={styles.addPlan_label} htmlFor="advise">Advise:</label>
            <input className={styles.addPlan_input} type="text" id="advise" name="advise" value={formData.advise} onChange={handleChange} required />
          </div>

          <div className={styles.formGrp2}>
            <div className={styles.addPlan_stocks_label}>
              <label htmlFor="stocks" className={styles.addPlan_label}>Stocks:</label>
              <button type="button" className={(styles.addPlan_add_stock_btn, styles.align)} onClick={handleAddStock}>+ Add Stock</button>
            </div>
            {/* <div > */}
            {formData.stocks.map((stock, index) => (
              <div key={index} id={styles.stocks}>
                <input
                  style={{ width: '50%' }}
                  type="text"
                  id={`stockName${index}`}
                  name={`stockName${index}`}
                  value={stock.stockName}
                  onChange={(e) => handleStockChange(e, index, 'stockName')}
                  placeholder="Enter stock name"
                />
                <input
                  style={{ width: '50%' }}
                  type="number"
                  id={`contri${index}`}
                  name={`contri${index}`}
                  value={stock.contri}
                  onChange={(e) => handleStockChange(e, index, 'contri')}
                  placeholder="Enter contribution"
                />
              </div>
            ))}
            {/* </div> */}
          </div>
          <button type="submit" className={styles.addPlan_add_stock_btn}>Create Plan</button>
        </form>
      </div>
    </div>
  );
};

export default AddPlan;