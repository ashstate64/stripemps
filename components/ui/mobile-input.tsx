import * as React from 'react';
import { cn } from '@/lib/utils';

export interface MobileInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  isLoading?: boolean;
}

const MobileInput = React.forwardRef<HTMLInputElement, MobileInputProps>(
  (
    {
      className,
      type = 'text',
      label,
      error,
      helperText,
      leftIcon,
      rightIcon,
      isLoading,
      id,
      ...props
    },
    ref
  ) => {
    const generatedId = React.useId();
    const inputId = id || generatedId;
    const errorId = `${inputId}-error`;
    const helperId = `${inputId}-helper`;

    return (
      <div className='w-full space-y-2'>
        {label && (
          <label
            htmlFor={inputId}
            className='block text-sm font-medium text-gray-200 transition-colors duration-200'
          >
            {label}
            {props.required && <span className='ml-1 text-red-500'>*</span>}
          </label>
        )}

        <div className='relative'>
          {leftIcon && (
            <div className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400'>
              {leftIcon}
            </div>
          )}

          <input
            id={inputId}
            type={type}
            className={cn(
              // Base styles
              'flex w-full rounded-md border bg-background px-3 py-2 text-base ring-offset-background',
              'file:border-0 file:bg-transparent file:text-sm file:font-medium',
              'placeholder:text-muted-foreground',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
              'disabled:cursor-not-allowed disabled:opacity-50',

              // Mobile optimizations
              'min-h-[44px] text-base', // Prevent zoom on iOS
              'touch-manipulation', // Optimize for touch

              // Dark theme
              'border-slate-600 bg-slate-700 text-gray-200',
              'focus:border-blue-500 focus:ring-blue-500/20',

              // Icon spacing
              leftIcon && 'pl-10',
              rightIcon && 'pr-10',

              // Error state
              error &&
                'border-red-500 focus:border-red-500 focus:ring-red-500/20',

              className
            )}
            aria-invalid={error ? 'true' : 'false'}
            aria-describedby={cn(error && errorId, helperText && helperId)}
            ref={ref}
            {...props}
          />

          {(rightIcon || isLoading) && (
            <div className='absolute right-3 top-1/2 -translate-y-1/2 text-gray-400'>
              {isLoading ? (
                <div className='h-4 w-4 animate-spin rounded-full border-2 border-gray-400 border-t-transparent' />
              ) : (
                rightIcon
              )}
            </div>
          )}
        </div>

        {error && (
          <p
            id={errorId}
            className='text-sm text-red-400 duration-200 animate-in slide-in-from-top-1'
            role='alert'
            aria-live='polite'
          >
            <span className='inline-flex items-center gap-1'>
              <span aria-hidden='true'>⚠</span>
              {error}
            </span>
          </p>
        )}

        {helperText && !error && (
          <p id={helperId} className='text-sm text-gray-400'>
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

MobileInput.displayName = 'MobileInput';

export { MobileInput };
