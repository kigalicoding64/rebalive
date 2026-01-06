
import React, { useState } from 'react';
import { ContentItem, ContentType, Monetization } from '../types';

interface DetailOverlayProps {
  item: ContentItem;
  isPremiumUser: boolean;
  downloadedIds: string[];
  onClose: () => void;
  onPlay?: (item: ContentItem) => void;
  onDownload?: (id: string) => void;
  onNarratorClick?: (narratorName: string) => void;
}

const DetailOverlay: React.FC<DetailOverlayProps> = ({ 
  item, 
  isPremiumUser, 
  downloadedIds, 
  onClose, 
  onPlay, 
  onDownload,
  onNarratorClick
}) => {
  const [downloadProgress, setDownloadProgress] = useState<number | null>(null);
  const isBook = item.type === ContentType.BOOK;
  const isVideo = item.type === ContentType.VIDEO || item.type === ContentType.AGASOBANUYE;
  const isNews = item.type === ContentType.NEWS;
  const isDownloaded = downloadedIds.includes(item.id);

  const handleDownloadClick = () => {
    if (!isPremiumUser) {
      alert("Upgrade to RebaLive Premium to unlock offline downloads!");
      return;
    }
    
    if (isDownloaded) return;

    // Simulate download progress
    setDownloadProgress(0);
    const interval = setInterval(() => {
      setDownloadProgress(prev => {
        if (prev === null || prev >= 100) {
          clearInterval(interval);
          onDownload?.(item.id);
          return 100;
        }
        return prev + 10;
      });
    }, 300);
  };

  return (
    <div className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-3xl flex items-center justify-center p-4 md:p-10 animate-in fade-in zoom-in-95 duration-300">
      <div className="w-full max-w-6xl bg-neutral-900 rounded-[3rem] overflow-hidden shadow-2xl relative flex flex-col md:flex-row h-full max-h-[90vh] border border-white/10">
        <button 
          onClick={onClose}
          className="absolute top-8 right-8 z-20 p-4 bg-black/50 backdrop-blur-md rounded-full text-white hover:bg-red-600 transition-all transform hover:rotate-90 active:scale-90 shadow-2xl"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/></svg>
        </button>

        <div className={`w-full md:w-1/2 relative h-72 md:h-auto bg-black ${isBook ? 'p-12 flex items-center justify-center' : ''}`}>
          {isBook ? (
             <div className="relative group max-w-xs w-full">
                <img src={item.thumbnail} alt="" className="w-full h-full object-cover rounded-xl shadow-[0_35px_60px_-15px_rgba(0,0,0,0.8)] transform -rotate-2 group-hover:rotate-0 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-tr from-black/40 to-transparent"></div>
             </div>
          ) : (
            <>
              <img src={item.thumbnail} alt="" className="w-full h-full object-cover opacity-60" />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-transparent to-transparent"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <button 
                  onClick={() => onPlay?.(item)}
                  className="w-24 h-24 bg-red-600 rounded-full flex items-center justify-center shadow-[0_0_50px_rgba(239,68,68,0.4)] hover:scale-110 active:scale-95 transition-all group"
                >
                  <svg className="w-12 h-12 ml-1.5 text-white group-hover:fill-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"/></svg>
                </button>
              </div>
            </>
          )}
        </div>

        <div className="w-full md:w-1/2 p-10 md:p-16 flex flex-col h-full overflow-y-auto custom-scroll">
          <div className="flex items-center space-x-3 mb-6">
             <span className="px-3 py-1 bg-red-600 text-[10px] font-black rounded-full uppercase tracking-widest">{item.type}</span>
             <span className="px-3 py-1 bg-neutral-800 text-[10px] font-bold rounded-full uppercase text-neutral-400">{item.language}</span>
             {item.isTrending && <span className="text-amber-500 text-[10px] font-black uppercase tracking-widest">🔥 Trending</span>}
          </div>

          <h2 className="text-4xl md:text-5xl font-black mb-4 leading-tight">{item.title}</h2>
          <div className="flex items-center space-x-6 text-sm text-neutral-500 mb-8 font-bold">
            <span className="flex items-center"><svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/></svg>{item.views.toLocaleString()}</span>
            <span>{item.publishedAt}</span>
            {item.duration && <span>{item.duration}</span>}
          </div>

          <div className="prose prose-invert mb-10 flex-grow">
            <p className="text-neutral-300 text-lg leading-relaxed italic">"{item.description}"</p>
            {isNews && <div className="mt-8 p-6 bg-white/5 rounded-2xl border border-white/5"><h4 className="font-bold text-white mb-2">Verified Content</h4><p className="text-sm">This article has been verified by RebaLive's editorial board in collaboration with {item.creator}.</p></div>}
            {item.narrator && (
               <button 
                onClick={() => item.narrator && onNarratorClick?.(item.narrator)}
                className="mt-4 p-4 bg-red-600/10 rounded-xl border border-red-500/20 flex items-center space-x-3 hover:bg-red-600/20 transition-all text-left w-full"
               >
                  <div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center font-black text-xs">Ag.</div>
                  <div>
                    <p className="text-[10px] font-black uppercase opacity-60">Narrated By</p>
                    <p className="text-sm font-bold text-red-500">{item.narrator}</p>
                  </div>
               </button>
            )}
          </div>

          <div className="space-y-6 pt-10 border-t border-white/5">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 rounded-2xl bg-neutral-800 overflow-hidden">
                <img src={item.creatorAvatar || `https://picsum.photos/seed/${item.creator}/100/100`} alt="" />
              </div>
              <div>
                <p className="text-[10px] font-black text-neutral-500 uppercase">Creator</p>
                <p className="font-bold">{item.creator}</p>
              </div>
              <button className="ml-auto px-5 py-2 bg-white/5 border border-white/10 rounded-xl text-xs font-bold hover:bg-white/10 transition-colors">FOLLOW</button>
            </div>

            <div className="flex space-x-4">
              <button 
                onClick={() => onPlay?.(item)}
                className="flex-grow py-5 bg-white text-black font-black rounded-2xl hover:bg-neutral-200 transition-all flex items-center justify-center space-x-3 shadow-xl"
              >
                <span>{isBook ? 'READ BOOK' : 'PLAY NOW'}</span>
              </button>
              
              <button 
                onClick={handleDownloadClick}
                className={`p-5 rounded-2xl transition-all relative flex items-center justify-center overflow-hidden ${
                  isDownloaded ? 'bg-green-600 text-white' : 'bg-neutral-800 text-white hover:bg-neutral-700'
                }`}
                title={isPremiumUser ? "Download for offline" : "Premium feature"}
              >
                {downloadProgress !== null && downloadProgress < 100 ? (
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-neutral-800">
                    <div className="w-8 h-8 rounded-full border-2 border-white/10 border-t-red-600 animate-spin"></div>
                    <span className="text-[8px] mt-1 font-black">{downloadProgress}%</span>
                  </div>
                ) : isDownloaded ? (
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/></svg>
                ) : (
                  <div className="relative">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10"/></svg>
                    {!isPremiumUser && <div className="absolute -top-1 -right-1 w-3 h-3 bg-amber-500 rounded-full flex items-center justify-center"><svg className="w-2 h-2 text-black" fill="currentColor" viewBox="0 0 20 20"><path d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"/></svg></div>}
                  </div>
                )}
              </button>

              <button className="p-5 bg-neutral-800 text-white rounded-2xl hover:bg-neutral-700 transition-all">
                 <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"/></svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailOverlay;
