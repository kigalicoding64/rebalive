
import React from 'react';

const AdminDashboard: React.FC = () => {
  return (
    <div className="space-y-10 animate-in fade-in duration-700">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black">System Administration</h1>
          <p className="text-neutral-500 text-sm mt-1">Global platform overview, content moderation, and revenue tracking.</p>
        </div>
        <div className="flex space-x-3">
          <button className="px-6 py-2.5 bg-red-600 text-white font-black text-sm rounded-xl hover:bg-red-500 transition-colors shadow-xl shadow-red-600/20">Sync All Sources</button>
          <button className="px-6 py-2.5 bg-neutral-900 border border-white/10 rounded-xl hover:bg-neutral-800 transition-colors">Export Logs</button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Total Revenue', value: 'RWF 12.4M', color: 'text-amber-500' },
          { label: 'Active Subscriptions', value: '4,520', color: 'text-red-500' },
          { label: 'Pending Moderation', value: '128', color: 'text-white' },
          { label: 'Sync Status', value: 'Healthy', color: 'text-green-500' },
        ].map((stat, i) => (
          <div key={i} className="bg-neutral-900/50 p-6 rounded-3xl border border-white/5 shadow-xl">
             <p className="text-[10px] font-black text-neutral-500 uppercase tracking-widest">{stat.label}</p>
             <h3 className={`text-2xl font-black mt-2 ${stat.color}`}>{stat.value}</h3>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <h3 className="text-xl font-black">Recent Activity</h3>
          <div className="bg-neutral-900/30 rounded-[2.5rem] border border-white/5 overflow-hidden">
             {[
               { id: 1, action: 'Agasobanuye Uploaded', actor: 'Yanga Junior', time: '12m ago', status: 'Approved' },
               { id: 2, action: 'MoMo Payout Processed', actor: 'Knowles', time: '45m ago', status: 'Success' },
               { id: 3, action: 'External Sync Started', actor: 'System', time: '1h ago', status: 'In Progress' },
               { id: 4, action: 'User Report - Harassment', actor: 'Moderation Bot', time: '2h ago', status: 'Pending' },
             ].map(item => (
               <div key={item.id} className="p-6 border-b border-white/5 last:border-0 flex items-center justify-between hover:bg-white/5 transition-colors cursor-pointer">
                  <div className="flex items-center space-x-4">
                     <div className="w-10 h-10 rounded-xl bg-neutral-800 flex items-center justify-center text-red-500">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                     </div>
                     <div>
                        <h4 className="font-bold text-sm">{item.action}</h4>
                        <p className="text-[10px] text-neutral-500 font-bold uppercase tracking-widest mt-0.5">{item.actor} • {item.time}</p>
                     </div>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase ${
                    item.status === 'Approved' || item.status === 'Success' ? 'bg-green-600/10 text-green-500' : 'bg-amber-600/10 text-amber-500'
                  }`}>{item.status}</span>
               </div>
             ))}
          </div>
        </div>

        <div className="space-y-8">
           <h3 className="text-xl font-black">Quick Actions</h3>
           <div className="grid grid-cols-1 gap-4">
              <button className="flex items-center p-4 bg-neutral-900 rounded-2xl border border-white/5 hover:border-red-500/30 transition-all text-left group">
                 <div className="w-12 h-12 rounded-xl bg-red-600/10 flex items-center justify-center text-red-600 mr-4 group-hover:bg-red-600 group-hover:text-white transition-all">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"/></svg>
                 </div>
                 <div>
                    <h4 className="font-bold text-sm">Add New Movie</h4>
                    <p className="text-[10px] text-neutral-500">Upload video & metadata</p>
                 </div>
              </button>
              <button className="flex items-center p-4 bg-neutral-900 rounded-2xl border border-white/5 hover:border-red-500/30 transition-all text-left group">
                 <div className="w-12 h-12 rounded-xl bg-amber-600/10 flex items-center justify-center text-amber-600 mr-4 group-hover:bg-amber-600 group-hover:text-black transition-all">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.246.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/></svg>
                 </div>
                 <div>
                    <h4 className="font-bold text-sm">Upload Book</h4>
                    <p className="text-[10px] text-neutral-500">E-Book Store management</p>
                 </div>
              </button>
              <button className="flex items-center p-4 bg-neutral-900 rounded-2xl border border-white/5 hover:border-red-500/30 transition-all text-left group">
                 <div className="w-12 h-12 rounded-xl bg-blue-600/10 flex items-center justify-center text-blue-600 mr-4 group-hover:bg-blue-600 group-hover:text-white transition-all">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/></svg>
                 </div>
                 <div>
                    <h4 className="font-bold text-sm">Moderate Content</h4>
                    <p className="text-[10px] text-neutral-500">Review flagged comments</p>
                 </div>
              </button>
           </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
