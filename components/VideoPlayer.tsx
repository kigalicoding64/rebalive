
import React, { useState } from 'react';

interface VideoPlayerProps {
  item: any;
  onClose: () => void;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ item, onClose }) => {
  const [isLowData, setIsLowData] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);

  return (
    <div className="fixed inset-0 z-[200] bg-black flex flex-col">
      {/* Top Controls */}
      <div className="absolute top-0 left-0 right-0 p-6 flex items-center justify-between bg-gradient-to-b from-black/80 to-transparent z-10">
        <div className="flex items-center space-x-4">
          <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"/></svg>
          </button>
          <div>
            <h2 className="text-xl font-black">{item.title}</h2>
            <p className="text-xs text-neutral-400">{item.creator} • {isLowData ? 'Low Data (360p)' : 'High Quality (1080p)'}</p>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <button 
            onClick={() => setIsLowData(!isLowData)}
            className={`px-3 py-1 rounded-full text-[10px] font-black border transition-all ${isLowData ? 'bg-amber-500 text-black border-amber-500' : 'bg-transparent text-white border-white/20'}`}
          >
            DATA SAVER: {isLowData ? 'ON' : 'OFF'}
          </button>
          <button className="p-2 hover:bg-white/10 rounded-full">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"/></svg>
          </button>
        </div>
      </div>

      {/* Main Video Area */}
      <div className="flex-grow flex items-center justify-center relative group">
        <img src={item.thumbnail} alt="" className="max-w-full max-h-full object-contain opacity-80" />
        
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
          <button onClick={() => setIsPlaying(!isPlaying)} className="w-24 h-24 bg-red-600 rounded-full flex items-center justify-center shadow-2xl">
            {isPlaying ? (
              <svg className="w-10 h-10" fill="white" viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>
            ) : (
              <svg className="w-10 h-10 ml-1.5" fill="white" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
            )}
          </button>
        </div>
      </div>

      {/* Bottom Progress & Controls */}
      <div className="p-8 space-y-4 bg-gradient-to-t from-black to-transparent">
        <div className="relative w-full h-1 bg-neutral-700 rounded-full overflow-hidden group cursor-pointer">
          <div className="absolute top-0 left-0 h-full bg-red-600 w-1/3 group-hover:bg-red-500"></div>
          <div className="absolute top-0 left-[33%] w-3 h-3 bg-white rounded-full -mt-1 shadow-lg opacity-0 group-hover:opacity-100"></div>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <button className="hover:text-red-500 transition-colors"><svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M11 18V6l-8.5 6 8.5 6zm.5-6l8.5 6V6l-8.5 6z"/></svg></button>
            <button onClick={() => setIsPlaying(!isPlaying)}>{isPlaying ? <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg> : <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>}</button>
            <button className="hover:text-red-500 transition-colors"><svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M13 6v12l8.5-6L13 6zM4 18l8.5-6L4 6v12z"/></svg></button>
            <div className="text-xs font-mono text-neutral-400">12:45 / 42:10</div>
          </div>
          <div className="flex items-center space-x-6">
            <button className="hover:text-red-500 transition-colors">CC</button>
            <button className="hover:text-red-500 transition-colors"><svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"/></svg></button>
            <button className="hover:text-red-500 transition-colors"><svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m4 0l-5-5m11 5l-5-5m5 5v-4m0 4h-4"/></svg></button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;
