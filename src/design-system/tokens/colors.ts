/**
 * Color Design Tokens for Moonset Dashboard
 * 
 * This file defines the comprehensive color system including:
 * - Primary and secondary color palettes
 * - Semantic color assignments
 * - Theme-aware color mappings
 * - Glass morphism color values
 */

// Primary Color Palette - Purple (#7c3aed)
export const primaryColors = {
  50: '#f3f0ff',
  100: '#e9e5ff', 
  200: '#d6ccff',
  300: '#b8a3ff',
  400: '#9670ff',
  500: '#7c3aed', // Primary brand color
  600: '#6d28d9',
  700: '#5b21b6',
  800: '#4c1d95',
  900: '#3c1a78',
  950: '#2e1065'
} as const;

// Secondary Color Palette - Cyan (#06b6d4)
export const secondaryColors = {
  50: '#f0fdff',
  100: '#ccfbff',
  200: '#99f6ff',
  300: '#4ceaff',
  400: '#06d6f7',
  500: '#06b6d4', // Secondary brand color
  600: '#0891b2',
  700: '#0e7490',
  800: '#155e75',
  900: '#164e63',
  950: '#0a2e39'
} as const;

// Neutral Color Palette
export const neutralColors = {
  0: '#ffffff',
  50: '#f8fafc',
  100: '#f1f5f9',
  200: '#e2e8f0',
  300: '#cbd5e1',
  400: '#94a3b8',
  500: '#64748b',
  600: '#475569',
  700: '#334155',
  800: '#1e293b',
  900: '#0f172a',
  950: '#020617',
  1000: '#000000'
} as const;

// Success Color Palette
export const successColors = {
  50: '#f0fdf4',
  100: '#dcfce7',
  200: '#bbf7d0',
  300: '#86efac',
  400: '#4ade80',
  500: '#22c55e',
  600: '#16a34a',
  700: '#15803d',
  800: '#166534',
  900: '#14532d'
} as const;

// Warning Color Palette
export const warningColors = {
  50: '#fffbeb',
  100: '#fef3c7',
  200: '#fde68a',
  300: '#fcd34d',
  400: '#fbbf24',
  500: '#f59e0b',
  600: '#d97706',
  700: '#b45309',
  800: '#92400e',
  900: '#78350f'
} as const;

// Error Color Palette
export const errorColors = {
  50: '#fef2f2',
  100: '#fee2e2',
  200: '#fecaca',
  300: '#fca5a5',
  400: '#f87171',
  500: '#ef4444',
  600: '#dc2626',
  700: '#b91c1c',
  800: '#991b1b',
  900: '#7f1d1d'
} as const;

// Glass Morphism Colors
export const glassColors = {
  light: {
    background: 'rgba(255, 255, 255, 0.9)',
    backgroundHover: 'rgba(255, 255, 255, 0.95)',
    border: 'rgba(255, 255, 255, 0.2)',
    borderHover: 'rgba(255, 255, 255, 0.3)',
    shadow: 'rgba(0, 0, 0, 0.1)'
  },
  dark: {
    background: 'rgba(15, 23, 42, 0.8)',
    backgroundHover: 'rgba(15, 23, 42, 0.9)',
    border: 'rgba(255, 255, 255, 0.1)',
    borderHover: 'rgba(255, 255, 255, 0.2)', 
    shadow: 'rgba(0, 0, 0, 0.3)'
  }
} as const;

// Semantic Color Assignments for Light Theme
export const lightThemeColors = {
  // Background colors
  background: {
    primary: neutralColors[0],
    secondary: neutralColors[50],
    tertiary: neutralColors[100],
    inverse: neutralColors[900]
  },
  
  // Text colors
  text: {
    primary: neutralColors[900],
    secondary: neutralColors[700],
    tertiary: neutralColors[500],
    inverse: neutralColors[0],
    disabled: neutralColors[400]
  },
  
  // Border colors
  border: {
    primary: neutralColors[200],
    secondary: neutralColors[300],
    focus: primaryColors[500],
    error: errorColors[500]
  },
  
  // Interactive colors
  interactive: {
    primary: primaryColors[500],
    primaryHover: primaryColors[600],
    primaryActive: primaryColors[700],
    secondary: secondaryColors[500],
    secondaryHover: secondaryColors[600],
    secondaryActive: secondaryColors[700]
  },
  
  // Status colors
  status: {
    success: successColors[500],
    warning: warningColors[500],
    error: errorColors[500],
    info: secondaryColors[500]
  },
  
  // Glass morphism
  glass: glassColors.light
} as const;

