import React from 'react';
import ReactApexChart from 'react-apexcharts';
import { Box } from "@chakra-ui/react";
 
const PlansSold = () => {
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
    title: {
      text: 'Plans Sold',
      align: 'left',
      style: {
        fontFamily: 'Manrope, sans-serif',
        fontSize: '18px',
        color: "#525252"
      }
    },
    xaxis: {
      categories: ['Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'], // Months from March 2024
      title: {
        text: 'Month',
        style: {
          fontFamily: 'Manrope, sans-serif'
        }
      },
      labels: {
        style: {
          fontFamily: 'Manrope, sans-serif'
        }
      }
    },
    yaxis: {
      title: {
        text: 'Number of Plans Sold',
        style: {
          fontFamily: 'Manrope, sans-serif'
        }
      },
      min: 0,
      tickAmount: 5, // Adjust the number of ticks on y-axis as needed
      labels: {
        style: {
          fontFamily: 'Manrope, sans-serif'
        }
      }
    },
    legend: {
      position: 'top',
      horizontalAlign: 'right',
      floating: true,
      offsetY: -25,
      offsetX: -5,
      fontFamily: 'Manrope, sans-serif'
    }
  };
 
  return (
    <Box borderWidth="1px" borderRadius="md" overflow="hidden" p="4" bg="white">
      <div id="chart">
        <ReactApexChart options={options} series={series} type="line" height={350} />
      </div>
    </Box>
  );
}
 
export default PlansSold;