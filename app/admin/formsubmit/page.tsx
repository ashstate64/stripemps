'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import {
  CheckCircle2,
  XCircle,
  Loader2,
  Key,
  TestTube,
  Database,
  ArrowLeft,
  Mail,
  Settings,
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

interface Submission {
  form_data?: { name?: string; email?: string };
  submitted_at?: { date?: string };
}

interface Action {
  action: string;
  description: string;
}

interface ApiResponse {
  success: boolean;
  message: string;
  submissions?: Submission[];
  availableActions?: Action[];
  [key: string]: unknown;
}

export default function FormSubmitAdminPage() {
  const [loading, setLoading] = useState<string | null>(null);
  const [results, setResults] = useState<Record<string, ApiResponse>>({});
  const [email, setEmail] = useState('info@maryanacap.com');

  const handleApiCall = async (
    action: string,
    params?: Record<string, string>
  ): Promise<void> => {
    setLoading(action);
    try {
      const searchParams = new URLSearchParams({ action, ...params });
      const response = await fetch(`/api/formsubmit?${searchParams}`);
      const data = await response.json();

      setResults((prev) => ({ ...prev, [action]: data }));
    } catch (error) {
      setResults((prev) => ({
        ...prev,
        [action]: {
          success: false,
          message: error instanceof Error ? error.message : 'Unknown error',
        },
      }));
    } finally {
      setLoading(null);
    }
  };

  const ResultCard = ({
    title,
    action,
    icon: Icon,
    description,
  }: {
    title: string;
    action: string;
    icon: React.ComponentType<{ className?: string }>;
    description: string;
  }) => {
    const result = results[action];
    const isLoading = loading === action;

    return (
      <Card className='border-slate-700 bg-slate-800/60 shadow-lg transition-shadow hover:shadow-xl'>
        <CardHeader>
          <CardTitle className='flex items-center text-white'>
            <Icon className='mr-2 h-5 w-5' />
            {title}
          </CardTitle>
          <p className='text-sm text-gray-400'>{description}</p>
        </CardHeader>
        <CardContent>
          {action === 'get-api-key' ? (
            <div className='space-y-4'>
              <div>
                <label className='text-sm font-medium text-gray-300'>
                  Email Address
                </label>
                <Input
                  type='email'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder='Enter your email'
                  className='mt-1 border-slate-600 bg-slate-700 text-white'
                />
              </div>
              <Button
                onClick={() => handleApiCall(action, { email })}
                disabled={isLoading || !email}
                className='w-full'
              >
                {isLoading ? (
                  <>
                    <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                    Requesting...
                  </>
                ) : (
                  <>
                    <Key className='mr-2 h-4 w-4' />
                    Request API Key
                  </>
                )}
              </Button>
            </div>
          ) : (
            <Button
              onClick={() => handleApiCall(action)}
              disabled={isLoading}
              className='w-full'
            >
              {isLoading ? (
                <>
                  <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                  Testing...
                </>
              ) : (
                <>
                  <Icon className='mr-2 h-4 w-4' />
                  {title}
                </>
              )}
            </Button>
          )}

          {result && (
            <Alert
              className={`mt-4 ${result.success ? 'border-green-500/50 bg-green-900/20' : 'border-red-500/50 bg-red-900/20'}`}
            >
              <div className='flex items-start'>
                {result.success ? (
                  <CheckCircle2 className='mr-3 mt-0.5 h-4 w-4 flex-shrink-0 text-green-500' />
                ) : (
                  <XCircle className='mr-3 mt-0.5 h-4 w-4 flex-shrink-0 text-red-500' />
                )}
                <div className='flex-1'>
                  <AlertDescription
                    className={
                      result.success ? 'text-green-300' : 'text-red-300'
                    }
                  >
                    {result.message}
                  </AlertDescription>

                  {result.submissions && Array.isArray(result.submissions) && (
                    <div className='mt-3'>
                      <p className='mb-2 text-sm font-medium'>
                        Recent Submissions:
                      </p>
                      <div className='max-h-40 space-y-2 overflow-y-auto'>
                        {result.submissions
                          .slice(0, 5)
                          .map((submission: Submission, index: number) => (
                            <div
                              key={index}
                              className='rounded border border-slate-600 bg-slate-800/50 p-2 text-xs'
                            >
                              <p>
                                <strong>Name:</strong>{' '}
                                {submission.form_data?.name || 'N/A'}
                              </p>
                              <p>
                                <strong>Email:</strong>{' '}
                                {submission.form_data?.email || 'N/A'}
                              </p>
                              <p>
                                <strong>Date:</strong>{' '}
                                {submission.submitted_at?.date || 'N/A'}
                              </p>
                            </div>
                          ))}
                      </div>
                    </div>
                  )}

                  {result.availableActions &&
                    Array.isArray(result.availableActions) && (
                      <div className='mt-3'>
                        <p className='mb-2 text-sm font-medium'>
                          Available Actions:
                        </p>
                        <div className='space-y-1'>
                          {result.availableActions.map(
                            (action: Action, index: number) => (
                              <div
                                key={index}
                                className='rounded border border-slate-600 bg-slate-800/50 p-2 text-xs'
                              >
                                <Badge
                                  variant='outline'
                                  className='mr-2 text-xs'
                                >
                                  {action.action}
                                </Badge>
                                {action.description}
                              </div>
                            )
                          )}
                        </div>
                      </div>
                    )}
                </div>
              </div>
            </Alert>
          )}
        </CardContent>
      </Card>
    );
  };

  return (
    <div className='min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-gray-900 font-sans text-gray-200'>
      {/* Header */}
      <header className='border-b border-slate-800/50 bg-slate-950/95 backdrop-blur-xl'>
        <div className='mx-auto max-w-7xl px-4 py-4'>
          <div className='flex items-center justify-between'>
            <div className='flex items-center space-x-4'>
              <Link href='/'>
                <Button
                  variant='ghost'
                  size='sm'
                  className='text-gray-300 hover:bg-slate-800 hover:text-white'
                >
                  <ArrowLeft className='mr-2 h-4 w-4' />
                  Back to Application
                </Button>
              </Link>
            </div>
            <div className='flex items-center space-x-3'>
              <Image
                src='/maryana-logo.webp'
                alt='Maryana Capital'
                width={32}
                height={32}
                className='h-8 w-8 rounded'
                priority
              />
              <div className='flex flex-col leading-tight'>
                <span className='text-xs font-medium tracking-wide text-gray-400'>
                  Maryana Capital
                </span>
                <h1 className='text-xl font-bold text-white'>
                  FormSubmit Admin
                </h1>
              </div>
              <Settings className='ml-2 h-6 w-6 text-gray-400' />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className='px-4 py-12 md:px-6 md:py-16'>
        <div className='mx-auto max-w-6xl'>
          <div className='mb-8 text-center'>
            <h1 className='mb-4 text-3xl font-bold text-white'>
              FormSubmit Integration Management
            </h1>
            <p className='mx-auto max-w-2xl text-lg text-gray-300'>
              Test your FormSubmit integration, manage API keys, and view form
              submissions for the OpenAI investment application.
            </p>
          </div>

          {/* Environment Variables Info */}
          <Card className='mb-8 border-blue-500/30 bg-blue-900/10 shadow-md'>
            <CardHeader>
              <CardTitle className='flex items-center text-blue-300'>
                <Settings className='mr-2 h-5 w-5' />
                Environment Configuration
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className='space-y-3 text-sm'>
                <div className='flex items-center justify-between'>
                  <span className='text-gray-300'>FORMSUBMIT_EMAIL:</span>
                  <Badge variant='outline' className='font-mono'>
                    {process.env.NEXT_PUBLIC_FORMSUBMIT_EMAIL ||
                      'info@maryanacap.com'}
                  </Badge>
                </div>
                <div className='flex items-center justify-between'>
                  <span className='text-gray-300'>FORMSUBMIT_API_KEY:</span>
                  <Badge
                    variant={
                      process.env.FORMSUBMIT_API_KEY ? 'default' : 'destructive'
                    }
                  >
                    {process.env.FORMSUBMIT_API_KEY ? 'Configured' : 'Not Set'}
                  </Badge>
                </div>
              </div>
              <Alert className='mt-4 border-amber-500/50 bg-amber-900/20'>
                <Mail className='h-4 w-4 text-amber-500' />
                <AlertDescription className='text-amber-300'>
                  <strong>Setup Instructions:</strong>
                  <ol className='mt-2 list-inside list-decimal space-y-1 text-sm'>
                    <li>Request an API key using your email below</li>
                    <li>Check your email for the API key</li>
                    <li>
                      Add <code>FORMSUBMIT_API_KEY=your_key_here</code> to your{' '}
                      <code>.env.local</code> file
                    </li>
                    <li>
                      Add{' '}
                      <code>
                        FORMSUBMIT_EMAIL=info@maryanacap.com
                      </code>{' '}
                      to your <code>.env.local</code> file
                    </li>
                    <li>Restart your Next.js development server</li>
                  </ol>
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>

          {/* Test Actions Grid */}
          <div className='grid gap-6 md:grid-cols-3'>
            <ResultCard
              title='Test Connection'
              action='test'
              icon={TestTube}
              description='Test if FormSubmit is responding and accepting form submissions'
            />

            <ResultCard
              title='Request API Key'
              action='get-api-key'
              icon={Key}
              description='Request a FormSubmit API key for managing submissions'
            />

            <ResultCard
              title='Get Submissions'
              action='get-submissions'
              icon={Database}
              description='Retrieve all form submissions (requires API key)'
            />
          </div>

          {/* Instructions */}
          <Card className='mt-8 border-slate-700 bg-slate-800/40 shadow-md'>
            <CardHeader>
              <CardTitle className='text-white'>
                How to Use This Admin Panel
              </CardTitle>
            </CardHeader>
            <CardContent className='space-y-4 text-gray-300'>
              <div>
                <h3 className='mb-2 font-semibold text-white'>
                  1. Test Connection
                </h3>
                <p className='text-sm'>
                  Verify that your application can successfully send test data
                  to FormSubmit. This ensures the basic integration is working.
                </p>
              </div>

              <div>
                <h3 className='mb-2 font-semibold text-white'>
                  2. Request API Key
                </h3>
                <p className='text-sm'>
                  Get your FormSubmit API key to access advanced features like
                  retrieving submissions. Enter your email and check your inbox
                  for the key.
                </p>
              </div>

              <div>
                <h3 className='mb-2 font-semibold text-white'>
                  3. View Submissions
                </h3>
                <p className='text-sm'>
                  Once you have an API key configured, you can retrieve and view
                  all form submissions made through your OpenAI investment
                  application.
                </p>
              </div>

              <Alert className='border-green-500/50 bg-green-900/20'>
                <CheckCircle2 className='h-4 w-4 text-green-500' />
                <AlertDescription className='text-green-300'>
                  <strong>Pro Tip:</strong> Always test the connection before
                  going live. Make sure to save your API key in environment
                  variables for production use.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
