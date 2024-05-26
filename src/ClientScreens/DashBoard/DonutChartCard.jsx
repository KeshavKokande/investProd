import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Box, Text, Flex } from '@chakra-ui/react';
import styles from './dashboard.module.css';
 
const DonutChartCard = ({ da, ta, setret }) => {
 
 
  const addProfitPercent = (plans, profits) => {
    // Create a map for quick lookup of profit percent by planName
    const profitMap = new Map();
    profits.forEach(profit => {
      profitMap.set(profit.planName, parseFloat(profit.profit_percent));
    });
 
    // Add profit_percent to each plan
    return plans.map(plan => ({
      ...plan,
      profit_percent: profitMap.get(plan.planName) || 0
 
    }));
  };
 
  const ret = addProfitPercent(da,ta);
  console.log(ret);
 
  const calculateProfitsAndInvestments = (plans) => {
    let premiumProfits = 0;
    let nonPremiumProfits = 0;
    let premiumInvested = 0;
    let nonPremiumInvested = 0;
 
    plans.forEach(plan => {
      const profit = (plan.profit_percent / 100) * plan.total_investedamount;
      if (plan.isPremium) {
        premiumProfits += profit;
        premiumInvested += plan.total_investedamount;
      } else {
        nonPremiumProfits += profit;
        nonPremiumInvested += plan.total_investedamount;
      }
    });
 
    return {
      premium: {
        totalProfits: premiumProfits,
        totalInvested: premiumInvested
      },
      nonPremium: {
        totalProfits: nonPremiumProfits,
        totalInvested: nonPremiumInvested
      }
    };
  };
 
  const fits = calculateProfitsAndInvestments(ret);
  setret(fits);
  
 
  const investmentsData = {
    labels: ['Free Plans', 'Premium Plans'],
    datasets: [
      {
        label: 'Investments',
        data: [fits.nonPremium.totalInvested, fits.premium.totalInvested],
        backgroundColor: ['#475BE8', '#FFA600'],
      },
    ],
  };
 
  const returnsData = {
    labels: ['Free Plans', 'Premium Plans'],
    datasets: [
      {
        label: 'Returns',
        data: [fits.nonPremium.totalProfits,fits.premium.totalProfits],
        backgroundColor: ['#475BE8', '#FFA600'],
      },
    ],
  };
 
  return (
    <Box className={styles.infocard}>
      <Flex className={styles.chartContainer}>
        <Box className={styles.box}>
          <strong className={styles.heading} fontSize="18px" mb="4" fontFamily="sans-serif" fontWeight="bold">Investments</strong>
          <div className={styles.plot}>
            <Doughnut data={investmentsData} />
          </div>
        </Box>
        <Box className={styles.box}>
          <strong className={styles.heading} fontSize="18px" mb="4" fontFamily="sans-serif" fontWeight="bold">Returns</strong>
          <div className={styles.plot}>
            <Doughnut data={returnsData} />
          </div>
        </Box>
      </Flex>
    </Box>
  );
};
 
export default DonutChartCard;