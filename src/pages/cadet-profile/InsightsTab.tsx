import React from 'react';
import {
  RiLightbulbLine, RiStickyNoteLine, RiCheckboxCircleLine,
  RiFlag2Line, RiSearchLine
} from 'react-icons/ri';
import {
  insightsData, recommendationsData, commanderNotes
} from '../../data/mockData';

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
      <div className="bg-dark-surface border border-dark-border rounded-[14px] p-5">
        <div className="flex items-center gap-2 mb-4">
          <RiLightbulbLine className="text-idf-orange text-lg" />
          <h2 className="text-base font-semibold">תובנות אוטומטיות</h2>
        </div>
        <div className="space-y-3">
          {insightsData.map(insight => (
            <div key={insight.id} className="flex items-start gap-3 p-3 rounded-lg bg-dark-bg border border-dark-border">
              <div className={`glow-dot mt-1.5 flex-shrink-0 ${
                insight.type === 'pattern' ? 'bg-idf-blue shadow-[0_0_8px_rgba(56,189,248,0.5)]' :
                insight.type === 'improvement' ? 'bg-idf-green shadow-[0_0_8px_rgba(0,229,160,0.5)]' :
                'bg-idf-red shadow-[0_0_8px_rgba(255,77,106,0.5)]'
              }`} />
              <p className="text-xs text-text-primary leading-relaxed">{insight.textHe}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Commander Notes */}
      <div className="bg-dark-surface border border-dark-border rounded-[14px] p-5">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <RiStickyNoteLine className="text-idf-purple text-lg" />
            <h2 className="text-base font-semibold">הערות מפקד</h2>
          </div>
          <div className="relative">
            <RiSearchLine className="absolute right-3 top-1/2 -translate-y-1/2 text-text-dim text-sm" />
            <input
              type="text"
              placeholder="חיפוש בהערות..."
              className="bg-dark-bg border border-dark-border rounded-lg pr-8 pl-3 py-1.5 text-xs text-text-primary placeholder-text-dim focus:outline-none focus:border-idf-blue/50 w-40"
            />
          </div>
        </div>
        <div className="space-y-3">
          {commanderNotes.map(note => (
            <div key={note.id} className="p-4 rounded-lg bg-dark-bg border border-dark-border">
              <div className="flex items-center gap-2 mb-2">
                <span className={`badge ${tagColors[note.tag]}`}>{tagLabels[note.tag]}</span>
                <span className="text-[10px] text-text-dim">{note.author}</span>
                <span className="text-[10px] text-text-dim mr-auto">{note.timestamp}</span>
              </div>
              <p className="text-xs text-text-primary leading-relaxed">{note.textHe}</p>
            </div>
          ))}
        </div>
        <textarea
          placeholder="הוסף הערה חדשה..."
          className="w-full mt-4 bg-dark-bg border border-dark-border rounded-lg p-3 text-xs text-text-primary placeholder-text-dim focus:outline-none focus:border-idf-blue/50 resize-none h-20"
        />
      </div>

      {/* Training Recommendations */}
      <div className="bg-dark-surface border border-dark-border rounded-[14px] p-5">
        <div className="flex items-center gap-2 mb-4">
          <RiCheckboxCircleLine className="text-idf-green text-lg" />
          <h2 className="text-base font-semibold">המלצות אימון</h2>
        </div>
        <div className="space-y-3">
          {recommendationsData.map(rec => (
            <div key={rec.id} className="flex items-center justify-between p-3 rounded-lg bg-dark-bg border border-dark-border">
              <p className="text-xs text-text-primary">{rec.textHe}</p>
              <span className={`badge ${statusColors[rec.status]}`}>{statusLabels[rec.status]}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Development Targets */}
      <div className="bg-dark-surface border border-dark-border rounded-[14px] p-5">
        <div className="flex items-center gap-2 mb-4">
          <RiFlag2Line className="text-idf-blue text-lg" />
          <h2 className="text-base font-semibold">יעדי פיתוח</h2>
        </div>
        <div className="space-y-4">
          {devTargets.map(target => (
            <div key={target.component} className="p-4 rounded-lg bg-dark-bg border border-dark-border">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <span className="text-xs font-semibold text-text-primary">{target.component}</span>
                  <p className="text-[10px] text-text-dim mt-0.5">{target.target}</p>
                </div>
                <span className="text-sm font-bold font-mono" style={{ color: target.color }}>{target.progress}%</span>
              </div>
              <div className="h-2 bg-dark-surface rounded-full overflow-hidden">
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
