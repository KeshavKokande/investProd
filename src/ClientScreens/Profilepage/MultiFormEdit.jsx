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
    phone: '',
    question_0: '',
    question_1: '',
    question_2: '',
    question_3: '',
    question_4: ''
  });
  const [isLoading, setIsLoading] = useState(true);
  const [errors, setErrors] = useState({}); // State for tracking form validation errors
  const [success, setSuccess] = useState(false); // State for tracking success status

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchProfileData = async () => {
      try {
        const response = await axios.get('https://team4api.azurewebsites.net/api/v1/Client/get-own-details', {
          headers: {
            'Content-Type': 'application/json'
          },
          withCredentials: true
        });

        if (response.status === 200) {
          const data = response.data.client;
          setFormData({
            img: "",
            name: capitalize(data.name) || '',
            email: data.email || '',
            age: capitalize(data.age) || '',
            phone: capitalize(data.phone) || '',
            address: capitalize(data.address) || '',
            gender: capitalize(data.gender) || '',
            jobRole: capitalize(data.jobRole) || '',
            phone: capitalize(data.phone) || '',
            qualification: capitalize(data.qualification) || '',
            question_0: capitalize(data.question_0) ||'',
            question_1: capitalize(data.question_1) ||'',
            question_2: capitalize(data.question_2) ||'',
            question_3: capitalize(data.question_3) ||'',
            question_4: capitalize(data.question_4) ||''
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

  const capitalize = (str) => {
    return str.replace(/\b\w/g, (char) => char.toUpperCase());
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
    // Clear errors for the field being changed
    setErrors({ ...errors, [name]: '' });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Validation logic
    const newErrors = {};

    // Validate Age
    if (formData.age.trim() === '') {
      newErrors.age = 'Age is required';
    } else if (isNaN(formData.age.trim())) {
      newErrors.age = 'Age must be a number';
    } else {
      const ageValue = parseInt(formData.age.trim(), 10);
      if (ageValue <= 0 || ageValue > 120) {
        newErrors.age = 'Age must be between 1 and 120';
      }
    }

    //phone
    const phoneRegex = /^\d{10}$/; // Assumes a 10-digit phone number format
    if (formData.phone.trim() === '') {
      newErrors.phone = 'Phone number is required';
    } else if (!phoneRegex.test(formData.phone.trim())) {
      newErrors.phone = 'Invalid phone number format';
    }
  
    // Validate gender
    if (formData.gender.trim() === '') {
      newErrors.gender = 'Gender is required';
    }

    // Validate jobrole
    if (formData.jobRole.trim() === '') {
      newErrors.jobRole = 'JobRole is required';
    }

    // Validate address
    if (formData.address.trim() === '') {
      newErrors.address = 'Location is required';
    }

    // Validate Qual
    if (formData.qualification.trim() === '') {
      newErrors.qualification = 'Qualification is required';
    }


    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return; // Exit early if there are validation errors
    }

    try {
      const response = await fetch('https://team4api.azurewebsites.net/api/v1/client/edit-profile', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();

      console.log('PATCH request successful:', data);

      if (data.status === 'success') {
        setSuccess(true);
      } else {
        setSuccess(false);
      }
    } catch (error) {
      console.error('Error during PATCH request:', error);
    }
  };

  useEffect(() => {
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
        <PageOne formData={formData} handleChange={handleChange} errors={errors} />
        <PageTwo formData={formData} handleChange={handleChange} />
        <div style={{ display: "flex", flexDirection: "row", justifyContent: "center", gap: "2rem" }}>
          <button type="submit" className={`${styles['register-submit-btn']} ${styles['next-button']}`}>Submit</button>
          <Link to="/profile"><button type="button" className={styles['prev-button']} >Back</button></Link>
        </div>
      </form>
    </div>
  );
};

export default MultiFormEdit;
