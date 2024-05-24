import React, { useState, useEffect, useContext } from 'react';
import ReactApexChart from 'react-apexcharts';
import { Box } from "@chakra-ui/react";
import axios from 'axios';
import "../dashboard/areaCards/AreaCards.scss";
 
const PlansSold = () => {
  const [plansData, setPlansData] = useState(null);
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
        setLoading(false);
      } catch (error) {
        console.error('Error fetching plans data:', error.message);
      }
    };
 
    fetchPlansData();
    window.scrollTo(0, 0);
  }, []);
 
  const series = [
    {
      name: "Free Plans",
      data: [15, 20, 15, 30, 35, 20] // Example data for free plans sold from March 2024
    },
    {
      name: "Premium Plans",
      data: [10, 15, 20, 25, 30, 35] // Example data for premium plans sold from March 2024
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
      categories: ['Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'], // Months from March 2024
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
      tickAmount: 5, // Adjust the number of ticks on y-axis as needed
      labels: {
        style: {
          fontFamily: 'sans-serif'
        }
      }
    },
    legend: {
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
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', }}>
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