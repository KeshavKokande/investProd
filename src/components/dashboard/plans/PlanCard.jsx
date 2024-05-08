
import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import styles from "./AdNewPlans.module.css";
import { Link } from "react-router-dom";
import StockChart from "./StockChart";
// import gimicon from "../../../../public/chart-line-solid.svg"
import { ReactComponent as IconName } from "../../../assest/chart-line-solid.svg";


const PlanCard = ({ plan, deletePlan }) => {
  const {  risk, minInvestmentAmount, noOfSubscription, stocks, advise, _id, pcash } = plan;

  const [tab, setTab] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showSecondDiv, setShowSecondDiv] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = {
          stocks: stocks.map(stock => ({
            symbol: stock.symbol,
            qty: stock.qty,
            avg_price: stock.price, // Assuming price is the average price
          }))
        };

        const response = await fetch('https://bba4-103-226-169-60.ngrok-free.app/calculate', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        });

        const responseData = await response.json();
        setTab(responseData);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData(); // Call fetchData when the component mounts
  }, [stocks]); // Add stocks to the dependency array to fetch data when stocks change



  // Function to get initial isActive status from local storage
  const getInitialIsActive = () => {
    const storedStatus = localStorage.getItem(`isActive_${plan._id}`);
    return storedStatus ? JSON.parse(storedStatus) : plan.isActive;
  };

  const [toBeDeleted, setToBeDeleted] = useState(plan._id);
  const [isActive, setIsActive] = useState(getInitialIsActive()); // Initialize with stored value or default from props

  useEffect(() => {
    // Store isActive status in local storage when it changes
    localStorage.setItem(`isActive_${plan._id}`, JSON.stringify(isActive));
  }, [plan._id, isActive]);

  const handleDelete = async () => {
    try {
      const response = await fetch(`https://team4api.azurewebsites.net/api/v1/advisor/deletePlan/${toBeDeleted}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ isActive: !isActive }) // Toggle isActive value
      });

      if (!response.ok) {
        throw new Error('Error toggling plan status');
      }

      setIsActive(!isActive); // Toggle isActive state

    } catch (error) {
      console.error('Error handling plan:', error);
      // Handle errors here, e.g., show error message to the user
    }
  };

  const riskClassName = risk === 'low' ? styles.adnewplan_risk_low :  risk === 'medium' ? styles.adnewplan_risk_medium : styles.adnewplan_risk_high;
  
  const isActiveClassName = isActive ? styles.adnewplan_risk_true : styles.adnewplan_risk_false;

  if (isLoading){ return (<div></div>);}


  const renderStocks = () => {
    if (!tab || !tab.individual_stocks) {
      return <tr><td colSpan="5">No data available</td></tr>;
    }
  
    return tab.individual_stocks.map((stock, index) => (
      <tr key={index}>
        <td className={styles.adnewplan_td}>{stock.symbol}</td>
        <td className={styles.adnewplan_td}>{((stock.current_value/(tab.total_current_value+plan.cash))*100).toFixed(2)}%</td>
        <td className={styles.adnewplan_td} style={{ color: parseFloat(stock.total_change_percent) < 0 ? 'red' : 'green' }}>{stock.total_change_percent.toFixed(2)}%</td>
        <td className={styles.adnewplan_td} style={{ color: parseFloat(stock.today_change_percent) < 0 ? 'red' : 'green' }}>{stock.today_change_percent.toFixed(2)}%</td>
        {/* <td className={`${styles.adnewplan_td} ${parseFloat(stock.currentDayValue) >= 0 ? styles.adnewplan_profit_positive : styles.adnewplan_profit_negative}`}>{stock.currentDayValue}%</td> */}
      </tr>
    ));
  };
 
  const formatCurrency = (amount) => {
    const roundedAmount = amount.toFixed(2);
      const formattedAmount = roundedAmount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return `₹ ${formattedAmount}`;
  };

  return (
    <div className={styles.outerMax}>
      <h4>{plan.planName} {plan.isPremium && <span style={{ fontSize: '0.5em' }}><i><b> Premium</b></i></span>}</h4>
      <div className={styles.adnewplan_plan_container}>
        <div className={styles.adnewplan_left_section}>
          <table className={styles.adnewplan_table}>
            <thead>
              <tr>
                <th className={styles.adnewplan_th}>Name</th>
                <th className={styles.adnewplan_th}>Weightage</th>
                <th className={styles.adnewplan_th}>Percent Change</th>
                <th className={styles.adnewplan_th}>Today's Change</th>
              </tr>
            </thead>
            <tbody>{renderStocks()}</tbody>
          </table>
        </div>

        <div className={styles.adnewplan_separator}></div>

        <div className={styles.adnewplan_right_section}>
          <div className={styles.text}>
            <div><strong>Risk </strong>:<span className={`${styles.adnewplan_risk_dot} ${riskClassName}`}></span>{risk}</div>
            <div><strong>Status </strong>:<span className={`${styles.adnewplan_risk_active} ${isActiveClassName}`}></span>{isActive ? 'Active' : 'Inactive'}</div>
            <div><strong>Minimum Investment Amount</strong>: {formatCurrency(tab.total_current_value)}</div>
            <div><strong>Number of Subscriptions</strong>: {(plan.boughtClientIds).length}</div>
            <div><strong>Percent P&L</strong>: {(((tab.total_current_value-minInvestmentAmount)/minInvestmentAmount)*100).toFixed(2)}%</div>
            <div><strong>Advise</strong>: {advise}</div>
          </div>

          <div className={styles.btn}>
            {/* <div className={styles.adnewplan_delete_icon} onClick={handleDelete}>{isActive ? 'Deactivate' : 'Activate'}</div> */}
            <Link to={`/advisor/editPlan/${_id}`}>
            <button className={styles.inactiveButton} style={{ backgroundColor: "#475BE8" }}>
            Rebalance
            </button>
            <br/>
            </Link>
            <br/>

            <div className={`${isActive ? styles.inactiveButton : styles.activeButton}`} onClick={handleDelete}>{isActive ? 'Deactivate' : 'Activate'}</div>
          </div>
        </div>
      </div>
      <div
          onClick={() => setShowSecondDiv((prevShow) => !prevShow)}
          style={{ marginBottom: '10px', cursor: 'pointer' }} // Added cursor style
        >
          <IconName style={{ width: '1.5rem', height: '1.5rem' }} />
        </div>
      <div style={{ display: showSecondDiv ? 'block' : 'none' }}>
      <StockChart stocks={stocks} days={365}/>
      </div>
    </div>
  );
};

PlanCard.propTypes = {
  plan: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    planName: PropTypes.string.isRequired,
    capValue: PropTypes.number.isRequired,
    risk: PropTypes.string.isRequired,
    minInvestmentAmount: PropTypes.number.isRequired,
    noOfSubscription: PropTypes.number.isRequired,
    stocks: PropTypes.arrayOf(
      PropTypes.shape({
        stockName: PropTypes.string.isRequired,
        contri: PropTypes.number.isRequired,
        currentDayValue: PropTypes.string.isRequired,
      })
    ).isRequired,
    isActive: PropTypes.bool.isRequired,
  }).isRequired,
};

export default PlanCard;