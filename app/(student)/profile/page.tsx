'use client';

import { useState } from 'react';
import { 
  User, 
  Mail, 
  Phone, 
  GraduationCap, 
  Building2, 
  Bell, 
  Moon, 
  ShieldCheck, 
  Save, 
  CheckCircle2,
  Camera
} from 'lucide-react';

export default function ProfilePage() {
  const [profile, setProfile] = useState({
    fullName: 'Dr. Keshav Upadhyay',
    email: 'doctor@example.com',
    phone: '+91 98765 43210',
    academicYear: 'Final Year MBBS',
    medicalCollege: 'Perm State Medical University',
    emailNotifications: true,
    testAlerts: true,
    darkMode: true
  });

  const [isSaved, setIsSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaved(true);
    setTimeout(() => {
      setIsSaved(false);
    }, 3000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-16 pt-2">
      
      {/* Header */}
      <div className="border-b border-zinc-800/80 pb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-zinc-100 flex items-center gap-2">
            <User className="w-6 h-6 text-orange-500" /> Student Profile & Settings
          </h1>
          <p className="text-sm text-zinc-400 mt-2">
            Manage your personal credentials, academic background, and portal preferences.
          </p>
        </div>

        {isSaved && (
          <div className="flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 px-4 py-2 rounded-xl text-xs font-bold animate-in fade-in">
            <CheckCircle2 className="w-4 h-4" /> Changes Saved Successfully
          </div>
        )}
      </div>

      <form onSubmit={handleSave} className="space-y-8">
        
        {/* 1. Avatar & Personal Info Card */}
        <div className="bg-[#141313] border border-zinc-800/80 rounded-2xl p-6 sm:p-8 shadow-sm">
          <h2 className="text-lg font-bold text-zinc-100 mb-6 flex items-center gap-2">
            <User className="w-5 h-5 text-orange-500" /> Personal Information
          </h2>

          <div className="flex flex-col sm:flex-row items-center gap-6 mb-8 pb-6 border-b border-zinc-800/80">
            <div className="relative group">
              <div className="w-24 h-24 rounded-full bg-orange-500/10 border-2 border-orange-500/30 flex items-center justify-center text-orange-400 text-2xl font-bold">
                {profile.fullName.split(' ').map(n => n[0]).join('').slice(0, 2)}
              </div>
              <label className="absolute inset-0 rounded-full bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition cursor-pointer text-white text-xs font-semibold gap-1">
                <Camera className="w-4 h-4" /> Edit
                <input type="file" className="hidden" />
              </label>
            </div>
            <div className="text-center sm:text-left">
              <h3 className="text-xl font-bold text-zinc-100">{profile.fullName}</h3>
              <p className="text-sm text-zinc-400 mt-0.5">{profile.medicalCollege}</p>
              <span className="inline-block mt-2 bg-orange-500/10 text-orange-400 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded border border-orange-500/20">
                {profile.academicYear}
              </span>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wider mb-2">
                Full Name
              </label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
                <input 
                  type="text" 
                  value={profile.fullName}
                  onChange={(e) => setProfile({...profile, fullName: e.target.value})}
                  className="w-full bg-[#181717] border border-zinc-800 rounded-xl px-4 py-3 pl-12 text-zinc-100 text-sm focus:outline-none focus:border-orange-500 transition"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wider mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
                <input 
                  type="email" 
                  value={profile.email}
                  onChange={(e) => setProfile({...profile, email: e.target.value})}
                  className="w-full bg-[#181717] border border-zinc-800 rounded-xl px-4 py-3 pl-12 text-zinc-100 text-sm focus:outline-none focus:border-orange-500 transition"
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
                  value={profile.phone}
                  onChange={(e) => setProfile({...profile, phone: e.target.value})}
                  className="w-full bg-[#181717] border border-zinc-800 rounded-xl px-4 py-3 pl-12 text-zinc-100 text-sm focus:outline-none focus:border-orange-500 transition"
                />
              </div>
            </div>
          </div>
        </div>

        {/* 2. Academic Background (Captured from Onboarding) */}
        <div className="bg-[#141313] border border-zinc-800/80 rounded-2xl p-6 sm:p-8 shadow-sm">
          <h2 className="text-lg font-bold text-zinc-100 mb-6 flex items-center gap-2">
            <GraduationCap className="w-5 h-5 text-orange-500" /> Academic Background
          </h2>

          <div className="grid sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wider mb-2">
                Academic Year / Status
              </label>
              <div className="relative">
                <GraduationCap className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500 pointer-events-none" />
                <select
                  value={profile.academicYear}
                  onChange={(e) => setProfile({...profile, academicYear: e.target.value})}
                  className="w-full bg-[#181717] border border-zinc-800 rounded-xl px-4 py-3 pl-12 text-zinc-100 text-sm focus:outline-none focus:border-orange-500 transition appearance-none cursor-pointer"
                >
                  <option value="Final Year MBBS">Final Year MBBS</option>
                  <option value="Medical Intern">Medical Intern</option>
                  <option value="Post-Intern / Graduate">Post-Intern / Graduate</option>
                  <option value="Foreign Medical Graduate (FMG)">Foreign Medical Graduate (FMG)</option>
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
                  value={profile.medicalCollege}
                  onChange={(e) => setProfile({...profile, medicalCollege: e.target.value})}
                  className="w-full bg-[#181717] border border-zinc-800 rounded-xl px-4 py-3 pl-12 text-zinc-100 text-sm focus:outline-none focus:border-orange-500 transition"
                />
              </div>
            </div>
          </div>
        </div>

        {/* 3. Preferences & Notifications */}
        <div className="bg-[#141313] border border-zinc-800/80 rounded-2xl p-6 sm:p-8 shadow-sm">
          <h2 className="text-lg font-bold text-zinc-100 mb-6 flex items-center gap-2">
            <Bell className="w-5 h-5 text-orange-500" /> Preferences & Notifications
          </h2>

          <div className="space-y-4">
            <label className="flex items-center justify-between p-4 bg-[#181717] border border-zinc-800 rounded-xl cursor-pointer hover:border-zinc-700 transition">
              <div>
                <p className="font-bold text-sm text-zinc-200">Email Notifications</p>
                <p className="text-xs text-zinc-500">Receive performance updates and high-yield question digests.</p>
              </div>
              <input 
                type="checkbox" 
                checked={profile.emailNotifications}
                onChange={(e) => setProfile({...profile, emailNotifications: e.target.checked})}
                className="w-5 h-5 accent-orange-500 cursor-pointer rounded"
              />
            </label>

            <label className="flex items-center justify-between p-4 bg-[#181717] border border-zinc-800 rounded-xl cursor-pointer hover:border-zinc-700 transition">
              <div>
                <p className="font-bold text-sm text-zinc-200">Grand Test Reminders</p>
                <p className="text-xs text-zinc-500">Get notified when new national Grand Tests go live.</p>
              </div>
              <input 
                type="checkbox" 
                checked={profile.testAlerts}
                onChange={(e) => setProfile({...profile, testAlerts: e.target.checked})}
                className="w-5 h-5 accent-orange-500 cursor-pointer rounded"
              />
            </label>

            <label className="flex items-center justify-between p-4 bg-[#181717] border border-zinc-800 rounded-xl cursor-pointer hover:border-zinc-700 transition">
              <div>
                <p className="font-bold text-sm text-zinc-200">Dark Mode Theme</p>
                <p className="text-xs text-zinc-500">Optimized dark theme for late-night study sessions.</p>
              </div>
              <input 
                type="checkbox" 
                checked={profile.darkMode}
                onChange={(e) => setProfile({...profile, darkMode: e.target.checked})}
                className="w-5 h-5 accent-orange-500 cursor-pointer rounded"
              />
            </label>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end">
          <button 
            type="submit"
            className="px-8 py-4 bg-orange-600 hover:bg-orange-500 text-white font-bold rounded-xl transition shadow-sm flex items-center gap-2"
          >
            <Save className="w-5 h-5" /> Save Changes
          </button>
        </div>

      </form>
    </div>
  );
}