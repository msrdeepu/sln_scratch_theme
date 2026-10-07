import React from 'react';
import { TemplateTheme, VentureData } from '../types';

interface AboutSectionProps {
  theme: TemplateTheme;
  venture: VentureData;
  onEnquireClick: () => void;
}

export default function AboutSection({ theme, venture, onEnquireClick }: AboutSectionProps) {
  return (
    <section id="about" className="py-24 lg:py-32 bg-[#FAF8F5] border-b border-[#EAE4D9]">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-8 lg:px-12 space-y-16">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pb-10 border-b border-[#EAE4D9]">
          <div className="space-y-4 max-w-2xl">
            <div className="flex items-center gap-3">
              <span className="w-8 h-[1.5px] bg-[#C5A880]"></span>
              <span className="text-xs uppercase font-extrabold tracking-[0.25em] text-[#C5A880]">
                {venture.aboutEyebrow || 'Development Overview'}
              </span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#0B1B3D] leading-tight">
              {venture.aboutTitle || 'A Master-Planned Enclave Conceived for Elevated Living'}
            </h2>
          </div>

          <p className="text-base text-[#556477] font-light leading-relaxed max-w-md">
            {venture.tagline || 'Engineered with broad bitumen avenues, landscaped reserves, and robust underground utilities.'}
          </p>
        </div>

        {/* Asymmetrical Editorial Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Narrative Column (7 cols) */}
          <div className="lg:col-span-7 space-y-8">
            <blockquote className="border-l-2 border-[#C5A880] pl-6 py-2">
              <p className="font-serif text-xl sm:text-2xl italic text-[#0B1B3D] leading-snug">
                {venture.aboutQuote || `“${venture.title} delivers the rarest luxury in real estate: absolute title certainty and immediate spot registry.”`}
              </p>
              <cite className="block text-xs uppercase font-extrabold tracking-widest text-[#8C7D6B] mt-3 not-italic">
                {venture.aboutQuoteAuthor || '— SLN Group Principal Architecture & Engineering Desk'}
              </cite>
            </blockquote>

            <div className="space-y-4 text-base text-[#556477] font-light leading-relaxed">
              {venture.overviewText && venture.overviewText.length > 0 ? (
                venture.overviewText.map((p, idx) => <p key={idx}>{p}</p>)
              ) : (
                <p>
                  Situated along the prime growth corridor, this gated plotted enclave delivers
                  engineered infrastructure with wide internal asphalt avenues and immediate spot registry.
                </p>
              )}
            </div>

            {/* Specifications Matrix */}
            <div className="p-6 bg-white border border-[#EAE4D9] rounded-sm space-y-4 shadow-xs">
              <span className="text-xs font-extrabold uppercase tracking-widest text-[#0B1B3D] block">
                Civil Engineering &amp; Legal Benchmarks
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-[#556477]">
                {venture.aboutChecklist && venture.aboutChecklist.length > 0 ? (
                  venture.aboutChecklist.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#C5A880]"></span>
                      <span>{item}</span>
                    </div>
                  ))
                ) : (
                  <>
                    <div className="flex items-center gap-2.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#C5A880]"></span>
                      <span>100% Approved Layout Certification</span>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#C5A880]"></span>
                      <span>Concealed Underground Stormwater Drainage</span>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#C5A880]"></span>
                      <span>Dedicated Central Water Tank &amp; Distribution</span>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#C5A880]"></span>
                      <span>Pre-approved Mortgages &amp; Clear Titles</span>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Action CTA */}
            <div className="pt-2">
              <button
                type="button"
                onClick={onEnquireClick}
                className="px-8 py-4 rounded-sm bg-[#0B1B3D] hover:bg-[#162a56] text-white text-xs font-bold uppercase tracking-[0.16em] transition-all cursor-pointer flex items-center gap-2 shadow-sm"
              >
                <span className="material-symbols-outlined text-[18px] text-[#C5A880]">
                  architecture
                </span>
                <span>Request Detailed Engineering Specs</span>
              </button>
            </div>
          </div>

          {/* Right Photographic Showcase Column (5 cols) */}
          <div className="lg:col-span-5">
            <div className="relative rounded-sm overflow-hidden p-3 bg-white border border-[#EAE4D9] shadow-xl space-y-3">
              <div className="relative aspect-[4/5] overflow-hidden rounded-sm bg-slate-900 group">
                <img
                  src={venture.aboutImage}
                  alt={venture.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  onError={(e) => {
                    (e.target as any).src =
                      'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1000&q=80';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B1B3D]/90 via-transparent to-transparent flex flex-col justify-end p-6 text-white">
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#C5A880] block mb-1">
                    On-Site Verified Status
                  </span>
                  <span className="font-serif text-xl font-bold block">
                    {venture.title}
                  </span>
                  <span className="text-xs text-white/80 font-light mt-1">
                    {venture.location} • Ready for immediate registration.
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between px-2 py-1 text-xs text-[#556477]">
                <span className="font-bold text-[#0B1B3D]">{venture.location}</span>
                <span className="text-[11px] text-[#8C7D6B]">Actual Project Ground Capture</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
