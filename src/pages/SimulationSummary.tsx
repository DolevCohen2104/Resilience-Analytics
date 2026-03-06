import React from 'react';
import { RiShieldLine } from 'react-icons/ri';

const SimulationSummary: React.FC = () => {
  const capabilities = [
    { key: 'withstanding', he: 'עמידה', prompt: 'כיצד תפקדת בעת ההיתקלות הפתאומית?', score: 76 },
    { key: 'recovery', he: 'התאוששות', prompt: 'באיזו מהירות חזרת לתפקוד אפקטיבי?', score: 72, extra: '4.2s' },
    { key: 'adaptation', he: 'הסתגלות', prompt: 'כיצד הגבת כשהמשימה השתנתה באמצע?', score: 70 },
  ];

  const trianglePoints = (scores: number[]) => {
    const cx = 150, cy = 130, r = 100;
    const angles = [-90, 150, 30];
    return scores.map((s, i) => {
      const angle = (angles[i] * Math.PI) / 180;
      const ratio = s / 100;
      return `${cx + r * ratio * Math.cos(angle)},${cy + r * ratio * Math.sin(angle)}`;
    }).join(' ');
  };

  const vertexPositions = [
    { x: 150, y: 15, anchor: 'middle' },
    { x: 40, y: 235, anchor: 'middle' },
    { x: 260, y: 235, anchor: 'middle' },
  ];

  const getColor = (score: number) =>
    score < 40 ? '#FF4D6A' : score < 60 ? '#FFB547' : score < 80 ? '#00E5A0' : '#38BDF8';

  const comparisonMetrics = [
    { label: 'HRV', baseline: 48, current: 68, unit: 'ms' },
    { label: 'זמן תגובה', baseline: 1.8, current: 1.1, unit: 's' },
    { label: 'סריקה אפקטיבית', baseline: 42, current: 67, unit: '%' },
  ];

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="bg-dark-surface border border-dark-border rounded-[14px] p-6 mb-6 text-center">
        <h1 className="text-xl font-bold mb-1">סיכום תפקוד בסימולציה תחת לחץ</h1>
        <p className="text-xs text-text-secondary mb-4">המיקוד אינו רק בהצלחת המשימה, אלא באיך שהמשימה בוצעה</p>
        <div className="flex items-center justify-center gap-6 text-xs text-text-dim">
          <span>תרחיש: <strong className="text-text-primary">היתקלות בשטח בנוי</strong></span>
          <span>תאריך: <strong className="text-text-primary">2026-03-06</strong></span>
          <span>משך: <strong className="text-text-primary">18 דקות</strong></span>
          <span>קושי: <strong className="text-idf-orange">4/5</strong></span>
        </div>
      </div>

      {/* Resilience Triangle */}
      <div className="bg-dark-surface border border-dark-border rounded-[14px] p-6 mb-6">
        <div className="flex items-center gap-2 mb-4 justify-center">
          <RiShieldLine className="text-idf-blue text-lg" />
          <h2 className="text-base font-semibold">משולש החוסן</h2>
        </div>
        <div className="flex justify-center mb-6">
          <svg width="300" height="260" viewBox="0 0 300 260">
            {/* Grid triangle */}
            <polygon points="150,30 50,230 250,230" fill="none" stroke="#1E293B" strokeWidth="1" />
            <polygon points="150,80 80,205 220,205" fill="none" stroke="#1E293B" strokeWidth="0.5" strokeDasharray="3 3" />
            <polygon points="150,130 110,180 190,180" fill="none" stroke="#1E293B" strokeWidth="0.5" strokeDasharray="3 3" />

            {/* Filled area */}
            <polygon
              points={trianglePoints(capabilities.map(c => c.score))}
              fill="#38BDF8"
              fillOpacity="0.15"
              stroke="#38BDF8"
              strokeWidth="2"
            />

            {/* Score circles at vertices */}
            {capabilities.map((cap, i) => {
              const color = getColor(cap.score);
              return (
                <g key={cap.key}>
                  <circle cx={vertexPositions[i].x} cy={vertexPositions[i].y + (i === 0 ? 0 : 10)} r="20" fill="#111827" stroke={color} strokeWidth="2" />
                  <text x={vertexPositions[i].x} y={vertexPositions[i].y + (i === 0 ? 5 : 15)} textAnchor="middle" fill={color} fontSize="14" fontWeight="bold" fontFamily="IBM Plex Mono">
                    {cap.score}
                  </text>
                  <text x={vertexPositions[i].x} y={vertexPositions[i].y + (i === 0 ? -18 : 35)} textAnchor="middle" fill="#94A3B8" fontSize="12" fontFamily="Heebo">
                    {cap.he}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>

        {/* Capability Details */}
        <div className="grid grid-cols-3 gap-4">
          {capabilities.map(cap => (
            <div key={cap.key} className="bg-dark-bg rounded-lg p-4 text-center">
              <h3 className="text-sm font-semibold mb-1" style={{ color: getColor(cap.score) }}>{cap.he}</h3>
              <p className="text-[10px] text-text-dim mb-2">{cap.prompt}</p>
              <div className="text-2xl font-bold font-mono" style={{ color: getColor(cap.score) }}>{cap.score}</div>
              {cap.extra && <p className="text-xs text-text-secondary mt-1">זמן התאוששות: {cap.extra}</p>}
            </div>
          ))}
        </div>
      </div>

      {/* Social & Team Contribution */}
      <div className="bg-dark-surface border border-dark-border rounded-[14px] p-6 mb-6">
        <h2 className="text-base font-semibold mb-4">רכיב חברתי וצוותי</h2>
        <div className="space-y-4">
          {[
            { label: 'לכידות קבוצה', value: 72, desc: 'האם הצוער תמך באחרים?' },
            { label: 'נסוך ביטחון באחרים', value: 68, desc: 'האם התנהגות הצוער חיזקה את הצוות?' },
            { label: 'ציון תמיכה חברתית', value: 75, desc: 'תמיכה חברתית כגורם חוסן קריטי' },
          ].map(item => (
            <div key={item.label}>
              <div className="flex justify-between text-xs mb-1">
                <div>
                  <span className="text-text-primary font-medium">{item.label}</span>
                  <span className="text-text-dim mr-2">- {item.desc}</span>
                </div>
                <span className="font-mono font-bold text-idf-green">{item.value}%</span>
              </div>
              <div className="h-3 bg-dark-bg rounded-full overflow-hidden relative">
                <div className="h-full rounded-full bg-gradient-to-l from-idf-green/80 to-idf-green/40 transition-all duration-700" style={{ width: `${item.value}%` }} />
                <div className="absolute inset-y-0 flex items-center w-full px-1">
                  {['נמוך', 'בינוני', 'גבוה', 'יוצא דופן'].map((level, i) => (
                    <span key={level} className="text-[8px] text-text-dim flex-1 text-center">{level}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Personal Improvement Snapshot */}
      <div className="bg-dark-surface border border-dark-border rounded-[14px] p-6 mb-6">
        <h2 className="text-base font-semibold mb-4">תמונת שיפור אישית</h2>
        <div className="grid grid-cols-3 gap-4">
          {comparisonMetrics.map(m => {
            const improved = m.label === 'זמן תגובה' ? m.current < m.baseline : m.current > m.baseline;
            return (
              <div key={m.label} className="text-center">
                <h4 className="text-xs text-text-secondary mb-3">{m.label}</h4>
                <div className="flex items-end justify-center gap-3 h-24">
                  <div className="flex flex-col items-center">
                    <span className="text-[10px] text-text-dim mb-1">{m.baseline}{m.unit}</span>
                    <div className="w-10 bg-text-dim/20 rounded-t" style={{ height: `${(m.baseline / (Math.max(m.baseline, m.current) * 1.3)) * 80}px` }} />
                    <span className="text-[10px] text-text-dim mt-1">בסיס</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <span className="text-[10px] text-idf-green mb-1">{m.current}{m.unit}</span>
                    <div className="w-10 rounded-t" style={{
                      height: `${(m.current / (Math.max(m.baseline, m.current) * 1.3)) * 80}px`,
                      backgroundColor: improved ? '#00E5A0' : '#FF4D6A',
                    }} />
                    <span className="text-[10px] text-text-dim mt-1">נוכחי</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Commander Recommendations */}
      <div className="bg-dark-surface border border-idf-blue/20 rounded-[14px] p-6">
        <h2 className="text-base font-semibold mb-4 text-idf-blue">המלצות ממוקדות</h2>
        <div className="space-y-3">
          {[
            { text: 'תרגול טכניקת נשימה מובנית לפני כניסה לסימולציה - ויסות גופני ורגשי', type: 'ויסות' },
            { text: 'שיפור זמני תגובה בתרחישי החלטה טקטית - מקצועיות מגבירה שליטה וביטחון', type: 'מקצועיות' },
            { text: 'תרחיש מומלץ הבא: ניווט לילי - להעמקת הסתגלות בתנאי ראות מוגבלת', type: 'תרחיש' },
          ].map((rec, i) => (
            <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-dark-bg">
              <div className="w-6 h-6 rounded-full bg-idf-blue/20 flex items-center justify-center text-idf-blue text-xs font-bold flex-shrink-0">
                {i + 1}
              </div>
              <div>
                <span className="badge bg-idf-blue/[0.13] text-idf-blue border-idf-blue/20 text-[10px] mb-1 inline-block">{rec.type}</span>
                <p className="text-xs text-text-primary leading-relaxed">{rec.text}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4 p-3 rounded-lg bg-idf-green/5 border border-idf-green/10 text-center">
          <p className="text-xs text-idf-green">המפגש הנוכחי מהווה חלק מתהליך צמיחה מתמשך - שיפור עקבי נצפה לאורך 12 המפגשים האחרונים</p>
        </div>
      </div>
    </div>
  );
};

export default SimulationSummary;
