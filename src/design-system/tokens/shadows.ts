/**
 * Shadow Design Tokens for Moonset Dashboard
 * 
 * This file defines the comprehensive shadow system including:
 * - Elevation-based shadow scale
 * - Glass morphism shadow effects
 * - Theme-aware shadow values
 * - Component-specific shadow patterns
 * - Interactive shadow states
 */

// Base Shadow Colors
export const shadowColors = {
  light: {
    primary: 'rgba(0, 0, 0, 0.1)',
    secondary: 'rgba(0, 0, 0, 0.06)',
    accent: 'rgba(124, 58, 237, 0.15)', // Primary purple with opacity
    glass: 'rgba(0, 0, 0, 0.08)'
  },
  dark: {
    primary: 'rgba(0, 0, 0, 0.3)',
    secondary: 'rgba(0, 0, 0, 0.2)',
    accent: 'rgba(124, 58, 237, 0.25)', // Primary purple with opacity
    glass: 'rgba(0, 0, 0, 0.4)'
  }
} as const;

// Elevation Shadow Scale (Material Design inspired)
export const elevationShadows = {
  light: {
    none: 'none',
    xs: `0 1px 2px 0 ${shadowColors.light.primary}`,
    sm: `0 1px 3px 0 ${shadowColors.light.primary}, 0 1px 2px -1px ${shadowColors.light.secondary}`,
    md: `0 4px 6px -1px ${shadowColors.light.primary}, 0 2px 4px -2px ${shadowColors.light.secondary}`,
    lg: `0 10px 15px -3px ${shadowColors.light.primary}, 0 4px 6px -4px ${shadowColors.light.secondary}`,
    xl: `0 20px 25px -5px ${shadowColors.light.primary}, 0 8px 10px -6px ${shadowColors.light.secondary}`,
    '2xl': `0 25px 50px -12px ${shadowColors.light.primary}`,
    inner: `inset 0 2px 4px 0 ${shadowColors.light.primary}`
  },
  dark: {
    none: 'none',
    xs: `0 1px 2px 0 ${shadowColors.dark.primary}`,
    sm: `0 1px 3px 0 ${shadowColors.dark.primary}, 0 1px 2px -1px ${shadowColors.dark.secondary}`,
    md: `0 4px 6px -1px ${shadowColors.dark.primary}, 0 2px 4px -2px ${shadowColors.dark.secondary}`,
    lg: `0 10px 15px -3px ${shadowColors.dark.primary}, 0 4px 6px -4px ${shadowColors.dark.secondary}`,
    xl: `0 20px 25px -5px ${shadowColors.dark.primary}, 0 8px 10px -6px ${shadowColors.dark.secondary}`,
    '2xl': `0 25px 50px -12px ${shadowColors.dark.primary}`,
    inner: `inset 0 2px 4px 0 ${shadowColors.dark.primary}`
  }
} as const;

// Glass Morphism Shadow Effects
export const glassShadows = {
  light: {
    subtle: `0 4px 6px -1px ${shadowColors.light.glass}, 0 2px 4px -2px ${shadowColors.light.glass}`,
    medium: `0 8px 12px -2px ${shadowColors.light.glass}, 0 4px 6px -2px ${shadowColors.light.glass}`,
    strong: `0 12px 20px -4px ${shadowColors.light.glass}, 0 6px 8px -2px ${shadowColors.light.glass}`,
    glow: `0 0 20px ${shadowColors.light.accent}, 0 4px 6px -1px ${shadowColors.light.glass}`,
    innerGlow: `inset 0 1px 0 rgba(255, 255, 255, 0.1), 0 4px 6px -1px ${shadowColors.light.glass}`
  },
  dark: {
    subtle: `0 4px 6px -1px ${shadowColors.dark.glass}, 0 2px 4px -2px ${shadowColors.dark.glass}`,
    medium: `0 8px 12px -2px ${shadowColors.dark.glass}, 0 4px 6px -2px ${shadowColors.dark.glass}`,
    strong: `0 12px 20px -4px ${shadowColors.dark.glass}, 0 6px 8px -2px ${shadowColors.dark.glass}`,
    glow: `0 0 20px ${shadowColors.dark.accent}, 0 4px 6px -1px ${shadowColors.dark.glass}`,
    innerGlow: `inset 0 1px 0 rgba(255, 255, 255, 0.05), 0 4px 6px -1px ${shadowColors.dark.glass}`
  }
} as const;

