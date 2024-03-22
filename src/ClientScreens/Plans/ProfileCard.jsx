import React from "react";
import { Link } from 'react-router-dom';
import './ProfileCard.css'

const ProfileCard = ({ plan }) => {
    return (
        <>
            <div className="container-profile">
                <div className="card-profile">
                    <div className="top_part">
                        <div className="circle">
                            <span></span>
                            <span></span>
                            <span></span>
                            <span></span>
                        </div>

                    </div>
                    <div className="image">
                        <img src="https://imgur.com/VcypK5c.png" />
                    </div>
                    <div className="vitamin" >
                        <h2 className="vitamin-h2">{plan.planName}</h2>

                    </div>
                    <div className="reviews">
                        <p><strong style={{ color: "black", fontSize: "14px", fontWeight: "bold" }}>Min. Investment :</ strong>     {plan.minInvestmentAmount}</p>

                    </div>
                    <div className="reviews">
                        <p><strong style={{ color: "black", fontSize: "14px" }}>Risk :</strong>         {plan.risk}</p>

                    </div>
                    <div className="size">
                        <p style={{ color: "black", fontSize: "14px" }}>👥  :              {plan.noOfSubscription}</p>

                    </div>
                    <div className="buttons-profile">
                        <button>
                            <Link to={`/plan_id/${plan._id}`} style={{ display: 'block', width: '100%', height: '100%',margin: '4px 4px 4px -4px' }}>
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