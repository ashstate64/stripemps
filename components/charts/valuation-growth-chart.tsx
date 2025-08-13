'use client';

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';

const valuationData = [
  { date: 'Jan 2023', valuation: 29 },
  { date: 'Oct 2024', valuation: 157 },
  { date: 'Mar 2025', valuation: 300 },
];

export function ValuationGrowthChart() {
  return (
    <div className='h-80 w-full rounded-lg bg-slate-50 p-2 shadow-inner dark:bg-slate-800/50 sm:p-4'>
      <ResponsiveContainer width='100%' height='100%'>
        <LineChart
          data={valuationData}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray='3 3' strokeOpacity={0.2} />
          <XAxis dataKey='date' stroke='hsl(var(--muted-foreground))' />
          <YAxis
            label={{
              value: 'Valuation ($B)',
              angle: -90,
              position: 'insideLeft',
              fill: 'hsl(var(--muted-foreground))',
              fontSize: 12,
            }}
            stroke='hsl(var(--muted-foreground))'
            tickFormatter={(value) => `$${value}B`}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: 'hsl(var(--background))',
              borderColor: 'hsl(var(--border))',
            }}
            formatter={(value: number) => [`$${value} Billion`, 'Valuation']}
          />
          <Legend />
          <Line
            type='monotone'
            dataKey='valuation'
            stroke='hsl(var(--primary))'
            strokeWidth={3}
            activeDot={{ r: 8 }}
            name='Post-Money Valuation'
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
