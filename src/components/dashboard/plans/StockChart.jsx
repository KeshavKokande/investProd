import React, { Component } from 'react';
import ReactApexChart from 'react-apexcharts';

class StockChart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            series: [],
            options: {
                chart: {
                    type: 'line',
                    height: 350
                },
                xaxis: {
                    type: 'datetime'
                }
            }
        };
    }

    componentDidMount() {
        this.fetchStockData();
    }

    fetchStockData = async () => {
        const { stocks, days } = this.props;
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ stocks, num_days: days })
        };

        try {
            const response = await fetch('http://localhost:5000/daysandgraph', requestOptions);
            const data = await response.json();
            this.processChartData(data);
        } catch (error) {
            console.error('Error fetching stock data:', error);
        }
    };

    processChartData = (data) => {
        const seriesData = data.map((item) => {
            return {
                x: new Date(item.date).getTime(),
                y: item.total_value
            };
        });

        const series = [{
            name: 'Total Value',
            data: seriesData
        }];

        this.setState({ series });
    };

    render() {
        const { series, options } = this.state;

        return (
            <div className="stock-chart">
                <ReactApexChart options={options} series={series} type="line" height={350} />
            </div>
        );
    }
}

export default StockChart;
