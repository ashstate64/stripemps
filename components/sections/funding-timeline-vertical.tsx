'use client';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { TrendingUp, Rocket, Crown, Zap, Building } from 'lucide-react';

const fundingRounds = [
  {
    date: 'Oct 2013',
    event: 'Series A',
    amount: '$13.9M',
    amountType: 'Series A',
    investors: 'Andreessen Horowitz, New Enterprise Associates',
    valuation: 'Early Stage',
    valuationNumeric: 0,
    growth: null,
    color: 'from-gray-500 to-gray-600',
    icon: Rocket,
    achievement:
      'Founded by Apache Spark creators, established unified analytics',
    highlight: false,
  },
  {
    date: 'Jun 2014',
    event: 'Series B',
    amount: '$34.1M',
    amountType: 'Series B',
    investors: 'Andreessen Horowitz, New Enterprise Associates',
    valuation: 'Growth Stage',
    valuationNumeric: 0.1,
    growth: null,
    color: 'from-blue-500 to-blue-600',
    icon: Building,
    achievement: 'Expanded enterprise data platform capabilities',
    highlight: false,
  },
  {
    date: 'Sep 2023',
    event: 'Series I',
    amount: '$549.9M',
    amountType: 'Series I',
    investors: 'Andreessen Horowitz, Insight Partners',
    valuation: '$43B',
    valuationNumeric: 43,
    growth: '+17%',
    color: 'from-green-500 to-emerald-600',
    icon: Zap,
    achievement: 'AI/ML platform expansion, enterprise growth',
    highlight: false,
  },
  {
    date: 'Dec 2024',
    event: 'Series J',
    amount: '$10.17B',
    amountType: 'Series J',
    investors: 'Andreessen Horowitz, Insight Partners, DST, GIC, WCM',
    valuation: '$62B',
    valuationNumeric: 62,
    growth: '+22%',
    color: 'from-purple-500 to-purple-600',
    icon: Crown,
    achievement: 'Record funding round, pre-IPO preparation',
    highlight: true,
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
    date: 'Q4 2025',
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
  const totalRaised = 14.29;
  const latestValuation = 62;

  return (
    <Card className='overflow-hidden border border-gray-200 bg-white shadow-lg transition-all duration-300 hover:border-blue-300 hover:shadow-xl'>
      <CardHeader className='p-6 md:p-8'>
        <div className='flex flex-col items-start text-center md:flex-row md:items-center md:text-left'>
          <div className='mb-4 flex-shrink-0 self-center rounded-full bg-blue-100 p-4 md:mb-0 md:mr-6 md:self-start'>
            <TrendingUp className='h-10 w-10 text-blue-600' />
          </div>
          <div className='flex-grow'>
            <CardTitle className='text-3xl font-bold leading-tight text-gray-900 md:text-4xl'>
              Funding & Valuation Journey
            </CardTitle>
            <CardDescription className='mt-3 text-lg text-gray-600'>
              Consistent growth from startup to $62B valuation — the leading
              data intelligence platform
            </CardDescription>
          </div>
        </div>

        {/* Mobile-Optimized Key Metrics Summary */}
        <div className='mt-4 grid grid-cols-3 gap-2 sm:mt-6 sm:gap-3 md:gap-4'>
          <div className='rounded-lg border border-green-200 bg-green-50 p-2 text-center sm:rounded-xl sm:p-3 md:p-4'>
            <div className='text-sm font-bold text-green-700 sm:text-lg md:text-xl lg:text-2xl'>
              ${totalRaised}B
            </div>
            <div className='text-xs text-gray-600 sm:text-sm'>
              <span className='sm:hidden'>Raised</span>
              <span className='hidden sm:inline'>Total Raised</span>
            </div>
          </div>
          <div className='rounded-lg border border-blue-200 bg-blue-50 p-2 text-center sm:rounded-xl sm:p-3 md:p-4'>
            <div className='text-sm font-bold text-blue-700 sm:text-lg md:text-xl lg:text-2xl'>
              ${latestValuation}B
            </div>
            <div className='text-xs text-gray-600 sm:text-sm'>
              <span className='sm:hidden'>Value</span>
              <span className='hidden sm:inline'>Latest Valuation</span>
            </div>
          </div>
          <div className='rounded-lg border border-orange-200 bg-orange-50 p-2 text-center sm:rounded-xl sm:p-3 md:p-4'>
            <div className='text-sm font-bold text-orange-700 sm:text-lg md:text-xl lg:text-2xl'>
              10,000+
            </div>
            <div className='text-xs text-gray-600 sm:text-sm'>
              <span className='sm:hidden'>Customers</span>
              <span className='hidden sm:inline'>Enterprise Customers</span>
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className='p-6 md:p-8'>
        <div className='relative'>
          {/* Enhanced vertical timeline line */}
          <div className='absolute bottom-0 left-6 top-0 w-1 bg-gradient-to-b from-gray-600 via-blue-500 to-yellow-400 md:left-1/2 md:w-2'></div>

          {fundingRounds.map((round, index) => {
            const progressPercent =
              (round.valuationNumeric / maxValuation) * 100;

            return (
              <div
                key={index}
                className='group relative mb-8 flex w-full sm:mb-10 md:mb-12 md:items-center lg:mb-16'
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
                    {/* Mobile-Optimized Content */}
                    <div className='rounded-lg bg-slate-800/95 p-3 backdrop-blur-sm sm:rounded-xl sm:p-4 md:p-5 lg:p-6'>
                      {/* Compact Header */}
                      <div
                        className={`flex items-start justify-between ${
                          index % 2 === 0 ? 'md:flex-row-reverse' : ''
                        }`}
                      >
                        <div
                          className={`flex-1 ${index % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}
                        >
                          <div className='mb-1 flex items-center gap-2 sm:mb-2'>
                            <round.icon className='h-4 w-4 text-white sm:h-5 sm:w-5' />
                            <span className='text-xs font-bold text-blue-400 sm:text-sm'>
                              {round.date}
                            </span>
                          </div>
                          <h4 className='text-sm font-bold text-white sm:text-base md:text-lg lg:text-xl'>
                            {round.event}
                          </h4>
                        </div>
                        {round.highlight && (
                          <div className='ml-2 rounded-full bg-yellow-400/20 p-1 sm:ml-3 sm:p-2'>
                            <Crown className='h-3 w-3 text-yellow-400 sm:h-4 sm:w-4 md:h-5 md:w-5' />
                          </div>
                        )}
                      </div>

                      {/* Compact Key Metrics */}
                      <div
                        className={`mt-2 grid grid-cols-2 gap-2 sm:mt-3 sm:gap-3 md:mt-4 ${
                          index % 2 === 0 ? 'md:text-right' : 'md:text-left'
                        }`}
                      >
                        <div>
                          <div className='text-xs font-medium text-gray-300 sm:text-sm'>
                            Investment
                          </div>
                          <div className='text-sm font-bold text-white sm:text-base md:text-lg'>
                            {round.amount}
                          </div>
                          <div className='text-xs text-gray-400'>
                            {round.amountType}
                          </div>
                        </div>
                        <div>
                          <div className='text-xs font-medium text-gray-300 sm:text-sm'>
                            Valuation
                          </div>
                          <div className='text-sm font-bold text-green-400 sm:text-base md:text-lg'>
                            {round.valuation}
                          </div>
                          {round.growth && (
                            <div className='text-xs font-semibold text-emerald-400'>
                              {round.growth}
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Compact Progress Bar - Hidden on small mobile */}
                      {round.valuationNumeric > 0 && (
                        <div className='mt-2 hidden sm:mt-3 sm:block md:mt-4'>
                          <div className='mb-1 flex items-center justify-between text-xs text-gray-400 sm:mb-2'>
                            <span className='hidden sm:inline'>
                              Valuation Progress
                            </span>
                            <span className='sm:hidden'>Progress</span>
                            <span>{progressPercent.toFixed(0)}%</span>
                          </div>
                          <div className='h-1 overflow-hidden rounded-full bg-slate-700 sm:h-2'>
                            <div
                              className={`h-full bg-gradient-to-r ${round.color} transition-all duration-1000 ease-out`}
                              style={{ width: `${progressPercent}%` }}
                            ></div>
                          </div>
                        </div>
                      )}

                      {/* Compact Achievement */}
                      <div
                        className={`mt-2 rounded-md bg-slate-700/50 p-2 sm:mt-3 sm:rounded-lg sm:p-3 md:mt-4 ${
                          index % 2 === 0 ? 'md:text-right' : 'md:text-left'
                        }`}
                      >
                        <div className='text-xs font-semibold text-purple-400'>
                          Achievement
                        </div>
                        <div className='text-xs text-gray-300 sm:text-sm'>
                          {round.achievement}
                        </div>
                      </div>

                      {/* Compact Investors */}
                      <div
                        className={`mt-2 sm:mt-3 ${
                          index % 2 === 0 ? 'md:text-right' : 'md:text-left'
                        }`}
                      >
                        <div className='text-xs font-medium text-gray-400'>
                          Investors
                        </div>
                        <div className='text-xs text-gray-200 sm:text-sm'>
                          {round.investors}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Enhanced Timeline Dot */}
                <div className='absolute left-6 top-8 z-10 md:left-1/2 md:top-1/2 md:-translate-y-1/2'>
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

        {/* Mobile-Optimized Summary Impact */}
        <div className='mt-6 rounded-lg border border-blue-200 bg-blue-50 p-4 text-center sm:mt-8 sm:rounded-xl sm:p-6 md:mt-10 md:p-8 lg:mt-12 lg:rounded-2xl'>
          <div className='mb-3 sm:mb-4'>
            <Crown className='mx-auto h-8 w-8 text-blue-600 sm:h-10 sm:w-10 md:h-12 md:w-12' />
          </div>
          <h3 className='mb-2 text-lg font-bold text-gray-900 sm:mb-3 sm:text-xl md:text-2xl'>
            Historic Achievement
          </h3>
          <p className='mx-auto max-w-3xl text-sm leading-relaxed text-gray-700 sm:text-base md:text-lg'>
            Databricks has achieved{' '}
            <span className='font-bold text-blue-600'>$14.29 billion</span> in
            total funding, representing one of the largest funding totals for
            any data intelligence company. The journey from startup to{' '}
            <span className='font-bold text-green-600'>
              $62 billion valuation
            </span>
            showcases consistent growth in the enterprise data sector.
          </p>

          {/* Mobile-Optimized Key Stats */}
          <div className='mt-4 grid grid-cols-2 gap-3 sm:mt-6 sm:grid-cols-4 sm:gap-4 md:gap-6'>
            <div>
              <div className='text-lg font-bold text-blue-600 sm:text-xl md:text-2xl'>
                11 Years
              </div>
              <div className='text-xs text-gray-600 sm:text-sm'>
                <span className='sm:hidden'>Timeline</span>
                <span className='hidden sm:inline'>Journey Timeline</span>
              </div>
            </div>
            <div>
              <div className='text-lg font-bold text-purple-600 sm:text-xl md:text-2xl'>
                10 Rounds
              </div>
              <div className='text-xs text-gray-600 sm:text-sm'>
                <span className='sm:hidden'>Fundings</span>
                <span className='hidden sm:inline'>Major Fundings</span>
              </div>
            </div>
            <div>
              <div className='text-lg font-bold text-green-600 sm:text-xl md:text-2xl'>
                20+ Investors
              </div>
              <div className='text-xs text-gray-600 sm:text-sm'>
                <span className='sm:hidden'>Backers</span>
                <span className='hidden sm:inline'>World-Class Backers</span>
              </div>
            </div>
            <div>
              <div className='text-lg font-bold text-orange-600 sm:text-xl md:text-2xl'>
                #1 Data
              </div>
              <div className='text-xs text-gray-600 sm:text-sm'>
                <span className='sm:hidden'>Platform</span>
                <span className='hidden sm:inline'>Intelligence Platform</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
