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

const paymentVolumeData = [
  { year: '2021', volume: 640 }, // $640B estimated
  { year: '2022', volume: 817 }, // $817B estimated  
  { year: '2023', volume: 1000 }, // ~$1T estimated
  { year: '2024', volume: 1400 }, // $1.4T confirmed
];

export function RevenueProjectionChart() {
  return (
    <div className='h-80 w-full rounded-lg bg-slate-50 p-2 shadow-inner dark:bg-slate-800/50 sm:p-4'>
      <ResponsiveContainer width='100%' height='100%'>
        <BarChart
          data={paymentVolumeData}
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
              value: 'Payment Volume ($B)',
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
            formatter={(value: number) => [`$${value} Billion`, 'Payment Volume']}
          />
          <Legend />
          <Bar
            dataKey='volume'
            fill='hsl(var(--primary))'
            name='Total Payment Volume'
            radius={[4, 4, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
