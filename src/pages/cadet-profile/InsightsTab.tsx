import React from 'react';
import {
  RiLightbulbLine, RiStickyNoteLine, RiCheckboxCircleLine,
  RiFlag2Line, RiSearchLine
} from 'react-icons/ri';
import {
  insightsData, recommendationsData, commanderNotes
} from '../../data/mockData';
import InfoTip from '../../components/InfoTip';

const tagColors: Record<string, string> = {
  tactical: 'bg-idf-red/[0.13] text-idf-red border-idf-red/20',
  mental: 'bg-idf-blue/[0.13] text-idf-blue border-idf-blue/20',
  physical: 'bg-idf-green/[0.13] text-idf-green border-idf-green/20',
  general: 'bg-idf-purple/[0.13] text-idf-purple border-idf-purple/20',
};

const tagLabels: Record<string, string> = {
  tactical: 'טקטי',
  mental: 'מנטלי',
  physical: 'פיזי',
  general: 'כללי',
};

const statusColors: Record<string, string> = {
  pending: 'bg-text-dim/[0.13] text-text-dim border-text-dim/20',
  in_progress: 'bg-idf-orange/[0.13] text-idf-orange border-idf-orange/20',
  completed: 'bg-idf-green/[0.13] text-idf-green border-idf-green/20',
};

const statusLabels: Record<string, string> = {
  pending: 'ממתין',
  in_progress: 'בביצוע',
  completed: 'הושלם',
};

