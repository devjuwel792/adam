import { Hero } from "./Hero";
import { TrustSection } from "./TrustSection";
import { WhyChoose } from "./WhyChoose";
import { OurServices } from "./OurServices";
import { ServiceArea } from "./ServiceArea";
import Faqs from "./Faqs";

export const Home = () => {
  return (
    <div>
      <Hero />
      <TrustSection />
      <WhyChoose />
      <OurServices />
      <ServiceArea />
      <Faqs />
    </div>
  );
};
