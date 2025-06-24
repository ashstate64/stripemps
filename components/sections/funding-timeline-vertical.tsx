'use client';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { TrendingUp, Rocket, Crown, Zap, Building, Globe } from 'lucide-react';

const fundingRounds = [
  {
    date: 'Dec 2015',
    event: 'Initial Non-Profit Founding',
    amount: '$1B',
    amountType: 'Pledged',
    investors: 'Elon Musk, Sam Altman, Peter Thiel, Reid Hoffman',
    valuation: 'Non-Profit',
    valuationNumeric: 0,
    growth: null,
    color: 'from-gray-500 to-gray-600',
    icon: Rocket,
    achievement: 'Established OpenAI as AI safety research organization',
    highlight: false,
  },
  {
    date: 'July 2019',
    event: 'Series A / Microsoft Partnership',
    amount: '$1B',
    amountType: 'Investment',
    investors: 'Microsoft Corporation',
    valuation: 'Undisclosed',
    valuationNumeric: 1,
    growth: null,
    color: 'from-blue-500 to-blue-600',
    icon: Building,
    achievement: 'Transition to capped-profit model, strategic partnership',
    highlight: false,
  },
  {
    date: 'Jan 2023',
    event: 'Series B / Microsoft Expansion',
    amount: '$10B',
    amountType: 'Multi-year',
    investors: 'Microsoft Corporation',
    valuation: '$29B',
    valuationNumeric: 29,
    growth: '+2,800%',
    color: 'from-green-500 to-emerald-600',
    icon: Zap,
    achievement: 'ChatGPT launch, consumer AI breakthrough',
    highlight: false,
  },
  {
    date: 'Apr 2023',
    event: 'Secondary Tender Offer',
    amount: '$300M',
    amountType: 'Employee shares',
    investors: 'Sequoia, a16z, Thrive Capital',
    valuation: '$27-29B',
    valuationNumeric: 28,
    growth: 'Stable',
    color: 'from-purple-500 to-purple-600',
    icon: Globe,
    achievement: 'Employee liquidity, institutional validation',
    highlight: false,
  },
  {
    date: 'Oct 2024',
    event: 'Series E (Convertible Note)',
    amount: '$6.6B',
    amountType: 'Convertible',
    investors: 'Thrive, Khosla, Microsoft, NVIDIA',
    valuation: '$157B',
    valuationNumeric: 157,
    growth: '+442%',
    color: 'from-orange-500 to-red-600',
    icon: TrendingUp,
    achievement: 'GPT-4o, advanced reasoning models, enterprise adoption',
    highlight: true,
  },
  {
    date: 'Mar 2025',
    event: 'Series F (Mega-Round)',
    amount: '$40B',
    amountType: 'Mega-round',
    investors: 'SoftBank (lead), Microsoft, Coatue',
    valuation: '$300B',
    valuationNumeric: 300,
    growth: '+91%',
    color: 'from-yellow-400 via-orange-500 to-red-600',
    icon: Crown,
    achievement: 'AGI development, compute infrastructure, global expansion',
    highlight: true,
  },
];

const maxValuation = 300; // For progress bar calculations

