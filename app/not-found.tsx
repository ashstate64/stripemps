'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Home, ArrowLeft, Phone, Mail, TrendingUp, Users } from 'lucide-react';

export default function NotFound() {
  return (
    <div className='min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-gray-900 font-sans text-gray-200'>
      {/* Header */}
      <header className='border-b border-slate-800/50 bg-slate-950/95 backdrop-blur-xl'>
        <div className='mx-auto max-w-7xl px-4 py-4'>
          <div className='flex items-center'>
            <div className='mps-logo-container'>
              <Image
                src='/mps-logo.png'
                alt='MPS Limited Logo'
                width={32}
                height={32}
                className='mps-logo-image rounded-lg shadow-sm'
              />
            </div>
            <div className='ml-4'>
              <h1 className='bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-xl font-bold text-transparent'>
                Stripe Private Market
              </h1>
              <p className='text-xs text-gray-400'>Investment Opportunity</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className='flex min-h-[calc(100vh-80px)] items-center justify-center px-4 py-16'>
        <div className='mx-auto max-w-4xl text-center'>
          {/* Error Display */}
          <div className='mb-8'>
            <div className='mb-6 inline-block rounded-full bg-gradient-to-r from-red-600/20 to-orange-600/20 p-4'>
              <div className='text-6xl font-bold text-red-400'>404</div>
            </div>
            <h1 className='mb-4 text-4xl font-bold text-white md:text-5xl'>
              Page Not Found
            </h1>
            <p className='mb-8 text-xl text-gray-300'>
              The investment page you&apos;re looking for doesn&apos;t exist or
              has been moved.
            </p>
          </div>

          {/* Quick Actions */}
          <div className='mb-12 grid gap-6 md:grid-cols-3'>
            <Card className='border-slate-700 bg-slate-800/60 transition-all hover:bg-slate-700/60'>
              <CardHeader>
                <CardTitle className='flex items-center text-lg text-white'>
                  <Home className='mr-2 h-5 w-5 text-blue-400' />
                  Go Home
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className='mb-4 text-sm text-gray-400'>
                  Return to the main investment overview and opportunities.
                </p>
                <Button asChild variant='outline' className='w-full'>
                  <Link href='/'>
                    <Home className='mr-2 h-4 w-4' />
                    Home Page
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card className='border-slate-700 bg-slate-800/60 transition-all hover:bg-slate-700/60'>
              <CardHeader>
                <CardTitle className='flex items-center text-lg text-white'>
                  <TrendingUp className='mr-2 h-5 w-5 text-green-400' />
                  Investment Info
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className='mb-4 text-sm text-gray-400'>
                  View detailed financial data and investment opportunities.
                </p>
                <Button asChild variant='outline' className='w-full'>
                  <Link href='/#growth'>
                    <TrendingUp className='mr-2 h-4 w-4' />
                    View Data
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card className='border-slate-700 bg-slate-800/60 transition-all hover:bg-slate-700/60'>
              <CardHeader>
                <CardTitle className='flex items-center text-lg text-white'>
                  <Users className='mr-2 h-5 w-5 text-purple-400' />
                  Start Application
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className='mb-4 text-sm text-gray-400'>
                  Begin your pre-IPO investment application process.
                </p>
                <Button
                  asChild
                  className='w-full bg-gradient-to-r from-purple-600 to-blue-600'
                >
                  <Link href='/apply'>
                    <Users className='mr-2 h-4 w-4' />
                    Apply Now
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Contact Information */}
          <Card className='border-slate-700 bg-slate-800/40'>
            <CardHeader>
              <CardTitle className='text-white'>
                Need Investment Assistance?
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className='mb-6 text-gray-300'>
                Our investment team is available to help with any questions
                about Stripe private market opportunities.
              </p>
              <div className='flex flex-col gap-4 sm:flex-row sm:justify-center'>
                <Button asChild variant='outline'>
                  <a href='tel:+14378861252'>
                    <Phone className='mr-2 h-4 w-4' />
                    +1 (437) 886-1252
                  </a>
                </Button>
                <Button asChild variant='outline'>
                  <a href='mailto:admin@mpsfc.com'>
                    <Mail className='mr-2 h-4 w-4' />
                    Email Support
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Back Navigation */}
          <div className='mt-8'>
            <Button
              variant='ghost'
              onClick={() => window.history.back()}
              className='text-gray-400 hover:text-white'
            >
              <ArrowLeft className='mr-2 h-4 w-4' />
              Go Back
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}
