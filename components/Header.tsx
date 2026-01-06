
import React from 'react';

interface HeaderProps {
  onTabChange: (tab: string) => void;
}

const Header: React.FC<HeaderProps> = ({ onTabChange }) => {
  return (
    <header className="fixed top-0 left-0 right-0 z-[60] bg-[#050505]/80 backdrop-blur-2xl border-b border-white/5 hidden md:block">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <div className="flex items-center space-x-12">
          <div 
            className="flex items-center space-x-3 cursor-pointer hover:opacity-80 transition-opacity"
            onClick={() => onTabChange('home')}
          >
            <div className="w-10 h-10 bg-gradient-to-br from-red-600 to-amber-500 rounded-xl flex items-center justify-center shadow-lg shadow-red-600/20">
              <span className="text-white font-black text-sm">RL</span>
            </div>
            <div>
              <span className="text-2xl font-black tracking-tighter">RebaLive<span className="text-red-600">RW</span></span>
              <p className="text-[8px] font-black uppercase tracking-[0.3em] text-neutral-500 -mt-1">Reba, Wumve, Umenye</p>
            </div>
          </div>

          <nav className="flex items-center space-x-8 text-[11px] font-black uppercase tracking-[0.2em] text-neutral-500">
            <button onClick={() => onTabChange('home')} className="hover:text-white transition-colors">Home</button>
            <button onClick={() => onTabChange('watch')} className="hover:text-white transition-colors">Movies</button>
            <button onClick={() => onTabChange('listen')} className="hover:text-white transition-colors">Music</button>
            <button onClick={() => onTabChange('read')} className="hover:text-white transition-colors">News</button>
            <button onClick={() => onTabChange('live')} className="hover:text-white transition-colors">Live</button>
          </nav>
        </div>

        <div className="flex items-center space-x-6">
          <div 
            className="relative group cursor-pointer"
            onClick={() => onTabChange('search')}
          >
            <input 
              type="text" 
              readOnly
              placeholder="Search content..." 
              className="bg-neutral-900/50 border border-white/5 rounded-2xl py-2.5 px-5 pl-12 text-xs focus:outline-none focus:ring-2 focus:ring-red-600/50 w-80 transition-all font-medium placeholder:text-neutral-600 cursor-pointer"
            />
            <svg className="w-4 h-4 absolute left-4 top-3 text-neutral-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
          </div>

          <div 
            className="flex items-center bg-neutral-900 border border-white/5 px-4 py-2 rounded-2xl space-x-3 group cursor-pointer hover:border-amber-500/30 transition-all"
            onClick={() => onTabChange('subscription')}
          >
            <div className="text-right">
              <span className="block text-xs font-black text-amber-500">2,450</span>
              <span className="block text-[8px] text-neutral-500 font-black uppercase">Credits</span>
            </div>
            <div className="w-8 h-8 bg-amber-500 rounded-lg flex items-center justify-center text-black">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/></svg>
            </div>
          </div>

          <button className="relative w-10 h-10 p-2 hover:bg-white/5 rounded-2xl transition-all">
             <svg className="w-6 h-6 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"/></svg>
             <div className="absolute top-2 right-2 w-2 h-2 bg-red-600 rounded-full border-2 border-black"></div>
          </button>

          <button 
            className="w-10 h-10 rounded-2xl overflow-hidden ring-2 ring-white/5 hover:ring-red-600 transition-all"
            onClick={() => onTabChange('profile')}
          >
            <img src="https://picsum.photos/seed/robert/100/100" alt="Profile" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
