/**
 * Enhanced Input Component for Moonset Dashboard
 * 
 * Features:
 * - Professional focus states with glass morphism
 * - Validation states and error handling
 * - Design system token integration
 * - Icon support and advanced styling
 * - Full theme support
 */

import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const inputVariants = cva(
  // Base styles
  `
    flex w-full border transition-all duration-200 ease-out
    file:border-0 file:bg-transparent file:text-sm file:font-medium
    placeholder:text-text-tertiary
    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2
    disabled:cursor-not-allowed disabled:opacity-50
    font-family-primary
  `,
  {
    variants: {
      variant: {
        // Default glass morphism input
        default: `
          glass bg-glass-bg border-glass-border
          hover:border-glass-border-hover
          focus:border-primary focus:ring-primary/20
          text-text-primary
        `,
        
        // Outline variant
        outline: `
          bg-bg-primary border-border-primary
          hover:border-border-secondary
          focus:border-primary focus:ring-primary/20
          text-text-primary
        `,
        
        // Filled variant
        filled: `
          bg-bg-secondary border-transparent
          hover:bg-bg-tertiary
          focus:bg-bg-primary focus:border-primary focus:ring-primary/20
          text-text-primary
        `,
        
        // Minimal variant
        minimal: `
          bg-transparent border-transparent border-b-2 border-b-border-primary
          rounded-none hover:border-b-border-secondary
          focus:border-b-primary focus:ring-0 focus:ring-offset-0
          text-text-primary
        `
      },
      size: {
        sm: 'h-9 px-3 py-2 text-sm rounded-lg',
        default: 'h-11 px-4 py-3 text-sm rounded-xl',
        lg: 'h-13 px-6 py-4 text-base rounded-xl'
      },
      state: {
        default: '',
        error: 'border-red-500 focus:border-red-500 focus:ring-red-500/20',
        success: 'border-green-500 focus:border-green-500 focus:ring-green-500/20',
        warning: 'border-yellow-500 focus:border-yellow-500 focus:ring-yellow-500/20'
      }
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
      state: 'default'
    }
  }
);

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof inputVariants> {
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  error?: string;
  success?: string;
  helper?: string;
  label?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ 
    className, 
    variant, 
    size, 
    state,
    type,
    leftIcon,
    rightIcon,
    error,
    success,
    helper,
    label,
    id,
    ...props 
  }, ref) => {
    const inputId = id || React.useId();
    
    // Determine state based on props
    const currentState = error ? 'error' : success ? 'success' : state;
    
    const InputElement = (
      <div className="relative">
        {/* Left Icon */}
        {leftIcon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-text-tertiary">
            {leftIcon}
          </div>
        )}
        
        {/* Input */}
        <input
          type={type}
          className={cn(
            inputVariants({ variant, size, state: currentState }),
            leftIcon && 'pl-10',
            rightIcon && 'pr-10',
            className
          )}
          ref={ref}
          id={inputId}
          {...props}
        />
        
        {/* Right Icon */}
        {rightIcon && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-text-tertiary">
            {rightIcon}
          </div>
        )}
      </div>
    );
    
    if (label || error || success || helper) {
      return (
        <div className="space-y-2">
          {/* Label */}
          {label && (
            <label 
              htmlFor={inputId}
              className="text-sm font-medium text-text-primary"
            >
              {label}
            </label>
          )}
          
          {/* Input */}
          {InputElement}
          
          {/* Helper/Error/Success Text */}
          {(error || success || helper) && (
            <p className={cn(
              'text-xs',
              {
                'text-red-500': error,
                'text-green-500': success,
                'text-text-tertiary': helper && !error && !success
              }
            )}>
              {error || success || helper}
            </p>
          )}
        </div>
      );
    }
    
    return InputElement;
  }
);

Input.displayName = 'Input';

// Enhanced TextArea component
const textareaVariants = cva(
  // Base styles
  `
    flex min-h-[80px] w-full border transition-all duration-200 ease-out
    placeholder:text-text-tertiary resize-none
    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2
    disabled:cursor-not-allowed disabled:opacity-50
    font-family-primary
  `,
  {
    variants: {
      variant: {
        default: `
          glass bg-glass-bg border-glass-border
          hover:border-glass-border-hover
          focus:border-primary focus:ring-primary/20
          text-text-primary
        `,
        outline: `
          bg-bg-primary border-border-primary
          hover:border-border-secondary
          focus:border-primary focus:ring-primary/20
          text-text-primary
        `,
        filled: `
          bg-bg-secondary border-transparent
          hover:bg-bg-tertiary
          focus:bg-bg-primary focus:border-primary focus:ring-primary/20
          text-text-primary
        `
      },
      size: {
        sm: 'min-h-[60px] px-3 py-2 text-sm rounded-lg',
        default: 'min-h-[80px] px-4 py-3 text-sm rounded-xl',
        lg: 'min-h-[120px] px-6 py-4 text-base rounded-xl'
      }
    },
    defaultVariants: {
      variant: 'default',
      size: 'default'
    }
  }
);

export interface TextAreaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    VariantProps<typeof textareaVariants> {
  error?: string;
  success?: string;
  helper?: string;
  label?: string;
}

const TextArea = React.forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ 
    className, 
    variant, 
    size,
    error,
    success,
    helper,
    label,
    id,
    ...props 
  }, ref) => {
    const textareaId = id || React.useId();
    
    const TextAreaElement = (
      <textarea
        className={cn(
          textareaVariants({ variant, size }),
          error && 'border-red-500 focus:border-red-500 focus:ring-red-500/20',
          success && 'border-green-500 focus:border-green-500 focus:ring-green-500/20',
          className
        )}
        ref={ref}
        id={textareaId}
        {...props}
      />
    );
    
    if (label || error || success || helper) {
      return (
        <div className="space-y-2">
          {/* Label */}
          {label && (
            <label 
              htmlFor={textareaId}
              className="text-sm font-medium text-text-primary"
            >
              {label}
            </label>
          )}
          
          {/* TextArea */}
          {TextAreaElement}
          
          {/* Helper/Error/Success Text */}
          {(error || success || helper) && (
            <p className={cn(
              'text-xs',
              {
                'text-red-500': error,
                'text-green-500': success,
                'text-text-tertiary': helper && !error && !success
              }
            )}>
              {error || success || helper}
            </p>
          )}
        </div>
      );
    }
    
    return TextAreaElement;
  }
);

TextArea.displayName = 'TextArea';

export { Input, TextArea, inputVariants, textareaVariants }; 