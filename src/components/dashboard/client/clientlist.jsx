import { useState, useEffect } from 'react';
import "../areaTable/AreaTable.scss";
import AreaTableAction from "../areaTable/AreaTableAction";

const TABLE_HEADS = [
  "Client ID",
  "Client Name",
  "Client Email",
  "Plan IDs"
];


const Clientlist = () => {
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try 
      {
        const response = await fetch('https://team4api.azurewebsites.net/api/v1/advisor/list-of-clients', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          },
          credentials: 'include'
        })
        if (!response.ok) {
          throw new Error('Failed to fetch user data');
        }
        const data = await response.json();
        setTableData(data.clients);
      }

      catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

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
                <td>{client._id}</td>
                <td>{client.name}</td>
                <td>{client.email}</td>
                <td>
                  {client.planIds.map((planId) => (
                    <div key={planId}>{planId}</div>
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


  




