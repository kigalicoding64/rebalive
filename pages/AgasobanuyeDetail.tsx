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
      alert("Upgrade kuri RebaLive Premium kugira ngo ubashe kubika amafilime kuri terefone!");
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
        text: `Reba ${item.title} yasobanuwe na ${item.narrator} kuri RebaLive RW!`,
        url: window.location.href,
      }).catch(console.error);
    } else {
      alert("Ihuza (Link) ryamaze gukopiywa!");
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [item.id]);

  return (
    <div className="min-h-screen bg-[#050505] text-white pb-20">
      {/* Hero Section */}
      <section className="relative h-[60vh] md:h-[85vh] w-full overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src={item.thumbnail} 
            className="w-full h-full object-cover opacity-60 transition-transform duration-[2s] group-hover:scale-110" 
            alt={item.title} 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/40 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-[#050505] via-transparent to-transparent"></div>
        </div>

        <div className="absolute top-8 left-8 z-20">
          <button 
            onClick={onClose}
            className="p-5 bg-black/60 backdrop-blur-2xl rounded-full text-white hover:bg-red-600 transition-all shadow-2xl border border-white/5"
          >
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7"/></svg>
          </button>
        </div>

        <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-24 space-y-6 max-w-7xl mx-auto">
          <div className="flex flex-wrap items-center gap-4">
             <span className="px-5 py-2 bg-red-600 text-[10px] font-black rounded-full uppercase tracking-[0.3em] shadow-[0_0_20px_rgba(239,68,68,0.5)]">Agasobanuye Masterpiece</span>
             <span className="px-5 py-2 bg-white/10 backdrop-blur-md text-[10px] font-black rounded-full border border-white/10 uppercase tracking-widest">{item.language}</span>
             {item.narrator && (
               <button 
                onClick={() => onNarratorClick?.(item.narrator!)}
                className="group flex items-center space-x-3 bg-amber-500/10 border border-amber-500/20 px-5 py-2 rounded-full hover:bg-amber-500 hover:text-black transition-all"
               >
                <div className="w-2 h-2 bg-amber-500 group-hover:bg-black rounded-full animate-pulse"></div>
                <span className="text-amber-500 group-hover:text-black text-[10px] font-black uppercase tracking-[0.3em]">Yasobanuwe na {item.narrator}</span>
               </button>
             )}
          </div>

          <h1 className="text-5xl md:text-9xl font-black leading-tight tracking-tighter max-w-5xl drop-shadow-[0_20px_50px_rgba(0,0,0,1)]">
            {item.title}
          </h1>

          <div className="flex items-center space-x-8 text-sm md:text-xl font-bold text-neutral-400">
            <span className="flex items-center"><svg className="w-6 h-6 mr-3 text-red-600" fill="currentColor" viewBox="0 0 20 20"><path d="M10 12a2 2 0 100-4 2 2 0 000 4z"/><path fillRule="evenodd" d="M.458 10C1.732 5.943 5.523 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd"/></svg>{item.views.toLocaleString()}</span>
            <span className="text-neutral-600">•</span>
            <span>{item.publishedAt}</span>
            <span className="text-neutral-600">•</span>
            <span>{item.duration}</span>
          </div>

          <div className="flex flex-wrap gap-6 pt-10">
            <button 
              onClick={() => onPlay(item)}
              className="bg-white text-black px-16 py-7 rounded-[2.5rem] font-black flex items-center space-x-5 hover:bg-red-600 hover:text-white transition-all transform hover:scale-105 shadow-[0_30px_70px_-10px_rgba(0,0,0,0.8)] active:scale-95 group"
            >
              <div className="w-12 h-12 bg-black text-white group-hover:bg-white group-hover:text-red-600 rounded-full flex items-center justify-center transition-colors">
                <svg className="w-6 h-6 ml-1" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
              </div>
              <span className="text-2xl tracking-tighter uppercase">REBA NONAHA</span>
            </button>
            
            <button 
              onClick={handleDownloadClick}
              className={`px-12 py-7 rounded-[2.5rem] font-black flex items-center space-x-5 transition-all border border-white/10 backdrop-blur-md relative overflow-hidden active:scale-95 ${
                isDownloaded ? 'bg-green-600 text-white border-green-500 shadow-[0_0_30px_rgba(34,197,94,0.3)]' : 'bg-white/5 text-white hover:bg-white/10'
              }`}
            >
              {downloadProgress !== null && downloadProgress < 100 ? (
                <div className="flex items-center space-x-4">
                  <div className="relative w-10 h-10 flex items-center justify-center">
                    <svg className="absolute inset-0 w-full h-full transform -rotate-90">
                      <circle cx="20" cy="20" r="18" fill="transparent" stroke="currentColor" strokeWidth="4" className="text-white/10" />
                      <circle cx="20" cy="20" r="18" fill="transparent" stroke="currentColor" strokeWidth="4" className="text-red-600" strokeDasharray={2 * Math.PI * 18} strokeDashoffset={2 * Math.PI * 18 * (1 - downloadProgress / 100)} />
                    </svg>
                    <span className="text-[10px] font-black">{downloadProgress}%</span>
                  </div>
                  <span className="animate-pulse uppercase tracking-[0.2em] text-xs">Kubika Filime...</span>
                </>
              ) : (
                <>
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/></svg>
                  <span className="tracking-tighter uppercase text-xl">{isDownloaded ? 'YABITSWE' : 'Bika Filime'}</span>
                  {!isPremiumUser && !isDownloaded && <div className="bg-amber-500 p-1 rounded-full"><svg className="w-3 h-3 text-black" fill="currentColor" viewBox="0 0 20 20"><path d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"/></svg></div>}
                </>
              )}
            </button>

            <button 
              onClick={handleShare}
              className="p-7 rounded-full bg-white/5 border border-white/10 text-white hover:bg-red-600 transition-all shadow-xl"
            >
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"/></svg>
            </button>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-8 md:px-24 mt-24 grid grid-cols-1 lg:grid-cols-3 gap-24">
        <div className="lg:col-span-2 space-y-24">
          {/* Synopsis */}
          <section>
             <h2 className="text-4xl font-black mb-10 flex items-center tracking-tighter uppercase">
                <span className="w-2.5 h-12 bg-red-600 rounded-full mr-6 shadow-[0_0_20px_rgba(239,68,68,0.5)]"></span>
                Incamake y'Ikinyandiko (Synopsis)
             </h2>
             <p className="text-2xl text-neutral-300 leading-[1.6] font-medium opacity-90">
               {item.description}
             </p>
             <div className="mt-14 grid grid-cols-2 gap-10 py-10 border-y border-white/5 bg-white/2 rounded-3xl px-8">
                <div>
                   <p className="text-[10px] font-black text-neutral-500 uppercase tracking-[0.3em] mb-3">Uwahanze (Creator)</p>
                   <p className="text-xl font-bold tracking-tight">{item.creator}</p>
                </div>
                <div>
                   <p className="text-[10px] font-black text-neutral-500 uppercase tracking-[0.3em] mb-3">Umunasobanuzi (Narrator)</p>
                   {item.narrator && (
                     <button 
                      onClick={() => onNarratorClick?.(item.narrator!)}
                      className="group flex flex-col text-left"
                     >
                      <span className="text-3xl font-black text-red-600 group-hover:text-white transition-colors tracking-tighter">
                        {item.narrator}
                      </span>
                      <span className="text-[10px] font-black uppercase tracking-widest text-neutral-600 group-hover:text-red-500 mt-1 transition-colors">Reba Ibindi Yasobanuye</span>
                     </button>
                   )}
                </div>
             </div>
          </section>

          {/* Comments */}
          <section>
            <CommentSection contentId={item.id} />
          </section>
        </div>

        {/* Sidebar / Related */}
        <aside className="space-y-16">
          <section>
            <h3 className="text-2xl font-black mb-10 border-b border-white/10 pb-6 tracking-tighter uppercase flex items-center">
              <span className="w-1.5 h-6 bg-amber-500 rounded-full mr-4"></span>
              Amafilime Ahuye (Related)
            </h3>
            <div className="space-y-10">
              {relatedMovies.length > 0 ? (
                relatedMovies.map(movie => (
                  <div key={movie.id} onClick={() => onPlay(movie)} className="cursor-pointer group">
                     <div className="aspect-video rounded-[2rem] overflow-hidden mb-5 relative shadow-xl border border-white/5">
                        <img src={movie.thumbnail} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt="" />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[2px]">
                           <div className="w-14 h-14 bg-red-600 rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(239,68,68,0.5)] transform scale-75 group-hover:scale-100 transition-transform">
                              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                           </div>
                        </div>
                        <div className="absolute bottom-3 right-3 bg-black/80 px-3 py-1.5 rounded-xl text-[10px] font-black tracking-widest border border-white/10">{movie.duration}</div>
                     </div>
                     <h4 className="font-black text-lg line-clamp-2 group-hover:text-red-500 transition-colors tracking-tight leading-tight">{movie.title}</h4>
                     <p className="text-[10px] text-neutral-500 mt-2 uppercase font-black tracking-[0.2em]">{movie.narrator}</p>
                  </div>
                ))
              ) : (
                <p className="text-neutral-500 italic font-bold">Nta bindi bishya birimo ubu...</p>
              )}
            </div>
          </section>

          {/* Ad Slot */}
          <div className="bg-gradient-to-br from-neutral-900 to-[#050505] p-12 rounded-[3.5rem] border border-white/5 text-center group shadow-2xl relative overflow-hidden">
             <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 rounded-full blur-3xl"></div>
             <span className="text-[9px] font-black text-neutral-600 uppercase tracking-[0.6em] block mb-6">Advertisement</span>
             <h4 className="text-2xl font-black mb-4 group-hover:text-amber-500 transition-colors tracking-tighter">Experience MoMo Rewards</h4>
             <p className="text-sm text-neutral-400 mb-8 leading-relaxed opacity-80">Ongerera credits kuri RebaLive ukoresheje MTN Mobile Money ubone 5% y'inyongera buri mpera z'icyumweru.</p>
             <button className="w-full py-5 bg-amber-500 text-black font-black text-xs rounded-2xl shadow-[0_20px_40px_-10px_rgba(245,158,11,0.4)] hover:scale-105 transition-transform tracking-widest uppercase">TOP UP NOW</button>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default AgasobanuyeDetail;