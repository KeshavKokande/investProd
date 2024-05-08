import React from 'react';
import styles from './Plans.module.css';
 
const PlanCard = ({ plan }) => {
  return (
<div className={styles.flipCard}>
<div className={styles.flipCardInner}>
<div className={styles.flipCardFront}>
<h2 className={styles.clH2Plans}>{plan.planName}</h2>
<center><hr className={styles.clHrPlans}/></center>
<div className={styles.cout}>
<div className={styles.cin}>        
<p className={styles.clPPlans}><strong>Min. Investment</strong><br/>{plan.minInvestmentAmount}</p>
</div>
<div className={styles.cin}>
<p className={styles.clPPlans}><strong>Risk</strong><br/>{plan.risk}</p>
</div>
</div>
<div>
<img className={styles.clMoneyimgPlans} src="https://picsum.photos/600/300/" alt="money" style={{ borderRadius: '1.5rem', width: '10rem', height: '5rem', margin: '0.6rem' }} />
</div>
<footer className={styles.ffo}>
<div className={styles.finr}>
<p className={styles.clPStarsPlans}>⭐<br/>10/5</p>
</div>
<div className={styles.finl}>
<p className={styles.clPStarsPlans}>👥<br/>{plan.noOfSubscription}</p>
</div>
</footer>
</div>
<div className={styles.flipCardBack}>
<h2>Dummy Text</h2>
<center><hr className={styles.clHrPlans}/></center>
<br/>
<p>This is the back side of the card.</p>
<p>Add your dummy text here.</p>
</div>
</div>
</div>
  );
};
 
export default PlanCard;