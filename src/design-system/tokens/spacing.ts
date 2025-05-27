/**
 * Spacing Design Tokens for Moonset Dashboard
 * 
 * This file defines the comprehensive spacing system based on an 8px unit system:
 * - Base unit spacing scale (8, 16, 24, 32, 48, 64, 96px)
 * - Component-specific spacing patterns
 * - Layout spacing utilities
 * - Responsive spacing values
 */

// Base 8px Unit System
export const baseUnit = 8;

// Core Spacing Scale (8px increments)
export const spacing = {
  0: '0px',           // 0px
  1: '0.25rem',       // 4px  (0.5 × base)
  2: '0.5rem',        // 8px  (1 × base)
  3: '0.75rem',       // 12px (1.5 × base)
  4: '1rem',          // 16px (2 × base)
  5: '1.25rem',       // 20px (2.5 × base)
  6: '1.5rem',        // 24px (3 × base)
  7: '1.75rem',       // 28px (3.5 × base)
  8: '2rem',          // 32px (4 × base)
  10: '2.5rem',       // 40px (5 × base)
  12: '3rem',         // 48px (6 × base)
  14: '3.5rem',       // 56px (7 × base)
  16: '4rem',         // 64px (8 × base)
  20: '5rem',         // 80px (10 × base)
  24: '6rem',         // 96px (12 × base)
  28: '7rem',         // 112px (14 × base)
  32: '8rem',         // 128px (16 × base)
  36: '9rem',         // 144px (18 × base)
  40: '10rem',        // 160px (20 × base)
  44: '11rem',        // 176px (22 × base)
  48: '12rem',        // 192px (24 × base)
  52: '13rem',        // 208px (26 × base)
  56: '14rem',        // 224px (28 × base)
  60: '15rem',        // 240px (30 × base)
  64: '16rem',        // 256px (32 × base)
  72: '18rem',        // 288px (36 × base)
  80: '20rem',        // 320px (40 × base)
  96: '24rem'         // 384px (48 × base)
} as const;

// Component-Specific Spacing Patterns
export const componentSpacing = {
  // Button spacing
  button: {
    paddingX: {
      small: spacing[4],    // 16px
      medium: spacing[6],   // 24px
      large: spacing[8]     // 32px
    },
    paddingY: {
      small: spacing[2],    // 8px
      medium: spacing[3],   // 12px
      large: spacing[4]     // 16px
    },
    gap: spacing[2]         // 8px between icon and text
  },

  // Card spacing
  card: {
    padding: {
      small: spacing[4],    // 16px
      medium: spacing[6],   // 24px
      large: spacing[8]     // 32px
    },
    gap: spacing[4],        // 16px between elements
    headerGap: spacing[2]   // 8px between header elements
  },

  // Form spacing
  form: {
    fieldGap: spacing[4],       // 16px between form fields
    groupGap: spacing[6],       // 24px between form groups
    labelGap: spacing[2],       // 8px between label and input
    inputPadding: {
      x: spacing[3],            // 12px horizontal padding
      y: spacing[3]             // 12px vertical padding
    }
  },

  // Navigation spacing
  navigation: {
    itemPadding: {
      x: spacing[4],        // 16px
      y: spacing[3]         // 12px
    },
    itemGap: spacing[1],    // 4px between nav items
    sectionGap: spacing[6], // 24px between nav sections
    iconGap: spacing[3]     // 12px between icon and text
  },

  // Layout spacing
  layout: {
    sectionGap: spacing[12],     // 48px between sections
    contentGap: spacing[8],      // 32px between content blocks
    componentGap: spacing[6],    // 24px between components
    elementGap: spacing[4]       // 16px between elements
  },

  // List spacing
  list: {
    itemGap: spacing[2],    // 8px between list items
    itemPadding: spacing[3], // 12px padding for list items
    nestedIndent: spacing[6] // 24px indent for nested items
  },

  // Modal/Dialog spacing
  modal: {
    padding: spacing[6],        // 24px
    headerGap: spacing[4],      // 16px
    footerGap: spacing[6],      // 24px
    contentGap: spacing[4]      // 16px
  }
} as const;

// Layout Grid Spacing
export const gridSpacing = {
  columns: {
    gap: spacing[6],        // 24px gap between columns
    gutter: spacing[4]      // 16px gutter
  },
  container: {
    paddingX: {
      mobile: spacing[4],   // 16px on mobile
      tablet: spacing[6],   // 24px on tablet
      desktop: spacing[8]   // 32px on desktop
    }
  }
} as const;

// Responsive Spacing Modifiers
export const responsiveSpacing = {
  // Scales spacing based on screen size
  scale: {
    mobile: 0.75,    // 75% of base spacing on mobile
    tablet: 1,       // 100% of base spacing on tablet
    desktop: 1.25    // 125% of base spacing on desktop
  },

  // Responsive container max-widths with proper spacing
  container: {
    sm: '640px',     // Small screens
    md: '768px',     // Medium screens
    lg: '1024px',    // Large screens
    xl: '1280px',    // Extra large screens
    '2xl': '1536px'  // 2X large screens
  }
} as const;

