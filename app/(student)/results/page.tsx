export const dynamic = "force-dynamic";
import { Target, Clock, Trophy, BarChart2, AlertCircle, CheckCircle2, XCircle, MinusCircle, Calendar, ChevronRight } from 'lucide-react';
import Link from 'next/link';

// Mock data for subject-level analytics
const subjectAnalytics = [
  { 
    name: "Pathology", 
    attempted: 340, correct: 275, incorrect: 50, skipped: 15, 
    accuracy: 81, status: "Strong Area", statusColor: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20"
  },
  { 
    name: "Pharmacology", 
    attempted: 280, correct: 190, incorrect: 70, skipped: 20, 
    accuracy: 68, status: "Improving", statusColor: "text-orange-400 bg-orange-500/10 border-orange-500/20"
  },
  { 
    name: "General Medicine", 
    attempted: 450, correct: 310, incorrect: 110, skipped: 30, 
    accuracy: 69, status: "Improving", statusColor: "text-orange-400 bg-orange-500/10 border-orange-500/20"
  },
  { 
    name: "Anatomy", 
    attempted: 150, correct: 65, incorrect: 75, skipped: 10, 
    accuracy: 43, status: "Weak Area", statusColor: "text-red-400 bg-red-500/10 border-red-500/20"
  },
  { 
    name: "Surgery", 
    attempted: 220, correct: 120, incorrect: 80, skipped: 20, 
    accuracy: 54, status: "Needs Work", statusColor: "text-red-400 bg-red-500/10 border-red-500/20"
  }
];

// Mock data for individual test results
const testAnalytics = [
  {
    id: "gt-1",
    title: "FMGE Grand Multi-Specialty Mock 2026",
    date: "Nov 2, 2026",
    score: 246, total: 300, accuracy: 82, percentile: 94,
    status: "Passed", statusColor: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20"
  },
  {
    id: "mini-1",
    title: "FMGE Pharmacology Mini Mock - ANS",
    date: "Oct 28, 2026",
    score: 35, total: 50, accuracy: 70, percentile: 78,
    status: "Average", statusColor: "text-orange-400 bg-orange-500/10 border-orange-500/20"
  },
  {
    id: "pyq-1",
    title: "Anatomy Image-Based PYQ Test",
    date: "Oct 15, 2026",
    score: 45, total: 100, accuracy: 45, percentile: 32,
    status: "Failed", statusColor: "text-red-400 bg-red-500/10 border-red-500/20"
  }
];

