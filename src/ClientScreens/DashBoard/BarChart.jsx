import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import styles from './dashboard.module.css'

const ApexChart = ({ plans_data, width }) => {
  const [seriesData, setSeriesData] = useState([]);
  const [options, setOptions] = useState({
    chart: {
      height: 200,
      type: 'bar',
    },
    plotOptions: {
      bar: {
        borderRadius: 0,
        columnWidth: '50%',
      }
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      width: 2
    },
    
    grid: {
      row: {
        colors: ['#fff', '#f2f2f2']
      }
    },
    xaxis: {
      labels: {
        rotate: -45
      },
      tickPlacement: 'on',
    },
    fill: {
      type: 'gradient',
      gradient: {
        shade: 'light',
        type: "horizontal",
        shadeIntensity: 0.25,
        gradientToColors: undefined,
        inverseColors: true,
        opacityFrom: 0.85,
        opacityTo: 0.85,
        stops: [50, 0, 100]
      },
    }
  });

  useEffect(() => {
    console.log("Data from Flask:", plans_data);
    prepareChartData();
  }, [plans_data]);

  const prepareChartData = () => {
    if (!plans_data) {
      // Handle the case where plans_data is null or undefined
      return;
    }
  
    const newSeriesData = plans_data.map((plan) => ({
      name: plan.planName,
      data: [plan.total_current_gains],
    }));
  
    setSeriesData(newSeriesData);
  };
  
  return (
    <div>
      <div id="chart" style={{display:'grid', justifyItems:'center', paddingBottom:'20px'}}>
        <ReactApexChart options={options} series={seriesData} type="bar" height={250} width={width}/>
      </div>
    </div>
  );
};

export default ApexChart;
