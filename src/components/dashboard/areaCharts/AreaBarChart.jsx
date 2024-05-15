import React, { useState, useEffect, useContext } from 'react';
import {
  ResponsiveContainer,
} from "recharts";
import { ThemeContext } from "../../../context/ThemeContext";
import "./AreaCharts.scss";
import axios from 'axios';
import DualAxis from '../../Dualaxis/DualAxis'
import loadingGif from "./../../../assest/images/Animation4.gif";
 
const AreaBarChart = () => {
 
 
  const [plansData, setPlansData] = useState(null);
  const [datu, setDatu] = useState(null);
  const [loading,setLoading] = useState(true);
 
  useEffect(() => {
    const fetchPlansData = async () => {
      try {
        const response = await fetch("https://team4api.azurewebsites.net/api/v1/advisor/list-of-plans", {
          method: "GET",
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('jwt')}`
          },
        });

        const data = await response.json();
        // console.log(data);
        setPlansData(data);
 
        const mappedData = data.plans.map(item => ({
          planName: item.planName,
          stocks: item.stocks,
          startVal: item.minInvestmentAmount,
          cash: item.cash
        }));
 
        const axiosResponse = await axios.post('https://c33b-103-226-169-60.ngrok-free.app/calculate_sts', { plans_data: mappedData });
        const calculatedData = axiosResponse.data; // Use axiosResponse.data directly
 
        const mapData = calculatedData.plans_data.map((plan) => ({
          Name: plan.planName,
          gains: plan.total_current_gains,
        }));
        setDatu(calculatedData.plans_data);
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
 
  return (
    <div className="bar-chart">
      <div className="bar-chart-info">
        <h5 className="bar-chart-title">Plans Values</h5>
        <div className="chart-info-data">
          {/* <div className="info-data-value">₹100.4K</div> */}
          <div className="info-data-text">
            {/* <FaArrowUpLong /> */}
            {/* <p>5% than last month.</p> */}
          </div>
        </div>
      </div>
      <div className="bar-chart-wrapper">
        {loading ? (
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', }}>
            <img src={loadingGif} alt="Loading..." style={{ maxWidth: '100%', maxHeight: '100%',width:'300px' }} />
          </div>
        ) : (
          datu ? (
            <ResponsiveContainer width="100%" height="100%">
              <DualAxis plans_data={datu} />
            </ResponsiveContainer>
          ) : (<div></div>)
        )}
      </div>
    </div>
  );
};
 
export default AreaBarChart;