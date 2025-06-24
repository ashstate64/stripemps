'use client';

import { ApplicationWizard } from '@/components/application-form/application-wizard';
import { ArrowLeft, Shield, Phone, Mail } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
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
    <div className='min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-gray-900 font-sans text-gray-200'>
      {/* Professional Header with Back Navigation */}
      <header className='sticky top-0 z-50 border-b border-slate-800/50 bg-slate-950/95 shadow-2xl backdrop-blur-xl'>
        <div className='mx-auto max-w-7xl px-4 py-4 md:px-8'>
          <div className='flex items-center justify-between'>
            {/* Back Navigation */}
            <div className='flex items-center space-x-4'>
              <Link href='/'>
                <Button
                  variant='ghost'
                  size='sm'
                  className='text-gray-300 hover:bg-slate-800 hover:text-white'
                >
                  <ArrowLeft className='mr-2 h-4 w-4' />
                  Back to Overview
                </Button>
              </Link>
            </div>

            {/* Brand Identity */}
            <div className='flex items-center space-x-3'>
              <div className='openai-logo-container'>
                <Image
                  src='/OpenAI_Logo.svg.png'
                  alt='OpenAI Logo'
                  width={32}
                  height={32}
                  className='openai-logo-image md:h-8 md:w-8'
                />
              </div>
              <div>
                <h1 className='bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-lg font-bold text-transparent md:text-xl'>
                  OpenAI Pre-IPO
                </h1>
                <p className='text-xs text-gray-400'>Investment Application</p>
              </div>
            </div>

            {/* Trust Badge */}
            <div className='flex items-center space-x-2'>
              <div className='flex items-center rounded-md bg-green-900/30 px-2 py-1 text-xs text-green-300'>
                <Shield className='mr-1 h-3 w-3' />
                <span className='hidden sm:inline'>Secure Application</span>
                <span className='sm:hidden'>Secure</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className='px-4 py-12 md:px-6 md:py-16'>
        <div className='mx-auto mb-8 max-w-4xl text-center'>
          <div className='mb-6'>
            <h1 className='bg-gradient-to-r from-white to-gray-300 bg-clip-text text-3xl font-bold text-transparent md:text-4xl lg:text-5xl'>
              OpenAI Pre-IPO Investment Application
            </h1>
            <p className='mt-4 text-lg text-gray-300 md:text-xl'>
              Secure your allocation in the most anticipated AI investment
              opportunity.
            </p>
          </div>

          {/* Key Points */}
          <div className='mb-8 grid grid-cols-1 gap-4 md:grid-cols-3'>
            <div className='rounded-lg bg-slate-800/40 p-4 text-center'>
              <div className='text-2xl font-bold text-green-400'>$300B</div>
              <div className='text-sm text-gray-400'>Current Valuation</div>
            </div>
            <div className='rounded-lg bg-slate-800/40 p-4 text-center'>
              <div className='text-2xl font-bold text-blue-400'>$50K</div>
              <div className='text-sm text-gray-400'>Minimum Investment</div>
            </div>
            <div className='rounded-lg bg-slate-800/40 p-4 text-center'>
              <div className='text-2xl font-bold text-purple-400'>2025</div>
              <div className='text-sm text-gray-400'>Expected IPO</div>
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
                    href='tel:+14375235816'
                    className='text-blue-400 hover:text-blue-300'
                  >
                    +1 437 523 5816
                  </a>
                </p>
                <p className='flex items-center justify-center md:justify-start'>
                  <Mail className='mr-2 h-4 w-4 text-blue-400' />
                  <a
                    href='mailto:accounts@cgfinancialcanada.ca'
                    className='text-blue-400 hover:text-blue-300'
                  >
                    accounts@cgfinancialcanada.ca
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
              &copy; {new Date().getFullYear()} CG Financial Canada. All rights
              reserved.
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
                usage.
                <Link
                  href='#'
                  className='ml-1 text-blue-400 hover:text-blue-300'
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
                className='text-xs'
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
