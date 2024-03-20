import { useState } from 'react';

const
  AddPlan = () => {
    const [formData, setFormData] = useState({
      planName: '',
      capValue: '',
      maxVal: '',
      returnProfit: '',
      risk: '',
      minInvestmentAmount: '',
      advise: '',
      stocks: [{ stockName: '', contri: '' }]
    });

    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData({
        ...formData,
        [name]: value
      });
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
        })
        .catch(error => {
          console.error('Error:', error);
        });

        // setTimeout(() => {
        //   window.location.href = '/plan';
        // }, 5000);
    };


    return (
      <div className="addPlan-form-container">
        <div className="addPlan-image-container">
          <img src="https://media.istockphoto.com/id/1372102011/vector/business-analyst-financial-data-analysis-advisor-analyzing-financial-report.jpg?s=612x612&w=0&k=20&c=LpfJhQ4yLFPh-yXebLXpPZFHhDhT3lGzjA2mkGioiLw=" alt="Financial Analysis" />
        </div>
        <div className="addPlan-form-section">
          <form id="new-plan-form" onSubmit={handleSubmit}>
            <div className="form-grp">
              <label className="addPlan-label" htmlFor="planName">Plan Name:</label>
              <input className="addPlan-input" type="text" id="planName" name="planName" value={formData.planName} onChange={handleChange} required />
            </div>

            <div className="form-grp">
              <label className="addPlan-label" htmlFor="capValue">Cap Value:</label>
              <input className="addPlan-input" type="text" id="capValue" name="capValue" value={formData.capValue} onChange={handleChange} required />
            </div>

            <div className="form-grp">
              <label className="addPlan-label" htmlFor="maxVal">Max Value:</label>
              <input className="addPlan-input" type="text" id="maxVal" name="maxVal" value={formData.maxVal} onChange={handleChange} required />
            </div>

            <div className="form-grp">
              <label className="addPlan-label" htmlFor="returnProfit">Return Profit:</label>
              <input className="addPlan-input" type="text" id="returnProfit" name="returnProfit" value={formData.returnProfit} onChange={handleChange} required />
            </div>

            <div className="form-grp">
              <label className="addPlan-label" htmlFor="risk">Risk:</label>
              <select className="addPlan-select" id="risk" name="risk" value={formData.risk} onChange={handleChange} required>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>

            <div className="form-grp">
              <label className="addPlan-label" htmlFor="minInvestmentAmount">Minimum Investment Amount:</label>
              <input className="addPlan-input" type="number" id="minInvestmentAmount" name="minInvestmentAmount" value={formData.minInvestmentAmount} onChange={handleChange} required />
            </div>

            <div className="form-grp position">
              <label className="addPlan-label" htmlFor="advise">Advise:</label>
              <input className="addPlan-input position-input" type="text" id="advise" name="advise" value={formData.advise} onChange={handleChange} required />
            </div>

            <div className="form-grp form-grp2">
              <label className="addPlan-label" htmlFor="stocks">Stocks:</label>
              {/* <div id="stocks"> */}
              {formData.stocks.map((stock, index) => (
                <div key={index} id='stocks'>
                  <input
                    style={{ width: '82%' }}
                    type="text"
                    id={`stockName${index}`}
                    name={`stockName${index}`}
                    value={stock.stockName}
                    onChange={(e) => handleStockChange(e, index, 'stockName')}
                    placeholder="Enter stock name"
                  />
                  <input
                    style={{ width: '100%' }}
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
            <button type="button" className="addPlan-add-stock-btn align" onClick={handleAddStock}>+ Add Stock</button>
            <button type="submit" className="addPlan-add-stock-btn">Create Plan</button>
          </form>
        </div>
      </div>
    );
  };

export default AddPlan;