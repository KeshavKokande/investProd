import { AreaCards, AreaCharts, AreaTable} from "../../components";
import { useEffect, useState } from "react";
import loadingGif from "./../../assest/images/Animation.gif";

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoading(false);
      sessionStorage.setItem('role', 'advisor');
      window.scrollTo(0, 0);
    }, 2000);
 
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="content-area">
      {loading ? (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
          <div style={{ position: 'relative', top: '-80px' }}>
            <img src={loadingGif} alt="Loading..." style={{ maxWidth: '100%', maxHeight: '100%' }} />
          </div>
        </div>
      ) : (
        <>
          {/* <AreaTop /> */}
          <AreaCards />
          <AreaCharts />
          <AreaTable />
        </>
      )}
    </div>
  );
};

export default Dashboard;