'use client';

import { Suspense } from "react";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  BookOpen, 
  Database,
  MessageSquare, 
  BarChart2, 
  Bookmark, 
  CreditCard, 
  User,
  LogOut,
  Sparkles
} from 'lucide-react';
import "../globals.css";

export default function StudentLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const navItems = [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Tests', href: '/tests', icon: BookOpen },
    { name: 'QBank', href: '/qbank', icon: Database },
    { name: 'Chat', href: '/chat', icon: MessageSquare },
    { name: 'Results', href: '/results', icon: BarChart2 },
    { name: 'Bookmarks', href: '/bookmarks', icon: Bookmark },
    { name: 'Plans', href: '/plans', icon: Sparkles },
    { name: 'Payments', href: '/payments', icon: CreditCard },
    { name: 'Profile', href: '/profile', icon: User },
  ];

  return (
    <div className="min-h-screen bg-[#0f0e0e] text-zinc-100 flex font-sans">
      {/* Left Sidebar */}
      <aside className="w-64 bg-[#141313] border-r border-zinc-800/80 flex flex-col justify-between hidden md:flex sticky top-0 h-screen">
        <div>
          {/* Logo Brand */}
          <Link href="/dashboard" className="block p-6 border-b border-zinc-800/80 hover:bg-zinc-900/30 transition">
            <h1 className="text-xl font-bold tracking-tight text-orange-500">
              Fornix
            </h1>
            <p className="text-[10px] text-zinc-400 italic mt-0.5">connecting knowledge to memory</p>
            <span className="text-[10px] bg-zinc-800 text-zinc-300 px-2 py-0.5 rounded font-medium mt-2 inline-block">
              STUDENT PORTAL
            </span>
          </Link>

          {/* Nav Links */}
          <nav className="p-4 space-y-1.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition ${
                    isActive
                      ? 'bg-orange-500/10 text-orange-400 border border-orange-500/20'
                    : 'text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800/50'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* User Footer Profile & Logout */}
        <div className="p-4 border-t border-zinc-800/80 bg-[#121111] flex items-center justify-between">
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="w-9 h-9 rounded-full bg-orange-500/20 text-orange-400 font-bold flex items-center justify-center text-sm shrink-0">
              A
            </div>
            <div className="overflow-hidden">
              <p className="text-sm font-semibold truncate text-zinc-200">Aditya</p>
              <p className="text-xs text-zinc-500 truncate">aditya@gmail.com</p>
            </div>
          </div>
          <Link href="/" title="Log Out" className="text-zinc-400 hover:text-orange-400 transition p-2">
            <LogOut className="w-4 h-4" />
          </Link>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 min-h-screen overflow-y-auto bg-[#0f0e0e] p-8">
        {children}
      </main>
    </div>
  );
}