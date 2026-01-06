
import React from 'react';
import { MOCK_CONTENT } from '../constants';
import ContentCard from '../components/ContentCard';
import { ContentType } from '../types';

const Home: React.FC = () => {
  const trending = MOCK_CONTENT.filter(c => c.isTrending || c.type === ContentType.AGASOBANUYE);
  const shorts = MOCK_CONTENT.filter(c => c.type === ContentType.SHORT);
  const music = MOCK_CONTENT.filter(c => c.type === ContentType.MUSIC);

  return (
    <div className="space-y-10 animate-in fade-in duration-700">
      {/* Dynamic Hero Banner */}
      <section className="relative h-[450px] md:h-[600px] rounded-3xl overflow-hidden group">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1542128962-9d50ad7bf714?q=80&w=1600&auto=format&fit=crop" 
            className="w-full h-full object-cover transition-transform duration-[3s] group-hover:scale-110" 
            alt="Hero" 
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/40 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
        </div>
        
        <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-16 space-y-4">
          <div className="flex items-center space-x-3">
             <span className="bg-red-600 px-3 py-1 rounded-full text-[10px] font-black tracking-widest">TOP #1 IN RWANDA</span>
             <span className="text-neutral-300 font-bold text-sm">Gakondo Documentary</span>
          </div>
          <h1 className="text-4xl md:text-7xl font-black max-w-2xl leading-tight">Ubwihisho Bw'ingagi</h1>
          <p className="text-neutral-300 text-sm md:text-lg max-w-xl line-clamp-2">
            Experience the untold story of the Volcanoes National Park rangers. A RebaLive Original production.
          </p>
          <div className="flex flex-wrap gap-4 pt-4">
            <button className="bg-white text-black px-10 py-4 rounded-2xl font-black flex items-center space-x-3 hover:bg-neutral-200 transition-all transform hover:scale-105 shadow-xl">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
              <span>WATCH NOW</span>
            </button>
            <button className="bg-white/10 backdrop-blur-md text-white border border-white/20 px-10 py-4 rounded-2xl font-black hover:bg-white/20 transition-all">
              ADD TO LIST
            </button>
          </div>
        </div>
      </section>

      {/* For You Section (Netflix Row) */}
      <section>
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-1.5 h-8 bg-red-600 rounded-full"></div>
          <h2 className="text-2xl font-black">For You, Robert</h2>
        </div>
        <div className="flex overflow-x-auto gap-6 pb-6 hide-scrollbar scroll-smooth">
          {trending.map(item => (
            <ContentCard key={item.id} item={item} variant="horizontal" />
          ))}
          {/* Mocking extra items for scroll feel */}
          {Array.from({ length: 4 }).map((_, i) => (
             <ContentCard key={`m-${i}`} item={{...MOCK_CONTENT[1], id: `m-${i}`, title: `New Agasobanuye ${i+1}`, thumbnail: `https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=800&auto=format&fit=crop&sig=${i}`}} variant="horizontal" />
          ))}
        </div>
      </section>

      {/* Amashushyo (Shorts) Section */}
      <section className="bg-neutral-900/30 -mx-4 px-4 py-8 border-y border-white/5">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="w-1.5 h-8 bg-amber-500 rounded-full"></div>
            <h2 className="text-2xl font-black tracking-tight">Amashushyo (Shorts)</h2>
          </div>
          <button className="text-xs font-black text-amber-500 hover:underline">EXPLORE SHORTS</button>
        </div>
        <div className="flex overflow-x-auto gap-4 hide-scrollbar">
          {Array.from({ length: 8 }).map((_, i) => (
            <ContentCard 
              key={`short-${i}`} 
              item={{
                ...MOCK_CONTENT[4], 
                id: `s-${i}`, 
                thumbnail: `https://images.unsplash.com/photo-1540553016722-983e48a2cd10?q=80&w=400&auto=format&fit=crop&sig=${i}`
              }} 
            />
          ))}
        </div>
      </section>

      {/* Music Row */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="w-1.5 h-8 bg-blue-500 rounded-full"></div>
            <h2 className="text-2xl font-black">Gakondo Vibes</h2>
          </div>
          <button className="text-xs font-black text-blue-500">PLAYLISTS</button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="group cursor-pointer">
              <div className="aspect-square bg-neutral-900 rounded-2xl overflow-hidden mb-3 relative shadow-lg">
                <img src={`https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=400&auto=format&fit=crop&sig=${i}`} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt="" />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                   <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-black transform scale-0 group-hover:scale-100 transition-transform">
                     <svg className="w-6 h-6 ml-1" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                   </div>
                </div>
              </div>
              <h4 className="font-bold text-sm truncate">Rwandan Soul Mix</h4>
              <p className="text-[10px] text-neutral-500 uppercase tracking-widest font-bold">48 Tracks</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
