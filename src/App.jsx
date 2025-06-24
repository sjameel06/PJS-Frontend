import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Login from "./Component/Pages/Login";
import Register from "./Component/Pages/Register";
import EmployeeForm from "./Component/Pages/EmployeeForm";
import JobAssignment from "./Component/Pages/JobAssignment";
import OurFeatures from "./Component/Pages/OurFeatures";
import OurServices from "./Component/Pages/OurServices";
import ConfrimBooking from "./Component/Pages/ConfrimBooking";
import Inventory from "./Component/Pages/Inventory";
import Profile from "./Component/Pages/Profile";
import ForgetPassword from "./Component/Pages/ForgetPassword";
import ResetPassword from "./Component/Pages/ResetPassword";
import ProtectedRoute from "./Component/Protected/Protected";
import NavBar from "./Component/Pages/NavBar";

import EmployeeList from "./Component/Pages/EmployeeList";
import JobList from "./Component/Pages/JobList";
import TechnicianStatus from "./Component/Pages/TechnicianStatus";
import CustomerOrder from "./Component/Pages/CustomerOrder";

import TeamManagement from "./Component/Pages/TeamManagement";
import DispatcherDashboard from "./Component/Pages/DispatcherDashboard";
import DashboardPage from "./Component/Pages/Dashboard/DashboardPage";
import MainAdminDashboard from "./Component/Pages/Dashboard/MainAdminDashboard";

const Layout = ({ children }) => {
    const location = useLocation();

    const hideNavbarRoutes = [
        "/",
        "/AdminLogin",
        "/TechnicianLogin",
        "/DispatcherLogin", 
        "/Register",
        "/ForgetPassword",
        "/dispatcherForgetPassword",
        "/adminForgetPassword",
        "/technicianForgetPassword",
        "/dispatcher",
        "/technician",
        "/customer"
    ];

    const shouldHideNavbar = hideNavbarRoutes.includes(location.pathname);

    return (
        <div className="flex">
            {/* Sidebar (NavBar) */}
            {!shouldHideNavbar && (
                <div className="w-64  h-screen bg-gray-800 text-white">
                    <NavBar />
                </div>
            )}

            {/* Main content */}
            <div className="flex-1   ">
                {children}
            </div>
        </div>
    );
};

const App = () => {
    return (
        <Router>
            <Layout>
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/AdminDashboard" element={<MainAdminDashboard />} />
                    <Route path="/JobList" element={<JobList />} />
                    <Route path="/EmployeeList" element={<EmployeeList />} />
                    <Route path="/AdminLogin" element={<Login />} />
                    <Route path="/TechnicianLogin" element={<Login />} />
                    <Route path="/DispatcherLogin" element={<Login />} />
                    <Route path="/Register" element={<Register />} />
                    <Route path="/ServicesDetail" element={<ProtectedRoute><ConfrimBooking /></ProtectedRoute>} />
                    <Route path="/Inventory" element={<ProtectedRoute><Inventory /></ProtectedRoute>} />
                    <Route path="/MyOrder" element={<ProtectedRoute><CustomerOrder /></ProtectedRoute>} />
                    <Route path="/Status" element={<ProtectedRoute><TechnicianStatus /></ProtectedRoute>} />
                    <Route path="/DispatcherDashboard" element={<ProtectedRoute><DispatcherDashboard /></ProtectedRoute>} />
                    <Route path="/dispatcherForgetPassword" element={<ForgetPassword />} />
                    <Route path="/adminForgetPassword" element={<ForgetPassword />} />
                    <Route path="/technicianForgetPassword" element={<ForgetPassword />} />
                    <Route path="/ForgetPassword" element={<ForgetPassword />} />
                    <Route path="/technician" element={<ResetPassword />} />
                    <Route path="/customer" element={<ResetPassword />} />
                    <Route path="/dispatcher" element={<ResetPassword />} />
                    <Route path="/EmployeeForm" element={<ProtectedRoute><EmployeeForm /></ProtectedRoute>} />
                    <Route path="/Profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
                    <Route path="/JobAssignment" element={<ProtectedRoute><JobAssignment /></ProtectedRoute>} />
                    <Route path="/OurServices" element={<ProtectedRoute><OurServices /></ProtectedRoute>} />
                    <Route path="/TeamManagement" element={<ProtectedRoute><TeamManagement /></ProtectedRoute>} />
                </Routes>
            </Layout>
        </Router>
    );
};

export default App;
