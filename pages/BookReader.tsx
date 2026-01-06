
import React, { useState } from 'react';
import { Book } from '../types';

interface BookReaderProps {
  book: Book;
  onClose: () => void;
}

const BookReader: React.FC<BookReaderProps> = ({ book, onClose }) => {
  const [fontSize, setFontSize] = useState(18);
  const [theme, setTheme] = useState<'dark' | 'sepia' | 'light'>('dark');

  const themes = {
    dark: 'bg-[#050505] text-neutral-300',
    sepia: 'bg-[#f4ecd8] text-[#5b4636]',
    light: 'bg-white text-black'
  };

  return (
    <div className={`fixed inset-0 z-[300] flex flex-col animate-in fade-in duration-500 ${themes[theme]}`}>
      {/* Reader Nav */}
      <header className="h-16 border-b border-black/10 px-6 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button onClick={onClose} className="p-2 hover:bg-black/5 rounded-full transition-colors">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"/></svg>
          </button>
          <div className="min-w-0">
            <h1 className="text-sm font-black truncate">{book.title}</h1>
            <p className="text-[10px] opacity-60 font-bold uppercase tracking-widest">By {book.author}</p>
          </div>
        </div>

        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-2">
            <button onClick={() => setTheme('light')} className={`w-6 h-6 rounded-full border border-black/10 bg-white ${theme === 'light' ? 'ring-2 ring-red-500' : ''}`}></button>
            <button onClick={() => setTheme('sepia')} className={`w-6 h-6 rounded-full border border-black/10 bg-[#f4ecd8] ${theme === 'sepia' ? 'ring-2 ring-red-500' : ''}`}></button>
            <button onClick={() => setTheme('dark')} className={`w-6 h-6 rounded-full border border-white/10 bg-[#050505] ${theme === 'dark' ? 'ring-2 ring-red-500' : ''}`}></button>
          </div>
          <div className="flex items-center bg-black/5 rounded-lg p-1">
             <button onClick={() => setFontSize(Math.max(12, fontSize - 2))} className="p-2 hover:bg-black/5 rounded">A-</button>
             <span className="px-4 text-sm font-bold">{fontSize}px</span>
             <button onClick={() => setFontSize(Math.min(32, fontSize + 2))} className="p-2 hover:bg-black/5 rounded">A+</button>
          </div>
        </div>
      </header>

      {/* Content Area */}
      <main className="flex-grow overflow-y-auto custom-scroll flex justify-center py-12 px-6">
        <article className="max-w-2xl w-full space-y-8 leading-relaxed" style={{ fontSize: `${fontSize}px` }}>
           <h2 className="text-3xl font-black mb-8">Chapter 1</h2>
           <p>
             {book.sampleText || "The journey begins here. A story of resilience, hope, and the indomitable spirit of a nation."}
           </p>
           {Array.from({ length: 15 }).map((_, i) => (
             <p key={i}>
               Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
             </p>
           ))}
        </article>
      </main>

      {/* Footer / Progress */}
      <footer className="h-12 border-t border-black/10 px-6 flex items-center justify-between text-[10px] font-bold opacity-60 uppercase tracking-widest">
         <span>Page 1 of {book.pages}</span>
         <div className="w-1/3 bg-black/5 h-1 rounded-full overflow-hidden">
            <div className="w-1/10 bg-red-600 h-full"></div>
         </div>
         <span>Reading Progress: 1%</span>
      </footer>
    </div>
  );
};

export default BookReader;
