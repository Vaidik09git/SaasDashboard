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
  const [subText, setSubText] = useState('Modern intelligence for your business ledgers.');
  
  // State for persistent Revenue and OpEx
  const [isFileUploaded, setIsFileUploaded] = useState(false);
  const [analysisData, setAnalysisData] = useState({
    revenue: null,
    opex: null
  });

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  useEffect(() => {
    // 1. Maintain existing User Greeting logic
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser && storedUser.name) {
      if (storedUser.isNew === true) {
        setGreeting(`Welcome, ${storedUser.name}`);
        setSubText('How can I help you today?');
      } else {
        setGreeting(`Welcome back, ${storedUser.name}`);
        setSubText('How should I assist you today?');
      }
    }

    // 2. NEW: Check for existing analysis data to keep cards visible
    const savedRevenue = localStorage.getItem('analyzed_revenue');
    const savedOpEx = localStorage.getItem('analyzed_opex');
    
    if (savedRevenue && savedOpEx) {
      setIsFileUploaded(true);
      setAnalysisData({
        revenue: parseFloat(savedRevenue),
        opex: parseFloat(savedOpEx)
      });
    }
  }, []);

  // Updated to handle both initial upload and persistent storage
  const handleUploadSuccess = (data) => {
    setIsFileUploaded(true);
    setAnalysisData({
      revenue: data.revenue,
      opex: data.opex
    });

    // Auto-redirect to performance page
    setTimeout(() => {
      navigate('/performance');
    }, 1500);
  };

  return (
    <div className="flex min-h-screen bg-slate-50 relative overflow-hidden font-sans">
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} isFileUploaded={isFileUploaded} />

      <div className={`flex-1 transition-all duration-300 ease-in-out relative z-10 flex flex-col ${isSidebarOpen ? 'ml-72' : 'ml-20'}`}>
        <BusinessBackground />
        <Navbar />

        <main className="flex-1 flex flex-col items-center pt-32 pb-20 px-10">
          
          {/* Persistent Homepage KPIs: Only Revenue and OpEx */}
          {analysisData.revenue !== null && (
            <div className="w-full max-w-2xl mb-12 animate-section grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Total Revenue Card */}
              <div className="bg-white/80 border-2 border-white p-7 rounded-[2.5rem] shadow-xl backdrop-blur-xl flex justify-between items-center group hover:scale-[1.02] transition-all">
                <div>
                  <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.2em] mb-1">Total Revenue</p>
                  <h3 className="text-4xl font-black text-slate-900">
                    ${analysisData.revenue.toLocaleString()}
                  </h3>
                </div>
                <div className="w-12 h-12 bg-cyan-500/10 rounded-2xl flex items-center justify-center text-cyan-600">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="1" x2="12" y2="23"></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>
                </div>
              </div>

              {/* Operating Expenses (OpEx) Card */}
              <div className="bg-white/80 border-2 border-white p-7 rounded-[2.5rem] shadow-xl backdrop-blur-xl flex justify-between items-center group hover:scale-[1.02] transition-all">
                <div>
                  <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.2em] mb-1">Total OpEx</p>
                  <h3 className="text-4xl font-black text-slate-900">
                    ${analysisData.opex.toLocaleString()}
                  </h3>
                </div>
                <div className="w-12 h-12 bg-rose-500/10 rounded-2xl flex items-center justify-center text-rose-500">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20V10"/><path d="M18 20V4"/><path d="M6 20v-4"/></svg>
                </div>
              </div>

            </div>
          )}

          <div className="text-center mb-16 animate-section">
            <h2 className="text-3xl font-black text-slate-900 tracking-tight mb-2">{greeting}</h2>
            <p className="text-slate-500 font-medium mb-8 italic">{subText}</p>
            <h1 className="text-6xl md:text-7xl font-black tracking-tightest mb-4 leading-none text-slate-900">
              Analyze. <span className="bg-gradient-to-r from-cyan-600 to-emerald-600 bg-clip-text text-transparent italic">Optimise.</span>
            </h1>
          </div>

          <div className="w-full max-w-lg relative group">
            <div className="relative bg-white/70 border-2 border-white p-12 rounded-[3rem] backdrop-blur-3xl shadow-2xl">
              <UploadCard onUploadSuccess={handleUploadSuccess} />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default LandingPage;