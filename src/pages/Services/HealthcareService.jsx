import { Check } from "lucide-react";
import tube from "../../assets/images/tube.png";
import { useNavigate } from "react-router-dom";
import { useGetServicePackagesQuery } from "../../store/services/appointmentApi";

const HealthcareServices = () => {
  const navigate = useNavigate();
  const { data, isLoading, isError } = useGetServicePackagesQuery();
  const services = data?.results ?? [];

  if (isLoading) return <div className="py-20 text-center text-gray-500">Loading services...</div>;
  if (isError) return <div className="py-20 text-center text-red-500">Failed to load services.</div>;

  return (
    <div className="bg-gray-50 min-h-screen py-12 md:py-16 lg:py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 md:mb-16">
          <h1 className="text-3xl sm:text-4xl font-bold text-[#2c2c2c] mb-4">
            Detailed Service Offerings
          </h1>
          <p className="text-lg sm:text-xl text-[#4B5563]">
            Comprehensive healthcare services delivered directly to your location
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <div
              key={service.id}
              className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 flex flex-col"
            >
              <div className="w-12 h-12 bg-[#C9A14A] rounded-full flex items-center justify-center text-white mb-4">
                {service.icon ? (
                  <img src={service.icon} alt={service.name} className="w-6 h-6 object-contain" />
                ) : (
                  <img src={tube} alt="service icon" className="w-6 h-6 object-contain" />
                )}
              </div>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">{service.name}</h3>

              <p className="text-gray-600 mb-6 text-sm leading-relaxed">{service.description}</p>

              <div className="mb-6">
                <span className="text-2xl sm:text-3xl font-bold text-[#C9A14A]">
                  ${service.price}
                </span>
                <span className="text-gray-500 ml-2 text-sm">starting at</span>
              </div>

              <div className="mb-8 flex-grow">
                <h4 className="text-sm font-semibold text-gray-900 mb-3">What's Included:</h4>
                <ul className="space-y-2">
                  {service.features.map((feature) => (
                    <li key={feature.id} className="flex items-center text-sm text-gray-600">
                      <Check className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                      {feature.name}
                    </li>
                  ))}
                </ul>
              </div>

              <button
                onClick={() => navigate("/schedule")}
                className="w-full bg-[#C9A14A] hover:bg-amber-600 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200 mt-auto"
              >
                Book Now
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HealthcareServices;
