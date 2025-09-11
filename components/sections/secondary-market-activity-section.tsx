'use client';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import {
  TrendingUp,
  Users,
  HandCoins,
  Banknote,
  Shield,
  ArrowRight,
  Zap,
} from 'lucide-react';

const secondaryEvents = [
  {
    date: 'March 2021',
    quarter: 'Q1 2021',
    event: 'Series H Funding',
    type: 'Primary & Secondary Components',
    amount: '$875M',
    valuation: '$95B',
    valuationNumeric: 95,
    participants: 'Founders Fund, Sequoia Capital, Tiger Global',
    purpose: 'Growth capital & limited secondary liquidity',
    significance: 'Peak valuation during fintech boom, global expansion',
    color: 'from-blue-500 to-cyan-600',
    icon: Users,
    highlight: false,
    outcomes: [
      'Established institutional investor base',
      'Funded global payment expansion',
      'Provided limited employee liquidity',
      'Set foundation for enterprise growth',
    ],
  },
  {
    date: 'March 2023',
    quarter: 'Q1 2023',
    event: 'Series I Funding',
    type: 'Down Round with Focus',
    amount: '$4.6B',
    valuation: '$50B',
    valuationNumeric: 50,
    participants: 'Founders Fund, Temasek, GIC, General Catalyst',
    purpose: 'Efficiency focus & strategic positioning',
    significance: '47% valuation decrease, focus on profitability',
    color: 'from-orange-500 to-red-600',
    icon: HandCoins,
    highlight: true,
    outcomes: [
      'Focused on path to profitability',
      'Strategic cost optimization program',
      'Enhanced operational efficiency',
      'Maintained market leadership position',
    ],
  },
  {
    date: 'Current 2025',
    quarter: 'Q3 2025',
    event: 'Market Recovery',
    type: 'Public Market Valuation',
    amount: 'Market Consensus',
    valuation: '$106.87B',
    valuationNumeric: 106.87,
    participants: 'Public Market Investors, Analysts',
    purpose: 'Pre-IPO market validation & positioning',
    significance: '114% recovery, strong revenue growth validation',
    color: 'from-green-500 to-emerald-600',
    icon: Banknote,
    highlight: true,
    outcomes: [
      '$5.1B TTM revenue achieved',
      'Market cap recovery above 2021 peak',
      'Pre-IPO positioning established',
      'Strong fintech market leadership',
    ],
  },
];

const maxValuation = 107; // For progress calculations (Stripe max)

