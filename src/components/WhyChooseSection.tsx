import React from 'react';
import { TemplateTheme, VentureData } from '../types';

interface WhyChooseSectionProps {
  theme: TemplateTheme;
  venture: VentureData;
}

export default function WhyChooseSection({ theme, venture }: WhyChooseSectionProps) {
  const fallbackPillars = [
    {
      num: '01',
      tag: 'Strategic Nexus',
      title: 'Tada-Sri City Growth Gateway',
      desc: 'Positioned signal-free along the Chennai-Nellore NH-16 highway, placing major industrial corridors, Tada railway junction, and logistics hubs within minutes.',
      points: [
        '5 Mins to Tada Railway Junction',
        'Direct 6-lane signal-free artery to North Chennai',
        'Adjacent to international industrial logistics corridor',
      ],
    },
    {
      num: '02',
      tag: 'Capital Appreciation',
      title: 'High-Yield Industrial Synergy',
      desc: 'Flanked by Sri City SEZ housing 220+ Fortune-500 giants (Kellogg’s, Mondelez, Isuzu, Alstom) with over 65,000 professionals creating continuous land and rental demand.',
      points: [
        'Demonstrated 18–24% historic annual land appreciation',
        'Expanding social infrastructure with universities & hospitals',
        'Sustained corporate housing demand in Tada zone',
      ],
    },
    {
      num: '03',
      tag: 'Legal Integrity',
      title: '100% Clear Title & Spot Registry',
      desc: 'Complete statutory and legal transparency with sanctioned layout certification, verified titles, and pre-approved project clearance from leading institutional banks.',
      points: [
        'Immediate spot registration upon plot allocation',
        'Pre-approved mortgage assistance: SBI, HDFC, ICICI',
        'Unencumbered freehold ownership title',
      ],
    },
  ];

  const pillars = (venture.whyChoosePoints && venture.whyChoosePoints.length > 0)
    ? venture.whyChoosePoints.map((p, idx) => ({
        num: String(idx + 1).padStart(2, '0'),
        tag: p.tag || 'Value Factor',
        title: p.title || 'Investment Pillar',
        desc: p.description || (p as any).desc || '',
        points: Array.isArray(p.points) ? p.points : [],
      }))
    : fallbackPillars;

  const specs: Array<{ value: string; label: string; sub: string }> =
    (venture as any)?.specs && (venture as any).specs.length > 0
      ? (venture as any).specs
      : [
          { value: '180+', label: 'Gated Villa Plots', sub: 'Approved Layout' },
          { value: '40 & 50 Ft', label: 'Internal Blacktop Avenues', sub: 'Engineered for Heavy Traffic' },
          { value: '100%', label: 'Vaastu Orientation', sub: 'East & North Facing Alignments' },
          { value: '24/7', label: 'Guarded Gated Perimeter', sub: 'Full Masonry Compound Wall' },
          { value: 'Instant', label: 'Spot Registration', sub: 'Ready for Immediate Possession' },
        ];

  return (
    <section id="why-choose" className="py-24 lg:py-32 bg-white border-b border-[#EAE4D9]">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-8 lg:px-12 space-y-20">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pb-10 border-b border-[#EAE4D9]">
          <div className="space-y-4 max-w-2xl">
            <div className="flex items-center gap-3">
              <span className="w-8 h-[1.5px] bg-[#C5A880]"></span>
              <span className="text-xs uppercase font-extrabold tracking-[0.25em] text-[#C5A880]">
                {venture.whyChooseEyebrow || 'Investment Thesis'}
              </span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#0B1B3D] leading-tight">
              {venture.whyChooseTitle || 'An Unrivalled Convergence of Connectivity, Economy & Legal Security'}
            </h2>
          </div>

          <p className="text-base text-[#556477] font-light leading-relaxed max-w-md">
            {venture.whyChooseSubtitle || `Every plot within ${venture.title} is vetted to institutional-grade standards, offering immediate legal possession and unmatched capital growth potential.`}
          </p>
        </div>

        {/* 3 Architectural Columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-[#EAE4D9]">
          {pillars.map((p, idx) => (
            <div
              key={idx}
              className={`space-y-6 ${idx === 0 ? 'md:pr-10' : idx === 1 ? 'md:px-10 py-8 md:py-0' : 'md:pl-10 pt-8 md:pt-0'}`}
            >
              <div className="flex items-center justify-between">
                <span className="font-serif text-3xl font-bold text-[#C5A880]">{p.num}</span>
                <span className="text-[11px] font-bold uppercase tracking-widest text-[#8C7D6B] px-3 py-1 rounded-sm bg-[#FAF8F5] border border-[#EAE4D9]">
                  {p.tag}
                </span>
              </div>

              <div className="space-y-3">
                <h3 className="font-serif text-2xl font-bold text-[#0B1B3D] tracking-tight">
                  {p.title}
                </h3>
                <p className="text-sm text-[#556477] font-light leading-relaxed">{p.desc}</p>
              </div>

              {p.points && p.points.length > 0 && (
                <div className="pt-4 border-t border-[#EAE4D9] space-y-2.5">
                  {p.points.map((pt, pIdx) => (
                    <div key={pIdx} className="flex items-start gap-2.5 text-xs text-[#556477]">
                      <span className="text-[#C5A880] font-bold">—</span>
                      <span>{pt}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Institutional Proof Strip - Project Development Specifications */}
        <div className="bg-[#0B1B3D] text-white p-8 sm:p-10 rounded-sm grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8 lg:gap-4 divide-y sm:divide-y-0 lg:divide-x divide-white/10 shadow-xl">
          {specs.map((s, idx) => (
            <div key={idx} className={`space-y-1.5 pt-4 sm:pt-0 ${idx > 0 ? 'lg:pl-6' : ''}`}>
              <span
                className={`font-serif text-3xl sm:text-4xl font-bold block ${
                  idx % 2 === 0 ? 'text-[#C5A880]' : idx === 4 ? 'text-emerald-400' : 'text-white'
                }`}
              >
                {s.value}
              </span>
              <span className="text-xs uppercase tracking-widest text-white/90 font-bold block">
                {s.label}
              </span>
              <p className="text-[11px] text-white/60 font-light">{s.sub}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
