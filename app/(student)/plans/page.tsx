'use client';

import { useState } from 'react';
import { 
  CheckCircle2, 
  X, 
  Sparkles, 
  ShieldCheck, 
  CreditCard, 
  ArrowRight 
} from 'lucide-react';

type Plan = {
  id: string;
  tier: string;
  name: string;
  description: string;
  price: number;
  validity: string;
  isPopular: boolean;
  optionId: string; // Maps to your database PlanOption id if needed, or pass fallback
  features: string[];
};

const pricingPlans: Plan[] = [
  {
    id: "plan-a",
    tier: "Plan A",
    name: "Test Series",
    description: "Grand Tests & Subject-wise Mock Exams",
    price: 5999,
    validity: "year",
    isPopular: false,
    optionId: "cmw1yqbpt0002ulqful9d40pl", // From your Supabase screenshot or use for mapping
    features: [
      "Full Grand Tests & PYTs",
      "Detailed Performance Analytics",
      "Detailed Explanations"
    ]
  },
  {
    id: "plan-b",
    tier: "Plan B",
    name: "QBank + Test Series",
    description: "Comprehensive question bank & exam simulation",
    price: 11999,
    validity: "year",
    isPopular: true,
    optionId: "cmw1yqbpt0002ulqful9d40pl",
    features: [
      "All Test Series Features",
      "Custom QBank Modules",
      "Image & One-Liner Bank"
    ]
  },
  {
    id: "plan-c",
    tier: "Plan C",
    name: "Mentorship",
    description: "All previous benefits + 1:1 expert guidance",
    price: 43949,
    validity: "year",
    isPopular: false,
    optionId: "cmw1yqbpt0002ulqful9d40pl",
    features: [
      "QBank & Test Series Included",
      "Personal 1:1 Mentor & Strategy",
      "Direct Tutor Chat Support"
    ]
  }
];

