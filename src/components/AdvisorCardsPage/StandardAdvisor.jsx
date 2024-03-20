import './../AdvisorCardsPage/Standard.css'
import React from 'react';
const Profile = () => {

    const { useState } = React;
    const [usenumber, setusenumber] = useState(1);

    const [fullimage, setfullimage] = useState(true);


    const [isActive, setisActive] = useState(false);

    const [heart, setheart] = useState(true);

    const ImageClick = () => {

        if (isActive) {

            setisActive(false);
        } else {
            setisActive(true);
        }


    }
    const FullImage = () => {
        if (fullimage) {
            setfullimage(false);
        }
        else {
            setfullimage(true);
        }
    }

    const AddUser = () => {
        setusenumber(usenumber + 1);
    }

    const Heart = () => {
        if (heart) {
            setheart(false);
        }
        else {
            setheart(true);
        }
    }

    return (
        <>
            <div className="container">
                <div className={`card ${isActive ? "black" : ""}`}>
                    <div className={`top_part ${isActive ? "font_icons" : ""}`}>
                        <i className="fa fa-arrow-left"></i>
                        <div className="icons">
                            <i onClick={ImageClick} className="fa fa-moon-o"></i>
                            <i onClick={Heart} className={`fa ${heart ? "fa-heart-o" : "fa-heart"}`}></i>
                            <i className="fa fa-ellipsis-v"></i>
                        </div>
                    </div>
                    <div className={`overlay ${fullimage ? "d-none" : ""}`}>
                        <small onClick={FullImage} className="fa fa-close"></small>
                        <img src="https://imgur.com/oP37oit.jpg" />
                    </div>
                    <div className="circle">
                        <span onClick={FullImage}><img src="https://imgur.com/oP37oit.jpg" /></span>
                        <h3>Djvoue</h3>
                        <h6>Design Track</h6>
                    </div>
                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when. </p>
                    <hr>
                    </hr>
                    <div className="button">
                        <button onClick={AddUser}>Add User {usenumber}</button>
                    </div>
                    <div className="social">
                        <i className="fa fa-twitter"></i>
                        <i className="fa fa-linkedin"></i>
                        <i className="fa fa-whatsapp"></i>
                    </div>
                </div>

            </div>

        </>
    );
}

export default Profile;