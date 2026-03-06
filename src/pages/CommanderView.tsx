import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from 'recharts';
import {
  RiShieldLine, RiUserLine, RiAlertLine, RiArrowUpLine,
  RiCalendarLine, RiDownloadLine, RiArrowUpSLine, RiArrowDownSLine, RiArrowRightSLine, RiSearchLine
} from 'react-icons/ri';
import StatCard from '../components/StatCard';
import RadarChart from '../components/RadarChart';
import { cadets, sectorLabels, riskLabels, componentLabels } from '../data/mockData';

const CommanderView: React.FC = () => {
  const navigate = useNavigate();

  const avgResilience = Math.round(cadets.reduce((s, c) => s + c.resilienceScore, 0) / cadets.length);
  const greenZone = cadets.filter(c => c.resilienceScore >= 70).length;
  const redZone = cadets.filter(c => c.resilienceScore < 40).length;
  const avgImprovement = Math.round(
    cadets.reduce((s, c) => s + ((c.resilienceScore - c.baselineScore) / c.baselineScore) * 100, 0) / cadets.length
  );
  const avgSessions = Math.round(cadets.reduce((s, c) => s + c.totalSessions, 0) / cadets.length);

  const distributionData = [
    { unit: "כיתה א'", red: 1, orange: 2, green: 3, blue: 1 },
    { unit: "כיתה ב'", red: 0, orange: 1, green: 4, blue: 2 },
    { unit: "כיתה ג'", red: 2, orange: 3, green: 2, blue: 0 },
  ];

  const unitRadar = componentLabels.map(comp => {
    const key = comp.key as keyof typeof cadets[0]['components'];
    return {
      subject: comp.he,
      current: Math.round(cadets.reduce((s, c) => s + c.components[key], 0) / cadets.length),
      baseline: Math.round(cadets.reduce((s, c) => s + c.components[`baseline${comp.key.charAt(0).toUpperCase() + comp.key.slice(1)}` as keyof typeof cadets[0]['components']], 0) / cadets.length),
      fullMark: 100,
    };
  });

  const TrendArrow = ({ trend }: { trend: string }) => {
    if (trend === 'up') return <RiArrowUpSLine className="text-idf-green" />;
    if (trend === 'down') return <RiArrowDownSLine className="text-idf-red" />;
    return <RiArrowRightSLine className="text-idf-orange" />;
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">תצוגת מפקד</h1>
        <button className="flex items-center gap-2 text-xs text-text-secondary bg-dark-surface border border-dark-border rounded-lg px-3 py-2 hover:border-idf-blue/50 transition-colors">
          <RiDownloadLine /> הפקת דוח תקופתי
        </button>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-5 gap-4 mb-6">
        <StatCard icon={RiShieldLine} label="ציון חוסן משוקלל" value={avgResilience} trend="up" trendValue="+8%" />
        <StatCard icon={RiUserLine} label='צוערים באזור ירוק (>70)' value={`${greenZone}/${cadets.length}`} trend="up" trendValue={`${Math.round(greenZone/cadets.length*100)}%`} />
        <StatCard icon={RiAlertLine} label='צוערים באזור אדום (<40)' value={redZone} trend={redZone > 0 ? 'up' : 'stable'} trendValue="" trendGood="down" />
        <StatCard icon={RiArrowUpLine} label="שיפור ממוצע מבסיס" value={`${avgImprovement}%`} trend="up" trendValue="מכלל הצוערים" />
        <StatCard icon={RiCalendarLine} label="ממוצע מפגשים לצוער" value={avgSessions} trend="up" trendValue="" />
      </div>

      <div className="grid grid-cols-2 gap-6 mb-6">
        {/* Resilience Distribution */}
        <div className="bg-dark-surface border border-dark-border rounded-[14px] p-5">
          <h2 className="text-base font-semibold mb-4">התפלגות חוסן לפי יחידת משנה</h2>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={distributionData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" />
              <XAxis dataKey="unit" stroke="#64748B" tick={{ fontSize: 11, fontFamily: 'Heebo' }} />
              <YAxis stroke="#64748B" tick={{ fontSize: 11 }} />
              <Tooltip contentStyle={{ backgroundColor: '#1A2332', border: '1px solid #334155', borderRadius: '8px', fontSize: '12px' }} />
              <Legend wrapperStyle={{ fontSize: '11px', fontFamily: 'Heebo' }} />
              <Bar dataKey="red" name="< 40" stackId="a" fill="#FF4D6A" />
              <Bar dataKey="orange" name="40-60" stackId="a" fill="#FFB547" />
              <Bar dataKey="green" name="60-80" stackId="a" fill="#00E5A0" />
              <Bar dataKey="blue" name="80+" stackId="a" fill="#38BDF8" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Unit Radar */}
        <div className="bg-dark-surface border border-dark-border rounded-[14px] p-5">
          <h2 className="text-base font-semibold mb-2">רדאר חמישה מרכיבים - ממוצע יחידה</h2>
          <RadarChart data={unitRadar} size="large" />
        </div>
      </div>

      {/* Readiness Report Table */}
      <div className="bg-dark-surface border border-dark-border rounded-[14px] p-5">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base font-semibold">דוח מוכנות</h2>
          <div className="flex items-center gap-3">
            <div className="relative">
              <RiSearchLine className="absolute right-3 top-1/2 -translate-y-1/2 text-text-dim text-sm" />
              <input type="text" placeholder="חיפוש..." className="bg-dark-bg border border-dark-border rounded-lg pr-8 pl-3 py-1.5 text-xs text-text-primary placeholder-text-dim focus:outline-none focus:border-idf-blue/50 w-36" />
            </div>
            <button className="flex items-center gap-1 text-xs text-text-secondary bg-dark-bg border border-dark-border rounded-lg px-3 py-1.5 hover:border-idf-blue/50">
              <RiDownloadLine className="text-sm" /> Excel
            </button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-right">
            <thead>
              <tr className="bg-dark-hover">
                <th className="px-4 py-2.5 text-xs font-semibold text-text-secondary">מזהה צוער</th>
                <th className="px-4 py-2.5 text-xs font-semibold text-text-secondary">זרוע</th>
                <th className="px-4 py-2.5 text-xs font-semibold text-text-secondary">מפגשים</th>
                <th className="px-4 py-2.5 text-xs font-semibold text-text-secondary">ציון חוסן</th>
                <th className="px-4 py-2.5 text-xs font-semibold text-text-secondary">מגמה</th>
                <th className="px-4 py-2.5 text-xs font-semibold text-text-secondary">רמת סיכון</th>
                <th className="px-4 py-2.5 text-xs font-semibold text-text-secondary">פעולה נדרשת</th>
              </tr>
            </thead>
            <tbody>
              {cadets.map((cadet, i) => (
                <tr
                  key={cadet.id}
                  className={`border-b border-dark-border hover:bg-dark-hover cursor-pointer transition-colors ${i % 2 === 1 ? 'bg-dark-zebra' : ''}`}
                  onClick={() => navigate(`/cadet/${cadet.id}`)}
                >
                  <td className="px-4 py-3 text-sm font-mono font-medium">{cadet.id}</td>
                  <td className="px-4 py-3"><span className={`badge badge-${cadet.sector}`}>{sectorLabels[cadet.sector]}</span></td>
                  <td className="px-4 py-3 text-sm font-mono">{cadet.totalSessions}</td>
                  <td className="px-4 py-3">
                    <span className={`text-sm font-mono font-bold ${
                      cadet.resilienceScore < 40 ? 'text-idf-red' : cadet.resilienceScore < 60 ? 'text-idf-orange' : cadet.resilienceScore < 80 ? 'text-idf-green' : 'text-idf-blue'
                    }`}>{cadet.resilienceScore}</span>
                  </td>
                  <td className="px-4 py-3"><TrendArrow trend={cadet.trend} /></td>
                  <td className="px-4 py-3"><span className={`badge badge-risk-${cadet.riskLevel}`}>{riskLabels[cadet.riskLevel]}</span></td>
                  <td className="px-4 py-3 text-xs text-text-secondary max-w-[200px]">
                    {cadet.riskLevel === 'high' ? 'נדרשת התערבות - מומלצת פגישה עם קצין מנטלי' :
                     cadet.riskLevel === 'medium' ? 'ניטור מוגבר - התמקדות בתרחישי התאוששות' :
                     'המשך אימון שגרתי'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CommanderView;
