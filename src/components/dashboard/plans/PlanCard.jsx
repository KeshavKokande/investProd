// import PropTypes from "prop-types";
// import "./AdNewPlans.css";

// const PlanCard = ({ plan, deletePlan }) => {
//   const { capValue, risk, minInvestmentAmount, noOfSubscription, stocks,advise } = plan;

//   const renderStocks = () => {
//     return stocks.map((stock, index) => (
//       <tr key={index}>
//         <td className="adnewplan-td">{stock.stockName}</td>
//         <td className="adnewplan-td">{stock.contri}%</td>
//         <td className={`adnewplan-td ${parseFloat(stock.currentDayValue) >= 0 ? "adnewplan-profit-positive" : "adnewplan-profit-negative"}`}>{stock.currentDayValue}%</td>
//       </tr>
//     ));
//   };

//   return (
//     <div className="outerMax">
//       <h4 style={{ marginLeft: "3rem" }}>{plan.planName}</h4>
//       <div className="adnewplan-plan-container">
//         <div className="adnewplan-left-section">
//           <table className="adnewplan-table">
//             <thead>
//               <tr>
//                 <th className="adnewplan-th">Name</th>
//                 <th className="adnewplan-th">Contribution</th>
//                 <th className="adnewplan-th">Profit</th>
//               </tr>
//             </thead>
//             <tbody>{renderStocks()}</tbody>
//           </table>
//         </div>
 
//         <div className="adnewplan-separator"></div>

//         <div className="adnewplan-right-section">
//           <div className="text">
//             <div>Risk: <span className={`adnewplan-risk-dot adnewplan-risk-${risk}`}></span>{risk}</div>

//             <div>Minimum Investment Amount: ₹{minInvestmentAmount}</div>
//             <div>Number of Subscriptions: {noOfSubscription}</div>
//             <div>Cap Value: ₹{capValue}</div>
//             <div>Advise:  {advise}</div>
//           </div>

//           <div className="btn">
//             <div className="adnewplan-delete-icon" onClick={() => deletePlan && deletePlan(plan._id)}>Delete</div>
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
//   deletePlan: PropTypes.func,
// };

// export default PlanCard;



import PropTypes from "prop-types";
import { useState } from "react";
import axios from "axios"; // Import axios for making HTTP requests
import "./AdNewPlans.css";

const PlanCard = ({ plan,onDelete }) => {
  const { _id, capValue, risk, minInvestmentAmount, noOfSubscription, stocks, advise } = plan;
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    console.log(_id);
    setIsDeleting(true);
    
    try {
      await axios.patch(`http://localhost:8000/api/v1/advisor/deletePlan/${_id}`);
      onDelete(_id); // Notify parent component about the deletion
      console.log("Plan deleted successfully");
    } catch (error) {
      console.error("Error deleting plan:", error.message);
    } finally {
      setIsDeleting(false);
    }
  };

  const renderStocks = () => {
    return stocks.map((stock, index) => (
      <tr key={index}>
        <td className="adnewplan-td">{stock.stockName}</td>
        <td className="adnewplan-td">{stock.contri}%</td>
        <td className={`adnewplan-td ${parseFloat(stock.currentDayValue) >= 0 ? "adnewplan-profit-positive" : "adnewplan-profit-negative"}`}>{stock.currentDayValue}%</td>
      </tr>
    ));
  };

  return (
    <div className="outerMax">
      <h4 style={{ marginLeft: "3rem" }}>{plan.planName}</h4>
      <div className="adnewplan-plan-container">
        <div className="adnewplan-left-section">
          <table className="adnewplan-table">
            <thead>
              <tr>
                <th className="adnewplan-th">Name</th>
                <th className="adnewplan-th">Contribution</th>
                <th className="adnewplan-th">Profit</th>
              </tr>
            </thead>
            <tbody>{renderStocks()}</tbody>
          </table>
        </div>

        <div className="adnewplan-separator"></div>

        <div className="adnewplan-right-section">
          <div className="text">
            <div>Risk: <span className={`adnewplan-risk-dot adnewplan-risk-${risk}`}></span>{risk}</div>

            <div>Minimum Investment Amount: ₹{minInvestmentAmount}</div>
            <div>Number of Subscriptions: {noOfSubscription}</div>
            <div>Cap Value: ₹{capValue}</div>
            <div>Advise:  {advise}</div>
          </div>

          <div className="btn">
            {isDeleting ? (
              <div className="adnewplan-delete-icon">Deleting...</div>
            ) : (
              <div className="adnewplan-delete-icon" onClick={handleDelete}>Delete</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

PlanCard.propTypes = {
  plan: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    capValue: PropTypes.number.isRequired,
    risk: PropTypes.string.isRequired,
    minInvestmentAmount: PropTypes.number.isRequired,
    noOfSubscription: PropTypes.number.isRequired,
    stocks: PropTypes.arrayOf(
      PropTypes.shape({
        stockName: PropTypes.string.isRequired,
        contri: PropTypes.number.isRequired,
        currentDayValue: PropTypes.string.isRequired,
        _id: PropTypes.string.isRequired,
      })
    ).isRequired,
  }).isRequired,
};

export default PlanCard;
