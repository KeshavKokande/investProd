import React, { useState } from 'react';
import PersonaDetails from './../../assets/images/personal_details.svg';
import styles from './Page.module.css';

const PageOne = ({ formData, handleChange }) => {
  const [photo, setPhoto] = useState(null);

  const handlePhotoUpload = (event) => {
    const selectedPhoto = event.target.files[0];
    setPhoto(selectedPhoto);
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
          <label htmlFor="age">Age:</label>
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
          <label htmlFor="gender">Gender:</label>
          <select
            id="gender"
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className={styles['form-control']}
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div className={styles['question-container']}>
          <label htmlFor="qualification">Qualification:</label>
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
          <label htmlFor="address">Address:</label>
          <textarea
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            className={`${styles['form-control']} ${styles['form-control-capitalize']}`}
          ></textarea>
        </div>
        <div className={styles['question-container']}>
          <label htmlFor="jobRole">Job Role:</label>
          <input
            type="text"
            id="jobRole"
            name="jobRole"
            value={formData.jobRole}
            onChange={handleChange}
            className={`${styles['form-control']} ${styles['form-control-capitalize']}`}
          />
        </div>
        <div className={`${styles['form-group']} ${styles['question-container']}`}>
          <label htmlFor="photoId">Upload Photo ID:</label>
          <input
            type="file"
            id="photoId"
            name="photoId"
            accept="image/*"
            onChange={handlePhotoUpload}
            className={styles['form-control-file']}
          />
        </div>
        {photo && (
          <div className={styles['preview-container']}>
            <p>Preview:</p>
            <img
              src={URL.createObjectURL(photo)}
              alt="Uploaded Photo ID"
              className={styles['preview-image']}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default PageOne;