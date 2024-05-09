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

const lossCircleStyle = {
  display: 'inline-block',
  width: '1rem',
  height: '1rem',
  backgroundColor: 'rgba(255,30,56,255)',
  marginRight: '0.5rem',
  borderRadius: '50%',
};

const profitCircleStyle = {
  display: 'inline-block',
  width: '1rem',
  height: '1rem',
  backgroundColor: 'rgba(38, 166, 91, 1)',
  marginRight: '0.5rem',
  borderRadius: '50%',
};
const BarChartComponent = ({ plansData }) => {
  // Extract plan names, gains, and colors from the data
  const data = plansData.map(plan => ({
    name: plan.planName,
    gains: Math.abs(plan.total_current_gains),
    originalGains: plan.total_current_gains,
    color: plan.total_current_gains < 0 ? 'rgba(255,30,56,255)' : 'rgba(38, 166, 91, 1)',
  }));

  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data} margin={{ top: 50, right: 30, left: 50, bottom: 80 }}>
        <XAxis dataKey="name" tick={{ fontSize: 12 }} angle={-45}
        dx={-45}
        dy={45}
        />
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
              angle={-45}
            >
              {Math.abs(entry.originalGains).toFixed(2)}
            </Text>
          ))}
        </Bar>
      </BarChart>
      <div><center>
      <span style={lossCircleStyle}></span>
      <span style={{ color: 'rgba(255,30,56,255)', marginRight: '1rem',fontSize:"small"}}>Loss</span>
      <span style={profitCircleStyle}></span>
      <span style={{ color: 'rgba(38, 166, 91, 1', fontSize:"small" }}>Profit</span></center>
    </div>
    </ResponsiveContainer>
  );
};

export default BarChartComponent;
