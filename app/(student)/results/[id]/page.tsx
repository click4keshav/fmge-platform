'use client';

import { useParams, useRouter } from 'next/navigation';
import { 
  ArrowLeft, BookOpen, Trophy, Target, Clock, 
  TrendingUp, BarChart3, CheckCircle2, XCircle, MinusCircle, ShieldAlert
} from 'lucide-react';
import Link from 'next/link';

// Mock Analytics Data for this specific test
const reportData = {
  id: "qotd",
  title: "FMGE Grand Multi-Specialty Mock 2",
  date: "Nov 5, 2026",
  score: 184,
  totalMarks: 300,
  rank: 1245,
  totalParticipants: 15000,
  percentile: 91.7,
  accuracy: 65.2,
  
  // Breakdown
  correctQs: 184,
  incorrectQs: 98,
  skippedQs: 18,
  
  // Comparison
  topperScore: 242,
  averageScore: 145,
  
  // Speed Metrics
  avgTimeCorrect: "42s",
  avgTimeIncorrect: "68s", // Shows they guess/struggle longer on wrong answers
  totalTimeTaken: "165 mins",
  
  // Subject Wise
  subjects: [
    { name: "Pathology", total: 30, correct: 22, incorrect: 5, skipped: 3 },
    { name: "Pharmacology", total: 25, correct: 15, incorrect: 8, skipped: 2 },
    { name: "Medicine", total: 40, correct: 20, incorrect: 15, skipped: 5 },
    { name: "Surgery", total: 35, correct: 25, incorrect: 10, skipped: 0 },
    { name: "OBGYN", total: 30, correct: 24, incorrect: 4, skipped: 2 },
  ]
};

