'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  BookOpen, 
  Activity, 
  Dna, 
  Microscope, 
  Pill, 
  Bug, 
  Scale, 
  Users, 
  Ear, 
  Eye, 
  Stethoscope, 
  Syringe, 
  Baby, 
  Bone, 
  Radio, 
  ScanFace, 
  Brain, 
  Moon,
  ChevronRight,
  X,
  Target,
  Play
} from 'lucide-react';

const subjects = [
  // Pre-Clinical
  { id: 'anatomy', name: 'Anatomy', icon: Bone, color: 'text-blue-400', bg: 'bg-blue-500/10', border: 'border-blue-500/20', category: 'Pre-Clinical' },
  { id: 'physiology', name: 'Physiology', icon: Activity, color: 'text-red-400', bg: 'bg-red-500/10', border: 'border-red-500/20', category: 'Pre-Clinical' },
  { id: 'biochemistry', name: 'Biochemistry', icon: Dna, color: 'text-purple-400', bg: 'bg-purple-500/10', border: 'border-purple-500/20', category: 'Pre-Clinical' },
  
  // Para-Clinical
  { id: 'pathology', name: 'Pathology', icon: Microscope, color: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20', category: 'Para-Clinical' },
  { id: 'pharmacology', name: 'Pharmacology', icon: Pill, color: 'text-orange-400', bg: 'bg-orange-500/10', border: 'border-orange-500/20', category: 'Para-Clinical' },
  { id: 'microbiology', name: 'Microbiology', icon: Bug, color: 'text-teal-400', bg: 'bg-teal-500/10', border: 'border-teal-500/20', category: 'Para-Clinical' },
  { id: 'forensic', name: 'Forensic Medicine', icon: Scale, color: 'text-zinc-400', bg: 'bg-zinc-500/10', border: 'border-zinc-500/20', category: 'Para-Clinical' },
  { id: 'psm', name: 'PSM', icon: Users, color: 'text-sky-400', bg: 'bg-sky-500/10', border: 'border-sky-500/20', category: 'Para-Clinical' },
  
  // Clinical
  { id: 'ent', name: 'ENT', icon: Ear, color: 'text-amber-400', bg: 'bg-amber-500/10', border: 'border-amber-500/20', category: 'Clinical' },
  { id: 'ophthalmology', name: 'Ophthalmology', icon: Eye, color: 'text-cyan-400', bg: 'bg-cyan-500/10', border: 'border-cyan-500/20', category: 'Clinical' },
  { id: 'medicine', name: 'Medicine', icon: Stethoscope, color: 'text-rose-400', bg: 'bg-rose-500/10', border: 'border-rose-500/20', category: 'Clinical' },
  { id: 'surgery', name: 'Surgery', icon: Syringe, color: 'text-indigo-400', bg: 'bg-indigo-500/10', border: 'border-indigo-500/20', category: 'Clinical' },
  { id: 'obgyn', name: 'OBGYN', icon: Baby, color: 'text-pink-400', bg: 'bg-pink-500/10', border: 'border-pink-500/20', category: 'Clinical' },
  { id: 'pediatrics', name: 'Pediatrics', icon: Baby, color: 'text-lime-400', bg: 'bg-lime-500/10', border: 'border-lime-500/20', category: 'Clinical' },
  { id: 'orthopedics', name: 'Orthopedics', icon: Bone, color: 'text-stone-400', bg: 'bg-stone-500/10', border: 'border-stone-500/20', category: 'Clinical' },
  { id: 'radiology', name: 'Radiology', icon: Radio, color: 'text-fuchsia-400', bg: 'bg-fuchsia-500/10', border: 'border-fuchsia-500/20', category: 'Clinical' },
  { id: 'dermatology', name: 'Dermatology', icon: ScanFace, color: 'text-yellow-400', bg: 'bg-yellow-500/10', border: 'border-yellow-500/20', category: 'Clinical' },
  { id: 'psychiatry', name: 'Psychiatry', icon: Brain, color: 'text-violet-400', bg: 'bg-violet-500/10', border: 'border-violet-500/20', category: 'Clinical' },
  { id: 'anesthesia', name: 'Anesthesia', icon: Moon, color: 'text-slate-400', bg: 'bg-slate-500/10', border: 'border-slate-500/20', category: 'Clinical' }
];

export default function QBankHubPage() {
  const router = useRouter();
  const [selectedSubject, setSelectedSubject] = useState<typeof subjects[0] | null>(null);

  const startPractice = (count: number) => {
    router.push(`/qbank/practice?subject=${selectedSubject?.id}&count=${count}`);
  };

  return (
    <div className="max-w-7xl mx-auto space-y-12 pb-16 pt-2">
      
      {/* Header */}
      <div className="border-b border-zinc-800/80 pb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-zinc-100 flex items-center gap-2">
            <BookOpen className="w-6 h-6 text-orange-500" /> Complete QBank
          </h1>
          <p className="text-sm text-zinc-400 mt-2">
            Select a subject to start a customized practice block with instant feedback.
          </p>
        </div>
      </div>

      {/* Grid grouped by categories */}
      {['Pre-Clinical', 'Para-Clinical', 'Clinical'].map(category => (
        <section key={category} className="space-y-6">
          <h2 className="text-lg font-bold text-zinc-100 flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-orange-500"></div>
            {category} Subjects
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {subjects.filter(s => s.category === category).map(subject => {
              const Icon = subject.icon;
              return (
                <button
                  key={subject.id}
                  onClick={() => setSelectedSubject(subject)}
                  className="bg-[#141313] border border-zinc-800/80 hover:border-zinc-600 rounded-2xl p-5 text-left transition-all hover:bg-[#181717] group flex flex-col h-full"
                >
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 border ${subject.bg} ${subject.border}`}>
                    <Icon className={`w-6 h-6 ${subject.color}`} />
                  </div>
                  <h3 className="font-bold text-zinc-100 mb-1 group-hover:text-orange-400 transition-colors">
                    {subject.name}
                  </h3>
                  <div className="mt-auto pt-4 flex items-center justify-between text-xs font-semibold text-zinc-500 group-hover:text-zinc-400">
                    <span>Practice Mode</span>
                    <ChevronRight className="w-4 h-4" />
                  </div>
                </button>
              );
            })}
          </div>
        </section>
      ))}

      {/* Block Configuration Modal */}
      {selectedSubject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-[#0f0e0e]/90 backdrop-blur-sm" onClick={() => setSelectedSubject(null)}></div>
          
          <div className="relative bg-[#141313] border border-zinc-800/80 rounded-3xl w-full max-w-md shadow-2xl p-8 animate-in zoom-in-95 duration-200">
            <button 
              onClick={() => setSelectedSubject(null)}
              className="absolute top-6 right-6 w-8 h-8 flex items-center justify-center rounded-full bg-zinc-800 text-zinc-400 hover:text-zinc-100 transition"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="mb-8">
              <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-4 border ${selectedSubject.bg} ${selectedSubject.border}`}>
                {<selectedSubject.icon className={`w-8 h-8 ${selectedSubject.color}`} />}
              </div>
              <h3 className="text-2xl font-bold text-zinc-100 mb-2">{selectedSubject.name}</h3>
              <p className="text-sm text-zinc-400">How many questions would you like to practice in this block?</p>
            </div>

            <div className="space-y-3">
              {[
                { count: 10, desc: "Quick Refresher (~10 mins)", icon: Play },
                { count: 15, desc: "Standard Block (~15 mins)", icon: Target, active: true },
                { count: 30, desc: "Deep Dive (~30 mins)", icon: BookOpen }
              ].map((opt) => (
                <button
                  key={opt.count}
                  onClick={() => startPractice(opt.count)}
                  className={`w-full flex items-center justify-between p-4 rounded-xl border-2 transition-all group ${
                    opt.active 
                      ? 'border-orange-500 bg-orange-500/10 shadow-[0_0_15px_rgba(249,115,22,0.1)]' 
                      : 'border-zinc-800 bg-[#181717] hover:border-zinc-600'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${opt.active ? 'bg-orange-500' : 'bg-zinc-800 group-hover:bg-zinc-700'} transition-colors`}>
                      <opt.icon className={`w-5 h-5 ${opt.active ? 'text-white' : 'text-zinc-400'}`} />
                    </div>
                    <div className="text-left">
                      <div className={`font-bold text-lg ${opt.active ? 'text-orange-400' : 'text-zinc-100'}`}>
                        {opt.count} Questions
                      </div>
                      <div className="text-xs font-medium text-zinc-500">{opt.desc}</div>
                    </div>
                  </div>
                  <ChevronRight className={`w-5 h-5 ${opt.active ? 'text-orange-500' : 'text-zinc-600'}`} />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

    </div>
  );
}