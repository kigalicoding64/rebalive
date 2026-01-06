
import React from 'react';
import { MOCK_CONTENT } from '../constants';
import { ContentType } from '../types';

const Read: React.FC = () => {
  const books = MOCK_CONTENT.filter(c => c.type === ContentType.BOOK);
  const news = MOCK_CONTENT.filter(c => c.type === ContentType.NEWS);

  return (
    <div className="space-y-10">
      <header>
        <h1 className="text-3xl font-black mb-2">Knowledge Hub</h1>
        <p className="text-neutral-400 text-sm">Rwanda's leading publications, literature, and research.</p>
      </header>

      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold border-l-4 border-red-500 pl-3">Digital Library (E-Books)</h2>
          <div className="flex space-x-2">
             <button className="p-2 bg-neutral-900 rounded-full text-neutral-500"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"/></svg></button>
             <button className="p-2 bg-neutral-900 rounded-full text-white"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/></svg></button>
          </div>
        </div>
        <div className="flex overflow-x-auto gap-6 pb-4 hide-scrollbar">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="flex-shrink-0 w-40 group cursor-pointer">
              <div className="aspect-[2/3] rounded-lg overflow-hidden shadow-xl bg-neutral-900 mb-3 relative">
                <img src={`https://picsum.photos/seed/book-${i}/400/600`} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <button className="px-4 py-2 bg-white text-black text-xs font-bold rounded shadow-lg">READ BOOK</button>
                </div>
              </div>
              <h4 className="font-bold text-sm line-clamp-1">Inzira y'Urukundo</h4>
              <p className="text-[10px] text-neutral-500">M. Gasana • 2024</p>
            </div>
          ))}
        </div>
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <h2 className="text-xl font-bold border-l-4 border-amber-500 pl-3">Latest News Feed</h2>
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="group flex flex-col md:flex-row gap-4 p-4 rounded-2xl bg-neutral-900/30 hover:bg-neutral-900/60 transition-colors border border-white/5 cursor-pointer">
              <div className="w-full md:w-48 aspect-video rounded-xl overflow-hidden flex-shrink-0">
                <img src={`https://picsum.photos/seed/newsfeed-${i}/400/225`} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt="" />
              </div>
              <div className="flex-grow py-1">
                <div className="flex items-center space-x-2 text-[10px] font-bold text-red-500 uppercase tracking-tighter mb-2">
                  <span>SOCIETY</span>
                  <span className="text-neutral-600">•</span>
                  <span className="text-neutral-500">KIGALI TODAY</span>
                </div>
                <h3 className="text-lg font-bold group-hover:text-red-500 transition-colors mb-2">Sustainable Farming Practices Adopted by Cooperatives in Gakenke District</h3>
                <p className="text-sm text-neutral-400 line-clamp-2 leading-relaxed">
                  Local farmers are celebrating a bumper harvest after switching to new organic fertilizers and modern irrigation techniques provided by the Ministry of Agriculture...
                </p>
                <div className="mt-4 flex items-center justify-between text-[10px] text-neutral-500">
                  <div className="flex items-center space-x-3">
                    <span>By Uwera Jean</span>
                    <span>15 min read</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button className="hover:text-white transition-colors"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"/></svg></button>
                    <button className="hover:text-white transition-colors"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"/></svg></button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="space-y-8">
           <div className="bg-red-600 p-6 rounded-2xl">
              <h3 className="text-xl font-bold text-white mb-2">Stay Updated</h3>
              <p className="text-red-100 text-sm mb-4">Get the morning headlines delivered to your profile every day at 7 AM.</p>
              <button className="w-full py-2 bg-white text-red-600 font-bold rounded-lg hover:bg-neutral-100 transition-colors">Subscribe Now</button>
           </div>

           <div>
              <h3 className="font-bold text-lg mb-4">Trending Tags</h3>
              <div className="flex flex-wrap gap-2">
                {['#KigaliNights', '#VisitRwanda', '#MoMo', '#Gakondo', '#GreenRwanda', '#TechInnovation'].map(tag => (
                  <span key={tag} className="px-3 py-1 bg-neutral-900 border border-neutral-800 rounded-full text-xs text-neutral-400 hover:border-red-500 hover:text-white cursor-pointer transition-all">
                    {tag}
                  </span>
                ))}
              </div>
           </div>

           <div className="bg-neutral-900/50 p-6 rounded-2xl border border-white/5">
              <h3 className="font-bold text-lg mb-4">Editor's Picks</h3>
              <div className="space-y-4">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="flex space-x-3 cursor-pointer group">
                    <img src={`https://picsum.photos/seed/pick-${i}/200/200`} className="w-16 h-16 rounded-lg object-cover" alt="" />
                    <div>
                      <h4 className="text-sm font-bold line-clamp-2 leading-tight group-hover:text-red-500 transition-colors">The evolution of Rwandan Coffee on the global market.</h4>
                      <p className="text-[10px] text-neutral-500 mt-1">Economist RW • 4 min</p>
                    </div>
                  </div>
                ))}
              </div>
           </div>
        </div>
      </section>
    </div>
  );
};

export default Read;
