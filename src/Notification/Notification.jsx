// import React, { useEffect, useRef, useState } from 'react';
// import { Link } from 'react-router-dom';

// const DropdownNotification = () => {
//   const [dropdownOpen, setDropdownOpen] = useState(false);
//   const [notifying, setNotifying] = useState(true);

//   const trigger = useRef(null);
//   const dropdown = useRef(null);

//   useEffect(() => {
//     const clickHandler = ({ target }) => {
//       if (!dropdown.current) return;
//       if (
//         !dropdownOpen ||
//         dropdown.current.contains(target) ||
//         trigger.current.contains(target)
//       )
//         return;
//       setDropdownOpen(false);
//     };
//     document.addEventListener('click', clickHandler);
//     return () => document.removeEventListener('click', clickHandler);
//   }, [dropdownOpen]);

//   useEffect(() => {
//     const keyHandler = ({ keyCode }) => {
//       if (!dropdownOpen || keyCode !== 27) return;
//       setDropdownOpen(false);
//     };
//     document.addEventListener('keydown', keyHandler);
//     return () => document.removeEventListener('keydown', keyHandler);
//   }, [dropdownOpen]);

//   return (
//     <li className="relative">
//     <Link
//       ref={trigger}
//       onClick={() => {
//         setNotifying(false);
//         setDropdownOpen(!dropdownOpen);
//       }}
//       to="#"
//       className="relative flex h-8.5 w-8.5 items-center justify-center rounded-full border-[0.5px] border-stroke bg-gray hover:text-primary dark:border-strokedark dark:bg-meta-4 dark:text-white"
//     >
//       <span
//         className={`absolute -top-0.5 right-0 z-1 h-2 w-2 rounded-full bg-meta-1 ${
//           notifying === false ? 'hidden' : 'inline'
//         }`}
//       >
//         <span className="absolute -z-1 inline-flex h-full w-full animate-ping rounded-full bg-meta-1 opacity-75"></span>
//       </span>

//       <svg
//         className="fill-current duration-300 ease-in-out"
//         width="18"
//         height="18"
//         viewBox="0 0 18 18"
//         fill="none"
//         xmlns="http://www.w3.org/2000/svg"
//       >
//         <path
//           d="M16.1999 14.9343L15.6374 14.0624C15.5249 13.8937 15.4687 13.7249 15.4687 13.528V7.67803C15.4687 6.01865 14.7655 4.47178 13.4718 3.31865C12.4312 2.39053 11.0812 1.7999 9.64678 1.6874V1.1249C9.64678 0.787402 9.36553 0.478027 8.9999 0.478027C8.6624 0.478027 8.35303 0.759277 8.35303 1.1249V1.65928C8.29678 1.65928 8.24053 1.65928 8.18428 1.6874C4.92178 2.05303 2.4749 4.66865 2.4749 7.79053V13.528C2.44678 13.8093 2.39053 13.9499 2.33428 14.0343L1.7999 14.9343C1.63115 15.2155 1.63115 15.553 1.7999 15.8343C1.96865 16.0874 2.2499 16.2562 2.55928 16.2562H8.38115V16.8749C8.38115 17.2124 8.6624 17.5218 9.02803 17.5218C9.36553 17.5218 9.6749 17.2405 9.6749 16.8749V16.2562H15.4687C15.778 16.2562 16.0593 16.0874 16.228 15.8343C16.3968 15.553 16.3968 15.2155 16.1999 14.9343ZM3.23428 14.9905L3.43115 14.653C3.5999 14.3718 3.68428 14.0343 3.74053 13.6405V7.79053C3.74053 5.31553 5.70928 3.23428 8.3249 2.95303C9.92803 2.78428 11.503 3.2624 12.6562 4.2749C13.6687 5.1749 14.2312 6.38428 14.2312 7.67803V13.528C14.2312 13.9499 14.3437 14.3437 14.5968 14.7374L14.7655 14.9905H3.23428Z"
//           fill=""
//         />
//       </svg>
//     </Link>

