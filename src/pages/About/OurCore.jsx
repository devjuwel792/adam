import { Heart, CheckCircle, Lightbulb, Shield } from "lucide-react"

export default function OurCoreValues() {
  const values = [
    {
      icon: Heart,
      title: "Compassion",
      description: "Every interaction is guided by empathy and understanding of our patients' needs and concerns.",
      bgColor: "bg-blue-50",
      iconColor: "text-blue-500",
    },
    {
      icon: CheckCircle,
      title: "Excellence",
      description: "We maintain the highest standards in all aspects of our service delivery and testing procedures.",
      bgColor: "bg-green-50",
      iconColor: "text-green-500",
    },
    {
      icon: Lightbulb,
      title: "Innovation",
      description: "Continuously improving our services and embracing innovative healthcare solutions.",
      bgColor: "bg-purple-50",
      iconColor: "text-purple-500",
    },
    {
      icon: Shield,
      title: "Integrity",
      description: "Building trust through honesty, and ethical practices in everything we do.",
      bgColor: "bg-red-50",
      iconColor: "text-red-500",
    },
  ]

  return (
    <section className="bg-gray-50 py-16 md:py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl sm:text-4xl font-bold text-[#2c2c2c] text-center mb-12 md:mb-16">Our Core Values</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((value, index) => {
            const IconComponent = value.icon
            return (
              <div key={index} className="bg-white rounded-lg p-6 text-center shadow-lg">
                <div
                  className={`w-12 h-12 ${value.bgColor} rounded-full flex items-center justify-center mx-auto mb-4`}
                >
                  <IconComponent className={`w-6 h-6 ${value.iconColor}`} />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{value.title}</h3>
                <p className="text-base text-gray-600 leading-relaxed">{value.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
