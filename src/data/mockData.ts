// ============ TYPES ============

export type Sector = 'combat' | 'command' | 'institutional';
export type RiskLevel = 'low' | 'medium' | 'high';
export type AlertLevel = 'critical' | 'warning' | 'info' | 'system';
export type CadetStatus = 'active' | 'suspended' | 'completed';
export type RecommendationStatus = 'pending' | 'in_progress' | 'completed';

export interface Cadet {
  id: string;
  alias: string;
  sector: Sector;
  status: CadetStatus;
  totalSessions: number;
  lastSessionDate: string;
  resilienceScore: number;
  baselineScore: number;
  recoveryTime: number;
  riskLevel: RiskLevel;
  trend: 'up' | 'stable' | 'down';
  biometrics: {
    hrv: number;
    gsr: number;
    eyeTracking: number;
    reactionTime: number;
    baselineHrv: number;
    baselineGsr: number;
    baselineEyeTracking: number;
    baselineReactionTime: number;
  };
  components: {
    values: number;
    emotional: number;
    cognitive: number;
    social: number;
    physical: number;
    baselineValues: number;
    baselineEmotional: number;
    baselineCognitive: number;
    baselineSocial: number;
    baselinePhysical: number;
  };
  capabilities: {
    withstanding: number;
    recovery: number;
    adaptation: number;
  };
}

export interface SessionData {
  session: number;
  date: string;
  combatScore: number;
  commandScore: number;
  institutionalScore: number;
  avgScore: number;
}

export interface ActivityEvent {
  id: string;
  cadetId: string;
  type: 'simulation' | 'trigger' | 'milestone' | 'alert';
  message: string;
  messageHe: string;
  timestamp: string;
}

export interface Alert {
  id: string;
  level: AlertLevel;
  cadetId: string;
  message: string;
  messageHe: string;
  timestamp: string;
  status: 'new' | 'viewed' | 'in_treatment' | 'closed';
}

export interface Scenario {
  id: string;
  name: string;
  nameHe: string;
  sector: Sector;
  difficulty: number;
  avgDuration: string;
  completedBy: number;
  avgPerformance: number;
  status: 'active' | 'development' | 'disabled';
  thumbnail: string;
  description: string;
}

export interface Trigger {
  name: string;
  nameHe: string;
  frequency: number;
  avgImpact: number;
}

// ============ MOCK DATA ============

