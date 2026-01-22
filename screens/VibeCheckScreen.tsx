import React, { useState, useEffect } from 'react';
import { RISHIKESH_INTERESTS } from '../constants';
import { generateRishikeshQuiz, matchTravelers } from '../services/ragBackendService';
import { Question, Match } from '../types';

interface VibeCheckScreenProps {
  onBack: () => void;
  onJoin: () => void;
  destination?: string;
}

type VibeState = 'INTERESTS' | 'LOADING_QUIZ' | 'QUIZ' | 'LOADING_MATCH' | 'RESULTS';

const useCountUp = (target: number, duration: number = 1500) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    let startTimestamp: number | null = null;
    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      const easeProgress = 1 - (1 - progress) * (1 - progress);
      setCount(Math.floor(easeProgress * target));
      if (progress < 1) window.requestAnimationFrame(step);
    };
    window.requestAnimationFrame(step);
  }, [target, duration]);
  return count;
};

export const ResultsView: React.FC<{ matches: Match[], onReset: () => void, onJoin: () => void }> = ({ matches, onReset, onJoin }) => {
  const averageComp = matches.length > 0 ? Math.round(matches.reduce((a, b) => a + b.compatibility, 0) / matches.length) : 0;
  const animatedAvg = useCountUp(averageComp);

  return (
    <div className="animate-in fade-in zoom-in-95 duration-700 h-full flex flex-col">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-black text-slate-900 mb-1">Your Spiritual Tribe</h2>
        <p className="text-slate-400 font-medium text-sm">Frequency alignment successful.</p>
      </div>

      <div className="mb-6 bg-gradient-to-br from-slate-900 to-teal-900 p-6 rounded-[1.5rem] shadow-xl text-white">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h4 className="text-teal-300 font-black uppercase tracking-widest text-[9px] mb-1">Overall Sync</h4>
            <div className="text-4xl font-black flex items-baseline">
              {animatedAvg}<span className="text-xl ml-1 opacity-30">%</span>
            </div>
          </div>
          <div className="flex -space-x-3">
            {matches.slice(0, 4).map((m, i) => (
              <img key={m.id} src={m.avatar} className="w-10 h-10 rounded-full border-2 border-slate-800 shadow-xl" alt="avatar" />
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-3 flex-grow content-start overflow-y-auto no-scrollbar">
        {matches.slice(0, 3).map((match) => (
          <div key={match.id} className="bg-white rounded-[1.2rem] border border-slate-100 p-4 flex flex-row items-center gap-4 shadow-sm">
            <div className="relative shrink-0">
              <img src={match.avatar} alt={match.name} className="w-16 h-16 rounded-full border-2 border-teal-100" />
              <div className="absolute -bottom-1 -right-1 bg-slate-900 text-white w-7 h-7 flex items-center justify-center rounded-full border-2 border-white">
                <span className="font-black text-[9px]">{match.compatibility}%</span>
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-sm font-black text-slate-800 leading-tight mb-1">{match.name}</h3>
              <span className="text-[#00b2b2] text-[8px] font-black uppercase tracking-widest mb-2 block">{match.travelStyle}</span>
              <div className="flex flex-wrap gap-1 mt-auto">
                {match.interests.slice(0, 2).map((it, i) => (
                  <span key={i} className="bg-slate-50 text-slate-400 text-[7px] px-1.5 py-0.5 rounded-md font-bold uppercase">{it}</span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex flex-col gap-3 mt-6">
        <button
          onClick={onJoin}
          className="w-full bg-primary text-white py-4 rounded-[1.2rem] font-black text-base shadow-xl shadow-primary/20 active:scale-95 transition-all"
        >
          REQUEST TO JOIN TRIBE
        </button>
      </div>
    </div>
  );
};

const VibeCheckScreen: React.FC<VibeCheckScreenProps> = ({ onBack, onJoin, destination = 'Rishikesh' }) => {
  const [viewState, setViewState] = useState<VibeState>('INTERESTS');
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuizIdx, setCurrentQuizIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [matches, setMatches] = useState<Match[]>([]);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const toggleInterest = (id: string) => {
    setSelectedInterests(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const handleGenerateQuiz = async () => {
    if (selectedInterests.length < 3) return;
    setViewState('LOADING_QUIZ');
    try {
      const questions = await generateRishikeshQuiz(selectedInterests);
      if (!questions || questions.length === 0) {
        throw new Error('No questions received from RAG service');
      }
      setQuestions(questions);
      setViewState('QUIZ');
    } catch (error) {
     console.error('RAG Quiz Error:', error);
      alert('RAG Service is currently busy. Using essential local insights.');
      // Dynamic fallback if service is down
      setQuestions([
        { id: 'f1', text: 'How do you prefer to start your morning in the Yoga Capital?', options: ['Sunrise Yoga by the Ganga', 'Espresso at a Riverside Cafe', 'A silent forest trek', 'Ashram meditation'] },
        { id: 'f2', text: 'Which element of Rishikesh resonates most with you?', options: ['The rush of the river (Adventure)', 'The silence of the ashram (Peace)', 'The rhythm of the Aarti (Culture)', 'The energy of the cafes (Community)'] },
        { id: 'f3', text: 'What is your ideal evening ritual?', options: ['Ganga Aarti at Parmarth Niketan', 'Live Sitar at a rooftop cafe', 'Sunset hike to Neer Garh', 'Quiet stargazing by the river'] }
      ]);
      setViewState('QUIZ');
    }
  };

  const handleSelectAnswer = (qIdx: number, oIdx: number) => {
    setAnswers(prev => ({ ...prev, [qIdx]: oIdx }));
    if (qIdx < questions.length - 1) {
      setTimeout(() => setCurrentQuizIdx(qIdx + 1), 400);
    }
  };

  const handleSubmitQuiz = async () => {
    setViewState('LOADING_MATCH');
    try {
      const resultMatches = await matchTravelers(selectedInterests, answers, questions);
      setMatches(resultMatches);
      setTimeout(() => setViewState('RESULTS'), 1500);
    } catch (error) {
      console.error('Match Error:', error);
      setViewState('INTERESTS');
    }
  };

  const handleJoinRequest = () => {
    setShowSuccessModal(true);
  };

  const InterestsView = () => (
    <div className="flex flex-col h-full animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="mb-8 text-center px-4">
        <h2 className="text-3xl font-[900] text-slate-gray leading-tight font-display tracking-tight">Personalize your journey</h2>
        <p className="text-slate-400 font-bold mt-3 text-sm">Select at least 3 facets to find your tribe.</p>
      </div>

      <div className="grid grid-cols-3 gap-3 flex-1 content-start overflow-y-auto no-scrollbar pb-6 px-4">
        {RISHIKESH_INTERESTS.map((interest) => {
          const isSelected = selectedInterests.includes(interest.id);
          return (
            <button
              key={interest.id}
              onClick={() => toggleInterest(interest.id)}
              className={`flex flex-col items-center justify-center p-4 rounded-[28px] border-2 transition-all duration-300 aspect-square ${
                isSelected
                  ? 'bg-primary border-primary text-white shadow-xl shadow-primary/20 scale-[1.02]'
                  : 'bg-white border-slate-50 text-slate-500 hover:border-primary/20'
              }`}
            >
              <span className="text-3xl mb-2">{interest.icon}</span>
              <span className="font-black text-[9px] uppercase tracking-widest text-center leading-tight">{interest.label}</span>
            </button>
          );
        })}
      </div>

      <div className="pt-6 pb-10 px-4">
        <button
          onClick={handleGenerateQuiz}
          disabled={selectedInterests.length < 3}
          className={`w-full h-16 rounded-[24px] font-black text-lg transition-all flex items-center justify-center gap-3 shadow-xl ${
            selectedInterests.length >= 3 
              ? 'bg-slate-900 text-white shadow-black/10 active:scale-[0.98]' 
              : 'bg-slate-100 text-slate-300 cursor-not-allowed shadow-none'
          }`}
        >
          Generate My Quiz
          <span className="material-symbols-outlined">bolt</span>
        </button>
      </div>
    </div>
  );

  const LoadingView = ({ title, subtitle }: { title: string; subtitle: string }) => (
    <div className="flex flex-col items-center justify-center h-full animate-in fade-in duration-500 text-center px-10">
      <div className="relative size-32 mb-10">
        <div className="absolute inset-0 rounded-full border-[6px] border-primary/10"></div>
        <div className="absolute inset-0 rounded-full border-[6px] border-primary border-t-transparent animate-spin"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="material-symbols-outlined text-primary text-4xl filled-icon animate-pulse">auto_awesome</span>
        </div>
      </div>
      <h2 className="text-2xl font-black text-slate-gray font-display tracking-tight">{title}</h2>
      <p className="text-slate-400 font-bold mt-3 leading-relaxed text-sm">{subtitle}</p>
    </div>
  );

  const QuizView = () => {
    const q = questions[currentQuizIdx];
    if (!q) return null;
    const progress = ((currentQuizIdx + 1) / questions.length) * 100;
    const isLast = currentQuizIdx === questions.length - 1;
    const hasAnswered = answers[currentQuizIdx] !== undefined;

    return (
      <div className="flex flex-col h-full animate-in slide-in-from-right duration-500 px-4">
        <div className="flex flex-col gap-3 mb-10">
          <div className="flex items-end justify-between px-1">
            <p className="text-primary text-[10px] font-black uppercase tracking-[0.2em]">Question {currentQuizIdx + 1} of {questions.length}</p>
            <p className="text-slate-gray text-xs font-black">{Math.round(progress)}%</p>
          </div>
          <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden shadow-inner">
            <div className="h-full bg-primary transition-all duration-500" style={{ width: `${progress}%` }}></div>
          </div>
        </div>

        <h2 className="text-[28px] font-black text-slate-gray mb-10 font-display tracking-tight leading-tight">
          {q.text}
        </h2>

        <div className="space-y-4 flex-1 overflow-y-auto no-scrollbar">
          {q.options.map((opt, oIdx) => {
            const isSelected = answers[currentQuizIdx] === oIdx;
            return (
              <button
                key={oIdx}
                onClick={() => handleSelectAnswer(currentQuizIdx, oIdx)}
                className={`w-full text-left p-6 rounded-[28px] border-2 transition-all flex items-center gap-5 active:scale-[0.99] ${
                  isSelected 
                    ? 'bg-primary/5 border-primary text-primary shadow-lg shadow-primary/5' 
                    : 'bg-white border-slate-50 text-slate-600 hover:border-primary/20 shadow-sm'
                }`}
              >
                <div className={`size-10 rounded-2xl flex items-center justify-center font-black text-sm shrink-0 ${
                  isSelected ? 'bg-primary text-white' : 'bg-slate-50 text-slate-300'
                }`}>
                  {String.fromCharCode(65 + oIdx)}
                </div>
                <span className="font-bold text-base leading-snug">{opt}</span>
              </button>
            );
          })}
        </div>

        <div className="pt-6 pb-10 flex gap-4">
          {currentQuizIdx > 0 && (
            <button 
              onClick={() => setCurrentQuizIdx(prev => prev - 1)}
              className="px-8 rounded-[24px] border-2 border-slate-100 text-slate-400 font-black text-sm active:bg-slate-50 transition-all"
            >
              Back
            </button>
          )}
          {isLast ? (
            <button 
              onClick={handleSubmitQuiz}
              disabled={!hasAnswered}
              className={`flex-1 h-16 rounded-[24px] font-black text-lg shadow-xl transition-all flex items-center justify-center gap-3 ${
                hasAnswered ? 'bg-primary text-white shadow-primary/30 active:scale-[0.98]' : 'bg-slate-100 text-slate-300'
              }`}
            >
              Analyze Compatibility
              <span className="material-symbols-outlined">analytics</span>
            </button>
          ) : (
             <div className="flex-1 text-center py-5">
                <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest">Select an option to proceed</p>
             </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className={`h-full w-full flex flex-col overflow-hidden relative transition-colors duration-500 bg-background-light`}>
      <header className="sticky top-0 z-50 flex items-center bg-transparent px-6 py-6 justify-between shrink-0">
        <button 
          onClick={onBack}
          className={`flex size-11 items-center justify-center rounded-full border shadow-sm active:scale-90 transition-all bg-white border-slate-100 text-slate-gray`}
        >
          <span className="material-symbols-outlined font-black">arrow_back</span>
        </button>
        <h1 className={`text-lg font-black font-display tracking-tight text-slate-gray`}>
          Vibe Check
        </h1>
        <div className="size-11"></div>
      </header>

      <main className="flex-1 px-8 pt-4 pb-8 overflow-hidden relative z-10">
        {viewState === 'INTERESTS' && <InterestsView />}
        {viewState === 'LOADING_QUIZ' && <LoadingView title="Crafting your test..." subtitle="Our RAG engine is generating unique questions based on your facets." />}
        {viewState === 'QUIZ' && <QuizView />}
        {viewState === 'LOADING_MATCH' && <LoadingView title="Analyzing resonance..." subtitle="Calculating compatibility scores with active tribe members." />}
        {viewState === 'RESULTS' && <ResultsView matches={matches} onReset={() => setViewState('INTERESTS')} onJoin={handleJoinRequest} />}
      </main>

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/80 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="w-full max-w-[380px] bg-white rounded-[40px] p-8 pt-12 flex flex-col items-center text-center shadow-2xl animate-in zoom-in-95 duration-400 text-slate-gray">
            <div className="relative mb-8 shrink-0">
              <div className="size-24 rounded-full bg-primary/10 flex items-center justify-center relative overflow-hidden">
                <div className="size-16 rounded-full bg-primary flex items-center justify-center shadow-lg">
                   <span className="material-symbols-outlined text-white text-4xl font-black">send</span>
                </div>
              </div>
            </div>

            <h3 className="text-2xl font-black text-slate-900 mb-4 tracking-tight leading-tight font-display">Request Sent!</h3>
            <p className="text-slate-500 font-bold text-base leading-relaxed mb-10 px-4">
              We've notified the {destination} group host. You'll hear back within 24 hours.
            </p>

            <button 
              onClick={onJoin}
              className="w-full h-16 bg-primary text-white font-black rounded-[24px] shadow-xl shadow-primary/20 active:scale-[0.97] transition-all text-lg"
            >
              Got it
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default VibeCheckScreen;