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
  { name: 'Salesforce', valuation: 250.39 },
  { name: 'Snowflake', valuation: 225.54 },
  { name: 'Palantir', valuation: 157.84 },
  { name: 'Databricks', valuation: 149.7 },
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
            formatter={(value: number) => [`$${value}`, 'Stock Price']}
          />
          <Legend />
          <Bar
            dataKey='valuation'
            fill='hsl(var(--primary))'
            name='Stock Price'
            radius={[0, 4, 4, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
