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
import MessagingInterface from "@/Admin/Communication/MessagingInterface";
import LoginPage from "../Admin/Login/index";
import ProtectedRoute from "../components/ProtectedRoute";
import { PaymentSuccess } from "@/pages/Schedule/PaymentSuccess";

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
        <AdminDashboard />
      </ProtectedRoute>
    ),
  },
]);

export default router;