// Component-Specific Shadow Patterns
export const componentShadows = {
  light: {
    // Button shadows
    button: {
      default: elevationShadows.light.sm,
      hover: elevationShadows.light.md,
      active: elevationShadows.light.xs,
      focus: `0 0 0 3px ${shadowColors.light.accent}, ${elevationShadows.light.sm}`
    },

    // Card shadows
    card: {
      default: elevationShadows.light.sm,
      hover: elevationShadows.light.md,
      interactive: elevationShadows.light.lg
    },

    // Modal shadows
    modal: {
      backdrop: `0 0 0 1px rgba(0, 0, 0, 0.05), ${elevationShadows.light['2xl']}`,
      content: elevationShadows.light.xl
    },

    // Dropdown shadows
    dropdown: {
      default: elevationShadows.light.lg,
      large: elevationShadows.light.xl
    },

    // Input shadows
    input: {
      default: elevationShadows.light.xs,
      focus: `0 0 0 3px ${shadowColors.light.accent}, ${elevationShadows.light.xs}`,
      error: `0 0 0 3px rgba(239, 68, 68, 0.15), ${elevationShadows.light.xs}`
    },

    // Floating action button
    fab: {
      default: elevationShadows.light.lg,
      hover: elevationShadows.light.xl,
      active: elevationShadows.light.md
    },

    // Toast/notification shadows
    toast: {
      default: elevationShadows.light.lg,
      success: `0 0 20px rgba(34, 197, 94, 0.15), ${elevationShadows.light.lg}`,
      error: `0 0 20px rgba(239, 68, 68, 0.15), ${elevationShadows.light.lg}`,
      warning: `0 0 20px rgba(245, 158, 11, 0.15), ${elevationShadows.light.lg}`
    }
  },

  dark: {
    // Button shadows
    button: {
      default: elevationShadows.dark.sm,
      hover: elevationShadows.dark.md,
      active: elevationShadows.dark.xs,
      focus: `0 0 0 3px ${shadowColors.dark.accent}, ${elevationShadows.dark.sm}`
    },

    // Card shadows
    card: {
      default: elevationShadows.dark.sm,
      hover: elevationShadows.dark.md,
      interactive: elevationShadows.dark.lg
    },

    // Modal shadows
    modal: {
      backdrop: `0 0 0 1px rgba(255, 255, 255, 0.05), ${elevationShadows.dark['2xl']}`,
      content: elevationShadows.dark.xl
    },

    // Dropdown shadows
    dropdown: {
      default: elevationShadows.dark.lg,
      large: elevationShadows.dark.xl
    },

    // Input shadows
    input: {
      default: elevationShadows.dark.xs,
      focus: `0 0 0 3px ${shadowColors.dark.accent}, ${elevationShadows.dark.xs}`,
      error: `0 0 0 3px rgba(239, 68, 68, 0.25), ${elevationShadows.dark.xs}`
    },

    // Floating action button
    fab: {
      default: elevationShadows.dark.lg,
      hover: elevationShadows.dark.xl,
      active: elevationShadows.dark.md
    },

    // Toast/notification shadows
    toast: {
      default: elevationShadows.dark.lg,
      success: `0 0 20px rgba(34, 197, 94, 0.25), ${elevationShadows.dark.lg}`,
      error: `0 0 20px rgba(239, 68, 68, 0.25), ${elevationShadows.dark.lg}`,
      warning: `0 0 20px rgba(245, 158, 11, 0.25), ${elevationShadows.dark.lg}`
    }
  }
} as const;

