
// Import React and team images
import React from 'react';
import team1 from './../../assest/images/team1.jpg'
import team2 from './../../assest/images/team2.jpg'
import team3 from './../../assest/images/team3.jpg'
import team4 from './../../assest/images/team4.jpg'
import './flip.scss'; // Make sure to create this SCSS file
import Carousel from "react-multi-carousel";


function HomepageTeam() {
  
  const teamMembers = [
    { id: 1, name: 'MD Kashif Ahmad', position: 'Software Developer', image: team1, socials: ['#', '#', '#', '#'] },
    { id: 2, name: 'Kumar Aditya', position: 'Software Developer', image: team2, socials: ['#', '#', '#', '#'] },
    { id: 3, name: 'Shubham Goswami', position: 'Software Developer', image: team3, socials: ['#', '#', '#', '#'] },
    { id: 4, name: 'Parichay', position: 'Software Developer', image: team4, socials: ['#', '#', '#', '#'] },
    // { id: 4, name: 'Parichay', position: 'Software Developer', image: team4, socials: ['#', '#', '#', '#'] },
  ];

  return (
    <section className="team_section layout_padding">
      <div className="container-fluid">
        <div className="heading_container heading_center" >
          <h2 className='teamsh2' >Our <span>Team</span></h2>
        </div>
        <div className="team_container">
          <div className="row">
          
            {teamMembers.map(member => (
              <div className="col-lg-3 col-sm-6" key={member.id}>
                <div className="flip-card">
                  <div className="flip-card-inner">
                    <div className="flip-card-front">
                      <img src={member.image} alt={member.name} />
                    </div>
                    <div className="flip-card-back">
                      <h5>{member.name}</h5>
                      <p>{member.position}</p>
                      <div className="social_box">
                        {member.socials.map((link, index) => (
                          <a href={link} key={index}>
                            <i className={`fa ${['fa-facebook', 'fa-twitter', 'fa-linkedin', 'fa-instagram'][index]}`} aria-hidden="true"></i>
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          
          </div>
        </div>
      </div>
    </section>
  );
}

export default HomepageTeam;



