'use client';

import Image from 'next/image';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { ShieldCheck, Briefcase } from 'lucide-react';

const leaders = [
  {
    name: 'Patrick Collison',
    title: 'Co-founder & CEO',
    bio: 'Irish entrepreneur who co-founded Stripe in 2010. Under his leadership, Stripe has grown to process $1.4T in payment volume during 2024 and achieved profitability, revolutionizing online payments infrastructure.',
    note: "Patrick has led Stripe from startup to becoming one of the world's most valuable private fintech companies.",
    imageUrl: '/leadership/patrick-collison.jpeg',
  },
  {
    name: 'John Collison',
    title: 'Co-founder & President',
    bio: 'Co-founder and President of Stripe, John focuses on product development and business operations. Together with Patrick, he has built Stripe into the leading payments infrastructure company.',
    imageUrl: '/leadership/john-collison.jpg',
  },
  {
    name: 'Rahul Patil',
    title: 'Chief Technology Officer',
    bio: "Current CTO since August 2024. Patil leads Stripe's engineering and technical strategy, overseeing the platform that processes trillions in payment volume annually.",
    imageUrl: '/leadership/rahul-patil.jpeg',
  },
  {
    name: 'Steffan Tomlinson',
    title: 'Chief Financial Officer',
    bio: "CFO since August 2023. Tomlinson brings extensive financial leadership experience, guiding Stripe to profitability in 2024 and managing the company's strategic financial operations.",
    imageUrl: '/leadership/steffan-tomlinson.avif',
  },
  {
    name: "Eileen O'Mara",
    title: 'Chief Revenue Officer',
    bio: "CRO appointed in October 2023. O'Mara drives Stripe's global revenue strategy and enterprise customer growth across the company's expanding product portfolio.",
    imageUrl: '/leadership/eileen-omara.webp',
  },
];

const boardMembers = [
  {
    name: 'Patrick Collison',
    role: 'CEO & Co-founder',
  },
  { name: 'John Collison', role: 'President & Co-founder' },
  { name: 'Rahul Patil', role: 'Chief Technology Officer (since Aug 2024)' },
  {
    name: 'Steffan Tomlinson',
    role: 'Chief Financial Officer (since Aug 2023)',
  },
  {
    name: "Eileen O'Mara",
    role: 'Chief Revenue Officer (since Oct 2023)',
  },
];

export function LeadershipSection() {
  return (
    <Card className='overflow-hidden border border-gray-200 bg-white shadow-lg transition-all duration-300 hover:border-blue-300 hover:shadow-xl'>
      <CardHeader className='p-6 md:p-8'>
        <div className='flex flex-col items-start text-center md:flex-row md:items-center md:text-left'>
          <div className='mb-4 flex-shrink-0 self-center rounded-full bg-blue-100 p-3 md:mb-0 md:mr-6 md:self-start'>
            <Briefcase className='h-10 w-10 text-blue-600' />
          </div>
          <div className='flex-grow'>
            <CardTitle className='text-3xl font-bold leading-tight text-gray-900 md:text-4xl'>
              Visionary Leadership & Governance
            </CardTitle>
            <CardDescription className='mt-3 text-lg text-gray-600'>
              Meet the experienced team guiding Stripe&apos;s mission and the
              leadership ensuring robust enterprise execution.
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className='p-6 pt-4 text-gray-700 md:p-8'>
        <h3 className='mb-6 text-center text-2xl font-semibold text-gray-900 md:text-left'>
          Executive Team
        </h3>
        <div className='mb-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3'>
          {leaders.map((leader) => (
            <div
              key={leader.name}
              className='flex flex-col items-center rounded-lg border border-gray-200 bg-white p-4 text-center shadow-sm transition-all duration-300 hover:shadow-md'
            >
              <Image
                src={leader.imageUrl || '/placeholder.svg'}
                alt={`Headshot of ${leader.name}`}
                width={80}
                height={80}
                className='mb-3 rounded-full border-2 border-blue-200 object-cover'
                style={{
                  maxWidth: '100%',
                  maxHeight: '100%',
                  width: '80px',
                  height: '80px',
                }}
              />
              <h4 className='text-lg font-bold text-gray-900'>{leader.name}</h4>
              <p className='text-sm font-medium text-blue-600'>
                {leader.title}
              </p>
              <p className='mt-2 flex-grow text-xs text-gray-600'>
                {leader.bio}
              </p>
              {leader.note && (
                <p className='mt-2 border-t border-gray-200 pt-2 text-xs italic text-gray-500'>
                  {leader.note}
                </p>
              )}
            </div>
          ))}
        </div>

        <h3 className='mb-6 text-center text-2xl font-semibold text-gray-900 md:text-left'>
          Leadership Team
        </h3>
        <div className='mb-6 rounded-lg border border-gray-200 bg-white p-6 shadow-sm'>
          <p className='mb-4 text-sm text-gray-700'>
            Stripe&apos;s leadership team combines deep technical expertise with
            proven business execution. The founding team created the modern
            payments infrastructure and continues to drive innovation in fintech
            for enterprise customers worldwide.
          </p>
          <ul className='space-y-2'>
            {boardMembers.map((member) => (
              <li key={member.name} className='flex items-start'>
                <ShieldCheck className='mr-2 mt-0.5 h-5 w-5 flex-shrink-0 text-blue-600' />
                <div>
                  <span className='font-semibold text-gray-900'>
                    {member.name}
                  </span>
                  <span className='ml-1 text-xs text-gray-600'>
                    ({member.role})
                  </span>
                </div>
              </li>
            ))}
          </ul>
          <p className='mt-4 text-xs text-gray-600'>
            <strong>Why it matters for investors:</strong> Seasoned operators
            combined with proven technical leadership aim for disciplined
            capital allocation and help mitigate key-person risk as Stripe
            scales towards a potential IPO.
          </p>
          <p className='mt-2 text-xs italic text-gray-500'>
            Leadership biographies provided for background only; they do not
            constitute an investment guarantee.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
