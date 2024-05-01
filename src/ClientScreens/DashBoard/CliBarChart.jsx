import React, { Component } from 'react';
import CanvasJSReact from '@canvasjs/react-charts';

var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

class ApexChart extends Component {
  render() {
    const { plans_data } = this.props;

    // Define an array of colors
    const colors = ["#543FF0", "#1C4CEF", "#3E4DE7", "#4169E1", "#45766F7"];

    const dataPoints = plans_data.map((plan, index) => ({
      x: index + 1,
      y: plan.total_current_gains,
      indexLabel: plan.planName, // Show plan name as index label
      color: colors[index % colors.length] // Assign a color from the colors array
    }));

    const options = {
      animationEnabled: true,
      exportEnabled: true,
      theme: "light2",
      title: {
        // text: "Bar Chart with Plan Names"
      },
      axisY: {
        includeZero: false // Set to false to start from negative values
      },
      data: [{
        type: "column",
        indexLabelFontColor: "#5A5757",
        indexLabelPlacement: "outside",
        columnWidth: 0.1, // Adjust the width of the bars (value between 0 and 1)
        dataPoints: dataPoints
      }]
    };

    return (
      <div>
        <CanvasJSChart options={options} />
      </div>
    );
  }
}

export default ApexChart;
