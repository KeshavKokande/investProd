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

const notificationList = [
  {
    id: "n1",
    status: "unseen",
    avatar: <FiBox fontSize="small" />,
    mainText: "Kashif Just Subscribed",
    subText: "waiting for approval",
    time: "about 12 hours",
  },
  {
    id: "n2",
    status: "seen",
    avatar: <BsFillChatDotsFill fontSize="small" />,
    mainText: "You have new message",
    subText: "5 unread messages",
    time: "1 day",
  },
  {
    id: "n3",
    status: "unseen",
    avatar: <FaUser fontSize="small" />,
    mainText: "Aditya",
    subText: "answered to your comment",
    time: "about 4 hours",
  },
  {
    id: "n4",
    status: "seen",
    avatar: <IoMailOpenSharp fontSize="small" />,
    mainText: "You have new mail",
    subText: "sent from shubham",
    time: "2 days",
  },
  {
    id: "n5",
    status: "seen",
    avatar: <FaTruck fontSize="small" />,
    mainText: "plan buy success",
    subText: "your plan is being processed",
    time: "3 days",
  },
];

const seenNotifications = notificationList.filter((el) => el.status === "seen");
const unSeenNotifications = notificationList.filter(
  (el) => el.status === "unseen"
);
// const totalUnseenNotifications = unSeenNotifications.length;

const Notifications = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    const [totalUnseenNotifications, setTotalUnseenNotifications] = useState(0);

    useEffect(() => {
        // Update totalUnseenNotifications whenever notificationList changes
        setTotalUnseenNotifications(
          notificationList.filter((el) => el.status === "unseen").length
        );
      }, [notificationList]);

    const handleOpen = (event) => {
      setAnchorEl(event.currentTarget);
    };
  
    const handleClose = () => {
      setAnchorEl(null);
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
          <HiBell fontSize="small" />
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

        <MenuItem disabled>NEW</MenuItem>
        {unSeenNotifications.map((el) => (
          <MenuItem key={el.id}>
            <MenuItemIconButtonStyle>{el.avatar}</MenuItemIconButtonStyle>
            <Box>
              <Typography variant="body2" component="p">
                <strong>{el.mainText}</strong>{" "}
                <span>{el.subText}</span>
              </Typography>
              <MenuItemTimeStampStyle variant="caption" component="p">
                <HiClock fontSize="small" />
                <span>{el.time}</span>
              </MenuItemTimeStampStyle>
            </Box>
          </MenuItem>
        ))}

        <MenuItem disabled>BEFORE THAT</MenuItem>
        {seenNotifications.map((el) => (
          <MenuItem key={el.id}>
            <MenuItemIconButtonStyle>{el.avatar}</MenuItemIconButtonStyle>
            <Box>
              <Typography variant="body2" component="p">
                <strong>{el.mainText}</strong>{" "}
                <span>{el.subText}</span>
              </Typography>
              <MenuItemTimeStampStyle variant="caption" component="p">
                <HiClock fontSize="small" />
                <span>{el.time}</span>
              </MenuItemTimeStampStyle>
            </Box>
          </MenuItem>
        ))}

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
