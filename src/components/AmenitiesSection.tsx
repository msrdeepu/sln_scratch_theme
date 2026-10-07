import React, { useState, useEffect } from 'react';
import { TemplateTheme, VentureData, AmenityItem } from '../types';
import { SITE_CONFIG, getLocationAssetUrl } from '../siteConfig';

interface AmenitiesSectionProps {
  theme: TemplateTheme;
  venture: VentureData;
}

function getIconName(icon: string | undefined): string {
  if (!icon) return 'check_circle';
  const clean = icon.toLowerCase().trim();
  if (clean.includes('wifi')) return 'wifi';
  if (clean.includes('lightning') || clean.includes('power') || clean.includes('bolt')) return 'bolt';
  if (clean.includes('pool') || clean.includes('swim')) return 'pool';
  if (clean.includes('sewage') || clean.includes('pipe') || clean.includes('plumb') || clean.includes('tune')) return 'plumbing';
  if (clean.includes('fire')) return 'local_fire_department';
  if (clean.includes('arch') || clean.includes('entrance') || clean.includes('architecture')) return 'architecture';
  return icon;
}

export default function AmenitiesSection({ theme, venture }: AmenitiesSectionProps) {
  const isDark = theme.isDark;
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [amenities, setAmenities] = useState<AmenityItem[]>(venture.amenities || []);
  const [isLoading, setIsLoading] = useState<boolean>(!venture.amenities || venture.amenities.length === 0);

  // Fetch strictly live CMS amenities with real asset images and icons
  useEffect(() => {
    let isMounted = true;
    const fetchAmenities = async () => {
      try {
        const baseUrl = SITE_CONFIG.apiBaseUrl.replace(/\/+$/, '');
        const res = await fetch(`${baseUrl}/cms/amenities`);
        if (res.ok) {
          const json = await res.json();
          if (json && json.status === 'success' && Array.isArray(json.data) && json.data.length > 0) {
            const mapped: AmenityItem[] = json.data.map((a: any, idx: number) => ({
              id: a.id ? Number(a.id) : idx + 1,
              title: a.title || a.display_name || 'Amenity',
              icon: a.icon || 'check_circle',
              category: a.category || 'General',
              desc: a.description || a.desc || '',
              image: getLocationAssetUrl(a.icon_image_url || a.image_url || a.icon_image || a.image),
              iconImage: getLocationAssetUrl(a.icon_image_url || a.icon_image),
              color: a.color,
              badge: a.badge,
            }));
            if (isMounted) {
              setAmenities(mapped);
              setIsLoading(false);
              return;
            }
          }
        }
      } catch (err) {
        console.warn('[AmenitiesSection] Live amenities fetch failed:', err);
      }
      if (isMounted) {
        if (venture.amenities && venture.amenities.length > 0) {
          setAmenities(venture.amenities);
        }
        setIsLoading(false);
      }
    };

    fetchAmenities();
    return () => {
      isMounted = false;
    };
  }, [venture.amenities]);

  // Build category tabs dynamically from live data
  const uniqueCategories = Array.from(new Set(amenities.map((a) => a.category))).filter(Boolean);
  const categories = [
    { key: 'all', label: 'All Amenities' },
    ...uniqueCategories.map((cat) => ({ key: cat, label: cat })),
  ];

  const filtered =
    activeCategory === 'all'
      ? amenities
      : amenities.filter((a) => a.category === activeCategory);

  return (
    <section
      id="amenities"
      style={{
        backgroundColor: isDark ? '#0A0F1D' : '#FFFFFF',
        color: isDark ? '#FFFFFF' : theme.textPrimary,
      }}
      className="py-20 lg:py-28 border-b border-black/5 dark:border-white/10 relative transition-colors duration-500"
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
                World-Class Infrastructure
              </span>
            </div>
            <h2
              style={{
                fontFamily: theme.fontHeading,
                color: isDark ? '#FFFFFF' : theme.textPrimary,
              }}
              className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-tight"
            >
              Curated Development{' '}
              <span className="italic" style={{ color: theme.accent }}>
                Amenities & Standards
              </span>
            </h2>
          </div>

          <p className="text-sm sm:text-base text-slate-500 dark:text-slate-400 max-w-md font-light leading-relaxed">
            Engineered to perfection with high-grade materials, dedicated utilities, and modern community leisure facilities.
          </p>
        </div>

        {/* Category Tabs (Rendered only when multiple categories exist) */}
        {categories.length > 2 && (
          <div className="flex flex-wrap items-center gap-2">
            {categories.map((c) => (
              <button
                key={c.key}
                type="button"
                onClick={() => setActiveCategory(c.key)}
                className={`px-4 py-2 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                  activeCategory === c.key
                    ? 'bg-amber-500 text-slate-950 font-bold shadow-xs'
                    : isDark
                    ? 'bg-slate-900 text-slate-300 hover:text-white border border-slate-700/80'
                    : 'bg-slate-50 text-slate-600 hover:text-slate-900 border border-slate-200 shadow-xs'
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>
        )}

        {/* Loading Skeleton */}
        {isLoading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="h-[280px] rounded-2xl bg-slate-200 dark:bg-slate-800 animate-pulse"
              />
            ))}
          </div>
        )}

        {/* Live Amenities Grid featuring Real Images & Icons */}
        {!isLoading && filtered.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {filtered.map((item) => (
              <div
                key={item.id}
                className="group rounded-2xl overflow-hidden border border-black/10 dark:border-white/10 bg-white dark:bg-slate-900/90 shadow-sm hover:shadow-xl hover:border-amber-400/50 transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between"
              >
                {/* Real Asset Image with floating icon */}
                <div className="relative aspect-[16/10] overflow-hidden bg-slate-900">
                  {item.image ? (
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-slate-800 to-slate-950 flex items-center justify-center">
                      <span className="material-symbols-outlined text-4xl text-amber-400/60">
                        {getIconName(item.icon)}
                      </span>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />

                  {/* Floating Icon Badge on top of image */}
                  <div className="absolute bottom-3 left-3 w-10 h-10 rounded-xl bg-black/60 backdrop-blur-md border border-white/20 text-amber-400 flex items-center justify-center shadow-md">
                    <span className="material-symbols-outlined text-xl">
                      {getIconName(item.icon)}
                    </span>
                  </div>

                  {/* Category Badge */}
                  {item.category && item.category !== 'General' && (
                    <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-md text-amber-300 text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-md border border-white/15">
                      {item.category}
                    </div>
                  )}
                </div>

                {/* Content - Clean without bottom line or dummy text */}
                <div className="p-5 sm:p-6 space-y-2">
                  <h3 className="font-bold text-base sm:text-lg text-slate-900 dark:text-white tracking-tight">
                    {item.title}
                  </h3>
                  {item.desc ? (
                    <p className="text-xs text-slate-500 dark:text-slate-400 font-light leading-relaxed line-clamp-2">
                      {item.desc}
                    </p>
                  ) : null}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
