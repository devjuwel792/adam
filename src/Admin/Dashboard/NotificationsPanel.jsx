import { useEffect, useState } from "react";
import JobDetailsModal from "../JobManagement/JobDetailsModal";
import { BsThreeDots } from "react-icons/bs";
const NotificationsPanel = ({ isOpen, onClose, onMessage }) => {
  const [activeFilter, setActiveFilter] = useState("All");
  const [isJobDetailsOpen, setIsJobDetailsOpen] = useState(false);
  const [hideNotification, setHideNotification] = useState(false);
  if (!isOpen) return null;

  const notifications = [
    {
      id: 1,
      type: "New Appointment Booked",
      message: 'Fahmida Tasnim selected for <b>"Mobile Blood Draw"</b>',
      time: "2 hr",
      isNew: true,
    },
    {
      id: 2,
      type: "New Client request",
      message: 'Fahmida Tasnim selected for <b>"Mobile Blood Draw"</b> ',
      time: "2 hr",
      isNew: true,
    },
  ];

  //   if (!isOpen) return null

  return (
    <>
      <div
        style={{ display: hideNotification ? "none" : "block" }}
        className="bg-white  absolute top-7 right-0 shadow-xl w-[400px] max-w-md h-[600px] flex flex-col z-[10000]"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4">
          <span className="text-gray-600 font-medium">View All</span>
          <span className="text-gray-600 font-medium">150 Total</span>
        </div>

        {/* Filter Tabs */}
        <div className="px-4 py-3 ">
          <div className="flex justify-between items-center space-x-2">
            <button
              onClick={() => setActiveFilter("All")}
              className={`px-4 py-1  rounded-lg text-sm font-medium transition-colors ${
                activeFilter === "All"
                  ? "bg-[#C9A14A] text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              All
            </button>
            <button
              onClick={onClose}
              className="text-gray-800  hover:text-gray-600 text-2xl font-light bg-[#f9fafb] h-8 w-8 flex items-center justify-center rounded-full"
            >
              ×
            </button>
          </div>
        </div>

        {/* Notifications List */}
        <div className="flex-1 overflow-y-auto p-4 ">
          {notifications.map((notification) => (
            <div
              key={notification.id}
              className="flex items-start space-x-3 p-3 border bg-[#FDFCFA]"
            >
              {/* Status Indicator */}
              <div className="w-3 h-3 bg-[#C9A14A] rounded-full mt-1 flex-shrink-0"></div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="text-sm font-semibold text-gray-900">
                    {notification.type}
                  </h3>
                  <span className="text-xs text-gray-500 flex-shrink-0">
                    {notification.time}
                    <BsThreeDots className="cursor-pointer" />
                  </span>
                </div>

                <p
                  className="text-sm text-gray-600 mb-3"
                  dangerouslySetInnerHTML={{ __html: notification.message }}
                ></p>

                <button
                  onClick={() => {
                    setIsJobDetailsOpen(true);
                    setHideNotification(true);
                  }}
                  className="px-5 py-1  border border-[#C9A14A] rounded-md text-sm font-medium text-[#C9A14A] transition-colors"
                >
                  View Job
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <JobDetailsModal
        isOpen={isJobDetailsOpen}
        onMessage={onMessage}
        onClose={() => {
          setIsJobDetailsOpen(false);
          setHideNotification(false);
        }}
      />
    </>
  );
};

export default NotificationsPanel;
