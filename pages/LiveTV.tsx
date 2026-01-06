
import React, { useState } from 'react';

const CHANNELS = [
  { id: 'rtv', name: 'RTV Rwanda', category: 'General', viewers: '12K', img: 'https://picsum.photos/seed/rtv/400/225' },
  { id: 'kc2', name: 'KC2 TV', category: 'Entertainment', viewers: '8.5K', img: 'https://picsum.photos/seed/kc2/400/225' },
  { id: 'flash', name: 'Flash TV', category: 'News', viewers: '5K', img: 'https://picsum.photos/seed/flash/400/225' },
  { id: 'isango', name: 'Isango Star TV', category: 'Music', viewers: '3.2K', img: 'https://picsum.photos/seed/isango/400/225' },
  { id: 'bt', name: 'BT TV', category: 'Youth', viewers: '2.1K', img: 'https://picsum.photos/seed/bt/400/225' },
  { id: 'yvg', name: 'Yego TV', category: 'Culture', viewers: '1.5K', img: 'https://picsum.photos/seed/yego/400/225' },
];

const LiveTV: React.FC = () => {
  const [activeChannel, setActiveChannel] = useState(CHANNELS[0]);

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Player Area */}
        <div className="flex-grow">
          <div className="relative aspect-video bg-black rounded-3xl overflow-hidden shadow-2xl ring-1 ring-white/5">
            <div className="absolute inset-0 flex items-center justify-center">
              <img src={activeChannel.img} className="w-full h-full object-cover opacity-50 blur-sm" alt="" />
              <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center space-y-4">
                 <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center animate-pulse">
                   <svg className="w-8 h-8 ml-1" fill="white" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                 </div>
                 <p className="text-white font-bold">Connecting to Live Stream...</p>
              </div>
            </div>
            
            <div className="absolute bottom-6 left-6 flex items-center space-x-4">
               <div className="px-3 py-1 bg-red-600 rounded text-[10px] font-black tracking-widest animate-pulse">LIVE</div>
               <div className="text-white font-black text-xl">{activeChannel.name}</div>
            </div>
            
            <div className="absolute top-6 right-6 flex items-center bg-black/50 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-white border border-white/10">
               <span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
               {activeChannel.viewers} watching
            </div>
          </div>
          
          <div className="mt-6 flex items-center justify-between">
             <div>
                <h2 className="text-2xl font-black">{activeChannel.name}: Evening Headlines</h2>
                <p className="text-neutral-500 text-sm mt-1">Streaming live from Kigali City HQ • {activeChannel.category}</p>
             </div>
             <div className="flex space-x-3">
               <button className="px-6 py-2 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-colors flex items-center space-x-2">
                 <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"/></svg>
                 <span className="text-sm font-bold">Share</span>
               </button>
             </div>
          </div>
        </div>

        {/* Channels List Area */}
        <div className="w-full lg:w-80 space-y-4">
          <h3 className="text-lg font-black tracking-tight flex items-center">
            <span className="w-2 h-2 bg-red-600 rounded-full mr-3"></span>
            Live Channels
          </h3>
          <div className="space-y-3 max-h-[600px] overflow-y-auto pr-2 custom-scroll">
            {CHANNELS.map(ch => (
              <div 
                key={ch.id}
                onClick={() => setActiveChannel(ch)}
                className={`group flex items-center p-3 rounded-2xl border transition-all cursor-pointer ${
                  activeChannel.id === ch.id 
                    ? 'bg-red-600/10 border-red-500' 
                    : 'bg-neutral-900/50 border-white/5 hover:border-white/10'
                }`}
              >
                <div className="w-16 h-10 rounded-lg overflow-hidden bg-black mr-4 flex-shrink-0">
                  <img src={ch.img} className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity" alt="" />
                </div>
                <div className="flex-grow">
                  <h4 className="text-sm font-bold line-clamp-1">{ch.name}</h4>
                  <div className="flex items-center text-[10px] text-neutral-500 mt-1">
                    <span className="flex items-center mr-2">
                       <span className="w-1.5 h-1.5 bg-red-500 rounded-full mr-1.5"></span>
                       {ch.viewers}
                    </span>
                    <span>• {ch.category}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiveTV;
