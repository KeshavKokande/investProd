import { AreaCards, AreaCharts, AreaTable } from "../../components";
import { useEffect, useState } from "react";
import loadingGif from "./../../assest/images/Animation11.gif";

const Dashboard = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoading(false);
      sessionStorage.setItem("role", "advisor");
      window.scrollTo(0, 0);
    }, 2000);

    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    (function () {
      window.VG_CONFIG = {
        ID: "qx5srwyhuvr4adl",
        region: 'na', // 'eu' or 'na' corresponding to Europe and North America
        render: 'popup', // popup or full-width
        stylesheets: [
          // Base Voiceglow CSS
          "https://storage.googleapis.com/voiceglow-cdn/vg_live_build/styles.css",
          // Add your custom css stylesheets, Can also add relative URL ('/public/your-file.css)
        ],
      }
      var VG_SCRIPT = document.createElement("script");
      VG_SCRIPT.src = "https://storage.googleapis.com/voiceglow-cdn/vg_live_build/vg_bundle.js";
      document.body.appendChild(VG_SCRIPT);
    })();
  }, []);

  return (
    <div className="content-area">
      {loading ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <div style={{ position: "relative", top: "-80px" }}>
            <img
              src={loadingGif}
              alt="Loading..."
              style={{ maxWidth: "100%", maxHeight: "100%" }}
            />
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
