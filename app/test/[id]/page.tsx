'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { Clock, ChevronLeft, ChevronRight, Bookmark, Flag, Pause, LayoutGrid, CheckCircle2, XCircle, MinusCircle, Trophy, RefreshCcw, BookOpen } from 'lucide-react';
import Link from 'next/link';

// Base High-Yield Mock Questions
const baseMockQuestions = [
  {
    id: 1,
    text: "A 45-year-old male presents with acute severe pain in his right toe. Microscopic analysis of synovial fluid shows negatively birefringent needle-shaped crystals. What is the most likely diagnosis?",
    options: ["Pseudogout", "Gout", "Rheumatoid Arthritis", "Septic Arthritis"],
    correctOptionIndex: 1, // Gout
  },
  {
    id: 2,
    text: "Which of the following beta-blockers also possesses alpha-1 receptor blocking activity, making it particularly useful in treating hypertensive emergencies?",
    options: ["Metoprolol", "Propranolol", "Labetalol", "Atenolol"],
    correctOptionIndex: 2, // Labetalol
  },
  {
    id: 3,
    text: "A patient presents with a 'cherry-red spot' on the macula and exhibits hyperacusis. Which enzyme is most likely deficient?",
    options: ["Hexosaminidase A", "Sphingomyelinase", "Glucocerebrosidase", "Alpha-galactosidase A"],
    correctOptionIndex: 0, // Hexosaminidase A
  }
];

