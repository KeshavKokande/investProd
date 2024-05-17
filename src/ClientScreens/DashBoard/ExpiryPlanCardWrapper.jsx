import React, { useState } from 'react';
import { Card, Button } from 'antd';
import ReactSpeedometer from "react-d3-speedometer";
import { Text } from '@chakra-ui/react';
 
const ExpiryPlanCard = ({ plans }) => {
  const [currentPlanIndex, setCurrentPlanIndex] = useState(0);
  const currentPlan = plans[currentPlanIndex];
  const maxTotalDays = currentPlan.totalDays;
 
  const handleNextPlan = () => {
    setCurrentPlanIndex((prevIndex) => (prevIndex + 1) % plans.length);
  };
 
  const handlePrevPlan = () => {
    setCurrentPlanIndex((prevIndex) => (prevIndex - 1 + plans.length) % plans.length);
  };
 
  return (
    <Card width='500px'>
      <Text fontSize="18px" fontFamily="Manrope, sans-serif" fontWeight="bold" align="center">Days Left to Expire</Text>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <h3>{currentPlan.name}</h3>
        <ReactSpeedometer
          value={currentPlan.daysLeft}
          minValue={0}
          maxValue={maxTotalDays}
          needleColor="blue"
          startColor="red"
          segments={5}
          endColor="green"
          height={200}
          width={300}
        />
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: 20 }}>
        <Button onClick={handlePrevPlan}>Previous Plan</Button>
        <Button onClick={handleNextPlan} style={{ marginLeft: 10 }}>
          Next Plan
        </Button>
      </div>
    </Card>
  );
};
 
// Dummy data
const dummyPlans = [
  { name: 'Plan A', daysLeft: 91, totalDays: 180 },
  { name: 'Plan B', daysLeft: 15, totalDays: 90 },
  { name: 'Plan C', daysLeft: 70, totalDays: 365 },
];
 
const ExpiryPlanCardWrapper = () => {
  return <ExpiryPlanCard plans={dummyPlans} />;
};
 
export default ExpiryPlanCardWrapper;