const InsightsTab: React.FC = () => {
  const devTargets = [
    { component: 'נפשי-רגשי', target: 'שיפור ציון ויסות רגשי ל-70 תוך 5 מפגשים', progress: 65, color: '#FF4D6A' },
    { component: 'קוגניטיבי', target: 'ירידת זמן תגובה מתחת ל-1.0s', progress: 82, color: '#38BDF8' },
    { component: 'חברתי', target: 'העלאת ציון לכידות צוות ל-75', progress: 48, color: '#00E5A0' },
  ];

  return (
    <div className="space-y-6">
      {/* Automated Insights */}
      <div className="rounded-[14px] p-5" style={{ backgroundColor: 'var(--surface)', borderWidth: 1, borderStyle: 'solid', borderColor: 'var(--border)' }}>
        <div className="flex items-center gap-2 mb-4">
          <RiLightbulbLine className="text-idf-orange text-lg" />
          <h2 className="text-lg font-semibold">תובנות אוטומטיות</h2>
          <InfoTip text={"איך לקרוא: תובנות שנוצרו אוטומטית מניתוח הנתונים. כל תובנה מסומנת בצבע לפי סוג:\n\nירוק = חיובית (הישג/שיפור), כתום = אזהרה, אדום = קריטית.\n\nדוגמה: 'שיפור עקבי של 15% בעמידה ב-3 מפגשים אחרונים' (ירוק) = מגמה חיובית שיש לחזק.\n\nתובנות אדומות דורשות התייחסות מיידית."} />
        </div>
        <div className="space-y-3">
          {insightsData.map(insight => (
            <div key={insight.id} className="flex items-start gap-3 p-3 rounded-lg" style={{ backgroundColor: 'var(--bg)', borderWidth: 1, borderStyle: 'solid', borderColor: 'var(--border)' }}>
              <div className={`glow-dot mt-1.5 flex-shrink-0 ${
                insight.type === 'pattern' ? 'bg-idf-blue shadow-[0_0_8px_rgba(56,189,248,0.5)]' :
                insight.type === 'improvement' ? 'bg-idf-green shadow-[0_0_8px_rgba(0,229,160,0.5)]' :
                'bg-idf-red shadow-[0_0_8px_rgba(255,77,106,0.5)]'
              }`} />
              <p className="text-sm leading-relaxed" style={{ color: 'var(--text-primary)' }}>{insight.textHe}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Commander Notes */}
      <div className="rounded-[14px] p-5" style={{ backgroundColor: 'var(--surface)', borderWidth: 1, borderStyle: 'solid', borderColor: 'var(--border)' }}>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <RiStickyNoteLine className="text-idf-purple text-lg" />
            <h2 className="text-lg font-semibold">הערות מפקד</h2>
            <InfoTip text={"איך לקרוא: הערות שנרשמו ידנית על ידי המפקד. כל הערה כוללת תאריך, נושא ותוכן.\n\nדוגמה: '15.01 - הצוער הפגין מנהיגות יוצאת דופן בתרגיל לילה' = תיעוד חיובי שיכול לתמוך בהחלטות קידום.\n\nניתן להוסיף הערות חדשות בכל עת."} />
          </div>
          <div className="relative">
            <RiSearchLine className="absolute right-3 top-1/2 -translate-y-1/2 text-sm" style={{ color: 'var(--text-dim)' }} />
            <input
              type="text"
              placeholder="חיפוש בהערות..."
              className="rounded-lg pr-8 pl-3 py-1.5 text-sm focus:outline-none focus:border-idf-blue/50 w-40"
              style={{ backgroundColor: 'var(--bg)', borderWidth: 1, borderStyle: 'solid', borderColor: 'var(--border)', color: 'var(--text-primary)' }}
            />
          </div>
        </div>
        <div className="space-y-3">
          {commanderNotes.map(note => (
            <div key={note.id} className="p-4 rounded-lg" style={{ backgroundColor: 'var(--bg)', borderWidth: 1, borderStyle: 'solid', borderColor: 'var(--border)' }}>
              <div className="flex items-center gap-2 mb-2">
                <span className={`badge ${tagColors[note.tag]}`}>{tagLabels[note.tag]}</span>
                <span className="text-xs" style={{ color: 'var(--text-dim)' }}>{note.author}</span>
                <span className="text-xs mr-auto" style={{ color: 'var(--text-dim)' }}>{note.timestamp}</span>
              </div>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--text-primary)' }}>{note.textHe}</p>
            </div>
          ))}
        </div>
        <textarea
          placeholder="הוסף הערה חדשה..."
          className="w-full mt-4 rounded-lg p-3 text-sm focus:outline-none focus:border-idf-blue/50 resize-none h-20"
          style={{ backgroundColor: 'var(--bg)', borderWidth: 1, borderStyle: 'solid', borderColor: 'var(--border)', color: 'var(--text-primary)' }}
        />
      </div>

      {/* Training Recommendations */}
      <div className="rounded-[14px] p-5" style={{ backgroundColor: 'var(--surface)', borderWidth: 1, borderStyle: 'solid', borderColor: 'var(--border)' }}>
        <div className="flex items-center gap-2 mb-4">
          <RiCheckboxCircleLine className="text-idf-green text-lg" />
          <h2 className="text-lg font-semibold">המלצות אימון</h2>
          <InfoTip text={"איך לקרוא: המלצות פעולה ממוינות לפי עדיפות. כל המלצה כוללת: סוג תרגול, מרכיב חוסן, ורמת דחיפות.\n\nדוגמה: 'תרגול מדיטציה תחת לחץ (רגשי, דחיפות גבוהה)' = יש לשלב כבר במפגש הבא.\n\nהמלצות בראש הרשימה = עדיפות גבוהה. יש ליישם לפחות את 2-3 ההמלצות הראשונות."} />
        </div>
        <div className="space-y-3">
          {recommendationsData.map(rec => (
            <div key={rec.id} className="flex items-center justify-between p-3 rounded-lg" style={{ backgroundColor: 'var(--bg)', borderWidth: 1, borderStyle: 'solid', borderColor: 'var(--border)' }}>
              <p className="text-sm" style={{ color: 'var(--text-primary)' }}>{rec.textHe}</p>
              <span className={`badge ${statusColors[rec.status]}`}>{statusLabels[rec.status]}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Development Targets */}
      <div className="rounded-[14px] p-5" style={{ backgroundColor: 'var(--surface)', borderWidth: 1, borderStyle: 'solid', borderColor: 'var(--border)' }}>
        <div className="flex items-center gap-2 mb-4">
          <RiFlag2Line className="text-idf-blue text-lg" />
          <h2 className="text-lg font-semibold">יעדי פיתוח</h2>
          <InfoTip text={"איך לקרוא: יעדי פיתוח מותאמים אישית לצוער. כל יעד כולל: תיאור, מדד הצלחה, ותאריך יעד.\n\nדוגמה: 'שיפור ויסות רגשי ל-70+ עד 01.04' = יעד ברור עם מדד מספרי וזמן.\n\nסימון V = יעד שהושג. עיגול ריק = בתהליך."} />
        </div>
        <div className="space-y-4">
          {devTargets.map(target => (
            <div key={target.component} className="p-4 rounded-lg" style={{ backgroundColor: 'var(--bg)', borderWidth: 1, borderStyle: 'solid', borderColor: 'var(--border)' }}>
              <div className="flex items-center justify-between mb-2">
                <div>
                  <span className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>{target.component}</span>
                  <p className="text-xs mt-0.5" style={{ color: 'var(--text-dim)' }}>{target.target}</p>
                </div>
                <span className="text-base font-bold font-mono" style={{ color: target.color }}>{target.progress}%</span>
              </div>
              <div className="h-2 rounded-full overflow-hidden" style={{ backgroundColor: 'var(--surface)' }}>
                <div
                  className="h-full rounded-full transition-all duration-700"
                  style={{ width: `${target.progress}%`, backgroundColor: target.color }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default InsightsTab;
