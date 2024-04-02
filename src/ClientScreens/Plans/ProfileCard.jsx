import React from "react";
import { Link } from 'react-router-dom';
import styles from "./ProfileCard.module.css";

const ProfileCard = ({ plan }) => {
    return (
        <>
            <div className={styles.containerProfile}>
                <div className={styles.cardProfile}>
                    <div className={`${styles.image} ${styles.gridPosition}`}>
                        <img
                            src={plan.decPhoto}
                            alt='Profile'
                            onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = 'https://imgur.com/VcypK5c.png';
                            }}
                            className={styles['profile-image']}
                        />
                    </div>
                    <div className={`${styles.vitamin} ${styles.gridPosition}`}>
                        <h2 className={styles.vitaminH2}>{plan.planName}</h2>
                    </div>
                    <div className={`${styles.reviews} ${styles.gridPosition}`}>
                        <p><strong style={{ color: "black", fontSize: "15px", fontWeight: "bold" }}>Min. Investment :</strong> {plan.minInvestmentAmount}</p>
                    </div>
                    <div className={styles.reviews}>
                        <p><strong style={{ color: "black", fontSize: "15px" }}>Risk :</strong> {plan.risk}</p>
                    </div>
                    <div className={styles.reviews}>
                        <p><strong style={{ color: "black", fontSize: "15px" }}>CAGR</strong> {plan.risk}</p>
                    </div>
                    <div className={styles.reviews}>
                        <p><strong style={{ color: "black", fontSize: "15px" }}>Fee</strong> {plan.risk}</p>
                    </div>
                    <div className={`${styles.size} ${styles.position}`}>
                        <p style={{ color: "black", fontSize: "15px" }}>👥 : {plan.noOfSubscription}</p>
                    </div>
                    <div className={`${styles.buttonsProfile} ${styles.gridPosition}`}>
                        <button>
                            <Link to={`/plan_id/${plan._id}`} style={{ display: 'block', width: '100%', height: '100%', margin: '4px 4px 4px -4px' }}>
                                Open
                            </Link>
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ProfileCard;
