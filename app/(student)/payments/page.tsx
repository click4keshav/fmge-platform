'use client';
export const dynamic = "force-dynamic";

import { useState } from 'react';
import { 
  CreditCard, 
  Download, 
  CheckCircle2, 
  XCircle, 
  ShieldCheck, 
  FileText, 
  ArrowRight,
  Sparkles
} from 'lucide-react';
import Link from 'next/link';

export default function PaymentsPage() {
  // DEV TOGGLE: Change this to 'false' to see the Empty State!
  const [hasActivePlan, setHasActivePlan] = useState(true);

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-12 pt-2">
      
      {/* Dev Testing Toggle (Remove in Production) */}
      <div className="bg-zinc-900 border border-zinc-700 p-3 rounded-lg flex items-center justify-between mb-8">
        <span className="text-xs font-mono text-zinc-400">Dev Tool: Toggle User State</span>
        <button 
          onClick={() => setHasActivePlan(!hasActivePlan)}
          className="text-xs bg-zinc-800 hover:bg-zinc-700 text-white px-3 py-1 rounded transition border border-zinc-600"
        >
          Currently: {hasActivePlan ? 'Active Plan' : 'No Plan'} (Click to switch)
        </button>
      </div>

      {/* Header */}
      <div className="border-b border-zinc-800/80 pb-6">
        <h1 className="text-2xl font-bold tracking-tight text-zinc-100 flex items-center gap-2">
          <CreditCard className="w-6 h-6 text-orange-500" /> Payments & Subscriptions
        </h1>
        <p className="text-sm text-zinc-400 mt-2">
          Manage your plan validity, view purchase history, and download tax invoices.
        </p>
      </div>

      {hasActivePlan ? (
        /* ============================================================ */
        /* ACTIVE SUBSCRIPTION STATE                                    */
        /* ============================================================ */
        <div className="space-y-12">
          
          {/* Current Subscription Card */}
          <section>
            <h2 className="text-lg font-bold text-zinc-100 mb-4">Current Subscription</h2>
            <div className="bg-[#141313] border border-zinc-800/80 rounded-2xl p-6 sm:p-8 relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-sm">
              <ShieldCheck className="absolute -right-6 -bottom-6 w-40 h-40 text-orange-500/5 rotate-12" />
              
              <div className="relative z-10 flex-1">
                <div className="flex items-center gap-3 mb-4">
                  <span className="flex items-center gap-1 text-xs font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-1 rounded">
                    <CheckCircle2 className="w-3 h-3" /> ACTIVE
                  </span>
                  <span className="text-xs font-medium text-zinc-500">
                    Valid till Nov 4, 2027
                  </span>
                </div>
                
                <h3 className="text-2xl font-bold text-zinc-100 mb-2">Plan B (QBank + Test Series)</h3>
                <p className="text-sm text-zinc-400 mb-6">
                  Includes full access to Subject Modules, Grand Tests, and PYQs.
                </p>

                {/* Progress Bar */}
                <div className="max-w-md">
                  <div className="flex justify-between text-xs font-semibold mb-2">
                    <span className="text-orange-500">365 days remaining</span>
                    <span className="text-zinc-500">365 days total</span>
                  </div>
                  <div className="h-2 w-full bg-zinc-900 rounded-full overflow-hidden">
                    <div className="h-full bg-orange-500 rounded-full w-full"></div>
                  </div>
                </div>
              </div>

              <div className="relative z-10 shrink-0">
                <Link 
                  href="/plans"
                  className="inline-flex items-center justify-center bg-zinc-800 hover:bg-zinc-700 text-zinc-100 text-sm font-bold px-6 py-3 rounded-xl transition shadow-sm border border-zinc-700"
                >
                  Upgrade Plan
                </Link>
              </div>
            </div>
          </section>

          {/* Payment History Table */}
          <section>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-zinc-100">Payment History</h2>
              <span className="text-xs text-zinc-500 flex items-center gap-1">
                <ShieldCheck className="w-3 h-3" /> Secure payments powered by Razorpay
              </span>
            </div>
            
            <div className="bg-[#141313] border border-zinc-800/80 rounded-2xl overflow-hidden shadow-sm overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="text-xs text-zinc-500 uppercase bg-[#181717] border-b border-zinc-800/80">
                  <tr>
                    <th className="px-6 py-4 font-bold">Date</th>
                    <th className="px-6 py-4 font-bold">Order ID</th>
                    <th className="px-6 py-4 font-bold">Plan Details</th>
                    <th className="px-6 py-4 font-bold">Amount</th>
                    <th className="px-6 py-4 font-bold">Status</th>
                    <th className="px-6 py-4 font-bold text-center">Invoice</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-800/50 text-zinc-300">
                  <tr className="hover:bg-zinc-900/50 transition">
                    <td className="px-6 py-4 font-medium">Nov 4, 2026</td>
                    <td className="px-6 py-4 font-mono text-xs text-zinc-500">ORDER-FRX-95812</td>
                    <td className="px-6 py-4">Plan B (1 Year)</td>
                    <td className="px-6 py-4 font-semibold text-zinc-100">₹11,999</td>
                    <td className="px-6 py-4">
                      <span className="flex items-center gap-1.5 text-emerald-400 font-medium">
                        <CheckCircle2 className="w-4 h-4" /> Success
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <button className="text-zinc-500 hover:text-zinc-300 transition">
                        <Download className="w-4 h-4 mx-auto" />
                      </button>
                    </td>
                  </tr>
                  <tr className="hover:bg-zinc-900/50 transition">
                    <td className="px-6 py-4 font-medium">May 10, 2026</td>
                    <td className="px-6 py-4 font-mono text-xs text-zinc-500">ORDER-FRX-10293</td>
                    <td className="px-6 py-4">Plan A (6 Months)</td>
                    <td className="px-6 py-4 font-semibold text-zinc-100">₹5,999</td>
                    <td className="px-6 py-4">
                      <span className="flex items-center gap-1.5 text-emerald-400 font-medium">
                        <CheckCircle2 className="w-4 h-4" /> Success
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <button className="text-zinc-500 hover:text-zinc-300 transition">
                        <Download className="w-4 h-4 mx-auto" />
                      </button>
                    </td>
                  </tr>
                  <tr className="hover:bg-zinc-900/50 transition opacity-60">
                    <td className="px-6 py-4 font-medium">May 10, 2026</td>
                    <td className="px-6 py-4 font-mono text-xs text-zinc-500">ORDER-FRX-00921</td>
                    <td className="px-6 py-4">Plan A (6 Months)</td>
                    <td className="px-6 py-4 font-semibold text-zinc-100">₹5,999</td>
                    <td className="px-6 py-4">
                      <span className="flex items-center gap-1.5 text-red-400 font-medium">
                        <XCircle className="w-4 h-4" /> Failed
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="text-zinc-600">-</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

        </div>
      ) : (
        /* ============================================================ */
        /* EMPTY STATE (No Active Subscription)                         */
        /* ============================================================ */
        <div className="bg-[#141313] border border-zinc-800/80 rounded-2xl p-10 sm:p-16 text-center shadow-sm max-w-3xl mx-auto mt-12 relative overflow-hidden">
          <Sparkles className="absolute top-10 left-10 w-6 h-6 text-orange-500/20 animate-pulse" />
          <Sparkles className="absolute bottom-10 right-10 w-8 h-8 text-orange-500/20 animate-pulse delay-700" />
          
          <div className="w-20 h-20 bg-zinc-900 rounded-full flex items-center justify-center mx-auto mb-6 border border-zinc-800">
            <FileText className="w-10 h-10 text-zinc-600" />
          </div>
          
          <h2 className="text-2xl font-bold text-zinc-100 mb-3">No Active Subscription</h2>
          <p className="text-zinc-400 max-w-md mx-auto mb-8 leading-relaxed">
            You are currently on the free tier. Upgrade your account to unlock full access to the QBank, Grand Tests, and Advanced Analytics.
          </p>
          
          <Link 
            href="/plans"
            className="inline-flex items-center justify-center bg-orange-600 hover:bg-orange-500 text-white text-sm font-bold px-8 py-3.5 rounded-xl transition shadow-sm gap-2"
          >
            View Preparation Plans <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      )}

    </div>
  );
}