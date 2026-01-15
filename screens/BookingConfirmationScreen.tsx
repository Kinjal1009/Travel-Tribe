
import React from 'react';

interface BookingConfirmationScreenProps {
  onClose: () => void;
  onMeetGroup?: () => void;
  onReviewItinerary?: () => void;
  onPackingList?: () => void;
}

const BookingConfirmationScreen: React.FC<BookingConfirmationScreenProps> = ({ onClose, onMeetGroup, onReviewItinerary, onPackingList }) => {
  return (
    <div className="flex flex-col h-full bg-[#fbfaf9] font-body animate-in fade-in duration-1000 overflow-hidden">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 flex items-center justify-between p-6 bg-[#fbfaf9]/80 backdrop-blur-md shrink-0">
        <button 
          onClick={onClose}
          className="flex size-11 items-center justify-center rounded-full bg-white shadow-sm border border-slate-100 text-slate-gray active:scale-90 transition-transform"
        >
          <span className="material-symbols-outlined font-black">close</span>
        </button>
        <button className="flex size-11 items-center justify-center rounded-full bg-white shadow-sm border border-slate-100 text-slate-gray active:scale-90 transition-transform">
          <span className="material-symbols-outlined text-[20px]">share</span>
        </button>
      </nav>

      <main className="flex-1 overflow-y-auto no-scrollbar px-8 pb-12">
        <div className="flex flex-col items-center pt-8 pb-12 text-center">
          <div className="relative mb-10">
            <div className="absolute inset-0 bg-primary/20 rounded-[48px] blur-3xl animate-pulse"></div>
            <div className="relative size-36 rounded-[48px] bg-gradient-to-br from-primary to-teal-600 flex items-center justify-center shadow-2xl shadow-primary/30 border-4 border-white/20">
              <span className="material-symbols-outlined text-white text-[84px] font-black filled-icon animate-in zoom-in duration-500 delay-300">check_circle</span>
            </div>
            <div className="absolute -top-3 -right-3 size-12 rounded-[18px] bg-[#FF7043] flex items-center justify-center shadow-lg animate-bounce">
              <span className="material-symbols-outlined text-white text-[24px] filled-icon">celebration</span>
            </div>
          </div>
          
          <h1 className="text-slate-gray text-[36px] font-black leading-none tracking-tight mb-4 font-display">You're Going on Adventure!</h1>
          
          <div className="flex flex-col items-center gap-3">
            <div className="inline-flex items-center gap-2 px-5 py-2 bg-primary/5 rounded-full border border-primary/10">
              <p className="text-primary text-[10px] font-[900] uppercase tracking-[0.2em]">Booking ID: #IN-98234-TT</p>
            </div>
            <p className="text-slate-400 text-[11px] font-bold mt-1 max-w-[280px] leading-relaxed">
              You can check your booked trip details in the <span className="text-primary font-black">My Trips -&gt; Upcoming Trip</span>.
            </p>
          </div>
        </div>

        {/* Hero Image Block */}
        <div className="w-full mb-12 overflow-hidden rounded-[40px] shadow-2xl border-4 border-white animate-in zoom-in-95 duration-700">
          <div className="w-full aspect-[16/9] bg-center bg-no-repeat bg-cover" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&q=80&w=800")' }}>
          </div>
        </div>

        {/* Next Steps List */}
        <div className="space-y-5">
          <h3 className="text-xl font-black text-slate-gray tracking-tight px-1 font-display">What's Next?</h3>
          
          <div className="space-y-4">
            {[
              { 
                title: 'Meet the Group', 
                desc: 'Say hello to your fellow travelers in the group chat.', 
                icon: 'group', 
                color: 'coral', 
                action: onMeetGroup 
              },
              { 
                title: 'Packing Essentials List', 
                desc: "Check off items you'll need for your Bharat escape.", 
                icon: 'luggage', 
                color: 'primary',
                action: onPackingList
              },
              { 
                title: 'Review Itinerary', 
                desc: 'See the curated experiences waiting for you.', 
                icon: 'map', 
                color: 'slate', 
                action: onReviewItinerary 
              }
            ].map((item, idx) => (
              <button 
                key={item.title}
                onClick={item.action}
                className="w-full flex items-start gap-5 p-6 bg-white rounded-[32px] shadow-sm border border-slate-50 transition-all hover:shadow-md active:scale-[0.98] text-left animate-in fade-in slide-in-from-bottom-4 duration-500"
                style={{ animationDelay: `${500 + idx * 100}ms` }}
              >
                <div className={`size-14 shrink-0 items-center justify-center rounded-[20px] flex ${item.color === 'coral' ? 'bg-orange-50 text-[#FF7043]' : item.color === 'primary' ? 'bg-primary/10 text-primary' : 'bg-slate-50 text-slate-400'}`}>
                  <span className="material-symbols-outlined text-[28px] filled-icon">{item.icon}</span>
                </div>
                <div className="flex-1 min-w-0 pt-1">
                  <h4 className="text-slate-gray font-black text-base leading-none mb-1.5">{item.title}</h4>
                  <p className="text-slate-400 font-bold text-xs leading-relaxed">{item.desc}</p>
                </div>
                <span className="material-symbols-outlined text-slate-200 mt-1 self-center">chevron_right</span>
              </button>
            ))}
          </div>
        </div>
      </main>

      <div className="fixed bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-[#fbfaf9] to-transparent pointer-events-none"></div>
    </div>
  );
};

export default BookingConfirmationScreen;
