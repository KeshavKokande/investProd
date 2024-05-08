import React from 'react';
import ReactApexChart from 'react-apexcharts';
import styles from "./dashboard.module.css";

const PiChart = ({ data, title }) => {
  const colors = [
    '#003f5c',
    '#2f4b7c',
    '#665191',
    '#a05195',
    '#d45087',
    '#f95d6a',
    '#ff7c43',
    '#ffa600'
  ]; // Define additional colors here

  const options = {
    chart: {
      fontFamily: 'Satoshi, sans-serif',
      type: 'donut',
    },
    colors: colors.slice(0, data.length),
    labels: data.map(item => item.name),
    legend: {
      show: false,
      position: 'bottom',
    },
    plotOptions: {
      pie: {
        donut: {
          size: '65%',
          background: 'transparent',
        },
      },
    },
    dataLabels: {
      enabled: false,
    },
    responsive: [
      {
        breakpoint: 2600,
        options: {
          chart: {
            width: 380,
          },
        },
      },
      {
        breakpoint: 640,
        options: {
          chart: {
            width: 200,
          },
        },
      },
    ],
    tooltip: {
      enabled: true,
      y: {
        formatter: function(val) {
          return `₹${parseFloat(val).toFixed(2)}`;
        }
      }
    }
  };

  return (
    <div style={{display:'flex'}}>
      <div className="mb-2">
        <div id="chartThree" className="mx-auto flex justify-center">
          <ReactApexChart options={options} series={data.map(item => item.value)} type="donut" />
        </div>
      </div>
      <div className={styles.pieChartLabels}>
        {data.map((item, index) => (
          <div  key={index}>
            <div className="flex w-full items-center">
              <span style={{ backgroundColor: colors[index] }} className={`mr-2 block h-3 w-full max-w-3 rounded-full`}></span>
              <p className="flex w-full justify-between text-sm font-medium text-black dark:text-white">
                <span> {item.name}</span>
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PiChart;