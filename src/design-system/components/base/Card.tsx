/**
 * Enhanced Card Component for Moonset Dashboard
 * 
 * Features:
 * - Advanced glass morphism effects with multiple variants
 * - Gradient accent support for interactive elements
 * - Professional hover animations and micro-interactions
 * - Enhanced theme-aware styling
 * - Consistent with Moonset Token page aesthetic
 */

import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const cardVariants = cva(
  // Enhanced base styles
  `
    relative overflow-hidden transition-all duration-300 ease-out
    border backdrop-blur-lg
  `,
  {
    variants: {
      variant: {
        // Enhanced glass morphism - primary content cards
        glass: `
          glass border-glass-border hover:border-glass-border-hover
          shadow-glass-subtle hover:shadow-glass-glow
          bg-glass-bg hover:bg-glass-bg-hover
          backdrop-blur-xl
        `,
        
        // Elevated glass - for important content sections
        'glass-elevated': `
          glass border-glass-border hover:border-glass-border-hover
          shadow-glass-glow hover:shadow-glass-intense
          bg-glass-bg-elevated hover:bg-glass-bg-elevated-hover
          backdrop-blur-2xl transform hover:scale-[1.02]
        `,
        
        // Subtle glass - for secondary content
        'glass-subtle': `
          glass border-glass-border/50 hover:border-glass-border
          shadow-glass-minimal hover:shadow-glass-subtle
          bg-glass-bg/30 hover:bg-glass-bg/50
          backdrop-blur-md
        `,
        
        // Interactive glass - for clickable elements
        'glass-interactive': `
          glass border-glass-border hover:border-glass-border-hover
          shadow-glass-subtle hover:shadow-glass-glow
          bg-glass-bg hover:bg-glass-bg-hover
          backdrop-blur-lg cursor-pointer
          transform hover:scale-[1.02] active:scale-[0.98]
        `,
        
        // Gradient accent cards
        'gradient': `
          bg-gradient-to-r from-purple-500 to-blue-500
          border-transparent shadow-glass-glow
          text-white hover:shadow-glass-intense
          transform hover:scale-[1.02]
        `,
        
        'gradient-secondary': `
          bg-gradient-to-r from-cyan-500 to-purple-500
          border-transparent shadow-glass-glow
          text-white hover:shadow-glass-intense
          transform hover:scale-[1.02]
        `,
        
        'gradient-accent': `
          bg-gradient-to-r from-purple-600 to-pink-500
          border-transparent shadow-glass-glow
          text-white hover:shadow-glass-intense
          transform hover:scale-[1.02]
        `,
        
        'gradient-success': `
          bg-gradient-to-r from-green-500 to-emerald-500
          border-transparent shadow-glass-glow
          text-white hover:shadow-glass-intense
          transform hover:scale-[1.02]
        `
      },
      size: {
        sm: 'rounded-lg p-4',
        default: 'rounded-xl p-6',
        lg: 'rounded-2xl p-8',
        xl: 'rounded-3xl p-12'
      },
      hover: {
        true: '',
        false: 'hover:scale-100'
      }
    },
    defaultVariants: {
      variant: 'glass',
      size: 'default',
      hover: true
    }
  }
);

export interface CardProps 
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {
  as?: React.ElementType;
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant, size, hover, as: Component = 'div', ...props }, ref) => {
    return (
      <Component
        ref={ref}
        className={cn(cardVariants({ variant, size, hover }), className)}
        {...props}
      />
    );
  }
);
Card.displayName = 'Card';

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('flex flex-col space-y-1.5 pb-6', className)}
    {...props}
  />
));
CardHeader.displayName = 'CardHeader';

const CardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement> & {
    as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  }
>(({ className, as: Component = 'h3', ...props }, ref) => (
  <Component
    ref={ref}
    className={cn(
      'text-2xl font-semibold leading-none tracking-tight text-text-primary',
      className
    )}
    {...props}
  />
));
CardTitle.displayName = 'CardTitle';

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn('text-sm text-text-secondary leading-relaxed', className)}
    {...props}
  />
));
CardDescription.displayName = 'CardDescription';

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn('pt-0', className)} {...props} />
));
CardContent.displayName = 'CardContent';

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('flex items-center pt-6', className)}
    {...props}
  />
));
CardFooter.displayName = 'CardFooter';

// Enhanced StatsCard component for metrics display
interface StatsCardProps extends CardProps {
  title: string;
  value: string | number;
  icon?: React.ReactNode;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  description?: string;
}

const StatsCard = React.forwardRef<HTMLDivElement, StatsCardProps>(
  ({ title, value, icon, trend, description, className, ...props }, ref) => {
    return (
      <Card
        ref={ref}
        variant="glass-elevated"
        size="lg"
        className={cn('group relative overflow-hidden min-h-[200px]', className)}
        {...props}
      >
        {/* Enhanced background gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/3 via-transparent to-secondary/3 opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
        <div className="absolute inset-0 bg-gradient-to-br from-white/8 via-transparent to-white/12 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        <CardContent className="relative h-full flex flex-col p-6 space-y-4 text-center">
          {/* Enhanced header with icon - centered */}
          <div className="flex items-center justify-center">
            <div className="flex flex-col items-center space-y-3">
              {icon && (
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-primary/15 via-primary/8 to-transparent border border-primary/15 text-primary group-hover:scale-110 group-hover:border-primary/25 group-hover:shadow-lg transition-all duration-300 shadow-md backdrop-blur-sm">
                  <div className="scale-100">
                    {icon}
                  </div>
                </div>
              )}
              <p className="text-xs font-bold text-text-tertiary uppercase tracking-[0.1em] leading-tight">
                {title}
              </p>
            </div>
          </div>
          
          {/* Enhanced main content - centered */}
          <div className="flex-1 flex flex-col justify-center items-center space-y-4">
            {/* Properly sized value - centered */}
            <div className="text-3xl lg:text-4xl font-black text-text-primary leading-none tracking-tight">
              {value}
            </div>
            
            {/* Enhanced trend indicator - centered */}
            {trend && (
              <div className={cn(
                'inline-flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-bold shadow-sm border backdrop-blur-sm',
                trend.isPositive 
                  ? 'bg-emerald-500/15 text-emerald-600 border-emerald-500/25' 
                  : 'bg-red-500/15 text-red-600 border-red-500/25'
              )}>
                <span className={cn(
                  'inline-block w-0 h-0',
                  trend.isPositive 
                    ? 'border-l-[3px] border-r-[3px] border-b-[4px] border-l-transparent border-r-transparent border-b-current' 
                    : 'border-l-[3px] border-r-[3px] border-t-[4px] border-l-transparent border-r-transparent border-t-current'
                )}>
                </span>
                <span className="font-black">
                  {trend.isPositive ? '+' : ''}{trend.value.toFixed(1)}%
                </span>
              </div>
            )}
          </div>
          
          {/* Enhanced description - centered */}
          {description && (
            <div className="pt-3 border-t border-glass-border/30">
              <p className="text-xs text-text-secondary font-semibold leading-relaxed text-center">
                {description}
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    );
  }
);
StatsCard.displayName = 'StatsCard';

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
  StatsCard,
  cardVariants
}; 