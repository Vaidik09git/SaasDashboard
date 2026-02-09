import React from 'react';

const BusinessBackground = () => {
  // 18 Financial terms plus symbols and binary data
  const elements = [
    'ROI', 'EBITDA', 'CAGR', 'EQUITY', 'ASSETS', 'LIQUIDITY', 
    'MARGIN', 'CAPITAL', 'REVENUE', 'LEDGER', 'DIVIDEND', 
    'BULL', 'BEAR', 'PORTFOLIO', 'STOCKS', 'HEDGE', 'YIELD', 'P&L',
    '$', '₹', '£', '₿', '📈', '📉', 'Δ', '1010'
  ];
  
  // High density (60 elements) for a "Data Stream" feel
  const particles = Array.from({ length: 60 }).map((_, i) => ({
    id: i,
    char: elements[Math.floor(Math.random() * elements.length)],
    left: `${Math.random() * 100}%`,
    duration: `${18 + Math.random() * 22}s`, // Slower drift for readability
    delay: `${Math.random() * 12}s`,
    size: `${Math.random() * (35 - 18) + 18}px`,
    // Color logic: Financial terms are often neutral, symbols are red/green
    color: Math.random() > 0.7 
      ? 'text-green-400/50' 
      : Math.random() > 0.4 ? 'text-red-400/50' : 'text-zinc-600/30'
  }));

  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none bg-[#020202]">
      {/* 90% Transparent Overlay as requested */}
      <div className="absolute inset-0 bg-black/10 backdrop-blur-[1.5px] z-10" />

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
      
      {/* Market Sentiment Gradients (Subtle Green/Red glows) */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-1/3 bg-gradient-to-b from-green-500/5 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-red-500/5 to-transparent" />
      </div>
    </div>
  );
};

export default BusinessBackground;