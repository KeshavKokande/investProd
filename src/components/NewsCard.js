import React from 'react';
import './NewsCard.css';

function NewsCard(props) {
  return (
    <div className="news-card">
      <h3>{props.title}</h3>
      <p>{props.description}</p>
      <a href={props.url} target="_blank" rel="noopener noreferrer">
        Read more
      </a>
    </div>
  );
}

export default NewsCard;