import React, { useState } from 'react';
import "../dashboard/areaCharts/AreaCharts.scss";
 
const TopInvestors = () => {
  const [chartIndex, setChartIndex] = useState(0); // 0 for amount invested, 1 for plans bought
 
  // Dummy investor data for amount invested
  const dummyInvestorsAmountData = [
    { name: 'Investor 1', amountInvested: 5000 },
    { name: 'Investor 2', amountInvested: 8000 },
    { name: 'Investor 3', amountInvested: 3000 },
    { name: 'Investor 4', amountInvested: 10000 },
    { name: 'Investor 5', amountInvested: 6000 },
  ];
 
  // Dummy investor data for plans bought
  const dummyInvestorsPlansData = [
    { name: 'Investor 1', plansBought: 1 },
    { name: 'Investor 2', plansBought: 5 },
    { name: 'Investor 3', plansBought: 3 },
    { name: 'Investor 4', plansBought: 2 },
    { name: 'Investor 5', plansBought: 2 },
  ];
 
  // Sort investors based on amount invested
  const sortedInvestorsByAmount = [...dummyInvestorsAmountData].sort((a, b) => b.amountInvested - a.amountInvested);
 
  // Sort investors based on plans bought
  const sortedInvestorsByPlans = [...dummyInvestorsPlansData].sort((a, b) => b.plansBought - a.plansBought);
 
  // Function to handle next chart
  const handleNextChart = () => {
    setChartIndex((prevIndex) => (prevIndex === 0 ? 1 : 0));
  };
 
  return (
    <div className="adv-progress-bar" style={{ backgroundColor: '#ffffff', borderRadius: '0.7rem' }}>
      <div className="progress-bar-info">
        <h4 className="adv-progress-bar-title">Top Investors</h4>
        <br />
      </div>
      <div className="adv-progress-bar-list">
        {chartIndex === 0 ? (
          // Render chart based on amount invested
          sortedInvestorsByAmount.map((investor, index) => (
            <div className="progress-bar-item" key={index}>
              <div className="adv-bar-item-info">
                <p className="adv-bar-item-info-name">{investor.name}</p>
                <p className="adv-bar-item-info-value">Amount Invested: ₹{investor.amountInvested}</p>
              </div>
              {/* Render progress bar */}
              <div className="adv-bar-item-full">
                <div
                  className="adv-bar-item-filled"
                  style={{
                    width: `${(investor.amountInvested / 10000) * 100}%`,
                  }}
                ></div>
              </div>
            </div>
          ))
        ) : (
          // Render chart based on plans bought
          sortedInvestorsByPlans.map((investor, index) => (
            <div className="progress-bar-item" key={index}>
              <div className="adv-bar-item-info">
                <p className="adv-bar-item-info-name">{investor.name}</p>
                <p className="adv-bar-item-info-value">Number of Plans: {investor.plansBought}</p>
              </div>
              {/* Render progress bar */}
              <div className="adv-bar-item-full">
                <div
                  className="adv-bar-item-filled"
                  style={{
                    width: `${(investor.plansBought / 5) * 100}%`,
                  }}
                ></div>
              </div>
            </div>
          ))
        )}
      </div>
      {/* Navigation buttons */}
      <div className="progress-bar-info">
        <button className="navigation-button" onClick={handleNextChart}>
          {chartIndex === 0 ? 'NEXT' : 'PREVIOUS'}
        </button>
      </div>
    </div>
  );
}
 
export default TopInvestors;