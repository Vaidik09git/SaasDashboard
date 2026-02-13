import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import Sidebar from "../Components/Sidebar.js";
import Navbar from "../Components/Navbar.js";
import UploadCard from "../Components/UploadCard.js";
import BusinessBackground from "../Components/BusinessBackground.js";

function LandingPage() {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [greeting, setGreeting] = useState('Welcome');
  const [isFileUploaded, setIsFileUploaded] = useState(false);
  const [analysisData, setAnalysisData] = useState({ revenue: null, opex: null });

  useEffect(() => {
    // 1. Maintain existing User Greeting logic
    const savedUser = JSON.parse(localStorage.getItem('user'));
    if (savedUser) setGreeting(`Welcome back, ${savedUser.name}`);

    // 2. Persistent Data Check: Retrieve from storage so it doesn't reset
    const savedRev = localStorage.getItem('analyzed_revenue');
    const savedExp = localStorage.getItem('analyzed_opex');

    if (savedRev && savedExp) {
      setIsFileUploaded(true);
      setAnalysisData({ 
        revenue: parseFloat(savedRev), 
        opex: parseFloat(savedExp) 
      });
    }
  }, []); // Runs on mount to restore the view

  const handleUploadSuccess = (data) => {
    setIsFileUploaded(true);
    setAnalysisData({ revenue: data.revenue, opex: data.opex });
    // Transition to performance after a short delay
    setTimeout(() => navigate('/performance'), 1500);
  };

  return (
    <div className="flex min-h-screen bg-slate-50 relative overflow-hidden font-sans">
      <Sidebar 
        isOpen={isSidebarOpen} 
        toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} 
        isFileUploaded={isFileUploaded}
        onProjectLoad={(proj) => {
          setIsFileUploaded(true);
          setAnalysisData({ revenue: proj.revenue, opex: proj.opex });
        }}
      />
      <div className={`flex-1 flex flex-col transition-all duration-300 ${isSidebarOpen ? 'ml-72' : 'ml-20'}`}>
        <BusinessBackground />
        <Navbar />
        <main className="flex-1 flex flex-col items-center pt-32 px-10">
          
          {/* Metrics Section: Now persists until logout */}
          {analysisData.revenue !== null && (
            <div className="w-full max-w-2xl mb-12 grid grid-cols-2 gap-6 animate-section">
              <div className="bg-white/80 p-7 rounded-[2.5rem] shadow-xl backdrop-blur-xl flex justify-between items-center border-2 border-white">
                <div>
                  <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.2em] mb-1">Total Revenue</p>
                  <h3 className="text-4xl font-black text-slate-900">${analysisData.revenue.toLocaleString()}</h3>
                </div>
              </div>
              <div className="bg-white/80 p-7 rounded-[2.5rem] shadow-xl backdrop-blur-xl flex justify-between items-center border-2 border-white">
                <div>
                  <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.2em] mb-1">Total OpEx</p>
                  <h3 className="text-4xl font-black text-slate-900">${analysisData.opex.toLocaleString()}</h3>
                </div>
              </div>
            </div>
          )}

          <div className="text-center mb-16">
            <h2 className="text-3xl font-black text-slate-900 tracking-tight">{greeting}</h2>
            <h1 className="text-6xl font-black text-slate-900 mt-4 leading-tight">Analyze. <span className="bg-gradient-to-r from-cyan-600 to-emerald-600 bg-clip-text text-transparent italic">Optimise.</span></h1>
          </div>

          <div className="w-full max-w-lg bg-white/70 p-12 rounded-[3rem] shadow-2xl backdrop-blur-3xl border-2 border-white">
            <UploadCard onUploadSuccess={handleUploadSuccess} />
          </div>
        </main>
      </div>
    </div>
  );
}

export default LandingPage;