
import React from 'react';
import Header from './Header';
import BottomNav from './BottomNav';
import KeroAssistant from './KeroAssistant';

interface LayoutProps {
  children: React.ReactNode;
  activeTab: string;
  onTabChange: (tab: string) => void;
  theme?: 'dark' | 'light';
}

const Layout: React.FC<LayoutProps> = ({ children, activeTab, onTabChange, theme = 'dark' }) => {
  return (
    <div className={`flex flex-col min-h-screen transition-colors duration-500 ${
      theme === 'dark' ? 'bg-[#050505] text-white' : 'bg-neutral-50 text-neutral-900'
    } pb-20 md:pb-0 md:pt-16`}>
      <Header onTabChange={onTabChange} theme={theme} />
      
      <main className="flex-grow overflow-x-hidden">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          {children}
        </div>
      </main>

      {/* Removed prop-less MusicPlayer to fix TS error. Global player is managed in App.tsx */}
      <BottomNav activeTab={activeTab} onTabChange={onTabChange} theme={theme} />
      <KeroAssistant />
    </div>
  );
};

export default Layout;
