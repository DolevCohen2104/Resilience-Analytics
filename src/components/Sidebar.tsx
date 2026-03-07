import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import {
  RiDashboardLine,
  RiUserLine,
  RiFileListLine,
  RiGamepadLine,
  RiBarChartBoxLine,
  RiShieldStarLine,
  RiSettings4Line,
  RiMenuLine,
  RiCloseLine
} from 'react-icons/ri';

const navItems = [
  { to: '/', icon: RiDashboardLine, label: 'Command Dashboard', labelHe: 'לוח מפקד' },
  { to: '/cadet/C-7721', icon: RiUserLine, label: 'Cadet Profile', labelHe: 'פרופיל צוער' },
  { to: '/simulation-summary', icon: RiFileListLine, label: 'Simulation Summary', labelHe: 'סיכום סימולציה' },
  { to: '/simulation-management', icon: RiGamepadLine, label: 'Simulation Mgmt', labelHe: 'ניהול סימולציות' },
  { to: '/analytics', icon: RiBarChartBoxLine, label: 'Advanced Analytics', labelHe: 'אנליטיקס מתקדם' },
  { to: '/commander', icon: RiShieldStarLine, label: 'Commander View', labelHe: 'תצוגת מפקד' },
  { to: '/settings', icon: RiSettings4Line, label: 'System Settings', labelHe: 'הגדרות מערכת' },
];

const Sidebar: React.FC = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      {/* Mobile hamburger button */}
      <button
        onClick={() => setMobileOpen(true)}
        className="fixed top-4 right-4 z-[60] md:hidden w-10 h-10 rounded-xl flex items-center justify-center shadow-lg"
        style={{ backgroundColor: 'var(--surface)', border: '1px solid var(--border)' }}
      >
        <RiMenuLine className="text-xl" style={{ color: 'var(--text-primary)' }} />
      </button>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-[70] md:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar - desktop: fixed narrow with hover expand, mobile: full overlay */}
      <aside
        className={`
          fixed right-0 top-0 h-screen border-l flex flex-col items-center py-6 z-[80] overflow-hidden transition-all duration-300
          md:w-[72px] md:hover:w-[220px] md:translate-x-0
          w-[260px] ${mobileOpen ? 'translate-x-0' : 'translate-x-full'}
        `}
        style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)' }}
      >
        {/* Mobile close button */}
        <button
          onClick={() => setMobileOpen(false)}
          className="absolute top-4 left-4 md:hidden w-8 h-8 rounded-lg flex items-center justify-center"
          style={{ color: 'var(--text-secondary)' }}
        >
          <RiCloseLine className="text-xl" />
        </button>

        <div className="mb-8 flex items-center justify-center w-full">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-idf-blue to-idf-green flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
            RC
          </div>
          <span className="text-sm font-semibold mr-3 md:opacity-0 md:group-hover:opacity-100 opacity-100 transition-opacity duration-300 whitespace-nowrap" style={{ color: 'var(--text-primary)' }}>
            Resilience Center
          </span>
        </div>

        <nav className="flex flex-col gap-1 w-full px-2 flex-1 group">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={() => setMobileOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 ${
                  isActive
                    ? 'bg-idf-blue/10 text-idf-blue'
                    : ''
                }`
              }
              style={({ isActive }) => isActive ? {} : { color: 'var(--text-secondary)' }}
            >
              <item.icon className="text-xl flex-shrink-0" />
              <span className="text-sm font-medium md:opacity-0 md:group-hover:opacity-100 opacity-100 transition-opacity duration-300 whitespace-nowrap">
                {item.labelHe}
              </span>
            </NavLink>
          ))}
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
