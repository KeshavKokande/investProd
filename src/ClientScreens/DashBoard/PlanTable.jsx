
import React from 'react';
import { Table } from 'antd';


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
//  console.log(advisorNames);
    const data = uniquePlans.map((plan, index) => ({
      key: plan.planId,
      planName: plan.planName,
      advisorName: advisorNames[index],
      totalInvestment: totalInvestments.get(plan.planId),
    }));

    return (
        <section className="content-area-table">
      <div className="data-table-info">
        {/* <h4 className="data-table-title">Latest Orders</h4> */}
      </div>
      <div className="data-table-diagram">
        <table border={1}>
          <thead>
            <tr>
              <th>Plan Names</th>
              <th>Advisor Name</th>
              <th>Total Amount Invested</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
                <tr key={item.key}>
                    <td>{item.planName}</td>
                    <td>{item.advisorName}</td>
                    <td>{item.totalInvestment}</td>
                </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
    );
};

export default PlanTable;



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