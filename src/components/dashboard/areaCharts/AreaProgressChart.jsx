import { useState, useEffect } from 'react';

const AreaProgressChart = () => {
  const [progressData, setProgressData] = useState([]);

  useEffect(() => {
        const fetchData = async () => {
          try 
          {
            const response = await fetch('http://localhost:8000/api/v1/advisor/list-of-plans-with-more-subscriptions', {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json'
              },
              credentials: 'include'
            })
            if (!response.ok) {
              throw new Error('Failed to fetch user data');
            }
            const data = await response.json();
            setProgressData(data.plans);
          }
    
          catch (error) {
            console.error('Error fetching data:', error);
          }
        };
    
        fetchData();
      }, []);
      
  return (

     <div className="adv-progress-bar" style={{backgroundColor:"#ffffff", borderRadius:'0.7rem',}}>
       <div className="progress-bar-info">
         <h4 className="adv-progress-bar-title">Most Sold Plans</h4>
       </div>
       <div className="adv-progress-bar-list">
          {progressData.map((progressData) => {
           return (
             <div className="progress-bar-item" key={progressData._id}>
               <div className="adv-bar-item-info">
                 <p className="adv-bar-item-info-name">{progressData.planName}</p>
                 <p className="adv-bar-item-info-value">
                   {(progressData.boughtClientIds).length}
                 </p>
               </div>
               <div className="adv-bar-item-full">
                 <div
                   className="adv-bar-item-filled"
                   style={{
                     width: `${(progressData.boughtClientIds).length*5}%`,
                   }}
                 ></div>
               </div>
             </div>
           );
         })} 
       </div>
     </div>
  );
};

export default AreaProgressChart;
