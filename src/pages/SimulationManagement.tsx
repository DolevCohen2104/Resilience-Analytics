import React, { useState } from 'react';
import {
  RiPlayCircleLine, RiFilter3Line, RiStarFill, RiStarLine,
  RiSettings4Line, RiEyeLine, RiPulseLine, RiGamepadLine,
  RiGitBranchLine, RiSignalTowerLine, RiAddLine,
  RiCheckLine, RiArrowLeftSLine, RiArrowRightSLine,
  RiSwordLine, RiShieldLine, RiMentalHealthLine,
  RiTeamLine, RiHeartPulseLine, RiBrainLine, RiBodyScanLine,
  RiCompassLine, RiAlarmWarningLine, RiTimeLine,
  RiVolumeUpLine, RiCloudLine, RiEyeOffLine, RiQuestionLine,
  RiEmotionUnhappyLine, RiInformationLine, RiThunderstormsLine,
  RiEditLine, RiDeleteBinLine, RiDraftLine, RiCheckboxCircleLine,
  RiErrorWarningLine, RiUser3Line, RiBookOpenLine
} from 'react-icons/ri';
import { scenarios, sectorLabels } from '../data/mockData';
import InfoTip from '../components/InfoTip';
import type { Sector } from '../data/mockData';

// ============ TYPES ============

type AudienceType = 'combatant' | 'combat_support' | 'rear';
type DistractorCategory = 'physical' | 'cognitive' | 'emotional';

interface Distractor {
  id: string;
  label: string;
  category: DistractorCategory;
  icon: React.ElementType;
  selected: boolean;
}

interface TriggerPoint {
  id: string;
  condition: string;
  action: string;
  enabled: boolean;
}

// ============ CONSTANTS ============

const audienceOptions: { id: AudienceType; label: string; desc: string; icon: React.ElementType; color: string; examples: string }[] = [
  { id: 'combatant', label: 'לוחם', desc: 'פועל במרחב הלחימה, חיכוך ישיר, סכנת חיים מתמדת', icon: RiSwordLine, color: '#FF4D6A', examples: 'היתקלות פתאומית, חילוץ פצועים תחת אש' },
  { id: 'combat_support', label: 'תומך לחימה במרחב', desc: 'לוגיסטיקה, רפואה, חימוש - בתוך שטח האויב, סכנת פגיעה ישירה', icon: RiShieldLine, color: '#FFB547', examples: 'שיירה לוגיסטית שמותקפת, טיפול תחת אש' },
  { id: 'rear', label: 'חייל עורפי / מוסדי', desc: 'מחוץ למרחב הלחימה, איום עקיף (טילים) או עומס נפשי', icon: RiMentalHealthLine, color: '#38BDF8', examples: 'עומס קיצוני בחמ"ל, חשיפה למראות קשים, מתח משפחתי' },
];

const defaultDistractors: Distractor[] = [
  { id: 'd1', label: 'תנאי מזג אוויר חריגים (חום/קור/גשם/אבק)', category: 'physical', icon: RiCloudLine, selected: false },
  { id: 'd2', label: 'שהות ממושכת במתחם סגור (טנק/בונקר)', category: 'physical', icon: RiBodyScanLine, selected: false },
  { id: 'd3', label: 'רעשי פיצוצים ויריות', category: 'physical', icon: RiVolumeUpLine, selected: false },
  { id: 'd4', label: 'עומס מידע מרובה ערוצים', category: 'cognitive', icon: RiInformationLine, selected: false },
  { id: 'd5', label: 'פקודות סותרות בקשר', category: 'cognitive', icon: RiAlarmWarningLine, selected: false },
  { id: 'd6', label: 'חוסר מידע זמין בעת אירוע', category: 'cognitive', icon: RiQuestionLine, selected: false },
  { id: 'd7', label: 'הפתעה פתאומית (שינוי תרחיש)', category: 'emotional', icon: RiThunderstormsLine, selected: false },
  { id: 'd8', label: 'פגיעה בחבר לצוות (סימולציה)', category: 'emotional', icon: RiEmotionUnhappyLine, selected: false },
  { id: 'd9', label: 'כישלון משימה תוך כדי ביצוע', category: 'emotional', icon: RiEyeOffLine, selected: false },
];

const defaultTriggerPoints: TriggerPoint[] = [
  { id: 'tp1', condition: 'ביופידבק מזהה דחק חריג (קטיעת רצף התפקוד)', action: 'הקפאת תמונה + הנחיה לנשימות והרגעה', enabled: true },
  { id: 'tp2', condition: 'ביופידבק מזהה דחק חריג (קטיעת רצף התפקוד)', action: 'הקשחת תרחיש לבחינת גבולות קיצון', enabled: false },
  { id: 'tp3', condition: 'ירידת ביצועים מתמשכת (> 30 שניות)', action: 'השמעת קול מפקד בקשר (עוגן חברתי-פיקודי)', enabled: true },
  { id: 'tp4', condition: 'HRV < 30ms למשך 15 שניות', action: 'הנמכת עומס אוטומטית + התראה למדריך', enabled: true },
];

const capabilityOptions = [
  { key: 'withstanding', label: 'כושר העמידה', desc: 'האם החייל השלים את המשימה למרות כל המסיחים? קטיעת רצף?', icon: RiShieldLine, color: '#38BDF8' },
  { key: 'recovery', label: 'כושר התאוששות', desc: 'כמה זמן מדד הביופידבק חזר לנורמה? כמה מהר חזר לתפקד?', icon: RiTimeLine, color: '#00E5A0' },
  { key: 'adaptation', label: 'הסתגלות', desc: 'שתילת "הפתעה" - המהירות שבה החייל התאים עצמו למשימה החדשה', icon: RiBrainLine, color: '#A78BFA' },
];

const componentOptions = [
  { key: 'cognitive', label: 'קוגניטיבי', desc: 'זיהוי איומים, החלטות מהירות, מיקוד תחת לחץ זמן', icon: RiBrainLine, color: '#A78BFA' },
  { key: 'emotional', label: 'נפשי-רגשי', desc: 'HRV, GSR, נשימה - זיהוי סטרס קטלני או ויסות רגשי-גופני מוצלח', icon: RiHeartPulseLine, color: '#FF4D6A' },
  { key: 'physical', label: 'פיזי', desc: 'עייפות מדומה, טשטוש ראייה, תפקוד במצב חסך', icon: RiBodyScanLine, color: '#FFB547' },
  { key: 'values', label: 'ערכי', desc: 'דילמות מוסריות - טוהר הנשק, חתירה למגע, בחירה בין מטרות', icon: RiCompassLine, color: '#38BDF8' },
  { key: 'social', label: 'חברתי', desc: 'תקשורת עם צוות וירטואלי, דיווח אמין, תיאום פעולה', icon: RiTeamLine, color: '#00E5A0' },
];

// ============ COMPONENT ============

