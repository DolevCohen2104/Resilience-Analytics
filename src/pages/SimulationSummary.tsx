import React from 'react';
import { RiShieldLine } from 'react-icons/ri';
import InfoTip from '../components/InfoTip';

const SimulationSummary: React.FC = () => {
  const capabilities = [
    { key: 'withstanding', he: 'עמידה', prompt: 'כיצד תפקדת בעת ההיתקלות הפתאומית?', score: 76 },
    { key: 'recovery', he: 'התאוששות', prompt: 'באיזו מהירות חזרת לתפקוד אפקטיבי?', score: 72, extra: '4.2s' },
    { key: 'adaptation', he: 'הסתגלות', prompt: 'כיצד הגבת כשהמשימה השתנתה באמצע?', score: 70 },
  ];

  // Triangle geometry: center at (250, 240), radius 140
  // Pushed center down so top vertex has room for label above
  const cx = 250, cy = 245, r = 140;
  const angles = [-90, 150, 30]; // top, bottom-left, bottom-right

  const getVertex = (angleIdx: number, ratio: number = 1) => {
    const angle = (angles[angleIdx] * Math.PI) / 180;
    return {
      x: cx + r * ratio * Math.cos(angle),
      y: cy + r * ratio * Math.sin(angle),
    };
  };

  const filledPoints = capabilities.map((c, i) => {
    const v = getVertex(i, c.score / 100);
    return `${v.x},${v.y}`;
  }).join(' ');

  const gridLevels = [1, 0.66, 0.33];
  const gridTriangles = gridLevels.map(level => {
    return [0, 1, 2].map(i => {
      const v = getVertex(i, level);
      return `${v.x},${v.y}`;
    }).join(' ');
  });

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
      <div className="rounded-[14px] p-8 mb-6 text-center" style={{ backgroundColor: 'var(--surface)', border: '1px solid var(--border)' }}>
        <h1 className="text-3xl font-bold mb-3" style={{ color: 'var(--text-primary)' }}>סיכום תפקוד בסימולציה תחת לחץ</h1>
        <p className="text-lg mb-5" style={{ color: 'var(--text-secondary)' }}>המיקוד אינו רק בהצלחת המשימה, אלא באיך שהמשימה בוצעה</p>
        <div className="flex items-center justify-center gap-8 text-base" style={{ color: 'var(--text-dim)' }}>
          <span>תרחיש: <strong style={{ color: 'var(--text-primary)' }}>היתקלות בשטח בנוי</strong></span>
          <span>תאריך: <strong style={{ color: 'var(--text-primary)' }}>2026-03-06</strong></span>
          <span>משך: <strong style={{ color: 'var(--text-primary)' }}>18 דקות</strong></span>
          <span>קושי: <strong className="text-idf-orange">4/5</strong></span>
        </div>
      </div>

      {/* Resilience Triangle */}
      <div className="rounded-[14px] p-6 mb-6" style={{ backgroundColor: 'var(--surface)', border: '1px solid var(--border)' }}>
        <div className="flex items-center gap-2 mb-2 justify-center">
          <RiShieldLine className="text-idf-blue text-xl" />
          <h2 className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>משולש החוסן</h2>
          <InfoTip text={"איך לקרוא: המשולש מציג את שלוש היכולות המרכזיות - עמידה (למעלה), התאוששות (שמאל למטה), הסתגלות (ימין למטה).\n\nהמספר בכל קודקוד = ציון היכולת (0-100). ככל שהמספר גבוה יותר, היכולת חזקה יותר.\n\nדוגמה: עמידה 78, התאוששות 65, הסתגלות 71 - הצוער חזק בעמידה אך זקוק לחיזוק בהתאוששות.\n\nמשולש מאוזן (ציונים דומים) = חוסן יציב. פער גדול בין קודקודים = יש לטפל ביכולת החלשה."} />
        </div>
        <p className="text-base text-center mb-4" style={{ color: 'var(--text-dim)' }}>
          שלושת כושרי החוסן - כל קודקוד מייצג יכולת מרכזית
        </p>

        <div className="flex justify-center mb-6">
          <svg width="500" height="460" viewBox="0 0 500 460">
            {/* Grid triangles */}
            {gridTriangles.map((pts, i) => (
              <polygon
                key={i}
                points={pts}
                fill="none"
                stroke="var(--border)"
                strokeWidth={i === 0 ? 1.5 : 0.8}
                strokeDasharray={i === 0 ? 'none' : '4 4'}
              />
            ))}

            {/* Axis lines from center to vertices */}
            {[0, 1, 2].map(i => {
              const v = getVertex(i);
              return (
                <line key={i} x1={cx} y1={cy} x2={v.x} y2={v.y}
                  stroke="var(--border)" strokeWidth="0.5" strokeDasharray="3 3" />
              );
            })}

            {/* Filled data area */}
            <polygon
              points={filledPoints}
              fill="#38BDF8"
              fillOpacity="0.15"
              stroke="#38BDF8"
              strokeWidth="2.5"
              strokeLinejoin="round"
            />

            {/* Data points on vertices */}
            {capabilities.map((cap, i) => {
              const v = getVertex(i, cap.score / 100);
              return (
                <circle key={cap.key} cx={v.x} cy={v.y} r="5" fill="#38BDF8" stroke="var(--surface)" strokeWidth="2" />
              );
            })}

            {/* Score circles + labels at outer vertices */}
            {capabilities.map((cap, i) => {
              const outerV = getVertex(i);
              const color = getColor(cap.score);

              // Position score circle offset from triangle vertex
              // Top: above vertex; Bottom-left: below-left; Bottom-right: below-right
              const circleX = i === 0 ? outerV.x : i === 1 ? outerV.x - 25 : outerV.x + 25;
              const circleY = i === 0 ? outerV.y - 35 : outerV.y + 30;

              // Label position relative to score circle
              const labelY = i === 0 ? circleY - 36 : circleY + 44;

              return (
                <g key={`label-${cap.key}`}>
                  {/* Connection line from vertex to score circle */}
                  <line
                    x1={outerV.x} y1={outerV.y}
                    x2={circleX} y2={circleY}
                    stroke={color} strokeWidth="1" strokeDasharray="3 3" opacity="0.4"
                  />
                  {/* Score circle */}
                  <circle cx={circleX} cy={circleY} r="26" fill="var(--surface)" stroke={color} strokeWidth="2.5" />
                  <text x={circleX} y={circleY + 6} textAnchor="middle" fill={color} fontSize="18" fontWeight="bold" fontFamily="IBM Plex Mono">
                    {cap.score}
                  </text>
                  {/* Capability label - Hebrew name */}
                  <text
                    x={circleX}
                    y={labelY}
                    textAnchor="middle"
                    fill="var(--text-primary)"
                    fontSize="16"
                    fontWeight="700"
                    fontFamily="Heebo"
                  >
                    {cap.he}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>

        {/* Capability Detail Cards */}
        <div className="grid grid-cols-3 gap-4">
          {capabilities.map(cap => (
            <div key={cap.key} className="rounded-xl p-5 text-center" style={{ backgroundColor: 'var(--bg)', border: '1px solid var(--border)' }}>
              <h3 className="text-lg font-bold mb-1" style={{ color: getColor(cap.score) }}>{cap.he}</h3>
              <p className="text-sm mb-3" style={{ color: 'var(--text-dim)' }}>{cap.prompt}</p>
              <div className="text-4xl font-bold font-mono" style={{ color: getColor(cap.score) }}>{cap.score}</div>
              {cap.extra && <p className="text-base mt-2" style={{ color: 'var(--text-secondary)' }}>זמן התאוששות: <strong className="font-mono">{cap.extra}</strong></p>}
            </div>
          ))}
        </div>
      </div>

      {/* Social & Team Contribution */}
      <div className="rounded-[14px] p-6 mb-6" style={{ backgroundColor: 'var(--surface)', border: '1px solid var(--border)' }}>
        <div className="flex items-center gap-2 mb-5">
          <h2 className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>רכיב חברתי וצוותי</h2>
          <InfoTip text={"איך לקרוא: מציג את האינטראקציות החברתיות של הצוער בזמן הסימולציה.\n\nתפקידי מנהיגות: כמה פעמים הצוער נטל יוזמה או הוביל את הקבוצה.\nתמיכה בזולת: מספר מקרים שהצוער סייע לאחרים.\n\nדוגמה: 5 תפקידי מנהיגות + 3 מקרי תמיכה = צוער בעל מיומנויות חברתיות גבוהות.\n\nציון חברתי גבוה = צוער שמחזק את הקבוצה."} />
        </div>
        <div className="space-y-5">
          {[
            { label: 'לכידות קבוצה', value: 72, desc: 'האם הצוער תמך באחרים?' },
            { label: 'נסוך ביטחון באחרים', value: 68, desc: 'האם התנהגות הצוער חיזקה את הצוות?' },
            { label: 'ציון תמיכה חברתית', value: 75, desc: 'תמיכה חברתית כגורם חוסן קריטי' },
          ].map(item => (
            <div key={item.label}>
              <div className="flex justify-between text-base mb-2">
                <div>
                  <span className="font-semibold" style={{ color: 'var(--text-primary)' }}>{item.label}</span>
                  <span className="text-sm mr-2" style={{ color: 'var(--text-dim)' }}>- {item.desc}</span>
                </div>
                <span className="font-mono font-bold text-idf-green text-lg">{item.value}%</span>
              </div>
              <div className="h-4 rounded-full overflow-hidden relative" style={{ backgroundColor: 'var(--bg)' }}>
                <div className="h-full rounded-full bg-gradient-to-l from-idf-green/80 to-idf-green/40 transition-all duration-700" style={{ width: `${item.value}%` }} />
                <div className="absolute inset-y-0 flex items-center w-full px-2">
                  {['נמוך', 'בינוני', 'גבוה', 'יוצא דופן'].map((level) => (
                    <span key={level} className="text-xs font-medium flex-1 text-center" style={{ color: 'var(--text-dim)' }}>{level}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Personal Improvement Snapshot */}
      <div className="rounded-[14px] p-6 mb-6" style={{ backgroundColor: 'var(--surface)', border: '1px solid var(--border)' }}>
        <div className="flex items-center gap-2 mb-5">
          <h2 className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>תמונת שיפור אישית</h2>
          <InfoTip text={"איך לקרוא: רשימת התחומים שבהם הצוער צריך להשתפר, ממוינים לפי חשיבות.\n\nכל שורה מציגה: שם המרכיב, הציון הנוכחי, והפער מהיעד.\n\nדוגמה: 'ויסות רגשי - 52/100 (יעד: 70)' - הצוער צריך לשפר 18 נקודות במרכיב זה.\n\nפער גדול = עדיפות גבוהה לתרגול."} />
        </div>
        <div className="grid grid-cols-3 gap-6">
          {comparisonMetrics.map(m => {
            const improved = m.label === 'זמן תגובה' ? m.current < m.baseline : m.current > m.baseline;
            return (
              <div key={m.label} className="text-center">
                <h4 className="text-base font-semibold mb-4" style={{ color: 'var(--text-secondary)' }}>{m.label}</h4>
                <div className="flex items-end justify-center gap-4 h-28">
                  <div className="flex flex-col items-center">
                    <span className="text-sm font-mono mb-1" style={{ color: 'var(--text-dim)' }}>{m.baseline}{m.unit}</span>
                    <div className="w-12 rounded-t" style={{ height: `${(m.baseline / (Math.max(m.baseline, m.current) * 1.3)) * 90}px`, backgroundColor: 'var(--text-dim)', opacity: 0.2 }} />
                    <span className="text-sm mt-1" style={{ color: 'var(--text-dim)' }}>בסיס</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <span className="text-sm font-mono font-bold mb-1" style={{ color: improved ? '#00E5A0' : '#FF4D6A' }}>{m.current}{m.unit}</span>
                    <div className="w-12 rounded-t" style={{
                      height: `${(m.current / (Math.max(m.baseline, m.current) * 1.3)) * 90}px`,
                      backgroundColor: improved ? '#00E5A0' : '#FF4D6A',
                    }} />
                    <span className="text-sm mt-1" style={{ color: 'var(--text-dim)' }}>נוכחי</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Commander Recommendations */}
      <div className="rounded-[14px] p-6" style={{ backgroundColor: 'var(--surface)', border: '1px solid rgba(56,189,248,0.2)' }}>
        <div className="flex items-center gap-2 mb-5">
          <h2 className="text-xl font-bold text-idf-blue">המלצות ממוקדות</h2>
          <InfoTip text={"איך לקרוא: המלצות פעולה מותאמות אישית המבוססות על תוצאות הסימולציה.\n\nכל המלצה כוללת: סוג הפעולה, מרכיב החוסן הרלוונטי, ורמת הדחיפות.\n\nדוגמה: 'תרגול נשימות תחת לחץ (רגשי, דחיפות גבוהה)' - יש לשלב תרגול זה בתוכנית האימונים הקרובה.\n\nסדר ההמלצות = סדר העדיפות המומלץ."} />
        </div>
        <div className="space-y-3">
          {[
            { text: 'תרגול טכניקת נשימה מובנית לפני כניסה לסימולציה - ויסות גופני ורגשי', type: 'ויסות' },
            { text: 'שיפור זמני תגובה בתרחישי החלטה טקטית - מקצועיות מגבירה שליטה וביטחון', type: 'מקצועיות' },
            { text: 'תרחיש מומלץ הבא: ניווט לילי - להעמקת הסתגלות בתנאי ראות מוגבלת', type: 'תרחיש' },
          ].map((rec, i) => (
            <div key={i} className="flex items-start gap-3 p-4 rounded-lg" style={{ backgroundColor: 'var(--bg)' }}>
              <div className="w-8 h-8 rounded-full bg-idf-blue/20 flex items-center justify-center text-idf-blue text-base font-bold flex-shrink-0">
                {i + 1}
              </div>
              <div>
                <span className="badge bg-idf-blue/[0.13] text-idf-blue border-idf-blue/20 text-xs mb-1 inline-block">{rec.type}</span>
                <p className="text-base leading-relaxed" style={{ color: 'var(--text-primary)' }}>{rec.text}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-5 p-4 rounded-lg bg-idf-green/5 border border-idf-green/10 text-center">
          <p className="text-base text-idf-green font-medium">המפגש הנוכחי מהווה חלק מתהליך צמיחה מתמשך - שיפור עקבי נצפה לאורך 12 המפגשים האחרונים</p>
        </div>
      </div>
    </div>
  );
};

export default SimulationSummary;