//     <div
//       ref={dropdown}
//       onFocus={() => setDropdownOpen(true)}
//       onBlur={() => setDropdownOpen(false)}
//       className={`absolute -right-27 mt-2.5 flex h-90 w-75 flex-col rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark sm:right-0 sm:w-80 ${
//         dropdownOpen === true ? 'block' : 'hidden'
//       }`}
//     >
//       <div className="px-4.5 py-3">
//         <h5 className="text-sm font-medium text-bodydark2">Notification</h5>
//       </div>

//       <ul className="flex h-auto flex-col overflow-y-auto">
//         <li>
//           <Link
//             className="flex flex-col gap-2.5 border-t border-stroke px-4.5 py-3 hover:bg-gray-2 dark:border-strokedark dark:hover:bg-meta-4"
//             to="#"
//           >
//             <p className="text-sm">
//               <span className="text-black dark:text-white">
//                 Edit your information in a swipe
//               </span>{' '}
//               Sint occaecat cupidatat non proident, sunt in culpa qui officia
//               deserunt mollit anim.
//             </p>

//             <p className="text-xs">12 May, 2025</p>
//           </Link>
//         </li>
//         <li>
//           <Link
//             className="flex flex-col gap-2.5 border-t border-stroke px-4.5 py-3 hover:bg-gray-2 dark:border-strokedark dark:hover:bg-meta-4"
//             to="#"
//           >
//             <p className="text-sm">
//               <span className="text-black dark:text-white">
//                 It is a long established fact
//               </span>{' '}
//               that a reader will be distracted by the readable.
//             </p>

//             <p className="text-xs">24 Feb, 2025</p>
//           </Link>
//         </li>
//         <li>
//           <Link
//             className="flex flex-col gap-2.5 border-t border-stroke px-4.5 py-3 hover:bg-gray-2 dark:border-strokedark dark:hover:bg-meta-4"
//             to="#"
//           >
//             <p className="text-sm">
//               <span className="text-black dark:text-white">
//                 There are many variations
//               </span>{' '}
//               of passages of Lorem Ipsum available, but the majority have
//               suffered
//             </p>

//             <p className="text-xs">04 Jan, 2025</p>
//           </Link>
//         </li>
//         <li>
//           <Link
//             className="flex flex-col gap-2.5 border-t border-stroke px-4.5 py-3 hover:bg-gray-2 dark:border-strokedark dark:hover:bg-meta-4"
//             to="#"
//           >
//             <p className="text-sm">
//               <span className="text-black dark:text-white">
//                 There are many variations
//               </span>{' '}
//               of passages of Lorem Ipsum available, but the majority have
//               suffered
//             </p>

//             <p className="text-xs">01 Dec, 2024</p>
//           </Link>
//         </li>
//       </ul>
//     </div>
//   </li>
//   );
// };

// export default DropdownNotification;


// import { useEffect, useRef, useState } from 'react';
// import { Link } from 'react-router-dom';

// import UserOne from './user-01.png';
// import UserTwo from './user-02.png';
// import UserThree from './user-03.png';
// import UserFour from './user-04.png';

// const DropdownNotification = () => {
//     const [dropdownOpen, setDropdownOpen] = useState(false);
//   const [notifying, setNotifying] = useState(true);

//   const trigger = useRef(null);
//   const dropdown = useRef(null);

//   // close on click outside
//   useEffect(() => {
//     const clickHandler = ({ target }) => {
//       if (!dropdown.current) return;
//       if (
//         !dropdownOpen ||
//         dropdown.current.contains(target) ||
//         trigger.current.contains(target)
//       )
//         return;
//       setDropdownOpen(false);
//     };
//     document.addEventListener('click', clickHandler);
//     return () => document.removeEventListener('click', clickHandler);
//   });