export const cadets: Cadet[] = [
  {
    id: 'C-7721',
    alias: 'Eagle-21',
    sector: 'combat',
    status: 'active',
    totalSessions: 12,
    lastSessionDate: '2026-03-04',
    resilienceScore: 74,
    baselineScore: 45,
    recoveryTime: 4.2,
    riskLevel: 'low',
    trend: 'up',
    biometrics: { hrv: 68, gsr: 51, eyeTracking: 67, reactionTime: 1.1, baselineHrv: 48, baselineGsr: 82, baselineEyeTracking: 42, baselineReactionTime: 1.8 },
    components: { values: 82, emotional: 71, cognitive: 78, social: 69, physical: 74, baselineValues: 60, baselineEmotional: 48, baselineCognitive: 55, baselineSocial: 50, baselinePhysical: 52 },
    capabilities: { withstanding: 76, recovery: 72, adaptation: 70 },
  },
  {
    id: 'C-7722',
    alias: 'Hawk-22',
    sector: 'combat',
    status: 'active',
    totalSessions: 10,
    lastSessionDate: '2026-03-03',
    resilienceScore: 68,
    baselineScore: 50,
    recoveryTime: 5.1,
    riskLevel: 'medium',
    trend: 'stable',
    biometrics: { hrv: 62, gsr: 58, eyeTracking: 61, reactionTime: 1.3, baselineHrv: 50, baselineGsr: 75, baselineEyeTracking: 45, baselineReactionTime: 1.7 },
    components: { values: 75, emotional: 63, cognitive: 72, social: 65, physical: 70, baselineValues: 58, baselineEmotional: 45, baselineCognitive: 52, baselineSocial: 48, baselinePhysical: 55 },
    capabilities: { withstanding: 70, recovery: 64, adaptation: 66 },
  },
  {
    id: 'C-7723',
    alias: 'Phoenix-23',
    sector: 'command',
    status: 'active',
    totalSessions: 14,
    lastSessionDate: '2026-03-05',
    resilienceScore: 82,
    baselineScore: 52,
    recoveryTime: 3.4,
    riskLevel: 'low',
    trend: 'up',
    biometrics: { hrv: 74, gsr: 44, eyeTracking: 73, reactionTime: 0.9, baselineHrv: 52, baselineGsr: 78, baselineEyeTracking: 48, baselineReactionTime: 1.6 },
    components: { values: 88, emotional: 80, cognitive: 85, social: 78, physical: 72, baselineValues: 62, baselineEmotional: 50, baselineCognitive: 58, baselineSocial: 52, baselinePhysical: 48 },
    capabilities: { withstanding: 84, recovery: 80, adaptation: 82 },
  },
  {
    id: 'C-7724',
    alias: 'Storm-24',
    sector: 'institutional',
    status: 'active',
    totalSessions: 6,
    lastSessionDate: '2026-03-01',
    resilienceScore: 45,
    baselineScore: 55,
    recoveryTime: 8.7,
    riskLevel: 'high',
    trend: 'down',
    biometrics: { hrv: 38, gsr: 72, eyeTracking: 44, reactionTime: 2.1, baselineHrv: 45, baselineGsr: 65, baselineEyeTracking: 50, baselineReactionTime: 1.5 },
    components: { values: 52, emotional: 38, cognitive: 48, social: 42, physical: 45, baselineValues: 58, baselineEmotional: 52, baselineCognitive: 55, baselineSocial: 50, baselinePhysical: 52 },
    capabilities: { withstanding: 42, recovery: 38, adaptation: 44 },
  },
  {
    id: 'C-7725',
    alias: 'Wolf-25',
    sector: 'combat',
    status: 'active',
    totalSessions: 9,
    lastSessionDate: '2026-03-04',
    resilienceScore: 61,
    baselineScore: 42,
    recoveryTime: 5.8,
    riskLevel: 'medium',
    trend: 'up',
    biometrics: { hrv: 58, gsr: 62, eyeTracking: 55, reactionTime: 1.4, baselineHrv: 42, baselineGsr: 80, baselineEyeTracking: 38, baselineReactionTime: 2.0 },
    components: { values: 68, emotional: 56, cognitive: 64, social: 58, physical: 62, baselineValues: 50, baselineEmotional: 38, baselineCognitive: 42, baselineSocial: 40, baselinePhysical: 44 },
    capabilities: { withstanding: 63, recovery: 58, adaptation: 60 },
  },
  {
    id: 'C-7726',
    alias: 'Falcon-26',
    sector: 'command',
    status: 'active',
    totalSessions: 11,
    lastSessionDate: '2026-03-05',
    resilienceScore: 77,
    baselineScore: 48,
    recoveryTime: 3.9,
    riskLevel: 'low',
    trend: 'up',
    biometrics: { hrv: 70, gsr: 48, eyeTracking: 70, reactionTime: 1.0, baselineHrv: 48, baselineGsr: 76, baselineEyeTracking: 44, baselineReactionTime: 1.7 },
    components: { values: 84, emotional: 75, cognitive: 80, social: 72, physical: 68, baselineValues: 55, baselineEmotional: 44, baselineCognitive: 50, baselineSocial: 46, baselinePhysical: 42 },
    capabilities: { withstanding: 78, recovery: 76, adaptation: 74 },
  },
  {
    id: 'C-7727',
    alias: 'Thunder-27',
    sector: 'combat',
    status: 'active',
    totalSessions: 5,
    lastSessionDate: '2026-02-28',
    resilienceScore: 33,
    baselineScore: 40,
    recoveryTime: 10.2,
    riskLevel: 'high',
    trend: 'down',
    biometrics: { hrv: 32, gsr: 78, eyeTracking: 38, reactionTime: 2.4, baselineHrv: 40, baselineGsr: 70, baselineEyeTracking: 42, baselineReactionTime: 1.9 },
    components: { values: 40, emotional: 28, cognitive: 35, social: 32, physical: 38, baselineValues: 45, baselineEmotional: 40, baselineCognitive: 42, baselineSocial: 38, baselinePhysical: 44 },
    capabilities: { withstanding: 30, recovery: 28, adaptation: 35 },
  },
  {
    id: 'C-7728',
    alias: 'Viper-28',
    sector: 'institutional',
    status: 'active',
    totalSessions: 8,
    lastSessionDate: '2026-03-03',
    resilienceScore: 71,
    baselineScore: 46,
    recoveryTime: 4.6,
    riskLevel: 'low',
    trend: 'up',
    biometrics: { hrv: 65, gsr: 54, eyeTracking: 63, reactionTime: 1.2, baselineHrv: 46, baselineGsr: 74, baselineEyeTracking: 40, baselineReactionTime: 1.8 },
    components: { values: 78, emotional: 68, cognitive: 74, social: 66, physical: 64, baselineValues: 52, baselineEmotional: 42, baselineCognitive: 48, baselineSocial: 44, baselinePhysical: 40 },
    capabilities: { withstanding: 72, recovery: 68, adaptation: 70 },
  },
];

