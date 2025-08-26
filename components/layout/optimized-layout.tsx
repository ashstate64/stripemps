import React, { Suspense } from 'react';
import { cn } from '@/lib/utils';

interface OptimizedLayoutProps {
  children: React.ReactNode;
  className?: string;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '4xl' | '6xl' | '7xl' | 'full';
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  background?: 'default' | 'gradient' | 'dark' | 'transparent';
  centerContent?: boolean;
  minHeight?: 'screen' | 'auto' | 'full';
}

const maxWidthClasses = {
  sm: 'max-w-sm',
  md: 'max-w-md',
  lg: 'max-w-lg',
  xl: 'max-w-xl',
  '2xl': 'max-w-2xl',
  '4xl': 'max-w-4xl',
  '6xl': 'max-w-6xl',
  '7xl': 'max-w-7xl',
  full: 'max-w-full',
};

const paddingClasses = {
  none: '',
  sm: 'p-4',
  md: 'p-6 md:p-8',
  lg: 'p-6 md:p-12 lg:p-16',
  xl: 'p-8 md:p-16 lg:p-24',
};

const backgroundClasses = {
  default: 'bg-background',
  gradient: 'bg-gradient-to-br from-slate-900 via-slate-800 to-gray-900',
  dark: 'bg-slate-900',
  transparent: 'bg-transparent',
};

const minHeightClasses = {
  screen: 'min-h-screen',
  auto: 'min-h-auto',
  full: 'min-h-full',
};

export function OptimizedLayout({
  children,
  className,
  maxWidth = '7xl',
  padding = 'md',
  background = 'default',
  centerContent = false,
  minHeight = 'auto',
}: OptimizedLayoutProps) {
  return (
    <div
      className={cn(
        // Base layout
        'w-full',
        minHeightClasses[minHeight],
        backgroundClasses[background],

        // Content centering
        centerContent && 'flex items-center justify-center',

        className
      )}
    >
      <div
        className={cn(
          // Container
          'mx-auto w-full',
          maxWidthClasses[maxWidth],
          paddingClasses[padding],

          // Mobile optimizations
          'touch-manipulation',
          'selection:bg-blue-500/20 selection:text-blue-100'
        )}
      >
        <Suspense
          fallback={
            <div className='flex items-center justify-center p-8'>
              <div className='h-8 w-8 animate-spin rounded-full border-2 border-blue-500 border-t-transparent' />
            </div>
          }
        >
          {children}
        </Suspense>
      </div>
    </div>
  );
}

// Specialized layout components for common use cases
export function PageLayout({
  children,
  ...props
}: Omit<OptimizedLayoutProps, 'minHeight' | 'background'>) {
  return (
    <OptimizedLayout minHeight='screen' background='gradient' {...props}>
      {children}
    </OptimizedLayout>
  );
}

export function FormLayout({
  children,
  ...props
}: Omit<OptimizedLayoutProps, 'maxWidth' | 'centerContent'>) {
  return (
    <OptimizedLayout maxWidth='4xl' centerContent {...props}>
      {children}
    </OptimizedLayout>
  );
}

export function ContentLayout({
  children,
  ...props
}: Omit<OptimizedLayoutProps, 'maxWidth'>) {
  return (
    <OptimizedLayout maxWidth='6xl' {...props}>
      {children}
    </OptimizedLayout>
  );
}
