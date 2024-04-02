import "./App.scss";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import BaseLayout from "./layout/BaseLayout";
import ClBaseLayout from "./layout/ClBaseLayout";
import { Dashboard } from "./screens";
import Clientlist from "./components/dashboard/client/clientlist";
import Plans from "./components/dashboard/plans/plans";
import Loginpage from './components/SignIn/Loginpage';
import Registerpage from "./components/SignIn/Registerpage";
import UserDetails from "./checking/UserDetails";
import AddPlan from "./components/dashboard/plans/AddPlan";
import AdNewPlans from "./components/dashboard/plans/AdNewPlans";
import ProfilePage from "./ClientScreens/Profilepage/Profilepage";
import DashboardClient from "./ClientScreens/DashBoard/Dashboard";
import PlansCl from "./ClientScreens/Plans/PlansCl";
import AdvClView from "./ClientScreens/AdvisersClientView/AdvClView";
import AdvClProfile from "./ClientScreens/AdvisersClientView/AdvClProfile";
import PlanView from "./ClientScreens/Plans/PlanView";
import MultiStepForm from "./ClientScreens/FirstForm/MultiStepForm";
import MultiFormEdit from "./ClientScreens/Profilepage/MultiFormEdit";
import AdvisorProfilePage from "./ClientScreens/AdvisorProfilePlans/AdvisorProfilePage";
import InvestmentForm from "./components/dashboard/plans/PlanEdit";
// import ProtectedRoute from "./ProtectedRoute";

import News from "./News/News";
import Stoks from './Stocks/Stoks'

import{
  HomepageAbout,
  Service,
  HomepageInfo,
  HomePage
} from './components';

function App() {
 
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  useEffect(() => {
    // Check if the cookie is set
    const cookieExists = document.cookie.includes('jwt');
    
    if (cookieExists) {
      setIsAuthenticated(true); // Update isAuthenticated state to true
    } else {
      // Cookie is not set
      if (!['/login','/', '/register', '/clform'].includes(window.location.pathname)) {
        window.location.href = '/login';
      }
    }
  }, []); 

  return (
    <>
      <Router>
        <Routes>
          <Route path ="/" element= {<HomePage />}/>
          <Route path ="/login" element= {<Loginpage />}/>
          <Route path ="/register" element= {<Registerpage/>}/>
          <Route path="/about" element={<HomepageAbout />} />
          <Route path="/services" element={<Service />} />
          <Route path="/contact" element={<HomepageInfo />} />
          <Route path="/clform" element={<MultiStepForm />} />
          <Route path="/stocks" element={<Stoks />} />

          <Route element={<BaseLayout />}>
            <Route path="/advisor_dashboard" element={<Dashboard />} />
            <Route path="/clientlist" element={<Clientlist/>} />
            <Route path="/plan" element={<AdNewPlans/>} />
            <Route path="/details" element={<UserDetails/>}/>
            <Route path="/addplan" element={<AddPlan />} />
            <Route path="/editpal" element={<InvestmentForm />} />
            
          </Route>

          <Route element={<ClBaseLayout />}>
            <Route path="/cldash" element={<DashboardClient />} />
            <Route path="/advisor_id/:advisor_id" element={<AdvClProfile />} />
            <Route path="/plan_id/:plan_id" element={<PlanView />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/planscl" element={<PlansCl/>} />
            <Route path="/viewadvi" element={<AdvClView/>} /> 
            <Route path="/plan" element={<Plans/>} />
            <Route path="/profedit" element={<MultiFormEdit/>}/>
            <Route path="/news" element={<News/>}/>
            <Route path="/advisorprofile" element={<AdvisorProfilePage />} />

          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
