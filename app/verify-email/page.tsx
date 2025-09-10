'use client';

import { CheckCircle2, ArrowLeft, Mail, Phone } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';

export default function VerifyEmailPage() {
  return (
    <div className='min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-gray-900 font-sans text-gray-200'>
      {/* Header */}
      <header className='border-b border-slate-800/50 bg-slate-950/95 backdrop-blur-xl'>
        <div className='mx-auto max-w-7xl px-4 py-4'>
          <div className='flex items-center justify-between'>
            <Link href='/'>
              <Button
                variant='ghost'
                size='sm'
                className='text-gray-300 hover:bg-slate-800 hover:text-white'
              >
                <ArrowLeft className='mr-2 h-4 w-4' />
                Back to Home
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className='flex min-h-[calc(100vh-80px)] items-center justify-center px-4 py-12'>
        <Card className='w-full max-w-2xl border-green-500/30 bg-slate-800/70 shadow-2xl'>
          <CardHeader className='border-b border-green-500/20 bg-gradient-to-r from-green-900/20 to-blue-900/20 text-center'>
            <div className='mb-4 flex justify-center'>
              <CheckCircle2 className='h-20 w-20 text-green-500' />
            </div>
            <CardTitle className='text-3xl font-bold text-white'>
              ✅ Application Submitted Successfully!
            </CardTitle>
            <CardDescription className='text-lg text-green-300'>
              Your Databricks Pre-IPO investment application has been received
            </CardDescription>
          </CardHeader>

          <CardContent className='p-8 text-center'>
            <div className='mb-6 rounded-xl border border-green-500/30 bg-slate-700/50 p-6'>
              <h3 className='mb-4 text-xl font-semibold text-white'>
                What Happens Next?
              </h3>
              <div className='space-y-4 text-left'>
                <div className='flex items-start space-x-3'>
                  <div className='mt-0.5 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-blue-500 text-sm font-bold text-white'>
                    1
                  </div>
                  <div>
                    <p className='font-medium text-white'>Application Review</p>
                    <p className='text-sm text-gray-400'>
                      Our team will review your application and verify your
                      accredited investor status within 2-3 business days
                    </p>
                  </div>
                </div>
                <div className='flex items-start space-x-3'>
                  <div className='mt-0.5 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-blue-500 text-sm font-bold text-white'>
                    2
                  </div>
                  <div>
                    <p className='font-medium text-white'>Initial Contact</p>
                    <p className='text-sm text-gray-400'>
                      A representative will contact you to discuss investment
                      details and next steps
                    </p>
                  </div>
                </div>
                <div className='flex items-start space-x-3'>
                  <div className='mt-0.5 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-blue-500 text-sm font-bold text-white'>
                    3
                  </div>
                  <div>
                    <p className='font-medium text-white'>Investment Process</p>
                    <p className='text-sm text-gray-400'>
                      Complete final documentation and fund your investment
                      allocation
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className='mb-6 rounded-xl bg-slate-700/30 p-6'>
              <h3 className='mb-4 text-lg font-semibold text-white'>
                Important Information
              </h3>
              <div className='space-y-2 text-sm text-gray-300'>
                <p>
                  • Your application has been securely transmitted to our
                  investment team
                </p>
                <p>
                  • All submitted documents and information are encrypted and
                  confidential
                </p>
                <p>
                  • Investment allocations are subject to availability and
                  verification
                </p>
                <p>• Minimum investment: $10,000 CAD for qualified investors</p>
              </div>
            </div>

            {/* Contact Information */}
            <div className='border-t border-slate-700 pt-6'>
              <h3 className='mb-4 text-lg font-semibold text-white'>
                Questions? Contact Our Investment Team
              </h3>
              <div className='flex flex-col space-y-3 sm:flex-row sm:justify-center sm:space-x-8 sm:space-y-0'>
                <a
                  href='tel:+14378861252'
                  className='flex items-center justify-center space-x-2 text-blue-400 transition-colors hover:text-blue-300'
                >
                  <Phone className='h-4 w-4' />
                  <span>+1 (437) 886-1252</span>
                </a>
                <a
                  href='mailto:admin@mpsfc.com'
                  className='flex items-center justify-center space-x-2 text-blue-400 transition-colors hover:text-blue-300'
                >
                  <Mail className='h-4 w-4' />
                  <span>admin@mpsfc.com</span>
                </a>
              </div>
            </div>

            <div className='mt-8 flex flex-col justify-center gap-4 sm:flex-row'>
              <Button
                asChild
                variant='outline'
                className='border-gray-600 hover:bg-slate-700'
              >
                <Link href='/'>Return to Overview</Link>
              </Button>
              <Button
                asChild
                className='bg-gradient-to-r from-green-600 to-blue-600 hover:opacity-90'
              >
                <Link href='/apply'>Submit Another Application</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
