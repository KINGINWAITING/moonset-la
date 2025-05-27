/**
 * Enhanced Button Component for Moonset Dashboard
 * 
 * Features:
 * - Professional gradient variants matching token page
 * - Advanced glass morphism effects
 * - Sophisticated hover animations and micro-interactions
 * - Enhanced theme-aware styling
 * - Consistent with modern design standards
 */

import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  // Enhanced base styles
  `
    inline-flex items-center justify-center gap-2 whitespace-nowrap 
    font-medium transition-all duration-300 ease-out
    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2
    disabled:pointer-events-none disabled:opacity-50
    font-family-primary relative overflow-hidden
  `,
  {
    variants: {
      variant: {
        // Primary gradient - matches token page aesthetic
        default: `
          bg-gradient-to-r from-purple-500 to-blue-500 
          text-white shadow-glass-glow
          hover:shadow-glass-intense hover:scale-[1.02]
          focus-visible:ring-purple-500 active:scale-[0.98]
          border-transparent
        `,
        
        // Secondary gradient variant
        secondary: `
          bg-gradient-to-r from-cyan-500 to-purple-500
          text-white shadow-glass-glow
          hover:shadow-glass-intense hover:scale-[1.02]
          focus-visible:ring-cyan-500 active:scale-[0.98]
          border-transparent
        `,
        
        // Success gradient variant
        success: `
          bg-gradient-to-r from-green-500 to-emerald-500
          text-white shadow-glass-glow
          hover:shadow-glass-intense hover:scale-[1.02]
          focus-visible:ring-green-500 active:scale-[0.98]
          border-transparent
        `,
        
        // Warning gradient variant
        warning: `
          bg-gradient-to-r from-orange-500 to-red-500
          text-white shadow-glass-glow
          hover:shadow-glass-intense hover:scale-[1.02]
          focus-visible:ring-orange-500 active:scale-[0.98]
          border-transparent
        `,
        
        // Glass morphism variant - subtle and elegant
        glass: `
          glass bg-glass-bg hover:bg-glass-bg-hover
          border-glass-border hover:border-glass-border-hover
          text-text-primary shadow-glass-subtle hover:shadow-glass-glow
          backdrop-blur-lg hover:scale-[1.02] active:scale-[0.98]
        `,
        
        // Outline variant with glass effect
        outline: `
          glass bg-transparent hover:bg-glass-bg/30
          border-glass-border hover:border-primary
          text-text-primary hover:text-primary
          shadow-glass-minimal hover:shadow-glass-subtle
          backdrop-blur-sm hover:scale-[1.02] active:scale-[0.98]
        `,
        
        // Ghost variant - minimal styling
        ghost: `
          bg-transparent hover:bg-glass-bg/20
          text-text-primary hover:text-primary
          border-transparent hover:border-glass-border/50
          shadow-none hover:shadow-glass-minimal
          hover:scale-[1.02] active:scale-[0.98]
        `,
        
        // Destructive variant
        destructive: `
          bg-gradient-to-r from-red-500 to-red-600
          text-white shadow-glass-glow
          hover:shadow-glass-intense hover:scale-[1.02]
          focus-visible:ring-red-500 active:scale-[0.98]
          border-transparent
        `,
        
        // Link variant - appears as text link
        link: `
          text-primary underline-offset-4 hover:underline
          bg-transparent shadow-none
          hover:scale-[1.02] active:scale-[0.98]
          border-transparent
        `
      },
      size: {
        sm: 'h-8 rounded-lg px-3 text-xs',
        default: 'h-10 rounded-xl px-4 py-2 text-sm',
        lg: 'h-12 rounded-xl px-6 text-base',
        xl: 'h-14 rounded-2xl px-8 text-lg',
        icon: 'h-10 w-10 rounded-xl',
        'icon-sm': 'h-8 w-8 rounded-lg',
        'icon-lg': 'h-12 w-12 rounded-xl'
      },
      loading: {
        true: 'cursor-not-allowed',
        false: ''
      }
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
      loading: false
    }
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ 
    className, 
    variant, 
    size, 
    asChild = false, 
    loading = false,
    leftIcon,
    rightIcon,
    children,
    disabled,
    ...props 
  }, ref) => {
    const Comp = asChild ? Slot : 'button';
    
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, loading }), className)}
        ref={ref}
        disabled={disabled || loading}
        {...props}
      >
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
          </div>
        )}
        
        <div className={cn(
          'flex items-center gap-2',
          loading && 'opacity-0'
        )}>
          {leftIcon && (
            <span className="flex-shrink-0">
              {leftIcon}
            </span>
          )}
          
          {children}
          
          {rightIcon && (
            <span className="flex-shrink-0">
              {rightIcon}
            </span>
          )}
        </div>
      </Comp>
    );
  }
);
Button.displayName = 'Button';

// Enhanced IconButton component for icon-only buttons
interface IconButtonProps extends Omit<ButtonProps, 'leftIcon' | 'rightIcon'> {
  icon: React.ReactNode;
  'aria-label': string;
}

const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ icon, className, size = 'icon', ...props }, ref) => {
    return (
      <Button
        ref={ref}
        size={size}
        className={cn('flex-shrink-0', className)}
        {...props}
      >
        {icon}
      </Button>
    );
  }
);
IconButton.displayName = 'IconButton';

// Enhanced GradientButton with shimmer effect
interface GradientButtonProps extends ButtonProps {
  shimmer?: boolean;
}

const GradientButton = React.forwardRef<HTMLButtonElement, GradientButtonProps>(
  ({ shimmer = false, className, children, ...props }, ref) => {
    return (
      <Button
        ref={ref}
        variant="default"
        className={cn(
          shimmer && 'relative overflow-hidden before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent before:translate-x-[-100%] hover:before:translate-x-[100%] before:transition-transform before:duration-700',
          className
        )}
        {...props}
      >
        {children}
      </Button>
    );
  }
);
GradientButton.displayName = 'GradientButton';

export { 
  Button, 
  IconButton, 
  GradientButton, 
  buttonVariants, 
  type ButtonProps 
}; 