//   // close if the esc key is pressed
//   useEffect(() => {
//     const keyHandler = ({ keyCode }) => {
//       if (!dropdownOpen || keyCode !== 27) return;
//       setDropdownOpen(false);
//     };
//     document.addEventListener('keydown', keyHandler);
//     return () => document.removeEventListener('keydown', keyHandler);
//   });

//   return (
//     <li className="relative">
//       <Link
//         ref={trigger}
//         onClick={() => {
//           setNotifying(false);
//           setDropdownOpen(!dropdownOpen);
//         }}
//         className="relative flex h-8.5 w-8.5 items-center justify-center rounded-full border-[0.5px] border-stroke bg-gray hover:text-primary dark:border-strokedark dark:bg-meta-4 dark:text-white"
//         to="#"
//       >
//         <span
//           className={`absolute -top-0.5 -right-0.5 z-1 h-2 w-2 rounded-full bg-meta-1 ${
//             notifying === false ? 'hidden' : 'inline'
//           }`}
//         >
//           <span className="absolute -z-1 inline-flex h-full w-full animate-ping rounded-full bg-meta-1 opacity-75"></span>
//         </span>

//         <svg
//           className="fill-current duration-300 ease-in-out"
//           width="18"
//           height="18"
//           viewBox="0 0 18 18"
//           fill="none"
//           xmlns="http://www.w3.org/2000/svg"
//         >
//           <path
//             d="M10.9688 1.57495H7.03135C3.43135 1.57495 0.506348 4.41558 0.506348 7.90308C0.506348 11.3906 2.75635 13.8375 8.26885 16.3125C8.40947 16.3687 8.52197 16.3968 8.6626 16.3968C8.85947 16.3968 9.02822 16.3406 9.19697 16.2281C9.47822 16.0593 9.64697 15.75 9.64697 15.4125V14.2031H10.9688C14.5688 14.2031 17.522 11.3625 17.522 7.87495C17.522 4.38745 14.5688 1.57495 10.9688 1.57495ZM10.9688 12.9937H9.3376C8.80322 12.9937 8.35322 13.4437 8.35322 13.9781V15.0187C3.6001 12.825 1.74385 10.8 1.74385 7.9312C1.74385 5.14683 4.10635 2.8687 7.03135 2.8687H10.9688C13.8657 2.8687 16.2563 5.14683 16.2563 7.9312C16.2563 10.7156 13.8657 12.9937 10.9688 12.9937Z"
//             fill=""
//           />
//           <path
//             d="M5.42812 7.28442C5.0625 7.28442 4.78125 7.56567 4.78125 7.9313C4.78125 8.29692 5.0625 8.57817 5.42812 8.57817C5.79375 8.57817 6.075 8.29692 6.075 7.9313C6.075 7.56567 5.79375 7.28442 5.42812 7.28442Z"
//             fill=""
//           />
//           <path
//             d="M9.00015 7.28442C8.63452 7.28442 8.35327 7.56567 8.35327 7.9313C8.35327 8.29692 8.63452 8.57817 9.00015 8.57817C9.33765 8.57817 9.64702 8.29692 9.64702 7.9313C9.64702 7.56567 9.33765 7.28442 9.00015 7.28442Z"
//             fill=""
//           />
//           <path
//             d="M12.5719 7.28442C12.2063 7.28442 11.925 7.56567 11.925 7.9313C11.925 8.29692 12.2063 8.57817 12.5719 8.57817C12.9375 8.57817 13.2188 8.29692 13.2188 7.9313C13.2188 7.56567 12.9094 7.28442 12.5719 7.28442Z"
//             fill=""
//           />
//         </svg>
//       </Link>

//       {/* <!-- Dropdown Start --> */}
//       <div
//         ref={dropdown}
//         onFocus={() => setDropdownOpen(true)}
//         onBlur={() => setDropdownOpen(false)}
//         className={`absolute -right-16 mt-2.5 flex h-90 w-75 flex-col rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark sm:right-0 sm:w-80 ${
//           dropdownOpen === true ? 'block' : 'hidden'
//         }`}
//       >
//         <div className="px-4.5 py-3">
//           <h5 className="text-sm font-medium text-bodydark2">Messages</h5>
//         </div>

