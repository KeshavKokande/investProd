import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Box, Text, Center, Spinner } from '@chakra-ui/react';
import axios from 'axios';

const RedirectPage = () => {
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const fact = params.get('fact');

    useEffect(() => {
        const token = params.get('token');
        const newUser = params.get('newUser') === 'true';
        const wlcmMSG = params.get('wlcmMSG');
        const usersJourney = params.get('usersJourney');

        if (token) {
            localStorage.setItem('jwt', token);

            if (newUser) {
                // Optional: Store additional information if needed
                localStorage.setItem('fact', fact);
                localStorage.setItem('wlcmMSG', wlcmMSG);
                localStorage.setItem('usersJourney', usersJourney);
            }

            // Redirect after 10 seconds based on user type
            const timer = setTimeout(() => {
                if (newUser) {
                    navigate('/client_registration_form');
                } else {
                    navigate('/client/client_dashboard');
                }
            }, 5000);

            // Cleanup timer if the component is unmounted
            return () => {
                clearTimeout(timer);
            };
        } else {
            // Handle the error or redirect to an error page
            navigate('/login');
        }
    }, [location, navigate, fact, params]);

    return (
        <Center height="100vh" flexDirection="column" bg="gray.100">
            <Text mb="4" fontWeight="bold" color="#475be8" fontSize="100px" fontFamily="sans-serif" marginTop="20px">
                Welcome to INVEST
            </Text>
            <Text mb="4" color="gray.600" fontSize="50px" fontFamily="sans-serif">
                Wait a while
            </Text>
            <Box display="flex" alignItems="center" mb="4">
                <Spinner size="4xl" color="teal.500" mr="4" />
                <Text color="gray.600" textAlign="center" fontFamily="sans-serif">
                    Redirecting to the website
                </Text>
            </Box>
            <Box>
                <img
                    src="/images/AnimationRP.gif"
                    alt="Loading GIF"
                    style={{ width: '400px', height: '200px' }}
                />
            </Box>
            {fact && (
                <Text mt="4" color="gray.600" fontSize="20px" fontFamily="sans-serif">
                    Investment Tip: {fact}
                </Text>
            )}
        </Center>
    );
};

export default RedirectPage;
