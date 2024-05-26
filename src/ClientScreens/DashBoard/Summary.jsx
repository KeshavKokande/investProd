import React, { useState } from 'react';
import PiChart from './PiChart';
import PlanTable from './PlanTable'; // Assuming PlanTable component is imported from a separate file
import styles from './dashboard.module.css'
import { Link } from "react-router-dom";
import ProfileCard from "./../../ClientScreens/Plans/ProfileCard";
import AreaCard from "./../../components/dashboard/areaCards/AreaCard";
import Carousel from 'react-multi-carousel';
import DonutChartCard from './DonutChartCard';
import ExpiryPlanCard from './ExpiryPlanCardWrapper';

import "./../../components/dashboard/areaCards/AreaCards.scss";
import "./../../components/dashboard/areaTable/AreaTable.scss";
import BarChartComponent from './CliBarChart';
import CliStock from './../../CliStockChart/CliStock'
import { ChakraProvider } from '@chakra-ui/react'
import moneyImage1 from './../../assest/images/money1.png';
import moneyImage2 from './../../assest/images/money2.png';
import moneyImage3 from './../../assest/images/money3.png';
function InvestmentSummary({ transactions, advisorNames, returns, etta, avggg, table, plansData, pnl }) {


    const responsive = {
        superLargeDesktop: { breakpoint: { max: 4000, min: 3000 }, items: 5 },
        desktop: { breakpoint: { max: 3000, min: 1024 }, items: 3 },
        tablet: { breakpoint: { max: 1024, min: 464 }, items: 2 },
        mobile: { breakpoint: { max: 464, min: 0 }, items: 1 }
    };
    const [expandedCategory, setExpandedCategory] = useState(null);
    const[ret,setRet]=useState({ 
        premium: { totalProfits: 0, totalInvested: 0 },
        nonPremium: { totalProfits: 0, totalInvested: 0 } 
        })

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

    const formatCurrency = (value) => {
        const parsedValue = parseFloat(value).toFixed(2);
        const stringValue = String(parsedValue);
        const [integerPart, decimalPart] = stringValue.split(".");
        const formattedIntegerPart = Number(integerPart).toLocaleString("en-IN");
        const formattedValue = `₹${formattedIntegerPart}${decimalPart ? `.${decimalPart}` : ''}`;
        return formattedValue;
    };

    const categorizePlans = (plans) => {
        const categories = {
            2000: [],
            4000: [],
            6000: [],
            8000: [],
            moreThan8000: []
        };

        plans.forEach(plan => {
            if (plan.minInvestmentAmount < 2000) {
                categories[2000].push(plan);
            } else if (plan.minInvestmentAmount < 4000) {
                categories[4000].push(plan);
            } else if (plan.minInvestmentAmount < 6000) {
                categories[6000].push(plan);
            } else if (plan.minInvestmentAmount < 8000) {
                categories[8000].push(plan);
            } else {
                categories.moreThan8000.push(plan);
            }
        });

        return categories;
    };


   // const categorizedPlans = categorizePlans(plansData);

    return (
        <div>
            <section className="content-area-cards">
                <AreaCard
                    colors={["#e4e8ef", "#475be8"]}
                    percentFillValue={80}
                    cardInfo={{
                        title: "Total Amount Invested",
                        value: formatCurrency(ret.premium.totalInvested+ret.premium.totalInvested),
                    }}
                    imageSrc={moneyImage1}
                />
                <AreaCard
                    colors={["#e4e8ef", "#4ce13f"]}
                    percentFillValue={50}
                    cardInfo={{
                        title: "Total Profit/Loss",
                        value: formatCurrency(ret.nonPremium.totalProfits+ret.premium.totalProfits),
                    }}
                    imageSrc={moneyImage2}
                />
                <AreaCard
                    colors={["#e4e8ef", "#f29a2e"]}
                    percentFillValue={40}
                    cardInfo={{
                        title: "Current Value",
                        value: (
                            <div>
                                {formatCurrency(ret.premium.totalInvested+ret.premium.totalInvested+ret.nonPremium.totalProfits+ret.premium.totalProfits)}
                                <span style={{ padding: '0.5vh 1vh', borderRadius: ' 23% / 40%', fontSize: '0.75rem', marginLeft: '1vh', color: 'white', backgroundColor: avggg >= 0 ? 'rgba(38, 166, 91, 1)' : 'rgba(255,30,56,255)' }}>
                                    &uarr;&nbsp;{(((ret.nonPremium.totalProfits+ret.premium.totalProfits)/(ret.nonPremium.totalInvested+ret.premium.totalInvested))*100).toFixed(2)}%
                                </span>
                            </div>
                        )
                    }}
                    imageSrc={moneyImage3}
                />
            </section>

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

            <div style={{ display: "grid", gridTemplateColumns: "auto auto", padding: " 0", gap: "16px" }}>
                <DonutChartCard da={table} ta={pnl} setret={setRet} />
                <ExpiryPlanCard />
            </div>

            <div style={{ border: "2px solid #fff", borderRadius: "5px", padding: "10px", marginBottom: "20px", marginTop: "20px", backgroundColor: '#fff' }}>
                <ChakraProvider>
                    <CliStock />
                </ChakraProvider>
            </div>

            {/* <h2 className={styles.heading}>Plan Information</h2>
            <Carousel responsive={responsive} infinite={true} className={styles.Carousel}>
                {Object.entries(categorizedPlans).map(([category, plans]) => (
                    <div key={category}>
                        <h3 onClick={() => {
                            const newExpandedCategory = expandedCategory === category ? null : category;
                            setExpandedCategory(newExpandedCategory);
                        }}>
                            {`Plans Under ${category === 'moreThan8000' ? '8000+' : category}`}
                        </h3>
                        {expandedCategory === category && plans.map(plan => (
                            <Link to={`/planDetail/${plan._id}`}>
                            <ProfileCard plan={plan}/>
                          </Link>
                        ))}
                    </div>
                ))}
            </Carousel> */}

            <h2 className={styles.heading}>Plan Information</h2>
            <PlanTable data={table} pnl={pnl} />
        </div>
    );
}

export default InvestmentSummary;