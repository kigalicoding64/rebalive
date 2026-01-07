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

  // SEO & Metadata Updates optimized for Kinyarwanda search queries
  useEffect(() => {
    window.scrollTo(0, 0);
    
    const originalTitle = document.title;
    const originalDesc = document.querySelector('meta[name="description"]')?.getAttribute('content');
    const originalKeywords = document.querySelector('meta[name="keywords"]')?.getAttribute('content');

    // Title Optimization: "Title - Yasobanuwe na Narrator | RebaLive RW"
    document.title = `${item.title} - Filime yasobanuwe na ${item.narrator || 'RebaLive'} | RebaLive RW`;
    
    // Description Optimization for Rwandan audience
    const kinyarwandaDesc = `Reba ${item.title} yasobanuwe mu Kinyarwanda na ${item.narrator}. Ibisobanuro birambuye n'incamake byose kuri RebaLive RW, i Kigali mu Rwanda. Filime nshya yasobanuwe gahoro.`;
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute('content', kinyarwandaDesc);

    // Keyword Optimization for Kinyarwanda SEO
    const kinyarwandaKeywords = `agasobanuye, ${item.title}, ${item.narrator}, filime nyarwanda, kinyarwanda movies, rebalive rw, amakuru, kigali news, saba agasobanuye, kigali cinema`;
    let metaKeywords = document.querySelector('meta[name="keywords"]');
    if (!metaKeywords) {
      metaKeywords = document.createElement('meta');
      metaKeywords.setAttribute('name', 'keywords');
      document.head.appendChild(metaKeywords);
    }
    metaKeywords.setAttribute('content', kinyarwandaKeywords);

    // Clean up on unmount
    return () => {
      document.title = originalTitle;
      if (originalDesc) metaDesc?.setAttribute('content', originalDesc);
      if (originalKeywords) metaKeywords?.setAttribute('content', originalKeywords);
    };
  }, [item]);

  const handleDownloadClick = () => {
    if (!isPremiumUser) {
      alert("Ongerera konti yawe kuri RebaLive Premium kugira ngo ubashe kubika iyi filime kuri terefone yawe!");
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

  return (
    <div className="min-h-screen bg-[#050505] text-white pb-20" aria-label={`Ibirambuye bya filime: ${item.title}`}>
      {/* Hero Section */}
      <section className="relative h-[60vh] md:h-[85vh] w-full overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src={item.thumbnail} 
            className="w-full h-full object-cover opacity-60 transition-transform duration-[3s] hover:scale-105" 
            alt={item.title} 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/40 to-transparent"></div>
        </div>

        <div className="absolute top-8 left-8 z-20">
          <button 
            onClick={onClose}
            className="p-5 bg-black/60 backdrop-blur-2xl rounded-full text-white hover:bg-red-600 transition-all border border-white/5"
            aria-label="Subira inyuma (Back)"
          >
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7"/></svg>
          </button>
        </div>

        <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-24 space-y-6 max-w-7xl mx-auto">
          <div className="flex flex-wrap items-center gap-4">
             <span className="px-5 py-2 bg-red-600 text-[10px] font-black rounded-full uppercase tracking-[0.3em] shadow-[0_0_20px_rgba(239,68,68,0.5)]">Agasobanuye gahoro</span>
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
            <span className="flex items-center"><svg className="w-6 h-6 mr-3 text-red-600" fill="currentColor" viewBox="0 0 24 24"><path d="M10 12a2 2 0 100-4 2 2 0 000 4z"/><path fillRule="evenodd" d="M.458 10C1.732 5.943 5.523 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd"/></svg>{item.views.toLocaleString()} bafite amatsiko</span>
            <span className="text-neutral-600">•</span>
            <span>Igihe cyo kureba: {item.duration}</span>
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
                isDownloaded ? 'bg-green-600 text-white' : 'bg-white/5 text-white hover:bg-white/10'
              }`}
            >
              {downloadProgress !== null && downloadProgress < 100 ? (
                <div className="flex items-center space-x-4">
                  <div className="w-8 h-8 border-2 border-white/10 border-t-red-600 rounded-full animate-spin"></div>
                  <span className="animate-pulse uppercase tracking-[0.2em] text-xs font-black">Kubika kuri terefone... ({downloadProgress}%)</span>
                </div>
              ) : (
                <>
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/></svg>
                  <span className="tracking-tighter uppercase text-xl">{isDownloaded ? 'YABITSWE' : 'BIKA FILIME'}</span>
                </>
              )}
            </button>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-8 md:px-24 mt-24 grid grid-cols-1 lg:grid-cols-3 gap-24">
        <div className="lg:col-span-2 space-y-24">
          <section>
             <h2 className="text-4xl font-black mb-10 flex items-center tracking-tighter uppercase">
                <span className="w-2.5 h-12 bg-red-600 rounded-full mr-6 shadow-[0_0_20px_rgba(239,68,68,0.5)]"></span>
                Incamake y'Ikinyandiko (Synopsis)
             </h2>
             <p className="text-2xl text-neutral-300 leading-[1.6] font-medium opacity-90">
               {item.description}
             </p>
          </section>

          <section>
            <CommentSection contentId={item.id} />
          </section>
        </div>

        <aside className="space-y-16">
          <section>
            <h3 className="text-2xl font-black mb-10 border-b border-white/10 pb-6 tracking-tighter uppercase">
              Filime zijyanye n'iyi (Related)
            </h3>
            <div className="space-y-10">
              {relatedMovies.map(movie => (
                <div key={movie.id} onClick={() => onPlay(movie)} className="cursor-pointer group">
                   <div className="aspect-video rounded-[2rem] overflow-hidden mb-5 relative shadow-xl border border-white/5">
                      <img src={movie.thumbnail} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt="" />
                      <div className="absolute bottom-3 right-3 bg-black/80 px-3 py-1.5 rounded-xl text-[10px] font-black tracking-widest">{movie.duration}</div>
                   </div>
                   <h4 className="font-black text-lg group-hover:text-red-500 transition-colors tracking-tight leading-tight">{movie.title}</h4>
                   <p className="text-[10px] text-neutral-500 mt-2 uppercase font-black tracking-[0.2em]">{movie.narrator}</p>
                </div>
              ))}
            </div>
          </section>
        </aside>
      </div>
    </div>
  );
};

export default AgasobanuyeDetail;