export const sessionTrendData: SessionData[] = [
  { session: 1, date: '2026-01-05', combatScore: 42, commandScore: 48, institutionalScore: 44, avgScore: 45 },
  { session: 2, date: '2026-01-12', combatScore: 45, commandScore: 50, institutionalScore: 46, avgScore: 47 },
  { session: 3, date: '2026-01-19', combatScore: 48, commandScore: 54, institutionalScore: 49, avgScore: 50 },
  { session: 4, date: '2026-01-26', combatScore: 52, commandScore: 58, institutionalScore: 51, avgScore: 54 },
  { session: 5, date: '2026-02-02', combatScore: 55, commandScore: 60, institutionalScore: 54, avgScore: 56 },
  { session: 6, date: '2026-02-09', combatScore: 57, commandScore: 63, institutionalScore: 56, avgScore: 59 },
  { session: 7, date: '2026-02-16', combatScore: 60, commandScore: 66, institutionalScore: 58, avgScore: 61 },
  { session: 8, date: '2026-02-23', combatScore: 62, commandScore: 68, institutionalScore: 60, avgScore: 63 },
  { session: 9, date: '2026-03-01', combatScore: 64, commandScore: 71, institutionalScore: 63, avgScore: 66 },
  { session: 10, date: '2026-03-06', combatScore: 67, commandScore: 74, institutionalScore: 65, avgScore: 69 },
];

export const cadetSessionHistory = [
  { session: 1, hrv: 48, gsr: 82, eyeTracking: 42, reactionTime: 1.8, resilience: 45, recoveryTime: 9.2, functional: 42 },
  { session: 2, hrv: 50, gsr: 78, eyeTracking: 44, reactionTime: 1.7, resilience: 48, recoveryTime: 8.5, functional: 45 },
  { session: 3, hrv: 52, gsr: 74, eyeTracking: 47, reactionTime: 1.6, resilience: 51, recoveryTime: 7.8, functional: 49 },
  { session: 4, hrv: 55, gsr: 70, eyeTracking: 50, reactionTime: 1.5, resilience: 55, recoveryTime: 7.1, functional: 53 },
  { session: 5, hrv: 57, gsr: 68, eyeTracking: 52, reactionTime: 1.4, resilience: 58, recoveryTime: 6.5, functional: 56 },
  { session: 6, hrv: 59, gsr: 65, eyeTracking: 55, reactionTime: 1.3, resilience: 60, recoveryTime: 6.0, functional: 59 },
  { session: 7, hrv: 61, gsr: 62, eyeTracking: 57, reactionTime: 1.3, resilience: 63, recoveryTime: 5.6, functional: 62 },
  { session: 8, hrv: 63, gsr: 58, eyeTracking: 60, reactionTime: 1.2, resilience: 66, recoveryTime: 5.2, functional: 65 },
  { session: 9, hrv: 64, gsr: 56, eyeTracking: 62, reactionTime: 1.2, resilience: 68, recoveryTime: 4.9, functional: 67 },
  { session: 10, hrv: 66, gsr: 54, eyeTracking: 64, reactionTime: 1.1, resilience: 71, recoveryTime: 4.5, functional: 70 },
  { session: 11, hrv: 67, gsr: 52, eyeTracking: 65, reactionTime: 1.1, resilience: 73, recoveryTime: 4.3, functional: 72 },
  { session: 12, hrv: 68, gsr: 51, eyeTracking: 67, reactionTime: 1.1, resilience: 74, recoveryTime: 4.2, functional: 74 },
];