// Semantic Color Assignments for Dark Theme  
export const darkThemeColors = {
  // Background colors
  background: {
    primary: neutralColors[900],
    secondary: neutralColors[800],
    tertiary: neutralColors[700],
    inverse: neutralColors[0]
  },
  
  // Text colors
  text: {
    primary: neutralColors[0],
    secondary: neutralColors[200],
    tertiary: neutralColors[400],
    inverse: neutralColors[900],
    disabled: neutralColors[600]
  },
  
  // Border colors
  border: {
    primary: neutralColors[700],
    secondary: neutralColors[600],
    focus: primaryColors[400],
    error: errorColors[400]
  },
  
  // Interactive colors
  interactive: {
    primary: primaryColors[400],
    primaryHover: primaryColors[300],
    primaryActive: primaryColors[200],
    secondary: secondaryColors[400],
    secondaryHover: secondaryColors[300],
    secondaryActive: secondaryColors[200]
  },
  
  // Status colors
  status: {
    success: successColors[400],
    warning: warningColors[400],
    error: errorColors[400],
    info: secondaryColors[400]
  },
  
  // Glass morphism
  glass: glassColors.dark
} as const;

// CSS Custom Properties Generator
export const generateCSSVariables = (theme: 'light' | 'dark') => {
  const colors = theme === 'light' ? lightThemeColors : darkThemeColors;
  
  return {
    // Background variables
    '--color-bg-primary': colors.background.primary,
    '--color-bg-secondary': colors.background.secondary,
    '--color-bg-tertiary': colors.background.tertiary,
    '--color-bg-inverse': colors.background.inverse,
    
    // Text variables
    '--color-text-primary': colors.text.primary,
    '--color-text-secondary': colors.text.secondary,
    '--color-text-tertiary': colors.text.tertiary,
    '--color-text-inverse': colors.text.inverse,
    '--color-text-disabled': colors.text.disabled,
    
    // Border variables
    '--color-border-primary': colors.border.primary,
    '--color-border-secondary': colors.border.secondary,
    '--color-border-focus': colors.border.focus,
    '--color-border-error': colors.border.error,
    
    // Interactive variables
    '--color-interactive-primary': colors.interactive.primary,
    '--color-interactive-primary-hover': colors.interactive.primaryHover,
    '--color-interactive-primary-active': colors.interactive.primaryActive,
    '--color-interactive-secondary': colors.interactive.secondary,
    '--color-interactive-secondary-hover': colors.interactive.secondaryHover,
    '--color-interactive-secondary-active': colors.interactive.secondaryActive,
    
    // Status variables
    '--color-status-success': colors.status.success,
    '--color-status-warning': colors.status.warning,
    '--color-status-error': colors.status.error,
    '--color-status-info': colors.status.info,
    
    // Glass variables
    '--color-glass-bg': colors.glass.background,
    '--color-glass-bg-hover': colors.glass.backgroundHover,
    '--color-glass-border': colors.glass.border,
    '--color-glass-border-hover': colors.glass.borderHover,
    '--color-glass-shadow': colors.glass.shadow,
    
    // Brand color variables
    '--color-primary-50': primaryColors[50],
    '--color-primary-500': primaryColors[500],
    '--color-primary-600': primaryColors[600],
    '--color-secondary-50': secondaryColors[50],
    '--color-secondary-500': secondaryColors[500],
    '--color-secondary-600': secondaryColors[600]
  };
};

// Export type definitions
export type ColorTheme = 'light' | 'dark';
export type ColorPalette = typeof lightThemeColors;
export type PrimaryColor = keyof typeof primaryColors;
export type SecondaryColor = keyof typeof secondaryColors;
export type NeutralColor = keyof typeof neutralColors; 