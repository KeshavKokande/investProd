import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Box, Text, Flex } from '@chakra-ui/react';
import styles from './dashboard.module.css';
 
const DonutChartCard = () => {
  const investmentsData = {
    labels: ['Free Plans', 'Premium Plans'],
    datasets: [
      {
        label: 'Investments',
        data: [15000, 11000],
        backgroundColor: ['#475BE8', '#FFA600'],
      },
    ],
  };
 
  const returnsData = {
    labels: ['Free Plans', 'Premium Plans'],
    datasets: [
      {
        label: 'Returns',
        data: [1000, 2000],
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