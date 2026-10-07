import React from 'react';
import { TemplateTheme, VentureData } from '../types';

interface NeighbourhoodSectionProps {
  theme: TemplateTheme;
  venture: VentureData;
}

export default function NeighbourhoodSection({ theme, venture }: NeighbourhoodSectionProps) {
  const transitNodes = [
    {
      time: '02 Mins',
      dist: '0.8 KM',
      title: 'NH-16 Chennai-Nellore Expressway',
      desc: 'Immediate signal-free approach to the 6-lane national transit artery.',
      icon: 'add_road',
    },
    {
      time: '05 Mins',
      dist: '2.5 KM',
      title: 'Tada Railway Junction',
      desc: 'Daily suburban EMU trains running directly to Chennai Central Station.',
      icon: 'train',
    },
    {
      time: '10 Mins',
      dist: '6.0 KM',
      title: 'Sri City SEZ (South Gate)',
      desc: 'Home to 220+ global industrial leaders and 65,000+ engineers & executives.',
      icon: 'factory',
    },
    {
      time: '12 Mins',
      dist: '8.5 KM',
      title: 'Krea University & World Schools',
      desc: 'World-class higher education campus and CBSE international academies.',
      icon: 'school',
    },
    {
      time: '18 Mins',
      dist: '14.0 KM',
      title: 'Pulicat Lake & Scenic Sanctuary',
      desc: "India's second largest lagoon sanctuary, celebrated for migratory birds and boating.",
      icon: 'landscape',
    },
    {
      time: '45 Mins',
      dist: '55.0 KM',
      title: 'Chennai City Gate / Koyambedu',
      desc: 'High-speed corridor connectivity directly into the Chennai metropolitan zone.',
      icon: 'location_city',
    },
  ];

  return (
    <section id="locations" className="py-24 lg:py-32 bg-white border-b border-[#EAE4D9]">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-8 lg:px-12 space-y-16">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pb-10 border-b border-[#EAE4D9]">
          <div className="space-y-4 max-w-2xl">
            <div className="flex items-center gap-3">
              <span className="w-8 h-[1.5px] bg-[#C5A880]"></span>
              <span className="text-xs uppercase font-extrabold tracking-[0.25em] text-[#C5A880]">
                Regional Geography
              </span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#0B1B3D] leading-tight">
              A Connected Nexus Between Urban Chennai & Sri City Hub
            </h2>
          </div>

          <p className="text-base text-[#556477] font-light leading-relaxed max-w-md">
            Seamlessly linked by 6-lane national expressways, suburban rail transit, and proximity
            to essential social and commercial infrastructure.
          </p>
        </div>

        {/* Transit Grid + Interactive Map Viewport */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Transit Nodes (6 cols) */}
          <div className="lg:col-span-6 space-y-4">
            <div className="space-y-3">
              {transitNodes.map((node, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-sm bg-[#FAF8F5] border border-[#EAE4D9] hover:border-[#C5A880] transition-colors flex items-center justify-between gap-4 group"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-sm bg-white border border-[#EAE4D9] text-[#C5A880] flex items-center justify-center shrink-0 shadow-xs">
                      <span className="material-symbols-outlined text-xl">{node.icon}</span>
                    </div>
                    <div className="space-y-0.5">
                      <h3 className="font-serif font-bold text-base text-[#0B1B3D] group-hover:text-[#C5A880] transition-colors">
                        {node.title}
                      </h3>
                      <p className="text-xs text-[#556477] font-light">{node.desc}</p>
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <span className="font-mono text-sm font-bold text-[#0B1B3D] block">
                      {node.time}
                    </span>
                    <span className="text-[10px] text-[#8C7D6B] uppercase tracking-wider block">
                      {node.dist}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Map Canvas (6 cols) */}
          <div className="lg:col-span-6 space-y-4">
            <div className="relative rounded-sm overflow-hidden p-3 bg-white border border-[#EAE4D9] shadow-xl space-y-3">
              <div className="relative aspect-[16/11] bg-slate-900 rounded-sm overflow-hidden group">
                <img
                  src={venture.mapEmbedImage}
                  alt="Location Map Tada Corridor"
                  className="w-full h-full object-cover"
                />

                {/* Map Overlay Vignette & Landmark Pin */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B1B3D]/80 via-transparent to-transparent flex flex-col justify-end p-6 text-white">
                  <div className="bg-[#0B1B3D]/95 backdrop-blur-md border border-[#C5A880]/50 p-4 rounded-sm space-y-1.5 max-w-sm">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#C5A880] animate-ping"></span>
                      <span className="font-serif text-sm font-bold text-[#FAF5ED]">
                        SLN Highlands Project Site
                      </span>
                    </div>
                    <p className="text-xs text-white/70 font-light">
                      Near Sri City South Gate, Tada-Sri City Bypass Road, NH-16 Corridor.
                    </p>
                    <a
                      href="https://maps.google.com/?q=Tada,Andhra+Pradesh"
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C5A880] hover:underline pt-1"
                    >
                      <span>Open in Google Maps Satellite</span>
                      <span className="material-symbols-outlined text-sm">open_in_new</span>
                    </a>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between px-2 text-xs text-[#556477]">
                <span>Tada Sri City Corridor</span>
                <span className="text-[#8C7D6B]">Coordinates: 13.5937° N, 80.0267° E</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
