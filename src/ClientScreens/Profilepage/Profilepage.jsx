import  { useState, useEffect } from 'react';
import axios from 'axios';
import GeneralInfoEditForm from './GeneralInfoEditForm';
import OtherInfoEditForm from './OtherInfoEditForm';
import './style.css';

const ProfilePage = () => {
  const [isEditingGeneral, setIsEditingGeneral] = useState(false);
  const [isEditingOther, setIsEditingOther] = useState(false);
  const [profileInfo, setProfileInfo] = useState({
    img: "",
    name: "",
    location: "",
    email: "",
    phone: "",
    address: "",
    job: "",
    values: []
  });



  useEffect(() => {
    // Fetch profile information from API
    axios.get('https://9d47-103-226-169-60.ngrok-free.app/first')
      .then(response => {
        setProfileInfo(response.data);
      })
      .catch(error => {
        console.error('Error fetching profile information:', error);
      });
  }, []);


  const handleGeneralEdit = () => {
    setIsEditingGeneral(true);
  };

  const handleOtherEdit = () => {
    setIsEditingOther(true);
  };

  const handleGeneralSave = (editedInfo) => {
    console.log("Edited general info:", editedInfo);
    // Call API to save edited general information
    axios.put('api/updateGeneralInfo', editedInfo)
      .then(response => {
        setProfileInfo(prevState => ({
          ...prevState,
          email: response.data.email,
          phone: response.data.phone,
          address: response.data.address,
          job: response.data.job
        }));
        setIsEditingGeneral(false);
      })
      .catch(error => {
        console.error('Error updating general information:', error);
      });
  };

  const handleOtherSave = (editedInfo) => {
    console.log("Edited other info:", editedInfo);
    // Call API to save edited other information
    axios.put('api/updateOtherInfo', editedInfo)
      .then(response => {
        setProfileInfo(prevState => ({
          ...prevState,
          values: response.data
        }));
        setIsEditingOther(false);
      })
      .catch(error => {
        console.error('Error updating other information:', error);
      });
  };

  return (
    <div className="profile-outer">
      <div className='one'>
        <div className="card oneone">
          <img src={profileInfo.img} alt="Profile Image" className="profile-image" />
          <h4>{profileInfo.name}</h4>
          <div className="card-body">
            <h4>{profileInfo.location}</h4>
          </div>
        </div>
      </div>
      <div className='two'>
        <div className="card twoone">
          <div className="card-header">
            General Information
            <span onClick={handleGeneralEdit} className="edit-icon">✎</span>
          </div>
          <div className="card-body">
            <p><strong>Email:</strong> {profileInfo.email}</p>
            <p><strong>Phone:</strong> {profileInfo.phone}</p>
            <p><strong>Address:</strong> {profileInfo.address}</p>
            <p><strong>Job Title:</strong> {profileInfo.job}</p>
          </div>
        </div>
        <div className="card twoone">
          <div className="card-header">
            Other Information
            <span onClick={handleOtherEdit} className="edit-icon">✎</span>
          </div>
          <div className="card-body">
            {profileInfo.values.map((attribute, index) => (
              <div key={index}>
                <h4>{attribute.name}</h4>
                <progress value={attribute.value} max={100} />
                <hr />
              </div>
            ))}
          </div>
        </div>
      </div>
      {isEditingGeneral && <GeneralInfoEditForm initialValues={profileInfo} onSave={handleGeneralSave} onCancel={() => setIsEditingGeneral(false)} />}
      {isEditingOther && <OtherInfoEditForm initialValues={profileInfo.values} onSave={handleOtherSave} onCancel={() => setIsEditingOther(false)} />}
    </div>
  );

  
};

export default ProfilePage;