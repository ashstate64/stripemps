'use client';

import Image from 'next/image';
import Link from 'next/link'; // Import Link
import { useState, useEffect, type ReactElement } from 'react';
import { Button } from '@/components/ui/button';
// Card components removed as they're not used directly in this component
import { Separator } from '@/components/ui/separator';
import { ValuationGrowthChart } from '@/components/charts/valuation-growth-chart';
import { RevenueProjectionChart } from '@/components/charts/revenue-projection-chart';
import { PeerComparisonChart } from '@/components/charts/peer-comparison-chart';
import { FundingTimelineVertical } from '@/components/sections/funding-timeline-vertical';
import { SecondaryMarketActivitySection } from '@/components/sections/secondary-market-activity-section';
import { LeadershipSection } from '@/components/sections/leadership-section';
// Removed: import { ApplicationWizard } from "@/components/application-form/application-wizard"
import {
  TrendingUp,
  Target,
  DollarSign,
  Zap,
  ShieldAlert,
  Lightbulb,
  UsersRound,
  Rocket,
  Landmark,
  Mail,
  Phone,
  MapPin,
  Menu,
  X,
  BarChart3,
} from 'lucide-react';

// TypeScript interfaces for better type safety
interface Visual {
  title: string;
  component: ReactElement;
  explanation: string;
}

interface Stat {
  label: string;
  value: string;
}

interface MajorHolder {
  name: string;
  logo?: string | null;
  entry: string;
  stake: string;
  bgColor?: string;
  stakeColor?: string;
  entryColor?: string;
}

interface Section {
  id: string;
  icon?: ReactElement;
  title?: string;
  content?: string;
  visuals?: Visual[];
  points?: string[];
  stats?: Stat[];
  majorHolders?: MajorHolder[];
  footerNote?: string;
  benefits?: string[];
}

// Type definitions complete - ready for component

