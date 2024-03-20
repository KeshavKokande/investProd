import ReactDOM from "react-dom/client";
import AdvisorDashboard from "./AdvisorDashboard.jsx";
import { ThemeProvider } from "./context/ThemeContext.jsx";
import { SidebarProvider } from "./context/SidebarContext.jsx";

// import './index.css'
ReactDOM.createRoot(document.getElementById("root")).render(
  <ThemeProvider>
    <SidebarProvider>
      <AdvisorDashboard />
    </SidebarProvider>
  </ThemeProvider>
);
