
import React from 'react';

interface ReviewBookingScreenProps {
  onBack: () => void;
  onProceed: () => void;
  trip?: any;
}

const ReviewBookingScreen: React.FC<ReviewBookingScreenProps> = ({ onBack, onProceed, trip }) => {
  const tripTitle = trip?.name || 'Jaipur Pink City';
  const tripLocation = trip?.country ? `${tripTitle}, ${trip.country}` : 'Jaipur, Rajasthan';
  const tripImage = trip?.imageUrl || "https://images.unsplash.com/photo-1524230572899-a752b3835840?auto=format&fit=crop&q=80&w=800";
  const price = trip?.price || 12500;

  return (
    <div className="flex flex-col h-full bg-[#fbfaf9] font-body animate-in slide-in-from-right duration-300 overflow-hidden">
      {/* Top App Bar */}
      <header className="sticky top-0 z-50 bg-[#fbfaf9]/80 backdrop-blur-md px-4 py-4 flex items-center justify-between border-b border-black/5 shrink-0">
        <button 
          onClick={onBack}
          className="flex items-center justify-center size-10 rounded-full hover:bg-black/5 active:scale-90 transition-all text-slate-gray"
        >
          <span className="material-symbols-outlined font-black">arrow_back</span>
        </button>
        <h1 className="text-lg font-black flex-1 text-center pr-10 text-slate-gray font-display tracking-tight">Review Booking</h1>
      </header>

      <main className="flex-1 overflow-y-auto no-scrollbar px-6 space-y-8 pt-6 pb-40">
        {/* Trip Hero */}
        <div className="relative rounded-[32px] overflow-hidden aspect-[16/9] shadow-2xl group border border-white">
          <div 
            className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105" 
            style={{ backgroundImage: `linear-gradient(0deg, rgba(0, 0, 0, 0.6) 0%, rgba(0, 0, 0, 0) 50%), url("${tripImage}")` }}
          />
          <div className="absolute bottom-0 left-0 p-6 w-full">
            <h2 className="text-white text-2xl font-black leading-tight tracking-tight">{tripTitle}</h2>
            <p className="text-white/80 text-xs font-bold flex items-center gap-1 mt-1 uppercase tracking-widest">
              <span className="material-symbols-outlined text-[14px]">location_on</span>
              {tripLocation}
            </p>
          </div>
        </div>

        {/* Trip Details Section */}
        <section className="space-y-4">
          <h3 className="text-xs font-black uppercase tracking-[0.2em] text-slate-300 ml-1">Trip Details</h3>
          <div className="grid grid-cols-1 gap-3">
            <div className="bg-white p-5 rounded-[24px] flex items-center gap-4 border border-slate-50 shadow-sm transition-all active:scale-[0.99]">
              <div className="bg-primary/10 p-3 rounded-2xl text-primary shrink-0">
                <span className="material-symbols-outlined filled-icon">calendar_today</span>
              </div>
              <div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Dates</p>
                <p className="text-base font-black text-slate-gray">Oct 12 - Oct 18, 2024</p>
              </div>
            </div>
            <div className="bg-white p-5 rounded-[24px] flex items-center gap-4 border border-slate-50 shadow-sm transition-all active:scale-[0.99]">
              <div className="bg-primary/10 p-3 rounded-2xl text-primary shrink-0">
                <span className="material-symbols-outlined filled-icon">group</span>
              </div>
              <div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Travelers</p>
                <p className="text-base font-black text-slate-gray">2 Adults</p>
              </div>
            </div>
          </div>
        </section>

        {/* Vibe Section */}
        <section className="space-y-4">
          <div className="flex justify-between items-end px-1">
            <h3 className="text-xs font-black uppercase tracking-[0.2em] text-slate-300">Your Selected Vibe</h3>
            <button className="text-primary text-[10px] font-black uppercase tracking-widest">Change</button>
          </div>
          <div className="flex flex-wrap gap-2.5">
            {[
              { icon: 'self_improvement', label: 'Chill' },
              { icon: 'hiking', label: 'Adventure' },
              { icon: 'nightlife', label: 'Social' }
            ].map(vibe => (
              <span key={vibe.label} className="px-5 py-2.5 bg-[#fbcbbd]/10 text-[#d45d3e] border border-[#fbcbbd]/30 rounded-full text-[11px] font-black uppercase tracking-wider flex items-center gap-2">
                <span className="material-symbols-outlined text-[18px] filled-icon">{vibe.icon}</span>
                {vibe.label}
              </span>
            ))}
          </div>
        </section>

        {/* Financial Breakdown */}
        <section className="bg-white p-8 rounded-[32px] border border-slate-50 shadow-sm space-y-6">
          <h3 className="text-base font-black text-slate-gray border-b border-slate-50 pb-4">Price Summary</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center text-sm font-bold text-slate-400">
              <span>Base Price (6 nights)</span>
              <span className="text-slate-gray">₹{price.toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center text-sm font-bold text-slate-400">
              <span>Service Fee</span>
              <span className="text-slate-gray">₹450</span>
            </div>
            <div className="flex justify-between items-center text-sm font-bold text-slate-400">
              <span>Taxes & Fees</span>
              <span className="text-slate-gray">₹125</span>
            </div>
          </div>
          <div className="pt-6 border-t border-slate-50 flex justify-between items-center">
            <span className="text-lg font-black text-slate-gray">Total (INR)</span>
            <span className="text-3xl font-black text-primary tracking-tighter">₹{(price + 450 + 125).toLocaleString()}</span>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="fixed bottom-0 left-0 right-0 p-6 bg-white/95 backdrop-blur-xl border-t border-slate-50 z-50 max-w-[450px] mx-auto">
        <button 
          onClick={onProceed}
          className="w-full bg-primary hover:bg-teal-600 text-white font-black h-16 rounded-[24px] shadow-2xl shadow-primary/30 active:scale-[0.98] transition-all flex items-center justify-center gap-3 text-lg"
        >
          <span className="material-symbols-outlined font-black">lock</span>
          Proceed to Payment
        </button>
        <p className="text-center text-[9px] text-slate-300 mt-4 font-black uppercase tracking-[0.2em]">Secure Checkout</p>
      </footer>
    </div>
  );
};

export default ReviewBookingScreen;
