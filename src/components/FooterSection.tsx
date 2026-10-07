import React from 'react';
import { TemplateTheme, VentureData } from '../types';

interface FooterSectionProps {
  theme: TemplateTheme;
  data: VentureData;
}

export default function FooterSection({ theme, data }: FooterSectionProps) {
  const topMenuItems = [
    { label: 'Home', href: '#hero' },
    { label: 'Investment Thesis', href: '#why-choose' },
    { label: 'Overview', href: '#about' },
    { label: 'Amenities', href: '#amenities' },
    { label: 'Connectivity', href: '#locations' },
    { label: 'Master Plan', href: '#master-plan' },
    { label: 'Book Site Visit', href: '#contact' },
  ];

  return (
    <footer className="bg-[#07132B] text-white pt-10 pb-8 border-t border-white/10">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-8 lg:px-12 space-y-6">
        {/* Compact Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-10 pb-6 border-b border-white/10 items-start">
          {/* Column 1: Brand & Info (5 cols) */}
          <div className="md:col-span-5 space-y-3.5">
            <div className="inline-block bg-white/95 px-3 py-1.5 rounded-sm shadow-xs">
              <img
                src="/sln_micro_templates_logo.webp"
                alt="SLNMPL Logo"
                className="h-9 w-auto max-w-[170px] object-contain"
              />
            </div>

            <p className="text-xs text-white/70 font-light leading-relaxed max-w-sm">
              {data.title} — Premium approved plotted community engineered for
              long-term capital growth and immediate spot registration.
            </p>

            <p className="text-[11px] text-white/50 max-w-sm">
              Approved by relevant town planning authorities with absolute title certainty and legally verified documentation.
            </p>
          </div>

          {/* Column 2: Quick Navigation (3 cols) */}
          <div className="md:col-span-3 space-y-2.5">
            <span className="text-[10px] uppercase font-bold tracking-[0.25em] text-[#C5A880] block">
              Quick Navigation
            </span>
            <div className="flex flex-col space-y-1.5 text-xs text-white/75 font-medium">
              {topMenuItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="hover:text-[#C5A880] transition-colors w-fit"
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>

          {/* Column 3: On-Site Experience Lounge (4 cols) */}
          <div className="md:col-span-4 space-y-2.5">
            <span className="text-[10px] uppercase font-bold tracking-[0.25em] text-[#C5A880] block">
              On-Site Experience Lounge
            </span>
            <div className="bg-white/[0.03] p-4 rounded-sm border border-white/10 space-y-1.5">
              <h4 className="font-serif text-base font-bold text-white">
                {data.contact?.loungeTitle || 'Site Office & Experience Center'}
              </h4>
              <p className="text-xs text-white/70 font-light leading-relaxed">
                {data.contact?.branchAddress ||
                  'Highway Site Office, Tada-Sri City Bypass Road, Tada, Andhra Pradesh 524401.'}
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Compliance */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-white/50 font-light">
          <p>© {new Date().getFullYear()} SLNMPL. All Rights Reserved.</p>
          <a href="#hero" className="text-white/60 hover:text-white transition-colors">
            Back to Top ↑
          </a>
        </div>
      </div>
    </footer>
  );
}

export { FooterSection };
