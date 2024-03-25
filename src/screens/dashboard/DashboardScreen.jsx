import { AreaCards, AreaCharts, AreaTable} from "../../components";
import { useEffect, useState } from "react";

const Dashboard = () => {
  useEffect(() => {
    sessionStorage.setItem('role', 'advisor');
  },[]);
  return (
    <div className="content-area">
      {/* <AreaTop /> */}
      <AreaCards />
      <AreaCharts />
      <AreaTable />
    </div>
  );
};

export default Dashboard;
