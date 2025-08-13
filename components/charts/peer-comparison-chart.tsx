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
  { name: 'OpenAI', valuation: 300 },
  { name: 'Anthropic', valuation: 61.5 },
  { name: 'Mistral AI', valuation: 6.2 },
  { name: 'Cohere', valuation: 5.5 },
];

export function PeerComparisonChart() {
  return (
    <div className='h-96 w-full rounded-lg bg-slate-50 p-2 shadow-inner dark:bg-slate-800/50 sm:p-4'>
      <ResponsiveContainer width='100%' height='100%'>
        <BarChart
          data={peerData}
          layout='vertical'
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray='3 3' strokeOpacity={0.2} />
          <XAxis
            type='number'
            stroke='hsl(var(--muted-foreground))'
            tickFormatter={(value) => `$${value}B`}
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
            formatter={(value: number) => [`$${value} Billion`, 'Valuation']}
          />
          <Legend />
          <Bar
            dataKey='valuation'
            fill='hsl(var(--primary))'
            name='Latest Valuation'
            radius={[0, 4, 4, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
