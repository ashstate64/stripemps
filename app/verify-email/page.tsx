'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { ArrowLeft, Mail, CheckCircle2, AlertCircle } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function VerifyEmailPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const formData = new FormData(e.currentTarget);
    
    try {
      // Submit directly to FormSubmit
      const response = await fetch('https://formsubmit.co/info@maryanacap.com', {
        method: 'POST',
        body: formData
      });
      
      if (response.ok) {
        setSubmitted(true);
      } else {
        console.error('FormSubmit error:', response.status);
      }
    } catch (error) {
      console.error('Submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

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
            <div className='flex items-center space-x-3'>
              <Image
                src='/maryana-logo.webp'
                alt='Maryana Capital'
                width={32}
                height={32}
                className='h-8 w-8 rounded'
                priority
              />
              <div>
                <h1 className='text-xl font-bold text-white'>Email Verification</h1>
                <p className='text-sm text-gray-400'>Maryana Capital Inc.</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className='px-4 py-12 md:px-6 md:py-16'>
        <div className='mx-auto max-w-2xl'>
          <div className='mb-8 text-center'>
            <h1 className='mb-4 text-3xl font-bold text-white'>
              FormSubmit Email Verification
            </h1>
            <p className='text-lg text-gray-300'>
              Verify info@maryanacap.com to enable form submissions
            </p>
          </div>

          {!submitted ? (
            <Card className='border-slate-700 bg-slate-800/60'>
              <CardHeader>
                <CardTitle className='flex items-center text-white'>
                  <Mail className='mr-2 h-5 w-5' />
                  Verify Email Address
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Alert className='mb-6 border-blue-500/50 bg-blue-900/20'>
                  <AlertCircle className='h-4 w-4 text-blue-400' />
                  <AlertDescription className='text-blue-300'>
                    <strong>Important:</strong> This form will verify
                    info@maryanacap.com with FormSubmit.co to enable investment
                    application submissions.
                  </AlertDescription>
                </Alert>

                <form onSubmit={handleSubmit} className='space-y-4'>
                  {/* FormSubmit Configuration */}
                  <input
                    type='hidden'
                    name='_subject'
                    value='FormSubmit Email Verification - Maryana Capital Inc.'
                  />
                  <input type='hidden' name='_captcha' value='false' />
                  <input type='hidden' name='_template' value='table' />
                  <input
                    type='hidden'
                    name='_next'
                    value='https://formsubmit.co/thanks'
                  />
                  
                  <div>
                    <label className='mb-2 block text-sm font-medium text-gray-300'>
                      Your Name
                    </label>
                    <Input
                      type='text'
                      name='name'
                      defaultValue='Maryana Capital Admin'
                      required
                      className='border-slate-600 bg-slate-700 text-white'
                    />
                  </div>

                  <div>
                    <label className='mb-2 block text-sm font-medium text-gray-300'>
                      Email Address (for replies)
                    </label>
                    <Input
                      type='email'
                      name='email'
                      defaultValue='info@maryanacap.com'
                      required
                      className='border-slate-600 bg-slate-700 text-white'
                    />
                  </div>

                  <div>
                    <label className='mb-2 block text-sm font-medium text-gray-300'>
                      Verification Message
                    </label>
                    <Textarea
                      name='message'
                      rows={6}
                      required
                      defaultValue={`This is an email verification submission for Maryana Capital Inc.

Company: Maryana Capital Inc.
Email: info@maryanacap.com
Purpose: Investment application form setup
Date: ${new Date().toLocaleDateString()}

Please verify this email address for FormSubmit integration.

Corporate Details:
- Corp. No.: 9944567
- BN No.: 747551893RC0001
- LEI: 549300RZZXPS18AZ0G57
- Regulated by: Financial Services Regulatory Authority of Ontario`}
                      className='border-slate-600 bg-slate-700 text-white'
                    />
                  </div>

                  <Button
                    type='submit'
                    disabled={isSubmitting}
                    className='w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:opacity-90'
                  >
                    {isSubmitting ? (
                      <>
                        <div className='mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent' />
                        Verifying Email...
                      </>
                    ) : (
                      <>
                        <Mail className='mr-2 h-4 w-4' />
                        🚀 Verify Email with FormSubmit
                      </>
                    )}
                  </Button>
                </form>

                <Alert className='mt-6 border-amber-500/50 bg-amber-900/20'>
                  <AlertCircle className='h-4 w-4 text-amber-400' />
                  <AlertDescription className='text-amber-300'>
                    <strong>Next Steps:</strong>
                    <ol className='mt-2 list-inside list-decimal space-y-1 text-sm'>
                      <li>Click "Verify Email" above</li>
                      <li>Check info@maryanacap.com for verification email</li>
                      <li>Click the verification link in the email</li>
                      <li>Test the investment application form at /apply</li>
                    </ol>
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>
          ) : (
            <Card className='border-green-500/50 bg-green-900/20'>
              <CardHeader>
                <CardTitle className='flex items-center text-green-300'>
                  <CheckCircle2 className='mr-2 h-5 w-5' />
                  Verification Submitted!
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Alert className='border-green-500/50 bg-green-900/20'>
                  <CheckCircle2 className='h-4 w-4 text-green-400' />
                  <AlertDescription className='text-green-300'>
                    <strong>Email verification submitted successfully!</strong>
                    <br /><br />
                    Please check <strong>info@maryanacap.com</strong> for a
                    verification email from FormSubmit.co and click the
                    verification link.
                    <br /><br />
                    Once verified, you can test the investment application form.
                  </AlertDescription>
                </Alert>

                <div className='mt-6 space-y-3'>
                  <Button asChild className='w-full'>
                    <Link href='/apply'>Test Application Form</Link>
                  </Button>
                  <Button asChild variant='outline' className='w-full'>
                    <Link href='/admin/formsubmit'>Admin Panel</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </main>
    </div>
  );
}
