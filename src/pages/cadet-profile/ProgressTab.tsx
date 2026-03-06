import React from 'react';
import {
  AreaChart, Area, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer
} from 'recharts';
import { RiArrowUpSLine, RiArrowDownSLine } from 'react-icons/ri';
import { Cadet, cadetSessionHistory } from '../../data/mockData';

interface Props { cadet: Cadet; }


const ProgressTab: React.FC<Props> = ({ cadet }) => {
  const trajectoryData = cadetSessionHistory.map(s => ({
    session: s.session,
    recoveryTime: s.recoveryTime,
    functional: s.functional,
  }));

  const baselineComparison = [
    { metric: 'HRV', metricHe: 'שונות דופק', baseline: cadet.biometrics.baselineHrv, current: cadet.biometrics.hrv, unit: 'ms', good: 'up' as const },
    { metric: 'GSR', metricHe: 'מוליכות עור', baseline: cadet.biometrics.baselineGsr, current: cadet.biometrics.gsr, unit: 'uS', good: 'down' as const },
    { metric: 'Eye Tracking', metricHe: 'סריקה אפקטיבית', baseline: cadet.biometrics.baselineEyeTracking, current: cadet.biometrics.eyeTracking, unit: '%', good: 'up' as const },
    { metric: 'Reaction', metricHe: 'זמן תגובה', baseline: cadet.biometrics.baselineReactionTime, current: cadet.biometrics.reactionTime, unit: 's', good: 'down' as const },
    { metric: 'Resilience', metricHe: 'ציון חוסן כולל', baseline: cadet.baselineScore, current: cadet.resilienceScore, unit: '', good: 'up' as const },
  ];

  const combatData = cadetSessionHistory.map((s, i) => ({
    session: s.session,
    accuracy: Math.min(95, 55 + i * 3.5 + (Math.random() * 6 - 3)),
    urbanScore: Math.min(95, 48 + i * 3 + (Math.random() * 8 - 4)),
  }));

  const commandData = cadetSessionHistory.map((s, i) => ({
    session: s.session,
    decisionTime: Math.max(0.8, 2.2 - i * 0.12 + (Math.random() * 0.3 - 0.15)),
    crisisScore: Math.min(95, 45 + i * 3.2 + (Math.random() * 6 - 3)),
  }));

  return (
    <div className="space-y-6">
      {/* Resilience Trajectory */}
      <div className="bg-dark-surface border border-dark-border rounded-[14px] p-5">
        <h2 className="text-base font-semibold mb-1">מסלול חוסן</h2>
        <p className="text-xs text-text-dim mb-4">זמן התאוששות (ירידה = שיפור) + כושר תפקודי (עלייה = שיפור)</p>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={trajectoryData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" />
            <XAxis dataKey="session" stroke="#64748B" tick={{ fontSize: 11 }} />
            <YAxis yAxisId="left" stroke="#FF4D6A" tick={{ fontSize: 10 }} domain={[0, 12]} orientation="right" label={{ value: 'שניות', angle: 90, position: 'insideRight', fill: '#FF4D6A', fontSize: 10 }} />
            <YAxis yAxisId="right" stroke="#00E5A0" tick={{ fontSize: 10 }} domain={[0, 100]} orientation="left" label={{ value: '%', angle: -90, position: 'insideLeft', fill: '#00E5A0', fontSize: 10 }} />
            <Tooltip contentStyle={{ backgroundColor: '#1A2332', border: '1px solid #334155', borderRadius: '8px', fontSize: '12px' }} />
            <Area yAxisId="left" type="monotone" dataKey="recoveryTime" name="זמן התאוששות" stroke="#FF4D6A" fill="#FF4D6A" fillOpacity={0.1} strokeWidth={2} />
            <Area yAxisId="right" type="monotone" dataKey="functional" name="כושר תפקודי" stroke="#00E5A0" fill="#00E5A0" fillOpacity={0.1} strokeWidth={2} />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Sector Improvement Cards */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-dark-surface border border-dark-border rounded-[14px] p-5">
          <div className="flex items-center gap-2 mb-4">
            <span className="badge badge-combat">קרבי</span>
            <h3 className="text-sm font-semibold">דיוק תחת מאמץ פיזי + תפקוד בהיתקלות</h3>
          </div>
          <ResponsiveContainer width="100%" height={180}>
            <LineChart data={combatData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" />
              <XAxis dataKey="session" stroke="#64748B" tick={{ fontSize: 10 }} />
              <YAxis stroke="#64748B" tick={{ fontSize: 10 }} domain={[40, 100]} />
              <Tooltip contentStyle={{ backgroundColor: '#1A2332', border: '1px solid #334155', borderRadius: '8px', fontSize: '11px' }} />
              <Line type="monotone" dataKey="accuracy" name="דיוק" stroke="#FF4D6A" strokeWidth={2} dot={false} />
              <Line type="monotone" dataKey="urbanScore" name="היתקלות עירונית" stroke="#FFB547" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-dark-surface border border-dark-border rounded-[14px] p-5">
          <div className="flex items-center gap-2 mb-4">
            <span className="badge badge-command">מטכ"לי</span>
            <h3 className="text-sm font-semibold">קבלת החלטות תחת עומס + ניהול משבר</h3>
          </div>
          <ResponsiveContainer width="100%" height={180}>
            <LineChart data={commandData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" />
              <XAxis dataKey="session" stroke="#64748B" tick={{ fontSize: 10 }} />
              <YAxis yAxisId="left" stroke="#38BDF8" tick={{ fontSize: 10 }} domain={[0.5, 2.5]} />
              <YAxis yAxisId="right" stroke="#A78BFA" tick={{ fontSize: 10 }} domain={[40, 100]} orientation="left" />
              <Tooltip contentStyle={{ backgroundColor: '#1A2332', border: '1px solid #334155', borderRadius: '8px', fontSize: '11px' }} />
              <Line yAxisId="left" type="monotone" dataKey="decisionTime" name="זמן החלטה" stroke="#38BDF8" strokeWidth={2} dot={false} />
              <Line yAxisId="right" type="monotone" dataKey="crisisScore" name="ניהול משבר" stroke="#A78BFA" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Baseline Comparison Table */}
      <div className="bg-dark-surface border border-dark-border rounded-[14px] p-5">
        <h2 className="text-base font-semibold mb-4">השוואה לבסיס</h2>
        <table className="w-full text-right">
          <thead>
            <tr className="bg-dark-hover">
              <th className="px-4 py-2.5 text-xs font-semibold text-text-secondary">מדד</th>
              <th className="px-4 py-2.5 text-xs font-semibold text-text-secondary">בסיס</th>
              <th className="px-4 py-2.5 text-xs font-semibold text-text-secondary">נוכחי</th>
              <th className="px-4 py-2.5 text-xs font-semibold text-text-secondary">שינוי</th>
              <th className="px-4 py-2.5 text-xs font-semibold text-text-secondary">מגמה</th>
            </tr>
          </thead>
          <tbody>
            {baselineComparison.map((row, i) => {
              const change = ((row.current - row.baseline) / row.baseline * 100).toFixed(1);
              const isGood = row.good === 'up' ? row.current > row.baseline : row.current < row.baseline;
              return (
                <tr key={row.metric} className={`border-b border-dark-border ${i % 2 === 1 ? 'bg-dark-zebra' : ''}`}>
                  <td className="px-4 py-3 text-sm font-medium">{row.metricHe}</td>
                  <td className="px-4 py-3 text-sm font-mono text-text-dim">{row.baseline} {row.unit}</td>
                  <td className="px-4 py-3 text-sm font-mono font-bold text-text-primary">{row.current} {row.unit}</td>
                  <td className={`px-4 py-3 text-sm font-mono font-bold ${isGood ? 'text-idf-green' : 'text-idf-red'}`}>
                    {parseFloat(change) > 0 ? '+' : ''}{change}%
                  </td>
                  <td className="px-4 py-3">
                    {isGood ? (
                      <div className="flex items-center gap-1 text-idf-green">
                        <RiArrowUpSLine /> <RiArrowUpSLine className="-mr-2" />
                      </div>
                    ) : (
                      <div className="flex items-center gap-1 text-idf-red">
                        <RiArrowDownSLine /> <RiArrowDownSLine className="-mr-2" />
                      </div>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProgressTab;
