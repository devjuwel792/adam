import { useState } from "react";
import { FaEye } from "react-icons/fa";
import { useGetUsersListQuery } from "../../store/services/dashboardApi";
import DetailedUserProfile from "./DetailedUserProfile";

const statusColors = {
  active: "bg-green-100 text-green-800",
  suspended: "bg-red-100 text-red-800",
  pending: "bg-yellow-100 text-yellow-800",
};

const roleColors = {
  phlebotomist: "bg-blue-100 text-blue-800",
  client: "bg-purple-100 text-purple-800",
};

const UserManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRole, setSelectedRole] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const { data, isLoading, error } = useGetUsersListQuery();
  const users = data?.results || [];

  const filtered = users.filter((u) => {
    const matchSearch = u.full_name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchRole = !selectedRole || u.role === selectedRole;
    const matchStatus = !selectedStatus || u.status === selectedStatus;
    return matchSearch && matchRole && matchStatus;
  });

  return (
    <div style={{ fontFamily: "Montserrat" }} className="w-full mx-auto mt-6 bg-white rounded-lg shadow-sm">
      {/* Filters */}
      <div className="p-6 border rounded-md border-gray-200">
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
          <div className="relative">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none"
            />
          </div>

          <div className="flex gap-4">
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">Role:</span>
              <select
                value={selectedRole}
                onChange={(e) => setSelectedRole(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none"
              >
                <option value="">All Roles</option>
                <option value="phlebotomist">Phlebotomist</option>
                <option value="client">Client</option>
              </select>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">Status:</span>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none"
              >
                <option value="">All Status</option>
                <option value="active">Active</option>
                <option value="suspended">Suspended</option>
                <option value="pending">Pending</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {isLoading && <p className="p-12 text-center text-gray-500">Loading users...</p>}
      {error && <p className="p-12 text-center text-red-500">Error loading users.</p>}

      <div className="space-y-3 my-6">
        {filtered.map((user) => (
          <div key={user.id} className="p-6 rounded-md bg-[#f6f6f6] hover:bg-gray-50 transition-colors">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <img
                  src={user.profile_picture}
                  alt={user.full_name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <h3 className="text-lg font-medium text-gray-900">{user.full_name}</h3>
                  <div className="flex items-center gap-3 mt-1">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${roleColors[user.role] || "bg-gray-100 text-gray-800"}`}>
                      {user.role}
                    </span>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${statusColors[user.status] || "bg-gray-100 text-gray-800"}`}>
                      {user.status}
                    </span>
                    <span className="text-sm text-gray-500">Joined: {user.joined_at}</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => { setSelectedUserId(user.id); setIsProfileOpen(true); }}
                className="px-3 flex gap-1 items-center py-1 bg-[#C9A14A] text-white text-sm rounded-md"
              >
                <FaEye /> View
              </button>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && !isLoading && (
        <p className="p-12 text-center text-gray-500">No users found matching your criteria.</p>
      )}

      <DetailedUserProfile
        isOpen={isProfileOpen}
        userId={selectedUserId}
        onClose={() => { setIsProfileOpen(false); setSelectedUserId(null); }}
      />
    </div>
  );
};

export default UserManagement;