export default function PlansPage() {
  const [activePlanId, setActivePlanId] = useState<string | null>(null);
  const [checkoutPlan, setCheckoutPlan] = useState<Plan | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const activePlanPrice = pricingPlans.find(p => p.id === activePlanId)?.price || 0;

  // Real Razorpay Checkout Handoff
  const handleRazorpayCheckout = async () => {
    if (!checkoutPlan) return;
    setIsProcessing(true);

    try {
      // 1. Call your backend order creation route
      const response = await fetch('/api/payments/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: "user_test_aditya", // Replace with real session userId if available
          planId: checkoutPlan.id,
          optionId: checkoutPlan.optionId,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || "Failed to initiate payment order");
      }

      // 2. Load Razorpay script dynamically
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.async = true;
      document.body.appendChild(script);

      script.onload = () => {
        const options = {
          key: data.keyId,
          amount: data.amount, // amount in paise from backend
          currency: data.currency,
          name: "Fornix FMGE",
          description: checkoutPlan.name,
          order_id: data.orderId,
          handler: async function (response: any) {
            alert(`Payment Successful! Payment ID: ${response.razorpay_payment_id}`);
            setIsProcessing(false);
            setCheckoutPlan(null);
            window.location.href = '/dashboard';
          },
          prefill: {
            name: "Aditya",
            email: "aditya@gmail.com",
          },
          theme: {
            color: "#f97316",
          },
        };

        const paymentWindow = new (window as any).Razorpay(options);
        paymentWindow.open();
        paymentWindow.on('payment.failed', function (response: any) {
          alert(`Payment failed: ${response.error.description}`);
          setIsProcessing(false);
        });
      };
    } catch (err: any) {
      console.error("Checkout error:", err);
      alert(err.message || "Something went wrong initiating checkout.");
      setIsProcessing(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-16 px-4 pt-2">
      
      {/* Dev Testing Toggle */}
      <div className="bg-orange-500/10 border border-orange-500/50 p-4 rounded-xl flex items-center justify-between shadow-[0_0_15px_rgba(249,115,22,0.1)]">
        <span className="text-sm font-bold text-orange-400">🛠 Dev Tool: Storefront State</span>
        <button 
          onClick={() => setActivePlanId(activePlanId ? null : 'plan-b')}
          className="text-sm font-bold bg-orange-600 hover:bg-orange-500 text-white px-4 py-2 rounded-lg transition shadow-sm"
        >
          Currently: {activePlanId ? 'Owns Plan B' : 'New User (No Plan)'} (Click to switch)
        </button>
      </div>

      <div className="text-center max-w-2xl mx-auto pt-4">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-zinc-100 mb-4">
          Choose Your Preparation Plan
        </h1>
        <p className="text-zinc-400 leading-relaxed">
          Select the right tier to accelerate your medical board success.
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto items-stretch">
        {pricingPlans.map((plan) => {
          const isCurrentPlan = activePlanId === plan.id;
          const isDowngrade = activePlanId !== null && plan.price < activePlanPrice;
          
          return (
            <div 
              key={plan.id}
              className={`relative bg-[#141313] rounded-3xl p-8 flex flex-col transition-all duration-300 ${
                plan.isPopular && !isDowngrade
                  ? 'border-2 border-orange-500 shadow-[0_0_40px_rgba(249,115,22,0.1)] lg:-translate-y-2 z-10' 
                  : 'border border-zinc-800/80 hover:border-zinc-700'
              } ${isCurrentPlan || isDowngrade ? 'opacity-70' : ''}`}
            >
              {plan.isPopular && !isDowngrade && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-orange-500 text-white text-xs font-bold uppercase tracking-wider px-4 py-1.5 rounded-full flex items-center gap-1.5 shadow-lg">
                  <Sparkles className="w-3 h-3" /> Most Popular
                </div>
              )}

              <div className="mb-6">
                <span className="text-orange-500 text-xs font-bold uppercase tracking-wider mb-2 block">{plan.tier}</span>
                <h2 className="text-2xl font-bold text-zinc-100 mb-2">{plan.name}</h2>
                <p className="text-sm text-zinc-400 min-h-[40px]">{plan.description}</p>
              </div>

              <div className="mb-8">
                <div className="flex items-end gap-1">
                  <span className="text-4xl font-bold text-zinc-100">₹{plan.price.toLocaleString()}</span>
                  <span className="text-sm text-zinc-500 mb-1">/ {plan.validity}</span>
                </div>
              </div>

              <ul className="space-y-4 mb-10 flex-1">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                    <span className="text-sm text-zinc-300">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              <button
                onClick={() => !isCurrentPlan && !isDowngrade && setCheckoutPlan(plan)}
                disabled={isCurrentPlan || isDowngrade}
                className={`w-full py-4 rounded-xl text-sm font-bold transition shadow-sm flex items-center justify-center gap-2 ${
                  isCurrentPlan
                    ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 cursor-default'
                    : isDowngrade
                    ? 'bg-zinc-900 text-zinc-600 border border-zinc-800 cursor-not-allowed'
                    : plan.isPopular
                    ? 'bg-orange-600 hover:bg-orange-500 text-white'
                    : 'bg-zinc-800 hover:bg-zinc-700 text-zinc-100'
                }`}
              >
                {isCurrentPlan ? (
                  <> <CheckCircle2 className="w-4 h-4" /> Active Plan </>
                ) : isDowngrade ? (
                  <> Included in Current Plan </>
                ) : (
                  <> {activePlanId ? 'Upgrade' : 'Get Started'} <ArrowRight className="w-4 h-4" /> </>
                )}
              </button>
            </div>
          );
        })}
      </div>

      {checkoutPlan && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
          <div className="absolute inset-0 bg-[#0f0e0e]/90 backdrop-blur-sm" onClick={() => setCheckoutPlan(null)}></div>
          <div className="relative bg-[#141313] border border-zinc-800/80 rounded-3xl w-full max-w-lg shadow-2xl flex flex-col max-h-[90vh]">
            <div className="p-6 sm:p-8 border-b border-zinc-800/80 flex items-center justify-between bg-[#181717]">
              <div>
                <h3 className="text-xl font-bold text-zinc-100">Order Summary</h3>
                <p className="text-sm text-zinc-400 mt-1">Review your plan details before payment.</p>
              </div>
              <button onClick={() => setCheckoutPlan(null)} className="w-8 h-8 flex items-center justify-center rounded-full bg-zinc-800 text-zinc-400 hover:text-zinc-100">
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="p-6 sm:p-8 overflow-y-auto">
              <div className="bg-[#0f0e0e] border border-zinc-800 rounded-2xl p-5 mb-8">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h4 className="font-bold text-orange-500 text-lg">{checkoutPlan.name}</h4>
                    <p className="text-sm text-zinc-400 mt-0.5">Validity: 1 {checkoutPlan.validity}</p>
                  </div>
                  <span className="font-bold text-zinc-100 text-lg">₹{checkoutPlan.price.toLocaleString()}</span>
                </div>
              </div>
              <div className="space-y-4 mb-8">
                <h4 className="text-sm font-bold text-zinc-100 uppercase tracking-wider mb-2">Price Breakdown</h4>
                <div className="flex justify-between text-sm text-zinc-400"><span>Subtotal</span><span>₹{Math.round(checkoutPlan.price / 1.18).toLocaleString()}</span></div>
                <div className="flex justify-between text-sm text-zinc-400"><span>GST (18%)</span><span>₹{Math.round(checkoutPlan.price - (checkoutPlan.price / 1.18)).toLocaleString()}</span></div>
                <div className="h-px bg-zinc-800/80 my-4"></div>
                <div className="flex justify-between text-lg font-bold text-zinc-100"><span>Total Amount</span><span>₹{checkoutPlan.price.toLocaleString()}</span></div>
              </div>
              <div className="flex items-center gap-3 bg-emerald-500/10 border border-emerald-500/20 p-4 rounded-xl text-emerald-400 text-sm font-medium">
                <ShieldCheck className="w-5 h-5 shrink-0" /><p>Payments are 100% secure and encrypted via Razorpay.</p>
              </div>
            </div>
            <div className="p-6 sm:p-8 border-t border-zinc-800/80 bg-[#181717] mt-auto">
              <button onClick={handleRazorpayCheckout} disabled={isProcessing} className="w-full py-4 bg-orange-600 hover:bg-orange-500 text-white font-bold rounded-xl flex items-center justify-center gap-2 disabled:opacity-70">
                {isProcessing ? <span className="animate-pulse">Initializing Gateway...</span> : <> <CreditCard className="w-5 h-5" /> Proceed to Pay ₹{checkoutPlan.price.toLocaleString()} </>}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}