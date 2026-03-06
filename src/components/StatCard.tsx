import React from 'react';
import { RiArrowUpLine, RiArrowDownLine, RiArrowRightLine } from 'react-icons/ri';
import { IconType } from 'react-icons/lib';

interface StatCardProps {
  icon: IconType;
  label: string;
  value: string | number;
  trend?: 'up' | 'down' | 'stable';
  trendValue?: string;
  trendGood?: 'up' | 'down';
  onClick?: () => void;
}

const StatCard: React.FC<StatCardProps> = ({ icon: Icon, label, value, trend, trendValue, trendGood = 'up', onClick }) => {
  const isPositive = trend === trendGood || (trend === 'down' && trendGood === 'down');
  const trendColor = !trend ? '' : isPositive ? 'text-idf-green' : trend === 'stable' ? 'text-idf-orange' : 'text-idf-red';
  const TrendIcon = trend === 'up' ? RiArrowUpLine : trend === 'down' ? RiArrowDownLine : RiArrowRightLine;

  return (
    <div className="stat-card cursor-pointer" onClick={onClick}>
      <div className="flex items-center gap-2 mb-3">
        <Icon className="text-idf-blue text-lg" />
        <span className="text-xs text-text-secondary font-medium">{label}</span>
      </div>
      <div className="text-2xl font-bold text-text-primary font-mono">{value}</div>
      {trend && (
        <div className={`flex items-center gap-1 mt-2 ${trendColor}`}>
          <TrendIcon className="text-sm" />
          <span className="text-xs font-medium">{trendValue}</span>
        </div>
      )}
    </div>
  );
};

export default StatCard;
