import ReactDOM from "react-dom/client";
import AdvisorDashboard from "./AdvisorDashboard.jsx";
import { ThemeProvider } from "./context/ThemeContext.jsx";
import { SidebarProvider } from "./context/SidebarContext.jsx";
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>

// import './index.css'
ReactDOM.createRoot(document.getElementById("root")).render(
  <ThemeProvider>
    <SidebarProvider>
      <AdvisorDashboard />
    </SidebarProvider>
  </ThemeProvider>
);
