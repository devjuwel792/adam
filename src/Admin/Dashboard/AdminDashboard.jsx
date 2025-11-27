import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../store/authSlice";
import { Sidebar } from "./Sidebar";
import UserManagement from "../UserManagement/UserManagement";
import Header from "./Header";
import { StatCard } from "./StatCard";
import { Users, Clock, Briefcase, DollarSign, Factory } from "lucide-react";
import { ActionCard } from "./ActionCard";
import QuickStats, { ActivityCard } from "./QuickStats";
import DashboardImage from "../../assets/images/dashboardImage.png";
import { FaUsers } from "react-icons/fa";
import { FaClock } from "react-icons/fa6";
import { FaBriefcase } from "react-icons/fa6";
import { FaDollarSign } from "react-icons/fa6";
import ProfessionalList from "./ProfessionalList";
import ProfileModal from "./ProfileModal";
import DocumentManager from "./DocumentManager";
import NotificationsPanel from "./NotificationsPanel";
import DeleteConfirmationModal from "./DeleteConfirmationModal";
import DisputeManagement from "../DisputeManagement/DisputeManagement";
import JobManagement from "../JobManagement/JobManagement";
import JobMatching from "../JobMatching/JobMatching";
import Communication from "../Communication/Communication";
import MessagingInterface from "../Communication/MessagingInterface";
import PayrollManagement from "../PayrollManagement/PayrollManagement";
import Setting from "../Setting/Setting";
import AnalyticsDashboard from "../AnalyticsDashboard/AnalyticsDashboard";
import {
  useGetDashboardDataQuery,
  useGetPendingPhlebotomistsQuery,
  useGetPendingBusinessOwnersQuery,
} from "@/store/services/dashboardApi";
import { ToastContainer } from "react-toastify";

