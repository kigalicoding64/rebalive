import React, { useState, useEffect } from 'react';
import { MOCK_CONTENT, MOCK_BOOKS } from '../constants.tsx';
import { ContentType, ContentItem, Language, Monetization } from '../types.ts';

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

  const [videoUrl, setVideoUrl] = useState('');
  const [thumbnail, setThumbnail] = useState('');
  const [duration, setDuration] = useState('');
  const [title, setTitle] = useState('');
  const [narrator, setNarrator] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const [newSourceName, setNewSourceName] = useState('');
  const [newSourceUrl, setNewSourceUrl] = useState('');
  const [newSourceType, setNewSourceType] = useState<ContentType>(ContentType.VIDEO);

  const handleManualSync = (id: string) => {
    setSyncingId(id);
    const source = syncSources.find(s => s.id === id);
    
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

      const newItem: any = {
        id: `synced-${Date.now()}`,
        type: source?.type || ContentType.VIDEO,
        title: `[Cloned] ${source?.name} Update`,
        description: `Content cloned from ${source?.url}.`,
        thumbnail: `https://picsum.photos/seed/${id}-${Date.now()}/800/450`,
        creator: source?.name || 'External',
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
        lastSync: 'Pending',
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
    
    // Check for YouTube link specifically to fetch actual thumbnail
    const ytMatch = videoUrl.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/);
    
    try {
      if (ytMatch) {
        setThumbnail(`https://img.youtube.com/vi/${ytMatch[1]}/maxresdefault.jpg`);
        setDuration("Embed");
        setTitle(`YouTube Video ${ytMatch[1]}`);
      } else {
        const isDirectFile = /\.(mp4|webm|ogg|m4v|m3u8|mov)$/.test(videoUrl.toLowerCase());
        if (!isDirectFile) {
          alert("Analyzing external source...");
          setDuration("Embed");
        } else {
          setDuration("00:00");
          setThumbnail(`https://picsum.photos/seed/${Date.now()}/800/450`);
        }
      }
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
            <svg className={`w-4 h-4 ${globalSyncing ? 'animate-spin' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/></svg>
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
                <th className="px-8 py-6 text-center">Status</th>
                <th className="px-8 py-6 text-center">Auto Sync</th>
                <th className="px-8 py-6 text-center">Synced</th>
                <th className="px-8 py-6">Last Activity</th>
                <th className="px-8 py-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {syncSources.map(source => (
                <tr key={source.id} className={`hover:bg-white/5 transition-all group ${syncingId === source.id ? 'bg-red-600/5' : ''}`}>
                  <td className="px-8 py-6">
                    <div className="flex items-center space-x-4">
                      <div className={`w-10 h-10 rounded-2xl bg-neutral-800 flex items-center justify-center text-[11px] font-black`}>
                        {source.name.charAt(0)}
                      </div>
                      <div>
                        <span className="font-black text-sm block">{source.name}</span>
                        <span className="text-[9px] text-neutral-600 font-bold uppercase">{source.type}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-6 text-center">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${
                      syncingId === source.id ? 'bg-amber-500/10 text-amber-500' : 'bg-green-500/10 text-green-500'
                    }`}>
                      <span className={`w-1.5 h-1.5 rounded-full mr-2 ${syncingId === source.id ? 'bg-amber-500 animate-spin' : 'bg-green-500 animate-pulse'}`}></span>
                      {syncingId === source.id ? 'Syncing...' : source.status}
                    </span>
                  </td>
                  <td className="px-8 py-6 text-center">
                    <button onClick={() => toggleAutoSync(source.id)} className={`w-10 h-5 rounded-full relative transition-all mx-auto ${source.autoSync ? 'bg-red-600' : 'bg-neutral-800'}`}>
                      <div className={`absolute top-1 w-3 h-3 rounded-full bg-white transition-all ${source.autoSync ? 'left-6' : 'left-1'}`}></div>
                    </button>
                  </td>
                  <td className="px-8 py-6 text-center font-black text-neutral-400 tabular-nums text-sm">{source.itemsSynced}</td>
                  <td className="px-8 py-6 text-[10px] text-neutral-500 font-black uppercase">{source.lastSync}</td>
                  <td className="px-8 py-6 text-right">
                    <button 
                      onClick={() => handleManualSync(source.id)}
                      disabled={syncingId !== null}
                      className={`px-4 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all ${syncingId === source.id ? 'bg-amber-500 text-black' : 'bg-neutral-800 hover:bg-white hover:text-black'}`}
                    >
                      {syncingId === source.id ? 'WAIT...' : 'SYNC'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const inputStyle = "w-full bg-black/40 border border-white/10 rounded-2xl py-3.5 px-6 text-sm focus:outline-none focus:ring-2 focus:ring-red-600/30 transition-all font-medium placeholder:text-neutral-700";
  const labelStyle = "text-[10px] font-black text-neutral-500 uppercase tracking-[0.2em] block mb-2 ml-1";

  return (
    <div className="flex min-h-screen bg-[#050505] text-white font-sans">
      <aside className="w-72 border-r border-white/5 p-8 space-y-12 hidden lg:block sticky top-0 h-screen">
        <h2 className="text-2xl font-black">RebaLive<span className="text-red-600">RW</span></h2>
        <nav className="space-y-2">
          {(['Overview', 'Agasobanuye', 'Movies', 'News', 'Music', 'Live TV', 'Sync Manager', 'Comments', 'Books'] as AdminTab[]).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`w-full text-left px-5 py-4 rounded-2xl text-[11px] font-black uppercase tracking-widest transition-all ${activeTab === tab ? 'bg-red-600 text-white shadow-xl shadow-red-600/30' : 'text-neutral-500 hover:text-white hover:bg-white/5'}`}
            >
              {tab}
            </button>
          ))}
        </nav>
      </aside>

      <main className="flex-grow p-12">
        <header className="flex justify-between items-center mb-12">
          <h1 className="text-5xl font-black">Ikaze, Admin</h1>
          <button onClick={() => setIsModalOpen(true)} className="px-10 py-5 bg-red-600 text-white rounded-[2rem] text-[11px] font-black uppercase tracking-widest">Deploy Content</button>
        </header>

        {activeTab === 'Overview' && <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {syncSources.slice(0, 3).map((s, i) => (
               <div key={i} className="bg-neutral-900/50 p-8 rounded-[2rem] border border-white/5">
                 <p className="text-[10px] font-black text-neutral-500 uppercase mb-2">{s.name}</p>
                 <h3 className="text-3xl font-black">{s.itemsSynced} Synced</h3>
               </div>
            ))}
        </div>}
        
        {activeTab === 'Sync Manager' && renderSyncManager()}
        
        {activeTab !== 'Overview' && activeTab !== 'Sync Manager' && renderContentList('ALL')}
      </main>

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
                       {thumbnail ? <img src={thumbnail} className="w-full h-full object-cover animate-in fade-in" alt="AI Generated" /> : <div className="text-center p-8"><p className="text-[10px] font-black uppercase text-neutral-600 tracking-widest">Preview frame will appear here after analysis</p></div>}
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

      {isAddSourceModalOpen && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-10 bg-black/98 backdrop-blur-2xl">
           <div className="w-full max-w-2xl bg-neutral-900 rounded-[3rem] border border-white/10 p-10 space-y-8">
              <h3 className="text-3xl font-black">Add Sync Source</h3>
              <form onSubmit={handleAddSource} className="space-y-6">
                <input required value={newSourceName} onChange={(e) => setNewSourceName(e.target.value)} className={inputStyle} placeholder="Source Name" />
                <input required value={newSourceUrl} onChange={(e) => setNewSourceUrl(e.target.value)} className={inputStyle} placeholder="Endpoint URL" />
                <select value={newSourceType} onChange={(e) => setNewSourceType(e.target.value as ContentType)} className={inputStyle}>
                  <option value={ContentType.VIDEO}>Video</option>
                  <option value={ContentType.MUSIC}>Music</option>
                  <option value={ContentType.NEWS}>News</option>
                </select>
                <div className="flex gap-4">
                  <button type="button" onClick={() => setIsAddSourceModalOpen(false)} className="flex-1 py-4 bg-neutral-800 rounded-2xl font-black text-[11px] uppercase">Cancel</button>
                  <button type="submit" className="flex-1 py-4 bg-red-600 rounded-2xl font-black text-[11px] uppercase">Register</button>
                </div>
              </form>
           </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;