const SimulationManagement: React.FC = () => {
  const [activeSection, setActiveSection] = useState<'scenarios' | 'create' | 'tree' | 'live'>('scenarios');
  const [filterSector, setFilterSector] = useState<Sector | 'all'>('all');
  const [filterDifficulty, setFilterDifficulty] = useState<number | null>(null);
  const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'development' | 'disabled'>('all');
  const [showSuccess, setShowSuccess] = useState(false);
  const [createdScenarios, setCreatedScenarios] = useState<typeof scenarios>([]);

  // Create form state
  const [formStep, setFormStep] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    nameHe: '',
    description: '',
    sector: '' as Sector | '',
    audience: '' as AudienceType | '',
    difficulty: 3,
    duration: 18,
    distractors: [...defaultDistractors],
    capabilities: { withstanding: true, recovery: true, adaptation: false } as Record<string, boolean>,
    components: { cognitive: true, emotional: true, physical: false, values: false, social: false } as Record<string, boolean>,
    triggerPoints: [...defaultTriggerPoints],
    debriefSettings: {
      showStressVsPerformance: true,
      showSelfEfficacy: true,
      showBiometricTimeline: true,
      showComponentBreakdown: true,
    },
  });

  const formSteps = [
    { label: 'קהל יעד וסיווג', desc: 'הגדרת זרוע, קהל יעד ורמת קושי' },
    { label: 'אתגרים ומסיחים', desc: 'בחירת מסיחים פיזיים, קוגניטיביים ורגשיים' },
    { label: 'מטרות מדידה', desc: 'כושרי חוסן ורכיבי חוסן נבחנים' },
    { label: 'נקודות התערבות', desc: 'אירועים תלויי-תגובה ועוגנים' },
    { label: 'סיכום ותחקיר', desc: 'הגדרת פלט הנתונים והתחקיר' },
  ];

  const allScenarios = [...scenarios, ...createdScenarios];

  const filteredScenarios = allScenarios.filter(s => {
    if (filterSector !== 'all' && s.sector !== filterSector) return false;
    if (filterDifficulty && s.difficulty !== filterDifficulty) return false;
    if (filterStatus !== 'all' && s.status !== filterStatus) return false;
    return true;
  });

  const resetForm = () => {
    setFormStep(0);
    setFormData({
      name: '',
      nameHe: '',
      description: '',
      sector: '',
      audience: '',
      difficulty: 3,
      duration: 18,
      distractors: defaultDistractors.map(d => ({ ...d, selected: false })),
      capabilities: { withstanding: true, recovery: true, adaptation: false },
      components: { cognitive: true, emotional: true, physical: false, values: false, social: false },
      triggerPoints: defaultTriggerPoints.map(tp => ({ ...tp })),
      debriefSettings: {
        showStressVsPerformance: true,
        showSelfEfficacy: true,
        showBiometricTimeline: true,
        showComponentBreakdown: true,
      },
    });
  };

  const handleCreateScenario = () => {
    const newScenario = {
      id: `s-new-${Date.now()}`,
      name: formData.name || 'New Scenario',
      nameHe: formData.nameHe || 'תרחיש חדש',
      sector: (formData.sector || 'combat') as Sector,
      difficulty: formData.difficulty,
      avgDuration: `${formData.duration} min`,
      completedBy: 0,
      avgPerformance: 0,
      status: 'development' as const,
      thumbnail: '',
      description: formData.description || '',
    };
    setCreatedScenarios(prev => [...prev, newScenario]);
    setShowSuccess(true);
    resetForm();
    setTimeout(() => {
      setShowSuccess(false);
      setActiveSection('scenarios');
    }, 2500);
  };

  const Stars = ({ count, interactive, onChange }: { count: number; interactive?: boolean; onChange?: (n: number) => void }) => (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map(i => (
        i <= count
          ? <RiStarFill key={i} className={`text-idf-orange text-sm ${interactive ? 'cursor-pointer' : ''}`} onClick={() => onChange?.(i)} />
          : <RiStarLine key={i} className={`text-sm ${interactive ? 'cursor-pointer' : ''}`} style={{ color: 'var(--border)' }} onClick={() => onChange?.(i)} />
      ))}
    </div>
  );

  const sectionTabs = [
    { id: 'scenarios', label: 'ספריית תרחישים', icon: RiGamepadLine },
    { id: 'create', label: 'יצירת תרחיש חדש', icon: RiAddLine },
    { id: 'tree', label: 'עורך עץ החלטות', icon: RiGitBranchLine },
    { id: 'live', label: 'ניטור חי', icon: RiSignalTowerLine },
  ];

  const statusLabels: Record<string, { label: string; color: string; bg: string }> = {
    active: { label: 'פעיל', color: 'text-idf-green', bg: 'bg-idf-green/[0.13]' },
    development: { label: 'בפיתוח', color: 'text-idf-orange', bg: 'bg-idf-orange/[0.13]' },
    disabled: { label: 'מושבת', color: 'text-idf-red', bg: 'bg-idf-red/[0.13]' },
  };

  const toggleDistractor = (id: string) => {
    setFormData(prev => ({
      ...prev,
      distractors: prev.distractors.map(d => d.id === id ? { ...d, selected: !d.selected } : d),
    }));
  };

  const toggleTriggerPoint = (id: string) => {
    setFormData(prev => ({
      ...prev,
      triggerPoints: prev.triggerPoints.map(tp => tp.id === id ? { ...tp, enabled: !tp.enabled } : tp),
    }));
  };

  const categoryLabels: Record<DistractorCategory, { label: string; color: string }> = {
    physical: { label: 'פיזי', color: '#FFB547' },
    cognitive: { label: 'קוגניטיבי', color: '#A78BFA' },
    emotional: { label: 'נפשי-רגשי', color: '#FF4D6A' },
  };

  const selectedDistractorCount = formData.distractors.filter(d => d.selected).length;
  const selectedCapCount = Object.values(formData.capabilities).filter(Boolean).length;
  const selectedCompCount = Object.values(formData.components).filter(Boolean).length;

  // ============ RENDER ============

  return (
    <div>
      {/* Success Toast */}
      {showSuccess && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 px-6 py-4 rounded-xl bg-idf-green text-white shadow-2xl shadow-idf-green/30 animate-pulse">
          <RiCheckboxCircleLine className="text-xl" />
          <span className="text-base font-medium">התרחיש נוצר בהצלחה ונוסף לספרייה!</span>
        </div>
      )}

      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-4 md:mb-6">
        <h1 className="text-xl md:text-3xl font-bold">ניהול סימולציות</h1>
        <button
          onClick={() => setActiveSection('create')}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-base font-medium bg-idf-blue text-white hover:bg-idf-blue/90 transition-colors shadow-lg shadow-idf-blue/20"
        >
          <RiAddLine className="text-lg" /> יצירת תרחיש חדש
        </button>
      </div>

      {/* Section Tabs */}
      <div className="flex gap-2 mb-4 md:mb-6 overflow-x-auto">
        {sectionTabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveSection(tab.id as any)}
            className={`flex items-center gap-2 px-3 md:px-4 py-2 md:py-2.5 rounded-xl text-sm md:text-base font-medium transition-all whitespace-nowrap ${
              activeSection === tab.id
                ? 'bg-idf-blue/10 text-idf-blue border border-idf-blue/20'
                : 'border'
            }`}
            style={activeSection !== tab.id ? { backgroundColor: 'var(--surface)', borderColor: 'var(--border)', color: 'var(--text-secondary)' } : undefined}
          >
            <tab.icon /> {tab.label}
          </button>
        ))}
      </div>

      {/* ===== SCENARIOS LIBRARY ===== */}
      {activeSection === 'scenarios' && (
        <>
          {/* Filters */}
          <div className="flex items-center gap-3 mb-6 flex-wrap">
            <RiFilter3Line style={{ color: 'var(--text-dim)' }} />
            <div className="flex gap-2">
              {(['all', 'combat', 'command', 'institutional'] as const).map(s => (
                <button
                  key={s}
                  onClick={() => setFilterSector(s)}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                    filterSector === s ? 'bg-idf-blue/10 text-idf-blue' : ''
                  }`}
                  style={filterSector !== s ? { backgroundColor: 'var(--surface)', color: 'var(--text-dim)' } : undefined}
                >
                  {s === 'all' ? 'הכל' : sectorLabels[s]}
                </button>
              ))}
            </div>
            <div className="h-4 w-px" style={{ backgroundColor: 'var(--border)' }} />
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map(d => (
                <button
                  key={d}
                  onClick={() => setFilterDifficulty(filterDifficulty === d ? null : d)}
                  className={`w-7 h-7 rounded-lg text-sm font-mono font-bold transition-colors ${
                    filterDifficulty === d ? 'bg-idf-orange/10 text-idf-orange' : ''
                  }`}
                  style={filterDifficulty !== d ? { backgroundColor: 'var(--surface)', color: 'var(--text-dim)' } : undefined}
                >
                  {d}
                </button>
              ))}
            </div>
            <div className="h-4 w-px" style={{ backgroundColor: 'var(--border)' }} />
            <div className="flex gap-2">
              {(['all', 'active', 'development', 'disabled'] as const).map(st => (
                <button
                  key={st}
                  onClick={() => setFilterStatus(st)}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                    filterStatus === st ? 'bg-idf-blue/10 text-idf-blue' : ''
                  }`}
                  style={filterStatus !== st ? { backgroundColor: 'var(--surface)', color: 'var(--text-dim)' } : undefined}
                >
                  {st === 'all' ? 'כל הסטטוסים' : statusLabels[st].label}
                </button>
              ))}
            </div>
          </div>

          {/* Stats Summary */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-4 md:mb-6">
            {[
              { label: 'סה"כ תרחישים', value: scenarios.length, color: '#38BDF8' },
              { label: 'פעילים', value: scenarios.filter(s => s.status === 'active').length, color: '#00E5A0' },
              { label: 'בפיתוח', value: scenarios.filter(s => s.status === 'development').length, color: '#FFB547' },
              { label: 'ממוצע ביצועים', value: `${Math.round(scenarios.reduce((a, s) => a + s.avgPerformance, 0) / scenarios.length)}%`, color: '#A78BFA' },
            ].map(stat => (
              <div key={stat.label} className="stat-card">
                <p className="text-sm mb-1" style={{ color: 'var(--text-dim)' }}>{stat.label}</p>
                <p className="text-2xl font-bold font-mono" style={{ color: stat.color }}>{stat.value}</p>
              </div>
            ))}
          </div>

          {/* Scenario Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
            {filteredScenarios.map(scenario => {
              const st = statusLabels[scenario.status];
              return (
                <div key={scenario.id} className="rounded-[14px] overflow-hidden group hover:shadow-lg transition-shadow" style={{ backgroundColor: 'var(--surface)', border: '1px solid var(--border)' }}>
                  {/* Thumbnail */}
                  <div className="h-36 flex items-center justify-center relative" style={{ background: 'linear-gradient(135deg, var(--bg), var(--hover))' }}>
                    <RiGamepadLine className="text-4xl" style={{ color: 'var(--text-dim)', opacity: 0.15 }} />
                    {/* Status badge */}
                    <span className={`absolute top-3 left-3 text-xs font-medium px-2 py-1 rounded-md ${st.bg} ${st.color}`} style={{ borderWidth: 1, borderColor: 'currentColor', borderStyle: 'solid', opacity: 0.9 }}>
                      {st.label}
                    </span>
                    {/* Sector badge */}
                    <span className={`absolute top-3 right-3 badge badge-${scenario.sector}`}>{sectorLabels[scenario.sector]}</span>
                  </div>

                  <div className="p-4">
                    <h3 className="text-base font-bold mb-0.5" style={{ color: 'var(--text-primary)' }}>{scenario.nameHe}</h3>
                    <p className="text-xs mb-3" style={{ color: 'var(--text-dim)' }}>{scenario.name}</p>

                    <p className="text-sm mb-3 leading-relaxed line-clamp-2" style={{ color: 'var(--text-secondary)' }}>{scenario.description}</p>

                    <div className="flex items-center gap-3 mb-3">
                      <Stars count={scenario.difficulty} />
                      <span className="text-xs" style={{ color: 'var(--text-dim)' }}>{scenario.avgDuration}</span>
                    </div>

                    {/* Stats row */}
                    <div className="flex items-center justify-between text-sm mb-4 p-2.5 rounded-lg" style={{ backgroundColor: 'var(--bg)' }}>
                      <div className="flex items-center gap-1.5">
                        <RiUser3Line className="text-xs" style={{ color: 'var(--text-dim)' }} />
                        <span style={{ color: 'var(--text-dim)' }}>{scenario.completedBy} השלימו</span>
                      </div>
                      <div>
                        <span style={{ color: 'var(--text-dim)' }}>ממוצע: </span>
                        <strong className="font-mono" style={{ color: scenario.avgPerformance >= 70 ? '#00E5A0' : scenario.avgPerformance >= 55 ? '#FFB547' : '#FF4D6A' }}>{scenario.avgPerformance}%</strong>
                      </div>
                    </div>

                    {/* Action buttons */}
                    <div className="flex gap-2">
                      <button className="flex-1 flex items-center justify-center gap-2 bg-idf-blue/10 text-idf-blue border border-idf-blue/20 rounded-lg py-2.5 text-sm font-medium hover:bg-idf-blue/20 transition-colors">
                        <RiPlayCircleLine /> השקה
                      </button>
                      <button className="px-3 py-2.5 rounded-lg border text-sm hover:bg-idf-blue/5 transition-colors" style={{ borderColor: 'var(--border)', color: 'var(--text-dim)' }}>
                        <RiEditLine />
                      </button>
                      <button className="px-3 py-2.5 rounded-lg border text-sm hover:bg-idf-red/5 transition-colors" style={{ borderColor: 'var(--border)', color: 'var(--text-dim)' }}>
                        <RiDeleteBinLine />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Add New Card */}
            <button
              onClick={() => setActiveSection('create')}
              className="rounded-[14px] flex flex-col items-center justify-center gap-3 min-h-[320px] group transition-all hover:shadow-lg"
              style={{ backgroundColor: 'var(--surface)', border: '2px dashed var(--border)' }}
            >
              <div className="w-14 h-14 rounded-xl bg-idf-blue/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                <RiAddLine className="text-2xl text-idf-blue" />
              </div>
              <span className="text-base font-medium text-idf-blue">יצירת תרחיש חדש</span>
              <span className="text-xs" style={{ color: 'var(--text-dim)' }}>טופס אפיון תרחיש מלא</span>
            </button>
          </div>
        </>
      )}

      {/* ===== CREATE SIMULATION ===== */}
      {activeSection === 'create' && (
        <div className="max-w-4xl mx-auto">
          {/* Step indicator */}
          <div className="rounded-[14px] p-6 mb-6" style={{ backgroundColor: 'var(--surface)', border: '1px solid var(--border)' }}>
            <div className="flex items-center gap-2 mb-4">
              <RiDraftLine className="text-idf-blue text-xl" />
              <h2 className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>טופס אפיון תרחיש</h2>
              <InfoTip text={"טופס זה מבוסס על תפיסת החוסן הצה\"לית.\n\nחלק 1: סיווג קהל היעד (לוחם / תומך לחימה / עורפי)\nחלק 2: בחירת מסיחים ואתגרים\nחלק 3: מטרות מדידה (כושרי חוסן + רכיבי חוסן)\nחלק 4: נקודות התערבות (Trigger Points)\nחלק 5: אפיון מסך הסיכום והתחקיר\n\nמלא את כל החלקים כדי ליצור תרחיש מדויק ומותאם."} />
            </div>
            <div className="flex items-center gap-2">
              {formSteps.map((step, i) => (
                <React.Fragment key={i}>
                  <button
                    onClick={() => setFormStep(i)}
                    className="flex items-center gap-2 transition-all"
                  >
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
                        i === formStep ? 'bg-idf-blue text-white shadow-lg shadow-idf-blue/30' :
                        i < formStep ? 'bg-idf-green/20 text-idf-green' : ''
                      }`}
                      style={i > formStep ? { backgroundColor: 'var(--bg)', color: 'var(--text-dim)' } : undefined}
                    >
                      {i < formStep ? <RiCheckLine /> : i + 1}
                    </div>
                    <div className="text-right hidden lg:block">
                      <p className={`text-xs font-medium ${i === formStep ? 'text-idf-blue' : ''}`} style={i !== formStep ? { color: 'var(--text-dim)' } : undefined}>{step.label}</p>
                    </div>
                  </button>
                  {i < formSteps.length - 1 && (
                    <div className="flex-1 h-px" style={{ backgroundColor: i < formStep ? '#00E5A0' : 'var(--border)' }} />
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>

          {/* Step content */}
          <div className="rounded-[14px] p-6 mb-6" style={{ backgroundColor: 'var(--surface)', border: '1px solid var(--border)' }}>
            <div className="mb-6">
              <h3 className="text-lg font-bold mb-1" style={{ color: 'var(--text-primary)' }}>
                חלק {formStep + 1}: {formSteps[formStep].label}
              </h3>
              <p className="text-sm" style={{ color: 'var(--text-dim)' }}>{formSteps[formStep].desc}</p>
            </div>

            {/* STEP 0: Audience & Classification */}
            {formStep === 0 && (
              <div className="space-y-6">
                {/* Scenario name */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-secondary)' }}>שם התרחיש (עברית)</label>
                    <input
                      type="text"
                      value={formData.nameHe}
                      onChange={e => setFormData(prev => ({ ...prev, nameHe: e.target.value }))}
                      placeholder="למשל: היתקלות בשטח בנוי"
                      className="w-full px-4 py-3 rounded-xl text-base outline-none transition-all focus:ring-2 focus:ring-idf-blue/30"
                      style={{ backgroundColor: 'var(--bg)', border: '1px solid var(--border)', color: 'var(--text-primary)' }}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-secondary)' }}>Scenario Name (English)</label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={e => setFormData(prev => ({ ...prev, name: e.target.value }))}
                      placeholder="e.g., Urban Engagement"
                      className="w-full px-4 py-3 rounded-xl text-base outline-none transition-all focus:ring-2 focus:ring-idf-blue/30"
                      style={{ backgroundColor: 'var(--bg)', border: '1px solid var(--border)', color: 'var(--text-primary)' }}
                    />
                  </div>
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-secondary)' }}>תיאור התרחיש</label>
                  <textarea
                    value={formData.description}
                    onChange={e => setFormData(prev => ({ ...prev, description: e.target.value }))}
                    placeholder="תיאור מפורט של התרחיש, המטרות, והאתגרים העיקריים..."
                    rows={3}
                    className="w-full px-4 py-3 rounded-xl text-sm outline-none resize-none transition-all focus:ring-2 focus:ring-idf-blue/30"
                    style={{ backgroundColor: 'var(--bg)', border: '1px solid var(--border)', color: 'var(--text-primary)' }}
                  />
                </div>

                {/* Sector */}
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-secondary)' }}>זרוע</label>
                  <div className="flex gap-3">
                    {(['combat', 'command', 'institutional'] as Sector[]).map(s => (
                      <button
                        key={s}
                        onClick={() => setFormData(prev => ({ ...prev, sector: s }))}
                        className={`flex-1 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                          formData.sector === s ? `badge-${s} border-2` : ''
                        }`}
                        style={formData.sector !== s ? { backgroundColor: 'var(--bg)', color: 'var(--text-dim)', border: '1px solid var(--border)' } : undefined}
                      >
                        {sectorLabels[s]}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Audience Type */}
                <div>
                  <label className="block text-sm font-medium mb-3" style={{ color: 'var(--text-secondary)' }}>
                    סיווג קהל היעד
                    <span className="text-xs mr-2" style={{ color: 'var(--text-dim)' }}>(בהתאם לנספח חיכוך לחימה)</span>
                  </label>
                  <div className="space-y-3">
                    {audienceOptions.map(opt => (
                      <button
                        key={opt.id}
                        onClick={() => setFormData(prev => ({ ...prev, audience: opt.id }))}
                        className={`w-full text-right p-4 rounded-xl transition-all ${
                          formData.audience === opt.id ? 'ring-2 shadow-lg' : ''
                        }`}
                        style={{
                          backgroundColor: formData.audience === opt.id ? `${opt.color}08` : 'var(--bg)',
                          border: `1px solid ${formData.audience === opt.id ? opt.color + '40' : 'var(--border)'}`,
                        }}
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${opt.color}15` }}>
                            <opt.icon className="text-xl" style={{ color: opt.color }} />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <h4 className="text-base font-bold" style={{ color: formData.audience === opt.id ? opt.color : 'var(--text-primary)' }}>{opt.label}</h4>
                              {formData.audience === opt.id && <RiCheckLine style={{ color: opt.color }} />}
                            </div>
                            <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>{opt.desc}</p>
                            <p className="text-xs mt-1" style={{ color: 'var(--text-dim)' }}>דוגמאות: {opt.examples}</p>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Difficulty + Duration */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-secondary)' }}>רמת קושי</label>
                    <div className="flex items-center gap-3 p-3 rounded-xl" style={{ backgroundColor: 'var(--bg)', border: '1px solid var(--border)' }}>
                      <Stars count={formData.difficulty} interactive onChange={n => setFormData(prev => ({ ...prev, difficulty: n }))} />
                      <span className="text-sm font-mono font-bold" style={{ color: 'var(--text-primary)' }}>{formData.difficulty}/5</span>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-secondary)' }}>משך (דקות)</label>
                    <div className="flex items-center gap-3 p-3 rounded-xl" style={{ backgroundColor: 'var(--bg)', border: '1px solid var(--border)' }}>
                      <input
                        type="range"
                        min={5}
                        max={60}
                        value={formData.duration}
                        onChange={e => setFormData(prev => ({ ...prev, duration: Number(e.target.value) }))}
                        className="flex-1"
                        style={{ accentColor: '#38BDF8' }}
                      />
                      <span className="text-sm font-mono font-bold w-12 text-center" style={{ color: 'var(--text-primary)' }}>{formData.duration}′</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* STEP 1: Distractors */}
            {formStep === 1 && (
              <div className="space-y-6">
                <div className="p-4 rounded-xl bg-idf-blue/5 border border-idf-blue/10">
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                    בחר את המסיחים שיופעלו ב-VR כדי לייצר לחץ (דחק). הביופידבק ימדוד את תגובת החייל לכל מסיח.
                    <br />
                    <strong className="text-idf-blue">נבחרו {selectedDistractorCount} מסיחים</strong>
                  </p>
                </div>

                {(['physical', 'cognitive', 'emotional'] as DistractorCategory[]).map(cat => {
                  const catInfo = categoryLabels[cat];
                  const catDistractors = formData.distractors.filter(d => d.category === cat);
                  return (
                    <div key={cat}>
                      <div className="flex items-center gap-2 mb-3">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: catInfo.color }} />
                        <h4 className="text-base font-bold" style={{ color: catInfo.color }}>
                          {cat === 'physical' ? 'מסיחים פיזיים' : cat === 'cognitive' ? 'מסיחים קוגניטיביים' : 'אתגרים רגשיים-נפשיים'}
                        </h4>
                      </div>
                      <div className="space-y-2">
                        {catDistractors.map(d => (
                          <button
                            key={d.id}
                            onClick={() => toggleDistractor(d.id)}
                            className={`w-full flex items-center gap-3 p-3.5 rounded-xl text-right transition-all ${
                              d.selected ? 'ring-1 shadow-md' : ''
                            }`}
                            style={{
                              backgroundColor: d.selected ? `${catInfo.color}08` : 'var(--bg)',
                              border: `1px solid ${d.selected ? catInfo.color + '40' : 'var(--border)'}`,
                            }}
                          >
                            <div
                              className={`w-6 h-6 rounded-md flex items-center justify-center flex-shrink-0 transition-all ${
                                d.selected ? 'scale-110' : ''
                              }`}
                              style={{
                                backgroundColor: d.selected ? catInfo.color : 'var(--border)',
                              }}
                            >
                              {d.selected && <RiCheckLine className="text-white text-sm" />}
                            </div>
                            <d.icon className="text-lg flex-shrink-0" style={{ color: d.selected ? catInfo.color : 'var(--text-dim)' }} />
                            <span className="text-sm font-medium" style={{ color: d.selected ? 'var(--text-primary)' : 'var(--text-secondary)' }}>{d.label}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* STEP 2: Measurement Goals */}
            {formStep === 2 && (
              <div className="space-y-6">
                {/* Capabilities */}
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="text-base font-bold" style={{ color: 'var(--text-primary)' }}>א. מדידת כושרי החוסן (התוצאה בשטח)</h4>
                    <span className="text-xs font-mono px-2 py-0.5 rounded-md bg-idf-blue/10 text-idf-blue">{selectedCapCount}/3</span>
                  </div>
                  <p className="text-sm mb-4" style={{ color: 'var(--text-dim)' }}>אילו מתוך שלושת כושרי החוסן התרחיש הנוכחי בוחן?</p>
                  <div className="space-y-3">
                    {capabilityOptions.map(cap => {
                      const active = formData.capabilities[cap.key];
                      return (
                        <button
                          key={cap.key}
                          onClick={() => setFormData(prev => ({ ...prev, capabilities: { ...prev.capabilities, [cap.key]: !prev.capabilities[cap.key] } }))}
                          className="w-full flex items-center gap-4 p-4 rounded-xl text-right transition-all"
                          style={{
                            backgroundColor: active ? `${cap.color}08` : 'var(--bg)',
                            border: `1px solid ${active ? cap.color + '40' : 'var(--border)'}`,
                          }}
                        >
                          <div
                            className="w-6 h-6 rounded-md flex items-center justify-center flex-shrink-0"
                            style={{ backgroundColor: active ? cap.color : 'var(--border)' }}
                          >
                            {active && <RiCheckLine className="text-white text-sm" />}
                          </div>
                          <cap.icon className="text-xl flex-shrink-0" style={{ color: active ? cap.color : 'var(--text-dim)' }} />
                          <div>
                            <h5 className="text-base font-bold" style={{ color: active ? cap.color : 'var(--text-primary)' }}>{cap.label}</h5>
                            <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>{cap.desc}</p>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Components */}
                <div className="pt-4" style={{ borderTop: '1px solid var(--border)' }}>
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="text-base font-bold" style={{ color: 'var(--text-primary)' }}>ב. מדידת 5 רכיבי החוסן (מה עזר או הכשיל את החייל)</h4>
                    <span className="text-xs font-mono px-2 py-0.5 rounded-md bg-idf-blue/10 text-idf-blue">{selectedCompCount}/5</span>
                  </div>
                  <p className="text-sm mb-4" style={{ color: 'var(--text-dim)' }}>אילו מדדים פנימיים נבחנים בתרחיש?</p>
                  <div className="grid grid-cols-1 gap-3">
                    {componentOptions.map(comp => {
                      const active = formData.components[comp.key];
                      return (
                        <button
                          key={comp.key}
                          onClick={() => setFormData(prev => ({ ...prev, components: { ...prev.components, [comp.key]: !prev.components[comp.key] } }))}
                          className="flex items-center gap-4 p-4 rounded-xl text-right transition-all"
                          style={{
                            backgroundColor: active ? `${comp.color}08` : 'var(--bg)',
                            border: `1px solid ${active ? comp.color + '40' : 'var(--border)'}`,
                          }}
                        >
                          <div
                            className="w-6 h-6 rounded-md flex items-center justify-center flex-shrink-0"
                            style={{ backgroundColor: active ? comp.color : 'var(--border)' }}
                          >
                            {active && <RiCheckLine className="text-white text-sm" />}
                          </div>
                          <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${comp.color}15` }}>
                            <comp.icon className="text-xl" style={{ color: comp.color }} />
                          </div>
                          <div>
                            <h5 className="text-base font-bold" style={{ color: active ? comp.color : 'var(--text-primary)' }}>{comp.label}</h5>
                            <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>{comp.desc}</p>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {/* STEP 3: Trigger Points */}
            {formStep === 3 && (
              <div className="space-y-6">
                <div className="p-4 rounded-xl bg-idf-orange/5 border border-idf-orange/10">
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                    הגדרת אירועים תלויי-תגובה: כאשר הביופידבק מזהה מצב מסוים, המערכת מגיבה אוטומטית.
                    <br />
                    <span className="text-xs" style={{ color: 'var(--text-dim)' }}>
                      תפיסת החוסן קובעת כי לדמות המפקד וללכידות החברתית יש השפעה דרמטית על הפחתת הלחץ וחיזוק תחושת המסוגלות.
                    </span>
                  </p>
                </div>

                <div className="space-y-3">
                  {formData.triggerPoints.map(tp => (
                    <div
                      key={tp.id}
                      className="p-4 rounded-xl transition-all"
                      style={{
                        backgroundColor: tp.enabled ? 'var(--bg)' : 'var(--bg)',
                        border: `1px solid ${tp.enabled ? 'rgba(0,229,160,0.3)' : 'var(--border)'}`,
                        opacity: tp.enabled ? 1 : 0.5,
                      }}
                    >
                      <div className="flex items-start gap-3">
                        <button
                          onClick={() => toggleTriggerPoint(tp.id)}
                          className="w-6 h-6 rounded-md flex items-center justify-center flex-shrink-0 mt-0.5 transition-all"
                          style={{ backgroundColor: tp.enabled ? '#00E5A0' : 'var(--border)' }}
                        >
                          {tp.enabled && <RiCheckLine className="text-white text-sm" />}
                        </button>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <RiAlarmWarningLine className="text-idf-orange" />
                            <span className="text-sm font-bold" style={{ color: 'var(--text-primary)' }}>תנאי: </span>
                            <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>{tp.condition}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <RiArrowLeftSLine className="text-idf-blue" />
                            <span className="text-sm font-bold" style={{ color: 'var(--text-primary)' }}>תגובה: </span>
                            <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>{tp.action}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Bio-Adaptive Thresholds */}
                <div className="pt-4" style={{ borderTop: '1px solid var(--border)' }}>
                  <div className="flex items-center gap-2 mb-4">
                    <RiSettings4Line className="text-idf-purple" />
                    <h4 className="text-base font-bold" style={{ color: 'var(--text-primary)' }}>ספי ביו-אדפטיביים</h4>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      { label: 'סף HRV להקשחה', value: '< 40 ms', color: '#FF4D6A', desc: 'ירידת HRV מתחת לסף מפעילה הקשחת תרחיש' },
                      { label: 'סף GSR לזיהוי הצפה', value: '> 75 uS', color: '#FFB547', desc: 'עליית GSR מעל הסף מסמנת הצפה רגשית' },
                      { label: 'סף מיקוד מנהרה', value: '> 40%', color: '#FFB547', desc: 'אחוז מיקוד גבוה מצביע על Tunnel Vision' },
                      { label: 'השהיית תגובת מנוע', value: '200ms', color: '#38BDF8', desc: 'זמן המתנה לפני תגובת המנוע לביופידבק' },
                    ].map(setting => (
                      <div key={setting.label} className="p-3.5 rounded-xl" style={{ backgroundColor: 'var(--bg)', border: '1px solid var(--border)' }}>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>{setting.label}</span>
                          <span className="text-sm font-mono font-bold" style={{ color: setting.color }}>{setting.value}</span>
                        </div>
                        <p className="text-xs" style={{ color: 'var(--text-dim)' }}>{setting.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Social anchor */}
                <div className="p-4 rounded-xl" style={{ backgroundColor: 'rgba(56,189,248,0.05)', border: '1px solid rgba(56,189,248,0.15)' }}>
                  <div className="flex items-center gap-2 mb-2">
                    <RiTeamLine className="text-idf-blue text-lg" />
                    <h5 className="text-sm font-bold text-idf-blue">עוגנים חברתיים-פיקודיים</h5>
                  </div>
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                    התוכנה יכולה להשמיע את קולו של המפקד בקשר. ניתן למדוד האם שמיעת פקודה ברורה מהמפקד ב-VR מורידה את מדדי הלחץ בביופידבק.
                    לדמות המפקד וללכידות החברתית יש השפעה דרמטית על הפחתת הלחץ וחיזוק תחושת המסוגלות של החייל.
                  </p>
                </div>
              </div>
            )}

            {/* STEP 4: Debrief Settings */}
            {formStep === 4 && (
              <div className="space-y-6">
                <div className="p-4 rounded-xl bg-idf-green/5 border border-idf-green/10">
                  <div className="flex items-center gap-2 mb-2">
                    <RiBookOpenLine className="text-idf-green" />
                    <h5 className="text-sm font-bold text-idf-green">החלק החשוב ביותר בסימולציה הוא הלמידה</h5>
                  </div>
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                    התחקיר לא נועד רק להראות שגיאות, אלא <strong>"להעצים את תחושת היכולת של הפרט המאפשרת להתמודד במשימות בתנאי לחץ"</strong>.
                    המערכת תציג לחייל מתי הוא הצליח לווסת את עצמו בהצלחה.
                  </p>
                </div>

                {/* Debrief outputs */}
                <div>
                  <h4 className="text-base font-bold mb-4" style={{ color: 'var(--text-primary)' }}>פלטי נתונים לתחקיר</h4>
                  <div className="space-y-3">
                    {[
                      {
                        key: 'showStressVsPerformance',
                        label: 'גרף עומס מול ביצועים',
                        desc: 'הצגת רגעי השיא בביופידבק מול הביצוע ב-VR באותה שנייה - האם ירה מדויק? האם ברח?',
                        icon: RiPulseLine,
                        color: '#FF4D6A',
                      },
                      {
                        key: 'showSelfEfficacy',
                        label: 'חיזוק תחושת המסוגלות (Self-Efficacy)',
                        desc: 'הצגת רגעי הצלחה: "בדקה 4:00 הופתעת, המדדים קפצו, אבל תוך 10 שניות חזרת לפוקוס ופגעת במטרה. זוהי התאוששות מעולה."',
                        icon: RiCheckboxCircleLine,
                        color: '#00E5A0',
                      },
                      {
                        key: 'showBiometricTimeline',
                        label: 'ציר זמן ביומטרי מלא',
                        desc: 'גרף מפורט של כל מדדי הביופידבק לאורך הסימולציה עם סימון אירועים קריטיים',
                        icon: RiTimeLine,
                        color: '#38BDF8',
                      },
                      {
                        key: 'showComponentBreakdown',
                        label: 'פירוט 5 רכיבי חוסן',
                        desc: 'ניתוח מפורט של כל רכיב חוסן עם ציון, מגמה, והמלצות לשיפור',
                        icon: RiBrainLine,
                        color: '#A78BFA',
                      },
                    ].map(item => {
                      const active = formData.debriefSettings[item.key as keyof typeof formData.debriefSettings];
                      return (
                        <button
                          key={item.key}
                          onClick={() => setFormData(prev => ({
                            ...prev,
                            debriefSettings: { ...prev.debriefSettings, [item.key]: !active },
                          }))}
                          className="w-full flex items-center gap-4 p-4 rounded-xl text-right transition-all"
                          style={{
                            backgroundColor: active ? `${item.color}08` : 'var(--bg)',
                            border: `1px solid ${active ? item.color + '40' : 'var(--border)'}`,
                          }}
                        >
                          <div
                            className="w-6 h-6 rounded-md flex items-center justify-center flex-shrink-0"
                            style={{ backgroundColor: active ? item.color : 'var(--border)' }}
                          >
                            {active && <RiCheckLine className="text-white text-sm" />}
                          </div>
                          <item.icon className="text-xl flex-shrink-0" style={{ color: active ? item.color : 'var(--text-dim)' }} />
                          <div>
                            <h5 className="text-base font-bold" style={{ color: active ? item.color : 'var(--text-primary)' }}>{item.label}</h5>
                            <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>{item.desc}</p>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Summary preview */}
                <div className="pt-4" style={{ borderTop: '1px solid var(--border)' }}>
                  <h4 className="text-base font-bold mb-4" style={{ color: 'var(--text-primary)' }}>סיכום התרחיש</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 rounded-xl" style={{ backgroundColor: 'var(--bg)', border: '1px solid var(--border)' }}>
                      <p className="text-xs font-medium mb-1" style={{ color: 'var(--text-dim)' }}>שם</p>
                      <p className="text-base font-bold" style={{ color: 'var(--text-primary)' }}>{formData.nameHe || '—'}</p>
                      <p className="text-xs" style={{ color: 'var(--text-dim)' }}>{formData.name || '—'}</p>
                    </div>
                    <div className="p-4 rounded-xl" style={{ backgroundColor: 'var(--bg)', border: '1px solid var(--border)' }}>
                      <p className="text-xs font-medium mb-1" style={{ color: 'var(--text-dim)' }}>קהל יעד</p>
                      <p className="text-base font-bold" style={{ color: 'var(--text-primary)' }}>
                        {formData.audience ? audienceOptions.find(a => a.id === formData.audience)?.label : '—'}
                      </p>
                      <p className="text-xs" style={{ color: 'var(--text-dim)' }}>{formData.sector ? sectorLabels[formData.sector as Sector] : '—'} | קושי {formData.difficulty}/5 | {formData.duration}′</p>
                    </div>
                    <div className="p-4 rounded-xl" style={{ backgroundColor: 'var(--bg)', border: '1px solid var(--border)' }}>
                      <p className="text-xs font-medium mb-1" style={{ color: 'var(--text-dim)' }}>מסיחים נבחרים</p>
                      <p className="text-base font-bold" style={{ color: '#FFB547' }}>{selectedDistractorCount}</p>
                      <p className="text-xs" style={{ color: 'var(--text-dim)' }}>
                        {formData.distractors.filter(d => d.selected && d.category === 'physical').length} פיזי,{' '}
                        {formData.distractors.filter(d => d.selected && d.category === 'cognitive').length} קוגניטיבי,{' '}
                        {formData.distractors.filter(d => d.selected && d.category === 'emotional').length} רגשי
                      </p>
                    </div>
                    <div className="p-4 rounded-xl" style={{ backgroundColor: 'var(--bg)', border: '1px solid var(--border)' }}>
                      <p className="text-xs font-medium mb-1" style={{ color: 'var(--text-dim)' }}>מדידה</p>
                      <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>
                        כושרים: {capabilityOptions.filter(c => formData.capabilities[c.key]).map(c => c.label).join(', ') || '—'}
                      </p>
                      <p className="text-xs mt-1" style={{ color: 'var(--text-secondary)' }}>
                        רכיבים: {componentOptions.filter(c => formData.components[c.key]).map(c => c.label).join(', ') || '—'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Navigation buttons */}
          <div className="flex items-center justify-between">
            <button
              onClick={() => formStep > 0 ? setFormStep(formStep - 1) : setActiveSection('scenarios')}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-base font-medium transition-colors"
              style={{ backgroundColor: 'var(--surface)', color: 'var(--text-secondary)', border: '1px solid var(--border)' }}
            >
              <RiArrowRightSLine />
              {formStep > 0 ? 'חזרה' : 'ביטול'}
            </button>
            <div className="flex gap-3">
              <button
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-base font-medium transition-colors"
                style={{ backgroundColor: 'var(--surface)', color: 'var(--text-dim)', border: '1px solid var(--border)' }}
              >
                <RiDraftLine /> שמור טיוטה
              </button>
              {formStep < formSteps.length - 1 ? (
                <button
                  onClick={() => setFormStep(formStep + 1)}
                  className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-base font-medium bg-idf-blue text-white hover:bg-idf-blue/90 transition-colors shadow-lg shadow-idf-blue/20"
                >
                  המשך <RiArrowLeftSLine />
                </button>
              ) : (
                <button
                  onClick={handleCreateScenario}
                  className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-base font-medium bg-idf-green text-white hover:bg-idf-green/90 transition-colors shadow-lg shadow-idf-green/20"
                >
                  <RiCheckLine /> צור תרחיש
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ===== DECISION TREE ===== */}
      {activeSection === 'tree' && (
        <div className="rounded-[14px] p-6" style={{ backgroundColor: 'var(--surface)', borderWidth: 1, borderStyle: 'solid', borderColor: 'var(--border)' }}>
          <div className="flex items-center gap-2 mb-6">
            <h2 className="text-lg font-semibold">עורך עץ החלטות - היתקלות בשטח בנוי</h2>
            <InfoTip text={"איך לקרוא: עץ ההחלטות מציג את מבנה התרחיש - כל צומת = נקודת החלטה, כל ענף = תוצאה אפשרית.\n\nירוק = מסלול רגיל, אדום = הקשחה (מגביר לחץ), כחול = התאוששות.\n\nדוגמה: צומת 'קפיאה' (אדום) מופעל כשהביופידבק מזהה עצירת תפקוד. משם הצוער יכול להתאושש (כחול) או להישלח לסיום.\n\nהענפים מראים את ההשפעה של כל החלטה על מרכיבי החוסן השונים."} />
          </div>

          {/* Decision Tree Visualization */}
          <div className="relative min-h-[400px]">
            {[
              { id: 1, label: 'התחלה', x: '50%', y: 20, color: '#00E5A0', type: 'normal' },
              { id: 2, label: 'זיהוי איום', x: '30%', y: 100, color: '#00E5A0', type: 'normal' },
              { id: 3, label: 'עומס מידע', x: '70%', y: 100, color: '#FF4D6A', type: 'hardening' },
              { id: 4, label: 'החלטת ירי', x: '15%', y: 180, color: '#00E5A0', type: 'normal' },
              { id: 5, label: 'קפיאה', x: '45%', y: 180, color: '#FF4D6A', type: 'hardening' },
              { id: 6, label: 'התאוששות', x: '75%', y: 180, color: '#38BDF8', type: 'recovery' },
              { id: 7, label: 'פינוי', x: '30%', y: 260, color: '#00E5A0', type: 'normal' },
              { id: 8, label: 'סיום', x: '60%', y: 260, color: '#00E5A0', type: 'normal' },
            ].map(node => (
              <div
                key={node.id}
                className="absolute flex flex-col items-center cursor-pointer group"
                style={{ left: node.x, top: node.y, transform: 'translateX(-50%)' }}
              >
                <div
                  className="w-14 h-14 rounded-xl flex items-center justify-center border-2 transition-transform group-hover:scale-110"
                  style={{ borderColor: node.color, backgroundColor: `${node.color}15` }}
                >
                  <span className="text-xs font-semibold text-center leading-tight" style={{ color: 'var(--text-primary)' }}>{node.label}</span>
                </div>
                <div className="text-xs mt-1" style={{ color: 'var(--text-dim)' }}>
                  {node.type === 'normal' ? 'רגיל' : node.type === 'hardening' ? 'הקשחה' : 'התאוששות'}
                </div>
              </div>
            ))}

            <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: -1 }}>
              <line x1="50%" y1="60" x2="30%" y2="100" stroke="var(--border)" strokeWidth="1.5" />
              <line x1="50%" y1="60" x2="70%" y2="100" stroke="var(--border)" strokeWidth="1.5" />
              <line x1="30%" y1="140" x2="15%" y2="180" stroke="var(--border)" strokeWidth="1.5" />
              <line x1="30%" y1="140" x2="45%" y2="180" stroke="var(--border)" strokeWidth="1.5" />
              <line x1="70%" y1="140" x2="75%" y2="180" stroke="var(--border)" strokeWidth="1.5" />
              <line x1="15%" y1="220" x2="30%" y2="260" stroke="var(--border)" strokeWidth="1.5" />
              <line x1="75%" y1="220" x2="60%" y2="260" stroke="var(--border)" strokeWidth="1.5" />
              <line x1="45%" y1="220" x2="60%" y2="260" stroke="var(--border)" strokeWidth="1.5" />
            </svg>
          </div>

          {/* Bio-Adaptive Settings */}
          <div className="mt-8 pt-6" style={{ borderTopWidth: 1, borderTopStyle: 'solid', borderTopColor: 'var(--border)' }}>
            <div className="flex items-center gap-2 mb-4">
              <RiSettings4Line className="text-idf-purple" />
              <h3 className="text-base font-semibold">הגדרות ביו-אדפטיביות</h3>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: 'סף HRV להקשחה', value: '< 40 ms', color: 'text-idf-red' },
                { label: 'סף GSR לזיהוי הצפה', value: '> 75 uS', color: 'text-idf-orange' },
                { label: 'סף מעקב עיניים למיקוד מנהרה', value: '> 40%', color: 'text-idf-orange' },
                { label: 'השהיית תגובת מנוע', value: '200ms', color: 'text-idf-blue' },
              ].map(setting => (
                <div key={setting.label} className="flex items-center justify-between p-3 rounded-lg" style={{ backgroundColor: 'var(--bg)' }}>
                  <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>{setting.label}</span>
                  <span className={`text-sm font-mono font-bold ${setting.color}`}>{setting.value}</span>
                </div>
              ))}
            </div>
            <div className="mt-3 flex items-center gap-3 p-3 bg-idf-red/5 border border-idf-red/10 rounded-lg">
              <div className="w-4 h-4 rounded bg-idf-red/20 flex items-center justify-center">
                <div className="w-2 h-2 rounded-sm bg-idf-red" />
              </div>
              <span className="text-sm" style={{ color: 'var(--text-primary)' }}>בדיקת שבירה (Breaking Point Test) - מאפשרת למנוע להקשיח ללא הקלה</span>
            </div>
          </div>
        </div>
      )}

      {/* ===== LIVE MONITORING ===== */}
      {activeSection === 'live' && (
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
          {/* Simulation Viewport */}
          <div className="lg:col-span-3 rounded-[14px] p-4" style={{ backgroundColor: 'var(--surface)', borderWidth: 1, borderStyle: 'solid', borderColor: 'var(--border)' }}>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <h2 className="text-base font-semibold">שידור חי - היתקלות בשטח בנוי</h2>
                <InfoTip text={"איך לקרוא: מסך ניטור בזמן אמת המציג את מדדי הצוערים במהלך סימולציה פעילה.\n\nקו ירוק = בטווח תקין, כתום = בגבול, אדום = חריגה.\n\nדוגמה: HRV של צוער יורד מ-60 ל-28 (אדום) = הצוער חווה לחץ חריג ויתכן שצריך התערבות.\n\nכפתור 'עצור' = הפסקת סימולציה במקרה חירום."} />
              </div>
              <div className="flex items-center gap-2">
                <div className="glow-dot bg-idf-green shadow-[0_0_8px_rgba(0,229,160,0.5)]" />
                <span className="text-xs text-idf-green font-medium">LIVE</span>
              </div>
            </div>
            <div className="aspect-video rounded-lg flex items-center justify-center border" style={{ background: 'linear-gradient(to bottom right, var(--bg), var(--hover))', borderColor: 'var(--border)' }}>
              <div className="text-center">
                <RiEyeLine className="text-4xl mx-auto mb-2" style={{ color: 'var(--text-dim)', opacity: 0.2 }} />
                <p className="text-sm" style={{ color: 'var(--text-dim)' }}>Unreal Engine Pixel Streaming Viewport</p>
                <p className="text-xs" style={{ color: 'var(--text-dim)', opacity: 0.5 }}>Simulation feed would appear here</p>
              </div>
            </div>
          </div>

          {/* Live Bio-Metrics */}
          <div className="lg:col-span-2 space-y-3">
            <div className="rounded-[14px] p-4" style={{ backgroundColor: 'var(--surface)', borderWidth: 1, borderStyle: 'solid', borderColor: 'var(--border)' }}>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-base font-semibold">ביומטרי בזמן אמת</h3>
                <span className="badge bg-idf-green/[0.13] text-idf-green border-idf-green/20">רגיל</span>
              </div>

              {[
                { label: 'HRV', value: 64, unit: 'ms', color: '#38BDF8', icon: RiPulseLine, threshold: 40 },
                { label: 'GSR', value: 58, unit: 'uS', color: '#FF4D6A', icon: RiPulseLine, threshold: 70 },
                { label: 'סריקה אפקטיבית', value: 63, unit: '%', color: '#00E5A0', icon: RiEyeLine, threshold: 40 },
                { label: 'זמן תגובה', value: 1.2, unit: 's', color: '#A78BFA', icon: RiPulseLine, threshold: 2.5 },
              ].map(metric => (
                <div key={metric.label} className="mb-4">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>{metric.label}</span>
                    <span className="text-base font-bold font-mono" style={{ color: metric.color }}>{metric.value} {metric.unit}</span>
                  </div>
                  <div className="h-1.5 rounded-full overflow-hidden" style={{ backgroundColor: 'var(--bg)' }}>
                    <div
                      className="h-full rounded-full transition-all duration-300"
                      style={{
                        width: `${Math.min(100, (metric.value / (metric.threshold * 1.5)) * 100)}%`,
                        backgroundColor: metric.color,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="rounded-[14px] p-4" style={{ backgroundColor: 'var(--surface)', borderWidth: 1, borderStyle: 'solid', borderColor: 'var(--border)' }}>
              <h3 className="text-base font-semibold mb-3">מצב מנוע</h3>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { label: 'הקשחה', active: false },
                  { label: 'הקלה', active: false },
                  { label: 'בדיקת שבירה', active: false },
                  { label: 'רגיל', active: true },
                ].map(state => (
                  <div key={state.label} className={`p-2 rounded-lg text-center text-sm font-medium ${
                    state.active ? 'bg-idf-green/10 text-idf-green border border-idf-green/20' : ''
                  }`}
                  style={!state.active ? { backgroundColor: 'var(--bg)', color: 'var(--text-dim)' } : undefined}
                  >
                    {state.label}
                  </div>
                ))}
              </div>
            </div>

            <button className="w-full bg-idf-red/10 text-idf-red border border-idf-red/20 rounded-xl py-3 text-base font-semibold hover:bg-idf-red/20 transition-colors flex items-center justify-center gap-2">
              <RiErrorWarningLine /> Manual Override - עצירה ידנית
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SimulationManagement;
