import React, { useState, useEffect } from 'react';
import Sidebar from "../Components/Sidebar.js";
import Navbar from "../Components/Navbar.js";
import { Download, FileText, CheckCircle, Clock } from 'lucide-react';

function ExportCenter() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [reportData, setReportData] = useState(null);

  useEffect(() => {
    const rev = localStorage.getItem('analyzed_revenue');
    if (rev) {
      setReportData({
        revenue: rev,
        profit: localStorage.getItem('analyzed_profit'),
        runway: localStorage.getItem('runway'),
        date: new Date().toLocaleDateString()
      });
    }
  }, []);

  const handleDownload = () => {
    setIsGenerating(true);
    // Mimicking the AI Report generation process
    setTimeout(() => {
      setIsGenerating(false);
      alert("📥 AI Report Generated: business_performance_report.pdf");
    }, 2500);
  };

  return (
    <div className="flex min-h-screen bg-slate-50 font-sans">
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} isFileUploaded={!!reportData} />
      
      <div className={`flex-1 transition-all duration-300 ${isSidebarOpen ? 'ml-72' : 'ml-20'}`}>
        <Navbar />
        <main className="p-10 pt-32 max-w-5xl mx-auto">
          <header className="mb-12">
            <h1 className="text-4xl font-black text-slate-900 tracking-tight">Export Center</h1>
            <p className="text-slate-500 font-medium">Download AI-generated intelligence reports and raw ledger data.</p>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* PDF Report Card */}
            <div className="bg-white p-10 rounded-[3rem] shadow-sm border border-slate-100 flex flex-col items-center text-center">
              <div className="w-20 h-20 bg-cyan-500/10 rounded-[2rem] flex items-center justify-center text-cyan-600 mb-6">
                <FileText size={40} />
              </div>
              <h3 className="text-2xl font-black text-slate-900 mb-2">Executive PDF Audit</h3>
              <p className="text-slate-500 text-sm mb-8 leading-relaxed">
                A full performance report including revenue trends, cost distribution, and AI forecasts.
              </p>
              <button 
                onClick={handleDownload}
                disabled={!reportData || isGenerating}
                className="w-full py-4 bg-slate-900 text-white rounded-2xl font-bold flex items-center justify-center gap-3 hover:bg-cyan-600 transition-all disabled:opacity-50"
              >
                {isGenerating ? "Compiling Report..." : <><Download size={20} /> Generate PDF</>}
              </button>
            </div>

            {/* Project Status Info */}
            <div className="bg-slate-900 p-10 rounded-[3rem] shadow-2xl text-white relative overflow-hidden">
               <h4 className="text-xl font-bold mb-6 flex items-center gap-2">
                 <CheckCircle size={20} className="text-emerald-400" /> Current Audit Status
               </h4>
               <div className="space-y-6">
                 <div className="flex justify-between border-b border-white/10 pb-4">
                   <span className="text-slate-400 text-sm">Status</span>
                   <span className="font-bold text-cyan-400">Ready for Export</span>
                 </div>
                 <div className="flex justify-between border-b border-white/10 pb-4">
                   <span className="text-slate-400 text-sm">Processed On</span>
                   <span className="font-bold">{reportData?.date || "N/A"}</span>
                 </div>
                 <div className="flex justify-between">
                   <span className="text-slate-400 text-sm">AI Confidence</span>
                   <span className="font-bold">98.4%</span>
                 </div>
               </div>
               <div className="mt-10 p-6 bg-white/5 rounded-2xl border border-white/5 flex items-center gap-4">
                  <Clock className="text-slate-500" />
                  <p className="text-xs text-slate-400 italic leading-snug">
                    Reports are generated based on the latest performance audit for "saas" and saved projects.
                  </p>
               </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default ExportCenter;