export default function AdminDashboard() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [currentComponent, setCurrentComponent] = useState("Dashboard"); // New state to track the active component
  const [isOpenDocumentVerifyModal, setIsOpenDocumentVerifyModal] =
    useState(false);
  const [messageOpen, setMessageOpen] = useState(false);
  const [isOpenProfessionalList, setIsOpenProfessionalList] = useState(false);

  // Fetch dashboard data
  const { data: dashboardData, isLoading, error } = useGetDashboardDataQuery();
  const { data: pendingPhlebotomistsData } = useGetPendingPhlebotomistsQuery();
  const { data: pendingBusinessOwnersData } =
    useGetPendingBusinessOwnersQuery();
  console.log(
    "🚀 ~ AdminDashboard ~ pendingBusinessOwnersData:",
    pendingBusinessOwnersData
  );

  const handleComponentChange = (component) => {
    if (component === "Logout") {
      dispatch(logout());
      navigate("/admin/login");
    } else {
      setCurrentComponent(component);
    }
  };

  useEffect(() => {
    if (currentComponent !== "Communication & Reviews") {
      setMessageOpen(false);
    }
  }, [currentComponent]);
  return (
    <div
      style={{ fontFamily: "Montserrat" }}
      className="flex bg-[#ffffff] font-poppins"
    >
      {/* Sidebar */}
      <div className="w-72 fixed top-0 left-0 h-screen">
        <Sidebar
          currentComponent={currentComponent}
          onMenuClick={handleComponentChange}
        />
      </div>

      {/* Main Content */}
      <div className="flex-1 ml-72 min-h-screen overflow-y-auto">
        {/* Header */}
        <div className="bg-[#ffffff] px-6 py-4">
          <div className="flex items-center justify-between gap-9">
            {/* <MessageSquareDot color="#1E90FF" /> */}
            {/* <img
              onClick={() => handleComponentChange("Profile")}
              src={profile}
              alt="profile"
              className="w-12 h-12"
            /> */}
            <Header
              onMessage={() => {
                setCurrentComponent("Communication & Reviews");
                setMessageOpen(true);
              }}
              title={
                currentComponent === "Dashboard"
                  ? "Welcome back, Admin Fariha"
                  : currentComponent === "User Management"
                  ? "User Management"
                  : currentComponent === "Job Management"
                  ? "Job Management"
                  : currentComponent === "Dispute Management"
                  ? "Dispute Management"
                  : currentComponent === "Communication & Reviews"
                  ? "Communication & Reviews Moderation"
                  : currentComponent === "Job Matching"
                  ? "Job Matching"
                  : currentComponent === "Payroll Management"
                  ? "Payroll Management"
                  : currentComponent === "Setting"
                  ? "Setting"
                  : currentComponent === "Analytics & Reporting"
                  ? "Analytics & Reporting"
                  : ""
              }
              subtitle={
                currentComponent === "Dashboard"
                  ? "Here's what's happening with Phlebotomist today"
                  : currentComponent === "User Management"
                  ? "Manage all registered users on the platform"
                  : currentComponent === "Job Management"
                  ? "Review and manage job postings on the platform"
                  : currentComponent === "Dispute Management"
                  ? "Review and resolve reported issues and disputes"
                  : currentComponent === "Communication & Reviews"
                  ? "Review and resolve reported issues and disputes"
                  : currentComponent === "Job Matching"
                  ? "Find and assign qualified phlebotomists to open jobs"
                  : currentComponent === "Payroll Management"
                  ? "Review and resolve reported issues and disputes"
                  : currentComponent === "Setting"
                  ? "Information about your current plan and usages"
                  : currentComponent === "Analytics & Reporting"
                  ? "Monitor platform performance and generate insights"
                  : ""
              }
            />
          </div>
        </div>

        {/* Content */}
        <div className="px-6 mt-3 bg-[#ffffff]">
          {/* Conditionally render the component based on the state */}
          {currentComponent === "Dashboard" && (
            <div className="">
              {/* Status Cards */}
              {/* <StartCards /> */}

              <div className="min-h-screen  p-6">
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                  <div className="space-y-6 lg:col-span-2">
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                      <StatCard
                        title="Total Users"
                        value={
                          isLoading
                            ? "..."
                            : (dashboardData?.total_users || 0).toLocaleString()
                        }
                        icon={FaUsers}
                        color="teal"
                      />
                      <StatCard
                        title="Pending Verifications"
                        value={
                          isLoading
                            ? "..."
                            : (
                                dashboardData?.pending_verification || 0
                              ).toString()
                        }
                        icon={FaClock}
                        color="orange"
                      />
                      <StatCard
                        title="Approved Jobs"
                        value={
                          isLoading
                            ? "..."
                            : (
                                dashboardData?.total_approved_jobs || 0
                              ).toString()
                        }
                        icon={FaBriefcase}
                        color="blue"
                      />
                      <StatCard
                        title="Revenue This Month"
                        value={
                          isLoading
                            ? "..."
                            : `$${dashboardData?.revenue_this_month || 0}`
                        }
                        icon={FaDollarSign}
                        color="green"
                      />
                    </div>
                    {/* Left Column - Action Cards */}
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                      <ActionCard
                        title="Pending Registrations"
                        description="Review and approve new user registrations waiting for verification"
                        count={pendingPhlebotomistsData?.total_pending || 0}
                        data={pendingPhlebotomistsData?.phlebotomists || []}
                        buttonText="Review Now"
                        color="orange"
                        isOpen={() => setIsOpenProfessionalList(true)}
                        isOpenProfileList={isOpenProfessionalList}
                        onClose={() => setIsOpenProfessionalList(false)}
                      />
                      <div>
                        <ActionCard
                          title="Documents to Verify"
                          description="Verify professional credentials and certifications submitted by users"
                          buttonText="Verify Now"
                          color="blue"
                          isOpen={() => setIsOpenDocumentVerifyModal(true)}
                          isOpenDocumentVerifyModal={isOpenDocumentVerifyModal}
                          onClose={() => setIsOpenDocumentVerifyModal(false)}
                          count={
                            pendingBusinessOwnersData?.total_pending_business_owners ||
                            0
                          }
                          data={
                            pendingBusinessOwnersData?.business_owners || []
                          }
                        />
                      </div>
                    </div>

                    {/* Recent Activity */}
                    {/* <RecentActivity /> */}
                  </div>

                  {/* Right Column - Illustration and Quick Stats */}

                  {/* Professional Illustration */}

                  <div className="flex h-full items-end justify-center ">
                    <img
                      src={DashboardImage}
                      alt="Healthcare Professional"
                      className=" object-cover w-full m-[-20px] max-w-[80%]"
                    />
                  </div>
                </div>
                <div className="flex gap-6  space-b-6 my-[35px]">
                  <div className="w-8/12">
                    <ActivityCard />
                  </div>
                  <div className="w-4/12 mt-0">
                    <QuickStats />
                  </div>
                </div>
              </div>

              {/* <ProfileModal /> */}

              {/* <NotificationsPanel /> */}
              {/* <DeleteConfirmationModal /> */}
            </div>
          )}
          {currentComponent === "User Management" && <UserManagement />}
          {currentComponent === "Job Management" && (
            <JobManagement
              onMessage={() => {
                setCurrentComponent("Communication & Reviews");
                setMessageOpen(true);
              }}
            />
          )}
          {currentComponent === "Dispute Management" && <DisputeManagement />}
          {currentComponent === "Job Matching" && <JobMatching />}
          {/* {currentComponent === "Communication & Reviews" && <Communication />} */}
          {currentComponent === "Communication & Reviews" && (
            <Communication messageOpen={messageOpen} />
          )}
          {currentComponent === "Payroll Management" && <PayrollManagement />}
          {currentComponent === "Setting" && <Setting />}
          {currentComponent === "Analytics & Reporting" && (
            <AnalyticsDashboard />
          )}
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}
