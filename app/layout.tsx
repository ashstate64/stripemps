import type React from 'react';
import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/theme-provider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'OpenAI Pre-IPO Investment Opportunity | Invest in the Future of AI',
  description:
    "Explore an exclusive opportunity to invest in OpenAI's private placement pre-IPO shares. Learn about OpenAI's market leadership, explosive growth, and path to becoming a publicly traded company. Join leading institutional investors in this transformative AI investment.",
  keywords: [
    'OpenAI',
    'pre-IPO',
    'investment',
    'AI',
    'artificial intelligence',
    'private placement',
    'OpenAI stock',
    'invest in OpenAI',
    'AI investment',
    'technology stocks',
    'venture capital',
    'institutional investment',
    'ChatGPT',
    'GPT-4',
    'machine learning',
    'startup investment',
  ],
  authors: [{ name: 'OpenAI Investment Team' }],
  creator: 'OpenAI Investment Team',
  publisher: 'OpenAI',
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
    url: 'https://openai-investment.com',
    title: 'OpenAI Pre-IPO Investment Opportunity | Invest in the Future of AI',
    description:
      "Explore an exclusive opportunity to invest in OpenAI's private placement pre-IPO shares. Join leading institutional investors in this transformative AI investment.",
    siteName: 'OpenAI Investment Opportunity',
    images: [
      {
        url: '/OpenAI_Logo.svg.png',
        width: 1200,
        height: 630,
        alt: 'OpenAI Pre-IPO Investment Opportunity',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'OpenAI Pre-IPO Investment Opportunity | Invest in the Future of AI',
    description:
      "Explore an exclusive opportunity to invest in OpenAI's private placement pre-IPO shares. Join leading institutional investors in this transformative AI investment.",
    images: ['/OpenAI_Logo.svg.png'],
    creator: '@openai',
  },
  alternates: {
    canonical: 'https://openai-investment.com',
  },
  category: 'Investment',
  classification: 'Investment Opportunity',
  referrer: 'origin-when-cross-origin',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://openai-investment.com'),
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
    google: 'your-google-verification-code',
    yandex: 'your-yandex-verification-code',
    yahoo: 'your-yahoo-verification-code',
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
        <meta name='application-name' content='OpenAI Investment' />
        <meta name='apple-mobile-web-app-title' content='OpenAI Investment' />
        <meta name='apple-mobile-web-app-capable' content='yes' />
        <meta name='apple-mobile-web-app-status-bar-style' content='default' />
        <meta name='mobile-web-app-capable' content='yes' />

        {/* Preconnect to external domains for performance */}
        <link rel='preconnect' href='https://fonts.googleapis.com' />
        <link
          rel='preconnect'
          href='https://fonts.gstatic.com'
          crossOrigin='anonymous'
        />

        {/* DNS prefetch for performance */}
        <link rel='dns-prefetch' href='https://fonts.googleapis.com' />
        <link rel='dns-prefetch' href='https://fonts.gstatic.com' />
      </head>
      <body className={inter.className}>
        <ThemeProvider attribute='class' defaultTheme='light' enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
