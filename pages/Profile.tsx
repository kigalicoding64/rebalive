
import React from 'react';

const Profile: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto py-8 space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <section className="flex flex-col md:flex-row items-center space-y-6 md:space-y-0 md:space-x-8 pb-10 border-b border-white/10">
        <div className="relative group">
          <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-red-500 p-1 bg-black">
            <img src="https://picsum.photos/seed/user-main/300/300" className="w-full h-full rounded-full object-cover" alt="User" />
          </div>
          <button className="absolute bottom-1 right-1 bg-red-600 p-2 rounded-full border-4 border-black text-white hover:bg-red-500 transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
          </button>
        </div>
        <div className="text-center md:text-left space-y-2">
          <h1 className="text-3xl md:text-4xl font-black">Ishimwe Robert</h1>
          <p className="text-neutral-400">@robert_rw • Member since Jan 2024</p>
          <div className="flex flex-wrap justify-center md:justify-start gap-4 mt-4">
            <div className="bg-neutral-900 border border-neutral-800 px-4 py-2 rounded-xl text-center min-w-[100px]">
              <div className="text-amber-500 font-black text-xl">1,250</div>
              <div className="text-[10px] uppercase font-bold text-neutral-500">Credits</div>
            </div>
            <div className="bg-neutral-900 border border-neutral-800 px-4 py-2 rounded-xl text-center min-w-[100px]">
              <div className="text-red-500 font-black text-xl">42</div>
              <div className="text-[10px] uppercase font-bold text-neutral-500">Following</div>
            </div>
            <div className="bg-neutral-900 border border-neutral-800 px-4 py-2 rounded-xl text-center min-w-[100px]">
              <div className="text-white font-black text-xl">PRO</div>
              <div className="text-[10px] uppercase font-bold text-neutral-500">Plan</div>
            </div>
          </div>
        </div>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <section className="space-y-4">
           <h3 className="font-bold text-lg flex items-center">
             <svg className="w-5 h-5 mr-2 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"/></svg>
             Wallet & Monetization
           </h3>
           <div className="bg-neutral-900 rounded-2xl p-6 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm">Available Balance</span>
                <span className="font-bold text-lg">1,250 RWF</span>
              </div>
              <div className="flex space-x-3">
                <button className="flex-grow py-3 bg-red-600 rounded-xl font-bold text-sm hover:bg-red-500 transition-colors flex items-center justify-center space-x-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/></svg>
                  <span>Top up MoMo</span>
                </button>
                <button className="p-3 bg-neutral-800 rounded-xl hover:bg-neutral-700 transition-colors">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                </button>
              </div>
              <div className="p-4 bg-black/40 rounded-xl border border-white/5 space-y-2">
                <p className="text-[11px] text-neutral-500">REFER & EARN</p>
                <p className="text-xs">Invite 5 friends and get <span className="text-amber-500 font-bold">500 Credits</span> for free!</p>
                <div className="flex bg-neutral-800 rounded-lg p-2 items-center justify-between text-xs mt-2">
                  <code className="text-neutral-300">REBALIVE_ISH_50</code>
                  <button className="text-red-500 font-bold">COPY</button>
                </div>
              </div>
           </div>
        </section>

        <section className="space-y-4">
           <h3 className="font-bold text-lg flex items-center">
             <svg className="w-5 h-5 mr-2 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"/></svg>
             Settings & Preferences
           </h3>
           <div className="bg-neutral-900 rounded-2xl overflow-hidden border border-white/5">
              {[
                { label: 'Language', value: 'Kinyarwanda' },
                { label: 'Dark Mode', value: 'On' },
                { label: 'Data Saver', value: 'Off' },
                { label: 'Parental Controls', value: 'Locked' },
                { label: 'Privacy Policy', value: '>' },
              ].map((item, i) => (
                <button key={i} className="w-full px-6 py-4 flex items-center justify-between hover:bg-neutral-800 transition-colors border-b border-white/5 last:border-0">
                  <span className="text-sm text-neutral-300 font-medium">{item.label}</span>
                  <span className="text-sm font-bold text-red-500">{item.value}</span>
                </button>
              ))}
           </div>
           <button className="w-full py-4 text-neutral-500 hover:text-red-500 font-bold text-sm transition-colors mt-4">
             Log Out from RebaLive RW
           </button>
        </section>
      </div>

      <section className="space-y-4">
        <h3 className="font-bold text-lg">Continue Watching</h3>
        <div className="flex gap-4 overflow-x-auto pb-4 hide-scrollbar">
           {Array.from({ length: 3 }).map((_, i) => (
             <div key={i} className="flex-shrink-0 w-64 md:w-80 group cursor-pointer">
                <div className="relative aspect-video rounded-xl overflow-hidden bg-neutral-900">
                  <img src={`https://picsum.photos/seed/history-${i}/800/450`} className="w-full h-full object-cover opacity-60" alt="" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center">
                      <svg className="w-5 h-5 ml-0.5" fill="white" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                    </div>
                  </div>
                  <div className="absolute bottom-0 left-0 h-1 bg-red-600 transition-all duration-300" style={{ width: i === 0 ? '70%' : i === 1 ? '45%' : '12%' }}></div>
                </div>
                <div className="mt-2">
                   <h4 className="text-sm font-bold line-clamp-1">History Item {i+1}</h4>
                   <p className="text-[10px] text-neutral-500">24m remaining</p>
                </div>
             </div>
           ))}
        </div>
      </section>
    </div>
  );
};

export default Profile;
