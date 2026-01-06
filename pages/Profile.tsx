
import React, { useState } from 'react';
import { MOCK_CONTENT, MOCK_BOOKS } from '../constants';
import { Language, UserProfile as UserProfileType } from '../types';

type ProfileTab = 'dashboard' | 'finance' | 'library' | 'settings';

const Profile: React.FC = () => {
  const [activeTab, setActiveTab] = useState<ProfileTab>('dashboard');
  const [isEditing, setIsEditing] = useState(false);
  const [lowDataMode, setLowDataMode] = useState(false);
  
  // Local state for the user to simulate real-time updates
  const [user, setUser] = useState<UserProfileType>({
    id: 'user-1',
    name: 'Ishimwe Robert',
    avatar: 'https://picsum.photos/seed/robert/400/400',
    credits: 2450,
    role: 'CREATOR',
    language: Language.RW,
    isPremium: true,
    watchHistory: ['agas-1', 'music-1'],
    ownedBooks: ['book-1', 'book-5'],
    downloadedIds: ['hero-1', 'agas-2'],
    followingNarrators: ['sankara']
  });

  const [transactions] = useState([
    { id: 'tx-1', type: 'DEPOSIT', method: 'MTN MoMo', amount: 5000, date: '2024-05-20', status: 'COMPLETED' },
    { id: 'tx-2', type: 'PURCHASE', item: 'John Wick 4 (Agasobanuye)', amount: -200, date: '2024-05-18', status: 'COMPLETED' },
    { id: 'tx-3', type: 'REFERRAL', from: 'Kezia B.', amount: 50, date: '2024-05-15', status: 'COMPLETED' },
  ]);

  const stats = [
    { label: 'Credits', value: user.credits.toLocaleString(), sub: 'RWF 1 = 1 CR', color: 'text-amber-500' },
    { label: 'Downloads', value: user.downloadedIds.length.toString(), sub: 'Offline ready', color: 'text-red-500' },
    { label: 'Books', value: user.ownedBooks.length.toString(), sub: 'In Library', color: 'text-blue-500' },
  ];

  const handleSaveProfile = () => {
    setIsEditing(false);
    // In a real app, send to API
  };

  const renderDashboard = () => (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Referral System */}
      <div className="bg-gradient-to-br from-neutral-900 to-black p-8 rounded-[2.5rem] border border-white/5 relative overflow-hidden group">
        <div className="relative z-10">
          <h3 className="text-2xl font-black mb-2">Refer & Earn</h3>
          <p className="text-neutral-400 text-sm max-w-md mb-6">Earn 50 Credits for every friend who joins RebaLive RW using your unique code.</p>
          <div className="flex items-center space-x-3 max-w-md">
            <div className="flex-grow bg-black/40 border border-white/10 p-4 rounded-2xl font-mono text-sm tracking-widest text-neutral-300">
              REBALIVE_ISH_50
            </div>
            <button className="bg-white text-black px-6 py-4 rounded-2xl font-black text-xs hover:bg-neutral-200 transition-all">COPY</button>
          </div>
        </div>
        <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-red-600/10 rounded-full blur-3xl group-hover:bg-red-600/20 transition-colors"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-neutral-900/40 p-8 rounded-[2.5rem] border border-white/5">
          <h3 className="text-xl font-black mb-6">Recent History</h3>
          <div className="space-y-4">
            {user.watchHistory.map((id, i) => {
              const item = MOCK_CONTENT.find(c => c.id === id);
              return (
                <div key={i} className="flex items-center space-x-4 p-3 hover:bg-white/5 rounded-2xl transition-all cursor-pointer">
                  <img src={item?.thumbnail} className="w-16 h-10 rounded-lg object-cover" alt="" />
                  <div>
                    <p className="text-sm font-bold truncate">{item?.title}</p>
                    <p className="text-[10px] text-neutral-500 uppercase font-black tracking-widest">Watched 2h ago</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        
        <div className="bg-neutral-900/40 p-8 rounded-[2.5rem] border border-white/5 flex flex-col justify-center items-center text-center">
          <div className="w-20 h-20 bg-amber-500/10 rounded-full flex items-center justify-center text-amber-500 mb-4">
            <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
          </div>
          <h3 className="text-xl font-black mb-2">MoMo Rewards</h3>
          <p className="text-neutral-500 text-sm mb-6">Complete your daily profile tasks to earn bonus credits.</p>
          <button className="px-8 py-3 bg-amber-500 text-black font-black text-xs rounded-xl shadow-xl shadow-amber-500/10 uppercase tracking-widest">View Tasks</button>
        </div>
      </div>
    </div>
  );

  const renderFinance = () => (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 bg-gradient-to-br from-amber-600 to-amber-700 p-10 rounded-[3rem] text-white shadow-2xl relative overflow-hidden group">
          <div className="relative z-10">
            <p className="text-[10px] font-black uppercase tracking-[0.3em] opacity-80 mb-2">Total Wallet Balance</p>
            <h2 className="text-6xl font-black tracking-tighter">RWF {user.credits.toLocaleString()}</h2>
            <div className="mt-10 flex space-x-4">
              <button className="px-8 py-4 bg-white text-black rounded-2xl font-black text-xs uppercase tracking-widest hover:scale-105 transition-all shadow-xl">Top up via MoMo</button>
              <button className="px-8 py-4 bg-black/20 backdrop-blur-md rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-black/40 transition-all">Withdraw</button>
            </div>
          </div>
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-20 -mt-20 blur-3xl"></div>
        </div>
        
        <div className="bg-neutral-900/50 p-8 rounded-[3rem] border border-white/5 flex flex-col justify-center">
           <p className="text-[10px] font-black text-neutral-500 uppercase tracking-widest mb-4 text-center">Referral Earnings</p>
           <h4 className="text-3xl font-black text-center text-amber-500 mb-6">+ RWF 2,400</h4>
           <div className="flex items-center justify-between text-xs font-bold border-t border-white/5 pt-6">
              <span className="text-neutral-500">Active Refers</span>
              <span>48 People</span>
           </div>
        </div>
      </div>

      <div className="bg-neutral-900/30 rounded-[3rem] border border-white/5 overflow-hidden">
        <div className="p-8 border-b border-white/5 flex items-center justify-between">
          <h3 className="text-xl font-black">Transaction History</h3>
          <button className="text-[10px] font-black text-amber-500 uppercase tracking-widest hover:underline">Download PDF</button>
        </div>
        <div className="divide-y divide-white/5">
          {transactions.map(tx => (
            <div key={tx.id} className="p-6 flex items-center justify-between hover:bg-white/5 transition-all cursor-default">
              <div className="flex items-center space-x-4">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${tx.type === 'DEPOSIT' ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'}`}>
                  {tx.type === 'DEPOSIT' ? (
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"/></svg>
                  ) : (
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 12H4"/></svg>
                  )}
                </div>
                <div>
                  <p className="font-bold text-sm">{tx.type === 'DEPOSIT' ? 'Credits Added' : (tx.item || 'Service Fee')}</p>
                  <p className="text-[10px] text-neutral-500 font-bold uppercase tracking-widest">{tx.method || 'System'} • {tx.date}</p>
                </div>
              </div>
              <div className="text-right">
                <p className={`font-black ${tx.amount > 0 ? 'text-green-500' : 'text-white'}`}>
                  {tx.amount > 0 ? '+' : ''}{tx.amount} CR
                </p>
                <p className="text-[9px] text-neutral-600 font-black uppercase">Successful</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderLibrary = () => (
    <div className="space-y-12 animate-in fade-in duration-500">
      <section>
        <h3 className="text-xl font-black mb-6 border-l-4 border-red-600 pl-4">Downloaded Content</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {user.downloadedIds.map(id => {
            const item = MOCK_CONTENT.find(c => c.id === id);
            return (
              <div key={id} className="group cursor-pointer">
                <div className="aspect-video rounded-2xl overflow-hidden mb-3 relative shadow-lg">
                  <img src={item?.thumbnail} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt="" />
                  <div className="absolute top-2 right-2 p-1.5 bg-green-500 text-white rounded-lg shadow-xl">
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/></svg>
                  </div>
                </div>
                <h4 className="font-bold text-xs truncate group-hover:text-red-500 transition-colors">{item?.title}</h4>
                <p className="text-[10px] text-neutral-500 uppercase tracking-widest mt-1">450 MB • MP4</p>
              </div>
            );
          })}
        </div>
      </section>

      <section>
        <h3 className="text-xl font-black mb-6 border-l-4 border-blue-600 pl-4">Digital Book Shelf</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6 gap-6">
          {user.ownedBooks.map(id => {
            const book = MOCK_BOOKS.find(b => b.id === id);
            return (
              <div key={id} className="group cursor-pointer">
                <div className="aspect-[2/3] rounded-xl overflow-hidden mb-3 shadow-2xl transition-transform group-hover:-translate-y-2">
                  <img src={book?.thumbnail} className="w-full h-full object-cover" alt="" />
                </div>
                <h4 className="font-bold text-xs truncate">{book?.title}</h4>
                <p className="text-[9px] text-neutral-500 uppercase font-black tracking-widest mt-1">Owned</p>
              </div>
            );
          })}
          <div className="aspect-[2/3] rounded-xl border-2 border-dashed border-white/5 flex flex-col items-center justify-center text-neutral-700 hover:border-white/10 hover:text-neutral-500 transition-all cursor-pointer">
             <svg className="w-8 h-8 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"/></svg>
             <span className="text-[10px] font-black uppercase tracking-widest">Buy More</span>
          </div>
        </div>
      </section>
    </div>
  );

  const renderSettings = () => (
    <div className="max-w-3xl space-y-8 animate-in fade-in duration-500">
      <div className="bg-neutral-900/40 rounded-[2.5rem] border border-white/5 overflow-hidden">
        <div className="p-8 border-b border-white/5">
           <h3 className="text-xl font-black mb-1">Account Preference</h3>
           <p className="text-sm text-neutral-500">Manage your RebaLive experience across devices.</p>
        </div>
        <div className="divide-y divide-white/5">
          <div className="p-8 flex items-center justify-between">
             <div>
                <h4 className="font-bold text-lg">Low Data Mode</h4>
                <p className="text-sm text-neutral-500">Optimizes streaming for 3G/Low bandwidth.</p>
             </div>
             <button 
               onClick={() => setLowDataMode(!lowDataMode)}
               className={`w-14 h-8 rounded-full transition-all relative ${lowDataMode ? 'bg-red-600' : 'bg-neutral-800'}`}
             >
               <div className={`absolute top-1 w-6 h-6 rounded-full bg-white transition-all ${lowDataMode ? 'left-7' : 'left-1'}`}></div>
             </button>
          </div>
          <div className="p-8 flex items-center justify-between group cursor-pointer hover:bg-white/5 transition-all">
             <div>
                <h4 className="font-bold text-lg">Default Language</h4>
                <p className="text-sm text-neutral-500">Current: Kinyarwanda</p>
             </div>
             <svg className="w-5 h-5 text-neutral-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/></svg>
          </div>
          <div className="p-8 flex items-center justify-between group cursor-pointer hover:bg-white/5 transition-all">
             <div>
                <h4 className="font-bold text-lg">Download Quality</h4>
                <p className="text-sm text-neutral-500">High (720p)</p>
             </div>
             <svg className="w-5 h-5 text-neutral-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/></svg>
          </div>
        </div>
      </div>

      <div className="bg-red-600/5 rounded-[2.5rem] border border-red-500/10 p-8 space-y-6">
        <h3 className="text-xl font-black text-red-500">Danger Zone</h3>
        <div className="flex flex-col sm:flex-row gap-4">
           <button className="px-8 py-4 bg-red-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-red-500 transition-all">Log out of all devices</button>
           <button className="px-8 py-4 border border-red-500/30 text-red-500 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-red-500/10 transition-all">Delete Account</button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto py-10 px-4 md:px-0 space-y-12 animate-in fade-in duration-700">
      {/* Profile Header */}
      <section className="flex flex-col md:flex-row items-center gap-10">
        <div className="relative group">
          <div className="w-40 h-40 md:w-56 md:h-56 rounded-[3rem] overflow-hidden p-2 bg-neutral-900 ring-4 ring-white/5 group-hover:ring-red-600/50 transition-all duration-700 rotate-2 group-hover:rotate-0 shadow-2xl">
            <img src={user.avatar} className="w-full h-full object-cover rounded-[2.5rem]" alt="" />
          </div>
          <button className="absolute -bottom-2 -right-2 w-12 h-12 bg-red-600 rounded-full flex items-center justify-center text-white border-4 border-[#050505] shadow-xl hover:scale-110 transition-transform">
             <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
          </button>
        </div>

        <div className="text-center md:text-left space-y-6 flex-grow">
          {isEditing ? (
            <div className="space-y-4">
              <input 
                type="text" 
                value={user.name} 
                onChange={(e) => setUser({...user, name: e.target.value})}
                className="text-4xl md:text-6xl font-black bg-transparent border-b-2 border-red-600 focus:outline-none max-w-full"
              />
              <div className="flex space-x-2">
                <button onClick={handleSaveProfile} className="px-6 py-2 bg-red-600 rounded-xl text-xs font-black">SAVE CHANGES</button>
                <button onClick={() => setIsEditing(false)} className="px-6 py-2 bg-neutral-800 rounded-xl text-xs font-black">CANCEL</button>
              </div>
            </div>
          ) : (
            <div>
              <div className="flex items-center justify-center md:justify-start space-x-4 mb-2">
                <h1 className="text-4xl md:text-6xl font-black tracking-tight">{user.name}</h1>
                <div className="bg-blue-500 p-1 rounded-full"><svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20"><path d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"/></svg></div>
              </div>
              <p className="text-neutral-500 font-bold text-lg uppercase tracking-widest">Kigali Content Creator • Rwanda</p>
              <button 
                onClick={() => setIsEditing(true)}
                className="mt-4 text-[10px] font-black uppercase text-red-500 tracking-[0.3em] hover:text-white transition-colors"
              >
                [ Edit Public Profile ]
              </button>
            </div>
          )}

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 max-w-2xl">
            {stats.map((s, i) => (
              <div key={i} className="bg-neutral-900 border border-white/5 p-6 rounded-[2rem] shadow-2xl relative overflow-hidden group">
                <p className="text-[10px] font-black text-neutral-500 uppercase tracking-widest mb-1">{s.label}</p>
                <p className={`text-3xl font-black ${s.color}`}>{s.value}</p>
                <p className="text-[9px] text-neutral-600 font-bold uppercase mt-1">{s.sub}</p>
                <div className="absolute top-0 left-0 w-1 h-full bg-red-600 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Profile Navigation Tabs */}
      <div className="flex items-center space-x-12 border-b border-white/5 overflow-x-auto pb-4 hide-scrollbar">
        {[
          { id: 'dashboard', label: 'Overview' },
          { id: 'finance', label: 'Credits & Finance' },
          { id: 'library', label: 'My Library' },
          { id: 'settings', label: 'Settings' }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as ProfileTab)}
            className={`text-xs font-black uppercase tracking-[0.3em] transition-all relative pb-4 whitespace-nowrap ${
              activeTab === tab.id ? 'text-red-500' : 'text-neutral-500 hover:text-white'
            }`}
          >
            {tab.label}
            {activeTab === tab.id && <div className="absolute bottom-0 left-0 right-0 h-1 bg-red-600 rounded-full shadow-[0_0_15px_rgba(239,68,68,0.5)]"></div>}
          </button>
        ))}
      </div>

      {/* Main Content Render */}
      <div className="pb-20">
        {activeTab === 'dashboard' && renderDashboard()}
        {activeTab === 'finance' && renderFinance()}
        {activeTab === 'library' && renderLibrary()}
        {activeTab === 'settings' && renderSettings()}
      </div>
    </div>
  );
};

export default Profile;
