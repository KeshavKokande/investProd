import React from 'react';
import ReactApexChart from 'react-apexcharts';
import chroma from 'chroma-js';
import styles from "./dashboard.module.css";
 
const PiChart = ({ data, title }) => {
  const numDataPoints = data.length;
  const colors = chroma.scale(['#003f5c', '#ffa600']).mode('lch').colors(numDataPoints);
 
  const formatCurrency = (value) => {
    const parsedValue = parseFloat(value).toFixed(2);
    const stringValue = String(parsedValue);
    const [integerPart, decimalPart] = stringValue.split(".");
    const formattedIntegerPart = Number(integerPart).toLocaleString("en-IN");
    const formattedValue = `₹${formattedIntegerPart}${decimalPart ? `.${decimalPart}` : ''}`;
    return formattedValue;
};


  const options = {
    chart: {
      fontFamily: 'sans-serif',
      type: 'donut',
    },
    colors: colors,
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
          return formatCurrency(val);
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
          <div key={index}>
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