'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Mail, Lock, User, Phone, GraduationCap, Building2, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';
import Link from 'next/link';

export default function SignupPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    academicYear: 'Final Year',
    medicalCollege: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate user creation and profile population
    setTimeout(() => {
      setIsLoading(false);
      router.push('/dashboard');
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-[#0f0e0e] text-zinc-100 flex flex-col justify-center items-center p-6 py-12 font-sans selection:bg-orange-500/30">
      
      {/* Brand Header */}
      <div className="mb-6 text-center">
        <Link href="/" className="text-3xl font-bold tracking-tight text-orange-500 hover:text-orange-400 transition inline-block">
          Fornix
        </Link>
        <p className="text-xs text-zinc-500 tracking-wider uppercase mt-1">Connecting knowledge to memory</p>
      </div>

      {/* Signup Card */}
      <div className="max-w-xl w-full bg-[#141313] border border-zinc-800/80 rounded-3xl p-8 sm:p-10 shadow-2xl relative overflow-hidden">
        <Sparkles className="absolute -top-6 -right-6 w-32 h-32 text-orange-500/5 rotate-12" />

        <div className="mb-8 relative z-10">
          <h1 className="text-2xl font-bold text-zinc-100 mb-2">Create Your Student Account</h1>
          <p className="text-sm text-zinc-400">Join thousands of aspirants preparing for FMGE with precision.</p>
        </div>

        <form onSubmit={handleSignup} className="space-y-5 relative z-10">
          
          {/* Full Name */}
          <div>
            <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wider mb-2">
              Full Name
            </label>
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
              <input 
                type="text" 
                required
                value={formData.fullName}
                onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                placeholder="Dr. Keshav Upadhyay"
                className="w-full bg-[#181717] border border-zinc-800 rounded-xl px-4 py-3.5 pl-12 text-zinc-100 text-sm focus:outline-none focus:border-orange-500 transition"
              />
            </div>
          </div>

          {/* Grid for Email & Phone */}
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wider mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
                <input 
                  type="email" 
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  placeholder="doctor@example.com"
                  className="w-full bg-[#181717] border border-zinc-800 rounded-xl px-4 py-3.5 pl-12 text-zinc-100 text-sm focus:outline-none focus:border-orange-500 transition"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wider mb-2">
                Phone Number
              </label>
              <div className="relative">
                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
                <input 
                  type="tel" 
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  placeholder="+91 98765 43210"
                  className="w-full bg-[#181717] border border-zinc-800 rounded-xl px-4 py-3.5 pl-12 text-zinc-100 text-sm focus:outline-none focus:border-orange-500 transition"
                />
              </div>
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wider mb-2">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
              <input 
                type="password" 
                required
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                placeholder="Create a strong password"
                className="w-full bg-[#181717] border border-zinc-800 rounded-xl px-4 py-3.5 pl-12 text-zinc-100 text-sm focus:outline-none focus:border-orange-500 transition"
              />
            </div>
          </div>

          {/* Marrow-Style Onboarding Fields */}
          <div className="grid sm:grid-cols-2 gap-4 pt-2">
            <div>
              <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wider mb-2">
                Academic Year / Status
              </label>
              <div className="relative">
                <GraduationCap className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500 pointer-events-none" />
                <select
                  value={formData.academicYear}
                  onChange={(e) => setFormData({...formData, academicYear: e.target.value})}
                  className="w-full bg-[#181717] border border-zinc-800 rounded-xl px-4 py-3.5 pl-12 text-zinc-100 text-sm focus:outline-none focus:border-orange-500 transition appearance-none cursor-pointer"
                >
                  <option value="Final Year">Final Year MBBS</option>
                  <option value="Intern">Medical Intern</option>
                  <option value="Post-Intern / Graduate">Post-Intern / Graduate</option>
                  <option value="Foreign Medical Graduate">Foreign Medical Graduate (FMG)</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wider mb-2">
                Medical College / University
              </label>
              <div className="relative">
                <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
                <input 
                  type="text" 
                  required
                  value={formData.medicalCollege}
                  onChange={(e) => setFormData({...formData, medicalCollege: e.target.value})}
                  placeholder="e.g. St. Xavier's / Perm State"
                  className="w-full bg-[#181717] border border-zinc-800 rounded-xl px-4 py-3.5 pl-12 text-zinc-100 text-sm focus:outline-none focus:border-orange-500 transition"
                />
              </div>
            </div>
          </div>

          <div className="pt-4">
            <button 
              type="submit"
              disabled={isLoading}
              className="w-full py-4 bg-orange-600 hover:bg-orange-500 text-white font-bold rounded-xl transition shadow-sm flex items-center justify-center gap-2 disabled:opacity-70"
            >
              {isLoading ? (
                <span className="animate-pulse">Setting up your profile...</span>
              ) : (
                <> Complete Registration & Start <ArrowRight className="w-4 h-4" /> </>
              )}
            </button>
          </div>
        </form>

        <div className="mt-8 pt-6 border-t border-zinc-800/80 text-center relative z-10">
          <p className="text-sm text-zinc-400">
            Already have an account?{' '}
            <Link href="/login" className="text-orange-500 font-bold hover:underline">
              Sign In
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