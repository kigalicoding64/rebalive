
import React, { useState, useRef, useEffect } from 'react';
import { keroAssistant } from '../services/geminiService';
import { ChatMessage } from '../types';

const KeroAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', content: 'Muraho! I am Kero, your RebaLive assistant. How can I help you discover Rwanda today?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setIsLoading(true);

    const response = await keroAssistant.chat(userMsg, messages);
    
    setMessages(prev => [...prev, { role: 'model', content: response }]);
    setIsLoading(false);
  };

  return (
    <div className="fixed bottom-20 md:bottom-8 right-4 md:right-8 z-[60]">
      {isOpen ? (
        <div className="w-80 md:w-96 h-[500px] bg-neutral-900 border border-neutral-800 rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-300">
          <div className="p-4 bg-gradient-to-r from-red-600 to-amber-600 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                <span className="text-white text-xs font-bold">K</span>
              </div>
              <span className="font-bold text-white">Kero Assistant</span>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-white/80 hover:text-white">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/></svg>
            </button>
          </div>

          <div ref={scrollRef} className="flex-grow p-4 space-y-4 overflow-y-auto scroll-smooth">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] p-3 rounded-2xl text-sm ${
                  msg.role === 'user' ? 'bg-red-600 text-white rounded-tr-none' : 'bg-neutral-800 text-neutral-200 rounded-tl-none'
                }`}>
                  {msg.content}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-neutral-800 p-3 rounded-2xl rounded-tl-none flex space-x-1">
                  <div className="w-1.5 h-1.5 bg-neutral-500 rounded-full animate-bounce"></div>
                  <div className="w-1.5 h-1.5 bg-neutral-500 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                  <div className="w-1.5 h-1.5 bg-neutral-500 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                </div>
              </div>
            )}
          </div>

          <div className="p-4 border-t border-neutral-800 flex space-x-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask Kero something..."
              className="flex-grow bg-neutral-800 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-red-500"
            />
            <button onClick={handleSend} className="bg-red-600 p-2 rounded-full hover:bg-red-500 transition-colors">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"/></svg>
            </button>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setIsOpen(true)}
          className="w-14 h-14 bg-gradient-to-br from-red-600 to-amber-500 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform ring-4 ring-black"
        >
          <div className="relative">
            <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"/></svg>
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 border-2 border-black rounded-full"></div>
          </div>
        </button>
      )}
    </div>
  );
};

export default KeroAssistant;
