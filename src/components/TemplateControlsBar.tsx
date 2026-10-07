import React from 'react';
import { TemplateTheme, VentureData } from '../types';
import { TEMPLATES } from '../themes';
import { SAMPLE_VENTURES } from '../sampleData';

export type ViewportMode = 'desktop' | 'tablet-landscape' | 'tablet' | 'mobile';

interface TemplateControlsBarProps {
  currentTheme: TemplateTheme;
  onThemeChange: (theme: TemplateTheme) => void;
  currentVenture: VentureData;
  onVentureChange: (venture: VentureData) => void;
  viewportMode: ViewportMode;
  onViewportChange: (mode: ViewportMode) => void;
  sectionVisibility: Record<string, boolean>;
  onToggleSection: (key: string) => void;
}

export const TemplateControlsBar: React.FC<TemplateControlsBarProps> = ({
  currentTheme,
  onThemeChange,
  currentVenture,
  onVentureChange,
  viewportMode,
  onViewportChange,
  sectionVisibility,
  onToggleSection,
}) => {
  const [showSectionMenu, setShowSectionMenu] = React.useState(false);

  return (
    <header className="sticky top-0 z-50 bg-[#0F172A] text-white border-b border-slate-700/80 shadow-2xl backdrop-blur-md px-4 py-2.5">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3 text-xs">
        {/* Left: Studio Branding & Active Template Indicator */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="font-bold tracking-wider uppercase text-slate-200 text-[11px] bg-slate-800 px-2.5 py-1 rounded border border-slate-700">
              SLN Theme 1 Studio
            </span>
          </div>

          <div className="h-4 w-px bg-slate-700 hidden sm:block"></div>

          {/* Theme Selector */}
          <div className="flex items-center gap-2">
            <span className="text-slate-400 font-medium hidden md:inline">Theme:</span>
            <select
              value={currentTheme.id}
              onChange={(e) => {
                const found = TEMPLATES.find((t) => t.id === e.target.value);
                if (found) onThemeChange(found);
              }}
              className="bg-slate-800 border border-slate-600 rounded-md px-2.5 py-1 text-xs text-white font-medium focus:outline-none focus:ring-1 focus:ring-amber-400 cursor-pointer"
            >
              {TEMPLATES.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.name}
                </option>
              ))}
            </select>
            <span
              className="w-3.5 h-3.5 rounded-full border border-white/30 inline-block shadow-sm"
              style={{ backgroundColor: currentTheme.accent }}
              title={`Accent: ${currentTheme.accent}`}
            ></span>
          </div>
        </div>

        {/* Middle: Venture Sample Selector */}
        <div className="flex items-center gap-2">
          <span className="text-slate-400 font-medium hidden lg:inline">Venture Data:</span>
          <select
            value={currentVenture.id}
            onChange={(e) => {
              const found = SAMPLE_VENTURES.find((v) => v.id === e.target.value);
              if (found) onVentureChange(found);
            }}
            className="bg-slate-800 border border-slate-600 rounded-md px-2.5 py-1 text-xs text-amber-300 font-semibold focus:outline-none focus:ring-1 focus:ring-amber-400 cursor-pointer max-w-[210px] truncate"
          >
            {currentVenture && !SAMPLE_VENTURES.some((s) => s.id === currentVenture.id) && (
              <option value={currentVenture.id}>
                ★ {currentVenture.title} (Live Published)
              </option>
            )}
            {SAMPLE_VENTURES.map((v) => (
              <option key={v.id} value={v.id}>
                {v.title}
              </option>
            ))}
          </select>
        </div>

        {/* Right: Viewport Toggles & Section Controls */}
        <div className="flex items-center gap-3">
          {/* Viewport Width Buttons */}
          <div className="flex items-center bg-slate-800 p-0.5 rounded-md border border-slate-700">
            <button
              onClick={() => onViewportChange('desktop')}
              title="Desktop (100% Full Width)"
              className={`p-1.5 rounded transition-all flex items-center gap-1 ${
                viewportMode === 'desktop'
                  ? 'bg-amber-500 text-slate-950 font-bold shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <span className="material-symbols-outlined text-[16px]">desktop_windows</span>
              <span className="hidden xl:inline text-[11px]">Full</span>
            </button>
            <button
              onClick={() => onViewportChange('tablet-landscape')}
              title="Laptop / Tablet Landscape (1024px)"
              className={`p-1.5 rounded transition-all flex items-center gap-1 ${
                viewportMode === 'tablet-landscape'
                  ? 'bg-amber-500 text-slate-950 font-bold shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <span className="material-symbols-outlined text-[16px]">laptop_chromebook</span>
              <span className="hidden xl:inline text-[11px]">1024px</span>
            </button>
            <button
              onClick={() => onViewportChange('tablet')}
              title="Tablet Portrait (768px)"
              className={`p-1.5 rounded transition-all flex items-center gap-1 ${
                viewportMode === 'tablet'
                  ? 'bg-amber-500 text-slate-950 font-bold shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <span className="material-symbols-outlined text-[16px]">tablet</span>
              <span className="hidden xl:inline text-[11px]">768px</span>
            </button>
            <button
              onClick={() => onViewportChange('mobile')}
              title="Mobile Device (390px)"
              className={`p-1.5 rounded transition-all flex items-center gap-1 ${
                viewportMode === 'mobile'
                  ? 'bg-amber-500 text-slate-950 font-bold shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <span className="material-symbols-outlined text-[16px]">smartphone</span>
              <span className="hidden xl:inline text-[11px]">390px</span>
            </button>
          </div>

          {/* Section Visibility Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowSectionMenu(!showSectionMenu)}
              className="flex items-center gap-1 bg-slate-800 border border-slate-600 hover:border-slate-500 px-2.5 py-1 rounded text-slate-200 font-medium"
            >
              <span className="material-symbols-outlined text-[15px]">layers</span>
              <span>Sections</span>
              <span className="material-symbols-outlined text-[14px]">
                {showSectionMenu ? 'expand_less' : 'expand_more'}
              </span>
            </button>

            {showSectionMenu && (
              <div
                className="absolute right-0 mt-2 w-56 bg-slate-900 border border-slate-700 rounded-lg shadow-2xl p-3 z-50 text-xs space-y-2 animate-fadeIn"
                onMouseLeave={() => setShowSectionMenu(false)}
              >
                <div className="font-semibold text-slate-400 uppercase tracking-wider text-[10px] pb-1 border-b border-slate-800">
                  Toggle Microsite Sections
                </div>
                {Object.entries(sectionVisibility).map(([key, isVisible]) => (
                  <label
                    key={key}
                    className="flex items-center justify-between cursor-pointer hover:bg-slate-800 p-1.5 rounded transition-colors"
                  >
                    <span className="capitalize text-slate-300">
                      {key.replace(/([A-Z])/g, ' $1')}
                    </span>
                    <input
                      type="checkbox"
                      checked={isVisible}
                      onChange={() => onToggleSection(key)}
                      className="rounded border-slate-600 text-amber-500 focus:ring-0 cursor-pointer"
                    />
                  </label>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
