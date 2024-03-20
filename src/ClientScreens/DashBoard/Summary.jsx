import React from 'react';
import PiChart from './PiChart';
import PlanTable from './PlanTable'; // Assuming PlanTable component is imported from a separate file
import { Flex } from 'antd';

import AreaCard from "./../../components/dashboard/areaCards/AreaCard";

import "./../../components/dashboard/areaCards/AreaCards.scss";
import "./../../components/dashboard/areaTable/AreaTable.scss";

function InvestmentSummary({ transactions, returns }) {
    // Function to calculate total amount invested in each plan
    const calculateTotalInvestment = (transactions) => {
        const investmentMap = new Map();
        transactions.forEach(transaction => {
            const planId = transaction.planId;
            const investedAmount = transaction.investedAmount;
            if (investmentMap.has(planId)) {
                investmentMap.set(planId, investmentMap.get(planId) + investedAmount);
            } else {
                investmentMap.set(planId, investedAmount);
            }
        });
        return investmentMap;
    }

    // Function to calculate total invested amount
    const calculateTotalInvestedAmount = (transactions) => {
        let totalInvestedAmount = 0;
        transactions.forEach(transaction => {
            totalInvestedAmount += transaction.investedAmount;
        });
        return totalInvestedAmount;
    }

    const totalInvestments = calculateTotalInvestment(transactions);
    const totalInvestedAmount = calculateTotalInvestedAmount(transactions);

    // Extracting unique plan IDs
    const uniquePlanIds = [...new Set(returns.map(returns => returns.planId))];

    const totalProfitAmount = returns.reduce((acc, curr) => acc + curr.profit, 0);

    // Calculating total profit for each unique plan ID
    const totalProfits = uniquePlanIds.map(planId => {
        const planProfits = returns.filter(returns => returns.planId === planId);
        const totalProfit = planProfits.reduce((acc, curr) => acc + curr.profit, 0);
        return { name: planId, value: totalProfit };
    });

    // Function to format data for PieChart
    const formatDataForPieChart = (uniquePlans, totalInvestments) => {
        const data = uniquePlans.map(planId => ({
            name: planId,
            value: totalInvestments.get(planId)
        }));
        return data;
    }

    function roundToTwoDecimalPlaces(num) {
        return Math.round((num + Number.EPSILON) * 100) / 100;
    }

    return (
        <div>
           

<section className="content-area-cards">
      <AreaCard
        colors={["#e4e8ef", "#475be8"]}
        percentFillValue={80}
        cardInfo={{
          title: "Total Amount Invested",
          value: roundToTwoDecimalPlaces(totalInvestedAmount), 
          text: `You have ${totalInvestedAmount} Amount.`,
        }}
      />
      <AreaCard
        colors={["#e4e8ef", "#4ce13f"]}
        percentFillValue={50}
        cardInfo={{
          title: "Total Amount Invested",
          value: roundToTwoDecimalPlaces(totalProfitAmount),
          text: `You have ${totalInvestedAmount} Amount.`,
        }}
      />
      <AreaCard
        colors={["#e4e8ef", "#f29a2e"]}
        percentFillValue={40}
        cardInfo={{
          title: "Total Amount Invested",
          value: roundToTwoDecimalPlaces(totalInvestedAmount+totalProfitAmount),
          text: `You have ${totalInvestedAmount} Amount.`,
        }}
      />
    </section>

            <hr/>
            
            <div style={{display:"flex", flexDirection:"row", justifyContent:"space-evenly",padding:"30px"}}>
                <p><center><strong>Investment</strong></center><br/><PiChart data={formatDataForPieChart(Array.from(new Set(transactions.map(transaction => transaction.planId))), totalInvestments)} /></p>
                <p><center><strong>Returns</strong></center><br/><PiChart data={totalProfits} /></p>
            </div>
            
            <hr/>


                <center><h3 style={{color:"black", fontSize:"30px", fontWeight: "bold"}}>Plan Information:</h3></center>


                <PlanTable uniquePlans={Array.from(new Set(transactions.map(transaction => transaction.planId)))} totalInvestments={totalInvestments} />


                
        </div>
    );
}

export default InvestmentSummary;



 {/* <div style={{display:"flex", flexDirection:"row", justifyContent:"space-between"}}>
                <p><strong>Total Amount Invested:</strong><br/> {roundToTwoDecimalPlaces(totalInvestedAmount)}</p>
                <p><strong>Total Returns:</strong><br/> {roundToTwoDecimalPlaces(totalProfitAmount)}</p>
                <p><strong>Current Value:</strong><br/> {roundToTwoDecimalPlaces(totalInvestedAmount+totalProfitAmount)}</p>
            </div> */}
