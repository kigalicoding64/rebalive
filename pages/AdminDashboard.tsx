
import React, { useState, useMemo } from 'react';
import { MOCK_CONTENT, MOCK_BOOKS, NARRATORS } from '../constants';
import { ContentType, Monetization, ContentItem, Language, NarratorProfile, Book } from '../types';

type AdminTab = 'Overview' | 'Agasobanuye' | 'Movies' | 'News' | 'Music' | 'Live TV' | 'Comments' | 'Books';

const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<AdminTab>('Overview');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Local state to simulate a database
  const [contentList, setContentList] = useState<any[]>([...MOCK_CONTENT, ...MOCK_BOOKS]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<any | null>(null);
  const [selectedContentType, setSelectedContentType] = useState<ContentType>(ContentType.AGASOBANUYE);

  // Content counts for Metrics matching the user request
  const metrics = [
    { label: 'Agasobanuye', value: '200', color: 'text-red-500', icon: 'M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z' },
    { label: 'Movies', value: '25', color: 'text-white', icon: 'M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z' },
    { label: 'Comments', value: '8', color: 'text-blue-400', icon: 'M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z' },
    { label: 'Music', value: '30', color: 'text-amber-500', icon: 'M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2z' },
    { label: 'News', value: '71', color: 'text-green-500', icon: 'M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10l4 4v10a2 2 0 01-2 2z' },
    { label: 'TV Channels', value: '8', color: 'text-purple-500', icon: 'M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z' },
  ];

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, logic would go here
    setIsModalOpen(false);
    setEditingItem(null);
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
                <td className="px-6 py-4 font-bold text-sm">{item.title}</td>
                <td className="px-6 py-4 text-xs text-neutral-400">{item.creator || item.author}</td>
                <td className="px-6 py-4">
                  <span className="text-[10px] font-black uppercase text-green-500">Live</span>
                </td>
                <td className="px-6 py-4 text-right">
                  <button className="text-neutral-500 hover:text-white mr-3">Edit</button>
                  <button className="text-red-500 hover:text-red-400">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  const renderOverview = () => (
    <div className="space-y-10 animate-in fade-in duration-500">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {metrics.map((m, i) => (
          <div key={i} className="bg-neutral-900/50 p-6 rounded-[2rem] border border-white/5 hover:border-red-500/30 transition-all group">
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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-neutral-900/30 p-8 rounded-[2.5rem] border border-white/5">
          <h3 className="text-xl font-black mb-6">Social Media Engagement</h3>
          <div className="space-y-4">
            {[
              { name: 'Facebook', value: '12K', color: 'text-blue-500' },
              { name: 'Twitter', value: '8.5K', color: 'text-sky-400' },
              { name: 'Instagram', value: '24K', color: 'text-pink-500' },
              { name: 'YouTube', value: '142K', color: 'text-red-600' },
            ].map((social, i) => (
              <div key={i} className="flex items-center justify-between p-4 bg-black/20 rounded-2xl border border-white/5">
                <span className={`font-black text-sm ${social.color}`}>{social.name}</span>
                <span className="font-black text-lg">{social.value}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-neutral-900/30 p-8 rounded-[2.5rem] border border-white/5">
          <h3 className="text-xl font-black mb-6">Recent Activity</h3>
          <div className="space-y-4">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="flex items-center space-x-4">
                <div className="w-2 h-2 bg-red-600 rounded-full"></div>
                <p className="text-sm text-neutral-400">New content uploaded: <span className="text-white font-bold">Kigali Night Cruise</span></p>
                <span className="ml-auto text-[10px] text-neutral-600 font-bold">2m ago</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const inputStyle = "w-full bg-black/40 border border-white/10 rounded-xl py-3 px-5 text-sm focus:outline-none focus:ring-1 focus:ring-red-600 transition-all font-medium placeholder:text-neutral-700";
  const labelStyle = "text-[10px] font-black text-neutral-500 uppercase tracking-widest block mb-2";

  return (
    <div className="flex min-h-screen bg-[#050505] text-white font-sans">
      {/* Sidebar Navigation */}
      <aside className="w-72 border-r border-white/5 p-8 space-y-12 hidden lg:block sticky top-0 h-screen overflow-y-auto hide-scrollbar">
        <div className="space-y-1">
          <h2 className="text-2xl font-black tracking-tighter">RebaLive<span className="text-red-600">RW</span></h2>
          <p className="text-[10px] font-black uppercase text-neutral-600 tracking-widest">Admin Dashboard</p>
        </div>

        <nav className="space-y-1">
          {(['Overview', 'Agasobanuye', 'Movies', 'News', 'Music', 'Live TV', 'Comments', 'Books'] as AdminTab[]).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`w-full text-left px-5 py-3.5 rounded-2xl text-[11px] font-black uppercase tracking-widest transition-all ${
                activeTab === tab 
                ? 'bg-red-600 text-white shadow-xl shadow-red-600/20' 
                : 'text-neutral-500 hover:text-white hover:bg-white/5'
              }`}
            >
              {tab}
            </button>
          ))}
        </nav>

        <div className="pt-10 space-y-4">
          <h4 className="text-[10px] font-black text-neutral-600 uppercase tracking-widest">Social Media</h4>
          <div className="space-y-2">
            {['Facebook', 'Twitter', 'Instagram', 'YouTube'].map(s => (
               <button key={s} className="w-full text-left px-5 py-2 text-[10px] font-black text-neutral-500 hover:text-white transition-all uppercase">{s}</button>
            ))}
          </div>
          
          <div className="pt-6">
            <button 
                onClick={() => { setSelectedContentType(ContentType.BOOK); setEditingItem(null); setIsModalOpen(true); }}
                className="w-full py-4 bg-amber-500 text-black rounded-2xl text-[11px] font-black uppercase tracking-widest hover:bg-amber-400 transition-all shadow-xl shadow-amber-500/10"
            >
                Upload Book
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-grow p-6 md:p-12 overflow-y-auto">
        {/* Header Section */}
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div>
            <h1 className="text-5xl font-black tracking-tight mb-2">Ikaze, Kigali Coding</h1>
            <p className="text-neutral-500 font-bold text-lg">Everything is running smoothly today.</p>
          </div>
          <div className="flex items-center space-x-3">
            <button 
              onClick={() => { setEditingItem(null); setIsModalOpen(true); }}
              className="px-10 py-5 bg-red-600 text-white rounded-2xl text-[11px] font-black uppercase tracking-widest shadow-2xl shadow-red-600/20 active:scale-95 transition-all hover:bg-red-500"
            >
              Add New CONTENT
            </button>
          </div>
        </header>

        {/* Tab Content */}
        {activeTab === 'Overview' && renderOverview()}
        {activeTab === 'Agasobanuye' && renderContentList(ContentType.AGASOBANUYE)}
        {activeTab === 'Movies' && renderContentList(ContentType.VIDEO)}
        {activeTab === 'News' && renderContentList(ContentType.NEWS)}
        {activeTab === 'Music' && renderContentList(ContentType.MUSIC)}
        {activeTab === 'Live TV' && renderContentList(ContentType.LIVE)}
        {activeTab === 'Books' && renderContentList(ContentType.BOOK)}
        {activeTab === 'Comments' && (
          <div className="py-32 flex flex-col items-center justify-center space-y-4">
             <div className="w-20 h-20 bg-neutral-900 rounded-full flex items-center justify-center text-neutral-700">
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"/></svg>
             </div>
             <p className="text-neutral-500 italic text-lg">Moderation queue is empty. Good job!</p>
          </div>
        )}
      </main>

      {/* Dynamic Detailed Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10 bg-black/95 backdrop-blur-xl animate-in fade-in duration-300">
           <div className="w-full max-w-4xl bg-neutral-900 rounded-[3rem] border border-white/10 overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
              <div className="p-10 border-b border-white/5 flex items-center justify-between flex-shrink-0 bg-neutral-900/80 backdrop-blur-md">
                 <div>
                    <h3 className="text-3xl font-black">
                        {editingItem ? 'Edit' : (selectedContentType === ContentType.BOOK ? 'Upload New Book' : `Add ${selectedContentType.charAt(0) + selectedContentType.slice(1).toLowerCase()}`)}
                    </h3>
                    <p className="text-[10px] text-neutral-500 font-bold uppercase tracking-[0.2em] mt-1">Fill in the details below</p>
                 </div>
                 <div className="flex items-center space-x-4">
                    {!editingItem && (
                        <select 
                            value={selectedContentType}
                            onChange={(e) => setSelectedContentType(e.target.value as ContentType)}
                            className="bg-black/50 border border-white/10 rounded-xl px-4 py-2 text-[10px] font-black uppercase text-red-500 focus:outline-none"
                        >
                            {Object.values(ContentType).filter(v => v !== ContentType.SHORT && v !== ContentType.PODCAST).map(v => <option key={v} value={v}>{v}</option>)}
                        </select>
                    )}
                    <button onClick={() => setIsModalOpen(false)} className="p-3 bg-black/40 rounded-full hover:bg-red-600 transition-all">
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/></svg>
                    </button>
                 </div>
              </div>
              
              <form onSubmit={handleSave} className="p-10 overflow-y-auto custom-scroll space-y-10">
                 {/* Agasobanuye Form */}
                 {selectedContentType === ContentType.AGASOBANUYE && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                       <div className="space-y-2">
                          <label className={labelStyle}>Izina *</label>
                          <input required className={inputStyle} placeholder="Izina" />
                       </div>
                       <div className="space-y-2">
                          <label className={labelStyle}>Uwasobanuye *</label>
                          <input required className={inputStyle} placeholder="Uwasobanuye" />
                       </div>
                       <div className="space-y-2">
                          <label className={labelStyle}>Category</label>
                          <select className={inputStyle}>
                             <option>Select Category</option>
                             <option>Action</option>
                             <option>Comedy</option>
                          </select>
                       </div>
                       <div className="space-y-2">
                          <label className={labelStyle}>Poster URL</label>
                          <input className={inputStyle} placeholder="Poster URL" />
                       </div>
                       <div className="space-y-2">
                          <label className={labelStyle}>Banner URL</label>
                          <input className={inputStyle} placeholder="Banner URL" />
                       </div>
                       <div className="space-y-2">
                          <label className={labelStyle}>Video URL</label>
                          <div className="flex space-x-2">
                            <input className={inputStyle} placeholder="Video URL" />
                            <button type="button" className="px-4 bg-white/5 border border-white/10 rounded-xl text-[10px] font-black">UPLOAD</button>
                          </div>
                       </div>
                       <div className="space-y-2">
                          <label className={labelStyle}>Trailer URL</label>
                          <div className="flex space-x-2">
                            <input className={inputStyle} placeholder="Trailer URL" />
                            <button type="button" className="px-4 bg-white/5 border border-white/10 rounded-xl text-[10px] font-black">UPLOAD</button>
                          </div>
                       </div>
                       <div className="space-y-2">
                          <label className={labelStyle}>Year</label>
                          <input className={inputStyle} placeholder="Year" />
                       </div>
                       <div className="space-y-2">
                          <label className={labelStyle}>Duration</label>
                          <input className={inputStyle} placeholder="Duration" />
                       </div>
                       <div className="space-y-2">
                          <label className={labelStyle}>Rating (1-10)</label>
                          <input type="number" className={inputStyle} placeholder="Rating (1-10)" />
                       </div>
                       <div className="md:col-span-2">
                          <label className={labelStyle}>Description</label>
                          <textarea className={`${inputStyle} h-32 resize-none`} placeholder="Description" />
                       </div>
                       <div className="flex items-center space-x-4">
                          <label className={labelStyle}>Trending</label>
                          <button type="button" className="px-4 py-2 bg-neutral-800 rounded-lg text-[10px] font-black">NO</button>
                       </div>
                    </div>
                 )}

                 {/* Movies Form */}
                 {selectedContentType === ContentType.VIDEO && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                       <div className="space-y-2">
                          <label className={labelStyle}>Title *</label>
                          <input required className={inputStyle} placeholder="Title" />
                       </div>
                       <div className="space-y-2">
                          <label className={labelStyle}>Genre</label>
                          <select className={inputStyle}>
                             <option>Select Genre</option>
                             <option>Action</option>
                             <option>Horror</option>
                          </select>
                       </div>
                       <div className="space-y-2">
                          <label className={labelStyle}>Poster URL</label>
                          <input className={inputStyle} placeholder="Poster URL" />
                       </div>
                       <div className="space-y-2">
                          <label className={labelStyle}>Banner URL</label>
                          <input className={inputStyle} placeholder="Banner URL" />
                       </div>
                       <div className="space-y-2">
                          <label className={labelStyle}>Video URL</label>
                          <div className="flex space-x-2">
                            <input className={inputStyle} placeholder="Video URL" />
                            <button type="button" className="px-4 bg-white/5 border border-white/10 rounded-xl text-[10px] font-black">UPLOAD</button>
                          </div>
                       </div>
                       <div className="space-y-2">
                          <label className={labelStyle}>Trailer URL</label>
                          <div className="flex space-x-2">
                            <input className={inputStyle} placeholder="Trailer URL" />
                            <button type="button" className="px-4 bg-white/5 border border-white/10 rounded-xl text-[10px] font-black">UPLOAD</button>
                          </div>
                       </div>
                       <div className="space-y-2">
                          <label className={labelStyle}>Year</label>
                          <input className={inputStyle} placeholder="Year" />
                       </div>
                       <div className="space-y-2">
                          <label className={labelStyle}>Country</label>
                          <input className={inputStyle} placeholder="Country" />
                       </div>
                       <div className="md:col-span-2">
                          <label className={labelStyle}>Cast</label>
                          <input className={inputStyle} placeholder="Cast" />
                       </div>
                       <div className="space-y-2">
                          <label className={labelStyle}>Duration</label>
                          <input className={inputStyle} placeholder="Duration" />
                       </div>
                       <div className="space-y-2">
                          <label className={labelStyle}>Rating (1-10)</label>
                          <input type="number" className={inputStyle} placeholder="Rating (1-10)" />
                       </div>
                       <div className="md:col-span-2">
                          <label className={labelStyle}>Description</label>
                          <textarea className={`${inputStyle} h-32 resize-none`} placeholder="Description" />
                       </div>
                       <div className="flex items-center space-x-4">
                          <label className={labelStyle}>Is Series</label>
                          <button type="button" className="px-4 py-2 bg-neutral-800 rounded-lg text-[10px] font-black">NO</button>
                       </div>
                    </div>
                 )}

                 {/* News Form */}
                 {selectedContentType === ContentType.NEWS && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                       <div className="md:col-span-2 space-y-2">
                          <label className={labelStyle}>Title *</label>
                          <input required className={inputStyle} placeholder="Title" />
                       </div>
                       <div className="space-y-2">
                          <label className={labelStyle}>Category</label>
                          <select className={inputStyle}>
                             <option>Select Category</option>
                             <option>Politics</option>
                             <option>Sports</option>
                          </select>
                       </div>
                       <div className="space-y-2">
                          <label className={labelStyle}>Image URL</label>
                          <input className={inputStyle} placeholder="Image URL" />
                       </div>
                       <div className="md:col-span-2 space-y-2">
                          <label className={labelStyle}>Summary</label>
                          <textarea className={`${inputStyle} h-20 resize-none`} placeholder="Summary" />
                       </div>
                       <div className="md:col-span-2 space-y-2">
                          <label className={labelStyle}>Content *</label>
                          <textarea required className={`${inputStyle} h-64 resize-none`} placeholder="Content" />
                       </div>
                       <div className="space-y-2">
                          <label className={labelStyle}>Author</label>
                          <input className={inputStyle} placeholder="Author" />
                       </div>
                       <div className="space-y-2">
                          <label className={labelStyle}>Published Date</label>
                          <input type="date" className={inputStyle} />
                       </div>
                       <div className="flex items-center space-x-4">
                          <label className={labelStyle}>Featured</label>
                          <button type="button" className="px-4 py-2 bg-neutral-800 rounded-lg text-[10px] font-black">NO</button>
                       </div>
                    </div>
                 )}

                 {/* Music Form */}
                 {selectedContentType === ContentType.MUSIC && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                       <div className="space-y-2">
                          <label className={labelStyle}>Title *</label>
                          <input required className={inputStyle} placeholder="Title" />
                       </div>
                       <div className="space-y-2">
                          <label className={labelStyle}>Artist *</label>
                          <input required className={inputStyle} placeholder="Artist" />
                       </div>
                       <div className="space-y-2">
                          <label className={labelStyle}>Album</label>
                          <input className={inputStyle} placeholder="Album" />
                       </div>
                       <div className="space-y-2">
                          <label className={labelStyle}>Genre</label>
                          <select className={inputStyle}>
                             <option>Select Genre</option>
                             <option>Afrobeat</option>
                             <option>Gakondo</option>
                          </select>
                       </div>
                       <div className="space-y-2">
                          <label className={labelStyle}>Cover URL</label>
                          <input className={inputStyle} placeholder="Cover URL" />
                       </div>
                       <div className="space-y-2">
                          <label className={labelStyle}>Audio URL</label>
                          <div className="flex space-x-2">
                            <input className={inputStyle} placeholder="Audio URL" />
                            <button type="button" className="px-4 bg-white/5 border border-white/10 rounded-xl text-[10px] font-black">UPLOAD</button>
                          </div>
                       </div>
                       <div className="space-y-2">
                          <label className={labelStyle}>Duration</label>
                          <input className={inputStyle} placeholder="Duration" />
                       </div>
                       <div className="space-y-2">
                          <label className={labelStyle}>Release Year</label>
                          <input className={inputStyle} placeholder="Release Year" />
                       </div>
                       <div className="flex items-center space-x-4">
                          <label className={labelStyle}>Trending</label>
                          <button type="button" className="px-4 py-2 bg-neutral-800 rounded-lg text-[10px] font-black">NO</button>
                       </div>
                    </div>
                 )}

                 {/* Live TV Form */}
                 {selectedContentType === ContentType.LIVE && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                       <div className="space-y-2">
                          <label className={labelStyle}>Channel Name *</label>
                          <input required className={inputStyle} placeholder="Channel Name" />
                       </div>
                       <div className="space-y-2">
                          <label className={labelStyle}>Category</label>
                          <select className={inputStyle}>
                             <option>Select Category</option>
                             <option>National</option>
                             <option>Entertainment</option>
                          </select>
                       </div>
                       <div className="space-y-2">
                          <label className={labelStyle}>Logo URL</label>
                          <input className={inputStyle} placeholder="Logo URL" />
                       </div>
                       <div className="space-y-2">
                          <label className={labelStyle}>Stream URL</label>
                          <input className={inputStyle} placeholder="Stream URL" />
                       </div>
                       <div className="md:col-span-2 space-y-2">
                          <label className={labelStyle}>Description</label>
                          <textarea className={`${inputStyle} h-20 resize-none`} placeholder="Description" />
                       </div>
                       <div className="space-y-2">
                          <label className={labelStyle}>Language</label>
                          <input className={inputStyle} placeholder="Language" />
                       </div>
                       <div className="flex items-center space-x-4">
                          <label className={labelStyle}>Is Live</label>
                          <button type="button" className="px-4 py-2 bg-neutral-800 rounded-lg text-[10px] font-black">NO</button>
                       </div>
                    </div>
                 )}

                 {/* Books Form */}
                 {selectedContentType === ContentType.BOOK && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                       <div className="space-y-2">
                          <label className={labelStyle}>Book Title *</label>
                          <input required className={inputStyle} placeholder="Book Title" />
                       </div>
                       <div className="space-y-2">
                          <label className={labelStyle}>Author *</label>
                          <input required className={inputStyle} placeholder="Author" />
                       </div>
                       <div className="space-y-2">
                          <label className={labelStyle}>Category</label>
                          <select className={inputStyle}>
                             <option>Fantasy</option>
                             <option>History</option>
                             <option>Culture</option>
                          </select>
                       </div>
                       <div className="space-y-2">
                          <label className={labelStyle}>Price (RWF) *</label>
                          <input required type="number" className={inputStyle} placeholder="Price (RWF)" />
                       </div>
                       <div className="md:col-span-2 space-y-2">
                          <label className={labelStyle}>Book Description</label>
                          <textarea className={`${inputStyle} h-24 resize-none`} placeholder="Description" />
                       </div>
                       <div className="space-y-2">
                          <label className={labelStyle}>Pages</label>
                          <input type="number" className={inputStyle} placeholder="Pages" />
                       </div>
                       <div className="space-y-2">
                          <label className={labelStyle}>Language</label>
                          <select className={inputStyle}>
                             <option>English</option>
                             <option>Kinyarwanda</option>
                             <option>French</option>
                          </select>
                       </div>
                       <div className="space-y-2">
                          <label className={labelStyle}>Year</label>
                          <input className={inputStyle} placeholder="Year" />
                       </div>
                       <div className="space-y-2">
                          <label className={labelStyle}>Publisher</label>
                          <input className={inputStyle} placeholder="Publisher" />
                       </div>
                       <div className="space-y-2">
                          <label className={labelStyle}>ISBN</label>
                          <input className={inputStyle} placeholder="ISBN" />
                       </div>
                       <div className="md:col-span-2 space-y-2">
                          <label className={labelStyle}>Cover Image</label>
                          <input type="file" className="block w-full text-xs text-neutral-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-[10px] file:font-black file:bg-white/10 file:text-white hover:file:bg-white/20 transition-all cursor-pointer" />
                       </div>
                       <div className="md:col-span-2 space-y-2">
                          <label className={labelStyle}>Full Book Content (copy/paste the complete text)</label>
                          <textarea className={`${inputStyle} h-64 resize-none`} placeholder="Paste the complete text..." />
                       </div>
                       <div className="flex flex-wrap gap-8 md:col-span-2">
                          <div className="flex items-center space-x-4">
                             <label className={labelStyle}>Featured Book</label>
                             <button type="button" className="px-4 py-2 bg-neutral-800 rounded-lg text-[10px] font-black">NO</button>
                          </div>
                          <div className="flex items-center space-x-4">
                             <label className={labelStyle}>Bestseller</label>
                             <button type="button" className="px-4 py-2 bg-neutral-800 rounded-lg text-[10px] font-black">NO</button>
                          </div>
                       </div>
                    </div>
                 )}
                 
                 <div className="pt-12 border-t border-white/5 flex space-x-4 bg-neutral-900/50 sticky bottom-0 -mx-10 px-10 py-6">
                    <button type="button" onClick={() => setIsModalOpen(false)} className="flex-grow py-5 bg-neutral-800 rounded-2xl font-black text-[11px] uppercase tracking-widest hover:bg-neutral-700 transition-all">Cancel</button>
                    <button type="submit" className="flex-grow py-5 bg-red-600 text-white rounded-2xl font-black text-[11px] uppercase tracking-widest shadow-2xl shadow-red-600/20 active:scale-95 transition-all hover:bg-red-500">
                        {selectedContentType === ContentType.BOOK ? 'Upload Book' : 'Save Content'}
                    </button>
                 </div>
              </form>
           </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
