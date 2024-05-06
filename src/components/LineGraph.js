// import React, { useEffect, useRef } from 'react';
// import Chart from 'chart.js/auto';

// const BarGraph = ({ data, threshold }) => {
//   const chartRef = useRef(null);

//   useEffect(() => {
//     if (chartRef && chartRef.current) {
//       const ctx = chartRef.current.getContext("2d");

//       const backgroundColors = data.values.map(value => {
//         return value >= threshold ? 'rgba(0, 255, 0, 0.5)' : 'rgba(255, 0, 0, 0.5)';
//       });

//       new Chart(ctx, {
//         type: 'bar',
//         data: {
//           labels: data.labels,
//           datasets: [{
//             label: 'Data',
//             data: data.values,
//             backgroundColor: backgroundColors,
//             borderColor: 'rgba(54, 162, 235, 1)',
//             borderWidth: 1
//           }]
//         },
//         options: {
//           scales: {
//             y: {
//               beginAtZero: true
//             }
//           }
//         }
//       });
//     }
//   }, [data, threshold]);

//   return <canvas ref={chartRef} />;
// };

// export default BarGraph;

import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const LineGraph = ({ data, threshold }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    if (chartRef && chartRef.current) {
      const ctx = chartRef.current.getContext("2d");

      const backgroundColors = data.values.map(value => {
        return value >= threshold ? 'rgba(0, 255, 0, 0.5)' : 'rgba(255, 0, 0, 0.5)';
      });

      new Chart(ctx, {
        type: 'line', // Change the type to line
        data: {
          labels: data.labels,
          datasets: [{
            label: 'Data',
            data: data.values,
            backgroundColor: backgroundColors,
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1
          }]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });
    }
  }, [data, threshold]);

  return <canvas ref={chartRef} />;
};

export default LineGraph;
