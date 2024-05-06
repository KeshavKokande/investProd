import React, { useState, useEffect } from 'react';
import { PieChart, Pie, ResponsiveContainer } from 'recharts';
import axios from 'axios';

export default function Example() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('./data.json'); // Adjust the path to your JSON file
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <h1>Pie Chart</h1>
      <div style={{ width: '100%', height: 400 }}>
        {data && (
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                dataKey="value"
                nameKey="name"
                startAngle={180}
                endAngle={0}
                cx="50%"
                cy="50%"
                outerRadius={80}
                fill="#8884d8"
                label
              />
            </PieChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
}
