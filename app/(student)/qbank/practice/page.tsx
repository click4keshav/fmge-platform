'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { 
  ChevronLeft, 
  ChevronRight, 
  Bookmark, 
  CheckCircle2, 
  XCircle, 
  Lightbulb, 
  BookOpen, 
  ArrowLeft,
  Target
} from 'lucide-react';

// Base Mock Questions to loop from
const basePracticeQuestions = [
  {
    id: 1,
    text: "A 45-year-old male presents with acute severe pain in his right toe. Microscopic analysis of synovial fluid shows negatively birefringent needle-shaped crystals. What is the most likely diagnosis?",
    options: ["Pseudogout", "Gout", "Rheumatoid Arthritis", "Septic Arthritis"],
    correctOptionIndex: 1,
    explanation: "Gout is characterized by the deposition of monosodium urate crystals in joints. On polarized light microscopy, these crystals appear needle-shaped and are strongly negatively birefringent.",
    whyNotOthers: "Pseudogout features calcium pyrophosphate dihydrate (CPPD) crystals, which are rhomboid-shaped and weakly positively birefringent.",
    highYieldFact: "Needle-shaped + Negative birefringence = Gout. Rhomboid + Positive birefringence = Pseudogout."
  },
  {
    id: 2,
    text: "Which of the following beta-blockers also possesses alpha-1 receptor blocking activity, making it particularly useful in treating hypertensive emergencies?",
    options: ["Metoprolol", "Propranolol", "Labetalol", "Atenolol"],
    correctOptionIndex: 2,
    explanation: "Labetalol is a mixed alpha/beta adrenergic antagonist. The alpha-1 blockade causes vasodilation, decreasing vascular resistance.",
    whyNotOthers: "Metoprolol and Atenolol are selective beta-1 blockers without alpha-blocking properties.",
    highYieldFact: "Labetalol and Carvedilol are the two major beta-blockers with concurrent alpha-1 blocking activity."
  },
  {
    id: 3,
    text: "A patient presents with a 'cherry-red spot' on the macula and exhibits hyperacusis. Which enzyme is most likely deficient?",
    options: ["Hexosaminidase A", "Sphingomyelinase", "Glucocerebrosidase", "Alpha-galactosidase A"],
    correctOptionIndex: 0,
    explanation: "Tay-Sachs disease is an autosomal recessive lysosomal storage disorder caused by a deficiency of Hexosaminidase A.",
    whyNotOthers: "Sphingomyelinase deficiency causes Niemann-Pick disease, which features hepatosplenomegaly.",
    highYieldFact: "Cherry-red spot + NO hepatosplenomegaly = Tay-Sachs."
  }
];

