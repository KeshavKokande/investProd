import React, { useState } from 'react';
import Questionnaire from "./../../assets/images/questionnare.svg";
import styles from "./Page.module.css";
const questions = require('./dummyData.json');

const PageTwo = ({ formData, handleChange }) => {
  const [errors, setErrors] = useState({});

  const handleFormChange = (event) => {
    const { name, value } = event.target;
    handleChange(event);

    // Check if the selected value is empty for MCQ type questions
    const index = parseInt(name.split('_')[1]); // Extracting the question index from the input name
    const question = questions[index];
    const newErrors = { ...errors };

    if (question.type === 'mcq' && !value) {
      newErrors[name] = `Please select an option`;
    } else {
      delete newErrors[name];
    }

    setErrors(newErrors);
  };

  return (
    <div className={styles.container}>
      <div className={styles.imagecl}>
        <img src={Questionnaire} alt="Questionnaire" />
      </div>
      <div className={`${styles['form-container']} ${styles['form-container1']}`}>
        {questions.map((question, index) => (
          <div key={index} className={styles['question-container']}>
            <label htmlFor={`question_${index}`}>{question.ques}:<span className={styles.required}>*</span></label>
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
              <div>
                <select
                  id={`question_${index}`}
                  name={`question_${index}`}
                  className={styles['form-control']}
                  value={formData[`question_${index}`] || ''}
                  onChange={handleFormChange}
                >
                  <option value="">Select an option</option> {/* Added default option */}
                  {question.opt.map((option, optIndex) => (
                    <option key={optIndex} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
                {errors[`question_${index}`] && <span className={styles.error}>{errors[`question_${index}`]}</span>}
              </div>
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
