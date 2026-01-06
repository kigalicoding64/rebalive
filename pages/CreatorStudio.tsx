
import React from 'react';

const CreatorStudio: React.FC = () => {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-black">Creator Studio</h1>
          <p className="text-neutral-400">Manage your channel, upload content, and track your revenue.</p>
        </div>
        <button className="bg-red-600 hover:bg-red-500 text-white font-bold px-6 py-2.5 rounded-xl flex items-center space-x-2 transition-all transform hover:scale-105">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"/></svg>
          <span>Upload Content</span>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Views', value: '1.2M', trend: '+12%', color: 'text-white' },
          { label: 'Subscribers', value: '45.2K', trend: '+2.4K', color: 'text-red-500' },
          { label: 'Credits Earned', value: '850K', trend: 'RWF 850,000', color: 'text-amber-500' },
          { label: 'Watch Time', value: '124.5K h', trend: '+5%', color: 'text-white' },
        ].map((stat, i) => (
          <div key={i} className="bg-neutral-900/50 border border-white/5 p-5 rounded-2xl">
            <p className="text-xs text-neutral-500 font-bold uppercase tracking-widest">{stat.label}</p>
            <div className="flex items-baseline justify-between mt-2">
              <h3 className={`text-2xl font-black ${stat.color}`}>{stat.value}</h3>
              <span className="text-[10px] font-bold text-green-500">{stat.trend}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          <h3 className="text-lg font-bold">Recent Uploads</h3>
          <div className="bg-neutral-900/30 rounded-2xl border border-white/5 overflow-hidden">
            {[1, 2, 3].map((item) => (
              <div key={item} className="flex items-center p-4 border-b border-white/5 last:border-0 hover:bg-neutral-800/50 transition-colors group">
                <div className="w-32 aspect-video rounded-lg overflow-hidden bg-neutral-800 flex-shrink-0">
                  <img src={`https://picsum.photos/seed/studio-${item}/320/180`} className="w-full h-full object-cover" alt="" />
                </div>
                <div className="ml-4 flex-grow">
                  <h4 className="text-sm font-bold group-hover:text-red-500 transition-colors">Kigali Tech Summit Day {item}</h4>
                  <p className="text-[10px] text-neutral-500 mt-1">Uploaded 4h ago • 12:45 • Public</p>
                  <div className="flex space-x-4 mt-2">
                    <span className="text-[10px] text-neutral-400">👁️ 1.2K</span>
                    <span className="text-[10px] text-neutral-400">💬 45</span>
                    <span className="text-[10px] text-green-500">💰 120 CR</span>
                  </div>
                </div>
                <button className="p-2 text-neutral-500 hover:text-white">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/></svg>
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-gradient-to-br from-red-600/20 to-transparent p-6 rounded-2xl border border-red-500/20">
            <h3 className="font-bold text-lg mb-2">Creator Program</h3>
            <p className="text-sm text-neutral-400 mb-4">You are currently a <span className="text-red-500 font-bold">Verified Creator</span>. Level up to Gold to earn 20% more from Ads.</p>
            <div className="w-full bg-neutral-800 h-2 rounded-full overflow-hidden">
              <div className="bg-red-600 h-full w-[65%]"></div>
            </div>
            <p className="text-[10px] text-neutral-500 mt-2">65% to Gold Creator Status</p>
          </div>

          <div className="bg-neutral-900 p-6 rounded-2xl border border-white/5">
            <h3 className="font-bold text-lg mb-4">Payout Summary</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center text-sm">
                <span className="text-neutral-400">Total Credits</span>
                <span className="font-bold">850,000 CR</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-neutral-400">Withdrawable</span>
                <span className="font-bold text-green-500">RWF 720,000</span>
              </div>
              <button className="w-full py-2.5 bg-amber-500 text-black font-black text-xs rounded-xl hover:bg-amber-400 transition-colors shadow-lg shadow-amber-500/10">
                WITHDRAW TO MOMO / AIRTEL
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatorStudio;