export default function QBankPracticePage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  // Read subject and question count from URL query parameters (defaults to Pathology, 15 questions)
  const subjectParam = searchParams.get('subject') || 'pathology';
  const countParam = Number(searchParams.get('count')) || 15;
  
  const subjectName = subjectParam.charAt(0).toUpperCase() + subjectParam.slice(1);

  // Dynamically generate the requested number of questions by looping the base array
  const practiceQuestions = Array(Math.ceil(countParam / basePracticeQuestions.length))
    .fill(basePracticeQuestions)
    .flat()
    .slice(0, countParam)
    .map((q, idx) => ({ ...q, id: idx + 1, subject: subjectName }));

  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [bookmarked, setBookmarked] = useState<Set<number>>(new Set());
  const [isFinished, setIsFinished] = useState(false);

  const question = practiceQuestions[currentQ];
  const hasAnsweredCurrent = answers[currentQ] !== undefined;
  const isCorrect = hasAnsweredCurrent && answers[currentQ] === question.correctOptionIndex;

  const progressPercent = ((currentQ + 1) / practiceQuestions.length) * 100;
  const answeredCount = Object.keys(answers).length;

  const handleOptionSelect = (idx: number) => {
    if (hasAnsweredCurrent) return;
    setAnswers(prev => ({ ...prev, [currentQ]: idx }));
  };

  const toggleBookmark = () => {
    setBookmarked(prev => {
      const newSet = new Set(prev);
      if (newSet.has(currentQ)) newSet.delete(currentQ);
      else newSet.add(currentQ);
      return newSet;
    });
  };

  const handleNext = () => {
    if (currentQ < practiceQuestions.length - 1) {
      setCurrentQ(prev => prev + 1);
    } else {
      setIsFinished(true);
    }
  };

  if (isFinished) {
    let correct = 0;
    Object.entries(answers).forEach(([qIdx, optIdx]) => {
      if (practiceQuestions[Number(qIdx)].correctOptionIndex === optIdx) correct++;
    });

    return (
      <div className="min-h-screen bg-[#0f0e0e] text-zinc-100 flex items-center justify-center p-6">
        <div className="max-w-md w-full bg-[#141313] border border-zinc-800/80 rounded-3xl p-8 text-center shadow-2xl">
          <div className="w-16 h-16 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto mb-6 border border-emerald-500/20">
            <Target className="w-8 h-8 text-emerald-500" />
          </div>
          <h1 className="text-2xl font-bold mb-2">{subjectName} Practice Complete!</h1>
          <p className="text-zinc-400 mb-8">You finished a customized {practiceQuestions.length}-question practice block.</p>
          
          <div className="bg-[#181717] border border-zinc-800 rounded-2xl p-6 mb-8 flex justify-around">
            <div>
              <p className="text-xs text-zinc-500 font-bold uppercase tracking-wider mb-1">Accuracy</p>
              <p className="text-2xl font-bold text-zinc-100">{Math.round((correct / practiceQuestions.length) * 100)}%</p>
            </div>
            <div className="w-px bg-zinc-800"></div>
            <div>
              <p className="text-xs text-zinc-500 font-bold uppercase tracking-wider mb-1">Correct</p>
              <p className="text-2xl font-bold text-emerald-400">{correct}<span className="text-sm text-zinc-500">/{practiceQuestions.length}</span></p>
            </div>
          </div>

          <button 
            onClick={() => router.push('/qbank')}
            className="w-full py-3.5 bg-orange-600 hover:bg-orange-500 text-white font-bold rounded-xl transition shadow-sm"
          >
            Return to QBank Hub
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0f0e0e] text-zinc-100 flex flex-col font-sans selection:bg-orange-500/30">
      
      {/* Top Navbar */}
      <header className="h-16 bg-[#141313] border-b border-zinc-800/80 px-6 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-4">
          <button onClick={() => router.push('/qbank')} className="text-zinc-400 hover:text-zinc-100 transition flex items-center gap-1.5 text-sm font-bold bg-zinc-900 px-3 py-1.5 rounded-lg border border-zinc-800">
            <ArrowLeft className="w-4 h-4" /> Exit
          </button>
          <div className="h-4 w-px bg-zinc-800 hidden sm:block"></div>
          <h1 className="text-sm font-semibold text-zinc-300 hidden sm:block">
            {subjectName} Practice Block ({practiceQuestions.length} Qs)
          </h1>
        </div>

        <div className="flex items-center gap-4">
          <span className="text-xs font-bold uppercase tracking-wider text-orange-500 bg-orange-500/10 px-3 py-1.5 rounded-md border border-orange-500/20">
            Practice Mode
          </span>
        </div>
      </header>

      {/* Progress Bar */}
      <div className="w-full h-1.5 bg-zinc-900">
        <div 
          className="h-full bg-orange-500 transition-all duration-500 ease-out"
          style={{ width: `${progressPercent}%` }}
        ></div>
      </div>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto custom-scrollbar flex flex-col">
        <div className="flex-1 p-6 sm:p-10 max-w-4xl mx-auto w-full pb-32">
          
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-zinc-800/50">
            <div className="flex items-center gap-3">
              <span className="text-sm font-bold text-zinc-400 uppercase tracking-wider">
                Question {currentQ + 1} of {practiceQuestions.length}
              </span>
              <span className="text-[10px] font-bold uppercase tracking-wider text-orange-400 bg-orange-500/10 px-2 py-0.5 rounded border border-orange-500/20">
                {question.subject}
              </span>
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

          <h2 className="text-lg sm:text-xl text-zinc-100 leading-relaxed font-medium mb-10">
            {question.text}
          </h2>

          <div className="space-y-3 mb-10">
            {question.options.map((opt: string, idx: number) => {
              const isSelected = answers[currentQ] === idx;
              const isCorrectOption = idx === question.correctOptionIndex;
              
              let optionStyle = "border-zinc-800/80 bg-[#141313] hover:border-zinc-600 hover:bg-[#181717] cursor-pointer text-zinc-300";
              let icon = <span className="text-xs font-bold text-zinc-600 group-hover:text-zinc-400 transition-colors">{String.fromCharCode(65 + idx)}</span>;
              let ringStyle = "border-zinc-600";

              if (hasAnsweredCurrent) {
                optionStyle = "border-zinc-800/80 bg-[#141313] opacity-60 cursor-default text-zinc-400";
                if (isCorrectOption) {
                  optionStyle = "border-emerald-500/50 bg-emerald-500/10 text-emerald-100 shadow-[0_0_15px_rgba(16,185,129,0.05)] cursor-default";
                  icon = <CheckCircle2 className="w-5 h-5 text-emerald-500" />;
                  ringStyle = "border-transparent";
                } else if (isSelected && !isCorrectOption) {
                  optionStyle = "border-red-500/50 bg-red-500/10 text-red-200 cursor-default";
                  icon = <XCircle className="w-5 h-5 text-red-500" />;
                  ringStyle = "border-transparent";
                }
              } else if (isSelected) {
                optionStyle = "border-orange-500 bg-orange-500/5";
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleOptionSelect(idx)}
                  disabled={hasAnsweredCurrent}
                  className={`w-full text-left p-5 rounded-xl border-2 flex items-start gap-4 transition-all group ${optionStyle}`}
                >
                  <div className={`w-6 h-6 flex items-center justify-center shrink-0 mt-0.5 rounded-full border-2 ${ringStyle}`}>
                    {icon}
                  </div>
                  <span className="text-base leading-relaxed font-medium">
                    {opt}
                  </span>
                </button>
              );
            })}
          </div>

          {hasAnsweredCurrent && (
            <div className="bg-[#141313] border border-zinc-800/80 rounded-2xl overflow-hidden shadow-sm animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className={`px-6 py-4 flex items-center gap-2 border-b border-zinc-800/80 ${isCorrect ? 'bg-emerald-500/10' : 'bg-red-500/10'}`}>
                {isCorrect ? (
                  <><CheckCircle2 className="w-5 h-5 text-emerald-500" /> <h3 className="font-bold text-emerald-500">Correct! Well done.</h3></>
                ) : (
                  <><XCircle className="w-5 h-5 text-red-500" /> <h3 className="font-bold text-red-500">Incorrect. Review the explanation below.</h3></>
                )}
              </div>
              
              <div className="p-6 space-y-6 text-sm leading-relaxed text-zinc-300">
                <div>
                  <h4 className="font-bold text-zinc-100 mb-2 flex items-center gap-2"><BookOpen className="w-4 h-4 text-orange-500"/> Explanation</h4>
                  <p>{question.explanation}</p>
                </div>
                
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
          )}

        </div>
      </main>

      {/* Fixed Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 h-20 bg-[#141313] border-t border-zinc-800/80 px-6 sm:px-10 flex items-center justify-between z-40">
        <div className="max-w-4xl mx-auto w-full flex items-center justify-between">
          <button 
            onClick={() => setCurrentQ(prev => Math.max(0, prev - 1))}
            disabled={currentQ === 0}
            className="flex items-center gap-2 text-zinc-300 font-semibold px-4 py-2.5 bg-zinc-900 border border-zinc-800 rounded-lg hover:bg-zinc-800 transition disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="w-5 h-5" /> <span className="hidden sm:inline">Previous</span>
          </button>

          <span className="text-sm font-semibold text-zinc-500">
            {answeredCount} / {practiceQuestions.length} Answered
          </span>

          <button 
            onClick={handleNext}
            className={`flex items-center gap-2 font-bold px-6 py-2.5 rounded-lg transition shadow-sm ${
              hasAnsweredCurrent 
                ? 'bg-orange-600 hover:bg-orange-500 text-white animate-in pulse' 
                : 'bg-zinc-800 text-zinc-400 border border-zinc-700 hover:bg-zinc-700'
            }`}
          >
            {currentQ === practiceQuestions.length - 1 ? 'Finish Practice' : 'Next Question'} <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

    </div>
  );
}