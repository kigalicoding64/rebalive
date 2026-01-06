
import React from 'react';
import { MOCK_CONTENT } from '../constants';
import { ContentType } from '../types';

const Listen: React.FC = () => {
  const music = MOCK_CONTENT.filter(c => c.type === ContentType.MUSIC || c.type === ContentType.PODCAST);

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <section className="bg-gradient-to-b from-red-900/40 to-black -mx-4 px-4 pt-10 pb-8 rounded-b-3xl">
        <div className="flex items-end space-x-6 max-w-7xl mx-auto">
          <div className="w-48 h-48 md:w-64 md:h-64 shadow-2xl rounded-lg overflow-hidden flex-shrink-0">
            <img src="https://picsum.photos/seed/playlist/600/600" alt="Playlist" className="w-full h-full object-cover" />
          </div>
          <div className="pb-2">
            <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-300">Curated Playlist</span>
            <h1 className="text-4xl md:text-7xl font-black mt-2 mb-4">Gakondo Vibes</h1>
            <div className="flex items-center space-x-2 text-sm font-medium">
              <span className="text-red-400">RebaLive Music</span>
              <span className="text-neutral-500">•</span>
              <span>1.2M Likes</span>
              <span className="text-neutral-500">•</span>
              <span>48 Songs</span>
            </div>
          </div>
        </div>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-4">
          <h2 className="text-xl font-bold">Top Charts Rwanda</h2>
          <div className="space-y-1">
            {Array.from({ length: 10 }).map((_, i) => (
              <div key={i} className="flex items-center p-2 rounded-lg hover:bg-neutral-900 transition-colors group cursor-pointer">
                <span className="w-8 text-neutral-500 text-sm font-bold">{i + 1}</span>
                <img src={`https://picsum.photos/seed/song-${i}/100/100`} className="w-10 h-10 rounded mr-4" alt="" />
                <div className="flex-grow">
                  <h4 className="text-sm font-bold group-hover:text-red-500 transition-colors">Icyirere Remix</h4>
                  <p className="text-[10px] text-neutral-400">Butera Knowles ft. Ish Kevin</p>
                </div>
                <span className="text-[10px] text-neutral-500 mr-4">3:42</span>
                <button className="text-neutral-500 hover:text-white">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"/></svg>
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <h2 className="text-xl font-bold">Featured Artists</h2>
          <div className="grid grid-cols-2 gap-4">
             {Array.from({ length: 4 }).map((_, i) => (
               <div key={i} className="bg-neutral-900 p-4 rounded-xl flex flex-col items-center text-center space-y-3 hover:bg-neutral-800 transition-all cursor-pointer">
                 <img src={`https://picsum.photos/seed/artist-${i}/200/200`} className="w-24 h-24 rounded-full object-cover shadow-lg border-2 border-red-500/20" alt="" />
                 <div>
                   <h4 className="text-sm font-bold">Artist Name {i+1}</h4>
                   <p className="text-[10px] text-neutral-500">120K Monthly Listeners</p>
                 </div>
               </div>
             ))}
          </div>

          <div className="bg-gradient-to-br from-neutral-800 to-neutral-900 p-6 rounded-2xl border border-white/5">
             <h3 className="text-lg font-bold mb-2">Listen Offline</h3>
             <p className="text-xs text-neutral-400 mb-4">Subscribe to Premium to download your favorite Gakondo and Afrobeat tracks.</p>
             <button className="w-full py-2 bg-amber-500 text-black font-black text-xs rounded-lg hover:bg-amber-400 transition-colors uppercase tracking-widest">Upgrade to Premium</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Listen;
