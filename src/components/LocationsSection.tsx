import React, { useState, useEffect } from 'react';
import { TemplateTheme, VentureData, LocationItem } from '../types';
import { SITE_CONFIG, getLocationAssetUrl } from '../siteConfig';

interface LocationsSectionProps {
  theme: TemplateTheme;
  venture: VentureData;
}

export default function LocationsSection({ theme, venture }: LocationsSectionProps) {
  const isDark = theme.isDark;
  const [selectedGroup, setSelectedGroup] = useState<string>('all');
  const [activeModalLoc, setActiveModalLoc] = useState<LocationItem | null>(null);
  const [liveLocations, setLiveLocations] = useState<LocationItem[]>(venture.locations || []);
  const [isLoading, setIsLoading] = useState<boolean>(!venture.locations || venture.locations.length === 0);

  // Fetch strictly live CMS prime locations for this venture
  useEffect(() => {
    let isMounted = true;
    const fetchLocations = async () => {
      try {
        const vId = venture.ventureId || SITE_CONFIG.ventureIdentifier;
        const baseUrl = SITE_CONFIG.apiBaseUrl.replace(/\/+$/, '');
        const res = await fetch(`${baseUrl}/cms/venture-locations?venture_id=${vId}`);
        if (res.ok) {
          const json = await res.json();
          if (json && json.status === 'success' && Array.isArray(json.data) && json.data.length > 0) {
            const mapped: LocationItem[] = json.data.map((n: any, idx: number) => ({
              id: n.id ? Number(n.id) : idx + 1,
              title: n.title || 'Prime Landmark',
              distance: n.distance
                ? String(n.distance).toUpperCase().includes('KM')
                  ? String(n.distance).toUpperCase()
                  : `${n.distance} KM`
                : '—',
              travelTime: n.travel_time || '10 Mins Drive',
              group: n.group ? String(n.group).trim() : 'Connectivity',
              image: getLocationAssetUrl(n.image_url || n.image),
              desc: n.description || n.desc || '',
            }));
            if (isMounted) {
              setLiveLocations(mapped);
              setIsLoading(false);
              return;
            }
          }
        }
      } catch (err) {
        console.warn('[LocationsSection] Live locations fetch failed:', err);
      }
      if (isMounted) {
        if (venture.locations && venture.locations.length > 0) {
          setLiveLocations(venture.locations);
        }
        setIsLoading(false);
      }
    };

    fetchLocations();
    return () => {
      isMounted = false;
    };
  }, [venture.ventureId, venture.locations]);

  // Derive unique filter groups purely from the loaded live data
  const uniqueGroups = Array.from(new Set(liveLocations.map((l) => l.group))).filter(Boolean);
  const groups = [
    { key: 'all', label: 'All Landmarks', icon: 'explore' },
    ...uniqueGroups.map((g) => ({
      key: g,
      label: g,
      icon:
        /airport|flight|aviation/i.test(g) ? 'flight' :
        /manufacturing|industry|hub|factory/i.test(g) ? 'factory' :
        /temple|heritage|spiritual|hindu/i.test(g) ? 'temple_hindu' :
        /town|city|urban/i.test(g) ? 'location_city' :
        /transit|railway|commute/i.test(g) ? 'commute' :
        /commercial|business/i.test(g) ? 'domain' :
        /education|school|college|university/i.test(g) ? 'school' :
        /hospital|health|medical/i.test(g) ? 'local_hospital' : 'pin_drop',
    })),
  ];

  const filteredLocations =
    selectedGroup === 'all'
      ? liveLocations
      : liveLocations.filter((l) => l.group === selectedGroup);

  // If there are exactly 4 items and 'all' filter is active, render the modern bento/mosaic layout
  const isBentoMode = selectedGroup === 'all' && filteredLocations.length === 4;

  return (
    <section
      id="locations"
      style={{
        backgroundColor: isDark ? '#0A0F1D' : '#F9F8F5',
        color: isDark ? '#FFFFFF' : theme.textPrimary,
      }}
      className="py-20 lg:py-28 border-b border-black/5 dark:border-white/10 relative transition-colors duration-500 overflow-hidden"
    >
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-black/5 dark:border-white/10">
          <div className="space-y-3 max-w-2xl">
            <div className="flex items-center gap-2">
              <span style={{ backgroundColor: theme.accent }} className="w-8 h-[2px]" />
              <span
                style={{ color: theme.accent }}
                className="font-sans text-xs font-extrabold uppercase tracking-[0.2em]"
              >
                Prime Growth Epicenter
              </span>
            </div>
            <h2
              style={{
                fontFamily: theme.fontHeading,
                color: isDark ? '#FFFFFF' : theme.textPrimary,
              }}
              className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-tight"
            >
              Strategic Proximity &{' '}
              <span className="italic" style={{ color: theme.accent }}>
                Prime Landmarks
              </span>
            </h2>
          </div>

          <p className="text-sm sm:text-base text-slate-500 dark:text-slate-400 max-w-md font-light leading-relaxed">
            Direct high-speed highway connectivity to premier transit hubs, industrial corridors, and cultural landmarks.
          </p>
        </div>

        {/* Group Filter Tabs (Clean modern rectangular style) */}
        {groups.length > 1 && (
          <div className="flex flex-wrap items-center gap-2">
            {groups.map((grp) => {
              const active = selectedGroup === grp.key;
              return (
                <button
                  key={grp.key}
                  type="button"
                  onClick={() => setSelectedGroup(grp.key)}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all duration-200 cursor-pointer ${
                    active
                      ? 'bg-amber-500 text-slate-950 font-bold shadow-xs'
                      : isDark
                      ? 'bg-slate-900 text-slate-300 hover:text-white border border-slate-700/80'
                      : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200 shadow-xs'
                  }`}
                >
                  <span className="material-symbols-outlined text-[15px]">{grp.icon}</span>
                  <span>{grp.label}</span>
                </button>
              );
            })}
          </div>
        )}

        {/* Loading Skeleton */}
        {isLoading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="h-[360px] rounded-2xl bg-slate-200 dark:bg-slate-800 animate-pulse"
              />
            ))}
          </div>
        )}

        {/* Empty State */}
        {!isLoading && filteredLocations.length === 0 && (
          <div className="py-16 text-center text-slate-400">
            <span className="material-symbols-outlined text-4xl mb-2 text-slate-300">location_off</span>
            <p className="text-sm">No prime locations found in this category.</p>
          </div>
        )}

        {/* Modern Bento Mosaic Presentation (Clean, edge-to-edge images matching reference) */}
        {!isLoading && isBentoMode && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-5 lg:gap-6">
            {/* Card 1: Featured Large (Airport) - 5 Columns */}
            <div
              onClick={() => setActiveModalLoc(filteredLocations[0])}
              className="lg:col-span-5 h-[320px] sm:h-[380px] lg:h-[460px] group relative rounded-2xl sm:rounded-3xl overflow-hidden cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-500 border border-black/10 dark:border-white/10 hover:border-amber-400/60 hover:-translate-y-1 bg-slate-900"
            >
              <img
                src={filteredLocations[0].image}
                alt={filteredLocations[0].title}
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/35 to-transparent" />

              {/* Bottom Overlaid Label - Clean Reference Format */}
              <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6 space-y-1">
                <h3 className="text-white font-bold text-lg sm:text-xl tracking-tight drop-shadow-md">
                  {filteredLocations[0].title} - <span className="text-amber-400 font-extrabold">{filteredLocations[0].distance}</span>
                </h3>
                {filteredLocations[0].desc && (
                  <p className="text-xs text-white/75 font-light line-clamp-2 leading-relaxed">
                    {filteredLocations[0].desc}
                  </p>
                )}
              </div>
            </div>

            {/* Middle Column: 2 Stacked Cards (TCL & Srikalahasti Temple) - 4 Columns */}
            <div className="lg:col-span-4 flex flex-col gap-5 lg:gap-6 justify-between h-auto lg:h-[460px]">
              {/* Card 2: TCL */}
              <div
                onClick={() => setActiveModalLoc(filteredLocations[1])}
                className="h-[210px] sm:h-[230px] lg:h-[218px] group relative rounded-2xl sm:rounded-3xl overflow-hidden cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-500 border border-black/10 dark:border-white/10 hover:border-amber-400/60 hover:-translate-y-1 bg-slate-900"
              >
                <img
                  src={filteredLocations[1].image}
                  alt={filteredLocations[1].title}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/35 to-transparent" />

                {/* Bottom Overlaid Label */}
                <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5">
                  <h3 className="text-white font-bold text-base sm:text-lg tracking-tight drop-shadow-md">
                    {filteredLocations[1].title} - <span className="text-amber-400 font-extrabold">{filteredLocations[1].distance}</span>
                  </h3>
                </div>
              </div>

              {/* Card 3: Srikalahasti Temple */}
              <div
                onClick={() => setActiveModalLoc(filteredLocations[2])}
                className="h-[210px] sm:h-[230px] lg:h-[218px] group relative rounded-2xl sm:rounded-3xl overflow-hidden cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-500 border border-black/10 dark:border-white/10 hover:border-amber-400/60 hover:-translate-y-1 bg-slate-900"
              >
                <img
                  src={filteredLocations[2].image}
                  alt={filteredLocations[2].title}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/35 to-transparent" />

                {/* Bottom Overlaid Label */}
                <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5">
                  <h3 className="text-white font-bold text-base sm:text-lg tracking-tight drop-shadow-md">
                    {filteredLocations[2].title} - <span className="text-amber-400 font-extrabold">{filteredLocations[2].distance}</span>
                  </h3>
                </div>
              </div>
            </div>

            {/* Card 4: Yerpedu - 3 Columns Vertical Card */}
            <div
              onClick={() => setActiveModalLoc(filteredLocations[3])}
              className="lg:col-span-3 h-[320px] sm:h-[380px] lg:h-[460px] group relative rounded-2xl sm:rounded-3xl overflow-hidden cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-500 border border-black/10 dark:border-white/10 hover:border-amber-400/60 hover:-translate-y-1 bg-slate-900"
            >
              <img
                src={filteredLocations[3].image}
                alt={filteredLocations[3].title}
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/35 to-transparent" />

              {/* Bottom Overlaid Label */}
              <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6 space-y-1">
                <h3 className="text-white font-bold text-lg sm:text-xl tracking-tight drop-shadow-md">
                  {filteredLocations[3].title} - <span className="text-amber-400 font-extrabold">{filteredLocations[3].distance}</span>
                </h3>
                {filteredLocations[3].desc && (
                  <p className="text-xs text-white/75 font-light line-clamp-2 leading-relaxed">
                    {filteredLocations[3].desc}
                  </p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Standard Responsive Edge-to-Edge Grid (Used when filtered or count != 4) */}
        {!isLoading && !isBentoMode && filteredLocations.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredLocations.map((loc) => (
              <div
                key={loc.id}
                onClick={() => setActiveModalLoc(loc)}
                className="h-[320px] sm:h-[360px] group relative rounded-2xl sm:rounded-3xl overflow-hidden cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-500 border border-black/10 dark:border-white/10 hover:border-amber-400/60 hover:-translate-y-1 bg-slate-900"
              >
                <img
                  src={loc.image}
                  alt={loc.title}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/35 to-transparent" />

                {/* Bottom Overlaid Label */}
                <div className="absolute inset-x-0 bottom-0 p-5 space-y-1">
                  <h3 className="text-white font-bold text-base sm:text-lg tracking-tight drop-shadow-md">
                    {loc.title} - <span className="text-amber-400 font-extrabold">{loc.distance}</span>
                  </h3>
                  {loc.desc && (
                    <p className="text-xs text-white/70 font-light line-clamp-2 leading-relaxed">
                      {loc.desc}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Interactive Detail Modal on Card Click */}
      {activeModalLoc && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
          onClick={() => setActiveModalLoc(null)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-2xl rounded-2xl overflow-hidden shadow-2xl border border-white/15 bg-slate-900 text-white"
          >
            {/* Modal Image */}
            <div className="relative aspect-[16/10] overflow-hidden bg-black">
              <img
                src={activeModalLoc.image}
                alt={activeModalLoc.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent" />

              {/* Close Icon */}
              <button
                type="button"
                onClick={() => setActiveModalLoc(null)}
                className="absolute top-4 right-4 w-8 h-8 rounded-lg bg-black/70 backdrop-blur-md border border-white/20 text-white flex items-center justify-center hover:bg-white hover:text-black transition-colors cursor-pointer"
              >
                <span className="material-symbols-outlined text-lg">close</span>
              </button>

              {/* Group & Distance Label */}
              <div className="absolute bottom-4 left-6 flex items-center gap-2">
                <span className="bg-amber-500 text-slate-950 px-2.5 py-1 rounded-md text-xs font-extrabold uppercase">
                  {activeModalLoc.group}
                </span>
                <span className="bg-black/70 backdrop-blur-md text-white px-2.5 py-1 rounded-md text-xs font-bold border border-white/15">
                  {activeModalLoc.distance}
                </span>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-6 sm:p-8 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <h3 className="text-2xl font-bold tracking-tight text-white">
                  {activeModalLoc.title}
                </h3>
                {activeModalLoc.travelTime && (
                  <span className="text-sm font-semibold text-amber-400 flex items-center gap-1">
                    <span className="material-symbols-outlined text-base">schedule</span>
                    <span>{activeModalLoc.travelTime}</span>
                  </span>
                )}
              </div>

              {activeModalLoc.desc && (
                <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-light">
                  {activeModalLoc.desc}
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
