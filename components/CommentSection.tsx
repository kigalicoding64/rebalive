
import React, { useState } from 'react';

interface Comment {
  id: string;
  user: string;
  avatar: string;
  text: string;
  rating: number;
  time: string;
}

const CommentSection: React.FC<{ contentId: string }> = ({ contentId }) => {
  const [commentText, setCommentText] = useState('');
  const [rating, setRating] = useState(5);
  const [comments, setComments] = useState<Comment[]>([
    {
      id: '1',
      user: 'Mugisha Eric',
      avatar: 'https://picsum.photos/seed/eric/100/100',
      text: 'Sankara is the best narrator! This movie is so funny in Kinyarwanda.',
      rating: 5,
      time: '2 hours ago'
    },
    {
      id: '2',
      user: 'Umutoni Diane',
      avatar: 'https://picsum.photos/seed/diane/100/100',
      text: 'Quality is amazing. RebaLive is changing the game.',
      rating: 4,
      time: '5 hours ago'
    }
  ]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim()) return;

    const newComment: Comment = {
      id: Date.now().toString(),
      user: 'Ishimwe Robert', // Mock current user
      avatar: 'https://picsum.photos/seed/robert/100/100',
      text: commentText,
      rating: rating,
      time: 'Just now'
    };

    setComments([newComment, ...comments]);
    setCommentText('');
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-black">Community Reviews ({comments.length})</h3>
        <div className="flex items-center space-x-1 text-amber-500 font-black">
          <svg className="w-5 h-5 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
          <span>4.8</span>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="bg-neutral-900/50 p-6 rounded-3xl border border-white/5 space-y-4">
        <div className="flex items-center space-x-4 mb-2">
          <span className="text-xs font-bold text-neutral-500 uppercase">Your Rating:</span>
          <div className="flex space-x-1">
            {[1, 2, 3, 4, 5].map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setRating(s)}
                className={`w-6 h-6 transition-colors ${s <= rating ? 'text-amber-500' : 'text-neutral-700 hover:text-amber-500/50'}`}
              >
                <svg className="fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
              </button>
            ))}
          </div>
        </div>
        <textarea
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          placeholder="Ibibazo cyangwa ibitekerezo... (Write a comment)"
          className="w-full bg-black/40 border border-white/10 rounded-2xl p-4 text-sm focus:outline-none focus:ring-2 focus:ring-red-600/50 min-h-[100px] resize-none"
        />
        <div className="flex justify-end">
          <button
            type="submit"
            className="px-8 py-3 bg-red-600 text-white font-black text-xs rounded-xl hover:bg-red-500 transition-all active:scale-95"
          >
            POST COMMENT
          </button>
        </div>
      </form>

      <div className="space-y-6">
        {comments.map((comment) => (
          <div key={comment.id} className="flex space-x-4 group animate-in slide-in-from-left-4 duration-300">
            <img src={comment.avatar} className="w-12 h-12 rounded-2xl object-cover ring-2 ring-white/5" alt="" />
            <div className="flex-grow bg-neutral-900/30 p-4 rounded-3xl border border-white/5 group-hover:bg-neutral-900/50 transition-colors">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-bold text-sm">{comment.user}</h4>
                <div className="flex items-center space-x-2">
                  <div className="flex text-amber-500 scale-75 origin-right">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <svg key={i} className={`w-4 h-4 ${i < comment.rating ? 'fill-current' : 'text-neutral-700'}`} viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
                    ))}
                  </div>
                  <span className="text-[10px] text-neutral-500 font-bold uppercase">{comment.time}</span>
                </div>
              </div>
              <p className="text-sm text-neutral-300 leading-relaxed">{comment.text}</p>
              <div className="flex items-center space-x-4 mt-4">
                <button className="text-[10px] font-black text-neutral-500 hover:text-white transition-colors uppercase tracking-widest">Helpful</button>
                <button className="text-[10px] font-black text-neutral-500 hover:text-white transition-colors uppercase tracking-widest">Reply</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommentSection;
