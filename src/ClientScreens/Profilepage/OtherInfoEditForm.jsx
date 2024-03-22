import { useState } from 'react';
import styles from "./style.module.css";

const OtherInfoEditForm = ({ initialValues, onSave, onCancel }) => {
  const [editedValues, setEditedValues] = useState([...initialValues]);

  const handleChange = (index, value) => {
    const updatedValues = [...editedValues];
    updatedValues[index].value = parseInt(value); // Ensure the value is parsed as an integer
    setEditedValues(updatedValues);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(editedValues);
  };

  return (
    <div className={styles.overlay}>
      <div className={styles['edit-form']}>
        <h2>Edit Other Information</h2>
        <form onSubmit={handleSubmit}>
          {editedValues.map((item, index) => (
            <div key={index} className={styles['form-group']}>
              <label>{item.name}</label>
              <input
                type="number"
                min="0"
                max="100"
                value={editedValues[index].value}
                onChange={(e) => handleChange(index, e.target.value)}
              />
            </div>
          ))}
          <div className={styles['form-buttons']}>
            <button type="submit">Save</button>
            <button type="button" onClick={onCancel}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default OtherInfoEditForm;