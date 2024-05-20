import React, { useEffect } from 'react';
import { Box, Text, Center, Spinner } from '@chakra-ui/react';

const RedirectPage = () => {
    useEffect(() => {
        // Redirect after 3 seconds
        const timer = setTimeout(() => {
            window.location.href = 'https://invest-public.azurewebsites.net/';
        }, 3000);

        // Cleanup timer if the component is unmounted
        return () => clearTimeout(timer);
    }, []);

    return (
        <Center height="100vh" flexDirection="column" bg="gray.100">
            <Text mb="4" fontWeight="bold" color="blue" fontSize="100px" fontFamily="sans-serif" marginTop="20px">
                Welcome to INVEST
            </Text>
            <Text mb="4" color="gray.600" fontSize="50px" fontFamily="sans-serif">
                Wait a while
            </Text>
            <Box display="flex" alignItems="center" mb="4" >
                <Spinner size="4xl" color="teal.500" mr="4" />
                <Text color="gray.600" textAlign="center" fontFamily="sans-serif">
                    Redirecting to the website
                </Text>
            </Box>

            <Box>
                <img
                    src="../../assest/images/AnimationRP.gif"
                    alt="Loading GIF"
                    style={{ width: '400px', height: '200px' }}
                />
            </Box>

        </Center>
    );
};

export default RedirectPage;