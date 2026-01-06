
import React, { useState } from 'react';
import { MOCK_BOOKS } from '../constants';

const Top100Books: React.FC = () => {
  const [filter, setFilter] = useState('All');
  const categories = ['All', 'Fantasy', 'Sci-Fi', 'Thriller', 'Romance', 'Drama/Classics', 'Horror', 'YA', 'Non-Fiction'];

  const filteredBooks = filter === 'All' 
    ? MOCK_BOOKS 
    : MOCK_BOOKS.filter(b => b.genres.includes(filter));

  return (
    <div className="space-y-10 animate-in fade-in duration-700">
      <div className="bg-gradient-to-r from-amber-600/20 to-transparent p-12 rounded-[3rem] border border-amber-500/10">
        <h1 className="text-4xl md:text-6xl font-black mb-4">Top 100 Books</h1>
        <p className="text-neutral-400 text-lg max-w-2xl">Discover the world's most influential and beloved stories. From timeless classics to modern sensations.</p>
      </div>

      <div className="flex items-center space-x-2 overflow-x-auto pb-4 hide-scrollbar">
        {categories.map(cat => (
          <button 
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-6 py-2 rounded-full text-xs font-bold transition-all whitespace-nowrap ${
              filter === cat 
                ? 'bg-amber-500 text-black shadow-lg shadow-amber-500/20' 
                : 'bg-neutral-900 text-neutral-500 border border-white/5 hover:border-amber-500/30'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-x-6 gap-y-12">
        {filteredBooks.map((book, i) => (
          <div key={book.id} className="group cursor-pointer">
            <div className="relative aspect-[2/3] rounded-2xl overflow-hidden bg-neutral-900 shadow-2xl transition-all group-hover:scale-[1.03] group-hover:shadow-amber-500/10">
              <img src={book.thumbnail} className="w-full h-full object-cover" alt="" />
              <div className="absolute top-2 left-2 w-8 h-8 bg-black/60 backdrop-blur-md rounded-full flex items-center justify-center border border-white/10 text-xs font-black text-amber-500">
                {MOCK_BOOKS.indexOf(book) + 1}
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-4">
                 <button className="w-full py-2 bg-amber-500 text-black font-black text-[10px] rounded-lg">PREVIEW</button>
              </div>
            </div>
            <div className="mt-4">
              <h4 className="font-bold text-sm line-clamp-1 group-hover:text-amber-500 transition-colors">{book.title}</h4>
              <p className="text-[10px] text-neutral-500 font-bold uppercase tracking-widest mt-1">{book.genres[0]}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Top100Books;
