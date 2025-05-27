/**
 * Design System Tokens Index
 * 
 * This file exports all design tokens and provides utilities for:
 * - Generating complete CSS custom properties
 * - Theme management
 * - Token access utilities
 */

// Export all token systems
export * from './colors';
export * from './typography';
export * from './spacing';
export * from './shadows';

// Import specific generators and utilities
import { generateCSSVariables, type ColorTheme } from './colors';
import { generateTypographyVariables } from './typography';
import { generateSpacingVariables } from './spacing';
import { generateShadowVariables, type ShadowTheme } from './shadows';

/**
 * Generate complete CSS custom properties for a given theme
 */
export const generateAllDesignTokens = (theme: ColorTheme = 'light') => {
  return {
    ...generateCSSVariables(theme),
    ...generateTypographyVariables(),
    ...generateSpacingVariables(),
    ...generateShadowVariables(theme as ShadowTheme)
  };
};

/**
 * Theme configuration object
 */
export const themeConfig = {
  light: generateAllDesignTokens('light'),
  dark: generateAllDesignTokens('dark')
} as const;

/**
 * Convert CSS variables object to CSS string
 */
export const cssVariablesToString = (variables: Record<string, string | number>) => {
  return Object.entries(variables)
    .map(([key, value]) => `  ${key}: ${value};`)
    .join('\n');
};

/**
 * Generate CSS string for a specific theme
 */
export const generateThemeCSS = (theme: ColorTheme = 'light') => {
  const variables = generateAllDesignTokens(theme);
  return `:root[data-theme="${theme}"] {\n${cssVariablesToString(variables)}\n}`;
};

/**
 * Generate CSS string for all themes
 */
export const generateAllThemesCSS = () => {
  return [
    generateThemeCSS('light'),
    generateThemeCSS('dark')
  ].join('\n\n');
};

/**
 * Breakpoint utilities
 */
export const breakpoints = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px'
} as const;

/**
 * Media query utilities
 */
export const mediaQueries = {
  sm: `@media (min-width: ${breakpoints.sm})`,
  md: `@media (min-width: ${breakpoints.md})`,
  lg: `@media (min-width: ${breakpoints.lg})`,
  xl: `@media (min-width: ${breakpoints.xl})`,
  '2xl': `@media (min-width: ${breakpoints['2xl']})`,
  
  // Utility queries
  mobile: '@media (max-width: 767px)',
  tablet: '@media (min-width: 768px) and (max-width: 1023px)',
  desktop: '@media (min-width: 1024px)',
  
  // Preference queries
  reducedMotion: '@media (prefers-reduced-motion: reduce)',
  darkMode: '@media (prefers-color-scheme: dark)',
  lightMode: '@media (prefers-color-scheme: light)',
  
  // Interaction queries
  hover: '@media (hover: hover)',
  noHover: '@media (hover: none)',
  pointer: '@media (pointer: fine)',
  touch: '@media (pointer: coarse)'
} as const;

/**
 * Animation duration utilities
 */
export const animationDurations = {
  fast: '150ms',
  normal: '250ms',
  slow: '350ms',
  slower: '500ms'
} as const;

/**
 * Animation easing utilities
 */
export const animationEasing = {
  linear: 'linear',
  ease: 'ease',
  easeIn: 'ease-in',
  easeOut: 'ease-out',
  easeInOut: 'ease-in-out',
  
  // Custom easing curves
  smooth: 'cubic-bezier(0.4, 0, 0.2, 1)',
  snappy: 'cubic-bezier(0.4, 0, 0.6, 1)',
  bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
  spring: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)'
} as const;

/**
 * Border radius utilities
 */
export const borderRadius = {
  none: '0px',
  sm: '0.25rem',    // 4px
  md: '0.375rem',   // 6px
  lg: '0.5rem',     // 8px
  xl: '0.75rem',    // 12px
  '2xl': '1rem',    // 16px
  '3xl': '1.5rem',  // 24px
  full: '9999px'
} as const;

/**
 * Design token validation utilities
 */
export const validateTheme = (theme: unknown): theme is ColorTheme => {
  return theme === 'light' || theme === 'dark';
};

/**
 * Get design token value with fallback
 */
export const getTokenValue = (
  tokenPath: string,
  fallback: string = '0',
  theme: ColorTheme = 'light'
): string => {
  try {
    const tokens = generateAllDesignTokens(theme);
    return tokens[tokenPath as keyof typeof tokens]?.toString() || fallback;
  } catch {
    return fallback;
  }
};

// Export type definitions
export type BreakpointKey = keyof typeof breakpoints;
export type MediaQueryKey = keyof typeof mediaQueries;
export type AnimationDuration = keyof typeof animationDurations;
export type AnimationEasing = keyof typeof animationEasing;
export type BorderRadiusKey = keyof typeof borderRadius; 