export interface TemplateTheme {
  id: string;
  name: string;
  category: string;
  badge: string;
  bgPrimary: string;
  bgSecondary: string;
  bgCard: string;
  textPrimary: string;
  textSecondary: string;
  accent: string;
  accentHover: string;
  accentLight: string;
  borderColor: string;
  heroGradient: string;
  isDark: boolean;
  fontHeading: string;
  fontBody: string;
}

export interface AmenityItem {
  id: number;
  title: string;
  icon: string;
  category: string;
  desc?: string;
  image?: string;
  iconImage?: string;
  color?: string;
  badge?: string;
}

export interface LocationItem {
  id: number;
  title: string;
  distance: string;
  travelTime: string;
  group: string;
  image: string;
  desc?: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface VentureData {
  id: string;
  ventureId?: number | string;
  title: string;
  tagline: string;
  location: string;
  address: string;
  reraNumber: string;
  heroBanner: string;
  welcomeEyebrow?: string;
  headline?: string;
  subheadline?: string;
  overviewText: string[];
  aboutImage: string;
  aboutEyebrow?: string;
  aboutTitle?: string;
  aboutQuote?: string;
  aboutQuoteAuthor?: string;
  aboutChecklist?: string[];
  totalPlots: string;
  roadWidth: string;
  stats: { value: string; label: string; sub?: string }[];
  specs?: { value: string; label: string; sub?: string }[];
  whyChoosePoints: {
    icon: string;
    title: string;
    description: string;
    tag?: string;
    points?: string[];
  }[];
  whyChooseEyebrow?: string;
  whyChooseTitle?: string;
  whyChooseSubtitle?: string;
  amenities: AmenityItem[];
  locations: LocationItem[];
  brochureMockup: string;
  brochureUrl: string;
  brochureTitle?: string;
  brochureDesc?: string;
  brochureFileSize?: string;
  brochureFileName?: string;
  mapEmbedImage: string;
  vimeoId?: string;
  vimeoUrl?: string;
  droneVideoTitle?: string;
  masterPlanImage?: string;
  masterPlanTitle?: string;
  masterPlanEyebrow?: string;
  masterPlanTotalPlots?: string;
  masterPlanLegends?: {
    label: string;
    dimensions: string;
    availability: string;
    color: string;
  }[];
  faqs: FaqItem[];
  contact: {
    phone: string;
    email: string;
    branchAddress: string;
    whatsapp?: string;
    visitingHours?: string;
    loungeTitle?: string;
    chauffeur?: boolean;
    googleMapsEmbedUrl?: string;
    directionsUrl?: string;
  };
  metaTitle?: string;
  metaDescription?: string;
  seo?: any;
  rawSections?: any;
  chatbotConnectString?: string;
  voicebotConnectString?: string;
  chatbotAgentId?: string;
  voicebotAgentId?: string;
  colorPalette?: {
    presetId: string;
    primary: string;
    accent: string;
    accentHover: string;
    background: string;
    cardBg: string;
    textPrimary: string;
    borderColor: string;
  };
}
