
import React, { useState } from 'react';

const Profile: React.FC = () => {
  const [lowDataMode, setLowDataMode] = useState(false);

  return (
    <div className="max-w-5xl mx-auto py-8 space-y-12 animate-in fade-in duration-700">
      {/* Premium Profile Header */}
      <section className="flex flex-col md:flex-row items-center gap-8 pb-12 border-b border-white/5">
        <div className="relative">
          <div className="w-32 h-32 md:w-48 md:h-48 rounded-[2.5rem] overflow-hidden rotate-3 hover:rotate-0 transition-transform duration-500 ring-4 ring-red-600/20 p-2 bg-neutral-900 shadow-2xl">
            <img src="https://picsum.photos/seed/robert/400/400" className="w-full h-full rounded-[2rem] object-cover" alt="" />
          </div>
          <div className="absolute -bottom-2 -right-2 bg-amber-500 text-black font-black text-[10px] px-3 py-1 rounded-full shadow-lg">PRO</div>
        </div>
        
        <div className="text-center md:text-left space-y-4">
          <div>
            <h1 className="text-4xl md:text-6xl font-black tracking-tight">Ishimwe Robert</h1>
            <p className="text-neutral-500 font-medium text-lg">Digital Content Creator • Kigali, RW</p>
          </div>
          
          <div className="flex flex-wrap justify-center md:justify-start gap-4">
            <div className="px-6 py-3 bg-neutral-900 border border-white/5 rounded-2xl shadow-xl">
              <span className="block text-2xl font-black text-amber-500">2,450</span>
              <span className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest">Credits</span>
            </div>
            <div className="px-6 py-3 bg-neutral-900 border border-white/5 rounded-2xl shadow-xl">
              <span className="block text-2xl font-black text-red-500">12</span>
              <span className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest">Owned Books</span>
            </div>
          </div>
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {/* Referral Dashboard */}
          <div className="bg-gradient-to-br from-neutral-800 to-neutral-900 p-8 rounded-[2.5rem] border border-white/5 shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-red-600/10 rounded-full -mr-32 -mt-32 blur-3xl group-hover:bg-red-600/20 transition-colors"></div>
            <h3 className="text-2xl font-black mb-2">Referral Dashboard</h3>
            <p className="text-neutral-400 text-sm mb-8">Empower others to join the digital revolution. Earn 50 Credits for every friend who signs up.</p>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-black/20 p-4 rounded-2xl">
                <p className="text-[10px] font-bold text-neutral-500 uppercase mb-1">Total Invites</p>
                <p className="text-3xl font-black">48</p>
              </div>
              <div className="bg-black/20 p-4 rounded-2xl">
                <p className="text-[10px] font-bold text-neutral-500 uppercase mb-1">Credits Earned</p>
                <p className="text-3xl font-black text-amber-500">2,400</p>
              </div>
              <div className="bg-black/20 p-4 rounded-2xl">
                <p className="text-[10px] font-bold text-neutral-500 uppercase mb-1">Rank</p>
                <p className="text-3xl font-black text-blue-500">Silver</p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <div className="flex-grow bg-black/40 border border-white/10 p-5 rounded-2xl font-mono text-sm text-neutral-300 uppercase tracking-[0.3em] flex items-center justify-between">
                <span>REBALIVE_ISH_50</span>
                <svg className="w-5 h-5 opacity-40" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2"/></svg>
              </div>
              <button className="bg-white text-black px-8 py-5 rounded-2xl font-black text-sm hover:bg-neutral-200 transition-colors shadow-xl">COPY</button>
            </div>
          </div>

          {/* Settings Section */}
          <div className="space-y-6">
             <h3 className="text-2xl font-black px-2">App Settings</h3>
             <div className="bg-neutral-900/50 rounded-[2.5rem] border border-white/5 overflow-hidden shadow-xl">
                <div className="p-8 flex items-center justify-between border-b border-white/5">
                   <div>
                      <h4 className="font-bold text-lg">Low Data Mode</h4>
                      <p className="text-sm text-neutral-500">Optimizes video streaming for low-bandwidth connections.</p>
                   </div>
                   <button 
                     onClick={() => setLowDataMode(!lowDataMode)}
                     className={`w-14 h-8 rounded-full transition-all relative ${lowDataMode ? 'bg-red-600' : 'bg-neutral-800'}`}
                   >
                     <div className={`absolute top-1 w-6 h-6 rounded-full bg-white transition-all ${lowDataMode ? 'left-7 shadow-lg shadow-black/20' : 'left-1'}`}></div>
                   </button>
                </div>
                {[
                  { label: 'Kinyarwanda Interface', desc: 'Enable native language support across the app.', value: 'Enabled' },
                  { label: 'Download over Wi-Fi only', desc: 'Saves your MoMo data balance.', value: 'On' },
                  { label: 'Notifications', desc: 'New content and breaking news alerts.', value: 'On' }
                ].map((item, i) => (
                  <div key={i} className="p-8 flex items-center justify-between border-b border-white/5 last:border-0 hover:bg-white/5 transition-colors cursor-pointer">
                    <div>
                        <h4 className="font-bold text-lg">{item.label}</h4>
                        <p className="text-sm text-neutral-500">{item.desc}</p>
                    </div>
                    <span className="text-red-500 font-black text-xs uppercase tracking-widest">{item.value}</span>
                  </div>
                ))}
             </div>
          </div>
        </div>

        <div className="space-y-6">
           <div className="bg-neutral-900 p-8 rounded-[2.5rem] border border-white/5 shadow-xl">
              <h3 className="font-black text-xl mb-6 flex items-center">
                 <svg className="w-6 h-6 mr-3 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"/></svg>
                 Quick MoMo Payout
              </h3>
              <div className="space-y-4">
                 <div className="p-6 bg-black/40 rounded-3xl border border-white/5 flex items-center justify-between">
                   <div className="text-[10px] font-black text-neutral-500 uppercase">Current Balance</div>
                   <div className="font-black text-xl">RWF 12,400</div>
                 </div>
                 <button className="w-full py-5 bg-amber-500 text-black font-black text-xs rounded-2xl hover:shadow-[0_0_30px_rgba(245,158,11,0.3)] transition-all uppercase tracking-widest">Withdraw Credits</button>
                 <p className="text-[10px] text-center text-neutral-500">Min. withdrawal: 1,000 RWF</p>
              </div>
           </div>

           <div className="bg-red-600/10 p-8 rounded-[2.5rem] border border-red-500/20 shadow-xl">
              <h3 className="font-black text-xl mb-4">Support Local</h3>
              <p className="text-sm text-neutral-300 leading-relaxed mb-6">Your Premium subscription directly fuels Rwandan filmmakers, musicians, and journalists. Together we build our culture.</p>
              <button className="w-full py-4 bg-red-600 text-white font-black text-xs rounded-2xl hover:bg-red-500 transition-colors uppercase tracking-widest shadow-lg">Upgrade Profile</button>
           </div>
           
           <button className="w-full py-4 text-neutral-500 hover:text-red-500 font-black text-sm transition-colors border-2 border-transparent hover:border-red-500/20 rounded-2xl">
             Log Out from RebaLive RW
           </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
