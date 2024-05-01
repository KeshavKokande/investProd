// import React, { useEffect, useState } from 'react';
// import ReactApexChart from 'react-apexcharts';
// import styles from './dashboard.module.css'

// const ApexChart = ({ plans_data, widthChart }) => {
//   const [seriesData, setSeriesData] = useState([]);
//   const [options, setOptions] = useState({
//     chart: {
//       height: 200,
//       type: 'bar',
//     },
//     plotOptions: {
//       bar: {
//         borderRadius: 0,
//         columnWidth: '50%',
//       }
//     },
//     dataLabels: {
//       enabled: false
//     },
//     stroke: {
//       width: 2
//     },
    
//     grid: {
//       row: {
//         colors: ['#fff', '#f2f2f2']
//       }
//     },
//     xaxis: {
//       labels: {
//         rotate: -45
//       },
//       tickPlacement: 'on',
//     },
//     fill: {
//       type: 'gradient',
//       gradient: {
//         shade: 'light',
//         type: "horizontal",
//         shadeIntensity: 0.25,
//         gradientToColors: undefined,
//         inverseColors: true,
//         opacityFrom: 0.85,
//         opacityTo: 0.85,
//         stops: [50, 0, 100]
//       },
//     }
//   });

//   useEffect(() => {
//     console.log("Data from Flask:", plans_data);
//     prepareChartData();
//   }, [plans_data]);

//   const prepareChartData = () => {
//     if (!plans_data) {
//       // Handle the case where plans_data is null or undefined
//       return;
//     }
  
//     const newSeriesData = plans_data.map((plan) => ({
//       name: plan.planName,
//       data: [plan.total_current_gains],
//     }));
  
//     setSeriesData(newSeriesData);
//   };
  
//   return (
//     <div>
//       <div id="chart" style={{display:'grid', justifyItems:'center', paddingBottom:'20px'}}>
//         <ReactApexChart options={options} series={seriesData} type="bar" height={250} width={widthChart}/>
//       </div>
//     </div>
//   );
// };

// export default ApexChart;


// import React, { Component } from 'react';
// import CanvasJSReact from '@canvasjs/react-charts';

// var CanvasJS = CanvasJSReact.CanvasJS;
// var CanvasJSChart = CanvasJSReact.CanvasJSChart;

// class ApexChart extends Component {
//   render() {
//     const { plans_data } = this.props;

//     const oldData = plans_data.map(plan => ({
//       label: plan.planName,
//       y: plan.total_current_gains
//     }));

//     const dummyData = [
//       { label: "Dummy1", y: 150 },
//       { label: "Dummy2", y: 200 },
//       { label: "Dummy3", y: 250 },
//       { label: "Dummy4", y: 300 },
//       { label: "Dummy5", y: 350 }
//     ];

//     const axisYOptions = plans_data.map(plan => ({
//       title: plan.planName,
//       titleFontColor: "#4F81BC",
//       lineColor: "#4F81BC",
//       labelFontColor: "#4F81BC",
//       tickColor: "#4F81BC"
//     }));
// // **********************************************************************************************
//     // Find the minimum and maximum values in plans_data for axisY
// const minYValue = Math.min(...plans_data.map(plan => plan.total_current_gains));
// const maxYValue = Math.max(...plans_data.map(plan => plan.total_current_gains));
// // Determine the absolute maximum value of axisY
// const absMaxYValue = Math.max(Math.abs(minYValue), Math.abs(maxYValue));

// const options = {
//   animationEnabled: true,
//   title: {
//     text: ""
//   },
//   axisX: {
//     title: "Plan Name",
//     titleFontColor: "#4F81BC",
//     lineColor: "#4F81BC",
//     labelFontColor: "#4F81BC",
//     tickColor: "#4F81BC"
//   },
//   axisY: {
//     title: "Data",
//     titleFontColor: "#4F81BC",
//     lineColor: "#4F81BC",
//     labelFontColor: "#4F81BC",
//     tickColor: "#4F81BC",
//     minimum: -absMaxYValue, // Set minimum value of axisY to the negative of the absolute maximum value in plans_data
//     maximum: absMaxYValue // Set maximum value of axisY to the absolute maximum value in plans_data
//   },
//   axisY2: {
//     title: "Dummy Data",
//     titleFontColor: "#C0504E",
//     lineColor: "#C0504E",
//     labelFontColor: "#C0504E",
//     tickColor: "#C0504E",
//     minimum: 0, // Set minimum value of axisY2 to 0
//     maximum: Math.ceil(Math.max(...dummyData.map(data => data.y)) * 1.1) // Adjust maximum value of axisY2 based on your dummy data
//   },
//   toolTip: {
//     shared: true
//   },
//   legend: {
//     cursor: "pointer",
//     itemclick: this.toggleDataSeries
//   },
//   data: [{
//     type: "column",
//     name: "Data",
//     legendText: "Data",
//     showInLegend: true,
//     dataPoints: oldData
//   },
//   {
//     type: "column",
//     name: "Dummy Data",
//     legendText: "Dummy Data",
//     axisYType: "secondary",
//     showInLegend: true,
//     dataPoints: dummyData,
//     color: "#818589"
//   }]
// };
// // ******************************************************************************************************

