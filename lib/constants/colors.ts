/**
 * WeCredit Design System - Color Palette
 *
 * Single source of truth for all brand color values. Mirror changes in
 * app/globals.css (@theme) and tailwind.config.ts.
 *
 * @module constants/colors
 * @see {@link /docs/design-system/colors.md} for complete usage guidelines
 */

/** Brand purple scale — derived from primary #6859F2 */
const BRAND_SCALE = {
  50: '#F4F3FE',
  100: '#E8E6FD',
  200: '#D1CCFB',
  300: '#B4ADF8',
  400: '#9288F5',
  500: '#6859F2',
  600: '#5748E0',
  700: '#4839C9',
  800: '#3A2DA3',
  900: '#2E247F',
} as const;

/**
 * Primary brand colors and gradients
 */
export const COLORS = {
  brand: {
    /** Main CTA, links, key interactive elements (same as 500) */
    primary: BRAND_SCALE[500],
    ...BRAND_SCALE,
    lightGradient: {
      from: '#E8E6FD',
      to: BRAND_SCALE[500],
    },
    lightestGradient: {
      from: '#F0EEFF',
      to: '#FAFCFF',
    },
    /** Offer card accent (Figma: #6945E9 → #CC4CA6) */
    offerAccentGradient: {
      from: '#6945E9',
      to: '#CC4CA6',
    },
    /** Soft tint for offer card backgrounds (same hue, much lighter) */
    offerAccentGradientLight: {
      from: '#F4F0FC',
      mid: '#FDF2F9',
      to: '#FFFFFF',
    },
  },

  /**
   * Grayscale colors - For text, borders, and neutral UI elements
   */
  gray: {
    900: '#121111',
    700: '#303030',
    500: '#7F7F7F',
    100: '#D9D9D9',
    white: '#FFFFFF',
  },
} as const;

export type BrandColors = typeof COLORS.brand;
export type GrayColors = typeof COLORS.gray;
export type ColorPalette = typeof COLORS;
export type GradientConfig = {
  from: string;
  to: string;
};

/**
 * Legacy WeCredit brand colors — aliases of COLORS.brand scale.
 * @deprecated Use COLORS.brand or brand-* Tailwind utilities for new components.
 */
export const LEGACY_WC_COLORS = {
  blue: {
    50: COLORS.brand[50],
    100: COLORS.brand[100],
    200: COLORS.brand[200],
    300: COLORS.brand[300],
    400: COLORS.brand[400],
    500: COLORS.brand[500],
    600: COLORS.brand[600],
    700: COLORS.brand[700],
    800: COLORS.brand[800],
    900: COLORS.brand[900],
    heading: COLORS.brand[600],
  },
  dark: COLORS.brand[900],
  accent: COLORS.brand[400],
  green: '#22C55E',
} as const;
