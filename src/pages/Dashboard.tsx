import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from 'recharts';
import {
  RiUserLine, RiShieldLine, RiTimeLine, RiAlertLine,
  RiArrowUpLine, RiCalendarLine, RiDownloadLine,
  RiArrowUpSLine, RiArrowDownSLine, RiArrowRightSLine,
} from 'react-icons/ri';
import StatCard from '../components/StatCard';
import InfoTip from '../components/InfoTip';
import RadarChart from '../components/RadarChart';
import RadarBreakdown from '../components/RadarBreakdown';
import { useChartTheme } from '../useChartTheme';
import {
  cadets, sessionTrendData, activityFeed, sectorLabels, riskLabels, componentLabels
} from '../data/mockData';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const chartTheme = useChartTheme();
  const [timeRange, setTimeRange] = useState<'week' | 'month' | 'quarter' | 'all'>('all');

  const atRiskCadets = cadets
    .filter(c => c.riskLevel === 'high' || c.trend === 'down')
    .sort((a, b) => a.resilienceScore - b.resilienceScore)
    .slice(0, 5);

  const unitAvgComponents = componentLabels.map(comp => {
    const key = comp.key as keyof typeof cadets[0]['components'];
    const baseKey = `baseline${comp.key.charAt(0).toUpperCase() + comp.key.slice(1)}` as keyof typeof cadets[0]['components'];
    return {
      subject: comp.he,
      current: Math.round(cadets.reduce((sum, c) => sum + c.components[key], 0) / cadets.length),
      baseline: Math.round(cadets.reduce((sum, c) => sum + c.components[baseKey], 0) / cadets.length),
      fullMark: 100,
    };
  });

  const avgResilience = Math.round(cadets.reduce((s, c) => s + c.resilienceScore, 0) / cadets.length);
  const avgRecovery = (cadets.reduce((s, c) => s + c.recoveryTime, 0) / cadets.length).toFixed(1);
  const activeAlerts = cadets.filter(c => c.riskLevel === 'high').length;
  const avgImprovement = Math.round(
    cadets.reduce((s, c) => s + ((c.resilienceScore - c.baselineScore) / c.baselineScore) * 100, 0) / cadets.length
  );

  const TrendArrow = ({ trend }: { trend: string }) => {
    if (trend === 'up') return <RiArrowUpSLine className="text-idf-green" />;
    if (trend === 'down') return <RiArrowDownSLine className="text-idf-red" />;
    return <RiArrowRightSLine className="text-idf-orange" />;
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold" style={{ color: 'var(--text-primary)' }}>Command Dashboard - לוח מפקד</h1>
        <button
          className="flex items-center gap-2 text-sm font-medium rounded-lg px-3 py-2 transition-colors"
          style={{ color: 'var(--text-secondary)', backgroundColor: 'var(--surface)', borderWidth: '1px', borderStyle: 'solid', borderColor: 'var(--border)' }}
        >
          <RiDownloadLine /> Export
        </button>
      </div>

      {/* KPI Strip */}
      <div className="grid grid-cols-6 gap-4 mb-6">
        <StatCard icon={RiUserLine} label="צוערים פעילים" value={cadets.length} trend="up" trendValue="+12% מהחודש הקודם" />
        <StatCard icon={RiShieldLine} label="ציון חוסן משוקלל" value={avgResilience} trend="up" trendValue="+8.3%" />
        <StatCard icon={RiTimeLine} label="זמן התאוששות ממוצע" value={`${avgRecovery}s`} trend="down" trendValue="-15%" trendGood="down" />
        <StatCard icon={RiAlertLine} label="התראות פעילות" value={activeAlerts} trend={activeAlerts > 0 ? 'up' : 'stable'} trendValue={`${activeAlerts} צוערים`} trendGood="down" />
        <StatCard icon={RiArrowUpLine} label="שיפור מצטבר" value={`${avgImprovement}%`} trend="up" trendValue="מהבסיס" />
        <StatCard icon={RiCalendarLine} label="מפגשים החודש" value={cadets.reduce((s, c) => s + c.totalSessions, 0)} trend="up" trendValue="יעד: 100" />
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-5 gap-6">
        {/* Left Column - 3/5 */}
        <div className="col-span-3 space-y-6">
          {/* Trend Chart */}
          <div className="rounded-[14px] p-5" style={{ backgroundColor: 'var(--surface)', borderWidth: '1px', borderStyle: 'solid', borderColor: 'var(--border)' }}>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-semibold" style={{ color: 'var(--text-primary)' }}>מגמת חוסן לאורך זמן</h2>
                <InfoTip text={"איך לקרוא: ציר X = מספר מפגש, ציר Y = ציון חוסן (0-100). כל קו צבעוני מייצג זרוע שונה.\n\nאדום = קרבי, כחול = מטכ\"לי, ירוק = מוסדי.\n\nדוגמה: אם הקו האדום עולה ממפגש 3 למפגש 7 מ-45 ל-62, משמע שציון החוסן של הזרוע הקרבית עלה ב-17 נקודות.\n\nמגמה עולה = שיפור, מגמה יורדת = דרוש תשומת לב."} />
              </div>
              <div className="flex gap-1">
                {(['week', 'month', 'quarter', 'all'] as const).map(range => (
                  <button
                    key={range}
                    onClick={() => setTimeRange(range)}
                    className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                      timeRange === range ? 'bg-idf-blue/10 text-idf-blue' : ''
                    }`}
                    style={timeRange !== range ? { color: 'var(--text-dim)' } : undefined}
                  >
                    {range === 'week' ? 'שבוע' : range === 'month' ? 'חודש' : range === 'quarter' ? 'רבעון' : 'הכל'}
                  </button>
                ))}
              </div>
            </div>
            <ResponsiveContainer width="100%" height={280}>
              <AreaChart data={sessionTrendData}>
                <CartesianGrid strokeDasharray="3 3" stroke={chartTheme.gridColor} />
                <XAxis dataKey="session" stroke={chartTheme.axisColor} tick={{ fontSize: 12 }} label={{ value: 'מפגש', position: 'insideBottom', offset: -5, fill: chartTheme.axisColor, fontSize: 12 }} />
                <YAxis stroke={chartTheme.axisColor} tick={{ fontSize: 12 }} domain={[30, 85]} />
                <Tooltip
                  contentStyle={chartTheme.tooltipStyle}
                  labelStyle={{ color: chartTheme.labelColor }}
                />
                <Legend wrapperStyle={{ fontSize: '12px', fontFamily: 'Heebo' }} />
                <Area type="monotone" dataKey="combatScore" name="קרבי" stroke="#FF4D6A" fill="#FF4D6A" fillOpacity={0.1} strokeWidth={2} />
                <Area type="monotone" dataKey="commandScore" name='מטכ"לי' stroke="#38BDF8" fill="#38BDF8" fillOpacity={0.1} strokeWidth={2} />
                <Area type="monotone" dataKey="institutionalScore" name="מוסדי" stroke="#00E5A0" fill="#00E5A0" fillOpacity={0.1} strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* At Risk Table */}
          <div className="rounded-[14px] p-5" style={{ backgroundColor: 'var(--surface)', borderWidth: '1px', borderStyle: 'solid', borderColor: 'var(--border)' }}>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-semibold" style={{ color: 'var(--text-primary)' }}>צוערים הדורשים תשומת לב</h2>
                <InfoTip text={"איך לקרוא: הטבלה מציגה את 5 הצוערים הדורשים תשומת לב מיידית, ממוינים מהנמוך לגבוה.\n\nרמת סיכון: אדום = גבוה, כתום = בינוני.\nמגמה: חץ למטה = ירידה, חץ למעלה = שיפור.\n\nדוגמה: צוער עם ציון 42 וחץ למטה באדום - סיכון גבוה עם מגמת הידרדרות, דורש התערבות מיידית.\n\nלחיצה על שורה תפתח את פרופיל הצוער המלא."} />
              </div>
              <span className="text-sm" style={{ color: 'var(--text-dim)' }}>{atRiskCadets.length} צוערים</span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-right">
                <thead>
                  <tr style={{ backgroundColor: 'var(--hover)' }}>
                    <th className="px-4 py-2.5 text-sm font-semibold" style={{ color: 'var(--text-secondary)' }}>מזהה</th>
                    <th className="px-4 py-2.5 text-sm font-semibold" style={{ color: 'var(--text-secondary)' }}>זרוע</th>
                    <th className="px-4 py-2.5 text-sm font-semibold" style={{ color: 'var(--text-secondary)' }}>מפגשים</th>
                    <th className="px-4 py-2.5 text-sm font-semibold" style={{ color: 'var(--text-secondary)' }}>ציון חוסן</th>
                    <th className="px-4 py-2.5 text-sm font-semibold" style={{ color: 'var(--text-secondary)' }}>מגמה</th>
                    <th className="px-4 py-2.5 text-sm font-semibold" style={{ color: 'var(--text-secondary)' }}>רמת סיכון</th>
                  </tr>
                </thead>
                <tbody>
                  {atRiskCadets.map((cadet, i) => (
                    <tr
                      key={cadet.id}
                      className="cursor-pointer transition-colors"
                      style={{
                        borderBottom: '1px solid var(--border)',
                        backgroundColor: i % 2 === 1 ? 'var(--zebra)' : undefined,
                      }}
                      onMouseEnter={e => (e.currentTarget.style.backgroundColor = 'var(--hover)')}
                      onMouseLeave={e => (e.currentTarget.style.backgroundColor = i % 2 === 1 ? 'var(--zebra)' : '')}
                      onClick={() => navigate(`/cadet/${cadet.id}`)}
                    >
                      <td className="px-4 py-3 text-sm font-mono font-medium">{cadet.id}</td>
                      <td className="px-4 py-3">
                        <span className={`badge badge-${cadet.sector}`}>{sectorLabels[cadet.sector]}</span>
                      </td>
                      <td className="px-4 py-3 text-sm font-mono">{cadet.totalSessions}</td>
                      <td className="px-4 py-3 text-sm font-mono font-bold">{cadet.resilienceScore}</td>
                      <td className="px-4 py-3"><TrendArrow trend={cadet.trend} /></td>
                      <td className="px-4 py-3">
                        <span className={`badge badge-risk-${cadet.riskLevel}`}>{riskLabels[cadet.riskLevel]}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right Column - 2/5 */}
        <div className="col-span-2 space-y-6">
          {/* Radar Chart */}
          <div className="rounded-[14px] p-5" style={{ backgroundColor: 'var(--surface)', borderWidth: '1px', borderStyle: 'solid', borderColor: 'var(--border)' }}>
            <div className="flex items-center gap-2 mb-2">
              <h2 className="text-lg font-semibold" style={{ color: 'var(--text-primary)' }}>רדאר חמישה מרכיבים - ממוצע יחידה</h2>
              <InfoTip text={"איך לקרוא: כל קודקוד מייצג מרכיב חוסן (ערכי, רגשי, קוגניטיבי, חברתי, פיזי). ככל שהנקודה רחוקה יותר מהמרכז - הציון גבוה יותר (0-100).\n\nכחול מלא = ציון נוכחי, קו מקווקו = קו בסיס.\n\nדוגמה: אם הקודקוד \"רגשי\" נמצא ב-72 (כחול) ובבסיס היה 58 (מקווקו), חל שיפור של 14 נקודות במרכיב הרגשי.\n\nצורה מאוזנת = חוסן אחיד, צורה לא סימטרית = יש מרכיב חלש שדורש חיזוק."} />
            </div>
            <RadarChart data={unitAvgComponents} />
            <RadarBreakdown data={unitAvgComponents} />
          </div>

          {/* Activity Feed */}
          <div className="rounded-[14px] p-5" style={{ backgroundColor: 'var(--surface)', borderWidth: '1px', borderStyle: 'solid', borderColor: 'var(--border)' }}>
            <div className="flex items-center gap-2 mb-4">
              <h2 className="text-lg font-semibold" style={{ color: 'var(--text-primary)' }}>פעילות אחרונה</h2>
              <InfoTip text={"איך לקרוא: כל שורה היא אירוע שהתרחש לאחרונה. הנקודה הצבעונית מציינת את סוג האירוע:\n\nכחול = סימולציה, אדום = טריגר/התראה, ירוק = אבן דרך/הישג, כתום = הערכה.\n\nדוגמה: נקודה אדומה עם \"טריגר לחץ זוהה עבור צוער X\" - המערכת זיהתה חריגה ביומטרית.\n\nלחיצה על אירוע תפתח את פרופיל הצוער."} />
            </div>
            <div className="space-y-3 max-h-[340px] overflow-y-auto">
              {activityFeed.map(event => (
                <div
                  key={event.id}
                  className="flex items-start gap-3 p-3 rounded-lg cursor-pointer transition-colors"
                  style={{ backgroundColor: 'transparent' }}
                  onMouseEnter={e => (e.currentTarget.style.backgroundColor = 'var(--hover)')}
                  onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'transparent')}
                  onClick={() => event.cadetId && navigate(`/cadet/${event.cadetId}`)}
                >
                  <div className={`glow-dot mt-1.5 flex-shrink-0 ${
                    event.type === 'simulation' ? 'bg-idf-blue shadow-[0_0_8px_rgba(56,189,248,0.5)]' :
                    event.type === 'trigger' ? 'bg-idf-red shadow-[0_0_8px_rgba(255,77,106,0.5)]' :
                    event.type === 'milestone' ? 'bg-idf-green shadow-[0_0_8px_rgba(0,229,160,0.5)]' :
                    'bg-idf-orange shadow-[0_0_8px_rgba(255,181,71,0.5)]'
                  }`} />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm leading-relaxed" style={{ color: 'var(--text-primary)' }}>{event.messageHe}</p>
                    <p className="text-xs mt-1" style={{ color: 'var(--text-dim)' }}>{event.timestamp}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
