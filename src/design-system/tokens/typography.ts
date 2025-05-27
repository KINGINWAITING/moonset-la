/**
 * Typography Design Tokens for Moonset Dashboard
 * 
 * This file defines the comprehensive typography system including:
 * - Font families and fallbacks
 * - Professional type scale (12px-48px)
 * - Line height ratios for readability
 * - Font weights and letter spacing
 * - Responsive typography utilities
 */

// Font Family Definitions
export const fontFamilies = {
  primary: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
  mono: ['JetBrains Mono', 'Fira Code', 'Monaco', 'Consolas', 'Courier New', 'monospace'],
  display: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif']
} as const;

// Font Weight Scale
export const fontWeights = {
  light: 300,
  normal: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
  extrabold: 800
} as const;

// Professional Type Scale (12px-48px)
export const fontSizes = {
  xs: '0.75rem',    // 12px
  sm: '0.875rem',   // 14px  
  base: '1rem',     // 16px
  lg: '1.125rem',   // 18px
  xl: '1.25rem',    // 20px
  '2xl': '1.5rem',  // 24px
  '3xl': '1.875rem', // 30px
  '4xl': '2rem',    // 32px
  '5xl': '2.25rem', // 36px
  '6xl': '3rem',    // 48px
} as const;

// Line Height Ratios
export const lineHeights = {
  none: '1',
  tight: '1.2',     // For headers
  snug: '1.25',     // For large text
  normal: '1.5',    // For body text
  relaxed: '1.625', // For readable content
  loose: '2'        // For very spaced content
} as const;

// Letter Spacing Values
export const letterSpacing = {
  tighter: '-0.05em',
  tight: '-0.025em',
  normal: '0em',
  wide: '0.025em',
  wider: '0.05em',
  widest: '0.1em'
} as const;

// Typography Variants
export const typographyVariants = {
  // Display Typography (Headlines, Hero Text)
  display: {
    '6xl': {
      fontSize: fontSizes['6xl'],
      lineHeight: lineHeights.tight,
      fontWeight: fontWeights.bold,
      letterSpacing: letterSpacing.tighter,
      fontFamily: fontFamilies.display.join(', ')
    },
    '5xl': {
      fontSize: fontSizes['5xl'],
      lineHeight: lineHeights.tight,
      fontWeight: fontWeights.bold,
      letterSpacing: letterSpacing.tighter,
      fontFamily: fontFamilies.display.join(', ')
    },
    '4xl': {
      fontSize: fontSizes['4xl'],
      lineHeight: lineHeights.tight,
      fontWeight: fontWeights.semibold,
      letterSpacing: letterSpacing.tight,
      fontFamily: fontFamilies.display.join(', ')
    },
    '3xl': {
      fontSize: fontSizes['3xl'],
      lineHeight: lineHeights.snug,
      fontWeight: fontWeights.semibold,
      letterSpacing: letterSpacing.tight,
      fontFamily: fontFamilies.display.join(', ')
    }
  },

  // Heading Typography
  heading: {
    '2xl': {
      fontSize: fontSizes['2xl'],
      lineHeight: lineHeights.tight,
      fontWeight: fontWeights.semibold,
      letterSpacing: letterSpacing.normal,
      fontFamily: fontFamilies.primary.join(', ')
    },
    xl: {
      fontSize: fontSizes.xl,
      lineHeight: lineHeights.snug,
      fontWeight: fontWeights.semibold,
      letterSpacing: letterSpacing.normal,
      fontFamily: fontFamilies.primary.join(', ')
    },
    lg: {
      fontSize: fontSizes.lg,
      lineHeight: lineHeights.snug,
      fontWeight: fontWeights.medium,
      letterSpacing: letterSpacing.normal,
      fontFamily: fontFamilies.primary.join(', ')
    }
  },

  // Body Typography
  body: {
    lg: {
      fontSize: fontSizes.lg,
      lineHeight: lineHeights.normal,
      fontWeight: fontWeights.normal,
      letterSpacing: letterSpacing.normal,
      fontFamily: fontFamilies.primary.join(', ')
    },
    base: {
      fontSize: fontSizes.base,
      lineHeight: lineHeights.normal,
      fontWeight: fontWeights.normal,
      letterSpacing: letterSpacing.normal,
      fontFamily: fontFamilies.primary.join(', ')
    },
    sm: {
      fontSize: fontSizes.sm,
      lineHeight: lineHeights.normal,
      fontWeight: fontWeights.normal,
      letterSpacing: letterSpacing.normal,
      fontFamily: fontFamilies.primary.join(', ')
    },
    xs: {
      fontSize: fontSizes.xs,
      lineHeight: lineHeights.normal,
      fontWeight: fontWeights.normal,
      letterSpacing: letterSpacing.wide,
      fontFamily: fontFamilies.primary.join(', ')
    }
  },

  // UI Typography (Buttons, Labels, etc.)
  ui: {
    button: {
      fontSize: fontSizes.sm,
      lineHeight: lineHeights.none,
      fontWeight: fontWeights.medium,
      letterSpacing: letterSpacing.wide,
      fontFamily: fontFamilies.primary.join(', ')
    },
    label: {
      fontSize: fontSizes.sm,
      lineHeight: lineHeights.tight,
      fontWeight: fontWeights.medium,
      letterSpacing: letterSpacing.normal,
      fontFamily: fontFamilies.primary.join(', ')
    },
    caption: {
      fontSize: fontSizes.xs,
      lineHeight: lineHeights.normal,
      fontWeight: fontWeights.normal,
      letterSpacing: letterSpacing.wide,
      fontFamily: fontFamilies.primary.join(', ')
    },
    overline: {
      fontSize: fontSizes.xs,
      lineHeight: lineHeights.tight,
      fontWeight: fontWeights.medium,
      letterSpacing: letterSpacing.widest,
      fontFamily: fontFamilies.primary.join(', '),
      textTransform: 'uppercase' as const
    }
  },

  // Code Typography
  code: {
    inline: {
      fontSize: fontSizes.sm,
      lineHeight: lineHeights.normal,
      fontWeight: fontWeights.normal,
      letterSpacing: letterSpacing.normal,
      fontFamily: fontFamilies.mono.join(', ')
    },
    block: {
      fontSize: fontSizes.sm,
      lineHeight: lineHeights.relaxed,
      fontWeight: fontWeights.normal,
      letterSpacing: letterSpacing.normal,
      fontFamily: fontFamilies.mono.join(', ')
    }
  }
} as const;

