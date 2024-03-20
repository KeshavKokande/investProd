import React from 'react';
import Questionnare from "./../../assets/images/questionnare.svg";
const questions = require('./dummyData.json');

const PageTwo = ({ formData, handleChange }) => {
  const handleFormChange = (event) => {
    handleChange(event); // Call handleChange from MultiStepForm
  };

  return (
    <div className="container">
      <div className="imagecl">
        <img src={Questionnare} alt="Questionnaire" />
      </div>
      <div className="form-container form-container1">
        {questions.map((question, index) => (
          <div key={index} className="question-container">
            <label htmlFor={`question_${index}`}>{question.ques}</label>
            {question.type === 'subjective' && (
              <textarea
                id={`question_${index}`}
                name={`question_${index}`}
                className="form-control"
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
                    className="form-control"
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
                    className="form-control"
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
                className="form-control"
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
                className="form-control"
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
