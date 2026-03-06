import React, { useState } from 'react';
import {
  RiWifiLine, RiWifiOffLine, RiShieldUserLine,
  RiServerLine, RiSettings4Line
} from 'react-icons/ri';
import { thresholdSettings, sensorStatus, roles } from '../data/mockData';
import InfoTip from '../components/InfoTip';

const settingsTabs = [
  { id: 'sensors', label: 'כיול חיישנים' },
  { id: 'thresholds', label: 'ספי התראות' },
  { id: 'permissions', label: 'הרשאות' },
  { id: 'integrations', label: 'אינטגרציות' },
];

const SystemSettings: React.FC = () => {
  const [activeTab, setActiveTab] = useState('sensors');

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">הגדרות מערכת</h1>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 mb-6" style={{ borderBottomWidth: 1, borderBottomStyle: 'solid', borderBottomColor: 'var(--border)' }}>
        {settingsTabs.map(tab => (
          <button key={tab.id} onClick={() => setActiveTab(tab.id)}
            className={`tab-btn ${activeTab === tab.id ? 'active' : ''}`}>{tab.label}</button>
        ))}
      </div>

      {/* Sensor Calibration */}
      {activeTab === 'sensors' && (
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            {sensorStatus.map(sensor => (
              <div key={sensor.name} className={`stat-card ${sensor.status === 'malfunction' ? 'border-idf-red/30' : ''}`}>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    {sensor.status === 'connected' ? (
                      <div className="w-10 h-10 rounded-xl bg-idf-green/10 flex items-center justify-center">
                        <RiWifiLine className="text-xl text-idf-green" />
                      </div>
                    ) : (
                      <div className="w-10 h-10 rounded-xl bg-idf-red/10 flex items-center justify-center">
                        <RiWifiOffLine className="text-xl text-idf-red" />
                      </div>
                    )}
                    <div>
                      <h3 className="text-base font-semibold">{sensor.nameHe}</h3>
                      <p className="text-xs" style={{ color: 'var(--text-dim)' }}>{sensor.name}</p>
                    </div>
                  </div>
                  <span className={`badge ${
                    sensor.status === 'connected'
                      ? 'bg-idf-green/[0.13] text-idf-green border-idf-green/20'
                      : 'bg-idf-red/[0.13] text-idf-red border-idf-red/20'
                  }`}>
                    {sensor.status === 'connected' ? 'מחובר' : 'תקלה'}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded-lg p-3" style={{ backgroundColor: 'var(--bg)' }}>
                    <p className="text-xs" style={{ color: 'var(--text-dim)' }}>כיול אחרון</p>
                    <p className="text-sm font-mono font-medium">{sensor.lastCalibration}</p>
                  </div>
                  <div className="rounded-lg p-3" style={{ backgroundColor: 'var(--bg)' }}>
                    <p className="text-xs" style={{ color: 'var(--text-dim)' }}>דיוק</p>
                    <p className={`text-sm font-mono font-bold ${sensor.accuracy > 90 ? 'text-idf-green' : sensor.accuracy > 0 ? 'text-idf-orange' : 'text-idf-red'}`}>
                      {sensor.accuracy > 0 ? `${sensor.accuracy}%` : 'N/A'}
                    </p>
                  </div>
                </div>
                <div className="flex gap-2 mt-4">
                  <button className="flex-1 flex items-center justify-center gap-1 rounded-lg py-2 text-sm border transition-colors hover:border-idf-blue/50" style={{ backgroundColor: 'var(--bg)', borderColor: 'var(--border)', color: 'var(--text-secondary)' }}>
                    בדיקת חיבור
                  </button>
                  <button className="flex-1 flex items-center justify-center gap-1 bg-idf-blue/10 text-idf-blue border border-idf-blue/20 rounded-lg py-2 text-sm font-medium hover:bg-idf-blue/20 transition-colors">
                    כיול מחדש
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Alert Thresholds */}
      {activeTab === 'thresholds' && (
        <div className="rounded-[14px] p-5" style={{ backgroundColor: 'var(--surface)', borderWidth: 1, borderStyle: 'solid', borderColor: 'var(--border)' }}>
          <div className="flex items-center gap-2 mb-4">
            <h2 className="text-lg font-semibold">הגדרת ספי התראות</h2>
            <InfoTip text="הגדרת ספי התראה - קביעת ערכי סף להתראות אוטומטיות על מצב חוסן" />
          </div>
          <table className="w-full text-right">
            <thead>
              <tr style={{ backgroundColor: 'var(--hover)' }}>
                <th className="px-4 py-2.5 text-sm font-semibold" style={{ color: 'var(--text-secondary)' }}>מדד</th>
                <th className="px-4 py-2.5 text-sm font-semibold" style={{ color: 'var(--text-secondary)' }}>יחידה</th>
                <th className="px-4 py-2.5 text-sm font-semibold" style={{ color: 'var(--text-secondary)' }}>אזהרה (צהוב)</th>
                <th className="px-4 py-2.5 text-sm font-semibold" style={{ color: 'var(--text-secondary)' }}>קריטי (אדום)</th>
                <th className="px-4 py-2.5 text-sm font-semibold" style={{ color: 'var(--text-secondary)' }}>פעולה</th>
              </tr>
            </thead>
            <tbody>
              {thresholdSettings.map((setting, i) => (
                <tr key={setting.metric} style={{
                  borderBottomWidth: 1, borderBottomStyle: 'solid', borderBottomColor: 'var(--border)',
                  backgroundColor: i % 2 === 1 ? 'var(--zebra)' : undefined,
                }}>
                  <td className="px-4 py-3 text-base font-medium">{setting.metricHe}</td>
                  <td className="px-4 py-3 text-base font-mono" style={{ color: 'var(--text-dim)' }}>{setting.unit}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <input
                        type="range"
                        min="0"
                        max="100"
                        defaultValue={setting.warningValue}
                        className="w-20 accent-idf-orange"
                      />
                      <span className="text-base font-mono text-idf-orange w-12">{setting.warningValue}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <input
                        type="range"
                        min="0"
                        max="100"
                        defaultValue={setting.criticalValue}
                        className="w-20 accent-idf-red"
                      />
                      <span className="text-base font-mono text-idf-red w-12">{setting.criticalValue}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm" style={{ color: 'var(--text-secondary)' }}>{setting.actionHe}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex justify-end mt-4">
            <button className="bg-idf-blue/10 text-idf-blue border border-idf-blue/20 rounded-lg px-6 py-2 text-base font-medium hover:bg-idf-blue/20 transition-colors">
              שמירת שינויים
            </button>
          </div>
        </div>
      )}

      {/* Permissions */}
      {activeTab === 'permissions' && (
        <div className="rounded-[14px] p-5" style={{ backgroundColor: 'var(--surface)', borderWidth: 1, borderStyle: 'solid', borderColor: 'var(--border)' }}>
          <div className="flex items-center gap-2 mb-4">
            <RiShieldUserLine className="text-idf-purple text-lg" />
            <h2 className="text-lg font-semibold">מטריצת הרשאות (RBAC)</h2>
            <InfoTip text="ניהול הרשאות - הגדרת תפקידים ורמות גישה למשתמשי המערכת" />
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-right">
              <thead>
                <tr style={{ backgroundColor: 'var(--hover)' }}>
                  <th className="px-4 py-2.5 text-sm font-semibold" style={{ color: 'var(--text-secondary)' }}>תפקיד</th>
                  <th className="px-4 py-2.5 text-sm font-semibold" style={{ color: 'var(--text-secondary)' }}>לוח מחוונים</th>
                  <th className="px-4 py-2.5 text-sm font-semibold" style={{ color: 'var(--text-secondary)' }}>פרופיל צוער</th>
                  <th className="px-4 py-2.5 text-sm font-semibold" style={{ color: 'var(--text-secondary)' }}>סימולציות</th>
                  <th className="px-4 py-2.5 text-sm font-semibold" style={{ color: 'var(--text-secondary)' }}>אנליטיקס</th>
                  <th className="px-4 py-2.5 text-sm font-semibold" style={{ color: 'var(--text-secondary)' }}>הגדרות</th>
                </tr>
              </thead>
              <tbody>
                {roles.map((role, i) => (
                  <tr key={role.role} style={{
                    borderBottomWidth: 1, borderBottomStyle: 'solid', borderBottomColor: 'var(--border)',
                    backgroundColor: i % 2 === 1 ? 'var(--zebra)' : undefined,
                  }}>
                    <td className="px-4 py-3">
                      <div className="text-base font-medium">{role.roleHe}</div>
                      <div className="text-xs" style={{ color: 'var(--text-dim)' }}>{role.role}</div>
                    </td>
                    {[role.dashboard, role.cadetProfile, role.simulations, role.analytics, role.settings].map((perm, j) => (
                      <td key={j} className="px-4 py-3">
                        {perm === 'full' ? (
                          <span className="badge bg-idf-green/[0.13] text-idf-green border-idf-green/20">מלא</span>
                        ) : perm === 'none' ? (
                          <span className="badge bg-text-dim/[0.13] text-text-dim border-text-dim/20">--</span>
                        ) : (
                          <span className="badge bg-idf-blue/[0.13] text-idf-blue border-idf-blue/20 text-xs">{perm}</span>
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Integrations */}
      {activeTab === 'integrations' && (
        <div className="space-y-4">
          {[
            {
              icon: RiServerLine, title: 'Unreal Engine 5', titleHe: 'מנוע סימולציה',
              fields: [
                { label: 'כתובת IP', value: '192.168.1.100' },
                { label: 'פורט', value: '8888' },
                { label: 'גרסה', value: 'UE5.4' },
              ],
              status: 'connected' as const,
            },
            {
              icon: RiSettings4Line, title: 'Data Export API', titleHe: 'ייצוא נתונים',
              fields: [
                { label: 'Endpoint', value: '/api/v1/export' },
                { label: 'פרוטוקול', value: 'REST/HTTPS' },
                { label: 'מפתח API', value: '****-****-****-7A3F' },
              ],
              status: 'connected' as const,
            },
            {
              icon: RiServerLine, title: 'Backup Service', titleHe: 'גיבוי',
              fields: [
                { label: 'גיבוי אחרון', value: '2026-03-06 02:00' },
                { label: 'תדירות', value: 'יומי' },
                { label: 'נפח', value: '2.4 GB' },
              ],
              status: 'connected' as const,
            },
          ].map(integration => (
            <div key={integration.title} className="stat-card">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-idf-blue/10 flex items-center justify-center">
                    <integration.icon className="text-xl text-idf-blue" />
                  </div>
                  <div>
                    <h3 className="text-base font-semibold">{integration.titleHe}</h3>
                    <p className="text-xs" style={{ color: 'var(--text-dim)' }}>{integration.title}</p>
                  </div>
                </div>
                <span className="badge bg-idf-green/[0.13] text-idf-green border-idf-green/20">מחובר</span>
              </div>
              <div className="grid grid-cols-3 gap-3">
                {integration.fields.map(f => (
                  <div key={f.label} className="rounded-lg p-3" style={{ backgroundColor: 'var(--bg)' }}>
                    <p className="text-xs" style={{ color: 'var(--text-dim)' }}>{f.label}</p>
                    <p className="text-sm font-mono font-medium" style={{ color: 'var(--text-primary)' }}>{f.value}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SystemSettings;
