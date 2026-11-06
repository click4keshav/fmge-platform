'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Bookmark, 
  Search, 
  Filter, 
  BookOpen, 
  Edit3, 
  Play, 
  Trash2, 
  X, 
  CheckCircle2, 
  Lightbulb,
  ArrowRight
} from 'lucide-react';

// Mock Bookmarked Questions Data
initialBookmarks: [
  {
    id: 1,
    subject: "Pathology",
    question: "A 45-year-old male presents with acute severe pain in his right toe. Microscopic analysis of synovial fluid shows negatively birefringent needle-shaped crystals. What is the most likely diagnosis?",
    options: ["Pseudogout", "Gout", "Rheumatoid Arthritis", "Septic Arthritis"],
    correctOptionIndex: 1,
    explanation: "Gout is characterized by the deposition of monosodium urate crystals in joints. Needle-shaped + Negative birefringence = Gout.",
    note: "Must review before exam! Remember negative = Gout, positive = Pseudogout."
  },
  {
    id: 2,
    subject: "Pharmacology",
    question: "Which of the following beta-blockers also possesses alpha-1 receptor blocking activity, making it particularly useful in treating hypertensive emergencies?",
    options: ["Metoprolol", "Propranolol", "Labetalol", "Atenolol"],
    correctOptionIndex: 2,
    explanation: "Labetalol is a mixed alpha/beta adrenergic antagonist. Causes vasodilation without reflex tachycardia.",
    note: "Labetalol & Carvedilol have alpha-1 blocking properties."
  },
  {
    id: 3,
    subject: "Medicine",
    question: "A patient presents with a 'cherry-red spot' on the macula and exhibits hyperacusis. Which enzyme is most likely deficient?",
    options: ["Hexosaminidase A", "Sphingomyelinase", "Glucocerebrosidase", "Alpha-galactosidase A"],
    correctOptionIndex: 0,
    explanation: "Tay-Sachs disease is caused by Hexosaminidase A deficiency leading to GM2 ganglioside accumulation.",
    note: "Tay-Sachs has NO hepatosplenomegaly compared to Niemann-Pick."
  }
];

