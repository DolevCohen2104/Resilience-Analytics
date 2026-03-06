import React, { useState } from 'react';
import {
  ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, ZAxis, ReferenceLine
} from 'recharts';
import { RiArrowUpSLine, RiArrowRightSLine, RiEyeLine } from 'react-icons/ri';
import { useChartTheme } from '../../useChartTheme';
import InfoTip from '../../components/InfoTip';
import { scenarioBreakdown } from '../../data/mockData';

const ScenarioTab: React.FC = () => {
  const ct = useChartTheme();
  const [selectedScenario, setSelectedScenario] = useState<string | null>(null);

  const bubbleData = scenarioBreakdown.map(s => ({
    difficulty: s.difficulty,
    performance: s.performance,
    sessions: s.sessions * 50,
    name: s.nameHe,
    trend: s.trend,
  }));

  const trendIcon = (trend: string) => {
    if (trend === 'up') return <RiArrowUpSLine className="text-idf-green" />;
    return <RiArrowRightSLine className="text-idf-orange" />;
  };

  return (
    <div className="space-y-6">
      {/* Scenario Table */}
      <div className="rounded-[14px] p-5" style={{ backgroundColor: 'var(--surface)', borderWidth: 1, borderStyle: 'solid', borderColor: 'var(--border)' }}>
        <div className="flex items-center gap-2 mb-4">
          <h2 className="text-lg font-semibold">ביצועים לפי תרחיש</h2>
          <InfoTip text="טבלת ביצועי צוער בתרחישים שונים. לחיצה על תרחיש תציג פירוט מלא" />
        </div>
        <table className="w-full text-right">
          <thead>
            <tr style={{ backgroundColor: 'var(--hover)' }}>
              <th className="px-4 py-2.5 text-sm font-semibold" style={{ color: 'var(--text-secondary)' }}>תרחיש</th>
              <th className="px-4 py-2.5 text-sm font-semibold" style={{ color: 'var(--text-secondary)' }}>קושי</th>
              <th className="px-4 py-2.5 text-sm font-semibold" style={{ color: 'var(--text-secondary)' }}>ביצוע</th>
              <th className="px-4 py-2.5 text-sm font-semibold" style={{ color: 'var(--text-secondary)' }}>מפגשים</th>
              <th className="px-4 py-2.5 text-sm font-semibold" style={{ color: 'var(--text-secondary)' }}>מגמה</th>
              <th className="px-4 py-2.5 text-sm font-semibold" style={{ color: 'var(--text-secondary)' }}>פעולה</th>
            </tr>
          </thead>
          <tbody>
            {scenarioBreakdown.map((s, i) => (
              <tr
                key={s.name}
                className="transition-colors"
                style={{
                  borderBottom: '1px solid var(--border)',
                  backgroundColor: i % 2 === 1 ? 'var(--zebra)' : undefined,
                }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.backgroundColor = 'var(--hover)'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.backgroundColor = i % 2 === 1 ? 'var(--zebra)' : ''; }}
              >
                <td className="px-4 py-3">
                  <div className="text-base font-medium">{s.nameHe}</div>
                  <div className="text-xs" style={{ color: 'var(--text-dim)' }}>{s.name}</div>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-1">
                    <div className="h-1.5 rounded-full w-20 overflow-hidden" style={{ backgroundColor: 'var(--bg)' }}>
                      <div className="h-full rounded-full bg-idf-orange" style={{ width: `${s.difficulty}%` }} />
                    </div>
                    <span className="text-sm font-mono" style={{ color: 'var(--text-dim)' }}>{s.difficulty}%</span>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <span className={`text-base font-mono font-bold ${s.performance >= 70 ? 'text-idf-green' : s.performance >= 50 ? 'text-idf-orange' : 'text-idf-red'}`}>
                    {s.performance}%
                  </span>
                </td>
                <td className="px-4 py-3 text-base font-mono">{s.sessions}</td>
                <td className="px-4 py-3">{trendIcon(s.trend)}</td>
                <td className="px-4 py-3">
                  <button
                    onClick={() => setSelectedScenario(s.name === selectedScenario ? null : s.name)}
                    className="flex items-center gap-1 text-sm text-idf-blue hover:text-idf-blue/80 transition-colors"
                  >
                    <RiEyeLine /> פרטים
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Bubble Chart */}
      <div className="rounded-[14px] p-5" style={{ backgroundColor: 'var(--surface)', borderWidth: 1, borderStyle: 'solid', borderColor: 'var(--border)' }}>
        <div className="flex items-center gap-2 mb-4">
          <h2 className="text-lg font-semibold">מפת קושי-ביצועים</h2>
          <InfoTip text="טבלת ביצועי צוער בתרחישים שונים. לחיצה על תרחיש תציג פירוט מלא" />
        </div>
        <ResponsiveContainer width="100%" height={320}>
          <ScatterChart>
            <CartesianGrid strokeDasharray="3 3" stroke={ct.gridColor} />
            <XAxis dataKey="difficulty" name="קושי" stroke={ct.axisColor} tick={{ fontSize: 12 }} domain={[50, 100]} unit="%" />
            <YAxis dataKey="performance" name="ביצוע" stroke={ct.axisColor} tick={{ fontSize: 12 }} domain={[40, 100]} unit="%" />
            <ZAxis dataKey="sessions" range={[100, 600]} />
            <Tooltip
              contentStyle={ct.tooltipStyle}
              formatter={(value: any, name: string) => [value, name === 'difficulty' ? 'קושי' : name === 'performance' ? 'ביצוע' : name]}
            />
            <ReferenceLine
              segment={[{ x: 50, y: 40 }, { x: 100, y: 100 }]}
              stroke={ct.axisColor}
              strokeDasharray="5 5"
            />
            <Scatter data={bubbleData}>
              {bubbleData.map((entry, i) => (
                <Cell key={i} fill={entry.trend === 'up' ? '#00E5A0' : '#FFB547'} fillOpacity={0.7} />
              ))}
            </Scatter>
          </ScatterChart>
        </ResponsiveContainer>
        <div className="flex items-center gap-6 justify-center mt-3">
          <div className="flex items-center gap-2 text-sm" style={{ color: 'var(--text-dim)' }}>
            <div className="w-3 h-3 rounded-full bg-idf-green" /> מגמת עלייה
          </div>
          <div className="flex items-center gap-2 text-sm" style={{ color: 'var(--text-dim)' }}>
            <div className="w-3 h-3 rounded-full bg-idf-orange" /> יציב
          </div>
          <span className="text-xs" style={{ color: 'var(--text-dim)' }}>גודל הבועה = מספר מפגשים</span>
        </div>
      </div>

      {/* Drill-down Panel */}
      {selectedScenario && (
        <div className="rounded-[14px] p-5" style={{ backgroundColor: 'var(--surface)', borderWidth: 1, borderStyle: 'solid', borderColor: 'rgba(56,189,248,0.3)' }}>
          <div className="flex items-center gap-2 mb-4">
            <h2 className="text-lg font-semibold text-idf-blue">
              {scenarioBreakdown.find(s => s.name === selectedScenario)?.nameHe} - פירוט
            </h2>
            <InfoTip text="טבלת ביצועי צוער בתרחישים שונים. לחיצה על תרחיש תציג פירוט מלא" />
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div className="rounded-lg p-4" style={{ backgroundColor: 'var(--bg)' }}>
              <h3 className="text-sm mb-2" style={{ color: 'var(--text-secondary)' }}>נקודות החלטה</h3>
              <div className="space-y-2">
                {['כניסה לאזור', 'זיהוי איום', 'החלטת ירי', 'בקשת גיבוי', 'פינוי'].map((point, i) => (
                  <div key={point} className="flex items-center gap-2">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                      i < 3 ? 'bg-idf-green/20 text-idf-green' : i < 4 ? 'bg-idf-orange/20 text-idf-orange' : 'bg-idf-blue/20 text-idf-blue'
                    }`}>{i + 1}</div>
                    <span className="text-sm" style={{ color: 'var(--text-primary)' }}>{point}</span>
                    <span className="text-xs font-mono mr-auto" style={{ color: 'var(--text-dim)' }}>{(1 + Math.random() * 2).toFixed(1)}s</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-lg p-4" style={{ backgroundColor: 'var(--bg)' }}>
              <h3 className="text-sm mb-2" style={{ color: 'var(--text-secondary)' }}>ביומטרי לתרחיש</h3>
              <div className="space-y-3">
                {[
                  { label: 'HRV ממוצע', value: '62 ms', color: 'text-idf-blue' },
                  { label: 'GSR שיא', value: '71 uS', color: 'text-idf-red' },
                  { label: 'סריקה אפקטיבית', value: '64%', color: 'text-idf-green' },
                  { label: 'זמן תגובה', value: '1.2s', color: 'text-idf-purple' },
                ].map(m => (
                  <div key={m.label} className="flex justify-between">
                    <span className="text-sm" style={{ color: 'var(--text-dim)' }}>{m.label}</span>
                    <span className={`text-sm font-mono font-bold ${m.color}`}>{m.value}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-lg p-4" style={{ backgroundColor: 'var(--bg)' }}>
              <h3 className="text-sm mb-2" style={{ color: 'var(--text-secondary)' }}>נקודות שבירה</h3>
              <div className="space-y-2">
                {[
                  { time: '04:32', event: 'ירידת HRV מתחת ל-40' },
                  { time: '08:15', event: 'עליית GSR מעל 75' },
                  { time: '11:48', event: 'מעבר למיקוד מנהרה' },
                ].map(bp => (
                  <div key={bp.time} className="flex items-start gap-2">
                    <span className="text-xs font-mono text-idf-red bg-idf-red/10 px-1.5 py-0.5 rounded">{bp.time}</span>
                    <span className="text-sm" style={{ color: 'var(--text-primary)' }}>{bp.event}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ScenarioTab;
