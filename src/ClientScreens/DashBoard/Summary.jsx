import React from 'react';
import PiChart from './PiChart';
import PlanTable from './PlanTable'; // Assuming PlanTable component is imported from a separate file
import styles from './dashboard.module.css'

import AreaCard from "./../../components/dashboard/areaCards/AreaCard";

import "./../../components/dashboard/areaCards/AreaCards.scss";
import "./../../components/dashboard/areaTable/AreaTable.scss";
import BarChartComponent from './CliBarChart';
import CliStock from './../../CliStockChart/CliStock'
import { ChakraProvider } from '@chakra-ui/react'
import moneyImage1 from './../../assest/images/money1.png';
import moneyImage2 from './../../assest/images/money2.png';
import moneyImage3 from './../../assest/images/money3.png';
function InvestmentSummary({ transactions, advisorNames, returns, etta, avggg, table }) {

    if (!transactions || !advisorNames || !returns) {
        return null; // Render nothing if any of the props are missing
    }
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

    // console.log("TRANSACTION DATA : ", transactions);
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
        const planName = transactions.find(transaction => transaction.planId === planId).planName;
        return { name: planName, value: totalProfit };
    });

    // Function to format data for PieChart
    const formatDataForPieChart = (uniquePlans, totalInvestments) => {
        const data = uniquePlans.map((planId) => ({
            name: transactions.find(transaction => transaction.planId === planId).planName,
            value: totalInvestments.get(planId)
        }));
        return data;
    }

    // console.log("bargraphdata", etta);


    const formatCurrency = (value) => {
        const parsedValue = parseFloat(value).toFixed(2);
        const stringValue = String(parsedValue);
        const [integerPart, decimalPart] = stringValue.split(".");
        const formattedIntegerPart = Number(integerPart).toLocaleString("en-IN");
        const formattedValue = `₹${formattedIntegerPart}${decimalPart ? `.${decimalPart}` : ''}`;
        return formattedValue;
    };

    return (
        <div>


            <section className="content-area-cards">

                <AreaCard
                    colors={["#e4e8ef", "#475be8"]}
                    percentFillValue={80}
                    cardInfo={{
                        title: "Total Amount Invested",
                        value: formatCurrency(totalInvestedAmount),
                    }}
                    imageSrc={moneyImage1}
                />
                <AreaCard
                    colors={["#e4e8ef", "#4ce13f"]}
                    percentFillValue={50}
                    cardInfo={{
                        title: "Total Profit/Loss",
                        value: formatCurrency(avggg * totalInvestedAmount / 100),
                    }}
                    imageSrc={moneyImage2}
                />
                <AreaCard
                    colors={["#e4e8ef", "#f29a2e"]}
                    percentFillValue={40}
                    cardInfo={{
                        title: "Current Value",
                        value: formatCurrency(totalInvestedAmount + avggg * totalInvestedAmount / 100),
                        value: (
                            <div>
                                {formatCurrency((totalInvestedAmount + avggg * totalInvestedAmount / 100))}
                                <span style={{ fontSize: 'small', color: avggg >= 0 ? 'rgba(38, 166, 91, 1)' : 'rgba(255,30,56,255)' }}>
                                    &nbsp; {avggg.toFixed(2)}%
                                </span>
                            </div>
                        )
                    }}
                    imageSrc={moneyImage3}
                />
            </section>

            {/* Stock Component Added */}


            <div style={{ border: "2px solid #fff", borderRadius: "5px", padding: "10px", marginBottom: "20px",marginTop: "20px" ,backgroundColor: '#fff'}}>
                <ChakraProvider>
                    <CliStock />
                </ChakraProvider>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "auto auto", padding: "30px 0", gap: "16px" }}>
                <p id={styles.piechart} style={{ fontSize: " x-large", borderRadius: '0.7rem', }}>
                    <center><strong>Investment</strong></center><br />
                    <PiChart data={formatDataForPieChart(Array.from(new Set(transactions.map(transaction => (transaction.planId)))), totalInvestments)} />
                </p>

                <p id={styles.piechart} style={{ fontSize: " x-large", borderRadius: '0.7rem', }}>
                    <center><strong>Returns</strong></center><br />
                    <BarChartComponent plansData={etta} widthChart={500} />
                </p>
            </div>
            <h2 className={styles.heading}>Plan Information</h2>
            <PlanTable data={table} />
        </div>
    );
}

export default InvestmentSummary;