
import React from 'react';
import { ContentItem, ContentType, Monetization } from '../types';

interface ContentCardProps {
  item: ContentItem;
  variant?: 'horizontal' | 'vertical' | 'compact';
  onClick?: (item: ContentItem) => void;
}

const ContentCard: React.FC<ContentCardProps> = ({ item, variant = 'vertical', onClick }) => {
  const isAgasobanuye = item.type === ContentType.AGASOBANUYE;
  const isLive = item.type === ContentType.LIVE;

  const handleClick = () => onClick?.(item);

  if (variant === 'horizontal') {
    return (
      <div className="flex-shrink-0 w-80 md:w-96 group cursor-pointer" onClick={handleClick}>
        <div className="relative aspect-video rounded-xl overflow-hidden bg-neutral-900 shadow-xl transition-all group-hover:ring-2 ring-red-500">
          <img src={item.thumbnail} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
          
          {isAgasobanuye && (
            <div className="absolute top-2 left-2 px-2 py-0.5 bg-red-600 rounded text-[9px] font-black italic tracking-widest text-white flex items-center">
              <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20"><path d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"/></svg>
              AGASOBANUYE
            </div>
          )}

          {item.monetization === Monetization.CREDITS && (
            <div className="absolute top-2 right-2 px-2 py-0.5 bg-amber-500 rounded-full text-[10px] font-black text-black shadow-lg">
              {item.creditPrice} CR
            </div>
          )}

          <div className="absolute bottom-2 right-2 px-1.5 py-0.5 bg-black/80 rounded text-[10px] font-bold">
            {isLive ? 'LIVE' : item.duration}
          </div>
        </div>
        <div className="mt-3">
          <h3 className="font-bold text-sm line-clamp-1 group-hover:text-red-500 transition-colors">{item.title}</h3>
          <p className="text-[11px] text-neutral-400 mt-1">{item.creator} {item.narrator && `• Narrated by ${item.narrator}`}</p>
        </div>
      </div>
    );
  }

  if (item.type === ContentType.SHORT) {
    return (
      <div className="flex-shrink-0 w-36 md:w-48 aspect-[9/16] rounded-xl overflow-hidden relative group cursor-pointer" onClick={handleClick}>
        <img src={item.thumbnail} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent p-3 flex flex-col justify-end">
          <h3 className="text-xs font-bold leading-tight line-clamp-2">{item.title}</h3>
          <p className="text-[10px] text-neutral-300 mt-1">{item.views.toLocaleString()} views</p>
        </div>
      </div>
    );
  }

  return (
    <div className="group cursor-pointer" onClick={handleClick}>
      <div className="relative aspect-video rounded-xl overflow-hidden bg-neutral-900 mb-2 border border-white/5 group-hover:border-red-500/50 transition-colors">
        <img src={item.thumbnail} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        
        {isAgasobanuye && (
          <div className="absolute top-2 left-2 px-1.5 py-0.5 bg-red-600 rounded text-[8px] font-black text-white">AGASOBANUYE</div>
        )}

        {item.duration && <span className="absolute bottom-1.5 right-1.5 px-1 bg-black/80 text-[10px] font-bold rounded">{item.duration}</span>}
        {isLive && <span className="absolute top-1.5 left-1.5 px-1.5 py-0.5 bg-red-600 text-[10px] font-bold rounded animate-pulse">LIVE</span>}
      </div>
      <div>
        <h3 className="font-bold text-sm line-clamp-2 leading-snug group-hover:text-red-500 transition-colors">{item.title}</h3>
        <p className="text-[11px] text-neutral-500 mt-1">{item.creator} {item.narrator && `| ${item.narrator}`} • {item.publishedAt}</p>
      </div>
    </div>
  );
};

export default ContentCard;