// Text Shadow Utilities
export const textShadows = {
  light: {
    none: 'none',
    sm: `0 1px 2px ${shadowColors.light.primary}`,
    md: `0 2px 4px ${shadowColors.light.primary}`,
    lg: `0 4px 8px ${shadowColors.light.primary}`,
    glow: `0 0 10px ${shadowColors.light.accent}`
  },
  dark: {
    none: 'none',
    sm: `0 1px 2px ${shadowColors.dark.primary}`,
    md: `0 2px 4px ${shadowColors.dark.primary}`,
    lg: `0 4px 8px ${shadowColors.dark.primary}`,
    glow: `0 0 10px ${shadowColors.dark.accent}`
  }
} as const;

// CSS Custom Properties Generator for Shadows
export const generateShadowVariables = (theme: 'light' | 'dark') => {
  const elevations = elevationShadows[theme];
  const glass = glassShadows[theme];
  const components = componentShadows[theme];
  const text = textShadows[theme];

  return {
    // Elevation shadows
    '--shadow-none': elevations.none,
    '--shadow-xs': elevations.xs,
    '--shadow-sm': elevations.sm,
    '--shadow-md': elevations.md,
    '--shadow-lg': elevations.lg,
    '--shadow-xl': elevations.xl,
    '--shadow-2xl': elevations['2xl'],
    '--shadow-inner': elevations.inner,

    // Glass morphism shadows
    '--shadow-glass-subtle': glass.subtle,
    '--shadow-glass-medium': glass.medium,
    '--shadow-glass-strong': glass.strong,
    '--shadow-glass-glow': glass.glow,
    '--shadow-glass-inner': glass.innerGlow,

    // Component shadows
    '--shadow-button': components.button.default,
    '--shadow-button-hover': components.button.hover,
    '--shadow-button-active': components.button.active,
    '--shadow-button-focus': components.button.focus,

    '--shadow-card': components.card.default,
    '--shadow-card-hover': components.card.hover,
    '--shadow-card-interactive': components.card.interactive,

    '--shadow-modal-backdrop': components.modal.backdrop,
    '--shadow-modal-content': components.modal.content,

    '--shadow-dropdown': components.dropdown.default,
    '--shadow-dropdown-large': components.dropdown.large,

    '--shadow-input': components.input.default,
    '--shadow-input-focus': components.input.focus,
    '--shadow-input-error': components.input.error,

    '--shadow-fab': components.fab.default,
    '--shadow-fab-hover': components.fab.hover,
    '--shadow-fab-active': components.fab.active,

    '--shadow-toast': components.toast.default,
    '--shadow-toast-success': components.toast.success,
    '--shadow-toast-error': components.toast.error,
    '--shadow-toast-warning': components.toast.warning,

    // Text shadows
    '--text-shadow-none': text.none,
    '--text-shadow-sm': text.sm,
    '--text-shadow-md': text.md,
    '--text-shadow-lg': text.lg,
    '--text-shadow-glow': text.glow,

    // Shadow colors
    '--shadow-color-primary': shadowColors[theme].primary,
    '--shadow-color-secondary': shadowColors[theme].secondary,
    '--shadow-color-accent': shadowColors[theme].accent,
    '--shadow-color-glass': shadowColors[theme].glass
  };
};

// Utility function to get themed shadows
export const getThemedShadow = (
  category: 'elevation' | 'glass' | 'component' | 'text',
  variant: string,
  theme: 'light' | 'dark' = 'light'
) => {
  switch (category) {
    case 'elevation':
      return elevationShadows[theme][variant as keyof typeof elevationShadows.light];
    case 'glass':
      return glassShadows[theme][variant as keyof typeof glassShadows.light];
    case 'text':
      return textShadows[theme][variant as keyof typeof textShadows.light];
    default:
      return elevationShadows[theme].none;
  }
};

// Export type definitions
export type ShadowTheme = 'light' | 'dark';
export type ElevationShadow = keyof typeof elevationShadows.light;
export type GlassShadow = keyof typeof glassShadows.light;
export type ComponentShadow = keyof typeof componentShadows.light;
export type TextShadow = keyof typeof textShadows.light; 