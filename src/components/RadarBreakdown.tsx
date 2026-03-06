import React, { useState } from 'react';
import { RiArrowDownSLine, RiArrowUpSLine } from 'react-icons/ri';

interface RadarDataItem {
  subject: string;
  current: number;
  baseline: number;
  fullMark: number;
}

interface RadarBreakdownProps {
  data: RadarDataItem[];
}

const componentDetails: Record<string, {
  color: string;
  meaning: string;
  bullets: string[];
  derived: string[];
}> = {
  'ערכי': {
    color: '#38BDF8',
    meaning: 'עקביות מוסרית והתמדה במשימה תחת לחץ - האם הצוער פועל לפי ערכיו גם כשקשה',
    bullets: [
      'עקביות בהחלטות מוסריות תחת לחץ (ניתוח עץ החלטות)',
      'התמדה במשימה למרות קושי - זמן עד נטישה',
      'שמירה על קוד התנהגות בתנאי אי-ודאות',
      'דירוג עמיתים - פעולה לפי ערכים משותפים',
    ],
    derived: [
      'ציון התמדה = (זמן פעיל / זמן כולל) * 100',
      'עקביות מוסרית = אחוז החלטות תואמות קוד התנהגות',
      'ציון ערכי משוקלל = 40% התמדה + 30% עקביות + 30% דירוג עמיתים',
    ],
  },
  'רגשי': {
    color: '#FF4D6A',
    meaning: 'יכולת ויסות רגשי - שליטה בתגובות רגשיות וחזרה לשיווי משקל לאחר לחץ',
    bullets: [
      'שונות קצב לב (HRV) - ויסות מערכת העצבים האוטונומית',
      'תגובה גלוונית של העור (GSR) - רמת עוררות רגשית',
      'יחס זמן בוויסות עצמי מול תגובת לחץ',
      'מהירות חזרה לקו בסיס רגשי לאחר טריגר',
    ],
    derived: [
      'ציון HRV = מיפוי לסקאלה 0-100 (40ms=30, 60ms=60, 80ms+=90)',
      'ציון GSR = זמן חזרה לבסיס (< 30s=90, 30-60s=60, > 60s=30)',
      'ציון רגשי משוקלל = 35% HRV + 30% GSR + 20% יחס ויסות + 15% חזרה לבסיס',
    ],
  },
  'קוגניטיבי': {
    color: '#A78BFA',
    meaning: 'חשיבה תחת לחץ - מהירות עיבוד, קבלת החלטות, ריכוז וסריקת שדה',
    bullets: [
      'זמן תגובה להחלטות (Reaction Time) - מהירות עיבוד מידע',
      'מעקב עיניים (Eye Tracking) - דפוסי סריקה ומיקוד',
      'דיוק בזיהוי איומים ומטרות (Hit Rate)',
      'יכולת ריבוי משימות - ביצוע מקבילי תחת עומס',
    ],
    derived: [
      'ציון תגובה = מיפוי לסקאלה (< 300ms=95, 300-500ms=75, > 800ms=30)',
      'ציון סריקה = אחוז כיסוי שדה ראייה * יעילות מיקוד',
      'ציון קוגניטיבי משוקלל = 30% תגובה + 25% סריקה + 25% דיוק + 20% ריבוי משימות',
    ],
  },
  'חברתי': {
    color: '#00E5A0',
    meaning: 'תפקוד בצוות - תקשורת, מנהיגות, תמיכה בעמיתים ותיאום פעולה',
    bullets: [
      'תקשורת - תדירות ואיכות העברת מידע לצוות',
      'יוזמות מנהיגות - מספר פעמים שהצוער הוביל פעולה',
      'תמיכה בעמיתים - סיוע לחברי צוות ברגעי קושי',
      'תיאום פעולה - סנכרון עם פעולות הצוות',
    ],
    derived: [
      'ציון תקשורת = (הודעות רלוונטיות / סה"כ הודעות) * תדירות',
      'ציון מנהיגות = יוזמות * השפעה על תוצאת הצוות',
      'ציון חברתי משוקלל = 30% תקשורת + 25% מנהיגות + 25% תמיכה + 20% תיאום',
    ],
  },
  'פיזי': {
    color: '#FFB547',
    meaning: 'כושר גופני תפקודי - עמידות לעומס פיזי, התאוששות ודיוק מוטורי',
    bullets: [
      'קצב לב (HR) - עומס פיזיולוגי ורמת מאמץ',
      'HRV במנוחה לעומת פעילות - כושר התאוששות פיזי',
      'יציבות מוטורית - דיוק בתנועות ופעולות פיזיות',
      'עמידות לעייפות - שמירה על ביצועים לאורך זמן',
    ],
    derived: [
      'ציון HR = מיפוי לפי אזורי דופק (אזור 1-2=90, אזור 3=70, אזור 4-5=40)',
      'ציון מוטורי = דיוק פעולות פיזיות תחת עומס',
      'ציון פיזי משוקלל = 30% HR + 25% התאוששות + 25% מוטורי + 20% עמידות',
    ],
  },
};

