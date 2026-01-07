import React, { useState, useRef, useEffect, useCallback } from 'react';
import { ContentItem } from '../types';

interface MusicPlayerProps {
  track: ContentItem;
  onClose: () => void;
}

const MusicPlayer: React.FC<MusicPlayerProps> = ({ track, onClose }) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(0.8);
  const [isExpanded, setIsExpanded] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  // Sync play state
  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch(() => setIsPlaying(false));
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, track]);

  const togglePlay = useCallback(() => setIsPlaying(prev => !prev), []);

  const onTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const onLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value);
    setCurrentTime(time);
    if (audioRef.current) {
      audioRef.current.currentTime = time;
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const vol = parseFloat(e.target.value);
    setVolume(vol);
    if (audioRef.current) {
      audioRef.current.volume = vol;
    }
  };

  const formatTime = (time: number) => {
    const mins = Math.floor(time / 60);
    const secs = Math.floor(time % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className={`fixed bottom-24 md:bottom-8 left-4 right-4 md:left-auto md:right-8 z-[100] transition-all duration-500 transform ${
      isExpanded ? 'md:w-96' : 'md:w-[450px]'
    }`}>
      <audio 
        ref={audioRef}
        src={track.url}
        onTimeUpdate={onTimeUpdate}
        onLoadedMetadata={onLoadedMetadata}
        onEnded={() => setIsPlaying(false)}
      />

      <div className={`bg-black/90 dark:bg-neutral-900/95 backdrop-blur-3xl border border-white/10 rounded-[2.5rem] shadow-[0_30px_100px_rgba(0,0,0,0.8)] overflow-hidden transition-all duration-500 ${
        isExpanded ? 'p-8' : 'p-3'
      }`}>
        {isExpanded ? (
          /* EXPANDED VIEW */
          <div className="flex flex-col space-y-6 animate-in fade-in zoom-in-95 duration-500">
            <div className="flex justify-between items-start">
               <button onClick={() => setIsExpanded(false)} className="p-2 text-neutral-500 hover:text-white transition-colors">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7"/></svg>
               </button>
               <button onClick={onClose} className="p-2 text-neutral-500 hover:text-red-500 transition-colors">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12"/></svg>
               </button>
            </div>

            <div className="aspect-square w-full rounded-[2.5rem] overflow-hidden shadow-2xl relative group">
              <img src={track.thumbnail} className={`w-full h-full object-cover transition-all duration-[3000ms] ${isPlaying ? 'scale-110' : 'scale-100'}`} alt="" />
              <div className={`absolute inset-0 bg-black/20 ${isPlaying ? 'animate-pulse' : ''}`}></div>
            </div>

            <div className="space-y-1 text-center">
              <h3 className="text-2xl font-black tracking-tight line-clamp-1">{track.title}</h3>
              <p className="text-red-500 font-black text-xs uppercase tracking-[0.3em]">{track.creator}</p>
            </div>

            <div className="space-y-2">
              <input 
                type="range"
                min="0"
                max={duration || 0}
                value={currentTime}
                onChange={handleSeek}
                className="w-full h-1.5 bg-neutral-800 rounded-full appearance-none cursor-pointer accent-red-600"
              />
              <div className="flex justify-between text-[10px] font-black text-neutral-500 tabular-nums">
                <span>{formatTime(currentTime)}</span>
                <span>{formatTime(duration)}</span>
              </div>
            </div>

            <div className="flex items-center justify-center space-x-10">
               <button className="text-neutral-500 hover:text-white transition-colors"><svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24"><path d="M6 18L14.5 12L6 6V18ZM16 6V18H18V6H16Z" className="rotate-180 origin-center"/></svg></button>
               <button onClick={togglePlay} className="w-20 h-20 bg-red-600 rounded-full flex items-center justify-center text-white shadow-xl shadow-red-600/40 transform active:scale-95 transition-all">
                  {isPlaying ? (
                    <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24"><path d="M6 19H10V5H6V14ZM14 5V19H18V5H14Z"/></svg>
                  ) : (
                    <svg className="w-8 h-8 ml-2" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5V19L19 12L8 5Z"/></svg>
                  )}
               </button>
               <button className="text-neutral-500 hover:text-white transition-colors"><svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24"><path d="M6 18L14.5 12L6 6V18ZM16 6V18H18V6H16Z"/></svg></button>
            </div>

            <div className="flex items-center space-x-4 bg-neutral-800/40 p-4 rounded-2xl">
              <svg className="w-5 h-5 text-neutral-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"/></svg>
              <input 
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={volume}
                onChange={handleVolumeChange}
                className="flex-grow h-1 bg-neutral-700 rounded-full appearance-none cursor-pointer accent-white"
              />
            </div>
          </div>
        ) : (
          /* COMPACT BAR */
          <div className="flex items-center space-x-4 px-2" onClick={() => setIsExpanded(true)}>
             <div className={`w-14 h-14 rounded-2xl overflow-hidden flex-shrink-0 shadow-lg relative ${isPlaying ? 'animate-pulse' : ''}`}>
               <img src={track.thumbnail} className="w-full h-full object-cover" alt="" />
               <div className="absolute inset-0 bg-black/10"></div>
             </div>
             
             <div className="flex-grow min-w-0 cursor-pointer">
                <h4 className="text-sm font-black truncate">{track.title}</h4>
                <p className="text-[10px] text-red-600 font-black uppercase tracking-widest truncate">{track.creator}</p>
             </div>

             <div className="flex items-center space-x-1 pr-1">
                <button 
                  onClick={(e) => { e.stopPropagation(); togglePlay(); }}
                  className="w-12 h-12 bg-red-600 rounded-2xl flex items-center justify-center text-white shadow-lg active:scale-95 transition-transform"
                >
                   {isPlaying ? (
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M6 19H10V5H6V19ZM14 5V19H18V5H14Z"/></svg>
                  ) : (
                    <svg className="w-5 h-5 ml-1" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5V19L19 12L8 5Z"/></svg>
                  )}
                </button>
                <button 
                  onClick={(e) => { e.stopPropagation(); onClose(); }}
                  className="w-10 h-10 text-neutral-600 hover:text-red-500 transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12"/></svg>
                </button>
             </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MusicPlayer;