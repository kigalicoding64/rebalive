
import React from 'react';
import { MOCK_CONTENT, MOCK_BOOKS } from '../constants';
import ContentCard from '../components/ContentCard';
import { ContentItem } from '../types';

interface DownloadsProps {
  downloadedIds: string[];
  onItemClick: (item: ContentItem) => void;
}

const Downloads: React.FC<DownloadsProps> = ({ downloadedIds, onItemClick }) => {
  const allContent = [...MOCK_CONTENT, ...MOCK_BOOKS];
  const downloadedContent = allContent.filter(item => downloadedIds.includes(item.id));

  return (
    <div className="space-y-8 animate-in fade-in duration-500 max-w-7xl mx-auto py-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black">Offline Downloads</h1>
          <p className="text-neutral-400 text-sm mt-1">Access your favorite content even without an internet connection.</p>
        </div>
        <div className="bg-neutral-900 px-4 py-2 rounded-xl border border-white/5 flex items-center space-x-2">
           <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/></svg>
           <span className="text-xs font-bold text-neutral-300">{downloadedContent.length} Items Available</span>
        </div>
      </div>

      {downloadedContent.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center space-y-6">
          <div className="w-24 h-24 bg-neutral-900 rounded-full flex items-center justify-center text-neutral-700">
            <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10"/></svg>
          </div>
          <div className="max-w-xs">
            <h3 className="text-xl font-bold">No Downloads Yet</h3>
            <p className="text-neutral-500 text-sm mt-2">Go Premium to unlock offline viewing and take your movies everywhere!</p>
          </div>
          <button className="px-8 py-3 bg-red-600 text-white font-black text-sm rounded-2xl hover:bg-red-500 transition-colors shadow-xl shadow-red-600/20">EXPLORE PREMIUM</button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {downloadedContent.map(item => (
            <div key={item.id} className="relative group">
              <ContentCard item={item} onClick={onItemClick} />
              <div className="absolute top-2 right-2 p-1.5 bg-green-500 text-white rounded-lg shadow-lg">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/></svg>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Downloads;
