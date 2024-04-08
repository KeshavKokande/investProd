
import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import styles from "./AdNewPlans.module.css";
import { Link } from "react-router-dom";
import StockChart from "./StockChart";

const PlanCard = ({ plan, deletePlan }) => {
  const {  risk, minInvestmentAmount, noOfSubscription, stocks, advise, _id, pcash } = plan;

  const [tab, setTab] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

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

        const response = await fetch('http://127.0.0.1:5000/calculate', {
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
      const response = await fetch(`http://localhost:8000/api/v1/advisor/deletePlan/${toBeDeleted}`, {
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

  if (isLoading){ return (<div>Loading............</div>);}


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
 
  return (
    <div className={styles.outerMax}>
      <h4>{plan.planName}</h4>
      <div className={styles.adnewplan_plan_container}>
        <div className={styles.adnewplan_left_section}>
          <table className={styles.adnewplan_table}>
            <thead>
              <tr>
                <th className={styles.adnewplan_th}>Name</th>
                <th className={styles.adnewplan_th}>Weightage</th>
                <th className={styles.adnewplan_th}>Todays Change</th>
                <th className={styles.adnewplan_th}>Percent Change</th>
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
            <div><strong>Minimum Investment Amount</strong>: ₹{tab.total_current_value}</div>
            <div><strong>Number of Subscriptions</strong>: {noOfSubscription}</div>
            <div><strong>Percent P&L</strong>: {(((tab.total_current_value-minInvestmentAmount)/minInvestmentAmount)*100).toFixed(2)}%</div>
            <div><strong>Advise</strong>: {advise}</div>
          </div>

          <div className={styles.btn}>
            {/* <div className={styles.adnewplan_delete_icon} onClick={handleDelete}>{isActive ? 'Deactivate' : 'Activate'}</div> */}

            <div className={`${isActive ? styles.inactiveButton : styles.activeButton}`} onClick={handleDelete}>{isActive ? 'Deactivate' : 'Activate'}</div>
            <Link to={`/edit/${_id}`}>
                <button className='button'>edit</button>
            </Link>
          </div>
        </div>
      </div>
      <StockChart stocks={stocks} days={30}/>

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










// import PropTypes from "prop-types";
// import { useState } from "react";
// import styles from "./AdNewPlans.module.css";

// const PlanCard = ({ plan, deletePlan }) => {
//   const { capValue, risk, minInvestmentAmount, noOfSubscription, stocks, advise } = plan;
//   const [isDeleting, setIsDeleting] = useState(false);
//   const [toBeDeleted, setToBeDeleted] = useState(plan._id);

//   const handleDelete = async () => {
//     try {
//       const response = await fetch(`http://localhost:8000/api/v1/advisor/deletePlan/${toBeDeleted}`, {
//         method: 'PATCH',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         credentials: 'include',
//       });
  
//       if (!response.ok) {
//         throw new Error('Error deleting plan');
//       }
//       console.log(response);
//       console.log('Plan deleted successfully');
//       window.location.reload();
//       // Optionally, you can update the state or perform any other actions here
//     } catch (error) {
//       console.error('Error deleting plan:', error);
//       // Handle errors here, e.g., show error message to the user
//     }
//   };

//   const isActiveString = plan.isActive ? 'Active' : 'In Active';
  
//   const renderStocks = () => {
//     return stocks.map((stock, index) => (
//       <tr key={index}>
//         <td className={styles.adnewplan_td}>{stock.stockName}</td>
//         <td className={styles.adnewplan_td}>{stock.contri}%</td>
//         <td className={`${styles.adnewplan_td} ${parseFloat(stock.currentDayValue) >= 0 ? styles.adnewplan_profit_positive : styles.adnewplan_profit_negative}`}>{stock.currentDayValue}%</td>
//       </tr>
//     ));
//   };

//   return (
//     <div className={styles.outerMax}>
//       <h4>{plan.planName}</h4>
//       <div className={styles.adnewplan_plan_container}>
//         <div className={styles.adnewplan_left_section}>
//           <table className={styles.adnewplan_table}>
//             <thead>
//               <tr>
//                 <th className={styles.adnewplan_th}>Name</th>
//                 <th className={styles.adnewplan_th}>Contribution</th>
//                 <th className={styles.adnewplan_th}>Profit</th>
//               </tr>
//             </thead>
//             <tbody>{renderStocks()}</tbody>
//           </table>
//         </div>

//         <div className={styles.adnewplan_separator}></div>

//         <div className={styles.adnewplan_right_section}>
//           <div className={styles.text}>
//             <div><strong>Risk: </strong><span className={`${styles.adnewplan_risk_dot} ${styles.adnewplan_risk}-${risk}`}></span>{risk}</div>
//             <div>Status: <span className={`${styles.adnewplan_risk_dot} ${styles.adnewplan_risk}-${plan.isActive}`}></span>{isActiveString}</div>

//             <div>Minimum Investment Amount: ₹{minInvestmentAmount}</div>
//             <div>Number of Subscriptions: {noOfSubscription}</div>
//             <div>Cap Value: ₹{capValue}</div>
//             <div>Advise:  {advise}</div>
//           </div>

//           <div className={styles.btn}>
//             <div className={styles.adnewplan_delete_icon} onClick={handleDelete}>Delete</div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// PlanCard.propTypes = {
//   plan: PropTypes.shape({
//     _id: PropTypes.string.isRequired,
//     capValue: PropTypes.number.isRequired,
//     risk: PropTypes.string.isRequired,
//     minInvestmentAmount: PropTypes.number.isRequired,
//     noOfSubscription: PropTypes.number.isRequired,
//     stocks: PropTypes.arrayOf(
//       PropTypes.shape({
//         stockName: PropTypes.string.isRequired,
//         contri: PropTypes.number.isRequired,
//         currentDayValue: PropTypes.string.isRequired,
//         _id: PropTypes.string.isRequired,
//       })
//     ).isRequired,
//   }).isRequired,
// };

// export default PlanCard;
