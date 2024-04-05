import AreaCard from "./AreaCard";
import { useState,useEffect } from "react";
import "./AreaCards.scss";


const AreaCards = () => {

  const [totalClients, setTotalClients] = useState();
  const [totalInvestedAmount, setTotalInvestedAmount] = useState();
  const [totalCurrentProfit, setTotalCurrentProfit] = useState();

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
    const roundedValue = parseFloat(value).toFixed(2);
    return `₹${roundedValue}`;
  };

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
          title: "Total Revenue",
          value: formatCurrency(totalInvestedAmount?.totalInvestedAmount),
          // text: `Total investment ${formatCurrency(totalInvestedAmount?.totalInvestedAmount)}`,
        }}
      />
      <AreaCard
        colors={["#e4e8ef", "#f29a2e"]}
        percentFillValue={40}
        cardInfo={{
          title: "Current Profit",
          value: formatCurrency(totalCurrentProfit?.totalCumulativeProfit),
          // text: `Total Current Profit ${formatCurrency(totalCurrentProfit?.totalCumulativeProfit)}`,
        }}
      />
    </section>
  );
};

export default AreaCards;
