import React from 'react';
import { PublicLayout } from '../../layouts/PublicLayout.jsx';
import { HeroSection } from './sections/HeroSection.jsx';
import { PublicFacilitiesSection } from './sections/PublicFacilitiesSection.jsx';
import { LiveTransitPreviewSection } from './sections/LiveTransitPreviewSection.jsx';
import { SmartBusStopShowcaseSection } from './sections/SmartBusStopShowcaseSection.jsx';
import { ProblemSection } from './sections/ProblemSection.jsx';
import { SolutionSection } from './sections/SolutionSection.jsx';
import { CapabilitiesSection } from './sections/CapabilitiesSection.jsx';
import { HowItWorksSection } from './sections/HowItWorksSection.jsx';
import { MultiRoleEcosystemSection } from './sections/MultiRoleEcosystemSection.jsx';
import { LiveTrackingShowcaseSection } from './sections/LiveTrackingShowcaseSection.jsx';
import { AiIntelligenceSection } from './sections/AiIntelligenceSection.jsx';
import { SecurityScalabilitySection } from './sections/SecurityScalabilitySection.jsx';
import { SocPreviewSection } from './sections/SocPreviewSection.jsx';
import { ImpactMetricsSection } from './sections/ImpactMetricsSection.jsx';
import { FinalCtaSection } from './sections/FinalCtaSection.jsx';

export function LandingPage({ onSwitchToShell, onOpenSignIn }) {
  const scrollTo = (elementId) => {
    const el = document.getElementById(elementId);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <PublicLayout
      onOpenDemo={() => scrollTo('live-tracking')}
      onOpenSignIn={onOpenSignIn}
      onSwitchToShell={onSwitchToShell}
    >
      {/* 1. Hero Section with Live 2-Column Metropolitan Transit Visualizer */}
      <HeroSection
        onExploreTransit={() => scrollTo('live-tracking')}
        onHowItWorks={() => scrollTo('how-it-works')}
      />

      {/* 2. Public Facilities Infrastructure Transformation (4 Cards) */}
      <PublicFacilitiesSection />

      {/* 3. Live Transit Preview Dashboard ("See Your City in Real Time.") */}
      <LiveTransitPreviewSection />

      {/* 4. Smart Bus Stop Digital Public Facility Showcase */}
      <SmartBusStopShowcaseSection />

      {/* 5. Problem vs Solution Comparison (Today vs With SmartTransit OS) */}
      <ProblemSection />

      {/* 6. Unified Transit Architecture */}
      <SolutionSection />

      {/* 7. Core Capabilities & Public Infrastructure Features */}
      <CapabilitiesSection />

      {/* 8. How SmartTransit Works (Processing Pipeline) */}
      <HowItWorksSection />

      {/* 9. Multi-Role Ecosystem (Passenger, Driver, Admin, SOC) */}
      <MultiRoleEcosystemSection
        onExploreRole={() => {
          if (onSwitchToShell) onSwitchToShell();
        }}
      />

      {/* 10. Live Tracking Experience (Simulated Map Showcase) */}
      <LiveTrackingShowcaseSection />

      {/* 11. AI Intelligence Section ("From Transit Data to Public Intelligence.") */}
      <AiIntelligenceSection />

      {/* 12. Security & Scalability ("Built for the Infrastructure People Depend On.") */}
      <SecurityScalabilitySection />

      {/* 13. System Operations Center (SOC Preview Wall) */}
      <SocPreviewSection
        onExploreSoc={() => {
          if (onSwitchToShell) onSwitchToShell();
        }}
      />

      {/* 14. Impact Metrics (Benchmarked KPIs with Prototype Label) */}
      <ImpactMetricsSection />

      {/* 15. Final CTA Banner ("Build a Smarter Transit Network.") */}
      <FinalCtaSection
        onExploreTransit={() => scrollTo('live-tracking')}
        onExplorePlatform={() => scrollTo('capabilities')}
      />
    </PublicLayout>
  );
}

export default LandingPage;
