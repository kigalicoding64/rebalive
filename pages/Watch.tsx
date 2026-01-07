
import React, { useState } from 'react';
import { MOCK_CONTENT, NARRATORS } from '../constants';
import ContentCard from '../components/ContentCard';
import { ContentItem, ContentType } from '../types';

interface WatchProps {
  onItemClick?: (item: ContentItem) => void;
}

const Watch: React.FC<WatchProps> = ({ onItemClick }) => {
  const [filter, setFilter] = useState<ContentType | 'ALL' | 'TRENDING'>('ALL');
  const [selectedNarrator, setSelectedNarrator] = useState<string | null>(null);
  
  const videos = MOCK_CONTENT.filter(c => {
    // First apply content type filter
    let matchesType = true;
    if (filter === 'ALL') {
      matchesType = c.type === ContentType.VIDEO || c.type === ContentType.AGASOBANUYE;
    } else if (filter === 'TRENDING') {
      matchesType = c.isTrending || false;
    } else {
      matchesType = c.type === filter;
    }

    // Then apply narrator filter if it's Agasobanuye
    let matchesNarrator = true;
    if (selectedNarrator) {
      matchesNarrator = c.narrator === selectedNarrator;
    }

    return matchesType && matchesNarrator;
  });

  return (
    <div className="space-y-10 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black tracking-tight">Watch</h1>
          <p className="text-neutral-500 text-sm mt-1">Discover Rwanda's best movies and Agasobanuye.</p>
        </div>
        
        <div className="flex flex-col gap-4">
          <div className="flex space-x-2 overflow-x-auto pb-2 md:pb-0 hide-scrollbar">
            {[
              { id: 'ALL', label: 'All Content' },
              { id: ContentType.VIDEO, label: 'Movies & Shows' },
              { id: ContentType.AGASOBANUYE, label: 'Agasobanuye' },
              { id: 'TRENDING', label: 'Trending' }
            ].map(cat => (
              <button 
                key={cat.id} 
                onClick={() => {
                  setFilter(cat.id as any);
                  if (cat.id !== ContentType.AGASOBANUYE && cat.id !== 'ALL') {
                    setSelectedNarrator(null);
                  }
                }}
                className={`flex-shrink-0 px-5 py-2.5 rounded-2xl text-xs font-black uppercase tracking-widest transition-all ${
                  (filter === cat.id) 
                    ? 'bg-red-600 text-white shadow-lg shadow-red-600/20 scale-105' 
                    : 'bg-neutral-900 text-neutral-400 border border-white/5 hover:border-red-500/50'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Narrator Filter Section - Only show when relevant */}
      {(filter === 'ALL' || filter === ContentType.AGASOBANUYE) && (
        <section className="bg-neutral-900/30 p-6 rounded-[2.5rem] border border-white/5">
          <h3 className="text-[10px] font-black text-neutral-500 uppercase tracking-[0.3em] mb-4 text-center md:text-left">Browse by Narrator</h3>
          <div className="flex flex-wrap items-center gap-4 justify-center md:justify-start">
            <button 
              onClick={() => setSelectedNarrator(null)}
              className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase transition-all ${!selectedNarrator ? 'bg-white text-black' : 'bg-neutral-800 text-neutral-500 hover:text-white'}`}
            >
              All Narrators
            </button>
            {NARRATORS.map(narrator => (
              <button
                key={narrator.id}
                onClick={() => setSelectedNarrator(narrator.name)}
                className={`flex items-center space-x-3 px-3 py-1.5 rounded-2xl border transition-all ${
                  selectedNarrator === narrator.name 
                    ? 'border-red-600 bg-red-600/10 text-white' 
                    : 'border-white/5 bg-neutral-900/50 text-neutral-400 hover:border-white/20'
                }`}
              >
                <img src={narrator.avatar} className="w-6 h-6 rounded-lg object-cover" alt="" />
                <span className="text-[10px] font-black uppercase tracking-wider">{narrator.name}</span>
              </button>
            ))}
          </div>
        </section>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-12">
        {videos.map(item => (
          <ContentCard key={item.id} item={item} onClick={onItemClick} />
        ))}
        
        {/* Fill more grid items for demonstration if the list is short */}
        {videos.length < 5 && Array.from({ length: 4 }).map((_, i) => (
          <ContentCard 
            key={`extra-${i}`} 
            item={{
              ...MOCK_CONTENT[1], 
              id: `v-extra-${i}`,
              title: `Legacy of the Hills Vol. ${i + 1}`,
              thumbnail: `https://picsum.photos/seed/watch-p-${i}/800/450`,
              views: Math.floor(Math.random() * 500000),
              narrator: i % 2 === 0 ? 'Sankara' : 'Rocky Kimomo'
            }} 
            onClick={onItemClick}
          />
        ))}
      </div>

      {videos.length === 0 && (
        <div className="py-20 text-center space-y-4">
          <div className="w-20 h-20 bg-neutral-900 rounded-full flex items-center justify-center mx-auto text-neutral-700">
            <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
          </div>
          <h3 className="text-xl font-bold">No results for this selection</h3>
          <p className="text-neutral-500 text-sm">Try changing your filters or narrator choice.</p>
          <button onClick={() => { setFilter('ALL'); setSelectedNarrator(null); }} className="text-red-500 font-black text-xs uppercase tracking-widest hover:underline">Reset All Filters</button>
        </div>
      )}
    </div>
  );
};

export default Watch;
