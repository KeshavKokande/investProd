import React, { useState } from 'react';
import PersonaDetails from "./../../assets/images/personal_details.svg";
import styles from "./Page.module.css";

const PageOne = ({ formData, handleChange, errors }) => {
  const [photo, setPhoto] = useState(null);

  const handlePhotoUpload = (event) => {
    const selectedPhoto = event.target.files[0];
    setPhoto(selectedPhoto);
  };

  return (
    <div className={styles.container}>
      <div className={styles.image}>
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
        </div>
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
           {errors.age && <div className={styles.error}>{errors.age}</div>}
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
          {errors.gender && <div className={styles.error}>{errors.gender}</div>}
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
           {errors.qualification && <div className={styles.error}>{errors.qualification}</div>}
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
          <label htmlFor="address">Location:</label>
          <input
            type='text'
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            className={`${styles['form-control']} ${styles['form-control-capitalize']}`}
          />
           {errors.address && <div className={styles.error}>{errors.address}</div>}
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
           {errors.jobRole && <div className={styles.error}>{errors.jobRole}</div>}
        </div>
        <div className={styles['question-container']}>
          <label htmlFor="phone">Phone:</label>
          <input
            type='text'
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className={`${styles['form-control']} ${styles['form-control-capitalize']}`}
          />
           {errors.phone && <div className={styles.error}>{errors.phone}</div>}
        </div>
      </div>
    </div>
  );
};

export default PageOne;


