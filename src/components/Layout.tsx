import React from 'react';
import Sidebar from './Sidebar';
import Header from './Header';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-dark-bg">
      <Sidebar />
      <div className="mr-[72px]">
        <Header />
        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
