
import React from 'react';

const Subscription: React.FC = () => {
  const plans = [
    {
      id: 'free',
      name: 'Free',
      price: '0 RWF',
      features: ['Ads supported', 'Standard Quality', 'Public Content Only', 'Kero Assistant Basic'],
      color: 'bg-neutral-900',
      buttonText: 'Current Plan',
      isCurrent: true
    },
    {
      id: 'premium',
      name: 'Premium',
      price: '2,500 RWF',
      period: '/ month',
      features: ['Ad-free Experience', 'Ultra HD Streaming', 'Exclusive Agasobanuye', 'Offline Downloads', 'Kero AI Pro'],
      color: 'bg-red-600',
      buttonText: 'Upgrade with MoMo',
      isCurrent: false,
      isHot: true
    },
    {
      id: 'family',
      name: 'Family',
      price: '6,000 RWF',
      period: '/ month',
      features: ['5 Profiles', 'Shared Library', 'Parental Controls', 'Ultra HD Streaming', 'Exclusive Events'],
      color: 'bg-neutral-800',
      buttonText: 'Get Started',
      isCurrent: false
    }
  ];

  return (
    <div className="py-12 max-w-6xl mx-auto px-4 space-y-12 animate-in fade-in slide-in-from-bottom-10 duration-700">
      <div className="text-center space-y-4">
        <h1 className="text-4xl md:text-6xl font-black tracking-tight">Experience More with <span className="text-red-600">Premium</span></h1>
        <p className="text-neutral-400 max-w-2xl mx-auto text-lg">Support Rwandan creators while enjoying uninterrupted access to the best movies, music, and news.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {plans.map((plan) => (
          <div key={plan.id} className={`relative p-8 rounded-[2.5rem] border border-white/5 flex flex-col h-full shadow-2xl transition-all transform hover:scale-[1.02] ${plan.isHot ? 'ring-4 ring-red-600/20' : ''} ${plan.color === 'bg-neutral-900' ? 'bg-neutral-900/50' : plan.color}`}>
            {plan.isHot && (
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-amber-500 text-black font-black text-[10px] px-6 py-2 rounded-full shadow-xl uppercase tracking-widest">Best Value</div>
            )}
            
            <div className="mb-8">
              <h3 className="text-2xl font-black mb-4">{plan.name}</h3>
              <div className="flex items-baseline space-x-1">
                <span className="text-4xl font-black">{plan.price}</span>
                {plan.period && <span className="text-neutral-400 text-sm">{plan.period}</span>}
              </div>
            </div>

            <ul className="space-y-4 mb-10 flex-grow">
              {plan.features.map((feature, i) => (
                <li key={i} className="flex items-center space-x-3 text-sm">
                  <svg className="w-5 h-5 text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/></svg>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>

            <button className={`w-full py-4 rounded-2xl font-black text-sm transition-all shadow-xl ${
              plan.isCurrent ? 'bg-white/10 text-neutral-400 cursor-not-allowed' : 'bg-white text-black hover:bg-neutral-200 active:scale-95'
            }`}>
              {plan.buttonText}
            </button>
          </div>
        ))}
      </div>

      <div className="bg-neutral-900/30 p-10 rounded-[2.5rem] border border-white/5 text-center space-y-6">
        <h3 className="text-2xl font-black">Secure Payment via National Gateways</h3>
        <div className="flex flex-wrap justify-center gap-8 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
           <div className="h-10 flex items-center"><span className="font-black text-amber-500">MTN MoMo</span></div>
           <div className="h-10 flex items-center"><span className="font-black text-red-500">Airtel Money</span></div>
           <div className="h-10 flex items-center text-xl font-black tracking-tighter">VISA</div>
           <div className="h-10 flex items-center text-xl font-black tracking-tighter">mastercard</div>
        </div>
      </div>
    </div>
  );
};

export default Subscription;
