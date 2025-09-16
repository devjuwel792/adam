import { useState } from "react";
import { Sidebar } from "./Sidebar";
import UserManagement from "./UserManagement/UserManagement";
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


export default function AdminDashboard() {
  const [currentComponent, setCurrentComponent] = useState("Dashboard"); // New state to track the active component

  const handleComponentChange = (component) => {
    setCurrentComponent(component);
  };
  return (
    <div
      style={{ fontFamily: "Montserrat" }}
      className="flex bg-[#EEF6FF] font-poppins"
    >
      {/* Sidebar */}
      <div className="w-72 fixed top-0 left-0 h-screen">
        <Sidebar
          currentComponent={currentComponent}
          onMenuClick={handleComponentChange}
        />
        Sidebar
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
            <Header />
          </div>
        </div>

        {/* Content */}
        <div className="px-6 bg-[#ffffff]">
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
                        value="2,847"
                        icon={FaUsers}
                        color="teal"
                      />
                      <StatCard
                        title="Pending Verifications"
                        value="23"
                        icon={FaClock}
                        color="orange"
                      />
                      <StatCard
                        title="Active Jobs"
                        value="156"
                        icon={FaBriefcase}
                        color="blue"
                      />
                      <StatCard
                        title="Revenue This Month"
                        value="$48,290"
                        icon={FaDollarSign}
                        color="green"
                      />
                    </div>
                    {/* Left Column - Action Cards */}
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                      <ActionCard
                        title="Pending Registrations"
                        description="Review and approve new user registrations waiting for verification"
                        count={15}
                        buttonText="Review Now"
                        color="orange"
                      />
                      <ActionCard
                        title="Documents to Verify"
                        description="Verify professional credentials and certifications submitted by users"
                        count={8}
                        buttonText="Verify Now"
                        color="blue"
                      />
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
            </div>
          )}
          {currentComponent === "User Management" && <UserManagement />}
          {/* {currentComponent === "Job Management" && <Monetization />}
          {currentComponent === "Dispute Management" && <Account />}
          {currentComponent === "Communication & Reviews" && <Terms />}
          {currentComponent === "Analytics & Reporting" && <Terms />}
          {currentComponent === "Payroll Management" && <Privacy />} */}
        </div>
      </div>
    </div>
  );
}
