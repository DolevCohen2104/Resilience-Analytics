import React from 'react';
import {
  Radar,
  RadarChart as RechartsRadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Legend,
} from 'recharts';

interface RadarChartProps {
  data: Array<{ subject: string; current: number; baseline: number; fullMark: number }>;
  size?: 'small' | 'large';
}

const RadarChart: React.FC<RadarChartProps> = ({ data, size = 'small' }) => {
  return (
    <ResponsiveContainer width="100%" height={size === 'large' ? 350 : 250}>
      <RechartsRadarChart cx="50%" cy="50%" outerRadius={size === 'large' ? '70%' : '65%'} data={data}>
        <PolarGrid stroke="#1E293B" />
        <PolarAngleAxis
          dataKey="subject"
          tick={{ fill: '#94A3B8', fontSize: 11, fontFamily: 'Heebo' }}
        />
        <PolarRadiusAxis
          angle={90}
          domain={[0, 100]}
          tick={{ fill: '#64748B', fontSize: 10 }}
          axisLine={false}
        />
        <Radar
          name="בסיס"
          dataKey="baseline"
          stroke="#64748B"
          fill="#64748B"
          fillOpacity={0.1}
          strokeDasharray="5 5"
        />
        <Radar
          name="נוכחי"
          dataKey="current"
          stroke="#38BDF8"
          fill="#38BDF8"
          fillOpacity={0.2}
        />
        <Legend
          wrapperStyle={{ fontSize: '11px', fontFamily: 'Heebo' }}
        />
      </RechartsRadarChart>
    </ResponsiveContainer>
  );
};

export default RadarChart;
