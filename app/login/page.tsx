'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Mail, Lock, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';
import Link from 'next/link';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate authentication handoff
    setTimeout(() => {
      setIsLoading(false);
      router.push('/dashboard');
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-[#0f0e0e] text-zinc-100 flex flex-col justify-center items-center p-6 font-sans selection:bg-orange-500/30">
      
      {/* Brand Header */}
      <div className="mb-8 text-center">
        <Link href="/" className="text-3xl font-bold tracking-tight text-orange-500 hover:text-orange-400 transition inline-block">
          Fornix
        </Link>
        <p className="text-xs text-zinc-500 tracking-wider uppercase mt-1">Connecting knowledge to memory</p>
      </div>

      {/* Login Card */}
      <div className="max-w-md w-full bg-[#141313] border border-zinc-800/80 rounded-3xl p-8 sm:p-10 shadow-2xl relative overflow-hidden">
        <Sparkles className="absolute -top-6 -right-6 w-32 h-32 text-orange-500/5 rotate-12" />

        <div className="mb-8 relative z-10">
          <h1 className="text-2xl font-bold text-zinc-100 mb-2">Welcome Back</h1>
          <p className="text-sm text-zinc-400">Enter your credentials to access your student portal.</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6 relative z-10">
          <div>
            <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wider mb-2">
              Email or Phone
            </label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
              <input 
                type="text" 
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="doctor@example.com"
                className="w-full bg-[#181717] border border-zinc-800 rounded-xl px-4 py-3.5 pl-12 text-zinc-100 text-sm focus:outline-none focus:border-orange-500 transition"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wider">
                Password
              </label>
              <a href="#" className="text-xs text-orange-500 hover:underline">Forgot?</a>
            </div>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
              <input 
                type="password" 
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-[#181717] border border-zinc-800 rounded-xl px-4 py-3.5 pl-12 text-zinc-100 text-sm focus:outline-none focus:border-orange-500 transition"
              />
            </div>
          </div>

          <button 
            type="submit"
            disabled={isLoading}
            className="w-full py-4 bg-orange-600 hover:bg-orange-500 text-white font-bold rounded-xl transition shadow-sm flex items-center justify-center gap-2 disabled:opacity-70"
          >
            {isLoading ? (
              <span className="animate-pulse">Authenticating...</span>
            ) : (
              <> Sign In <ArrowRight className="w-4 h-4" /> </>
            )}
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-zinc-800/80 text-center relative z-10">
          <p className="text-sm text-zinc-400">
            Don't have an account?{' '}
            <Link href="/signup" className="text-orange-500 font-bold hover:underline">
              Create Account
            </Link>
          </p>
        </div>
      </div>

      <div className="mt-8 text-center text-xs text-zinc-600 flex items-center gap-1.5 justify-center">
        <ShieldCheck className="w-4 h-4 text-zinc-500" /> Secure 256-bit Encrypted Student Portal
      </div>
    </div>
  );
}