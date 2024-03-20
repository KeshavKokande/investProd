import React, { useState, useEffect } from 'react';
import InvestmentSummary from './Summary';
// import data from "./data.json"
import { AreaCards, AreaCharts, AreaTable} from "../../components";

function DashboardCl() {
    const [transactions, setTransactions] = useState([]);
    const [returns, setReturns] = useState([])

    useEffect(() => {
      const fetchTransactions = async () => {
        try {
   
          const response = await fetch('http://localhost:8000/api/v1/Client/get-subscribed-plans', {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json'
            },
            credentials: 'include'
          })
          
          const ponse = await fetch('http://localhost:8000/api/v1/Client/get-returns-of-subscribed-plans', {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json'
            },
            credentials: 'include'
          })
   
          if (!response.ok || !ponse.ok) {
            throw new Error('Failed to fetch user data');
          }
          const data = await response.json();
          const redat = await ponse.json();
          setTransactions(data.transactions);
          setReturns(redat.profits);
          console.log(data)
          console.log(redat)
      } catch (error) {
          console.error('Error fetching user data:', error.message);
        }
      };
   
      fetchTransactions();
    }, []);
return (
        <div className="App">
          <center><h1 style={{color:"black", fontSize:"30px", fontWeight: "bold"}}> Portfolio Summary</h1></center>
        
            {/* <center><h1> Portfolio Summary</h1></center> */}
            <InvestmentSummary transactions={transactions} returns={returns}/>
        </div>
    );
}

export default DashboardCl;