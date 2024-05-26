import React, { useEffect, useState } from 'react';
import { Card, Button } from 'antd';
import ReactSpeedometer from 'react-d3-speedometer';
import { Box, Text, Flex, Heading } from '@chakra-ui/react';
import styles from './dashboard.module.css';

const ExpiryPlanCard = ({ plans }) => {
  const [currentPlanIndex, setCurrentPlanIndex] = useState(0);

  if (plans.length === 0) {
    return (
      <Box className={styles.infocard} width="100%" maxWidth="500px" p="4" borderWidth="1px" borderRadius="lg" overflow="hidden" bg="white">
        <strong className={styles.heading} fontSize="18px" fontFamily="sans-serif" fontWeight="bold" textAlign="center" mb="4" marginBottom="30px">
          Days Left to Expire
        </strong>
        <Flex flexDirection="column" alignItems="center">
          <Text fontSize="16px" fontWeight="bold" mb="2">No Plan Data Available</Text>
          <Box height={200} width={300} />
        </Flex>
      </Box>
    );
  }

  const currentPlan = plans[currentPlanIndex];
  const maxTotalDays = currentPlan.totalDays;

  const handleNextPlan = () => {
    setCurrentPlanIndex((prevIndex) => (prevIndex + 1) % plans.length);
  };

  const handlePrevPlan = () => {
    setCurrentPlanIndex((prevIndex) => (prevIndex - 1 + plans.length) % plans.length);
  };

  return (
    <Box className={styles.infocard} width="100%" maxWidth="500px" p="4" borderWidth="1px" borderRadius="lg" overflow="hidden" bg="white">
      <strong className={styles.heading} fontSize="18px" fontFamily="sans-serif" fontWeight="bold" textAlign="center" mb="4" marginBottom="30px">
        Days Left to Expire
      </strong>
      <Flex flexDirection="column" alignItems="center">
        <Text fontSize="16px" fontWeight="bold" mb="2">{currentPlan.name}</Text>
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
      </Flex>
      <Flex justifyContent="center" mt="4">
        <Button onClick={handlePrevPlan} colorScheme="blue" variant="outline" mr="2">
          Previous Plan
        </Button>
        <Button onClick={handleNextPlan} colorScheme="blue">
          Next Plan
        </Button>
      </Flex>
    </Box>
  );
};

function processPlanData(data) {
  if (!data || !data.daysLeftForPlans) {
    return [];
  }
  const totalDays = 365;

  return data.daysLeftForPlans.map(plan => ({
    name: plan.planName,
    daysLeft: plan.daysLeft,
    totalDays: totalDays
  }));
}

const ExpiryPlanCardWrapper = () => {
  const [plansData, setPlansData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlansData = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/v1/Client/get-days-left-to-expire-subs', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('jwt')}`
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch plans data');
        }

        const data = await response.json();
        setPlansData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPlansData();

    return () => {};
  }, []);

  if (loading) {
    return null; // or a loading indicator
  }

  return <ExpiryPlanCard plans={processPlanData(plansData)} />;
};

export default ExpiryPlanCardWrapper;



// import React, { useEffect, useState } from 'react';
// import { Card, Button } from 'antd';
// import ReactSpeedometer from 'react-d3-speedometer';
// import { Box, Text, Flex, Heading } from '@chakra-ui/react';
// import styles from './dashboard.module.css';

// const ExpiryPlanCard = ({ plans }) => {
//   const [currentPlanIndex, setCurrentPlanIndex] = useState(0);
//   const currentPlan = plans[currentPlanIndex];
//   const maxTotalDays = currentPlan.totalDays;

//   const handleNextPlan = () => {
//     setCurrentPlanIndex((prevIndex) => (prevIndex + 1) % plans.length);
//   };

//   const handlePrevPlan = () => {
//     setCurrentPlanIndex((prevIndex) => (prevIndex - 1 + plans.length) % plans.length);
//   };

//   return (
//     <Box className={styles.infocard} width="100%" maxWidth="500px" p="4" borderWidth="1px" borderRadius="lg" overflow="hidden" bg="white">
//       <strong className={styles.heading} fontSize="18px" fontFamily="sans-serif" fontWeight="bold" textAlign="center" mb="4" marginBottom="30px">
//         Days Left to Expire
//       </strong>
//       <Flex flexDirection="column" alignItems="center">
//         <Text fontSize="16px" fontWeight="bold" mb="2">{currentPlan.name}</Text>
//         <ReactSpeedometer
//           value={currentPlan.daysLeft}
//           minValue={0}
//           maxValue={maxTotalDays}
//           needleColor="blue"
//           startColor="red"
//           segments={5}
//           endColor="green"
//           height={200}
//           width={300}
//         />
//       </Flex>
//       <Flex justifyContent="center" mt="4">
//         <Button onClick={handlePrevPlan} colorScheme="blue" variant="outline" mr="2">
//           Previous Plan
//         </Button>
//         <Button onClick={handleNextPlan} colorScheme="blue">
//           Next Plan
//         </Button>
//       </Flex>
//     </Box>
//   );
// };

// function processPlanData(data) {
//   if (!data || !data.daysLeftForPlans) {
//     return [];
//   }
//   const totalDays = 365;

//   return data.daysLeftForPlans.map(plan => ({
//     name: plan.planName,
//     daysLeft: plan.daysLeft,
//     totalDays: totalDays
//   }));
// }


// const ExpiryPlanCardWrapper = () => {

//   const [plansData, setPlansData] = useState(null);
//   const [error, setError] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchPlansData = async () => {
//       try {
//         const response = await fetch('http://localhost:8000/api/v1/Client/get-days-left-to-expire-subs', {
//           method: 'GET',
//           headers: {
//             'Content-Type': 'application/json',
//             'Authorization': `Bearer ${localStorage.getItem('jwt')}`
//           },
//         });
  
//         if (!response.ok) {
//           throw new Error('Failed to fetch plans data');
//         }
  
//         const data = await response.json();
//         setPlansData(data);
//       } catch (err) {
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };
  
//     fetchPlansData();
  
//     return () => {
//     };
//   }, []);
  

//   if (loading || plansData === null) {
//     return null; // or loading indicator
//   }

//   return <ExpiryPlanCard plans={processPlanData(plansData)} />;
// };

// export default ExpiryPlanCardWrapper;