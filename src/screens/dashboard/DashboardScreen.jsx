import { AreaCards, AreaCharts, AreaTable} from "../../components";

const Dashboard = () => {
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
