
import React, { useState } from 'react';
import Layout from './components/Layout';
import Home from './pages/Home';
import Watch from './pages/Watch';
import Listen from './pages/Listen';
import Read from './pages/Read';
import Profile from './pages/Profile';
import CreatorStudio from './pages/CreatorStudio';
import DetailOverlay from './components/DetailOverlay';
import { ContentItem } from './types';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [selectedItem, setSelectedItem] = useState<ContentItem | null>(null);

  const handleItemClick = (item: ContentItem) => {
    setSelectedItem(item);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return <Home />;
      case 'watch':
        return <Watch onItemClick={handleItemClick} />;
      case 'listen':
        return <Listen />;
      case 'read':
        return <Read />;
      case 'live':
        return (
          <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-6 text-center">
            <div className="relative">
              <div className="w-24 h-24 bg-red-600/20 rounded-full animate-ping absolute inset-0"></div>
              <div className="w-24 h-24 bg-red-600 rounded-full flex items-center justify-center relative">
                <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"/></svg>
              </div>
            </div>
            <div>
              <h1 className="text-3xl font-black mb-2">Live TV & Streams</h1>
              <p className="text-neutral-400">Join real-time broadcasts from national media houses and top creators.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full mt-10">
              {['RTV Rwanda', 'Flash TV', 'Kigali Today TV', 'Creator Live', 'Isango Star'].map((title, i) => (
                <div key={i} className="relative aspect-video rounded-2xl overflow-hidden group cursor-pointer border border-red-500/20 hover:border-red-500 transition-colors">
                  <img src={`https://picsum.photos/seed/live-${i}/800/450`} className="w-full h-full object-cover opacity-80" alt="" />
                  <div className="absolute top-3 left-3 bg-red-600 px-2 py-0.5 rounded text-[10px] font-black animate-pulse">LIVE</div>
                  <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-md px-2 py-0.5 rounded text-[10px] font-bold flex items-center">
                    <span className="w-1.5 h-1.5 bg-red-500 rounded-full mr-1.5"></span>
                    {Math.floor(Math.random() * 5000 + 1000)} watching
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent flex flex-col justify-end p-4">
                    <h3 className="font-bold text-sm">{title}: Breaking News Hub</h3>
                    <p className="text-[10px] text-neutral-400">Official Channel</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      case 'create':
        return <CreatorStudio />;
      case 'profile':
        return <Profile />;
      default:
        return <Home />;
    }
  };

  return (
    <Layout activeTab={activeTab} onTabChange={setActiveTab}>
      {renderContent()}
      {selectedItem && (
        <DetailOverlay 
          item={selectedItem} 
          onClose={() => setSelectedItem(null)} 
        />
      )}
    </Layout>
  );
};

export default App;
