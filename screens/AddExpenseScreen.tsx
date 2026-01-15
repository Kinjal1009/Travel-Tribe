
import React, { useState } from 'react';

interface AddExpenseScreenProps {
  onBack: () => void;
  onSave: (data: any) => void;
}

const AddExpenseScreen: React.FC<AddExpenseScreenProps> = ({ onBack, onSave }) => {
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [paidBy, setPaidBy] = useState('You');
  const [selectedCategory, setSelectedCategory] = useState('Food');
  
  const participants = [
    { id: 'p1', name: 'Alex', avatar: 'https://i.pravatar.cc/100?u=alex' },
    { id: 'p2', name: 'Sarah', avatar: 'https://i.pravatar.cc/100?u=sarah' },
    { id: 'p3', name: 'Marcus', avatar: 'https://i.pravatar.cc/100?u=marcus' },
    { id: 'p4', name: 'Elena', avatar: 'https://i.pravatar.cc/100?u=elena' }
  ];

  const [selectedParticipants, setSelectedParticipants] = useState<string[]>(participants.map(p => p.id));

  const categories = [
    { icon: 'restaurant', label: 'Food' },
    { icon: 'directions_bus', label: 'Transport' },
    { icon: 'hotel', label: 'Stay' },
    { icon: 'hiking', label: 'Activity' },
    { icon: 'shopping_bag', label: 'Shopping' },
    { icon: 'more_horiz', label: 'Other' }
  ];

  const toggleParticipant = (id: string) => {
    setSelectedParticipants(prev => 
      prev.includes(id) ? prev.filter(pId => pId !== id) : [...prev, id]
    );
  };

  const numericAmount = parseFloat(amount) || 0;
  const isAmountValid = numericAmount > 0;
  const isTitleValid = title.trim().length > 0;
  const isSplitValid = selectedParticipants.length > 0;
  const canSave = isAmountValid && isTitleValid && isSplitValid;

  const handleSave = () => {
    if (canSave) {
      onSave({ 
        title, 
        amount: numericAmount, 
        paidBy, 
        selectedCategory,
        splitWith: selectedParticipants
      });
    }
  };

  const toggleSelectAll = () => {
    if (selectedParticipants.length === participants.length) {
      setSelectedParticipants([]);
    } else {
      setSelectedParticipants(participants.map(p => p.id));
    }
  };

  return (
    <div className="flex flex-col h-full bg-white animate-in slide-in-from-bottom duration-500 font-display overflow-hidden">
      {/* Header */}
      <header className="px-6 pt-10 pb-6 flex items-center justify-between bg-white shrink-0 z-20">
        <button 
          onClick={onBack}
          className="size-11 rounded-full bg-slate-50 flex items-center justify-center text-slate-gray active:scale-90 transition-transform"
        >
          <span className="material-symbols-outlined font-black">close</span>
        </button>
        <h1 className="text-xl font-black text-slate-gray tracking-tight">Add Expense</h1>
        <div className="w-11"></div> 
      </header>

      <main className="flex-1 overflow-y-auto no-scrollbar p-8 space-y-8 pb-40">
        {/* Amount Input Section - Styled as Edit Text */}
        <div className="space-y-3">
          <label className="text-xs font-black text-slate-900 ml-1 uppercase tracking-[0.2em]">Amount Spent</label>
          <div className={`relative flex items-center group transition-all`}>
            <div className="absolute left-6 text-2xl font-black text-primary">₹</div>
            <input 
              type="text"
              inputMode="decimal"
              value={amount}
              onChange={(e) => {
                const val = e.target.value;
                // Allow only numbers and decimal point
                if (val === '' || /^[0-9]*\.?[0-9]*$/.test(val)) {
                  setAmount(val);
                }
              }}
              placeholder="0.00"
              className={`w-full h-16 pl-12 pr-6 bg-slate-50 border-2 rounded-[24px] transition-all text-xl font-black text-slate-gray placeholder:text-slate-200 outline-none ${
                amount !== '' && !isAmountValid ? 'border-red-200 focus:border-red-400' : 'border-transparent focus:border-primary/20'
              }`}
            />
          </div>
          {amount !== '' && !isAmountValid && (
            <p className="text-[10px] text-red-500 font-black uppercase ml-4 tracking-wider">Please enter a valid amount greater than zero</p>
          )}
        </div>

        {/* Expense Title */}
        <div className="space-y-3">
          <label className="text-xs font-black text-slate-900 ml-1 uppercase tracking-[0.2em]">Description</label>
          <input 
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className={`w-full h-16 px-6 bg-slate-50 border-2 rounded-[24px] transition-all text-base font-bold text-slate-gray placeholder:text-slate-200 outline-none ${
              title !== '' && !isTitleValid ? 'border-red-200 focus:border-red-400' : 'border-transparent focus:border-primary/20'
            }`} 
            placeholder="e.g. Dinner at Gion" 
            type="text"
          />
        </div>

        {/* Category Selector */}
        <div className="space-y-4">
          <label className="text-xs font-black text-slate-900 ml-1 uppercase tracking-[0.2em]">Category</label>
          <div className="flex overflow-x-auto no-scrollbar gap-3 -mx-2 px-2">
            {categories.map(cat => {
              const isActive = selectedCategory === cat.label;
              return (
                <button 
                  key={cat.label}
                  onClick={() => setSelectedCategory(cat.label)}
                  className={`flex shrink-0 items-center gap-2 px-6 py-3.5 rounded-full text-sm font-black transition-all active:scale-95 border ${
                    isActive 
                      ? 'bg-primary text-white border-primary shadow-lg shadow-primary/20' 
                      : 'bg-slate-50 text-slate-400 border-transparent hover:bg-slate-100'
                  }`}
                >
                  <span className="material-symbols-outlined text-[20px]">{cat.icon}</span>
                  {cat.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Split Details */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <label className="text-xs font-black text-slate-900 ml-1 uppercase tracking-[0.2em]">Split with Tribe</label>
              {!isSplitValid && (
                <p className="text-[10px] text-red-400 font-black uppercase tracking-tight ml-1 mt-1">Select at least one person</p>
              )}
            </div>
            <button 
              onClick={toggleSelectAll}
              className="text-primary text-[10px] font-black uppercase tracking-widest"
            >
              {selectedParticipants.length === participants.length ? 'Deselect All' : 'Select All'}
            </button>
          </div>
          <div className="space-y-3">
            {participants.map(person => {
              const isSelected = selectedParticipants.includes(person.id);
              return (
                <div 
                  key={person.id} 
                  onClick={() => toggleParticipant(person.id)}
                  className={`flex items-center justify-between p-4 rounded-[24px] transition-all cursor-pointer border ${isSelected ? 'bg-primary/5 border-primary/20 shadow-sm' : 'bg-slate-50 border-transparent hover:bg-slate-100'}`}
                >
                  <div className="flex items-center gap-3">
                    <img src={person.avatar} className="size-10 rounded-full border-2 border-white shadow-sm" alt={person.name} />
                    <span className={`text-[15px] font-black transition-colors ${isSelected ? 'text-slate-gray' : 'text-slate-300'}`}>{person.name}</span>
                  </div>
                  <div className={`size-7 rounded-full border-2 transition-all flex items-center justify-center ${isSelected ? 'bg-primary border-primary' : 'bg-white border-slate-200'}`}>
                    {isSelected && <span className="material-symbols-outlined text-white text-[16px] font-black">check</span>}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="fixed bottom-0 left-0 right-0 p-8 border-t border-slate-50 bg-white/95 backdrop-blur-md shadow-[0_-10px_30px_rgba(0,0,0,0.02)] z-50 max-w-[450px] mx-auto">
        <button 
          onClick={handleSave}
          disabled={!canSave}
          className={`w-full font-black h-16 rounded-[24px] shadow-2xl transition-all flex items-center justify-center gap-3 text-lg ${
            !canSave
              ? 'bg-slate-100 text-slate-300 cursor-not-allowed shadow-none' 
              : 'bg-primary text-white shadow-primary/30 active:scale-[0.98]'
          }`}
        >
          Save Expense
        </button>
      </footer>
    </div>
  );
};

export default AddExpenseScreen;
