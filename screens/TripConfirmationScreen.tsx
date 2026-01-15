
import React from 'react';

interface TripConfirmationScreenProps {
  onBack: () => void;
  onBook: () => void;
  tripName?: string;
}

const TripConfirmationScreen: React.FC<TripConfirmationScreenProps> = ({ onBack, onBook, tripName }) => {
  const tribe = [
    { name: 'Alex P.', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDxdB8DamvhB1F3KVB-KWIVmvJoz_DeBHJ6vmwKYsa4kNaZ0jTDxSkYDka5D3p_hHmqoFNHNW0CVRyhNv37pidrAkZU3U5r1yNTY3CbFeSOfX2xVaLyL7jH973g3qEwvTQK6-qMzLzgmqSLxqrqwgJuJg_Oaij-QPzopRlKN8BsQDONOarNKqq2fXFjnufNSCIfw2HWDzJQcgvUnYVn1mgdSuguImHiT1Uav-Y6RIHMEtddU5GufzYwd8eeVqVWT32Ld8XGlDeAGw' },
    { name: 'Sarah L.', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCkF4Luxr45Hsj1c2z4omoEMi-v9tXa0190BihACrOs2iSXaADqxSLnKOSSAGViRPWhKZTFDGZxrg4YADeXqHHrbTechwbE1rdU30-fO2RQ8xh-4-aEl5PmH7POEOGm4T5lSHVzEUcU1bp4QSjrNSxm3ZPgt3xYc18583poz_8HE77z7vJTom9kC8Ub3O-nafsxsWo_HskesRlEthY81zyXt4KcpLbDhRrwxMPZdEfPzaOatPHD_zr3EAzNYpwjHEY0D0Cd_P_ukg' },
    { name: 'Mike R.', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBh4uPD1fliAoDGJlYPT9Ax5t6qnL3oXCB8_DmgR6DNF0UjmKVt03zLfBysSpp2onANRMTTjLQV9JmwQ6WKvYjcC112iROOB9XyarmtTk1jYFV9xrqpEDzMAZgxsOK8eXgPrmKElq1cHvwpwt_wtzsr_Hz4R_s4byU2xkqth6srWo5KGt5nuw1gyPtOE881iSxsyfO-EhySCYlJCgWxuqdnmy1vUbRpHyBqxy0zyVw6BDpfGnwIQK7nSYP2HxnsShE-jmERaQlCQw' },
    { name: 'Elena W.', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCfjJO0C6xwg5L2OVlKK9k2u7BlI6W_P_Sv3T60XHIgaIQIhgXtYSL5_1cZ4iymsn-GfZYXGMZlqlQCHjd7_0lgsN7XhJWVpmP7AR461TfFDNXEh2WtVMiF72C0eLJhpbnrLFGtQN9EgbDxeNl-ATFQPr-wF5fvCVajxALzSdgmhOEiHZVC_fyNRW7W865Y40QhrwjxkD6hfq29y4DTseZLb30a77J1Jr_W9ul-38Jq_rbwnDOBjMiwCimyLKYOUIPI5mijN7wv2w' },
    { name: 'Chris T.', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBOZadbrjR2VU_W_Cm6uOYzg2re_dRYqedpeNPZemVY0xVHUGopPiXWLJ00xebtcM7YR8R90L8GhfBcvCHCrVy0uvoVvGxpvDTJvTXRyRrQbiHi_ODIHuTtXm6otwaLizYoNeDiaTeLi0k6bVImK49FGxTzro_sWGU97Tfk4NKaYP6hJ53dkuLFNGno12pWXybXf2_l8-ujcnGXs35KCToPjCLt7sJKiYc2iTQ4bOMvSX2VO5Aqjlk96LCtkFIBXj8eF70yQWcDgg' },
    { name: 'Jordan D.', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCqIBVxll3eVLIZj3GHYdPjP_kor7nWr5LLuMar6oYviQk0pDHkJuL7ONBV5xPd2wmXAblEnVEhb5FacCGN0hiHC8qKfYUzqakAg4rxDXfDLsvIyKo6o7C8XB3HHJhTb1p3rz1ig7600GOh_OkjM54Mx5AhqqGrNm0YyKPY6I1kwkkYFzpP-XbyROqCgkTQJGooGluCQTyvz8XUssm2GfQ6c-zOhcdJTHEf1IcTbhL2UODprcDKKxPpmTtXHaDJt9l3d8eyk9WXrQ' },
  ];

  return (
    <div className="flex flex-col h-full bg-white animate-in slide-in-from-right duration-300 font-display overflow-hidden relative">
      {/* Hero Header Section */}
      <div className="relative h-[320px] w-full shrink-0">
        <div 
          className="absolute inset-0 bg-cover bg-center" 
          style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1524230572899-a752b3835840?auto=format&fit=crop&q=80&w=800")' }}
        >
          <div className="absolute inset-0 bg-black/30"></div>
        </div>
        
        {/* Navigation Bar Over Hero */}
        <header className="relative z-10 flex items-center justify-between px-6 pt-12 pb-4">
          <button 
            onClick={onBack}
            className="size-11 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white border border-white/20 active:scale-90 transition-transform"
          >
            <span className="material-symbols-outlined font-black">arrow_back</span>
          </button>
          <h2 className="text-white text-lg font-black tracking-tight drop-shadow-md">Trip Confirmation</h2>
          <div className="size-11"></div>
        </header>

        {/* Hero Title Area */}
        <div className="absolute bottom-10 left-8 right-8 z-10">
          <h1 className="text-white text-4xl font-black tracking-tight leading-tight mb-2 drop-shadow-lg">
            The Tribe is Ready!
          </h1>
          <p className="text-white/90 text-xs font-black uppercase tracking-[0.2em] drop-shadow-md flex items-center gap-2">
            Group Confirmed • 6 Spots Filled
          </p>
        </div>
      </div>

      <main className="flex-1 overflow-y-auto no-scrollbar -mt-6 bg-white rounded-t-[32px] relative z-20 px-8 pt-10 pb-32">
        {/* Tribe Section */}
        <section className="mb-10">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl font-black text-slate-gray tracking-tight">Meet Your Tribe</h3>
            <span className="text-primary text-xs font-black uppercase tracking-wider">6 Verified Members</span>
          </div>
          
          <div className="grid grid-cols-3 gap-y-10 gap-x-6">
            {tribe.map((member) => (
              <div key={member.name} className="flex flex-col items-center gap-3">
                <div className="relative">
                  <div className="size-20 rounded-full p-1.5 border-2 border-primary/10">
                    <div 
                      className="w-full h-full rounded-full bg-cover bg-center shadow-sm"
                      style={{ backgroundImage: `url("${member.img}")` }}
                    />
                  </div>
                  <div className="absolute bottom-0 right-0 size-6 bg-primary border-4 border-white rounded-full flex items-center justify-center shadow-md">
                    <span className="material-symbols-outlined text-white text-[12px] font-black">check</span>
                  </div>
                </div>
                <div className="text-center">
                  <p className="text-sm font-black text-slate-gray leading-tight">{member.name}</p>
                  <p className="text-primary text-[9px] font-black uppercase tracking-[0.1em] mt-1">Verified</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Summary Card */}
        <section>
          <div className="bg-white rounded-[32px] p-8 shadow-[0_12px_40px_rgba(0,0,0,0.04)] border border-slate-50 relative">
            <div className="flex justify-between items-start mb-6">
              <div>
                <p className="text-primary text-[10px] font-black uppercase tracking-[0.25em] mb-2">Trip Summary</p>
                <h4 className="text-2xl font-black text-slate-gray tracking-tight leading-none">{tripName || 'Jaipur Pink City'}</h4>
              </div>
              <div className="size-14 rounded-2xl bg-primary/5 flex items-center justify-center text-primary shrink-0">
                <span className="material-symbols-outlined text-[32px] filled-icon">landscape</span>
              </div>
            </div>

            <div className="h-px bg-slate-100 w-full mb-8"></div>

            <div className="space-y-6 mb-10">
              <div className="flex items-start gap-4">
                <div className="size-11 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-300 shrink-0">
                  <span className="material-symbols-outlined text-[20px]">calendar_today</span>
                </div>
                <div>
                  <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mb-1">Oct 12 — Oct 19, 2024</p>
                  <p className="text-base font-black text-slate-gray">7 Nights, 8 Days</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="size-11 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-300 shrink-0">
                  <span className="material-symbols-outlined text-[20px]">location_on</span>
                </div>
                <div>
                  <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mb-1">Destination</p>
                  <p className="text-base font-black text-slate-gray">Jaipur, Rajasthan</p>
                </div>
              </div>
            </div>

            <div className="bg-primary/5 rounded-[24px] p-6 flex items-center justify-between border border-primary/5">
              <p className="text-slate-gray font-black text-base">Total Payable</p>
              <p className="text-primary text-2xl font-black">₹12,500.00</p>
            </div>
          </div>
        </section>
      </main>

      {/* Bottom Action Bar */}
      <footer className="fixed bottom-0 left-0 right-0 p-6 bg-white/95 backdrop-blur-xl border-t border-slate-50 z-50 max-w-[450px] mx-auto">
        <button 
          onClick={onBook}
          className="w-full bg-primary hover:bg-teal-600 text-white font-[900] h-16 rounded-[24px] shadow-2xl shadow-primary/30 active:scale-[0.98] transition-all flex items-center justify-center gap-3 text-lg"
        >
          Book My Journey
          <span className="material-symbols-outlined font-black">arrow_forward</span>
        </button>
      </footer>
    </div>
  );
};

export default TripConfirmationScreen;
