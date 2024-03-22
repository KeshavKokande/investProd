import  { useState, useEffect } from 'react';
import "./AreaTable.scss";

const TABLE_HEADS = [
  "Client Name",
  "Plan Name",
  "Date",
  "Invested Amount",
];

const formatDate = (dateString) => {
  const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
  const formattedDate = new Date(dateString).toLocaleDateString(undefined, options);
  return formattedDate;
};

const AreaTable = () => {
  const [tableData, setTableData] = useState([]);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/v1/advisor/get-latest-transactions-of-own-plans', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          },
          credentials: 'include'
        }); // Assuming the JSON file is named purchase.json and placed in the public folder
        const jsonData = await response.json();
        setTableData(jsonData.transactions);
        console.log(jsonData)
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
        <h4 className="data-table-title">Latest Orders</h4>
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
            {tableData.map((purchase) => {
              return (
                <tr key={purchase._id}>
                  <td>{purchase.clientName}</td>
                  <td>{purchase.planName}</td>
                  <td>{formatDate(purchase.createdAt)}</td>
                  <td>{purchase.investedAmount}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
  
};

export default AreaTable;

