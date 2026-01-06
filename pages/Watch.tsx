
import React, { useState } from 'react';
import { MOCK_CONTENT } from '../constants';
import ContentCard from '../components/ContentCard';
import { ContentItem, ContentType } from '../types';

interface WatchProps {
  onItemClick?: (item: ContentItem) => void;
}

const Watch: React.FC<WatchProps> = ({ onItemClick }) => {
  const [filter, setFilter] = useState<ContentType | 'ALL'>('ALL');
  
  const videos = MOCK_CONTENT.filter(c => {
    if (filter === 'ALL') return c.type === ContentType.VIDEO || c.type === ContentType.AGASOBANUYE;
    return c.type === filter;
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h1 className="text-3xl font-black tracking-tight">Watch</h1>
        <div className="flex space-x-2 overflow-x-auto pb-2 md:pb-0 hide-scrollbar">
          {[
            { id: 'ALL', label: 'All Videos' },
            { id: ContentType.VIDEO, label: 'Movies & Shows' },
            { id: ContentType.AGASOBANUYE, label: 'Agasobanuye' },
            { id: 'TRENDING', label: 'Trending' }
          ].map(cat => (
            <button 
              key={cat.id} 
              onClick={() => setFilter(cat.id as any)}
              className={`flex-shrink-0 px-5 py-2 rounded-xl text-xs font-bold transition-all ${
                (filter === cat.id) 
                  ? 'bg-red-600 text-white shadow-lg shadow-red-600/20' 
                  : 'bg-neutral-900 text-neutral-400 border border-white/5 hover:border-red-500/50'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-5 gap-y-10">
        {videos.map(item => (
          <ContentCard key={item.id} item={item} onClick={onItemClick} />
        ))}
        {/* Fill more grid items for demonstration */}
        {Array.from({ length: 8 }).map((_, i) => (
          <ContentCard 
            key={i} 
            item={{
              ...MOCK_CONTENT[1], // Template from Agasobanuye
              id: `v-extra-${i}`,
              title: `Global Blockbuster Part ${i + 1} (Narrated)`,
              thumbnail: `https://picsum.photos/seed/watch-p-${i}/800/450`,
              views: Math.floor(Math.random() * 500000)
            }} 
            onClick={onItemClick}
          />
        ))}
      </div>
    </div>
  );
};

export default Watch;
