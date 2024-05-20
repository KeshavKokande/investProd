import React, { useState } from 'react';
import { Box, Text, Button, Flex } from "@chakra-ui/react";
 
const TopInvestors = () => {
  const [chartIndex, setChartIndex] = useState(0); // 0 for amount invested, 1 for plans bought
 
  // Dummy investor data for amount invested
  const dummyInvestorsAmountData = [
    { name: 'Investor 1', amountInvested: 5000 },
    { name: 'Investor 2', amountInvested: 8000 },
    { name: 'Investor 3', amountInvested: 3000 },
    { name: 'Investor 4', amountInvested: 10000 },
    { name: 'Investor 5', amountInvested: 6000 },
  ];
 
  // Dummy investor data for plans bought
  const dummyInvestorsPlansData = [
    { name: 'Investor 1', plansBought: 1 },
    { name: 'Investor 2', plansBought: 5 },
    { name: 'Investor 3', plansBought: 3 },
    { name: 'Investor 4', plansBought: 2 },
    { name: 'Investor 5', plansBought: 2 },
  ];
 
  // Sort data in descending order
  const sortedAmountData = [...dummyInvestorsAmountData].sort((a, b) => b.amountInvested - a.amountInvested);
  const sortedPlansData = [...dummyInvestorsPlansData].sort((a, b) => b.plansBought - a.plansBought);
 
  // Function to handle next chart
  const handleNextChart = () => {
    setChartIndex((prevIndex) => (prevIndex === 0 ? 1 : 0));
  };
 
  return (
    <Box borderWidth="1px" borderRadius="md" overflow="hidden" p="4" bg="white">
      <Text fontSize="18px" mb="4" fontFamily="Manrope, sans-serif" color="#525252" fontWeight="bold">Top Investors</Text>
      <Box>
        {chartIndex === 0 ? (
          // Render chart based on amount invested
          sortedAmountData.map((investor, index) => (
            <Box key={index} mb="4">
              <Flex justifyContent="space-between" alignItems="center">
                <Text fontSize="lg" fontWeight="bold">{investor.name}</Text>
                <Text fontSize="lg">Amount Invested: ₹{investor.amountInvested}</Text>
              </Flex>
              {/* Render progress bar */}
              <Box bg="#E6E6E6" borderRadius="4px" height="20px" mt="8px">
                <Box
                  bg="#475BE8"
                  borderRadius="4px"
                  height="100%"
                  width={`${(investor.amountInvested / 10000) * 100}%`}
                ></Box>
              </Box>
            </Box>
          ))
        ) : (
          // Render chart based on plans bought
          sortedPlansData.map((investor, index) => (
            <Box key={index} mb="4">
              <Flex justifyContent="space-between" alignItems="center">
                <Text fontSize="lg" fontWeight="bold">{investor.name}</Text>
                <Text fontSize="lg">Number of Plans: {investor.plansBought}</Text>
              </Flex>
              {/* Render progress bar */}
              <Box bg="#E6E6E6" borderRadius="4px" height="20px" mt="8px">
                <Box
                  bg="#475BE8"
                  borderRadius="4px"
                  height="100%"
                  width={`${(investor.plansBought / 20) * 100}%`}
                ></Box>
              </Box>
            </Box>
          ))
        )}
      </Box>
      {/* Navigation buttons */}
      <Box mt="4">
        <Button
          variant="outline"
          colorScheme="blue"
          onClick={handleNextChart}
        >
          {chartIndex === 0 ? 'NEXT' : 'PREVIOUS'}
        </Button>
      </Box>
    </Box>
  );
}
 
export default TopInvestors;