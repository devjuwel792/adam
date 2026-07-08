import { useState } from "react";
import { FaUsers } from "react-icons/fa";
import { FaBriefcase, FaClock, FaDollarSign } from "react-icons/fa6";
import DashboardImage from "../../assets/images/dashboardImage.png";
import {
  useGetDashboardDataQuery,
  useGetPendingRegistrationsQuery,
  useGetPendingDocumentsQuery,
} from "../../store/services/dashboardApi";
import { ActionCard } from "./ActionCard";
import { ActivityCard } from "./QuickStats";
import QuickStats from "./QuickStats";
import { StatCard } from "./StatCard";

export default function AdminDashboard() {
  const [isOpenProfessionalList, setIsOpenProfessionalList] = useState(false);
  const [isOpenDocumentVerifyModal, setIsOpenDocumentVerifyModal] = useState(false);

  const { data: dashboardData, isLoading } = useGetDashboardDataQuery();
  const { data: pendingRegistrationsData } = useGetPendingRegistrationsQuery();
  const { data: pendingDocumentsData } = useGetPendingDocumentsQuery();

  return (
    <div className="min-h-screen p-6">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <StatCard
              title="Total Users"
              value={isLoading ? "..." : Number(dashboardData?.total_users || 0).toLocaleString()}
              icon={FaUsers}
              color="teal"
            />
            <StatCard
              title="Pending Verifications"
              value={isLoading ? "..." : String(dashboardData?.pending_verifications || 0)}
              icon={FaClock}
              color="orange"
            />
            <StatCard
              title="Active Jobs"
              value={isLoading ? "..." : String(dashboardData?.active_jobs || 0)}
              icon={FaBriefcase}
              color="blue"
            />
            <StatCard
              title="Revenue This Month"
              value={isLoading ? "..." : `$${dashboardData?.revenue_this_month || 0}`}
              icon={FaDollarSign}
              color="green"
            />
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <ActionCard
              title="Pending Registrations"
              description="Review and approve new user registrations waiting for verification"
              count={Number(dashboardData?.pending_registrations_count || 0)}
              data={pendingRegistrationsData?.users || []}
              buttonText="Review Now"
              color="orange"
              isOpen={() => setIsOpenProfessionalList(true)}
              isOpenProfileList={isOpenProfessionalList}
              onClose={() => setIsOpenProfessionalList(false)}
            />
            <ActionCard
              title="Documents to Verify"
              description="Verify professional credentials and certifications submitted by users"
              buttonText="Verify Now"
              color="blue"
              isOpen={() => setIsOpenDocumentVerifyModal(true)}
              isOpenDocumentVerifyModal={isOpenDocumentVerifyModal}
              onClose={() => setIsOpenDocumentVerifyModal(false)}
              count={Number(dashboardData?.document_to_verify_count || 0)}
              data={pendingDocumentsData?.results || []}
            />
          </div>
        </div>

        <div className="flex h-full items-end justify-center">
          <img
            src={DashboardImage}
            alt="Healthcare Professional"
            className="object-cover w-full m-[-20px] max-w-[80%]"
          />
        </div>
      </div>

      <div className="flex gap-6 my-[35px]">
        <div className="w-8/12">
          <ActivityCard activities={dashboardData?.recent_activities || []} />
        </div>
        <div className="w-4/12">
          <QuickStats
            jobsCompleted={dashboardData?.jobs_completed_today}
            avgRating={dashboardData?.average_rating}
            activeDisputes={dashboardData?.active_disputes}
            responseTime={dashboardData?.response_time}
          />
        </div>
      </div>
    </div>
  );
}
