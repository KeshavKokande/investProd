import React, { useState, useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';
import styles from './../../../ClientScreens/Plans/Plans.module.css';
import axios from 'axios';

const StockChart = ({ stocks, days, setc }) => {
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

    const calculateCAGR = (oldestValue, latestValue, years) => {
        const cagr = Math.pow((latestValue / oldestValue), 1 / years) - 1;
        return (cagr * 100).toFixed(2); // Convert to percentage with 2 decimal places
    };

    const mapStockData = (data) => {
        const stockData = {};
        data.forEach(item => {
            stockData[item.symbol] = item.qty;
        });
        return stockData;
    };

    const fetchData = async () => {
        const requestData = {
            stocks: mapStockData(stocks),
            num_days: days
        };

        try {
            const response = await axios.post('https://team4api.azurewebsites.net/api/v1/stock/calculate_total_value', JSON.stringify(requestData), {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            console.log('API Response:', response.data); // Log API response
            let data = response.data.data; // Access data property from response
            data = data.sort((a, b) => new Date(a.date) - new Date(b.date));
            processChartData(data);
            const oldestData = data[0];
            const latestData = data[data.length - 1];
            const oldestValue = oldestData.total_value;
            const latestValue = latestData.total_value;
            const years = 1; // Fixed to one year
            if (setc) {
                setc(calculateCAGR(oldestValue, latestValue, years));
            }
        } catch (error) {
            console.error('Error fetching stock data:', error);
        }
    };

    const processChartData = (data) => {
        const seriesData = data.map((item) => ({
            x: new Date(item.date + 'T00:00:00').getTime(), // Ensure the date is properly formatted and parsed
            y: parseFloat(item.total_value.toFixed(2))
        }));
        console.log('Series Data:', seriesData); // Log processed series data
        setSeries([{ name: 'Total Value', data: seriesData }]);
    };

    useEffect(() => {
        fetchData();
    }, [stocks, days]);

    return (
        <div className={styles.stock_chart}>
            <ReactApexChart options={options} series={series}  height={350} />
        </div>
    );
};

export default StockChart;
