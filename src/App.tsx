import React, { useState, useEffect } from 'react';
import { TEMPLATES } from './themes';
import { SAMPLE_VENTURES } from './sampleData';
import { TemplateTheme, VentureData } from './types';
import { SITE_CONFIG } from './siteConfig';
import { micrositeService } from './services/micrositeService';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import WhyChooseSection from './components/WhyChooseSection';
import AboutSection from './components/AboutSection';
import AmenitiesSection from './components/AmenitiesSection';
import BrochureBanner from './components/BrochureBanner';
import NeighbourhoodSection from './components/NeighbourhoodSection';
import LocationsSection from './components/LocationsSection';
import MasterPlanSection from './components/MasterPlanSection';
import FaqSection from './components/FaqSection';
import ContactFormSection from './components/ContactFormSection';
import { FooterSection } from './components/FooterSection';
import MicrositeSkeleton from './components/MicrositeSkeleton';
import ElevenLabsWidgets from './components/ElevenLabsWidgets';
import { InteractiveMapPlot } from './types/interactiveMap';
import { updateDocumentSeo } from './utils/seoManager';

export default function App() {
  const initialTheme =
    TEMPLATES.find((t) => t.id === SITE_CONFIG.defaultThemeId) || TEMPLATES[0];
  const [currentTheme, setCurrentTheme] = useState<TemplateTheme>(initialTheme);
  const [currentVenture, setCurrentVenture] = useState<VentureData | null>(null);
  const [isLoadingLiveVenture, setIsLoadingLiveVenture] = useState<boolean>(true);
  const [selectedPlotForEnquiry, setSelectedPlotForEnquiry] = useState<InteractiveMapPlot | null>(null);
  const [sectionVisibility, setSectionVisibility] = useState<Record<string, boolean>>({
    hero: true,
    whyChoose: true,
    stats: false,
    about: true,
    amenities: true,
    brochure: true,
    neighbourhood: false,
    locations: true,
    masterPlan: true,
    faq: true,
    contact: true,
    footer: true,
  });

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
          } else if (SITE_CONFIG.enableOfflineFallback) {
            setCurrentVenture(SAMPLE_VENTURES[0]);
            updateDocumentSeo(SAMPLE_VENTURES[0]);
          }
        }
      } catch (err) {
        console.warn('Could not load live venture, falling back to local dataset:', err);
        if (isMounted && SITE_CONFIG.enableOfflineFallback) {
          setCurrentVenture(SAMPLE_VENTURES[0]);
        }
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

  // Apply dynamic color palette from CMS to the theme token system.
  // Only overrides when a saved palette is present — falls back to default theme otherwise.
  useEffect(() => {
    if (currentVenture?.colorPalette) {
      const p = currentVenture.colorPalette;
      const root = document.documentElement;

      root.style.setProperty('--theme-accent', p.accent);
      root.style.setProperty('--theme-accent-hover', p.accentHover || p.accent);
      root.style.setProperty('--theme-primary', p.primary);
      root.style.setProperty('--theme-bg', p.background);
      root.style.setProperty('--theme-card-bg', p.cardBg);
      root.style.setProperty('--theme-border', p.borderColor || '#EAE4D9');
      document.body.style.backgroundColor = p.background;

      setCurrentTheme((prev) => ({
        ...prev,
        textPrimary: p.textPrimary || p.primary,
        accent: p.accent,
        accentHover: p.accentHover,
        accentLight: p.background,
        bgSecondary: p.background,
        bgCard: p.cardBg,
        borderColor: p.borderColor,
        heroGradient: `linear-gradient(180deg, ${p.cardBg} 0%, ${p.background} 100%)`,
      }));
    }
  }, [currentVenture]);

  const scrollToContact = () => {
    const el = document.getElementById('contact');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  // While fetching API data, show luxury skeleton loader (no dummy data flash)
  if (isLoadingLiveVenture || !currentVenture) {
    return <MicrositeSkeleton />;
  }

  return (
    <div
      className="min-h-screen transition-colors duration-500 font-sans selection:bg-amber-400 selection:text-slate-900"
      style={{
        backgroundColor: currentTheme.bgSecondary,
        color: currentTheme.textPrimary,
        fontFamily: currentTheme.fontBody,
      }}
    >
          {/* Navigation Bar */}
          <Navbar
            theme={currentTheme}
            venture={currentVenture}
            onEnquireClick={scrollToContact}
          />

          {/* 1. Hero Section */}
          {sectionVisibility.hero && (
            <HeroSection
              theme={currentTheme}
              venture={currentVenture}
              onEnquireClick={scrollToContact}
              onBrochureClick={scrollToContact}
            />
          )}

          {/* 2. Why Choose / Value Pillars */}
          {sectionVisibility.whyChoose && (
            <WhyChooseSection theme={currentTheme} venture={currentVenture} />
          )}

          {/* 3. About Overview */}
          {sectionVisibility.about && (
            <AboutSection
              theme={currentTheme}
              venture={currentVenture}
              onEnquireClick={scrollToContact}
            />
          )}

          {/* 5. World-Class Amenities */}
          {sectionVisibility.amenities && (
            <AmenitiesSection theme={currentTheme} venture={currentVenture} />
          )}

          {/* 6. Instant Brochure Download Banner */}
          {sectionVisibility.brochure && (
            <BrochureBanner
              theme={currentTheme}
              venture={currentVenture}
              onDownloadClick={scrollToContact}
            />
          )}

          {/* 7. Strategic Neighbourhood Transit */}
          {sectionVisibility.neighbourhood && (
            <NeighbourhoodSection theme={currentTheme} venture={currentVenture} />
          )}

          {/* 8. Prime Nearby Locations */}
          {sectionVisibility.locations && (
            <LocationsSection theme={currentTheme} venture={currentVenture} />
          )}

          {/* 9. Master Plan Cadastral Layout */}
          {sectionVisibility.masterPlan && (
            <MasterPlanSection
              theme={currentTheme}
              venture={currentVenture}
              onEnquireClick={scrollToContact}
              onSelectPlotForEnquiry={setSelectedPlotForEnquiry}
            />
          )}

          {/* 10. Frequently Asked Questions */}
          {sectionVisibility.faq && (
            <FaqSection theme={currentTheme} venture={currentVenture} />
          )}

          {/* 11. Schedule Site Visit & Inquiry Form */}
          {sectionVisibility.contact && (
            <ContactFormSection
              theme={currentTheme}
              venture={currentVenture}
              selectedPlot={selectedPlotForEnquiry}
            />
          )}

          {/* 12. Footer */}
          {sectionVisibility.footer && (
            <FooterSection theme={currentTheme} data={currentVenture} />
          )}

          {/* 13. ElevenLabs Conversational AI (Voicebot + Chatbot) */}
          {currentVenture && (
            <ElevenLabsWidgets
              chatbotAgentId={currentVenture.chatbotAgentId}
              voicebotAgentId={currentVenture.voicebotAgentId}
            />
          )}
    </div>
  );
}
