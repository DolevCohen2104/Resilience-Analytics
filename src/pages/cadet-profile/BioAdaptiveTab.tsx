import React from 'react';
import {
  AreaChart, Area, LineChart, Line, ScatterChart, Scatter, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, ReferenceLine, ReferenceArea, Cell
} from 'recharts';
import { RiHeartPulseLine, RiDropLine, RiEyeLine, RiTimerLine } from 'react-icons/ri';
import { Cadet, cadetSessionHistory, reactionByType } from '../../data/mockData';

interface Props { cadet: Cadet; }

const BioAdaptiveTab: React.FC<Props> = ({ cadet }) => {
  const hrvPhaseData = [
    { phase: 'כניסה', value: 62 },
    { phase: 'התקלות', value: 45 },
    { phase: 'החלטה', value: 52 },
    { phase: 'פינוי', value: 58 },
    { phase: 'סיום', value: 65 },
  ];

  const gsrTriggers = [
    { event: 'רעש קשר חזק', eventEn: 'Strong comms noise', intensity: 78, recoveryTime: 12 },
    { event: 'פציעת חבר צוות', eventEn: 'Teammate injury', intensity: 85, recoveryTime: 18 },
    { event: 'עומס מידע', eventEn: 'Information overload', intensity: 65, recoveryTime: 8 },
  ];

  const scatterData = Array.from({ length: 30 }, (_, i) => ({
    load: Math.random() * 9 + 1,
    reactionTime: 0.6 + Math.random() * 2,
    accurate: Math.random() > 0.25,
  }));

  return (
    <div className="space-y-6">
      {/* HRV Section */}
      <div className="bg-dark-surface border border-dark-border rounded-[14px] p-5">
        <div className="flex items-center gap-2 mb-4">
          <RiHeartPulseLine className="text-idf-blue text-lg" />
          <h2 className="text-base font-semibold">שונות דופק - HRV</h2>
        </div>
        <ResponsiveContainer width="100%" height={220}>
          <AreaChart data={cadetSessionHistory}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" />
            <XAxis dataKey="session" stroke="#64748B" tick={{ fontSize: 11 }} />
            <YAxis stroke="#64748B" tick={{ fontSize: 11 }} domain={[30, 80]} />
            <Tooltip contentStyle={{ backgroundColor: '#1A2332', border: '1px solid #334155', borderRadius: '8px', fontSize: '12px' }} />
            <ReferenceArea y1={55} y2={75} fill="#00E5A0" fillOpacity={0.05} />
            <ReferenceLine y={cadet.biometrics.baselineHrv} stroke="#64748B" strokeDasharray="5 5" label={{ value: 'בסיס', fill: '#64748B', fontSize: 10 }} />
            <Area type="monotone" dataKey="hrv" stroke="#38BDF8" fill="#38BDF8" fillOpacity={0.15} strokeWidth={2} />
          </AreaChart>
        </ResponsiveContainer>

        <h3 className="text-sm font-medium mt-6 mb-3 text-text-secondary">HRV לפי שלב תרחיש</h3>
        <div className="grid grid-cols-5 gap-2">
          {hrvPhaseData.map(p => (
            <div key={p.phase} className="text-center p-3 rounded-lg bg-dark-bg">
              <div className="text-xs text-text-dim mb-1">{p.phase}</div>
              <div className={`text-lg font-bold font-mono ${p.value < 50 ? 'text-idf-red' : p.value < 60 ? 'text-idf-orange' : 'text-idf-green'}`}>
                {p.value}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* GSR Section */}
      <div className="bg-dark-surface border border-dark-border rounded-[14px] p-5">
        <div className="flex items-center gap-2 mb-4">
          <RiDropLine className="text-idf-red text-lg" />
          <h2 className="text-base font-semibold">מוליכות עור - GSR</h2>
        </div>
        <ResponsiveContainer width="100%" height={220}>
          <LineChart data={cadetSessionHistory}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" />
            <XAxis dataKey="session" stroke="#64748B" tick={{ fontSize: 11 }} />
            <YAxis stroke="#64748B" tick={{ fontSize: 11 }} domain={[40, 90]} />
            <Tooltip contentStyle={{ backgroundColor: '#1A2332', border: '1px solid #334155', borderRadius: '8px', fontSize: '12px' }} />
            <ReferenceArea y1={70} y2={90} fill="#FF4D6A" fillOpacity={0.05} label={{ value: 'אזור אדום', fill: '#FF4D6A', fontSize: 9 }} />
            <ReferenceLine y={70} stroke="#FF4D6A" strokeDasharray="5 5" />
            <Line type="monotone" dataKey="gsr" name="סטרס" stroke="#FF4D6A" strokeWidth={2} dot={false} />
          </LineChart>
        </ResponsiveContainer>

        <h3 className="text-sm font-medium mt-6 mb-3 text-text-secondary">טריגרים מזוהים</h3>
        <div className="space-y-2">
          {gsrTriggers.map(t => (
            <div key={t.event} className="flex items-center justify-between p-3 rounded-lg bg-dark-bg">
              <span className="text-xs text-text-primary">{t.event}</span>
              <div className="flex items-center gap-4">
                <span className="text-xs text-text-dim">עוצמה: <strong className="text-idf-orange font-mono">{t.intensity}%</strong></span>
                <span className="text-xs text-text-dim">התאוששות: <strong className="text-idf-blue font-mono">{t.recoveryTime}s</strong></span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Eye Tracking Section */}
      <div className="bg-dark-surface border border-dark-border rounded-[14px] p-5">
        <div className="flex items-center gap-2 mb-4">
          <RiEyeLine className="text-idf-green text-lg" />
          <h2 className="text-base font-semibold">מעקב עיניים</h2>
        </div>
        <div className="grid grid-cols-2 gap-6">
          <div>
            <h3 className="text-sm text-text-secondary mb-3">התפלגות מבט</h3>
            <div className="space-y-3">
              {[
                { label: 'סריקה אפקטיבית', value: cadet.biometrics.eyeTracking, color: '#00E5A0' },
                { label: 'מיקוד מנהרה', value: Math.round((100 - cadet.biometrics.eyeTracking) * 0.6), color: '#FF4D6A' },
                { label: 'פיזור', value: Math.round((100 - cadet.biometrics.eyeTracking) * 0.4), color: '#FFB547' },
              ].map(item => (
                <div key={item.label}>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-text-secondary">{item.label}</span>
                    <span className="font-mono font-medium" style={{ color: item.color }}>{item.value}%</span>
                  </div>
                  <div className="h-2 bg-dark-bg rounded-full overflow-hidden">
                    <div className="h-full rounded-full transition-all duration-500" style={{ width: `${item.value}%`, backgroundColor: item.color }} />
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 p-3 rounded-lg bg-idf-blue/5 border border-idf-blue/10">
              <p className="text-xs text-idf-blue">הצוער מציג מיקוד מנהרה בעיקר בעת רעש קשר חזק</p>
            </div>
          </div>
          <div>
            <h3 className="text-sm text-text-secondary mb-3">% סריקה אפקטיבית לאורך מפגשים</h3>
            <ResponsiveContainer width="100%" height={180}>
              <LineChart data={cadetSessionHistory}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" />
                <XAxis dataKey="session" stroke="#64748B" tick={{ fontSize: 10 }} />
                <YAxis stroke="#64748B" tick={{ fontSize: 10 }} domain={[30, 80]} />
                <Tooltip contentStyle={{ backgroundColor: '#1A2332', border: '1px solid #334155', borderRadius: '8px', fontSize: '12px' }} />
                <Line type="monotone" dataKey="eyeTracking" stroke="#00E5A0" strokeWidth={2} dot={{ r: 3, fill: '#00E5A0' }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Reaction Time Section */}
      <div className="bg-dark-surface border border-dark-border rounded-[14px] p-5">
        <div className="flex items-center gap-2 mb-4">
          <RiTimerLine className="text-idf-purple text-lg" />
          <h2 className="text-base font-semibold">זמן תגובה קוגניטיבי</h2>
        </div>
        <div className="grid grid-cols-2 gap-6">
          <div>
            <h3 className="text-sm text-text-secondary mb-3">זמן תגובה לפי עומס</h3>
            <ResponsiveContainer width="100%" height={220}>
              <ScatterChart>
                <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" />
                <XAxis dataKey="load" name="עומס" stroke="#64748B" tick={{ fontSize: 10 }} domain={[0, 10]} />
                <YAxis dataKey="reactionTime" name="זמן" stroke="#64748B" tick={{ fontSize: 10 }} domain={[0, 3]} unit="s" />
                <Tooltip contentStyle={{ backgroundColor: '#1A2332', border: '1px solid #334155', borderRadius: '8px', fontSize: '12px' }} />
                <Scatter data={scatterData}>
                  {scatterData.map((entry, i) => (
                    <Cell key={i} fill={entry.accurate ? '#00E5A0' : '#FF4D6A'} fillOpacity={0.7} />
                  ))}
                </Scatter>
              </ScatterChart>
            </ResponsiveContainer>
          </div>
          <div>
            <h3 className="text-sm text-text-secondary mb-3">ממוצע תגובה לפי סוג החלטה</h3>
            <table className="w-full text-right">
              <thead>
                <tr className="bg-dark-hover">
                  <th className="px-3 py-2 text-xs font-semibold text-text-secondary">סוג</th>
                  <th className="px-3 py-2 text-xs font-semibold text-text-secondary">זמן ממוצע</th>
                  <th className="px-3 py-2 text-xs font-semibold text-text-secondary">דיוק</th>
                  <th className="px-3 py-2 text-xs font-semibold text-text-secondary">שיפור</th>
                </tr>
              </thead>
              <tbody>
                {reactionByType.map(r => (
                  <tr key={r.type} className="border-b border-dark-border">
                    <td className="px-3 py-2.5 text-xs font-medium">{r.typeHe}</td>
                    <td className="px-3 py-2.5 text-xs font-mono">{r.avgTime}s</td>
                    <td className="px-3 py-2.5 text-xs font-mono text-idf-green">{r.accuracy}%</td>
                    <td className="px-3 py-2.5 text-xs font-mono text-idf-blue">+{r.improvement}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BioAdaptiveTab;
