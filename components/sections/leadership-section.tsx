'use client';

import Image from 'next/image';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { ShieldCheck, Briefcase, LinkIcon } from 'lucide-react';

const leaders = [
  {
    name: 'Sam Altman',
    title: 'Co-founder & CEO',
    bio: 'Former President of Y Combinator, Altman has guided hundreds of unicorns and now steers OpenAI&apos;s mission to ensure AGI benefits all of humanity. Consistently ranked among the world&apos;s most influential innovators.',
    note: 'Altman personally holds no conventional equity; like all employees he participates via profit-share units, underscoring mission alignment.',
    imageUrl: '/Sam_Altman_TechCrunch_SF_2019_Day_2_Oct_3_(cropped).jpg',
  },
  {
    name: 'Greg Brockman',
    title: 'Co-founder & President',
    bio: 'Ex-CTO at Stripe, Brockman architected Stripe&apos;s global payments stack before co-building GPT-4 and ChatGPT. He oversees model training and product engineering.',
    imageUrl: '/Disrupt_SF_TechCrunch_Disrupt_San_Francisco_2019_-_Day_2_(48838200316)_(cropped).jpg',
  },
  {
    name: 'Mira Murati',
    title: 'Chief Technology Officer',
    bio: 'Former Tesla & Leap Motion engineer who scales research into deployable consumer products—including the ChatGPT iOS/Android apps used by 300M+ people worldwide.',
    imageUrl: '/mria.jpg',
  },
  {
    name: 'Brad Lightcap',
    title: 'Chief Operating Officer / CFO',
    bio: 'Ex-Dropbox finance head. Led the $40B SoftBank round and multiple tender offers, giving OpenAI one of the strongest balance-sheets in private tech.',
    imageUrl: '/bradlightcap.webp',
  },
  {
    name: 'Ilya Sutskever',
    title: 'Co-founder & Chief Scientist (Emeritus)',
    bio: 'A deep-learning pioneer, Sutskever co-authored ImageNet and seq-to-seq models. Stepped back from day-to-day duties in 2024 but remains an adviser and board observer.',
    imageUrl: '/Sutskever.webp',
  },
];

const boardMembers = [
  {
    name: 'Bret Taylor (Chair)',
    role: 'ex-co-CEO Salesforce & former Twitter chairman',
  },
  { name: 'Larry Summers', role: 'U.S. Treasury Secretary (1999-2001)' },
  { name: 'Gen. Paul Nakasone', role: 'former head, U.S. NSA & Cyber Command' },
  { name: 'Adam D&apos;Angelo', role: 'CEO, Quora / ex-Facebook CTO' },
  {
    name: 'Sue Desmond-Hellmann',
    role: 'Former CEO, Bill & Melinda Gates Foundation',
  },
  {
    name: 'Nicole Seligman',
    role: 'Former EVP and General Counsel, Sony Corporation',
  },
  { name: 'Fidji Simo', role: 'CEO, Instacart; Former Head of Facebook App' },
];

export function LeadershipSection() {
  return (
    <Card className='hover:shadow-primary/20 hover:border-primary/50 overflow-hidden border border-slate-700 bg-slate-800/60 shadow-2xl backdrop-blur-sm transition-all duration-300'>
      <CardHeader className='p-6 md:p-8'>
        <div className='flex flex-col items-start text-center md:flex-row md:items-center md:text-left'>
          <div className='bg-primary/10 mb-4 flex-shrink-0 self-center rounded-full p-3 md:mr-6 md:mb-0 md:self-start'>
            <Briefcase className='text-primary h-10 w-10' />
          </div>
          <div className='flex-grow'>
            <CardTitle className='text-3xl leading-tight font-bold text-white md:text-4xl'>
              Visionary Leadership & Governance
            </CardTitle>
            <CardDescription className='mt-3 text-lg text-gray-200'>
              Meet the experienced team guiding OpenAI&apos;s mission and the
              independent board ensuring robust oversight.
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className='p-6 pt-4 text-gray-200 md:p-8'>
        <h3 className='mb-6 text-center text-2xl font-semibold text-white md:text-left'>
          Executive Team
        </h3>
        <div className='mb-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3'>
          {leaders.map((leader) => (
            <div
              key={leader.name}
              className='flex flex-col items-center rounded-lg bg-slate-700/40 p-4 text-center shadow-lg transition-all duration-300 hover:bg-slate-700/70'
            >
              <Image
                src={leader.imageUrl || '/placeholder.svg'}
                alt={`Headshot of ${leader.name}`}
                width={80}
                height={80}
                className='border-primary/50 mb-3 rounded-full border-2 object-cover'
                style={{ 
                  maxWidth: '100%', 
                  maxHeight: '100%',
                  width: '80px',
                  height: '80px'
                }}
              />
              <h4 className='text-lg font-bold text-white'>{leader.name}</h4>
              <p className='text-primary text-sm font-medium'>{leader.title}</p>
              <p className='mt-2 flex-grow text-xs text-gray-300'>
                {leader.bio}
              </p>
              {leader.note && (
                <p className='mt-2 border-t border-slate-600 pt-2 text-xs text-gray-400 italic'>
                  {leader.note}
                </p>
              )}
            </div>
          ))}
        </div>

        <h3 className='mb-6 text-center text-2xl font-semibold text-white md:text-left'>
          Independent Board Oversight
        </h3>
        <div className='mb-6 rounded-lg bg-slate-700/40 p-6 shadow-lg'>
          <p className='mb-4 text-sm text-gray-300'>
            OpenAI&apos;s nonprofit parent, OpenAI, Inc., is governed by a board
            composed of a majority of independent directors who do not hold
            equity in OpenAI. This structure ensures the organization stays true
            to its mission of benefiting all of humanity.
          </p>
          <ul className='space-y-2'>
            {boardMembers.map((member) => (
              <li key={member.name} className='flex items-start'>
                <ShieldCheck className='mt-0.5 mr-2 h-5 w-5 flex-shrink-0 text-green-400' />
                <div>
                  <span className='font-semibold text-gray-100'>
                    {member.name}
                  </span>
                  <span className='ml-1 text-xs text-gray-400'>
                    ({member.role})
                  </span>
                </div>
              </li>
            ))}
          </ul>
          <p className='mt-4 text-xs text-gray-400'>
            For more details, visit{' '}
            <a
              href='https://openai.com/our-structure'
              target='_blank'
              rel='noopener noreferrer'
              className='text-primary inline-flex items-center hover:underline'
            >
              OpenAI&apos;s Our Structure page{' '}
              <LinkIcon className='ml-1 h-3 w-3' />
            </a>
            .
          </p>
        </div>

        <p className='mt-8 text-sm font-semibold text-gray-300'>
          Why it matters for investors: Seasoned operators combined with
          mission-driven governance aim for disciplined capital allocation and
          help mitigate key-person risk as OpenAI scales towards a potential
          IPO.
        </p>
        <p className='mt-4 text-xs text-gray-500 italic'>
          Leadership biographies provided for background only; they do not
          constitute an investment guarantee.
        </p>
      </CardContent>
    </Card>
  );
}
