import React from 'react';
import {
  AreaChart, Area, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer
} from 'recharts';
import { RiArrowUpSLine, RiArrowDownSLine } from 'react-icons/ri';
import { useChartTheme } from '../../useChartTheme';
import InfoTip from '../../components/InfoTip';
import { Cadet, cadetSessionHistory } from '../../data/mockData';

interface Props { cadet: Cadet; }


const ProgressTab: React.FC<Props> = ({ cadet }) => {
  const ct = useChartTheme();

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
      <div className="rounded-[14px] p-5" style={{ backgroundColor: 'var(--surface)', borderWidth: 1, borderStyle: 'solid', borderColor: 'var(--border)' }}>
        <div className="flex items-center gap-2 mb-1">
          <h2 className="text-lg font-semibold">מסלול חוסן</h2>
          <InfoTip text={"איך לקרוא: גרף מסלול המציג את התפתחות ציון החוסן לאורך זמן.\n\nציר X = תאריך/מפגש, ציר Y = ציון חוסן. קו מלא = בפועל, קו מקווקו = קו בסיס.\n\nדוגמה: בסיס 55, נוכחי 72 = שיפור של 31% מתחילת התוכנית.\n\nהטבלה למטה משווה כל מרכיב לבסיס. ירוק = שיפור, אדום = ירידה."} />
        </div>
        <p className="text-sm mb-4" style={{ color: 'var(--text-dim)' }}>זמן התאוששות (ירידה = שיפור) + כושר תפקודי (עלייה = שיפור)</p>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={trajectoryData}>
            <CartesianGrid strokeDasharray="3 3" stroke={ct.gridColor} />
            <XAxis dataKey="session" stroke={ct.axisColor} tick={{ fontSize: 12 }} />
            <YAxis yAxisId="left" stroke="#FF4D6A" tick={{ fontSize: 12 }} domain={[0, 12]} orientation="right" label={{ value: 'שניות', angle: 90, position: 'insideRight', fill: '#FF4D6A', fontSize: 12 }} />
            <YAxis yAxisId="right" stroke="#00E5A0" tick={{ fontSize: 12 }} domain={[0, 100]} orientation="left" label={{ value: '%', angle: -90, position: 'insideLeft', fill: '#00E5A0', fontSize: 12 }} />
            <Tooltip contentStyle={ct.tooltipStyle} />
            <Area yAxisId="left" type="monotone" dataKey="recoveryTime" name="זמן התאוששות" stroke="#FF4D6A" fill="#FF4D6A" fillOpacity={0.1} strokeWidth={2} />
            <Area yAxisId="right" type="monotone" dataKey="functional" name="כושר תפקודי" stroke="#00E5A0" fill="#00E5A0" fillOpacity={0.1} strokeWidth={2} />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Sector Improvement Cards */}
      <div className="grid grid-cols-2 gap-4">
        <div className="rounded-[14px] p-5" style={{ backgroundColor: 'var(--surface)', borderWidth: 1, borderStyle: 'solid', borderColor: 'var(--border)' }}>
          <div className="flex items-center gap-2 mb-4">
            <span className="badge badge-combat">קרבי</span>
            <h3 className="text-base font-semibold">דיוק תחת מאמץ פיזי + תפקוד בהיתקלות</h3>
          </div>
          <ResponsiveContainer width="100%" height={180}>
            <LineChart data={combatData}>
              <CartesianGrid strokeDasharray="3 3" stroke={ct.gridColor} />
              <XAxis dataKey="session" stroke={ct.axisColor} tick={{ fontSize: 12 }} />
              <YAxis stroke={ct.axisColor} tick={{ fontSize: 12 }} domain={[40, 100]} />
              <Tooltip contentStyle={ct.tooltipStyle} />
              <Line type="monotone" dataKey="accuracy" name="דיוק" stroke="#FF4D6A" strokeWidth={2} dot={false} />
              <Line type="monotone" dataKey="urbanScore" name="היתקלות עירונית" stroke="#FFB547" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="rounded-[14px] p-5" style={{ backgroundColor: 'var(--surface)', borderWidth: 1, borderStyle: 'solid', borderColor: 'var(--border)' }}>
          <div className="flex items-center gap-2 mb-4">
            <span className="badge badge-command">מטכ"לי</span>
            <h3 className="text-base font-semibold">קבלת החלטות תחת עומס + ניהול משבר</h3>
          </div>
          <ResponsiveContainer width="100%" height={180}>
            <LineChart data={commandData}>
              <CartesianGrid strokeDasharray="3 3" stroke={ct.gridColor} />
              <XAxis dataKey="session" stroke={ct.axisColor} tick={{ fontSize: 12 }} />
              <YAxis yAxisId="left" stroke="#38BDF8" tick={{ fontSize: 12 }} domain={[0.5, 2.5]} />
              <YAxis yAxisId="right" stroke="#A78BFA" tick={{ fontSize: 12 }} domain={[40, 100]} orientation="left" />
              <Tooltip contentStyle={ct.tooltipStyle} />
              <Line yAxisId="left" type="monotone" dataKey="decisionTime" name="זמן החלטה" stroke="#38BDF8" strokeWidth={2} dot={false} />
              <Line yAxisId="right" type="monotone" dataKey="crisisScore" name="ניהול משבר" stroke="#A78BFA" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Baseline Comparison Table */}
      <div className="rounded-[14px] p-5" style={{ backgroundColor: 'var(--surface)', borderWidth: 1, borderStyle: 'solid', borderColor: 'var(--border)' }}>
        <div className="flex items-center gap-2 mb-4">
          <h2 className="text-lg font-semibold">השוואה לבסיס</h2>
          <InfoTip text={"איך לקרוא: גרף מסלול המציג את התפתחות ציון החוסן לאורך זמן.\n\nציר X = תאריך/מפגש, ציר Y = ציון חוסן. קו מלא = בפועל, קו מקווקו = קו בסיס.\n\nדוגמה: בסיס 55, נוכחי 72 = שיפור של 31% מתחילת התוכנית.\n\nהטבלה למטה משווה כל מרכיב לבסיס. ירוק = שיפור, אדום = ירידה."} />
        </div>
        <table className="w-full text-right">
          <thead>
            <tr style={{ backgroundColor: 'var(--hover)' }}>
              <th className="px-4 py-2.5 text-sm font-semibold" style={{ color: 'var(--text-secondary)' }}>מדד</th>
              <th className="px-4 py-2.5 text-sm font-semibold" style={{ color: 'var(--text-secondary)' }}>בסיס</th>
              <th className="px-4 py-2.5 text-sm font-semibold" style={{ color: 'var(--text-secondary)' }}>נוכחי</th>
              <th className="px-4 py-2.5 text-sm font-semibold" style={{ color: 'var(--text-secondary)' }}>שינוי</th>
              <th className="px-4 py-2.5 text-sm font-semibold" style={{ color: 'var(--text-secondary)' }}>מגמה</th>
            </tr>
          </thead>
          <tbody>
            {baselineComparison.map((row, i) => {
              const change = ((row.current - row.baseline) / row.baseline * 100).toFixed(1);
              const isGood = row.good === 'up' ? row.current > row.baseline : row.current < row.baseline;
              return (
                <tr key={row.metric} style={{ borderBottom: '1px solid var(--border)', backgroundColor: i % 2 === 1 ? 'var(--zebra)' : undefined }}>
                  <td className="px-4 py-3 text-base font-medium">{row.metricHe}</td>
                  <td className="px-4 py-3 text-base font-mono" style={{ color: 'var(--text-dim)' }}>{row.baseline} {row.unit}</td>
                  <td className="px-4 py-3 text-base font-mono font-bold" style={{ color: 'var(--text-primary)' }}>{row.current} {row.unit}</td>
                  <td className={`px-4 py-3 text-base font-mono font-bold ${isGood ? 'text-idf-green' : 'text-idf-red'}`}>
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
