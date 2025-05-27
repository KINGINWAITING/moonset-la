/**
 * Container Component for Moonset Dashboard
 * 
 * Features:
 * - Responsive max-widths and padding
 * - Consistent spacing system
 * - Flexible sizing options
 * - Design system integration
 */

import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const containerVariants = cva(
  // Base styles
  'mx-auto w-full',
  {
    variants: {
      size: {
        sm: 'max-w-screen-sm px-4',
        md: 'max-w-screen-md px-6',
        lg: 'max-w-screen-lg px-6',
        xl: 'max-w-screen-xl px-8',
        '2xl': 'max-w-screen-2xl px-8',
        full: 'max-w-full px-4 sm:px-6 lg:px-8',
        fluid: 'px-4 sm:px-6 lg:px-8'
      },
      spacing: {
        none: '',
        sm: 'py-4',
        default: 'py-6',
        lg: 'py-8',
        xl: 'py-12'
      }
    },
    defaultVariants: {
      size: 'full',
      spacing: 'default'
    }
  }
);

export interface ContainerProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof containerVariants> {
  as?: React.ElementType;
}

const Container = React.forwardRef<HTMLDivElement, ContainerProps>(
  ({ className, size, spacing, as: Comp = 'div', ...props }, ref) => (
    <Comp
      ref={ref}
      className={cn(containerVariants({ size, spacing }), className)}
      {...props}
    />
  )
);

Container.displayName = 'Container';

export { Container, containerVariants }; 