//         <ul className="flex h-auto flex-col overflow-y-auto">
//           <li>
//             <Link
//               className="flex gap-4.5 border-t border-stroke px-4.5 py-3 hover:bg-gray-2 dark:border-strokedark dark:hover:bg-meta-4"
//               to="/messages"
//             >
//               <div className="h-12.5 w-12.5 rounded-full">
//                 <img src={UserOne} alt="User" />
//               </div>

//               <div>
//                 <h6 className="text-sm font-medium text-black dark:text-white">
//                   Kashif Ahmad
//                 </h6>
//                 <p className="text-sm">I like your confidence 💪</p>
//                 <p className="text-xs">2min ago</p>
//               </div>
//             </Link>
//           </li>
//           <li>
//             <Link
//               className="flex gap-4.5 border-t border-stroke px-4.5 py-3 hover:bg-gray-2 dark:border-strokedark dark:hover:bg-meta-4"
//               to="/messages"
//             >
//               <div className="h-12.5 w-12.5 rounded-full">
//                 <img src={UserTwo} alt="User" />
//               </div>

//               <div>
//                 <h6 className="text-sm font-medium text-black dark:text-white">
//                   Aditya
//                 </h6>
//                 <p className="text-sm">Can you share your offer?</p>
//                 <p className="text-xs">10min ago</p>
//               </div>
//             </Link>
//           </li>
//           <li>
//             <Link
//               className="flex gap-4.5 border-t border-stroke px-4.5 py-3 hover:bg-gray-2 dark:border-strokedark dark:hover:bg-meta-4"
//               to="/messages"
//             >
//               <div className="h-12.5 w-12.5 rounded-full">
//                 <img src={UserThree} alt="User" />
//               </div>

//               <div>
//                 <h6 className="text-sm font-medium text-black dark:text-white">
//                   Shubham Goswami
//                 </h6>
//                 <p className="text-sm">I cam across your profile and...</p>
//                 <p className="text-xs">1day ago</p>
//               </div>
//             </Link>
//           </li>
//           <li>
//             <Link
//               className="flex gap-4.5 border-t border-stroke px-4.5 py-3 hover:bg-gray-2 dark:border-strokedark dark:hover:bg-meta-4"
//               to="/messages"
//             >
//               <div className="h-12.5 w-12.5 rounded-full">
//                 <img src={UserFour} alt="User" />
//               </div>

//               <div>
//                 <h6 className="text-sm font-medium text-black dark:text-white">
//                   Keshav
//                 </h6>
//                 <p className="text-sm">I’m waiting for you response!</p>
//                 <p className="text-xs">5days ago</p>
//               </div>
//             </Link>
//           </li>
//           <li>
//             <Link
//               className="flex gap-4.5 border-t border-stroke px-4.5 py-3 hover:bg-gray-2 dark:border-strokedark dark:hover:bg-meta-4"
//               to="/messages"
//             >
//               <div className="h-12.5 w-12.5 rounded-full">
//                 <img src={UserTwo} alt="User" />
//               </div>

//               <div>
//                 <h6 className="text-sm font-medium text-black dark:text-white">
//                  Parichay
//                 </h6>
//                 <p className="text-sm">I like your confidence 💪</p>
//                 <p className="text-xs">2min ago</p>
//               </div>
//             </Link>
//           </li>
//         </ul>
//       </div>
//       {/* <!-- Dropdown End --> */}
//     </li>
//   );
// };

// export default DropdownNotification;




