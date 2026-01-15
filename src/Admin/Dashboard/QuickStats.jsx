import { CheckCircle, Briefcase, AlertTriangle, Icon } from "lucide-react";
import { FaBriefcase } from "react-icons/fa6";
import { FaCheck } from "react-icons/fa6";
import { TbAlertTriangleFilled } from "react-icons/tb";
const recentActivities = [
  {
    id: 1,
    title: "New phlebotomist approved",
    subtitle: "Dr. Maria Rodriguez - 2 minutes ago",
    icon: FaCheck,
    iconColor: "text-green-500",
    iconBg: "bg-green-100",
  },
  {
    id: 2,
    title: "Job posting created",
    subtitle: "Memorial Hospital - 15 minutes ago",
    icon: FaBriefcase,
    iconColor: "text-blue-500",
    iconBg: "bg-blue-100",
  },
  {
    id: 3,
    title: "Dispute reported",
    subtitle: "Job #1247 - 1 hour ago",
    icon: TbAlertTriangleFilled,
    iconColor: "text-orange-500",
    iconBg: "bg-orange-100",
  },
];
const quickStats = [
  {
    label: "Jobs Completed Today",
    value: "47",
    color: "text-gray-900",
  },
  {
    label: "Average Rating",
    value: "4.8",
    color: "text-gray-900",
  },
  {
    label: "Active Disputes",
    value: "3",
    color: "text-red-500",
  },
  {
    label: "Response Time",
    value: "2.3 hrs",
    color: "text-gray-900",
  },
];
export function ActivityCard() {
  return (
    <>
      {/* Recent Activity Section */}
      <div
        style={{
          boxShadow: "0px 4px 6px 0px #0000001A",
          borderTop: "none",
          borderRight: "none",
          borderBottom: "none",
        }}
        className="bg-white rounded-lg shadow-sm  p-6"
      >
        <h2 className="text-xl font-semibold text-gray-900 mb-6">
          Recent Activity
        </h2>
        <div className="space-y-4">
          {recentActivities.map((activity) => {
            const IconComponent = activity.icon;
            return (
              <div
                key={activity.id}
                className="flex items-start space-x-3 bg-[#F9FAFB] p-3 rounded-md"
              >
                <div
                  className={`flex-shrink-0 w-10 h-10 rounded-full ${activity.iconBg} flex items-center justify-center`}
                >
                  <IconComponent className={`w-5 h-5 ${activity.iconColor}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900">
                    {activity.title}
                  </p>
                  <p className="text-sm text-gray-500">{activity.subtitle}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

import React from "react";

const QuickStats = () => {
  return (
    <>
      {/* Quick Stats Section */}
      <div
        style={{
          boxShadow: "0px 4px 6px 0px #0000001A",
          borderTop: "none",
          borderRight: "none",
          borderBottom: "none",
        }}
        className="bg-white rounded-lg shadow-sm   p-6 h-full"
      >
        <h2 className="text-xl font-semibold text-gray-900 mb-6">
          Quick Stats
        </h2>
        <div className="space-y-1">
          {quickStats.map((stat, index) => (
            <div key={index} className="flex items-center justify-between">
              <span className="text-sm text-gray-600">{stat.label}</span>
              <span className={`text-lg font-semibold ${stat.color}`}>
                {stat.value}
              </span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default QuickStats;
