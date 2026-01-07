
import React from 'react';
import { MOCK_CONTENT, MOCK_BOOKS } from '../constants';
import ContentCard from '../components/ContentCard';
import { ContentItem } from '../types';

interface DownloadsProps {
  downloadedIds: string[];
  onItemClick: (item: ContentItem) => void;
}

const Downloads: React.FC<DownloadsProps> = ({ downloadedIds, onItemClick }) => {
  const allContent = [...MOCK_CONTENT, ...MOCK_BOOKS];
  const downloadedContent = allContent.filter(item => downloadedIds.includes(item.id));

  const handleOfflinePlay = (item: ContentItem) => {
    // Triggers global app state with isOffline: true flag
    onItemClick(item);
  };

  return (
    <div className="space-y-12 animate-in fade-in duration-500 max-w-7xl mx-auto py-6 pb-24" aria-label="Kubika Filime (Offline Storage)">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-5xl font-black tracking-tight">Filime Wabitswe</h1>
          <p className="text-neutral-500 font-bold text-lg mt-2">Reba filime wibitseho (Offline) utiriwe ukoresha interineti.</p>
        </div>
        <div className="bg-neutral-900/50 px-8 py-4 rounded-3xl border border-white/5 flex items-center space-x-4 shadow-2xl">
           <div className="w-4 h-4 bg-green-500 rounded-full animate-pulse shadow-[0_0_15px_rgba(34,197,94,0.5)]"></div>
           <span className="text-sm font-black text-neutral-300 uppercase tracking-widest">{downloadedContent.length} Filime Zibitse</span>
        </div>
      </div>

      {downloadedContent.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-32 text-center space-y-10 bg-neutral-900/20 rounded-[4rem] border border-dashed border-white/5">
          <div className="w-32 h-32 bg-neutral-900 rounded-[2rem] flex items-center justify-center text-neutral-700 shadow-2xl transform rotate-12">
            <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10"/></svg>
          </div>
          <div className="max-w-md space-y-4">
            <h3 className="text-3xl font-black tracking-tight">Nta filime urabika</h3>
            <p className="text-neutral-500 font-bold leading-relaxed">Koresha RebaLive Premium kugira ngo ubashe kubika filime uzirebe igihe cyose ushaka utari kuri interineti.</p>
          </div>
          <button className="px-12 py-5 bg-red-600 text-white font-black text-xs rounded-2xl hover:bg-red-500 transition-all shadow-2xl uppercase tracking-widest active:scale-95">Upgrade to Premium</button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-14">
          {downloadedContent.map(item => (
            <div key={item.id} className="relative group">
              <ContentCard item={item} onClick={() => handleOfflinePlay(item)} />
              <div className="absolute top-5 right-5 z-20 px-3 py-1.5 bg-green-600 text-white rounded-xl shadow-2xl border border-white/10 flex items-center space-x-2">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/></svg>
                <span className="text-[9px] font-black uppercase tracking-widest">OFFLINE READY</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Downloads;
