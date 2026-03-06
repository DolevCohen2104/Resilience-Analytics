import React, { useState } from 'react';
import { RiNotification3Line, RiSearchLine, RiArrowDownSLine, RiSunLine, RiMoonLine } from 'react-icons/ri';
import { alerts } from '../data/mockData';
import { useTheme } from '../ThemeContext';

const Header: React.FC = () => {
  const [showAlerts, setShowAlerts] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const activeAlerts = alerts.filter(a => a.status === 'new').length;

  const now = new Date();
  const hebrewDate = now.toLocaleDateString('he-IL', { year: 'numeric', month: 'long', day: 'numeric' });
  const time = now.toLocaleTimeString('he-IL', { hour: '2-digit', minute: '2-digit' });

  return (
    <header className="h-16 border-b flex items-center justify-between px-6 sticky top-0 z-40" style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)' }}>
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-idf-blue to-idf-green flex items-center justify-center text-white font-bold text-sm">
            RC
          </div>
          <span className="text-base font-bold" style={{ color: 'var(--text-primary)' }}>IDF Resilience Center</span>
        </div>
      </div>

      <div className="flex items-center gap-5">
        <div className="relative">
          <RiSearchLine className="absolute right-3 top-1/2 -translate-y-1/2" style={{ color: 'var(--text-dim)' }} />
          <input
            type="text"
            placeholder="חיפוש צוער..."
            className="border rounded-lg pr-9 pl-4 py-2 text-sm font-medium focus:outline-none focus:border-idf-blue/50 w-52"
            style={{ backgroundColor: 'var(--input-bg)', borderColor: 'var(--border)', color: 'var(--text-primary)' }}
          />
        </div>

        <div className="flex items-center gap-1.5 border rounded-lg px-3 py-2 cursor-pointer" style={{ backgroundColor: 'var(--input-bg)', borderColor: 'var(--border)' }}>
          <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>יחידה:</span>
          <span className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>פלוגה א'</span>
          <RiArrowDownSLine style={{ color: 'var(--text-dim)' }} />
        </div>

        <span className="text-sm" style={{ color: 'var(--text-dim)' }}>{hebrewDate} | {time}</span>

        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="p-2 rounded-lg transition-colors"
          style={{ color: 'var(--text-secondary)' }}
          title={theme === 'dark' ? 'מצב בהיר' : 'מצב כהה'}
        >
          {theme === 'dark' ? <RiSunLine className="text-xl" /> : <RiMoonLine className="text-xl" />}
        </button>

        <div className="relative">
          <button
            onClick={() => setShowAlerts(!showAlerts)}
            className="relative p-2 rounded-lg transition-colors"
          >
            <RiNotification3Line className="text-xl" style={{ color: 'var(--text-secondary)' }} />
            {activeAlerts > 0 && (
              <span className="absolute -top-0.5 -left-0.5 w-5 h-5 bg-idf-red rounded-full text-xs font-bold flex items-center justify-center text-white">
                {activeAlerts}
              </span>
            )}
          </button>

          {showAlerts && (
            <div className="absolute left-0 top-14 w-96 border rounded-xl overflow-hidden z-50" style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)', boxShadow: '0 8px 32px var(--shadow-color)' }}>
              <div className="p-4 border-b" style={{ borderColor: 'var(--border)' }}>
                <h3 className="text-base font-bold" style={{ color: 'var(--text-primary)' }}>התראות</h3>
              </div>
              <div className="max-h-80 overflow-y-auto">
                {alerts.map(alert => (
                  <div key={alert.id} className="p-4 border-b cursor-pointer transition-colors" style={{ borderColor: 'var(--border)' }}>
                    <div className="flex items-start gap-3">
                      <div className={`glow-dot mt-1.5 flex-shrink-0 ${
                        alert.level === 'critical' ? 'bg-idf-red shadow-[0_0_8px_rgba(255,77,106,0.5)]' :
                        alert.level === 'warning' ? 'bg-idf-orange shadow-[0_0_8px_rgba(255,181,71,0.5)]' :
                        alert.level === 'info' ? 'bg-idf-blue shadow-[0_0_8px_rgba(56,189,248,0.5)]' :
                        'bg-text-dim shadow-[0_0_8px_rgba(100,116,139,0.5)]'
                      }`} />
                      <div>
                        <p className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>{alert.messageHe}</p>
                        {alert.cadetId && <p className="text-xs mt-0.5" style={{ color: 'var(--text-dim)' }}>{alert.cadetId}</p>}
                        <p className="text-xs mt-0.5" style={{ color: 'var(--text-dim)' }}>{alert.timestamp}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="flex items-center gap-2 pr-4 border-r" style={{ borderColor: 'var(--border)' }}>
          <div className="text-left">
            <p className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>סא"ל דוד לוי</p>
            <p className="text-xs" style={{ color: 'var(--text-dim)' }}>קצין מנטלי</p>
          </div>
          <div className="w-9 h-9 rounded-full bg-idf-blue/20 flex items-center justify-center text-idf-blue text-sm font-bold">
            דל
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