export function FundingTimelineVertical() {
  const totalRaised = 57.9;
  const latestValuation = 300;

  return (
    <Card className='hover:border-primary/50 hover:shadow-primary/20 overflow-hidden border border-slate-700 bg-slate-800/60 shadow-2xl backdrop-blur-sm transition-all duration-300'>
      <CardHeader className='p-6 md:p-8'>
        <div className='flex flex-col items-start text-center md:flex-row md:items-center md:text-left'>
          <div className='mb-4 flex-shrink-0 self-center rounded-full bg-gradient-to-br from-purple-600/20 to-blue-600/20 p-4 md:mr-6 md:mb-0 md:self-start'>
            <TrendingUp className='h-10 w-10 text-purple-400' />
          </div>
          <div className='flex-grow'>
            <CardTitle className='bg-gradient-to-r from-white to-gray-300 bg-clip-text text-3xl leading-tight font-bold text-transparent md:text-4xl'>
              Funding & Valuation Journey
            </CardTitle>
            <CardDescription className='mt-3 text-lg text-gray-200'>
              Exponential growth from non-profit research to $300B valuation —
              the most valuable private AI company in history
            </CardDescription>
          </div>
        </div>

        {/* Key Metrics Summary */}
        <div className='mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3'>
          <div className='rounded-xl border border-green-500/30 bg-gradient-to-br from-green-900/20 to-emerald-900/20 p-4 text-center'>
            <div className='text-2xl font-bold text-green-400'>
              ${totalRaised}B+
            </div>
            <div className='text-sm text-gray-300'>Total Raised</div>
          </div>
          <div className='rounded-xl border border-blue-500/30 bg-gradient-to-br from-blue-900/20 to-purple-900/20 p-4 text-center'>
            <div className='text-2xl font-bold text-blue-400'>
              ${latestValuation}B
            </div>
            <div className='text-sm text-gray-300'>Current Valuation</div>
          </div>
          <div className='rounded-xl border border-yellow-500/30 bg-gradient-to-br from-yellow-900/20 to-orange-900/20 p-4 text-center'>
            <div className='text-2xl font-bold text-yellow-400'>29,900%+</div>
            <div className='text-sm text-gray-300'>Growth Since 2019</div>
          </div>
        </div>
      </CardHeader>

      <CardContent className='p-6 md:p-8'>
        <div className='relative'>
          {/* Enhanced vertical timeline line */}
          <div className='absolute top-0 bottom-0 left-6 w-1 bg-gradient-to-b from-gray-600 via-blue-500 to-yellow-400 md:left-1/2 md:w-2'></div>

          {fundingRounds.map((round, index) => {
            const progressPercent =
              (round.valuationNumeric / maxValuation) * 100;

            return (
              <div
                key={index}
                className='group relative mb-16 flex w-full md:items-center'
              >
                {/* Content Card */}
                <div
                  className={`w-full transition-all duration-500 group-hover:scale-105 md:w-1/2 ${
                    index % 2 === 0 ? 'md:pr-8' : 'md:order-2 md:pl-8'
                  }`}
                >
                  <div
                    className={`relative ml-12 overflow-hidden rounded-2xl border-2 border-slate-600/50 bg-gradient-to-br ${round.color} p-1 shadow-2xl transition-all duration-500 group-hover:border-white/30 group-hover:shadow-xl md:ml-0 ${
                      round.highlight ? 'ring-2 ring-yellow-400/50' : ''
                    }`}
                  >
                    {/* Gradient overlay */}
                    <div className='rounded-xl bg-slate-800/95 p-6 backdrop-blur-sm'>
                      {/* Header */}
                      <div
                        className={`flex items-center justify-between ${
                          index % 2 === 0 ? 'md:flex-row-reverse' : ''
                        }`}
                      >
                        <div
                          className={`${index % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}
                        >
                          <div className='mb-2 flex items-center gap-2'>
                            <round.icon className='h-5 w-5 text-white' />
                            <span className='text-sm font-bold text-blue-400'>
                              {round.date}
                            </span>
                          </div>
                          <h4 className='text-xl font-bold text-white'>
                            {round.event}
                          </h4>
                        </div>
                        {round.highlight && (
                          <div className='ml-3 rounded-full bg-yellow-400/20 p-2'>
                            <Crown className='h-5 w-5 text-yellow-400' />
                          </div>
                        )}
                      </div>

                      {/* Key Metrics */}
                      <div
                        className={`mt-4 grid grid-cols-2 gap-3 ${
                          index % 2 === 0 ? 'md:text-right' : 'md:text-left'
                        }`}
                      >
                        <div>
                          <div className='text-sm font-medium text-gray-300'>
                            Investment
                          </div>
                          <div className='text-lg font-bold text-white'>
                            {round.amount}
                          </div>
                          <div className='text-xs text-gray-400'>
                            {round.amountType}
                          </div>
                        </div>
                        <div>
                          <div className='text-sm font-medium text-gray-300'>
                            Valuation
                          </div>
                          <div className='text-lg font-bold text-green-400'>
                            {round.valuation}
                          </div>
                          {round.growth && (
                            <div className='text-xs font-semibold text-emerald-400'>
                              {round.growth}
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Valuation Progress Bar */}
                      {round.valuationNumeric > 0 && (
                        <div className='mt-4'>
                          <div className='mb-2 flex items-center justify-between text-xs text-gray-400'>
                            <span>Valuation Progress</span>
                            <span>
                              {progressPercent.toFixed(0)}% of current
                            </span>
                          </div>
                          <div className='h-2 overflow-hidden rounded-full bg-slate-700'>
                            <div
                              className={`h-full bg-gradient-to-r ${round.color} transition-all duration-1000 ease-out`}
                              style={{ width: `${progressPercent}%` }}
                            ></div>
                          </div>
                        </div>
                      )}

                      {/* Achievement */}
                      <div
                        className={`mt-4 rounded-lg bg-slate-700/50 p-3 ${
                          index % 2 === 0 ? 'md:text-right' : 'md:text-left'
                        }`}
                      >
                        <div className='text-xs font-semibold text-purple-400'>
                          Key Achievement
                        </div>
                        <div className='text-sm text-gray-300'>
                          {round.achievement}
                        </div>
                      </div>

                      {/* Investors */}
                      <div
                        className={`mt-3 ${
                          index % 2 === 0 ? 'md:text-right' : 'md:text-left'
                        }`}
                      >
                        <div className='text-xs font-medium text-gray-400'>
                          Lead Investors
                        </div>
                        <div className='text-sm text-gray-200'>
                          {round.investors}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Enhanced Timeline Dot */}
                <div className='absolute top-8 left-6 z-10 md:top-1/2 md:left-1/2 md:-translate-y-1/2'>
                  <div
                    className={`h-6 w-6 -translate-x-1/2 rounded-full border-4 border-slate-800 bg-gradient-to-r ${round.color} shadow-lg transition-all duration-300 group-hover:scale-125 ${
                      round.highlight ? 'ring-2 ring-yellow-400/50' : ''
                    }`}
                  >
                    <div className='absolute inset-0 animate-ping rounded-full bg-white/20'></div>
                  </div>
                </div>

                {/* Spacer for alternating layout */}
                <div
                  className={`hidden md:block md:w-1/2 ${
                    index % 2 === 0 ? 'md:order-2' : ''
                  }`}
                ></div>
              </div>
            );
          })}
        </div>

        {/* Summary Impact */}
        <div className='mt-12 rounded-2xl border border-yellow-500/30 bg-gradient-to-br from-yellow-900/10 via-orange-900/10 to-red-900/10 p-8 text-center'>
          <div className='mb-4'>
            <Crown className='mx-auto h-12 w-12 text-yellow-400' />
          </div>
          <h3 className='mb-3 text-2xl font-bold text-white'>
            Historic Achievement
          </h3>
          <p className='mx-auto max-w-3xl text-lg leading-relaxed text-gray-300'>
            OpenAI has achieved{' '}
            <span className='font-bold text-yellow-400'>$57.9 billion</span> in
            total funding, representing one of the largest funding totals for
            any private company in history. The journey from non-profit research
            organization to{' '}
            <span className='font-bold text-green-400'>
              $300 billion valuation
            </span>
            showcases unprecedented growth in the AI sector.
          </p>

          {/* Key Stats */}
          <div className='mt-6 grid grid-cols-1 gap-4 md:grid-cols-4'>
            <div>
              <div className='text-2xl font-bold text-blue-400'>10 Years</div>
              <div className='text-sm text-gray-400'>Journey Timeline</div>
            </div>
            <div>
              <div className='text-2xl font-bold text-purple-400'>6 Rounds</div>
              <div className='text-sm text-gray-400'>Major Fundings</div>
            </div>
            <div>
              <div className='text-2xl font-bold text-green-400'>
                15+ Investors
              </div>
              <div className='text-sm text-gray-400'>World-Class Backers</div>
            </div>
            <div>
              <div className='text-2xl font-bold text-yellow-400'>#1 AI</div>
              <div className='text-sm text-gray-400'>Private Valuation</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
