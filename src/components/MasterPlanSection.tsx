import React from 'react';
import { TemplateTheme, VentureData } from '../types';
import InteractiveMasterPlan from './InteractiveMasterPlan';
import { InteractiveMapPlot } from '../types/interactiveMap';

interface MasterPlanSectionProps {
  theme: TemplateTheme;
  venture: VentureData;
  onEnquireClick: () => void;
  onSelectPlotForEnquiry?: (plot: InteractiveMapPlot) => void;
}

export default function MasterPlanSection({
  theme,
  venture,
  onEnquireClick,
  onSelectPlotForEnquiry,
}: MasterPlanSectionProps) {
  const isDark = theme.isDark;



  // Clean, understandable eyebrow (filter out confusing "cadastral" jargon)
  const displayEyebrow =
    venture.masterPlanEyebrow && !venture.masterPlanEyebrow.toLowerCase().includes('cadastral')
      ? venture.masterPlanEyebrow
      : 'Master Layout Plan';

  // Clean title (avoid hardcoding DTCP if project uses a different authority or generic layout)
  const rawTitle = venture.masterPlanTitle?.trim() || '';
  const isOldBoilerplate =
    rawTitle === 'Approved Layout & Plot Architecture' ||
    rawTitle === 'Architectural Cadastral Layout & Phase Distribution';
  const displayTitle = rawTitle && !isOldBoilerplate ? rawTitle : null;

  return (
    <section
      id="master-plan"
      style={{
        backgroundColor: isDark ? '#0A0F1D' : '#FFFFFF',
        color: isDark ? '#FFFFFF' : theme.textPrimary,
      }}
      className="py-20 lg:py-28 border-b border-black/5 dark:border-white/10 relative transition-colors duration-500"
    >
      <div className="max-w-[1420px] mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Section Header */}
        <div className="pb-6 border-b border-black/5 dark:border-white/10">
          <div className="space-y-3 max-w-3xl">
            <div className="flex items-center gap-2">
              <span style={{ backgroundColor: theme.accent }} className="w-8 h-[2px]" />
              <span
                style={{ color: theme.accent }}
                className="font-sans text-xs font-extrabold uppercase tracking-[0.2em]"
              >
                {displayEyebrow}
              </span>
            </div>
            <h2
              style={{
                fontFamily: theme.fontHeading,
                color: isDark ? '#FFFFFF' : theme.textPrimary,
              }}
              className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-tight"
            >
              {displayTitle ? (
                displayTitle
              ) : (
                <>
                  Master Layout &{' '}
                  <span className="italic" style={{ color: theme.accent }}>
                    Plot Architecture
                  </span>
                </>
              )}
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
              Explore the real-time interactive master plan. Pan, zoom, inspect individual plot dimensions, facing, and status in real-time.
            </p>
          </div>
        </div>

        {/* Live Interactive Master Plan Component */}
        <InteractiveMasterPlan
          venture={venture}
          theme={theme}
          onSelectPlotForEnquiry={onSelectPlotForEnquiry}
        />


      </div>
    </section>
  );
}
