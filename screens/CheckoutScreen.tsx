
import React, { useState } from 'react';

interface CheckoutScreenProps {
  onBack: () => void;
  onSuccess: () => void;
  trip?: any;
}

const CheckoutScreen: React.FC<CheckoutScreenProps> = ({ onBack, onSuccess, trip }) => {
  const [paymentMethod, setPaymentMethod] = useState('apple');
  
  const tripTitle = trip?.name || 'Jaipur Pink City';
  const tripImage = trip?.imageUrl || "https://images.unsplash.com/photo-1524230572899-a752b3835840?auto=format&fit=crop&q=80&w=800";
  const price = trip?.price || 12500;
  const total = price + 450 + 125;

  return (
    <div className="flex flex-col h-full bg-[#f5f8f8] font-body animate-in slide-in-from-right duration-300 overflow-hidden">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-[#f5f8f8]/80 backdrop-blur-md px-4 py-4 flex items-center justify-between border-b border-[#dae7e7] shrink-0">
        <button 
          onClick={onBack}
          className="flex items-center justify-center size-10 rounded-full hover:bg-black/5 active:scale-90 transition-all text-slate-gray"
        >
          <span className="material-symbols-outlined font-black">arrow_back</span>
        </button>
        <h1 className="text-lg font-black flex-1 text-center pr-10 text-slate-gray font-display tracking-tight">Checkout</h1>
      </header>

      <main className="flex-1 overflow-y-auto no-scrollbar p-6 space-y-10 pb-40">
        {/* Trip Summary Card */}
        <section>
          <div className="bg-white rounded-[32px] p-5 shadow-sm border border-[#dae7e7] flex items-center gap-5">
            <div className="size-20 rounded-[20px] bg-cover bg-center shrink-0 border border-slate-50" style={{ backgroundImage: `url("${tripImage}")` }} />
            <div className="flex-1 min-w-0">
              <p className="text-[9px] font-black text-primary uppercase tracking-[0.2em] mb-1">Trip Summary</p>
              <h2 className="text-base font-black text-slate-gray truncate">{tripTitle}</h2>
              <p className="text-slate-400 text-xs font-bold mt-1">Aug 15 - Aug 22 • 8 Days</p>
            </div>
          </div>
        </section>

        {/* Payment Method Selection */}
        <section className="space-y-5">
          <h3 className="text-lg font-black text-slate-gray tracking-tight px-1 font-display">Payment Method</h3>
          <div className="flex flex-col gap-3">
            {[
              { id: 'apple', title: 'Apple Pay', desc: 'Express secure checkout', logo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAm_A2Rx_9_px4Hwj9nDkAl6XqOYe6aCF-y30GiSYsMdw95Mssk2PQ40Pd8HNBjP9Z2uRmWiRLQHiGLSh0n3P-E-mIeboptVSOweNJ3j-rRA0SpjHuS2YnRWjA14I2EFiW-elYhLY5DkivXMQdglemppHDuNTBtvGpQZfmiYiP6VAhz2RteXe8dej6TICLtBFXHpx36VFq_ieuMN6-Ho1-BAQHrZU0juKTvC30CXy1MCWM1rE7sJQPzWrIwLus48U7p5EbpTYUYvg', blackBg: true },
              { id: 'google', title: 'Google Pay', desc: 'Fast and convenient', logo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB5EZxhErqptyCCIKkeJLhobxSJlUJmFMOOJbo0WQxmZBjedNybG5CwEIQmEKtdnfFq0N8SnDVpHwlf1DFxkssnBEpCtdjW-a2UbSqvvM1SyAJ0HbD85FSK7irCIhM3IkIZUvntrOXb7DoN83BLmy4AhtCGwWeM9jCZjeVNAIILsxSfapLuXR4aPfgNAkElDP-zK6u8RRv6X7xeTfweV6bv3XnvrE5vo5COGwLts3qhapzrZChamNcVkoPGr91wZ1jgXo9z5CYprA', blackBg: false },
              { id: 'card', title: 'Credit/Debit Card', desc: 'Visa, Mastercard, Amex', icon: 'credit_card' }
            ].map(method => (
              <label 
                key={method.id}
                className={`flex items-center gap-4 p-5 rounded-[28px] border-2 cursor-pointer transition-all active:scale-[0.99] ${paymentMethod === method.id ? 'border-primary bg-primary/5 shadow-lg shadow-primary/5' : 'border-[#dae7e7] bg-white'}`}
              >
                <div className="flex-1 flex items-center gap-4">
                  <div className={`size-11 rounded-xl flex items-center justify-center shrink-0 ${method.blackBg ? 'bg-black' : 'bg-slate-50'} ${method.id === 'card' ? 'bg-primary/10 text-primary' : ''}`}>
                    {method.logo ? (
                      <img src={method.logo} className={`h-4 ${method.blackBg ? 'invert' : ''}`} alt={method.title} />
                    ) : (
                      <span className="material-symbols-outlined text-[24px] filled-icon">{method.icon}</span>
                    )}
                  </div>
                  <div className="min-w-0">
                    <p className="text-[15px] font-black text-slate-gray">{method.title}</p>
                    <p className="text-[11px] text-slate-400 font-bold tracking-tight">{method.desc}</p>
                  </div>
                </div>
                <div className={`size-6 rounded-full border-2 flex items-center justify-center transition-all ${paymentMethod === method.id ? 'bg-primary border-primary shadow-lg' : 'border-slate-200'}`}>
                  <input 
                    type="radio" 
                    name="payment" 
                    checked={paymentMethod === method.id}
                    onChange={() => setPaymentMethod(method.id)}
                    className="hidden" 
                  />
                  {paymentMethod === method.id && <div className="size-2 rounded-full bg-white"></div>}
                </div>
              </label>
            ))}
          </div>
        </section>

        {/* Card Details Form */}
        {paymentMethod === 'card' && (
          <section className="animate-in slide-in-from-top-4 duration-300">
            <div className="flex items-center justify-between px-1 mb-5">
              <h3 className="text-lg font-black text-slate-gray font-display tracking-tight">Card Details</h3>
              <div className="flex items-center gap-1.5 px-3 py-1 bg-primary/5 rounded-full">
                <span className="material-symbols-outlined text-[14px] text-primary filled-icon">lock</span>
                <span className="text-[9px] font-black text-primary uppercase tracking-widest">Secure</span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2 space-y-2">
                <label className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] ml-2">Cardholder Name</label>
                <input className="w-full h-16 px-6 bg-white border border-[#dae7e7] rounded-2xl font-bold text-slate-gray focus:ring-4 focus:ring-primary/10 transition-all outline-none" placeholder="Jonathan Doe" type="text" />
              </div>
              <div className="col-span-2 space-y-2">
                <label className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] ml-2">Card Number</label>
                <div className="relative">
                   <input className="w-full h-16 pl-6 pr-14 bg-white border border-[#dae7e7] rounded-2xl font-bold text-slate-gray focus:ring-4 focus:ring-primary/10 transition-all outline-none" placeholder="0000 0000 0000 0000" type="text" />
                   <span className="absolute right-5 top-1/2 -translate-y-1/2 material-symbols-outlined text-primary filled-icon">check_circle</span>
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] ml-2">Expiry</label>
                <input className="w-full h-16 px-6 bg-white border border-[#dae7e7] rounded-2xl font-bold text-slate-gray focus:ring-4 focus:ring-primary/10 transition-all outline-none" placeholder="MM/YY" type="text" />
              </div>
              <div className="space-y-2">
                <label className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] ml-2">CVV</label>
                <input className="w-full h-16 px-6 bg-white border border-[#dae7e7] rounded-2xl font-bold text-slate-gray focus:ring-4 focus:ring-primary/10 transition-all outline-none" placeholder="***" type="password" />
              </div>
            </div>
          </section>
        )}

        {/* Pricing Summary */}
        <section className="bg-primary/5 p-8 rounded-[32px] border border-dashed border-primary/20 space-y-4">
          <div className="flex justify-between items-center text-sm font-bold text-slate-400">
            <span>Trip Subtotal</span>
            <span className="text-slate-gray">₹{price.toLocaleString()}</span>
          </div>
          <div className="flex justify-between items-center text-sm font-bold text-slate-400">
            <span>Service Fee (5%)</span>
            <span className="text-slate-gray">₹{(price * 0.05).toLocaleString()}</span>
          </div>
          <div className="h-px bg-[#dae7e7] w-full my-2"></div>
          <div className="flex justify-between items-center">
            <span className="text-base font-black text-slate-gray uppercase tracking-widest">Total Amount</span>
            <span className="text-2xl font-black text-primary tracking-tighter">₹{(price * 1.05).toLocaleString()}</span>
          </div>
        </section>
      </main>

      {/* Action Bar */}
      <footer className="fixed bottom-0 left-0 right-0 p-6 bg-white/95 backdrop-blur-xl border-t border-[#dae7e7] z-50 max-w-[450px] mx-auto">
        <div className="flex items-center gap-6 mb-2">
          <div className="flex flex-col min-w-0">
            <p className="text-[9px] font-black text-slate-300 uppercase tracking-widest">Payable Now</p>
            <p className="text-2xl font-black text-slate-gray tracking-tighter truncate">₹{(price * 1.05).toLocaleString()}</p>
          </div>
          <button 
            onClick={onSuccess}
            className="flex-1 bg-primary hover:bg-teal-600 text-white font-[900] h-16 rounded-[24px] shadow-2xl shadow-primary/30 active:scale-[0.98] transition-all flex items-center justify-center gap-3 text-lg"
          >
            <span className="material-symbols-outlined font-black">lock</span>
            Pay Now
          </button>
        </div>
        <p className="text-center text-[8px] text-slate-300 mt-4 font-bold uppercase tracking-wider">By clicking 'Pay Now', you agree to our Terms of Service</p>
      </footer>
    </div>
  );
};

export default CheckoutScreen;
