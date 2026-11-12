'use client';
export const dynamic = "force-dynamic";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  MessageSquare, 
  ThumbsUp, 
  Send, 
  ShieldCheck, 
  HelpCircle,
  Tag,
  Headset,
  ArrowRight
} from 'lucide-react';

type Discussion = {
  id: number;
  author: string;
  role: string;
  avatar: string;
  subject: string;
  questionRef: string;
  content: string;
  upvotes: number;
  hasUpvoted: boolean;
  timestamp: string;
  replies: {
    id: number;
    author: string;
    role: string;
    content: string;
    timestamp: string;
    isVerifiedTutor?: boolean;
  }[];
};

export default function DiscussionForumPage() {
  const router = useRouter();
  const [discussions, setDiscussions] = useState<Discussion[]>([
    {
      id: 1,
      author: "Dr. Ananya Sharma",
      role: "Final Year MBBS",
      avatar: "AS",
      subject: "Pathology",
      questionRef: "Q#142: Gout vs Pseudogout Synovial Fluid",
      content: "Hey everyone! I keep confusing the birefringence colors on polarized light microscopy. Is there an easy mnemonic to remember whether gout is yellow when parallel or perpendicular?",
      upvotes: 24,
      hasUpvoted: false,
      timestamp: "2 hours ago",
      replies: [
        {
          id: 101,
          author: "Dr. Rajesh Kumar",
          role: "Verified Faculty / Mentor",
          content: "Use the mnemonic 'Yellow Parallel = Parallel / Needle = Negative (Gout)'. Alternatively, remember 'NEGA-TIVE' has G-O-U-T letters or think of 'YELLOW' being parallel to the axis for Monosodium urate.",
          timestamp: "1 hour ago",
          isVerifiedTutor: true
        },
        {
          id: 102,
          author: "Dr. Sneha Reddy",
          role: "Medical Intern",
          content: "That helps so much! I always remembered 'Rhomboid is Positive' (RP like a research paper), so Gout has to be the opposite.",
          timestamp: "30 mins ago"
        }
      ]
    }
  ]);

  const [selectedSubject, setSelectedSubject] = useState('All');
  const [newPostContent, setNewPostContent] = useState('');
  const [newPostSubject, setNewPostSubject] = useState('Pathology');
  const [newPostRef, setNewPostRef] = useState('');
  const [activeReplyId, setActiveReplyId] = useState<number | null>(null);
  const [replyText, setReplyText] = useState('');

  const subjects = ['All', 'Pathology', 'Pharmacology', 'Medicine', 'Surgery', 'PSM'];

  const handleUpvote = (id: number) => {
    setDiscussions(discussions.map(d => {
      if (d.id === id) {
        return {
          ...d,
          upvotes: d.hasUpvoted ? d.upvotes - 1 : d.upvotes + 1,
          hasUpvoted: !d.hasUpvoted
        };
      }
      return d;
    }));
  };

  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPostContent.trim()) return;

    const newDisc: Discussion = {
      id: Date.now(),
      author: "Dr. Keshav Upadhyay",
      role: "Student Aspirant",
      avatar: "KU",
      subject: newPostSubject,
      questionRef: newPostRef || "General Doubt",
      content: newPostContent,
      upvotes: 1,
      hasUpvoted: true,
      timestamp: "Just now",
      replies: []
    };

    setDiscussions([newDisc, ...discussions]);
    setNewPostContent('');
    setNewPostRef('');
  };

  const handleAddReply = (discussionId: number) => {
    if (!replyText.trim()) return;

    setDiscussions(discussions.map(d => {
      if (d.id === discussionId) {
        return {
          ...d,
          replies: [
            ...d.replies,
            {
              id: Date.now(),
              author: "Dr. Keshav Upadhyay",
              role: "Student Aspirant",
              content: replyText,
              timestamp: "Just now"
            }
          ]
        };
      }
      return d;
    }));

    setReplyText('');
    setActiveReplyId(null);
  };

  const filteredDiscussions = discussions.filter(d => 
    selectedSubject === 'All' || d.subject === selectedSubject
  );

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-16 pt-2">
      
      {/* Header with Expert Chat CTA */}
      <div className="border-b border-zinc-800/80 pb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-zinc-100 flex items-center gap-2">
            <MessageSquare className="w-6 h-6 text-orange-500" /> QBank Community & Doubt Forum
          </h1>
          <p className="text-sm text-zinc-400 mt-2">
            Discuss challenging questions and share high-yield mnemonics with fellow aspirants.
          </p>
        </div>

        <button 
          onClick={() => router.push('/chat/expert')}
          className="inline-flex items-center gap-2 bg-orange-600 hover:bg-orange-500 text-white font-bold text-xs px-5 py-3 rounded-xl transition shadow-[0_0_20px_rgba(249,115,22,0.2)] shrink-0"
        >
          <Headset className="w-4 h-4" /> Chat with Expert Mentor <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Post Doubt Box */}
      <div className="bg-[#141313] border border-zinc-800/80 rounded-2xl p-6 sm:p-8 shadow-sm">
        <h2 className="text-base font-bold text-zinc-100 mb-4 flex items-center gap-2">
          <HelpCircle className="w-5 h-5 text-orange-500" /> Post to Community
        </h2>

        <form onSubmit={handleCreatePost} className="space-y-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wider mb-1.5">Subject</label>
              <select 
                value={newPostSubject}
                onChange={(e) => setNewPostSubject(e.target.value)}
                className="w-full bg-[#181717] border border-zinc-800 rounded-xl px-4 py-3 text-zinc-100 text-xs focus:outline-none focus:border-orange-500 transition cursor-pointer"
              >
                {subjects.filter(s => s !== 'All').map(s => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wider mb-1.5">Question Reference (Optional)</label>
              <input 
                type="text" 
                value={newPostRef}
                onChange={(e) => setNewPostRef(e.target.value)}
                placeholder="e.g. Q#142 Pathology"
                className="w-full bg-[#181717] border border-zinc-800 rounded-xl px-4 py-3 text-zinc-100 text-xs focus:outline-none focus:border-orange-500 transition"
              />
            </div>
          </div>

          <div>
            <textarea 
              rows={3}
              required
              value={newPostContent}
              onChange={(e) => setNewPostContent(e.target.value)}
              placeholder="Ask your doubt or share a mnemonic with fellow aspirants..."
              className="w-full bg-[#181717] border border-zinc-800 rounded-xl p-4 text-zinc-100 text-sm focus:outline-none focus:border-orange-500 transition resize-none"
            />
          </div>

          <div className="flex justify-end">
            <button 
              type="submit"
              className="px-6 py-3 bg-orange-600 hover:bg-orange-500 text-white font-bold text-xs rounded-xl transition shadow-sm flex items-center gap-2"
            >
              <Send className="w-4 h-4" /> Post Discussion
            </button>
          </div>
        </form>
      </div>

      {/* Subject Filter Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2">
        {subjects.map(sub => (
          <button
            key={sub}
            onClick={() => setSelectedSubject(sub)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition whitespace-nowrap ${
              selectedSubject === sub 
                ? 'bg-orange-600 text-white shadow-sm' 
                : 'bg-[#141313] text-zinc-400 hover:text-zinc-100 border border-zinc-800'
            }`}
          >
            {sub}
          </button>
        ))}
      </div>

      {/* Discussions Feed */}
      <div className="space-y-6">
        {filteredDiscussions.map((disc) => (
          <div key={disc.id} className="bg-[#141313] border border-zinc-800/80 rounded-2xl p-6 sm:p-8 space-y-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-orange-500/10 border border-orange-500/30 flex items-center justify-center text-orange-400 text-sm font-bold">
                  {disc.avatar}
                </div>
                <div>
                  <h3 className="font-bold text-zinc-100 text-sm flex items-center gap-2">
                    {disc.author}
                    <span className="text-[10px] font-normal text-zinc-500 bg-zinc-900 px-2 py-0.5 rounded border border-zinc-800">
                      {disc.role}
                    </span>
                  </h3>
                  <p className="text-[11px] text-zinc-500">{disc.timestamp}</p>
                </div>
              </div>

              <span className="text-xs font-bold text-orange-400 bg-orange-500/10 px-3 py-1 rounded-md border border-orange-500/20">
                {disc.subject}
              </span>
            </div>

            {disc.questionRef && (
              <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-zinc-400 bg-[#181717] border border-zinc-800 px-3 py-1.5 rounded-lg">
                <Tag className="w-3.5 h-3.5 text-orange-500" /> {disc.questionRef}
              </div>
            )}

            <p className="text-sm sm:text-base text-zinc-200 leading-relaxed">
              {disc.content}
            </p>

            <div className="flex items-center gap-6 pt-2 border-t border-zinc-800/80">
              <button 
                onClick={() => handleUpvote(disc.id)}
                className={`flex items-center gap-2 text-xs font-bold transition px-3 py-1.5 rounded-lg ${
                  disc.hasUpvoted ? 'bg-orange-500/10 text-orange-500' : 'text-zinc-400 hover:text-zinc-100 hover:bg-zinc-900'
                }`}
              >
                <ThumbsUp className={`w-4 h-4 ${disc.hasUpvoted ? 'fill-orange-500' : ''}`} />
                {disc.upvotes} Upvotes
              </button>

              <button 
                onClick={() => setActiveReplyId(activeReplyId === disc.id ? null : disc.id)}
                className="flex items-center gap-2 text-xs font-semibold text-zinc-400 hover:text-zinc-100 transition px-3 py-1.5 rounded-lg hover:bg-zinc-900"
              >
                <MessageSquare className="w-4 h-4" /> {disc.replies.length} Replies
              </button>
            </div>

            {disc.replies.length > 0 && (
              <div className="space-y-4 pt-4 border-t border-zinc-800/50 pl-4 sm:pl-6">
                {disc.replies.map((reply) => (
                  <div key={reply.id} className={`p-4 rounded-xl border ${reply.isVerifiedTutor ? 'bg-orange-500/5 border-orange-500/30' : 'bg-[#181717] border-zinc-800/80'}`}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-bold text-xs text-zinc-200 flex items-center gap-2">
                        {reply.author}
                        {reply.isVerifiedTutor && (
                          <span className="flex items-center gap-1 text-[10px] font-bold text-orange-400 bg-orange-500/10 px-2 py-0.5 rounded border border-orange-500/20">
                            <ShieldCheck className="w-3 h-3" /> Verified Faculty
                          </span>
                        )}
                      </span>
                      <span className="text-[10px] text-zinc-500">{reply.timestamp}</span>
                    </div>
                    <p className="text-xs text-zinc-300 leading-relaxed">{reply.content}</p>
                  </div>
                ))}
              </div>
            )}

            {activeReplyId === disc.id && (
              <div className="pt-4 flex gap-3 animate-in fade-in">
                <input 
                  type="text"
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  placeholder="Write a helpful reply or mnemonic..."
                  className="flex-1 bg-[#181717] border border-zinc-800 rounded-xl px-4 py-2.5 text-zinc-100 text-xs focus:outline-none focus:border-orange-500 transition"
                />
                <button 
                  onClick={() => handleAddReply(disc.id)}
                  className="px-5 py-2.5 bg-orange-600 hover:bg-orange-500 text-white font-bold text-xs rounded-xl transition shadow-sm"
                >
                  Reply
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

    </div>
  );
}