import React from 'react';

const BusinessBackground = () => {
  const elements = [
    'ROI', 'EBITDA', 'CAGR', 'EQUITY', 'ASSETS', 'LIQUIDITY', 
    'MARGIN', 'CAPITAL', 'REVENUE', 'LEDGER', 'DIVIDEND', 
    'BULL', 'BEAR', 'PORTFOLIO', 'STOCKS', 'HEDGE', 'YIELD', 'P&L',
    '$', '₹', '£', '₿', '📈', '📉', 'Δ', '1010'
  ];
  
  const particles = Array.from({ length: 50 }).map((_, i) => ({
    id: i,
    char: elements[Math.floor(Math.random() * elements.length)],
    left: `${Math.random() * 100}%`,
    duration: `${22 + Math.random() * 28}s`,
    delay: `${Math.random() * 10}s`,
    size: `${Math.random() * (32 - 18) + 18}px`,
    color: Math.random() > 0.7 
      ? 'text-emerald-700/30' 
      : Math.random() > 0.4 ? 'text-cyan-700/30' : 'text-slate-400/20'
  }));

  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none bg-slate-100">
      <div className="absolute inset-0 bg-cyan-50/30 backdrop-blur-[1px] z-10" />
      {particles.map((p) => (
        <div
          key={p.id}
          className={`absolute font-mono font-black ${p.color} animate-fall whitespace-nowrap tracking-widest uppercase`}
          style={{
            left: p.left,
            fontSize: p.size,
            animationDuration: p.duration,
            animationDelay: p.delay,
            top: '-20%'
          }}
        >
          {p.char}
        </div>
      ))}
    </div>
  );
};

export default BusinessBackground;