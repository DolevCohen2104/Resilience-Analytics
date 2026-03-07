import React from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import HelpButton from './HelpButton';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--bg)' }}>
      <Sidebar />
      <div className="mr-0 md:mr-[72px]">
        <Header />
        <main className="p-3 pt-16 md:p-6 md:pt-6">
          {children}
        </main>
      </div>
      <HelpButton />
    </div>
  );
};

export default Layout;
