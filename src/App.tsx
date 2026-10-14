import React, { useState, useEffect } from 'react';
import { VentureData } from './types';
import { SITE_CONFIG } from './siteConfig';
import { micrositeService } from './services/micrositeService';
import { updateDocumentSeo } from './utils/seoManager';

import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import CinematicVideoSection from './components/CinematicVideoSection';
import DevelopmentHighlightsSection from './components/DevelopmentHighlightsSection';
import StatsBadges from './components/StatsBadges';
import WhyChooseSection from './components/WhyChooseSection';
import AboutSection from './components/AboutSection';
import AmenitiesSection from './components/AmenitiesSection';
import MasterPlanSection from './components/MasterPlanSection';
import LocationsSection from './components/LocationsSection';
import BrochureBanner from './components/BrochureBanner';
import FaqSection from './components/FaqSection';
import ContactFormSection from './components/ContactFormSection';
import FooterSection from './components/FooterSection';
import MicrositeSkeleton from './components/MicrositeSkeleton';
import ElevenLabsWidgets from './components/ElevenLabsWidgets';
import { InteractiveMapPlot } from './types/interactiveMap';

export default function App() {
  const [currentVenture, setCurrentVenture] = useState<VentureData | null>(null);
  const [isLoadingLiveVenture, setIsLoadingLiveVenture] = useState<boolean>(true);
  const [selectedPlotForEnquiry, setSelectedPlotForEnquiry] = useState<InteractiveMapPlot | null>(null);

  // Load live venture data directly from CMS API on mount
  useEffect(() => {
    let isMounted = true;
    const fetchLiveVenture = async () => {
      setIsLoadingLiveVenture(true);
      try {
        const live = await micrositeService.loadActiveVenture();
        if (isMounted) {
          if (live) {
            setCurrentVenture(live);
            updateDocumentSeo(live);
          } else {
            console.warn('[Theme1 App] Could not load live venture');
          }
        }
      } catch (err) {
        console.warn('[Theme1 App] Error loading live venture:', err);
      } finally {
        if (isMounted) setIsLoadingLiveVenture(false);
      }
    };

    fetchLiveVenture();
    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    if (currentVenture) {
      updateDocumentSeo(currentVenture);
    }
  }, [currentVenture]);

  // Apply dynamic color palette from CMS by injecting CSS custom properties
  useEffect(() => {
    if (!currentVenture?.colorPalette) return;
    const p = currentVenture.colorPalette;
    const root = document.documentElement;

    root.style.setProperty('--theme-accent', p.accent);
    root.style.setProperty('--theme-accent-hover', p.accentHover || p.accent);
    root.style.setProperty('--theme-primary', p.primary);
    root.style.setProperty('--theme-bg', p.background);
    root.style.setProperty('--theme-card-bg', p.cardBg);
    root.style.setProperty('--theme-border', p.borderColor || '#EAE4D9');
    document.body.style.backgroundColor = p.background;
  }, [currentVenture]);

  if (isLoadingLiveVenture || !currentVenture) {
    return <MicrositeSkeleton />;
  }

  return (
    <div
      className="min-h-screen font-sans selection:bg-rose-500/20 selection:text-rose-500 transition-colors duration-300"
      style={{
        backgroundColor: currentVenture?.colorPalette?.background || undefined,
        color: currentVenture?.colorPalette?.textPrimary || undefined,
      }}
    >
      <Navbar venture={currentVenture} />
      <main>
        {/* Section 1: Hero Section */}
        <HeroSection venture={currentVenture} />

        {/* Section 2: Cinematic Drone/Vimeo Video Section (Completely hidden if no video exists) */}
        {(currentVenture.vimeoId || currentVenture.vimeoUrl) && (
          <CinematicVideoSection venture={currentVenture} />
        )}

        {/* Section 3: Development Highlights Section */}
        <DevelopmentHighlightsSection venture={currentVenture} />

        {/* Section 4: Venture Snapshot / Stats Strip with 3D flip cards */}
        <StatsBadges venture={currentVenture} />

        {/* Section 5: Why This Location */}
        <WhyChooseSection venture={currentVenture} />

        {/* Section 6: Lifestyle & Master Planning (About) */}
        <AboutSection venture={currentVenture} />

        {/* Section 7: Infrastructure & Amenities */}
        <AmenitiesSection venture={currentVenture} />

        {/* Section 8: Interactive 2D & 3D Master Plan */}
        <MasterPlanSection
          venture={currentVenture}
          onSelectPlotForEnquiry={setSelectedPlotForEnquiry}
        />

        {/* Section 9: Regional Connectivity */}
        <LocationsSection venture={currentVenture} />

        {/* Section 10: Official Project Brochure */}
        <BrochureBanner venture={currentVenture} />

        {/* Section 11: Frequently Asked Questions */}
        <FaqSection venture={currentVenture} />

        {/* Section 12: VIP Site Visit Booking Form */}
        <ContactFormSection
          venture={currentVenture}
          selectedPlot={selectedPlotForEnquiry}
        />
      </main>

      {/* Section 13: Footer Section with dynamic 4 columns, social links, and Google Map */}
      <FooterSection venture={currentVenture} />

      {/* Real-time ElevenLabs Chat & Voice AI Assistants */}
      {currentVenture && (
        <ElevenLabsWidgets
          chatbotAgentId={currentVenture.chatbotAgentId}
          voicebotAgentId={currentVenture.voicebotAgentId}
        />
      )}
    </div>
  );
}
