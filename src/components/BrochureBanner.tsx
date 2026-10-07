import React, { useState } from 'react';
import { TemplateTheme, VentureData } from '../types';
import { getMapAssetUrl } from '../siteConfig';
import { generateAndDownloadDossierPdf } from '../utils/generateDossierPdf';

interface BrochureBannerProps {
  theme: TemplateTheme;
  venture: VentureData;
  onDownloadClick: () => void;
}

export default function BrochureBanner({ theme, venture, onDownloadClick }: BrochureBannerProps) {
  const [downloadState, setDownloadState] = useState<'idle' | 'downloading' | 'completed'>('idle');
  const [imgError, setImgError] = useState<boolean>(false);

  const rawBrochureUrl = venture.brochureUrl || '';
  const brochureTitle = venture.brochureTitle || 'Private Investment Dossier & Master Blueprint Kit';
  const brochureDesc =
    venture.brochureDesc ||
    'Receive the complete high-resolution project survey, layout approval documents, bank pre-approval schedules, and price matrix.';
  const brochureFileSize = venture.brochureFileSize || 'PDF • 16.5 MB';

  // Determine downloadable URL
  const resolvedPdfUrl = React.useMemo(() => {
    if (!rawBrochureUrl || rawBrochureUrl === '#' || rawBrochureUrl === '#download-brochure') {
      return null;
    }
    if (rawBrochureUrl.startsWith('http://') || rawBrochureUrl.startsWith('https://')) {
      return rawBrochureUrl;
    }
    return getMapAssetUrl(rawBrochureUrl);
  }, [rawBrochureUrl]);

  // Determine cover image URL
  const resolvedCoverImg = React.useMemo(() => {
    if (imgError) {
      return (
        venture.heroBanner ||
        venture.masterPlanImage ||
        'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1000&q=80'
      );
    }
    const raw = venture.brochureMockup;
    if (!raw || raw.trim() === '') {
      return (
        venture.heroBanner ||
        venture.masterPlanImage ||
        'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1000&q=80'
      );
    }
    if (raw.startsWith('http://') || raw.startsWith('https://')) {
      return raw;
    }
    return getMapAssetUrl(raw);
  }, [venture.brochureMockup, venture.heroBanner, venture.masterPlanImage, imgError]);

  const handleDownload = () => {
    if (downloadState === 'downloading') return;

    setDownloadState('downloading');

    setTimeout(() => {
      try {
        if (resolvedPdfUrl && resolvedPdfUrl.startsWith('http')) {
          // Open or trigger direct download
          const link = document.createElement('a');
          link.href = resolvedPdfUrl;
          link.target = '_blank';
          link.rel = 'noopener,noreferrer';
          link.download = venture.brochureFileName || `${venture.title || 'sln-venture'}-dossier.pdf`;
          document.body.appendChild(link);
          link.click();
          setTimeout(() => document.body.removeChild(link), 1000);
        } else {
          // Generate official certified investment dossier client-side
          generateAndDownloadDossierPdf(venture);
        }

        setDownloadState('completed');
        setTimeout(() => setDownloadState('idle'), 3500);
      } catch (err) {
        console.error('Download error:', err);
        // Fallback to contact inquiry
        onDownloadClick();
        setDownloadState('idle');
      }
    }, 400);
  };

  return (
    <section className="py-20 bg-[#FAF8F5] border-b border-[#EAE4D9]">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-8 lg:px-12">
        <div className="bg-[#0B1B3D] text-white rounded-sm p-8 sm:p-12 lg:p-16 shadow-2xl relative overflow-hidden grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          {/* Subtle Ambient Lighting */}
          <div className="absolute top-0 right-1/3 w-96 h-96 rounded-full bg-[#C5A880]/10 blur-[100px] pointer-events-none" />

          {/* Left Text & Download Action (6 cols) */}
          <div className="lg:col-span-6 space-y-6 relative z-10">
            <div className="flex items-center gap-3">
              <span className="w-8 h-[1.5px] bg-[#C5A880]"></span>
              <span className="text-xs uppercase font-extrabold tracking-[0.25em] text-[#C5A880]">
                Institutional Documentation
              </span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight">
              {brochureTitle}
            </h2>

            <p className="text-sm sm:text-base text-white/70 font-light leading-relaxed max-w-xl">
              {brochureDesc}
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={handleDownload}
                disabled={downloadState === 'downloading'}
                className="px-8 py-4 rounded-sm bg-[#C5A880] hover:bg-[#b8986c] text-[#0B1B3D] text-xs font-bold uppercase tracking-[0.16em] transition-all cursor-pointer flex items-center gap-2.5 shadow-lg shadow-black/30 disabled:opacity-80"
              >
                {downloadState === 'downloading' ? (
                  <>
                    <span className="w-4 h-4 border-2 border-[#0B1B3D] border-t-transparent rounded-full animate-spin"></span>
                    <span>Preparing Brochure PDF...</span>
                  </>
                ) : downloadState === 'completed' ? (
                  <>
                    <span className="material-symbols-outlined text-[18px] text-emerald-800">
                      check_circle
                    </span>
                    <span>Brochure Downloaded!</span>
                  </>
                ) : (
                  <>
                    <span className="material-symbols-outlined text-[18px]">download</span>
                    <span>Download Brochure</span>
                  </>
                )}
              </button>

              <div className="flex items-center gap-2 text-xs text-white/60">
                <span className="material-symbols-outlined text-sm text-[#C5A880]">verified_user</span>
                <span>Direct PDF Download</span>
              </div>
            </div>
          </div>

          {/* Right Brochure Illustration (6 cols, 562x513 aspect ratio) */}
          <div className="lg:col-span-6 flex justify-center lg:justify-end relative z-10">
            <div
              className="relative w-full max-w-[562px] group cursor-pointer"
              onClick={handleDownload}
            >
              {/* Subtle Outer Glow */}
              <div className="absolute -inset-2 rounded-2xl bg-[#C5A880]/20 blur-xl opacity-40 group-hover:opacity-75 transition-opacity duration-500 pointer-events-none" />

              {/* 562x513 Aspect Ratio Wrapper */}
              <div className="relative aspect-[562/513] w-full rounded-lg overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.6)] border border-[#C5A880]/30 transition-transform duration-500 group-hover:-translate-y-1.5 bg-[#07132B]">
                {/* Book Cover Photo / Background - Clean, crisp, full brightness, completely uncropped */}
                <img
                  src={resolvedCoverImg}
                  alt={`${venture.title} Official Brochure`}
                  onError={() => setImgError(true)}
                  className="w-full h-full object-contain sm:object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                />

                {/* Subtle Interactive Action Tag on Hover */}
                <div className="absolute bottom-3 right-3 px-3 py-1.5 bg-[#07132B]/90 backdrop-blur-md border border-[#C5A880]/50 text-[#C5A880] text-[11px] font-bold uppercase tracking-wider rounded-sm flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-lg pointer-events-none">
                  <span className="material-symbols-outlined text-[15px]">download</span>
                  <span>Click to Download PDF</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
