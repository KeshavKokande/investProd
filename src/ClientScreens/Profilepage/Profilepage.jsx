import  { useState, useEffect } from 'react';
import axios from 'axios';
import GeneralInfoEditForm from './GeneralInfoEditForm';
import OtherInfoEditForm from './OtherInfoEditForm';
import './style.css';
import './pp.css';
import data from  "./clientans.json";
import { Link } from 'react-router-dom/dist';

const ProfilePage = () => {
  const [isEditingGeneral, setIsEditingGeneral] = useState(false);
  const [isEditingOther, setIsEditingOther] = useState(false);
  const [profileInfo, setProfileInfo] = useState({
    img: "",
    name: "",
    location: "Pune",
    email: "",
    phone: "000000000",
    address: "adress abcdefghijk lmnopqrst",
    job: "S/W Developer",
    values: []
  });



  const [plansData, setPlansData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPlansData = async () => {
      console.log("Started fetching plans data");
      try {
        const response = await fetch('http://localhost:8000/api/v1/Client/get-own-details', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          },
          credentials: 'include'
        });

        if (!response.ok) {
          throw new Error('Failed to fetch plans data');
        }

        const data = await response.json();
        setPlansData(data.client);
        console.log(data); // Log the data received from the API
        setIsLoading(false); // Set loading state to false after data is fetched

      } catch (error) {
        console.error('Error fetching plans data:', error.message);
      }
    };

    fetchPlansData();
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

    <div className='ppfull'>
    

      <div className='pp'>

        <div className='pp1'>

              <img
                  src={profileInfo.img}
                  alt="Placeholder Image"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'https://avatar.iran.liara.run/public/boy'; 
                  }}
                  className="profile-image"
                />


        </div>

        <div className='pp2'>

          <div className='pp21'>

            <div className='pp211'>

            <div  className='info-cont'>

            <p className='ppp'><strong>Name:</strong> &nbsp; {plansData.name}</p>
            <p className='ppp'><strong>Email:</strong> &nbsp; {plansData.email}</p>
            <p className='ppp'><strong>Age:</strong> &nbsp; {profileInfo.job}</p>
            <p className='ppp'><strong>Job Title:</strong> &nbsp; {profileInfo.job}</p>

            </div>

            <div className='info-cont'>

            <p className='ppp'><strong>Phone:</strong> &nbsp; {profileInfo.phone}</p>
            <p className='ppp'><strong>Address:</strong> &nbsp; {profileInfo.address}</p>
            <p className='ppp'><strong>Qualification:</strong> &nbsp; {profileInfo.job}</p>
            <p className='ppp'><strong>Gender:</strong> &nbsp; {profileInfo.job}</p>
              

            </div>



          
          </div>

          <hr/>

          <div className='pp212'>

          <div>

            <div className='info-cont'>
              {data.otherinfo.map((item, index) => (
                <div key={index}>
                  <p className='jsonp'><strong>{item.field}:</strong> &nbsp;{item.ans}</p>
                </div>
              ))}
            </div>


              
                

              </div>
          
          </div>

          <div className='pp213'>
          <Link to={"/clform"}>
          <button
                style={{
                  backgroundColor: "#475BE8",
                  color: "white",
                  padding: "1rem 1rem",
                  borderRadius: "0.3rem",
                  border: "none",
                  boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                  cursor: "pointer"
                }}
              >
                ✎Edit 
              </button></Link>
          </div>

          </div>
     

        </div>
        
      </div>


    </div>

  );



  
};

export default ProfilePage;