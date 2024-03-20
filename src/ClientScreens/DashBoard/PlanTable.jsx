// import React from 'react';
// import { Table } from 'antd';

// const PlanTable = ({ uniquePlans, totalInvestments }) => {
//     const columns = [
//         {
//             title: 'Plan ID',
//             dataIndex: 'planId',
//             key: 'planId',
//         },
//         {
//             title: 'Total Amount Invested',
//             dataIndex: 'totalInvestment',
//             key: 'totalInvestment',
//         },
//     ];

//     const data = uniquePlans.map(planId => ({
//         planId: planId,
//         totalInvestment: totalInvestments.get(planId),
//     }));

//     return (
//         <Table columns={columns} dataSource={data} />
//     );
// };

// export default PlanTable;





import React from 'react';
import { Table } from 'antd';


const PlanTable = ({ uniquePlans, totalInvestments }) => {
    const columns = [
        {
            title: 'Plan ID',
            dataIndex: 'planId',
            key: 'planId',
        },
        {
            title: 'Total Amount Invested',
            dataIndex: 'totalInvestment',
            key: 'totalInvestment',
        },
    ];

    const data = uniquePlans.map(planId => ({
        planId: planId,
        totalInvestment: totalInvestments.get(planId),
    }));

    return (
        <section className="content-area-table">
      <div className="data-table-info">
        {/* <h4 className="data-table-title">Latest Orders</h4> */}
      </div>
      <div className="data-table-diagram">
        <table>
          <thead>
            <tr>
              <th>Plan ID</th>
              <th>Total Amount Invested</th>
            </tr>
          </thead>
          <tbody>
            {uniquePlans.map((planId) => {
              const totalInvestment = totalInvestments.get(planId);
              return (
                <tr key={planId}>
                  <td>{planId}</td>
                  
                  <td>{totalInvestment}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
    );
};

export default PlanTable;
