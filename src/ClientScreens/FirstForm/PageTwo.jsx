import React, { useState, useEffect } from 'react';
import Questionnaire from './../../assets/images/questionnare.svg';
import styles from './Page.module.css';
const questions = require('./dummyData.json');

const PageTwo = ({ formData, handleChange }) => {
  const [errors, setErrors] = useState({});
  const [riskLevel, setRiskLevel] = useState(null);

  const handleFormChange = (event) => {
    const { name, value } = event.target;
    handleChange(event);

    // Check if the selected value is empty for MCQ type questions
    const index = parseInt(name.split('_')[1]);
    const question = questions[index];
    const newErrors = { ...errors };

    if (question.type === 'mcq' && !value) {
      newErrors[name] = `Please select an option`;
    } else {
      delete newErrors[name];
    }

    setErrors(newErrors);
  };

  useEffect(() => {
    // Calculate cumulative score
    let cumulativeScore = 0;
    questions.forEach((question, index) => {
      const selectedOption = formData[`question_${index}`];
      if (selectedOption) {
        const selectedQuestion = question.opt.find((opt) => opt.text === selectedOption);
        if (selectedQuestion) {
          cumulativeScore += selectedQuestion.score;
        }
      }
    });

    // Update risk level based on cumulative score
    if (cumulativeScore >= 15) {
      setRiskLevel('High Risk');
    } else if (cumulativeScore >= 10) {
      setRiskLevel('Medium Risk');
    } else {
      setRiskLevel('Low Risk');
    }
  }, [formData]); // Run this effect whenever formData changes

  return (
    <div className={styles.container}>
      <div className={styles.imagecl}>
        <img src={Questionnaire} alt="Questionnaire" />
      </div>
      <div className={`${styles['form-container']} ${styles['form-container1']}`}>
        {questions.map((question, index) => (
          <div key={index} className={styles['question-container']}>
            <label htmlFor={`question_${index}`}>{question.ques}:</label>
            {question.type === 'mcq' && (
              <div>
                <select
                  id={`question_${index}`}
                  name={`question_${index}`}
                  className={styles['form-control']}
                  value={formData[`question_${index}`] || ''}
                  onChange={handleFormChange}
                >
                  <option value="">Select an option</option>
                  {question.opt.map((option, optIndex) => (
                    <option key={optIndex} value={option.text} data-score={option.score}>
                      {option.text}
                    </option>
                  ))}
                </select>
                {errors[`question_${index}`] && <span className={styles.error}>{errors[`question_${index}`]}</span>}
              </div>
            )}
          </div>
        ))}
        {riskLevel && <div className={styles['risk-level']}><strong>Recommended Risk Level:</strong> {riskLevel.split(" ")[0]}</div>}
      </div>
    </div>
  );
};

export default PageTwo;
