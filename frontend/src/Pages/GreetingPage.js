import React, { useEffect, useState } from 'react';

const GreetingPage = ({ onComplete }) => {
  const [phase, setPhase] = useState(-1);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(0), 1000), // Logo
      setTimeout(() => setPhase(1), 1800), // Slogan
      setTimeout(() => setPhase(2), 2600), // Loading Bar
      setTimeout(() => setPhase(3), 4200)  // Button
    ];
    return () => timers.forEach(t => clearTimeout(t));
  }, []);

  const handleStart = () => {
    setIsExiting(true);
    setTimeout(onComplete, 600);
  };

  return (
    <div className="fixed inset-0 z-[100] bg-slate-100 flex flex-col items-center justify-center overflow-hidden">
      <div className={`flex flex-col items-center max-w-md w-full px-8 ${isExiting ? 'reverse-pop-exit' : ''}`}>
        
        {phase >= 0 && (
          <div className="flex items-center gap-4 animate-section">
            <div className="w-14 h-14 bg-slate-900 rounded-xl flex items-center justify-center shadow-lg">
              <span className="text-white font-black text-xl">H</span>
            </div>
            <h1 className="text-5xl font-black tracking-tighter text-slate-900">Hisab<span className="text-cyan-600">.ai</span></h1>
          </div>
        )}

        <div className="mt-8 text-center h-12">
          {phase >= 1 && (
            <div className="fade-in-up">
              <p className="text-slate-500 text-lg font-bold italic leading-tight">Hisab Clear,</p>
              <p className="text-cyan-600 text-xl font-black tracking-widest uppercase">Vision Ultra-Clear</p>
            </div>
          )}
        </div>

        <div className="mt-10 w-full h-12 flex flex-col items-center justify-center">
          {phase >= 2 && (
            <div className="w-full space-y-3 fade-in-up">
              <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-cyan-500 to-emerald-500 animate-fill" />
              </div>
            </div>
          )}
        </div>

        <div className={`mt-8 w-full transition-all duration-700 ${phase >= 3 ? 'opacity-100' : 'opacity-0'}`}>
          <button onClick={handleStart} className="w-full py-4 bg-slate-900 text-white rounded-2xl font-black text-lg hover:bg-cyan-600 transition-all shadow-xl active:scale-95">
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
};

export default GreetingPage;