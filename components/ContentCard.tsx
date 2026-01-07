import React, { useState, useRef, useEffect } from 'react';
import { ContentItem, ContentType, Monetization } from '../types';

interface ContentCardProps {
  item: ContentItem;
  variant?: 'horizontal' | 'vertical' | 'compact';
  onClick?: (item: ContentItem) => void;
  onQuickPlay?: (item: ContentItem) => void;
}

const ContentCard: React.FC<ContentCardProps> = ({ item, variant = 'vertical', onClick, onQuickPlay }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [displayThumbnail, setDisplayThumbnail] = useState(item.thumbnail);
  const videoRef = useRef<HTMLVideoElement>(null);

  const isAgasobanuye = item.type === ContentType.AGASOBANUYE;

  const handleClick = () => onClick?.(item);
  
  const handleQuickPlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    onQuickPlay?.(item);
  };

  // Smart Thumbnail Resolution (e.g. for YouTube)
  useEffect(() => {
    const ytMatch = item.url?.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/);
    if (ytMatch) {
      setDisplayThumbnail(`https://img.youtube.com/vi/${ytMatch[1]}/maxresdefault.jpg`);
    } else {
      setDisplayThumbnail(item.thumbnail);
    }
  }, [item.url, item.thumbnail]);

  const handleThumbError = () => {
    const ytMatch = item.url?.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/);
    if (ytMatch && displayThumbnail.includes('maxresdefault')) {
      // Fallback to high quality default if maxres is missing
      setDisplayThumbnail(`https://img.youtube.com/vi/${ytMatch[1]}/hqdefault.jpg`);
    }
  };

  useEffect(() => {
    if (isHovered && videoRef.current && item.url && !item.url.includes('html')) {
      videoRef.current.play().catch(() => {});
    } else if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  }, [isHovered, item.url]);

  return (
    <div 
      className="group cursor-pointer animate-in fade-in duration-500" 
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative aspect-video rounded-[2.5rem] overflow-hidden bg-neutral-900 border border-white/5 transition-all duration-700 shadow-2xl group-hover:shadow-red-600/20 group-hover:border-red-600/50 group-hover:-translate-y-2">
        <img 
          src={displayThumbnail} 
          alt={item.title} 
          onError={handleThumbError}
          className={`w-full h-full object-cover transition-all duration-1000 ${isHovered ? 'opacity-0 scale-110' : 'opacity-100 group-hover:scale-110'}`} 
        />
        
        {item.url && !item.url.includes('html') && (
          <video
            ref={videoRef}
            src={item.url}
            muted
            playsInline
            loop
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 pointer-events-none ${isHovered ? 'opacity-100' : 'opacity-0'}`}
          />
        )}

        {/* Hover Action Layer */}
        <div className={`absolute inset-0 flex items-center justify-center bg-black/50 backdrop-blur-[4px] transition-all duration-500 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
          <button 
            onClick={handleQuickPlay}
            className="w-20 h-20 bg-red-600 text-white rounded-full flex items-center justify-center shadow-[0_0_50px_rgba(239,68,68,0.6)] transform hover:scale-110 transition-transform active:scale-90"
          >
            <svg className="w-10 h-10 ml-1.5" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
          </button>
        </div>
        
        {/* Badges */}
        <div className="absolute top-5 left-5 flex flex-col gap-2 z-10">
          {isAgasobanuye && (
            <span className="px-3 py-1 bg-red-600 rounded-lg text-[9px] font-black text-white italic tracking-widest shadow-xl uppercase">Agasobanuye</span>
          )}
        </div>

        <div className="absolute bottom-5 right-5 z-10">
          {item.duration && (
            <span className="px-2.5 py-1 bg-black/90 text-[10px] font-black rounded-lg backdrop-blur-md border border-white/10 text-white">
              {item.duration}
            </span>
          )}
        </div>
      </div>

      <div className="mt-5 space-y-2 px-2">
        <h3 className="font-black text-xl line-clamp-1 group-hover:text-red-500 transition-colors tracking-tight">{item.title}</h3>
        
        <div className="flex items-center space-x-3 text-[10px] font-black uppercase text-neutral-500 tracking-[0.2em]">
           <span className="text-red-600">{item.narrator || item.creator}</span>
           <span className="w-1.5 h-1.5 bg-neutral-800 rounded-full"></span>
           <span>{item.views.toLocaleString()} Views</span>
        </div>

        {/* Descriptive Summary - New Enhancement */}
        <p className="text-xs text-neutral-400 line-clamp-2 leading-relaxed opacity-0 group-hover:opacity-100 transition-all duration-500 -translate-y-2 group-hover:translate-y-0 h-0 group-hover:h-auto overflow-hidden">
          {item.description}
        </p>
      </div>
    </div>
  );
};

export default ContentCard;