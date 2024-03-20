import  { useState } from 'react';

const GeneralInfoEditForm = ({ initialValues, onSave, onCancel }) => {
  const [editedValues, setEditedValues] = useState(initialValues);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedValues({ ...editedValues, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(editedValues);
  };

  return (
    <div className="overlay">
      <div className="edit-form">
        <h2>Edit General Information</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="text"
              id="email"
              name="email"
              value={editedValues.email}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="phone">Phone</label>
            <input
              type="text"
              id="phone"
              name="phone"
              value={editedValues.phone}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="address">Address</label>
            <input
              type="text"
              id="address"
              name="address"
              value={editedValues.address}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="job">Job Title</label>
            <input
              type="text"
              id="job"
              name="job"
              value={editedValues.job}
              onChange={handleChange}
            />
          </div>
          <div className="form-buttons">
            <button type="submit">Save</button>
            <button type="button" onClick={onCancel}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default GeneralInfoEditForm;
