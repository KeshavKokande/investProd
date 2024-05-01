import React from 'react';
import ReactApexChart from 'react-apexcharts';

const DualAxis = ({ plans_data }) => {
  const chartOptions = {
    chart: {
      type: 'bar',
      height: 350,
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
      data: plans_data.map(plan => plan.total_current_value),
    },
    {
      name: 'Initial Value',
      data: plans_data.map(plan => plan.initial_value),
    },
  ];

  return (
    <div id="chart">
      <ReactApexChart options={chartOptions} series={chartSeries} type="bar" height={250} />
    </div>
  );
};

export default DualAxis;
