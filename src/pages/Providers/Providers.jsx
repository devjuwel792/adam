import React from "react";
import { ProvidersHero } from "./ProvidersHero";
import PartnershipProgram from "./PartnershipProgram";
import PartnershipRequirements from "./PartnershipRequirements";
import PartnershipApplication from "./PartnershipApplication";
import { TrustSection } from "../Home/TrustSection";

export const Providers = () => {
  return (
    <div>
      <ProvidersHero />
      <PartnershipProgram />
      <PartnershipRequirements />
      <PartnershipApplication />
      <TrustSection />
    </div>
  );
};
