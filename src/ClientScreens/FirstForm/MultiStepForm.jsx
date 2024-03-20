import React, { useState } from 'react';
import { Stepper, Step } from 'react-form-stepper';
import './Page.css';
import PageOne from './PageOne';
import PageTwo from './PageTwo';
import PageThree from './PageThree';
import { useLocation, useNavigate } from 'react-router-dom'; 

const MultiStepForm = () => {
  const location = useLocation(); 
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search); 
  const initialName = sessionStorage.getItem('name') || '';
  const initialEmail = sessionStorage.getItem('email') || '';
  const [formData, setFormData] = useState({
    name: initialName,
    email: initialEmail,
    age: '',
    gender: '',
    qualification: '',
    address: '',
    jobRole: '',
    agreement: false,
    photoId: ''
  });

  const [activeStep, setActiveStep] = useState(0);
  const [formErrors, setFormErrors] = useState({});
  const [termsAgreed, setTermsAgreed] = useState(false);

  const handleFormChange = (event) => {
    const { name, value, type, checked } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const validatePageOne = () => {
    const errors = {};
    if (!formData.age) errors.age = 'Age is required';
    if (!formData.qualification) errors.qualification = 'Qualification is required';
    if (!formData.address) errors.address = 'Address is required';
    if (!formData.jobRole) errors.jobRole = 'Job Role is required';
    return errors;
  };

  const validatePageTwo = () => {
    return {};
  };

  const validatePageThree = () => {
    const errors = {};
    if (!formData.agreement) errors.agreement = 'You must agree to the terms and conditions';
    return errors;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Form submitted:', formData);
  };

  const nextStep = () => {
    let errors = {};
    switch (activeStep) {
      case 0:
        errors = validatePageOne();
        break;
      case 1:
        errors = validatePageTwo();
        break;
      case 2:
        errors = validatePageThree();
        break;
      default:
        break;
    }
    
    if (Object.keys(errors).length === 0) {
      setActiveStep(activeStep + 1);
      setFormErrors({});
    } else {
      alert(Object.values(errors).join('\n'));
      setFormErrors(errors);
    }
  };
  
  const prevStep = () => {
    setActiveStep(activeStep - 1);
    setFormErrors({});
  };

  const handleAgreementChange = () => {
    setFormData({ ...formData, agreement: !formData.agreement });
    setTermsAgreed(!termsAgreed);
  };

  return (
    <>
      <Stepper activeStep={activeStep}>
        <Step label="Personal Details" />
        <Step label="Questionnaire" />
        <Step label="Terms & Conditions" />
      </Stepper>

      <form onSubmit={handleSubmit} encType="multipart/form-data">
        {activeStep === 0 && (
          <PageOne formData={formData} handleChange={handleFormChange} />
        )}
        {activeStep === 1 && (
          <PageTwo formData={formData} handleChange={handleFormChange} />
        )}
        {activeStep === 2 && (
          <PageThree agreed={formData.agreement} handleCheckboxChange={handleAgreementChange} />
        )}
        <div className={`btns ${termsAgreed ? 'terms-agreed' : ''}`}>
          {activeStep < 2 && (
            <button type="button" className='next-button' onClick={nextStep}>Next</button>
          )}
          {activeStep > 0 && (
            <button type="button" className='prev-button' onClick={prevStep}>Back</button>
          )}
          {activeStep === 2 && formData.agreement && (
            <button className={`register-submit-btn next-button`} type="submit">Submit</button>
          )}
        </div>
        {Object.keys(formErrors).length > 0 && (
          <div className="error-message">
            {Object.values(formErrors).map((error, index) => (
              <p key={index}>{error}</p>
            ))}
          </div>
        )}
      </form>
    </>
  );
};

export default MultiStepForm;