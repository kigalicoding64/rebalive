
import React from 'react';
import Header from './Header';
import BottomNav from './BottomNav';
import KeroAssistant from './KeroAssistant';
import MusicPlayer from './MusicPlayer';

interface LayoutProps {
  children: React.ReactNode;
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const Layout: React.FC<LayoutProps> = ({ children, activeTab, onTabChange }) => {
  return (
    <div className="flex flex-col min-h-screen bg-[#050505] text-white pb-20 md:pb-0 md:pt-16">
      <Header onTabChange={onTabChange} />
      
      <main className="flex-grow overflow-x-hidden">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          {children}
        </div>
      </main>

      <MusicPlayer />
      <BottomNav activeTab={activeTab} onTabChange={onTabChange} />
      <KeroAssistant />
    </div>
  );
};

export default Layout;
