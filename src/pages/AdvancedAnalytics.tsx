import React, { useState } from 'react';
import {
  ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  Cell, ZAxis, BarChart, Bar, Legend, AreaChart, Area, ReferenceLine
} from 'recharts';
import { RiFilter3Line } from 'react-icons/ri';
import { cadets, triggers, componentLabels, heatmapData, sectorLabels } from '../data/mockData';
import type { Sector } from '../data/mockData';
import { useChartTheme } from '../useChartTheme';
import InfoTip from '../components/InfoTip';

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
  const ct = useChartTheme();

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
        <h1 className="text-3xl font-bold">אנליטיקס מתקדם</h1>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 mb-6" style={{ borderBottomWidth: 1, borderBottomStyle: 'solid', borderBottomColor: 'var(--border)' }}>
        {tabs.map(tab => (
          <button key={tab.id} onClick={() => setActiveTab(tab.id)}
            className={`tab-btn ${activeTab === tab.id ? 'active' : ''}`}>{tab.label}</button>
        ))}
      </div>

      {/* Cohort Comparison */}
      {activeTab === 'cohort' && (
        <div className="space-y-6">
          <div className="flex items-center gap-3 mb-2">
            <RiFilter3Line style={{ color: 'var(--text-dim)' }} />
            {(['all', 'combat', 'command', 'institutional'] as const).map(s => (
              <button key={s} onClick={() => setFilterSector(s)}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                  filterSector === s ? 'bg-idf-blue/10 text-idf-blue' : ''
                }`}
                style={filterSector !== s ? { backgroundColor: 'var(--surface)', color: 'var(--text-dim)' } : undefined}
              >
                {s === 'all' ? 'הכל' : sectorLabels[s]}
              </button>
            ))}
          </div>

          <div className="rounded-[14px] p-5" style={{ backgroundColor: 'var(--surface)', borderWidth: 1, borderStyle: 'solid', borderColor: 'var(--border)' }}>
            <div className="flex items-center gap-2 mb-4">
              <h2 className="text-lg font-semibold">השוואת עוצמות - ציון חוסן vs זמן התאוששות</h2>
              <InfoTip text={"איך לקרוא: כל נקודה = צוער. ציר X = ציון חוסן, ציר Y = זמן התאוששות. גודל הנקודה = מספר מפגשים.\n\nפינה ימנית-תחתונה = אידיאלי (חוסן גבוה + התאוששות מהירה).\n\nדוגמה: נקודה ב-(78, 3.5) = צוער עם ציון חוסן 78 שמתאושש ב-3.5 שניות.\n\nאשכול של נקודות = קבוצה דומה. נקודות בודדות = חריגים שדורשים תשומת לב."} />
            </div>
            <ResponsiveContainer width="100%" height={400}>
              <ScatterChart>
                <CartesianGrid strokeDasharray="3 3" stroke={ct.gridColor} />
                <XAxis dataKey="x" name="ציון חוסן" stroke={ct.axisColor} tick={{ fontSize: 12 }} domain={[20, 100]} />
                <YAxis dataKey="y" name="זמן התאוששות" stroke={ct.axisColor} tick={{ fontSize: 12 }} domain={[0, 12]} unit="s" />
                <ZAxis dataKey="z" range={[80, 400]} />
                <Tooltip
                  contentStyle={ct.tooltipStyle}
                  formatter={(value: any, name: string) => [typeof value === 'number' ? value.toFixed(1) : value, name === 'x' ? 'ציון חוסן' : name === 'y' ? 'זמן התאוששות' : name]}
                />
                <ReferenceLine x={avgResilience} stroke={ct.axisColor} strokeDasharray="5 5" />
                <ReferenceLine y={avgRecovery} stroke={ct.axisColor} strokeDasharray="5 5" />
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
                <div key={q.pos} className="text-center p-2 rounded-lg" style={{ backgroundColor: 'var(--bg)' }}>
                  <p className={`text-xs font-semibold ${q.color}`}>{q.label}</p>
                  <p className="text-xs" style={{ color: 'var(--text-dim)' }}>{q.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Five-Component Analysis */}
      {activeTab === 'components' && (
        <div className="space-y-6">
          <div className="rounded-[14px] p-5" style={{ backgroundColor: 'var(--surface)', borderWidth: 1, borderStyle: 'solid', borderColor: 'var(--border)' }}>
            <div className="flex items-center gap-2 mb-4">
              <h2 className="text-lg font-semibold">השוואת בסיס מול נוכחי - חמישה מרכיבים</h2>
              <InfoTip text={"איך לקרוא: עמודות מציגות כל מרכיב חוסן - השוואה בין ציון בסיס (אפור) לנוכחי (כחול).\n\nעמודה כחולה גבוהה מאפורה = שיפור. הפוך = נסיגה.\n\nדוגמה: מרכיב 'רגשי' - בסיס 55, נוכחי 72 = שיפור של 31%.\n\nהפער בין העמודות מראה את האפקטיביות של תוכנית האימון בכל מרכיב."} />
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={componentComparisonData}>
                <CartesianGrid strokeDasharray="3 3" stroke={ct.gridColor} />
                <XAxis dataKey="name" stroke={ct.axisColor} tick={{ fontSize: 12, fontFamily: 'Heebo' }} />
                <YAxis stroke={ct.axisColor} tick={{ fontSize: 12 }} domain={[0, 100]} />
                <Tooltip contentStyle={ct.tooltipStyle} />
                <Legend wrapperStyle={{ fontSize: '12px', fontFamily: 'Heebo' }} />
                <Bar dataKey="baseline" name="בסיס" fill="#64748B" fillOpacity={0.5} radius={[4, 4, 0, 0]} />
                <Bar dataKey="current" name="נוכחי" fill="#38BDF8" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Component Data Sources */}
          <div className="rounded-[14px] p-5" style={{ backgroundColor: 'var(--surface)', borderWidth: 1, borderStyle: 'solid', borderColor: 'var(--border)' }}>
            <div className="flex items-center gap-2 mb-4">
              <h2 className="text-lg font-semibold" style={{ color: 'var(--text-primary)' }}>מה נמדד בכל מרכיב?</h2>
              <InfoTip text={"פירוט המדדים והחיישנים המשמשים לקביעת הציון בכל אחד מחמשת מרכיבי החוסן. המדדים נאספים אוטומטית מהחיישנים הביומטריים ומניתוח הביצועים בסימולציה."} />
            </div>
            <div className="grid grid-cols-1 gap-4">
              {[
                {
                  name: 'ערכי',
                  color: '#38BDF8',
                  icon: 'מצפן',
                  data: [
                    'עקביות בהחלטות מוסריות תחת לחץ (ניתוח עץ החלטות)',
                    'התמדה במשימה למרות קושי (זמן עד נטישה / התמדה)',
                    'שמירה על קוד התנהגות גם בתנאי אי-ודאות',
                    'דירוג עמיתים - האם הצוער פעל לפי ערכים משותפים',
                  ],
                  example: 'דוגמה: צוער שנשאר במשימה 14 דקות מתוך 18 למרות לחץ כבד = ציון התמדה 78%',
                },
                {
                  name: 'רגשי',
                  color: '#FF4D6A',
                  icon: 'לב',
                  data: [
                    'שונות קצב לב (HRV) - מדד לוויסות אוטונומי',
                    'תגובה גלוונית של העור (GSR) - עוררות רגשית',
                    'יחס זמן בוויסות עצמי מול זמן בתגובת לחץ',
                    'מהירות חזרה לקו בסיס רגשי לאחר טריגר',
                  ],
                  example: 'דוגמה: HRV ממוצע 62ms (תקין) + GSR חזרה לבסיס תוך 45 שניות = ויסות רגשי 72',
                },
                {
                  name: 'קוגניטיבי',
                  color: '#A78BFA',
                  icon: 'מוח',
                  data: [
                    'זמן תגובה להחלטות (Reaction Time) - מהירות עיבוד',
                    'מעקב עיניים (Eye Tracking) - דפוסי סריקה ומיקוד',
                    'דיוק בזיהוי איומים ומטרות (Hit Rate)',
                    'יכולת ריבוי משימות - ביצוע מקבילי תחת עומס',
                  ],
                  example: 'דוגמה: זמן תגובה ממוצע 380ms + דיוק זיהוי 89% = ציון קוגניטיבי 75',
                },
                {
                  name: 'חברתי',
                  color: '#00E5A0',
                  icon: 'צוות',
                  data: [
                    'תקשורת בצוות - תדירות ואיכות העברת מידע',
                    'יוזמות מנהיגות - מספר פעמים שהצוער הוביל',
                    'תמיכה בעמיתים - סיוע לחברי צוות בקושי',
                    'תיאום פעולה - סנכרון עם פעולות הצוות',
                  ],
                  example: 'דוגמה: 7 הודעות תקשורת + 3 יוזמות מנהיגות + 2 סיועים = ציון חברתי 70',
                },
                {
                  name: 'פיזי',
                  color: '#FFB547',
                  icon: 'גוף',
                  data: [
                    'קצב לב (HR) - עומס פיזיולוגי ורמת מאמץ',
                    'HRV במנוחה לעומת פעילות - כושר התאוששות',
                    'יציבות מוטורית - דיוק בתנועות ופעולות פיזיות',
                    'עמידות לעייפות - שמירה על ביצועים לאורך זמן',
                  ],
                  example: 'דוגמה: HR ממוצע 95bpm (תקין לפעילות) + דיוק מוטורי 85% + ירידת ביצועים 8% בלבד = ציון פיזי 80',
                },
              ].map(comp => (
                <div key={comp.name} className="p-4 rounded-xl" style={{ backgroundColor: 'var(--bg)', border: `1px solid ${comp.color}20` }}>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center text-sm font-bold" style={{ backgroundColor: `${comp.color}15`, color: comp.color }}>
                      {comp.icon}
                    </div>
                    <h3 className="text-base font-bold" style={{ color: comp.color }}>{comp.name}</h3>
                  </div>
                  <ul className="space-y-1.5 mb-3" style={{ paddingRight: '1rem' }}>
                    {comp.data.map((d, i) => (
                      <li key={i} className="text-sm leading-relaxed list-disc" style={{ color: 'var(--text-secondary)' }}>{d}</li>
                    ))}
                  </ul>
                  <p className="text-sm font-medium p-2.5 rounded-lg" style={{ backgroundColor: `${comp.color}08`, color: comp.color }}>
                    {comp.example}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Heatmap */}
          <div className="rounded-[14px] p-5" style={{ backgroundColor: 'var(--surface)', borderWidth: 1, borderStyle: 'solid', borderColor: 'var(--border)' }}>
            <div className="flex items-center gap-2 mb-4">
              <h2 className="text-lg font-semibold">מפת חום - ביצועים לאורך מפגשים</h2>
              <InfoTip text={"איך לקרוא: כל תא = ביצוע של צוער (שורה) במפגש (עמודה). צבע כהה = ציון גבוה, בהיר = נמוך.\n\nירוק כהה = 80+, ירוק בהיר = 60-79, צהוב = 40-59, אדום = מתחת ל-40.\n\nדוגמה: שורה עם ירוק כהה ברוב התאים = צוער מצטיין. עמודה אדומה = מפגש קשה לכולם.\n\nדפוס אלכסוני = שיפור הדרגתי לאורך זמן."} />
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-right">
                <thead>
                  <tr>
                    <th className="px-3 py-2 text-sm font-semibold sticky right-0" style={{ color: 'var(--text-secondary)', backgroundColor: 'var(--surface)' }}>צוער</th>
                    {Array.from({ length: 12 }, (_, i) => (
                      <th key={i} className="px-2 py-2 text-xs text-center w-12" style={{ color: 'var(--text-dim)' }}>{i + 1}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {heatmapData.map(row => (
                    <tr key={row.cadetId} style={{ borderTopWidth: 1, borderTopStyle: 'solid', borderTopColor: 'var(--border)' }}>
                      <td className="px-3 py-2 text-sm font-mono font-medium sticky right-0" style={{ backgroundColor: 'var(--surface)' }}>{row.cadetId}</td>
                      {row.sessions.map((s, i) => {
                        const score = Math.round(s.score);
                        const r = score < 40 ? 255 : score < 60 ? 255 : score < 80 ? 0 : 56;
                        const g = score < 40 ? 77 : score < 60 ? 181 : score < 80 ? 229 : 189;
                        const b = score < 40 ? 106 : score < 60 ? 71 : score < 80 ? 160 : 248;
                        return (
                          <td key={i} className="px-1 py-1 text-center">
                            <div
                              className="w-10 h-8 rounded flex items-center justify-center text-xs font-mono font-bold cursor-pointer hover:scale-110 transition-transform"
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
                <div key={l.label} className="flex items-center gap-1 text-xs" style={{ color: 'var(--text-dim)' }}>
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
          <div className="rounded-[14px] p-5" style={{ backgroundColor: 'var(--surface)', borderWidth: 1, borderStyle: 'solid', borderColor: 'var(--border)' }}>
            <div className="flex items-center gap-2 mb-4">
              <h2 className="text-lg font-semibold">טריגרים נפוצים ביותר</h2>
              <InfoTip text={"איך לקרוא: תרשים המציג את הגורמים שהכי משפיעים על ביצועי החוסן.\n\nעמודה ארוכה = טריגר נפוץ יותר. צבע = חומרת ההשפעה (אדום = חמורה).\n\nדוגמה: 'רעש פתאומי' עם עמודה של 85% = גורם ל-85% מהצוערים לחוות ירידה בביצועים.\n\nהטריגרים בראש הרשימה = יעדים עיקריים לאימון."} />
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={triggers} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke={ct.gridColor} />
                <XAxis type="number" stroke={ct.axisColor} tick={{ fontSize: 12 }} />
                <YAxis dataKey="nameHe" type="category" stroke={ct.axisColor} tick={{ fontSize: 12, fontFamily: 'Heebo' }} width={100} />
                <Tooltip contentStyle={ct.tooltipStyle} />
                <Bar dataKey="frequency" name="תדירות" radius={[0, 4, 4, 0]}>
                  {triggers.map((t, i) => (
                    <Cell key={i} fill={t.avgImpact > 70 ? '#FF4D6A' : t.avgImpact > 60 ? '#FFB547' : '#38BDF8'} fillOpacity={0.7} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Sankey-like Collapse Pathway */}
          <div className="rounded-[14px] p-5" style={{ backgroundColor: 'var(--surface)', borderWidth: 1, borderStyle: 'solid', borderColor: 'var(--border)' }}>
            <div className="flex items-center gap-2 mb-4">
              <h2 className="text-lg font-semibold">מסלול קריסה - מטריגר לתוצאה</h2>
              <InfoTip text={"איך לקרוא: תרשים זרימה מטריגר לתוצאה. מראה כיצד גורם לחץ מוביל לירידה בביצועים.\n\nשלבים: טריגר > תגובה פיזיולוגית > השפעה קוגניטיבית > תוצאה.\n\nדוגמה: רעש > עלייה ב-GSR > ירידה בריכוז > שגיאות בהחלטות.\n\nזיהוי המסלול מאפשר התערבות מוקדמת בשלב הנכון."} />
            </div>
            <div className="grid grid-cols-3 gap-8">
              <div>
                <h3 className="text-sm font-semibold mb-3 text-center" style={{ color: 'var(--text-secondary)' }}>טריגר</h3>
                {['רעש קשר', 'עומס מידע', 'הפתעה', 'לחץ זמנים'].map(t => (
                  <div key={t} className="mb-2 p-2.5 rounded-lg bg-idf-red/5 border border-idf-red/10 text-sm text-center text-idf-red">{t}</div>
                ))}
              </div>
              <div>
                <h3 className="text-sm font-semibold mb-3 text-center" style={{ color: 'var(--text-secondary)' }}>תגובה פיזיולוגית</h3>
                {['עליית GSR', 'ירידת HRV', 'מיקוד מנהרה'].map(r => (
                  <div key={r} className="mb-2 p-2.5 rounded-lg bg-idf-orange/5 border border-idf-orange/10 text-sm text-center text-idf-orange">{r}</div>
                ))}
              </div>
              <div>
                <h3 className="text-sm font-semibold mb-3 text-center" style={{ color: 'var(--text-secondary)' }}>תוצאה</h3>
                {['ירידת דיוק', 'עיכוב החלטה', 'קפיאה'].map(o => (
                  <div key={o} className="mb-2 p-2.5 rounded-lg bg-idf-purple/5 border border-idf-purple/10 text-sm text-center text-idf-purple">{o}</div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Three-Capability Comparison */}
      {activeTab === 'capabilities' && (
        <div className="rounded-[14px] p-5" style={{ backgroundColor: 'var(--surface)', borderWidth: 1, borderStyle: 'solid', borderColor: 'var(--border)' }}>
          <div className="flex items-center gap-2 mb-4">
            <h2 className="text-lg font-semibold">שלושת הכושרים לאורך זמן - ממוצע יחידה</h2>
            <InfoTip text={"איך לקרוא: שלושה קווים המציגים את התפתחות היכולות לאורך זמן.\n\nכחול = עמידה, ירוק = התאוששות, סגול = הסתגלות.\n\nדוגמה: קו כחול עולה מ-55 ל-72 ב-8 מפגשים = שיפור ממוצע של 2.1 נקודות למפגש בעמידה.\n\nקו שמתיישר = רמת רוויה - יתכן שנדרש שינוי בתוכנית האימון."} />
          </div>
          <ResponsiveContainer width="100%" height={350}>
            <AreaChart data={capabilityTrendData}>
              <CartesianGrid strokeDasharray="3 3" stroke={ct.gridColor} />
              <XAxis dataKey="session" stroke={ct.axisColor} tick={{ fontSize: 12 }} />
              <YAxis stroke={ct.axisColor} tick={{ fontSize: 12 }} domain={[0, 100]} />
              <Tooltip contentStyle={ct.tooltipStyle} />
              <Legend wrapperStyle={{ fontSize: '12px', fontFamily: 'Heebo' }} />
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
              <h3 className="text-sm mb-3" style={{ color: 'var(--text-secondary)' }}>צוערים צפויים להגיע ליעד החודש</h3>
              <div className="space-y-2">
                {cadets.filter(c => c.trend === 'up' && c.resilienceScore > 60).slice(0, 3).map(c => (
                  <div key={c.id} className="flex items-center justify-between">
                    <span className="text-sm font-mono">{c.id}</span>
                    <span className="text-sm text-idf-green font-mono">{Math.round(75 + Math.random() * 20)}% ביטחון</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="stat-card">
              <h3 className="text-sm mb-3" style={{ color: 'var(--text-secondary)' }}>צוערים הדורשים התערבות</h3>
              <div className="space-y-2">
                {cadets.filter(c => c.riskLevel === 'high').map(c => (
                  <div key={c.id} className="flex items-center justify-between">
                    <span className="text-sm font-mono">{c.id}</span>
                    <span className="text-sm text-idf-red">ירידה מתמשכת</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="stat-card">
              <h3 className="text-sm mb-3" style={{ color: 'var(--text-secondary)' }}>תרחיש מומלץ הבא</h3>
              <div className="space-y-2">
                {[
                  { id: 'C-7724', scenario: 'תרגול התאוששות' },
                  { id: 'C-7727', scenario: 'ויסות רגשי בסיסי' },
                  { id: 'C-7722', scenario: 'ניווט לילי' },
                ].map(r => (
                  <div key={r.id} className="flex items-center justify-between">
                    <span className="text-sm font-mono">{r.id}</span>
                    <span className="text-sm text-idf-blue">{r.scenario}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="rounded-[14px] p-5" style={{ backgroundColor: 'var(--surface)', borderWidth: 1, borderStyle: 'solid', borderColor: 'var(--border)' }}>
            <div className="flex items-center gap-2 mb-4">
              <h2 className="text-lg font-semibold">מסלול חזוי - הקרנת מגמה</h2>
              <InfoTip text={"איך לקרוא: קו מלא = נתונים בפועל, קו מקווקו = חיזוי עתידי מבוסס מגמה.\n\nאזור מוצלל סביב החיזוי = טווח ביטחון (ככל שרחב יותר, החיזוי פחות ודאי).\n\nדוגמה: חיזוי של 75±8 בעוד 4 מפגשים = צפי לציון בין 67 ל-83.\n\nאם הקו בפועל מעל החיזוי = הצוער מתקדם מהר מהצפוי."} />
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={[
                ...capabilityTrendData,
                { session: 11, withstanding: 82, recovery: 72, adaptation: 70 },
                { session: 12, withstanding: 85, recovery: 75, adaptation: 73 },
                { session: 13, withstanding: 87, recovery: 77, adaptation: 75 },
              ]}>
                <CartesianGrid strokeDasharray="3 3" stroke={ct.gridColor} />
                <XAxis dataKey="session" stroke={ct.axisColor} tick={{ fontSize: 12 }} />
                <YAxis stroke={ct.axisColor} tick={{ fontSize: 12 }} domain={[0, 100]} />
                <Tooltip contentStyle={ct.tooltipStyle} />
                <ReferenceLine x={10} stroke="#A78BFA" strokeDasharray="5 5" label={{ value: 'חזוי', fill: '#A78BFA', fontSize: 11 }} />
                <Area type="monotone" dataKey="withstanding" name="עמידה" stroke="#38BDF8" fill="#38BDF8" fillOpacity={0.1} strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
            <div className="mt-4 grid grid-cols-3 gap-3">
              {[
                { target: 70, sessions: 2, label: 'מפגשים ליעד 70' },
                { target: 80, sessions: 5, label: 'מפגשים ליעד 80' },
                { target: 90, sessions: 10, label: 'מפגשים ליעד 90' },
              ].map(p => (
                <div key={p.target} className="text-center p-3 rounded-lg" style={{ backgroundColor: 'var(--bg)' }}>
                  <div className="text-lg font-bold font-mono text-idf-purple">{p.sessions}</div>
                  <div className="text-xs" style={{ color: 'var(--text-dim)' }}>{p.label}</div>
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
