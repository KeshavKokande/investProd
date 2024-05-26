import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import AdPlanCards from "./PlanCard";
import styles from "./AdNewPlans.module.css";
import loadingGif from "./../../../assest/images/Animation11.gif";

const AdNewPlans = () => {
  const [plansData, setPlansData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showAddPlanPopup, setShowAddPlanPopup] = useState(false);

  useEffect(() => {
    const fetchPlansData = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/v1/advisor/list-of-plans", {
          method: "GET",
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('jwt')}`
          },
        });

        const data = await response.json();
        setPlansData(data);
        setIsLoading(false); // Set loading to false when data is fetched
      } catch (error) {
        console.log("Error fetching plans data:", error);
        setIsLoading(false); // Set loading to false even if there's an error
      }
    };

    fetchPlansData();
    window.scrollTo(0, 0);
  }, []);

  const handleAddPlanClick = () => {
    window.location.href = "/advisor/addNewPlan";
  };
  
  return (
    <div className={styles.show_plans_list}>
      <div className={styles["adnewplans_header"]}>
        <h1 className={styles["adnewplans_heading"]}>YOUR PLANS</h1>
        <button className={styles["adnewplans_add_button"]} onClick={handleAddPlanClick}>Add New Plan</button>
      </div>
      {isLoading ? (
  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '700px', width: '1500px' }}>
    <img src={loadingGif} alt="Loading" />
  </div>
) : (
  <>
    {plansData && plansData.plans && plansData.plans.map((plan) => (
      <AdPlanCards key={plan._id} plan={plan} />
    ))}
    {showAddPlanPopup && (
      <div className={styles["adnewplans_popup"]}>
        <input type="text" placeholder="Enter plan details" />
        <button>Submit</button>
        <button onClick={() => setShowAddPlanPopup(false)}>Cancel</button>
      </div>
    )}
  </>
)}
    </div>
  );
};

// Define prop types
AdNewPlans.propTypes = {
  advisors: PropTypes.array,
};

export default AdNewPlans;
