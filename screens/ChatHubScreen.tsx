
import React from 'react';

interface ChatHubScreenProps {
  profileImage?: string | null;
  onNotificationClick?: () => void;
  onGroupClick?: (tripDetails?: any) => void;
  onDirectClick?: (recipient: any) => void;
}

const ChatHubScreen: React.FC<ChatHubScreenProps> = ({ profileImage, onNotificationClick, onGroupClick, onDirectClick }) => {
  const defaultImage = "https://lh3.googleusercontent.com/aida-public/AB6AXuB73dsEcCajhGWp1neNQgNxm_GoP-OaQturmgptw5gs8HeUvNeujECZtoDL_JplACz9sL_mlyz5pupcNLx7Umtaix0Z4rA5sAq6C6bA-4G9v9pYBAVQsAqn1DHIgMpVONj4TEZGjMQ0OLS8d9dZ14T6t2bnOyEvn7Qgem8hpNWqznkj_TNN11JBFrMq1Y-cP892_LLEz9Iig5KoG0tiXzB_e0IzQMCk0RmixQdwRf9qGV71NJj4tH6a28n3tIowWG5ohC8tEYbQig";

  const groupChats = [
    {
      id: 'g1',
      name: 'Kerala Backwaters Crew',
      lastMsg: 'Arjun: The houseboat is confirmed!',
      time: '10:32 AM',
      unread: 3,
      vibeMatch: 92,
      img: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&q=80&w=200',
      icon: 'water_lux'
    },
    {
      id: 'g2',
      name: 'Hampi Boulder Expedition',
      lastMsg: 'Priya: Don\'t forget your climbing shoes.',
      time: 'Yesterday',
      unread: 0,
      vibeMatch: 88,
      img: 'https://images.unsplash.com/photo-1620619767323-b95a89183081?auto=format&fit=crop&q=80&w=200',
      icon: 'mountain_flag'
    }
  ];

  const directMessages = [
    { id: 'd1', name: 'Arjun Sharma', text: 'Bro, did you book the Manali bus?', time: '10:24 AM', unread: true, online: true, image: "https://i.pravatar.cc/150?u=arjun" },
    { id: 'd2', name: 'Priya Verma', text: 'The Hampi photos are amazing!', time: 'Tue', image: "https://i.pravatar.cc/150?u=priya" },
    { id: 'd3', name: 'Rohan Mehta', text: 'See you at Jaipur Junction.', time: 'Mon', image: "https://i.pravatar.cc/150?u=rohan" },
    { id: 'd4', name: 'Ishani Roy', text: 'Is the trek difficult?', time: 'Mon', avatar: 'IR' }
  ];

  return (
    <div className="flex flex-col h-full bg-background-light animate-in fade-in duration-500 font-display">
      <header className="sticky top-0 z-30 bg-background-light/90 backdrop-blur-md px-6 pt-10 pb-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div 
            className="size-11 rounded-full bg-cover bg-center border-2 border-white shadow-sm" 
            style={{ backgroundImage: `url('${profileImage || defaultImage}')` }}
          ></div>
          <div className="flex flex-col">
            <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest leading-none mb-1">Travel Hub</p>
            <h1 className="text-lg font-black text-slate-gray leading-none">Messages</h1>
          </div>
        </div>
        <button 
          onClick={onNotificationClick}
          className="size-11 rounded-full bg-white shadow-sm border border-slate-100 flex items-center justify-center text-slate-gray relative active:scale-90 transition-transform"
        >
          <span className="material-symbols-outlined text-[24px]">notifications</span>
        </button>
      </header>

      <main className="flex-1 overflow-y-auto no-scrollbar pb-32">
        <div className="px-8 pt-4 pb-2">
          <div className="relative mb-8">
            <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none text-slate-300">
              <span className="material-symbols-outlined text-[22px]">search</span>
            </div>
            <input 
              className="block w-full h-14 pl-14 pr-5 bg-white border border-slate-50 rounded-2xl focus:ring-2 focus:ring-primary/20 text-base font-bold text-slate-gray placeholder:text-slate-200 transition-all shadow-sm" 
              placeholder="Search groups or friends..." 
              type="text"
            />
          </div>
        </div>

        <section className="px-6 mb-10">
          <h2 className="text-[11px] font-black text-primary uppercase tracking-[0.2em] px-2 mb-4">Active Groups</h2>
          <div className="space-y-3">
            {groupChats.map((group) => (
              <div 
                key={group.id}
                onClick={() => onGroupClick?.(group)}
                className="bg-white rounded-[32px] p-4 flex items-center gap-4 shadow-sm border border-slate-50 active:scale-[0.98] transition-all cursor-pointer group"
              >
                <div className="relative shrink-0">
                  <div className="size-16 rounded-[24px] bg-cover bg-center overflow-hidden" style={{ backgroundImage: `url('${group.img}')` }}></div>
                  <div className="absolute -bottom-1 -right-1 size-6 bg-[#FFBF00] rounded-full border-2 border-white flex items-center justify-center">
                    <span className="material-symbols-outlined text-white text-[12px] filled-icon">{group.icon}</span>
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-baseline">
                    <h3 className="text-base font-black text-slate-gray truncate">{group.name}</h3>
                    <span className="text-[10px] font-black text-primary">{group.time}</span>
                  </div>
                  <p className="text-sm text-slate-400 font-bold truncate mt-0.5">{group.lastMsg}</p>
                  <div className="mt-2">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-primary/5 text-primary text-[10px] font-black rounded-lg border border-primary/10">
                      <span className="material-symbols-outlined text-[14px] filled-icon">auto_awesome</span>
                      {group.vibeMatch}% Vibe Match
                    </span>
                  </div>
                </div>
                {group.unread > 0 && (
                  <div className="size-6 bg-[#FF7043] rounded-full flex items-center justify-center text-[10px] font-black text-white shadow-lg shadow-coral/20">
                    {group.unread}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        <section className="px-8">
          <h2 className="text-[11px] font-black text-primary uppercase tracking-[0.2em] mb-4">Direct Messages</h2>
          <div className="space-y-6">
            {directMessages.map((msg) => (
              <div 
                key={msg.id} 
                onClick={() => onDirectClick?.(msg)}
                className="flex items-center gap-4 group cursor-pointer active:bg-slate-50 rounded-2xl p-1 -mx-1 transition-colors"
              >
                <div className="relative shrink-0">
                  {msg.avatar ? (
                    <div className="size-12 rounded-full bg-primary/10 flex items-center justify-center font-black text-primary text-sm border border-primary/10 uppercase">
                      {msg.avatar}
                    </div>
                  ) : (
                    <div 
                      className="size-12 rounded-full bg-cover bg-center border border-slate-100 shadow-sm" 
                      style={{ backgroundImage: `url('${msg.image}')` }}
                    ></div>
                  )}
                  {msg.online && <div className="absolute bottom-0 right-0 size-3 bg-green-500 rounded-full border-2 border-white"></div>}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-baseline">
                    <h4 className="text-sm font-black text-slate-900">{msg.name}</h4>
                    <span className="text-[10px] font-bold text-slate-300">{msg.time}</span>
                  </div>
                  <p className={`text-xs mt-1 truncate ${msg.unread ? 'text-slate-900 font-black' : 'text-slate-400 font-bold'}`}>
                    {msg.text}
                  </p>
                </div>
                {msg.unread && <div className="size-2 rounded-full bg-primary"></div>}
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default ChatHubScreen;
