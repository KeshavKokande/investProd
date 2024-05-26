import { useNavigate, useLocation } from 'react-router-dom';
import { Box, Text, Center, Spinner } from '@chakra-ui/react';
import './RedirectPage.css';
import React, {useEffect} from 'react';
 
const RedirectPage = () => {
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
                localStorage.setItem('fact', fact);
                localStorage.setItem('wlcmMSG', wlcmMSG);
                localStorage.setItem('usersJourney', usersJourney);
            }
 
            const timer = setTimeout(() => {
                if (newUser) {
                    navigate('/client_registration_form');
                } else {
                    navigate('/client/client_dashboard');
                }
            }, 5000);
 
            return () => {
                clearTimeout(timer);
            };
        } else {
            navigate('/login');
        }
    }, [location, navigate, fact, params]);
 
    return (
<Box className="glossy-background">
<Center height="100vh" flexDirection="column" p={[4, 6, 8]}>
<Text
                    mb="4"
                    fontWeight="700"
                    color="#475be8"
                    fontSize={['40px', '60px', '100px']}
                    fontFamily= 'Raleway, sans-serif'
                    mt="20px"
>
                    Welcome to INVEST
</Text>
<Text
                    mb="4"
                    color="#333333"
                    fontSize={['20px', '30px', '50px']}
                    fontFamily="sans-serif"
>
                    Wait a while
</Text>
<Box display="flex" alignItems="center" mb="4">
<Spinner size="xl" color="teal.500" mr="4" />
<Text
                        color="#333333"
                        textAlign="center"
                        fontFamily="sans-serif"
                        fontSize={['16px', '20px', '24px']}
>
                        Redirecting to the website
</Text>
</Box>
                {fact && (
<Box mt="4" bg="#6372ff" borderRadius="50px" p="4" mx="10" display="inline-block">
<Text
                        color="#F6F6F6"
                        fontSize={['16px', '20px', '30px']}
                        fontFamily="sans-serif"
                        textAlign="center"
>
                        {fact}
</Text>
</Box>
                )}
</Center>
</Box>
    );
};
 
export default RedirectPage;