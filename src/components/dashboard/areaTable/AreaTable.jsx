import React, { useState, useEffect } from 'react';
import { Table } from 'antd';
import './AreaTable.scss';

const formatDate = (dateString) => {
  const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
  const formattedDate = new Date(dateString).toLocaleDateString(undefined, options);
  return formattedDate;
};

const AreaTable = () => {
  const [tableData, setTableData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage] = useState(10);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/v1/advisor/get-latest-transactions-of-own-plans', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          },
          credentials: 'include'
        });
        const jsonData = await response.json();
        setTableData(jsonData.transactions);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);
  const formatCurrency = (value) => {
    const parsedValue = parseFloat(value).toFixed(2);
    const stringValue = String(parsedValue);
    const [integerPart, decimalPart] = stringValue.split(".");
    const formattedIntegerPart = Number(integerPart).toLocaleString("en-IN");
    const formattedValue = `₹${formattedIntegerPart}${decimalPart ? `.${decimalPart}` : ''}`;
    return formattedValue;
  };

  const columns = [
    {
      title: 'Client Name',
      dataIndex: 'clientName',
      key: 'clientName',
    },
    {
      title: 'Plan Name',
      dataIndex: 'planName',
      key: 'planName',
    },
    {
      title: 'Date',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (date) => formatDate(date),
    },
    {
      title: 'Invested Amount',
      dataIndex: 'investedAmount',
      key: 'investedAmount',
      render: (investedAmount) => formatCurrency(investedAmount)
    },
  ];

  
  const indexOfLastItem = currentPage * perPage;
  const indexOfFirstItem = indexOfLastItem - perPage;
  const currentItems = tableData ? tableData.slice(indexOfFirstItem, indexOfLastItem) : [];


  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="content-area-table">
      <div className="data-table-info">
        <h4 className="data-table-title">Latest Orders</h4>
      </div>
      <div className="data-table-diagram">
        <Table
          columns={columns}
          dataSource={currentItems}
          pagination={{
            current: currentPage,
            pageSize: perPage,
            total: tableData ? tableData.length : 0, // Ensure tableData is defined before accessing its length
            onChange: handlePageChange,
          }}
        />
      </div>
    </div>
  );
};

export default AreaTable;








