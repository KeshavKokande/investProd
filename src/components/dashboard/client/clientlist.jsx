import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from '@mui/material';
import '../areaTable/AreaTable.scss';
import AreaTableAction from '../areaTable/AreaTableAction';

const TABLE_HEADS = [
  'Client',
  'Client Email',
  'Plan Names',
];

const Clientlist = () => {
  const [tableData, setTableData] = useState([]);
  const [planData, setPlansData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const clientsResponse = await fetch('http://localhost:8000/api/v1/advisor/list-of-clients', {
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

        if (!clientsResponse.ok || !plansResponse.ok) {
          throw new Error('Failed to fetch user data');
        }

        const clientsData = await clientsResponse.json();
        const plansData = await plansResponse.json();

        setTableData(clientsData.clients);
        setPlansData(plansData.plans);
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
      return plan ? plan.planName : undefined; // Return undefined if plan is not found
    }).filter((planName) => planName !== undefined); // Filter out undefined values
  };

  const arrayToDataURL = (array, cota) => {
    const blob = new Blob([new Uint8Array(array)], { type:cota });
    const urlCreator = window.URL || window.webkitURL;
    return urlCreator.createObjectURL(blob);
  }

  return (
    <section className="content-area-table">
      <div className="data-table-info">
        <Typography variant="h4" className="data-table-title">List of subscribed Clients</Typography>
      </div>
      <div className="data-table-diagram">
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                {TABLE_HEADS.map((th, index) => (
                  <TableCell key={index}>{th}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {tableData.map((client) => (
                <TableRow key={client._id}>
                  <TableCell>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <img
                      src={arrayToDataURL(client.profilePhoto.data.data,client.profilePhoto.contentType)}
                      alt={client.name}
                      style={{ width: '50px', height: '50px', borderRadius: '50%', marginRight: '10px' }}
                    />
                    {client.name}
                  </div>
                </TableCell>
                  <TableCell>{client.email}</TableCell>
                  <TableCell>
                    {getPlanNames(client.boughtPlanIds).map((planName, index) => (
                      <div key={index}>{planName}</div>
                    ))}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </section>
  );
};

export default Clientlist;
