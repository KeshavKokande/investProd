


import { Link } from 'react-router-dom';
import './AdvisorProfile.css';

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import CoverOne from './../../assest/images/cover-01.png';
import avatarBoy from "../../assets/images/avator.svg";

const AdvisorProfilePage = () => {
  const { advisor_id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [advisors, setAdvisors] = useState([]);


  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchData = async () => {
      try {
        const advisorsResponse = await fetch(`https://team4api.azurewebsites.net/api/v1/Client/get-all-advisors`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        });


        if (!advisorsResponse.ok) {
          throw new Error('Failed to fetch data');
        }

        const advisorsData = await advisorsResponse.json();


        setAdvisors(advisorsData.listOfNamesOfAdvisors);

        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error.message);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const advisor = advisors.find((adv) => adv._id === advisor_id);


  if (!advisor) {
    return <div>No data available for this advisor</div>;
  }

  return (


    <div className="overflow-hidden rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">

    

      <div className="px-4 pb-6 text-center lg:pb-8 xl:pb-11.5 pt-6 lg:pt-8 xl-pt-11.5">
        <div className="relative z-30 mx-auto -mt-22 h-30 w-full max-w-30 rounded-full bg-white/20 p-1 backdrop-blur sm:h-44 sm:max-w-44 sm:p-3">
          <div className="relative drop-shadow-2">
            <img className="adv-img" src={avatarBoy} alt="profile" />

          </div>
        </div>
        <div className="mt-4">
          <h3 className="mb-1.5 text-2xl font-semibold text-black dark:text-white">
            {advisor.name}
          </h3>
          <p className="font-medium">{advisor.email}</p>
          {/* <div>🚀: {new Date(advisor.createdAt).toLocaleDateString()}</div> */}
          <div>Date of Joining: {new Date(advisor.createdAt).toLocaleDateString()}</div>

          <div className="mx-auto max-w-180">
            <br />

            <h4 className="font-semibold text-black dark:text-white">
              About Me
            </h4>
            <p className="mt-4.5">
            {advisor.description}
            </p>
          </div>

                  </div>
      </div>
    </div>

   

  );
};

export default AdvisorProfilePage;
