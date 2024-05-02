import React from 'react';
import Questionnare from './../../assets/images/questionnare.svg';
import styles from "./Page.module.css";

const PageTwo = ({ formData, handleChange }) => {
  return (
    <div className={styles.container}>
      <div className={styles.image}>
        <img src={Questionnare} alt="Questionnaire" />
      </div>
      <div className={`${styles['form-container']} ${styles['form-container1']}`}>
        <div className={styles['question-container']}>
          <label htmlFor="primaryObjective">What Are Your Primary Investment Objectives?</label>
          <select
            id="primaryObjective"
            name="question_0"
            value={formData.question_0}
            onChange={handleChange}
            className={styles['form-control']}
          >
              <option value="Retirement planning">Retirement Planning</option>
              <option value="Wealth accumulation">Wealth Accumulation</option>
              <option value="Saving for education">Saving For Education</option>
              <option value="Buying a home">Buying a Home</option>
              <option value="Starting a business">Starting a Business</option>
              </select>
        </div>
        <div className={styles['question-container']}>
          <label htmlFor="riskTolerance">What is Your Risk Tolerance?</label>
          <select
            id="riskTolerance"
            name="question_1"
            value={formData.question_1}
            onChange={handleChange}
            className={styles['form-control']}
          >
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
        </div>
        <div className={styles['question-container']}>
          <label htmlFor="investmentExperience">Select Your Investment Experience</label>
          <select
            id="investmentExperience"
            name="question_2"
            value={formData.question_2}
            onChange={handleChange}
            className={styles['form-control']}
          >
            <option value="No prior investment experience.">No Prior Investment Experience.</option>
            <option value="I've some basic knowledge but limited experience.">I've Some Basic Knowledge But Limited Experience.</option>
            <option value="I've moderate experience and have invested in various financial instruments.">I've Moderate Experience and Have Invested in Various Financial Instruments.</option>
            <option value="I'm an experienced investor with a deep understanding of financial markets.">I'm an Experienced Investor with a Deep Understanding of Financial Markets.</option>
          </select>
        </div>
        <div className={styles['question-container']}>
          <label htmlFor="annualIncome">Annual Income:</label>
          <select
            id="annualIncome"
            name="question_3"
            value={formData.question_3}
            onChange={handleChange}
            className={styles['form-control']}
          >
            <option value="Less than 1 Lakh">Less Than 1 Lakh</option>
            <option value="Between 1 to 3 Lakhs">Between 1 to 3 Lakhs</option>
            <option value="Between 3 to 5 Lakhs">Between 3 to 5 Lakhs</option>
            <option value="Above 5 Lakhs">Above 5 Lakhs</option>
            </select>
        </div>
        <div className={styles['question-container']}>
          <label htmlFor="investmentTimeHorizon">What Is Your Investment Time Horizon?</label>
          <select
            id="investmentTimeHorizon"
            name="question_4"
            value={formData.question_4}
            onChange={handleChange}
            className={styles['form-control']}
          >
            <option value="Short-term (1-3 years)">Short-Term (1-3 Years)</option>
            <option value="Medium-term (3-10 years)">Medium-Term (3-10 Years)</option>
            <option value="Long-term (10+ years)">Long-Term (10+ Years)</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default PageTwo;
