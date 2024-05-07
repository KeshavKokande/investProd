import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
  Text,
} from 'recharts';

const BarChartComponent = ({ plansData }) => {
  // Extract plan names, gains, and colors from the data
  const data = plansData.map(plan => ({
    name: plan.planName,
    gains: Math.abs(plan.total_current_gains),
    originalGains: plan.total_current_gains,
    color: plan.total_current_gains < 0 ? '#FF0000' : '#0066FF',
  }));

  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
        <XAxis dataKey="name" tick={{ fontSize: 12 }} />
        <YAxis tickFormatter={val => Math.abs(val).toFixed(2)} tick={{ fontSize: 12 }} />
        <Tooltip formatter={val => Math.abs(val).toFixed(2)} />
        <Bar dataKey="gains">
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
          {data.map((entry, index) => (
            <Text
              key={`label-${index}`}
              x={index}
              y={entry.originalGains < 0 ? -10 : 20}
              dy={entry.originalGains < 0 ? -10 : 20}
              textAnchor="middle"
              fill={entry.originalGains < 0 ? '#FF0000' : '#0066FF'}
              fontSize={12}
            >
              {Math.abs(entry.originalGains).toFixed(2)}
            </Text>
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
};

export default BarChartComponent;
