import React from 'react';
import { Link } from 'react-router';

const Navbar = () => {
  return (
    <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-6xl">
      <div className="bg-slate-900/40 backdrop-blur-md border border-white/10 px-8 py-4 rounded-3xl flex items-center justify-between shadow-2xl">
        {/* Logo Section */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-br from-cyan-400 to-indigo-500 rounded-lg flex items-center justify-center shadow-lg shadow-indigo-500/20">
            <span className="text-white font-black text-xs">H</span>
          </div>
          <span className="text-xl font-bold tracking-tighter text-white">Hisab<span className="text-cyan-400">.ai</span></span>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-6">
          <Link to="/login" className="text-slate-400 hover:text-white transition-colors text-sm font-medium">
            Login
          </Link>
          <button className="bg-white text-slate-950 px-5 py-2 rounded-xl text-sm font-bold hover:bg-slate-200 transition-all active:scale-95">
            Get Started
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;