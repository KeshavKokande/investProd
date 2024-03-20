import React, { useState, useEffect } from 'react';
import InvestmentSummary from './Summary';
// import data from "./data.json"
import { AreaCards, AreaCharts, AreaTable} from "../../components";

function DashboardCl() {
    const [transactions, setTransactions] = useState([]);
    const [returns, setReturns] = useState([])
    const [advisorNames, setAdvisorNames] = useState([]);

    useEffect(() => {
      (function(d, t) {
        var v = d.createElement(t), s = d.getElementsByTagName(t)[0];
        v.onload = function() {
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
          setAdvisorNames(data.advisorNames)
          // console.log("WHOLE DATA:", redat);
          // console.log(redat)
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
            <InvestmentSummary transactions={transactions} advisorNames={advisorNames} returns={returns}/>
        </div>
    );
}

export default DashboardCl;