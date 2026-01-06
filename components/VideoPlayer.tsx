
import React, { useState, useRef, useEffect } from 'react';

interface VideoPlayerProps {
  item: any;
  onClose: () => void;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ item, onClose }) => {
  const [isLowData, setIsLowData] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      if (isPlaying) videoRef.current.play().catch(() => {});
      else videoRef.current.pause();
    }
  }, [isPlaying]);

  const togglePlay = () => setIsPlaying(!isPlaying);

  return (
    <div className="fixed inset-0 z-[200] bg-black flex flex-col animate-in fade-in duration-300">
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
        </div>
      </div>

      {/* Main Video Area */}
      <div className="flex-grow flex items-center justify-center relative group bg-black" onClick={togglePlay}>
        {item.url ? (
          <video 
            ref={videoRef}
            src={item.url}
            className="w-full h-full max-h-screen object-contain"
            autoPlay
            playsInline
            onEnded={() => setIsPlaying(false)}
          />
        ) : (
          <div className="flex flex-col items-center space-y-4">
            <img src={item.thumbnail} alt="" className="max-w-full max-h-full object-contain opacity-50" />
            <p className="text-neutral-500 font-bold uppercase tracking-widest text-xs">Video Stream Missing</p>
          </div>
        )}
        
        <div className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${isPlaying ? 'opacity-0 group-hover:opacity-100' : 'opacity-100'}`}>
          <button className="w-24 h-24 bg-red-600 rounded-full flex items-center justify-center shadow-2xl">
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
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <button onClick={togglePlay}>
              {isPlaying ? <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg> : <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>}
            </button>
            <div className="text-xs font-mono text-neutral-400">Stream Status: Live</div>
          </div>
          <div className="flex items-center space-x-6">
            <button className="hover:text-red-500 transition-colors">CC</button>
            <button className="hover:text-red-500 transition-colors"><svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728"/></svg></button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;
