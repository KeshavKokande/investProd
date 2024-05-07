import React from 'react';
import styles from './dashboard.module.css';
 
const PlanTable = ({ data }) => {
  console.log("pro>>",data);
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
    },
    {
      title: 'Latest Transaction Date',
      dataIndex: 'last_date_to_investment',
      key: 'last_date_to_investment',
    },
  ];

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
            {data.map((item, index) => (
              <tr key={index} className={styles.tableRow}>
                {columns.map(column => (
                  <td key={column.key} className={styles.tableData}>
                    {item[column.dataIndex]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default PlanTable;
