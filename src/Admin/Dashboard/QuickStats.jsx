import { FaCheck } from "react-icons/fa6";
import { FaBriefcase } from "react-icons/fa6";
import { TbAlertTriangleFilled } from "react-icons/tb";

export function ActivityCard({ activities = [] }) {
  const iconMap = {
    "New User Registration": { icon: FaCheck, iconColor: "text-green-500", iconBg: "bg-green-100" },
    default: { icon: FaBriefcase, iconColor: "text-blue-500", iconBg: "bg-blue-100" },
  };

  return (
    <div
      style={{ boxShadow: "0px 4px 6px 0px #0000001A" }}
      className="bg-white rounded-lg shadow-sm p-6"
    >
      <h2 className="text-xl font-semibold text-gray-900 mb-6">Recent Activity</h2>
      <div className="space-y-4">
        {activities.length === 0 ? (
          <p className="text-sm text-gray-500">No recent activity</p>
        ) : (
          activities.map((activity) => {
            const { icon: Icon, iconColor, iconBg } =
              iconMap[activity.activity] || iconMap.default;
            return (
              <div
                key={activity.id}
                className="flex items-start space-x-3 bg-[#F9FAFB] p-3 rounded-md"
              >
                <div className={`flex-shrink-0 w-10 h-10 rounded-full ${iconBg} flex items-center justify-center`}>
                  <Icon className={`w-5 h-5 ${iconColor}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900">{activity.activity}</p>
                  <p className="text-sm text-gray-500">
                    {activity.user} · {activity.timestamp}
                  </p>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

const QuickStats = ({ jobsCompleted, avgRating, activeDisputes, responseTime }) => {
  const stats = [
    { label: "Jobs Completed Today", value: jobsCompleted ?? "—", color: "text-gray-900" },
    { label: "Average Rating", value: avgRating ?? "—", color: "text-gray-900" },
    { label: "Active Disputes", value: activeDisputes ?? "—", color: "text-red-500" },
    { label: "Response Time", value: responseTime ? `${responseTime} hrs` : "—", color: "text-gray-900" },
  ];

  return (
    <div
      style={{ boxShadow: "0px 4px 6px 0px #0000001A" }}
      className="bg-white rounded-lg shadow-sm p-6 h-full"
    >
      <h2 className="text-xl font-semibold text-gray-900 mb-6">Quick Stats</h2>
      <div className="space-y-1">
        {stats.map((stat, index) => (
          <div key={index} className="flex items-center justify-between">
            <span className="text-sm text-gray-600">{stat.label}</span>
            <span className={`text-lg font-semibold ${stat.color}`}>{stat.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuickStats;
