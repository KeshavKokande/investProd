import React, { useState, useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';
import { Box } from "@chakra-ui/react";
import "../dashboard/areaCards/AreaCards.scss";
 
const PlansSold = () => {
  const [plansData, setPlansData] = useState(null);
  const [loading, setLoading] = useState(true);
 
  useEffect(() => {
    const fetchPlansData = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/v1/advisor/get-month-wise-plans-sold-free-vs-prem", {
          method: "GET",
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('jwt')}`
          },
        });
 
        const data = await response.json();
        // Sort plansData array by month
        data.transactions.sort((a, b) => a.month - b.month);
        setPlansData(data.transactions);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching plans data:', error.message);
      }
    };
 
    fetchPlansData();
    window.scrollTo(0, 0);
  }, []);
 
  const getSeriesData = (data) => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const seriesData = {
      free: [],
      premium: [],
      categories: []
    };
 
    data.forEach(transaction => {
      seriesData.free.push(transaction.plans.free || 0); // Replace NaN or undefined with 0
      seriesData.premium.push(transaction.plans.premium || 0); // Replace NaN or undefined with 0
      seriesData.categories.push(months[transaction.month - 1]);
    });
 
    return seriesData;
  };
 
  const seriesData = plansData ? getSeriesData(plansData) : { free: [], premium: [], categories: [] };
 
  const series = [
    {
      name: "Free Plans",
      data: seriesData.free
    },
    {
      name: "Premium Plans",
      data: seriesData.premium
    }
  ];
 
  const options = {
    chart: {
      height: 350,
      type: 'line',
      toolbar: {
        show: false
      }
    },
    colors: ['#E6E6E6', '#475BE8'],
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: 'smooth'
    },
    xaxis: {
      categories: seriesData.categories,
      title: {
        text: 'Month',
        style: {
          fontFamily: 'sans-serif'
        }
      },
      labels: {
        style: {
          fontFamily: 'sans-serif'
        }
      }
    },
    yaxis: {
      title: {
        text: 'Number of Plans Sold',
        style: {
          fontFamily: 'sans-serif'
        }
      },
      min: 0,
      tickAmount: 5,
      labels: {
        style: {
          fontFamily: 'sans-serif'
        }
      }
    },
    legend: {
      show: true, // Display legends
      position: 'top',
      horizontalAlign: 'right',
      floating: true,
      offsetY: -25,
      offsetX: -5,
      fontFamily: 'sans-serif'
    }
  };
 
 
  return (
    <Box className="bar-chart">
      <div className="bar-chart-info">
        <h5 className="bar-chart-title">Plans Sold</h5>
        <div className="chart-info-data">
          {/* You can add additional information here */}
        </div>
      </div>
      <div className="bar-chart-wrapper">
        {loading ? (
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
            {/* <img src={loadingGif} alt="Loading..." style={{ maxWidth: '100%', maxHeight: '100%', width: '300px' }} /> */}
          </div>
        ) : (
          <ReactApexChart options={options} series={series} type="line" height={350} />
        )}
      </div>
    </Box>
  );
}
 
export default PlansSold;