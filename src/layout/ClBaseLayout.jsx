import { Outlet } from "react-router-dom";
import { ClSidebar } from "../components";

const ClBaseLayout = () => {
  return (
    <main className="page-wrapper">
      {/* left of page */}
      <ClSidebar />
      {/* right side/content of the page */}
      <div className="content-wrapper">
        <Outlet />
      </div>
    </main>
  );
};

export default ClBaseLayout;
