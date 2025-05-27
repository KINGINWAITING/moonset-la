/**
 * Enhanced Badge Component for Moonset Dashboard
 * 
 * Features:
 * - Status indicator variants with semantic colors
 * - Glass morphism effects
 * - Icon support and dot indicators
 * - Professional styling with animations
 * - Full theme support
 */

import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const badgeVariants = cva(
  // Base styles
  `
    inline-flex items-center gap-1.5 font-medium transition-all duration-200 ease-out
    font-family-primary
  `,
  {
    variants: {
      variant: {
        // Default with glass morphism
        default: `
          glass bg-glass-bg border border-glass-border
          text-text-primary backdrop-blur-sm
        `,
        
        // Primary brand badge
        primary: `
          bg-primary/10 text-primary border border-primary/20
          hover:bg-primary/20 hover:border-primary/30
        `,
        
        // Secondary badge
        secondary: `
          bg-secondary/10 text-secondary border border-secondary/20
          hover:bg-secondary/20 hover:border-secondary/30
        `,
        
        // Success status
        success: `
          bg-green-500/10 text-green-600 border border-green-500/20
          dark:text-green-400 hover:bg-green-500/20
        `,
        
        // Warning status
        warning: `
          bg-yellow-500/10 text-yellow-600 border border-yellow-500/20
          dark:text-yellow-400 hover:bg-yellow-500/20
        `,
        
        // Error status
        error: `
          bg-red-500/10 text-red-600 border border-red-500/20
          dark:text-red-400 hover:bg-red-500/20
        `,
        
        // Info status
        info: `
          bg-blue-500/10 text-blue-600 border border-blue-500/20
          dark:text-blue-400 hover:bg-blue-500/20
        `,
        
        // Neutral status
        neutral: `
          bg-bg-secondary text-text-secondary border border-border-primary
          hover:bg-bg-tertiary
        `,
        
        // Outline variant
        outline: `
          bg-transparent text-text-primary border border-border-primary
          hover:bg-bg-secondary
        `,
        
        // Solid variants
        'solid-primary': `
          bg-primary text-white border-0
          hover:bg-primary-hover shadow-sm
        `,
        
        'solid-success': `
          bg-green-500 text-white border-0
          hover:bg-green-600 shadow-sm
        `,
        
        'solid-warning': `
          bg-yellow-500 text-white border-0
          hover:bg-yellow-600 shadow-sm
        `,
        
        'solid-error': `
          bg-red-500 text-white border-0
          hover:bg-red-600 shadow-sm
        `,
        
        // Gradient variant
        gradient: `
          bg-gradient-to-r from-primary to-secondary text-white border-0
          shadow-sm hover:shadow-md
        `,
        
        // Additional gradient variants
        'gradient-success': `
          bg-gradient-to-r from-green-500 to-emerald-500 text-white border-0
          shadow-glass-glow hover:shadow-glass-intense
        `,
        
        // Destructive variant for errors
        destructive: `
          bg-gradient-to-r from-red-500 to-red-600 text-white border-0
          shadow-glass-glow hover:shadow-glass-intense
        `
      },
      size: {
        sm: 'px-2 py-1 text-xs rounded-md',
        default: 'px-3 py-1.5 text-xs rounded-lg',
        lg: 'px-4 py-2 text-sm rounded-xl'
      },
      interactive: {
        false: '',
        true: 'cursor-pointer hover:scale-105 active:scale-95'
      }
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
      interactive: false
    }
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  dot?: boolean;
  dotColor?: 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info';
}

const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
  ({ 
    className, 
    variant, 
    size, 
    interactive = false,
    leftIcon,
    rightIcon,
    dot = false,
    dotColor = 'primary',
    children,
    onClick,
    ...props 
  }, ref) => {
    const isInteractive = interactive || !!onClick;
    
    const dotColorClasses = {
      primary: 'bg-primary',
      secondary: 'bg-secondary',
      success: 'bg-green-500',
      warning: 'bg-yellow-500',
      error: 'bg-red-500',
      info: 'bg-blue-500'
    };
    
    return (
      <div
        ref={ref}
        className={cn(
          badgeVariants({ variant, size, interactive: isInteractive }),
          className
        )}
        onClick={onClick}
        {...props}
      >
        {/* Dot indicator */}
        {dot && (
          <div className={cn(
            'w-2 h-2 rounded-full',
            dotColorClasses[dotColor]
          )} />
        )}
        
        {/* Left icon */}
        {leftIcon && !dot && (
          <span className="flex-shrink-0">
            {leftIcon}
          </span>
        )}
        
        {/* Content */}
        {children && (
          <span className="leading-none">
            {children}
          </span>
        )}
        
        {/* Right icon */}
        {rightIcon && (
          <span className="flex-shrink-0">
            {rightIcon}
          </span>
        )}
      </div>
    );
  }
);

Badge.displayName = 'Badge';

// Status Badge - Predefined status badges for common use cases
export interface StatusBadgeProps extends Omit<BadgeProps, 'variant'> {
  status: 'online' | 'offline' | 'away' | 'busy' | 'pending' | 'approved' | 'rejected' | 'draft' | 'published';
}

const StatusBadge = React.forwardRef<HTMLDivElement, StatusBadgeProps>(
  ({ status, ...props }, ref) => {
    const statusConfig = {
      online: { variant: 'success' as const, dot: true, dotColor: 'success' as const, children: 'Online' },
      offline: { variant: 'neutral' as const, dot: true, dotColor: 'error' as const, children: 'Offline' },
      away: { variant: 'warning' as const, dot: true, dotColor: 'warning' as const, children: 'Away' },
      busy: { variant: 'error' as const, dot: true, dotColor: 'error' as const, children: 'Busy' },
      pending: { variant: 'warning' as const, dot: true, dotColor: 'warning' as const, children: 'Pending' },
      approved: { variant: 'success' as const, dot: true, dotColor: 'success' as const, children: 'Approved' },
      rejected: { variant: 'error' as const, dot: true, dotColor: 'error' as const, children: 'Rejected' },
      draft: { variant: 'neutral' as const, dot: true, dotColor: 'info' as const, children: 'Draft' },
      published: { variant: 'primary' as const, dot: true, dotColor: 'primary' as const, children: 'Published' }
    };
    
    const config = statusConfig[status];
    
    return (
      <Badge
        ref={ref}
        variant={config.variant}
        dot={config.dot}
        dotColor={config.dotColor}
        {...props}
      >
        {config.children}
      </Badge>
    );
  }
);

StatusBadge.displayName = 'StatusBadge';

export { Badge, StatusBadge, badgeVariants }; 