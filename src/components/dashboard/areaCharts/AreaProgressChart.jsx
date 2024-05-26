import { useState, useEffect } from 'react';
import loadingGif from './../../../assest/images/Animation12.gif'
const AreaProgressChart = () => {
  const [progressData, setProgressData] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
        const fetchData = async () => {
          try
          {
            const response = await fetch('http://localhost:8000/api/v1/advisor/list-of-plans-with-more-subscriptions', {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('jwt')}`
              },
            })
            if (!response.ok) {
              throw new Error('Failed to fetch user data');
            }
            const data = await response.json();
            setProgressData(data.plans);
            setLoading(false);
          }
   
          catch (error) {
            console.error('Error fetching data:', error);
          }
        };
   
        fetchData();
      }, []);
     
      return (
        <div className="adv-progress-bar" style={{ backgroundColor: '#ffffff', borderRadius: '0.7rem' }}>
          <div className="progress-bar-info">
            <h4 className="adv-progress-bar-title">Most Sold Plans</h4>
            <br />
          </div>
          {loading ? ( // Render loading animation if loading is true
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
            <img src={loadingGif} alt="Loading..." style={{ maxWidth: '100%', maxHeight: '100%' }} />
          </div>
          ) : (
            <div className="adv-progress-bar-list">
              {progressData
                .sort((a, b) => b.boughtClientIds.length - a.boughtClientIds.length) // Sort in descending order
                .map((progressData) => {
                  return (
                    <div className="progress-bar-item" key={progressData._id}>
                      <div className="adv-bar-item-info">
                        <p className="adv-bar-item-info-name">{progressData.planName}</p>
                        <p className="adv-bar-item-info-value">{progressData.boughtClientIds.length}</p>
                      </div>
                      <div className="adv-bar-item-full">
                        <div
                          className="adv-bar-item-filled"
                          style={{
                            width: `${progressData.boughtClientIds.length * 5}%`,
                          }}
                        ></div>
                      </div>
                    </div>
                  );
                })}
            </div>
          )}
        </div>
      );
};
 
export default AreaProgressChart;