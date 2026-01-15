import HealthcareProcess from "./HealthcareProcess"
import HealthcareServices from "./HealthcareService"
import { ServiceHero } from "./ServiceHero"

export const Services = () => {
  return (
    <div>
        <ServiceHero />
        <HealthcareServices />
        <HealthcareProcess />
    </div>
  )
}
