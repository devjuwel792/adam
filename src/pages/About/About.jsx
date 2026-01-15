import React from 'react'
import Hero from './Hero'
import MeetFounder from './MeetFounder'
import OurMission from './OurMission'
import OurCoreValues from './OurCore'
import CredentialsCertifications from './CredentialsCertifications'
import CommitmentConfidentiality from './Commitment'
import InsuranceBonding from './Insurance'

export const About = () => {
  return (
    <div>
        <Hero />
        <MeetFounder />
        <OurMission />
        <OurCoreValues />
        <CredentialsCertifications />
        <CommitmentConfidentiality />
        <InsuranceBonding />
    </div>
  )
}
