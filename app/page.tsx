'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { CheckCircle2, ArrowRight } from 'lucide-react';

export default function LandingPage() {
  const router = useRouter();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [email, setEmail] = useState('aditya@gmail.com');
  const [password, setPassword] = useState('password123');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Redirect properly using Next.js router
    router.push('/dashboard');
  };

  return (
    <div className="min-h-screen bg-[#0f0e0e] text-zinc-100 flex flex-col font-sans selection:bg-orange-500 selection:text-white">
      
      {/* Top Navbar */}
      <header className="border-b border-zinc-800/80 bg-[#141313]/80 backdrop-blur-md sticky top-0 z-50 px-8 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <h1 className="text-xl font-bold tracking-tight text-orange-500">
            Fornix
          </h1>
          <span className="text-xs text-zinc-400 italic border-l border-zinc-800 pl-3 hidden sm:inline">
            connecting knowledge to memory
          </span>
        </div>

        <div className="flex items-center gap-6">
          <nav className="hidden md:flex items-center gap-6 text-sm text-zinc-400">
            <a href="#plans" className="hover:text-zinc-100 transition">Plans</a>
            <a href="#about" className="hover:text-zinc-100 transition">About Us</a>
          </nav>
          <button
            onClick={() => setShowLoginModal(true)}
            className="bg-orange-600 hover:bg-orange-500 text-white text-xs font-semibold px-5 py-2.5 rounded-xl transition shadow-sm"
          >
            Login / Signup
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="flex-1 flex flex-col items-center justify-center text-center px-6 py-20 max-w-5xl mx-auto space-y-6">
        <span className="text-xs bg-zinc-800 text-zinc-300 px-4 py-1.5 rounded-full font-medium border border-zinc-700">
          🚀 Next-Gen Medical Exam Simulation & QBank Platform
        </span>
        <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight text-zinc-100 leading-tight">
          The Gold Standard for <span className="text-orange-500">FMGE & NEET PG</span>
        </h2>
        <p className="text-base md:text-lg text-zinc-400 max-w-2xl">
          Master clinical vignettes with India&apos;s most advanced PYT-based QBank, high-yield Grand Tests, and direct 1:1 mentorship.
        </p>
        <div className="pt-4 flex gap-4">
          <a
            href="#plans"
            className="bg-orange-600 hover:bg-orange-500 text-white font-semibold px-8 py-3.5 rounded-xl text-sm transition shadow-lg flex items-center gap-2"
          >
            Explore Plans <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </section>

      {/* Plans Section */}
      <section id="plans" className="py-20 px-8 bg-[#121111] border-t border-zinc-800/80">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="text-center space-y-2">
            <h3 className="text-2xl md:text-3xl font-bold text-zinc-100">Choose Your Preparation Plan</h3>
            <p className="text-sm text-zinc-400">Select the right tier to accelerate your medical board success.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Plan A: Test Series */}
            <div className="bg-[#181717] border border-zinc-800 rounded-2xl p-8 flex flex-col justify-between hover:border-zinc-700 transition">
              <div>
                <span className="text-xs text-orange-400 bg-orange-500/10 px-3 py-1 rounded-full font-semibold border border-orange-500/20">
                  Plan A
                </span>
                <h4 className="text-xl font-bold text-zinc-100 mt-4 mb-1">Test Series</h4>
                <p className="text-xs text-zinc-400 mb-6">Grand Tests & Subject-wise Mock Exams</p>
                <div className="text-3xl font-bold text-zinc-100 mb-6">₹5,999 <span className="text-xs font-normal text-zinc-500">/ year</span></div>
                <ul className="space-y-3 text-sm text-zinc-300 mb-8">
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> Full Grand Tests & PYTs</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> Detailed Performance Analytics</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> Detailed Explanations</li>
                </ul>
              </div>
              <button
                onClick={() => setShowLoginModal(true)}
                className="w-full bg-zinc-800 hover:bg-zinc-700 text-zinc-100 font-semibold py-3 rounded-xl text-sm transition"
              >
                Get Started
              </button>
            </div>

            {/* Plan B: QBank + Test Series */}
            <div className="bg-[#181717] border-2 border-orange-500/50 rounded-2xl p-8 flex flex-col justify-between relative shadow-xl">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-orange-600 text-white text-[10px] uppercase font-bold tracking-wider px-3 py-1 rounded-full">
                Most Popular
              </div>
              <div>
                <span className="text-xs text-orange-400 bg-orange-500/10 px-3 py-1 rounded-full font-semibold border border-orange-500/20">
                  Plan B
                </span>
                <h4 className="text-xl font-bold text-zinc-100 mt-4 mb-1">QBank + Test Series</h4>
                <p className="text-xs text-zinc-400 mb-6">Comprehensive question bank & exam simulation</p>
                <div className="text-3xl font-bold text-zinc-100 mb-6">₹11,999 <span className="text-xs font-normal text-zinc-500">/ year</span></div>
                <ul className="space-y-3 text-sm text-zinc-300 mb-8">
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> All Test Series Features</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> Custom QBank Modules</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> Image & One-Liner Bank</li>
                </ul>
              </div>
              <button
                onClick={() => setShowLoginModal(true)}
                className="w-full bg-orange-600 hover:bg-orange-500 text-white font-semibold py-3 rounded-xl text-sm transition shadow-sm"
              >
                Get Started
              </button>
            </div>

            {/* Plan C: Mentorship */}
            <div className="bg-[#181717] border border-zinc-800 rounded-2xl p-8 flex flex-col justify-between hover:border-zinc-700 transition">
              <div>
                <span className="text-xs text-orange-400 bg-orange-500/10 px-3 py-1 rounded-full font-semibold border border-orange-500/20">
                  Plan C
                </span>
                <h4 className="text-xl font-bold text-zinc-100 mt-4 mb-1">Mentorship</h4>
                <p className="text-xs text-zinc-400 mb-6">All previous benefits + 1:1 expert guidance</p>
                <div className="text-3xl font-bold text-zinc-100 mb-6">₹43,949 <span className="text-xs font-normal text-zinc-500">/ year</span></div>
                <ul className="space-y-3 text-sm text-zinc-300 mb-8">
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> QBank & Test Series Included</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> Personal 1:1 Mentor & Strategy</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> Direct Tutor Chat Support</li>
                </ul>
              </div>
              <button
                onClick={() => setShowLoginModal(true)}
                className="w-full bg-zinc-800 hover:bg-zinc-700 text-zinc-100 font-semibold py-3 rounded-xl text-sm transition"
              >
                Get Started
              </button>
            </div>

          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section id="about" className="py-20 px-8 bg-[#0f0e0e] border-t border-zinc-800/80">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <h3 className="text-2xl md:text-3xl font-bold text-zinc-100">About Fornix</h3>
          <p className="text-base text-zinc-400 leading-relaxed">
            Founded by top medical professionals, Fornix is built on the philosophy of connecting knowledge to memory. We understand the rigorous demands of the FMGE and NEET PG exams. Our mission is to provide an ecosystem of high-yield question banks, simulation tests, and 1:1 mentorship that transforms hard work into measurable success.
          </p>
          <p className="text-base text-zinc-400 leading-relaxed">
            Whether you are revising core concepts or taking full-length grand tests, our platform is designed to identify your weak areas and help you master clinical vignettes with confidence.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-zinc-800/80 py-8 px-8 text-center text-xs text-zinc-500">
        © 2026 Fornix. Connecting knowledge to memory. All rights reserved.
      </footer>

      {/* Login Modal */}
      {showLoginModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#141313] border border-zinc-800 rounded-2xl max-w-md w-full p-8 shadow-2xl space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-xl font-bold text-zinc-100">Student Portal Login</h3>
                <p className="text-xs text-zinc-400 mt-0.5">Fornix | connecting knowledge to memory</p>
              </div>
              <button 
                onClick={() => setShowLoginModal(false)}
                className="text-zinc-400 hover:text-zinc-100 text-lg font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-zinc-400 mb-1">Email Address</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-[#1c1b1b] border border-zinc-800 rounded-xl px-4 py-3 text-sm text-zinc-100 focus:outline-none focus:border-orange-500"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-zinc-400 mb-1">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-[#1c1b1b] border border-zinc-800 rounded-xl px-4 py-3 text-sm text-zinc-100 focus:outline-none focus:border-orange-500"
                  required
                />
              </div>

              <div className="bg-orange-500/10 border border-orange-500/20 p-3 rounded-xl text-xs text-orange-300">
                💡 <strong>Demo Credentials:</strong><br />
                Email: <code>aditya@gmail.com</code><br />
                Password: <code>password123</code>
              </div>

              <button
                type="submit"
                className="w-full bg-orange-600 hover:bg-orange-500 text-white font-semibold py-3 rounded-xl text-sm transition shadow-sm"
              >
                Sign In to Portal
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}