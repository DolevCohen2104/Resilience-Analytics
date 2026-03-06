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
import { useTheme } from '../ThemeContext';

interface RadarChartProps {
  data: Array<{ subject: string; current: number; baseline: number; fullMark: number }>;
  size?: 'small' | 'large';
}

const RadarChart: React.FC<RadarChartProps> = ({ data, size = 'small' }) => {
  const { theme } = useTheme();
  const gridColor = theme === 'dark' ? '#1E293B' : '#D1D5DB';
  const labelColor = theme === 'dark' ? '#CBD5E1' : '#334155';
  const tickColor = theme === 'dark' ? '#94A3B8' : '#64748B';

  return (
    <ResponsiveContainer width="100%" height={size === 'large' ? 350 : 250}>
      <RechartsRadarChart cx="50%" cy="50%" outerRadius={size === 'large' ? '70%' : '65%'} data={data}>
        <PolarGrid stroke={gridColor} />
        <PolarAngleAxis
          dataKey="subject"
          tick={{ fill: labelColor, fontSize: 13, fontFamily: 'Heebo', fontWeight: 500 }}
        />
        <PolarRadiusAxis
          angle={90}
          domain={[0, 100]}
          tick={{ fill: tickColor, fontSize: 11 }}
          axisLine={false}
        />
        <Radar
          name="בסיס"
          dataKey="baseline"
          stroke={tickColor}
          fill={tickColor}
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
          wrapperStyle={{ fontSize: '13px', fontFamily: 'Heebo' }}
        />
      </RechartsRadarChart>
    </ResponsiveContainer>
  );
};

export default RadarChart;