export default function DigitalBrochurePage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
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

  const sections: Section[] = [
    {
      id: 'opportunity',
      icon: <Lightbulb className='mb-4 h-10 w-10 text-primary' />,
      title: 'Investment Thesis: The OpenAI Opportunity',
      content:
        'OpenAI represents a generational investment opportunity in the artificial general intelligence (AGI) sector. With breakthrough products like GPT-4, DALL·E, and Sora, the company has achieved unprecedented scale and market penetration, positioning itself as the dominant force in the $1.3 trillion AI market.',
      points: [
        'Market-leading AGI technology with clear competitive moats and network effects',
        'Exponential user adoption: ChatGPT reached 100M users in just 2 months',
        'Strategic partnership with Microsoft provides $13B+ in funding and compute infrastructure',
        'Experienced leadership team with proven track record in scaling technology companies',
      ],
    },
    {
      id: 'growth',
      icon: <TrendingUp className='mb-4 h-10 w-10 text-primary' />,
      title: 'Financial Performance: Exceptional Growth Trajectory',
      content:
        "OpenAI's financial metrics demonstrate extraordinary growth, with revenue scaling from ~$200M in 2023 to a projected $11.6B in 2025. The company's valuation has increased 15x since 2021, reflecting strong investor confidence and market validation.",
      visuals: [
        {
          title: 'Valuation Growth Analysis',
          component: <ValuationGrowthChart />,
          explanation:
            "OpenAI's valuation trajectory shows consistent exponential growth, reaching ~$300B by March 2025. This 15x increase since 2021 demonstrates sustained investor confidence and market validation of the company's AI leadership position.",
        },
        {
          title: 'Revenue Projections & Monetization',
          component: <RevenueProjectionChart />,
          explanation:
            'Revenue growth from $200M (2023) to projected $11.6B (2025) represents a 58x increase over two years, driven by enterprise API adoption, ChatGPT subscriptions, and strategic partnerships.',
        },
      ],
      stats: [
        { label: 'Current Valuation (Mar 2025)', value: '~$300 Billion' },
        { label: 'Total Capital Raised', value: '$58+ Billion' },
        { label: '2025 Revenue Projection', value: '$11.6 Billion' },
        { label: 'Revenue Growth (2023-2025)', value: '5,800%' },
      ],
    },
    {
      id: 'market-leadership',
      icon: <Target className='mb-4 h-10 w-10 text-primary' />,
      title: 'Market Position: Dominant AI Platform Leader',
      content:
        "OpenAI maintains a commanding lead in the generative AI sector, with a market capitalization that exceeds its nearest competitor by 5x. The company's technological superiority, extensive developer ecosystem, and first-mover advantages create sustainable competitive moats.",
      visuals: [
        {
          title: 'Competitive Landscape Analysis',
          component: <PeerComparisonChart />,
          explanation:
            "OpenAI's ~$300B valuation significantly exceeds competitors including Anthropic (~$60B), demonstrating clear market leadership and investor preference for the company's comprehensive AI platform.",
        },
      ],
      points: [
        'Market capitalization 5x larger than nearest competitor (Anthropic)',
        'Comprehensive developer ecosystem with 2M+ API developers',
        'Continuous innovation pipeline ensuring sustained technological leadership',
        'Strong regulatory relationships and compliance framework',
      ],
    },
    {
      id: 'investors',
      icon: <UsersRound className='mb-4 h-10 w-10 text-primary' />,
      title: 'Institutional Backing: World-Class Investor Portfolio',
      content:
        "OpenAI's investor base includes the world's most sophisticated technology and financial institutions. With $58+ billion in total funding, the company has attracted backing from Microsoft, SoftBank, Thrive Capital, and other premier investment firms, providing both capital and strategic value.",
      majorHolders: [
        {
          name: 'Microsoft Corporation',
          logo: '/logos/microsoft-logo.jpg',
          entry: '$1B initial + $12B+ follow-on investments + compute credits',
          stake: '≈49% (subject to 10x return cap)',
          bgColor: 'bg-white',
        },
        {
          name: 'SoftBank Vision Fund',
          logo: '/logos/softbank-logo.png',
          entry: 'Up to $40B (2024-25) convertible preferred shares',
          stake: 'Up to ≈10% (if fully converted)',
          bgColor: 'bg-[#00402E]',
          stakeColor: 'text-green-300',
          entryColor: 'text-gray-300',
        },
        {
          name: 'Thrive Capital',
          logo: '/logos/thrive-capital-logo.png',
          entry: 'Led $6.6B Series funding + $1B follow-on option',
          stake: '≈3%',
          bgColor: 'bg-gray-100',
        },
        {
          name: 'Khosla Ventures',
          logo: '/logos/khosla-ventures-logo.png',
          entry: 'Series investor since early rounds',
          stake: '≈2%',
          bgColor: 'bg-gray-100',
        },
        {
          name: 'NVIDIA Corporation',
          logo: '/logos/nvidia-logo.jpg',
          entry: 'Strategic technology partner and investor',
          stake: '<2%',
          bgColor: 'bg-white',
        },
        {
          name: 'Additional Institutional Investors',
          logo: null,
          entry: 'Includes Altimeter, Fidelity, MGX (Abu Dhabi)',
          stake: 'Combined single-digit percentage',
        },
      ],
      footerNote:
        '*Ownership percentages are estimates based on disclosed funding rounds and may change following corporate restructuring and IPO. Source: Public filings and press releases.',
    },
    {
      id: 'ipo-path',
      icon: <Landmark className='mb-4 h-10 w-10 text-primary' />,
      title: 'Path to Liquidity: Strategic IPO Preparation',
      content:
        'OpenAI is strategically positioning for public markets through corporate restructuring and governance optimization. The company is transitioning to a Public Benefit Corporation structure while maintaining its mission-driven approach, setting the foundation for a landmark IPO.',
      points: [
        'Active restructuring from LP to Public Benefit Corporation (PBC) for IPO readiness',
        'Recent $40B funding round viewed by analysts as "pre-IPO" capital raising',
        'Strong IPO market demand with institutional pre-registration of interest',
        'Strategic alignment with Microsoft and other partners for public market transition',
      ],
    },
    {
      id: 'why-invest',
      icon: <DollarSign className='mb-4 h-10 w-10 text-primary' />,
      title: 'Investment Rationale: Compelling Value Proposition',
      content:
        'Pre-IPO investment in OpenAI offers accredited investors exposure to the defining technology company of the AI era. With limited liquidity events in the AI sector, this opportunity provides early access to a generational investment before public market availability.',
      benefits: [
        'Exceptional growth potential in the rapidly expanding $1.3T global AI market',
        'Pre-IPO pricing advantage with potential for significant returns upon liquidity',
        'Portfolio diversification into transformative artificial intelligence technology',
        'Limited availability - exclusive access for qualified accredited investors only',
      ],
    },
  ];

  const orderedSections = [
    sections.find((s) => s.id === 'opportunity'),
    sections.find((s) => s.id === 'growth'),
    { id: 'funding-timeline', component: <FundingTimelineVertical /> },
    { id: 'secondary-market', component: <SecondaryMarketActivitySection /> },
    sections.find((s) => s.id === 'market-leadership'),
    { id: 'leadership', component: <LeadershipSection /> },
    sections.find((s) => s.id === 'investors'),
    sections.find((s) => s.id === 'ipo-path'),
    sections.find((s) => s.id === 'why-invest'),
  ].filter(Boolean);

  return (
    <div className='min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-gray-900 font-sans text-gray-200'>
      <header className='sticky top-0 z-50 border-b border-slate-800/50 bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 shadow-2xl backdrop-blur-xl'>
        <div className='mx-auto max-w-7xl'>
          {/* Top notification bar - Mobile optimized */}
          <div className='border-b border-slate-800/30 bg-gradient-to-r from-purple-900/20 to-blue-900/20 px-2 py-1 text-center sm:px-4 sm:py-2'>
            <p className='text-xs text-gray-300 sm:text-xs'>
              <span className='mr-1 inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-green-400 sm:mr-2 sm:h-2 sm:w-2'></span>
              <strong className='text-white'>Live Opportunity</strong>
              <span className='hidden sm:inline'>
                {' '}
                - Limited allocation available for Q1 2025
              </span>
              <span className='ml-1 text-purple-300 sm:ml-2'>
                <span className='hidden sm:inline'>• Minimum: $50K • </span>
                Close: Mar 31st
              </span>
            </p>
          </div>

          {/* Main navigation - Mobile optimized */}
          <div className='flex items-center justify-between px-3 py-2 sm:px-4 sm:py-4 md:px-8'>
            {/* Enhanced Brand Identity with Trust Badges - Mobile optimized */}
            <div className='flex items-center space-x-2 sm:space-x-4'>
              <div className='openai-logo-container'>
                <Image
                  src='/placeholder-logo.svg'
                  alt='Maryana Capital Inc. Logo'
                  width={32}
                  height={32}
                  className='openai-logo-image sm:h-10 sm:w-10 md:h-10 md:w-10'
                />
              </div>
              <div>
                <div className='flex items-center space-x-2 sm:space-x-3'>
                  <div>
                    <h1 className='bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-lg font-bold text-transparent sm:text-xl md:text-2xl'>
                      Maryana Capital Inc.
                    </h1>
                    <p className='text-xs text-gray-400 md:text-sm'>
                      <span className='sm:hidden'>
                        Investment Advisory
                      </span>
                      <span className='hidden sm:inline'>
                        Investment Advisory
                      </span>
                    </p>
                  </div>
                  {/* Trust Badges */}
                  <div className='hidden space-x-2 lg:flex'>
                    <div className='flex items-center rounded-md bg-green-900/30 px-2 py-1 text-xs text-green-300'>
                      <ShieldAlert className='mr-1 h-3 w-3' />
                      SEC Registered
                    </div>
                    <div className='flex items-center rounded-md bg-blue-900/30 px-2 py-1 text-xs text-blue-300'>
                      <Landmark className='mr-1 h-3 w-3' />
                      CIRO Member
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Simplified Navigation Menu */}
            <nav className='hidden space-x-1 lg:flex'>
              {[
                { id: 'growth', label: 'Overview', icon: BarChart3 },
                { id: 'investors', label: 'Investors', icon: UsersRound },
              ].map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  className='group relative flex items-center space-x-2 rounded-lg px-4 py-3 text-sm font-medium text-gray-300 transition-all duration-300 hover:bg-slate-800/60 hover:text-white'
                >
                  <item.icon className='h-4 w-4' />
                  <span>{item.label}</span>
                  <div className='absolute bottom-0 left-1/2 h-0.5 w-0 -translate-x-1/2 bg-gradient-to-r from-purple-500 to-blue-500 transition-all duration-300 group-hover:w-3/4'></div>
                </a>
              ))}
            </nav>

            {/* Clean CTA Section - Mobile optimized */}
            <div className='flex items-center space-x-2 sm:space-x-3'>
              {/* Enhanced Primary CTA */}
              <Link
                href='/apply'
                className='group relative overflow-hidden rounded-lg bg-gradient-to-r from-purple-600 via-blue-600 to-purple-700 px-3 py-2 text-xs font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-purple-500/25 sm:rounded-xl sm:px-6 sm:py-3 sm:text-sm md:px-8 md:py-3 md:text-base'
              >
                <div className='absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100'></div>
                <div className='relative flex items-center space-x-1 sm:space-x-2'>
                  <span className='sm:hidden'>Apply</span>
                  <span className='hidden sm:inline'>Apply Now</span>
                  <Rocket className='h-3 w-3 transition-transform group-hover:translate-x-1 sm:h-4 sm:w-4' />
                </div>
              </Link>

              {/* Mobile Menu Toggle */}
              <Button
                variant='ghost'
                size='sm'
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className='h-8 w-8 text-gray-300 hover:bg-slate-800 hover:text-white lg:hidden'
              >
                {isMenuOpen ? (
                  <X className='h-5 w-5' />
                ) : (
                  <Menu className='h-5 w-5' />
                )}
              </Button>
            </div>
          </div>

          {/* Enhanced Mobile Menu - Compact */}
          {isMenuOpen && (
            <div className='border-t border-slate-800 bg-slate-950/95 backdrop-blur-xl lg:hidden'>
              <div className='px-3 py-3'>
                {/* Mobile Trust Indicators - Compact */}
                <div className='mb-3 flex justify-center space-x-3 text-xs'>
                  <div className='flex items-center space-x-1 text-green-400'>
                    <ShieldAlert className='h-2.5 w-2.5' />
                    <span>SEC</span>
                  </div>
                  <div className='flex items-center space-x-1 text-blue-400'>
                    <Landmark className='h-2.5 w-2.5' />
                    <span>CIRO</span>
                  </div>
                </div>

                {/* Mobile Navigation - Compact */}
                <nav className='space-y-2'>
                  {[
                    {
                      id: 'growth',
                      label: 'Overview',
                      icon: BarChart3,
                      desc: '$300B Valuation',
                    },
                    {
                      id: 'investors',
                      label: 'Investors',
                      icon: UsersRound,
                      desc: 'Microsoft, SoftBank+',
                    },
                  ].map((item) => (
                    <a
                      key={item.id}
                      href={`#${item.id}`}
                      className='flex items-center space-x-3 rounded-lg bg-slate-800/40 p-3 transition-all hover:bg-slate-700/60'
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <div className='flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-purple-600 to-blue-600'>
                        <item.icon className='h-4 w-4 text-white' />
                      </div>
                      <div className='flex-1'>
                        <p className='text-sm font-medium text-white'>
                          {item.label}
                        </p>
                        <p className='text-xs text-gray-400'>{item.desc}</p>
                      </div>
                    </a>
                  ))}
                </nav>

                {/* Mobile Contact - Compact */}
                <div className='mt-3 rounded-lg bg-slate-800/40 p-3 text-center'>
                  <p className='mb-1 text-xs font-medium text-white'>Support</p>
                  <a
                    href='tel:+14375235816'
                    className='text-sm font-semibold text-purple-400 transition-colors hover:text-purple-300'
                  >
                    +1 437 523 5816
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>
      </header>

      <div className='relative overflow-hidden'>
        {/* Enhanced Background Effects */}
        <div className='bg-grid-pattern pointer-events-none absolute inset-0 opacity-5'></div>
        <div className='absolute inset-0 bg-gradient-to-b from-purple-900/10 via-transparent to-blue-900/10'></div>

        {/* Floating elements for visual interest */}
        <div className='pointer-events-none absolute inset-0 overflow-hidden'>
          <div className='absolute -right-24 -top-24 h-96 w-96 rounded-full bg-purple-600/10 blur-3xl'></div>
          <div className='absolute -bottom-24 -left-24 h-96 w-96 rounded-full bg-blue-600/10 blur-3xl'></div>
        </div>

        <section className='relative z-10 px-4 py-8 text-center sm:py-12 md:px-8 md:py-20 lg:py-32'>
          <div className='mx-auto max-w-6xl'>
            {/* Professional Trust Indicators - Mobile optimized */}
            <div className='mb-4 flex flex-wrap items-center justify-center gap-2 text-sm text-gray-400 sm:mb-6 sm:gap-3 md:mb-10 md:gap-6'>
              <div className='flex items-center rounded-lg bg-gradient-to-r from-green-900/40 to-green-800/40 px-2 py-1.5 backdrop-blur-sm sm:rounded-xl sm:px-4 sm:py-3'>
                <ShieldAlert className='mr-1 h-3 w-3 text-green-400 sm:mr-2 sm:h-4 sm:w-4' />
                <span className='text-xs font-medium text-green-300 sm:text-sm'>
                  <span className='sm:hidden'>SEC</span>
                  <span className='hidden sm:inline'>SEC Compliant</span>
                </span>
              </div>
              <div className='flex items-center rounded-lg bg-gradient-to-r from-blue-900/40 to-blue-800/40 px-2 py-1.5 backdrop-blur-sm sm:rounded-xl sm:px-4 sm:py-3'>
                <UsersRound className='mr-1 h-3 w-3 text-blue-400 sm:mr-2 sm:h-4 sm:w-4' />
                <span className='text-xs font-medium text-blue-300 sm:text-sm'>
                  <span className='sm:hidden'>Accredited</span>
                  <span className='hidden sm:inline'>
                    Accredited Investors Only
                  </span>
                </span>
              </div>
              <div className='flex items-center rounded-lg bg-gradient-to-r from-purple-900/40 to-purple-800/40 px-2 py-1.5 backdrop-blur-sm sm:rounded-xl sm:px-4 sm:py-3'>
                <Zap className='mr-1 h-3 w-3 text-purple-400 sm:mr-2 sm:h-4 sm:w-4' />
                <span className='text-xs font-medium text-purple-300 sm:text-sm'>
                  <span className='sm:hidden'>Limited</span>
                  <span className='hidden sm:inline'>Limited Availability</span>
                </span>
              </div>
            </div>

            {/* OpenAI Logo - Mobile optimized */}
            <div className='mb-4 flex justify-center sm:mb-6 md:mb-8'>
              <div className='openai-logo-hero-container'>
                <Image
                  src='/placeholder-logo.svg'
                  alt='Maryana Capital Inc. Logo'
                  width={80}
                  height={80}
                  className='openai-logo-image sm:h-24 sm:w-24 md:h-32 md:w-32'
                />
              </div>
            </div>

            {/* Enhanced Value Proposition Badge - Mobile optimized */}
            <div className='mb-4 inline-block animate-pulse rounded-xl bg-gradient-to-r from-primary via-purple-500 to-pink-500 p-0.5 shadow-lg sm:mb-6 sm:rounded-2xl sm:p-1 md:mb-8'>
              <div className='rounded-lg bg-slate-900/90 px-3 py-2 backdrop-blur-sm sm:rounded-xl sm:px-6 sm:py-3'>
                <p className='bg-gradient-to-r from-primary via-purple-400 to-pink-400 bg-clip-text text-sm font-bold text-transparent sm:text-base'>
                  <span className='sm:hidden'>🔥 OpenAI Pre-IPO • $300B</span>
                  <span className='hidden sm:inline'>
                    🔥 Exclusive Pre-IPO Investment Opportunity • $300B
                    Valuation
                  </span>
                </p>
              </div>
            </div>

            {/* Main Headline with Enhanced Typography - Mobile optimized */}
            <h1 className='mb-4 text-3xl font-extrabold leading-tight text-white sm:mb-6 sm:text-4xl md:mb-8 md:text-6xl lg:text-7xl xl:text-8xl'>
              <span className='sm:hidden'>Invest in AI</span>
              <span className='hidden sm:inline'>Invest in the </span>
              <span className='relative bg-gradient-to-r from-primary via-purple-500 to-pink-500 bg-clip-text text-transparent'>
                <span className='sm:hidden'>Future</span>
                <span className='hidden sm:inline'>Future of AI</span>
                <div className='absolute -bottom-1 left-0 h-0.5 w-full bg-gradient-to-r from-purple-500 to-pink-500 opacity-30 sm:-bottom-2 sm:h-1'></div>
              </span>
            </h1>

            {/* Enhanced Description - Mobile optimized */}
            <p className='mx-auto mb-6 max-w-3xl text-base leading-relaxed text-gray-300 sm:mb-8 sm:text-lg md:mb-10 md:text-xl lg:text-2xl xl:text-3xl'>
              <span className='sm:hidden'>
                Join global institutions in OpenAI&apos;s pre-IPO.{' '}
                <strong className='text-white'>~$300B valuation</strong> with{' '}
                <strong className='text-green-400'>
                  $11.6B projected revenue
                </strong>
                .
              </span>
              <span className='hidden sm:inline'>
                Join global institutions investing in OpenAI before its
                anticipated IPO.
                <br className='hidden md:inline' />
                <strong className='text-white'> ~$300B valuation</strong> with
                <strong className='text-green-400'>
                  {' '}
                  $11.6B projected 2025 revenue
                </strong>
                .
              </span>
            </p>

            {/* Enhanced Key Metrics with Animation - Mobile optimized */}
            <div className='mb-6 grid grid-cols-3 gap-3 sm:mb-8 sm:gap-4 md:mb-12 md:gap-6'>
              {[
                {
                  value: '~$300B',
                  label: 'Current Valuation',
                  color: 'text-green-400',
                  delay: 'delay-0',
                },
                {
                  value: '$58B+',
                  label: 'Total Funding Raised',
                  color: 'text-blue-400',
                  delay: 'delay-100',
                },
                {
                  value: '2025',
                  label: 'Expected IPO Timeline',
                  color: 'text-purple-400',
                  delay: 'delay-200',
                },
              ].map((metric, index) => (
                <div
                  key={index}
                  className={`group relative overflow-hidden rounded-lg bg-slate-800/60 p-3 backdrop-blur-sm transition-all duration-500 hover:scale-105 hover:bg-slate-700/60 sm:rounded-xl sm:p-4 md:rounded-2xl md:p-6 ${metric.delay}`}
                >
                  <div className='absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100'></div>
                  <div className='relative text-center'>
                    <div
                      className={`text-lg font-bold sm:text-2xl md:text-3xl lg:text-4xl ${metric.color}`}
                    >
                      {metric.value}
                    </div>
                    <div className='mt-1 text-xs font-medium text-gray-400 sm:mt-2 sm:text-sm'>
                      <span className='sm:hidden'>
                        {metric.label.split(' ')[0]}
                      </span>
                      <span className='hidden sm:inline'>{metric.label}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Enhanced CTA Section with Professional Layout */}
            <div className='flex flex-col items-center space-y-6 sm:flex-row sm:justify-center sm:space-x-6 sm:space-y-0'>
              {/* Primary CTA */}
              <Button
                asChild
                size='lg'
                className='group relative w-full overflow-hidden rounded-2xl bg-gradient-to-r from-purple-600 via-blue-600 to-purple-700 px-10 py-5 text-lg font-bold text-white shadow-2xl transition-all duration-300 hover:scale-105 hover:shadow-purple-500/30 sm:w-auto md:px-12 md:py-6 md:text-xl'
              >
                <Link href='/apply'>
                  <div className='absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100'></div>
                  <div className='relative flex items-center space-x-3'>
                    <span>Start Investment Application</span>
                    <Rocket className='h-5 w-5 transition-transform group-hover:translate-x-1 md:h-6 md:w-6' />
                  </div>
                </Link>
              </Button>

              {/* Secondary CTA */}
              <Button
                variant='outline'
                size='lg'
                className='group w-full border-2 border-slate-600 bg-slate-800/60 px-10 py-5 text-lg font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:border-purple-500 hover:bg-slate-700/60 hover:text-purple-300 sm:w-auto md:px-12 md:py-6 md:text-xl'
                onClick={() => {
                  const investorsSection = document.getElementById('investors');
                  investorsSection?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                <div className='flex items-center space-x-3'>
                  <span>View Investor Backing</span>
                  <UsersRound className='h-5 w-5 transition-transform group-hover:scale-110 md:h-6 md:w-6' />
                </div>
              </Button>
            </div>

            {/* Professional Risk Disclaimer */}
            <div className='mt-12 rounded-xl border border-slate-700/50 bg-slate-800/30 p-6 backdrop-blur-sm'>
              <p className='text-sm leading-relaxed text-gray-400'>
                <strong className='text-amber-400'>
                  Investment Disclaimer:
                </strong>{' '}
                This investment involves substantial risk, including potential
                total loss of principal. Past performance does not guarantee
                future results.
                <br className='hidden sm:inline' />
                For accredited investors only. Please read full disclosures and
                consult with your financial advisor.
              </p>
            </div>

            {/* Live Status Indicator */}
            <div className='mt-8 flex items-center justify-center space-x-3 text-sm text-gray-400'>
              <div className='flex items-center space-x-2'>
                <div className='h-3 w-3 animate-pulse rounded-full bg-green-400'></div>
                <span className='font-medium text-green-400'>
                  Live Opportunity
                </span>
              </div>
              <span>•</span>
              <span>Limited spots available</span>
              <span>•</span>
              <span>Target close: March 31, 2026</span>
            </div>
          </div>
        </section>
      </div>

      <main className='relative z-10 px-4 py-6 sm:py-8 md:px-6 md:py-12 lg:py-16'>
        <div className='mx-auto max-w-6xl space-y-8 sm:space-y-12 md:space-y-16 lg:space-y-24'>
          {orderedSections.map((sectionItem: any) => {
            if (sectionItem.component) {
              return (
                <section
                  key={sectionItem.id}
                  id={sectionItem.id}
                  className='scroll-mt-20'
                >
                  {sectionItem.component}
                </section>
              );
            }
            const section = sectionItem;
            return (
              <section
                key={section.id}
                id={section.id}
                className='scroll-mt-20'
              >
                {/* Modern Financial Section Design */}
                <div className='group relative overflow-hidden rounded-2xl border border-slate-700/50 bg-gradient-to-br from-slate-800/80 via-slate-800/60 to-slate-900/80 shadow-2xl backdrop-blur-sm transition-all duration-500 hover:border-purple-500/30 hover:shadow-purple-500/10'>
                  {/* Animated background gradient */}
                  <div className='absolute inset-0 bg-gradient-to-br from-purple-600/5 via-transparent to-blue-600/5 opacity-0 transition-opacity duration-500 group-hover:opacity-100'></div>

                  {/* Section Header */}
                  <div className='relative border-b border-slate-700/50 bg-gradient-to-r from-slate-800/90 to-slate-900/90 p-8 md:p-12'>
                    <div className='flex flex-col items-start space-y-6 md:flex-row md:items-center md:space-x-8 md:space-y-0'>
                      {/* Icon with enhanced styling */}
                      <div className='flex-shrink-0'>
                        <div className='relative'>
                          <div className='absolute inset-0 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 opacity-20 blur-xl'></div>
                          <div className='relative flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-purple-600 to-blue-600 shadow-lg md:h-20 md:w-20'>
                            {section.icon}
                          </div>
                        </div>
                      </div>

                      {/* Title and Description */}
                      <div className='flex-1 space-y-4'>
                        <h2 className='text-3xl font-bold leading-tight text-white md:text-4xl lg:text-5xl'>
                          {section.title}
                        </h2>
                        <p className='text-lg leading-relaxed text-gray-300 md:text-xl'>
                          {section.content}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Section Content */}
                  <div className='relative p-8 md:p-12'>
                    {/* Financial Visuals/Charts */}
                    {section.visuals &&
                      section.visuals.map((visual: Visual, vIndex: number) => (
                        <div key={vIndex} className='mb-12 last:mb-0'>
                          <div className='mb-6 text-center md:text-left'>
                            <h3 className='mb-3 text-2xl font-semibold text-white'>
                              {visual.title}
                            </h3>
                          </div>
                          <div className='rounded-xl border border-slate-600/50 bg-slate-800/40 p-6 shadow-lg backdrop-blur-sm'>
                            {visual.component}
                          </div>
                          <p className='mt-4 text-center text-sm italic leading-relaxed text-gray-400 md:text-left'>
                            {visual.explanation}
                          </p>
                        </div>
                      ))}

                    {/* Key Points */}
                    {section.points && (
                      <div className='mt-8'>
                        <h3 className='mb-6 text-xl font-semibold text-white'>
                          Key Investment Highlights
                        </h3>
                        <div className='grid gap-4 md:grid-cols-2'>
                          {section.points.map(
                            (point: string, pIndex: number) => (
                              <div
                                key={pIndex}
                                className='group/item flex items-start space-x-4 rounded-lg bg-slate-700/30 p-4 transition-all duration-300 hover:bg-slate-700/50'
                              >
                                <div className='flex-shrink-0'>
                                  <div className='flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-r from-green-500 to-blue-500'>
                                    <Zap className='h-4 w-4 text-white' />
                                  </div>
                                </div>
                                <p className='text-gray-200 group-hover/item:text-white'>
                                  {point}
                                </p>
                              </div>
                            )
                          )}
                        </div>
                      </div>
                    )}

                    {/* Financial Stats */}
                    {section.stats && (
                      <div className='mt-8'>
                        <h3 className='mb-6 text-xl font-semibold text-white'>
                          Key Financial Metrics
                        </h3>
                        <div className='grid gap-6 sm:grid-cols-2 lg:grid-cols-4'>
                          {section.stats.map((stat: Stat, sIndex: number) => (
                            <div
                              key={sIndex}
                              className='group/stat relative overflow-hidden rounded-xl bg-gradient-to-br from-slate-700/60 to-slate-800/60 p-6 shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl'
                            >
                              <div className='absolute inset-0 bg-gradient-to-br from-purple-600/10 to-blue-600/10 opacity-0 transition-opacity duration-300 group-hover/stat:opacity-100'></div>
                              <div className='relative'>
                                <p className='bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-3xl font-bold text-transparent'>
                                  {stat.value}
                                </p>
                                <p className='mt-2 text-sm font-medium text-gray-300'>
                                  {stat.label}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Professional Institutional Investors Section */}
                    {section.majorHolders && (
                      <div className='mt-8 space-y-8'>
                        <div className='space-y-3 text-center'>
                          <h3 className='text-3xl font-bold text-white'>
                            World-Class Institutional Backing
                          </h3>
                          <p className='mx-auto max-w-2xl text-lg text-gray-400'>
                            Leading global investors backing OpenAI&apos;s
                            mission with over $58 billion in funding
                          </p>
                        </div>

                        {/* Primary Investors - Professional Grid */}
                        <div className='grid gap-6 sm:grid-cols-2 lg:grid-cols-3'>
                          {section.majorHolders
                            .filter((holder: MajorHolder) => holder.logo)
                            .map((holder: MajorHolder, iIndex: number) => (
                              <div
                                key={iIndex}
                                className='group relative h-full overflow-hidden rounded-2xl border border-slate-600/30 bg-gradient-to-br from-slate-800/60 to-slate-900/60 transition-all duration-300 hover:border-blue-500/50 hover:shadow-xl hover:shadow-blue-500/10'
                              >
                                {/* Hover Effect */}
                                <div className='absolute inset-0 bg-gradient-to-br from-blue-600/5 to-purple-600/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100'></div>

                                <div className='relative flex h-full flex-col p-6'>
                                  {/* Logo Container */}
                                  <div className='bg-white/98 mb-6 h-16 w-full overflow-hidden rounded-xl p-3 shadow-sm'>
                                    <div className='flex h-full w-full items-center justify-center'>
                                      <Image
                                        src={holder.logo! || '/placeholder.svg'}
                                        alt={`${holder.name} logo`}
                                        width={120}
                                        height={40}
                                        className='object-contain'
                                        style={{
                                          maxWidth: '100%',
                                          maxHeight: '100%',
                                          width: 'auto',
                                          height: 'auto',
                                        }}
                                      />
                                    </div>
                                  </div>

                                  {/* Investor Details */}
                                  <div className='flex flex-grow flex-col justify-between space-y-3 text-center'>
                                    <div>
                                      <h4 className='mb-2 text-lg font-bold text-white'>
                                        {holder.name}
                                      </h4>
                                      <div className='mb-3 text-sm font-semibold text-blue-400'>
                                        {holder.stake}
                                      </div>
                                    </div>
                                    <div className='text-sm leading-relaxed text-gray-400'>
                                      {holder.entry}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ))}
                        </div>

                        {/* Additional Strategic Partners */}
                        <div className='rounded-2xl border border-slate-600/30 bg-slate-800/40 p-8'>
                          <div className='mb-6 text-center'>
                            <h4 className='mb-2 text-2xl font-bold text-white'>
                              Additional Strategic Partners
                            </h4>
                            <p className='text-gray-400'>
                              Other world-class institutions supporting OpenAI
                            </p>
                          </div>

                          <div className='mx-auto grid max-w-4xl gap-4 sm:grid-cols-2 lg:grid-cols-1'>
                            {section.majorHolders
                              .filter((holder: MajorHolder) => !holder.logo)
                              .map((holder: MajorHolder, iIndex: number) => (
                                <div
                                  key={iIndex}
                                  className='flex items-center justify-between rounded-xl bg-slate-700/50 p-4 transition-all duration-300 hover:bg-slate-700/70'
                                >
                                  <div className='flex-1'>
                                    <p className='mb-1 text-base font-semibold text-white'>
                                      {holder.name}
                                    </p>
                                    <p className='text-sm text-gray-400'>
                                      {holder.entry}
                                    </p>
                                  </div>
                                  <div className='ml-4 text-right'>
                                    <div className='text-sm font-semibold text-blue-400'>
                                      {holder.stake}
                                    </div>
                                  </div>
                                </div>
                              ))}
                          </div>

                          {/* Other Notable Investors */}
                          <div className='mt-6 rounded-xl bg-slate-700/30 p-6 text-center'>
                            <h5 className='mb-3 text-lg font-semibold text-white'>
                              Plus Leading Investment Firms
                            </h5>
                            <div className='flex flex-wrap justify-center gap-3 text-sm text-gray-300'>
                              {[
                                'Sequoia Capital',
                                'Andreessen Horowitz',
                                'Founders Fund',
                                'Coatue Management',
                                'Fidelity Investments',
                              ].map((firm, index) => (
                                <span
                                  key={index}
                                  className='rounded-full bg-slate-600/40 px-3 py-1 text-xs font-medium'
                                >
                                  {firm}
                                </span>
                              ))}
                              <span className='rounded-full bg-slate-600/40 px-3 py-1 text-xs font-medium text-gray-400'>
                                +Others
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Investment Summary - Prominent Display */}
                        <div className='rounded-2xl border border-blue-500/30 bg-gradient-to-br from-blue-900/20 to-purple-900/20 p-8 text-center'>
                          <div className='mx-auto max-w-md space-y-4'>
                            <h4 className='text-2xl font-bold text-blue-300'>
                              Total Institutional Investment
                            </h4>
                            <div className='bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-5xl font-bold text-transparent'>
                              $58+ Billion
                            </div>
                            <p className='text-base text-gray-400'>
                              Raised across multiple funding rounds since 2019
                            </p>
                            <div className='flex items-center justify-center space-x-6 pt-2 text-sm text-gray-400'>
                              <div className='text-center'>
                                <div className='font-semibold text-white'>
                                  2019-2025
                                </div>
                                <div>Funding Period</div>
                              </div>
                              <div className='text-center'>
                                <div className='font-semibold text-white'>
                                  15+
                                </div>
                                <div>Major Investors</div>
                              </div>
                              <div className='text-center'>
                                <div className='font-semibold text-white'>
                                  Multiple
                                </div>
                                <div>Funding Rounds</div>
                              </div>
                            </div>
                          </div>
                        </div>

                        {section.footerNote && (
                          <div className='text-center'>
                            <p className='mx-auto max-w-3xl text-sm italic leading-relaxed text-gray-500'>
                              {section.footerNote}
                            </p>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Benefits Section */}
                    {section.benefits && (
                      <div className='mt-8'>
                        <h3 className='mb-6 text-xl font-semibold text-white'>
                          Investment Benefits
                        </h3>
                        <div className='grid gap-4 md:grid-cols-2'>
                          {section.benefits.map(
                            (benefit: string, bIndex: number) => (
                              <div
                                key={bIndex}
                                className='group/benefit flex items-start space-x-4 rounded-lg bg-gradient-to-r from-green-900/20 to-blue-900/20 p-4 transition-all duration-300 hover:from-green-800/30 hover:to-blue-800/30'
                              >
                                <div className='flex-shrink-0'>
                                  <TrendingUp className='h-6 w-6 text-green-400' />
                                </div>
                                <p className='text-gray-200 group-hover/benefit:text-white'>
                                  {benefit}
                                </p>
                              </div>
                            )
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </section>
            );
          })}

          <Separator className='my-16 border-slate-700 md:my-24' />
        </div>
      </main>

      <footer className='mt-16 border-t border-slate-700 bg-slate-900/95 px-4 py-12 text-center backdrop-blur-sm md:mt-24 md:px-8'>
        <div className='mx-auto max-w-6xl text-gray-300'>
          {/* Contact Information Grid */}
          <div className='mb-12 grid grid-cols-1 gap-8 md:grid-cols-3'>
            {/* Primary Contact */}
            <div className='rounded-lg bg-slate-800/60 p-6'>
              <h4 className='mb-4 text-lg font-semibold text-white'>
                Investment Inquiries
              </h4>
              <div className='space-y-3 text-sm'>
                <p className='flex items-center justify-center md:justify-start'>
                  <Mail className='mr-2 h-4 w-4 text-primary' />
                  <a
                    href='mailto:info@maryanacap.com'
                    className='transition-colors hover:text-primary'
                  >
                    info@maryanacap.com
                  </a>
                </p>
                <p className='flex items-center justify-center md:justify-start'>
                  <Phone className='mr-2 h-4 w-4 text-primary' />
                  <a
                    href='tel:+14378881252'
                    className='transition-colors hover:text-primary'
                  >
                    +1 437 888 1252
                  </a>
                </p>
              </div>
            </div>

            {/* Office Address */}
            <div className='rounded-lg bg-slate-800/60 p-6'>
              <h4 className='mb-4 text-lg font-semibold text-white'>
                Registered Office
              </h4>
              <div className='flex items-start justify-center text-sm md:justify-start'>
                <MapPin className='mr-2 mt-1 h-4 w-4 flex-shrink-0 text-primary' />
                <div>
                  <p className='font-medium'>Maryana Capital Inc.</p>
                  <p>50 Ardwold Gate</p>
                  <p>Toronto, Ontario M5R 2W2</p>
                  <p className='mt-1 text-gray-400'>Canada</p>
                </div>
              </div>
            </div>

            {/* Investment Process */}
            <div className='rounded-lg bg-slate-800/60 p-6'>
              <h4 className='mb-4 text-lg font-semibold text-white'>
                Investment Process
              </h4>
              <div className='space-y-2 text-sm'>
                <div className='flex items-center'>
                  <div className='mr-2 h-2 w-2 rounded-full bg-primary'></div>
                  <span>Submit Application</span>
                </div>
                <div className='flex items-center'>
                  <div className='mr-2 h-2 w-2 rounded-full bg-primary'></div>
                  <span>Accreditation Verification</span>
                </div>
                <div className='flex items-center'>
                  <div className='mr-2 h-2 w-2 rounded-full bg-primary'></div>
                  <span>Investment Review</span>
                </div>
                <div className='flex items-center'>
                  <div className='mr-2 h-2 w-2 rounded-full bg-primary'></div>
                  <span>Documentation & Closing</span>
                </div>
              </div>
            </div>
          </div>

          {/* Comprehensive Risk Disclosures */}
          <div className='mb-10 rounded-lg border border-slate-700 bg-slate-800/40 p-8 text-left'>
            <div className='mb-4 flex items-center'>
              <ShieldAlert className='mr-3 h-6 w-6 text-amber-500' />
              <h3 className='text-xl font-semibold text-white'>
                Important Investment Disclosures
              </h3>
            </div>
            <div className='grid grid-cols-1 gap-6 text-sm leading-relaxed md:grid-cols-2'>
              <div>
                <h4 className='mb-2 font-semibold text-white'>Risk Factors</h4>
                <p className='text-gray-400'>
                  This investment involves substantial risk, including potential
                  total loss of principal. Pre-IPO investments are illiquid and
                  may not be suitable for all investors. Private company
                  investments carry additional risks including limited financial
                  disclosure, lack of regulatory oversight, and potential for
                  dilution in future funding rounds.
                </p>
              </div>
              <div>
                <h4 className='mb-2 font-semibold text-white'>
                  Accredited Investor Requirements
                </h4>
                <p className='text-gray-400'>
                  This opportunity is exclusively available to accredited
                  investors as defined by securities regulations. Minimum
                  investment amounts apply. Past performance is not indicative
                  of future results. All financial projections are estimates and
                  actual results may vary significantly.
                </p>
              </div>
            </div>
            <hr className='my-4 border-slate-600' />
            <p className='text-xs text-gray-500'>
              <strong>Legal Notice:</strong> This material is for informational
              purposes only and does not constitute an offer to sell or a
              solicitation of an offer to buy any securities. Any such offer or
              solicitation will be made only through definitive offering
              documents. Investment opportunities are subject to availability
              and investor qualification. Consult with your financial advisor
              before making investment decisions.
            </p>
          </div>

          {/* Maryana Capital Inc. Information */}
          <div className='mb-10 rounded-lg border border-slate-700 bg-slate-800/40 p-8'>
            <div className='mb-6 flex items-center'>
              <Landmark className='mr-3 h-6 w-6 text-blue-500' />
              <h3 className='text-xl font-semibold text-white'>
                Maryana Capital Inc. Information
              </h3>
            </div>

            {/* Registered Office */}
            <div className='mb-6 rounded-lg bg-slate-700/30 p-6'>
              <h4 className='mb-3 text-lg font-semibold text-white'>
                Registered Office
              </h4>
              <div className='flex items-start'>
                <MapPin className='mr-3 mt-1 h-5 w-5 flex-shrink-0 text-blue-400' />
                <div className='text-sm text-gray-300'>
                  <p>50 Ardwold Gate</p>
                  <p>Toronto, Ontario M5R 2W2, Canada</p>
                </div>
              </div>
            </div>

            {/* Registration & Regulatory */}
            <div className='rounded-lg bg-slate-700/30 p-6'>
              <h4 className='mb-3 text-lg font-semibold text-white'>
                Registration & Regulatory
              </h4>
              <div className='grid gap-3 text-sm text-gray-300 md:grid-cols-2'>
                <div>
                  <p>Corp. No.: 9944567</p>
                  <p>BN No.: 747551893RC0001</p>
                  <p>LEI: 549300RZZXPS18AZ0G57</p>
                </div>
                <div>
                  <p>
                    Regulated by the Financial Services Regulatory Authority of
                    Ontario (FSRA)
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Regulatory & Company Information */}
          <div className='mb-8 grid grid-cols-1 gap-4 text-xs text-gray-500 md:grid-cols-3'>
            <div className='text-center md:text-left'>
              <p className='font-medium'>Maryana Capital Inc.</p>
              <p>Investment Advisory Services</p>
              <p>Registered in Ontario, Canada</p>
            </div>
            <div className='text-center'>
              <p>Regulated by: Financial Services Regulatory Authority of Ontario</p>
              <p>BN: 747551893RC0001 • Corp. No.: 9944567</p>
            </div>
            <div className='text-center md:text-right'>
              <p>LEI: 549300RZZXPS18AZ0G57</p>
              <p>Additional disclosures available upon request</p>
            </div>
          </div>

          {/* Copyright & Final Disclaimers */}
          <div className='border-t border-slate-700 pt-8'>
            <p className='mb-2 text-sm text-gray-400'>
              &copy; {new Date().getFullYear()} Maryana Capital Inc. All rights
              reserved.
            </p>
            <p className='mb-4 text-xs text-gray-500'>
              OpenAI Pre-IPO Investment Information presented by Maryana Capital
              Inc. All information current as of{' '}
              {new Date().toLocaleDateString('en-US', {
                month: 'long',
                year: 'numeric',
              })}
              .
            </p>
            <p className='text-xs text-gray-600'>
              Application submission does not guarantee allocation. Investment
              opportunities are limited and subject to availability.
              <br className='hidden sm:inline' />
              This presentation contains forward-looking statements that involve
              risks and uncertainties.
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