export const activityFeed: ActivityEvent[] = [
  { id: 'a1', cadetId: 'C-7721', type: 'simulation', message: 'Cadet C-7721 completed urban engagement simulation - Score: 74', messageHe: 'צוער C-7721 השלים סימולציית היתקלות עירונית - ציון: 74', timestamp: '2026-03-06 14:32' },
  { id: 'a2', cadetId: 'C-7724', type: 'trigger', message: 'Trigger identified for C-7724: information overload -> freezing', messageHe: 'טריגר זוהה עבור C-7724: עומס מידע -> קפיאה', timestamp: '2026-03-06 13:45' },
  { id: 'a3', cadetId: 'C-7723', type: 'milestone', message: 'C-7723 reached resilience milestone: score 80+', messageHe: 'C-7723 הגיע לאבן דרך חוסן: ציון 80+', timestamp: '2026-03-06 12:10' },
  { id: 'a4', cadetId: 'C-7726', type: 'simulation', message: 'Cadet C-7726 completed command center scenario - Score: 77', messageHe: 'צוער C-7726 השלים תרחיש חמ"ל - ציון: 77', timestamp: '2026-03-06 11:28' },
  { id: 'a5', cadetId: 'C-7727', type: 'alert', message: 'C-7727 resilience score dropped below 35 - intervention required', messageHe: 'ציון חוסן C-7727 ירד מתחת ל-35 - נדרשת התערבות', timestamp: '2026-03-06 10:55' },
  { id: 'a6', cadetId: 'C-7722', type: 'simulation', message: 'Cadet C-7722 completed night navigation - Score: 68', messageHe: 'צוער C-7722 השלים ניווט לילי - ציון: 68', timestamp: '2026-03-05 16:42' },
  { id: 'a7', cadetId: 'C-7725', type: 'milestone', message: 'C-7725 recovery time improved by 22%', messageHe: 'זמן התאוששות C-7725 השתפר ב-22%', timestamp: '2026-03-05 15:20' },
  { id: 'a8', cadetId: 'C-7728', type: 'simulation', message: 'Cadet C-7728 completed logistics under pressure - Score: 71', messageHe: 'צוער C-7728 השלים לוגיסטיקה תחת לחץ - ציון: 71', timestamp: '2026-03-05 14:05' },
];

export const alerts: Alert[] = [
  { id: 'al1', level: 'critical', cadetId: 'C-7727', message: 'Resilience score dropped below 35', messageHe: 'ציון חוסן ירד מתחת ל-35', timestamp: '2026-03-06 10:55', status: 'new' },
  { id: 'al2', level: 'critical', cadetId: 'C-7724', message: '25% resilience decline over 3 consecutive sessions', messageHe: 'ירידה של 25% בחוסן ב-3 מפגשים רצופים', timestamp: '2026-03-06 09:30', status: 'new' },
  { id: 'al3', level: 'warning', cadetId: 'C-7722', message: '3 sessions without improvement', messageHe: '3 מפגשים ללא שיפור', timestamp: '2026-03-05 16:00', status: 'viewed' },
  { id: 'al4', level: 'info', cadetId: 'C-7723', message: 'Reached resilience milestone: score 80+', messageHe: 'הגיע לאבן דרך חוסן: ציון 80+', timestamp: '2026-03-06 12:10', status: 'viewed' },
  { id: 'al5', level: 'system', cadetId: '', message: 'GSR sensor - connection failure at station 3', messageHe: 'חיישן GSR - כשל חיבור בעמדה 3', timestamp: '2026-03-06 08:15', status: 'in_treatment' },
];

