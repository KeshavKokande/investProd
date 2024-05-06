import React, { useState, useEffect } from 'react';
import NewsCard from './NewsCard';
import axios from 'axios';
import Arraay from './Arraay';
import LineGraph from './LineGraph';
import PieChart from './PieChart';
import chartData from "./chartData.json";

function LandingPage(props) {
  const [data, setData] = useState(null);
  const [newsArticles, setNewsArticles] = useState([]);

  useEffect(() => {
    setData(chartData);

    // Cleanup function to destroy chart instances when component unmounts
    return () => {
      // Destroy any existing chart instances
      destroyCharts();
    };
  }, []);

  useEffect(() => {
    axios
      .get(
        'https://newsapi.org/v2/top-headlines?country=in&category=business&apiKey=d8252cced4694cf59ef6f19e2e2a81e2&pageSize=10'
      )
      .then(res => setNewsArticles(res.data.articles))
      .catch(err => console.log(err));
  }, []);

  const destroyCharts = () => {
    // Destroy PieChart instance
    if (document.getElementById("pieChart")) {
      document.getElementById("pieChart").getContext("2d").canvas.remove();
    }

    // Destroy LineGraph instance
    if (document.getElementById("lineGraph")) {
      document.getElementById("lineGraph").getContext("2d").canvas.remove();
    }
  };

  return (
    <div>
      {data && (
        <div className="container">
          <div className="chart-container">
            <PieChart id="pieChart" data={data.pieChartData} />
          </div>
          <div className="chart-container">
            <LineGraph id="lineGraph" data={data.lineGraphData} threshold={5} />
          </div>
        </div>
      )}

      <div>
        <h1 style={{color: "white"}}>Carousel of advisors</h1>
        <Arraay cards={props.advisors} />
        <br/>
        <h1 style={{color: "white"}}>Carousel of plans</h1>
        <Arraay cards={props.plans} />
        <br/>
        <h2 style={{color: "white"}}>Latest News</h2>
        <br/>
        <div className="news-cards-container">
          {newsArticles.map(article => (
            <NewsCard
              key={article.url}
              title={article.title}
              description={article.description}
              url={article.url}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
