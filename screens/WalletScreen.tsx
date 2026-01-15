
import React, { useState } from 'react';

interface WalletScreenProps {
  onBack: () => void;
  onNotificationClick?: () => void;
  onAddExpense: () => void;
  profileImage?: string | null;
  expenses: any[];
}

const WalletScreen: React.FC<WalletScreenProps> = ({ onBack, onNotificationClick, onAddExpense, profileImage, expenses }) => {
  const [activeTab, setActiveTab] = useState<'Expenses' | 'Settlements'>('Expenses');
  const defaultImage = "https://lh3.googleusercontent.com/aida-public/AB6AXuB73dsEcCajhGWp1neNQgNxm_GoP-OaQturmgptw5gs8HeUvNeujECZtoDL_JplACz9sL_mlyz5pupcNLx7Umtaix0Z4rA5sAq6C6bA-4G9v9pYBAVQsAqn1DHIgMpVONj4TEZGjMQ0OLS8d9dZ14T6t2bnOyEvn7Qgem8hpNWqznkj_TNN11JBFrMq1Y-cP892_LLEz9Iig5KoG0tiXzB_e0IzQMCk0RmixQdwRf9qGV71NJj4tH6a28n3tIowWG5ohC8tEYbQig";
  
  const totalOwed = expenses.reduce((acc, curr) => {
    const statusAmount = curr.statusAmount || 0;
    if (curr.status === 'lent') return acc + statusAmount;
    if (curr.status === 'owe') return acc - statusAmount;
    return acc;
  }, 0);

  return (
    <div className="flex flex-col h-full bg-background-light animate-in fade-in duration-500 font-display relative">
      {/* Header */}
      <header className="sticky top-0 z-30 bg-background-light/90 backdrop-blur-md px-6 pt-10 pb-2 border-b border-slate-100 shrink-0">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div 
              className="size-11 rounded-full bg-cover bg-center border-2 border-white shadow-sm" 
              style={{ backgroundImage: `url('${profileImage || defaultImage}')` }}
            ></div>
            <div className="flex flex-col">
              <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest leading-none mb-1">Welcome back</p>
              <h1 className="text-lg font-black text-slate-gray leading-none">Alex Rivera</h1>
            </div>
          </div>
          <button 
            onClick={onNotificationClick}
            className="size-11 rounded-full bg-white shadow-sm border border-slate-100 flex items-center justify-center text-slate-gray relative active:scale-90 transition-transform"
          >
            <span className="material-symbols-outlined text-[24px]">notifications</span>
          </button>
        </div>
        
        <div className="flex px-0">
          <button 
            onClick={() => setActiveTab('Expenses')}
            className={`flex-1 flex flex-col items-center justify-center pb-3 pt-2 transition-all border-b-[3px] ${activeTab === 'Expenses' ? 'border-primary text-primary' : 'border-transparent text-slate-400'}`}
          >
            <span className="text-sm font-black tracking-wide uppercase">Expenses</span>
          </button>
          <button 
            onClick={() => setActiveTab('Settlements')}
            className={`flex-1 flex flex-col items-center justify-center pb-3 pt-2 transition-all border-b-[3px] ${activeTab === 'Settlements' ? 'border-primary text-primary' : 'border-transparent text-slate-400'}`}
          >
            <span className="text-sm font-black tracking-wide uppercase">Settlements</span>
          </button>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto no-scrollbar p-6 space-y-8 pb-32">
        {/* Balance Card */}
        <div className="relative overflow-hidden rounded-[32px] bg-white p-8 border border-slate-50 shadow-[0_8px_30px_rgba(0,0,0,0.03)]">
          <div className="absolute top-0 right-0 p-6 opacity-[0.03] pointer-events-none">
            <span className="material-symbols-outlined text-[120px] text-slate-gray">account_balance_wallet</span>
          </div>
          
          <div className="relative z-10">
            <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.2em] mb-1">Current Balance</p>
            <h2 className={`text-5xl font-black tracking-tighter ${totalOwed >= 0 ? 'text-[#15803d]' : 'text-[#b91c1c]'}`}>
              ₹{(Math.abs(totalOwed) || 0).toLocaleString()}
            </h2>
            <p className="text-slate-400 text-sm font-bold mt-2">
              {totalOwed >= 0 ? 'You are owed in total for this trip' : 'You owe in total for this trip'}
            </p>
            
            <div className="mt-8">
              <button className="w-full h-16 bg-primary text-white rounded-[24px] font-black text-base flex items-center justify-center gap-3 active:scale-[0.98] transition-all shadow-xl shadow-primary/20">
                <span className="material-symbols-outlined text-xl filled-icon">payments</span>
                Settle Up
              </button>
            </div>
          </div>
        </div>

        {/* Add Expense Button - Inline Placement */}
        <button 
          onClick={onAddExpense}
          className="w-full bg-white text-primary h-16 rounded-[28px] font-black text-base flex items-center justify-center gap-3 active:scale-[0.98] transition-all shadow-sm border-2 border-primary/10 hover:bg-primary/5 group"
        >
          <div className="size-8 rounded-full bg-primary text-white flex items-center justify-center group-hover:scale-110 transition-transform">
            <span className="material-symbols-outlined font-black text-[20px]">add</span>
          </div>
          <span className="uppercase tracking-[0.1em] text-sm">Add New Expense</span>
        </button>

        <div className="space-y-4">
          {/* List Header */}
          <div className="flex items-center justify-between px-2">
            <h2 className="text-xl font-black text-slate-gray tracking-tight">Recent Expenses</h2>
            <button className="text-primary text-sm font-black">View All</button>
          </div>

          {/* Expenses List */}
          <div className="flex flex-col gap-4">
            {expenses.map(expense => (
              <button 
                key={expense.id}
                className="flex gap-4 bg-white p-5 rounded-[28px] border border-slate-50 items-center shadow-sm hover:border-primary/20 hover:bg-slate-50/50 transition-all text-left w-full active:scale-[0.99]"
              >
                <div 
                  className="size-[68px] rounded-2xl bg-cover bg-center shrink-0 border border-slate-50" 
                  style={{ backgroundImage: `url("${expense.image || defaultImage}")` }}
                ></div>
                
                <div className="flex flex-1 flex-col min-w-0">
                  <div className="flex justify-between items-start">
                    <p className="text-slate-gray text-[15px] font-black truncate">{expense.title}</p>
                    <p className="text-slate-gray text-base font-black">₹{(expense.amount || 0).toLocaleString()}</p>
                  </div>
                  <p className="text-slate-400 text-xs font-bold mt-0.5">
                    Paid by <span className={`${expense.paidBy === 'You' ? 'text-primary' : 'text-slate-gray'} font-black`}>{expense.paidBy}</span>
                  </p>
                  
                  <div className="flex justify-between items-end mt-3">
                    <div className="flex -space-x-2.5">
                      <div className="size-8 rounded-full border-2 border-white bg-slate-200 bg-cover bg-center shadow-sm" style={{ backgroundImage: "url('https://i.pravatar.cc/100?u=1')" }}></div>
                      <div className="size-8 rounded-full border-2 border-white bg-slate-200 bg-cover bg-center shadow-sm" style={{ backgroundImage: "url('https://i.pravatar.cc/100?u=2')" }}></div>
                      <div className="size-8 rounded-full border-2 border-white bg-primary flex items-center justify-center text-[10px] font-black text-white shadow-sm uppercase">You</div>
                    </div>
                    
                    <span className={`text-[10px] font-black px-3 py-1 rounded-lg uppercase tracking-wider ${expense.status === 'owe' ? 'text-[#b91c1c] bg-[#b91c1c]/5' : 'text-[#15803d] bg-[#15803d]/5'}`}>
                      {expense.status === 'owe' ? `You owe ₹${(expense.statusAmount || 0).toLocaleString()}` : `You lent ₹${(expense.statusAmount || 0).toLocaleString()}`}
                    </span>
                  </div>
                </div>
                
                <span className="material-symbols-outlined text-slate-200 text-2xl shrink-0">chevron_right</span>
              </button>
            ))}
            {expenses.length === 0 && (
              <div className="py-20 text-center text-slate-300 font-bold">
                No recent expenses.
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default WalletScreen;
