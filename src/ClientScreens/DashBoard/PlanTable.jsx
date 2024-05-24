import React, { useState } from 'react';
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
  const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
  const formattedDate = new Date(dateString).toLocaleDateString(undefined, options);
  return formattedDate;
};

const PlanTable = ({ data, pnl }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage] = useState(5);

  const addProfitPercent = (plans, profits) => {
    const profitMap = new Map();
    profits.forEach(profit => {
      profitMap.set(profit.planName, parseFloat(profit.profit_percent));
    });

    return plans.map(plan => ({
      ...plan,
      profit_percent: profitMap.get(plan.planName) || 0
    }));
  };

  data = addProfitPercent(data, pnl);

  // Sort data by total amount invested and latest transaction date in ascending order
  data = data.sort((a, b) => {
    const dateA = new Date(a.last_date_to_investment);
    const dateB = new Date(b.last_date_to_investment);
    if (dateA - dateB !== 0) {
      return dateA - dateB;
    }
    return parseFloat(a.total_investedamount) - parseFloat(b.total_investedamount);
  });

  const handlePageChange = (page) => {
    setCurrentPage(page);
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
      render: (value) => formatCurrency(value),
    },
    {
      title: 'Latest Transaction Date',
      dataIndex: 'last_date_to_investment',
      key: 'last_date_to_investment',
      render: (dateString) => formatDate(dateString),
    },
    {
      title: 'Returns',
      dataIndex: 'profit_percent',
      key: 'profit_percent',
    },
  ];

  // Pagination calculation
  const startIndex = (currentPage - 1) * perPage;
  const endIndex = startIndex + perPage;
  const paginatedData = data.slice(startIndex, endIndex);

  return (
    <section className={styles.contentAreaTable} style={{ borderRadius: '0.7rem' }}>
      <div className={styles.dataTableInfo}>
        {/* <h4 className={styles.dataTableTitle}>Latest Orders</h4> */}
      </div>
      <div className={styles.dataTableDiagram}>
        <table className={styles.table}>
          <thead>
            <tr>
              {columns.map(column => (
                <th key={column.key} className={styles.tableHeader}>
                  {column.title}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((item, index) => (
              <tr key={index} className={styles.tableRow}>
                {columns.map(column => (
                  <td key={column.key} className={styles.tableData}>
                    {column.render ? column.render(item[column.dataIndex]) : item[column.dataIndex]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        <div className={styles.pagination}>
          <button disabled={currentPage === 1} onClick={() => handlePageChange(currentPage - 1)}>Previous</button>
          <span>{currentPage}</span>
          <button disabled={currentPage * perPage >= data.length} onClick={() => handlePageChange(currentPage + 1)}>Next</button>
        </div>
      </div>
    </section>
  );
};

export default PlanTable;