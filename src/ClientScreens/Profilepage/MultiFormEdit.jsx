import React, { useState, useEffect } from 'react';
import PageOne from './PageOne';
import PageTwo from './PageTwo';
import styles from "./Page.module.css";
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const MultiFormEdit = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    age: '',
    address: '',
    gender: '',
    jobRole: '',
    qualification: '',
    question_0: '',
    question_1: '',
    question_2: '',
    question_3: '',
    question_4: ''
  });
  const [isLoading, setIsLoading] = useState(true);
  const [success, setSuccess] = useState(false); // State for tracking success status

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
          setFormData({
            img: "",
            name: data.name || '',
            email: data.email || '',
            age: data.age || '',
            address: data.address || '',
            gender: data.gender || '',
            jobRole: data.jobRole || '',
            phone: data.phone || '',
            qualification: data.qualification || '',
            question_0: data.question_0 || '',
            question_1: data.question_1 || '',
            question_2: data.question_2 || '',
            question_3: data.question_3 || '',
            question_4: data.question_4 || ''
          });
          setIsLoading(false);
        } else {
          throw new Error('Failed to fetch profile data');
        }
      } catch (error) {
        console.error('Error fetching profile data:', error.message);
      }
    };

    fetchProfileData();
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log('Form submitted:', formData);
  
    try {
      const response = await fetch('http://localhost:8000/api/v1/client/edit-profile', {
        method: 'PATCH', // Corrected method to PATCH
        headers: {
          'Content-Type': 'application/json',
          // Add any other headers if needed, such as authorization headers
        },
        credentials: 'include',
        body: JSON.stringify(formData)
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const data = await response.json(); // Parse JSON response data
  
      console.log('PATCH request successful:', data);
  
      // Assuming the server returns JSON data with a 'status' property
      if (data.status === 'success') {
        setSuccess(true); // Update success state
      } else {
        setSuccess(false); // Update success state if needed
      }
    } catch (error) {
      console.error('Error during PATCH request:', error);
      // Add error handling logic here
    }
  };
  
  

  useEffect(() => {
    // Use the success state to conditionally navigate
    if (success) {
      navigate('/profile');
    }
  }, [success, navigate]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <PageOne formData={formData} handleChange={handleChange} />
        <PageTwo formData={formData} handleChange={handleChange} />
        <div style={{display:"flex",flexDirection:"row", justifyContent:"center", gap:"2rem"}}>
          <button type="submit" className={`${styles['register-submit-btn']} ${styles['next-button']}`}>Submit</button>
          <Link to="/profile"><button type="button" className={styles['prev-button']} >Back</button></Link>
        </div>
      </form>
    </div>
  );
};

export default MultiFormEdit;
