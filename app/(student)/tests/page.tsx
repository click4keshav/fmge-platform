import { getDashboardData } from "../../actions/dashboard";
import Link from 'next/link';
import { PlayCircle, Clock, FileText, CheckCircle2, Calendar, Lock } from 'lucide-react';

export default async function TestsHubPage() {
  // Fetch tests from your database
  const { tests } = await getDashboardData();

  // Categorize tests based on their kind
  const grandTests = tests.filter((t: { kind: string }) => t.kind === 'GRAND');
  const subjectTests = tests.filter((t: { kind: string }) => t.kind !== 'GRAND');

  return (
    <div className="max-w-7xl mx-auto space-y-10 pb-12">
      
      {/* Page Header & Status Overview */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-zinc-800/80 pb-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-zinc-100">Test Series Hub</h1>
          <p className="text-sm text-zinc-400 mt-1">
            Access your Grand Tests, Unit Tests, and PYQ-based mock exams.
          </p>
        </div>
        <div className="flex items-center gap-3 overflow-x-auto pb-2 md:pb-0">
          <div className="bg-[#141313] border border-zinc-800 px-4 py-2 rounded-xl flex items-center gap-2 whitespace-nowrap">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            <span className="text-xs font-medium text-zinc-300">Available ({tests.length})</span>
          </div>
          <div className="bg-[#141313] border border-zinc-800 px-4 py-2 rounded-xl flex items-center gap-2 whitespace-nowrap">
            <CheckCircle2 className="w-3.5 h-3.5 text-zinc-500" />
            <span className="text-xs font-medium text-zinc-300">Completed (2)</span>
          </div>
          <div className="bg-[#141313] border border-zinc-800 px-4 py-2 rounded-xl flex items-center gap-2 whitespace-nowrap">
            <Calendar className="w-3.5 h-3.5 text-orange-500" />
            <span className="text-xs font-medium text-zinc-300">Scheduled (1)</span>
          </div>
        </div>
      </div>

      {/* Section 1: Grand Tests */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-zinc-100 flex items-center gap-2">
            Grand Multi-Specialty Mock Tests
            <span className="text-[10px] bg-zinc-800 text-zinc-300 px-2 py-0.5 rounded-full font-medium">
              {grandTests.length} Live
            </span>
          </h2>
        </div>
        
        {grandTests.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {grandTests.map((test: { id: string; title: string; kind: string; durationMin: number; totalQs: number }) => (
              <div key={test.id} className="bg-[#141313] border border-zinc-800/80 rounded-2xl p-6 flex flex-col justify-between hover:border-zinc-700 transition shadow-sm group">
                <div>
                  <div className="flex justify-between items-start mb-4">
                    <span className="text-[10px] font-bold uppercase tracking-wider bg-zinc-800 text-zinc-300 px-2.5 py-1 rounded">
                      {test.kind}
                    </span>
                    <span className="text-xs font-semibold bg-emerald-500/10 text-emerald-400 px-2.5 py-1 rounded-full border border-emerald-500/20">
                      Available
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-zinc-100 mb-3 group-hover:text-orange-400 transition-colors">{test.title}</h3>
                  <div className="flex gap-4 text-xs text-zinc-400 font-mono mb-6 bg-zinc-900/50 p-2.5 rounded-lg border border-zinc-800/50">
                    <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5 text-orange-500"/> {test.durationMin} mins</span>
                    <span className="flex items-center gap-1.5"><FileText className="w-3.5 h-3.5 text-orange-500"/> {test.totalQs} MCQs</span>
                  </div>
                </div>
                <Link href={`/test/${test.id}`} className="w-full bg-orange-600 hover:bg-orange-500 text-white text-xs font-bold py-3 rounded-xl transition text-center shadow-sm flex items-center justify-center gap-2">
                  Start Test <PlayCircle className="w-4 h-4" />
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-[#141313] border border-zinc-800/80 rounded-2xl p-8 text-center text-zinc-500 text-sm">
            No Grand Tests available currently.
          </div>
        )}
      </section>

      {/* Section 2: Subject-wise & Unit Tests */}
      <section className="space-y-6 pt-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-zinc-100 flex items-center gap-2">
            Subject-wise & Unit Tests
            <span className="text-[10px] bg-zinc-800 text-zinc-300 px-2 py-0.5 rounded-full font-medium">
              {subjectTests.length} Live
            </span>
          </h2>
        </div>
        
        {subjectTests.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {subjectTests.map((test: { id: string; title: string; kind: string; durationMin: number; totalQs: number }) => (
              <div key={test.id} className="bg-[#141313] border border-zinc-800/80 rounded-2xl p-6 flex flex-col justify-between hover:border-zinc-700 transition shadow-sm group">
                <div>
                  <div className="flex justify-between items-start mb-4">
                    <span className="text-[10px] font-bold uppercase tracking-wider bg-zinc-800 text-zinc-300 px-2.5 py-1 rounded">
                      {test.kind}
                    </span>
                    <span className="text-xs font-semibold bg-emerald-500/10 text-emerald-400 px-2.5 py-1 rounded-full border border-emerald-500/20">
                      Available
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-zinc-100 mb-3 group-hover:text-orange-400 transition-colors">{test.title}</h3>
                  <div className="flex gap-4 text-xs text-zinc-400 font-mono mb-6 bg-zinc-900/50 p-2.5 rounded-lg border border-zinc-800/50">
                    <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5 text-emerald-500"/> {test.durationMin} mins</span>
                    <span className="flex items-center gap-1.5"><FileText className="w-3.5 h-3.5 text-emerald-500"/> {test.totalQs} MCQs</span>
                  </div>
                </div>
                <Link href={`/test/${test.id}`} className="w-full bg-zinc-800 hover:bg-zinc-700 text-white text-xs font-bold py-3 rounded-xl transition text-center shadow-sm flex items-center justify-center gap-2">
                  Start Test <PlayCircle className="w-4 h-4" />
                </Link>
              </div>
            ))}
            
            {/* Visual Example of a Locked/Scheduled Test */}
            <div className="bg-[#141313]/50 border border-zinc-800/40 rounded-2xl p-6 flex flex-col justify-between opacity-75">
              <div>
                <div className="flex justify-between items-start mb-4">
                  <span className="text-[10px] font-bold uppercase tracking-wider bg-zinc-800/50 text-zinc-400 px-2.5 py-1 rounded">
                    PYQ EXAM
                  </span>
                  <span className="text-xs font-semibold bg-orange-500/10 text-orange-400 px-2.5 py-1 rounded-full border border-orange-500/20 flex items-center gap-1">
                    <Calendar className="w-3 h-3" /> Scheduled
                  </span>
                </div>
                <h3 className="text-base font-bold text-zinc-300 mb-3">FMGE PYQ Sprint (2023-2025)</h3>
                <div className="flex gap-4 text-xs text-zinc-500 font-mono mb-6 bg-zinc-900/30 p-2.5 rounded-lg border border-zinc-800/30">
                  <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5"/> 120 mins</span>
                  <span className="flex items-center gap-1.5"><FileText className="w-3.5 h-3.5"/> 100 MCQs</span>
                </div>
              </div>
              <button disabled className="w-full bg-zinc-900 text-zinc-500 text-xs font-bold py-3 rounded-xl cursor-not-allowed flex items-center justify-center gap-2">
                Unlocks Nov 15 <Lock className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>
        ) : (
          <div className="bg-[#141313] border border-zinc-800/80 rounded-2xl p-8 text-center text-zinc-500 text-sm">
            No Subject-wise Tests available currently.
          </div>
        )}
      </section>

    </div>
  );
}