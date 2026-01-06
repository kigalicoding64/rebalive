
import React from 'react';
import { ContentItem, ContentType, Monetization } from '../types';

interface DetailOverlayProps {
  item: ContentItem;
  onClose: () => void;
}

const DetailOverlay: React.FC<DetailOverlayProps> = ({ item, onClose }) => {
  return (
    <div className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-xl flex items-center justify-center p-4 md:p-8 animate-in fade-in duration-300">
      <div className="w-full max-w-5xl bg-neutral-900 rounded-3xl overflow-hidden shadow-2xl relative flex flex-col md:flex-row h-full max-h-[85vh]">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 bg-black/40 rounded-full text-white hover:bg-black transition-colors"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/></svg>
        </button>

        <div className="w-full md:w-3/5 relative h-64 md:h-auto bg-black">
          <img src={item.thumbnail} alt="" className="w-full h-full object-cover opacity-60" />
          <div className="absolute inset-0 flex items-center justify-center">
            <button className="w-20 h-20 bg-red-600 rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform">
              <svg className="w-10 h-10 ml-1.5 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
            </button>
          </div>
        </div>

        <div className="w-full md:w-2/5 p-8 flex flex-col h-full overflow-y-auto">
          <div className="flex items-center space-x-2 mb-4">
             <span className="px-2 py-0.5 bg-red-600 text-[10px] font-black rounded uppercase tracking-widest">{item.type}</span>
             {item.language && <span className="px-2 py-0.5 bg-neutral-800 text-[10px] font-bold rounded uppercase">{item.language}</span>}
          </div>

          <h2 className="text-3xl font-black mb-2">{item.title}</h2>
          <div className="flex items-center space-x-4 text-sm text-neutral-400 mb-6">
            <span>{item.publishedAt}</span>
            <span>•</span>
            <span>{item.views.toLocaleString()} views</span>
          </div>

          <p className="text-neutral-300 text-sm leading-relaxed mb-8 flex-grow">
            {item.description}
          </p>

          <div className="space-y-4 pt-6 border-t border-white/10">
            {item.monetization === Monetization.CREDITS && (
              <div className="p-4 bg-amber-500/10 border border-amber-500/20 rounded-2xl flex items-center justify-between">
                <div>
                  <p className="text-xs text-amber-500 font-bold">PREMIUM CONTENT</p>
                  <p className="text-lg font-black">{item.creditPrice} Credits</p>
                </div>
                <button className="px-6 py-2 bg-amber-500 text-black font-black text-xs rounded-xl">UNLOCK NOW</button>
              </div>
            )}

            <div className="flex space-x-3">
              <button className="flex-grow py-3 bg-white text-black font-bold rounded-xl hover:bg-neutral-200 transition-colors">Play Content</button>
              <button className="p-3 bg-neutral-800 text-white rounded-xl hover:bg-neutral-700 transition-colors">
                 <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"/></svg>
              </button>
              <button className="p-3 bg-neutral-800 text-white rounded-xl hover:bg-neutral-700 transition-colors">
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
