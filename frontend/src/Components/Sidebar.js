import React from 'react';
import { 
  Home, BarChart2, Settings, ChevronRight, 
  ChevronLeft, LogOut, ClipboardList, 
  Download, Users 
} from 'lucide-react';
import { useLocation, useNavigate } from 'react-router';

const Sidebar = ({ isOpen, toggleSidebar, isFileUploaded }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const menuItems = [
    { icon: <Home size={20} />, label: 'Home', path: '/', protected: false },
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

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    // Security: Wipe all financial data on logout
    localStorage.removeItem('analyzed_revenue');
    localStorage.removeItem('analyzed_profit');
    localStorage.removeItem('analyzed_opex');
    localStorage.removeItem('burn_rate');
    localStorage.removeItem('runway');
    localStorage.removeItem('expense_breakdown');
    localStorage.removeItem('last_file_name');
    window.location.href = '/login';
  };

  return (
    <aside className={`fixed left-0 top-0 h-screen bg-[#0f172a] border-r border-white/10 z-50 transition-all duration-300 ease-in-out flex flex-col shadow-2xl ${isOpen ? 'w-72 p-6' : 'w-20 p-4'}`}>
      <button onClick={toggleSidebar} className="absolute -right-3 top-10 w-7 h-7 bg-cyan-400 rounded-full flex items-center justify-center text-slate-900 border-2 border-[#0f172a] hover:bg-white transition-all shadow-lg z-[60]">
        {isOpen ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
      </button>

      <div className={`flex items-center gap-3 mb-10 ${isOpen ? 'px-2' : 'justify-center'}`}>
        <div className="min-w-[36px] w-9 h-9 bg-gradient-to-br from-cyan-400 to-emerald-400 rounded-xl flex items-center justify-center shadow-lg">
          <span className="text-white font-black text-sm">H</span>
        </div>
        {isOpen && <span className="text-2xl font-bold tracking-tighter text-white">Hisab<span className="text-cyan-400">.ai</span></span>}
      </div>

      <nav className="space-y-1 mb-6 flex-none pr-1">
        {isOpen && <p className="text-[11px] uppercase tracking-[0.25em] text-slate-400 font-bold mb-3 px-3">Main Menu</p>}
        {menuItems.map((item) => {
          // Dynamic Active State Logic
          const isActive = location.pathname === item.path;
          return (
            <button 
              key={item.label} 
              onClick={() => handleNavClick(item)}
              className={`flex items-center gap-4 py-2.5 rounded-xl transition-all group ${
                  isActive ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 shadow-sm' : 'text-slate-300 hover:bg-slate-800 hover:text-white'
              } ${isOpen ? 'w-full px-4' : 'justify-center w-12'}`}
            >
              <span className={`${isActive ? 'text-cyan-400' : 'text-slate-400 group-hover:text-cyan-400'} shrink-0`}>
                {item.icon}
              </span>
              {isOpen && <span className="text-sm font-bold whitespace-nowrap">{item.label}</span>}
            </button>
          );
        })}
      </nav>

      <div className="pt-4 border-t border-white/5 mt-auto">
        <button onClick={handleLogout} className={`flex items-center gap-4 py-3 rounded-xl text-red-400 hover:bg-red-500/10 transition-all group ${isOpen ? 'w-full px-4' : 'justify-center w-12'}`}>
          <LogOut size={20} className="shrink-0" />
          {isOpen && <span className="text-sm font-bold">Logout</span>}
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;