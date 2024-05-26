import React, { useState, useEffect } from 'react';
import "../dashboard/areaCharts/AreaCharts.scss";

const TopInvestors = () => {
  const [chartIndex, setChartIndex] = useState(0); // 0 for amount invested, 1 for plans bought
  const [investorsAmountData, setInvestorsAmountData] = useState([]);
  const [investorsPlansData, setInvestorsPlansData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchInvestorsData = async () => {
      try {
        const token = localStorage.getItem('jwt');
        if (!token) {
          throw new Error('No JWT token found');
        }

        const amountResponse = await fetch("https://team4api.azurewebsites.net/api/v1/advisor/top-investors-invstd-amt", {
          method: "GET",
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
        });

        const plansResponse = await fetch("https://team4api.azurewebsites.net/api/v1/advisor/top-investors", {
          method: "GET",
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
        });

        if (!amountResponse.ok) {
          throw new Error(`Amount data fetch error: ${amountResponse.statusText}`);
        }
        if (!plansResponse.ok) {
          throw new Error(`Plans data fetch error: ${plansResponse.statusText}`);
        }

        const amountData = await amountResponse.json();
        const plansData = await plansResponse.json();

        setInvestorsAmountData(amountData.topInvestors);
        setInvestorsPlansData(plansData.topInvestors);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchInvestorsData();
  }, []);

  // Function to handle dropdown change
  const handleChartChange = (event) => {
    setChartIndex(Number(event.target.value));
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  // Sort investors based on amount invested and get the top 5
  const sortedInvestorsByAmount = [...investorsAmountData]
    .sort((a, b) => b.totalAmountInvested - a.totalAmountInvested)
    .slice(0, 5);
  
  // Sort investors based on plans bought and get the top 5
  const sortedInvestorsByPlans = [...investorsPlansData]
    .sort((a, b) => b.uniquePlansCount - a.uniquePlansCount)
    .slice(0, 5);
  
  // Find the maximum values
  const maxAmountInvested = Math.max(...investorsAmountData.map(investor => investor.totalAmountInvested));
  const maxPlansCount = Math.max(...investorsPlansData.map(investor => investor.uniquePlansCount));

  return (
    <div className="adv-progress-bar" style={{ backgroundColor: '#ffffff', borderRadius: '0.7rem' }}>
      <div className="progress-bar-info">
        <h4 className="adv-progress-bar-title">Top Investors</h4>
        <br />
        <select onChange={handleChartChange} value={chartIndex}>
          <option value={0}>Amount Invested</option>
          <option value={1}>Plans Bought</option>
        </select>
      </div>
      <div className="adv-progress-bar-list">
        {chartIndex === 0 ? (
          // Render chart based on amount invested
          sortedInvestorsByAmount.map((investor, index) => (
            <div className="progress-bar-item" key={index}>
              <div className="adv-bar-item-info">
                <p className="adv-bar-item-info-name">{investor.clientName}</p>
                <p className="adv-bar-item-info-value">Amount Invested: ₹{investor.totalAmountInvested.toFixed(2)}</p>
              </div>
              {/* Render progress bar */}
              <div className="adv-bar-item-full">
                <div
                  className="adv-bar-item-filled"
                  style={{
                    width: `${(investor.totalAmountInvested / maxAmountInvested) * 100}%`,
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
                <p className="adv-bar-item-info-name">{investor.clientName}</p>
                <p className="adv-bar-item-info-value">Number of Plans: {investor.uniquePlansCount}</p>
              </div>
              {/* Render progress bar */}
              <div className="adv-bar-item-full">
                <div
                  className="adv-bar-item-filled"
                  style={{
                    width: `${(investor.uniquePlansCount / maxPlansCount) * 100}%`,
                  }}
                ></div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default TopInvestors;
