'use client';

import { ApplicationWizard } from '@/components/application-form/application-wizard';
import { ArrowLeft, Shield, Phone, Mail } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
// Design system removed due to template literal issues
import { useState, useEffect } from 'react';

export default function ApplyPage() {
  const [showCookieNotice, setShowCookieNotice] = useState(false);

  useEffect(() => {
    // Check if user has already accepted cookies
    const cookiesAccepted = localStorage.getItem('cookiesAccepted');
    if (!cookiesAccepted) {
      setShowCookieNotice(true);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem('cookiesAccepted', 'true');
    setShowCookieNotice(false);
  };

  return (
    <div className='min-h-screen bg-white font-sans text-base leading-relaxed text-gray-700 selection:bg-blue-100 selection:text-blue-900'>
      {/* Mobile-Optimized Header */}
      <header className='sticky top-0 z-50 border-b border-gray-200 bg-white/95 shadow-sm backdrop-blur-xl'>
        <div className='mx-auto max-w-7xl px-3 py-2 sm:px-4 sm:py-3 md:px-8 md:py-4'>
          <div className='flex items-center justify-between gap-2'>
            {/* Back Navigation - Compact on mobile */}
            <Link href='/' aria-label='Go back to main page'>
              <Button
                variant='ghost'
                size='sm'
                className='min-h-[44px] min-w-[44px] p-2 text-gray-600 hover:bg-gray-100 hover:text-gray-900 sm:px-3 sm:py-2'
              >
                <ArrowLeft className='h-4 w-4 sm:mr-2' aria-hidden='true' />
                <span className='hidden sm:inline'>Back</span>
              </Button>
            </Link>

            {/* Compact Brand Identity */}
            <div className='flex flex-1 items-center justify-center space-x-2 sm:space-x-3'>
              <div className='mps-logo-container'>
                <img
                  src='/mps-logo.png'
                  alt='MPS Limited Logo'
                  width={24}
                  height={24}
                  className='mps-logo-image rounded-lg shadow-sm sm:h-7 sm:w-7 md:h-8 md:w-8'
                />
              </div>
              <div className='text-center'>
                <h1 className='text-sm font-bold text-gray-900 sm:text-base md:text-lg lg:text-xl'>
                  Stripe Pre-IPO
                </h1>
                <p className='text-xs text-gray-500 sm:block'>Application</p>
              </div>
            </div>

            {/* Compact Trust Badge */}
            <div className='flex items-center rounded-md bg-green-100 px-1 py-1 text-xs text-green-700 sm:px-2'>
              <Shield className='h-3 w-3 sm:mr-1' />
              <span className='hidden sm:inline'>ASIC</span>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile-Optimized Main Content */}
      <main className='px-3 py-4 sm:px-4 sm:py-6 md:px-6 md:py-12 lg:py-16'>
        <div className='mx-auto mb-4 max-w-4xl text-center sm:mb-6 md:mb-8'>
          <div className='mb-4 sm:mb-6'>
            <h1 className='text-4xl font-bold leading-tight text-gray-900 md:text-5xl lg:text-6xl xl:text-5xl'>
              Stripe Private Market Investment Application
            </h1>
            <p className='mt-2 text-lg leading-relaxed text-gray-700 sm:mt-4 md:text-lg lg:text-xl'>
              Access exclusive private market allocation in the leading fintech
              platform. Stripe is private - no official stock price exists.
            </p>
            <div className='mt-4 flex items-center justify-center gap-2 text-xs text-blue-600 sm:text-sm'>
              <Shield className='h-4 w-4' />
              <span>Secure • Encrypted • Confidential</span>
            </div>
          </div>

          {/* Mobile-Optimized Key Points */}
          <div className='mb-4 grid grid-cols-3 gap-2 sm:mb-6 sm:gap-3 md:mb-8 md:gap-4'>
            <div className='rounded-md border border-gray-200 bg-white p-2 text-center shadow-sm sm:rounded-lg sm:p-3 md:p-4'>
              <div className='text-lg font-bold text-blue-600 sm:text-xl md:text-2xl'>
                $91.5B
              </div>
              <div className='text-xs text-gray-500 sm:text-sm'>
                <span className='sm:hidden'>Tender Offer</span>
                <span className='hidden sm:inline'>Latest Tender Offer</span>
              </div>
            </div>
            <div className='rounded-md border border-gray-200 bg-white p-2 text-center shadow-sm sm:rounded-lg sm:p-3 md:p-4'>
              <div className='text-lg font-bold text-blue-600 sm:text-xl md:text-2xl'>
                $10K AUD
              </div>
              <div className='text-xs text-gray-500 sm:text-sm'>
                <span className='sm:hidden'>Minimum</span>
                <span className='hidden sm:inline'>Minimum Investment</span>
              </div>
            </div>
            <div className='rounded-md border border-gray-200 bg-white p-2 text-center shadow-sm sm:rounded-lg sm:p-3 md:p-4'>
              <div className='text-lg font-bold text-green-600 sm:text-xl md:text-2xl'>
                Private
              </div>
              <div className='text-xs text-gray-500 sm:text-sm'>
                <span className='sm:hidden'>Company</span>
                <span className='hidden sm:inline'>Private Company</span>
              </div>
            </div>
          </div>
        </div>

        <ApplicationWizard />
      </main>

      {/* Professional Footer */}
      <footer className='border-t border-slate-800 bg-slate-900/95 px-4 py-8 text-center'>
        <div className='mx-auto max-w-6xl'>
          <div className='mb-6 grid grid-cols-1 gap-6 md:grid-cols-2'>
            {/* Contact Info */}
            <div className='rounded-lg bg-slate-800/40 p-4'>
              <h4 className='mb-3 text-lg font-semibold text-white'>
                Need Help?
              </h4>
              <div className='space-y-2 text-sm'>
                <p className='flex items-center justify-center md:justify-start'>
                  <Phone className='mr-2 h-4 w-4 text-blue-400' />
                  <a
                    href='tel:+61385779534'
                    className='text-blue-400 hover:text-blue-300'
                  >
                    +61 3 8577 9534
                  </a>
                </p>
                <p className='flex items-center justify-center md:justify-start'>
                  <Mail className='mr-2 h-4 w-4 text-blue-400' />
                  <a
                    href='mailto:admin@mpsfc.com'
                    className='text-blue-400 hover:text-blue-300'
                  >
                    admin@mpsfc.com
                  </a>
                </p>
              </div>
            </div>

            {/* Security Notice */}
            <div className='rounded-lg bg-slate-800/40 p-4'>
              <h4 className='mb-3 text-lg font-semibold text-white'>
                Application Security
              </h4>
              <div className='text-sm text-gray-300'>
                <p>All information is encrypted and securely transmitted.</p>
                <p className='mt-1 text-xs text-gray-400'>
                  Protected by industry-standard SSL encryption.
                </p>
              </div>
            </div>
          </div>

          {/* Legal Notice */}
          <div className='border-t border-slate-700 pt-6'>
            <p className='text-xs text-gray-500'>
              This application does not constitute an offer to sell or purchase
              securities. Investment opportunities are subject to availability
              and investor qualification.
            </p>
            <p className='mt-2 text-xs text-gray-600'>
              &copy; {new Date().getFullYear()} Managed Portfolio Services
              Limited. All rights reserved.
            </p>
          </div>
        </div>
      </footer>

      {/* Cookie Notice */}
      {showCookieNotice && (
        <div className='fixed bottom-0 left-0 right-0 z-50 bg-slate-900/95 p-4 shadow-lg backdrop-blur-sm'>
          <div className='mx-auto flex max-w-6xl items-center justify-between'>
            <div className='flex-1'>
              <p className='text-sm text-gray-300'>
                We use cookies to enhance your experience and analyze site
                usage.{' '}
                <Link
                  href='#'
                  className='text-blue-400 underline hover:text-blue-300'
                >
                  Learn more
                </Link>
              </p>
            </div>
            <div className='ml-4 flex space-x-2'>
              <Button
                size='sm'
                variant='outline'
                onClick={() => setShowCookieNotice(false)}
                className='border-gray-500 text-xs text-gray-300 hover:bg-gray-700 hover:text-white'
              >
                Decline
              </Button>
              <Button
                size='sm'
                onClick={acceptCookies}
                className='bg-blue-600 text-xs hover:bg-blue-700'
              >
                Accept
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