// import PropTypes from 'prop-types';
// import { set, sub } from 'date-fns';
// import { noCase } from 'change-case';
// import { faker } from '@faker-js/faker';
// import { useState, useRef } from 'react';
// // @mui
// import {
//   Box,
//   List,
//   Badge,
//   Button,
//   Avatar,
//   Tooltip,
//   Divider,
//   Typography,
//   IconButton,
//   ListItemText,
//   ListSubheader,
//   ListItemAvatar,
//   ListItemButton,
// } from '@mui/material';
// // utils
// import { fToNow } from './formatTime';
// // components
// import Iconify from './Iconify';
// import Scrollbar from './Scrollbar';
// import MenuPopover from './MenuPopover';

// // ----------------------------------------------------------------------

// const NOTIFICATIONS = [
//   {
//     id: faker.datatype.uuid(),
//     title: 'Your order is placed',
//     description: 'waiting for shipping',
//     avatar: null,
//     type: 'order_placed',
//     createdAt: set(new Date(), { hours: 10, minutes: 30 }),
//     isUnRead: true,
//   },
//   {
//     id: faker.datatype.uuid(),
//     title: faker.name.findName(),
//     description: 'answered to your comment on the Versus',
//     avatar: '/static/mock-images/avatars/avatar_2.jpg',
//     type: 'friend_interactive',
//     createdAt: sub(new Date(), { hours: 3, minutes: 30 }),
//     isUnRead: true,
//   },
//   {
//     id: faker.datatype.uuid(),
//     title: 'You have new message',
//     description: '5 unread messages',
//     avatar: null,
//     type: 'chat_message',
//     createdAt: sub(new Date(), { days: 1, hours: 3, minutes: 30 }),
//     isUnRead: false,
//   },
//   {
//     id: faker.datatype.uuid(),
//     title: 'You have new mail',
//     description: 'sent from Guido Padberg',
//     avatar: null,
//     type: 'mail',
//     createdAt: sub(new Date(), { days: 2, hours: 3, minutes: 30 }),
//     isUnRead: false,
//   },
//   {
//     id: faker.datatype.uuid(),
//     title: 'Delivery processing',
//     description: 'Your order is being shipped',
//     avatar: null,
//     type: 'order_shipped',
//     createdAt: sub(new Date(), { days: 3, hours: 3, minutes: 30 }),
//     isUnRead: false,
//   },
// ];

// export default function NotificationsPopover() {
//   const anchorRef = useRef(null);

//   const [notifications, setNotifications] = useState(NOTIFICATIONS);

//   const totalUnRead = notifications.filter((item) => item.isUnRead === true).length;

//   const [open, setOpen] = useState(null);

//   const handleOpen = (event) => {
//     setOpen(event.currentTarget);
//   };

//   const handleClose = () => {
//     setOpen(null);
//   };

//   const handleMarkAllAsRead = () => {
//     setNotifications(
//       notifications.map((notification) => ({
//         ...notification,
//         isUnRead: false,
//       }))
//     );
//   };

//   return (
//     <>
//       <IconButton
//         ref={anchorRef}
//         color={open ? 'primary' : 'default'}
//         onClick={handleOpen}
//         sx={{ width: 40, height: 40 }}
//       >
//         <Badge badgeContent={totalUnRead} color="error">
//           <Iconify icon="eva:bell-fill" width={20} height={20} />
//         </Badge>
//       </IconButton>

//       <MenuPopover
//         open={Boolean(open)}
//         anchorEl={open}
//         onClose={handleClose}
//         sx={{ width: 360, p: 0, mt: 1.5, ml: 0.75 }}
//       >
//         <Box sx={{ display: 'flex', alignItems: 'center', py: 2, px: 2.5 }}>
//           <Box sx={{ flexGrow: 1 }}>
//             <Typography variant="subtitle1">Notifications</Typography>
//             <Typography variant="body2" sx={{ color: 'text.secondary' }}>
//               You have {totalUnRead} unread messages
//             </Typography>
//           </Box>

//           {totalUnRead > 0 && (
//             <Tooltip title=" Mark all as read">
//               <IconButton color="primary" onClick={handleMarkAllAsRead}>
//                 <Iconify icon="eva:done-all-fill" width={20} height={20} />
//               </IconButton>
//             </Tooltip>
//           )}
//         </Box>