export const scenarios: Scenario[] = [
  { id: 's1', name: 'Urban Engagement', nameHe: 'היתקלות בשטח בנוי', sector: 'combat', difficulty: 4, avgDuration: '18 min', completedBy: 42, avgPerformance: 68, status: 'active', thumbnail: '', description: 'High-intensity urban combat scenario with multiple engagement points and civilian considerations.' },
  { id: 's2', name: 'Command Center Crisis', nameHe: 'משבר חמ"ל', sector: 'command', difficulty: 3, avgDuration: '25 min', completedBy: 35, avgPerformance: 72, status: 'active', thumbnail: '', description: 'Multi-channel crisis management in a high-pressure command environment.' },
  { id: 's3', name: 'Night Navigation', nameHe: 'ניווט לילי', sector: 'combat', difficulty: 5, avgDuration: '22 min', completedBy: 28, avgPerformance: 59, status: 'active', thumbnail: '', description: 'Navigation under darkness with limited visibility and environmental threats.' },
  { id: 's4', name: 'Casualty Evacuation', nameHe: 'פינוי נפגעים', sector: 'combat', difficulty: 4, avgDuration: '15 min', completedBy: 38, avgPerformance: 71, status: 'active', thumbnail: '', description: 'Rapid evacuation scenario requiring medical triage under fire.' },
  { id: 's5', name: 'Logistics Under Pressure', nameHe: 'לוגיסטיקה תחת לחץ', sector: 'institutional', difficulty: 3, avgDuration: '20 min', completedBy: 30, avgPerformance: 74, status: 'active', thumbnail: '', description: 'Complex supply chain management under time pressure and resource constraints.' },
  { id: 's6', name: 'Escalation Management', nameHe: 'ניהול הסלמה', sector: 'command', difficulty: 5, avgDuration: '30 min', completedBy: 22, avgPerformance: 62, status: 'active', thumbnail: '', description: 'Progressive escalation scenario requiring adaptive decision-making.' },
  { id: 's7', name: 'Information Overload', nameHe: 'עומס מידע', sector: 'institutional', difficulty: 4, avgDuration: '20 min', completedBy: 25, avgPerformance: 66, status: 'development', thumbnail: '', description: 'Multi-channel information processing under cognitive load.' },
  { id: 's8', name: 'Ambush Response', nameHe: 'תגובה למארב', sector: 'combat', difficulty: 5, avgDuration: '12 min', completedBy: 18, avgPerformance: 55, status: 'active', thumbnail: '', description: 'Immediate response to surprise contact requiring rapid decision-making.' },
];

export const triggers: Trigger[] = [
  { name: 'Comms Noise', nameHe: 'רעש קשר', frequency: 42, avgImpact: 72 },
  { name: 'Information Overload', nameHe: 'עומס מידע', frequency: 38, avgImpact: 68 },
  { name: 'Darkness', nameHe: 'חשיכה', frequency: 31, avgImpact: 58 },
  { name: 'Surprise Contact', nameHe: 'הפתעה', frequency: 28, avgImpact: 82 },
  { name: 'Time Pressure', nameHe: 'לחץ זמנים', frequency: 35, avgImpact: 64 },
  { name: 'Teammate Injury', nameHe: 'פציעת חבר', frequency: 22, avgImpact: 78 },
  { name: 'Equipment Failure', nameHe: 'כשל ציוד', frequency: 18, avgImpact: 55 },
];

export const scenarioBreakdown = [
  { name: 'Urban Terrain', nameHe: 'שטח בנוי', difficulty: 85, performance: 72, sessions: 8, trend: 'up' as const },
  { name: 'Command Center', nameHe: 'חמ"ל', difficulty: 70, performance: 78, sessions: 6, trend: 'stable' as const },
  { name: 'Night Navigation', nameHe: 'ניווט לילי', difficulty: 92, performance: 58, sessions: 4, trend: 'up' as const },
  { name: 'Casualty Evacuation', nameHe: 'פינוי נפגעים', difficulty: 75, performance: 81, sessions: 7, trend: 'up' as const },
  { name: 'Escalation', nameHe: 'הסלמה', difficulty: 88, performance: 65, sessions: 5, trend: 'up' as const },
];

