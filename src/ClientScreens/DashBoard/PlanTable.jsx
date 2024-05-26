import React, { useState, useEffect } from 'react';
import { Table } from 'antd';
import styles from './dashboard.module.css';

// Format currency function
const formatCurrency = (value) => {
  const parsedValue = parseFloat(value).toFixed(2);
  const stringValue = String(parsedValue);
  const [integerPart, decimalPart] = stringValue.split(".");
  const formattedIntegerPart = Number(integerPart).toLocaleString("en-IN");
  const formattedValue = `₹${formattedIntegerPart}${decimalPart ? `.${decimalPart}` : ''}`;
  return formattedValue;
};

// Format date function
const formatDate = (dateString) => {
  const [day, month, year] = dateString.split('-');
  const date = new Date(year, month - 1, day);
  if (isNaN(date)) {
    return 'Invalid Date';
  }
  const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
  return date.toLocaleDateString('en-GB', options);
};

const PlanTable = ({ data, pnl }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage] = useState(5);

  const addProfitPercent = (plans, profits) => {
    // Create a map for quick lookup of profit percent by planName
    const profitMap = new Map();
    profits.forEach(profit => {
      profitMap.set(profit.planName, parseFloat(profit.profit_percent));
    });

    // Add profit_percent to each plan
    return plans.map(plan => ({
      ...plan,
      profit_percent: profitMap.get(plan.planName) || 0
    }));
  };

  const enrichedData = addProfitPercent(data, pnl);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Render text color based on positive or negative value
  const renderReturns = (value) => {
    const color = value >= 0 ? 'green' : 'red';
    return <span style={{ color }}>{value}%</span>;
  };

  const columns = [
    {
      title: 'Plan Name',
      dataIndex: 'planName',
      key: 'planName',
    },
    {
      title: 'Advisor Name',
      dataIndex: 'advisorName',
      key: 'advisorName',
    },
    {
      title: 'Total Amount Invested',
      dataIndex: 'total_investedamount',
      key: 'total_investedamount',
      render: (value) => formatCurrency(value), // Apply formatCurrency function
    },
    {
      title: 'Latest Transaction Date',
      dataIndex: 'last_date_to_investment',
      key: 'last_date_to_investment',
      render: (dateString) => formatDate(dateString), // Apply formatDate function
    },
    {
      title: 'Returns',
      dataIndex: 'profit_percent',
      key: 'profit_percent',
      render: (value) => renderReturns(value),
    },
  ];

  return (
    <section className={styles.contentAreaTable} style={{ borderRadius: '0.7rem' }}>
      <div className={styles.dataTableInfo}>
      </div>
      <div className={styles.dataTableDiagram}>
        <Table
          columns={columns}
          dataSource={enrichedData}
          pagination={{
            current: currentPage,
            pageSize: perPage,
            total: enrichedData.length,
            onChange: handlePageChange,
          }}
          rowKey={(record) => record.planName}
        />
      </div>
    </section>
  );
};

export default PlanTable;