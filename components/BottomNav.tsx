
import React from 'react';

interface BottomNavProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const BottomNav: React.FC<BottomNavProps> = ({ activeTab, onTabChange }) => {
  const tabs = [
    { id: 'home', label: 'Home', icon: (color: string) => <svg className="w-6 h-6" fill="none" stroke={color} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/></svg> },
    { id: 'watch', label: 'Watch', icon: (color: string) => <svg className="w-6 h-6" fill="none" stroke={color} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"/></svg> },
    { id: 'create', label: 'Studio', icon: (color: string) => <div className="p-1 rounded-lg bg-red-600/10"><svg className="w-6 h-6" fill="none" stroke={color} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"/></svg></div> },
    { id: 'listen', label: 'Listen', icon: (color: string) => <svg className="w-6 h-6" fill="none" stroke={color} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2z"/></svg> },
    { id: 'read', label: 'Read', icon: (color: string) => <svg className="w-6 h-6" fill="none" stroke={color} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.246.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/></svg> },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-black/95 border-t border-white/10 md:hidden flex justify-around items-center h-16 pb-2 safe-area-bottom">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={`flex flex-col items-center justify-center space-y-1 transition-all flex-1 ${
            activeTab === tab.id ? 'text-red-500 scale-105' : 'text-neutral-500'
          }`}
        >
          {tab.icon(activeTab === tab.id ? '#ef4444' : '#737373')}
          <span className="text-[9px] font-bold uppercase tracking-wider">{tab.label}</span>
        </button>
      ))}
    </nav>
  );
};

export default BottomNav;
