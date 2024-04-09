import React from "react";
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
import { createTheme } from "@mui/material/styles";
import { useState,useEffect } from "react";



  const BadgeStyle = styled(Badge)(({ theme }) => ({
    "& .MuiBadge-badge": {
      backgroundColor: "#f44336", // Red color as an example
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

// const notificationList = [
//   {
//     id: "n1",
//     status: "unseen",
//     avatar: <FiBox fontSize="small" />,
//     mainText: "Kashif Just Subscribed",
//     subText: "waiting for approval",
//     time: "about 12 hours",
//   },
//   {
//     id: "n2",
//     status: "seen",
//     avatar: <BsFillChatDotsFill fontSize="small" />,
//     mainText: "You have new message",
//     subText: "5 unread messages",
//     time: "1 day",
//   },
//   {
//     id: "n3",
//     status: "unseen",
//     avatar: <FaUser fontSize="small" />,
//     mainText: "Aditya",
//     subText: "answered to your comment",
//     time: "about 4 hours",
//   },
//   {
//     id: "n4",
//     status: "seen",
//     avatar: <IoMailOpenSharp fontSize="small" />,
//     mainText: "You have new mail",
//     subText: "sent from shubham",
//     time: "2 days",
//   },
//   {
//     id: "n5",
//     status: "seen",
//     avatar: <FaTruck fontSize="small" />,
//     mainText: "plan buy success",
//     subText: "your plan is being processed",
//     time: "3 days",
//   },
// ];

const Notifications = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [totalUnseenNotifications, setTotalUnseenNotifications] = useState(0);
  const [notificationList, setNotificationList] = useState([]);
  
  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/v1/advisor/get-all-notifications', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          },
          credentials: 'include'
        });
    
        if (!response.ok) {
          throw new Error('Failed to fetch notifications data');
        }
    
        const data = await response.json();
        console.log("DATA IS:", data.notifications);
        console.log("DATA COULD HAVE BEEN:", data.notifications._id);
    
        // Update the notificationList state with the fetched data
        setNotificationList(data.notifications);
        
        // Update the total unseen notifications count based on the fetched data
        setTotalUnseenNotifications(
          data.notifications.filter((notification) => !notification.seen).length
        );
      } catch (error) {
        console.error('Error fetching notifications:', error.message);
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
      const response = await fetch(`http://localhost:8000/api/v1/view-notification/${notificationId}`, {
        method: 'PUT', // Assuming you're updating the notification on the backend
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include'
      });

      if (!response.ok) {
        throw new Error('Failed to mark notification as seen');
      }

      // Assuming your backend returns updated notification data
      const data = await response.json();
      // Update the notificationList state to reflect the updated notification
      setNotificationList(notificationList.map(notification => {
        if (notification.id === notificationId) {
          return data.notification;
        } else {
          return notification;
        }
      }));
      
      // Decrease the count of total unseen notifications
      setTotalUnseenNotifications(prevCount => prevCount - 1);

      // Redirect to the relevant page or handle any other actions
      // Example: history.push('/notification-details');
    } catch (error) {
      console.error('Error marking notification as seen:', error.message);
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
          [
            <MenuItem key="new" disabled>
              NEW
            </MenuItem>,
            unSeenNotifications.map((el) => (
              <MenuItem key={el.id}>
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
            )),
          ]
        )}

        {seenNotifications.length > 0 && (
          [
            <MenuItem key="before" disabled>
              BEFORE THAT
            </MenuItem>,
            seenNotifications.map((el) => (
              <MenuItem key={el.id}>
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
            )),
          ]
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
