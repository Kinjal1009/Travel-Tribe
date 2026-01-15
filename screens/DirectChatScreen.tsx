
import React, { useState, useRef, useEffect } from 'react';

interface DirectChatScreenProps {
  onBack: () => void;
  recipient: {
    name: string;
    avatar?: string;
    online?: boolean;
  };
}

interface Message {
  id: string;
  text: string;
  time: string;
  isMe: boolean;
}

const DirectChatScreen: React.FC<DirectChatScreenProps> = ({ onBack, recipient }) => {
  const [inputText, setInputText] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Hey! Are we still meeting for the Sunrise Trek in Manali tomorrow? 🏔️',
      time: '09:15 AM',
      isMe: false,
    },
    {
      id: '2',
      text: "Absolutely! I've already packed my gear. What time should we head out?",
      time: '09:17 AM',
      isMe: true,
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
      text: inputText,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isMe: true
    };
    setMessages(prev => [...prev, newMessage]);
    setInputText('');
  };

  return (
    <div className="flex flex-col h-full bg-background-light font-display animate-in slide-in-from-right duration-300 overflow-hidden">
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-50">
        <div className="flex items-center p-4 gap-3">
          <button 
            onClick={onBack}
            className="text-slate-gray flex size-10 items-center justify-center rounded-full hover:bg-slate-50 transition-colors active:scale-90"
          >
            <span className="material-symbols-outlined font-bold">arrow_back</span>
          </button>
          <div className="relative">
            <div 
              className="size-10 rounded-full bg-cover bg-center border-2 border-white shadow-sm" 
              style={{ backgroundImage: `url('${recipient.avatar || "https://i.pravatar.cc/100?u=default"}')` }}
            ></div>
            {recipient.online && <div className="absolute bottom-0 right-0 size-2.5 bg-green-500 rounded-full border-2 border-white"></div>}
          </div>
          <div className="flex flex-col">
            <h2 className="text-slate-gray text-base font-black leading-tight">{recipient.name}</h2>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest leading-none mt-0.5">
              {recipient.online ? 'Online' : 'Last seen 2h ago'}
            </p>
          </div>
          <div className="flex-1"></div>
          <button className="flex items-center justify-center size-10 rounded-full text-slate-400 hover:text-primary">
            <span className="material-symbols-outlined">call</span>
          </button>
        </div>
      </header>

      <main className="flex-1 flex flex-col p-6 space-y-4 overflow-y-auto no-scrollbar">
        <div className="flex justify-center mb-4">
          <span className="bg-slate-100 text-slate-400 text-[10px] font-black px-4 py-1 rounded-full uppercase tracking-widest">Today</span>
        </div>

        {messages.map((msg) => (
          <div 
            key={msg.id} 
            className={`flex flex-col gap-1 ${msg.isMe ? 'items-end ml-auto' : 'items-start'} max-w-[85%] animate-in fade-in slide-in-from-bottom-2 duration-300`}
          >
            <div className={`rounded-[24px] px-5 py-3.5 shadow-sm border ${msg.isMe ? 'bg-primary text-white border-transparent rounded-br-none shadow-primary/20' : 'bg-white text-slate-gray border-slate-100 rounded-bl-none'}`}>
              <p className="text-[14px] font-bold leading-relaxed">{msg.text}</p>
            </div>
            <div className={`flex items-center gap-1.5 px-1 mt-0.5 ${msg.isMe ? 'mr-2' : 'ml-2'}`}>
              <p className="text-[10px] text-slate-300 font-black uppercase tracking-widest">{msg.time}</p>
              {msg.isMe && <span className="material-symbols-outlined text-[14px] text-primary font-black">done_all</span>}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </main>

      <footer className="bg-white/95 backdrop-blur-lg border-t border-slate-100 pb-10 pt-4 px-6 z-50">
        <div className="flex items-center gap-3">
          <button className="size-11 rounded-2xl bg-slate-50 text-slate-400 flex items-center justify-center active:scale-90 transition-transform">
            <span className="material-symbols-outlined font-black">add</span>
          </button>
          <div className="relative flex-1">
            <input 
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              className="w-full bg-slate-50 border-none rounded-2xl px-5 py-3.5 text-sm font-bold focus:ring-4 focus:ring-primary/10 outline-none transition-all placeholder:text-slate-300 text-slate-gray" 
              placeholder="Write a message..." 
              type="text"
            />
          </div>
          <button 
            onClick={handleSendMessage}
            disabled={!inputText.trim()}
            className={`size-11 rounded-2xl transition-all shadow-xl active:scale-95 flex items-center justify-center ${inputText.trim() ? 'bg-primary text-white shadow-primary/30' : 'bg-slate-100 text-slate-300'}`}
          >
            <span className="material-symbols-outlined font-black">send</span>
          </button>
        </div>
      </footer>
    </div>
  );
};

export default DirectChatScreen;