export default function TestAnalyticsPage() {
  const router = useRouter();
  const params = useParams();
  const testId = params.id as string;

  // Helpers for CSS charts
  const calcPercent = (val: number, max: number) => `${Math.round((val / max) * 100)}%`;

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-12 pt-2">
      
      {/* 1. Header & Direct Review CTA */}
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 border-b border-zinc-800/80 pb-6">
        <div>
          <button 
            onClick={() => router.back()}
            className="text-zinc-500 hover:text-zinc-300 transition text-sm font-semibold flex items-center gap-1.5 mb-4"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Results
          </button>
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-2xl font-bold tracking-tight text-zinc-100">{reportData.title}</h1>
            <span className="bg-orange-500/10 text-orange-500 border border-orange-500/20 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded">
              Completed
            </span>
          </div>
          <p className="text-sm text-zinc-400">Attempted on {reportData.date} • {reportData.totalParticipants.toLocaleString()} Participants</p>
        </div>
        
        {/* Prominent CTA to Phase 9 Review Engine */}
        <Link 
          href={`/test/review/${testId}`} 
          className="shrink-0 bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-bold px-6 py-3 rounded-xl transition flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(16,185,129,0.15)] w-full md:w-auto"
        >
          <BookOpen className="w-4 h-4" /> Review Solutions
        </Link>
      </div>

      {/* 2. Top-Level Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Score */}
        <div className="bg-[#141313] border border-zinc-800/80 p-6 rounded-2xl shadow-sm relative overflow-hidden">
          <Trophy className="absolute -right-4 -bottom-4 w-24 h-24 text-orange-500/5 rotate-12" />
          <p className="text-xs text-zinc-500 font-bold uppercase tracking-wider mb-2">Total Score</p>
          <div className="flex items-baseline gap-1">
            <h2 className="text-3xl font-bold text-zinc-100">{reportData.score}</h2>
            <span className="text-sm text-zinc-500">/{reportData.totalMarks}</span>
          </div>
        </div>

        {/* Rank */}
        <div className="bg-[#141313] border border-zinc-800/80 p-6 rounded-2xl shadow-sm relative overflow-hidden">
          <TrendingUp className="absolute -right-4 -bottom-4 w-24 h-24 text-emerald-500/5 rotate-12" />
          <p className="text-xs text-zinc-500 font-bold uppercase tracking-wider mb-2">Global Rank</p>
          <div className="flex items-baseline gap-1">
            <h2 className="text-3xl font-bold text-emerald-400">#{reportData.rank.toLocaleString()}</h2>
          </div>
        </div>

        {/* Percentile */}
        <div className="bg-[#141313] border border-zinc-800/80 p-6 rounded-2xl shadow-sm relative overflow-hidden">
          <BarChart3 className="absolute -right-4 -bottom-4 w-24 h-24 text-purple-500/5 rotate-12" />
          <p className="text-xs text-zinc-500 font-bold uppercase tracking-wider mb-2">Percentile</p>
          <div className="flex items-baseline gap-1">
            <h2 className="text-3xl font-bold text-purple-400">{reportData.percentile}</h2>
            <span className="text-sm text-purple-400/50">%ile</span>
          </div>
        </div>

        {/* Accuracy */}
        <div className="bg-[#141313] border border-zinc-800/80 p-6 rounded-2xl shadow-sm relative overflow-hidden">
          <Target className="absolute -right-4 -bottom-4 w-24 h-24 text-blue-500/5 rotate-12" />
          <p className="text-xs text-zinc-500 font-bold uppercase tracking-wider mb-2">Net Accuracy</p>
          <div className="flex items-baseline gap-1">
            <h2 className="text-3xl font-bold text-blue-400">{reportData.accuracy}%</h2>
          </div>
        </div>
      </div>

      {/* 3. Peer Comparison & Speed Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Comparison Chart */}
        <div className="bg-[#141313] border border-zinc-800/80 p-6 sm:p-8 rounded-2xl shadow-sm flex flex-col justify-center">
          <h3 className="text-base font-bold text-zinc-100 mb-6 flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-orange-500" /> Peer Comparison
          </h3>
          
          <div className="space-y-6">
            {/* Topper */}
            <div>
              <div className="flex justify-between text-xs font-semibold mb-2">
                <span className="text-zinc-400">Topper Score</span>
                <span className="text-zinc-200">{reportData.topperScore}</span>
              </div>
              <div className="h-3 w-full bg-zinc-900 rounded-full overflow-hidden">
                <div style={{ width: calcPercent(reportData.topperScore, reportData.totalMarks) }} className="h-full bg-zinc-600 rounded-full"></div>
              </div>
            </div>

            {/* You */}
            <div>
              <div className="flex justify-between text-xs font-semibold mb-2">
                <span className="text-orange-400">Your Score</span>
                <span className="text-orange-400">{reportData.score}</span>
              </div>
              <div className="h-3 w-full bg-zinc-900 rounded-full overflow-hidden shadow-[0_0_10px_rgba(249,115,22,0.1)]">
                <div style={{ width: calcPercent(reportData.score, reportData.totalMarks) }} className="h-full bg-orange-500 rounded-full"></div>
              </div>
            </div>

            {/* Average */}
            <div>
              <div className="flex justify-between text-xs font-semibold mb-2">
                <span className="text-zinc-400">Average Score</span>
                <span className="text-zinc-200">{reportData.averageScore}</span>
              </div>
              <div className="h-3 w-full bg-zinc-900 rounded-full overflow-hidden">
                <div style={{ width: calcPercent(reportData.averageScore, reportData.totalMarks) }} className="h-full bg-zinc-700 rounded-full"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Speed vs Accuracy Quadrant/Metrics */}
        <div className="bg-[#141313] border border-zinc-800/80 p-6 sm:p-8 rounded-2xl shadow-sm">
          <h3 className="text-base font-bold text-zinc-100 mb-6 flex items-center gap-2">
            <Clock className="w-5 h-5 text-orange-500" /> Time Management
          </h3>

          <div className="grid grid-cols-2 gap-4 h-[calc(100%-3rem)]">
            <div className="bg-[#181717] border border-zinc-800 p-5 rounded-xl flex flex-col justify-center">
              <span className="text-xs text-zinc-500 font-bold uppercase tracking-wider mb-1">Time per Correct</span>
              <span className="text-2xl font-bold text-emerald-400">{reportData.avgTimeCorrect}</span>
              <p className="text-[10px] text-zinc-500 mt-2">Optimal range: &lt; 50s</p>
            </div>
            
            <div className="bg-[#181717] border border-zinc-800 p-5 rounded-xl flex flex-col justify-center">
              <span className="text-xs text-zinc-500 font-bold uppercase tracking-wider mb-1">Time per Incorrect</span>
              <span className="text-2xl font-bold text-red-400">{reportData.avgTimeIncorrect}</span>
              <p className="text-[10px] text-red-400/70 mt-2 flex items-center gap-1">
                <ShieldAlert className="w-3 h-3" /> Potential overthinking
              </p>
            </div>

            <div className="bg-[#181717] border border-zinc-800 p-5 rounded-xl flex flex-col justify-center col-span-2">
              <span className="text-xs text-zinc-500 font-bold uppercase tracking-wider mb-1">Total Time Spent</span>
              <div className="flex items-end gap-2">
                <span className="text-2xl font-bold text-zinc-200">{reportData.totalTimeTaken}</span>
                <span className="text-sm text-zinc-500 mb-0.5">/ 180 mins limit</span>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* 4. Subject-wise Breakdown Table/Bars */}
      <div className="bg-[#141313] border border-zinc-800/80 rounded-2xl shadow-sm overflow-hidden">
        <div className="px-6 sm:px-8 py-5 border-b border-zinc-800/80 flex items-center justify-between">
          <h3 className="text-base font-bold text-zinc-100 flex items-center gap-2">
            <Target className="w-5 h-5 text-orange-500" /> Subject-Wise Accuracy
          </h3>
          <div className="hidden sm:flex items-center gap-4 text-xs font-medium">
            <div className="flex items-center gap-1.5 text-zinc-400"><div className="w-2 h-2 rounded-full bg-emerald-500"></div> Correct</div>
            <div className="flex items-center gap-1.5 text-zinc-400"><div className="w-2 h-2 rounded-full bg-red-500"></div> Incorrect</div>
            <div className="flex items-center gap-1.5 text-zinc-400"><div className="w-2 h-2 rounded-full bg-zinc-600"></div> Skipped</div>
          </div>
        </div>

        <div className="divide-y divide-zinc-800/50">
          {reportData.subjects.map((sub, idx) => {
            const correctPct = (sub.correct / sub.total) * 100;
            const incorrectPct = (sub.incorrect / sub.total) * 100;
            const skippedPct = (sub.skipped / sub.total) * 100;

            return (
              <div key={idx} className="p-6 sm:p-8 hover:bg-[#181717]/50 transition-colors">
                <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-8 mb-3">
                  <div className="w-48 shrink-0">
                    <h4 className="text-sm font-bold text-zinc-200">{sub.name}</h4>
                    <p className="text-xs text-zinc-500 mt-0.5">{sub.total} Questions</p>
                  </div>
                  
                  {/* Visual Progress Bar */}
                  <div className="flex-1 flex h-2.5 rounded-full overflow-hidden bg-zinc-900">
                    <div style={{ width: `${correctPct}%` }} className="bg-emerald-500 transition-all"></div>
                    <div style={{ width: `${incorrectPct}%` }} className="bg-red-500 transition-all"></div>
                    <div style={{ width: `${skippedPct}%` }} className="bg-zinc-600 transition-all"></div>
                  </div>
                  
                  {/* Mobile Legend (Hidden on desktop) */}
                  <div className="flex sm:hidden items-center gap-3 text-[10px] font-medium mt-1">
                    <div className="flex items-center gap-1 text-emerald-400"><CheckCircle2 className="w-3 h-3"/> {sub.correct}</div>
                    <div className="flex items-center gap-1 text-red-400"><XCircle className="w-3 h-3"/> {sub.incorrect}</div>
                    <div className="flex items-center gap-1 text-zinc-500"><MinusCircle className="w-3 h-3"/> {sub.skipped}</div>
                  </div>
                </div>

                {/* Stats Row */}
                <div className="hidden sm:flex ml-56 items-center gap-8 text-xs font-semibold">
                  <span className="text-emerald-400 w-16">{sub.correct} Correct</span>
                  <span className="text-red-400 w-16">{sub.incorrect} Wrong</span>
                  <span className="text-zinc-500 w-16">{sub.skipped} Skipped</span>
                  <span className="text-zinc-300 ml-auto border border-zinc-700 bg-zinc-800 px-2 py-1 rounded">
                    {Math.round(correctPct)}% Acc
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
}