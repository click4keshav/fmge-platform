'use client';

import { useState } from 'react';
import { ChevronLeft, ChevronRight, Bookmark, LayoutGrid, CheckCircle2, XCircle, ArrowLeft, Lightbulb, BookOpen, AlertCircle } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

// Mock Data for the Review Engine
const reviewQuestions = [
  {
    id: 1,
    text: "A 45-year-old male presents with acute severe pain in his right toe. Microscopic analysis of synovial fluid shows negatively birefringent needle-shaped crystals. What is the most likely diagnosis?",
    options: ["Pseudogout", "Gout", "Rheumatoid Arthritis", "Septic Arthritis"],
    correctOptionIndex: 1,
    userSelectedOptionIndex: 1, // Student got this CORRECT
    status: 'correct',
    explanation: "Gout is characterized by the deposition of monosodium urate crystals in joints. On polarized light microscopy, these crystals appear needle-shaped and are strongly negatively birefringent (yellow when parallel to the compensator axis, blue when perpendicular).",
    whyNotOthers: "Pseudogout features calcium pyrophosphate dihydrate (CPPD) crystals, which are rhomboid-shaped and weakly positively birefringent. Septic arthritis would show a high WBC count (>50,000) and organisms on Gram stain, without these specific crystals.",
    highYieldFact: "Needle-shaped + Negative birefringence = Gout. Rhomboid + Positive birefringence = Pseudogout."
  },
  {
    id: 2,
    text: "Which of the following beta-blockers also possesses alpha-1 receptor blocking activity, making it particularly useful in treating hypertensive emergencies?",
    options: ["Metoprolol", "Propranolol", "Labetalol", "Atenolol"],
    correctOptionIndex: 2,
    userSelectedOptionIndex: 0, // Student got this WRONG
    status: 'incorrect',
    explanation: "Labetalol is a mixed alpha/beta adrenergic antagonist. The alpha-1 blockade causes vasodilation, decreasing vascular resistance, while the beta blockade prevents the reflex tachycardia normally triggered by vasodilation. This makes it highly effective for rapidly lowering blood pressure in emergencies.",
    whyNotOthers: "Metoprolol and Atenolol are selective beta-1 blockers. Propranolol is a non-selective beta blocker without any alpha-blocking properties.",
    highYieldFact: "Labetalol and Carvedilol are the two major beta-blockers with concurrent alpha-1 blocking activity."
  },
  {
    id: 3,
    text: "A patient presents with a 'cherry-red spot' on the macula and exhibits hyperacusis. Which enzyme is most likely deficient?",
    options: ["Hexosaminidase A", "Sphingomyelinase", "Glucocerebrosidase", "Alpha-galactosidase A"],
    correctOptionIndex: 0,
    userSelectedOptionIndex: null, // Student SKIPPED this
    status: 'skipped',
    explanation: "Tay-Sachs disease is an autosomal recessive lysosomal storage disorder caused by a deficiency of Hexosaminidase A. This leads to the accumulation of GM2 ganglioside. Classic signs include progressive neurodegeneration, a 'cherry-red' spot on the macula, and an exaggerated startle response to loud noises (hyperacusis).",
    whyNotOthers: "Sphingomyelinase deficiency causes Niemann-Pick disease, which also has a cherry-red spot but typically presents with hepatosplenomegaly (absent in Tay-Sachs). Glucocerebrosidase deficiency causes Gaucher disease (bone crises, hepatosplenomegaly, no cherry-red spot).",
    highYieldFact: "Cherry-red spot + NO hepatosplenomegaly = Tay-Sachs (Hexosaminidase A). Cherry-red spot + Hepatosplenomegaly = Niemann-Pick (Sphingomyelinase)."
  }
];

