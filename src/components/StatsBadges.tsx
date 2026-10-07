import React from 'react';
import { TemplateTheme, VentureData } from '../types';

interface StatsBadgesProps {
  theme: TemplateTheme;
  venture: VentureData;
}

export default function StatsBadges({ theme, venture }: StatsBadgesProps) {
  const specs: Array<{ value: string; label: string; sub?: string }> =
    (venture.specs && venture.specs.length > 0 ? venture.specs : null) ||
    (venture.stats && venture.stats.length > 0 ? venture.stats : null) ||
    [
      { value: '180+', label: 'Gated Villa Plots', sub: 'DTCP & RERA Approved' },
      { value: '40 & 50 Ft', label: 'Internal Blacktop Avenues', sub: 'Engineered for Heavy Traffic' },
      { value: '100%', label: 'Vaastu Orientation', sub: 'East & North Facing Alignments' },
      { value: '24/7', label: 'Guarded Gated Perimeter', sub: 'Full Masonry Compound Wall' },
      { value: 'Instant', label: 'Spot Registration', sub: 'Ready for Immediate Possession' },
    ];

  return (
    <section className="bg-[#FAF8F5] border-b border-[#EAE4D9] py-12">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-8 lg:px-12">
        <div
          className={`grid grid-cols-2 sm:grid-cols-3 ${
            specs.length <= 4 ? 'lg:grid-cols-4' : specs.length === 5 ? 'lg:grid-cols-5' : 'lg:grid-cols-6'
          } gap-8 lg:gap-4 divide-y sm:divide-y-0 lg:divide-x divide-[#EAE4D9]`}
        >
          {specs.map((s, idx) => (
            <div key={idx} className={`space-y-1.5 ${idx > 0 ? 'lg:pl-8' : ''} pt-4 sm:pt-0`}>
              <span className="font-serif text-3xl sm:text-4xl font-bold text-[#0B1B3D] tracking-tight block">
                {s.value}
              </span>
              <span className="text-xs uppercase font-extrabold tracking-[0.15em] text-[#C5A880] block">
                {s.label}
              </span>
              <p className="text-[11px] text-[#556477] font-light">{s.sub}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
