import { useState, useEffect } from 'react';

const UserDetails = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {

        const response = await fetch('https://team4api.azurewebsites.net/api/v1/advisor/get-own-details', {
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
        setUserData(data);
    } catch (error) {
        console.error('Error fetching user data:', error.message);
      }
    };

    fetchUserData();
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
    {userData ? (
      <h1>Welcome, {userData.advisor.name}!</h1>
    ) : (
      <p>Loading user data...</p>
    )}
  </div>
  );
};

export default UserDetails;

