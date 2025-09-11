import type React from 'react';
import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/theme-provider';

const inter = Inter({
  subsets: ['latin'],
  preload: true,
  display: 'swap',
});

export const metadata: Metadata = {
  title:
    'Stripe Pre-IPO Investment Opportunity | Invest in the Future of Fintech',
  description:
    "Explore an exclusive opportunity to invest in Stripe's private placement pre-IPO shares. Learn about Stripe's market leadership, explosive growth, and path to becoming a publicly traded company. Join leading institutional investors in this transformative fintech investment.",
  keywords: [
    'Stripe',
    'pre-IPO',
    'investment',
    'fintech',
    'financial technology',
    'private placement',
    'Stripe stock',
    'invest in Stripe',
    'fintech investment',
    'technology stocks',
    'venture capital',
    'institutional investment',
    'payment processing',
    'digital payments',
    'BNPL',
    'buy now pay later',
    'API payments',
    'merchant services',
    'e-commerce',
    'online payments',
    'financial services',
    'Australia investment',
    'ASIC regulated',
    'accredited investors',
    'wholesale clients',
    'Series I funding',
    'unicorn company',
    'IPO 2025',
    'MPS Limited',
    'AFSL',
  ],
  authors: [{ name: 'Stripe Investment Team' }],
  creator: 'Stripe Investment Team',
  publisher: 'Stripe',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://stripe.mpsfc.com',
    title:
      'Stripe Pre-IPO Investment Opportunity | Invest in the Future of Fintech',
    description:
      "Explore an exclusive opportunity to invest in Stripe's private placement pre-IPO shares. Join leading institutional investors in this transformative fintech investment.",
    siteName: 'Stripe Investment Opportunity',
    images: [
      {
        url: '/stripe-logo.png',
        width: 1200,
        height: 630,
        alt: 'Stripe Pre-IPO Investment Opportunity',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title:
      'Stripe Pre-IPO Investment Opportunity | Invest in the Future of Fintech',
    description:
      "Explore an exclusive opportunity to invest in Stripe's private placement pre-IPO shares. Join leading institutional investors in this transformative fintech investment.",
    images: ['/stripe-logo.png'],
    creator: '@stripe',
  },
  alternates: {
    canonical: 'https://stripe.mpsfc.com',
  },
  category: 'Investment',
  classification: 'Investment Opportunity',
  referrer: 'origin-when-cross-origin',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://stripe.mpsfc.com'),
  icons: {
    icon: [
      {
        url: '/favicon-16x16.png',
        sizes: '16x16',
        type: 'image/png',
      },
      {
        url: '/favicon-32x32.png',
        sizes: '32x32',
        type: 'image/png',
      },
    ],
    apple: [
      {
        url: '/apple-touch-icon.png',
        sizes: '180x180',
        type: 'image/png',
      },
    ],
    other: [
      {
        rel: 'manifest',
        url: '/site.webmanifest',
      },
    ],
  },
  manifest: '/site.webmanifest',
  verification: {
    google: 'stripe-investment-verification',
    yandex: 'stripe-investment-yandex-verification',
    yahoo: 'stripe-investment-yahoo-verification',
    other: {
      'msvalidate.01': 'stripe-investment-bing-verification',
      'p:domain_verify': 'stripe-investment-pinterest-verification',
    },
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en' suppressHydrationWarning>
      <head>
        {/* Favicon Links */}
        <link
          rel='icon'
          type='image/png'
          sizes='16x16'
          href='/favicon-16x16.png'
        />
        <link
          rel='icon'
          type='image/png'
          sizes='32x32'
          href='/favicon-32x32.png'
        />
        <link
          rel='apple-touch-icon'
          sizes='180x180'
          href='/apple-touch-icon.png'
        />
        <link rel='manifest' href='/site.webmanifest' />

        {/* Android Chrome Icons */}
        <link
          rel='icon'
          type='image/png'
          sizes='192x192'
          href='/android-chrome-192x192.png'
        />
        <link
          rel='icon'
          type='image/png'
          sizes='512x512'
          href='/android-chrome-512x512.png'
        />

        {/* Theme Color */}
        <meta name='theme-color' content='#ffffff' />
        <meta name='msapplication-TileColor' content='#ffffff' />

        {/* Additional SEO */}
        <meta name='application-name' content='Stripe Investment' />
        <meta name='apple-mobile-web-app-title' content='Stripe Investment' />
        <meta name='apple-mobile-web-app-capable' content='yes' />
        <meta name='apple-mobile-web-app-status-bar-style' content='default' />
        <meta name='mobile-web-app-capable' content='yes' />

        {/* Google Fonts optimization is handled automatically by next/font */}
      </head>
      <body className={inter.className}>
        <ThemeProvider attribute='class' defaultTheme='light' enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
