import React from 'react';
import {
  AreaChart, Area, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, ReferenceArea
} from 'recharts';
import { Cadet, cadetSessionHistory } from '../../data/mockData';

interface Props { cadet: Cadet; }

const zoneColors = [
  { y1: 0, y2: 30, fill: '#FF4D6A', label: 'אזור קריסה' },
  { y1: 30, y2: 60, fill: '#FFB547', label: 'אזור אתגר' },
  { y1: 60, y2: 80, fill: '#00E5A0', label: 'אזור יציבות' },
  { y1: 80, y2: 100, fill: '#38BDF8', label: 'אזור אופטימלי' },
];

const withstandingData = cadetSessionHistory.map((s, i) => ({
  session: s.session,
  score: Math.min(100, Math.max(15, 40 + i * 3.5 + (Math.random() * 8 - 4))),
  unitAvg: 55 + i * 1.5,
}));

const recoveryData = cadetSessionHistory.map((s, i) => ({
  session: s.session,
  time: Math.max(2, 10 - i * 0.6 + (Math.random() * 1.5 - 0.75)),
  event: i === 2 ? 'פציעת חבר' : i === 6 ? 'הפתעה' : i === 9 ? 'עומס מידע' : undefined,
}));

const adaptationData = cadetSessionHistory.map((s, i) => ({
  session: s.session,
  score: Math.min(100, Math.max(20, 35 + i * 3 + (Math.random() * 10 - 5))),
  reorientTime: Math.max(1, 5 - i * 0.3 + (Math.random() * 0.8 - 0.4)),
}));

