import { Outlet } from "react-router-dom";
import { Sidebar } from "../components";
import axios from "axios";
import styles from "./../ClientScreens/DashBoard/dashboard.module.css";
import { useEffect, useState } from "react";
import notification from "./../assets/icons/notification.png"
import Notifications from "../Notification/Notifications";
import Breadcrumb from "../components/BreadCrumb/Breadcrumb";

const BaseLayout = () => {

  const [advisor, setAdi] = useState();

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await axios.get('https://team4api.azurewebsites.net/api/v1/Advisor/get-own-details', {
          headers: {
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${localStorage.getItem('jwt')}`
          },
        });

        if (response.status === 200) {
          setAdi(response.data.advisor)
        }
        else {
          throw new Error('Failed to fetch profile data');
        }
      } catch (error) {
        console.error('Error fetching profile data:', error.message);
      }
    };

    fetchProfileData();
  }, []);

  return (
    <main className="page-wrapper">
      {/* left of page */}
      <div className={styles.UserInfo}>
        {advisor ? (
          <div>{advisor.name}</div>
        ) : (
          <div></div>
        )}
        <Notifications user={"advisor"} />
      </div>
      {/* left of page */}
      <Sidebar />
      {/* right side/content of the page */}
      <div className="content-wrapper">
        <Breadcrumb />
        <Outlet />
      </div>
    </main>
  );
};

export default BaseLayout;
