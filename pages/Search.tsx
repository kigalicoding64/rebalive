
import React, { useState } from 'react';
import { MOCK_CONTENT } from '../constants';
import ContentCard from '../components/ContentCard';

const Search: React.FC = () => {
  const [query, setQuery] = useState('');
  const tags = ['#KigaliNights', '#Gakondo', '#MoMoPay', '#VisitRwanda', '#TechInnovation', '#Inyarwanda'];

  const results = query 
    ? MOCK_CONTENT.filter(item => 
        item.title.toLowerCase().includes(query.toLowerCase()) || 
        item.creator.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  return (
    <div className="space-y-8 animate-in fade-in duration-500 max-w-6xl mx-auto">
      <div className="relative">
        <input 
          type="text" 
          autoFocus
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search movies, music, news or books..." 
          className="w-full bg-neutral-900 border-2 border-white/5 rounded-3xl py-6 px-16 text-xl focus:outline-none focus:border-red-500/50 transition-all shadow-2xl"
        />
        <svg className="w-8 h-8 absolute left-6 top-6 text-neutral-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
      </div>

      {!query && (
        <div className="space-y-8">
          <section>
            <h3 className="text-sm font-black text-neutral-500 uppercase tracking-widest mb-4">Trending in Rwanda</h3>
            <div className="flex flex-wrap gap-3">
              {tags.map(tag => (
                <button 
                  key={tag} 
                  onClick={() => setQuery(tag.replace('#', ''))}
                  className="px-6 py-3 bg-neutral-900 border border-white/5 rounded-2xl text-sm font-bold hover:bg-red-600 hover:text-white transition-all transform hover:scale-105"
                >
                  {tag}
                </button>
              ))}
            </div>
          </section>

          <section>
            <h3 className="text-sm font-black text-neutral-500 uppercase tracking-widest mb-4">Popular Creators</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {['Yanga Junior', 'IGIHE', 'Knowles', 'DJ Ishimwe'].map((name, i) => (
                <div key={i} className="bg-neutral-900/50 p-6 rounded-3xl border border-white/5 flex flex-col items-center text-center group cursor-pointer hover:bg-red-600/10">
                  <div className="w-20 h-20 rounded-full overflow-hidden mb-4 ring-2 ring-red-500/20 group-hover:ring-red-500 transition-all">
                    <img src={`https://picsum.photos/seed/creator-${i}/200/200`} alt="" />
                  </div>
                  <h4 className="font-black text-sm">{name}</h4>
                  <p className="text-[10px] text-neutral-500 uppercase font-bold mt-1">Verified Media</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      )}

      {query && (
        <section>
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-black">{results.length} Results found for "{query}"</h3>
            <button onClick={() => setQuery('')} className="text-sm font-bold text-neutral-500 hover:text-white">Clear</button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {results.map(item => (
              <ContentCard key={item.id} item={item} />
            ))}
            {results.length === 0 && (
              <div className="col-span-full py-20 text-center space-y-4">
                <div className="w-20 h-20 bg-neutral-900 rounded-full flex items-center justify-center mx-auto text-neutral-600">
                  <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 9.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                </div>
                <h4 className="text-xl font-bold">No results found</h4>
                <p className="text-neutral-500 max-w-xs mx-auto text-sm">Try different keywords or check your spelling. Kero AI can help you find what you need!</p>
              </div>
            )}
          </div>
        </section>
      )}
    </div>
  );
};

export default Search;
