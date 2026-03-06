import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { RiPlayCircleLine, RiDownloadLine, RiEditLine } from 'react-icons/ri';
import { cadets, sectorLabels } from '../data/mockData';
import OverviewTab from './cadet-profile/OverviewTab';
import BioAdaptiveTab from './cadet-profile/BioAdaptiveTab';
import ScenarioTab from './cadet-profile/ScenarioTab';
import CapabilitiesTab from './cadet-profile/CapabilitiesTab';
import ProgressTab from './cadet-profile/ProgressTab';
import InsightsTab from './cadet-profile/InsightsTab';

const tabs = [
  { id: 'overview', label: 'סקירה כללית' },
  { id: 'bio', label: 'ניתוח ביו-אדפטיבי' },
  { id: 'scenarios', label: 'ניתוח תרחישים' },
  { id: 'capabilities', label: 'שלושת הכושרים' },
  { id: 'progress', label: 'מגמת שיפור' },
  { id: 'insights', label: 'תובנות והערות' },
];

const CadetProfile: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [activeTab, setActiveTab] = useState('overview');

  const cadet = cadets.find(c => c.id === id) || cadets[0];

  const scoreColor =
    cadet.resilienceScore < 40 ? '#FF4D6A' :
    cadet.resilienceScore < 60 ? '#FFB547' :
    cadet.resilienceScore < 80 ? '#00E5A0' : '#38BDF8';

  return (
    <div>
      {/* Profile Header */}
      <div className="bg-dark-surface border border-dark-border rounded-[14px] p-6 mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-6">
            {/* Score Ring */}
            <div className="relative w-20 h-20">
              <svg className="w-20 h-20 -rotate-90" viewBox="0 0 80 80">
                <circle cx="40" cy="40" r="35" fill="none" stroke="#1E293B" strokeWidth="4" />
                <circle
                  cx="40" cy="40" r="35" fill="none"
                  stroke={scoreColor} strokeWidth="4" strokeLinecap="round"
                  strokeDasharray={`${(cadet.resilienceScore / 100) * 220} 220`}
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-xl font-bold font-mono" style={{ color: scoreColor }}>
                  {cadet.resilienceScore}
                </span>
              </div>
            </div>

            <div>
              <div className="flex items-center gap-3 mb-1">
                <h1 className="text-xl font-bold">{cadet.id}</h1>
                <span className="text-sm text-text-dim font-mono">{cadet.alias}</span>
                <span className={`badge badge-${cadet.sector}`}>{sectorLabels[cadet.sector]}</span>
                <span className={`badge ${
                  cadet.status === 'active' ? 'bg-idf-green/[0.13] text-idf-green border-idf-green/20' :
                  cadet.status === 'suspended' ? 'bg-idf-orange/[0.13] text-idf-orange border-idf-orange/20' :
                  'bg-text-dim/[0.13] text-text-dim border-text-dim/20'
                }`}>
                  {cadet.status === 'active' ? 'פעיל' : cadet.status === 'suspended' ? 'מושעה' : 'הושלם'}
                </span>
              </div>
              <div className="flex items-center gap-4 text-xs text-text-secondary">
                <span>מפגשים: <strong className="font-mono text-text-primary">{cadet.totalSessions}</strong></span>
                <span>מפגש אחרון: <strong className="font-mono text-text-primary">{cadet.lastSessionDate}</strong></span>
              </div>
            </div>
          </div>

          <div className="flex gap-2">
            <button className="flex items-center gap-2 bg-idf-blue/10 text-idf-blue border border-idf-blue/20 rounded-lg px-4 py-2 text-xs font-medium hover:bg-idf-blue/20 transition-colors">
              <RiPlayCircleLine /> התחל סימולציה
            </button>
            <button className="flex items-center gap-2 bg-dark-bg border border-dark-border rounded-lg px-4 py-2 text-xs text-text-secondary hover:border-idf-blue/50 transition-colors">
              <RiDownloadLine /> ייצוא דוח
            </button>
            <button className="flex items-center gap-2 bg-dark-bg border border-dark-border rounded-lg px-4 py-2 text-xs text-text-secondary hover:border-idf-blue/50 transition-colors">
              <RiEditLine /> הוספת הערה
            </button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 border-b border-dark-border mb-6">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`tab-btn ${activeTab === tab.id ? 'active' : ''}`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {activeTab === 'overview' && <OverviewTab cadet={cadet} />}
      {activeTab === 'bio' && <BioAdaptiveTab cadet={cadet} />}
      {activeTab === 'scenarios' && <ScenarioTab />}
      {activeTab === 'capabilities' && <CapabilitiesTab cadet={cadet} />}
      {activeTab === 'progress' && <ProgressTab cadet={cadet} />}
      {activeTab === 'insights' && <InsightsTab />}
    </div>
  );
};

export default CadetProfile;
