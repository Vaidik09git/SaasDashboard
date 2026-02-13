import React, { useState, useEffect } from 'react';
import { 
  Home, BarChart2, Settings, ChevronRight, 
  ChevronLeft, LogOut, ClipboardList, 
  Download, Users, AlertCircle, Folder 
} from 'lucide-react'; 
import { useLocation, useNavigate } from 'react-router';
import axios from 'axios';

const Sidebar = ({ isOpen, toggleSidebar, isFileUploaded, onProjectLoad }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [projects, setProjects] = useState([]);

  // Fetch saved projects specifically for the logged-in user
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const user = JSON.parse(localStorage.getItem('user'));
        const token = localStorage.getItem('token');
        
        // Ensure user ID exists from the updated authRoutes
        if (user && user.id && token) {
          const res = await axios.get(`http://localhost:5000/api/projects/${user.id}`, {
            headers: { Authorization: `Bearer ${token}` }
          });
          setProjects(res.data);
        }
      } catch (err) {
        console.error("Error fetching projects", err);
      }
    };
    fetchProjects();
  }, [isFileUploaded, location.pathname]); // Refresh when file is uploaded or navigating

  const menuItems = [
    { icon: <Home size={20} />, label: 'Home', path: '/dashboard', protected: false },
    { icon: <BarChart2 size={20} />, label: 'Performance', path: '/performance', protected: true },
    { icon: <ClipboardList size={20} />, label: 'Audit Logs', path: '/audit', protected: true },
    { icon: <Download size={20} />, label: 'Export Center', path: '/export', protected: true },
    { icon: <Users size={20} />, label: 'Team Workspace', path: '/team', protected: false },
    { icon: <Settings size={20} />, label: 'Settings', path: '/settings', protected: false },
  ];

  const handleNavClick = (item) => {
    if (item.protected && !isFileUploaded) {
      alert("⚠️ Please upload a file first to access " + item.label);
      return;
    }
    navigate(item.path);
  };

  // Inside Sidebar.js, update handleProjectClick:
const handleProjectClick = (proj) => {
  localStorage.setItem('analyzed_revenue', proj.revenue);
  localStorage.setItem('analyzed_opex', proj.opex);
  localStorage.setItem('analyzed_profit', proj.profit);
  localStorage.setItem('burn_rate', proj.burnRate);
  localStorage.setItem('runway', proj.runway);
  localStorage.setItem('expense_breakdown', JSON.stringify(proj.expenseBreakdown));
  
  // Ensure the chart data is loaded when clicking a saved project
  if (proj.monthlyTrends) {
    localStorage.setItem('monthly_trends', JSON.stringify(proj.monthlyTrends));
  }
  
  onProjectLoad(proj);
  navigate('/performance');
};

  const confirmLogout = () => {
    localStorage.clear(); 
    window.location.href = '/'; 
  };

  return (
    <>
      <style>{`
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
      <aside className={`fixed left-0 top-0 h-screen bg-[#0f172a] border-r border-white/10 z-50 transition-all duration-300 flex flex-col shadow-2xl ${isOpen ? 'w-72 p-6' : 'w-20 p-4'}`}>
        <button onClick={toggleSidebar} className="absolute -right-3 top-10 w-7 h-7 bg-cyan-400 rounded-full flex items-center justify-center text-slate-900 border-2 border-[#0f172a] hover:bg-white transition-all shadow-lg z-[60]">
          {isOpen ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
        </button>

        <div className={`flex items-center gap-3 mb-10 ${isOpen ? 'px-2' : 'justify-center'}`}>
          <div className="min-w-[36px] w-9 h-9 bg-gradient-to-br from-cyan-400 to-emerald-400 rounded-xl flex items-center justify-center text-white font-black shadow-lg">H</div>
          {isOpen && <span className="text-2xl font-bold text-white tracking-tighter">Hisab<span className="text-cyan-400">.ai</span></span>}
        </div>

        {/* Your Projects Section */}
        {isOpen && (
          <div className="mb-8">
            <p className="text-[11px] uppercase tracking-[0.25em] text-slate-500 font-bold mb-4 px-3">Your Projects</p>
            <div className="space-y-2 max-h-48 overflow-y-auto scrollbar-hide">
              {projects.length > 0 ? (
                projects.map((proj) => (
                  <button 
                    key={proj._id}
                    onClick={() => handleProjectClick(proj)}
                    className="w-full flex items-center gap-3 px-4 py-2 rounded-xl text-slate-400 hover:bg-slate-800 hover:text-cyan-400 transition-all text-sm font-bold"
                  >
                    <Folder size={16} />
                    <span className="truncate">{proj.projectName}</span>
                  </button>
                ))
              ) : (
                <p className="text-[10px] text-slate-500 px-3 italic">No saved projects found</p>
              )}
            </div>
          </div>
        )}

        <nav className="space-y-1 mb-6 flex-1 overflow-y-auto scrollbar-hide">
          {isOpen && <p className="text-[11px] uppercase tracking-[0.25em] text-slate-500 font-bold mb-3 px-3">Main Menu</p>}
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <button 
                key={item.label} 
                onClick={() => handleNavClick(item)} 
                className={`flex items-center gap-4 py-2.5 rounded-xl transition-all group ${isActive ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20' : 'text-slate-300 hover:bg-slate-800'} ${isOpen ? 'w-full px-4' : 'justify-center w-12'}`}
              >
                <span className={`${isActive ? 'text-cyan-400' : 'text-slate-400 group-hover:text-cyan-400'}`}>{item.icon}</span>
                {isOpen && <span className="text-sm font-bold">{item.label}</span>}
              </button>
            );
          })}
        </nav>

        <div className="pt-4 border-t border-white/5 mt-auto">
          <button onClick={() => setShowLogoutConfirm(true)} className={`flex items-center gap-4 py-3 rounded-xl text-red-400 hover:bg-red-500/10 transition-all group ${isOpen ? 'w-full px-4' : 'justify-center w-12'}`}>
            <LogOut size={20} className="shrink-0" />
            {isOpen && <span className="text-sm font-bold">Logout</span>}
          </button>
        </div>
      </aside>

      {showLogoutConfirm && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 backdrop-blur-md bg-black/40">
          <div className="bg-slate-900 border border-white/10 p-8 rounded-[2.5rem] max-w-sm w-full shadow-2xl text-center">
            <AlertCircle size={32} className="text-red-500 mx-auto mb-6" />
            <h3 className="text-white text-xl font-bold mb-2">End Session?</h3>
            <p className="text-slate-400 text-sm mb-8 leading-relaxed">Confirming logout will clear all performance metrics for your security.</p>
            <div className="flex gap-4">
              <button onClick={() => setShowLogoutConfirm(false)} className="flex-1 py-3 bg-slate-800 text-slate-300 rounded-xl font-bold">Cancel</button>
              <button onClick={confirmLogout} className="flex-1 py-3 bg-red-500 text-white rounded-xl font-bold">Logout</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Sidebar;