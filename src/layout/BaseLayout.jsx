import { Outlet } from "react-router-dom";
import { Sidebar } from "../components";
import axios from "axios";
import styles from "./../ClientScreens/DashBoard/dashboard.module.css";
import { useEffect, useState } from "react";
import notification from "./../assets/icons/notification.png"
import Notifications from "../Notification/Notifications";

const BaseLayout = () => {

  return (
    <main className="page-wrapper">
      {/* left of page */}
      <div className={styles.UserInfo}>
        <Notifications />
      </div>
      {/* left of page */}
      <Sidebar />
      {/* right side/content of the page */}
      <div className="content-wrapper">
        <Outlet />
      </div>
    </main>
  );
};

export default BaseLayout;
