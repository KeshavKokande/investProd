import React, { useState, useEffect } from "react";
import {
  Badge,
  Box,
  Divider,
  IconButton,
  Link,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import { styled } from "@mui/system";
import { HiBell, HiClock } from "react-icons/hi";
import { FaUser, FaTruck } from "react-icons/fa";
import { BsFillChatDotsFill } from "react-icons/bs";
import { IoMailOpenSharp } from "react-icons/io5";
import { FiBox } from "react-icons/fi";

const BadgeStyle = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    backgroundColor: "#f44336",
    color: "white",
    top: "-3px",
    fontSize: theme.spacing(1.75),
  },
}));

const MenuItemIconButtonStyle = styled(IconButton)(({ theme }) => ({
  marginRight: theme.spacing(2),
}));

const MenuItemTimeStampStyle = styled(Typography)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  fontSize: theme.spacing(1.85),
  color: "green",
  margin: 0,
  marginTop: theme.spacing(0.5),
  "& span": {
    marginLeft: theme.spacing(1),
  },
}));

const Notifications = ({user}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [totalUnseenNotifications, setTotalUnseenNotifications] = useState(0);
  const [notificationList, setNotificationList] = useState([]);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await fetch(
          `https://team4api.azurewebsites.net/api/v1/${user}/get-all-notifications`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch notifications data");
        }

        const data = await response.json();
        console.log("notifications:" ,data)
        setNotificationList(data.notifications);

        setTotalUnseenNotifications(
          data.notifications.filter((notification) => !notification.seen).length
        );
      } catch (error) {
        console.error("Error fetching notifications:", error.message);
      }
    };

    fetchNotifications();
  }, []);

  const seenNotifications = notificationList.filter((el) => el.seen);
  const unSeenNotifications = notificationList.filter((el) => !el.seen);

  const handleOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const getTimeDifference = (timestamp) => {
    const currentTime = new Date();
    const notificationTime = new Date(timestamp);
    const differenceInSeconds = Math.floor(
      (currentTime - notificationTime) / 1000
    );

    if (differenceInSeconds < 60) {
      return `${differenceInSeconds} seconds ago`;
    } else if (differenceInSeconds < 3600) {
      const minutes = Math.floor(differenceInSeconds / 60);
      return `${minutes} minutes ago`;
    } else if (differenceInSeconds < 86400) {
      const hours = Math.floor(differenceInSeconds / 3600);
      return `${hours} hours ago`;
    } else {
      const days = Math.floor(differenceInSeconds / 86400);
      return `${days} days ago`;
    }
  };

  const handleNotificationClick = async (notificationId) => {
    try {
      const response = await fetch(
        `https://team4api.azurewebsites.net/api/v1/${user}/view-notification/${notificationId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );
  
      if (!response.ok) {
        throw new Error("Failed to mark notification as seen");
      }
  
      // Update the notification's seen status locally
      setNotificationList((prevNotifications) =>
        prevNotifications.map((notification) =>
          notification._id === notificationId
            ? { ...notification, seen: true } // Assuming 'seen' is a property of the notification
            : notification
        )
      );
  
      // Update the total unseen notifications count
      setTotalUnseenNotifications((prevCount) => prevCount - 1);
    } catch (error) {
      console.error("Error marking notification as seen:", error.message);
    }
  };

  return (
    <>
      <IconButton
        aria-label="notifications"
        aria-controls="notifications"
        aria-haspopup="true"
        onClick={handleOpen}
      >
        <BadgeStyle badgeContent={totalUnseenNotifications}>
          <HiBell fontSize="extra large" />
        </BadgeStyle>
      </IconButton>

      <Menu
        id="notificationsMenu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <Box sx={{ p: 2 }}>
          <Typography variant="h6" component="h3">
            Notifications
          </Typography>
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            You have {totalUnseenNotifications} unread messages
          </Typography>
        </Box>

        <Divider />

        {unSeenNotifications.length > 0 && (
          <>
            <MenuItem key="new" disabled>
              NEW
            </MenuItem>
            {unSeenNotifications.map((el) => (
              <MenuItem key={el._id}>
                <MenuItemIconButtonStyle>{el.avatar}</MenuItemIconButtonStyle>
                <Box onClick={() => handleNotificationClick(el._id)}>
                  <Typography variant="body2" component="p">
                    <strong>{el.message}</strong>{" "}
                    <span>{el.subText}</span>
                  </Typography>
                  <MenuItemTimeStampStyle variant="caption" component="p">
                    <HiClock fontSize="small" />
                    <span>{getTimeDifference(el.timestamp)}</span>
                  </MenuItemTimeStampStyle>
                </Box>
              </MenuItem>
            ))}
          </>
        )}

        {seenNotifications.length > 0 && (
          <>
            <MenuItem key="before" disabled>
              BEFORE THAT
            </MenuItem>
            {seenNotifications.map((el) => (
              <MenuItem key={el._id}>
                <MenuItemIconButtonStyle>{el.avatar}</MenuItemIconButtonStyle>
                <Box>
                  <Typography variant="body2" component="p">
                    <strong>{el.message}</strong>{" "}
                    <span>{el.subText}</span>
                  </Typography>
                  <MenuItemTimeStampStyle variant="caption" component="p">
                    <HiClock fontSize="small" />
                    <span>{getTimeDifference(el.timestamp)}</span>
                  </MenuItemTimeStampStyle>
                </Box>
              </MenuItem>
            ))}
          </>
        )}

        <Divider />

        <Box sx={{ p: 2 }}>
          <Link href="#" variant="body2">
            View All
          </Link>
        </Box>
      </Menu>
    </>
  );
};

export default Notifications;
