
import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import styles from "./AdNewPlans.module.css";

const PlanCard = ({ plan, deletePlan }) => {
  const { capValue, risk, minInvestmentAmount, noOfSubscription, stocks, advise } = plan;

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

  const renderStocks = () => {
    return stocks.map((stock, index) => (
      <tr key={index}>
        <td className={styles.adnewplan_td}>{stock.stockName}</td>
        <td className={styles.adnewplan_td}>{stock.contri}%</td>
        <td className={`${styles.adnewplan_td} ${parseFloat(stock.currentDayValue) >= 0 ? styles.adnewplan_profit_positive : styles.adnewplan_profit_negative}`}>{stock.currentDayValue}%</td>
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
                <th className={styles.adnewplan_th}>Contribution</th>
                <th className={styles.adnewplan_th}>Profit</th>
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
            <div><strong>Minimum Investment Amount</strong>: ₹{minInvestmentAmount}</div>
            <div><strong>Number of Subscriptions</strong>: {noOfSubscription}</div>
            <div><strong>Cap Value</strong>: ₹{capValue}</div>
            <div><strong>Advise</strong>: {advise}</div>
          </div>

          <div className={styles.btn}>
            {/* <div className={styles.adnewplan_delete_icon} onClick={handleDelete}>{isActive ? 'Deactivate' : 'Activate'}</div> */}

            <div className={`${isActive ? styles.inactiveButton : styles.activeButton}`} onClick={handleDelete}>{isActive ? 'Deactivate' : 'Activate'}</div>
          </div>
        </div>
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










// import PropTypes from "prop-types";
// import { useState } from "react";
// import styles from "./AdNewPlans.module.css";

// const PlanCard = ({ plan, deletePlan }) => {
//   const { capValue, risk, minInvestmentAmount, noOfSubscription, stocks, advise } = plan;
//   const [isDeleting, setIsDeleting] = useState(false);
//   const [toBeDeleted, setToBeDeleted] = useState(plan._id);

//   const handleDelete = async () => {
//     try {
//       const response = await fetch(`https://team4api.azurewebsites.net/api/v1/advisor/deletePlan/${toBeDeleted}`, {
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
