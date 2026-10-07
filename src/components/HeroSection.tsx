import React, { useState, useRef, useEffect } from 'react';
import { TemplateTheme, VentureData } from '../types';

interface HeroSectionProps {
  theme: TemplateTheme;
  venture: VentureData;
  onEnquireClick: () => void;
  onBrochureClick: () => void;
}

interface ParsedVideo {
  type: 'vimeo' | 'youtube';
  ambientUrl: string;
  modalUrl: string;
  rawId: string;
}

function parseHeroVideo(rawIdOrUrl?: string | null): ParsedVideo | null {
  const input = (rawIdOrUrl || '').trim();
  if (!input) return null;

  // 1. YouTube
  const ytMatch = input.match(/(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
  if (ytMatch) {
    const id = ytMatch[1];
    return {
      type: 'youtube',
      ambientUrl: `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&mute=1&loop=1&playlist=${id}&controls=0&showinfo=0&rel=0&modestbranding=1&playsinline=1`,
      modalUrl: `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&controls=1&rel=0`,
      rawId: id,
    };
  }

  // 2. Vimeo (extract numerical ID, zero hardcoded default)
  const vimeoMatch = input.match(/(?:vimeo\.com\/(?:video\/)?|player\.vimeo\.com\/video\/)(\d{6,12})/);
  if (vimeoMatch) {
    const vimeoId = vimeoMatch[1];
    return {
      type: 'vimeo',
      ambientUrl: `https://player.vimeo.com/video/${vimeoId}?autoplay=1&muted=1&loop=1&autopause=0&controls=0&playsinline=1&title=0&byline=0&portrait=0`,
      modalUrl: `https://player.vimeo.com/video/${vimeoId}?autoplay=1&loop=1&title=1&byline=0&portrait=0&color=C5A880`,
      rawId: vimeoId,
    };
  }

  if (/^\d{6,12}$/.test(input)) {
    return {
      type: 'vimeo',
      ambientUrl: `https://player.vimeo.com/video/${input}?autoplay=1&muted=1&loop=1&autopause=0&controls=0&playsinline=1&title=0&byline=0&portrait=0`,
      modalUrl: `https://player.vimeo.com/video/${input}?autoplay=1&loop=1&title=1&byline=0&portrait=0&color=C5A880`,
      rawId: input,
    };
  }

  return null;
}

export default function HeroSection({
  theme,
  venture,
  onEnquireClick,
  onBrochureClick,
}: HeroSectionProps) {
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [isImageFullscreen, setIsImageFullscreen] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(true);

  const iframeRef = useRef<HTMLIFrameElement>(null);
  const playerContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleFullscreenChange = () => {
      const active = !!(
        document.fullscreenElement ||
        (document as any).webkitFullscreenElement ||
        (document as any).mozFullScreenElement ||
        (document as any).msFullscreenElement
      );
      setIsFullscreen(active);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
    document.addEventListener('mozfullscreenchange', handleFullscreenChange);
    document.addEventListener('MSFullscreenChange', handleFullscreenChange);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isFullscreen) {
        handleToggleFullscreen();
      }
      if (e.key === 'Escape' && isImageFullscreen) {
        setIsImageFullscreen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      document.removeEventListener('webkitfullscreenchange', handleFullscreenChange);
      document.removeEventListener('mozfullscreenchange', handleFullscreenChange);
      document.removeEventListener('MSFullscreenChange', handleFullscreenChange);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isFullscreen]);

  const handleToggleFullscreen = () => {
    const container = playerContainerRef.current;
    const isDocFs = !!(
      document.fullscreenElement ||
      (document as any).webkitFullscreenElement ||
      (document as any).mozFullScreenElement ||
      (document as any).msFullscreenElement
    );

    if (!isDocFs && !isFullscreen) {
      if (container) {
        if (container.requestFullscreen) {
          container.requestFullscreen().catch(() => {
            setIsFullscreen(true);
          });
        } else if ((container as any).webkitRequestFullscreen) {
          (container as any).webkitRequestFullscreen();
        } else if ((container as any).mozRequestFullScreen) {
          (container as any).mozRequestFullScreen();
        } else if ((container as any).msRequestFullscreen) {
          (container as any).msRequestFullscreen();
        } else {
          setIsFullscreen(true);
        }
      } else {
        setIsFullscreen(true);
      }
    } else {
      if (document.exitFullscreen && isDocFs) {
        document.exitFullscreen().catch(() => {});
      } else if ((document as any).webkitExitFullscreen && isDocFs) {
        (document as any).webkitExitFullscreen();
      } else if ((document as any).mozCancelFullScreen && isDocFs) {
        (document as any).mozCancelFullScreen();
      } else if ((document as any).msExitFullscreen && isDocFs) {
        (document as any).msExitFullscreen();
      }
      setIsFullscreen(false);
    }
  };

  const videoMeta = React.useMemo(() => {
    return parseHeroVideo(venture.vimeoId || venture.vimeoUrl);
  }, [venture.vimeoId, venture.vimeoUrl]);

  const specsList: Array<{ value: string; label: string; sub?: string }> =
    (venture.specs && venture.specs.length > 0 ? venture.specs : null) ||
    (venture.stats && venture.stats.length > 0 ? venture.stats : null) ||
    [];

  // Shorter version (top 3 items) of the Specs Banner
  const heroSpecs = React.useMemo(() => {
    if (specsList.length >= 3) {
      return specsList.slice(0, 3);
    }
    if (specsList.length > 0) {
      return specsList;
    }
    return [
      { value: '180+', label: 'GATED VILLA PLOTS', sub: 'DTCP & RERA Approved' },
      { value: '40 & 50 Ft', label: 'INTERNAL BLACKTOP AVENUES', sub: 'Engineered for Heavy Traffic' },
      { value: '100%', label: 'VAASTU ORIENTATION', sub: 'East & North Facing Alignments' },
    ];
  }, [specsList]);

  // Seamless volume toggle via postMessage without crashing browser unload policy
  const handleToggleSound = () => {
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);

    if (iframeRef.current?.contentWindow) {
      try {
        iframeRef.current.contentWindow.postMessage(
          JSON.stringify({ method: 'setVolume', value: nextMuted ? 0 : 1 }),
          '*'
        );
        iframeRef.current.contentWindow.postMessage(
          JSON.stringify({ method: 'setMuted', value: nextMuted }),
          '*'
        );
      } catch (err) {
        console.warn('Vimeo postMessage volume toggle:', err);
      }
    }
  };

  return (
    <>
      <section
        id="hero"
        className="relative bg-[#07132B] text-white pt-2 pb-6 sm:pt-3 sm:pb-8 lg:pt-4 lg:pb-8 border-b border-[#0B1B3D] overflow-hidden"
      >
        {/* Subtle Architectural Grid Background Accent */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.04]"
          style={{
            backgroundImage: 'radial-gradient(#C5A880 1px, transparent 1px)',
            backgroundSize: '28px 28px',
          }}
        />

        {/* Ambient Atmospheric Luxury Glows */}
        <div className="absolute top-0 left-1/4 w-[500px] h-[350px] bg-radial from-[#C5A880]/15 via-transparent to-transparent blur-[100px] pointer-events-none" />
        <div className="absolute bottom-0 right-10 w-[450px] h-[300px] bg-radial from-[#1E3A8A]/25 via-transparent to-transparent blur-[90px] pointer-events-none" />

        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12 relative z-10">
          {/* Main Dual-Device Architectural Composition */}
          <div className="flex flex-col lg:grid lg:grid-cols-12 lg:gap-10 xl:gap-14 lg:items-center">
            
            {/* ─── COLUMN A: Editorial & Identity (Desktop: Left Col, Mobile: Header + Bottom CTA) ─── */}
            <div className="lg:col-span-5 flex flex-col space-y-3 sm:space-y-3.5 text-center lg:text-left">
              {/* Category Eyebrow (Only rendered when present in CMS) */}
              {venture.welcomeEyebrow && venture.welcomeEyebrow.trim() !== '' && (
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-0.5 rounded-full bg-white/5 border border-[#C5A880]/40 text-[#C5A880] text-[10px] sm:text-[10.5px] uppercase font-bold tracking-[0.2em] shadow-xs backdrop-blur-xs">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#C5A880] animate-pulse"></span>
                    <span>{venture.welcomeEyebrow}</span>
                  </div>
                </div>
              )}

              {/* Grand Headline */}
              <div className="space-y-1">
                <h1 className="font-serif text-2xl sm:text-4xl lg:text-4xl xl:text-[2.75rem] font-bold tracking-tight text-white leading-tight lg:leading-[1.1]">
                  {venture.headline || venture.title}
                  {venture.location && (
                    <span className="italic font-normal font-serif text-[#C5A880] block sm:inline lg:block xl:inline sm:ml-2 lg:ml-0 xl:ml-2">
                      at {venture.location}
                    </span>
                  )}
                </h1>
              </div>

              {/* Subheadline (Desktop Only in this position) */}
              <p className="hidden lg:block text-xs sm:text-sm text-slate-300 font-light leading-relaxed max-w-lg">
                {venture.subheadline ||
                  venture.tagline ||
                  (venture.overviewText && venture.overviewText[0]) ||
                  'A master-planned residential plotted community engineered for generational wealth, immediate spot registration, and high-capital appreciation.'}
              </p>

              {/* Desktop 3-Metric Horizon Dock (Shorter Version of Specs Banner) */}
              <div className="hidden lg:grid grid-cols-3 divide-x divide-white/10 p-3 rounded-xl bg-white/5 border border-white/15 backdrop-blur-md shadow-lg">
                {heroSpecs.map((s, idx) => (
                  <div key={idx} className="space-y-0.5 text-center px-2">
                    <span className="text-[9.5px] uppercase font-bold tracking-wider text-[#C5A880] block truncate">
                      {s.label}
                    </span>
                    <span className="font-serif text-lg xl:text-xl font-bold text-white block truncate">
                      {s.value}
                    </span>
                    <span className="text-[9.5px] text-slate-300 block truncate" title={s.sub}>
                      {s.sub}
                    </span>
                  </div>
                ))}
              </div>

              {/* Desktop Duo Buttons */}
              <div className="hidden lg:flex items-center gap-3.5 pt-1">
                <button
                  type="button"
                  onClick={onEnquireClick}
                  className="px-7 py-3.5 rounded-sm bg-[#C5A880] hover:bg-[#b8986c] text-[#07132B] text-xs font-bold uppercase tracking-[0.16em] transition-all duration-300 shadow-[0_8px_20px_rgba(197,168,128,0.3)] hover:shadow-[0_12px_25px_rgba(197,168,128,0.45)] hover:-translate-y-0.5 cursor-pointer flex items-center gap-2"
                >
                  <span className="material-symbols-outlined text-[17px]">calendar_month</span>
                  <span>Schedule Site Visit</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    const el =
                      document.getElementById('about') || document.getElementById('why-choose');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="px-7 py-3.5 rounded-sm bg-white/10 hover:bg-white/15 text-white border border-white/20 hover:border-[#C5A880] text-xs font-bold uppercase tracking-[0.16em] transition-all duration-300 backdrop-blur-xs hover:-translate-y-0.5 cursor-pointer flex items-center gap-2"
                >
                  <span>Know More</span>
                  <span className="material-symbols-outlined text-[15px] text-[#C5A880]">
                    arrow_forward
                  </span>
                </button>
              </div>
            </div>

            {/* ─── COLUMN B: Visual Cinema Stage (Video OR 535x690 Showcase Image) ─── */}
            {videoMeta ? (
              <div className="lg:col-span-7 mt-5 sm:mt-8 lg:mt-0">
                {/* The Cinematic Media Card */}
                <div className="relative rounded-2xl p-1.5 sm:p-2.5 bg-white/5 border border-white/15 backdrop-blur-md shadow-[0_25px_70px_rgba(0,0,0,0.5)]">
                  {/* Media Screen Header (No Photos toggle) */}
                  <div className="flex items-center justify-between px-3 sm:px-4 py-2 sm:py-2.5 border-b border-white/10 bg-white/5 rounded-t-xl">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
                      <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-widest text-white">
                        Live 4K Drone Film
                      </span>
                      <span className="text-[10px] text-slate-400 hidden sm:inline">
                        • {venture.location || 'Venture'} Aerial Survey
                      </span>
                    </div>

                    <div className="flex items-center gap-2 text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-[#C5A880]">
                      <span className="px-2.5 py-0.5 rounded-sm bg-white/10 text-white font-mono text-[10px] tracking-widest">
                        {videoMeta.type === 'youtube' ? 'YOUTUBE 4K' : 'VIMEO 4K'}
                      </span>
                    </div>
                  </div>

                  {/* Viewport Screen with Video Player */}
                  <div
                    ref={playerContainerRef}
                    className={`relative ${
                      isFullscreen
                        ? 'fixed inset-0 z-[99999] w-screen h-screen bg-black rounded-none flex items-center justify-center'
                        : 'aspect-[16/10] sm:aspect-[16/9] lg:aspect-[16/10] xl:aspect-[16/9] bg-black overflow-hidden rounded-b-xl'
                    } group transition-all duration-200`}
                  >
                    <iframe
                      ref={iframeRef}
                      key={videoMeta.ambientUrl}
                      src={videoMeta.ambientUrl}
                      title={`${venture.title} 4K Aerial Video`}
                      allow="autoplay; fullscreen; picture-in-picture; encrypted-media"
                      className="w-full h-full object-cover block border-0"
                      style={{ border: 0 }}
                    />

                    {/* Interactive Controls Overlay */}
                    <div className={`absolute ${isFullscreen ? 'top-5 right-5 sm:top-6 sm:right-6' : 'top-3 right-3 sm:top-4 sm:right-4'} z-20 flex items-center gap-1.5 sm:gap-2`}>
                      <button
                        type="button"
                        onClick={handleToggleSound}
                        title={isMuted ? 'Enable Sound' : 'Mute Sound'}
                        className="px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-sm bg-black/80 hover:bg-black text-white text-[10px] sm:text-[11px] font-bold tracking-wider uppercase backdrop-blur-md border border-white/20 transition-all flex items-center gap-1.5 cursor-pointer shadow-md"
                      >
                        <span className="material-symbols-outlined text-[14px] sm:text-[15px]">
                          {isMuted ? 'volume_off' : 'volume_up'}
                        </span>
                        <span className="hidden xs:inline">{isMuted ? 'Sound Off' : 'Sound On'}</span>
                      </button>

                      <button
                        type="button"
                        onClick={handleToggleFullscreen}
                        title={isFullscreen ? 'Exit Fullscreen' : 'Open Fullscreen View'}
                        className="px-2 sm:px-2.5 py-1 sm:py-1.5 rounded-sm bg-black/80 hover:bg-black text-white text-[10px] sm:text-[11px] font-bold tracking-wider uppercase backdrop-blur-md border border-white/20 transition-all cursor-pointer shadow-md flex items-center gap-1"
                      >
                        <span className="material-symbols-outlined text-[15px] sm:text-[16px] block">
                          {isFullscreen ? 'fullscreen_exit' : 'fullscreen'}
                        </span>
                        {isFullscreen && <span>Exit</span>}
                      </button>
                    </div>

                    {/* Bottom Gradient Label */}
                    <div className="absolute bottom-0 inset-x-0 p-3 sm:p-5 bg-gradient-to-t from-black/90 via-black/40 to-transparent pointer-events-none flex items-end justify-between text-white">
                      <div>
                        <span className="text-xs sm:text-sm font-serif font-bold block text-white">
                          {venture.title} Aerial Survey
                        </span>
                        <span className="text-[9px] sm:text-[11px] text-slate-300 block">
                          {venture.location || 'Prime Corridor'} • Actual Site Footage
                        </span>
                      </div>
                      <span className="text-[9px] sm:text-xs font-mono text-[#C5A880] uppercase tracking-widest bg-black/60 px-2 py-0.5 rounded border border-white/15">
                        4K UHD
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="lg:col-span-7 mt-5 sm:mt-8 lg:mt-0 flex justify-center lg:justify-end">
                {/* The High-Precision Showcase Frame Tailored to 535x690 */}
                <div className="relative rounded-2xl sm:rounded-3xl p-1.5 sm:p-2 bg-white/5 border border-[#C5A880]/30 backdrop-blur-md shadow-[0_25px_70px_rgba(0,0,0,0.6)]">
                  {/* Viewport Screen with Exact 535x690 Showcase Image */}
                  <div
                    onClick={() => setIsImageFullscreen(true)}
                    className="relative aspect-[535/690] w-full max-w-[360px] sm:max-w-[400px] lg:max-w-[440px] xl:max-w-[480px] max-h-[580px] xl:max-h-[620px] bg-black/60 overflow-hidden rounded-xl sm:rounded-2xl group cursor-pointer"
                    title="Click to view full screen"
                  >
                    {venture.heroBanner ? (
                      <img
                        src={venture.heroBanner}
                        alt={`${venture.title} Official Showcase`}
                        className="w-full h-full object-cover object-center group-hover:scale-102 transition-transform duration-500 ease-out select-none"
                        loading="eager"
                        width={535}
                        height={690}
                      />
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center text-slate-400 font-mono text-sm bg-black/40">
                        Official Showcase Preview (535 × 690)
                      </div>
                    )}

                    {/* Slim Floating Full Screen Trigger Pill in Top Corner */}
                    <div className="absolute top-3 right-3 sm:top-4 sm:right-4 z-20">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setIsImageFullscreen(true);
                        }}
                        className="px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-sm bg-black/80 hover:bg-black text-white text-[10px] sm:text-[11px] font-bold tracking-wider uppercase backdrop-blur-md border border-white/20 transition-all flex items-center gap-1.5 cursor-pointer shadow-md hover:scale-105"
                      >
                        <span className="material-symbols-outlined text-[15px] sm:text-[16px] text-[#C5A880]">
                          fullscreen
                        </span>
                        <span>Full Screen</span>
                      </button>
                    </div>

                    {/* Bottom Gradient Label */}
                    <div className="absolute bottom-0 inset-x-0 p-3 sm:p-5 bg-gradient-to-t from-black/90 via-black/40 to-transparent pointer-events-none flex items-end justify-between text-white">
                      <div>
                        <span className="text-xs sm:text-sm font-serif font-bold block text-white">
                          {venture.title} Official Showcase
                        </span>
                        <span className="text-[9px] sm:text-[11px] text-slate-300 block">
                          {venture.location || 'Prime Corridor'} • Verified Master Layout
                        </span>
                      </div>
                      <span className="text-[9px] sm:text-xs font-mono text-[#C5A880] uppercase tracking-widest bg-black/60 px-2 py-0.5 rounded border border-white/15">
                        HD
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ─── MOBILE-ONLY SECTION: Micro-Stats Dock + Description + Mobile Buttons ─── */}
            <div className="lg:hidden mt-5 space-y-4">
              {/* Single-Row Compact Fact Dock on Mobile */}
              <div className="grid grid-cols-3 divide-x divide-white/10 p-3 rounded-xl bg-white/5 border border-white/15 backdrop-blur-md shadow-lg">
                {heroSpecs.map((s, idx) => (
                  <div key={idx} className="space-y-0.5 text-center px-1">
                    <span className="text-[9px] uppercase font-bold tracking-wider text-[#C5A880] block truncate">
                      {s.label}
                    </span>
                    <span className="font-serif text-base sm:text-lg font-bold text-white block truncate">
                      {s.value}
                    </span>
                    <span className="text-[8px] sm:text-[9px] text-slate-300 block truncate" title={s.sub}>
                      {s.sub}
                    </span>
                  </div>
                ))}
              </div>

              {/* Mobile Description */}
              <p className="text-xs sm:text-sm text-slate-300 font-light leading-relaxed text-center px-2">
                {venture.subheadline ||
                  venture.tagline ||
                  (venture.overviewText && venture.overviewText[0]) ||
                  'A master-planned residential plotted community engineered for generational wealth, immediate spot registration, and high-capital appreciation.'}
              </p>

              {/* Mobile 2-Button Grid */}
              <div className="grid grid-cols-2 gap-2.5 pt-1">
                <button
                  type="button"
                  onClick={onEnquireClick}
                  className="py-3 rounded-sm bg-[#C5A880] text-[#07132B] text-xs font-bold uppercase tracking-[0.14em] shadow-md flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[16px]">calendar_month</span>
                  <span>Site Visit</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    const el =
                      document.getElementById('about') || document.getElementById('why-choose');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="py-3 rounded-sm bg-white/10 text-white border border-white/20 text-xs font-bold uppercase tracking-[0.14em] backdrop-blur-xs flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <span>Know More</span>
                  <span className="material-symbols-outlined text-[14px] text-[#C5A880]">
                    arrow_forward
                  </span>
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Lightbox / High-Resolution Image Preview Modal */}
      {isImageFullscreen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-[99999] bg-[#07132B]/95 backdrop-blur-xl flex flex-col items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200"
          onClick={() => setIsImageFullscreen(false)}
        >
          {/* Header Bar */}
          <div
            className="w-full max-w-5xl flex items-center justify-between pb-3 sm:pb-4 border-b border-white/10 text-white"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-2.5">
              <span className="w-8 h-8 rounded-lg bg-[#C5A880]/20 border border-[#C5A880]/40 flex items-center justify-center text-[#C5A880]">
                <span className="material-symbols-outlined text-[18px]">photo_library</span>
              </span>
              <div>
                <h3 className="text-sm sm:text-base font-bold font-serif text-white tracking-wide">
                  {venture.title} — Official Showcase
                </h3>
                <p className="text-[10px] sm:text-xs text-slate-400 font-mono">
                  High-Resolution Master Showcase Preview (535 × 690)
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setIsImageFullscreen(false)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
                title="Close"
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            </div>
          </div>

          {/* Full-View Image Container */}
          <div
            className="relative w-full max-w-5xl max-h-[82vh] my-auto flex items-center justify-center overflow-hidden rounded-2xl border border-white/10 shadow-2xl bg-black/60 p-2"
            onClick={(e) => e.stopPropagation()}
          >
            {venture.heroBanner && (
              <img
                src={venture.heroBanner}
                alt={`${venture.title} High Resolution Preview`}
                className="max-w-full max-h-[78vh] object-contain rounded-xl shadow-2xl"
              />
            )}
          </div>

          <p className="text-[11px] font-mono text-slate-400 mt-2">
            Click anywhere outside or press Esc to return
          </p>
        </div>
      )}
    </>
  );
}
