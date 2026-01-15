import React, { useState } from 'react';

interface VibeCheckScreenProps {
  onBack: () => void;
  onNext: () => void;
  destination?: string;
}

const VibeCheckScreen: React.FC<VibeCheckScreenProps> = ({ onBack, onNext, destination = 'your destination' }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});

  const questions = [
    {
      id: 1,
      category: "pace",
      question: `How do you prefer to start your day in ${destination}?`,
      options: [
        "Early sunrise activity (5-6 AM)",
        "Leisurely breakfast (8-9 AM)",
        "Sleep in and brunch (10-11 AM)",
        "Flexible, no routine"
      ],
      dimension: "lifestyle",
      icon: "wb_sunny"
    },
    {
      id: 2,
      category: "activities",
      question: `Which ${destination} activity excites you most?`,
      options: [
        "Adventure sports (surfing, diving)",
        "Cultural experiences (temples, classes)",
        "Relaxation (spa, beach)",
        "Nightlife and socializing"
      ],
      dimension: "interests",
      icon: "hiking"
    },
    {
      id: 3,
      category: "budget",
      question: "Your accommodation preference?",
      options: [
        "Budget hostel",
        "Mid-range hotel",
        "Boutique villa",
        "Luxury resort"
      ],
      dimension: "budget",
      icon: "hotel"
    },
    {
      id: 4,
      category: "social",
      question: "Your ideal group dynamic?",
      options: [
        "Close-knit, plan together",
        "Flexible, some solo time",
        "Mostly independent",
        "Party together"
      ],
      dimension: "social",
      icon: "groups"
    },
    {
      id: 5,
      category: "food",
      question: "Food exploration style?",
      options: [
        "Street food adventurer",
        "Restaurant foodie",
        "Cooking classes",
        "Familiar foods"
      ],
      dimension: "interests",
      icon: "restaurant"
    },
    {
      id: 6,
      category: "schedule",
      question: "Daily planning preference?",
      options: [
        "Detailed itinerary",
        "Loose plan",
        "Completely spontaneous",
        "Mix of both"
      ],
      dimension: "travel_style",
      icon: "event_note"
    },
    {
      id: 7,
      category: "nightlife",
      question: "How you like to spend your Evening?",
      options: [
        "Party and clubs",
        "Dinner and drinks",
        "Quiet evening",
        "Early to bed"
      ],
      dimension: "social",
      icon: "nightlife"
    },
    {
      id: 8,
      category: "transport",
      question: "Getting around preference?",
      options: [
        "Scooter/bike",
        "Private driver",
        "Public transport",
        "Walking"
      ],
      dimension: "travel_style",
      icon: "directions_bus"
    },
    {
      id: 9,
      category: "constraints",
      question: "What is the deal breakers constraint?",
      options: [
        "Smoking",
        "Heavy drinking",
        "Late nights",
        "None, all flexible"
      ],
      dimension: "constraints",
      icon: "warning"
    }
  ];

  const currentQuestion = questions[currentQuestionIndex];
  
  if (!currentQuestion) {
    return null;
  }

  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;
  const isLastQuestion = currentQuestionIndex === questions.length - 1;

  const handleOptionSelect = (option: string) => {
    setAnswers(prev => ({ ...prev, [currentQuestion.id]: option }));
    
    // Auto-advance logic: only if not the last question
    if (!isLastQuestion) {
      setTimeout(() => {
        setCurrentQuestionIndex(prev => prev + 1);
      }, 400);
    }
  };

  const handlePrevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  const isSelected = (option: string) => answers[currentQuestion.id] === option;

  return (
    <div className="relative flex flex-col h-full bg-background-light animate-in slide-in-from-right duration-500 font-display overflow-hidden">
      {/* Abstract Background Decoration */}
      <div className="absolute top-40 -right-20 opacity-5 pointer-events-none z-0">
        <svg height="400" viewBox="0 0 100 100" width="400" xmlns="http://www.w3.org/2000/svg">
          <path className="text-primary" d="M10 50 Q 25 25 50 50 T 90 50" fill="none" stroke="currentColor" strokeWidth="0.5"></path>
          <path className="text-primary" d="M10 60 Q 25 35 50 60 T 90 60" fill="none" stroke="currentColor" strokeWidth="0.5"></path>
          <path className="text-primary" d="M10 70 Q 25 45 50 70 T 90 70" fill="none" stroke="currentColor" strokeWidth="0.5"></path>
        </svg>
      </div>

      {/* Main Header */}
      <header className="sticky top-0 z-50 flex items-center bg-background-light/80 backdrop-blur-md p-4 justify-between border-b border-gray-200/50">
        <button 
          onClick={onBack}
          className="text-primary flex size-10 items-center justify-center rounded-full hover:bg-primary/10 transition-colors cursor-pointer active:scale-90"
        >
          <span className="material-symbols-outlined">close</span>
        </button>
        <h2 className="text-[#101818] text-lg font-bold leading-tight tracking-[-0.015em] flex-1 text-center font-display">Vibe Check</h2>
        <div className="flex w-12 items-center justify-end">
        </div>
      </header>

      <main className="flex-1 flex flex-col overflow-y-auto no-scrollbar pb-32 relative z-10">
        {/* Progress Display */}
        <div className="flex flex-col gap-3 p-6">
          <div className="flex items-end justify-between">
            <div>
              <p className="text-primary text-xs font-bold uppercase tracking-widest">Step {currentQuestionIndex + 1} of {questions.length}</p>
              <p className="text-[#101818] text-2xl font-bold font-display leading-tight mt-1">Let's find your tribe</p>
            </div>
            <p className="text-[#101818] text-sm font-black leading-normal bg-white px-3 py-1 rounded-full shadow-sm">{Math.round(progress)}%</p>
          </div>
          <div className="rounded-full bg-gray-200 h-2 w-full overflow-hidden">
            <div className="h-full rounded-full bg-primary transition-all duration-500 ease-out" style={{ width: `${progress}%` }}></div>
          </div>
        </div>

        {/* Question Card Container */}
        <div className="px-6 py-4 animate-in fade-in slide-in-from-bottom-4 duration-500" key={currentQuestion.id}>
          <div className="bg-white rounded-[32px] p-8 shadow-[0_8px_40px_rgba(0,0,0,0.03)] border border-gray-100/50 relative">
            
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="size-12 rounded-2xl bg-primary/10 flex items-center justify-center">
                  <span className="material-symbols-outlined text-primary text-2xl filled-icon">{currentQuestion.icon}</span>
                </div>
                <p className="text-[10px] font-black text-slate-300 uppercase tracking-[0.2em]">{currentQuestion.dimension}</p>
              </div>
              
              {/* Question card-specific back button on the right */}
              {currentQuestionIndex > 0 && (
                <button 
                  onClick={handlePrevQuestion}
                  className="size-10 rounded-full border border-slate-100 flex items-center justify-center text-slate-300 hover:text-primary hover:border-primary/20 transition-all active:scale-90 shadow-sm"
                  aria-label="Previous question"
                >
                  <span className="material-symbols-outlined text-[24px]">arrow_back_ios_new</span>
                </button>
              )}
            </div>
            
            <h3 className="text-[#101818] text-2xl font-black font-display leading-tight tracking-tight mb-8">
              {currentQuestion.question}
            </h3>

            <div className="flex flex-col gap-3">
              {currentQuestion.options.map((option) => {
                const active = isSelected(option);
                return (
                  <button 
                    key={option}
                    onClick={() => handleOptionSelect(option)}
                    className={`w-full p-5 rounded-2xl border-2 text-left font-bold text-base transition-all active:scale-[0.98] flex items-center justify-between ${
                      active 
                        ? 'border-primary bg-primary/5 text-primary shadow-sm' 
                        : 'border-slate-50 bg-slate-50/50 text-slate-600 hover:border-primary/20'
                    }`}
                  >
                    <span>{option}</span>
                    <div className={`size-6 rounded-full border-2 flex items-center justify-center transition-all ${active ? 'bg-primary border-primary' : 'border-slate-200 bg-white'}`}>
                      {active && <span className="material-symbols-outlined text-white text-[16px] font-black">check</span>}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Tip Banner */}
        <div className="px-6 py-4 mb-4">
           <div className="bg-primary/5 rounded-[24px] p-6 border border-primary/10 flex items-start gap-4 shadow-sm">
             <span className="material-symbols-outlined text-primary text-2xl">auto_awesome</span>
             <p className="text-xs font-bold text-primary/80 leading-relaxed italic">
               "We use these answers to match you with a tribe that shares your frequency. Be honest, traveler!"
             </p>
           </div>
        </div>
      </main>

      {/* Floating Bottom CTA */}
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[450px] p-6 bg-gradient-to-t from-background-light via-background-light to-transparent z-50">
        {isLastQuestion && (
           <button 
           onClick={onNext}
           disabled={!answers[currentQuestion.id]}
           className={`w-full h-16 rounded-[24px] font-bold text-lg shadow-xl transition-all flex items-center justify-center gap-2 ${
             answers[currentQuestion.id]
               ? 'bg-primary text-white shadow-primary/25 active:scale-[0.98]'
               : 'bg-slate-100 text-slate-300 cursor-not-allowed'
           }`}
         >
           Calculate Vibe Match
           <span className="material-symbols-outlined">auto_awesome</span>
         </button>
        )}
        
        {!isLastQuestion && (
           <div className="flex justify-center">
             <p className="text-xs font-bold text-slate-300 uppercase tracking-widest bg-white/50 px-4 py-1 rounded-full border border-slate-100">Select an option to advance</p>
           </div>
        )}
        <div className="h-2"></div>
      </div>
    </div>
  );
};

export default VibeCheckScreen;