import React from 'react';
import Questionnaire from "./../../assets/images/questionnare.svg";
import styles from "./Page.module.css";
const questions = require('./dummyData.json');

const PageTwo = ({ formData, handleChange }) => {
  const handleFormChange = (event) => {
    handleChange(event); // Call handleChange from MultiStepForm
  };

  return (
    <div className={styles.container}>
      <div className={styles.imagecl}>
        <img src={Questionnaire} alt="Questionnaire" />
      </div>
      <div className={`${styles['form-container']} ${styles['form-container1']}`}>
        {questions.map((question, index) => (
          <div key={index} className={styles['question-container']}>
            <label htmlFor={`question_${index}`}>{question.ques}</label>
            {question.type === 'subjective' && (
              <textarea
                id={`question_${index}`}
                name={`question_${index}`}
                className={styles['form-control']}
                value={formData[`question_${index}`] || ''}
                onChange={handleFormChange}
              ></textarea>
            )}
            {question.type === 'yes_no' && (
              <div>
                <label>
                  <input
                    type="radio"
                    name={`question_${index}`}
                    value="yes"
                    className={styles['form-control']}
                    checked={formData[`question_${index}`] === 'yes'}
                    onChange={handleFormChange}
                  />{' '}
                  Yes
                </label>
                <label>
                  <input
                    type="radio"
                    name={`question_${index}`}
                    value="no"
                    className={styles['form-control']}
                    checked={formData[`question_${index}`] === 'no'}
                    onChange={handleFormChange}
                  />{' '}
                  No
                </label>
              </div>
            )}
            {question.type === 'mcq' && (
              <select
                id={`question_${index}`}
                name={`question_${index}`}
                className={styles['form-control']}
                value={formData[`question_${index}`] || ''}
                onChange={handleFormChange}
              >
                {question.opt.map((option, optIndex) => (
                  <option key={optIndex} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            )}
            {question.type === 'range_10' && (
              <input
                type="range"
                min="0"
                max="10"
                defaultValue="5"
                id={`question_${index}`}
                name={`question_${index}`}
                className={styles['form-control']}
                value={formData[`question_${index}`] || ''}
                onChange={handleFormChange}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PageTwo;