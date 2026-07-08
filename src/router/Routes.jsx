import { createBrowserRouter } from "react-router-dom";
import { Layout } from "../layouts/Layout";
import { Home } from "../pages/Home/Home";
import { Services } from "../pages/Services/Services";
import { Providers } from "../pages/Providers/Providers";
import { About } from "../pages/About/About";
import Terms from "../pages/Terms & Policy/Terms";
import Privacy from "../pages/Terms & Policy/Privacy";
import { Schedule } from "../pages/Schedule/Schedule";
import AdminDashboard from "../Admin/Dashboard/AdminDashboard";
import LoginPage from "../Admin/Login/index";
import ProtectedRoute from "../components/ProtectedRoute";
import { PaymentSuccess } from "@/pages/Schedule/PaymentSuccess";
import AdminLayout from "../Admin/AdminLayout";
import UserManagement from "../Admin/UserManagement/UserManagement";
import PatientManagement from "../Admin/UserManagement/PatientManagement";
import JobManagement from "../Admin/JobManagement/JobManagement";
import DisputeManagement from "../Admin/DisputeManagement/DisputeManagement";
import Communication from "../Admin/Communication/Communication";
import JobMatching from "../Admin/JobMatching/JobMatching";
import AnalyticsDashboard from "../Admin/AnalyticsDashboard/AnalyticsDashboard";
import PayrollManagement from "../Admin/PayrollManagement/PayrollManagement";
import Setting from "../Admin/Setting/Setting";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <h2>Route not found</h2>,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/services",
        element: <Services />,
      },
      {
        path: "/providers",
        element: <Providers />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/terms",
        element: <Terms />,
      },
      {
        path: "/privacy",
        element: <Privacy />,
      },
      {
        path: "/schedule",
        element: <Schedule />,
      },
      {
        path: "/payment-success",
        element: <PaymentSuccess />,
      },
    ],
  },
  {
    path: "/admin/login",
    element: <LoginPage />,
  },
  {
    path: "/admin",
    element: (
      <ProtectedRoute>
        <AdminLayout />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <AdminDashboard /> },
      { path: "user-management", element: <UserManagement /> },
      { path: "patient-management", element: <PatientManagement /> },
      { path: "job-management", element: <JobManagement /> },
      { path: "dispute-management", element: <DisputeManagement /> },
      { path: "communication", element: <Communication /> },
      { path: "job-matching", element: <JobMatching /> },
      { path: "analytics", element: <AnalyticsDashboard /> },
      { path: "payroll", element: <PayrollManagement /> },
      { path: "setting", element: <Setting /> },
    ],
  },
]);

export default router;
