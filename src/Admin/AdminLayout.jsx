import { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { ToastContainer } from "react-toastify";
import { logout } from "../store/authSlice";
import { Sidebar } from "./Dashboard/Sidebar";
import Header from "./Dashboard/Header";

const routeTitleMap = {
  "/admin": { title: "Welcome back, Admin", subtitle: "Here's what's happening with Phlebotomist today" },
  "/admin/user-management": { title: "User Management", subtitle: "Manage all registered users on the platform" },
  "/admin/patient-management": { title: "Patient Management", subtitle: "Manage all registered patients on the platform" },
  "/admin/job-management": { title: "Job Management", subtitle: "Review and manage job postings on the platform" },
  "/admin/dispute-management": { title: "Dispute Management", subtitle: "Review and resolve reported issues and disputes" },
  "/admin/communication": { title: "Communication & Reviews Moderation", subtitle: "Review and resolve reported issues and disputes" },
  "/admin/job-matching": { title: "Job Matching", subtitle: "Find and assign qualified phlebotomists to open jobs" },
  "/admin/analytics": { title: "Analytics & Reporting", subtitle: "Monitor platform performance and generate insights" },
  "/admin/payroll": { title: "Payroll Management", subtitle: "Review and resolve reported issues and disputes" },
  "/admin/setting": { title: "Setting", subtitle: "Information about your current plan and usages" },
};

export default function AdminLayout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [messageOpen, setMessageOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/admin/login");
  };

  const { title, subtitle } = routeTitleMap[location.pathname] || { title: "", subtitle: "" };

  return (
    <div style={{ fontFamily: "Montserrat" }} className="flex bg-white">
      <div className="w-72 fixed top-0 left-0 h-screen">
        <Sidebar onLogout={handleLogout} />
      </div>
      <div className="flex-1 ml-72 min-h-screen overflow-y-auto">
        <div className="bg-white px-6 py-4">
          <div className="flex items-center justify-between gap-9">
            <Header
              title={title}
              subtitle={subtitle}
              onMessage={() => navigate("/admin/communication")}
            />
          </div>
        </div>
        <div className="px-6 mt-3 bg-white">
          <Outlet context={{ messageOpen, setMessageOpen }} />
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}
