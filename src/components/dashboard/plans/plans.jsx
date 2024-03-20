import  { useState, useEffect } from 'react';
import "../areaTable/AreaTable.scss";
import AreaTableAction from "../areaTable/AreaTableAction";

const TABLE_HEADS = [
  "stock",
  "buyAt",
  "sellAt",
  "stopLoss",
  "Edit",
];


const Plans = () => {
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('./planlist.json'); // Assuming the JSON file is named purchase.json and placed in the public folder
        const jsonData = await response.json();
        setTableData(jsonData);
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
        <h4 className="data-table-title">high risk</h4>
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
            {tableData.map((planlist) => {
              return (
                <tr key={planlist.planId}>
                  <td>{planlist.stock}</td>
                  <td>{planlist.buyAt}</td>
                  <td>{planlist.sellAt}</td>
                  <td>{planlist.stopLoss}</td>
                  
                  {/* <td>${purchase.amount.toFixed(2)}</td> Corrected variable name */}
                  <td className="dt-cell-action">
                    <AreaTableAction />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default Plans;

  



  