export default function BookmarksPage() {
  const router = useRouter();
  const [bookmarks, setBookmarks] = useState([
    {
      id: 1,
      subject: "Pathology",
      question: "A 45-year-old male presents with acute severe pain in his right toe. Microscopic analysis of synovial fluid shows negatively birefringent needle-shaped crystals. What is the most likely diagnosis?",
      options: ["Pseudogout", "Gout", "Rheumatoid Arthritis", "Septic Arthritis"],
      correctOptionIndex: 1,
      explanation: "Gout is characterized by the deposition of monosodium urate crystals in joints. Needle-shaped + Negative birefringence = Gout.",
      note: "Must review before exam! Remember negative = Gout, positive = Pseudogout."
    },
    {
      id: 2,
      subject: "Pharmacology",
      question: "Which of the following beta-blockers also possesses alpha-1 receptor blocking activity, making it particularly useful in treating hypertensive emergencies?",
      options: ["Metoprolol", "Propranolol", "Labetalol", "Atenolol"],
      correctOptionIndex: 2,
      explanation: "Labetalol is a mixed alpha/beta adrenergic antagonist. Causes vasodilation without reflex tachycardia.",
      note: "Labetalol & Carvedilol have alpha-1 blocking properties."
    },
    {
      id: 3,
      subject: "Medicine",
      question: "A patient presents with a 'cherry-red spot' on the macula and exhibits hyperacusis. Which enzyme is most likely deficient?",
      options: ["Hexosaminidase A", "Sphingomyelinase", "Glucocerebrosidase", "Alpha-galactosidase A"],
      correctOptionIndex: 0,
      explanation: "Tay-Sachs disease is caused by Hexosaminidase A deficiency leading to GM2 ganglioside accumulation.",
      note: "Tay-Sachs has NO hepatosplenomegaly compared to Niemann-Pick."
    }
  ]);

  const [selectedSubject, setSelectedSubject] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [editingBookmark, setEditingBookmark] = useState<any | null>(null);
  const [tempNote, setTempNote] = useState('');

  // Filter bookmarks
  const filteredBookmarks = bookmarks.filter(b => {
    const matchesSubject = selectedSubject === 'All' || b.subject === selectedSubject;
    const matchesSearch = b.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          b.subject.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSubject && matchesSearch;
  });

  const subjects = ['All', 'Pathology', 'Pharmacology', 'Medicine'];

  const handleDelete = (id: number) => {
    setBookmarks(bookmarks.filter(b => b.id !== id));
  };

  const handleSaveNote = () => {
    if (!editingBookmark) return;
    setBookmarks(bookmarks.map(b => b.id === editingBookmark.id ? { ...b, note: tempNote } : b));
    setEditingBookmark(null);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-16 pt-2">
      
      {/* Header */}
      <div className="border-b border-zinc-800/80 pb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-zinc-100 flex items-center gap-2">
            <Bookmark className="w-6 h-6 text-orange-500 fill-orange-500" /> Bookmarks & Revision Notes
          </h1>
          <p className="text-sm text-zinc-400 mt-2">
            Review your starred questions, add custom revision mnemonics, and re-attempt weak areas.
          </p>
        </div>
        <div className="bg-[#141313] border border-zinc-800 px-4 py-2 rounded-xl text-xs font-bold text-zinc-300">
          Total Bookmarked: <span className="text-orange-500">{bookmarks.length}</span>
        </div>
      </div>

      {/* Filters & Search Bar */}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
        
        {/* Subject Pills */}
        <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-2 sm:pb-0">
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

        {/* Search Input */}
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
          <input 
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search bookmarked questions..."
            className="w-full bg-[#141313] border border-zinc-800 rounded-xl px-4 py-2.5 pl-10 text-zinc-100 text-xs focus:outline-none focus:border-orange-500 transition"
          />
        </div>

      </div>

      {/* Bookmarks List */}
      <div className="space-y-6">
        {filteredBookmarks.length === 0 ? (
          <div className="bg-[#141313] border border-zinc-800/80 rounded-2xl p-12 text-center text-zinc-500">
            <Bookmark className="w-12 h-12 mx-auto mb-4 text-zinc-700" />
            <p className="text-base font-semibold text-zinc-300">No bookmarked questions found.</p>
            <p className="text-xs mt-1">Star questions during your QBank practice blocks or mock tests to see them here.</p>
          </div>
        ) : (
          filteredBookmarks.map((item) => (
            <div key={item.id} className="bg-[#141313] border border-zinc-800/80 rounded-2xl p-6 sm:p-8 space-y-6 shadow-sm hover:border-zinc-700 transition">
              
              {/* Card Header */}
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-orange-400 bg-orange-500/10 px-3 py-1 rounded-md border border-orange-500/20">
                  {item.subject}
                </span>

                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => { setEditingBookmark(item); setTempNote(item.note || ''); }}
                    className="flex items-center gap-1.5 text-xs font-semibold text-zinc-400 hover:text-zinc-100 bg-zinc-900 border border-zinc-800 px-3 py-1.5 rounded-lg transition"
                  >
                    <Edit3 className="w-3.5 h-3.5 text-orange-500" /> {item.note ? 'Edit Note' : 'Add Note'}
                  </button>
                  <button 
                    onClick={() => handleDelete(item.id)}
                    className="p-1.5 text-zinc-500 hover:text-red-400 transition rounded-lg hover:bg-zinc-900"
                    title="Remove Bookmark"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Question Text */}
              <h3 className="text-base sm:text-lg font-medium text-zinc-100 leading-relaxed">
                {item.question}
              </h3>

              {/* Options Preview */}
              <div className="grid sm:grid-cols-2 gap-3">
                {item.options.map((opt, idx) => (
                  <div 
                    key={idx}
                    className={`p-3.5 rounded-xl border text-xs font-medium flex items-center gap-3 ${
                      idx === item.correctOptionIndex 
                        ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-200' 
                        : 'bg-[#181717] border-zinc-800/80 text-zinc-400'
                    }`}
                  >
                    <span className="w-5 h-5 rounded-full bg-zinc-900 flex items-center justify-center text-[10px] font-bold shrink-0">
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span>{opt}</span>
                  </div>
                ))}
              </div>

              {/* Explanation Summary */}
              <div className="bg-[#181717] border border-zinc-800/80 p-4 rounded-xl text-xs text-zinc-300 leading-relaxed flex items-start gap-3">
                <BookOpen className="w-4 h-4 text-orange-500 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-zinc-100 block mb-1">Key Explanation:</span>
                  {item.explanation}
                </div>
              </div>

              {/* Custom Student Note */}
              {item.note && (
                <div className="bg-orange-500/5 border border-orange-500/20 p-4 rounded-xl text-xs text-orange-200/90 flex items-start gap-3">
                  <Lightbulb className="w-4 h-4 text-orange-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-orange-400 block mb-1">My Revision Note:</span>
                    {item.note}
                  </div>
                </div>
              )}

              {/* Footer Re-attempt Action */}
              <div className="pt-2 flex justify-end">
                <button 
                  onClick={() => router.push('/qbank/practice')}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-orange-500 hover:text-orange-400 transition"
                >
                  Re-attempt in Practice Mode <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>
          ))
        )}
      </div>

      {/* Edit Note Modal */}
      {editingBookmark && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-[#0f0e0e]/90 backdrop-blur-sm" onClick={() => setEditingBookmark(null)}></div>
          
          <div className="relative bg-[#141313] border border-zinc-800/80 rounded-3xl w-full max-w-lg shadow-2xl p-6 sm:p-8 animate-in zoom-in-95 duration-200">
            <button 
              onClick={() => setEditingBookmark(null)}
              className="absolute top-6 right-6 w-8 h-8 flex items-center justify-center rounded-full bg-zinc-800 text-zinc-400 hover:text-zinc-100 transition"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="mb-6">
              <h3 className="text-xl font-bold text-zinc-100 mb-1">Add Revision Note</h3>
              <p className="text-xs text-zinc-400">Jot down high-yield points, mnemonics, or mistakes to remember.</p>
            </div>

            <textarea 
              rows={4}
              value={tempNote}
              onChange={(e) => setTempNote(e.target.value)}
              placeholder="Type your custom mnemonic or note here..."
              className="w-full bg-[#181717] border border-zinc-800 rounded-xl p-4 text-zinc-100 text-sm focus:outline-none focus:border-orange-500 transition mb-6 resize-none"
            />

            <div className="flex justify-end gap-3">
              <button 
                onClick={() => setEditingBookmark(null)}
                className="px-5 py-2.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-xs font-bold rounded-xl transition"
              >
                Cancel
              </button>
              <button 
                onClick={handleSaveNote}
                className="px-6 py-2.5 bg-orange-600 hover:bg-orange-500 text-white text-xs font-bold rounded-xl transition shadow-sm"
              >
                Save Note
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}