export const reactionByType = [
  { type: 'Tactical', typeHe: 'טקטי', avgTime: 0.9, accuracy: 82, improvement: 28 },
  { type: 'Strategic', typeHe: 'אסטרטגי', avgTime: 1.4, accuracy: 71, improvement: 19 },
  { type: 'Medical', typeHe: 'רפואי', avgTime: 1.1, accuracy: 76, improvement: 24 },
];

export const heatmapData = cadets.slice(0, 6).map(c => ({
  cadetId: c.id,
  sessions: Array.from({ length: 12 }, (_, i) => ({
    session: i + 1,
    score: Math.min(100, Math.max(20, c.baselineScore + (i * (c.resilienceScore - c.baselineScore) / 12) + (Math.random() * 10 - 5))),
  })),
}));

export const sectorLabels: Record<Sector, string> = {
  combat: 'קרבי',
  command: 'מטכ"לי',
  institutional: 'מוסדי',
};

export const riskLabels: Record<RiskLevel, string> = {
  low: 'נמוך',
  medium: 'בינוני',
  high: 'גבוה',
};

export const componentLabels = [
  { key: 'values', he: 'ערכי', en: 'Values' },
  { key: 'emotional', he: 'נפשי-רגשי', en: 'Emotional' },
  { key: 'cognitive', he: 'קוגניטיבי', en: 'Cognitive' },
  { key: 'social', he: 'חברתי', en: 'Social' },
  { key: 'physical', he: 'פיזי', en: 'Physical' },
];

export const capabilityLabels = [
  { key: 'withstanding', he: 'עמידה', en: 'Withstanding' },
  { key: 'recovery', he: 'התאוששות', en: 'Recovery' },
  { key: 'adaptation', he: 'הסתגלות', en: 'Adaptation' },
];

export const insightsData = [
  { id: 'i1', text: 'Cadet exhibits consistent HRV decline when simulation duration exceeds 8 minutes', textHe: 'הצוער מציג ירידה עקבית ב-HRV כאשר משך הסימולציה עולה על 8 דקות', type: 'pattern' as const },
  { id: 'i2', text: '34% improvement in recovery time observed after protocol change in session 5', textHe: 'שיפור של 34% בזמן התאוששות נצפה לאחר שינוי פרוטוקול במפגש 5', type: 'improvement' as const },
  { id: 'i3', text: 'Primary trigger: strong comms noise -> loss of physical accuracy (GSR spike of 62%)', textHe: 'טריגר ראשי: רעש קשר חזק -> ירידה בדיוק פיזי (עלייה של 62% ב-GSR)', type: 'trigger' as const },
];

export const recommendationsData = [
  { id: 'r1', text: 'Gradually increase exposure to comms noise scenarios', textHe: 'להגדיל בהדרגה חשיפה לתרחישי רעש קשר', status: 'in_progress' as RecommendationStatus },
  { id: 'r2', text: 'Practice structured breathing technique before simulation entry', textHe: 'לתרגל טכניקת נשימה מובנית לפני כניסה לסימולציה', status: 'pending' as RecommendationStatus },
  { id: 'r3', text: 'Focus next 3 sessions on adaptation scenarios with mid-mission changes', textHe: 'למקד 3 מפגשים הבאים בתרחישי הסתגלות עם שינויים באמצע משימה', status: 'pending' as RecommendationStatus },
];

export const commanderNotes = [
  { id: 'n1', text: 'Showed exceptional composure during escalation phase. Continue monitoring recovery metrics.', textHe: 'הראה שלווה יוצאת דופן בשלב ההסלמה. להמשיך לנטר מדדי התאוששות.', tag: 'mental' as const, author: 'Cpt. Levi', timestamp: '2026-03-04 15:30' },
  { id: 'n2', text: 'Recommended meeting with mental health officer regarding HRV patterns under extended stress.', textHe: 'מומלצת פגישה עם קצין מנטלי בנוגע לדפוסי HRV תחת לחץ מתמשך.', tag: 'physical' as const, author: 'Lt. Cohen', timestamp: '2026-03-02 11:15' },
  { id: 'n3', text: 'Tactical decision-making improved significantly since session 8.', textHe: 'קבלת החלטות טקטית השתפרה משמעותית ממפגש 8.', tag: 'tactical' as const, author: 'Cpt. Levi', timestamp: '2026-02-28 09:45' },
];