// Margin and Padding Utilities
export const spacingUtilities = {
  // Auto margins for centering
  auto: 'auto',
  
  // Negative margins (useful for overlapping elements)
  negative: {
    1: '-0.25rem',    // -4px
    2: '-0.5rem',     // -8px
    3: '-0.75rem',    // -12px
    4: '-1rem',       // -16px
    6: '-1.5rem',     // -24px
    8: '-2rem',       // -32px
    12: '-3rem',      // -48px
    16: '-4rem'       // -64px
  },

  // Fractional spacing for fine-tuning
  fractional: {
    '1/2': '50%',
    '1/3': '33.333333%',
    '2/3': '66.666667%',
    '1/4': '25%',
    '3/4': '75%',
    full: '100%'
  }
} as const;

// Touch Target Spacing (for accessibility)
export const touchTargets = {
  minimum: spacing[10],      // 40px minimum touch target
  comfortable: spacing[12],  // 48px comfortable touch target
  large: spacing[14]         // 56px large touch target
} as const;

// Z-Index Scale for layering
export const zIndex = {
  hide: -1,
  base: 0,
  raised: 10,
  dropdown: 100,
  sticky: 200,
  overlay: 300,
  modal: 400,
  popover: 500,
  tooltip: 600,
  toast: 700,
  maximum: 999
} as const;

// CSS Custom Properties Generator for Spacing
export const generateSpacingVariables = () => {
  const spacingVars: Record<string, string> = {};
  
  // Generate spacing variables
  Object.entries(spacing).forEach(([key, value]) => {
    spacingVars[`--spacing-${key}`] = value;
  });

  // Add component spacing variables
  return {
    ...spacingVars,
    
    // Base unit
    '--spacing-base-unit': `${baseUnit}px`,
    
    // Component spacing
    '--spacing-button-padding-x-sm': componentSpacing.button.paddingX.small,
    '--spacing-button-padding-x-md': componentSpacing.button.paddingX.medium,
    '--spacing-button-padding-x-lg': componentSpacing.button.paddingX.large,
    '--spacing-button-padding-y-sm': componentSpacing.button.paddingY.small,
    '--spacing-button-padding-y-md': componentSpacing.button.paddingY.medium,
    '--spacing-button-padding-y-lg': componentSpacing.button.paddingY.large,
    
    '--spacing-card-padding-sm': componentSpacing.card.padding.small,
    '--spacing-card-padding-md': componentSpacing.card.padding.medium,
    '--spacing-card-padding-lg': componentSpacing.card.padding.large,
    
    '--spacing-form-field-gap': componentSpacing.form.fieldGap,
    '--spacing-form-group-gap': componentSpacing.form.groupGap,
    '--spacing-form-label-gap': componentSpacing.form.labelGap,
    
    '--spacing-nav-item-padding-x': componentSpacing.navigation.itemPadding.x,
    '--spacing-nav-item-padding-y': componentSpacing.navigation.itemPadding.y,
    '--spacing-nav-icon-gap': componentSpacing.navigation.iconGap,
    
    '--spacing-layout-section': componentSpacing.layout.sectionGap,
    '--spacing-layout-content': componentSpacing.layout.contentGap,
    '--spacing-layout-component': componentSpacing.layout.componentGap,
    '--spacing-layout-element': componentSpacing.layout.elementGap,
    
    // Grid spacing
    '--spacing-grid-gap': gridSpacing.columns.gap,
    '--spacing-grid-gutter': gridSpacing.columns.gutter,
    
    // Container spacing
    '--spacing-container-mobile': gridSpacing.container.paddingX.mobile,
    '--spacing-container-tablet': gridSpacing.container.paddingX.tablet,
    '--spacing-container-desktop': gridSpacing.container.paddingX.desktop,
    
    // Touch targets
    '--spacing-touch-minimum': touchTargets.minimum,
    '--spacing-touch-comfortable': touchTargets.comfortable,
    '--spacing-touch-large': touchTargets.large,
    
    // Z-index values
    '--z-index-hide': zIndex.hide,
    '--z-index-base': zIndex.base,
    '--z-index-raised': zIndex.raised,
    '--z-index-dropdown': zIndex.dropdown,
    '--z-index-sticky': zIndex.sticky,
    '--z-index-overlay': zIndex.overlay,
    '--z-index-modal': zIndex.modal,
    '--z-index-popover': zIndex.popover,
    '--z-index-tooltip': zIndex.tooltip,
    '--z-index-toast': zIndex.toast,
    '--z-index-maximum': zIndex.maximum
  };
};

// Utility function to get responsive spacing
export const getResponsiveSpacing = (
  baseSpacing: keyof typeof spacing,
  breakpoint: keyof typeof responsiveSpacing.scale = 'tablet'
) => {
  const baseValue = parseFloat(spacing[baseSpacing]);
  const scale = responsiveSpacing.scale[breakpoint];
  return `${baseValue * scale}rem`;
};

// Export type definitions
export type SpacingKey = keyof typeof spacing;
export type ComponentSpacingKey = keyof typeof componentSpacing;
export type ZIndexKey = keyof typeof zIndex;
export type ResponsiveBreakpoint = keyof typeof responsiveSpacing.scale; 