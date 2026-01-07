import React, { useState, useEffect } from 'react';
import Layout from './components/Layout.tsx';
import Home from './pages/Home.tsx';
import Watch from './pages/Watch.tsx';
import Listen from './pages/Listen.tsx';
import Read from './pages/Read.tsx';
import Profile from './pages/Profile.tsx';
import CreatorStudio from './pages/CreatorStudio.tsx';
import Search from './pages/Search.tsx';
import Subscription from './pages/Subscription.tsx';
import LiveTV from './pages/LiveTV.tsx';
import Top100Books from './pages/Top100Books.tsx';
import AdminDashboard from './pages/AdminDashboard.tsx';
import BookReader from './pages/BookReader.tsx';
import Downloads from './pages/Downloads.tsx';
import AgasobanuyeDetail from './pages/AgasobanuyeDetail.tsx';
import NarratorProfile from './pages/NarratorProfile.tsx';
import DetailOverlay from './components/DetailOverlay.tsx';
import VideoPlayer from './components/VideoPlayer.tsx';
import MusicPlayer from './components/MusicPlayer.tsx';
import { ContentItem, Book, ContentType, UserProfile, Language, NarratorProfile as NarratorType } from './types.ts';
import { NARRATORS, MOCK_CONTENT } from './constants.tsx';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [selectedItem, setSelectedItem] = useState<ContentItem | null>(null);
  const [playingItem, setPlayingItem] = useState<ContentItem | null>(null);
  const [currentMusicTrack, setCurrentMusicTrack] = useState<ContentItem | null>(null);
  const [isOfflinePlay, setIsOfflinePlay] = useState(false);
  const [playerMode, setPlayerMode] = useState<'expanded' | 'minimized'>('expanded');
  const [readingBook, setReadingBook] = useState<Book | null>(null);
  const [detailItem, setDetailItem] = useState<ContentItem | null>(null);
  const [activeNarrator, setActiveNarrator] = useState<NarratorType | null>(null);
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const [user, setUser] = useState<UserProfile>({
    id: 'user-1',
    name: 'Ishimwe Robert',
    avatar: 'https://picsum.photos/seed/robert/100/100',
    credits: 2450,
    role: 'CREATOR',
    language: Language.RW,
    isPremium: true,
    watchHistory: [],
    ownedBooks: [],
    downloadedIds: ['hero-1', 'r1a', 'g13a'],
    followingNarrators: ['sankara']
  });

  const handleItemClick = (item: ContentItem) => {
    if (activeTab === 'downloads') {
      setIsOfflinePlay(true);
    } else {
      setIsOfflinePlay(false);
    }

    if (item.type === ContentType.VIDEO || item.type === ContentType.AGASOBANUYE || item.type === ContentType.SHORT) {
      handlePlayItem(item);
    } else if (item.type === ContentType.MUSIC || item.type === ContentType.PODCAST) {
      handlePlayMusic(item);
    } else {
      setSelectedItem(item);
    }
  };

  const handlePlayItem = (item: ContentItem) => {
    setSelectedItem(null);
    setDetailItem(null);
    setActiveNarrator(null);
    if (item.type === ContentType.BOOK) {
      setReadingBook(item as Book);
    } else {
      setPlayingItem(item);
      setPlayerMode('expanded');
    }
  };

  const handlePlayMusic = (item: ContentItem) => {
    setCurrentMusicTrack(item);
  };

  const handleDownload = (id: string) => {
    if (!user.downloadedIds.includes(id)) {
      setUser(prev => ({
        ...prev,
        downloadedIds: [...prev.downloadedIds, id]
      }));
    }
  };

  const handleNarratorClick = (narratorName: string) => {
    const found = NARRATORS.find(n => n.name === narratorName);
    if (found) {
      setDetailItem(null);
      setSelectedItem(null);
      setActiveNarrator(found);
    }
  };

  const handleFollowToggle = (narratorId: string) => {
    setUser(prev => {
      const alreadyFollowing = prev.followingNarrators.includes(narratorId);
      return {
        ...prev,
        followingNarrators: alreadyFollowing 
          ? prev.followingNarrators.filter(id => id !== narratorId)
          : [...prev.followingNarrators, narratorId]
      };
    });
  };

  const togglePlayerMode = () => {
    setPlayerMode(prev => prev === 'expanded' ? 'minimized' : 'expanded');
  };

  const renderContent = () => {
    if (activeNarrator) {
      return (
        <NarratorProfile 
          narrator={activeNarrator}
          isFollowing={user.followingNarrators.includes(activeNarrator.id)}
          onFollowToggle={handleFollowToggle}
          onItemClick={handleItemClick}
          onBack={() => setActiveNarrator(null)}
        />
      );
    }

    if (detailItem && detailItem.type === ContentType.AGASOBANUYE) {
      return (
        <AgasobanuyeDetail 
          item={detailItem}
          isPremiumUser={user.isPremium}
          downloadedIds={user.downloadedIds}
          onClose={() => setDetailItem(null)}
          onPlay={handlePlayItem}
          onDownload={handleDownload}
          onNarratorClick={handleNarratorClick}
        />
      );
    }

    switch (activeTab) {
      case 'home':
        return <Home onItemClick={handleItemClick} onPlayItem={handlePlayItem} />;
      case 'watch':
        return <Watch onItemClick={handleItemClick} />;
      case 'listen':
        return <Listen onPlayTrack={handlePlayMusic} />;
      case 'read':
        return <Read />;
      case 'live':
        return <LiveTV />;
      case 'top100books':
        return <Top100Books />;
      case 'admin':
        return <AdminDashboard />;
      case 'create':
        return <CreatorStudio />;
      case 'profile':
        return <Profile theme={theme} onThemeChange={setTheme} />;
      case 'search':
        return <Search onItemClick={handleItemClick} />;
      case 'subscription':
        return <Subscription />;
      case 'downloads':
        return <Downloads downloadedIds={user.downloadedIds} onItemClick={handleItemClick} />;
      default:
        return <Home onItemClick={handleItemClick} onPlayItem={handlePlayItem} />;
    }
  };

  return (
    <Layout activeTab={activeTab} onTabChange={setActiveTab} theme={theme}>
      <div className="mb-20">
        {renderContent()}
      </div>
      
      {selectedItem && (
        <DetailOverlay 
          item={selectedItem} 
          isPremiumUser={user.isPremium}
          downloadedIds={user.downloadedIds}
          onClose={() => setSelectedItem(null)}
          onPlay={handlePlayItem}
          onDownload={handleDownload}
          onNarratorClick={handleNarratorClick}
        />
      )}

      {playingItem && (
        <VideoPlayer 
          item={playingItem} 
          mode={playerMode}
          isOffline={isOfflinePlay}
          onClose={() => {
            setPlayingItem(null);
            setIsOfflinePlay(false);
          }} 
          onModeToggle={togglePlayerMode}
        />
      )}

      {currentMusicTrack && (
        <MusicPlayer 
          track={currentMusicTrack} 
          onClose={() => setCurrentMusicTrack(null)}
        />
      )}

      {readingBook && (
        <BookReader 
          book={readingBook} 
          onClose={() => setReadingBook(null)} 
        />
      )}

      <div className="hidden lg:flex fixed bottom-8 left-1/2 -translate-x-1/2 bg-white/80 dark:bg-neutral-900/80 backdrop-blur-xl border border-neutral-200 dark:border-white/10 p-2 rounded-3xl shadow-2xl items-center space-x-2 z-40">
        {[
          { id: 'search', icon: 'M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z', label: 'Search' },
          { id: 'downloads', icon: 'M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10', label: 'Downloads' },
          { id: 'top100books', icon: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.246.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253', label: 'Books' },
          { id: 'admin', icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0', label: 'Admin' },
          { id: 'subscription', icon: 'M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9', label: 'Premium' }
        ].map((item) => (
          <button 
            key={item.id}
            onClick={() => setActiveTab(item.id)} 
            className={`flex flex-col items-center p-3 rounded-2xl transition-all ${activeTab === item.id ? 'bg-red-600 text-white' : 'hover:bg-neutral-100 dark:hover:bg-white/5 text-neutral-500 hover:text-neutral-900 dark:hover:text-white'}`}
            title={item.label}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={item.icon}/>
            </svg>
            <span className="text-[8px] font-black uppercase mt-1">{item.label}</span>
          </button>
        ))}
      </div>
    </Layout>
  );
};

export default App;