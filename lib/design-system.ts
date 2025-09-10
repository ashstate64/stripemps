// Centralized Design System for Professional Financial Platform
// Following WCAG AA accessibility standards and financial industry best practices

export const colors = {
  // Primary brand colors
  primary: {
    50: '#eff6ff',
    100: '#dbeafe',
    500: '#3b82f6', // Professional blue
    600: '#2563eb', // Primary CTA blue
    700: '#1d4ed8', // Darker blue for text
    900: '#1e3a8a', // Very dark blue
  },

  // Neutral grays for excellent readability
  gray: {
    50: '#f9fafb', // Very light background
    100: '#f3f4f6', // Light background
    200: '#e5e7eb', // Light borders
    300: '#d1d5db', // Medium borders
    400: '#9ca3af', // Placeholder text
    500: '#6b7280', // Secondary text
    600: '#4b5563', // Body text
    700: '#374151', // Dark text
    800: '#1f2937', // Very dark text
    900: '#111827', // Headings
  },

  // Status colors with proper contrast
  green: {
    50: '#f0fdf4',
    100: '#dcfce7',
    600: '#16a34a', // Success text
    700: '#15803d', // Success emphasis
  },

  red: {
    50: '#fef2f2',
    100: '#fee2e2',
    600: '#dc2626', // Error text
    700: '#b91c1c', // Error emphasis
  },

  orange: {
    50: '#fff7ed',
    100: '#ffedd5',
    600: '#ea580c', // Warning text
    700: '#c2410c', // Warning emphasis
  },
} as const;

export const typography = {
  // Headings with excellent contrast
  heading: {
    h1: 'text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight',
    h2: 'text-3xl md:text-4xl font-bold text-gray-900 leading-tight',
    h3: 'text-2xl md:text-3xl font-semibold text-gray-900',
    h4: 'text-xl font-semibold text-gray-900',
    h5: 'text-lg font-semibold text-gray-900',
  },

  // Body text with proper contrast
  body: {
    large: 'text-lg text-gray-700 leading-relaxed',
    base: 'text-base text-gray-700 leading-relaxed',
    small: 'text-sm text-gray-600',
    xs: 'text-xs text-gray-500',
  },

  // Special text styles
  emphasis: 'font-semibold text-gray-900',
  muted: 'text-gray-500',
  link: 'text-blue-600 hover:text-blue-700 underline transition-colors',
} as const;

export const components = {
  // Card styles with excellent contrast
  card: {
    base: 'bg-white border border-gray-200 rounded-xl shadow-sm',
    hover: 'hover:shadow-md hover:border-gray-300 transition-all duration-200',
    padding: 'p-6',
  },

  // Button styles following financial industry standards
  button: {
    primary:
      'bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors shadow-sm',
    secondary:
      'bg-white hover:bg-gray-50 text-gray-700 hover:text-gray-900 font-semibold px-6 py-3 rounded-lg border border-gray-300 hover:border-gray-400 transition-all',
    outline:
      'bg-transparent hover:bg-blue-50 text-blue-600 hover:text-blue-700 font-semibold px-6 py-3 rounded-lg border border-blue-300 hover:border-blue-400 transition-all',
  },

  // Badge styles with proper contrast
  badge: {
    success:
      'bg-green-100 text-green-700 border border-green-200 px-3 py-1 rounded-full text-sm font-medium',
    info: 'bg-blue-100 text-blue-700 border border-blue-200 px-3 py-1 rounded-full text-sm font-medium',
    warning:
      'bg-orange-100 text-orange-700 border border-orange-200 px-3 py-1 rounded-full text-sm font-medium',
  },

  // Input styles
  input: {
    base: 'bg-white border border-gray-300 rounded-lg px-4 py-3 text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all',
  },
} as const;

export const layout = {
  // Container styles
  container: 'max-w-6xl mx-auto px-4 sm:px-6 lg:px-8',
  section: 'py-16 md:py-24',

  // Background styles
  background: {
    primary: 'bg-white',
    secondary: 'bg-gray-50',
    muted: 'bg-gray-100',
  },

  // Border styles
  border: {
    light: 'border-gray-200',
    medium: 'border-gray-300',
    dark: 'border-gray-400',
  },
} as const;

// Utility functions for consistent styling
export const getTextColor = (
  variant: 'primary' | 'secondary' | 'muted' = 'primary'
) => {
  switch (variant) {
    case 'primary':
      return 'text-gray-900';
    case 'secondary':
      return 'text-gray-700';
    case 'muted':
      return 'text-gray-500';
    default:
      return 'text-gray-900';
  }
};

export const getBackgroundColor = (
  variant: 'white' | 'light' | 'medium' = 'white'
) => {
  switch (variant) {
    case 'white':
      return 'bg-white';
    case 'light':
      return 'bg-gray-50';
    case 'medium':
      return 'bg-gray-100';
    default:
      return 'bg-white';
  }
};
