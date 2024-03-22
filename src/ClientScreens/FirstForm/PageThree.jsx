import React from 'react';
import termsAndConditions from "./../../assets/images/terms_conditions.svg";
import styles from "./Page.module.css";

const PageThree = ({ agreed, handleCheckboxChange }) => {
  return (
    <div className={styles.container}>
      <div className={styles.imagecl}>
        <img src={termsAndConditions} alt="image" />
      </div>
      <div className={`${styles['form-container']} ${styles['form-container2']}`}>
        <div className={styles.terms}>
          <h3>Terms and Conditions</h3>
          <p>
            By proceeding, you agree to abide by the terms and conditions
            outlined in our agreement.
          </p>
          <p>
            This is where you include all your terms and conditions text.
            Make sure it's clear and easy to understand.
          </p>
        </div>
        <div className={styles['checkbox-container']}>
          <input
            type="checkbox"
            checked={agreed}
            onChange={handleCheckboxChange}
            className={styles['form-control-checkbox']}
          />
          <label htmlFor="agreement">I agree to the terms and conditions</label>
        </div>
      </div>
    </div>
  );
};

export default PageThree;