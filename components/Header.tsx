
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-white/10 hidden md:block">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center space-x-8">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-red-600 to-amber-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xs">RL</span>
            </div>
            <span className="text-xl font-bold tracking-tight">RebaLive <span className="text-red-500">RW</span></span>
          </div>

          <nav className="hidden lg:flex items-center space-x-6 text-sm font-medium text-neutral-400">
            <a href="#" className="hover:text-white transition-colors">Home</a>
            <a href="#" className="hover:text-white transition-colors">Movies</a>
            <a href="#" className="hover:text-white transition-colors">Music</a>
            <a href="#" className="hover:text-white transition-colors">News</a>
            <a href="#" className="hover:text-white transition-colors">Live</a>
          </nav>
        </div>

        <div className="flex items-center space-x-4">
          <div className="relative group">
            <input 
              type="text" 
              placeholder="Search in Kinyarwanda..." 
              className="bg-neutral-900 border border-neutral-800 rounded-full py-1.5 px-4 pl-10 text-sm focus:outline-none focus:ring-1 focus:ring-red-500 w-64 transition-all"
            />
            <svg className="w-4 h-4 absolute left-3 top-2.5 text-neutral-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
          </div>

          <div className="flex items-center space-x-2 bg-neutral-900 px-3 py-1 rounded-full border border-neutral-800">
            <span className="text-amber-500 font-bold text-xs">1,250</span>
            <span className="text-[10px] text-neutral-500 uppercase tracking-widest font-bold">Credits</span>
          </div>

          <button className="w-8 h-8 rounded-full overflow-hidden border-2 border-red-500">
            <img src="https://picsum.photos/seed/user1/100/100" alt="Profile" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