export default function TestEnginePage() {
  const router = useRouter();
  const params = useParams();
  const testId = params.id as string;

  // Dynamically generate the test based on the route
  // If it's QOTD, just 1 question. Otherwise, loop the base questions to make 15 for the full UI experience.
  const isQOTD = testId === 'qotd';
  const mockQuestions = isQOTD 
    ? baseMockQuestions.slice(0, 1) 
    : Array(5).fill(baseMockQuestions).flat().map((q, idx) => ({ ...q, id: idx + 1 }));

  const [currentQ, setCurrentQ] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [markedForReview, setMarkedForReview] = useState<Set<number>>(new Set());
  const [bookmarked, setBookmarked] = useState<Set<number>>(new Set());
  
  // Timer State (1 min for QOTD, 15 mins for standard modules)
  const initialTime = isQOTD ? 1 * 60 : 15 * 60;
  const [timeLeft, setTimeLeft] = useState(initialTime);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Timer Countdown Logic (Auto-submit on 0)
  useEffect(() => {
    if (isSubmitted) return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setIsSubmitted(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [isSubmitted]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const handleOptionSelect = (optIndex: number) => {
    setSelectedAnswers(prev => ({ ...prev, [currentQ]: optIndex }));
  };

  const toggleReview = () => {
    setMarkedForReview(prev => {
      const newSet = new Set(prev);
      if (newSet.has(currentQ)) newSet.delete(currentQ);
      else newSet.add(currentQ);
      return newSet;
    });
  };

  const toggleBookmark = () => {
    setBookmarked(prev => {
      const newSet = new Set(prev);
      if (newSet.has(currentQ)) newSet.delete(currentQ);
      else newSet.add(currentQ);
      return newSet;
    });
  };

  // Reset the entire test state to take it again
  const handleReattempt = () => {
    setIsSubmitted(false);
    setSelectedAnswers({});
    setMarkedForReview(new Set());
    setBookmarked(new Set());
    setCurrentQ(0);
    setTimeLeft(initialTime);
  };

  // ---------------------------------------------------------
  // SUBMITTED RESULTS VIEW (Acts as a dismissible modal)
  // ---------------------------------------------------------
  if (isSubmitted) {
    let correct = 0;
    let incorrect = 0;
    let unattempted = 0;

    mockQuestions.forEach((q, idx) => {
      if (selectedAnswers[idx] === undefined) unattempted++;
      else if (selectedAnswers[idx] === q.correctOptionIndex) correct++;
      else incorrect++;
    });

    return (
      // Clicking the outer wrapper background sends you back to the previous page
      <div 
        className="min-h-screen bg-[#0f0e0e]/95 backdrop-blur-sm text-zinc-100 flex items-center justify-center p-6 cursor-pointer"
        onClick={() => router.back()}
      >
        {/* Clicking inside the modal stops the click from closing it */}
        <div 
          className="max-w-3xl w-full bg-[#141313] border border-zinc-800/80 rounded-2xl p-8 md:p-12 shadow-2xl text-center relative overflow-hidden cursor-default"
          onClick={(e) => e.stopPropagation()}
        >
          <Trophy className="w-32 h-32 text-orange-500/10 absolute -top-6 -right-6 rotate-12" />

          <h1 className="text-3xl font-bold text-zinc-100 mb-2 relative z-10">Test Completed!</h1>
          <p className="text-sm text-zinc-400 mb-10 relative z-10">Your responses have been securely saved and scored.</p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10 relative z-10">
            <div className="bg-[#181717] p-5 rounded-xl border border-zinc-800 flex flex-col items-center">
              <span className="text-xs text-zinc-500 font-semibold uppercase tracking-wider mb-2">Score</span>
              <span className="text-3xl font-bold text-zinc-100">{correct}<span className="text-lg text-zinc-500">/{mockQuestions.length}</span></span>
            </div>
            <div className="bg-emerald-500/10 p-5 rounded-xl border border-emerald-500/20 flex flex-col items-center">
              <CheckCircle2 className="w-5 h-5 text-emerald-500 mb-2" />
              <span className="text-xs text-emerald-500/70 font-semibold uppercase tracking-wider mb-1">Correct</span>
              <span className="text-2xl font-bold text-emerald-400">{correct}</span>
            </div>
            <div className="bg-red-500/10 p-5 rounded-xl border border-red-500/20 flex flex-col items-center">
              <XCircle className="w-5 h-5 text-red-500 mb-2" />
              <span className="text-xs text-red-500/70 font-semibold uppercase tracking-wider mb-1">Incorrect</span>
              <span className="text-2xl font-bold text-red-400">{incorrect}</span>
            </div>
            <div className="bg-zinc-900 p-5 rounded-xl border border-zinc-800 flex flex-col items-center">
              <MinusCircle className="w-5 h-5 text-zinc-500 mb-2" />
              <span className="text-xs text-zinc-500 font-semibold uppercase tracking-wider mb-1">Skipped</span>
              <span className="text-2xl font-bold text-zinc-400">{unattempted}</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 relative z-10">
            {/* 1. Review Solutions */}
            <Link 
              href={`/test/review/${testId}`}
              className="px-4 py-3 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl transition shadow-sm flex items-center justify-center gap-2"
            >
              <BookOpen className="w-4 h-4" /> Solutions
            </Link>
            
            {/* 2. Reattempt */}
            <button 
              onClick={handleReattempt}
              className="px-4 py-3 bg-zinc-800 hover:bg-zinc-700 text-zinc-100 text-xs font-bold rounded-xl transition shadow-sm flex items-center justify-center gap-2"
            >
              <RefreshCcw className="w-4 h-4" /> Reattempt
            </button>
            
            {/* 3. Analytics */}
            <Link 
              href="/results" 
              className="px-4 py-3 bg-zinc-800 hover:bg-zinc-700 text-zinc-100 text-xs font-bold rounded-xl transition shadow-sm flex items-center justify-center"
            >
              Analytics
            </Link>

            {/* 4. Dashboard */}
            <button 
              onClick={() => router.back()}
              className="px-4 py-3 bg-orange-600 hover:bg-orange-500 text-white text-xs font-bold rounded-xl transition shadow-sm flex items-center justify-center"
            >
              Exit
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ---------------------------------------------------------
  // ACTIVE TEST ENGINE VIEW
  // ---------------------------------------------------------
  const question = mockQuestions[currentQ];

  return (
    <div className="min-h-screen bg-[#0f0e0e] text-zinc-100 flex flex-col font-sans selection:bg-orange-500/30">
      
      {/* Top Navbar */}
      <header className="h-16 bg-[#141313] border-b border-zinc-800/80 px-6 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-4">
          <button onClick={() => router.back()} className="text-xl font-bold tracking-tight text-orange-500 hover:text-orange-400 transition">
            Fornix
          </button>
          <div className="h-4 w-px bg-zinc-800"></div>
          <h1 className="text-sm font-semibold text-zinc-300 hidden sm:block">
            {isQOTD ? "Question of the Day" : "FMGE Mini Mock Test"}
          </h1>
        </div>

        <div className="flex items-center gap-6">
          <div className={`flex items-center gap-2 font-mono text-lg font-bold ${timeLeft < 300 ? 'text-red-500 animate-pulse' : 'text-zinc-100'}`}>
            <Clock className="w-5 h-5" />
            {formatTime(timeLeft)}
          </div>
          <button className="text-zinc-400 hover:text-zinc-200 transition p-2 bg-zinc-900 rounded-lg border border-zinc-800 hidden sm:flex">
            <Pause className="w-4 h-4" />
          </button>
          
          <button 
            onClick={() => {
              if(window.confirm('Are you sure you want to submit the test?')) {
                setIsSubmitted(true);
              }
            }}
            className="bg-orange-600 hover:bg-orange-500 text-white text-sm font-bold px-5 py-2 rounded-lg transition shadow-sm"
          >
            Submit Test
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col lg:flex-row max-w-[1600px] mx-auto w-full">
        
        {/* Left: Question Area */}
        <main className="flex-1 flex flex-col">
          <div className="flex-1 p-6 sm:p-10 max-w-4xl mx-auto w-full">
            
            {/* Question Meta */}
            <div className="flex items-center justify-between mb-8 pb-4 border-b border-zinc-800/50">
              <span className="text-sm font-bold text-zinc-400 uppercase tracking-wider">
                Question {currentQ + 1} of {mockQuestions.length}
              </span>
              <button 
                onClick={toggleBookmark}
                className={`flex items-center gap-1.5 text-sm font-semibold transition px-3 py-1.5 rounded-md ${
                  bookmarked.has(currentQ) ? 'text-orange-500 bg-orange-500/10' : 'text-zinc-500 hover:text-zinc-300 hover:bg-zinc-900'
                }`}
              >
                <Bookmark className={`w-4 h-4 ${bookmarked.has(currentQ) ? 'fill-orange-500' : ''}`} />
                {bookmarked.has(currentQ) ? 'Bookmarked' : 'Bookmark'}
              </button>
            </div>

            {/* Question Text */}
            <h2 className="text-lg sm:text-xl text-zinc-100 leading-relaxed font-medium mb-10">
              {question.text}
            </h2>

            {/* Options */}
            <div className="space-y-3">
            {question.options.map((opt: string, idx: number) => {
                const isSelected = selectedAnswers[currentQ] === idx;
                return (
                  <button
                    key={idx}
                    onClick={() => handleOptionSelect(idx)}
                    className={`w-full text-left p-5 rounded-xl border-2 transition-all flex items-start gap-4 ${
                      isSelected 
                        ? 'border-orange-500 bg-orange-500/5 shadow-[0_0_15px_rgba(249,115,22,0.1)]' 
                        : 'border-zinc-800/80 bg-[#141313] hover:border-zinc-600 hover:bg-[#181717]'
                    }`}
                  >
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                      isSelected ? 'border-orange-500 bg-orange-500 text-white' : 'border-zinc-600 text-transparent'
                    }`}>
                      <span className="text-xs font-bold">{String.fromCharCode(65 + idx)}</span>
                    </div>
                    <span className={`text-base leading-relaxed ${isSelected ? 'text-zinc-100 font-medium' : 'text-zinc-300'}`}>
                      {opt}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Bottom Navigation Bar */}
          <div className="h-20 bg-[#141313] border-t border-zinc-800/80 px-6 sm:px-10 flex items-center justify-between mt-auto">
            <button 
              onClick={() => setCurrentQ(prev => Math.max(0, prev - 1))}
              disabled={currentQ === 0}
              className="flex items-center gap-2 text-zinc-300 font-semibold px-4 py-2.5 bg-zinc-900 border border-zinc-800 rounded-lg hover:bg-zinc-800 transition disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="w-5 h-5" /> Previous
            </button>

            <button 
              onClick={toggleReview}
              className={`flex items-center gap-2 font-semibold px-4 py-2.5 rounded-lg border transition ${
                markedForReview.has(currentQ) 
                  ? 'bg-purple-500/10 text-purple-400 border-purple-500/30 hover:bg-purple-500/20' 
                  : 'bg-zinc-900 text-zinc-300 border-zinc-800 hover:bg-zinc-800'
              }`}
            >
              <Flag className={`w-4 h-4 ${markedForReview.has(currentQ) ? 'fill-purple-400' : ''}`} /> 
              <span className="hidden sm:inline">Mark for Review</span>
              <span className="sm:hidden">Review</span>
            </button>

            <button 
              onClick={() => setCurrentQ(prev => Math.min(mockQuestions.length - 1, prev + 1))}
              disabled={currentQ === mockQuestions.length - 1}
              className="flex items-center gap-2 text-zinc-100 font-semibold px-6 py-2.5 bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 rounded-lg transition disabled:opacity-30 disabled:cursor-not-allowed shadow-sm"
            >
              Next <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </main>

        {/* Right: Question Palette */}
        <aside className="w-full lg:w-80 bg-[#141313] border-l border-zinc-800/80 flex flex-col h-[300px] lg:h-[calc(100vh-4rem)]">
          <div className="p-4 border-b border-zinc-800/80 flex items-center gap-2 text-zinc-100 font-semibold">
            <LayoutGrid className="w-5 h-5 text-orange-500" /> Question Palette
          </div>
          
          <div className="p-4 flex-1 overflow-y-auto custom-scrollbar">
            <div className="grid grid-cols-5 gap-2">
              {mockQuestions.map((_, idx) => {
                const isAnswered = selectedAnswers[idx] !== undefined;
                const isReview = markedForReview.has(idx);
                const isCurrent = currentQ === idx;

                let btnClass = "border-zinc-800 bg-[#181717] text-zinc-400 hover:border-zinc-600";
                
                if (isAnswered && !isReview) btnClass = "border-emerald-500/50 bg-emerald-500/20 text-emerald-400";
                else if (isReview && !isAnswered) btnClass = "border-purple-500/50 bg-purple-500/20 text-purple-400";
                else if (isReview && isAnswered) btnClass = "border-purple-500 bg-purple-500 text-white";

                if (isCurrent) btnClass += " ring-2 ring-orange-500 ring-offset-2 ring-offset-[#141313]";

                return (
                  <button
                    key={idx}
                    onClick={() => setCurrentQ(idx)}
                    className={`h-10 rounded-md border text-sm font-bold flex items-center justify-center transition-all ${btnClass}`}
                  >
                    {idx + 1}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="p-4 border-t border-zinc-800/80 space-y-3 bg-[#0f0e0e]">
            <div className="flex items-center gap-3 text-xs text-zinc-400 font-medium">
              <div className="w-4 h-4 rounded bg-emerald-500/20 border border-emerald-500/50"></div> Answered
            </div>
            <div className="flex items-center gap-3 text-xs text-zinc-400 font-medium">
              <div className="w-4 h-4 rounded bg-[#181717] border border-zinc-800"></div> Unanswered
            </div>
            <div className="flex items-center gap-3 text-xs text-zinc-400 font-medium">
              <div className="w-4 h-4 rounded bg-purple-500/20 border border-purple-500/50"></div> Marked for Review
            </div>
            <div className="flex items-center gap-3 text-xs text-zinc-400 font-medium">
              <div className="w-4 h-4 rounded bg-purple-500 border border-purple-500"></div> Answered & Marked
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}