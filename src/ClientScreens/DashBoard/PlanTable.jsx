import React from 'react';
import styles from './dashboard.module.css';
 
const PlanTable = ({ uniquePlans, advisorNames, totalInvestments }) => {
  const columns = [
    {
      title: 'Plan Name',
      dataIndex: 'planName',
      key: 'planName',
    },
    {
      title: 'Advisor Name',
      dataIndex: 'advisorNames',
      key: 'advisorNames',
    },
    {
      title: 'Total Amount Invested',
      dataIndex: 'totalInvestment',
      key: 'totalInvestment',
    },
  ];
 
  const data = uniquePlans.map((plan, index) => ({
    key: plan.planId,
    planName: plan.planName,
    advisorName: advisorNames[index],
    totalInvestment: totalInvestments.get(plan.planId),
  }));
 
  return (
    <section className={styles.contentAreaTable} style={{borderRadius:'0.7rem'}}>
      <div className={styles.dataTableInfo}>
        {/* <h4 className={styles.dataTableTitle}>Latest Orders</h4> */}
      </div>
      <div className={styles.dataTableDiagram}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th className={styles.tableHeader}>Plan Names</th>
              <th className={styles.tableHeader}>Advisor Name</th>
              <th className={styles.tableHeader}>Total Amount Invested</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.key}>
                <td className={styles.tableData}>{item.planName}</td>
                <td className={styles.tableData}>{item.advisorName}</td>
                <td className={styles.tableData}>{item.totalInvestment}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};
 
export default PlanTable;