// Responsive Typography Utilities
export const responsiveTypography = {
  // Scales down on mobile, scales up on larger screens
  responsive: {
    display6xl: {
      fontSize: fontSizes['4xl'],
      '@media (min-width: 768px)': {
        fontSize: fontSizes['5xl']
      },
      '@media (min-width: 1024px)': {
        fontSize: fontSizes['6xl']
      }
    },
    display5xl: {
      fontSize: fontSizes['3xl'],
      '@media (min-width: 768px)': {
        fontSize: fontSizes['4xl']
      },
      '@media (min-width: 1024px)': {
        fontSize: fontSizes['5xl']
      }
    },
    display4xl: {
      fontSize: fontSizes['2xl'],
      '@media (min-width: 768px)': {
        fontSize: fontSizes['3xl']
      },
      '@media (min-width: 1024px)': {
        fontSize: fontSizes['4xl']
      }
    }
  }
} as const;

// CSS Custom Properties Generator for Typography
export const generateTypographyVariables = () => {
  return {
    // Font families
    '--font-family-primary': fontFamilies.primary.join(', '),
    '--font-family-mono': fontFamilies.mono.join(', '),
    '--font-family-display': fontFamilies.display.join(', '),
    
    // Font sizes
    '--font-size-xs': fontSizes.xs,
    '--font-size-sm': fontSizes.sm,
    '--font-size-base': fontSizes.base,
    '--font-size-lg': fontSizes.lg,
    '--font-size-xl': fontSizes.xl,
    '--font-size-2xl': fontSizes['2xl'],
    '--font-size-3xl': fontSizes['3xl'],
    '--font-size-4xl': fontSizes['4xl'],
    '--font-size-5xl': fontSizes['5xl'],
    '--font-size-6xl': fontSizes['6xl'],
    
    // Font weights
    '--font-weight-light': fontWeights.light,
    '--font-weight-normal': fontWeights.normal,
    '--font-weight-medium': fontWeights.medium,
    '--font-weight-semibold': fontWeights.semibold,
    '--font-weight-bold': fontWeights.bold,
    '--font-weight-extrabold': fontWeights.extrabold,
    
    // Line heights
    '--line-height-none': lineHeights.none,
    '--line-height-tight': lineHeights.tight,
    '--line-height-snug': lineHeights.snug,
    '--line-height-normal': lineHeights.normal,
    '--line-height-relaxed': lineHeights.relaxed,
    '--line-height-loose': lineHeights.loose,
    
    // Letter spacing
    '--letter-spacing-tighter': letterSpacing.tighter,
    '--letter-spacing-tight': letterSpacing.tight,
    '--letter-spacing-normal': letterSpacing.normal,
    '--letter-spacing-wide': letterSpacing.wide,
    '--letter-spacing-wider': letterSpacing.wider,
    '--letter-spacing-widest': letterSpacing.widest
  };
};

// Utility function to get typography styles
export const getTypographyStyles = (
  variant: keyof typeof typographyVariants,
  size: string
) => {
  const variantStyles = typographyVariants[variant];
  if (variantStyles && size in variantStyles) {
    return variantStyles[size as keyof typeof variantStyles];
  }
  return typographyVariants.body.base; // Fallback
};

// Export type definitions
export type FontFamily = keyof typeof fontFamilies;
export type FontWeight = keyof typeof fontWeights;
export type FontSize = keyof typeof fontSizes;
export type LineHeight = keyof typeof lineHeights;
export type LetterSpacing = keyof typeof letterSpacing;
export type TypographyVariant = keyof typeof typographyVariants;
export type TypographyStyle = typeof typographyVariants.body.base; 