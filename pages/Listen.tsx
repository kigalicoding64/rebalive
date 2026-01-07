import React from 'react';
import { MOCK_CONTENT } from '../constants';
import { ContentType, ContentItem } from '../types';

interface ListenProps {
  onPlayTrack?: (track: ContentItem) => void;
}

const Listen: React.FC<ListenProps> = ({ onPlayTrack }) => {
  const music = MOCK_CONTENT.filter(c => c.type === ContentType.MUSIC || c.type === ContentType.PODCAST);

  // Fallback items if mock content is light
  const chartItems = music.length > 5 ? music : Array.from({ length: 10 }).map((_, i) => ({
    id: `song-${i}`,
    type: ContentType.MUSIC,
    title: i === 0 ? 'Icyirere Remix' : `Hit Single #${i + 1}`,
    creator: i === 0 ? 'Butera Knowles ft. Ish Kevin' : `Artist ${i + 1}`,
    thumbnail: `https://picsum.photos/seed/song-${i}/400/400`,
    url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4', // Mock audio link
    views: 120000 + (i * 5000),
    publishedAt: '2 days ago'
  }));

  return (
    <div className="space-y-12 animate-in fade-in duration-700 pb-32">
      {/* Hero Header */}
      <section className="relative h-[50vh] rounded-[3.5rem] overflow-hidden group shadow-2xl">
        <img 
          src="https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=1600&auto=format&fit=crop" 
          className="w-full h-full object-cover opacity-60" 
          alt="Music Hero" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/60 to-transparent"></div>
        <div className="absolute inset-0 flex flex-col justify-end p-12 md:p-20">
          <div className="space-y-6">
            <span className="bg-red-600 px-5 py-2 rounded-full text-[10px] font-black tracking-[0.4em] uppercase shadow-lg">Featured Playlist</span>
            <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-none">Gakondo Vibes</h1>
            <p className="text-neutral-400 text-lg max-w-xl font-medium">The definitive collection of Rwanda's modern classics, Afrobeat fusion, and cultural gems.</p>
            <div className="flex space-x-4 pt-4">
              <button 
                onClick={() => onPlayTrack?.(chartItems[0] as ContentItem)}
                className="bg-white text-black px-12 py-5 rounded-2xl font-black flex items-center space-x-3 hover:bg-red-600 hover:text-white transition-all transform hover:scale-105"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                <span>PLAY ALL</span>
              </button>
              <button className="bg-white/10 backdrop-blur-md border border-white/10 text-white px-10 py-5 rounded-2xl font-black hover:bg-white/20 transition-all">
                FOLLOW LIST
              </button>
            </div>
          </div>
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-8">
          <div className="flex items-center justify-between">
             <h2 className="text-3xl font-black tracking-tight flex items-center">
                <span className="w-2 h-8 bg-red-600 rounded-full mr-4"></span>
                Top Charts Rwanda
             </h2>
             <button className="text-[10px] font-black text-neutral-500 uppercase tracking-widest hover:text-white transition-colors">View Ranking</button>
          </div>

          <div className="space-y-2">
            {chartItems.map((song, i) => (
              <div 
                key={song.id} 
                onClick={() => onPlayTrack?.(song as ContentItem)}
                className="flex items-center p-4 rounded-[1.5rem] bg-neutral-900/30 hover:bg-red-600/10 transition-all group cursor-pointer border border-transparent hover:border-red-600/20"
              >
                <span className="w-8 text-neutral-500 text-sm font-black tabular-nums">{i + 1}</span>
                <div className="relative w-14 h-14 rounded-xl overflow-hidden mr-6 shadow-lg">
                   <img src={song.thumbnail} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt="" />
                   <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                      <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                   </div>
                </div>
                <div className="flex-grow min-w-0 mr-4">
                  <h4 className="text-base font-black group-hover:text-red-600 transition-colors truncate">{song.title}</h4>
                  <p className="text-xs text-neutral-500 font-bold uppercase tracking-widest mt-0.5 truncate">{song.creator}</p>
                </div>
                <div className="hidden md:flex flex-col items-end text-right mr-10 min-w-[120px]">
                   <span className="text-xs font-black text-neutral-400">{(song.views / 1000).toFixed(0)}K Plays</span>
                   <span className="text-[10px] text-neutral-600 uppercase font-black">Trending Now</span>
                </div>
                <button className="p-3 text-neutral-500 hover:text-white transition-colors">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"/></svg>
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-10">
          <section>
             <h2 className="text-xl font-black mb-6 flex items-center">
                <span className="w-1.5 h-5 bg-amber-500 rounded-full mr-3"></span>
                Featured Artists
             </h2>
             <div className="grid grid-cols-2 gap-4">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="bg-neutral-900/50 p-6 rounded-3xl flex flex-col items-center text-center space-y-4 hover:bg-neutral-800 transition-all cursor-pointer group border border-white/5 hover:border-amber-500/20">
                    <div className="relative w-28 h-28">
                      <img src={`https://picsum.photos/seed/artist-${i}/300/300`} className="w-full h-full rounded-full object-cover shadow-2xl transition-transform group-hover:scale-105" alt="" />
                      <div className="absolute inset-0 rounded-full ring-4 ring-transparent group-hover:ring-amber-500/30 transition-all"></div>
                    </div>
                    <div>
                      <h4 className="font-black text-sm group-hover:text-amber-500 transition-colors">Artiste {i+1}</h4>
                      <p className="text-[10px] text-neutral-500 font-black uppercase tracking-widest mt-1">Pop Fusion</p>
                    </div>
                  </div>
                ))}
             </div>
          </section>

          <div className="bg-gradient-to-br from-red-600 to-red-900 p-8 rounded-[2.5rem] shadow-2xl relative overflow-hidden group">
             <div className="relative z-10">
                <h3 className="text-2xl font-black mb-2">Upgrade to Premium</h3>
                <p className="text-sm text-red-100 mb-6 opacity-80">Listen offline, skip any track, and enjoy high-fidelity audio without ads.</p>
                <button className="w-full py-4 bg-white text-red-600 font-black text-xs rounded-2xl hover:bg-neutral-100 transition-all uppercase tracking-widest shadow-xl">Start 7-Day Trial</button>
             </div>
             <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-white/10 rounded-full blur-3xl group-hover:scale-125 transition-transform duration-1000"></div>
          </div>

          <section className="bg-neutral-900/50 p-6 rounded-[2.5rem] border border-white/5">
             <h3 className="text-sm font-black text-neutral-500 uppercase tracking-widest mb-6 text-center">Your Recents</h3>
             <div className="space-y-4">
                {chartItems.slice(0, 3).map(song => (
                  <div key={song.id} onClick={() => onPlayTrack?.(song as ContentItem)} className="flex items-center space-x-3 cursor-pointer group">
                     <img src={song.thumbnail} className="w-10 h-10 rounded-lg object-cover" alt="" />
                     <div className="flex-grow min-w-0">
                        <h4 className="text-xs font-bold truncate group-hover:text-red-500 transition-colors">{song.title}</h4>
                        <p className="text-[10px] text-neutral-500 truncate">{song.creator}</p>
                     </div>
                     <button className="text-neutral-600 group-hover:text-white transition-colors">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                     </button>
                  </div>
                ))}
             </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Listen;