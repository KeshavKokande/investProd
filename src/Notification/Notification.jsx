
import { useTheme, styled } from '@mui/material/styles';
import {
  Avatar,
  Button,
  Card,
  CardContent,
  Chip,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
  Stack,
  Typography
} from '@mui/material';


import User1 from './user-01.png';


const ListItemWrapper = styled('div')(({ theme }) => ({
  cursor: 'pointer',
  padding: 16,
  '&:hover': {
    background: theme.palette.primary.light
  },
  '& .MuiListItem-root': {
    padding: 0
  }
}));



const Notification = () => {
  const theme = useTheme();

  return (
    <List
      sx={{
        width: '100%',
        maxWidth: 330,
        py: 0,
        borderRadius: '10px',
        [theme.breakpoints.down('md')]: {
          maxWidth: 300
        },
        '& .MuiListItemSecondaryAction-root': {
          top: 22
        },
        '& .MuiDivider-root': {
          my: 0
        },
        '& .list-container': {
          pl: 7
        }
      }}
    >
      <ListItemWrapper>
        <ListItem alignItems="center">
          <ListItemAvatar>
            <Avatar alt="John Doe" src={User1} />
          </ListItemAvatar>
          <ListItemText primary="John Doe" />
          <ListItemSecondaryAction>
            <Grid container justifyContent="flex-end">
              <Grid item xs={12}>
                <Typography variant="caption" display="block" gutterBottom>
                  2 min ago
                </Typography>
              </Grid>
            </Grid>
          </ListItemSecondaryAction>
        </ListItem>
        <Grid container direction="column" className="list-container">
          <Grid item xs={12} sx={{ pb: 2 }}>
            <Typography variant="subtitle2">It is a long established fact that a reader will be distracted</Typography>
          </Grid>
          <Grid item xs={12}>
            <Grid container>
              <Grid item>
                <Chip label="Unread"  />
              </Grid>
              <Grid item>
                <Chip label="New" />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </ListItemWrapper>
      <Divider />
      <ListItemWrapper>
        <ListItem alignItems="center">
          <ListItemAvatar>
            <Avatar
              sx={{
                color: theme.palette.success.dark,
                backgroundColor: theme.palette.success.light,
                border: 'none',
                borderColor: theme.palette.success.main
              }}
            >
              {/* <IconBuildingStore stroke={1.5} size="1.3rem" /> */}
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary={<Typography variant="subtitle1">Store Verification Done</Typography>} />
          <ListItemSecondaryAction>
            <Grid container justifyContent="flex-end">
              <Grid item xs={12}>
                <Typography variant="caption" display="block" gutterBottom>
                  2 min ago
                </Typography>
              </Grid>
            </Grid>
          </ListItemSecondaryAction>
        </ListItem>
        <Grid container direction="column" className="list-container">
          <Grid item xs={12} sx={{ pb: 2 }}>
            <Typography variant="subtitle2">We have successfully received your request.</Typography>
          </Grid>
          <Grid item xs={12}>
            <Grid container>
              <Grid item>
                <Chip label="Unread"  />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </ListItemWrapper>
      <Divider />
      <ListItemWrapper>
        <ListItem alignItems="center">
          <ListItemAvatar>
            <Avatar
              sx={{
                color: theme.palette.primary.dark,
                backgroundColor: theme.palette.primary.light,
                border: 'none',
                borderColor: theme.palette.primary.main
              }}
            >
              {/* <IconMailbox stroke={1.5} size="1.3rem" /> */}
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary={<Typography variant="subtitle1">Check Your Mail.</Typography>} />
          <ListItemSecondaryAction>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Typography variant="caption" display="block" gutterBottom>
                  2 min ago
                </Typography>
              </Grid>
            </Grid>
          </ListItemSecondaryAction>
        </ListItem>
        <Grid container direction="column" className="list-container">
          <Grid item xs={12} sx={{ pb: 2 }}>
            <Typography variant="subtitle2">All done! Now check your inbox as you&apos;re in for a sweet treat!</Typography>
          </Grid>
          <Grid item xs={12}>
            <Grid container>
              <Grid item>
                <Button variant="contained" disableElevation >
                  Mail
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </ListItemWrapper>
      <Divider />
      <ListItemWrapper>
        <ListItem alignItems="center">
          <ListItemAvatar>
            <Avatar alt="John Doe" src={User1} />
          </ListItemAvatar>
          <ListItemText primary={<Typography variant="subtitle1">John Doe</Typography>} />
          <ListItemSecondaryAction>
            <Grid container justifyContent="flex-end">
              <Grid item xs={12}>
                <Typography variant="caption" display="block" gutterBottom>
                  2 min ago
                </Typography>
              </Grid>
            </Grid>
          </ListItemSecondaryAction>
        </ListItem>
        <Grid container direction="column" className="list-container">
          <Grid item xs={12} sx={{ pb: 2 }}>
            <Typography component="span" variant="subtitle2">
              Uploaded two file on &nbsp;
              <Typography component="span" variant="h6">
                21 Jan 2020
              </Typography>
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Grid container>
              <Grid item xs={12}>
                <Card
                  sx={{
                    backgroundColor: theme.palette.secondary.light
                  }}
                >
                  <CardContent>
                    <Grid container direction="column">
                      <Grid item xs={12}>
                        <Stack direction="row" spacing={2}>
                          {/* <IconPhoto stroke={1.5} size="1.3rem" /> */}
                          <Typography variant="subtitle1">demo.jpg</Typography>
                        </Stack>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </ListItemWrapper>
      <Divider />
      <ListItemWrapper>
        <ListItem alignItems="center">
          <ListItemAvatar>
            <Avatar alt="John Doe" src={User1} />
          </ListItemAvatar>
          <ListItemText primary={<Typography variant="subtitle1">John Doe</Typography>} />
          <ListItemSecondaryAction>
            <Grid container justifyContent="flex-end">
              <Grid item xs={12}>
                <Typography variant="caption" display="block" gutterBottom>
                  2 min ago
                </Typography>
              </Grid>
            </Grid>
          </ListItemSecondaryAction>
        </ListItem>
        <Grid container direction="column" className="list-container">
          <Grid item xs={12} sx={{ pb: 2 }}>
            <Typography variant="subtitle2">It is a long established fact that a reader will be distracted</Typography>
          </Grid>
          <Grid item xs={12}>
            <Grid container>
              <Grid item>
                <Chip label="Confirmation of Account." />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </ListItemWrapper>
    </List>
  );
};

