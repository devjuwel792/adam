import { Users, Award, Star } from "lucide-react";
import dr from "../../assets/images/hero.png";
import people from "../../assets/images/people.svg";
import star from "../../assets/images/star.svg";
import tag from "../../assets/images/tag.svg";

export default function Hero() {
  const stats = [
    {
      icon: people,
      iconBg: "bg-[#DBEAFE]",
      value: "2,500+",
      label: "Patients Served",
    },
    {
      icon: tag,
      iconBg: "bg-[#DCFCE7]",
      value: "15+",
      label: "Years Collective Experience",
    },
    {
      icon: star,
      iconBg: "bg-[#FEF9C3]",
      value: "99%",
      label: "Patient Satisfaction",
    },
  ];

  return (
    <section className="bg-gradient-to-r from-[#F4ECDB] to-[#FAF6ED] py-12 md:py-16 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Doctor image */}
          <div className="flex justify-center lg:justify-start order-last lg:order-first">
            <img
              src={dr}
              alt="Healthcare professional"
              className="w-full max-w-md rounded-lg"
            />
          </div>

          {/* Right side - Content */}
          <div className="text-center lg:text-left">
            <h2 className="text-4xl sm:text-5xl font-bold text-[#2C2C2C] mb-5">
              About PRIMEPATH
            </h2>
            <p className="text-gray-600 text-lg md:text-xl leading-relaxed">
              Revolutionizing healthcare accessibility through innovative mobile
              laboratory services, bringing professional medical testing
              directly to your doorstep with uncompromising quality and care.
            </p>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 md:mt-24">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-[#FAF6ED] rounded-2xl shadow-xl p-8 flex flex-col gap-2 items-center justify-center text-center"
            >
              <div
                className={`p-4 rounded-full flex items-center justify-center mb-2 ${stat.iconBg}`}
              >
                <img src={stat.icon} alt={`${stat.label} icon`} />
              </div>
              <p className="text-[#2c2c2c] font-bold text-3xl sm:text-4xl">
                {stat.value}
              </p>
              <p className="text-[#4B5563] text-base">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
