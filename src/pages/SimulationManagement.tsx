import React, { useState } from 'react';
import {
  RiPlayCircleLine, RiFilter3Line, RiStarFill, RiStarLine,
  RiSettings4Line, RiEyeLine, RiPulseLine, RiGamepadLine,
  RiGitBranchLine, RiSignalTowerLine
} from 'react-icons/ri';
import { scenarios, sectorLabels } from '../data/mockData';
import InfoTip from '../components/InfoTip';
import type { Sector } from '../data/mockData';

const SimulationManagement: React.FC = () => {
  const [activeSection, setActiveSection] = useState<'scenarios' | 'tree' | 'live'>('scenarios');
  const [filterSector, setFilterSector] = useState<Sector | 'all'>('all');
  const [filterDifficulty, setFilterDifficulty] = useState<number | null>(null);

  const filteredScenarios = scenarios.filter(s => {
    if (filterSector !== 'all' && s.sector !== filterSector) return false;
    if (filterDifficulty && s.difficulty !== filterDifficulty) return false;
    return true;
  });

  const Stars = ({ count }: { count: number }) => (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map(i => (
        i <= count
          ? <RiStarFill key={i} className="text-idf-orange text-sm" />
          : <RiStarLine key={i} className="text-sm" style={{ color: 'var(--border)' }} />
      ))}
    </div>
  );

  const sectionTabs = [
    { id: 'scenarios', label: 'בחירת תרחיש', icon: RiGamepadLine },
    { id: 'tree', label: 'עורך עץ החלטות', icon: RiGitBranchLine },
    { id: 'live', label: 'ניטור חי', icon: RiSignalTowerLine },
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">ניהול סימולציות</h1>
      </div>

      {/* Section Tabs */}
      <div className="flex gap-2 mb-6">
        {sectionTabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveSection(tab.id as any)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-base font-medium transition-all ${
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

      {activeSection === 'scenarios' && (
        <>
          {/* Filters */}
          <div className="flex items-center gap-3 mb-6">
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
          </div>

          {/* Scenario Grid */}
          <div className="grid grid-cols-3 gap-4">
            {filteredScenarios.map(scenario => (
              <div key={scenario.id} className="stat-card group">
                {/* Thumbnail placeholder */}
                <div className="h-32 rounded-lg mb-4 flex items-center justify-center border" style={{ background: 'linear-gradient(to bottom right, var(--bg), var(--hover))', borderColor: 'var(--border)' }}>
                  <RiGamepadLine className="text-3xl" style={{ color: 'var(--text-dim)', opacity: 0.3 }} />
                </div>

                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="text-base font-semibold">{scenario.nameHe}</h3>
                    <p className="text-xs" style={{ color: 'var(--text-dim)' }}>{scenario.name}</p>
                  </div>
                  <span className={`badge badge-${scenario.sector}`}>{sectorLabels[scenario.sector]}</span>
                </div>

                <div className="flex items-center gap-3 mb-3">
                  <Stars count={scenario.difficulty} />
                  <span className="text-sm" style={{ color: 'var(--text-dim)' }}>{scenario.avgDuration}</span>
                </div>

                <div className="flex items-center justify-between text-sm mb-4" style={{ color: 'var(--text-dim)' }}>
                  <span>{scenario.completedBy} צוערים השלימו</span>
                  <span>ממוצע: <strong className="font-mono" style={{ color: 'var(--text-primary)' }}>{scenario.avgPerformance}%</strong></span>
                </div>

                <button className="w-full flex items-center justify-center gap-2 bg-idf-blue/10 text-idf-blue border border-idf-blue/20 rounded-lg py-2 text-sm font-medium hover:bg-idf-blue/20 transition-colors">
                  <RiPlayCircleLine /> השקת סימולציה
                </button>
              </div>
            ))}
          </div>
        </>
      )}

      {activeSection === 'tree' && (
        <div className="rounded-[14px] p-6" style={{ backgroundColor: 'var(--surface)', borderWidth: 1, borderStyle: 'solid', borderColor: 'var(--border)' }}>
          <div className="flex items-center gap-2 mb-6">
            <h2 className="text-lg font-semibold">עורך עץ החלטות - היתקלות בשטח בנוי</h2>
            <InfoTip text="עץ החלטות המציג את נקודות ההחלטה והתוצאות האפשריות בכל תרחיש" />
          </div>

          {/* Decision Tree Visualization */}
          <div className="relative min-h-[400px]">
            {/* Nodes */}
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

            {/* Connection lines (simplified) */}
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

      {activeSection === 'live' && (
        <div className="grid grid-cols-5 gap-4">
          {/* Simulation Viewport */}
          <div className="col-span-3 rounded-[14px] p-4" style={{ backgroundColor: 'var(--surface)', borderWidth: 1, borderStyle: 'solid', borderColor: 'var(--border)' }}>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <h2 className="text-base font-semibold">שידור חי - היתקלות בשטח בנוי</h2>
                <InfoTip text="ניטור סימולציה בזמן אמת - מעקב אחר מדדים ביומטריים וביצועים" />
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
          <div className="col-span-2 space-y-3">
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

            <button className="w-full bg-idf-red/10 text-idf-red border border-idf-red/20 rounded-xl py-3 text-base font-semibold hover:bg-idf-red/20 transition-colors">
              Manual Override - עצירה ידנית
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SimulationManagement;