export default function ResultsAnalyticsPage() {
  return (
    <div className="max-w-6xl mx-auto space-y-10 pb-12">
      
      {/* Page Header */}
      <div className="border-b border-zinc-800/80 pb-6">
        <h1 className="text-2xl font-bold tracking-tight text-zinc-100 flex items-center gap-2">
          <BarChart2 className="w-6 h-6 text-orange-500" />
          Performance Analytics
        </h1>
        <p className="text-sm text-zinc-400 mt-1">
          Comprehensive breakdown of your test results, accuracy, and subject-wise insights.
        </p>
      </div>

      {/* Global Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-[#141313] border border-zinc-800/80 rounded-2xl p-6 shadow-sm flex flex-col justify-center min-h-[130px]">
          <div className="flex items-center gap-2 mb-2 text-zinc-400">
            <Target className="w-4 h-4 text-emerald-500" />
            <p className="text-xs font-medium">Global Accuracy</p>
          </div>
          <p className="text-3xl font-bold text-zinc-100">68<span className="text-lg text-zinc-500">%</span></p>
        </div>

        <div className="bg-[#141313] border border-zinc-800/80 rounded-2xl p-6 shadow-sm flex flex-col justify-center min-h-[130px]">
          <div className="flex items-center gap-2 mb-2 text-zinc-400">
            <CheckCircle2 className="w-4 h-4 text-orange-500" />
            <p className="text-xs font-medium">Questions Attempted</p>
          </div>
          <p className="text-3xl font-bold text-zinc-100">1,440</p>
        </div>

        <div className="bg-[#141313] border border-zinc-800/80 rounded-2xl p-6 shadow-sm flex flex-col justify-center min-h-[130px]">
          <div className="flex items-center gap-2 mb-2 text-zinc-400">
            <Trophy className="w-4 h-4 text-yellow-500" />
            <p className="text-xs font-medium">Est. Percentile</p>
          </div>
          <p className="text-3xl font-bold text-zinc-100">72<span className="text-lg text-zinc-500">nd</span></p>
        </div>

        <div className="bg-[#141313] border border-zinc-800/80 rounded-2xl p-6 shadow-sm flex flex-col justify-center min-h-[130px]">
          <div className="flex items-center gap-2 mb-2 text-zinc-400">
            <Clock className="w-4 h-4 text-blue-500" />
            <p className="text-xs font-medium">Avg Time / Question</p>
          </div>
          <p className="text-3xl font-bold text-zinc-100">42<span className="text-lg text-zinc-500">s</span></p>
        </div>
      </div>

      {/* Test-wise Results Tiles */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-zinc-100">Recent Test Performances</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {testAnalytics.map((test) => (
            <div key={test.id} className="bg-[#141313] border border-zinc-800/80 rounded-2xl p-6 flex flex-col justify-between hover:border-zinc-700 transition shadow-sm group">
              <div>
                <div className="flex justify-between items-start mb-4">
                  <span className="text-xs text-zinc-400 font-mono flex items-center gap-1.5 bg-zinc-900 px-2.5 py-1 rounded border border-zinc-800">
                    <Calendar className="w-3.5 h-3.5" /> {test.date}
                  </span>
                  <span className={`text-[10px] uppercase tracking-wider px-2.5 py-1 rounded font-bold border ${test.statusColor}`}>
                    {test.status}
                  </span>
                </div>
                
                <h3 className="text-base font-bold text-zinc-100 mb-4 line-clamp-2 min-h-[48px]">{test.title}</h3>
                
                <div className="flex items-end gap-2 mb-5">
                  <span className="text-4xl font-bold text-orange-500">{test.score}</span>
                  <span className="text-sm font-medium text-zinc-500 mb-1">/ {test.total}</span>
                </div>

                <div className="grid grid-cols-2 gap-3 mb-6">
                  <div className="bg-zinc-900/50 p-3 rounded-xl border border-zinc-800/50">
                    <p className="text-[10px] text-zinc-500 uppercase font-semibold mb-1">Accuracy</p>
                    <p className="text-sm font-bold text-zinc-200">{test.accuracy}%</p>
                  </div>
                  <div className="bg-zinc-900/50 p-3 rounded-xl border border-zinc-800/50">
                    <p className="text-[10px] text-zinc-500 uppercase font-semibold mb-1">Percentile</p>
                    <p className="text-sm font-bold text-zinc-200">{test.percentile} PR</p>
                  </div>
                </div>
              </div>

              <Link href={`/results/${test.id}`} className="w-full bg-zinc-800 hover:bg-zinc-700 text-zinc-100 text-xs font-bold py-3 rounded-xl transition text-center shadow-sm flex items-center justify-center gap-2">
                View Full Report <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Deep-Dive Subject Insights */}
      <section className="bg-[#141313] border border-zinc-800/80 rounded-2xl p-6 md:p-8 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
          <div>
            <h2 className="text-lg font-semibold text-zinc-100">Subject-wise Breakdown</h2>
            <p className="text-sm text-zinc-400">Granular insights identifying your strong subjects and target weak areas.</p>
          </div>
          <div className="bg-zinc-900/50 border border-zinc-800 px-4 py-2 rounded-xl flex items-center gap-4 text-xs font-medium text-zinc-300">
             <span className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-500"/> Correct</span>
             <span className="flex items-center gap-1.5"><XCircle className="w-3.5 h-3.5 text-red-500"/> Incorrect</span>
             <span className="flex items-center gap-1.5"><MinusCircle className="w-3.5 h-3.5 text-zinc-500"/> Skipped</span>
          </div>
        </div>

        <div className="space-y-6">
          {subjectAnalytics.map((subject, index) => (
            <div key={index} className="bg-[#181717] border border-zinc-800/60 p-5 rounded-xl flex flex-col lg:flex-row lg:items-center gap-6">
              
              {/* Subject Info & Badge */}
              <div className="lg:w-1/4">
                <h3 className="font-bold text-zinc-100 text-base mb-2">{subject.name}</h3>
                <span className={`text-[10px] uppercase tracking-wider px-2.5 py-1 rounded font-bold border ${subject.statusColor} flex items-center gap-1.5 w-max`}>
                  {subject.status === 'Weak Area' && <AlertCircle className="w-3 h-3" />}
                  {subject.status}
                </span>
              </div>

              {/* Progress Bar & Percentage */}
              <div className="lg:w-2/4">
                <div className="flex justify-between text-xs font-medium mb-2">
                  <span className="text-zinc-400">Accuracy</span>
                  <span className={subject.accuracy >= 70 ? 'text-emerald-400' : subject.accuracy < 50 ? 'text-red-400' : 'text-orange-400'}>
                    {subject.accuracy}%
                  </span>
                </div>
                <div className="h-2 w-full bg-zinc-900 rounded-full overflow-hidden flex">
                  <div style={{ width: `${(subject.correct / subject.attempted) * 100}%` }} className="h-full bg-emerald-500"></div>
                  <div style={{ width: `${(subject.incorrect / subject.attempted) * 100}%` }} className="h-full bg-red-500"></div>
                  <div style={{ width: `${(subject.skipped / subject.attempted) * 100}%` }} className="h-full bg-zinc-600"></div>
                </div>
              </div>

              {/* Exact Stats Split */}
              <div className="lg:w-1/4 flex items-center justify-between lg:justify-end gap-6 text-sm font-mono bg-zinc-900/40 p-3 rounded-lg border border-zinc-800/50">
                <div className="flex flex-col items-center">
                  <span className="text-emerald-400 font-bold">{subject.correct}</span>
                </div>
                <div className="w-px h-6 bg-zinc-800"></div>
                <div className="flex flex-col items-center">
                  <span className="text-red-400 font-bold">{subject.incorrect}</span>
                </div>
                <div className="w-px h-6 bg-zinc-800"></div>
                <div className="flex flex-col items-center">
                  <span className="text-zinc-500 font-bold">{subject.skipped}</span>
                </div>
              </div>

            </div>
          ))}
        </div>
      </section>

    </div>
  );
}