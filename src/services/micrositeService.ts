import { SITE_CONFIG, getMapAssetUrl, getLocationAssetUrl } from '../siteConfig';
import { VentureData, AmenityItem, LocationItem, FaqItem } from '../types';
import { SAMPLE_VENTURES } from '../sampleData';
import { InteractiveMapData } from '../types/interactiveMap';

/**
 * Extract ConvAI agent-id from string or tag, with fallback
 */
export function extractConvaiAgentId(connectString?: string | null, fallbackId: string = ''): string {
  if (!connectString || typeof connectString !== 'string') return fallbackId;
  const trimmed = connectString.trim();
  if (!trimmed) return fallbackId;

  const match = trimmed.match(/agent-id=["']([^"']+)["']/i);
  if (match && match[1]) {
    return match[1].trim();
  }

  const agentMatch = trimmed.match(/agent_[a-zA-Z0-9_-]+/i);
  if (agentMatch && agentMatch[0]) {
    return agentMatch[0].trim();
  }

  const clean = trimmed.replace(/<[^>]*>?/gm, '').trim();
  return clean || fallbackId;
}

/**
 * Fetch and map live venture landing page data from CMS API into VentureData
 */
export const micrositeService = {
  /**
   * Determine the active identifier (supports URL query param override)
   */
  getActiveIdentifier(): string {
    try {
      const params = new URLSearchParams(window.location.search);
      const queryParam = params.get('venture') || params.get('id') || params.get('slug');
      if (queryParam) return queryParam.trim();
    } catch (e) {
      // In SSR or non-browser environments
    }
    return SITE_CONFIG.ventureIdentifier;
  },

  /**
   * Fetch live prime locations for a given venture ID from CMS API
   */
  async fetchPrimeLocations(ventureId?: number | string): Promise<any[]> {
    const vId = ventureId || SITE_CONFIG.ventureIdentifier;
    const baseUrl = SITE_CONFIG.apiBaseUrl.replace(/\/+$/, '');
    try {
      const res = await fetch(`${baseUrl}/cms/venture-locations?venture_id=${vId}`);
      if (res.ok) {
        const json = await res.json();
        if (json && json.status === 'success' && Array.isArray(json.data) && json.data.length > 0) {
          return json.data;
        }
      }
    } catch (err) {
      console.warn('[Microsite] /cms/venture-locations filtered fetch failed:', err);
    }

    try {
      const res = await fetch(`${baseUrl}/cms/venture-locations`);
      if (res.ok) {
        const json = await res.json();
        if (json && json.status === 'success' && Array.isArray(json.data) && json.data.length > 0) {
          const matching = json.data.filter((d: any) => String(d.venture_id) === String(vId));
          return matching.length > 0 ? matching : json.data;
        }
      }
    } catch (err) {
      console.warn('[Microsite] /cms/venture-locations generic fetch failed:', err);
    }

    return [];
  },

  /**
   * Fetch live master amenities from CMS API
   */
  async fetchLiveAmenities(): Promise<any[]> {
    const baseUrl = SITE_CONFIG.apiBaseUrl.replace(/\/+$/, '');
    try {
      const res = await fetch(`${baseUrl}/cms/amenities`);
      if (res.ok) {
        const json = await res.json();
        if (json && json.status === 'success' && Array.isArray(json.data) && json.data.length > 0) {
          return json.data;
        }
      }
    } catch (err) {
      console.warn('[Microsite] /cms/amenities fetch failed:', err);
    }
    return [];
  },


  /**
   * Fetch live venture page payload from CMS API
   */
  async fetchLivePage(identifier?: string): Promise<any | null> {
    const id = identifier || this.getActiveIdentifier();
    const baseUrl = SITE_CONFIG.apiBaseUrl.replace(/\/+$/, '');
    const cleanSlug = id.toLowerCase().replace(/^\/+/, '').replace(/^ventures\//, '').trim();

    const enrich = async (data: any) => {
      if (!data) return null;
      const vId = data.venture_id || (data.venture && data.venture.id) || (/^\d+$/.test(id) ? id : SITE_CONFIG.ventureIdentifier);
      try {
        const primeLocs = await this.fetchPrimeLocations(vId);
        if (primeLocs && primeLocs.length > 0) {
          data.primeLocations = primeLocs;
        }
      } catch {
        // Non-blocking
      }
      return data;
    };

    // Strategy 1: If numeric ID, try /cms/ventures/{id}/page then /cms/venture-pages/{id}
    if (/^\d+$/.test(id)) {
      try {
        const res = await fetch(`${baseUrl}/cms/ventures/${id}/page`);
        const json = await res.json();
        if (json && json.status === 'success' && json.data) {
          console.log('[Microsite] Loaded via /cms/ventures/:id/page');
          return await enrich(json.data);
        }
      } catch (err) {
        console.warn(`[Microsite] /cms/ventures/${id}/page fetch failed:`, err);
      }

      try {
        const res = await fetch(`${baseUrl}/cms/venture-pages/${id}`);
        const json = await res.json();
        if (json && json.status === 'success' && json.data) {
          console.log('[Microsite] Loaded via /cms/venture-pages/:id');
          return await enrich(json.data);
        }
      } catch (err) {
        console.warn(`[Microsite] /cms/venture-pages/${id} fetch failed:`, err);
      }
    }

    // Strategy 2: Try public endpoint directly (fastest for slug-based identifiers)
    try {
      const res = await fetch(`${baseUrl}/public/ventures/${cleanSlug}`);
      if (res.ok) {
        const json = await res.json();
        if (json && json.status === 'success' && json.data) {
          console.log('[Microsite] Loaded via /public/ventures/:slug');
          return await enrich(json.data);
        }
      }
    } catch (err) {
      console.warn(`[Microsite] /public/ventures/${cleanSlug} failed:`, err);
    }

    // Strategy 3: Fallback — fetch listing and find matching page by slug/name/id
    try {
      const res = await fetch(`${baseUrl}/cms/venture-pages`);
      const json = await res.json();
      if (json && json.status === 'success' && Array.isArray(json.data) && json.data.length > 0) {
        let foundSummary = json.data.find(
          (p: any) =>
            p.slug?.toLowerCase() === cleanSlug ||
            p.slug?.toLowerCase().replace(/[^a-z0-9]/g, '') === cleanSlug.replace(/[^a-z0-9]/g, '') ||
            p.slug?.toLowerCase().includes('arjun') ||
            cleanSlug.includes('arjun') ||
            String(p.id) === cleanSlug ||
            String(p.venture_id) === cleanSlug ||
            p.title?.toLowerCase().includes('arjun')
        );

        if (!foundSummary && json.data.length > 0) {
          foundSummary = json.data[0];
          console.log('[Microsite] Fallback to primary live page from CMS:', foundSummary.slug);
        }

        if (foundSummary) {
          // Fetch full detailed page record
          try {
            const fullRes = await fetch(`${baseUrl}/cms/venture-pages/${foundSummary.id}`);
            const fullJson = await fullRes.json();
            if (fullJson && fullJson.status === 'success' && fullJson.data) {
              console.log('[Microsite] Loaded via list search + /cms/venture-pages/:id');
              return await enrich(fullJson.data);
            }
          } catch (e) {
            console.warn('[Microsite] Full page record fetch failed:', e);
          }
          // If detailed endpoint fails, use summary record
          console.log('[Microsite] Using summary record for page');
          return await enrich(foundSummary);
        }
      }
    } catch (err) {
      console.warn('[Microsite] /cms/venture-pages list search failed:', err);
    }

    return null;
  },

  /**
   * Map raw CMS page payload into VentureData used by theme components
   */
  mapToVentureData(page: any): VentureData {
    if (!page) {
      return SAMPLE_VENTURES[0];
    }

    const hero = page.hero || page.raw_data?.hero || {};
    const whyChoose = page.why_choose || page.whyChoose || page.raw_data?.whyChoose || {};
    const specs = page.specs || page.raw_data?.specs || [];
    const about = page.about || page.raw_data?.about || {};
    const amenities = page.amenities || page.raw_data?.amenities || { customList: [] };
    const brochure = page.brochure || page.raw_data?.brochure || {};
    const connectivity = page.connectivity || page.raw_data?.connectivity || {};
    const masterPlan = page.master_plan || page.masterPlan || page.raw_data?.masterPlan || {};
    const faqs = page.faqs || page.raw_data?.faqs || [];
    const concierge = page.concierge || page.raw_data?.concierge || {};
    const ventureRel = page.venture || {};

    const defaultChatbotAgentId = 'agent_5801ky7b7a2ce9prsm6nvbs4vd1y';
    const defaultVoicebotAgentId = 'agent_8301ky7bmb15eyhr96n57zev4a26';

    const rawChatbot =
      page.chatbot_connect_string ||
      page.chatbotConnectString ||
      page.raw_data?.chatbot_connect_string ||
      page.raw_data?.chatbotConnectString ||
      ventureRel.chatbot_connect_string ||
      ventureRel.chatbotConnectString;

    const rawVoicebot =
      page.voicebot_connect_string ||
      page.voicebotConnectString ||
      page.raw_data?.voicebot_connect_string ||
      page.raw_data?.voicebotConnectString ||
      ventureRel.voicebot_connect_string ||
      ventureRel.voicebotConnectString;

    const chatbotAgentId = extractConvaiAgentId(rawChatbot, defaultChatbotAgentId);
    const voicebotAgentId = extractConvaiAgentId(rawVoicebot, defaultVoicebotAgentId);

    // Map Specs to stats array
    const mappedStats = Array.isArray(specs) && specs.length > 0
      ? specs.map((s: any) => ({
          value: s.value || '—',
          label: s.label || '',
          sub: s.sub || '',
        }))
      : [
          { value: '180+', label: 'Total Plots' },
          { value: '40 & 50 Ft', label: 'BT Roads' },
          { value: '100%', label: 'Vaastu Compliant' },
          { value: '24/7', label: 'Gated Security' },
          { value: 'Spot Registry', label: 'Clear Title' },
        ];

    // Map Why Choose Pillars
    const mappedPillars = Array.isArray(whyChoose.pillars) && whyChoose.pillars.length > 0
      ? whyChoose.pillars.map((p: any) => ({
          icon: p.tag === 'Macro Location' ? 'explore' : p.tag === 'Growth Vector' ? 'trending_up' : 'verified',
          title: p.title || 'Investment Pillar',
          description: p.desc || '',
          tag: p.tag || 'Value Factor',
          points: Array.isArray(p.points) ? p.points : [],
        }))
      : SAMPLE_VENTURES[0].whyChoosePoints;

    // Map Master Amenities
    const mappedAmenities: AmenityItem[] = Array.isArray(amenities.customList) && amenities.customList.length > 0
      ? amenities.customList.map((a: any, idx: number) => ({
          id: Number(a.id) || idx + 1,
          title: a.title || 'Amenity',
          icon: 'check_circle',
          category: a.category || 'General',
          desc: a.desc || '',
        }))
      : SAMPLE_VENTURES[0].amenities;

    // Map Prime Locations / Transit Nodes
    const rawLocations = (Array.isArray(page.primeLocations) && page.primeLocations.length > 0)
      ? page.primeLocations
      : (Array.isArray(ventureRel.locations) && ventureRel.locations.length > 0)
      ? ventureRel.locations
      : (Array.isArray(page.locations) && page.locations.length > 0)
      ? page.locations
      : (Array.isArray(connectivity.transitNodes) && connectivity.transitNodes.length > 0)
      ? connectivity.transitNodes
      : null;

    const formatTravelTime = (time: any, dist: any) => {
      if (time && String(time).trim() !== '' && time !== '—') return String(time).trim();
      if (dist) {
        const num = parseInt(String(dist).replace(/\D/g, ''), 10);
        if (!isNaN(num) && num > 0) {
          return `${Math.round(num * 1.5) || 10} Mins`;
        }
      }
      return '10 Mins';
    };

    const formatDistance = (dist: any) => {
      if (!dist) return '—';
      const s = String(dist).trim();
      return /km/i.test(s) ? s.toUpperCase() : `${s} KM`;
    };

    const mappedLocations: LocationItem[] = rawLocations && rawLocations.length > 0
      ? rawLocations.map((n: any, idx: number) => ({
          id: n.id ? Number(n.id) : idx + 1,
          title: n.title || n.landmark || 'Prime Landmark',
          distance: formatDistance(n.distance || n.dist),
          travelTime: formatTravelTime(n.travel_time || n.travelTime || n.time, n.distance || n.dist),
          group: n.group ? String(n.group).trim() : 'Connectivity',
          image: getLocationAssetUrl(n.image_url || n.image) || 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=600&q=80',
          desc: n.description || n.desc || '',
        }))
      : SAMPLE_VENTURES[0].locations;

    // Map FAQs
    const mappedFaqs: FaqItem[] = Array.isArray(faqs) && faqs.length > 0
      ? faqs.map((f: any) => ({
          question: f.q || f.question || '',
          answer: f.a || f.answer || '',
        }))
      : SAMPLE_VENTURES[0].faqs;

    // Overview Paragraphs
    const overviewParagraphs = Array.isArray(about.paragraphs) && about.paragraphs.length > 0
      ? about.paragraphs
      : [
          page.tagline || hero.subheadline || 'A premier master-planned plotted layout engineered for generational wealth and elevated living.',
          'Designed with broad asphalt avenues, underground utilities, and clear legal title certainty.'
        ];

    return {
      id: String(page.slug || page.id),
      ventureId: page.venture_id,
      title: page.title || ventureRel.title || 'SLN Venture',
      tagline: page.tagline || hero.subheadline || '',
      location: hero.locationText || ventureRel.location || 'Prime Growth Corridor',
      address: concierge.officeAddress || ventureRel.location || '',
      reraNumber: hero.reraNumber || 'Applied & Compliant',
      heroBanner: hero.heroBannerUrl || 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80',
      welcomeEyebrow: hero.welcomeEyebrow != null ? String(hero.welcomeEyebrow).trim() : '',
      headline: hero.headline || page.title,
      subheadline: hero.subheadline || page.tagline,
      vimeoId: (() => {
        const raw = hero.vimeoId || hero.videoUrl || ventureRel.venture_vimeo_id;
        return raw && String(raw).trim() ? String(raw).trim() : undefined;
      })(),
      vimeoUrl: (() => {
        const raw = hero.videoUrl || (hero.vimeoId ? `https://player.vimeo.com/video/${hero.vimeoId}` : null) || (ventureRel.venture_vimeo_id ? `https://player.vimeo.com/video/${ventureRel.venture_vimeo_id}` : null);
        return raw && String(raw).trim() ? String(raw).trim() : undefined;
      })(),
      droneVideoTitle: `${page.title} — 4K Cinematic Aerial Drone Walkthrough`,

      overviewText: overviewParagraphs,
      aboutImage: about.sitePhotoUrl || 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1000&q=80',
      aboutEyebrow: about.eyebrow || 'Development Overview',
      aboutTitle: about.title || 'A Master-Planned Enclave Conceived for Elevated Living',
      aboutQuote: about.quoteText || `"${page.title} delivers the rarest luxury in real estate: absolute title certainty and immediate spot registry."`,
      aboutQuoteAuthor: about.quoteAuthor || '— SLN Group Principal Architecture & Engineering Desk',
      aboutChecklist: Array.isArray(about.checklist) ? about.checklist : [],

      totalPlots: specs[0]?.value || masterPlan.totalPlotsCount || '175',
      roadWidth: (() => {
        const roadSpec = Array.isArray(specs) ? specs.find((s: any) => /road|width|avenue|bt/i.test(s.label || s.sub || '')) : null;
        const val = roadSpec?.value || specs[1]?.value || '40 & 50 Feet';
        return String(val) === '10' ? '40 & 50 Feet' : val;
      })(),
      specs: mappedStats,
      stats: mappedStats,

      whyChoosePoints: mappedPillars,
      whyChooseEyebrow: whyChoose.sectionEyebrow || 'Investment Thesis',
      whyChooseTitle: whyChoose.sectionTitle || 'Strategic Pillars of Long-Term Value & Certainty',
      whyChooseSubtitle: whyChoose.sectionSubtitle || '',

      amenities: mappedAmenities,
      locations: mappedLocations,

      brochureMockup: brochure.coverPreviewUrl || 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&w=800&q=80',
      brochureUrl: brochure.pdfUrl || '#download-brochure',
      brochureTitle: brochure.title || 'Private Investment Dossier & Cadastral Kit',
      brochureDesc: brochure.description || 'Download the verified legal title opinion, master layout blueprint, and plot availability schedule.',
      brochureFileSize: brochure.fileSizeLabel || 'PDF • 8.4 MB',
      brochureFileName: brochure.fileName || `${page.slug || 'venture'}-dossier.pdf`,

      mapEmbedImage: connectivity.mapEmbedUrl || 'https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=800&q=80',

      masterPlanImage: masterPlan.blueprintImageUrl || 'https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=800&q=80',
      masterPlanTitle: masterPlan.title || 'Master Layout & Plot Architecture',
      masterPlanEyebrow: masterPlan.eyebrow || 'Master Layout Plan',
      masterPlanTotalPlots: masterPlan.totalPlotsCount || '180+',
      masterPlanLegends: Array.isArray(masterPlan.legends) ? masterPlan.legends : [],

      faqs: mappedFaqs,

      contact: {
        phone: concierge.directSalesPhone ? String(concierge.directSalesPhone).trim() : (hero.salesPhone && hero.salesPhone !== '+91 98480 12345' ? String(hero.salesPhone).trim() : ''),
        email: 'invest@slngroup.in',
        branchAddress: concierge.officeAddress || ventureRel.location || 'Corridor Enclave Site Office',
        whatsapp: concierge.whatsappNumber || '+919848012345',
        visitingHours: concierge.visitingHours || 'Monday - Sunday: 8:30 AM - 6:30 PM',
        loungeTitle: concierge.loungeTitle || 'VIP Site Reception Lounge',
        chauffeur: Boolean(concierge.complimentaryChauffeur),
        googleMapsEmbedUrl: (() => {
          const raw = concierge.googleMapsEmbedUrl || concierge.mapEmbedUrl;
          if (raw) {
            const match = String(raw).match(/src=["']([^"']+)["']/i);
            return match ? match[1] : String(raw).trim();
          }
          return 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31050.15024419996!2d80.005085!3d13.585526!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a4d81232870197d%3A0xb35a0cfb247f082e!2sTada%2C%20Andhra%20Pradesh!5e0!3m2!1sen!2sin!4v1710000000000';
        })(),
        directionsUrl: concierge.googleMapsDirectionsUrl || concierge.directionsUrl || 'https://maps.app.goo.gl/ccX7VBApuJTJGqKHA',
      },

      seo: {
        ...(page.raw_data?.seo || {}),
        ...(page.seo || {}),
        metaTitle: page.meta_title || page.raw_data?.metaTitle || page.seo?.ogTitle || page.title,
        metaDescription: page.meta_description || page.raw_data?.metaDescription || page.seo?.ogDescription || page.tagline || hero.subheadline,
      },
      metaTitle: page.meta_title || page.raw_data?.metaTitle || page.seo?.ogTitle || page.title,
      metaDescription: page.meta_description || page.raw_data?.metaDescription || page.seo?.ogDescription || page.tagline || hero.subheadline,
      rawSections: page,
      chatbotConnectString: rawChatbot || '',
      voicebotConnectString: rawVoicebot || '',
      chatbotAgentId,
      voicebotAgentId,
      colorPalette: page.color_palette || page.raw_data?.colorPalette || undefined,
    };
  },

  /**
   * Load active venture data for microsite rendering
   */
  async loadActiveVenture(): Promise<VentureData> {
    let ventureData: VentureData = SAMPLE_VENTURES[0];
    try {
      const liveData = await this.fetchLivePage();
      if (liveData) {
        ventureData = this.mapToVentureData(liveData);
      }
    } catch (err) {
      console.warn('[Microsite] Error loading live page, using fallback:', err);
    }

    // Always fetch and ensure live prime locations from CMS are integrated
    try {
      const vId = ventureData.ventureId || SITE_CONFIG.ventureIdentifier;
      const primeLocs = await this.fetchPrimeLocations(vId);
      if (primeLocs && primeLocs.length > 0) {
        ventureData.locations = primeLocs.map((n: any, idx: number) => ({
          id: n.id ? Number(n.id) : idx + 1,
          title: n.title || 'Prime Landmark',
          distance: n.distance ? (String(n.distance).toUpperCase().includes('KM') ? String(n.distance).toUpperCase() : `${n.distance} KM`) : '—',
          travelTime: n.travel_time || '10 Mins Drive',
          group: n.group ? String(n.group).trim() : 'Connectivity',
          image: getLocationAssetUrl(n.image_url || n.image) || 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=700&q=80',
          desc: n.description || n.desc || '',
        }));
      }
    } catch (e) {
      console.warn('[Microsite] Error loading prime locations:', e);
    }

    // Always fetch and ensure live amenities from CMS are integrated
    try {
      const liveAmenities = await this.fetchLiveAmenities();
      if (liveAmenities && liveAmenities.length > 0) {
        ventureData.amenities = liveAmenities.map((a: any, idx: number) => ({
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
      }
    } catch (e) {
      console.warn('[Microsite] Error loading live amenities:', e);
    }

    return ventureData;
  },

  /**
   * Fetch interactive master plan map data (plots, layout image, coordinates, status)
   * Fetches strictly from CMS domain (cms.slnmplapp.com)
   */
  async fetchInteractiveMap(ventureId?: string | number): Promise<InteractiveMapData | null> {
    let id = ventureId || this.getActiveIdentifier() || SITE_CONFIG.ventureIdentifier;
    if (typeof id === 'string' && !/^\d+$/.test(id)) {
      id = SITE_CONFIG.ventureIdentifier;
    }
    const baseUrl = SITE_CONFIG.apiBaseUrl.replace(/\/+$/, '');

    // Endpoints strictly querying CMS subdomain
    const endpoints = [
      `${baseUrl}/ventures/${id}/interactive-map`,
      `${baseUrl}/cms/ventures/${id}/interactive-map`,
      `https://cms.slnmplapp.com/api/ventures/${id}/interactive-map`,
      `https://cms.slnmplapp.com/api/cms/ventures/${id}/interactive-map`,
    ];

    for (const url of endpoints) {
      try {
        const res = await fetch(url);
        if (res.ok) {
          const json = await res.json();
          if (json && (json.success || json.status === 'success') && json.data) {
            const mapPayload: InteractiveMapData = json.data;
            if (mapPayload.map && mapPayload.map.image_url) {
              mapPayload.map.image_url = getMapAssetUrl(mapPayload.map.image_url);
            }
            return mapPayload;
          }
        }
      } catch (e) {
        // Continue to next endpoint
      }
    }

    return null;
  },

  /**
   * Fetch full live specifications for an individual property/plot
   * Strictly queries CMS endpoints
   */
  async fetchPropertyDetails(propertyId: number | string): Promise<any | null> {
    if (!propertyId) return null;
    const baseUrl = SITE_CONFIG.apiBaseUrl.replace(/\/+$/, '');

    const endpoints = [
      `${baseUrl}/cms/property-details/${propertyId}`,
      `${baseUrl}/ventures/property-details/${propertyId}`,
      `${baseUrl}/property-details/${propertyId}`,
      `https://cms.slnmplapp.com/api/cms/property-details/${propertyId}`,
      `https://cms.slnmplapp.com/api/ventures/property-details/${propertyId}`,
      `https://cms.slnmplapp.com/api/property-details/${propertyId}`,
    ];

    for (const url of endpoints) {
      try {
        const res = await fetch(url);
        if (res.ok) {
          const json = await res.json();
          if (json && (json.success || json.status === 'success') && json.data) {
            return json.data;
          }
        }
      } catch (e) {
        // Continue to next fallback endpoint
      }
    }

    return null;
  },

  /**
   * Submit Site Visit Request / Enquiry to live CMS API
   */
  async submitEnquiry(payload: {
    name: string;
    mobile: string;
    email?: string;
    plot_number?: string;
    booking_date?: string;
    preferred_slot?: string;
    venture_id?: string | number;
    venture_slug?: string;
    interested_venture?: string;
    message?: string;
    page?: string;
    source?: string;
    subject?: string;
  }): Promise<{ success: boolean; message: string; data?: any }> {
    const baseUrl = SITE_CONFIG.apiBaseUrl.replace(/\/+$/, '');
    const endpoints = [
      `${baseUrl}/cms/enqueries`,
      `${baseUrl}/public/enqueries`,
      `${baseUrl}/enqueries`,
      `https://cms.slnmplapp.com/api/cms/enqueries`,
      `https://cms.slnmplapp.com/api/public/enqueries`,
    ];

    let lastError = 'Failed to submit enquiry';

    for (const url of endpoints) {
      try {
        const res = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify(payload),
        });

        if (res.ok) {
          const json = await res.json();
          if (json && (json.status === 'success' || json.data)) {
            return {
              success: true,
              message: json.message || 'Your site visit request has been received.',
              data: json.data,
            };
          }
        } else {
          try {
            const errJson = await res.json();
            if (errJson?.message) lastError = errJson.message;
          } catch (_) {}
        }
      } catch (err: any) {
        lastError = err?.message || lastError;
      }
    }

    return { success: false, message: lastError };
  },
};



