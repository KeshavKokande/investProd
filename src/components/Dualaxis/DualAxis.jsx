import React from 'react';
import ReactApexChart from 'react-apexcharts';
import { useNavigate } from 'react-router-dom';

const DualAxis = ({ plans_data }) => {
  // Custom tick formatter to limit characters to 10
  const navigate = useNavigate();

  const handleBarClick = (event, chartContext, config) => {
    const planIndex = config.dataPointIndex;
    const planId = plans_data[planIndex].planId;
    navigate(`/advisor/editPlan/${planId}`);
  };

  const tickFormatter = (name) => name.length > 10 ? `${name.substring(0, 10)}...` : name;

  const handleBarHover = (event, chartContext, config) => {
    chartContext.w.config.chart.cursor = 'pointer';
  };

  const chartOptions = {
    chart: {
      type: 'bar',
      height: 350,
      events: {
        dataPointSelection: handleBarClick, // Attach custom click event handler
        dataPointMouseEnter: handleBarHover, // Attach custom hover event handler
      },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        dataLabels: {
          position: 'top',
        },
      },
    },
    dataLabels: {
      enabled: false,
      offsetX: -6,
      style: {
        fontSize: '12px',
        colors: ['#fff'],
      },
    },
    xaxis: {
      categories: plans_data.map(plan => plan.planName),
      labels: {
        formatter: tickFormatter,
        rotate: -45,
        rotateAlways: true,
      },
      tooltip: {
        enabled: false,
      },
    },
    
    yaxis: [
      {
        axisTicks: {
          show: true,
        },
        axisBorder: {
          show: true,
          color: '#008FFB',
        },
        labels: {
          style: {
            colors: '#008FFB',
          },
        },
        title: {
          text: 'Total Current Value',
          style: {
            color: '#008FFB',
          },
        },
      },
      {
        opposite: true,
        min: 0,
        axisTicks: {
          show: true,
        },
        axisBorder: {
          show: true,
          color: '#00E396',
        },
        labels: {
          style: {
            colors: '#00E396',
          },
        },
        title: {
          text: 'Initial Value',
          style: {
            color: '#00E396',
          },
        },
      },
    ],
    tooltip: {
      shared: true,
      intersect: false,
      x: {
        formatter: (val, { dataPointIndex }) => plans_data[dataPointIndex].planName, // Show full name on tooltip
      },
    },
    legend: {
      fontSize: '12px',
      labels: {
        colors: ['#008FFB', '#00E396'],
      },
      markers: {
        fillColors: ['#008FFB', '#00E396'],
      },
    },
  };

  const chartSeries = [
    {
      name: 'Total Current Value',
      data: plans_data.map(plan => plan.totalCurrentValue),
    },
    {
      name: 'Initial Value',
      data: plans_data.map(plan => plan.initialValue),
    },
  ];

  return (
    <div id="chart">
      <ReactApexChart options={chartOptions} series={chartSeries} type="bar" height={410} />
    </div>
  );
};

export default DualAxis;