export default function TestReviewPage() {
  const router = useRouter();
  const [currentQ, setCurrentQ] = useState(0);
  const [bookmarked, setBookmarked] = useState<Set<number>>(new Set());

  const toggleBookmark = () => {
    setBookmarked(prev => {
      const newSet = new Set(prev);
      if (newSet.has(currentQ)) newSet.delete(currentQ);
      else newSet.add(currentQ);
      return newSet;
    });
  };

  const question = reviewQuestions[currentQ];

  return (
    <div className="min-h-screen bg-[#0f0e0e] text-zinc-100 flex flex-col font-sans selection:bg-orange-500/30">
      
      {/* Top Navbar */}
      <header className="h-16 bg-[#141313] border-b border-zinc-800/80 px-6 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => router.push('/results')}
            className="flex items-center gap-2 text-sm font-bold text-zinc-400 hover:text-zinc-100 transition bg-zinc-900 px-4 py-2 rounded-lg border border-zinc-800"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Results
          </button>
          <div className="h-4 w-px bg-zinc-800 hidden sm:block"></div>
          <h1 className="text-sm font-semibold text-zinc-300 hidden sm:block">Review Mode: FMGE Mini Mock</h1>
        </div>

        <div className="flex items-center gap-4">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-500 bg-emerald-500/10 px-3 py-1.5 rounded-md border border-emerald-500/20">
            Study Mode Active
          </span>
        </div>
      </header>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col lg:flex-row max-w-[1600px] mx-auto w-full">
        
        {/* Left: Question & Explanation Area */}
        <main className="flex-1 flex flex-col h-[calc(100vh-4rem)] overflow-y-auto custom-scrollbar">
          <div className="flex-1 p-6 sm:p-10 max-w-4xl mx-auto w-full">
            
            {/* Question Meta */}
            <div className="flex items-center justify-between mb-8 pb-4 border-b border-zinc-800/50">
              <div className="flex items-center gap-4">
                <span className="text-sm font-bold text-zinc-400 uppercase tracking-wider">
                  Question {currentQ + 1} of {reviewQuestions.length}
                </span>
                {question.status === 'correct' && (
                  <span className="text-[10px] font-bold uppercase text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded flex items-center gap-1 border border-emerald-500/20">
                    <CheckCircle2 className="w-3 h-3" /> You got this right
                  </span>
                )}
                {question.status === 'incorrect' && (
                  <span className="text-[10px] font-bold uppercase text-red-400 bg-red-500/10 px-2 py-0.5 rounded flex items-center gap-1 border border-red-500/20">
                    <XCircle className="w-3 h-3" /> You got this wrong
                  </span>
                )}
                {question.status === 'skipped' && (
                  <span className="text-[10px] font-bold uppercase text-zinc-400 bg-zinc-800 px-2 py-0.5 rounded flex items-center gap-1 border border-zinc-700">
                    <AlertCircle className="w-3 h-3" /> Skipped
                  </span>
                )}
              </div>
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

            {/* Options (Read-Only Review Mode) */}
            <div className="space-y-3 mb-10">
              {question.options.map((opt, idx) => {
                const isCorrectOption = idx === question.correctOptionIndex;
                const isUserWrongChoice = idx === question.userSelectedOptionIndex && !isCorrectOption;

                let optionStyle = "border-zinc-800/80 bg-[#141313] text-zinc-400 opacity-60"; // Default (not chosen, not correct)
                let icon = <span className="text-xs font-bold text-zinc-600">{String.fromCharCode(65 + idx)}</span>;

                if (isCorrectOption) {
                  optionStyle = "border-emerald-500/50 bg-emerald-500/10 text-emerald-100 shadow-[0_0_15px_rgba(16,185,129,0.05)]";
                  icon = <CheckCircle2 className="w-5 h-5 text-emerald-500" />;
                } else if (isUserWrongChoice) {
                  optionStyle = "border-red-500/50 bg-red-500/10 text-red-200";
                  icon = <XCircle className="w-5 h-5 text-red-500" />;
                }

                return (
                  <div key={idx} className={`w-full text-left p-5 rounded-xl border-2 flex items-start gap-4 transition-all ${optionStyle}`}>
                    <div className="w-6 h-6 flex items-center justify-center shrink-0 mt-0.5">
                      {icon}
                    </div>
                    <span className="text-base leading-relaxed font-medium">
                      {opt}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Explanations Panel */}
            <div className="bg-[#141313] border border-zinc-800/80 rounded-2xl overflow-hidden shadow-sm">
              <div className="bg-[#181717] border-b border-zinc-800/80 px-6 py-4 flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-orange-500" />
                <h3 className="font-bold text-zinc-100">Detailed Explanation</h3>
              </div>
              
              <div className="p-6 space-y-6 text-sm leading-relaxed text-zinc-300">
                <p>{question.explanation}</p>
                
                <div>
                  <h4 className="font-bold text-zinc-100 mb-2 text-xs uppercase tracking-wider">Why not the other options?</h4>
                  <p className="text-zinc-400">{question.whyNotOthers}</p>
                </div>

                <div className="bg-orange-500/5 border border-orange-500/20 p-5 rounded-xl flex items-start gap-4">
                  <Lightbulb className="w-6 h-6 text-orange-400 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-orange-400 mb-1">High-Yield Fact</h4>
                    <p className="text-orange-200/80">{question.highYieldFact}</p>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Bottom Navigation Bar */}
          <div className="h-20 bg-[#141313] border-t border-zinc-800/80 px-6 sm:px-10 flex items-center justify-between mt-auto shrink-0">
            <button 
              onClick={() => setCurrentQ(prev => Math.max(0, prev - 1))}
              disabled={currentQ === 0}
              className="flex items-center gap-2 text-zinc-300 font-semibold px-4 py-2.5 bg-zinc-900 border border-zinc-800 rounded-lg hover:bg-zinc-800 transition disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="w-5 h-5" /> Previous
            </button>

            <button 
              onClick={() => setCurrentQ(prev => Math.min(reviewQuestions.length - 1, prev + 1))}
              disabled={currentQ === reviewQuestions.length - 1}
              className="flex items-center gap-2 text-zinc-100 font-semibold px-6 py-2.5 bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 rounded-lg transition disabled:opacity-30 disabled:cursor-not-allowed shadow-sm"
            >
              Next <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </main>

        {/* Right: Question Review Palette */}
        <aside className="w-full lg:w-80 bg-[#141313] border-l border-zinc-800/80 flex flex-col h-[300px] lg:h-[calc(100vh-4rem)]">
          <div className="p-4 border-b border-zinc-800/80 flex items-center gap-2 text-zinc-100 font-semibold">
            <LayoutGrid className="w-5 h-5 text-orange-500" /> Review Palette
          </div>
          
          <div className="p-4 flex-1 overflow-y-auto">
            <div className="grid grid-cols-5 gap-2">
              {reviewQuestions.map((q, idx) => {
                const isCurrent = currentQ === idx;

                let btnClass = "border-zinc-800 bg-[#181717] text-zinc-400"; // Default
                
                if (q.status === 'correct') btnClass = "border-emerald-500/50 bg-emerald-500/20 text-emerald-400";
                else if (q.status === 'incorrect') btnClass = "border-red-500/50 bg-red-500/20 text-red-400";
                else if (q.status === 'skipped') btnClass = "border-zinc-600 bg-zinc-800 text-zinc-300";

                if (isCurrent) btnClass += " ring-2 ring-orange-500 ring-offset-2 ring-offset-[#141313]";

                return (
                  <button
                    key={idx}
                    onClick={() => setCurrentQ(idx)}
                    className={`h-10 rounded-md border text-sm font-bold flex items-center justify-center transition-all ${btnClass} hover:opacity-80`}
                  >
                    {idx + 1}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="p-4 border-t border-zinc-800/80 space-y-3 bg-[#0f0e0e]">
            <div className="flex items-center gap-3 text-xs text-zinc-400 font-medium">
              <div className="w-4 h-4 rounded bg-emerald-500/20 border border-emerald-500/50 flex items-center justify-center"><CheckCircle2 className="w-3 h-3 text-emerald-500" /></div> Correct
            </div>
            <div className="flex items-center gap-3 text-xs text-zinc-400 font-medium">
              <div className="w-4 h-4 rounded bg-red-500/20 border border-red-500/50 flex items-center justify-center"><XCircle className="w-3 h-3 text-red-500" /></div> Incorrect
            </div>
            <div className="flex items-center gap-3 text-xs text-zinc-400 font-medium">
              <div className="w-4 h-4 rounded bg-zinc-800 border border-zinc-600"></div> Skipped
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}