import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI } from '@google/genai';
import { FlightSearchResponse } from '../types';

const MCP_SERVER_URL = 'https://google-flights-mcp-addon-production-865a.up.railway.app/';

const AIRPORTS: Record<string, string> = {
  'Mumbai': 'BOM', 'Bombay': 'BOM',
  'Delhi': 'DEL', 'New Delhi': 'DEL',
  'Bangalore': 'BLR', 'Bengaluru': 'BLR',
  'Hyderabad': 'HYD',
  'Chennai': 'MAA', 'Madras': 'MAA',
  'Kolkata': 'CCU', 'Calcutta': 'CCU',
  'Goa': 'GOI',
  'Pune': 'PNQ',
  'Ahmedabad': 'AMD',
  'Kochi': 'COK', 'Cochin': 'COK',
  'Trivandrum': 'TRV',
  'New York': 'JFK',
  'Los Angeles': 'LAX',
  'London': 'LHR',
  'Dubai': 'DXB',
  'Singapore': 'SIN',
  'Dehradun': 'DED',
  'Rishikesh': 'DED'
};

interface Message {
  role: 'user' | 'assistant';
  content: string | React.ReactNode;
}

interface SearchParams {
  origin: string | null;
  destination: string | null;
  date: string | null;
}

const FlightBookingScreen: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: "Namaste! I'm your AI Bot. To find the best expeditions, I'll need your origin, destination, and travel date. Where are you flying from?"
    }
  ]);
  const [input, setInput] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const [searchParams, setSearchParams] = useState<SearchParams>({
    origin: null,
    destination: null,
    date: null
  });
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isThinking]);

  const callMCPServer = async (origin: string, destination: string, date: string): Promise<FlightSearchResponse | null> => {
    try {
      const response = await fetch(`${MCP_SERVER_URL}execute-tool`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          tool: 'search_flights',
          parameters: {
            origin: origin,
            destination: destination,
            departure_date: date
          }
        })
      });
      if (!response.ok) throw new Error(`MCP Server error: ${response.status}`);
      return await response.json();
    } catch (e) {
      console.error('Failed to fetch flights:', e);
      return null;
    }
  };

  const handleSendMessage = async (text: string = input) => {
    const query = text.trim();
    if (!query) return;

    setMessages(prev => [...prev, { role: 'user', content: query }]);
    setInput('');
    setIsThinking(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
      const today = new Date().toISOString().split('T')[0];
      
      const contextPrompt = `You are an expert flight assistant named AI Bot for the social travel app "Travel Tribe". 
Current Gathered Information:
- Origin: ${searchParams.origin || 'Not provided'}
- Destination: ${searchParams.destination || 'Not provided'}
- Travel Date: ${searchParams.date || 'Not provided'}

User Message: "${query}"
Today's Date: ${today}
Airports/Cities Reference: ${JSON.stringify(AIRPORTS)}

Your Task:
1. Extract any new information (Origin, Destination, or Date) from the user's message.
2. Resolve city names to 3-letter IATA codes.
3. Respond with a JSON block. Use an adventurous tone.

RESPONSE FORMAT (JSON ONLY):
{
  "updatedParams": {
    "origin": "CODE or null",
    "destination": "CODE or null",
    "date": "YYYY-MM-DD or null"
  },
  "message": "Your conversational response here"
}`;

      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: contextPrompt,
        config: { responseMimeType: "application/json" }
      });

      const result = JSON.parse(response.text || '{}');
      const newParams: SearchParams = {
        origin: result.updatedParams?.origin || searchParams.origin,
        destination: result.updatedParams?.destination || searchParams.destination,
        date: result.updatedParams?.date || searchParams.date
      };

      setSearchParams(newParams);
      setMessages(prev => [...prev, { role: 'assistant', content: result.message }]);

      if (newParams.origin && newParams.destination && newParams.date) {
        setIsThinking(true);
        const flightData = await callMCPServer(newParams.origin, newParams.destination, newParams.date);

        if (flightData && flightData.success && flightData.flights && flightData.flights.length > 0) {
          const sortedFlights = [...flightData.flights].sort((a, b) => a.price - b.price);
          const flightCards = (
            <div className="space-y-4 mt-2">
              <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest mb-2">Tribe connections found:</p>
              {sortedFlights.slice(0, 3).map((flight, idx) => (
                <section key={idx} className={`p-5 bg-white border border-slate-100 rounded-[28px] shadow-sm relative overflow-hidden ${idx === 0 ? 'ring-1 ring-primary/20' : ''}`}>
                  {idx === 0 && (
                    <div className="absolute top-0 right-0 bg-primary px-3 py-1 rounded-bl-xl">
                      <span className="text-[8px] font-black text-white uppercase tracking-wider">Best Deal</span>
                    </div>
                  )}
                  <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-primary text-base">flight</span>
                      <span className="font-black text-slate-gray text-[10px] uppercase tracking-wider">{flight.airline}</span>
                    </div>
                  </div>
                  <div className="space-y-2 relative mb-4">
                    <div className="flex items-center justify-between">
                      <div className="flex flex-col">
                        <span className="text-slate-gray text-base font-black">{flight.departure_time || flight.departure}</span>
                        <span className="text-slate-400 text-[9px] font-black uppercase">{newParams.origin}</span>
                      </div>
                      <div className="flex flex-col items-center">
                        <span className="text-[8px] text-slate-300 font-bold mb-1">{flight.duration}</span>
                        <div className="w-12 h-px bg-slate-100 relative">
                          <span className="absolute left-1/2 -top-2 -translate-x-1/2 material-symbols-outlined text-slate-200 text-xs rotate-90">flight</span>
                        </div>
                      </div>
                      <div className="flex flex-col text-right">
                        <span className="text-slate-gray text-base font-black">{flight.arrival_time || flight.arrival}</span>
                        <span className="text-slate-400 text-[9px] font-black uppercase">{newParams.destination}</span>
                      </div>
                    </div>
                  </div>
                  <div className="pt-3 border-t border-slate-50">
                    <p className="text-[8px] text-slate-300 font-black uppercase tracking-widest mb-0.5">Starting from</p>
                    <span className="text-primary text-xl font-black">₹{flight.price.toLocaleString()}</span>
                  </div>
                </section>
              ))}
            </div>
          );
          setMessages(prev => [...prev, { role: 'assistant', content: flightCards }]);
        } else {
          setMessages(prev => [...prev, { role: 'assistant', content: "No expeditions found for this route. Try another date?" }]);
        }
      }
    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, { role: 'assistant', content: "Turbulence in my systems. Try again?" }]);
    } finally {
      setIsThinking(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[110] bg-[#fbfaf9] flex flex-col font-body max-w-[450px] mx-auto overflow-hidden animate-in slide-in-from-right duration-300">
      {/* Header - Fixed to match screenshot */}
      <header className="bg-white px-6 pt-10 pb-6 border-b border-slate-100 shrink-0">
        <div className="relative flex flex-col items-center">
          <button onClick={onBack} className="absolute left-0 top-0 size-11 flex items-center justify-start text-slate-gray active:scale-90 transition-transform">
            <span className="material-symbols-outlined text-2xl font-black">arrow_back</span>
          </button>
          
          <div className="text-center">
            <h1 className="text-xl font-black text-slate-gray tracking-tight font-display">Tribe Booking Bot</h1>
            <div className="flex items-center justify-center gap-1.5 mt-1">
              <span className="size-1.5 rounded-full bg-primary animate-pulse"></span>
              <span className="text-[10px] font-black text-primary uppercase tracking-widest">Active Search</span>
            </div>
          </div>
        </div>

        {/* Status Pills */}
        <div className="flex justify-center gap-3 mt-6">
          {['origin', 'destination', 'date'].map((key) => {
            const val = (searchParams as any)[key];
            const labels: any = { origin: 'FROM', destination: 'TO', date: 'DATE' };
            const isActive = !!val;
            return (
              <div key={key} className={`px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-widest border transition-all ${isActive ? 'bg-primary/5 border-primary/20 text-primary' : 'bg-slate-50 border-slate-100 text-slate-300'}`}>
                {val || labels[key]}
              </div>
            );
          })}
        </div>
      </header>

      {/* Chat Area */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto px-6 py-8 space-y-10 no-scrollbar">
        {messages.map((m, i) => (
          <div key={i} className={`flex flex-col ${m.role === 'user' ? 'items-end' : 'items-start'} animate-in fade-in slide-in-from-bottom-2 duration-300`}>
            {m.role === 'assistant' && (
              <div className="flex items-center gap-2 mb-3 ml-2">
                <div className="size-6 rounded-lg bg-primary flex items-center justify-center">
                  <span className="material-symbols-outlined text-white text-[14px] filled-icon">flight_takeoff</span>
                </div>
                <span className="text-[10px] font-black text-slate-gray uppercase tracking-widest">Tribe Assistant</span>
              </div>
            )}
            <div className={`max-w-[92%] p-6 rounded-[32px] text-sm font-bold leading-relaxed shadow-sm ${m.role === 'user'
                ? 'bg-primary text-white rounded-tr-none'
                : 'bg-white border border-slate-100 text-slate-gray rounded-tl-none'
              }`}>
              {m.content}
            </div>
          </div>
        ))}
        {isThinking && (
          <div className="flex items-start ml-2">
            <div className="bg-white border border-slate-100 p-4 rounded-2xl flex gap-1.5 items-center">
              <div className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce"></div>
              <div className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce [animation-delay:0.2s]"></div>
              <div className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce [animation-delay:0.4s]"></div>
            </div>
          </div>
        )}
        <div className="h-40" />
      </div>

      {/* Action Tray & Input - Floating pill style */}
      <div className="absolute bottom-0 left-0 right-0 p-6 space-y-4 bg-gradient-to-t from-[#fbfaf9] via-[#fbfaf9] to-transparent z-20">
        <div className="flex gap-2 overflow-x-auto no-scrollbar py-2">
          {['Mumbai to Goa next Friday', 'Delhi to Bangalore cheapest'].map((s) => (
            <button
              key={s}
              onClick={() => handleSendMessage(s)}
              className="text-[10px] font-black uppercase tracking-widest px-6 py-3 bg-white border border-slate-100 rounded-full text-slate-400 hover:text-primary transition-all shrink-0 shadow-sm"
            >
              {s}
            </button>
          ))}
        </div>

        <form
          onSubmit={(e) => { e.preventDefault(); handleSendMessage(); }}
          className="flex items-center gap-3 bg-white p-3 rounded-[32px] shadow-xl shadow-slate-200/50 border border-slate-50"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Where to next, explorer?"
            className="flex-1 bg-transparent border-none px-4 py-2 text-sm font-bold outline-none placeholder:text-slate-200 text-slate-gray"
          />
          <button
            type="submit"
            disabled={isThinking || !input.trim()}
            className={`size-12 rounded-full flex items-center justify-center transition-all ${input.trim() ? 'bg-slate-50 text-primary' : 'bg-slate-50 text-slate-200'}`}
          >
            <span className="material-symbols-outlined font-black">send</span>
          </button>
        </form>
      </div>
    </div>
  );
};

export default FlightBookingScreen;
