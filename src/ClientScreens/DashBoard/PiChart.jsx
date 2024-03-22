
// import React from 'react';
// import { PieChart, Pie, Cell, Legend, Tooltip } from 'recharts';

// const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AF19FF', '#FF19D9']; // Colors for each slice

// const PiChart = ({ data, title }) => {
//     // Round off the values
//     const roundedData = data.map(item => ({
//         name: item.planName,
//         value: Math.round(Math.abs(item.value) * 100) / 100 // Round to two decimal places
//     }));

//     console.log("DATA:", data);
//     console.log("ROUNDED DATA:", roundedData);
//     console.log("title:", title);


//     return (
//         <div style={{ textAlign: 'center' }}>
//             <h3>{title}</h3>
//             <PieChart width={300} height={300}>
//                 <Pie
//                     data={roundedData}
//                     dataKey="value"
//                     nameKey="name"
//                     cx="50%"
//                     cy="50%"
//                     outerRadius={75}
//                     fill="#8884d8"
//                     label
//                 >
//                     {roundedData.map((entry, index) => (
//                         <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//                     ))}
//                 </Pie>
//                 <Tooltip />
//                 <Legend />
//             </PieChart>
//         </div>
//     );
// };

// export default PiChart;




import React from 'react';
import ReactApexChart from 'react-apexcharts';

const PiChart = ({ data, title }) => {
  const options = {
    chart: {
      fontFamily: 'Satoshi, sans-serif',
      type: 'donut',
    },
    colors: ['#3C50E0', '#6577F3', '#8FD0EF', '#0FADCF'],
    labels: data.map(item => item.name), // Use the names from data for labels
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
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <h3>{title}</h3>
      <div className="mb-2">
        <div id="chartThree" className="mx-auto flex justify-center">
          <ReactApexChart options={options} series={data.map(item => item.value)} type="donut" />
        </div>
      </div>
    </div>
  );
};

export default PiChart;

