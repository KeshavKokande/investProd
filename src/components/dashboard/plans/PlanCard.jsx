import PropTypes from "prop-types";
import "./AdNewPlans.css";

const PlanCard = ({ plan, deletePlan }) => {
  const { capValue, risk, minInvestmentAmount, noOfSubscription, stocks } = plan;

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
            <div>Minimum Investment Amount: ${minInvestmentAmount}</div>
            <div>Number of Subscriptions: {noOfSubscription}</div>
            <div>Cap Value: ${capValue}</div>
          </div>

          <div className="btn">
            <div className="adnewplan-delete-icon" onClick={() => deletePlan && deletePlan(plan._id)}>Delete</div>
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
  deletePlan: PropTypes.func,
};

export default PlanCard;