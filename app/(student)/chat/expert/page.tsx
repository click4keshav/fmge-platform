'use client';


import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Headset, 
  ArrowLeft, 
  Send, 
  ShieldCheck, 
  Clock, 
  CheckCircle2, 
  Sparkles,
  UserCheck
} from 'lucide-react';

type Message = {
  id: number;
  sender: 'student' | 'expert';
  text: string;
  time: string;
};

export default function ExpertChatPage() {
  const router = useRouter();
  const [step, setStep] = useState<'form' | 'assigning' | 'chat'>('form');
  const [subject, setSubject] = useState('Pathology');
  const [query, setQuery] = useState('');
  
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      sender: 'expert',
      text: "Hello Dr. Keshav! I'm Dr. Rajesh Kumar (Senior FMGE Faculty). I've received your query. How can I assist you with your preparation today?",
      time: "Just now"
    }
  ]);
  const [inputText, setInputText] = useState('');

  const handleStartChat = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setStep('assigning');
    
    // Simulate finding and assigning an expert mentor
    setTimeout(() => {
      setStep('chat');
      setMessages(prev => [
        ...prev,
        {
          id: Date.now(),
          sender: 'student',
          text: query,
          time: "Just now"
        }
      ]);
    }, 2000);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const userMsg: Message = {
      id: Date.now(),
      sender: 'student',
      text: inputText,
      time: "Just now"
    };

    setMessages(prev => [...prev, userMsg]);
    setInputText('');

    // Simulate expert auto-reply
    setTimeout(() => {
      setMessages(prev => [
        ...prev,
        {
          id: Date.now() + 1,
          sender: 'expert',
          text: "That's a classic high-yield concept tested frequently in FMGE. Let's break it down step-by-step...",
          time: "Just now"
        }
      ]);
    }, 1500);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12 pt-2">
      
      {/* Top Bar */}
      <div className="flex items-center justify-between border-b border-zinc-800/80 pb-6">
        <button 
          onClick={() => router.push('/chat')}
          className="text-zinc-400 hover:text-zinc-100 transition flex items-center gap-1.5 text-xs font-bold bg-[#141313] px-3 py-2 rounded-xl border border-zinc-800"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Community Forum
        </button>
        <span className="text-xs font-bold text-orange-400 bg-orange-500/10 px-3 py-1.5 rounded-lg border border-orange-500/20 flex items-center gap-1.5">
          <Headset className="w-4 h-4" /> 1:1 Expert Mentorship
        </span>
      </div>

      {/* STEP 1: Query Submission Form */}
      {step === 'form' && (
        <div className="bg-[#141313] border border-zinc-800/80 rounded-3xl p-8 sm:p-10 shadow-2xl relative overflow-hidden max-w-xl mx-auto mt-8">
          <Sparkles className="absolute top-6 right-6 w-24 h-24 text-orange-500/5 rotate-12" />

          <div className="mb-6">
            <h2 className="text-2xl font-bold text-zinc-100 mb-2">Connect with a Medical Expert</h2>
            <p className="text-sm text-zinc-400">Submit your doubt below and we will match you with a verified faculty mentor instantly.</p>
          </div>

          <form onSubmit={handleStartChat} className="space-y-6">
            <div>
              <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wider mb-2">Select Subject</label>
              <select 
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full bg-[#181717] border border-zinc-800 rounded-xl px-4 py-3.5 text-zinc-100 text-sm focus:outline-none focus:border-orange-500 transition cursor-pointer"
              >
                {['Pathology', 'Pharmacology', 'Medicine', 'Surgery', 'PSM', 'Anatomy', 'Biochemistry'].map(s => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wider mb-2">Describe Your Doubt</label>
              <textarea 
                rows={4}
                required
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Type your question or concept doubt in detail..."
                className="w-full bg-[#181717] border border-zinc-800 rounded-xl p-4 text-zinc-100 text-sm focus:outline-none focus:border-orange-500 transition resize-none"
              />
            </div>

            <button 
              type="submit"
              className="w-full py-4 bg-orange-600 hover:bg-orange-500 text-white font-bold rounded-xl transition shadow-sm flex items-center justify-center gap-2"
            >
              <Headset className="w-5 h-5" /> Start Live Expert Session
            </button>
          </form>
        </div>
      )}

      {/* STEP 2: Assigning State Loader */}
      {step === 'assigning' && (
        <div className="bg-[#141313] border border-zinc-800/80 rounded-3xl p-16 text-center max-w-xl mx-auto mt-12 shadow-2xl space-y-6">
          <div className="w-20 h-20 bg-orange-500/10 rounded-full flex items-center justify-center mx-auto border border-orange-500/20 animate-pulse">
            <UserCheck className="w-10 h-10 text-orange-500" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-zinc-100 mb-2">Assigning to Available Faculty...</h2>
            <p className="text-sm text-zinc-400">Matching you with a senior {subject} mentor. Please hold on.</p>
          </div>
          <div className="w-full h-1.5 bg-zinc-900 rounded-full overflow-hidden max-w-xs mx-auto">
            <div className="h-full bg-orange-500 rounded-full animate-pulse w-3/4"></div>
          </div>
        </div>
      )}

      {/* STEP 3: Live Chat Sandbox */}
      {step === 'chat' && (
        <div className="bg-[#141313] border border-zinc-800/80 rounded-3xl overflow-hidden shadow-2xl flex flex-col h-[650px]">
          
          {/* Chat Header */}
          <div className="bg-[#181717] border-b border-zinc-800/80 p-5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-orange-500/10 border border-orange-500/30 flex items-center justify-center text-orange-400 font-bold text-sm">
                RK
              </div>
              <div>
                <h3 className="font-bold text-zinc-100 text-sm flex items-center gap-2">
                  Dr. Rajesh Kumar 
                  <span className="flex items-center gap-1 text-[10px] font-bold text-orange-400 bg-orange-500/10 px-2 py-0.5 rounded border border-orange-500/20">
                    <ShieldCheck className="w-3 h-3" /> Verified Faculty
                  </span>
                </h3>
                <p className="text-[11px] text-zinc-500">Active Expert • {subject}</p>
              </div>
            </div>

            <button 
              onClick={() => setStep('form')}
              className="text-xs bg-zinc-800 hover:bg-zinc-700 text-zinc-300 font-bold px-3.5 py-2 rounded-xl transition"
            >
              End Session
            </button>
          </div>

          {/* Messages Container */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4 custom-scrollbar">
            {messages.map((msg) => (
              <div 
                key={msg.id}
                className={`flex flex-col max-w-lg ${msg.sender === 'student' ? 'ml-auto items-end' : 'mr-auto items-start'}`}
              >
                <div className={`p-4 rounded-2xl text-sm leading-relaxed ${
                  msg.sender === 'student' 
                    ? 'bg-orange-600 text-white rounded-br-none shadow-sm' 
                    : 'bg-[#181717] border border-zinc-800 text-zinc-200 rounded-bl-none'
                }`}>
                  {msg.text}
                </div>
                <span className="text-[10px] text-zinc-500 mt-1 px-1">{msg.time}</span>
              </div>
            ))}
          </div>

          {/* Input Box */}
          <form onSubmit={handleSendMessage} className="p-4 bg-[#181717] border-t border-zinc-800/80 flex gap-3">
            <input 
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Type your reply to the expert..."
              className="flex-1 bg-[#141313] border border-zinc-800 rounded-xl px-4 py-3 text-zinc-100 text-sm focus:outline-none focus:border-orange-500 transition"
            />
            <button 
              type="submit"
              className="px-6 py-3 bg-orange-600 hover:bg-orange-500 text-white font-bold rounded-xl transition shadow-sm flex items-center gap-2"
            >
              <Send className="w-4 h-4" /> Send
            </button>
          </form>

        </div>
      )}

    </div>
  );
}