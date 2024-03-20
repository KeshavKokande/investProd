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
            title: 'Plan Name',
            dataIndex: 'planName',
            key: 'planName',
        },
        {
            title: 'Total Amount Invested',
            dataIndex: 'totalInvestment',
            key: 'totalInvestment',
        },
    ];

    console.log("UNIQUE PLANS: ", uniquePlans);
    const data = uniquePlans.map(plan => ({
        planId: plan.planId, 
        planName: plan.planName,
        totalInvestment: totalInvestments.get(plan.planId),
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
              <th>Plan Names</th>
              <th>Total Amount Invested</th>
            </tr>
          </thead>
          <tbody>
            {uniquePlans.map((plan) => {
              const totalInvestment = totalInvestments.get(plan.planId);
              return (
                <tr key={plan.planId}>
                  <td>{plan.planName}</td>
        
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