export function SecondaryMarketActivitySection() {
  const totalLiquidity = 6090; // Estimated total across all rounds (millions)
  const valuationGrowth = (((106.87 - 50) / 50) * 100).toFixed(0); // Growth from Series I to Current (Stripe)

  return (
    <Card className='overflow-hidden border border-slate-700 bg-slate-800/60 shadow-2xl backdrop-blur-sm transition-all duration-300 hover:border-primary/50 hover:shadow-primary/20'>
      <CardHeader className='p-6 md:p-8'>
        <div className='flex flex-col items-start text-center md:flex-row md:items-center md:text-left'>
          <div className='mb-4 flex-shrink-0 self-center rounded-full bg-gradient-to-br from-emerald-600/20 to-cyan-600/20 p-4 md:mb-0 md:mr-6 md:self-start'>
            <TrendingUp className='h-10 w-10 text-emerald-400' />
          </div>
          <div className='flex-grow'>
            <CardTitle className='bg-gradient-to-r from-white to-gray-300 bg-clip-text text-3xl font-bold leading-tight text-transparent md:text-4xl'>
              Secondary Market Activity
            </CardTitle>
            <CardDescription className='mt-3 text-lg text-gray-200'>
              Strategic liquidity events demonstrating exceptional investor
              demand and price discovery ahead of public offering
            </CardDescription>
          </div>
        </div>

        {/* Key Secondary Market Metrics */}
        <div className='mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3'>
          <div className='rounded-xl border border-emerald-500/30 bg-gradient-to-br from-emerald-900/20 to-green-900/20 p-4 text-center'>
            <div className='text-2xl font-bold text-emerald-400'>
              ${(totalLiquidity / 1000).toFixed(1)}B+
            </div>
            <div className='text-sm text-gray-300'>Total Funding</div>
          </div>
          <div className='rounded-xl border border-cyan-500/30 bg-gradient-to-br from-cyan-900/20 to-blue-900/20 p-4 text-center'>
            <div className='text-2xl font-bold text-cyan-400'>
              {valuationGrowth}%
            </div>
            <div className='text-sm text-gray-300'>Valuation Growth</div>
          </div>
          <div className='rounded-xl border border-purple-500/30 bg-gradient-to-br from-purple-900/20 to-violet-900/20 p-4 text-center'>
            <div className='text-2xl font-bold text-purple-400'>3</div>
            <div className='text-sm text-gray-300'>Major Rounds</div>
          </div>
        </div>
      </CardHeader>

      <CardContent className='p-6 md:p-8'>
        {/* Secondary Market Timeline */}
        <div className='space-y-8'>
          {secondaryEvents.map((event, index) => {
            const progressPercent =
              (event.valuationNumeric / maxValuation) * 100;

            return (
              <div
                key={index}
                className='group relative overflow-hidden rounded-2xl border border-slate-600/50 bg-gradient-to-r from-slate-800/80 to-slate-700/80 p-6 shadow-xl transition-all duration-500 hover:border-white/20 hover:shadow-2xl'
              >
                {/* Highlight overlay for important events */}
                {event.highlight && (
                  <div className='absolute inset-0 bg-gradient-to-r from-emerald-600/5 to-cyan-600/5'></div>
                )}

                <div className='relative z-10'>
                  {/* Header with Icon and Timing */}
                  <div className='mb-4 flex items-start justify-between'>
                    <div className='flex items-center gap-4'>
                      <div
                        className={`rounded-full bg-gradient-to-r ${event.color} p-3 shadow-lg`}
                      >
                        <event.icon className='h-6 w-6 text-white' />
                      </div>
                      <div>
                        <div className='flex items-center gap-2'>
                          <h3 className='text-xl font-bold text-white'>
                            {event.event}
                          </h3>
                          {event.highlight && (
                            <div className='rounded-full bg-emerald-400/20 px-2 py-1'>
                              <Zap className='h-4 w-4 text-emerald-400' />
                            </div>
                          )}
                        </div>
                        <div className='flex items-center gap-3 text-sm text-gray-400'>
                          <span className='font-medium text-cyan-400'>
                            {event.quarter}
                          </span>
                          <span>•</span>
                          <span>{event.type}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Key Transaction Details */}
                  <div className='mb-6 grid grid-cols-1 gap-4 md:grid-cols-3'>
                    <div className='rounded-lg bg-slate-700/50 p-4'>
                      <div className='text-sm font-medium text-gray-300'>
                        Transaction Size
                      </div>
                      <div className='text-xl font-bold text-white'>
                        {event.amount}
                      </div>
                      <div className='text-xs text-gray-400'>
                        Disclosed Volume
                      </div>
                    </div>
                    <div className='rounded-lg bg-slate-700/50 p-4'>
                      <div className='text-sm font-medium text-gray-300'>
                        Valuation
                      </div>
                      <div className='text-xl font-bold text-green-400'>
                        {event.valuation}
                      </div>
                      <div className='text-xs text-emerald-400'>
                        Price Discovery
                      </div>
                    </div>
                    <div className='rounded-lg bg-slate-700/50 p-4'>
                      <div className='text-sm font-medium text-gray-300'>
                        Market Position
                      </div>
                      <div className='text-lg font-bold text-blue-400'>
                        {progressPercent.toFixed(0)}%
                      </div>
                      <div className='text-xs text-gray-400'>
                        of Current Value
                      </div>
                    </div>
                  </div>

                  {/* Valuation Progress Indicator */}
                  <div className='mb-4'>
                    <div className='mb-2 flex items-center justify-between text-xs text-gray-400'>
                      <span>Secondary Market Progression</span>
                      <span>{event.quarter}</span>
                    </div>
                    <div className='h-2 overflow-hidden rounded-full bg-slate-700'>
                      <div
                        className={`h-full bg-gradient-to-r ${event.color} transition-all duration-1000 ease-out`}
                        style={{ width: `${progressPercent}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Strategic Purpose */}
                  <div className='mb-4 rounded-lg bg-slate-700/30 p-4'>
                    <div className='mb-2 text-sm font-semibold text-emerald-400'>
                      Strategic Purpose
                    </div>
                    <div className='text-sm text-gray-300'>{event.purpose}</div>
                    <div className='mt-2 text-xs font-medium text-cyan-400'>
                      {event.significance}
                    </div>
                  </div>

                  {/* Key Participants */}
                  <div className='mb-4'>
                    <div className='mb-2 text-sm font-medium text-gray-400'>
                      Key Participants
                    </div>
                    <div className='text-sm text-gray-200'>
                      {event.participants}
                    </div>
                  </div>

                  {/* Market Outcomes */}
                  <div>
                    <div className='mb-3 flex items-center gap-2 text-sm font-semibold text-purple-400'>
                      <Shield className='h-4 w-4' />
                      Market Impact & Outcomes
                    </div>
                    <div className='grid grid-cols-1 gap-2 md:grid-cols-2'>
                      {event.outcomes.map((outcome, oIndex) => (
                        <div
                          key={oIndex}
                          className='flex items-start gap-2 text-sm text-gray-300'
                        >
                          <ArrowRight className='mt-0.5 h-3 w-3 flex-shrink-0 text-emerald-400' />
                          <span>{outcome}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Secondary Market Analysis Summary */}
        <div className='mt-12 rounded-2xl border border-emerald-500/30 bg-gradient-to-br from-emerald-900/10 via-cyan-900/10 to-blue-900/10 p-8'>
          <div className='mb-4 text-center'>
            <TrendingUp className='mx-auto h-12 w-12 text-emerald-400' />
          </div>
          <h3 className='mb-4 text-center text-2xl font-bold text-white'>
            Secondary Market Validation
          </h3>

          <div className='mb-6 text-center'>
            <p className='mx-auto max-w-4xl text-lg leading-relaxed text-gray-300'>
              Stripe&apos;s secondary market activity demonstrates
              exceptional{' '}
              <span className='font-bold text-emerald-400'>
                investor demand
              </span>{' '}
              and provides crucial{' '}
              <span className='font-bold text-cyan-400'>price discovery</span>{' '}
              ahead of a public offering. The{' '}
              <span className='font-bold text-yellow-400'>
                {valuationGrowth}% valuation recovery
              </span>{' '}
              from $50B to $106.87B validates Stripe&apos;s resilience and
              market leadership in fintech payments.
            </p>
          </div>

          {/* Key Insights Grid */}
          <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
            <div className='rounded-xl bg-slate-700/40 p-6'>
              <h4 className='mb-3 text-lg font-bold text-emerald-400'>
                Liquidity Management
              </h4>
              <ul className='space-y-2 text-sm text-gray-300'>
                <li className='flex items-start gap-2'>
                  <ArrowRight className='mt-0.5 h-3 w-3 text-emerald-400' />
                  <span>Strategic employee liquidity programs</span>
                </li>
                <li className='flex items-start gap-2'>
                  <ArrowRight className='mt-0.5 h-3 w-3 text-emerald-400' />
                  <span>Company-sponsored tender offers</span>
                </li>
                <li className='flex items-start gap-2'>
                  <ArrowRight className='mt-0.5 h-3 w-3 text-emerald-400' />
                  <span>Pre-IPO preparation and treasury management</span>
                </li>
              </ul>
            </div>

            <div className='rounded-xl bg-slate-700/40 p-6'>
              <h4 className='mb-3 text-lg font-bold text-cyan-400'>
                Market Dynamics
              </h4>
              <ul className='space-y-2 text-sm text-gray-300'>
                <li className='flex items-start gap-2'>
                  <ArrowRight className='mt-0.5 h-3 w-3 text-cyan-400' />
                  <span>Limited supply due to transfer restrictions</span>
                </li>
                <li className='flex items-start gap-2'>
                  <ArrowRight className='mt-0.5 h-3 w-3 text-cyan-400' />
                  <span>High institutional investor demand</span>
                </li>
                <li className='flex items-start gap-2'>
                  <ArrowRight className='mt-0.5 h-3 w-3 text-cyan-400' />
                  <span>Premium valuations reflect scarcity value</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Important Notice */}
          <div className='mt-6 rounded-lg border border-blue-200 bg-blue-50 p-4'>
            <div className='flex items-start gap-3'>
              <Shield className='mt-0.5 h-5 w-5 text-blue-600' />
              <div>
                <div className='text-sm font-semibold text-blue-700'>
                  Secondary Market Structure
                </div>
                <div className='text-xs leading-relaxed text-gray-700'>
                  Secondary trading has been primarily through
                  company-facilitated events due to transfer restrictions and
                  Stripe&apos;s governance structure. Official tender offers
                  and sanctioned transactions have been the primary mechanisms
                  for equity liquidity, ensuring controlled price discovery and
                  regulatory compliance.
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
