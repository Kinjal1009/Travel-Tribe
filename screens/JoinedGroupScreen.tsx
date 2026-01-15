
import React from 'react';

interface JoinedGroupScreenProps {
  onBack: () => void;
  onJoinChat: () => void;
  tripDetails?: any;
}

const JoinedGroupScreen: React.FC<JoinedGroupScreenProps> = ({ onBack, onJoinChat, tripDetails }) => {
  const tribe = [
    { name: 'Elena', role: 'Organizer', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC74NySpPmZ67og7NBfV3N6Aol7steBPUHe2ZgJXMNCvBkIotE_Z56ZOLqdDV1aTc9ugH2A_QnoFhoCa0fC8xywOozPr9Nkp6d08HfhpnFXEGK6T-4m3qxBvfuNLcr2rl2EYxwt5q_KoMvj9pb3lkaKIH5fijaoJtZILalojHvV0HjFAASTC4Aii8usIQGRiUJGWhXas-4rL_fgbUpFNri4l920zaIyj_QbWqV2FrxwWPzcvLikAME5xrgIABqszvu6GRxrQjCKJQ', isOrganizer: true, badge: 'Organizer' },
    { name: 'Marcus', role: 'Adventurous', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBes-kQdel8n1BXdmaBM5biI_ufznGPFFwaRcws7a07boKE6duZ1nvk1Be-6pQW0NKwlW6Jb03wDICoAbf31chprlavtCo7MaeR26y43U0ctSpne-6UsIcBPW5OOZaL_vtFxrfsVFjbFHp5T_ACkXQbkKDMS3kj4k3L9AG5oe6imBPzkiavZrZTrnoMeBc8X47WMwrRy_jDeOr-d83xU2-dyGn0tlawkGV10uWkwxhaTeYPFggJAjBBZlYZuZCGz7TqQxnmSNBDtA', badge: 'Adventurous' },
    { name: 'Sarah', role: 'Foodie', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAV7FijdU2bhkmRRdamLY6jDjppnvh5GXoeJdtO2wmPrtPJLDYmzQO7HMY0SXAW6np41cz-Atspz9y1huQ2LPddQ8Y1SzurpkAMyCaXj1GK6ft5P7kfkhTpOkJEbaB0q_lv6nONmvF7JOn-hR7m9ez5LYZZ_wP3UP6Ovg7NP5_STJz4Vd8lnt-VxM1WLutZbc2TUHaebtDhUGcV1uHu12heW7D-tjgpFESWPmX91OtznfUQqTq4YIJ-2DFN0CXYxHjsLD1iN_TA', badge: 'Foodie' },
    { name: 'Chen', role: 'Chill', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBx2_ADlADzGVmw9U6OYYFCXF-D8GzP2vIv6xmumhTmlQy5ojbXI5gHFsSJWlHag2rIfR8HM2t6SRFZdj1CfwshAEjbyU9d9THfIaXy-izlTu_ecuQ1GWH980pnZjOOaOoAWBpA3-Cqx-I53mp8zz32-j3bqGdVzhan4vvhZmF0mVI9W7uG406QYNPBc7NqmboDgduShTOJMzyBhNWMnbmc4vNRRlfvbac48rcXETDe8Nd3xjw4mWugJU7wnae003m9-JbmR8t30g', badge: 'Chill' },
  ];

  const tripName = tripDetails?.name || 'Jaipur Pink City';
  const tripImg = tripDetails?.imageUrl || "https://images.unsplash.com/photo-1524230572899-a752b3835840?auto=format&fit=crop&q=80&w=800";
  const tripLocation = tripDetails?.country ? `${tripName}, ${tripDetails.country}` : 'Jaipur, India';
  const price = tripDetails?.price || 12500;

  return (
    <div className="flex flex-col h-full bg-background-light animate-in fade-in duration-500 font-display overflow-hidden">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md px-6 pt-10 pb-4 flex items-center justify-between">
        <button onClick={onBack} className="flex size-10 items-center justify-center rounded-full hover:bg-slate-50 active:scale-90 transition-transform">
          <span className="material-symbols-outlined text-slate-gray font-black">arrow_back</span>
        </button>
        <h2 className="text-lg font-black text-slate-gray leading-none">Joined Group</h2>
        <div className="size-10"></div>
      </header>

      <main className="flex-1 overflow-y-auto no-scrollbar pb-32">
        {/* Celebration Header */}
        <div className="flex flex-col items-center pt-8 pb-6 px-6">
          <div className="size-20 bg-[#e0f7f7] rounded-full flex items-center justify-center mb-6 shadow-sm">
            <span className="material-symbols-outlined text-primary text-5xl filled-icon">celebration</span>
          </div>
          <h1 className="text-3xl font-[900] text-slate-gray tracking-tight leading-tight mb-2">Request Accepted!</h1>
          <p className="text-primary text-lg font-black">You are in the tribe.</p>
        </div>

        {/* Trip Card */}
        <div className="px-6 mb-10">
          <div className="bg-white rounded-[32px] overflow-hidden shadow-sm border border-slate-50">
            <div className="relative h-60 w-full">
              <img 
                src={tripImg} 
                className="w-full h-full object-cover" 
                alt={tripName}
              />
              <div className="absolute bottom-6 left-6">
                <span className="bg-white/20 backdrop-blur-md text-white text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest border border-white/30 shadow-lg">Upcoming Trip</span>
              </div>
            </div>
            <div className="p-7">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <p className="text-primary text-xs font-[900] uppercase tracking-[0.2em] mb-1">Destination</p>
                  <h2 className="text-2xl font-black text-slate-gray tracking-tight">{tripLocation}</h2>
                </div>
                <button className="bg-slate-50 size-11 rounded-2xl flex items-center justify-center text-primary">
                  <span className="material-symbols-outlined text-[24px]">calendar_month</span>
                </button>
              </div>
              <div className="flex items-center gap-2 mb-8">
                <span className="material-symbols-outlined text-slate-300 text-lg">schedule</span>
                <p className="text-slate-400 text-sm font-black">Aug 12 - Aug 19, 2024</p>
              </div>
              
              <div className="space-y-4 pt-6 border-t border-slate-50">
                <p className="text-sm font-black text-slate-gray uppercase tracking-widest">Budget breakdown</p>
                <div className="grid grid-cols-3 gap-3">
                  <div className="bg-slate-50 p-3 rounded-2xl text-center">
                    <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest mb-1">Stay</p>
                    <p className="text-sm font-black text-primary">₹{Math.round(price * 0.45)}</p>
                  </div>
                  <div className="bg-slate-50 p-3 rounded-2xl text-center">
                    <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest mb-1">Food</p>
                    <p className="text-sm font-black text-primary">₹{Math.round(price * 0.3)}</p>
                  </div>
                  <div className="bg-slate-50 p-3 rounded-2xl text-center">
                    <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest mb-1">Misc</p>
                    <p className="text-sm font-black text-primary">₹{Math.round(price * 0.25)}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tribe Section */}
        <section className="mb-10">
          <h3 className="text-xl font-black text-slate-gray tracking-tight px-8 mb-6">Meet the Tribe</h3>
          <div className="flex gap-6 overflow-x-auto no-scrollbar px-8">
            {tribe.map((person) => (
              <div key={person.name} className="flex flex-col items-center gap-3 shrink-0">
                <div className="relative">
                  <div 
                    className={`size-16 rounded-full bg-cover bg-center border-2 ${person.isOrganizer ? 'border-primary' : 'border-white shadow-sm'}`}
                    style={{ backgroundImage: `url("${person.img}")` }}
                  ></div>
                  {person.isOrganizer && (
                    <div className="absolute -bottom-1 -right-1 size-5 bg-primary text-white rounded-full flex items-center justify-center border-2 border-white">
                      <span className="material-symbols-outlined text-[10px] font-black">verified</span>
                    </div>
                  )}
                </div>
                <div className="text-center">
                  <p className="text-sm font-black text-slate-gray">{person.name}</p>
                  <span className={`text-[9px] font-black uppercase tracking-tighter px-2 py-0.5 rounded ${person.isOrganizer ? 'bg-[#FF7043]/10 text-[#FF7043]' : 'bg-primary/10 text-primary'}`}>
                    {person.badge}
                  </span>
                </div>
              </div>
            ))}
            <div className="flex flex-col items-center gap-3 shrink-0">
              <div className="size-16 rounded-full border-2 border-dashed border-slate-200 flex items-center justify-center text-slate-200">
                <span className="material-symbols-outlined">person_add</span>
              </div>
              <p className="text-xs font-black text-slate-300">Invite</p>
            </div>
          </div>
        </section>

        {/* Trip Essentials */}
        <section className="px-8 mb-10">
          <h3 className="text-xl font-black text-slate-gray tracking-tight mb-6">Trip Essentials</h3>
          <div className="space-y-4">
            <div className="bg-white rounded-[24px] p-5 flex items-center gap-4 shadow-sm border border-slate-50 group active:scale-[0.98] transition-all">
              <div className="size-11 rounded-2xl bg-[#e0f7f7] text-primary flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-[24px] filled-icon">gavel</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-base font-black text-slate-gray leading-tight">Group Rules</p>
                <p className="text-xs font-bold text-slate-400 mt-0.5 truncate">Punctuality for tours & fair bill splitting.</p>
              </div>
              <span className="material-symbols-outlined text-slate-300">chevron_right</span>
            </div>
            <div className="bg-white rounded-[24px] p-5 flex items-center gap-4 shadow-sm border border-slate-50 group active:scale-[0.98] transition-all">
              <div className="size-11 rounded-2xl bg-[#fff3e0] text-[#FF7043] flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-[24px] filled-icon">checklist</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-base font-black text-slate-gray leading-tight">Next Milestone</p>
                <p className="text-xs font-bold text-slate-400 mt-0.5 truncate">Booking group flights by next Friday.</p>
              </div>
              <span className="material-symbols-outlined text-slate-300">chevron_right</span>
            </div>
          </div>
        </section>
      </main>

      {/* Footer CTA */}
      <footer className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[450px] p-6 bg-white/95 backdrop-blur-md border-t border-slate-50 z-50">
        <button 
          onClick={onJoinChat}
          className="w-full bg-primary text-white font-black h-16 rounded-[24px] shadow-xl shadow-primary/20 transition-all active:scale-[0.98] flex items-center justify-center gap-3 text-lg"
        >
          <span className="material-symbols-outlined text-[24px] filled-icon">chat_bubble</span>
          Join Group Chat
        </button>
      </footer>
    </div>
  );
};

export default JoinedGroupScreen;
