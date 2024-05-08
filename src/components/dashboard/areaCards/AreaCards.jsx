import AreaCard from "./AreaCard";
import { useState,  useEffect } from "react";
import "./AreaCards.scss";
import axios from 'axios';


const AreaCards = () => {



  const [totalClients, setTotalClients] = useState();
  const [totalInvestedAmount, setTotalInvestedAmount] = useState();
  const [totalCurrentProfit, setTotalCurrentProfit] = useState();
  const [plansData, setPlansData] = useState(null);
  const [datu, setDatu] = useState(null);


  useEffect(() => {
    const fetchPlansData = async () => {
      try {
        const response = await fetch("https://team4api.azurewebsites.net/api/v1/advisor/list-of-plans", {
          method: "GET",
          headers: {
            'Content-Type': 'application/json'
          },
          credentials: 'include'
        });
        const data = await response.json();
        // console.log(data);
        setPlansData(data);

        const mappedData = data.plans.map(item => ({
          planName: item.planName,
          stocks: item.stocks,
          startVal: item.minInvestmentAmount,
          cash: item.cash
        }));

        const axiosResponse = await axios.post('https://bba4-103-226-169-60.ngrok-free.app/calculate_sts', { plans_data: mappedData });
        const calculatedData = axiosResponse.data; // Use axiosResponse.data directly

        const mapData = calculatedData.plans_data.map((plan) => ({
          Name: plan.planName,
          gains: plan.total_current_gains,
        }));
        setDatu(calculatedData.plans_data);


      } catch (error) {
        console.error('Error fetching plans data:', error.message);
      }


    };

    fetchPlansData();
    window.scrollTo(0, 0);
  }, []);

  // get-no-of-clients
  useEffect(() => {
    const fetchTotalClients = async () => {
      try {

        const response = await fetch('https://team4api.azurewebsites.net/api/v1/advisor/get-no-of-clients', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          },
          credentials: 'include'
        })

        if (!response.ok) {
          throw new Error('Failed to fetch user data');
        }
        const data = await response.json();
        setTotalClients(data);
      } catch (error) {
        console.error('Error fetching user data:', error.message);
      }
    };

    fetchTotalClients();
  }, []);

  // get-total-invested-amount
  useEffect(() => {
    const fetchTotalInvestedAmount = async () => {
      try {

        const response = await fetch('https://team4api.azurewebsites.net/api/v1/advisor/get-total-invested-amount', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          },
          credentials: 'include'
        })

        if (!response.ok) {
          throw new Error('Failed to fetch user data');
        }
        const data = await response.json();
        setTotalInvestedAmount(data);
      } catch (error) {
        console.error('Error fetching user data:', error.message);
      }
    };

    fetchTotalInvestedAmount();
  }, []);

  // get-total-current-profit
  useEffect(() => {
    const fetchTotalCurrentProfit = async () => {
      try {

        const response = await fetch('https://team4api.azurewebsites.net/api/v1/advisor/get-total-current-profit', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          },
          credentials: 'include'
        })

        if (!response.ok) {
          throw new Error('Failed to fetch user data');
        }
        const data = await response.json();
        setTotalCurrentProfit(data);
      } catch (error) {
        console.error('Error fetching user data:', error.message);
      }
    };

    fetchTotalCurrentProfit();
  }, []);

  const formatCurrency = (value) => {
    const parsedValue = parseFloat(value).toFixed(2);
    const stringValue = String(parsedValue);
    const [integerPart, decimalPart] = stringValue.split(".");
    const formattedIntegerPart = Number(integerPart).toLocaleString("en-IN");
    const formattedValue = `₹${formattedIntegerPart}${decimalPart ? `.${decimalPart}` : ''}`;
    return formattedValue;
  };

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


  return (
    <section className="content-area-cards">
      <AreaCard
        colors={["#e4e8ef", "#475be8"]}
        percentFillValue={80}
        cardInfo={{
          title: "Total Clients",
          value: totalClients?.noOfClients,
          // text: `You have ${totalClients?.noOfClients} clients.`,
        }}
      />
      <AreaCard
        colors={["#e4e8ef", "#4ce13f"]}
        percentFillValue={50}
        cardInfo={{
          title: "Invested Amount",
          value: formatCurrency(totalInvestedAmount?.totalInvestedAmount),
          // text: `Total investment ${formatCurrency(totalInvestedAmount?.totalInvestedAmount)}`,
        }}
      />
      <AreaCard
        colors={["#e4e8ef", "#f29a2e"]}
        percentFillValue={40}
        cardInfo={{
          title: "Current Value",
          value: (
            <div>
              {formatCurrency((averageGainPercentage * totalInvestedAmount?.totalInvestedAmount / 100) + totalInvestedAmount?.totalInvestedAmount)}
              <span style={{ fontSize: 'small', color: averageGainPercentage >= 0 ? 'green' : 'red' }}>
                &nbsp; {averageGainPercentage.toFixed(2)}%
              </span>
            </div>
          )// text: `Total Current Profit ${formatCurrency(totalCurrentProfit?.totalCumulativeProfit)}`,
        }}
      />
    </section>
  );
};

export default AreaCards;