export const timelineEvents = [
  { id: 't1', type: 'baseline' as const, label: 'Baseline Measurement', labelHe: 'מדידת בסיס', detail: 'HRV: 48, GSR: 82, Reaction: 1.8s', session: 1 },
  { id: 't2', type: 'trigger' as const, label: 'Trigger Identified', labelHe: 'טריגר זוהה', detail: 'Strong comms noise -> loss of physical accuracy', session: 3 },
  { id: 't3', type: 'protocol' as const, label: 'Protocol Adaptation', labelHe: 'התאמת פרוטוקול', detail: 'Switched to accelerated recovery protocol', session: 5 },
  { id: 't4', type: 'improvement' as const, label: 'Significant Improvement', labelHe: 'שיפור משמעותי', detail: 'Recovery time decreased by 34%', session: 8 },
  { id: 't5', type: 'breakthrough' as const, label: 'Breakthrough', labelHe: 'פריצת דרך', detail: 'Stable performance at 85% load', session: 10 },
  { id: 't6', type: 'current' as const, label: 'Current State', labelHe: 'מצב נוכחי', detail: 'HRV: 68, GSR: 51, Reaction: 1.1s', session: 12 },
];

export const thresholdSettings = [
  { metric: 'HRV Drop', metricHe: 'ירידת HRV', unit: 'ms', warningValue: 35, criticalValue: 25, action: 'Alert commander', actionHe: 'התראה למפקד' },
  { metric: 'GSR Spike', metricHe: 'עליית GSR', unit: 'uS', warningValue: 70, criticalValue: 85, action: 'Auto-stop simulation (optional)', actionHe: 'עצירה אוטומטית (אופציונלי)' },
  { metric: 'Tunnel Vision', metricHe: 'מיקוד מנהרה', unit: '%', warningValue: 40, criticalValue: 60, action: 'Alert + recommendation', actionHe: 'התראה + המלצה' },
  { metric: 'Reaction Time', metricHe: 'זמן תגובה', unit: 's', warningValue: 2.5, criticalValue: 4.0, action: 'Alert', actionHe: 'התראה' },
  { metric: 'Resilience Drop', metricHe: 'ירידת חוסן', unit: '%', warningValue: 15, criticalValue: 30, action: 'Alert + intervention', actionHe: 'התראה + התערבות' },
];

export const sensorStatus = [
  { name: 'HRV Sensor', nameHe: 'חיישן HRV', status: 'connected' as const, lastCalibration: '2026-03-05', accuracy: 98 },
  { name: 'GSR Sensor', nameHe: 'חיישן GSR', status: 'connected' as const, lastCalibration: '2026-03-05', accuracy: 96 },
  { name: 'Eye Tracker', nameHe: 'מעקב עיניים', status: 'connected' as const, lastCalibration: '2026-03-04', accuracy: 94 },
  { name: 'Station 3 GSR', nameHe: 'GSR עמדה 3', status: 'malfunction' as const, lastCalibration: '2026-03-01', accuracy: 0 },
];

export const roles = [
  { role: 'Instructor', roleHe: 'מדריך', dashboard: 'view', cadetProfile: 'own_unit', simulations: 'launch', analytics: 'basic', settings: 'none' },
  { role: 'Platoon Cmdr', roleHe: 'מפקד פלוגה', dashboard: 'view', cadetProfile: 'view', simulations: 'launch_edit', analytics: 'full', settings: 'partial' },
  { role: 'Battalion Cmdr', roleHe: 'מפקד גדוד', dashboard: 'view', cadetProfile: 'all', simulations: 'launch_edit', analytics: 'full', settings: 'partial' },
  { role: 'Mental Health Officer', roleHe: 'קצין מנטלי', dashboard: 'view', cadetProfile: 'edit', simulations: 'full', analytics: 'full', settings: 'full' },
  { role: 'System Admin', roleHe: 'מנהל מערכת', dashboard: 'full', cadetProfile: 'full', simulations: 'full', analytics: 'full', settings: 'full' },
];
