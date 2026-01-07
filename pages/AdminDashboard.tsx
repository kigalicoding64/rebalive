
import React, { useState, useEffect } from 'react';
import { MOCK_CONTENT, MOCK_BOOKS } from '../constants';
import { ContentType, ContentItem, Language, Monetization } from '../types';

type AdminTab = 'Overview' | 'Agasobanuye' | 'Movies' | 'News' | 'Music' | 'Live TV' | 'Comments' | 'Books' | 'Sync Manager';

interface SyncSource {
  id: string;
  name: string;
  url: string;
  status: 'Active' | 'Inactive' | 'Syncing';
  autoSync: boolean;
  itemsSynced: number;
  lastSync: string;
  type: ContentType;
}

const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<AdminTab>('Overview');
  const [contentList, setContentList] = useState<any[]>([...MOCK_CONTENT, ...MOCK_BOOKS]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddSourceModalOpen, setIsAddSourceModalOpen] = useState(false);
  const [globalSyncing, setGlobalSyncing] = useState(false);
  
  // Comprehensive Sync Manager State
  const [syncSources, setSyncSources] = useState<SyncSource[]>([
    { id: '1', name: 'Junkybooks', url: 'www.junkybooks.com', status: 'Active', autoSync: true, itemsSynced: 0, lastSync: '2 days ago', type: ContentType.BOOK },
    { id: '2', name: 'Playlist Sound', url: 'playlistsound.com', status: 'Active', autoSync: true, itemsSynced: 0, lastSync: '25 days ago', type: ContentType.MUSIC },
    { id: '3', name: 'Jango', url: 'www.jango.com', status: 'Active', autoSync: true, itemsSynced: 0, lastSync: '25 days ago', type: ContentType.MUSIC },
    { id: '4', name: 'Fawesome TV', url: 'fawesome.tv', status: 'Active', autoSync: true, itemsSynced: 9, lastSync: '25 days ago', type: ContentType.VIDEO },
    { id: '5', name: 'Igihe', url: 'www.igihe.com', status: 'Active', autoSync: true, itemsSynced: 0, lastSync: '25 days ago', type: ContentType.NEWS },
    { id: '6', name: 'Kigali Today', url: 'www.kigalitoday.com', status: 'Active', autoSync: true, itemsSynced: 5, lastSync: '25 days ago', type: ContentType.NEWS },
    { id: '7', name: 'Reba Movie', url: 'www.rebamovie.com', status: 'Active', autoSync: true, itemsSynced: 0, lastSync: '25 days ago', type: ContentType.VIDEO },
    { id: '8', name: 'Agasobanuye Live', url: 'www.agasobanuyelive.com', status: 'Active', autoSync: true, itemsSynced: 12, lastSync: 'a month ago', type: ContentType.AGASOBANUYE },
    { id: '9', name: 'Agasobanuye Now', url: 'agasobanuyenow.com', status: 'Active', autoSync: true, itemsSynced: 10, lastSync: 'a month ago', type: ContentType.AGASOBANUYE },
    { id: '10', name: 'Oshakur Films', url: 'oshakurfilms.com', status: 'Active', autoSync: true, itemsSynced: 15, lastSync: '25 days ago', type: ContentType.VIDEO },
  ]);

  const [syncingId, setSyncingId] = useState<string | null>(null);

  // Form State for New Content
  const [videoUrl, setVideoUrl] = useState('');
  const [thumbnail, setThumbnail] = useState('');
  const [duration, setDuration] = useState('');
  const [title, setTitle] = useState('');
  const [narrator, setNarrator] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  // Form State for New Sync Source
  const [newSourceName, setNewSourceName] = useState('');
  const [newSourceUrl, setNewSourceUrl] = useState('');
  const [newSourceType, setNewSourceType] = useState<ContentType>(ContentType.VIDEO);

  const metrics = [
    { label: 'Agasobanuye', value: '200', color: 'text-red-500', icon: 'M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z' },
    { label: 'Movies', value: '25', color: 'text-white', icon: 'M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z' },
    { label: 'Comments', value: '8', color: 'text-blue-400', icon: 'M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z' },
    { label: 'Music', value: '30', color: 'text-amber-500', icon: 'M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2z' },
    { label: 'News', value: '71', color: 'text-green-500', icon: 'M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10l4 4v10a2 2 0 01-2 2z' },
    { label: 'TV Channels', value: '8', color: 'text-purple-500', icon: 'M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z' },
  ];

  const handleManualSync = (id: string) => {
    setSyncingId(id);
    const source = syncSources.find(s => s.id === id);
    
    // Simulate complex cloning/syncing operation
    setTimeout(() => {
      setSyncingId(null);
      setSyncSources(prev => prev.map(s => 
        s.id === id 
          ? { 
              ...s, 
              lastSync: 'Just now', 
              itemsSynced: s.itemsSynced + 1 
            } 
          : s
      ));

      // Simulate the "Cloning" effect by adding a new item to the master list
      const newItem: any = {
        id: `synced-${Date.now()}`,
        type: source?.type || ContentType.VIDEO,
        title: `[Synced] ${source?.name} - ${new Date().toLocaleTimeString()}`,
        description: `This asset was cloned from ${source?.url} and localized for Rwanda.`,
        thumbnail: `https://picsum.photos/seed/${id}-${Date.now()}/800/450`,
        creator: source?.name || 'External Media',
        views: Math.floor(Math.random() * 5000),
        language: Language.RW,
        monetization: Monetization.FREE,
        publishedAt: 'Just now'
      };
      
      setContentList(prev => [newItem, ...prev]);
    }, 2000);
  };

  const handleSyncAll = () => {
    setGlobalSyncing(true);
    let index = 0;
    
    const syncNext = () => {
      if (index >= syncSources.length) {
        setGlobalSyncing(false);
        setSyncingId(null);
        return;
      }
      
      const source = syncSources[index];
      setSyncingId(source.id);
      
      setTimeout(() => {
        setSyncSources(prev => prev.map(s => 
          s.id === source.id 
            ? { ...s, lastSync: 'Just now', itemsSynced: s.itemsSynced + 1 } 
            : s
        ));
        
        const newItem: any = {
          id: `synced-all-${source.id}-${Date.now()}`,
          type: source.type,
          title: `[Global Sync] ${source.name} Refreshed`,
          description: `Automatically updated data feed from ${source.url}.`,
          thumbnail: `https://picsum.photos/seed/${source.id}-${Date.now()}/800/450`,
          creator: source.name,
          views: Math.floor(Math.random() * 1000),
          language: Language.RW,
          monetization: Monetization.FREE,
          publishedAt: 'Just now'
        };
        
        setContentList(prev => [newItem, ...prev]);
        index++;
        syncNext();
      }, 600);
    };

    syncNext();
  };

  const toggleAutoSync = (id: string) => {
    setSyncSources(prev => prev.map(s => s.id === id ? { ...s, autoSync: !s.autoSync } : s));
  };

  const handleAddSource = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSourceName.trim() || !newSourceUrl.trim()) return;

    const newSource: SyncSource = {
        id: Date.now().toString(),
        name: newSourceName.trim(),
        url: newSourceUrl.trim(),
        status: 'Active',
        autoSync: true,
        itemsSynced: 0,
        lastSync: 'Awaiting first sync',
        type: newSourceType
    };

    setSyncSources(prev => [newSource, ...prev]);
    setIsAddSourceModalOpen(false);
    setNewSourceName('');
    setNewSourceUrl('');
  };

  const processVideoLink = async () => {
    if (!videoUrl) return;
    setIsProcessing(true);
    const isDirectFile = /\.(mp4|webm|ogg|m4v|m3u8|mov)$|commondatastorage\.googleapis\.com/.test(videoUrl.toLowerCase());

    if (!isDirectFile) {
      alert("Note: This looks like an external player page. AI Frame Extraction only works with direct video files (.mp4, .webm). I'll add it as an embed instead!");
      setDuration("Embed");
      setIsProcessing(false);
      return;
    }

    try {
      const video = document.createElement('video');
      video.src = videoUrl;
      video.crossOrigin = 'anonymous';
      video.preload = 'metadata';

      await new Promise((resolve, reject) => {
        video.onloadedmetadata = resolve;
        video.onerror = () => reject(new Error("The browser could not load this video file."));
        setTimeout(() => reject(new Error("Metadata loading timed out.")), 15000);
      });

      const mins = Math.floor(video.duration / 60);
      const secs = Math.floor(video.duration % 60);
      setDuration(`${mins}:${secs.toString().padStart(2, '0')}`);
      video.currentTime = Math.min(5, video.duration * 0.1);
      
      await new Promise((resolve) => { video.onseeked = resolve; });

      const canvas = document.createElement('canvas');
      canvas.width = 1280; canvas.height = 720;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        setThumbnail(canvas.toDataURL('image/jpeg', 0.85));
      }
    } catch (err: any) {
      alert(`System Notice: ${err.message}\n\nManual setup is recommended for this link.`);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsModalOpen(false);
    setVideoUrl(''); setThumbnail(''); setDuration(''); setTitle(''); setNarrator('');
  };

  const renderContentList = (typeFilter: ContentType | 'ALL') => {
    const list = contentList.filter(item => typeFilter === 'ALL' || item.type === typeFilter);
    return (
      <div className="bg-neutral-900/40 rounded-3xl border border-white/5 overflow-hidden animate-in fade-in duration-300">
        <table className="w-full text-left">
          <thead className="bg-white/5 text-[10px] font-black uppercase tracking-widest text-neutral-500">
            <tr>
              <th className="px-6 py-4">Title</th>
              <th className="px-6 py-4">Creator</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {list.map(item => (
              <tr key={item.id} className="hover:bg-white/5 transition-colors">
                <td className="px-6 py-4 font-bold text-sm">
                   <div className="flex items-center space-x-3">
                      <img src={item.thumbnail} className="w-10 h-6 object-cover rounded shadow" alt="" />
                      <span className="truncate max-w-xs">{item.title}</span>
                   </div>
                </td>
                <td className="px-6 py-4 text-xs text-neutral-400">{item.creator || item.author}</td>
                <td className="px-6 py-4">
                  <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-full ${item.id.includes('synced') ? 'text-amber-500 bg-amber-500/10' : 'text-green-500 bg-green-500/10'}`}>
                    {item.id.includes('synced') ? 'Synced' : 'Active'}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <button className="text-neutral-500 hover:text-white mr-4 transition-colors">Edit</button>
                  <button className="text-red-500 hover:text-red-400 transition-colors">Remove</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  const renderSyncManager = () => (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="space-y-1">
          <h2 className="text-3xl font-black tracking-tight">Content Sync Manager</h2>
          <p className="text-neutral-500 text-sm font-medium">Cloning and refreshing content from 18+ national and international external endpoints.</p>
        </div>
        <div className="flex space-x-3">
          <button 
            onClick={handleSyncAll}
            disabled={globalSyncing}
            className={`px-8 py-3 bg-white text-black rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all flex items-center space-x-2 ${globalSyncing ? 'opacity-50 cursor-not-allowed' : 'hover:bg-red-600 hover:text-white shadow-xl shadow-white/5 active:scale-95'}`}
          >
            {globalSyncing ? (
              <svg className="w-4 h-4 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/></svg>
            ) : (
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/></svg>
            )}
            <span>{globalSyncing ? 'Cloning All...' : 'Sync All Sources'}</span>
          </button>
          <button 
            onClick={() => setIsAddSourceModalOpen(true)}
            className="px-8 py-3 bg-red-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl shadow-red-600/20 hover:bg-red-500 transition-all flex items-center space-x-2 active:scale-95"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"/></svg>
            <span>Add Source</span>
          </button>
        </div>
      </div>

      <div className="bg-neutral-900/30 rounded-[2.5rem] border border-white/5 overflow-hidden shadow-2xl">
        <div className="overflow-x-auto custom-scroll">
          <table className="w-full text-left">
            <thead className="bg-white/5 text-[9px] font-black uppercase tracking-[0.2em] text-neutral-500">
              <tr>
                <th className="px-8 py-6">Source Name</th>
                <th className="px-8 py-6">Endpoint URL</th>
                <th className="px-8 py-6 text-center">Status</th>
                <th className="px-8 py-6 text-center">Auto Sync</th>
                <th className="px-8 py-6 text-center">Items Synced</th>
                <th className="px-8 py-6">Last Activity</th>
                <th className="px-8 py-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {syncSources.map(source => (
                <tr key={source.id} className={`hover:bg-white/5 transition-all group ${syncingId === source.id ? 'bg-red-600/5' : ''}`}>
                  <td className="px-8 py-6">
                    <div className="flex items-center space-x-4">
                      <div className={`w-10 h-10 rounded-2xl bg-gradient-to-br flex items-center justify-center text-[11px] font-black shadow-lg ${
                        source.type === ContentType.BOOK ? 'from-blue-500 to-blue-700 text-white' :
                        source.type === ContentType.MUSIC ? 'from-amber-500 to-amber-700 text-white' :
                        source.type === ContentType.NEWS ? 'from-green-500 to-green-700 text-white' :
                        'from-red-500 to-red-700 text-white'
                      }`}>
                        {source.name.charAt(0)}
                      </div>
                      <div>
                        <span className="font-black text-sm block">{source.name}</span>
                        <span className="text-[9px] text-neutral-600 font-bold uppercase tracking-wider">{source.type}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-6 text-[11px] text-neutral-500 font-mono tracking-tighter opacity-60">
                    {source.url.length > 20 ? source.url.substring(0, 20) + '...' : source.url}
                  </td>
                  <td className="px-8 py-6 text-center">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${
                      syncingId === source.id 
                        ? 'bg-amber-500/10 text-amber-500' 
                        : 'bg-green-500/10 text-green-500'
                    }`}>
                      <span className={`w-1.5 h-1.5 rounded-full mr-2 ${
                        syncingId === source.id ? 'bg-amber-500 animate-spin' : 'bg-green-500 animate-pulse'
                      }`}></span>
                      {syncingId === source.id ? 'Cloning...' : source.status}
                    </span>
                  </td>
                  <td className="px-8 py-6 text-center">
                    <button 
                      onClick={() => toggleAutoSync(source.id)}
                      className={`w-11 h-6 rounded-full relative transition-all mx-auto focus:ring-2 focus:ring-red-600/50 ${source.autoSync ? 'bg-red-600 shadow-[0_0_15px_rgba(239,68,68,0.4)]' : 'bg-neutral-800'}`}
                    >
                      <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all shadow-md ${source.autoSync ? 'left-6' : 'left-1'}`}></div>
                    </button>
                  </td>
                  <td className="px-8 py-6 text-center font-black text-neutral-400 tabular-nums text-sm">{source.itemsSynced}</td>
                  <td className="px-8 py-6 text-[10px] text-neutral-500 font-black uppercase tracking-widest">{source.lastSync}</td>
                  <td className="px-8 py-6 text-right">
                    <button 
                      onClick={() => handleManualSync(source.id)}
                      disabled={syncingId !== null}
                      className={`px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                        syncingId === source.id 
                          ? 'bg-amber-500 text-black animate-pulse' 
                          : 'bg-neutral-800 text-neutral-400 hover:bg-white hover:text-black hover:scale-105 active:scale-95 disabled:opacity-30'
                      }`}
                    >
                      {syncingId === source.id ? 'Wait...' : 'Sync Now'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      {/* Bottom Status Bar for Sync Manager */}
      <div className="flex items-center justify-between p-8 bg-neutral-900/20 rounded-[2rem] border border-white/5">
        <div className="flex items-center space-x-10">
          <div>
            <span className="text-[10px] font-black text-neutral-600 uppercase tracking-widest block mb-1">Total Cloned Items</span>
            <span className="text-2xl font-black">{contentList.length}</span>
          </div>
          <div className="w-px h-10 bg-white/5"></div>
          <div>
            <span className="text-[10px] font-black text-neutral-600 uppercase tracking-widest block mb-1">Active Endpoints</span>
            <span className="text-2xl font-black text-red-600">{syncSources.length}</span>
          </div>
        </div>
        <div className="flex items-center space-x-3 text-xs font-bold text-neutral-500">
           <span className={`w-2 h-2 rounded-full animate-pulse ${globalSyncing ? 'bg-amber-500' : 'bg-green-500'}`}></span>
           <span>{globalSyncing ? 'Cloning Regional Data...' : 'Global Sync System Online'}</span>
        </div>
      </div>
    </div>
  );

  const inputStyle = "w-full bg-black/40 border border-white/10 rounded-2xl py-3.5 px-6 text-sm focus:outline-none focus:ring-2 focus:ring-red-600/30 transition-all font-medium placeholder:text-neutral-700";
  const labelStyle = "text-[10px] font-black text-neutral-500 uppercase tracking-[0.2em] block mb-2 ml-1";

  return (
    <div className="flex min-h-screen bg-[#050505] text-white font-sans">
      <aside className="w-72 border-r border-white/5 p-8 space-y-12 hidden lg:block sticky top-0 h-screen overflow-y-auto hide-scrollbar">
        <div className="space-y-1">
          <h2 className="text-2xl font-black tracking-tighter">RebaLive<span className="text-red-600">RW</span></h2>
          <p className="text-[10px] font-black uppercase text-neutral-600 tracking-widest">Admin Dashboard</p>
        </div>

        <nav className="space-y-2">
          {(['Overview', 'Agasobanuye', 'Movies', 'News', 'Music', 'Live TV', 'Sync Manager', 'Comments', 'Books'] as AdminTab[]).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`w-full text-left px-5 py-4 rounded-2xl text-[11px] font-black uppercase tracking-widest transition-all ${
                activeTab === tab 
                ? 'bg-red-600 text-white shadow-xl shadow-red-600/30' 
                : 'text-neutral-500 hover:text-white hover:bg-white/5'
              }`}
            >
              {tab}
            </button>
          ))}
        </nav>
      </aside>

      <main className="flex-grow p-6 md:p-12 overflow-y-auto">
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div>
            <h1 className="text-5xl font-black tracking-tight mb-2">Ikaze, Kigali Admin</h1>
            <p className="text-neutral-500 font-bold text-lg">System Status: Connected</p>
          </div>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="px-10 py-5 bg-red-600 text-white rounded-[2rem] text-[11px] font-black uppercase tracking-widest shadow-2xl shadow-red-600/30 active:scale-95 transition-all hover:bg-red-500"
          >
            Deploy New Content
          </button>
        </header>

        {activeTab === 'Overview' && (
           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 animate-in fade-in duration-500">
             {metrics.map((m, i) => (
               <div key={i} className="bg-neutral-900/50 p-6 rounded-[2rem] border border-white/5 hover:border-red-500/40 transition-all group cursor-pointer">
                 <div className={`w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center mb-4 ${m.color}`}>
                   <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={m.icon}/>
                   </svg>
                 </div>
                 <p className="text-[10px] font-black text-neutral-500 uppercase tracking-widest">{m.label}</p>
                 <h3 className={`text-3xl font-black mt-1 ${m.color}`}>{m.value}</h3>
               </div>
             ))}
           </div>
        )}
        
        {activeTab === 'Sync Manager' && renderSyncManager()}
        
        {['Agasobanuye', 'Movies', 'News', 'Music', 'Live TV', 'Comments', 'Books'].includes(activeTab) && 
          activeTab !== 'Overview' && activeTab !== 'Sync Manager' && 
          renderContentList(activeTab === 'Agasobanuye' ? ContentType.AGASOBANUYE : (activeTab === 'Movies' ? ContentType.VIDEO : (activeTab === 'Books' ? ContentType.BOOK : ContentType.VIDEO)))
        }
      </main>

      {/* Add Source Modal - FIXED FOR USER REQUEST */}
      {isAddSourceModalOpen && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 md:p-10 bg-black/98 backdrop-blur-2xl animate-in fade-in duration-300">
           <div className="w-full max-w-2xl bg-neutral-900 rounded-[3rem] border border-white/10 overflow-hidden shadow-2xl flex flex-col">
              <div className="p-10 border-b border-white/5 flex items-center justify-between flex-shrink-0">
                 <div>
                    <h3 className="text-3xl font-black">Add Sync Source</h3>
                    <p className="text-[10px] text-neutral-500 font-bold uppercase tracking-[0.2em] mt-1">External Endpoint Registration</p>
                 </div>
                 <button onClick={() => setIsAddSourceModalOpen(false)} className="p-4 bg-white/5 rounded-full hover:bg-red-600 transition-all">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/></svg>
                 </button>
              </div>
              
              <form onSubmit={handleAddSource} className="p-10 space-y-8">
                <div className="space-y-4">
                  <div className="space-y-3">
                    <label className={labelStyle}>Source Name</label>
                    <input 
                      required 
                      value={newSourceName} 
                      onChange={(e) => setNewSourceName(e.target.value)} 
                      className={inputStyle} 
                      placeholder="e.g., Kigali News Network" 
                    />
                  </div>

                  <div className="space-y-3">
                    <label className={labelStyle}>Endpoint URL</label>
                    <input 
                      required 
                      value={newSourceUrl} 
                      onChange={(e) => setNewSourceUrl(e.target.value)} 
                      className={inputStyle} 
                      placeholder="https://example.com/api/v1/content" 
                    />
                  </div>

                  <div className="space-y-3">
                    <label className={labelStyle}>Content Type</label>
                    <select 
                      value={newSourceType} 
                      onChange={(e) => setNewSourceType(e.target.value as ContentType)}
                      className={inputStyle}
                    >
                      <option value={ContentType.VIDEO}>Video/Movie</option>
                      <option value={ContentType.MUSIC}>Music</option>
                      <option value={ContentType.NEWS}>News</option>
                      <option value={ContentType.BOOK}>Book</option>
                      <option value={ContentType.AGASOBANUYE}>Agasobanuye</option>
                    </select>
                  </div>
                </div>

                <div className="pt-8 border-t border-white/5 flex gap-6">
                  <button type="button" onClick={() => setIsAddSourceModalOpen(false)} className="flex-grow py-5 bg-neutral-800 rounded-2xl font-black text-[11px] uppercase tracking-widest hover:bg-neutral-700 transition-colors">Cancel</button>
                  <button type="submit" className="flex-grow py-5 bg-red-600 text-white rounded-2xl font-black text-[11px] uppercase tracking-widest shadow-2xl hover:bg-red-500 transition-all">Register Source</button>
                </div>
              </form>
           </div>
        </div>
      )}

      {/* Deploy Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10 bg-black/98 backdrop-blur-2xl animate-in fade-in duration-300">
           <div className="w-full max-w-4xl bg-neutral-900 rounded-[3rem] border border-white/10 overflow-hidden shadow-2xl flex flex-col max-h-[95vh]">
              <div className="p-10 border-b border-white/5 flex items-center justify-between flex-shrink-0 bg-neutral-900/80 backdrop-blur-md">
                 <div>
                    <h3 className="text-3xl font-black">Content Deployment</h3>
                    <p className="text-[10px] text-neutral-500 font-bold uppercase tracking-[0.2em] mt-1">AI Link Analyzer v2.0</p>
                 </div>
                 <button onClick={() => setIsModalOpen(false)} className="p-4 bg-white/5 rounded-full hover:bg-red-600 transition-all">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/></svg>
                 </button>
              </div>
              
              <form onSubmit={handleSave} className="p-10 overflow-y-auto custom-scroll space-y-12">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <div className="md:col-span-2 space-y-3">
                    <label className={labelStyle}>Video URL / Link *</label>
                    <div className="flex gap-4">
                      <input required value={videoUrl} onChange={(e) => setVideoUrl(e.target.value)} className={inputStyle} placeholder="Paste link here..." />
                      <button 
                        type="button"
                        onClick={processVideoLink}
                        disabled={isProcessing || !videoUrl}
                        className={`px-8 bg-white text-black rounded-2xl text-[10px] font-black uppercase tracking-widest disabled:opacity-20 flex items-center justify-center min-w-[160px] hover:bg-red-600 hover:text-white transition-all`}
                      >
                        {isProcessing ? <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin"></div> : <span>AI Analyze</span>}
                      </button>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <label className={labelStyle}>Title</label>
                    <input required value={title} onChange={(e) => setTitle(e.target.value)} className={inputStyle} placeholder="Display Title" />
                  </div>

                  <div className="space-y-3">
                    <label className={labelStyle}>Narrator Name</label>
                    <input value={narrator} onChange={(e) => setNarrator(e.target.value)} className={inputStyle} placeholder="Optional" />
                  </div>

                  <div className="space-y-3">
                    <label className={labelStyle}>Detected Duration</label>
                    <input value={duration} onChange={(e) => setDuration(e.target.value)} className={inputStyle} placeholder="00:00" />
                  </div>

                  <div className="space-y-4 md:col-span-2">
                    <label className={labelStyle}>Generated Thumbnail Preview</label>
                    <div className="aspect-video bg-black rounded-[2rem] border-2 border-dashed border-white/10 flex items-center justify-center overflow-hidden">
                       {thumbnail ? <img src={thumbnail} className="w-full h-full object-cover animate-in fade-in" alt="AI Generated" /> : <div className="text-center p-8"><p className="text-[10px] font-black uppercase text-neutral-600 tracking-widest">Preview frame will appear here if direct file is provided</p></div>}
                    </div>
                  </div>
                </div>

                <div className="pt-12 border-t border-white/5 flex gap-6">
                  <button type="button" onClick={() => setIsModalOpen(false)} className="flex-grow py-5 bg-neutral-800 rounded-2xl font-black text-[11px] uppercase tracking-widest hover:bg-neutral-700 transition-colors">Cancel</button>
                  <button type="submit" className="flex-grow py-5 bg-red-600 text-white rounded-2xl font-black text-[11px] uppercase tracking-widest shadow-2xl hover:bg-red-500 transition-all">Publish</button>
                </div>
              </form>
           </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
