import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from 'recharts';
import {
  RiShieldLine, RiUserLine, RiAlertLine, RiArrowUpLine,
  RiCalendarLine, RiDownloadLine, RiArrowUpSLine, RiArrowDownSLine, RiArrowRightSLine, RiSearchLine
} from 'react-icons/ri';
import StatCard from '../components/StatCard';
import InfoTip from '../components/InfoTip';
import RadarChart from '../components/RadarChart';
import RadarBreakdown from '../components/RadarBreakdown';
import { cadets, sectorLabels, riskLabels, componentLabels } from '../data/mockData';
import { useChartTheme } from '../useChartTheme';

const CommanderView: React.FC = () => {
  const navigate = useNavigate();
  const ct = useChartTheme();

  const avgResilience = Math.round(cadets.reduce((s, c) => s + c.resilienceScore, 0) / cadets.length);
  const greenZone = cadets.filter(c => c.resilienceScore >= 70).length;
  const redZone = cadets.filter(c => c.resilienceScore < 40).length;
  const avgImprovement = Math.round(
    cadets.reduce((s, c) => s + ((c.resilienceScore - c.baselineScore) / c.baselineScore) * 100, 0) / cadets.length
  );
  const avgSessions = Math.round(cadets.reduce((s, c) => s + c.totalSessions, 0) / cadets.length);

  const distributionData = [
    { unit: "כיתה א'", red: 1, orange: 2, green: 3, blue: 1 },
    { unit: "כיתה ב'", red: 0, orange: 1, green: 4, blue: 2 },
    { unit: "כיתה ג'", red: 2, orange: 3, green: 2, blue: 0 },
  ];

  const unitRadar = componentLabels.map(comp => {
    const key = comp.key as keyof typeof cadets[0]['components'];
    return {
      subject: comp.he,
      current: Math.round(cadets.reduce((s, c) => s + c.components[key], 0) / cadets.length),
      baseline: Math.round(cadets.reduce((s, c) => s + c.components[`baseline${comp.key.charAt(0).toUpperCase() + comp.key.slice(1)}` as keyof typeof cadets[0]['components']], 0) / cadets.length),
      fullMark: 100,
    };
  });

  const TrendArrow = ({ trend }: { trend: string }) => {
    if (trend === 'up') return <RiArrowUpSLine className="text-idf-green" />;
    if (trend === 'down') return <RiArrowDownSLine className="text-idf-red" />;
    return <RiArrowRightSLine className="text-idf-orange" />;
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">תצוגת מפקד</h1>
        <button className="flex items-center gap-2 text-sm rounded-lg px-3 py-2 border hover:border-idf-blue/50 transition-colors" style={{ color: 'var(--text-secondary)', backgroundColor: 'var(--surface)', borderColor: 'var(--border)' }}>
          <RiDownloadLine /> הפקת דוח תקופתי
        </button>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-5 gap-4 mb-6">
        <StatCard icon={RiShieldLine} label="ציון חוסן משוקלל" value={avgResilience} trend="up" trendValue="+8%" />
        <StatCard icon={RiUserLine} label='צוערים באזור ירוק (>70)' value={`${greenZone}/${cadets.length}`} trend="up" trendValue={`${Math.round(greenZone/cadets.length*100)}%`} />
        <StatCard icon={RiAlertLine} label='צוערים באזור אדום (<40)' value={redZone} trend={redZone > 0 ? 'up' : 'stable'} trendValue="" trendGood="down" />
        <StatCard icon={RiArrowUpLine} label="שיפור ממוצע מבסיס" value={`${avgImprovement}%`} trend="up" trendValue="מכלל הצוערים" />
        <StatCard icon={RiCalendarLine} label="ממוצע מפגשים לצוער" value={avgSessions} trend="up" trendValue="" />
      </div>

      <div className="grid grid-cols-2 gap-6 mb-6">
        {/* Resilience Distribution */}
        <div className="rounded-[14px] p-5" style={{ backgroundColor: 'var(--surface)', borderWidth: 1, borderStyle: 'solid', borderColor: 'var(--border)' }}>
          <div className="flex items-center gap-2 mb-4">
            <h2 className="text-lg font-semibold">התפלגות חוסן לפי יחידת משנה</h2>
            <InfoTip text={"איך לקרוא: גרף עמודות המציג כמה צוערים בכל טווח ציונים.\n\nציר X = טווח ציונים, ציר Y = מספר צוערים.\n\nדוגמה: עמודה של 12 בטווח 70-80 = 12 צוערים עם ציון חוסן בין 70 ל-80.\n\nהתפלגות ימינה (ציונים גבוהים) = יחידה חזקה. עמודות גבוהות משמאל = הרבה צוערים חלשים."} />
          </div>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={distributionData}>
              <CartesianGrid strokeDasharray="3 3" stroke={ct.gridColor} />
              <XAxis dataKey="unit" stroke={ct.axisColor} tick={{ fontSize: 12, fontFamily: 'Heebo' }} />
              <YAxis stroke={ct.axisColor} tick={{ fontSize: 12 }} />
              <Tooltip contentStyle={ct.tooltipStyle} />
              <Legend wrapperStyle={{ fontSize: '12px', fontFamily: 'Heebo' }} />
              <Bar dataKey="red" name="< 40" stackId="a" fill="#FF4D6A" />
              <Bar dataKey="orange" name="40-60" stackId="a" fill="#FFB547" />
              <Bar dataKey="green" name="60-80" stackId="a" fill="#00E5A0" />
              <Bar dataKey="blue" name="80+" stackId="a" fill="#38BDF8" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Unit Radar */}
        <div className="rounded-[14px] p-5" style={{ backgroundColor: 'var(--surface)', borderWidth: 1, borderStyle: 'solid', borderColor: 'var(--border)' }}>
          <div className="flex items-center gap-2 mb-2">
            <h2 className="text-lg font-semibold">רדאר חמישה מרכיבים - ממוצע יחידה</h2>
            <InfoTip text={"איך לקרוא: ממוצע היחידה בכל מרכיב חוסן. כל קודקוד = מרכיב (0-100).\n\nכחול = נוכחי, מקווקו = בסיס.\n\nדוגמה: 'פיזי' ב-80 מול בסיס 65 = שיפור משמעותי של 23% במרכיב הפיזי.\n\nקודקוד ששקוע פנימה = מרכיב שדורש חיזוק ברמת היחידה."} />
          </div>
          <RadarChart data={unitRadar} size="large" />
          <RadarBreakdown data={unitRadar} />
        </div>
      </div>

      {/* Readiness Report Table */}
      <div className="rounded-[14px] p-5" style={{ backgroundColor: 'var(--surface)', borderWidth: 1, borderStyle: 'solid', borderColor: 'var(--border)' }}>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-semibold">דוח מוכנות</h2>
            <InfoTip text={"איך לקרוא: טבלה המציגה את רמת המוכנות של כל צוער.\n\nסטטוס: ירוק = מוכן, כתום = מוכן חלקית, אדום = לא מוכן.\n\nדוגמה: צוער עם 3 ירוקים ו-1 כתום = מוכן ברוב התחומים אך דרוש שיפור בתחום אחד.\n\nאחוז המוכנות הכולל של היחידה מוצג בראש העמוד."} />
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <RiSearchLine className="absolute right-3 top-1/2 -translate-y-1/2 text-base" style={{ color: 'var(--text-dim)' }} />
              <input
                type="text"
                placeholder="חיפוש..."
                className="rounded-lg pr-8 pl-3 py-1.5 text-sm focus:outline-none w-36"
                style={{ backgroundColor: 'var(--bg)', borderWidth: 1, borderStyle: 'solid', borderColor: 'var(--border)', color: 'var(--text-primary)' }}
              />
            </div>
            <button className="flex items-center gap-1 text-sm rounded-lg px-3 py-1.5 border hover:border-idf-blue/50" style={{ color: 'var(--text-secondary)', backgroundColor: 'var(--bg)', borderColor: 'var(--border)' }}>
              <RiDownloadLine className="text-base" /> Excel
            </button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-right">
            <thead>
              <tr style={{ backgroundColor: 'var(--hover)' }}>
                <th className="px-4 py-2.5 text-sm font-semibold" style={{ color: 'var(--text-secondary)' }}>מזהה צוער</th>
                <th className="px-4 py-2.5 text-sm font-semibold" style={{ color: 'var(--text-secondary)' }}>זרוע</th>
                <th className="px-4 py-2.5 text-sm font-semibold" style={{ color: 'var(--text-secondary)' }}>מפגשים</th>
                <th className="px-4 py-2.5 text-sm font-semibold" style={{ color: 'var(--text-secondary)' }}>ציון חוסן</th>
                <th className="px-4 py-2.5 text-sm font-semibold" style={{ color: 'var(--text-secondary)' }}>מגמה</th>
                <th className="px-4 py-2.5 text-sm font-semibold" style={{ color: 'var(--text-secondary)' }}>רמת סיכון</th>
                <th className="px-4 py-2.5 text-sm font-semibold" style={{ color: 'var(--text-secondary)' }}>פעולה נדרשת</th>
              </tr>
            </thead>
            <tbody>
              {cadets.map((cadet, i) => (
                <tr
                  key={cadet.id}
                  className="cursor-pointer transition-colors"
                  style={{
                    borderBottomWidth: 1, borderBottomStyle: 'solid', borderBottomColor: 'var(--border)',
                    backgroundColor: i % 2 === 1 ? 'var(--zebra)' : undefined,
                  }}
                  onMouseEnter={e => (e.currentTarget.style.backgroundColor = 'var(--hover)')}
                  onMouseLeave={e => (e.currentTarget.style.backgroundColor = i % 2 === 1 ? 'var(--zebra)' : '')}
                  onClick={() => navigate(`/cadet/${cadet.id}`)}
                >
                  <td className="px-4 py-3 text-base font-mono font-medium">{cadet.id}</td>
                  <td className="px-4 py-3"><span className={`badge badge-${cadet.sector}`}>{sectorLabels[cadet.sector]}</span></td>
                  <td className="px-4 py-3 text-base font-mono">{cadet.totalSessions}</td>
                  <td className="px-4 py-3">
                    <span className={`text-base font-mono font-bold ${
                      cadet.resilienceScore < 40 ? 'text-idf-red' : cadet.resilienceScore < 60 ? 'text-idf-orange' : cadet.resilienceScore < 80 ? 'text-idf-green' : 'text-idf-blue'
                    }`}>{cadet.resilienceScore}</span>
                  </td>
                  <td className="px-4 py-3"><TrendArrow trend={cadet.trend} /></td>
                  <td className="px-4 py-3"><span className={`badge badge-risk-${cadet.riskLevel}`}>{riskLabels[cadet.riskLevel]}</span></td>
                  <td className="px-4 py-3 text-sm max-w-[200px]" style={{ color: 'var(--text-secondary)' }}>
                    {cadet.riskLevel === 'high' ? 'נדרשת התערבות - מומלצת פגישה עם קצין מנטלי' :
                     cadet.riskLevel === 'medium' ? 'ניטור מוגבר - התמקדות בתרחישי התאוששות' :
                     'המשך אימון שגרתי'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CommanderView;
