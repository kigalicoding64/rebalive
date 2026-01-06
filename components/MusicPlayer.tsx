
import React, { useState } from 'react';

const MusicPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className="fixed bottom-20 md:bottom-4 left-4 right-4 md:left-auto md:right-32 z-50 animate-in slide-in-from-bottom-10 duration-500">
      <div className="bg-neutral-900/90 backdrop-blur-xl border border-white/10 p-3 rounded-2xl shadow-2xl flex items-center space-x-4 w-full md:w-80">
        <div className="w-12 h-12 bg-neutral-800 rounded-lg overflow-hidden flex-shrink-0 relative group">
          <img src="https://images.unsplash.com/photo-1493225255756-d9584f8606e9?q=80&w=100&auto=format&fit=crop" className="w-full h-full object-cover" alt="" />
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <svg className="w-4 h-4" fill="white" viewBox="0 0 24 24"><path d="M12 21l-8.228-14h16.456l-8.228 14z"/></svg>
          </div>
        </div>
        
        <div className="flex-grow min-w-0">
          <h4 className="text-xs font-bold truncate">Icyirere (Remix)</h4>
          <p className="text-[10px] text-neutral-500 truncate">Knowles ft. Ish Kevin</p>
        </div>

        <div className="flex items-center space-x-3 pr-2">
          <button className="text-neutral-400 hover:text-white transition-colors">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M6 18V6l12 6-12 6z"/></svg>
          </button>
          <button 
            onClick={() => setIsPlaying(!isPlaying)}
            className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center text-white shadow-lg shadow-red-600/20"
          >
            {isPlaying ? (
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>
            ) : (
              <svg className="w-4 h-4 ml-0.5" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default MusicPlayer;
