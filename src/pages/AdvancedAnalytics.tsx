import React, { useState } from 'react';
import {
  ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  Cell, ZAxis, BarChart, Bar, Legend, AreaChart, Area, ReferenceLine
} from 'recharts';
import { RiFilter3Line } from 'react-icons/ri';
import { cadets, triggers, componentLabels, heatmapData, sectorLabels } from '../data/mockData';
import type { Sector } from '../data/mockData';

const tabs = [
  { id: 'cohort', label: 'השוואת עוצמות' },
  { id: 'components', label: 'חמישה מרכיבים' },
  { id: 'triggers', label: 'ניתוח טריגרים' },
  { id: 'capabilities', label: 'שלושת הכושרים' },
  { id: 'predictive', label: 'אנליטיקס חזוי' },
];

const sectorColors: Record<Sector, string> = { combat: '#FF4D6A', command: '#38BDF8', institutional: '#00E5A0' };

const AdvancedAnalytics: React.FC = () => {
  const [activeTab, setActiveTab] = useState('cohort');
  const [filterSector, setFilterSector] = useState<Sector | 'all'>('all');

  const scatterData = cadets
    .filter(c => filterSector === 'all' || c.sector === filterSector)
    .map(c => ({
      x: c.resilienceScore,
      y: c.recoveryTime,
      z: c.totalSessions * 30,
      name: c.id,
      sector: c.sector,
    }));

  const avgResilience = cadets.reduce((s, c) => s + c.resilienceScore, 0) / cadets.length;
  const avgRecovery = cadets.reduce((s, c) => s + c.recoveryTime, 0) / cadets.length;

  const componentComparisonData = componentLabels.map(comp => {
    const key = comp.key as keyof typeof cadets[0]['components'];
    const baseKey = `baseline${comp.key.charAt(0).toUpperCase() + comp.key.slice(1)}` as keyof typeof cadets[0]['components'];
    return {
      name: comp.he,
      baseline: Math.round(cadets.reduce((s, c) => s + c.components[baseKey], 0) / cadets.length),
      current: Math.round(cadets.reduce((s, c) => s + c.components[key], 0) / cadets.length),
    };
  });

  const capabilityTrendData = Array.from({ length: 10 }, (_, i) => ({
    session: i + 1,
    withstanding: Math.min(100, 40 + i * 4 + Math.random() * 5),
    recovery: Math.min(100, 35 + i * 3.5 + Math.random() * 5),
    adaptation: Math.min(100, 38 + i * 3 + Math.random() * 5),
  }));

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">אנליטיקס מתקדם</h1>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 border-b border-dark-border mb-6">
        {tabs.map(tab => (
          <button key={tab.id} onClick={() => setActiveTab(tab.id)}
            className={`tab-btn ${activeTab === tab.id ? 'active' : ''}`}>{tab.label}</button>
        ))}
      </div>

      {/* Cohort Comparison */}
      {activeTab === 'cohort' && (
        <div className="space-y-6">
          <div className="flex items-center gap-3 mb-2">
            <RiFilter3Line className="text-text-dim" />
            {(['all', 'combat', 'command', 'institutional'] as const).map(s => (
              <button key={s} onClick={() => setFilterSector(s)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                  filterSector === s ? 'bg-idf-blue/10 text-idf-blue' : 'bg-dark-surface text-text-dim'
                }`}>
                {s === 'all' ? 'הכל' : sectorLabels[s]}
              </button>
            ))}
          </div>

          <div className="bg-dark-surface border border-dark-border rounded-[14px] p-5">
            <h2 className="text-base font-semibold mb-4">השוואת עוצמות - ציון חוסן vs זמן התאוששות</h2>
            <ResponsiveContainer width="100%" height={400}>
              <ScatterChart>
                <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" />
                <XAxis dataKey="x" name="ציון חוסן" stroke="#64748B" tick={{ fontSize: 11 }} domain={[20, 100]} />
                <YAxis dataKey="y" name="זמן התאוששות" stroke="#64748B" tick={{ fontSize: 11 }} domain={[0, 12]} unit="s" />
                <ZAxis dataKey="z" range={[80, 400]} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#1A2332', border: '1px solid #334155', borderRadius: '8px', fontSize: '12px' }}
                  formatter={(value: any, name: string) => [typeof value === 'number' ? value.toFixed(1) : value, name === 'x' ? 'ציון חוסן' : name === 'y' ? 'זמן התאוששות' : name]}
                />
                <ReferenceLine x={avgResilience} stroke="#64748B" strokeDasharray="5 5" />
                <ReferenceLine y={avgRecovery} stroke="#64748B" strokeDasharray="5 5" />
                <Scatter data={scatterData}>
                  {scatterData.map((entry, i) => (
                    <Cell key={i} fill={sectorColors[entry.sector]} fillOpacity={0.7} />
                  ))}
                </Scatter>
              </ScatterChart>
            </ResponsiveContainer>
            <div className="grid grid-cols-4 gap-3 mt-4">
              {[
                { pos: 'ימין-למעלה', label: 'חוסן גבוה, התאוששות איטית', desc: 'דורש אימון התאוששות', color: 'text-idf-orange' },
                { pos: 'ימין-למטה', label: 'חוסן גבוה, התאוששות מהירה', desc: 'מצוין', color: 'text-idf-green' },
                { pos: 'שמאל-למעלה', label: 'חוסן נמוך, התאוששות איטית', desc: 'דורש תשומת לב', color: 'text-idf-red' },
                { pos: 'שמאל-למטה', label: 'חוסן נמוך, התאוששות מהירה', desc: 'פוטנציאל שיפור', color: 'text-idf-blue' },
              ].map(q => (
                <div key={q.pos} className="text-center p-2 rounded-lg bg-dark-bg">
                  <p className={`text-[10px] font-semibold ${q.color}`}>{q.label}</p>
                  <p className="text-[9px] text-text-dim">{q.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Five-Component Analysis */}
      {activeTab === 'components' && (
        <div className="space-y-6">
          <div className="bg-dark-surface border border-dark-border rounded-[14px] p-5">
            <h2 className="text-base font-semibold mb-4">השוואת בסיס מול נוכחי - חמישה מרכיבים</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={componentComparisonData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" />
                <XAxis dataKey="name" stroke="#64748B" tick={{ fontSize: 11, fontFamily: 'Heebo' }} />
                <YAxis stroke="#64748B" tick={{ fontSize: 11 }} domain={[0, 100]} />
                <Tooltip contentStyle={{ backgroundColor: '#1A2332', border: '1px solid #334155', borderRadius: '8px', fontSize: '12px' }} />
                <Legend wrapperStyle={{ fontSize: '11px', fontFamily: 'Heebo' }} />
                <Bar dataKey="baseline" name="בסיס" fill="#64748B" fillOpacity={0.5} radius={[4, 4, 0, 0]} />
                <Bar dataKey="current" name="נוכחי" fill="#38BDF8" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Heatmap */}
          <div className="bg-dark-surface border border-dark-border rounded-[14px] p-5">
            <h2 className="text-base font-semibold mb-4">מפת חום - ביצועים לאורך מפגשים</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-right">
                <thead>
                  <tr>
                    <th className="px-3 py-2 text-xs text-text-secondary font-semibold sticky right-0 bg-dark-surface">צוער</th>
                    {Array.from({ length: 12 }, (_, i) => (
                      <th key={i} className="px-2 py-2 text-[10px] text-text-dim text-center w-12">{i + 1}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {heatmapData.map(row => (
                    <tr key={row.cadetId} className="border-t border-dark-border">
                      <td className="px-3 py-2 text-xs font-mono font-medium sticky right-0 bg-dark-surface">{row.cadetId}</td>
                      {row.sessions.map((s, i) => {
                        const score = Math.round(s.score);
                        const r = score < 40 ? 255 : score < 60 ? 255 : score < 80 ? 0 : 56;
                        const g = score < 40 ? 77 : score < 60 ? 181 : score < 80 ? 229 : 189;
                        const b = score < 40 ? 106 : score < 60 ? 71 : score < 80 ? 160 : 248;
                        return (
                          <td key={i} className="px-1 py-1 text-center">
                            <div
                              className="w-10 h-8 rounded flex items-center justify-center text-[10px] font-mono font-bold cursor-pointer hover:scale-110 transition-transform"
                              style={{ backgroundColor: `rgba(${r},${g},${b},0.2)`, color: `rgb(${r},${g},${b})` }}
                            >
                              {score}
                            </div>
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="flex items-center justify-center gap-4 mt-3">
              {[
                { label: '< 40', color: '#FF4D6A' },
                { label: '40-60', color: '#FFB547' },
                { label: '60-80', color: '#00E5A0' },
                { label: '80+', color: '#38BDF8' },
              ].map(l => (
                <div key={l.label} className="flex items-center gap-1 text-[10px] text-text-dim">
                  <div className="w-3 h-3 rounded" style={{ backgroundColor: `${l.color}33` }} />
                  {l.label}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Trigger Analysis */}
      {activeTab === 'triggers' && (
        <div className="space-y-6">
          <div className="bg-dark-surface border border-dark-border rounded-[14px] p-5">
            <h2 className="text-base font-semibold mb-4">טריגרים נפוצים ביותר</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={triggers} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" />
                <XAxis type="number" stroke="#64748B" tick={{ fontSize: 11 }} />
                <YAxis dataKey="nameHe" type="category" stroke="#64748B" tick={{ fontSize: 11, fontFamily: 'Heebo' }} width={100} />
                <Tooltip contentStyle={{ backgroundColor: '#1A2332', border: '1px solid #334155', borderRadius: '8px', fontSize: '12px' }} />
                <Bar dataKey="frequency" name="תדירות" radius={[0, 4, 4, 0]}>
                  {triggers.map((t, i) => (
                    <Cell key={i} fill={t.avgImpact > 70 ? '#FF4D6A' : t.avgImpact > 60 ? '#FFB547' : '#38BDF8'} fillOpacity={0.7} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Sankey-like Collapse Pathway */}
          <div className="bg-dark-surface border border-dark-border rounded-[14px] p-5">
            <h2 className="text-base font-semibold mb-4">מסלול קריסה - מטריגר לתוצאה</h2>
            <div className="grid grid-cols-3 gap-8">
              <div>
                <h3 className="text-xs text-text-secondary font-semibold mb-3 text-center">טריגר</h3>
                {['רעש קשר', 'עומס מידע', 'הפתעה', 'לחץ זמנים'].map(t => (
                  <div key={t} className="mb-2 p-2.5 rounded-lg bg-idf-red/5 border border-idf-red/10 text-xs text-center text-idf-red">{t}</div>
                ))}
              </div>
              <div>
                <h3 className="text-xs text-text-secondary font-semibold mb-3 text-center">תגובה פיזיולוגית</h3>
                {['עליית GSR', 'ירידת HRV', 'מיקוד מנהרה'].map(r => (
                  <div key={r} className="mb-2 p-2.5 rounded-lg bg-idf-orange/5 border border-idf-orange/10 text-xs text-center text-idf-orange">{r}</div>
                ))}
              </div>
              <div>
                <h3 className="text-xs text-text-secondary font-semibold mb-3 text-center">תוצאה</h3>
                {['ירידת דיוק', 'עיכוב החלטה', 'קפיאה'].map(o => (
                  <div key={o} className="mb-2 p-2.5 rounded-lg bg-idf-purple/5 border border-idf-purple/10 text-xs text-center text-idf-purple">{o}</div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Three-Capability Comparison */}
      {activeTab === 'capabilities' && (
        <div className="bg-dark-surface border border-dark-border rounded-[14px] p-5">
          <h2 className="text-base font-semibold mb-4">שלושת הכושרים לאורך זמן - ממוצע יחידה</h2>
          <ResponsiveContainer width="100%" height={350}>
            <AreaChart data={capabilityTrendData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" />
              <XAxis dataKey="session" stroke="#64748B" tick={{ fontSize: 11 }} />
              <YAxis stroke="#64748B" tick={{ fontSize: 11 }} domain={[0, 100]} />
              <Tooltip contentStyle={{ backgroundColor: '#1A2332', border: '1px solid #334155', borderRadius: '8px', fontSize: '12px' }} />
              <Legend wrapperStyle={{ fontSize: '11px', fontFamily: 'Heebo' }} />
              <Area type="monotone" dataKey="withstanding" name="עמידה" stroke="#38BDF8" fill="#38BDF8" fillOpacity={0.1} strokeWidth={2} stackId="1" />
              <Area type="monotone" dataKey="recovery" name="התאוששות" stroke="#00E5A0" fill="#00E5A0" fillOpacity={0.1} strokeWidth={2} stackId="1" />
              <Area type="monotone" dataKey="adaptation" name="הסתגלות" stroke="#A78BFA" fill="#A78BFA" fillOpacity={0.1} strokeWidth={2} stackId="1" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      )}

      {/* Predictive Analytics */}
      {activeTab === 'predictive' && (
        <div className="space-y-6">
          <div className="grid grid-cols-3 gap-4">
            <div className="stat-card">
              <h3 className="text-xs text-text-secondary mb-3">צוערים צפויים להגיע ליעד החודש</h3>
              <div className="space-y-2">
                {cadets.filter(c => c.trend === 'up' && c.resilienceScore > 60).slice(0, 3).map(c => (
                  <div key={c.id} className="flex items-center justify-between">
                    <span className="text-xs font-mono">{c.id}</span>
                    <span className="text-xs text-idf-green font-mono">{Math.round(75 + Math.random() * 20)}% ביטחון</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="stat-card">
              <h3 className="text-xs text-text-secondary mb-3">צוערים הדורשים התערבות</h3>
              <div className="space-y-2">
                {cadets.filter(c => c.riskLevel === 'high').map(c => (
                  <div key={c.id} className="flex items-center justify-between">
                    <span className="text-xs font-mono">{c.id}</span>
                    <span className="text-xs text-idf-red">ירידה מתמשכת</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="stat-card">
              <h3 className="text-xs text-text-secondary mb-3">תרחיש מומלץ הבא</h3>
              <div className="space-y-2">
                {[
                  { id: 'C-7724', scenario: 'תרגול התאוששות' },
                  { id: 'C-7727', scenario: 'ויסות רגשי בסיסי' },
                  { id: 'C-7722', scenario: 'ניווט לילי' },
                ].map(r => (
                  <div key={r.id} className="flex items-center justify-between">
                    <span className="text-xs font-mono">{r.id}</span>
                    <span className="text-xs text-idf-blue">{r.scenario}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-dark-surface border border-dark-border rounded-[14px] p-5">
            <h2 className="text-base font-semibold mb-4">מסלול חזוי - הקרנת מגמה</h2>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={[
                ...capabilityTrendData,
                { session: 11, withstanding: 82, recovery: 72, adaptation: 70 },
                { session: 12, withstanding: 85, recovery: 75, adaptation: 73 },
                { session: 13, withstanding: 87, recovery: 77, adaptation: 75 },
              ]}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" />
                <XAxis dataKey="session" stroke="#64748B" tick={{ fontSize: 11 }} />
                <YAxis stroke="#64748B" tick={{ fontSize: 11 }} domain={[0, 100]} />
                <Tooltip contentStyle={{ backgroundColor: '#1A2332', border: '1px solid #334155', borderRadius: '8px', fontSize: '12px' }} />
                <ReferenceLine x={10} stroke="#A78BFA" strokeDasharray="5 5" label={{ value: 'חזוי', fill: '#A78BFA', fontSize: 10 }} />
                <Area type="monotone" dataKey="withstanding" name="עמידה" stroke="#38BDF8" fill="#38BDF8" fillOpacity={0.1} strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
            <div className="mt-4 grid grid-cols-3 gap-3">
              {[
                { target: 70, sessions: 2, label: 'מפגשים ליעד 70' },
                { target: 80, sessions: 5, label: 'מפגשים ליעד 80' },
                { target: 90, sessions: 10, label: 'מפגשים ליעד 90' },
              ].map(p => (
                <div key={p.target} className="text-center p-3 bg-dark-bg rounded-lg">
                  <div className="text-lg font-bold font-mono text-idf-purple">{p.sessions}</div>
                  <div className="text-[10px] text-text-dim">{p.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdvancedAnalytics;
