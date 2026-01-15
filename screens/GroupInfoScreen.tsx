
import React from 'react';

interface GroupInfoScreenProps {
  onBack: () => void;
  tripDetails?: any;
}

const GroupInfoScreen: React.FC<GroupInfoScreenProps> = ({ onBack, tripDetails }) => {
  const members = [
    { name: 'Alex Rivera', role: 'Foodie', avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBmDYobTv06R0TCM3Y241SdQKRR6_LOdLapUglqLFFDsp_N2bGlcy7LuO47_2SKZj5xMCBDBUzsDvtYvNUScYtJ4DYaegfM0tNMio8k0iU1UY3C0M6ijS_4GWdDfxFUsnW0SORl9YLJ5EfLpBlIss-uKKXFRd5oT__Ugm6dTCWM11JDzyXxVUAHgYNEsSKFtuR4ADWfAlQPJQVfyhieuLSPAyrd6ChskPKyq0r2WHZp15nfq2nYokUNyG16AOizdazE0hahPnfsGg', isAdmin: false },
    { name: 'Sarah Chen', role: 'Admin / Guide', avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBredibsX-W8nAcXusREPAtOCZXu0Era7UROpfDCneiir5cbTVWPDpezH_SreXilL-1BjccqWao9O75og4jxyDx28ouSsbPcpW0ff_nSjA4eoKHucpoKpeDt9NzNrgIlkGIVN_DUg8uJ4p3k8fy3hoVeK4ZojNvGnEbFUhNXrsJDW6x-k88QkqFc8JTKcWl2WT4Q0l5ZorFS5hWQ9Kmj3TpSQ0yAA4Zb6Vw_LLel-Ta50UgRfiJoMSM3Azlmf6JOUTCmx8Wt3WxDA', isAdmin: true },
    { name: 'Jamie Lark', role: 'Creator', avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC-pNZN3Vpd3gzgHJTaEeDntl0VfRunvEsGo1-khJqiEvVGtKaFsDzpKeuRSotFQ6XGHW_KcwjVEjLsZF7MN41ecNP3lGi2Ho1wFdHhNhIK6td788JxsDQ0aRvj-z46sdis7aNVRU038IMh9BloTJ98QUyR7YlFza5o3hZSUnDmSOrOJraif8-fWRQkrB9qMqE7ehdYtI56e1M0DAZgoLzaDxtCxMe6WP-0jp7hD1n5QZJYdwrQrdNItF_rWDZyBpk9HthBSq2qgQ', isAdmin: false },
    { name: 'Arjun Verma', role: 'Photographer', avatar: 'https://i.pravatar.cc/150?u=arjun', isAdmin: false },
    { name: 'Priya Das', role: 'Yoga Master', avatar: 'https://i.pravatar.cc/150?u=priya', isAdmin: false }
  ];

  const groupName = tripDetails?.name || 'Amalfi Coast Squad';
  const groupImg = tripDetails?.img || 'https://lh3.googleusercontent.com/aida-public/AB6AXuCs_8scQqr9ka4XlBYb5lJFDHf72TIRNBY9YntFCkGBqt31kxvvWYDPvHZfZn9B0OINH1qnEePZKCVSNdLT7tVncK1vFfpzeigqh4S1WFwCcT-Sm3VuBRHftzF_I6KCTSr9NBGVzqeWHNMeKUOF0TbFvp1ENrPLcAXClTr1jmG9DgIrqBA55XYsPHIp3VyCnN-SDud3dWfm69DkExEfbhD2vLxgg1xhEpW2bDHkzmc29ttUQ3nCGsQj4tD2iYxSAsJEGcw11vwQKQ';

  return (
    <div className="flex flex-col h-full bg-background-light font-display animate-in slide-in-from-bottom duration-400 overflow-hidden">
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md px-4 py-4 flex items-center gap-4 border-b border-slate-50 shrink-0">
        {/* Fix: Ensured button is recognized as JSX by removing potential hidden characters and properly formatting tags */}
        <button 
          onClick={onBack}
          className="text-slate-gray flex size-10 items-center justify-center rounded-full hover:bg-slate-50 transition-colors active:scale-90"
        >
          <span className="material-symbols-outlined font-black">arrow_back</span>
        </button>
        <h2 className="text-slate-gray text-lg font-black leading-tight tracking-tight">Group Details</h2>
      </header>

      <main className="flex-1 overflow-y-auto no-scrollbar pb-20">
        {/* Header Visual */}
        <section className="px-6 py-6 flex flex-col items-center text-center">
          <div className="size-32 rounded-[40px] overflow-hidden border-4 border-white shadow-2xl mb-5 relative group">
            <img src={groupImg} className="w-full h-full object-cover" alt="Group" />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-all flex items-center justify-center">
               <span className="material-symbols-outlined text-white text-3xl">photo_camera</span>
            </div>
          </div>
          <h1 className="text-2xl font-black text-slate-gray mb-1">{groupName}</h1>
          <p className="text-primary text-[10px] font-black uppercase tracking-[0.2em] mb-4">Trip Confirmed - 12 Days Left</p>
          <div className="flex gap-2">
            {/* Fix: Re-typed button tags on line 46-47 to resolve "Cannot find name 'button'" error */}
            <button className="px-5 py-2 rounded-xl bg-primary/10 text-primary text-xs font-black uppercase tracking-widest active:scale-95 transition-all">Add Members</button>
            <button className="px-5 py-2 rounded-xl bg-red-50 text-red-500 text-xs font-black uppercase tracking-widest active:scale-95 transition-all">Exit Group</button>
          </div>
        </section>

        {/* Members List */}
        <section className="mt-4 px-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xs font-black text-slate-300 uppercase tracking-[0.2em] ml-1">Members ({members.length})</h3>
            <span className="text-[10px] font-black text-primary uppercase">View all</span>
          </div>
          <div className="bg-white rounded-[32px] overflow-hidden border border-slate-50 shadow-sm divide-y divide-slate-50">
            {members.map((member) => (
              <div key={member.name} className="flex items-center gap-4 p-5 hover:bg-slate-50/50 transition-colors cursor-pointer group">
                <div className="relative shrink-0">
                  <img src={member.avatar} className="size-12 rounded-full border-2 border-white shadow-sm object-cover" alt={member.name} />
                  <div className="absolute bottom-0 right-0 size-3 bg-green-500 rounded-full border-2 border-white"></div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-black text-slate-gray truncate">{member.name}</p>
                    {member.isAdmin && (
                      <span className="bg-primary text-white text-[8px] font-black px-1.5 py-0.5 rounded-md uppercase">Admin</span>
                    )}
                  </div>
                  <p className="text-xs text-slate-400 font-bold">{member.role}</p>
                </div>
                <button className="size-10 rounded-full text-slate-200 group-hover:text-primary transition-colors">
                  <span className="material-symbols-outlined">chat</span>
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Trip Overview Card */}
        <section className="mt-10 px-6 pb-12">
          <h3 className="text-xs font-black text-slate-300 uppercase tracking-[0.2em] mb-4 ml-1">Trip Overview</h3>
          <div className="bg-white rounded-[32px] p-6 border border-slate-50 shadow-sm space-y-6">
            <div className="flex gap-4">
               <div className="size-12 rounded-2xl bg-orange-50 text-orange-600 flex items-center justify-center shrink-0">
                 <span className="material-symbols-outlined filled-icon">explore</span>
               </div>
               <div>
                 <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1">Destination</p>
                 <p className="text-base font-black text-slate-900">{tripDetails?.name || 'Amalfi Coast, Italy'}</p>
               </div>
            </div>
            <div className="flex gap-4">
               <div className="size-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                 <span className="material-symbols-outlined filled-icon">calendar_month</span>
               </div>
               <div>
                 <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1">Dates</p>
                 <p className="text-base font-black text-slate-900">Aug 12 - Aug 22, 2024</p>
               </div>
            </div>
            <div className="flex gap-4">
               <div className="size-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                 <span className="material-symbols-outlined filled-icon">payments</span>
               </div>
               <div>
                 <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1">Total Group Budget</p>
                 <p className="text-base font-black text-slate-900">₹{tripDetails?.price || '25,000'} / person</p>
               </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default GroupInfoScreen;
