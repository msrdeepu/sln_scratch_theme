import React from 'react';

export default function MicrositeSkeleton() {
  return (
    <div className="min-h-screen bg-[#07132B] text-white font-sans antialiased selection:bg-[#C5A880] selection:text-[#07132B]">
      {/* ─── 1. SKELETON NAVBAR ─── */}
      <header className="sticky top-0 z-50 w-full bg-[#07132B]/95 backdrop-blur-md border-b border-white/10 h-20">
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 h-full flex items-center justify-between">
          {/* Logo Placeholder */}
          <div className="flex items-center gap-3">
            <div className="h-10 w-36 rounded-md skeleton-box"></div>
          </div>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center gap-8">
            {['HOME', 'INVESTMENT THESIS', 'OVERVIEW', 'AMENITIES', 'CONNECTIVITY', 'MASTER PLAN', 'BOOK SITE VISIT'].map((name, i) => (
              <span key={i} className="text-xs font-bold uppercase tracking-wider text-slate-400/50">
                {name}
              </span>
            ))}
          </div>

          {/* Desktop CTA Button */}
          <div className="hidden sm:block h-10 w-36 rounded-sm skeleton-gold border border-[#C5A880]/40"></div>
          <div className="sm:hidden h-10 w-10 rounded-md skeleton-box"></div>
        </div>
      </header>

      {/* ─── 2. SKELETON HERO SECTION (DUAL-COLUMN EXACT MATCH) ─── */}
      <section className="relative pt-8 pb-14 sm:pt-12 sm:pb-20 lg:pt-16 lg:pb-24 border-b border-[#0B1B3D] overflow-hidden">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12 relative z-10">
          <div className="flex flex-col lg:grid lg:grid-cols-12 lg:gap-10 xl:gap-14 lg:items-center">
            
            {/* COLUMN A: Left Editorial Column */}
            <div className="lg:col-span-5 flex flex-col space-y-4 sm:space-y-6 text-center lg:text-left">
              {/* Category Eyebrow Pill */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/5 border border-[#C5A880]/30 w-44">
                <span className="w-1.5 h-1.5 rounded-full bg-[#C5A880]"></span>
                <div className="h-2.5 w-28 rounded-xs skeleton-gold"></div>
              </div>

              {/* Grand Headline Lines */}
              <div className="space-y-2.5">
                <div className="h-10 sm:h-12 w-4/5 rounded-md mx-auto lg:mx-0 skeleton-box"></div>
                <div className="h-10 sm:h-12 w-3/5 rounded-md mx-auto lg:mx-0 skeleton-gold"></div>
              </div>

              {/* Subheadline Paragraph */}
              <div className="space-y-2 max-w-lg mx-auto lg:mx-0">
                <div className="h-3.5 w-full rounded-xs skeleton-box"></div>
                <div className="h-3.5 w-5/6 rounded-xs skeleton-box"></div>
                <div className="h-3.5 w-2/3 rounded-xs skeleton-box"></div>
              </div>

              {/* Desktop 3-Metric Horizon Dock */}
              <div className="hidden lg:grid grid-cols-3 divide-x divide-white/10 p-4 rounded-xl bg-white/5 border border-white/15 backdrop-blur-md">
                <div className="space-y-1.5 text-center px-2">
                  <div className="h-2.5 w-16 mx-auto rounded-xs skeleton-gold"></div>
                  <div className="h-6 w-20 mx-auto rounded-sm skeleton-box"></div>
                  <div className="h-2 w-14 mx-auto rounded-xs skeleton-box"></div>
                </div>

                <div className="space-y-1.5 text-center px-2">
                  <div className="h-2.5 w-18 mx-auto rounded-xs skeleton-gold"></div>
                  <div className="h-6 w-24 mx-auto rounded-sm skeleton-box"></div>
                  <div className="h-2 w-16 mx-auto rounded-xs skeleton-box"></div>
                </div>

                <div className="space-y-1.5 text-center px-2">
                  <div className="h-2.5 w-14 mx-auto rounded-xs skeleton-gold"></div>
                  <div className="h-6 w-16 mx-auto rounded-sm skeleton-box"></div>
                  <div className="h-2 w-12 mx-auto rounded-xs skeleton-box"></div>
                </div>
              </div>

              {/* Desktop Duo CTA Buttons */}
              <div className="hidden lg:flex items-center gap-4 pt-2">
                <div className="h-12 w-48 rounded-sm skeleton-gold"></div>
                <div className="h-12 w-36 rounded-sm border border-white/15 skeleton-box"></div>
              </div>
            </div>

            {/* COLUMN B: Right Visual Cinema Stage */}
            <div className="lg:col-span-7 mt-6 sm:mt-8 lg:mt-0">
              <div className="relative rounded-2xl p-1.5 sm:p-2.5 bg-white/5 border border-white/15 backdrop-blur-md shadow-2xl">
                {/* Cinema Screen Header */}
                <div className="flex items-center justify-between px-3 sm:px-4 py-2 sm:py-2.5 border-b border-white/10 bg-white/5 rounded-t-xl">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-red-500"></span>
                    <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-widest text-white/80">
                      LIVE 4K AERIAL VIDEO
                    </span>
                    <span className="text-[10px] text-slate-400 hidden sm:inline">• Drone Survey</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="h-6 w-12 rounded-sm skeleton-gold"></div>
                    <div className="h-6 w-14 rounded-sm skeleton-box"></div>
                  </div>
                </div>

                {/* 16:9 Viewport Screen */}
                <div className="relative aspect-[16/10] sm:aspect-[16/9] lg:aspect-[16/10] xl:aspect-[16/9] bg-[#050E21] overflow-hidden rounded-b-xl flex flex-col justify-between p-4 sm:p-5">
                  <div className="flex justify-end">
                    <div className="h-7 w-20 rounded-sm skeleton-box border border-white/15"></div>
                  </div>

                  <div className="flex flex-col items-center justify-center my-auto space-y-3">
                    <div className="w-14 h-14 rounded-full bg-[#C5A880]/20 border border-[#C5A880]/40 flex items-center justify-center">
                      <span className="material-symbols-outlined text-2xl text-[#C5A880]">play_arrow</span>
                    </div>
                    <span className="text-xs text-slate-300 font-medium">Initializing 4K Cinema Stream...</span>
                  </div>

                  <div className="flex items-end justify-between border-t border-white/10 pt-3">
                    <div className="space-y-1">
                      <div className="h-3 w-40 rounded-xs skeleton-box"></div>
                      <div className="h-2 w-28 rounded-xs skeleton-box"></div>
                    </div>
                    <span className="text-[10px] font-mono text-[#C5A880] uppercase tracking-widest bg-black/60 px-2 py-0.5 rounded border border-white/15">
                      4K UHD
                    </span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ─── 3. SKELETON MASTER PLAN / INTERACTIVE MAP SECTION ─── */}
      <section className="py-14 sm:py-20 lg:py-24 bg-[#0A162D] border-b border-white/10">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12 space-y-6">
          {/* Section Header */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div className="space-y-2">
              <div className="h-3 w-36 rounded-xs skeleton-gold"></div>
              <div className="h-8 w-80 rounded-sm skeleton-box"></div>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-9 w-24 rounded-lg border border-white/15 skeleton-box"></div>
              <div className="h-9 w-24 rounded-lg skeleton-gold"></div>
            </div>
          </div>

          {/* Interactive Map Canvas Container (Exact Match) */}
          <div className="rounded-2xl border border-white/15 bg-slate-900/80 overflow-hidden shadow-2xl">
            {/* Top Cadastral Toolbar */}
            <div className="px-4 py-3 bg-slate-900 border-b border-white/10 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-slate-300">Plots Status:</span>
                <div className="flex gap-1.5">
                  {['All', 'Available', 'Booked', 'Registered'].map((status, idx) => (
                    <div key={idx} className="h-6 px-3 rounded-full bg-white/10 border border-white/10 text-[10px] flex items-center text-slate-300">
                      {status}
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-7 w-20 rounded-md skeleton-box"></div>
                <div className="h-7 w-24 rounded-md skeleton-box"></div>
              </div>
            </div>

            {/* Cadastral Blueprint / 3D Drone Canvas Viewport */}
            <div className="relative w-full h-[450px] sm:h-[550px] lg:h-[620px] bg-slate-950 flex flex-col items-center justify-center text-center p-6 space-y-4">
              <div className="w-12 h-12 border-3 border-[#C5A880] border-t-transparent rounded-full animate-spin"></div>
              <div className="space-y-1">
                <p className="font-serif text-lg font-bold text-white tracking-wide">
                  Loading 3D Drone Master Plan...
                </p>
                <p className="text-xs text-slate-400">
                  Rendering Three.js Cadastral Scene & Plot Geometry
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
