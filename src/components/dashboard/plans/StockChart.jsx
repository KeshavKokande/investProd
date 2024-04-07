import React, { useState, useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';

const StockChart = ({ stocks, days }) => {
    const [series, setSeries] = useState([]);
    const [options] = useState({
        chart: {
            type: 'line',
            height: 350
        },
        xaxis: {
            type: 'datetime'
        }
    });

    const mapStockData = (data) => {
        const stockData = {};
        data.forEach(item => {
            stockData[item.symbol] = item.qty;
        });
        return stockData;
    };

    const fetchStockData = async () => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ stocks: mapStockData(stocks), num_days: days })
        };

        try {
            const response = await fetch('http://localhost:5000/daysandgraph', requestOptions);
            const data = await response.json();
            processChartData(data);
        } catch (error) {
            console.error('Error fetching stock data:', error);
        }
    };

    const processChartData = (data) => {
        const seriesData = data.map((item) => ({
            x: new Date(item.date).getTime(),
            y: item.total_value
        }));

        setSeries([{ name: 'Total Value', data: seriesData }]);
    };

    useEffect(() => {
        fetchStockData();
    }, [stocks, days]);

    return (
        <div className="stock-chart">
            <ReactApexChart options={options} series={series} type="line" height={350} />
        </div>
    );
};

export default StockChart;
