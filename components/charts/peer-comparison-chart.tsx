'use client';

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';

const peerData = [
  { name: 'Shopify (Public)', valuation: 143.75, type: 'public' },
  { name: 'Stripe (Private)', valuation: 91.5, type: 'private' },
  { name: 'PayPal (Public)', valuation: 67.72, type: 'public' },
  { name: 'Toast (Public)', valuation: 40.8, type: 'public' },
];

export function PeerComparisonChart() {
  return (
    <div className='h-80 w-full rounded-lg bg-slate-50 p-2 shadow-inner dark:bg-slate-800/50 sm:h-96 sm:p-4'>
      <ResponsiveContainer width='100%' height='100%'>
        <BarChart
          data={peerData}
          layout='vertical'
          margin={{
            top: 5,
            right: 10,
            left: 10,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray='3 3' strokeOpacity={0.2} />
          <XAxis
            type='number'
            stroke='hsl(var(--muted-foreground))'
            tickFormatter={(value) => `$${value}`}
          />
          <YAxis
            dataKey='name'
            type='category'
            stroke='hsl(var(--muted-foreground))'
            width={80}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: 'hsl(var(--background))',
              borderColor: 'hsl(var(--border))',
            }}
            formatter={(value: number, name: string, props: any) => [
              `$${value}${props.payload.type === 'private' ? 'B Tender Offer' : ' Stock Price'}`,
              props.payload.type === 'private' ? 'Valuation' : 'Market Cap',
            ]}
          />
          <Legend />
          <Bar
            dataKey='valuation'
            fill='hsl(var(--primary))'
            name='Valuation Comparison'
            radius={[0, 4, 4, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
