import React from "react";
import AvatarImage from "../../assets/images/Image-52.png";
import ProfileModal from "./ProfileModal";

const ProfessionalList = ({ isOpen, onClose, data: professionals,count }) => {
  const [isProfileOpen, setIsProfileOpen] = React.useState(false);

  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className=" max-w-md max-h-[70vh] overflow-auto mx-auto bg-white pb-2 shadow-lg ">
        <div className="sticky top-0 ">
          <div className="absolute top-4 right-4">
            <button
              onClick={onClose}
              className="text-gray-400 transition-colors h-8 w-8 bg-gray-200 flex items-center justify-center rounded-full"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
        {/* Header */}
        <div className="flex justify-between items-center p-4 mt-12 border-b border-gray-100">
          <button className="text-gray-600 text-sm font-medium">
            View All
          </button>
          <span className="text-gray-600 text-sm font-medium">{count} Total</span>
        </div>

        {/* Professional List */}
        <div className="">
          {professionals.map((professional) => (
            <div
              key={professional.id}
              onClick={() => setIsProfileOpen(true)}
              className="p-4 m-[10px]  border-[1px] border-[#E5E7EB] rounded-[10px]"
            >
              <div className="flex items-center justify-between  transition-colors cursor-pointer">
                <div className="flex items-center space-x-3 flex-1">
                  {/* Avatar */}
                  <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                    <img
                      src={professional.image || AvatarImage}
                      alt={professional.full_name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Professional Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2 align-middle mb-1">
                      <h3 className="text-gray-900 font-semibold text-base">
                        {professional.full_name}
                      </h3>
                      {professional.status && (
                        <span className="bg-green-100 text-green-800 text-xs font-medium px-2 py-1 rounded-full">
                          {professional.status}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Arrow */}
                <div onClick={() => setIsProfileOpen(true)} className="ml-3">
                  <svg
                    className="w-5 h-5 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
              </div>
              <div className="space-x-4 mt-3 flex">
                {professional.location && (
                  <div className="flex items-center text-sm text-gray-600">
                    <svg
                      className="w-4 h-4 text-teal-500 mr-1 flex-shrink-0"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span>{professional.location}</span>
                  </div>
                )}

                {professional.years_of_experience && (
                  <div className="flex items-center text-sm text-gray-600">
                    <svg
                      className="w-4 h-4 text-teal-500 mr-1 flex-shrink-0"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span>{professional.years_of_experience + " years experience"}</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Profile Modal */}
      {isProfileOpen && (
        <ProfileModal
          isOpen={isProfileOpen}
          onClose={() => setIsProfileOpen(false)}
          professional={null} // Pass the selected professional data here
        />
      )}
    </div>
  );
};

export default ProfessionalList;
