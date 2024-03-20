import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import "./../../ClientScreens/Plans/Plans.css";

export default function MediaCard({ advisor }) {
  return (
    <Card sx={{ maxWidth: 345 }}>
        
      <CardMedia
        sx={{ height: 200 }}
        image="https://avatar.iran.liara.run/public/boy"
        title="green iguana"
      />
      
      <CardContent>
      
        <Typography gutterBottom variant="h5" component="div">
        {advisor.name}
        </Typography>
        
       
      </CardContent>
   
      <CardActions>
        <Button size="small" >Open Profile</Button>
        
      </CardActions>
    
    </Card>
  );
}