//     return (
//       <div>
//         <CanvasJSChart options={options} />
//       </div>
//     );
//   }

//   toggleDataSeries(e) {
//     if (typeof(e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
//       e.dataSeries.visible = false;
//     }
//     else {
//       e.dataSeries.visible = true;
//     }
//     e.chart.render();
//   }
// }

// export default ApexChart;


/* App.js */
import React, { Component } from 'react';
import CanvasJSReact from '@canvasjs/react-charts';
 
var CanvasJSChart = CanvasJSReact.CanvasJSChart;
 
class App extends Component { 
	constructor() {
		super();
		this.toggleDataSeries = this.toggleDataSeries.bind(this);
	}
	
	toggleDataSeries(e){
		if (typeof(e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
			e.dataSeries.visible = false;
		}
		else{
			e.dataSeries.visible = true;
		}
		this.chart.render();
	}
	
	render() {
		const { plans_data } = this.props;
		console.log(plans_data);
		const options = {
			theme: "light2",
			animationEnabled: true,
			// title:{
			// 	text: "Units Sold VS Profit"
			// },
			axisX: {
				title: "States"
			},
			axisY: {
				title: "Clients Bought",
				titleFontColor: "#6D78AD",
				lineColor: "#6D78AD",
				labelFontColor: "#6D78AD",
				tickColor: "#6D78AD"
			},
			axisY2: {
				title: "Investment",
				titleFontColor: "#51CDA0",
				lineColor: "#51CDA0",
				labelFontColor: "#51CDA0",
				tickColor: "#51CDA0"
			},
			toolTip: {
				shared: true
			},
			legend: {
				cursor: "pointer",
				itemclick: this.toggleDataSeries
			},
			data: [{
				type: "column",
				name: "Units Sold",
				showInLegend: true,
				xValueFormatString: "MMM YYYY",
				yValueFormatString: "#,##0 Units",
				dataPoints: [
					{ x: new Date(2017, 0, 1), y: 120 },
					{ x: new Date(2017, 1, 1), y: 135 },
					{ x: new Date(2017, 2, 1), y: 144 },
					{ x: new Date(2017, 3, 1), y: 103 },
					{ x: new Date(2017, 4, 1), y: 93 },
					{ x: new Date(2017, 5, 1), y: 129 },
					{ x: new Date(2017, 6, 1), y: 143 },
					{ x: new Date(2017, 7, 1), y: 156 },
					{ x: new Date(2017, 8, 1), y: 122 },
					{ x: new Date(2017, 9, 1), y: 106 },
					{ x: new Date(2017, 10, 1), y: 137 },
					{ x: new Date(2017, 11, 1), y: 142 }
				]
			},
			{
				type: "column",
				name: "Profit",
				axisYType: "secondary",
				showInLegend: true,
				xValueFormatString: "MMM YYYY",
				yValueFormatString: "$#,##0.#",
				dataPoints: [
					{ x: new Date(2017, 0, 1), y: 19034.5 },
					{ x: new Date(2017, 1, 1), y: 20015 },
					{ x: new Date(2017, 2, 1), y: 27342 },
					{ x: new Date(2017, 3, 1), y: 20088 },
					{ x: new Date(2017, 4, 1), y: 20234 },
					{ x: new Date(2017, 5, 1), y: 29034 },
					{ x: new Date(2017, 6, 1), y: 30487 },
					{ x: new Date(2017, 7, 1), y: 32523 },
					{ x: new Date(2017, 8, 1), y: 20234 },
					{ x: new Date(2017, 9, 1), y: 27234 },
					{ x: new Date(2017, 10, 1), y: 33548 },
					{ x: new Date(2017, 11, 1), y: 32534 }
				]
			}]
		}
		
		var containerStyle = {
			// height: "250px",
			// width: "700px"
		};
		
		return (
			<div style={containerStyle}>
				<CanvasJSChart options={options} 
					onRef={ref => this.chart = ref}
				/>
				{/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
			</div>
		);
	}	
}

export default App;