const CapabilitiesTab: React.FC<Props> = ({ cadet }) => {
  const sections = [
    {
      title: 'עמידה (Withstanding)',
      titleHe: 'כיצד תפקד הצוער בעת התקלות פתאומית?',
      score: cadet.capabilities.withstanding,
      description: 'מניעת הפרעה לרציפות תפקודית',
    },
    {
      title: 'התאוששות (Recovery)',
      titleHe: 'באיזו מהירות חזר לתפקוד אפקטיבי?',
      score: cadet.capabilities.recovery,
      description: 'מהירות ואיכות החזרה לביצועים',
    },
    {
      title: 'הסתגלות (Adaptation)',
      titleHe: 'כיצד הגיב לשינויים באמצע המשימה?',
      score: cadet.capabilities.adaptation,
      description: 'גמישות התנהגותית תחת תנאים משתנים',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Capability Score Cards */}
      <div className="grid grid-cols-3 gap-4">
        {sections.map(s => {
          const color = s.score < 40 ? '#FF4D6A' : s.score < 60 ? '#FFB547' : s.score < 80 ? '#00E5A0' : '#38BDF8';
          return (
            <div key={s.title} className="stat-card text-center">
              <div className="relative w-16 h-16 mx-auto mb-3">
                <svg className="w-16 h-16 -rotate-90" viewBox="0 0 64 64">
                  <circle cx="32" cy="32" r="28" fill="none" stroke="#1E293B" strokeWidth="3" />
                  <circle cx="32" cy="32" r="28" fill="none" stroke={color} strokeWidth="3" strokeLinecap="round"
                    strokeDasharray={`${(s.score / 100) * 176} 176`} />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-lg font-bold font-mono" style={{ color }}>{s.score}</span>
                </div>
              </div>
              <h3 className="text-sm font-semibold mb-1">{s.title}</h3>
              <p className="text-xs text-text-dim">{s.titleHe}</p>
            </div>
          );
        })}
      </div>

      {/* Withstanding Chart */}
      <div className="bg-dark-surface border border-dark-border rounded-[14px] p-5">
        <h2 className="text-base font-semibold mb-1">עמידה - יציבות ביצוע תחת לחץ</h2>
        <p className="text-xs text-text-dim mb-4">% הזמן שמירה על תפקוד אפקטיבי בשיא הלחץ</p>
        <ResponsiveContainer width="100%" height={250}>
          <AreaChart data={withstandingData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" />
            {zoneColors.map(z => (
              <ReferenceArea key={z.y1} y1={z.y1} y2={z.y2} fill={z.fill} fillOpacity={0.03} />
            ))}
            <XAxis dataKey="session" stroke="#64748B" tick={{ fontSize: 11 }} />
            <YAxis stroke="#64748B" tick={{ fontSize: 11 }} domain={[0, 100]} />
            <Tooltip contentStyle={{ backgroundColor: '#1A2332', border: '1px solid #334155', borderRadius: '8px', fontSize: '12px' }} />
            <Line type="monotone" dataKey="unitAvg" name="ממוצע יחידה" stroke="#64748B" strokeDasharray="5 5" strokeWidth={1} dot={false} />
            <Area type="monotone" dataKey="score" name="עמידה" stroke="#38BDF8" fill="#38BDF8" fillOpacity={0.15} strokeWidth={2} />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Recovery Chart */}
      <div className="bg-dark-surface border border-dark-border rounded-[14px] p-5">
        <h2 className="text-base font-semibold mb-1">התאוששות - זמן חזרה לתפקוד</h2>
        <p className="text-xs text-text-dim mb-4">מגמה יורדת = שיפור</p>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={recoveryData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" />
            <XAxis dataKey="session" stroke="#64748B" tick={{ fontSize: 11 }} />
            <YAxis stroke="#64748B" tick={{ fontSize: 11 }} domain={[0, 12]} unit="s" />
            <Tooltip contentStyle={{ backgroundColor: '#1A2332', border: '1px solid #334155', borderRadius: '8px', fontSize: '12px' }} />
            <Line type="monotone" dataKey="time" name="זמן התאוששות" stroke="#00E5A0" strokeWidth={2} dot={{ r: 4, fill: '#00E5A0' }} />
          </LineChart>
        </ResponsiveContainer>
        <div className="grid grid-cols-3 gap-4 mt-4">
          {[
            { label: 'ממוצע', value: `${(recoveryData.reduce((s, d) => s + d.time, 0) / recoveryData.length).toFixed(1)}s` },
            { label: 'הטוב ביותר', value: `${Math.min(...recoveryData.map(d => d.time)).toFixed(1)}s` },
            { label: 'הגרוע ביותר', value: `${Math.max(...recoveryData.map(d => d.time)).toFixed(1)}s` },
          ].map(m => (
            <div key={m.label} className="text-center bg-dark-bg rounded-lg p-3">
              <div className="text-xs text-text-dim">{m.label}</div>
              <div className="text-lg font-bold font-mono text-idf-green">{m.value}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Adaptation Chart */}
      <div className="bg-dark-surface border border-dark-border rounded-[14px] p-5">
        <h2 className="text-base font-semibold mb-1">הסתגלות - תגובה לשינויים באמצע משימה</h2>
        <p className="text-xs text-text-dim mb-4">ציון הסתגלות כאשר פרמטרי התרחיש משתנים באופן בלתי צפוי</p>
        <ResponsiveContainer width="100%" height={250}>
          <AreaChart data={adaptationData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" />
            {zoneColors.map(z => (
              <ReferenceArea key={z.y1} y1={z.y1} y2={z.y2} fill={z.fill} fillOpacity={0.03} />
            ))}
            <XAxis dataKey="session" stroke="#64748B" tick={{ fontSize: 11 }} />
            <YAxis stroke="#64748B" tick={{ fontSize: 11 }} domain={[0, 100]} />
            <Tooltip contentStyle={{ backgroundColor: '#1A2332', border: '1px solid #334155', borderRadius: '8px', fontSize: '12px' }} />
            <Area type="monotone" dataKey="score" name="הסתגלות" stroke="#A78BFA" fill="#A78BFA" fillOpacity={0.15} strokeWidth={2} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default CapabilitiesTab;
