import { Outlet } from "react-router-dom";
import { ClSidebar } from "../components";
import { useEffect, useState } from "react";
import axios from "axios";
import styles from "./../ClientScreens/DashBoard/dashboard.module.css";
import notification from "./../assets/icons/notification.png"
import Notifications from "../Notification/Notifications";
import avatarBoy from "../assets/images/avator.svg";
import Breadcrumb from "../components/BreadCrumb/Breadcrumb";

const ClBaseLayout = () => {
  const [profileInfo, setProfileInfo] = useState({
    img: '', // Add the img property to store the image data
    name: '',
    email: '',
    age: '',
    address: '',
    gender: '',
    jobRole: ''
  });

  const arrayToDataURL = (array) => {
    const blob = new Blob([new Uint8Array(array)], { type: profileInfo.cota });
    const urlCreator = window.URL || window.webkitURL;
    return urlCreator.createObjectURL(blob);
  }

  useEffect(() => {
    
    const fetchProfileData = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/v1/Client/get-own-details', {
          headers: {
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${localStorage.getItem('jwt')}`
          },
        });

        if (response.status === 200) {
          const data = response.data.client;
          const imageDataArray = data.profilePhoto?.data?.data || [];
          const imageDataUrl = arrayToDataURL(imageDataArray);
          sessionStorage.setItem("Cl_Id", data._id)
          setProfileInfo({
            cota: data.profilePhoto.contentType,
            img: imageDataUrl,
            name: data.name || '',
            email: data.email || '',
            age: data.age || '',
            address: data.address || '',
            gender: data.gender || '',
            jobRole: data.jobRole || ''
          });
          // console.log(data);
          // console.log("data name", data.name);
        } else {
          throw new Error('Failed to fetch profile data');
        }
      } catch (error) {
        console.error('Error fetching profile data:', error.message);
      }
    };

    fetchProfileData();
    sessionStorage.setItem('role', 'client');
  }, []);
  return (
    <main className="page-wrapper">
      {/* left of page */}
      <div className={styles.UserInfo}>
        {/* <button>
          <img src={notification} alt="" />
        </button> */}
        <Notifications user={"client"} />
        <h4>{profileInfo.name}</h4>
        <img
          src={profileInfo.img}
          alt='Profile'
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = avatarBoy;
          }}
          className={styles.userProfileImg}
        />

      </div>
      <ClSidebar />
      {/* right side/content of the page */}
      <div className="content-wrapper">
        <Breadcrumb />
        <Outlet />
      </div>
    </main>
  );
};

export default ClBaseLayout;
