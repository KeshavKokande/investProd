import { AreaCards, AreaCharts, AreaTable} from "../../components";
import { useEffect } from "react";

const Dashboard = () => {
  useEffect(() => {
    sessionStorage.setItem('role', 'advisor');
    window.scrollTo(0, 0);
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
