
import React, { useState, useEffect } from 'react';
import { ContentItem, ContentType, Monetization } from '../types';
import { MOCK_CONTENT } from '../constants';
import ContentCard from '../components/ContentCard';
import CommentSection from '../components/CommentSection';

interface AgasobanuyeDetailProps {
  item: ContentItem;
  isPremiumUser: boolean;
  downloadedIds: string[];
  onClose: () => void;
  onPlay: (item: ContentItem) => void;
  onDownload: (id: string) => void;
  onNarratorClick?: (narratorName: string) => void;
}

const AgasobanuyeDetail: React.FC<AgasobanuyeDetailProps> = ({ 
  item, 
  isPremiumUser, 
  downloadedIds, 
  onClose, 
  onPlay, 
  onDownload,
  onNarratorClick
}) => {
  const [downloadProgress, setDownloadProgress] = useState<number | null>(null);
  const isDownloaded = downloadedIds.includes(item.id);

  const relatedMovies = MOCK_CONTENT.filter(
    c => c.type === ContentType.AGASOBANUYE && c.id !== item.id
  );

  const handleDownloadClick = () => {
    if (!isPremiumUser) {
      alert("Upgrade to RebaLive Premium to unlock offline downloads!");
      return;
    }
    if (isDownloaded) return;

    setDownloadProgress(0);
    const interval = setInterval(() => {
      setDownloadProgress(prev => {
        if (prev === null || prev >= 100) {
          clearInterval(interval);
          onDownload(item.id);
          return 100;
        }
        return prev + 5;
      });
    }, 200);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: item.title,
        text: `Watch ${item.title} narrated by ${item.narrator} on RebaLive RW!`,
        url: window.location.href,
      }).catch(console.error);
    } else {
      alert("Link copied to clipboard!");
    }
  };

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [item.id]);

  return (
    <div className="min-h-screen bg-[#050505] text-white pb-20">
      {/* Hero Section */}
      <section className="relative h-[60vh] md:h-[80vh] w-full overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src={item.thumbnail} 
            className="w-full h-full object-cover opacity-60 transition-transform duration-1000 group-hover:scale-110" 
            alt={item.title} 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/40 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-[#050505] via-transparent to-transparent"></div>
        </div>

        <div className="absolute top-8 left-8 z-20">
          <button 
            onClick={onClose}
            className="p-4 bg-black/50 backdrop-blur-xl rounded-full text-white hover:bg-red-600 transition-all shadow-2xl"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"/></svg>
          </button>
        </div>

        <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-20 space-y-6 max-w-7xl mx-auto">
          <div className="flex items-center space-x-4">
             <span className="px-4 py-1.5 bg-red-600 text-xs font-black rounded-full uppercase tracking-[0.2em] shadow-lg shadow-red-600/20">Agasobanuye</span>
             <span className="px-4 py-1.5 bg-white/10 backdrop-blur-md text-xs font-bold rounded-full border border-white/10">{item.language}</span>
             <button 
              onClick={() => item.narrator && onNarratorClick?.(item.narrator)}
              className="text-amber-500 text-sm font-black uppercase tracking-widest hover:text-white transition-colors"
             >
              Narrated by {item.narrator}
             </button>
          </div>

          <h1 className="text-5xl md:text-8xl font-black leading-tight tracking-tighter max-w-4xl drop-shadow-2xl">
            {item.title}
          </h1>

          <div className="flex items-center space-x-8 text-sm md:text-lg font-bold text-neutral-400">
            <span className="flex items-center"><svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20"><path d="M10 12a2 2 0 100-4 2 2 0 000 4z"/><path fillRule="evenodd" d="M.458 10C1.732 5.943 5.523 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd"/></svg>{item.views.toLocaleString()}</span>
            <span>{item.publishedAt}</span>
            <span>{item.duration}</span>
          </div>

          <div className="flex flex-wrap gap-4 pt-8">
            <button 
              onClick={() => onPlay(item)}
              className="bg-white text-black px-12 py-5 rounded-[2rem] font-black flex items-center space-x-4 hover:bg-red-600 hover:text-white transition-all transform hover:scale-105 shadow-2xl active:scale-95"
            >
              <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
              <span className="text-lg">WATCH NOW</span>
            </button>
            
            <button 
              onClick={handleDownloadClick}
              className={`px-10 py-5 rounded-[2rem] font-black flex items-center space-x-4 transition-all border border-white/10 backdrop-blur-md relative overflow-hidden active:scale-95 ${
                isDownloaded ? 'bg-green-600 text-white border-green-500' : 'bg-white/5 text-white hover:bg-white/10'
              }`}
            >
              {downloadProgress !== null && downloadProgress < 100 ? (
                <>
                  <div className="absolute bottom-0 left-0 h-1 bg-red-600 transition-all duration-300" style={{ width: `${downloadProgress}%` }}></div>
                  <span className="relative z-10 animate-pulse uppercase tracking-widest text-xs">Downloading... {downloadProgress}%</span>
                </>
              ) : (
                <>
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/></svg>
                  <span>{isDownloaded ? 'DOWNLOADED' : 'OFFLINE'}</span>
                  {!isPremiumUser && !isDownloaded && <svg className="w-4 h-4 text-amber-500" fill="currentColor" viewBox="0 0 20 20"><path d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"/></svg>}
                </>
              )}
            </button>

            <button 
              onClick={handleShare}
              className="p-5 rounded-full bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-all"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"/></svg>
            </button>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-8 md:px-20 mt-20 grid grid-cols-1 lg:grid-cols-3 gap-20">
        <div className="lg:col-span-2 space-y-20">
          {/* Synopsis */}
          <section>
             <h2 className="text-3xl font-black mb-6 flex items-center">
                <span className="w-1.5 h-10 bg-red-600 rounded-full mr-4"></span>
                Incamake y'Ikinyandiko (Synopsis)
             </h2>
             <p className="text-xl text-neutral-300 leading-relaxed font-medium">
               {item.description}
             </p>
             <div className="mt-10 grid grid-cols-2 gap-8 py-8 border-y border-white/5">
                <div>
                   <p className="text-[10px] font-black text-neutral-500 uppercase tracking-widest mb-2">Creator</p>
                   <p className="text-lg font-bold">{item.creator}</p>
                </div>
                <div>
                   <p className="text-[10px] font-black text-neutral-500 uppercase tracking-widest mb-2">Narrated by</p>
                   <button 
                    onClick={() => item.narrator && onNarratorClick?.(item.narrator)}
                    className="text-lg font-bold text-red-500 hover:text-white transition-colors"
                   >
                    {item.narrator}
                   </button>
                </div>
             </div>
          </section>

          {/* Comments */}
          <section>
            <CommentSection contentId={item.id} />
          </section>
        </div>

        {/* Sidebar / Related */}
        <aside className="space-y-12">
          <section>
            <h3 className="text-xl font-black mb-8 border-b border-white/10 pb-4">Related Agasobanuye</h3>
            <div className="space-y-8">
              {relatedMovies.length > 0 ? (
                relatedMovies.map(movie => (
                  <div key={movie.id} onClick={() => onPlay(movie)} className="cursor-pointer group">
                     <div className="aspect-video rounded-2xl overflow-hidden mb-3 relative">
                        <img src={movie.thumbnail} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt="" />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                           <div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center shadow-xl">
                              <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                           </div>
                        </div>
                        <div className="absolute bottom-2 right-2 bg-black/80 px-2 py-1 rounded text-[10px] font-bold">{movie.duration}</div>
                     </div>
                     <h4 className="font-bold text-sm line-clamp-2 group-hover:text-red-500 transition-colors">{movie.title}</h4>
                     <p className="text-[10px] text-neutral-500 mt-1 uppercase font-black tracking-widest">By {movie.narrator}</p>
                  </div>
                ))
              ) : (
                <p className="text-neutral-500 italic">Nta bindi bishya birimo ubu...</p>
              )}
            </div>
          </section>

          {/* Ad Slot */}
          <div className="bg-neutral-900/50 p-8 rounded-[2.5rem] border border-white/5 text-center">
             <span className="text-[9px] font-black text-neutral-600 uppercase tracking-[0.4em] block mb-4">Advertisement</span>
             <h4 className="text-lg font-bold mb-4">Discover MoMo Pay</h4>
             <p className="text-xs text-neutral-500 mb-6">Experience the future of payments in Rwanda with MTN Mobile Money.</p>
             <button className="w-full py-3 bg-amber-500 text-black font-black text-[10px] rounded-xl shadow-lg shadow-amber-500/10">LEARN MORE</button>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default AgasobanuyeDetail;
