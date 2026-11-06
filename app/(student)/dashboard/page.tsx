import { getDashboardData } from "../../actions/dashboard";
import Link from 'next/link';
import { ArrowRight, TrendingUp, Target } from 'lucide-react';

export default async function DashboardPage() {
  const { student } = await getDashboardData(); 

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      
      {/* Welcome Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-zinc-100">
          Welcome back, {student?.name || 'Aditya'}
        </h1>
        <p className="text-sm text-zinc-400 mt-1">
          Here&apos;s your preparation overview for FMGE {student?.examYear || 2026}
        </p>
      </div>

      {/* Full-Width Question of the Day Banner */}
      <div className="bg-gradient-to-r from-orange-500/20 via-[#141313] to-[#141313] border border-orange-500/30 rounded-2xl p-6 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse"></span>
            <p className="text-xs text-orange-400 font-bold uppercase tracking-wider">Question of the Day</p>
          </div>
          <p className="text-sm text-zinc-200 leading-relaxed">
            A 45-year-old male presents with acute severe pain in his right toe. Microscopic analysis of synovial fluid shows negatively birefringent needle-shaped crystals. What is the most likely diagnosis?
          </p>
        </div>
        <Link href="/test/qotd" className="shrink-0 bg-orange-600 hover:bg-orange-500 text-white text-xs font-semibold px-6 py-3 rounded-xl transition flex items-center justify-center gap-2 shadow-sm w-full sm:w-auto">
        Attempt Now <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {/* 4 Top Summary Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Card 1: Tests Taken */}
        <div className="bg-[#141313] border border-zinc-800/80 rounded-2xl p-6 shadow-sm flex flex-col justify-center min-h-[120px]">
          <p className="text-xs text-zinc-400 font-medium mb-2">Total Tests Taken</p>
          <p className="text-4xl font-bold text-zinc-100">6</p>
        </div>

        {/* Card 2: Highest Score */}
        <div className="bg-[#141313] border border-zinc-800/80 rounded-2xl p-6 shadow-sm flex flex-col justify-center min-h-[120px]">
          <p className="text-xs text-zinc-400 font-medium mb-2">Highest Score</p>
          <div className="flex items-baseline gap-1">
            <p className="text-4xl font-bold text-orange-500">246</p>
            <p className="text-sm font-medium text-zinc-500">/300</p>
          </div>
        </div>

        {/* Card 3: Avg Score */}
        <div className="bg-[#141313] border border-zinc-800/80 rounded-2xl p-6 shadow-sm flex flex-col justify-center min-h-[120px]">
          <p className="text-xs text-zinc-400 font-medium mb-2">Average Score</p>
          <div className="flex items-baseline gap-1">
            <p className="text-4xl font-bold text-zinc-100">182</p>
            <p className="text-sm font-medium text-zinc-500">/300</p>
          </div>
        </div>

        {/* Card 4: Overall Accuracy */}
        <div className="bg-[#141313] border border-zinc-800/80 rounded-2xl p-6 shadow-sm flex flex-col justify-center min-h-[120px]">
          <div className="flex justify-between items-start mb-2">
            <p className="text-xs text-zinc-400 font-medium">Overall Accuracy</p>
            <Target className="w-4 h-4 text-emerald-500" />
          </div>
          <p className="text-4xl font-bold text-zinc-100">78<span className="text-xl text-zinc-500">%</span></p>
        </div>

      </div>

      {/* Full-width Line Chart Tile */}
      <div className="bg-[#141313] border border-zinc-800/80 rounded-2xl p-6 md:p-8 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
          <div>
            <h2 className="text-lg font-semibold text-zinc-100">Performance Progression</h2>
            <p className="text-sm text-zinc-400">Grand test score trajectory over your last 6 attempts</p>
          </div>
          <div className="flex items-center gap-2 bg-emerald-500/10 text-emerald-400 px-3 py-1.5 rounded-full text-xs font-semibold border border-emerald-500/20">
            <TrendingUp className="w-4 h-4" /> +12% Growth
          </div>
        </div>

        {/* Crisp Lean SVG Chart */}
        <div className="relative h-64 w-full">
          {/* Y-Axis Labels */}
          <div className="absolute left-0 top-0 h-full flex flex-col justify-between text-[10px] text-zinc-500 font-mono pb-6">
            <span>300</span>
            <span>225</span>
            <span>150</span>
            <span>75</span>
            <span>0</span>
          </div>

          {/* Grid Lines */}
          <div className="absolute left-10 right-0 top-2 bottom-6 flex flex-col justify-between">
            <div className="border-t border-zinc-800/50 w-full h-0"></div>
            <div className="border-t border-zinc-800/50 w-full h-0"></div>
            <div className="border-t border-zinc-800/50 w-full h-0"></div>
            <div className="border-t border-zinc-800/50 w-full h-0"></div>
            <div className="border-t border-zinc-800/80 w-full h-0"></div>
          </div>

          {/* SVG Line & Area (with non-scaling-stroke for lean lines) */}
          <div className="absolute left-10 right-0 top-2 bottom-6">
            <svg viewBox="0 0 1000 250" preserveAspectRatio="none" className="w-full h-full overflow-visible">
              <defs>
                <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#f97316" stopOpacity="0.25" />
                  <stop offset="100%" stopColor="#f97316" stopOpacity="0" />
                </linearGradient>
              </defs>
              
              {/* Area Fill */}
              <polygon points="20,200 200,170 380,180 560,100 740,120 920,40 920,250 20,250" fill="url(#chartGradient)" />
              
              {/* Lean Line */}
              <polyline points="20,200 200,170 380,180 560,100 740,120 920,40" fill="none" stroke="#f97316" strokeWidth="2.5" vectorEffect="non-scaling-stroke" strokeLinecap="round" strokeLinejoin="round" />
              
              {/* Clean Small Dots */}
              <circle cx="20" cy="200" r="4" fill="#141313" stroke="#f97316" strokeWidth="2" vectorEffect="non-scaling-stroke" />
              <circle cx="200" cy="170" r="4" fill="#141313" stroke="#f97316" strokeWidth="2" vectorEffect="non-scaling-stroke" />
              <circle cx="380" cy="180" r="4" fill="#141313" stroke="#f97316" strokeWidth="2" vectorEffect="non-scaling-stroke" />
              <circle cx="560" cy="100" r="4" fill="#141313" stroke="#f97316" strokeWidth="2" vectorEffect="non-scaling-stroke" />
              <circle cx="740" cy="120" r="4" fill="#141313" stroke="#f97316" strokeWidth="2" vectorEffect="non-scaling-stroke" />
              
              {/* Highlighted Current High Score */}
              <circle cx="920" cy="40" r="5" fill="#f97316" stroke="#fff" strokeWidth="1.5" vectorEffect="non-scaling-stroke" />
            </svg>
          </div>

          {/* X-Axis Labels */}
          <div className="absolute left-10 right-0 bottom-0 flex justify-between text-[10px] text-zinc-500 font-mono px-[2%]">
            <span>GT 1</span>
            <span>GT 2</span>
            <span>GT 3</span>
            <span>GT 4</span>
            <span>GT 5</span>
            <span>GT 6</span>
          </div>
        </div>
      </div>
      
    </div>
  );
}