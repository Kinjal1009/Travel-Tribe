
import React, { useState, useRef, useEffect } from 'react';

interface Message {
  id: string;
  sender: string;
  text: string;
  time: string;
  isMe: boolean;
  avatar?: string;
  role?: string;
  roleColor?: string;
  roleIcon?: string;
}

interface GroupChatScreenProps {
  onBack: () => void;
  onInfoClick: () => void;
  tripDetails?: any;
}

const GroupChatScreen: React.FC<GroupChatScreenProps> = ({ onBack, onInfoClick, tripDetails }) => {
  const [inputText, setInputText] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: 'Alex',
      text: 'Hey everyone! Just checked the weather—looks like 75° and sunny! ☀️',
      time: '10:24 AM',
      isMe: false,
      avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuBmDYobTv06R0TCM3Y241SdQKRR6_LOdLapUglqLFFDsp_N2bGlcy7LuO47_2SKZj5xMCBDBUzsDvtYvNUScYtJ4DYaegfM0tNMio8k0iU1UY3C0M6ijS_4GWdDfxFUsnW0SORl9YLJ5EfLpBlIss-uKKXFRd5oT__Ugm6dTCWM11JDzyXxVUAHgYNEsSKFtuR4ADWfAlQPJQVfyhieuLSPAyrd6ChskPKyq0r2WHZp15nfq2nYokUNyG16AOizdazE0hahPnfsGg",
      role: 'Foodie',
      roleColor: 'coral',
      roleIcon: 'restaurant'
    },
    {
      id: '2',
      sender: 'Sarah',
      text: "Can't wait! Has anyone started the packing list yet?",
      time: '10:26 AM',
      isMe: false,
      avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuBredibsX-W8nAcXusREPAtOCZXu0Era7UROpfDCneiir5cbTVWPDpezH_SreXilL-1BjccqWao9O75og4jxyDx28ouSsbPcpW0ff_nSjA4eoKHucpoKpeDt9NzNrgIlkGIVN_DUg8uJ4p3k8fy3hoVeK4ZojNvGnEbFUhNXrsJDW6x-k88QkqFc8JTKcWl2WT4Q0l5ZorFS5hWQ9Kmj3TpSQ0yAA4Zb6Vw_LLel-Ta50UgRfiJoMSM3Azlmf6JOUTCmx8Wt3WxDA",
      role: 'Hiker',
      roleColor: 'primary',
      roleIcon: 'hiking'
    },
    {
      id: '3',
      sender: 'Me',
      text: "I've added a few essentials to the list! Check the chip above. Thinking of bringing my hiking boots for Path of the Gods. 🥾",
      time: '10:30 AM',
      isMe: true
    },
    {
      id: '4',
      sender: 'Jamie',
      text: "Definitely bring them! I'm bringing my drone for that view.",
      time: '10:32 AM',
      isMe: false,
      avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuC-pNZN3Vpd3gzgHJTaEeDntl0VfRunvEsGo1-khJqiEvVGtKaFsDzpKeuRSotFQ6XGHW_KcwjVEjLsZF7MN41ecNP3lGi2Ho1wFdHhNhIK6td788JxsDQ0aRvj-z46sdis7aNVRU038IMh9BloTJ98QUyR7YlFza5o3hZSUnDmSOrOJraif8-fWRQkrB9qMqE7ehdYtI56e1M0DAZgoLzaDxtCxMe6WP-0jp7hD1n5QZJYdwrQrdNItF_rWDZyBpk9HthBSq2qgQ",
      role: 'Creator',
      roleColor: 'amber',
      roleIcon: 'photo_camera'
    }
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (!inputText.trim()) return;
    const newMessage: Message = {
      id: Date.now().toString(),
      sender: 'Me',
      text: inputText,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isMe: true
    };
    setMessages(prev => [...prev, newMessage]);
    setInputText('');
  };

  const groupName = tripDetails?.name || 'Amalfi Coast';
  const groupImg = tripDetails?.img || "https://lh3.googleusercontent.com/aida-public/AB6AXuCs_8scQqr9ka4XlBYb5lJFDHf72TIRNBY9YntFCkGBqt31kxvvWYDPvHZfZn9B0OINH1qnEePZKCVSNdLT7tVncK1vFfpzeigqh4S1WFwCcT-Sm3VuBRHftzF_I6KCTSr9NBGVzqeWHNMeKUOF0TbFvp1ENrPLcAXClTr1jmG9DgIrqBA55XYsPHIp3VyCnN-SDud3dWfm69DkExEfbhD2vLxgg1xhEpW2bDHkzmc29ttUQ3nCGsQj4tD2iYxSAsJEGcw11vwQKQ";

  return (
    <div className="flex flex-col h-full bg-background-light font-display animate-in slide-in-from-right duration-300 overflow-hidden">
      {/* Top Navigation Bar */}
      <header className="sticky top-0 z-50 bg-background-light/80 backdrop-blur-md border-b border-black/5 shrink-0">
        <div className="flex items-center p-4 justify-between w-full">
          <button 
            onClick={onBack}
            className="text-slate-gray flex size-10 shrink-0 items-center justify-center rounded-full hover:bg-black/5 transition-colors active:scale-90"
          >
            <span className="material-symbols-outlined font-black">arrow_back</span>
          </button>
          <div className="flex flex-col items-center flex-1 min-w-0">
            <h2 className="text-slate-gray text-lg font-black leading-tight tracking-tight truncate w-full text-center px-4">{groupName}</h2>
            <div className="flex items-center gap-1">
              <span className="size-2 rounded-full bg-amber animate-pulse"></span>
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-gray/60">Trip Confirmed</span>
            </div>
          </div>
          <div className="flex items-center gap-1 shrink-0">
            <button 
              onClick={onInfoClick}
              className="flex items-center justify-center size-10 rounded-full hover:bg-black/5 transition-colors"
              title="Group Info"
            >
              <span className="material-symbols-outlined text-slate-gray font-black">info</span>
            </button>
          </div>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto no-scrollbar pb-4 flex flex-col">
        {/* Hero Countdown Card */}
        <section className="px-4 py-2 mt-2">
          <div className="relative h-48 w-full rounded-[32px] overflow-hidden shadow-xl shadow-primary/10">
            <div 
              className="absolute inset-0 bg-cover bg-center" 
              style={{ backgroundImage: `url("${groupImg}")` }}
            ></div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
            <div className="absolute inset-0 flex flex-col justify-end p-6">
              <div className="flex items-center gap-2 mb-2">
                <span className="material-symbols-outlined text-amber text-lg filled-icon">auto_awesome</span>
                <p className="text-white/90 text-[10px] font-black uppercase tracking-widest">Adventure begins soon</p>
              </div>
              <div className="flex gap-2">
                {[
                  { label: 'Days', val: '12' },
                  { label: 'Hours', val: '04' },
                  { label: 'Mins', val: '22' }
                ].map((item) => (
                  <div key={item.label} className="flex flex-col items-center">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/20 backdrop-blur-md border border-white/30 shadow-lg">
                      <p className="text-white text-lg font-black">{item.val}</p>
                    </div>
                    <p className="text-white/70 text-[8px] mt-1 font-black uppercase tracking-[0.2em]">{item.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Quick Links Chips */}
        <section className="py-4 overflow-x-auto no-scrollbar shrink-0">
          <div className="flex gap-3 px-4">
            <button className="flex h-10 shrink-0 items-center justify-center gap-x-2 rounded-2xl bg-primary text-white pl-4 pr-5 shadow-lg shadow-primary/20 active:scale-95 transition-all">
              <span className="material-symbols-outlined text-lg">checklist</span>
              <p className="text-xs font-black">Packing <span className="opacity-70 text-[10px] ml-0.5">(12)</span></p>
            </button>
            <button className="flex h-10 shrink-0 items-center justify-center gap-x-2 rounded-2xl bg-white text-slate-gray pl-4 pr-5 border border-slate-100 shadow-sm active:scale-95 transition-all">
              <span className="material-symbols-outlined text-lg text-slate-400">description</span>
              <p className="text-xs font-black">Docs <span className="opacity-50 text-[10px] ml-0.5">(2)</span></p>
            </button>
            <button className="flex h-10 shrink-0 items-center justify-center gap-x-2 rounded-2xl bg-white text-slate-gray pl-4 pr-5 border border-slate-100 shadow-sm active:scale-95 transition-all">
              <span className="material-symbols-outlined text-lg text-slate-400">map</span>
              <p className="text-xs font-black">Itinerary</p>
            </button>
          </div>
        </section>

        {/* Chat Messages Area */}
        <section className="flex-1 flex flex-col px-6 space-y-6 pt-4 pb-32">
          {messages.map((msg) => (
            <div 
              key={msg.id} 
              className={`flex items-end gap-3.5 group animate-in ${msg.isMe ? 'justify-end slide-in-from-right' : 'slide-in-from-left'} duration-500`}
            >
              {!msg.isMe && (
                <div className="relative shrink-0">
                  <div 
                    className={`bg-center bg-no-repeat aspect-square bg-cover rounded-full w-10 h-10 border-2 shadow-sm ${msg.roleColor === 'coral' ? 'border-[#FF7043]' : msg.roleColor === 'primary' ? 'border-primary' : 'border-amber-400'}`} 
                    style={{ backgroundImage: `url("${msg.avatar}")` }}
                  ></div>
                  <div className={`absolute -top-1 -right-1 rounded-full p-0.5 border-2 border-white ${msg.roleColor === 'coral' ? 'bg-[#FF7043]' : msg.roleColor === 'primary' ? 'bg-primary' : 'bg-amber-400'}`}>
                    <span className="material-symbols-outlined text-[10px] text-white filled-icon">{msg.roleIcon}</span>
                  </div>
                </div>
              )}
              
              <div className={`flex flex-col gap-1 ${msg.isMe ? 'items-end' : 'items-start'} max-w-[85%]`}>
                {!msg.isMe && (
                  <div className="flex items-center gap-2 mb-0.5 ml-1">
                    <p className="text-slate-gray font-black text-[10px] uppercase tracking-wider">{msg.sender}</p>
                    <span className={`text-[8px] px-1.5 py-0.5 rounded-full font-black uppercase tracking-tighter ${msg.roleColor === 'coral' ? 'bg-[#FF7043]/10 text-[#FF7043]' : msg.roleColor === 'primary' ? 'bg-primary/10 text-primary' : 'bg-amber-400/10 text-amber-500'}`}>
                      {msg.role}
                    </span>
                  </div>
                )}
                <div className={`rounded-[24px] px-5 py-3.5 shadow-sm border ${msg.isMe ? 'bg-primary text-white border-transparent rounded-br-none shadow-primary/20' : 'bg-white text-slate-gray border-slate-100 rounded-bl-none'}`}>
                  <p className="text-[14px] font-bold leading-relaxed">{msg.text}</p>
                </div>
                <div className="flex items-center gap-1.5 px-1 mt-0.5">
                  <p className="text-[9px] text-slate-300 font-black uppercase tracking-widest">{msg.time}</p>
                  {msg.isMe && <span className="material-symbols-outlined text-[12px] text-primary font-black">done_all</span>}
                </div>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </section>
      </main>

      {/* Message Input Bar */}
      <footer className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-lg border-t border-slate-100 pb-10 pt-4 z-50">
        <div className="max-w-md mx-auto px-6 flex items-center gap-3">
          <button className="flex items-center justify-center size-12 rounded-2xl bg-slate-50 text-slate-400 hover:text-slate-600 transition-colors active:scale-90">
            <span className="material-symbols-outlined font-black">add</span>
          </button>
          <div className="relative flex-1">
            <input 
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              className="w-full bg-slate-50 border-none rounded-2xl px-5 py-4 text-sm font-bold focus:ring-4 focus:ring-primary/10 outline-none transition-all placeholder:text-slate-300 text-slate-gray" 
              placeholder="Message group..." 
              type="text"
            />
            <button className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center justify-center size-8 rounded-full text-slate-300 hover:text-primary transition-colors">
              <span className="material-symbols-outlined">sentiment_satisfied</span>
            </button>
          </div>
          <button 
            onClick={handleSendMessage}
            disabled={!inputText.trim()}
            className={`flex items-center justify-center size-12 rounded-2xl transition-all shadow-xl active:scale-95 ${inputText.trim() ? 'bg-primary text-white shadow-primary/30' : 'bg-slate-100 text-slate-300'}`}
          >
            <span className="material-symbols-outlined font-black">send</span>
          </button>
        </div>
      </footer>
    </div>
  );
};

export default GroupChatScreen;
