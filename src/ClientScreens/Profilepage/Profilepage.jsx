import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; 
import './pp.css'

const ProfilePage = () => {
  const [profileInfo, setProfileInfo] = useState({
    img: '', // Add the img property to store the image data
    name: '',
    email: '',
    age: '',
    address: '',
    gender: '',
    jobRole: '',
    qualification: ''
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/v1/Client/get-own-details', {
          headers: {
            'Content-Type': 'application/json'
          },
          withCredentials: true
        });

        if (response.status === 200) {
          const data = response.data.client;
          const imageDataArray = data.photoId?.data?.data || []; // Get the image data array
          const imageDataUrl = arrayToDataURL(imageDataArray); // Convert array to data URL
          
          setProfileInfo({
            img: imageDataUrl,
            name: data.name || '',
            email: data.email || '',
            age: data.age || '',
            address: data.address || '',
            gender: data.gender || '',
            jobRole: data.jobRole || '',
            qualification: data.qualification || ''
          });
          setIsLoading(false);
          console.log(data)
        } else {
          throw new Error('Failed to fetch profile data');
        }
      } catch (error) {
        console.error('Error fetching profile data:', error.message);
      }
    };

    fetchProfileData();
  }, []);

  // Function to convert array to data URL
  const arrayToDataURL = (array) => {
    const blob = new Blob([new Uint8Array(array)], { type: 'image/jpeg' });
    const urlCreator = window.URL || window.webkitURL;
    return urlCreator.createObjectURL(blob);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className='ppfull'>
      <div className='pp'>
        <div className='pp1'>
          <img
            src={profileInfo.img}
            alt='Profile'
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = 'https://avatar.iran.liara.run/public/boy';
            }}
            className='profile-image'
          />
        </div>
        <div className='pp2'>
          <div className='pp21'>
            <div className='pp211'>
              <div>
                <p className='ppp'><strong>Name:</strong> {profileInfo.name}</p>
                <p className='ppp'><strong>Email:</strong> {profileInfo.email}</p>
                <p className='ppp'><strong>Age:</strong> {profileInfo.age}</p>
                <p className='ppp'><strong>Job Title:</strong> {profileInfo.jobRole}</p>
              </div>
              <div>
                <p className='ppp'><strong>Phone:</strong> {profileInfo.phone}</p>
                <p className='ppp'><strong>Address:</strong> {profileInfo.address}</p>
                <p className='ppp'><strong>Qualification:</strong> {profileInfo.qualification}</p>
                <p className='ppp'><strong>Gender:</strong> {profileInfo.gender}</p>
              </div>
            </div>
            <hr />
            <div className='pp212'>
              {/* Display other information here */}
            </div>
            <div className='pp213'>
              <Link to='/profedit'>
                <button
                  style={{
                    backgroundColor: '#475BE8',
                    color: 'white',
                    padding: '1rem 1rem',
                    borderRadius: '0.3rem',
                    border: 'none',
                    boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
                    cursor: 'pointer'
                  }}
                >
                  ✎Edit
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