export default Notification;



// import { useEffect, useState,React } from 'react';
// import { useTheme, styled } from '@mui/material/styles';
// import {
//   Avatar,
//   Button,
//   Card,
//   CardContent,
//   Chip,
//   Divider,
//   Grid,
//   List,
//   ListItem,
//   ListItemAvatar,
//   ListItemSecondaryAction,
//   ListItemText,
//   Stack,
//   Typography
// } from '@mui/material';
// import notificationData from './notificationData.json'
// import User1 from './user-01.png';

// const ListItemWrapper = styled('div')(({ theme }) => ({
//   cursor: 'pointer',
//   padding: 16,
//   '&:hover': {
//     background: theme.palette.primary.light
//   },
//   '& .MuiListItem-root': {
//     padding: 0
//   }
// }));

// const Notification = () => {
//   const theme = useTheme();
//   const [notifications, setNotifications] = useState([]);
//   useEffect(() => {
//     // Load data from JSON file
//     fetch('notifications.json')
//       .then(response => response.json())
//       .then(data => {
//         console.log('Notifications:', data); // Log fetched data
//         setNotifications(data);
//       })
//       .catch(error => console.error('Error loading notifications:', error));
//   }, []);

//   return (
//     <List
//       sx={{
//         width: '100%',
//         maxWidth: 330,
//         py: 0,
//         borderRadius: '10px',
//         [theme.breakpoints.down('md')]: {
//           maxWidth: 300
//         },
//         '& .MuiListItemSecondaryAction-root': {
//           top: 22
//         },
//         '& .MuiDivider-root': {
//           my: 0
//         },
//         '& .list-container': {
//           pl: 7
//         }
//       }}
//     >
//       {notifications.map((notification, index) => (
//         <React.Fragment key={index}>
//           <ListItemWrapper>
//             <ListItem alignItems="center">
//               <ListItemAvatar>
//                 <Avatar alt={notification.avatarAlt} src={notification.avatarSrc} />
//               </ListItemAvatar>
//               <ListItemText primary={notification.primaryText} />
//               <ListItemSecondaryAction>
//                 <Grid container justifyContent="flex-end">
//                   <Grid item xs={12}>
//                     <Typography variant="caption" display="block" gutterBottom>
//                       {notification.time}
//                     </Typography>
//                   </Grid>
//                 </Grid>
//               </ListItemSecondaryAction>
//             </ListItem>
//             <Grid container direction="column" className="list-container">
//               <Grid item xs={12} sx={{ pb: 2 }}>
//                 <Typography variant="subtitle2">{notification.subtitle}</Typography>
//               </Grid>
//               <Grid item xs={12}>
//                 <Grid container>
//                   <Grid item>
//                     {notification.chips.map((chip, chipIndex) => (
//                       <Chip key={chipIndex} label={chip} />
//                     ))}
//                   </Grid>
//                 </Grid>
//               </Grid>
//             </Grid>
//           </ListItemWrapper>
//           {index < notifications.length - 1 && <Divider />}
//         </React.Fragment>
//       ))}
//     </List>
//   );
// };

// export default Notification;
