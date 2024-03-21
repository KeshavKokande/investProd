import React from 'react';
import Questionnare from "./../../assets/images/questionnare.svg";
import questionsData from './dummyData.json'; // Importing the questions data

const PageTwo = ({ formData, handleChange }) => {
  const handleFormChange = (event) => {
    handleChange(event); // Call handleChange from MultiStepForm
  };

  const renderInputField = (question) => {
    switch (question.type) {
      case 'subjective':
        return (
          <textarea
            id={question.ques}
            name={question.ques}
            className="form-control"
            value={formData.otherinfo.find(info => info.field === question.ques)?.ans || ''}
            onChange={handleFormChange}
          />
        );
      case 'mcq':
        return (
          <select
            id={question.ques}
            name={question.ques}
            className="form-control"
            value={formData.otherinfo.find(info => info.field === question.ques)?.ans || ''}
            onChange={handleFormChange}
          >
            {question.opt.map((option, optIndex) => (
              <option key={optIndex} value={option}>
                {option}
              </option>
            ))}
          </select>
        );
      case 'yes_no':
        return (
          <div>
            <label>
              <input
                type="radio"
                name={question.ques}
                value="yes"
                className="form-control"
                checked={formData.otherinfo.find(info => info.field === question.ques)?.ans === 'yes'}
                onChange={handleFormChange}
              />{' '}
              Yes
            </label>
            <label>
              <input
                type="radio"
                name={question.ques}
                value="no"
                className="form-control"
                checked={formData.otherinfo.find(info => info.field === question.ques)?.ans === 'no'}
                onChange={handleFormChange}
              />{' '}
              No
            </label>
          </div>
        );
      case 'range_10':
        return (
          <input
            type="range"
            min="0"
            max="10"
            defaultValue="5"
            id={question.ques}
            name={question.ques}
            className="form-control"
            value={formData.otherinfo.find(info => info.field === question.ques)?.ans || ''}
            onChange={handleFormChange}
          />
        );
      // Add cases for other question types as needed
      default:
        return null;
    }
  };

  return (
    <div className="container">
      <div className="image">
        <img src={Questionnare} alt="Questionnaire" />
      </div>
      <div className="form-container form-container1">
        {questionsData.map((question, index) => (
          <div key={index} className="question-container">
            <label htmlFor={question.ques}>{question.ques}</label>
            {renderInputField(question)}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PageTwo;
