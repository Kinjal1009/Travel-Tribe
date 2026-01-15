import React from 'react';

interface SafetyHubScreenProps {
  onBack: () => void;
  onEdit?: () => void;
}

const SafetyHubScreen: React.FC<SafetyHubScreenProps> = ({ onBack, onEdit }) => {
  return (
    <div className="relative flex h-full min-h-screen w-full flex-col bg-background-light animate-in slide-in-from-right duration-300 text-slate-gray">
      {/* Top App Bar */}
      <nav className="sticky top-0 z-50 flex items-center bg-background-light/95 backdrop-blur-md px-6 py-4 justify-between border-b border-gray-100">
        <button 
          onClick={onBack}
          className="flex size-11 shrink-0 items-center justify-start -ml-2 rounded-full hover:bg-gray-100 cursor-pointer active:scale-90 transition-transform"
        >
          <span className="material-symbols-outlined text-slate-gray font-black">arrow_back</span>
        </button>
        <h2 className="text-slate-gray text-lg font-black leading-tight tracking-tight flex-1 text-center font-display">Safety Hub</h2>
        <button 
          onClick={onEdit}
          className="flex size-11 shrink-0 items-center justify-center -mr-2 text-slate-gray"
        >
          <span className="material-symbols-outlined text-[22px]">info</span>
        </button>
      </nav>

      <main className="flex-1 overflow-y-auto pb-32 no-scrollbar">
        {/* Current Trip Context */}
        <div className="px-6 py-4 flex items-center gap-2 opacity-50">
          <span className="material-symbols-outlined text-[#d13333] text-[18px]">location_on</span>
          <span className="text-[11px] font-black uppercase tracking-widest text-slate-500">Current Trip: Kyoto, Japan</span>
        </div>

        {/* SOS Button Area */}
        <div className="px-6 py-4">
          <div className="bg-white p-1 rounded-[36px] shadow-2xl shadow-[#d13333]/10 ring-1 ring-[#d13333]/5">
            <button className="w-full bg-[#d13333] hover:bg-red-700 text-white rounded-[32px] p-8 flex flex-col items-center justify-center gap-3 transition-transform active:scale-[0.97] shadow-xl shadow-red-500/20">
              <span className="material-symbols-outlined text-[64px] font-black animate-pulse">emergency_home</span>
              <span className="text-3xl font-black tracking-tight font-display">ACTIVATE SOS</span>
              <span className="text-[11px] font-bold opacity-70 tracking-wide">Notifies Authorities & Group Members</span>
            </button>
          </div>
        </div>

        {/* Local Services Section */}
        <section className="px-6 mt-8">
          <h3 className="text-lg font-black text-slate-gray font-display mb-4">Local Services</h3>
          <div className="space-y-3">
            {[
              { icon: 'shield_person', title: 'Police', desc: 'Criminal emergencies & safety', phone: '110' },
              { icon: 'medical_services', title: 'Ambulance & Fire', desc: 'Medical or fire incidents', phone: '119' }
            ].map(service => (
              <div key={service.title} className="flex items-center gap-4 bg-white p-5 rounded-[24px] border border-slate-50 shadow-sm">
                <div className="bg-[#d13333]/5 text-[#d13333] p-2.5 rounded-2xl shrink-0">
                  <span className="material-symbols-outlined text-[24px] filled-icon">{service.icon}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-black text-slate-gray leading-none mb-1">{service.title}</p>
                  <p className="text-[10px] text-slate-400 font-bold leading-tight">{service.desc}</p>
                </div>
                <button className="flex items-center justify-center gap-2 bg-[#d13333] px-4 py-2.5 rounded-xl text-white active:scale-95 transition-all">
                  <span className="material-symbols-outlined text-[16px] font-black">call</span>
                  <span className="text-xs font-black">{service.phone}</span>
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Group Safety */}
        <section className="px-6 mt-10">
          <h3 className="text-lg font-black text-slate-gray font-display mb-4">Group Safety</h3>
          <div className="bg-white p-5 rounded-[28px] border border-slate-50 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="size-11 rounded-full overflow-hidden border-2 border-slate-50">
                  <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuAPy0mXpvrbaf81xDO4p5MvDmqrOxpkh4zdHby97MVIBQkkhQwOM6G1iRY8Lh3lIVwY5yqQzVX1QEJrTmUtjr0ybO5Yh7OU55RAn2qrfZj2ZX68sZ9khrYF4G7KUE2Zf-imSjaNHD52oSIe8LWdKbzkwKlaSfltwYWCKjzneRDR22ZCrLZ4KWTaWegQM0kMk-RU_b3OmodnDeDoKQ0oVLpzPhsS9boAVFs8JCeO4N6atoOaZ0IHnIfIUXvZYQmXU0fc-aQDctUZ_A" alt="Leader" className="w-full h-full object-cover" />
                </div>
                <div>
                  <p className="text-sm font-black text-slate-gray">Sarah Jenkins</p>
                  <p className="text-[#d13333] text-[10px] font-black uppercase tracking-tight">Group Leader</p>
                </div>
              </div>
              <div className="flex gap-2">
                <button className="size-10 rounded-full bg-slate-50 text-[#d13333] flex items-center justify-center active:scale-90 transition-transform">
                  <span className="material-symbols-outlined text-[20px]">chat</span>
                </button>
                <button className="size-10 rounded-full bg-slate-50 text-[#d13333] flex items-center justify-center active:scale-90 transition-transform">
                  <span className="material-symbols-outlined text-[20px]">call</span>
                </button>
              </div>
            </div>
            <button className="w-full flex items-center justify-center gap-2 bg-[#d13333]/10 text-[#d13333] py-3.5 rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-[#d13333]/20 transition-all active:scale-[0.98]">
              <span className="material-symbols-outlined text-[18px]">campaign</span>
              Broadcast to Group
            </button>
          </div>
        </section>

        {/* Health & Insurance */}
        <section className="px-6 mt-10 pb-12">
          <h3 className="text-lg font-black text-slate-gray font-display mb-4">Health & Insurance</h3>
          <div className="bg-white rounded-[28px] overflow-hidden border border-slate-50 shadow-sm mb-4">
            <div className="h-32 bg-slate-100 relative">
              <img 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBZ0xw0OZVtj115JsRdoOirSbIn5q8VyzWfoEebxFVVz57idvBlGNWnO4LpS1mZpkKIWM2fDpt8hOthM2nZPHK502ZJGe1VSqEiLZdVRoAtk_k2YMX2NRJcW_HX9QAAk3X9AmORCIyC3Wew1Cjz8LcoRjOFLNc0w1duS-cHfpzwVUGMYAv_1So5Ov9TL-sYeTPVc4Tzav3jWVAV-naw45i9KEfPlxJbw3OmERKGdLzO9n6c7yVtinqsr43EloML5gQ_gUpAKtfwdQ" 
                alt="Hospital Map" 
                className="w-full h-full object-cover opacity-70" 
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="material-symbols-outlined text-[#d13333] text-4xl drop-shadow-lg">location_on</span>
              </div>
            </div>
            <div className="p-5 flex items-center justify-between">
              <div>
                <p className="text-sm font-black text-slate-gray">Kyoto City Hospital</p>
                <p className="text-[10px] text-slate-400 font-bold">0.8km away • Open 24/7</p>
              </div>
              <button className="bg-slate-50 px-4 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest text-slate-600 flex items-center gap-1.5 active:scale-95 transition-all">
                <span className="material-symbols-outlined text-[16px]">directions</span>
                Navigate
              </button>
            </div>
          </div>

          <div className="bg-[#d13333]/5 border border-[#d13333]/10 rounded-[28px] p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#d13333] text-[22px] filled-icon">verified_user</span>
                <span className="text-sm font-black text-slate-gray">World Nomads Insurance</span>
              </div>
              <span className="material-symbols-outlined text-slate-300 text-[18px]">chevron_right</span>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <p className="text-[10px] uppercase font-black text-slate-400 tracking-widest mb-1">Policy Number</p>
                <p className="text-sm font-black text-slate-gray">WN-882391-XP</p>
              </div>
              <div>
                <p className="text-[10px] uppercase font-black text-slate-400 tracking-widest mb-1">24/7 Assistance</p>
                <p className="text-sm font-black text-slate-gray">+1 888-2391</p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default SafetyHubScreen;