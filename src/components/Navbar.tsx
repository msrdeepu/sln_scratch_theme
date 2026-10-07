import React, { useState } from 'react';
import { TemplateTheme, VentureData } from '../types';

interface NavbarProps {
  theme: TemplateTheme;
  venture: VentureData;
  onEnquireClick: () => void;
}

const NAV_LINKS = [
  { href: '#hero', label: 'Home' },
  { href: '#why-choose', label: 'Investment Thesis' },
  { href: '#about', label: 'Overview' },
  { href: '#amenities', label: 'Amenities' },
  { href: '#locations', label: 'Connectivity' },
  { href: '#master-plan', label: 'Master Plan' },
  { href: '#contact', label: 'Book Site Visit' },
];

export default function Navbar({ theme, venture, onEnquireClick }: NavbarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLinkClick = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-md border-b border-[#EAE4D9] transition-all duration-300">
      <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 h-20 flex items-center justify-between">
        {/* Brand Logo - Left Side */}
        <a
          href="#hero"
          className="flex items-center shrink-0 py-1 transition-transform duration-300 hover:scale-102"
          aria-label="SLN Properties"
        >
          <img
            src="/sln_micro_templates_logo.webp"
            alt="SLN Properties Logo"
            className="h-11 sm:h-12 md:h-14 w-auto max-w-[190px] sm:max-w-[220px] object-contain"
          />
        </a>

        {/* Clearly Organized Navigation - Right Side (Desktop) */}
        <nav className="hidden lg:flex items-center gap-6 xl:gap-8 text-[12px] xl:text-[13px] uppercase font-bold tracking-[0.14em] text-[#334155]">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="whitespace-nowrap hover:text-[#0B1B3D] transition-colors py-1 relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-[#C5A880] hover:after:w-full after:transition-all duration-300"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Mobile Hamburger Toggle Button (Mobile & Tablet) */}
        <div className="lg:hidden flex items-center">
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen((prev) => !prev)}
            className="w-11 h-11 rounded-sm bg-[#FAF8F5] border border-[#EAE4D9] text-[#0B1B3D] hover:bg-[#F3EFE6] flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Toggle Navigation Menu"
            aria-expanded={isMobileMenuOpen}
          >
            <span className="material-symbols-outlined text-2xl">
              {isMobileMenuOpen ? 'close' : 'menu'}
            </span>
          </button>
        </div>
      </div>

      {/* Responsive Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-20 bottom-0 bg-black/40 backdrop-blur-xs z-50 animate-fadeIn">
          <div className="bg-white border-b border-[#EAE4D9] shadow-2xl px-6 py-6 max-h-[calc(100vh-5rem)] overflow-y-auto">
            <nav className="flex flex-col divide-y divide-[#F1ECE1]">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={handleLinkClick}
                  className="py-3.5 text-sm uppercase font-bold tracking-[0.15em] text-[#0B1B3D] hover:text-[#C5A880] transition-colors flex items-center justify-between"
                >
                  <span>{link.label}</span>
                  <span className="material-symbols-outlined text-base text-[#C5A880]">
                    chevron_right
                  </span>
                </a>
              ))}
            </nav>

            {/* Quick Mobile Action in Drawer */}
            <div className="pt-6 mt-4 border-t border-[#EAE4D9] flex flex-col gap-3">
              <a
                href={`tel:${venture.contact?.phone || '+91 98480 12345'}`}
                className="w-full py-3 rounded-sm bg-[#FAF8F5] border border-[#EAE4D9] text-[#0B1B3D] text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-[#F3EFE6] transition-colors"
              >
                <span className="material-symbols-outlined text-[18px] text-[#C5A880]">call</span>
                <span>{venture.contact?.phone || '+91 98480 12345'}</span>
              </a>

              <button
                type="button"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onEnquireClick();
                }}
                className="w-full py-3.5 rounded-sm bg-[#0B1B3D] text-[#FAF5ED] text-xs font-bold uppercase tracking-[0.16em] flex items-center justify-center gap-2 shadow-md hover:bg-[#162a56] transition-colors cursor-pointer"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#C5A880]"></span>
                <span>Schedule Site Visit</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

