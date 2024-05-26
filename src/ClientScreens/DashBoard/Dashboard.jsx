import React, { useState, useEffect } from 'react';
import InvestmentSummary from './Summary';
import { Typography } from '@mui/material';
import styles from "./dashboard.module.css";
import axios from 'axios';
import loadingGif from "./../../assest/images/Animation11.gif";
import CliStock from './../../CliStockChart/CliStock'
import { ChakraProvider } from '@chakra-ui/react'
function DashboardCl() {
  const [transactions, setTransactions] = useState([]);
  const [returns, setReturns] = useState([]);
  const [advisorNames, setAdvisorNames] = useState([]);
  const [error, setError] = useState(null);
  const [plansData, setPlansData] = useState([]);
  const [allPlansData, setAllPlansData] = useState([]);
  const [tabData, setTabdata] = useState([]);
  const [profileInfo, setProfileInfo] = useState({
    img: '', // Add the img property to store the image data
    name: '',
    email: '',
    age: '',
    address: '',
    gender: '',
    jobRole: '',
    planIds: []
  });

  const [datu, setDatu] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchProfileData = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/v1/Client/get-own-details', {
          headers: {
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${localStorage.getItem('jwt')}`
          },
        });

        if (response.status === 200) {
          const data = response.data.client;
          const imageDataArray = data.profilePhoto?.data?.data || []; // Get the image data array
          const imageDataUrl = arrayToDataURL(imageDataArray); // Convert array to data URL
          setProfileInfo({
            cota: data.profilePhoto.contentType,
            img: imageDataUrl,
            name: data.name || '',
            email: data.email || '',
            age: data.age || '',
            address: data.address || '',
            gender: data.gender || '',
            jobRole: data.jobRole || '',
            boughtPlanIds: data.boughtPlanIds || [],
            planData: data.planData || []

          });
          // console.log(data);
          // console.log("data name", data.name);
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

  const arrayToDataURL = (array) => {
    const blob = new Blob([new Uint8Array(array)], { type: profileInfo.cota });
    const urlCreator = window.URL || window.webkitURL;
    return urlCreator.createObjectURL(blob);
  }

  const processData = (responseData) => {
    const { transactions, advisorNames } = responseData;

    // Create a map to store total invested amount for each plan
    const planInvestmentsMap = new Map();

    transactions.forEach(transaction => {
      const { planName, advisorId, investedAmount, date } = transaction;
      const advisorIndex = transactions.findIndex(item => item.advisorId === advisorId);
      const advisorName = advisorNames[advisorIndex]; // Map advisorId to advisorName

      // Calculate total invested amount for recurring plans
      if (planInvestmentsMap.has(planName)) {
        const currentInvestment = planInvestmentsMap.get(planName);
        planInvestmentsMap.set(planName, currentInvestment + investedAmount);
      } else {
        planInvestmentsMap.set(planName, investedAmount);
      }

      // Update advisor name
      transaction.advisorName = advisorName;
    });

    // Convert map to array of objects with desired format
    const processedData = Array.from(planInvestmentsMap).map(([planName, totalInvestedAmount]) => {
      const transactionsForPlan = transactions.filter(transaction => transaction.planName === planName);
      const latestTransaction = transactionsForPlan.reduce((latest, current) => (
        new Date(current.date) > new Date(latest.date) ? current : latest
      ));

      return {
        planName: latestTransaction.planName,
        advisorName: latestTransaction.advisorName,
        isPremium: latestTransaction.isPremium,
        total_investedamount: totalInvestedAmount,
        last_date_to_investment: formatDate(latestTransaction.date),
      };
    });

    return processedData;
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear().toString().slice(-2);
    return `${day}-${month}-20${year}`;
  };


  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/v1/Client/get-transactions', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('jwt')}`
          },

        });


        if (!response.ok) {
          throw new Error('Failed to fetch transactions data');
        }
        const data = await response.json();

        // console.log("transactions ", data);
        setTransactions(data.transactions);
        setTabdata(processData(data));
        setAdvisorNames(data.advisorNames);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchTransactions();
  }, []);


  useEffect(() => {
    const fetchPlansData = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/v1/Client/get-all-plans', {
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

        const filteredPlans = data.plans.filter(plan => profileInfo.boughtPlanIds.includes(plan._id));
        // console.log("filteredPlans", filteredPlans);
        setPlansData(filteredPlans);
        const filteredPlansIsActive = data.plans.filter(plan => plan.isActive);
        setAllPlansData(filteredPlansIsActive);

        const mappedData = filteredPlans.map(item => ({
          planName: item.planName,
          stocks: item.stocks,
          startVal: item.minInvestmentAmount,
          cash: item.cash
        }));

        const axiosResponse = await axios.post('http://localhost:8000/api/v1/stock/calculate_sts', { plans_data: mappedData });
        const calculatedData = axiosResponse.data; // Use axiosResponse.data directly


        setDatu(calculatedData.responseData);
        // console.log(datu);
        setLoading(false);

      } catch (error) {
        console.error('Error fetching plans data:', error.message);
      }
    };

    fetchPlansData();
  }, [profileInfo]);


  function processPlansData(responseData, planData) {
    const tbl_data = planData.map(plan => {
      // Find corresponding responseData entry
      const responseEntry = responseData.find(response => response.planName === plan.planName);

      if (responseEntry) {
        const currentValue = parseFloat(responseEntry.totalCurrentValue);
        const avgPrice = plan.avgPrice;
        const profitPercent = ((currentValue - avgPrice) / avgPrice) * 100;

        return {
          planName: plan.planName,
          _id: plan._id,
          profit_percent: profitPercent.toFixed(2) // Keeping it to 2 decimal places
        };
      }

      return null; // If no corresponding entry is found
    }).filter(entry => entry !== null); // Filter out null entries

    return tbl_data;
  }




  useEffect(() => {
    (function (d, t) {
      var v = d.createElement(t), s = d.getElementsByTagName(t)[0];
      v.onload = function () {
        window.voiceflow.chat.load({
          verify: { projectID: '6649ba50a76c568e0d411bb1' },
          url: 'https://general-runtime.voiceflow.com',
          versionID: 'production'
        });
      }
      v.src = "https://cdn.voiceflow.com/widget/bundle.mjs";
      v.type = "text/javascript"; s.parentNode.insertBefore(v, s);
    })(document, 'script');
  }, []);

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <div style={{ position: 'relative', top: '-80px' }}>
          <img src={loadingGif} alt="Loading..." style={{ maxWidth: '100%', maxHeight: '100%' }} />
        </div>
      </div>
    );
  }

  function calculateAverageGainPercentage(plansData) {
    let totalGainPercentage = 0;
    let totalStocks = 0;

    plansData.forEach((plan) => {
      plan.individualStocks.forEach((stock) => {
        totalGainPercentage += parseFloat(stock.totalChangePercent);
        totalStocks++;
      });
    });

    if (totalStocks === 0) {
      return 0; // Avoid division by zero
    }

    const averageGainPercentage = totalGainPercentage / totalStocks;
    return averageGainPercentage;
  }

  const averageGainPercentage = calculateAverageGainPercentage(datu);
  // console.log("Average Gain Percentage:", averageGainPercentage);


  return (
    <div className={styles.App}>
      <h2 className={styles.heading}> Portfolio Summary</h2>
      <InvestmentSummary transactions={transactions} advisorNames={advisorNames} returns={returns} etta={datu} avggg={averageGainPercentage} table={tabData} plansData={allPlansData} pnl={processPlansData(datu, profileInfo.planData)} />
    </div>
  );
}

export default DashboardCl;