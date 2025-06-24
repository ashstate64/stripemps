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

const revenueData = [
  { year: '2023', revenue: 0.2 }, // ~$200M
  { year: '2024', revenue: 3.6 }, // Estimated
  { year: '2025', revenue: 11.6 }, // Projected
];

export function RevenueProjectionChart() {
  return (
    <div className='h-80 w-full rounded-lg bg-slate-50 p-4 shadow-inner dark:bg-slate-800/50'>
      <ResponsiveContainer width='100%' height='100%'>
        <BarChart
          data={revenueData}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray='3 3' strokeOpacity={0.2} />
          <XAxis dataKey='year' stroke='hsl(var(--muted-foreground))' />
          <YAxis
            label={{
              value: 'Revenue ($B)',
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
            formatter={(value: number) => [`$${value} Billion`, 'Revenue']}
          />
          <Legend />
          <Bar
            dataKey='revenue'
            fill='hsl(var(--primary))'
            name='Annual Revenue'
            radius={[4, 4, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
