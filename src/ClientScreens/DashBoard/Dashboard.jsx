import React, { useState, useEffect } from 'react';
import InvestmentSummary from './Summary';
import { Typography } from '@mui/material';
import styles from "./dashboard.module.css";
import axios from 'axios';
import notification from "./../../assets/icons/notification.png";
import user from "./../../assets/icons/moon.svg"
 
function DashboardCl() {
  const [transactions, setTransactions] = useState([]);
  const [returns, setReturns] = useState([]);
  const [advisorNames, setAdvisorNames] = useState([]);
  const [error, setError] = useState(null);
  const [profileInfo, setProfileInfo] = useState({
    img: '', // Add the img property to store the image data
    name: '',
    email: '',
    age: '',
    address: '',
    gender: '',
    jobRole: ''
  });
 
  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/v1/Client/get-own-details', {
          headers: {
            'Content-Type': 'application/json'
          },
          withCredentials: true
        });
 
        if (response.status === 200) {
          const data = response.data.client;
          setProfileInfo({
            name: data.name || '',
            email: data.email || '',
            age: data.age || '',
            address: data.address || '',
            gender: data.gender || '',
            jobRole: data.jobRole || ''
          });
          console.log(data);
          console.log("data name", data.name);
        } else {
          throw new Error('Failed to fetch profile data');
        }
      } catch (error) {
        console.error('Error fetching profile data:', error.message);
      }
    };
 
    fetchProfileData();
    sessionStorage.setItem('role', 'client');
  }, []);
 
  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/v1/Client/get-subscribed-plans', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          },
          credentials: 'include'
        });
 
        const ponse = await fetch('http://localhost:8000/api/v1/Client/get-returns-of-subscribed-plans', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          },
          credentials: 'include'
        });
 
        if (!response.ok || !ponse.ok) {
          throw new Error('Failed to fetch transactions data');
        }
        const data = await response.json();
        const redat = await ponse.json();
        setTransactions(data.transactions);
        setReturns(redat.profits);
        setAdvisorNames(data.advisorNames);
      } catch (error) {
        setError(error.message);
      }
    };
 
    fetchTransactions();
  }, []);
 
  return (
<div className={styles.App}>
{/* <Typography className={styles["profile-landing-name"]} variant="h4" sx={{ mb: 5 }}>
        Hi, Welcome back {profileInfo.name} 
</Typography> */}

<div className={styles.UserInfo}>
  <button>
    <img src={notification} alt="" />
  </button>
  <h4>{profileInfo.name}</h4>
  <img src={user} alt="" className={styles.userProfileImg} />
</div>

 
     <h2 className={styles.heading}> Portfolio Summary</h2>
 
      <InvestmentSummary transactions={transactions} advisorNames={advisorNames} returns={returns} />
<script>
        console.log(document.queryselector(".alert"));
</script>
</div>
  );
}
 
export default DashboardCl;