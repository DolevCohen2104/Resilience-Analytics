import React, { useState } from 'react';
import { RiNotification3Line, RiSearchLine, RiArrowDownSLine } from 'react-icons/ri';
import { alerts } from '../data/mockData';

const Header: React.FC = () => {
  const [showAlerts, setShowAlerts] = useState(false);
  const activeAlerts = alerts.filter(a => a.status === 'new').length;

  const now = new Date();
  const hebrewDate = now.toLocaleDateString('he-IL', { year: 'numeric', month: 'long', day: 'numeric' });
  const time = now.toLocaleTimeString('he-IL', { hour: '2-digit', minute: '2-digit' });

  return (
    <header className="h-14 bg-dark-surface border-b border-dark-border flex items-center justify-between px-6 sticky top-0 z-40">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-idf-blue to-idf-green flex items-center justify-center text-white font-bold text-sm">
            RC
          </div>
          <span className="text-sm font-semibold text-text-primary">IDF Resilience Center</span>
        </div>
      </div>

      <div className="flex items-center gap-5">
        <div className="relative">
          <RiSearchLine className="absolute right-3 top-1/2 -translate-y-1/2 text-text-dim" />
          <input
            type="text"
            placeholder="חיפוש צוער..."
            className="bg-dark-bg border border-dark-border rounded-lg pr-9 pl-4 py-1.5 text-sm text-text-primary placeholder-text-dim focus:outline-none focus:border-idf-blue/50 w-48"
          />
        </div>

        <div className="flex items-center gap-1.5 bg-dark-bg border border-dark-border rounded-lg px-3 py-1.5 cursor-pointer hover:border-dark-hover">
          <span className="text-xs text-text-secondary">יחידה:</span>
          <span className="text-xs text-text-primary font-medium">פלוגה א'</span>
          <RiArrowDownSLine className="text-text-dim" />
        </div>

        <span className="text-xs text-text-dim">{hebrewDate} | {time}</span>

        <div className="relative">
          <button
            onClick={() => setShowAlerts(!showAlerts)}
            className="relative p-2 rounded-lg hover:bg-dark-hover transition-colors"
          >
            <RiNotification3Line className="text-lg text-text-secondary" />
            {activeAlerts > 0 && (
              <span className="absolute -top-0.5 -left-0.5 w-4 h-4 bg-idf-red rounded-full text-[10px] font-bold flex items-center justify-center text-white">
                {activeAlerts}
              </span>
            )}
          </button>

          {showAlerts && (
            <div className="absolute left-0 top-12 w-80 bg-dark-surface border border-dark-border rounded-xl shadow-[0_8px_32px_rgba(0,0,0,0.4)] overflow-hidden z-50">
              <div className="p-3 border-b border-dark-border">
                <h3 className="text-sm font-semibold">התראות</h3>
              </div>
              <div className="max-h-80 overflow-y-auto">
                {alerts.map(alert => (
                  <div key={alert.id} className="p-3 border-b border-dark-border hover:bg-dark-hover cursor-pointer transition-colors">
                    <div className="flex items-start gap-2">
                      <div className={`glow-dot mt-1.5 flex-shrink-0 ${
                        alert.level === 'critical' ? 'bg-idf-red shadow-[0_0_8px_rgba(255,77,106,0.5)]' :
                        alert.level === 'warning' ? 'bg-idf-orange shadow-[0_0_8px_rgba(255,181,71,0.5)]' :
                        alert.level === 'info' ? 'bg-idf-blue shadow-[0_0_8px_rgba(56,189,248,0.5)]' :
                        'bg-text-dim shadow-[0_0_8px_rgba(100,116,139,0.5)]'
                      }`} />
                      <div>
                        <p className="text-xs text-text-primary">{alert.messageHe}</p>
                        {alert.cadetId && <p className="text-[10px] text-text-dim mt-0.5">{alert.cadetId}</p>}
                        <p className="text-[10px] text-text-dim mt-0.5">{alert.timestamp}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="flex items-center gap-2 pr-4 border-r border-dark-border">
          <div className="text-left">
            <p className="text-xs font-medium text-text-primary">סא"ל דוד לוי</p>
            <p className="text-[10px] text-text-dim">קצין מנטלי</p>
          </div>
          <div className="w-8 h-8 rounded-full bg-idf-blue/20 flex items-center justify-center text-idf-blue text-xs font-bold">
            דל
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
