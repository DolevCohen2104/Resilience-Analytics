import { cadets, sessionTrendData, sectorLabels, riskLabels } from '../data/mockData';
import type { Cadet } from '../data/mockData';

// ============ CSV EXPORT ============

function escapeCsvField(field: string | number): string {
  const str = String(field);
  if (str.includes(',') || str.includes('"') || str.includes('\n')) {
    return `"${str.replace(/"/g, '""')}"`;
  }
  return str;
}

function downloadFile(content: string, filename: string, mimeType: string) {
  // Add BOM for Hebrew UTF-8 support in Excel
  const bom = '\uFEFF';
  const blob = new Blob([bom + content], { type: `${mimeType};charset=utf-8` });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

function toCsv(headers: string[], rows: (string | number)[][]): string {
  const headerLine = headers.map(escapeCsvField).join(',');
  const dataLines = rows.map(row => row.map(escapeCsvField).join(','));
  return [headerLine, ...dataLines].join('\n');
}

// ============ DASHBOARD EXPORT ============

export function exportDashboard() {
  const date = new Date().toISOString().split('T')[0];

  // Sheet 1: KPIs
  const avgResilience = Math.round(cadets.reduce((a, c) => a + c.resilienceScore, 0) / cadets.length);
  const avgRecovery = (cadets.reduce((a, c) => a + c.recoveryTime, 0) / cadets.length).toFixed(1);
  const highRisk = cadets.filter(c => c.riskLevel === 'high').length;

  const kpiHeaders = ['מדד', 'ערך'];
  const kpiRows: (string | number)[][] = [
    ['צוערים פעילים', cadets.length],
    ['ציון חוסן משוקלל', avgResilience],
    ['זמן התאוששות ממוצע', `${avgRecovery}s`],
    ['התראות פעילות', highRisk],
  ];

  // Sheet 2: Cadets overview
  const cadetHeaders = ['מזהה', 'זרוע', 'מפגשים', 'ציון חוסן', 'ציון בסיס', 'זמן התאוששות', 'מגמה', 'רמת סיכון'];
  const cadetRows = cadets.map(c => [
    c.id,
    sectorLabels[c.sector],
    c.totalSessions,
    c.resilienceScore,
    c.baselineScore,
    c.recoveryTime,
    c.trend === 'up' ? 'עלייה' : c.trend === 'down' ? 'ירידה' : 'יציב',
    riskLabels[c.riskLevel],
  ]);

  // Sheet 3: Trend data
  const trendHeaders = ['מפגש', 'תאריך', 'קרבי', 'מטכ"לי', 'מוסדי', 'ממוצע'];
  const trendRows = sessionTrendData.map(s => [
    s.session, s.date, s.combatScore, s.commandScore, s.institutionalScore, s.avgScore,
  ]);

  // Combine into one CSV with section separators
  const sections = [
    `דוח לוח מפקד - ${date}`,
    '',
    'סיכום מדדים',
    toCsv(kpiHeaders, kpiRows),
    '',
    'רשימת צוערים',
    toCsv(cadetHeaders, cadetRows),
    '',
    'מגמת חוסן לאורך זמן',
    toCsv(trendHeaders, trendRows),
  ];

  downloadFile(sections.join('\n'), `dashboard-report-${date}.csv`, 'text/csv');
}

// ============ COMMANDER VIEW EXPORT ============

export function exportCommanderReport() {
  const date = new Date().toISOString().split('T')[0];

  const headers = ['מזהה צוער', 'זרוע', 'מפגשים', 'ציון חוסן', 'מגמה', 'רמת סיכון', 'פעולה נדרשת',
    'ערכי', 'רגשי', 'קוגניטיבי', 'חברתי', 'פיזי', 'עמידה', 'התאוששות', 'הסתגלות'];
  const rows = cadets.map(c => [
    c.id,
    sectorLabels[c.sector],
    c.totalSessions,
    c.resilienceScore,
    c.trend === 'up' ? 'עלייה' : c.trend === 'down' ? 'ירידה' : 'יציב',
    riskLabels[c.riskLevel],
    c.riskLevel === 'high' ? 'התערבות נדרשת' : c.riskLevel === 'medium' ? 'ניטור מוגבר' : 'המשך אימון שגרתי',
    c.components.values,
    c.components.emotional,
    c.components.cognitive,
    c.components.social,
    c.components.physical,
    c.capabilities.withstanding,
    c.capabilities.recovery,
    c.capabilities.adaptation,
  ]);

  const csv = toCsv(headers, rows);
  const content = `דוח מוכנות מפקד - ${date}\n\n${csv}`;
  downloadFile(content, `commander-readiness-${date}.csv`, 'text/csv');
}

export function exportCommanderExcel() {
  const date = new Date().toISOString().split('T')[0];

  const headers = ['מזהה צוער', 'זרוע', 'מפגשים', 'ציון חוסן', 'מגמה', 'רמת סיכון', 'פעולה נדרשת'];
  const rows = cadets.map(c => [
    c.id,
    sectorLabels[c.sector],
    c.totalSessions,
    c.resilienceScore,
    c.trend === 'up' ? 'עלייה' : c.trend === 'down' ? 'ירידה' : 'יציב',
    riskLabels[c.riskLevel],
    c.riskLevel === 'high' ? 'התערבות נדרשת' : c.riskLevel === 'medium' ? 'ניטור מוגבר' : 'המשך אימון שגרתי',
  ]);

  downloadFile(toCsv(headers, rows), `readiness-table-${date}.csv`, 'text/csv');
}

// ============ CADET PROFILE EXPORT ============

export function exportCadetReport(cadet: Cadet) {
  const date = new Date().toISOString().split('T')[0];

  const sections = [
    `דוח צוער - ${cadet.id} (${cadet.alias}) - ${date}`,
    '',
    'פרטים כלליים',
    toCsv(['שדה', 'ערך'], [
      ['מזהה', cadet.id],
      ['כינוי', cadet.alias],
      ['זרוע', sectorLabels[cadet.sector]],
      ['סטטוס', cadet.status === 'active' ? 'פעיל' : cadet.status === 'suspended' ? 'מושעה' : 'הושלם'],
      ['מפגשים', cadet.totalSessions],
      ['מפגש אחרון', cadet.lastSessionDate],
      ['ציון חוסן', cadet.resilienceScore],
      ['ציון בסיס', cadet.baselineScore],
      ['זמן התאוששות', `${cadet.recoveryTime}s`],
      ['רמת סיכון', riskLabels[cadet.riskLevel]],
      ['מגמה', cadet.trend === 'up' ? 'עלייה' : cadet.trend === 'down' ? 'ירידה' : 'יציב'],
    ]),
    '',
    'מדדים ביומטריים',
    toCsv(['מדד', 'נוכחי', 'בסיס', 'שינוי %'], [
      ['HRV (ms)', cadet.biometrics.hrv, cadet.biometrics.baselineHrv, `${((cadet.biometrics.hrv - cadet.biometrics.baselineHrv) / cadet.biometrics.baselineHrv * 100).toFixed(1)}%`],
      ['GSR (uS)', cadet.biometrics.gsr, cadet.biometrics.baselineGsr, `${((cadet.biometrics.gsr - cadet.biometrics.baselineGsr) / cadet.biometrics.baselineGsr * 100).toFixed(1)}%`],
      ['מעקב עיניים (%)', cadet.biometrics.eyeTracking, cadet.biometrics.baselineEyeTracking, `${((cadet.biometrics.eyeTracking - cadet.biometrics.baselineEyeTracking) / cadet.biometrics.baselineEyeTracking * 100).toFixed(1)}%`],
      ['זמן תגובה (s)', cadet.biometrics.reactionTime, cadet.biometrics.baselineReactionTime, `${((cadet.biometrics.reactionTime - cadet.biometrics.baselineReactionTime) / cadet.biometrics.baselineReactionTime * 100).toFixed(1)}%`],
    ]),
    '',
    'חמישה מרכיבי חוסן',
    toCsv(['מרכיב', 'נוכחי', 'בסיס', 'שינוי'], [
      ['ערכי', cadet.components.values, cadet.components.baselineValues, cadet.components.values - cadet.components.baselineValues],
      ['רגשי', cadet.components.emotional, cadet.components.baselineEmotional, cadet.components.emotional - cadet.components.baselineEmotional],
      ['קוגניטיבי', cadet.components.cognitive, cadet.components.baselineCognitive, cadet.components.cognitive - cadet.components.baselineCognitive],
      ['חברתי', cadet.components.social, cadet.components.baselineSocial, cadet.components.social - cadet.components.baselineSocial],
      ['פיזי', cadet.components.physical, cadet.components.baselinePhysical, cadet.components.physical - cadet.components.baselinePhysical],
    ]),
    '',
    'שלושת כושרי החוסן',
    toCsv(['כושר', 'ציון'], [
      ['עמידה', cadet.capabilities.withstanding],
      ['התאוששות', cadet.capabilities.recovery],
      ['הסתגלות', cadet.capabilities.adaptation],
    ]),
  ];

  downloadFile(sections.join('\n'), `cadet-${cadet.id}-report-${date}.csv`, 'text/csv');
}
