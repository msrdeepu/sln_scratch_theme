/**
 * ─────────────────────────────────────────────────────────────────────────────
 * SLN LUXURY MICROSITE CONFIGURATION
 * ─────────────────────────────────────────────────────────────────────────────
 * To deploy this microsite for ANY venture:
 * Simply change `ventureIdentifier` below to your Venture ID or Slug!
 * Examples:
 *   - 'arjun-vntures' (Slug)
 *   - '232' (Venture ID)
 *   - '1' (Page ID)
 *
 * You can also pass it via URL query param:
 *   http://localhost:3001/?venture=arjun-vntures
 *
 * For production build, set VITE_API_BASE_URL in your .env file:
 *   VITE_API_BASE_URL=https://cms.slnmplapp.com/api
 * ─────────────────────────────────────────────────────────────────────────────
 */

export const SITE_CONFIG = {
  // Live API Base URL (defaults to live CMS so standalone/deployed builds connect directly)
  apiBaseUrl: (import.meta.env.VITE_API_BASE_URL as string) || 'https://cms.slnmplapp.com/api',

  // ACTIVE VENTURE IDENTIFIER (Set to Venture ID, e.g. 232, or Slug)
  activeVentureId: (import.meta.env.VITE_VENTURE_ID as string) || '232',
  ventureIdentifier: (import.meta.env.VITE_VENTURE_ID as string) || '232',
  defaultSlug: (import.meta.env.VITE_VENTURE_ID as string) || '232',

  // Default Template Theme (e.g., 'flagship', 'noir', 'royal-navy', 'emerald')
  defaultThemeId: 'flagship',

  // Fallback to local sample data if API is offline or not found
  enableOfflineFallback: true,

  // Admin Asset Base URL for blueprint images (configured from sitevars)
  adminBaseUrl: (import.meta.env.VITE_ADMIN_BASE_URL as string) || 'https://admin.slnmplapp.com',
};

export const API_ENDPOINTS = {
  getVenturePage: (ventureId: string | number) => `${SITE_CONFIG.apiBaseUrl}/cms/ventures/${ventureId}/page`,
  getInteractiveMap: (ventureId: string | number) => `${SITE_CONFIG.apiBaseUrl}/ventures/${ventureId}/interactive-map`,
  submitInquiry: `${SITE_CONFIG.apiBaseUrl}/cms/leads`,
};

/**
 * Format map image asset URLs to load exclusively from the admin asset host
 */
export function getMapAssetUrl(url: string | null | undefined): string {
  if (!url) return '';
  if (url.startsWith('data:')) return url;

  // Preserve CMS uploaded location images directly from the CMS asset host
  if (url.includes('/uploads/venture_locations/') || url.includes('/uploads/venture_pages/')) {
    if (url.startsWith('http://') || url.startsWith('https://')) {
      return url;
    }
    const clean = url.startsWith('/') ? url.substring(1) : url;
    return `https://cms.slnmplapp.com/${clean}`;
  }

  const adminBase = (SITE_CONFIG.adminBaseUrl || 'https://admin.slnmplapp.com').replace(/\/+$/, '');

  // If URL references cms domain, redirect to admin domain for image assets
  if (url.includes('cms.slnmplapp.com')) {
    return url.replace(/^https?:\/\/cms\.slnmplapp\.com/, adminBase);
  }

  if (url.startsWith('http://') || url.startsWith('https://')) {
    return url;
  }

  let clean = url.startsWith('/') ? url.substring(1) : url;
  if (!clean.startsWith('core/public/') && clean.startsWith('officedocs/')) {
    clean = 'core/public/' + clean;
  }
  return `${adminBase}/${clean}`;
}

/**
 * Format prime location image URLs to load from CMS asset host
 */
export function getLocationAssetUrl(url: string | null | undefined): string {
  if (!url) return '';
  if (url.startsWith('data:')) return url;
  if (url.startsWith('http://') || url.startsWith('https://')) {
    return url;
  }
  let clean = url.startsWith('/') ? url.substring(1) : url;
  if (!clean.startsWith('core/public/')) {
    clean = 'core/public/' + clean;
  }
  return `https://cms.slnmplapp.com/${clean}`;
}

