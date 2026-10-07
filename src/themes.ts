import { TemplateTheme } from './types';

export const TEMPLATES: TemplateTheme[] = [
  {
    id: 'highlands-flagship',
    name: 'Highlands Flagship (Alabaster, Gold & Royal Navy)',
    category: 'Daylight Architectural',
    badge: 'Flagship Luxury Preset',
    isDark: false,
    bgPrimary: '#FFFFFF',
    bgSecondary: '#FAF8F5',    // Warm Alabaster / Limestone
    bgCard: '#FFFFFF',
    textPrimary: '#0B1B3D',    // Imperial Royal Navy
    textSecondary: '#556477',  // Refined Architectural Slate
    accent: '#C5A880',         // Champagne Gold
    accentHover: '#AC8E64',
    accentLight: '#FAF5ED',
    borderColor: '#EAE4D9',    // Hairline warm stone divider
    heroGradient: 'linear-gradient(180deg, #FFFFFF 0%, #FBF9F5 100%)',
    fontHeading: "'Playfair Display', serif",
    fontBody: "'Plus Jakarta Sans', sans-serif",
  },
];
