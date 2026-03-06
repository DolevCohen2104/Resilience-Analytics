import React from 'react';
import { RiShieldLine, RiArrowUpLine, RiArrowDownLine, RiLightbulbLine, RiToolsLine, RiBookOpenLine } from 'react-icons/ri';
import InfoTip from '../components/InfoTip';

const SimulationSummary: React.FC = () => {
  const capabilities = [
    { key: 'withstanding', he: 'עמידה', prompt: 'כיצד תפקדת בעת ההיתקלות הפתאומית?', score: 76, prev: 68 },
    { key: 'recovery', he: 'התאוששות', prompt: 'באיזו מהירות חזרת לתפקוד אפקטיבי?', score: 72, extra: '4.2s', prev: 64 },
    { key: 'adaptation', he: 'הסתגלות', prompt: 'כיצד הגבת כשהמשימה השתנתה באמצע?', score: 70, prev: 66 },
  ];

  // Triangle geometry
  const cx = 250, cy = 245, r = 140;
  const angles = [-90, 150, 30];

  const getVertex = (angleIdx: number, ratio: number = 1) => {
    const angle = (angles[angleIdx] * Math.PI) / 180;
    return {
      x: cx + r * ratio * Math.cos(angle),
      y: cy + r * ratio * Math.sin(angle),
    };
  };

  const filledPoints = capabilities.map((c, i) => {
    const v = getVertex(i, c.score / 100);
    return `${v.x},${v.y}`;
  }).join(' ');

  const gridLevels = [1, 0.66, 0.33];
  const gridTriangles = gridLevels.map(level => {
    return [0, 1, 2].map(i => {
      const v = getVertex(i, level);
      return `${v.x},${v.y}`;
    }).join(' ');
  });

  const getColor = (score: number) =>
    score < 40 ? '#FF4D6A' : score < 60 ? '#FFB547' : score < 80 ? '#00E5A0' : '#38BDF8';

  const comparisonMetrics = [
    { label: 'HRV', baseline: 48, current: 68, unit: 'ms' },
    { label: 'זמן תגובה', baseline: 1.8, current: 1.1, unit: 's' },
    { label: 'סריקה אפקטיבית', baseline: 42, current: 67, unit: '%' },
  ];

  // What to preserve and what to improve
  const preserveItems = [
    { label: 'עמידה תחת לחץ ראשוני', desc: 'שמרת על תפקוד ברגעי ההפתעה הראשונים - זמן תגובה מהיר ושליטה גופנית', score: 82 },
    { label: 'תקשורת עם הצוות', desc: 'עדכנת את חברי הצוות בזמן אמת ושיתפת מידע קריטי', score: 78 },
    { label: 'התמדה במשימה', desc: 'לא נטשת את המשימה גם ברגעי לחץ שיא - 14 מתוך 18 דקות בפעילות אפקטיבית', score: 76 },
  ];

  const improveItems = [
    { label: 'ויסות רגשי לאחר טריגר', desc: 'זמן חזרה לבסיס רגשי גבוה מהצפוי - GSR נשאר מוגבר 45 שניות (יעד: 30 שניות)', score: 58, prev: 52, target: 70 },
    { label: 'סריקת שדה תחת לחץ', desc: 'בשלב הלחץ העיקרי נצפה מיקוד מנהרה - שדה הסריקה ירד ב-35%', score: 55, prev: 48, target: 75 },
    { label: 'קבלת החלטות מורכבות', desc: 'בנקודת ההחלטה הקריטית נצפה עיכוב של 2.3 שניות מעל הממוצע', score: 62, prev: 59, target: 80 },
  ];

  // Practical tools - detailed with simulation references
  const practicalTools = [
    {
      title: 'טכניקת נשימה 4-7-8',
      target: 'ויסות רגשי',
      color: '#FF4D6A',
      what: 'טכניקת נשימה מבוססת מחקר שמפעילה את מערכת העצבים הפאראסימפתטית (מרגיעה). מורידה קצב לב, מפחיתה GSR, ומחזירה את הגוף למצב ויסות תוך 60-90 שניות.',
      steps: [
        'הכנה: שב ישר, כפות רגליים על הרצפה, עיניים עצומות או מבט קבוע',
        'שאיפה דרך האף למשך 4 שניות - ספור פנימי "1...2...3...4"',
        'עצירת נשימה למשך 7 שניות - שמור על הרפיה בכתפיים',
        'נשיפה איטית דרך הפה למשך 8 שניות - כאילו מנפח בלון לאט',
        'חזרה על הסבב 3-4 פעמים (סה"כ כ-75 שניות)',
        'לאחר הסיום: נשימה חופשית, בדוק - האם הכתפיים רפויות? האם הלסת רפויה?',
      ],
      simMoment: 'דקה 6:30 - רגע ההיתקלות הראשונה',
      simDetail: 'ברגע ההיתקלות הראשונה בשטח הבנוי (דקה 6:30), ה-GSR שלך קפץ מ-3.2 ל-11.8µS וה-HRV ירד מ-62 ל-35ms. לקח 45 שניות עד שהמדדים התחילו לרדת. אם היית מפעיל את הטכניקה מיד בזיהוי הראשון של הלחץ - עוד לפני שהגוף "ברח" לתגובת fight-or-flight - ההתאוששות הייתה יכולה לקחת 25-30 שניות בלבד.',
      simImprove: 'תרגל מראש: 3 סבבי 4-7-8 לפני כל כניסה לסימולציה. במהלך הסימולציה: ברגע שמזהה דופק עולה או ידיים מזיעות - סבב אחד מהיר (4-4-6 בגרסה המקוצרת) תוך כדי תנועה.',
      when: 'לפני כניסה לתרחיש (הכנה), ומיד עם זיהוי סימן גופני ראשון של לחץ (ידיים מזיעות, דופק מואץ, נשימה רדודה)',
    },
    {
      title: 'סריקת שדה מובנית - לולאת OODA',
      target: 'קוגניטיבי',
      color: '#A78BFA',
      what: 'מסגרת קבלת החלטות של ג\'ון בויד (OODA Loop). מונעת "מיקוד מנהרה" (Tunnel Vision) על ידי כפיית סריקה מובנית. מחקרים מראים שלוחמים שמשתמשים ב-OODA מקבלים החלטות מדויקות יותר ב-40% פחות זמן.',
      steps: [
        'Observe (צפה) - סרוק 360° בסדר קבוע: קדימה > ימין > אחורה > שמאל > למעלה (3 שניות). אל תתקע על נקודה אחת.',
        'Orient (אמוד) - מה השתנה? מה חדש? מה המטרה הקרובה ביותר? סדר עדיפויות: איום > משימה > עזרה (2 שניות)',
        'Decide (החלט) - בחר פעולה אחת ספציפית. אל תהסס בין אפשרויות - הפעולה הטובה עכשיו עדיפה על הפעולה המושלמת מאוחר (1 שנייה)',
        'Act (פעל) - בצע מיידית ללא היסוס. התחל לולאה חדשה מיד אחרי (חזור ל-Observe)',
        'תרגול: התחל ב-10 שניות ללולאה, שפר בהדרגה ל-6 שניות',
      ],
      simMoment: 'דקות 9:00-11:30 - אזור הלחץ העיקרי',
      simDetail: 'בין דקה 9:00 ל-11:30, כשנכנסת לאזור הבנוי הצפוף, נצפה אצלך "מיקוד מנהרה" קלאסי - מעקב העיניים הראה שהסתכלת 78% מהזמן על נקודה אחת (הפתח הקדמי) ושדה הסריקה שלך ירד ב-35%. בגלל זה פספסת את התנועה מצד ימין (דקה 10:15) וזמן התגובה שלך קפץ ל-2.3 שניות מעל הממוצע.',
      simImprove: 'בפעם הבאה: ברגע שנכנס לאזור חדש - הפעל לולאת OODA מלאה לפני כל פעולה. תרגל "ספירת דלתות" - בכל חדר, ספור כמה פתחים יש ותסרוק כל אחד. זה מונע נעילה על נקודה אחת.',
      when: 'בכל כניסה לאזור חדש, לאחר כל טריגר (רעש, הפתעה), בכל נקודת החלטה, ומיד לאחר שסיימת פעולה (כדי לא "להירדם" על ההצלחה)',
    },
    {
      title: 'עיגון קוגניטיבי - שיח עצמי מובנה (Self-Talk)',
      target: 'עמידה',
      color: '#38BDF8',
      what: 'טכניקה פסיכולוגית שמשתמשת בדיבור פנימי מכוון כדי לשבור את מעגל הלחץ. מחקרים בצבאות מערביים מראים שלוחמים שמשתמשים ב-Self-Talk מובנה שומרים על ביצועים גבוהים ב-25% יותר תחת לחץ קיצוני.',
      steps: [
        'זהה (1 שנייה): אמור לעצמך "אני מזהה שאני תחת לחץ" - עצם הזיהוי מפעיל את הקורטקס הקדמי ומפחית את שליטת האמיגדלה',
        'נרמל (2 שניות): "זו תגובה טבעית של הגוף. הגוף שלי מכין אותי לפעולה. אני מוכן לזה" - מסגור חיובי של הלחץ',
        'מקד (2 שניות): "המשימה שלי כרגע היא [משפט אחד ספציפי]" - לא "לנצח" אלא הפעולה הבאה בלבד. למשל: "לחצות את החדר הזה"',
        'פעל (מיידי): חזרה לפעולה תוך 3 שניות מקסימום. אל תחכה להרגשה של ביטחון - הביטחון יבוא תוך כדי פעולה',
        'חזור: אם הלחץ חוזר - חזור על זהה-נרמל-מקד-פעל. אין מגבלה על כמה פעמים',
      ],
      simMoment: 'דקה 7:20 - רגע ההפתעה הגדול',
      simDetail: 'בדקה 7:20, כשההפתעה הגדולה התרחשה (שינוי פתאומי בתרחיש), נצפתה אצלך "קפיאה" של 4.1 שניות - הגוף שלך הגיב (GSR קפץ) אבל לא הייתה פעולה. ה-Eye Tracking הראה מבט קבוע ללא סריקה. אחרי 4.1 שניות התחלת לפעול, אבל ההחלטה הראשונה לא הייתה מדויקה (ירידה של 15% בדיוק). אם היית מפעיל Self-Talk מיד ברגע הזיהוי, הקפיאה הייתה מתקצרת ל-1-2 שניות.',
      simImprove: 'תרגול יומי: בכל מצב לחץ קטן (פקק, דד-ליין, ויכוח) תרגל את הנוסחה "זהה-נרמל-מקד-פעל". ככל שתתרגל יותר במצבים יומיומיים, כך הטכניקה תהפוך אוטומטית בסימולציה.',
      when: 'ברגע שמזהה אחד מהסימנים: "קפיאה" (עצירת פעולה), מחשבות שליליות ("אני לא מסוגל"), תחושת חוסר שליטה, או ירידה בביטחון',
    },
    {
      title: 'תקשורת צוותית מובנית (SBAR)',
      target: 'חברתי',
      color: '#00E5A0',
      what: 'פרוטוקול תקשורת שפותח בצי האמריקאי ואומץ בבתי חולים ויחידות צבאיות. מבטיח שמידע קריטי מועבר בצורה מלאה, ברורה ומהירה - במיוחד תחת לחץ כשהמוח נוטה "לקצר" הודעות.',
      steps: [
        'Situation (מצב) - משפט אחד: "אני ב[מיקום], רואה [מה]" - תמיד התחל בעובדות',
        'Background (רקע) - משפט אחד: "הגעתי לכאן כי [מה הוביל]" - נותן הקשר לצוות',
        'Assessment (הערכה) - משפט אחד: "ההערכה שלי: [מה אני חושב שקורה]" - חשוב להפריד בין עובדה להערכה',
        'Recommendation (המלצה) - משפט אחד: "אני ממליץ ש[פעולה ספציפית]" או "אני צריך [עזרה ספציפית]"',
        'אישור: חכה לאישור מהצוות ("הבנתי" / "מבצע") - אל תניח שהודעה נקלטה',
        'דוגמה מלאה: "אני בחדר מספר 3, יש כאן מעבר חסום. הגעתי דרך הפתח הדרומי. נראה שזה שינוי מהתוכנית. ממליץ לעבור דרך הפתח המזרחי."',
      ],
      simMoment: 'דקות 12:00-14:00 - שלב העבודה הצוותית',
      simDetail: 'בדקות 12:00-14:00, כשהיית צריך לתאם עם הצוות, שלחת 4 הודעות - אבל 2 מהן היו חלקיות ("מצב לא טוב כאן", "צריך עזרה"). הצוות לא ידע בדיוק איפה אתה, מה אתה רואה, ומה אתה צריך. הודעת SBAR מלאה הייתה חוסכת 8-12 שניות של שאלות הבהרה וסינכרון מחדש.',
      simImprove: 'תרגול: בכל תקשורת (גם יומיומית) - שאל את עצמך "האם אמרתי מצב + רקע + הערכה + המלצה?" אפשר גם לפשט ל-3 שלבים: "אני ב___, רואה ___, צריך ___".',
      when: 'בכל דיווח לצוות, בקשת עזרה, עדכון מצב, ובמיוחד כשמרגיש שהתקשורת "נתקעת" או שאין מספיק מידע',
    },
  ];

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="rounded-[14px] p-8 mb-6 text-center" style={{ backgroundColor: 'var(--surface)', border: '1px solid var(--border)' }}>
        <h1 className="text-3xl font-bold mb-3" style={{ color: 'var(--text-primary)' }}>סיכום תפקוד בסימולציה תחת לחץ</h1>
        <p className="text-lg mb-5" style={{ color: 'var(--text-secondary)' }}>המיקוד אינו רק בהצלחת המשימה, אלא באיך שהמשימה בוצעה</p>
        <div className="flex items-center justify-center gap-8 text-base" style={{ color: 'var(--text-dim)' }}>
          <span>תרחיש: <strong style={{ color: 'var(--text-primary)' }}>היתקלות בשטח בנוי</strong></span>
          <span>תאריך: <strong style={{ color: 'var(--text-primary)' }}>2026-03-06</strong></span>
          <span>משך: <strong style={{ color: 'var(--text-primary)' }}>18 דקות</strong></span>
          <span>קושי: <strong className="text-idf-orange">4/5</strong></span>
        </div>
      </div>

      {/* Resilience Triangle */}
      <div className="rounded-[14px] p-6 mb-6" style={{ backgroundColor: 'var(--surface)', border: '1px solid var(--border)' }}>
        <div className="flex items-center gap-2 mb-2 justify-center">
          <RiShieldLine className="text-idf-blue text-xl" />
          <h2 className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>משולש החוסן</h2>
          <InfoTip text={"איך לקרוא: המשולש מציג את שלוש היכולות המרכזיות - עמידה (למעלה), התאוששות (שמאל למטה), הסתגלות (ימין למטה).\n\nהמספר בכל קודקוד = ציון היכולת (0-100). ככל שהמספר גבוה יותר, היכולת חזקה יותר.\n\nדוגמה: עמידה 78, התאוששות 65, הסתגלות 71 - הצוער חזק בעמידה אך זקוק לחיזוק בהתאוששות.\n\nמשולש מאוזן (ציונים דומים) = חוסן יציב. פער גדול בין קודקודים = יש לטפל ביכולת החלשה."} />
        </div>
        <p className="text-base text-center mb-4" style={{ color: 'var(--text-dim)' }}>
          שלושת כושרי החוסן - כל קודקוד מייצג יכולת מרכזית
        </p>

        <div className="flex justify-center mb-6">
          <svg width="500" height="460" viewBox="0 0 500 460">
            {gridTriangles.map((pts, i) => (
              <polygon key={i} points={pts} fill="none" stroke="var(--border)" strokeWidth={i === 0 ? 1.5 : 0.8} strokeDasharray={i === 0 ? 'none' : '4 4'} />
            ))}
            {[0, 1, 2].map(i => {
              const v = getVertex(i);
              return <line key={i} x1={cx} y1={cy} x2={v.x} y2={v.y} stroke="var(--border)" strokeWidth="0.5" strokeDasharray="3 3" />;
            })}
            <polygon points={filledPoints} fill="#38BDF8" fillOpacity="0.15" stroke="#38BDF8" strokeWidth="2.5" strokeLinejoin="round" />
            {capabilities.map((cap, i) => {
              const v = getVertex(i, cap.score / 100);
              return <circle key={cap.key} cx={v.x} cy={v.y} r="5" fill="#38BDF8" stroke="var(--surface)" strokeWidth="2" />;
            })}
            {capabilities.map((cap, i) => {
              const outerV = getVertex(i);
              const color = getColor(cap.score);
              const circleX = i === 0 ? outerV.x : i === 1 ? outerV.x - 25 : outerV.x + 25;
              const circleY = i === 0 ? outerV.y - 35 : outerV.y + 30;
              const labelY = i === 0 ? circleY - 36 : circleY + 44;
              return (
                <g key={`label-${cap.key}`}>
                  <line x1={outerV.x} y1={outerV.y} x2={circleX} y2={circleY} stroke={color} strokeWidth="1" strokeDasharray="3 3" opacity="0.4" />
                  <circle cx={circleX} cy={circleY} r="26" fill="var(--surface)" stroke={color} strokeWidth="2.5" />
                  <text x={circleX} y={circleY + 6} textAnchor="middle" fill={color} fontSize="18" fontWeight="bold" fontFamily="IBM Plex Mono">{cap.score}</text>
                  <text x={circleX} y={labelY} textAnchor="middle" fill="var(--text-primary)" fontSize="16" fontWeight="700" fontFamily="Heebo">{cap.he}</text>
                </g>
              );
            })}
          </svg>
        </div>

        {/* Capability Detail Cards */}
        <div className="grid grid-cols-3 gap-4">
          {capabilities.map(cap => {
            const diff = cap.score - cap.prev;
            return (
              <div key={cap.key} className="rounded-xl p-5 text-center" style={{ backgroundColor: 'var(--bg)', border: '1px solid var(--border)' }}>
                <h3 className="text-lg font-bold mb-1" style={{ color: getColor(cap.score) }}>{cap.he}</h3>
                <p className="text-sm mb-3" style={{ color: 'var(--text-dim)' }}>{cap.prompt}</p>
                <div className="text-4xl font-bold font-mono" style={{ color: getColor(cap.score) }}>{cap.score}</div>
                <div className="flex items-center justify-center gap-1 mt-2">
                  {diff > 0 ? <RiArrowUpLine className="text-idf-green" /> : <RiArrowDownLine className="text-idf-red" />}
                  <span className={`text-sm font-bold ${diff > 0 ? 'text-idf-green' : 'text-idf-red'}`}>
                    {diff > 0 ? '+' : ''}{diff} מהמפגש הקודם
                  </span>
                </div>
                {cap.extra && <p className="text-base mt-2" style={{ color: 'var(--text-secondary)' }}>זמן התאוששות: <strong className="font-mono">{cap.extra}</strong></p>}
              </div>
            );
          })}
        </div>
      </div>

      {/* ===== PRESERVE - What went well ===== */}
      <div className="rounded-[14px] p-6 mb-6" style={{ backgroundColor: 'var(--surface)', border: '1px solid rgba(0,229,160,0.2)' }}>
        <div className="flex items-center gap-2 mb-5">
          <div className="w-8 h-8 rounded-lg bg-idf-green/10 flex items-center justify-center">
            <RiShieldLine className="text-idf-green text-lg" />
          </div>
          <h2 className="text-xl font-bold text-idf-green">מה לשמר - נקודות חוזק</h2>
          <InfoTip text={"איך לקרוא: רשימת ההתנהגויות והביצועים החיוביים שהצוער הפגין בסימולציה.\n\nכל שורה מציגה: שם ההתנהגות, תיאור מה הצוער עשה נכון, וציון (0-100).\n\nדוגמה: 'עמידה תחת לחץ ראשוני - 82' = הצוער שמר על תפקוד מצוין ברגעי ההפתעה.\n\nחשוב לחזק התנהגויות אלו כדי שיישמרו גם בתרחישים עתידיים."} />
        </div>
        <div className="space-y-4">
          {preserveItems.map(item => (
            <div key={item.label} className="p-4 rounded-xl" style={{ backgroundColor: 'var(--bg)', border: '1px solid rgba(0,229,160,0.1)' }}>
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-base font-bold" style={{ color: 'var(--text-primary)' }}>{item.label}</h4>
                <span className="text-lg font-bold font-mono text-idf-green">{item.score}</span>
              </div>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{item.desc}</p>
              <div className="mt-3 h-2 rounded-full overflow-hidden" style={{ backgroundColor: 'var(--border)' }}>
                <div className="h-full rounded-full bg-idf-green/60 transition-all" style={{ width: `${item.score}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ===== IMPROVE - Personal Improvement Snapshot with DIFF ===== */}
      <div className="rounded-[14px] p-6 mb-6" style={{ backgroundColor: 'var(--surface)', border: '1px solid rgba(255,181,71,0.2)' }}>
        <div className="flex items-center gap-2 mb-5">
          <div className="w-8 h-8 rounded-lg bg-idf-orange/10 flex items-center justify-center">
            <RiArrowUpLine className="text-idf-orange text-lg" />
          </div>
          <h2 className="text-xl font-bold text-idf-orange">תמונת שיפור אישית</h2>
          <InfoTip text={"איך לקרוא: כל שורה מציגה תחום שיפור עם הציון הנוכחי, הציון הקודם, והפער מהיעד.\n\nחץ ירוק עם '+6' = עלייה של 6 נקודות מהמפגש הקודם.\nהפס הכתום = הציון הנוכחי. הקו המקווקו = היעד.\n\nדוגמה: 'ויסות רגשי - 58 (קודם: 52, עלייה של +6, יעד: 70)' = נותרו 12 נקודות ליעד.\n\nפער גדול מהיעד = עדיפות גבוהה לתרגול."} />
        </div>
        <div className="space-y-5">
          {improveItems.map(item => {
            const diff = item.score - item.prev;
            const gapToTarget = item.target - item.score;
            return (
              <div key={item.label} className="p-4 rounded-xl" style={{ backgroundColor: 'var(--bg)', border: '1px solid rgba(255,181,71,0.1)' }}>
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-base font-bold" style={{ color: 'var(--text-primary)' }}>{item.label}</h4>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1">
                      <RiArrowUpLine className="text-idf-green text-sm" />
                      <span className="text-sm font-bold text-idf-green">+{diff} מהמפגש הקודם</span>
                    </div>
                    <span className="text-lg font-bold font-mono text-idf-orange">{item.score}</span>
                  </div>
                </div>
                <p className="text-sm leading-relaxed mb-3" style={{ color: 'var(--text-secondary)' }}>{item.desc}</p>
                {/* Progress bar with target marker */}
                <div className="relative">
                  <div className="h-3 rounded-full overflow-hidden" style={{ backgroundColor: 'var(--border)' }}>
                    <div className="h-full rounded-full bg-idf-orange/60 transition-all" style={{ width: `${item.score}%` }} />
                  </div>
                  {/* Target marker */}
                  <div className="absolute top-0 h-3 w-0.5 bg-idf-blue" style={{ right: `${100 - item.target}%` }} />
                  <div className="flex justify-between mt-1.5">
                    <span className="text-xs" style={{ color: 'var(--text-dim)' }}>קודם: {item.prev}</span>
                    <span className="text-xs font-medium text-idf-blue">יעד: {item.target} (נותרו {gapToTarget} נקודות)</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Biometric Comparison */}
        <div className="mt-6 pt-5" style={{ borderTop: '1px solid var(--border)' }}>
          <h3 className="text-base font-bold mb-4" style={{ color: 'var(--text-primary)' }}>השוואת מדדים ביומטריים</h3>
          <div className="grid grid-cols-3 gap-6">
            {comparisonMetrics.map(m => {
              const improved = m.label === 'זמן תגובה' ? m.current < m.baseline : m.current > m.baseline;
              const diffVal = m.label === 'זמן תגובה'
                ? ((m.baseline - m.current) / m.baseline * 100).toFixed(0)
                : ((m.current - m.baseline) / m.baseline * 100).toFixed(0);
              return (
                <div key={m.label} className="text-center">
                  <h4 className="text-base font-semibold mb-4" style={{ color: 'var(--text-secondary)' }}>{m.label}</h4>
                  <div className="flex items-end justify-center gap-4 h-28">
                    <div className="flex flex-col items-center">
                      <span className="text-sm font-mono mb-1" style={{ color: 'var(--text-dim)' }}>{m.baseline}{m.unit}</span>
                      <div className="w-12 rounded-t" style={{ height: `${(m.baseline / (Math.max(m.baseline, m.current) * 1.3)) * 90}px`, backgroundColor: 'var(--text-dim)', opacity: 0.2 }} />
                      <span className="text-sm mt-1" style={{ color: 'var(--text-dim)' }}>בסיס</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <span className="text-sm font-mono font-bold mb-1" style={{ color: improved ? '#00E5A0' : '#FF4D6A' }}>{m.current}{m.unit}</span>
                      <div className="w-12 rounded-t" style={{
                        height: `${(m.current / (Math.max(m.baseline, m.current) * 1.3)) * 90}px`,
                        backgroundColor: improved ? '#00E5A0' : '#FF4D6A',
                      }} />
                      <span className="text-sm mt-1" style={{ color: 'var(--text-dim)' }}>נוכחי</span>
                    </div>
                  </div>
                  <div className={`mt-2 text-sm font-bold ${improved ? 'text-idf-green' : 'text-idf-red'}`}>
                    {improved ? 'שיפור' : 'ירידה'} של {diffVal}%
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Social & Team Contribution */}
      <div className="rounded-[14px] p-6 mb-6" style={{ backgroundColor: 'var(--surface)', border: '1px solid var(--border)' }}>
        <div className="flex items-center gap-2 mb-5">
          <h2 className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>רכיב חברתי וצוותי</h2>
          <InfoTip text={"איך לקרוא: מציג את האינטראקציות החברתיות של הצוער בזמן הסימולציה.\n\nתפקידי מנהיגות: כמה פעמים הצוער נטל יוזמה או הוביל את הקבוצה.\nתמיכה בזולת: מספר מקרים שהצוער סייע לאחרים.\n\nדוגמה: 5 תפקידי מנהיגות + 3 מקרי תמיכה = צוער בעל מיומנויות חברתיות גבוהות.\n\nציון חברתי גבוה = צוער שמחזק את הקבוצה."} />
        </div>
        <div className="space-y-5">
          {[
            { label: 'לכידות קבוצה', value: 72, desc: 'האם הצוער תמך באחרים?' },
            { label: 'נסוך ביטחון באחרים', value: 68, desc: 'האם התנהגות הצוער חיזקה את הצוות?' },
            { label: 'ציון תמיכה חברתית', value: 75, desc: 'תמיכה חברתית כגורם חוסן קריטי' },
          ].map(item => (
            <div key={item.label}>
              <div className="flex justify-between text-base mb-2">
                <div>
                  <span className="font-semibold" style={{ color: 'var(--text-primary)' }}>{item.label}</span>
                  <span className="text-sm mr-2" style={{ color: 'var(--text-dim)' }}>- {item.desc}</span>
                </div>
                <span className="font-mono font-bold text-idf-green text-lg">{item.value}%</span>
              </div>
              <div className="h-4 rounded-full overflow-hidden relative" style={{ backgroundColor: 'var(--bg)' }}>
                <div className="h-full rounded-full bg-gradient-to-l from-idf-green/80 to-idf-green/40 transition-all duration-700" style={{ width: `${item.value}%` }} />
                <div className="absolute inset-y-0 flex items-center w-full px-2">
                  {['נמוך', 'בינוני', 'גבוה', 'יוצא דופן'].map((level) => (
                    <span key={level} className="text-xs font-medium flex-1 text-center" style={{ color: 'var(--text-dim)' }}>{level}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ===== PRACTICAL TOOLS ===== */}
      <div className="rounded-[14px] p-6 mb-6" style={{ backgroundColor: 'var(--surface)', border: '1px solid rgba(167,139,250,0.2)' }}>
        <div className="flex items-center gap-2 mb-5">
          <div className="w-8 h-8 rounded-lg bg-idf-purple/10 flex items-center justify-center">
            <RiToolsLine className="text-idf-purple text-lg" />
          </div>
          <h2 className="text-xl font-bold text-idf-purple">כלים פרקטיים - איך להשתפר בפעם הבאה</h2>
          <InfoTip text={"איך לקרוא: כל כרטיס מציג טכניקה מעשית שניתן ליישם מיד.\n\nכל כלי כולל: שם הטכניקה, המרכיב שהיא מחזקת, שלבי ביצוע, ומתי להשתמש בה.\n\nדוגמה: 'טכניקת נשימה 4-7-8' - 4 שלבים פשוטים שניתן לתרגל לפני כל סימולציה לשיפור הוויסות הרגשי.\n\nמומלץ לתרגל 1-2 כלים בכל מפגש עד להפנמה מלאה."} />
        </div>
        <div className="grid grid-cols-1 gap-5">
          {practicalTools.map(tool => (
            <div key={tool.title} className="p-5 rounded-xl" style={{ backgroundColor: 'var(--bg)', border: `1px solid ${tool.color}20` }}>
              {/* Header */}
              <div className="flex items-center gap-2 mb-2">
                <RiLightbulbLine style={{ color: tool.color }} className="text-xl" />
                <h4 className="text-lg font-bold" style={{ color: 'var(--text-primary)' }}>{tool.title}</h4>
                <span className="text-xs font-medium px-2 py-1 rounded-md mr-auto" style={{ backgroundColor: `${tool.color}15`, color: tool.color }}>
                  מרכיב: {tool.target}
                </span>
              </div>

              {/* What is this technique */}
              <p className="text-sm leading-relaxed mb-4" style={{ color: 'var(--text-secondary)' }}>{tool.what}</p>

              {/* Steps */}
              <div className="mb-4">
                <h5 className="text-sm font-bold mb-2" style={{ color: 'var(--text-primary)' }}>שלבי ביצוע:</h5>
                <ol className="space-y-2" style={{ paddingRight: '1.2rem' }}>
                  {tool.steps.map((step, i) => (
                    <li key={i} className="text-sm leading-relaxed list-decimal" style={{ color: 'var(--text-secondary)' }}>{step}</li>
                  ))}
                </ol>
              </div>

              {/* Simulation moment */}
              <div className="p-4 rounded-lg mb-3" style={{ backgroundColor: `${tool.color}08`, border: `1px solid ${tool.color}15` }}>
                <h5 className="text-sm font-bold mb-1" style={{ color: tool.color }}>
                  רגע מהסימולציה: {tool.simMoment}
                </h5>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{tool.simDetail}</p>
              </div>

              {/* How to improve */}
              <div className="p-4 rounded-lg mb-3" style={{ backgroundColor: 'var(--surface)', border: '1px solid var(--border)' }}>
                <h5 className="text-sm font-bold mb-1" style={{ color: 'var(--text-primary)' }}>איך לשפר בפעם הבאה:</h5>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{tool.simImprove}</p>
              </div>

              {/* When to use */}
              <div className="p-3 rounded-lg text-sm" style={{ backgroundColor: `${tool.color}08`, color: tool.color }}>
                <strong>מתי להשתמש:</strong> {tool.when}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Commander Recommendations */}
      <div className="rounded-[14px] p-6 mb-6" style={{ backgroundColor: 'var(--surface)', border: '1px solid rgba(56,189,248,0.2)' }}>
        <div className="flex items-center gap-2 mb-5">
          <h2 className="text-xl font-bold text-idf-blue">המלצות ממוקדות</h2>
          <InfoTip text={"איך לקרוא: המלצות פעולה מותאמות אישית המבוססות על תוצאות הסימולציה.\n\nכל המלצה כוללת: סוג הפעולה, מרכיב החוסן הרלוונטי, ורמת הדחיפות.\n\nדוגמה: 'תרגול נשימות תחת לחץ (רגשי, דחיפות גבוהה)' - יש לשלב תרגול זה בתוכנית האימונים הקרובה.\n\nסדר ההמלצות = סדר העדיפות המומלץ."} />
        </div>
        <div className="space-y-3">
          {[
            { text: 'תרגול טכניקת נשימה מובנית לפני כניסה לסימולציה - ויסות גופני ורגשי', type: 'ויסות' },
            { text: 'שיפור זמני תגובה בתרחישי החלטה טקטית - מקצועיות מגבירה שליטה וביטחון', type: 'מקצועיות' },
            { text: 'תרחיש מומלץ הבא: ניווט לילי - להעמקת הסתגלות בתנאי ראות מוגבלת', type: 'תרחיש' },
          ].map((rec, i) => (
            <div key={i} className="flex items-start gap-3 p-4 rounded-lg" style={{ backgroundColor: 'var(--bg)' }}>
              <div className="w-8 h-8 rounded-full bg-idf-blue/20 flex items-center justify-center text-idf-blue text-base font-bold flex-shrink-0">
                {i + 1}
              </div>
              <div>
                <span className="badge bg-idf-blue/[0.13] text-idf-blue border-idf-blue/20 text-xs mb-1 inline-block">{rec.type}</span>
                <p className="text-base leading-relaxed" style={{ color: 'var(--text-primary)' }}>{rec.text}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-5 p-4 rounded-lg bg-idf-green/5 border border-idf-green/10 text-center">
          <p className="text-base text-idf-green font-medium">המפגש הנוכחי מהווה חלק מתהליך צמיחה מתמשך - שיפור עקבי נצפה לאורך 12 המפגשים האחרונים</p>
        </div>
      </div>

      {/* ===== CLOSING QUOTE ===== */}
      <div className="rounded-[14px] p-8 text-center" style={{ backgroundColor: 'var(--surface)', border: '1px solid var(--border)' }}>
        <RiBookOpenLine className="text-3xl mx-auto mb-4" style={{ color: 'var(--text-dim)' }} />
        <blockquote className="text-xl font-bold leading-relaxed mb-3" style={{ color: 'var(--text-primary)', fontFamily: 'Heebo' }}>
          "כִּי הוּא הַנֹּתֵן לְךָ כֹּחַ לַעֲשׂוֹת חָיִל"
        </blockquote>
        <p className="text-base" style={{ color: 'var(--text-dim)' }}>(דברים ח, יח)</p>
        <div className="mt-4 pt-4" style={{ borderTop: '1px solid var(--border)' }}>
          <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
            החוסן אינו רק יכולת מולדת - הוא נבנה, מתחזק ומתפתח דרך אימון מתמיד והתמודדות אמיצה עם אתגרים.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SimulationSummary;
