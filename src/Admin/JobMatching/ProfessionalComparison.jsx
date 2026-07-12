import Avatar from "../../assets/images/Image-52.png";
import { FaCheck, FaStar } from "react-icons/fa6";
import { useGetAvailableUserDetailQuery } from "../../store/services/dashboardApi";

const ProfessionalComparison = ({ isOpen, onClose, userId, job }) => {
  const { data: profile, isLoading, isError } = useGetAvailableUserDetailQuery(userId, {
    skip: !userId,
  });

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-[60]">
      <div className="bg-white rounded-lg max-w-[50vw] w-full max-h-[90vh] overflow-y-auto">
        {/* Close */}
        <div className="flex justify-end p-4">
          <button
            onClick={onClose}
            className="text-gray-400 h-8 w-8 bg-gray-200 flex items-center justify-center rounded-full"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {isLoading && <div className="p-10 text-center">Loading profile...</div>}
        {isError && <div className="p-10 text-center text-red-500">Failed to load profile.</div>}

        {!isLoading && !isError && profile && (
          <>
            {/* Profiles Header */}
            <div className="flex justify-between gap-6 items-start px-6 pb-4">
              {/* Phlebotomist */}
              <div className="flex flex-1 items-center gap-3 p-3 shadow-sm rounded-md">
                <img
                  src={profile.avatar ?? Avatar}
                  alt={profile.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <h3 className="font-semibold text-gray-900">{profile.name}</h3>
                  <p className="text-sm text-gray-600 capitalize">{profile.specialty}</p>
                  <div className="flex items-center gap-1 mt-1">
                    {[...Array(5)].map((_, i) => (
                      <FaStar key={i} className={`w-4 h-4 ${i < Math.round(profile.rating) ? "text-yellow-400" : "text-gray-300"}`} />
                    ))}
                    <span className="text-sm text-gray-600 ml-1">{profile.rating} ({profile.reviews_count})</span>
                  </div>
                </div>
              </div>

              {/* Matched Client */}
              {profile.matched_client && (
                <div className="flex flex-1 items-center gap-3 p-3 shadow-sm rounded-md">
                  <img
                    src={profile.matched_client.avatar ?? Avatar}
                    alt={profile.matched_client.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="font-semibold text-gray-900">{profile.matched_client.name}</h3>
                    <p className="text-sm text-gray-600">{profile.matched_client.role}</p>
                    <div className="flex items-center gap-1 mt-1">
                      {[...Array(5)].map((_, i) => (
                        <FaStar key={i} className={`w-4 h-4 ${i < Math.round(profile.matched_client.rating) ? "text-yellow-400" : "text-gray-300"}`} />
                      ))}
                      <span className="text-sm text-gray-600 ml-1">{profile.matched_client.rating} ({profile.matched_client.reviews_count})</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="flex">
              {/* Left: Stats + Reviews */}
              <div className="flex-1">
                {/* Stats */}
                <div className="px-6 py-4">
                  <div className="flex justify-center space-x-12">
                    <div className="text-center">
                      <div className="text-2xl font-semibold text-yellow-500">{profile.jobs_completed}</div>
                      <div className="text-sm text-gray-600">Jobs Completed</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-semibold text-yellow-500">{profile.success_rate}</div>
                      <div className="text-sm text-gray-600">Success Rate</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-semibold text-yellow-500">{profile.experience_years}</div>
                      <div className="text-sm text-gray-600">Years Experience</div>
                    </div>
                  </div>
                </div>

                {/* Ratings & Reviews */}
                <div className="flex-1 p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h4 className="font-semibold text-[#003366]">Ratings & Reviews</h4>
                  </div>
                  <div className="bg-[#F1F1F1] rounded-lg p-4 mb-4 text-center">
                    <div className="text-3xl font-bold text-gray-900 mb-1">{profile.rating}</div>
                    <div className="flex justify-center gap-1 mb-2">
                      {[...Array(5)].map((_, i) => (
                        <FaStar key={i} className={`w-5 h-5 ${i < Math.round(profile.rating) ? "text-yellow-400" : "text-gray-300"}`} />
                      ))}
                    </div>
                    <div className="text-sm text-gray-600">Based on {profile.reviews_count} reviews</div>
                  </div>

                  {/* Reviews */}
                  <div className="space-y-4">
                    {profile.reviews?.map((review) => (
                      <div key={review.id} className="flex gap-3 pb-3 border-b">
                        <img
                          src={review.reviewer_avatar ?? Avatar}
                          alt={review.reviewer_name}
                          className="w-10 h-10 rounded-full object-cover"
                        />
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <div>
                              <h5 className="font-medium text-gray-900">{review.reviewer_name}</h5>
                              <div className="flex gap-0.5">
                                {[...Array(5)].map((_, i) => (
                                  <FaStar key={i} className={`w-4 h-4 ${i < review.rating ? "text-yellow-400" : "text-gray-300"}`} />
                                ))}
                              </div>
                            </div>
                            <span className="text-sm text-gray-500">{review.time_elapsed}</span>
                          </div>
                          <p className="text-sm text-gray-600">{review.comment}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right: Skills + Credentials */}
              <div className="flex-1">
                {/* Skills */}
                <div className="px-6 py-4 rounded m-5 shadow-sm">
                  <h4 className="font-semibold text-gray-900 mb-3">Skills</h4>
                  <div className="flex flex-wrap gap-2">
                    {profile.skills?.map((skill) => (
                      <span key={skill} className="px-3 py-1 rounded-full text-sm bg-gray-100 text-gray-800">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Credentials */}
                <div className="flex-1 p-6">
                  <h4 className="font-semibold text-gray-900 mb-4">Credentials</h4>
                  <div className="space-y-3">
                    {profile.credentials?.map((cred) => (
                      <div key={cred.name} className="flex items-center justify-between p-3 bg-[#FFFCFA] border hover:border-[#C9A14A] rounded-lg cursor-pointer">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-[#EFB944] text-white rounded-full flex items-center justify-center">
                            <FaCheck />
                          </div>
                          <div>
                            <div className="font-medium text-gray-900">{cred.name}</div>
                            <div className="text-sm text-gray-600">
                              {cred.verified ? "Verified" : "Unverified"} · Expires {cred.expires}
                            </div>
                          </div>
                        </div>
                        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    ))}
                  </div>

                  {/* Assign Job */}
                  <div className="mt-6">
                    <button
                      onClick={onClose}
                      className="w-full bg-[#C9A14A] text-white font-medium py-2 px-4 rounded-lg transition-colors"
                    >
                      Assign Job
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ProfessionalComparison;
