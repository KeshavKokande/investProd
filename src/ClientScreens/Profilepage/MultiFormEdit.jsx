import React, { useState } from 'react';
import PageOne from './PageOne';
import PageTwo from './PageTwo';
import clientData from './clientans.json'; // Importing the client data

const MultiFormEdit = () => {
  const [formData, setFormData] = useState(clientData);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // You can add your form submission logic here, such as sending the form data to an API
    console.log('Form submitted:', formData);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <PageOne formData={formData.generalinfo} handleChange={handleChange} />
        <PageTwo formData={formData} handleChange={handleChange} />
        <button type="submit" className={`register-submit-btn next-button`}>Submit</button>
      </form>
    </div>
  );
};

export default MultiFormEdit;
