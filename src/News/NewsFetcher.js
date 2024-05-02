// NewsFetcher.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const NewsFetcher = ({ children }) => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get('https://api.nytimes.com/svc/topstories/v2/business.json?api-key=JdjDRJVla0Pkg1dPJTqO6nf43oIBNf6W');
        if (response.status === 200 && response.data.results) {
          console.count('fetching news..');
          const articles = response.data.results.filter(news => news.item_type === 'Article');
          setNews(articles);
        }
      } catch (error) {
        console.error('Error fetching news:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  return loading ? <p>Loading...</p> : React.Children.map(children, child =>
    React.cloneElement(child, { news })
  );
};

export default NewsFetcher;
