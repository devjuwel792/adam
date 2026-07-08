import { useLocation, useNavigate } from "react-router-dom";
import logo from "../../assets/images/logo2.png";
import {
  BriefcaseBusiness,
  Users,
  Handshake,
  MessageCircleMore,
  ChartBar,
  Banknote,
  House,
  LogOut,
} from "lucide-react";

const menuItems = [
  { icon: House, label: "Dashboard", path: "/admin" },
  { icon: Users, label: "User Management", path: "/admin/user-management" },
  { icon: Users, label: "Patient Management", path: "/admin/patient-management" },
  { icon: BriefcaseBusiness, label: "Job Management", path: "/admin/job-management" },
  { icon: Handshake, label: "Dispute Management", path: "/admin/dispute-management" },
  { icon: MessageCircleMore, label: "Communication & Reviews", path: "/admin/communication" },
  { icon: MessageCircleMore, label: "Job Matching", path: "/admin/job-matching" },
  { icon: ChartBar, label: "Analytics & Reporting", path: "/admin/analytics" },
  { icon: Banknote, label: "Payroll Management", path: "/admin/payroll" },
  { icon: Banknote, label: "Setting", path: "/admin/setting" },
  { icon: LogOut, label: "Logout", path: null },
];

export const Sidebar = ({ onLogout }) => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const handleClick = (item) => {
    if (item.path === null) {
      onLogout();
    } else {
      navigate(item.path);
    }
  };

  return (
    <div className="w-full h-full bg-white shadow-xl flex flex-col items-start border-r border-[#E5E7EB]">
      <div className="w-full border-b border-[#E5E7EB]">
        <div className="mb-2 p-6 flex items-center gap-3 justify-start">
          <img src={logo} className="w-10 h-10" alt="" />
          <div>
            <h1 className="font-bold text-lg text-[#2c2c2c]">CareShift</h1>
            <p className="text-sm text-[#9CA3AF]">Admin Panel</p>
          </div>
        </div>
      </div>
      <div>
        <p className="font-semibold text-xs py-4 px-6 text-[#9CA3AF]">Main Menu</p>
      </div>
      <nav className="w-full overflow-scroll [&::-webkit-scrollbar]:hidden">
        <ul className="w-full">
          {menuItems.map((item, index) => {
            const Icon = item.icon;
            const isActive = item.path === "/admin" ? pathname === "/admin" : pathname.startsWith(item.path);
            return (
              <li key={index}>
                <button
                  onClick={() => handleClick(item)}
                  className={`flex items-center w-full h-12 pl-6 py-3 text-start rounded-lg transition-colors mb-5 gap-2
    ${isActive ? "bg-[#C9A14A]/10 text-[#C9A14A]" : "text-[#4B5563]"}`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-semibold text-base">{item.label}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
};
