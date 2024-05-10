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

import Payment from "./Payment/Payment";

import News from "./News/News";
import Stoks from './Stocks/Stoks'

import {
  HomepageAbout,
  Service,
  HomepageInfo,
  HomePage
} from './components';
import EditPlan from "./components/dashboard/plans/PlanEdit";

function App() {

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check if the cookie is set
    const cookieExists = localStorage.getItem('jwt');

    if (cookieExists) {
      setIsAuthenticated(true); // Update isAuthenticated state to true
    } else {
      // Cookie is not set
      if (!['/login', '/', '/register', '/client_registration_form'].includes(window.location.pathname)) {
        window.location.href = '/login';
      }
    }
  }, []);

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Loginpage />} />
          <Route path="/register" element={<Registerpage />} />
          <Route path="/about" element={<HomepageAbout />} />
          <Route path="/services" element={<Service />} />
          <Route path="/contact" element={<HomepageInfo />} />
          <Route path="/client_registration_form" element={<MultiStepForm />} />
          <Route path="/stocks" element={<Stoks />} />

          <Route element={<BaseLayout />}>
            <Route path="/advisor_dashboard" element={<Dashboard />} />
            <Route path="/advisor/clientList" element={<Clientlist />} />
            <Route path="/advisor/planList" element={<AdNewPlans />} />
            <Route path="/advisor/clientDetails" element={<UserDetails />} />
            <Route path="/advisor/addNewPlan" element={<AddPlan />} />
            <Route path="/advisor/editPlan/:edit" element={<EditPlan />} />

          </Route>

          <Route element={<ClBaseLayout />}>
            <Route path="/client_dashboard" element={<DashboardClient />} />
            <Route path="/advisor/:advisor_id" element={<AdvClProfile />} />
            <Route path="/planDetail/:plan_id" element={<PlanView />} />
            <Route path="/plansList" element={<PlansCl />} />
            <Route path="/viewAdvisor" element={<AdvClView />} />
            <Route path="/plan" element={<Plans />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/profile/Edit" element={<MultiFormEdit />} />
            <Route path="/news" element={<News />} />
            <Route path="/advisorprofile" element={<AdvisorProfilePage />} />
            <Route path="/payment/:advisor_id/:plan_id/:days/:fee" element={<Payment />} />

          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
