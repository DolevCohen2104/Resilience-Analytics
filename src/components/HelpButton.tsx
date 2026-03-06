import React, { useState } from 'react';
import { RiQuestionLine, RiCloseLine } from 'react-icons/ri';

const helpSections = [
  {
    title: 'לוח מפקד',
    content: 'מסך ראשי המציג סקירה כוללת של יחידת האימון. כולל מדדי ביצוע מרכזיים (KPIs), מגמות חוסן לאורך זמן, צוערים הדורשים תשומת לב, ורדאר חמישה מרכיבי החוסן ברמת היחידה.',
  },
  {
    title: 'פרופיל צוער',
    content: 'צפייה מעמיקה בנתוני הצוער הבודד. כולל נתונים ביומטריים (דופק, מוליכות עור, מעקב עיניים, זמן תגובה), רדאר חוסן אישי, ציר זמן אבני דרך, ניתוח ביו-אדפטיבי, פירוט תרחישים, שלושת הכושרים (עמידה, התאוששות, הסתגלות), מגמות שיפור, ותובנות.',
  },
  {
    title: 'סיכום סימולציה',
    content: 'מסך המוצג לצוער לאחר כל סימולציה. כולל את משולש החוסן (עמידה, התאוששות, הסתגלות), ציון תרומה חברתית וצוותית, תמונת שיפור אישית בהשוואה לבסיס, והמלצות ממוקדות מהמפקד.',
  },
  {
    title: 'ניהול סימולציות',
    content: 'בחירה והשקת תרחישי אימון. כולל רשת כרטיסי תרחישים עם סינון לפי זרוע וקושי, עורך עץ החלטות אינטראקטיבי, הגדרות ביו-אדפטיביות (ספי HRV, GSR, מעקב עיניים), וניטור חי של סימולציה פעילה.',
  },
  {
    title: 'אנליטיקס מתקדם',
    content: 'ניתוח מעמיק של נתוני האימון. כולל השוואת עוצמות (ציון חוסן מול זמן התאוששות), ניתוח חמישה מרכיבים, ניתוח טריגרים, מגמות שלושת הכושרים, ואנליטיקס חזוי להערכת מוכנות עתידית.',
  },
  {
    title: 'תצוגת מפקד',
    content: 'סקירה ברמת פלוגה/גדוד. כולל מדדי מוכנות יחידתיים, התפלגות חוסן לפי יחידות משנה, רדאר חמישה מרכיבים ברמת יחידה, ודוח מוכנות מלא עם יכולת ייצוא.',
  },
  {
    title: 'הגדרות מערכת',
    content: 'ניהול חיישנים, ספי התראות, הרשאות משתמשים, ואינטגרציות. כולל בדיקת חיבור וכיול חיישנים, הגדרת ערכי סף להתראות, מטריצת הרשאות RBAC, וחיבור למנוע Unreal Engine.',
  },
  {
    title: 'מודל החוסן',
    content: 'המערכת מבוססת על מודל החוסן של צה"ל הכולל שלושה כושרים: עמידה (שמירה על רציפות תפקודית תחת לחץ), התאוששות (מהירות חזרה לתפקוד אפקטיבי), והסתגלות (גמישות התנהגותית בתנאים משתנים). הכושרים נמדדים דרך חמישה מרכיבים: ערכי, נפשי-רגשי, קוגניטיבי, חברתי, ופיזי.',
  },
  {
    title: 'קוד צבעים',
    content: 'אדום (< 40): אזור קריסה - דורש התערבות מיידית. כתום (40-60): אזור אתגר - דורש ניטור מוגבר. ירוק (60-80): אזור יציבות - ביצועים תקינים. כחול (80+): אזור אופטימלי - ביצועים מצוינים.',
  },
];

const HelpButton: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 left-6 z-50 w-12 h-12 rounded-full bg-idf-blue text-white flex items-center justify-center shadow-lg hover:bg-idf-blue/90 transition-all hover:scale-110"
        title="עזרה"
      >
        <RiQuestionLine className="text-2xl" />
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsOpen(false)} />
          <div className="relative w-[600px] max-h-[80vh] bg-[var(--surface)] border border-[var(--border)] rounded-2xl shadow-2xl overflow-hidden">
            <div className="flex items-center justify-between p-5 border-b border-[var(--border)]">
              <h2 className="text-xl font-bold text-[var(--text-primary)]">מדריך שימוש - מרכז החוסן</h2>
              <button
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-[var(--hover)] transition-colors text-[var(--text-secondary)]"
              >
                <RiCloseLine className="text-xl" />
              </button>
            </div>
            <div className="p-5 max-h-[65vh] overflow-y-auto space-y-4">
              {helpSections.map((section, i) => (
                <div key={i} className="p-4 rounded-xl bg-[var(--bg)] border border-[var(--border)]">
                  <h3 className="text-base font-bold text-idf-blue mb-2">{section.title}</h3>
                  <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{section.content}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default HelpButton;
