import { useNavigate, useLocation } from 'react-router-dom';
import { Box, Text, Center, Spinner } from '@chakra-ui/react';
// import './RedirectPage.css';
import React, {useEffect} from 'react';

import styles from "./ThankYou.module.css";
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
        <div className={styles.wrapper}>
            <div className={styles.container}>
                <h1 className={styles.heading}>Thank You for Registering!</h1>
                <p className={styles.paragraph}>Your registration has been successfully completed.</p>
                <a href="#" className={styles.button}>Go to Dashboard</a>
            </div>
        </div>
    );
};
 
export default RedirectPage;