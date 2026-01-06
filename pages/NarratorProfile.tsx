
import React, { useState } from 'react';
import { NarratorProfile as NarratorType, ContentItem, ContentType } from '../types';
import { MOCK_CONTENT } from '../constants';
import ContentCard from '../components/ContentCard';

interface NarratorProfileProps {
  narrator: NarratorType;
  isFollowing: boolean;
  onFollowToggle: (narratorId: string) => void;
  onItemClick: (item: ContentItem) => void;
  onBack: () => void;
}

const NarratorProfile: React.FC<NarratorProfileProps> = ({ 
  narrator, 
  isFollowing, 
  onFollowToggle, 
  onItemClick,
  onBack 
}) => {
  const narratorContent = MOCK_CONTENT.filter(c => c.narrator === narrator.name);

  return (
    <div className="min-h-screen bg-[#050505] text-white animate-in fade-in duration-500">
      {/* Banner */}
      <div className="relative h-64 md:h-96 w-full">
        <img src={narrator.banner} className="w-full h-full object-cover opacity-50" alt="" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] to-transparent"></div>
        <button 
          onClick={onBack}
          className="absolute top-8 left-8 p-3 bg-black/40 backdrop-blur-xl rounded-full border border-white/10 hover:bg-red-600 transition-all"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"/></svg>
        </button>
      </div>

      <div className="max-w-7xl mx-auto px-6 -mt-24 relative z-10 pb-20">
        <div className="flex flex-col md:flex-row items-center md:items-end md:space-x-10">
          <div className="w-48 h-48 rounded-[3rem] overflow-hidden ring-4 ring-[#050505] shadow-2xl bg-neutral-900 mb-6 md:mb-0">
            <img src={narrator.avatar} className="w-full h-full object-cover" alt={narrator.name} />
          </div>
          <div className="flex-grow text-center md:text-left space-y-4">
            <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-4">
              <h1 className="text-4xl md:text-6xl font-black">{narrator.name}</h1>
              {narrator.isVerified && (
                <div className="bg-blue-500 p-1.5 rounded-full">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/></svg>
                </div>
              )}
            </div>
            <p className="text-neutral-400 max-w-2xl font-medium">{narrator.bio}</p>
            <div className="flex items-center justify-center md:justify-start space-x-8 pt-2">
              <div className="text-center">
                <span className="block text-2xl font-black">{(narrator.followers / 1000).toFixed(0)}K</span>
                <span className="text-[10px] text-neutral-500 uppercase font-black">Followers</span>
              </div>
              <div className="text-center border-l border-white/10 pl-8">
                <span className="block text-2xl font-black">{(narrator.totalViews / 1000000).toFixed(1)}M</span>
                <span className="text-[10px] text-neutral-500 uppercase font-black">Total Views</span>
              </div>
              <div className="text-center border-l border-white/10 pl-8">
                <span className="block text-2xl font-black">{narratorContent.length}</span>
                <span className="text-[10px] text-neutral-500 uppercase font-black">Movies</span>
              </div>
            </div>
          </div>
          <div className="flex space-x-4 mt-8 md:mt-0">
            <button 
              onClick={() => onFollowToggle(narrator.id)}
              className={`px-12 py-4 rounded-2xl font-black text-sm transition-all shadow-xl ${
                isFollowing 
                ? 'bg-neutral-800 text-neutral-300 border border-white/10 hover:bg-red-600/20 hover:text-red-500' 
                : 'bg-red-600 text-white hover:bg-red-500'
              }`}
            >
              {isFollowing ? 'FOLLOWING' : 'FOLLOW NARRATOR'}
            </button>
            <button className="p-4 bg-amber-500 text-black rounded-2xl hover:bg-amber-400 transition-all shadow-xl shadow-amber-500/10">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
            </button>
          </div>
        </div>

        {/* Content Section */}
        <div className="mt-20">
          <div className="flex items-center justify-between mb-10">
            <h2 className="text-3xl font-black">Narrated by {narrator.name}</h2>
            <div className="flex space-x-2">
               <button className="px-4 py-2 bg-neutral-900 border border-white/5 rounded-xl text-xs font-bold text-neutral-400 hover:text-white transition-all">Latest</button>
               <button className="px-4 py-2 bg-neutral-900 border border-white/5 rounded-xl text-xs font-bold text-neutral-400 hover:text-white transition-all">Popular</button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {narratorContent.map(item => (
              <ContentCard key={item.id} item={item} onClick={onItemClick} />
            ))}
          </div>

          {narratorContent.length === 0 && (
            <div className="py-20 text-center opacity-40 italic">
              Nta mafilime uyu munasobanuzi afite ubu... (No movies yet)
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NarratorProfile;