const RadarBreakdown: React.FC<RadarBreakdownProps> = ({ data }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="mt-4">
      <button
        onClick={() => setExpanded(!expanded)}
        className="flex items-center gap-2 mx-auto px-4 py-2 rounded-lg text-sm font-medium transition-all hover:scale-[1.02]"
        style={{
          backgroundColor: expanded ? 'rgba(56,189,248,0.1)' : 'var(--bg)',
          color: expanded ? '#38BDF8' : 'var(--text-secondary)',
          border: `1px solid ${expanded ? 'rgba(56,189,248,0.2)' : 'var(--border)'}`,
        }}
      >
        {expanded ? <RiArrowUpSLine className="text-base" /> : <RiArrowDownSLine className="text-base" />}
        {expanded ? 'הסתר פירוט מרכיבים' : 'הצג פירוט מרכיבים - מה כל ציון אומר?'}
      </button>

      {expanded && (
        <div className="mt-4 space-y-3">
          {data.map(item => {
            const details = componentDetails[item.subject];
            if (!details) return null;

            const diff = item.current - item.baseline;
            const diffPercent = item.baseline > 0 ? ((diff / item.baseline) * 100).toFixed(0) : '0';

            return (
              <div key={item.subject} className="p-4 rounded-xl" style={{ backgroundColor: 'var(--bg)', border: `1px solid ${details.color}20` }}>
                {/* Header with score */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center text-lg font-bold font-mono"
                      style={{ backgroundColor: `${details.color}15`, color: details.color }}
                    >
                      {item.current}
                    </div>
                    <div>
                      <h4 className="text-base font-bold" style={{ color: details.color }}>{item.subject}</h4>
                      <p className="text-xs" style={{ color: 'var(--text-dim)' }}>{details.meaning}</p>
                    </div>
                  </div>
                  <div className="text-left">
                    <div className={`text-sm font-bold ${diff >= 0 ? 'text-idf-green' : 'text-idf-red'}`}>
                      {diff >= 0 ? '+' : ''}{diff} ({diff >= 0 ? '+' : ''}{diffPercent}%)
                    </div>
                    <div className="text-xs" style={{ color: 'var(--text-dim)' }}>
                      בסיס: {item.baseline}
                    </div>
                  </div>
                </div>

                {/* What is measured */}
                <div className="mb-3">
                  <h5 className="text-xs font-bold mb-1.5" style={{ color: 'var(--text-secondary)' }}>מה נמדד:</h5>
                  <ul className="space-y-1" style={{ paddingRight: '1rem' }}>
                    {details.bullets.map((b, i) => (
                      <li key={i} className="text-sm list-disc leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{b}</li>
                    ))}
                  </ul>
                </div>

                {/* How score is derived */}
                <div className="p-3 rounded-lg" style={{ backgroundColor: `${details.color}08` }}>
                  <h5 className="text-xs font-bold mb-1.5" style={{ color: details.color }}>איך מחושב הציון:</h5>
                  <ul className="space-y-1" style={{ paddingRight: '1rem' }}>
                    {details.derived.map((d, i) => (
                      <li key={i} className="text-xs list-disc leading-relaxed" style={{ color: details.color, opacity: 0.85 }}>{d}</li>
                    ))}
                  </ul>
                </div>

                {/* Progress bar */}
                <div className="mt-3 relative">
                  <div className="h-2 rounded-full overflow-hidden" style={{ backgroundColor: 'var(--border)' }}>
                    <div className="h-full rounded-full transition-all" style={{ width: `${item.current}%`, backgroundColor: details.color, opacity: 0.6 }} />
                  </div>
                  {/* Baseline marker */}
                  <div
                    className="absolute top-0 h-2 w-0.5"
                    style={{ right: `${100 - item.baseline}%`, backgroundColor: 'var(--text-dim)' }}
                    title={`בסיס: ${item.baseline}`}
                  />
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default RadarBreakdown;
