import React, { useState, useEffect } from 'react';
import { MOCK_CONTENT, NARRATORS } from '../constants';
import ContentCard from '../components/ContentCard';
import { ContentType, ContentItem } from '../types';

interface HomeProps {
  onItemClick?: (item: ContentItem) => void;
  onPlayItem?: (item: ContentItem) => void;
}

const Home: React.FC<HomeProps> = ({ onItemClick, onPlayItem }) => {
  const agasobanuyeContent = MOCK_CONTENT.filter(c => c.type === ContentType.AGASOBANUYE);
  
  // Featured slides for the cinematic hero
  const featuredSlides = [
    agasobanuyeContent[agasobanuyeContent.length - 1],
    agasobanuyeContent[agasobanuyeContent.length - 2],
    MOCK_CONTENT.find(c => c.id === 'hero-main')!,
    agasobanuyeContent[0]
  ].filter(Boolean);

  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % featuredSlides.length);
    }, 8000);
    return () => clearInterval(timer);
  }, [featuredSlides.length]);

  return (
    <div className="space-y-16 animate-in fade-in duration-1000">
      {/* Immersive Cinematic Hero Carousel */}
      <section className="relative h-[70vh] md:h-[85vh] rounded-[3.5rem] overflow-hidden group shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)]">
        {featuredSlides.map((slide, index) => (
          <div 
            key={slide.id}
            className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
              index === currentSlide ? 'opacity-100 scale-100 z-10' : 'opacity-0 scale-110 z-0'
            }`}
          >
            <img 
              src={slide.thumbnail} 
              className="w-full h-full object-cover" 
              alt={slide.title} 
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black via-black/60 to-transparent"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
            
            <div className="absolute inset-0 flex flex-col justify-end p-10 md:p-24 space-y-8 max-w-7xl mx-auto">
              <div className={`space-y-6 transition-all duration-1000 delay-300 ${index === currentSlide ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                <div className="flex items-center space-x-4">
                   <span className="bg-red-600 px-5 py-2 rounded-full text-[10px] font-black tracking-[0.3em] uppercase shadow-lg shadow-red-600/40">Hot Premiere</span>
                   <span className="text-white/80 font-black text-xs uppercase tracking-[0.2em]">{slide.narrator || slide.creator} Exclusive</span>
                </div>
                <h1 className="text-5xl md:text-9xl font-black max-w-4xl leading-[0.85] tracking-tighter drop-shadow-2xl">
                  {slide.title}
                </h1>
                <p className="text-neutral-300 max-w-2xl text-lg font-medium line-clamp-2 md:line-clamp-none opacity-80">
                  {slide.description}
                </p>
                <div className="flex flex-wrap gap-5 pt-4">
                  <button 
                    onClick={() => onPlayItem?.(slide)}
                    className="bg-red-600 text-white px-16 py-6 rounded-[2rem] font-black flex items-center space-x-4 hover:bg-red-500 transition-all transform hover:scale-105 shadow-[0_25px_60px_rgba(239,68,68,0.5)] active:scale-95"
                  >
                    <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                    <span className="text-xl">REBA NONAHA</span>
                  </button>
                  <button 
                    onClick={() => onItemClick?.(slide)}
                    className="bg-white/10 backdrop-blur-3xl text-white border border-white/20 px-12 py-6 rounded-[2rem] font-black hover:bg-white/20 transition-all text-lg"
                  >
                    IBINDI BIRAMBUYE
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Carousel Indicators */}
        <div className="absolute bottom-12 right-12 z-20 flex space-x-3">
          {featuredSlides.map((_, i) => (
            <button 
              key={i}
              onClick={() => setCurrentSlide(i)}
              className={`h-1.5 rounded-full transition-all duration-500 ${currentSlide === i ? 'w-12 bg-red-600 shadow-[0_0_15px_rgba(239,68,68,0.8)]' : 'w-3 bg-white/30 hover:bg-white/50'}`}
            />
          ))}
        </div>
      </section>

      {/* Grid: Agasobanuye Masterpieces */}
      <section>
        <div className="flex items-center justify-between mb-10">
          <div className="flex items-center space-x-5">
             <div className="w-2.5 h-12 bg-red-600 rounded-full shadow-[0_0_20px_rgba(239,68,68,0.5)]"></div>
             <h2 className="text-4xl md:text-5xl font-black tracking-tighter">Agasobanuye Classics</h2>
          </div>
          <button className="text-[10px] font-black uppercase tracking-[0.3em] text-neutral-500 hover:text-red-600 transition-colors">Reba Byose (View All)</button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-x-8 gap-y-14">
          {agasobanuyeContent.map(item => (
            <ContentCard 
              key={item.id} 
              item={item} 
              onClick={onItemClick} 
              onQuickPlay={onPlayItem} 
            />
          ))}
        </div>
      </section>

      {/* Narrator Network Section */}
      <section className="bg-neutral-950 dark:bg-neutral-900/20 -mx-6 px-10 py-24 rounded-[5rem] border border-white/5 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-red-600/5 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-amber-500/5 rounded-full blur-[120px]"></div>
        
        <div className="relative z-10">
          <h3 className="text-sm font-black text-red-600 uppercase tracking-[0.6em] mb-16 text-center">Narrator Network • Abanasobanuzi</h3>
          <div className="flex justify-center flex-wrap gap-12 md:gap-20">
             {NARRATORS.map(n => (
               <div key={n.id} className="group cursor-pointer flex flex-col items-center space-y-6">
                 <div className="relative w-36 h-36 md:w-52 md:h-52 rounded-[4rem] overflow-hidden ring-4 ring-white/5 group-hover:ring-red-600 transition-all duration-700 shadow-[0_40px_80px_-15px_rgba(0,0,0,0.6)] group-hover:-translate-y-4">
                   <img src={n.avatar} className="w-full h-full object-cover transition-all group-hover:scale-110" alt={n.name} />
                   <div className="absolute inset-0 bg-black/30 group-hover:bg-transparent transition-colors"></div>
                   <div className="absolute bottom-4 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all translate-y-4 group-hover:translate-y-0">
                      <span className="bg-red-600 text-white text-[8px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full whitespace-nowrap">Sura Umwirondoro</span>
                   </div>
                 </div>
                 <div className="text-center">
                   <h4 className="font-black text-xl tracking-tight">{n.name}</h4>
                   <p className="text-[10px] text-neutral-500 uppercase font-black tracking-[0.2em] mt-1">Verified Artist</p>
                 </div>
               </div>
             ))}
          </div>
        </div>
      </section>

      {/* Recent Additions with National Flair */}
      <section>
        <div className="flex items-center space-x-5 mb-10">
           <div className="w-2.5 h-12 bg-amber-500 rounded-full shadow-[0_0_20px_rgba(245,158,11,0.5)]"></div>
           <h2 className="text-4xl md:text-5xl font-black tracking-tighter">Ibirimo Gushyashya</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {MOCK_CONTENT.slice(0, 8).map(item => (
            <ContentCard 
              key={item.id} 
              item={item} 
              variant="vertical" 
              onClick={onItemClick} 
              onQuickPlay={onPlayItem} 
            />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;