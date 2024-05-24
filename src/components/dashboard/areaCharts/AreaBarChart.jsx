import React, { useState, useEffect, useContext } from 'react';
import { ResponsiveContainer } from "recharts";
import { ThemeContext } from "../../../context/ThemeContext";
import "./AreaCharts.scss";
import axios from 'axios';
import DualAxis from '../../Dualaxis/DualAxis'
import loadingGif from "./../../../assest/images/Animation4.gif";

const AreaBarChart = () => {
  const [plansData, setPlansData] = useState(null);
  const [datu, setDatu] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlansData = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/v1/advisor/list-of-plans", {
          method: "GET",
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('jwt')}`
          },
        });

        const data = await response.json();

        setPlansData(data);
        
        const mappedData = data.plans.map(item => ({
          _id: item._id,
          planName: item.planName,
          stocks: item.stocks,
          startVal: item.minInvestmentAmount,
          cash: item.cash
        }));
        
        const axiosResponse = await axios.post('http://localhost:8000/api/v1/stock/calculate_sts', { plans_data: mappedData });
        const calculatedData = axiosResponse.data;

        const mapData = calculatedData.responseData.map((plan) => ({
          Name: plan.planName,
          gains: plan.total_current_gains,
        }));
        setDatu(calculatedData.responseData);
        setLoading(false);

      } catch (error) {
        console.error('Error fetching plans data:', error.message);
      }
    };

    fetchPlansData();
    window.scrollTo(0, 0);
  }, []);

  const { theme } = useContext(ThemeContext);

  const formatTooltipValue = (value) => {
    return `${value}k`;
  };

  const formatYAxisLabel = (value) => {
    return `${value}k`;
  };

  const formatLegendValue = (value) => {
    return value.charAt(0).toUpperCase() + value.slice(1);
  };

  // Custom tick formatter to limit characters to 10
  const tickFormatter = (name) => name.length > 10 ? `${name.substring(0, 10)}...` : name;

  return (
    <div className="bar-chart">
      <div className="bar-chart-info">
        <h5 className="bar-chart-title">Plans Values</h5>
        <div className="chart-info-data">
          <div className="info-data-text">
          </div>
        </div>
      </div>
      <div className="bar-chart-wrapper">
        {loading ? (
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
            <img src={loadingGif} alt="Loading..." style={{ maxWidth: '100%', maxHeight: '100%', width: '300px' }} />
          </div>
        ) : (
          datu ? (
            <ResponsiveContainer width="100%" height="100%">
              <DualAxis plans_data={datu} tickFormatter={tickFormatter} />
            </ResponsiveContainer>
          ) : (<div></div>)
        )}
      </div>
    </div>
  );
};

export default AreaBarChart;