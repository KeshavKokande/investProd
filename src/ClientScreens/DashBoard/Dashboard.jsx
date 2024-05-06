import React, { useState, useEffect } from 'react';
import InvestmentSummary from './Summary';
import styles from "./dashboard.module.css";
import axios from 'axios';

function DashboardCl() {
  const [transactions, setTransactions] = useState([]);
  const [returns, setReturns] = useState([]);
  const [advisorNames, setAdvisorNames] = useState([]);
  const [error, setError] = useState(null);
  const [plansData, setPlansData] = useState([]);
  const [mapu, setMapu] = useState([]);
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

  useEffect(() => {
    window.scrollTo(0, 0);
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
            boughtPlanIds: data.boughtPlanIds || []
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

  const arrayToDataURL = (array) => {
    const blob = new Blob([new Uint8Array(array)], { type: profileInfo.cota });
    const urlCreator = window.URL || window.webkitURL;
    return urlCreator.createObjectURL(blob);
  }

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/v1/Client/get-transactions', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          },
          credentials: 'include'
        });


        if (!response.ok) {
          throw new Error('Failed to fetch transactions data');
        }
        const data = await response.json();

        console.log("transactions ", data);
        setTransactions(data.transactions);
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
            'Content-Type': 'application/json'
          },
          credentials: 'include'
        });

        if (!response.ok) {
          throw new Error('Failed to fetch plans data');
        }

        const data = await response.json();
        const filteredPlans = data.plans.filter(plan => profileInfo.boughtPlanIds.includes(plan._id));
        console.log("filteredPlans", filteredPlans);
        setPlansData(filteredPlans);

        const mappedData = filteredPlans.map(item => ({
          planName: item.planName,
          stocks: item.stocks,
          startVal: item.minInvestmentAmount,
          cash: item.cash
        }));

        const axiosResponse = await axios.post('https://39aa-2405-201-13-f123-18f5-1f2-ad71-9a64.ngrok-free.app/calculate_sts', { plans_data: mappedData });
        const calculatedData = axiosResponse.data; // Use axiosResponse.data directly


        setDatu(calculatedData.plans_data);


      } catch (error) {
        console.error('Error fetching plans data:', error.message);
      }
    };

    fetchPlansData();
  }, [profileInfo]);



  useEffect(() => {
    (function (d, t) {
      var v = d.createElement(t), s = d.getElementsByTagName(t)[0];
      v.onload = function () {
        window.voiceflow.chat.load({
          verify: { projectID: '65e3fdf05671df3be500cc99' },
          url: 'https://general-runtime.voiceflow.com',
          versionID: 'production'
        });
      }
      v.src = "https://cdn.voiceflow.com/widget/bundle.mjs";
      v.type = "text/javascript"; s.parentNode.insertBefore(v, s);
    })(document, 'script');
  }, []);

  if (!datu) { return (<div></div>); }

  function calculateAverageGainPercentage(plansData) {
    let totalGainPercentage = 0;
    let totalStocks = 0;

    plansData.forEach((plan) => {
      plan.individual_stocks.forEach((stock) => {
        totalGainPercentage += stock.total_change_percent;
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
  console.log("Average Gain Percentage:", averageGainPercentage);


  return (
    <div className={styles.App}>
      {/* <Typography className={styles["profile-landing-name"]} variant="h4" sx={{ mb: 5 }}>
        Hi, Welcome back {profileInfo.name} 
</Typography> */}

      {/* <div className={styles.UserInfo}>
  <button>
    <img src={notification} alt="" />
  </button>
  <h4>{profileInfo.name}</h4>
  <img src={profileInfo.img} alt="" className={styles.userProfileImg} />
</div> */}


      <h2 className={styles.heading}> Portfolio Summary</h2>

      <InvestmentSummary transactions={transactions} advisorNames={advisorNames} returns={returns} etta={datu} avggg={averageGainPercentage} />
      <script>
        console.log(document.queryselector(".alert"));
      </script>
    </div>
  );
}

export default DashboardCl;