//         <Divider sx={{ borderStyle: 'dashed' }} />

//         <Scrollbar sx={{ height: { xs: 340, sm: 'auto' } }}>
//           <List
//             disablePadding
//             subheader={
//               <ListSubheader disableSticky sx={{ py: 1, px: 2.5, typography: 'overline' }}>
//                 New
//               </ListSubheader>
//             }
//           >
//             {notifications.slice(0, 2).map((notification) => (
//               <NotificationItem key={notification.id} notification={notification} />
//             ))}
//           </List>

//           <List
//             disablePadding
//             subheader={
//               <ListSubheader disableSticky sx={{ py: 1, px: 2.5, typography: 'overline' }}>
//                 Before that
//               </ListSubheader>
//             }
//           >
//             {notifications.slice(2, 5).map((notification) => (
//               <NotificationItem key={notification.id} notification={notification} />
//             ))}
//           </List>
//         </Scrollbar>

//         <Divider sx={{ borderStyle: 'dashed' }} />

//         <Box sx={{ p: 1 }}>
//           <Button fullWidth disableRipple>
//             View All
//           </Button>
//         </Box>
//       </MenuPopover>
//     </>
//   );
// }

// // ----------------------------------------------------------------------

// NotificationItem.propTypes = {
//   notification: PropTypes.shape({
//     createdAt: PropTypes.instanceOf(Date),
//     id: PropTypes.string,
//     isUnRead: PropTypes.bool,
//     title: PropTypes.string,
//     description: PropTypes.string,
//     type: PropTypes.string,
//     avatar: PropTypes.any,
//   }),
// };

// function NotificationItem({ notification }) {
//   const { avatar, title } = renderContent(notification);

//   return (
//     <ListItemButton
//       sx={{
//         py: 1.5,
//         px: 2.5,
//         mt: '1px',
//         ...(notification.isUnRead && {
//           bgcolor: 'action.selected',
//         }),
//       }}
//     >
//       <ListItemAvatar>
//         <Avatar sx={{ bgcolor: 'background.neutral' }}>{avatar}</Avatar>
//       </ListItemAvatar>
//       <ListItemText
//         primary={title}
//         secondary={
//           <Typography
//             variant="caption"
//             sx={{
//               mt: 0.5,
//               display: 'flex',
//               alignItems: 'center',
//               color: 'text.disabled',
//             }}
//           >
//             <Iconify icon="eva:clock-outline" sx={{ mr: 0.5, width: 16, height: 16 }} />
//             {fToNow(notification.createdAt)}
//           </Typography>
//         }
//       />
//     </ListItemButton>
//   );
// }



// function renderContent(notification) {
//   const title = (
//     <Typography variant="subtitle2">
//       {notification.title}
//       <Typography component="span" variant="body2" sx={{ color: 'text.secondary' }}>
//         &nbsp; {noCase(notification.description)}
//       </Typography>
//     </Typography>
//   );

//   if (notification.type === 'order_placed') {
//     return {
//       avatar: <img alt={notification.title} src="/static/icons/ic_notification_package.svg" />,
//       title,
//     };
//   }
//   if (notification.type === 'order_shipped') {
//     return {
//       avatar: <img alt={notification.title} src="/static/icons/ic_notification_shipping.svg" />,
//       title,
//     };
//   }
//   if (notification.type === 'mail') {
//     return {
//       avatar: <img alt={notification.title} src="/static/icons/ic_notification_mail.svg" />,
//       title,
//     };
//   }
//   if (notification.type === 'chat_message') {
//     return {
//       avatar: <img alt={notification.title} src="/static/icons/ic_notification_chat.svg" />,
//       title,
//     };
//   }
//   return {
//     avatar: notification.avatar ? <img alt={notification.title} src={notification.avatar} /> : null,
//     title,
//   };
// }


