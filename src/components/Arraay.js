import React from 'react';
import Card from './Card';
import Carousel from "react-multi-carousel";
import 'react-multi-carousel/lib/styles.css';
 
const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 5
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1
  }
};
 
const Arraay = ({ cards }) => (
  <Carousel responsive={responsive} infinite={true} autoPlay={true} autoPlaySpeed={3000}>
    {cards.map((card, index) => (
      <div key={index}>
        <Card title={card.title} text={card.text} buttonLabel={card.buttonLabel} />
      </div>
    ))}
  </Carousel>
);
 
export default Arraay;