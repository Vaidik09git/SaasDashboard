import React, { useState, useEffect } from 'react';
import Sidebar from "../Components/Sidebar.js";
import Navbar from "../Components/Navbar.js";
import axios from 'axios';
// Removed Calendar to fix the warning
import { FileText, ArrowRight } from 'lucide-react'; 

function AuditLogs() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const user = JSON.parse(localStorage.getItem('user'));
        // Ensure user ID exists from updated authRoutes
        if (user && user.id) {
          const res = await axios.get(`http://localhost:5000/api/projects/${user.id}`);
          setLogs(res.data);
        }
      } catch (err) {
        console.error("Error fetching audit logs", err);
      }
    };
    fetchLogs();
  }, []);

  return (
    <div className="flex min-h-screen bg-slate-50 font-sans">
      <Sidebar 
        isOpen={isSidebarOpen} 
        toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} 
        isFileUploaded={true} 
      />
      
      <div className={`flex-1 transition-all duration-300 ${isSidebarOpen ? 'ml-72' : 'ml-20'}`}>
        <Navbar />
        <main className="p-10 pt-32 max-w-6xl mx-auto">
          <header className="mb-10">
            <h1 className="text-4xl font-black text-slate-900 tracking-tight">Audit Logs</h1>
            <p className="text-slate-500 font-medium">History of all business ledger processing events.</p>
          </header>

          <div className="bg-white rounded-[2.5rem] shadow-sm border border-slate-100 overflow-hidden">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/50 border-b border-slate-100">
                  <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-slate-400">Processing Event</th>
                  <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-slate-400">Timestamp</th>
                  <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-slate-400">Revenue</th>
                  <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-slate-400">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {logs.map((log) => (
                  <tr key={log._id} className="hover:bg-slate-50/30 transition-colors group">
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-slate-900 rounded-xl flex items-center justify-center text-white shadow-lg">
                          <FileText size={18} />
                        </div>
                        <div>
                          <p className="text-sm font-bold text-slate-900">{log.projectName}</p>
                          <p className="text-[10px] text-cyan-600 font-black uppercase tracking-tighter italic">AI Pipeline Success</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6 text-sm text-slate-500 font-medium">
                      {new Date(log.createdAt).toLocaleString()}
                    </td>
                    <td className="px-8 py-6 text-sm font-black text-slate-900">
                      ${log.revenue ? log.revenue.toLocaleString() : "0"}
                    </td>
                    <td className="px-8 py-6">
                      <button className="flex items-center gap-2 text-xs font-black text-slate-400 group-hover:text-cyan-600 transition-colors uppercase tracking-widest">
                        Re-load Audit <ArrowRight size={14} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {logs.length === 0 && (
              <div className="p-20 text-center text-slate-400 italic">
                No processing history found. Upload a file to generate logs.
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}

export default AuditLogs;