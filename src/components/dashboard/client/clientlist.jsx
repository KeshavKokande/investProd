import React, { useState, useEffect } from 'react';
import '../areaTable/AreaTable.scss';
import AreaTableAction from '../areaTable/AreaTableAction';

const TABLE_HEADS = [
  'Client Name',
  'Client Email',
  'Plan Names', // Updated table header to reflect plan names
];

const Clientlist = () => {
  const [tableData, setTableData] = useState([]);
  const [planData, setPlansData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/v1/advisor/list-of-clients', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        });

        const plansResponse = await fetch('http://localhost:8000/api/v1/advisor/list-of-plans', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        });

        if (!response.ok || !plansResponse.ok) {
          throw new Error('Failed to fetch user data');
        }

        const clientsData = await response.json();
        const plansData = await plansResponse.json();

        setTableData(clientsData.clients);
        setPlansData(plansData.plans); // Assuming plansData contains an array of plans under the key 'plans'
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
    window.scrollTo(0, 0);
  }, []);

  const getPlanNames = (planIds) => {
    if (!Array.isArray(planData)) {
      console.error('Plan data is not an array:', planData);
      return [];
    }

    return planIds.map((planId) => {
      const plan = planData.find((plan) => plan._id === planId);
      return plan ? plan.planName : 'Unknown Plan';
    });
  };

  return (
    <section className="content-area-table">
      <div className="data-table-info">
        <h4 className="data-table-title">List of subscribed Clients</h4>
      </div>
      <div className="data-table-diagram">
        <table>
          <thead>
            <tr>
              {TABLE_HEADS.map((th, index) => (
                <th key={index}>{th}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {tableData.map((client) => (
              <tr key={client._id}>
                <td>{client.name}</td>
                <td>{client.email}</td>
                <td>
                  {getPlanNames(client.planIds).map((planName, index) => (
                    <div key={index}>{planName}</div>
                  ))}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default Clientlist;
