
import React from 'react';
import { Table } from 'antd';
import moment from 'moment';
const PlanTable = ({ uniquePlans, advisorNames, totalInvestments }) => {
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
            dataIndex: 'totalInvestment',
            key: 'totalInvestment',
        },
        {
            title: 'Date of Buying Plan',
            dataIndex: 'dateOfBuying',
            key: 'dateOfBuying',
        },
    ];

    const data = uniquePlans.map((plan, index) => ({
        key: plan.planId,
        planName: plan.planName,
        advisorName: advisorNames[index],
        totalInvestment: totalInvestments.get(plan.planId),
        dateOfBuying: moment(plan.createdAt).format('DD-MM-YYYY'), // Extracting date from createdAt
    }));

    return (
        <section className="content-area-table">
            <div className="data-table-info">
                
            </div>
            <div className="data-table-diagram">
                <Table
                    columns={columns}
                    dataSource={data}
                    pagination={{ pageSize: 10 }} // Pagination with pageSize set to 10
                />
            </div>
        </section>
    );
};

export default PlanTable;






