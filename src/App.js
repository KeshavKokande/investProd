import React, { useState, useEffect } from "react";
import PieChart from "./components/PieChart";
import LineGraph from "./components/LineGraph";
import LandingPage from "./components/LandingPage";
import chartData from "./components/chartData.json";
import "./components/LandingPage.css"
import "./App.css"
import Navbar from "./components/Navbar";
import "./components/NavBar.css"

const App = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    setData(chartData);

    // Cleanup function to destroy chart instances when component unmounts
    return () => {
      // Destroy any existing chart instances
      destroyCharts();
    };
  }, []);

  const destroyCharts = () => {
    // Destroy PieChart instance
    if (document.getElementById("pieChart")) {
      document.getElementById("pieChart").getContext("2d").canvas.remove();
    }

    // Destroy BarGraph instance
    if (document.getElementById("lineGraph")) {
      document.getElementById("lineGraph").getContext("2d").canvas.remove();
    }
  };

  // Sample data for advisors and plans
  const advisors = [
    { title: 'Advisor 1', text: 'Some text for Advisor 1.', buttonLabel: 'Button 1' },
    { title: 'Advisor 2', text: 'Some text for Advisor 2.', buttonLabel: 'Button 2' },
    { title: 'Advisor 3', text: 'Some text for Advisor 3.', buttonLabel: 'Button 3' },
    { title: 'Advisor 4', text: 'Some text for Advisor 4.', buttonLabel: 'Button 4' },
    { title: 'Advisor 5', text: 'Some text for Advisor 5.', buttonLabel: 'Button 5' },
    { title: 'Advisor 6', text: 'Some text for Advisor 6.', buttonLabel: 'Button 6' },
    { title: 'Advisor 7', text: 'Some text for Advisor 7.', buttonLabel: 'Button 7' },
    { title: 'Advisor 8', text: 'Some text for Advisor 8.', buttonLabel: 'Button 8' },
    { title: 'Advisor 9', text: 'Some text for Advisor 9.', buttonLabel: 'Button 9' },
    { title: 'Advisor 10', text: 'Some text for Advisor 10.', buttonLabel: 'Button 10' },
  ];

  const plans = [
    { title: 'Plan 1', text: 'Some text for Plan 1.', buttonLabel: 'Button 1' },
    { title: 'Plan 2', text: 'Some text for Plan 2.', buttonLabel: 'Button 2' },
    { title: 'Plan 3', text: 'Some text for Plan 3.', buttonLabel: 'Button 3' },
    { title: 'Plan 4', text: 'Some text for Plan 4.', buttonLabel: 'Button 4' },
    { title: 'Plan 5', text: 'Some text for Plan 5.', buttonLabel: 'Button 5' },
    { title: 'Plan 6', text: 'Some text for Plan 6.', buttonLabel: 'Button 6' },
    { title: 'Plan 7', text: 'Some text for Plan 7.', buttonLabel: 'Button 7' },
    { title: 'Plan 8', text: 'Some text for Plan 8.', buttonLabel: 'Button 8' },
    { title: 'Plan 9', text: 'Some text for Plan 9.', buttonLabel: 'Button 9' },
    { title: 'Plan 10', text: 'Some text for Plan 10.', buttonLabel: 'Button 10' },
  ];
  return (
    <div>
      {/* <div>
      <Navbar/>
      </div> */}
     
      <h1>Charts Example</h1>
      {/* {data && (
        <div className="container">
          <div className="cc">
            <PieChart id="pieChart" data={data.pieChartData} />
          </div>
          <div className="cc">
            <LineGraph id="lineGraph" data={data.lineGraphData} threshold={5} />
          </div>
        </div>
      )} */}
      <div>
      <LandingPage advisors={advisors} plans={plans} />
      </div>
    </div>
  );
};

export default App;

