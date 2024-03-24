import React, { useState, useEffect } from 'react';
import styles from './Plans.module.css';
import Arraay from './Arraay';
import PlanCardList from './PlanCardList';
 
function PlansCl() {
  const [plansData, setPlansData] = useState([]);
 
  useEffect(() => {
    const fetchPlansData = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/v1/Client/get-all-plans', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          },
          credentials: 'include'
        });
 
        if (!response.ok) {
          throw new Error('Failed to fetch user data');
        }
 
        const data = await response.json();
        const filteredPlans = data.plans.filter(plan => plan.isActive);
        setPlansData(filteredPlans);
 
        console.log(data);
      } catch (error) {
        console.error('Error fetching user data:', error.message);
      }
    };
 
    fetchPlansData();
  }, []);
 
  return (
<>
<Arraay plans={plansData} />
<br/>
<hr/>
<br/>
<h2 className={styles.explorePlans}>Explore Plans</h2>
<PlanCardList plans={plansData} />
</>
  );
}
 
export default PlansCl;