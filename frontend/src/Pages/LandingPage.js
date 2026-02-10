import React, { useState, useEffect } from 'react';
import Sidebar from "../Components/Sidebar.js";
import Navbar from "../Components/Navbar.js";
import UploadCard from "../Components/UploadCard.js";
import BusinessBackground from "../Components/BusinessBackground.js";

function LandingPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [greeting, setGreeting] = useState('Welcome');
  const [subText, setSubText] = useState('Modern intelligence for your business ledgers.');

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  useEffect(() => {
    // Retrieve the user object stored during Login/Register
    const storedUser = JSON.parse(localStorage.getItem('user'));
    
    if (storedUser && storedUser.name) {
      if (storedUser.isNew === true) {
        // Registered for the first time
        setGreeting(`Welcome, ${storedUser.name}`);
        setSubText('How can I help you today?');
      } else {
        // Returning user logging back in
        setGreeting(`Welcome back, ${storedUser.name}`);
        setSubText('How should I assist you today?');
      }
    } else {
      // Default for guests
      setGreeting('Welcome');
      setSubText('Modern intelligence for your business ledgers.');
    }
  }, []);

  return (
    <div className="flex min-h-screen bg-slate-50 relative overflow-hidden font-sans">
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      <div className={`flex-1 transition-all duration-300 ease-in-out relative z-10 flex flex-col ${isSidebarOpen ? 'ml-72' : 'ml-20'}`}>
        <BusinessBackground />
        <Navbar />

        <main className="flex-1 flex flex-col items-center pt-32 pb-20 px-10">
          <div className="text-center mb-16 animate-section">
            <h2 className="text-3xl font-black text-slate-900 tracking-tight mb-2">
              {greeting}
            </h2>
            <p className="text-slate-500 font-medium mb-8">
              {subText}
            </p>

            <h1 className="text-6xl md:text-7xl font-black tracking-tightest mb-4 leading-none text-slate-900">
              Analyze. <span className="bg-gradient-to-r from-cyan-600 to-emerald-600 bg-clip-text text-transparent italic">Optimise.</span>
            </h1>
          </div>

          <div className="w-full max-w-lg relative group">
            <div className="relative bg-white/70 border-2 border-white p-12 rounded-[3rem] backdrop-blur-3xl shadow-2xl">
              <UploadCard />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default LandingPage;