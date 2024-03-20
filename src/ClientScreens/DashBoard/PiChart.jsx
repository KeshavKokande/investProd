// import React from 'react';
// import { PieChart, Pie, Cell, Legend, Tooltip } from 'recharts';

// const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AF19FF', '#FF19D9']; // Colors for each slice

// const PiChart = ({ data }) => {
//     // Round off the values
//     const roundedData = data.map(item => ({
//         name: item.name,
//         value: Math.round(item.value * 100) / 100 // Round to two decimal places
//     }));

//     return (
//         <PieChart width={300} height={300}>
//             <Pie
//                 data={roundedData}
//                 dataKey="value"
//                 nameKey="name"
//                 cx="50%"
//                 cy="50%"
//                 outerRadius={75}
//                 fill="#8884d8"
//                 label
//             >
//                 {roundedData.map((entry, index) => (
//                     <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//                 ))}
//             </Pie>
//             <Tooltip />
//             <Legend />
//         </PieChart>
//     );
// };

// export default PiChart;



import React from 'react';
import { PieChart, Pie, Cell, Legend, Tooltip } from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AF19FF', '#FF19D9']; // Colors for each slice

const PiChart = ({ data, title }) => {
    // Round off the values
    const roundedData = data.map(item => ({
        name: item.planName,
        value: Math.round(item.value * 100) / 100 // Round to two decimal places
    }));

    console.log("DATA:", data);
    console.log("ROUNDED DATA:", roundedData);


    return (
        <div style={{ textAlign: 'center' }}>
            <h3>{title}</h3>
            <PieChart width={300} height={300}>
                <Pie
                    data={roundedData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={75}
                    fill="#8884d8"
                    label
                >
                    {roundedData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                </Pie>
                <Tooltip />
                <Legend />
            </PieChart>
        </div>
    );
};

export default PiChart;





