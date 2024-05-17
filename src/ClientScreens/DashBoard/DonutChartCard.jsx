import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Box, Flex, Text } from '@chakra-ui/react';
 
const DonutChartCard = () => {
  // Sample data for investments and returns
  const investmentsData = {
    labels: ['Free Plans', 'Premium Plans'],
    datasets: [
      {
        label: 'Investments',
        data: [15000, 11000], // Sample data for investments
        backgroundColor: ['#475BE8', '#FFA600'],
      },
    ],
  };
 
  const returnsData = {
    labels: ['Free Plans', 'Premium Plans'],
    datasets: [
      {
        label: 'Returns',
        data: [1000, 2000], // Sample data for returns
        backgroundColor: ['#475BE8', '#FFA600'],
      },
    ],
  };
 
  return (
    <Box borderWidth="1px" borderRadius="lg" overflow="hidden" p="4" bg="white" width="710px"> {/* Set width here */}
      <Flex justifyContent="space-around">
        <Box>
          <Text fontSize="18px" mb="4">Investments</Text>
          <Doughnut data={investmentsData} />
        </Box>
        <Box>
          <Text fontSize="18px" mb="4">Returns</Text>
          <Doughnut data={returnsData} />
        </Box>
      </Flex>
    </Box>
  );
};
 
export default DonutChartCard;