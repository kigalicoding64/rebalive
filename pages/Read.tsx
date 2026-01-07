import React, { useState, useEffect } from 'react';
import { MOCK_CONTENT } from '../constants';
import { ContentType, ContentItem } from '../types';

interface Article {
  id: string;
  title: string;
  author: string;
  source: string;
  content: string;
  image: string;
  category: string;
  time: string;
  publishDate: string;
  fullStory?: string;
}

const Read: React.FC = () => {
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);

  const mockArticles: Article[] = Array.from({ length: 12 }).map((_, i) => ({
    id: `art-${i}`,
    title: i === 0 
      ? "Uburyo Kigali yaje ku mwanya wa mbere mu kugira isuku muri Afurika" 
      : `Amakuru agezweho mu mishinga y'iterambere rya Rwanda Vol. ${i + 1}`,
    author: "Uwase Diane",
    source: i % 2 === 0 ? "IGIHE" : "Kigali Today",
    category: i % 3 === 0 ? "IKORANABUHANGA" : "SOCIETY",
    time: "15 min read",
    publishDate: "Gashyantare 28, 2025",
    image: `https://picsum.photos/seed/news-${i}/1200/800`,
    content: "Umujyi wa Kigali ukomeje kuba icyitegererezo muri Afurika yose mu bijyanye n'isuku n'uburyo bwiza bwo kubaka imijyi igezweho. Mu myaka icumi ishize, hagiyemo imishinga ikomeye yo gutunganya imihanda...",
    fullStory: `
      Umujyi wa Kigali ukomeje kuba icyitegererezo muri Afurika yose mu bijyanye n'isuku n'uburyo bwiza bwo kubaka imijyi igezweho. Mu myaka icumi ishize, hagiyemo imishinga ikomeye yo gutunganya imihanda, gutegura ubusitani bw'umujyi, no gushyiraho amategeko akaze ku bijyanye no kujugunya imyanda n'ikoreshwa rya pulasitiki. 
      
      Ibi byatumye Kigali ihabwa ibihembo bitandukanye mpuzamahanga, kandi bihuza neza n'intego y'igihugu yo kuba hub y'ubukerarugendo n'ubucuruzi muri kano karere. Abaturage b'umujyi na bo babigize umwaku, aho bakomeje kwitabira umuganda rusange kandi bakubaha ibikorwaremezo biba byashyizweho. Umushinga mushya wa 'Green Kigali' ugiye gushyiramo amashanyarazi mu modoka rusange zose bitarenze 2030.

      Hagati aho, inyubako nshya zirimo kuzamurwa mu mujyi wa Kigali zigomba kuba zujuje ibisabwa mu bijyanye no kubungabunga ibidukikije (Green Building Code). Ibi ni bimwe mu bigize 'Vision 2050', aho u Rwanda rwifuza kuba igihugu kigezweho kandi gifite ubukungu butangiza ibidukikije. Abanyamahanga baturuka mu bihugu bitandukanye bakomeje kuza gusura u Rwanda kugira ngo bige kuri uyu muvuduko w'iterambere, cyane cyane mu bijyanye n'isuku n'umutekano w'abaturage.
    `
  }));

  useEffect(() => {
    if (selectedArticle) {
      window.scrollTo(0, 0);
      document.title = `${selectedArticle.title} | RebaLive RW Read`;
    } else {
      document.title = 'RebaLive RW - Ibisomwa (Digital Library)';
    }
  }, [selectedArticle]);

  if (selectedArticle) {
    return (
      <div className="animate-in fade-in slide-in-from-bottom-10 duration-700 max-w-4xl mx-auto py-12 px-6 pb-40">
        <button 
          onClick={() => setSelectedArticle(null)}
          className="mb-12 flex items-center space-x-3 text-red-600 font-black uppercase text-xs tracking-widest hover:translate-x-[-4px] transition-transform"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M15 19l-7-7 7-7"/></svg>
          <span>Subira kuri Amakuru (Back to News)</span>
        </button>

        <header className="space-y-8 mb-16 text-center">
          <div className="flex justify-center items-center space-x-4">
             <span className="px-5 py-2 bg-red-600 rounded-full text-[10px] font-black uppercase tracking-widest">{selectedArticle.category}</span>
             <span className="text-neutral-500 font-bold uppercase text-[10px] tracking-[0.2em]">{selectedArticle.source} • {selectedArticle.time}</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black leading-tight tracking-tighter">{selectedArticle.title}</h1>
          <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-8 border-y border-white/5 py-8">
             <div className="flex items-center space-x-4">
                <div className="w-14 h-14 rounded-full bg-neutral-800 overflow-hidden ring-2 ring-white/5">
                    <img src={`https://picsum.photos/seed/${selectedArticle.author}/100/100`} alt="" />
                </div>
                <div className="text-left">
                    <p className="text-[10px] font-black text-neutral-500 uppercase tracking-widest">Inkuru yanditswe na</p>
                    <p className="font-black text-xl">{selectedArticle.author}</p>
                </div>
             </div>
             <div className="hidden md:block w-px h-10 bg-white/10"></div>
             <div className="text-neutral-500 font-bold text-sm">{selectedArticle.publishDate}</div>
          </div>
        </header>

        <div className="aspect-video rounded-[3.5rem] overflow-hidden mb-16 shadow-2xl relative border border-white/5">
          <img src={selectedArticle.image} className="w-full h-full object-cover" alt="" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
        </div>

        <article className="prose prose-invert prose-2xl mx-auto leading-relaxed text-neutral-300 font-medium">
           <p className="first-letter:text-8xl first-letter:font-black first-letter:text-red-600 first-letter:mr-4 first-letter:float-left first-letter:leading-[0.8]">
             {selectedArticle.fullStory?.split('\n\n')[0]}
           </p>
           {selectedArticle.fullStory?.split('\n\n').slice(1).map((para, i) => (
             <p key={i} className="mt-10">{para}</p>
           ))}
        </article>

        <footer className="mt-20 pt-10 border-t border-white/5 flex flex-col items-center">
           <p className="text-neutral-500 text-sm font-bold mb-6 italic">Basangize iyi nkuru (Share this story)</p>
           <div className="flex space-x-6">
              <button className="w-14 h-14 bg-white/5 rounded-full flex items-center justify-center hover:bg-red-600 transition-all border border-white/5 shadow-xl"><svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg></button>
              <button className="w-14 h-14 bg-white/5 rounded-full flex items-center justify-center hover:bg-red-600 transition-all border border-white/5 shadow-xl"><svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.84 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg></button>
              <button className="w-14 h-14 bg-white/5 rounded-full flex items-center justify-center hover:bg-red-600 transition-all border border-white/5 shadow-xl"><svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"/></svg></button>
           </div>
        </footer>
      </div>
    );
  }

  return (
    <div className="space-y-16 animate-in fade-in duration-500 pb-20">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 px-4 md:px-0">
        <div>
          <h1 className="text-5xl font-black tracking-tight">Ibisomwa (Library)</h1>
          <p className="text-neutral-500 font-bold text-lg mt-2">Soma amakuru n'inkuru zigezweho mu Rwanda.</p>
        </div>
      </header>

      {/* Featured News Carousel Style */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-10 px-4 md:px-0">
        <div 
          onClick={() => setSelectedArticle(mockArticles[0])}
          className="relative aspect-video rounded-[3.5rem] overflow-hidden group cursor-pointer shadow-2xl border border-white/5"
        >
          <img src={mockArticles[0].image} className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-[2s]" alt="" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
          <div className="absolute bottom-0 left-0 p-12 space-y-4">
             <span className="bg-red-600 px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-widest">Inkuru y'Igihe</span>
             <h2 className="text-4xl md:text-5xl font-black tracking-tighter leading-tight line-clamp-2">{mockArticles[0].title}</h2>
          </div>
        </div>

        <div className="space-y-8">
          <h3 className="text-xs font-black text-neutral-500 uppercase tracking-[0.4em] mb-4">Inkuru zishyizweho (Trending)</h3>
          <div className="space-y-6">
            {mockArticles.slice(1, 4).map(art => (
              <div 
                key={art.id} 
                onClick={() => setSelectedArticle(art)}
                className="flex items-center space-x-6 group cursor-pointer"
              >
                <div className="w-32 aspect-video rounded-3xl overflow-hidden flex-shrink-0 bg-neutral-900 border border-white/5">
                  <img src={art.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform" alt="" />
                </div>
                <div className="flex-grow">
                   <p className="text-[10px] font-black text-red-600 uppercase tracking-widest mb-1">{art.category}</p>
                   <h4 className="text-xl font-black leading-tight group-hover:text-red-500 transition-colors line-clamp-2">{art.title}</h4>
                   <p className="text-[10px] text-neutral-500 font-bold mt-1">{art.source} • {art.publishDate}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Digital Bookshelf */}
      <section className="bg-neutral-900/30 -mx-6 px-10 py-20 rounded-[4rem] border border-white/5 shadow-inner">
        <div className="flex items-center justify-between mb-12">
          <h2 className="text-3xl font-black flex items-center tracking-tight">
            <span className="w-2.5 h-10 bg-amber-500 rounded-full mr-5 shadow-[0_0_20px_rgba(245,158,11,0.4)]"></span>
            Ibitabo (Digital Bookshelf)
          </h2>
          <button className="text-[10px] font-black uppercase tracking-[0.3em] text-neutral-500 hover:text-amber-500 transition-colors">Reba byose</button>
        </div>
        
        <div className="flex overflow-x-auto gap-10 pb-10 hide-scrollbar scroll-smooth">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="flex-shrink-0 w-48 group cursor-pointer perspective-1000">
              <div className="aspect-[2/3] rounded-2xl overflow-hidden shadow-[0_30px_60px_-15px_rgba(0,0,0,0.8)] bg-neutral-900 mb-6 transition-all duration-700 group-hover:rotate-y-[-20deg] group-hover:scale-105 group-hover:translate-x-2 border border-white/5">
                <img src={`https://picsum.photos/seed/book-${i}/400/600`} alt="" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-transparent"></div>
              </div>
              <h4 className="font-black text-lg line-clamp-1 group-hover:text-amber-500 transition-colors tracking-tight">Inzozi za Kigali Vol. {i+1}</h4>
              <p className="text-[10px] text-neutral-500 uppercase font-black tracking-widest mt-1">M. Gasana • Literature</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Read;