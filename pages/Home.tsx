
import React from 'react';
import { MOCK_CONTENT } from '../constants';
import ContentCard from '../components/ContentCard';
import { ContentType } from '../types';

const Home: React.FC = () => {
  const trending = MOCK_CONTENT.filter(c => c.isTrending);
  const movies = MOCK_CONTENT.filter(c => c.type === ContentType.VIDEO);
  const shorts = MOCK_CONTENT.filter(c => c.type === ContentType.SHORT);
  const news = MOCK_CONTENT.filter(c => c.type === ContentType.NEWS);

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Hero Banner */}
      <section className="relative h-[300px] md:h-[500px] rounded-2xl overflow-hidden group cursor-pointer">
        <img src="https://picsum.photos/seed/hero/1600/900" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" alt="Featured" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent flex flex-col justify-end p-6 md:p-12">
          <div className="flex items-center space-x-2 mb-2">
            <span className="bg-red-600 px-2 py-0.5 rounded text-[10px] font-bold">HOT NOW</span>
            <span className="text-neutral-300 text-xs font-medium">Original Series</span>
          </div>
          <h1 className="text-3xl md:text-6xl font-black mb-4">Ubwihisho Bw'ingagi</h1>
          <p className="text-neutral-300 text-sm md:text-lg max-w-xl mb-6 line-clamp-2">
            A gripping documentary about the protectors of Rwanda's mountain gorillas. Discover the secrets of the forest.
          </p>
          <div className="flex space-x-3">
            <button className="bg-white text-black px-8 py-3 rounded-lg font-bold flex items-center space-x-2 hover:bg-neutral-200 transition-colors">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
              <span>Play Now</span>
            </button>
            <button className="bg-white/20 backdrop-blur-md text-white px-8 py-3 rounded-lg font-bold hover:bg-white/30 transition-colors">
              More Info
            </button>
          </div>
        </div>
      </section>

      {/* Trending Horizontal Scroll */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold border-l-4 border-red-500 pl-3">Trending in Rwanda</h2>
          <button className="text-red-500 text-sm font-bold hover:underline">See All</button>
        </div>
        <div className="flex overflow-x-auto gap-4 pb-4 hide-scrollbar">
          {trending.map(item => (
            <ContentCard key={item.id} item={item} variant="horizontal" />
          ))}
          {/* Add more placeholders for horizontal scroll effect */}
          {[1,2,3].map(i => (
             <ContentCard key={`p-${i}`} item={{...MOCK_CONTENT[0], id: `p-${i}`, title: `Trending ${i}`, thumbnail: `https://picsum.photos/seed/trend-${i}/800/450`}} variant="horizontal" />
          ))}
        </div>
      </section>

      {/* Shorts Grid */}
      <section>
        <div className="flex items-center justify-between mb-4">
           <h2 className="text-xl font-bold flex items-center">
             <span className="w-1.5 h-6 bg-red-600 mr-3 rounded-full"></span>
             Amashushyo (Shorts)
           </h2>
        </div>
        <div className="flex overflow-x-auto gap-3 pb-4 hide-scrollbar">
          {shorts.map(item => (
            <ContentCard key={item.id} item={item} />
          ))}
          {/* Fillers for UI demo */}
          {[1,2,3,4,5].map(i => (
            <ContentCard key={`sh-${i}`} item={{...MOCK_CONTENT[3], id: `sh-${i}`, thumbnail: `https://picsum.photos/seed/short-${i}/400/700`}} />
          ))}
        </div>
      </section>

      {/* News Grid */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold border-l-4 border-amber-500 pl-3">Breaking News</h2>
          <button className="text-amber-500 text-sm font-bold hover:underline">IGIHE Feed</button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {news.map(item => (
            <div key={item.id} className="bg-neutral-900/50 rounded-xl overflow-hidden flex h-32 hover:bg-neutral-800 transition-colors border border-white/5 cursor-pointer">
              <img src={item.thumbnail} className="w-32 object-cover" alt="" />
              <div className="p-3 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] text-red-500 font-bold uppercase tracking-wider">Top Story</span>
                  <h3 className="font-bold text-sm line-clamp-2 mt-1">{item.title}</h3>
                </div>
                <div className="flex items-center justify-between text-[10px] text-neutral-500">
                  <span>{item.creator}</span>
                  <span>{item.publishedAt}</span>
                </div>
              </div>
            </div>
          ))}
          {/* Fillers */}
          {[1,2,3].map(i => (
            <div key={`n-${i}`} className="bg-neutral-900/50 rounded-xl overflow-hidden flex h-32 hover:bg-neutral-800 transition-colors border border-white/5 cursor-pointer">
              <img src={`https://picsum.photos/seed/news-${i}/300/300`} className="w-32 object-cover" alt="" />
              <div className="p-3 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] text-neutral-500 font-bold uppercase tracking-wider">Business</span>
                  <h3 className="font-bold text-sm line-clamp-2 mt-1">Rwanda's GDP projected to grow by 7.5% in 2025 according to World Bank report.</h3>
                </div>
                <div className="flex items-center justify-between text-[10px] text-neutral-500">
                  <span>New Times</span>
                  <span>4h ago</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
