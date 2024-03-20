import { useState, useEffect } from "react";
import PropTypes from "prop-types";

import AdPlanCards from "./PlanCard";

const AdNewPlans = () => {
  const [plansData, setPlansData] = useState(null);
  const [showAddPlanPopup, setShowAddPlanPopup] = useState(false);

  useEffect(() => {
    const fetchPlansData = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/v1/advisor/list-of-plans", {
          method: "GET",
          headers: {
            'Content-Type': 'application/json'
          },
          credentials: 'include'
        });
        const data = await response.json();
        setPlansData(data);
      } catch (error) {
        console.log("Error fetching plans data:", error);
      }
    };

    fetchPlansData();
  }, []);

  const handleAddPlanClick = () => {
    window.location.href = "/addplan";
  };

  return (
    <div>
      <div className="adnewplans-header">
        <h1 className="adnewplans-heading">YOUR PLANS</h1>
        <button className="adnewplans-add-button" onClick={handleAddPlanClick}>Add New Plan</button>
      </div>
      {plansData && plansData.plans.map((plan) => (
        <AdPlanCards key={plan._id} plan={plan} />
      ))}
      {showAddPlanPopup && (
        <div className="adnewplans-popup">
          <input type="text" placeholder="Enter plan details" />
          <button>Submit</button>
          <button onClick={() => setShowAddPlanPopup(false)}>Cancel</button>
        </div>
      )}
    </div>
  );
};

// Define prop types
AdNewPlans.propTypes = {
  advisors: PropTypes.array,
};

export default AdNewPlans;










// import { useState, useEffect } from "react";
// import PropTypes from "prop-types";

// import AdPlanCards from "./PlanCard";

// const AdNewPlans = () => {
//   const [plansData, setPlansData] = useState(null);
//   const [showAddPlanPopup, setShowAddPlanPopup] = useState(false);

//   useEffect(() => {
//     const fetchPlansData = async () => {
//       try {
//         const response = await fetch("http://localhost:8000/api/v1/advisor/list-of-plans", {
//           method: "GET",
//           headers: {
//             'Content-Type': 'application/json'
//           },
//           credentials: 'include'
//         });
//         const data = await response.json();
//         setPlansData(data);
//       } catch (error) {
//         console.log("Error fetching plans data:", error);
//       }
//     };

//     fetchPlansData();
//   }, []);

//   const handleAddPlanClick = () => {
//     // Redirect to "/addplan" route
//     window.location.href = "/addplan";
//   };

//   return (
//     <div>
//       <div className="adnewplans-header">
//         <h1 className="adnewplans-heading">YOUR PLANS</h1>
//         <button className="adnewplans-add-button" onClick={handleAddPlanClick}>Add New Plan</button>
//       </div>
//       {plansData && plansData.plans.map((plan) => (
//         <AdPlanCards key={plan._id} plan={plan} />
//       ))}
//       {showAddPlanPopup && (
//         <div className="adnewplans-popup">
//           <input type="text" placeholder="Enter plan details" />
//           <button>Submit</button>
//           <button onClick={() => setShowAddPlanPopup(false)}>Cancel</button>
//         </div>
//       )}
//     </div>
//   );
// };

// // Define prop types
// AdNewPlans.propTypes = {
//   advisors: PropTypes.array.isRequired,
// };

// export default AdNewPlans;