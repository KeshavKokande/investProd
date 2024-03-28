import React, { useState, useRef } from 'react';
import styles from "./Page.module.css";
import PersonaDetails from "./../../assets/images/personal_details.svg";

const PageOne = ({ formData, handleChange, uploadPhoto, ppupload }) => {
  const [genderError, setGenderError] = useState('');
  const fileInputRef1 = useRef(null); // Reference for first file input
  const fileInputRef2 = useRef(null); // Reference for second file input



  const handleGenderChange = (event) => {
    handleChange(event); // Forwarding gender change event to parent component
    const { value } = event.target;
    setGenderError(value.trim() === '' ? 'Please select your gender' : '');
  };

  const clearFileInput1 = () => {
    if (fileInputRef1.current) {
      fileInputRef1.current.value = null;
    }
  };

  const clearFileInput2 = () => {
    if (fileInputRef2.current) {
      fileInputRef2.current.value = null;
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.imagecl}>
        <img src={PersonaDetails} alt="image" />
      </div>
      <div className={styles['form-container']}>
        <div className={styles['question-container']}>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            className={`${styles['form-control']} ${styles['form-control-capitalize']}`}
            disabled
          />
        </div >
        <div className={styles['question-container']}>
          <label htmlFor="age">Age:<span className={styles.required}>*</span></label>
          <input
            type="text"
            id="age"
            name="age"
            value={formData.age}
            onChange={handleChange}
            className={styles['form-control']}
          />
        </div>
        <div className={styles['question-container']}>
          <label htmlFor="gender">Gender:<span className={styles.required}>*</span></label>
          <select
            id="gender"
            name="gender"
            value={formData.gender}
            onChange={handleGenderChange}
            className={styles['form-control']}
          >
            <option value="">Select the option</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
          {genderError && <p className={styles['error-message']}>{genderError}</p>}
        </div>
        <div className={styles['question-container']}>
          <label htmlFor="qualification">Qualification:<span className={styles.required}>*</span></label>
          <input
            type="text"
            id="qualification"
            name="qualification"
            value={formData.qualification}
            onChange={handleChange}
            className={`${styles['form-control']} ${styles['form-control-capitalize']}`}
          />
        </div>
        <div className={styles['question-container']}>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            className={styles['form-control']}
            disabled
          />
        </div>
        <div className={styles['question-container']}>
          <label htmlFor="address">Location:<span className={styles.required}>*</span></label>
          <input
            type="text"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            className={`${styles['form-control']} ${styles['form-control-capitalize']}`}
          />
        </div>
        <div className={styles['question-container']}>
          <label htmlFor="jobRole">Job Role:<span className={styles.required}>*</span></label>
          <input
            type="text"
            id="jobRole"
            name="jobRole"
            value={formData.jobRole}
            onChange={handleChange}
            className={`${styles['form-control']} ${styles['form-control-capitalize']}`}
          />
        </div>
        <div className={styles['question-container']}>
          <label htmlFor="jobRole">Phone:<span className={styles.required}>*</span></label>
          <input
            type="text"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className={`${styles['form-control']} ${styles['form-control-capitalize']}`}
          />
        </div>
        <div className={`${styles['form-group']} ${styles['question-container']}`}>
          <label htmlFor="photoId">Upload Photo ID:<span className={styles.required}>*</span></label>
          <input
            type="file"
            id="photoId"
            name="photoId"
            accept="image/*"
            onChange={uploadPhoto}
            ref={fileInputRef1} // Attach ref to the first file input
            className={styles['form-control-file']}
          />
          <button className={styles.remove} onClick={clearFileInput1}><strong>Remove</strong> </button>
        </div>

        <div className={`${styles['form-group']} ${styles['question-container']}`}>
          <label htmlFor="profilePhoto">Upload Display Picture:</label>
          <input
            type="file"
            id="profilePhoto"
            name="profilePhoto"
            accept="image/*"
            onChange={ppupload}
            ref={fileInputRef2} // Attach ref to the second file input
            className={styles['form-control-file']}
          />
          <button className={styles.remove} onClick={clearFileInput2}><strong>Remove</strong></button>
        </div>
      </div>
    </div>
  );
};

export default PageOne;
