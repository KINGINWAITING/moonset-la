/**
 * Stack Component for Moonset Dashboard
 * 
 * Features:
 * - Vertical and horizontal stacking
 * - Consistent spacing system
 * - Flexible alignment options
 * - Responsive behavior
 */

import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const stackVariants = cva(
  // Base styles
  'flex',
  {
    variants: {
      direction: {
        vertical: 'flex-col',
        horizontal: 'flex-row'
      },
      spacing: {
        none: 'gap-0',
        xs: 'gap-1',
        sm: 'gap-2',
        default: 'gap-4',
        lg: 'gap-6',
        xl: 'gap-8',
        '2xl': 'gap-12'
      },
      align: {
        start: 'items-start',
        center: 'items-center',
        end: 'items-end',
        stretch: 'items-stretch',
        baseline: 'items-baseline'
      },
      justify: {
        start: 'justify-start',
        center: 'justify-center',
        end: 'justify-end',
        between: 'justify-between',
        around: 'justify-around',
        evenly: 'justify-evenly'
      },
      wrap: {
        true: 'flex-wrap',
        false: 'flex-nowrap'
      }
    },
    defaultVariants: {
      direction: 'vertical',
      spacing: 'default',
      align: 'stretch',
      justify: 'start',
      wrap: false
    }
  }
);

export interface StackProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof stackVariants> {
  as?: React.ElementType;
}

const Stack = React.forwardRef<HTMLDivElement, StackProps>(
  ({ 
    className, 
    direction, 
    spacing, 
    align, 
    justify, 
    wrap, 
    as: Comp = 'div', 
    ...props 
  }, ref) => (
    <Comp
      ref={ref}
      className={cn(
        stackVariants({ direction, spacing, align, justify, wrap }), 
        className
      )}
      {...props}
    />
  )
);

Stack.displayName = 'Stack';

// Convenience components for common patterns
const VStack = React.forwardRef<HTMLDivElement, Omit<StackProps, 'direction'>>(
  ({ ...props }, ref) => (
    <Stack ref={ref} direction="vertical" {...props} />
  )
);

VStack.displayName = 'VStack';

const HStack = React.forwardRef<HTMLDivElement, Omit<StackProps, 'direction'>>(
  ({ ...props }, ref) => (
    <Stack ref={ref} direction="horizontal" {...props} />
  )
);

HStack.displayName = 'HStack';

export { Stack, VStack, HStack, stackVariants }; 