import React from 'react';
import {
  LineChart, Line, ResponsiveContainer
} from 'recharts';
import { RiHeartPulseLine, RiDropLine, RiEyeLine, RiTimerLine, RiArrowUpSLine, RiArrowDownSLine } from 'react-icons/ri';
import RadarChart from '../../components/RadarChart';
import InfoTip from '../../components/InfoTip';
import { Cadet, cadetSessionHistory, componentLabels, timelineEvents } from '../../data/mockData';

interface Props { cadet: Cadet; }

const OverviewTab: React.FC<Props> = ({ cadet }) => {
  const radarData = componentLabels.map(comp => ({
    subject: comp.he,
    current: cadet.components[comp.key as keyof typeof cadet.components] as number,
    baseline: cadet.components[`baseline${comp.key.charAt(0).toUpperCase() + comp.key.slice(1)}` as keyof typeof cadet.components] as number,
    fullMark: 100,
  }));

  const bioCards = [
    { icon: RiHeartPulseLine, label: 'שונות דופק (HRV)', value: cadet.biometrics.hrv, unit: 'ms', baseline: cadet.biometrics.baselineHrv, dataKey: 'hrv', good: 'up' as const },
    { icon: RiDropLine, label: 'מוליכות עור (GSR)', value: cadet.biometrics.gsr, unit: 'uS', baseline: cadet.biometrics.baselineGsr, dataKey: 'gsr', good: 'down' as const },
    { icon: RiEyeLine, label: 'מעקב עיניים', value: `${cadet.biometrics.eyeTracking}%`, unit: '', baseline: cadet.biometrics.baselineEyeTracking, dataKey: 'eyeTracking', good: 'up' as const },
    { icon: RiTimerLine, label: 'זמן תגובה קוגניטיבי', value: cadet.biometrics.reactionTime, unit: 's', baseline: cadet.biometrics.baselineReactionTime, dataKey: 'reactionTime', good: 'down' as const },
  ];

  const timelineColors: Record<string, string> = {
    baseline: 'bg-idf-blue', trigger: 'bg-idf-red', protocol: 'bg-idf-orange',
    improvement: 'bg-idf-green', breakthrough: 'bg-idf-purple', current: 'bg-text-secondary',
  };

  return (
    <div className="space-y-6">
      {/* Bio-Metric Cards */}
      <div className="grid grid-cols-4 gap-4">
        {bioCards.map((card) => {
          const current = typeof card.value === 'string' ? parseFloat(card.value) : card.value;
          const diff = ((current - card.baseline) / card.baseline * 100).toFixed(1);
          const isGood = card.good === 'up' ? current > card.baseline : current < card.baseline;
          return (
            <div key={card.label} className="stat-card">
              <div className="flex items-center gap-2 mb-3">
                <card.icon className="text-idf-blue text-lg" />
                <span className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>{card.label}</span>
              </div>
              <div className="flex items-end gap-2 mb-2">
                <span className="text-2xl font-bold font-mono" style={{ color: 'var(--text-primary)' }}>{card.value}</span>
                <span className="text-xs mb-1" style={{ color: 'var(--text-dim)' }}>{card.unit}</span>
              </div>
              <div className="h-16">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={cadetSessionHistory.slice(-12)}>
                    <Line type="monotone" dataKey={card.dataKey} stroke={isGood ? '#00E5A0' : '#FF4D6A'} strokeWidth={1.5} dot={false} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              <div className={`flex items-center gap-1 mt-1 text-xs ${isGood ? 'text-idf-green' : 'text-idf-red'}`}>
                {isGood ? <RiArrowUpSLine /> : <RiArrowDownSLine />}
                <span>{diff}% מהבסיס</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Radar Chart */}
      <div className="rounded-[14px] p-5" style={{ backgroundColor: 'var(--surface)', borderWidth: 1, borderStyle: 'solid', borderColor: 'var(--border)' }}>
        <div className="flex items-center gap-2 mb-2">
          <h2 className="text-lg font-semibold">רדאר חמישה מרכיבי חוסן</h2>
          <InfoTip text={"איך לקרוא: כל קודקוד = מרכיב חוסן (ערכי, רגשי, קוגניטיבי, חברתי, פיזי). המרחק מהמרכז = הציון (0-100).\n\nכחול = נוכחי, מקווקו = בסיס.\n\nדוגמה: קודקוד 'רגשי' ב-72 (כחול) מול 58 (בסיס) = שיפור של 14 נקודות.\n\nצורה עגולה ומאוזנת = חוסן אחיד. שקע חד = מרכיב חלש שדורש חיזוק."} />
        </div>
        <RadarChart data={radarData} size="large" />
      </div>

      {/* Timeline */}
      <div className="rounded-[14px] p-5" style={{ backgroundColor: 'var(--surface)', borderWidth: 1, borderStyle: 'solid', borderColor: 'var(--border)' }}>
        <div className="flex items-center gap-2 mb-6">
          <h2 className="text-lg font-semibold">ציר זמן - אבני דרך</h2>
          <InfoTip text={"איך לקרוא: ציר זמן כרונולוגי של אירועים משמעותיים בשירות הצוער.\n\nכל נקודה = אירוע (סימולציה, אבן דרך, טריגר).\n\nדוגמה: נקודה ירוקה ב-15.01 = אבן דרך שהושגה. נקודה אדומה ב-20.01 = טריגר לחץ שזוהה.\n\nריכוז אירועים אדומים = תקופה מאתגרת. ירוקים ברצף = התקדמות חיובית."} />
        </div>
        <div className="relative">
          <div className="absolute top-4 right-4 left-4 h-0.5" style={{ backgroundColor: 'var(--border)' }} />
          <div className="flex justify-between relative">
            {timelineEvents.map((event) => (
              <div key={event.id} className="flex flex-col items-center group cursor-pointer" style={{ width: `${100 / timelineEvents.length}%` }}>
                <div className={`w-8 h-8 rounded-full ${timelineColors[event.type]} flex items-center justify-center text-white text-xs font-bold z-10 group-hover:scale-125 transition-transform`}>
                  {event.session}
                </div>
                <div className="mt-3 text-center">
                  <p className="text-xs font-semibold" style={{ color: 'var(--text-primary)' }}>{event.labelHe}</p>
                  <p className="text-xs mt-0.5 max-w-[120px] mx-auto opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: 'var(--text-dim)' }}>{event.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OverviewTab;
