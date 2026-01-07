
import React, { useState, useRef, useEffect, useCallback } from 'react';
import { ContentItem } from '../types';

interface VideoPlayerProps {
  item: ContentItem;
  mode: 'expanded' | 'minimized';
  onClose: () => void;
  onModeToggle: () => void;
  isOffline?: boolean;
}

type SourceType = 'direct' | 'youtube' | 'vimeo' | 'dailymotion' | 'twitch' | 'iframe';

const DynamicVideoPlayer: React.FC<VideoPlayerProps> = ({ 
  item, 
  mode, 
  onClose, 
  onModeToggle, 
  isOffline = false 
}) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isReady, setIsReady] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const hideTimerRef = useRef<number | null>(null);

  // Advanced Source Detection & Link Sanitization
  const getSourceType = (url: string = ''): { type: SourceType; embedUrl: string; videoId?: string } => {
    let targetUrl = url.trim();
    const lowUrl = targetUrl.toLowerCase();
    
    // 1. Direct Video Detection
    if (/\.(mp4|webm|m3u8|mov|m4v|ogg)$/.test(lowUrl) || lowUrl.includes('commondatastorage.googleapis.com')) {
      return { type: 'direct', embedUrl: targetUrl };
    }

    // 2. YouTube Detection
    const ytMatch = targetUrl.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/);
    if (ytMatch) {
      return { 
        type: 'youtube', 
        embedUrl: `https://www.youtube.com/embed/${ytMatch[1]}?autoplay=1&modestbranding=1&rel=0&showinfo=0&iv_load_policy=3&controls=1`,
        videoId: ytMatch[1]
      };
    }

    // 3. Vimeo Detection
    const vimeoMatch = targetUrl.match(/vimeo\.com\/(?:channels\/(?:\w+\/)?|groups\/(?:[^\/]*)\/videos\/|album\/(?:\d+)\/video\/|video\/|)(\d+)(?:$|\/|\?)/);
    if (vimeoMatch) {
      return { type: 'vimeo', embedUrl: `https://player.vimeo.com/video/${vimeoMatch[1]}?autoplay=1&badge=0&autopause=0&title=0&byline=0&portrait=0` };
    }

    // 4. Dailymotion Detection
    const dmMatch = targetUrl.match(/dailymotion\.com\/video\/([a-zA-Z0-9]+)/);
    if (dmMatch) {
        return { type: 'dailymotion', embedUrl: `https://www.dailymotion.com/embed/video/${dmMatch[1]}?autoplay=1` };
    }

    // 5. Twitch Detection
    const twitchMatch = targetUrl.match(/twitch\.tv\/([a-zA-Z0-9_]+)/);
    if (twitchMatch) {
        return { type: 'twitch', embedUrl: `https://player.twitch.tv/?channel=${twitchMatch[1]}&parent=${window.location.hostname}&autoplay=true` };
    }

    // 6. Special Handling for hglink (Force Embed Mode)
    if (lowUrl.includes('hglink.to') && !lowUrl.includes('/e/')) {
        targetUrl = targetUrl.replace('hglink.to/', 'hglink.to/e/');
    }

    // 7. Default to Iframe
    return { type: 'iframe', embedUrl: targetUrl.startsWith('http') ? targetUrl : `https://${targetUrl}` };
  };

  const { type, embedUrl, videoId } = getSourceType(item.url);
  const isExpanded = mode === 'expanded';

  // --- Handlers ---
  const togglePlay = useCallback((e?: React.MouseEvent) => {
    e?.stopPropagation();
    setIsPlaying(prev => !prev);
  }, []);

  const handleMouseMove = () => {
    setShowControls(true);
    if (hideTimerRef.current) window.clearTimeout(hideTimerRef.current);
    hideTimerRef.current = window.setTimeout(() => {
      if (isPlaying) setShowControls(false);
    }, 3000);
  };

  const handleSpeedChange = () => {
    const speeds = [1, 1.25, 1.5, 2, 0.5];
    const nextIndex = (speeds.indexOf(playbackSpeed) + 1) % speeds.length;
    setPlaybackSpeed(speeds[nextIndex]);
  };

  const togglePiP = async () => {
    if (videoRef.current && document.pictureInPictureEnabled) {
      try {
        if (document.pictureInPictureElement) {
          await document.exitPictureInPicture();
        } else {
          await videoRef.current.requestPictureInPicture();
        }
      } catch (err) {
        console.error("PiP Error:", err);
      }
    }
  };

  useEffect(() => {
    if (type === 'direct' && videoRef.current) {
      videoRef.current.playbackRate = playbackSpeed;
      if (isPlaying) videoRef.current.play().catch(() => setIsPlaying(false));
      else videoRef.current.pause();
    }
  }, [isPlaying, playbackSpeed, type]);

  return (
    <div 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className={`fixed z-[400] bg-black transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] transform flex flex-col overflow-hidden shadow-[0_0_150px_rgba(0,0,0,1)] ${
        isExpanded 
          ? 'inset-0 opacity-100 scale-100' 
          : 'bottom-8 right-8 w-80 md:w-[480px] aspect-video rounded-[2.5rem] border border-white/10 shadow-2xl'
      }`}
    >
      {/* 1. PERMANENT WATERMARK LAYER */}
      <div className="absolute top-8 right-8 z-[550] pointer-events-none select-none">
        <div className="flex flex-col items-end opacity-40 hover:opacity-100 transition-opacity">
          <span className="text-2xl font-black text-white italic tracking-tighter drop-shadow-[0_4px_20px_rgba(0,0,0,1)]">
            REBALIVE <span className="text-red-600">RW</span>
          </span>
          <span className="text-[10px] font-black uppercase text-neutral-300 tracking-[0.4em] -mt-1 drop-shadow-lg">
            Certified Content
          </span>
        </div>
      </div>

      {/* 2. CINEMATIC OVERLAY CONTROLS */}
      <div className={`absolute top-0 left-0 right-0 p-8 flex items-center justify-between bg-gradient-to-b from-black via-black/80 to-transparent z-[500] transition-all duration-700 ${isExpanded && !showControls ? 'opacity-0 -translate-y-8' : 'opacity-100 translate-y-0'}`}>
        <div className="flex items-center space-x-6">
          <button 
            onClick={onClose} 
            className="p-5 bg-black/60 hover:bg-red-600 rounded-full transition-all border border-white/10 backdrop-blur-2xl group shadow-2xl"
          >
            <svg className="w-8 h-8 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7"/></svg>
          </button>
          {isExpanded && (
            <div className="space-y-1">
              <h2 className="text-3xl font-black tracking-tighter line-clamp-1 drop-shadow-2xl">{item.title}</h2>
              <div className="flex items-center space-x-3">
                 <p className="text-xs font-black text-red-600 uppercase tracking-[0.4em] drop-shadow-lg">RebaLive RW • {item.narrator || 'Premium'}</p>
                 {isOffline && (
                   <span className="bg-green-600 text-white text-[9px] font-black px-3 py-1 rounded-full uppercase tracking-widest shadow-lg animate-pulse">Offline Playback</span>
                 )}
              </div>
            </div>
          )}
        </div>

        {isExpanded && (
          <div className="flex items-center space-x-5">
            {type === 'direct' && (
              <>
                <button 
                  onClick={handleSpeedChange}
                  className="px-6 py-3 bg-white/10 hover:bg-white/20 rounded-2xl border border-white/10 backdrop-blur-md transition-all text-xs font-black uppercase tracking-widest"
                >
                  {playbackSpeed}x Speed
                </button>
                <button 
                  onClick={togglePiP}
                  className="p-4 bg-white/10 hover:bg-white/20 rounded-2xl border border-white/10 backdrop-blur-md transition-all"
                  title="Picture-in-Picture"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h12a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"/></svg>
                </button>
              </>
            )}

            <button onClick={onModeToggle} className="p-4 bg-white/10 hover:bg-white/20 rounded-2xl border border-white/10 backdrop-blur-md transition-all">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"/></svg>
            </button>
          </div>
        )}
      </div>

      {/* 3. CORE DISPLAY ENGINE */}
      <div 
        className="flex-grow flex items-center justify-center relative bg-black overflow-hidden" 
        onClick={isExpanded ? togglePlay : onModeToggle}
      >
        {type === 'direct' ? (
          <video 
            ref={videoRef}
            src={item.url}
            className="w-full h-full object-contain"
            playsInline
            controls={isExpanded && showControls}
            onCanPlay={() => setIsReady(true)}
          />
        ) : (
          <div className="w-full h-full relative overflow-hidden bg-[#050505]">
            {/* Loading / Transition Curtain with Enhanced Thumbnail Fetching */}
            <div className={`absolute inset-0 z-10 bg-[#050505] transition-opacity duration-1000 pointer-events-none flex flex-col items-center justify-center ${isReady ? 'opacity-0' : 'opacity-100'}`}>
               {type === 'youtube' && videoId ? (
                   <img 
                    src={`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`} 
                    className="absolute inset-0 w-full h-full object-cover blur-[2px] opacity-60"
                    alt=""
                    onError={(e) => {
                       // Fallback to standard quality if maxres isn't available
                       (e.target as HTMLImageElement).src = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
                    }}
                   />
               ) : (
                   <img 
                    src={item.thumbnail} 
                    className="absolute inset-0 w-full h-full object-cover blur-[2px] opacity-60"
                    alt=""
                   />
               )}
               <div className="relative z-10 flex flex-col items-center">
                    <div className="w-24 h-24 border-4 border-white/5 border-t-red-600 rounded-full animate-spin shadow-[0_0_40px_rgba(239,68,68,0.3)]"></div>
                    <p className="mt-8 text-[10px] font-black uppercase tracking-[0.6em] text-neutral-200 animate-pulse">Initializing Cinematic Feed...</p>
               </div>
            </div>
            
            {/* AGGRESSIVE IFRAME CROPPER for consistent focus mode */}
            <div className="absolute inset-0 overflow-hidden flex items-center justify-center">
              <div 
                className={`absolute transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                  isExpanded 
                    ? 'w-[155%] h-[185%] top-[-42.5%] left-[-27.5%] scale-100' 
                    : 'w-[180%] h-[200%] top-[-50%] left-[-40%] scale-90'
                }`}
              >
                <iframe 
                  src={embedUrl}
                  className="w-full h-full absolute top-0 left-0 border-0 bg-black pointer-events-auto"
                  allow="autoplay; fullscreen; picture-in-picture"
                  allowFullScreen
                  onLoad={() => {
                    setTimeout(() => setIsReady(true), 1500);
                  }}
                  sandbox="allow-forms allow-scripts allow-pointer-lock allow-same-origin allow-presentation"
                ></iframe>
              </div>
            </div>

            {/* Shield Overlay for Minimized Mode */}
            {!isExpanded && <div className="absolute inset-0 z-20 bg-transparent cursor-pointer"></div>}
            
            {/* Cinematic Vignette */}
            {isExpanded && (
               <div className="absolute inset-0 pointer-events-none z-10 shadow-[inset_0_0_350px_rgba(0,0,0,1)] opacity-90"></div>
            )}
          </div>
        )}

        {/* Center Play Overlay for Direct Videos */}
        {type === 'direct' && isExpanded && !isPlaying && (
           <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-[4px] z-[450]">
              <button 
                onClick={togglePlay}
                className="w-32 h-32 bg-red-600 rounded-full flex items-center justify-center shadow-[0_0_100px_rgba(239,68,68,0.7)] transform scale-100 hover:scale-110 transition-all active:scale-95 border-8 border-white/20"
              >
                 <svg className="w-16 h-16 ml-2 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
              </button>
           </div>
        )}
      </div>

      {/* 4. FOOTER INFO (Minimized Mode Only) */}
      {!isExpanded && (
        <div className="absolute bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-black via-black/90 to-transparent flex items-center justify-between z-[500]">
           <div className="flex flex-col">
              <span className="text-xs font-black text-white truncate max-w-[240px] tracking-tight">{item.title}</span>
              <div className="flex items-center space-x-2">
                <div className="w-1.5 h-1.5 bg-red-600 rounded-full animate-pulse shadow-[0_0_100px_rgba(239,68,68,1)]"></div>
                <span className="text-[9px] text-neutral-400 font-black uppercase tracking-widest">Live Cinematic Feed</span>
              </div>
           </div>
           <button className="p-2.5 bg-white/10 rounded-xl text-white hover:bg-white/20 transition-colors">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z"/></svg>
           </button>
        </div>
      )}
    </div>
  );
};

export default DynamicVideoPlayer;
