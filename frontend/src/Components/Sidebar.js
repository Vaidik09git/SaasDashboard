import React from 'react';
import { 
  Home, BarChart2, Settings, Plus, Search, Folder, 
  ChevronRight, ChevronLeft, LogOut, ClipboardList, 
  Download, Users 
} from 'lucide-react';

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const menuItems = [
    { icon: <Home size={20} />, label: 'Home', active: true },
    { icon: <BarChart2 size={20} />, label: 'Performance', active: false },
    { icon: <ClipboardList size={20} />, label: 'Audit Logs', active: false },
    { icon: <Download size={20} />, label: 'Export Center', active: false },
    { icon: <Users size={20} />, label: 'Team Workspace', active: false },
    { icon: <Settings size={20} />, label: 'Settings', active: false },
  ];

  const projects = ['B2B SaaS Dashboard', 'DDoS Detection', 'Finance Agent'];

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    window.location.reload();
  };

  return (
    <aside 
      className={`fixed left-0 top-0 h-screen bg-[#0f172a] border-r border-white/10 z-50 transition-all duration-300 ease-in-out flex flex-col shadow-2xl ${isOpen ? 'w-72 p-6' : 'w-20 p-4'}`}
    >
      {/* Toggle Button */}
      <button 
        onClick={toggleSidebar} 
        className="absolute -right-3 top-10 w-7 h-7 bg-cyan-400 rounded-full flex items-center justify-center text-slate-900 border-2 border-[#0f172a] hover:bg-white transition-all shadow-lg shadow-cyan-500/20 z-[60]"
      >
        {isOpen ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
      </button>

      {/* Brand Section */}
      <div className={`flex items-center gap-3 mb-10 ${isOpen ? 'px-2' : 'justify-center'}`}>
        <div className="min-w-[36px] w-9 h-9 bg-gradient-to-br from-cyan-400 to-emerald-400 rounded-xl flex items-center justify-center shadow-lg">
          <span className="text-white font-black text-sm">H</span>
        </div>
        {isOpen && (
          <span className="text-2xl font-bold tracking-tighter text-white animate-section">
            Hisab<span className="text-cyan-400">.ai</span>
          </span>
        )}
      </div>

      {/* New Project Button */}
      <div className="mb-8 flex justify-center">
        <button className={`bg-white text-slate-900 font-black rounded-xl flex items-center justify-center gap-2 hover:bg-cyan-50 transition-all shadow-xl py-3.5 ${isOpen ? 'w-full px-4' : 'w-12'}`}>
          <Plus size={20} strokeWidth={3} />
          {isOpen && <span className="whitespace-nowrap">New Project</span>}
        </button>
      </div>

      {/* Search Bar */}
      <div className="relative mb-6 flex justify-center group">
        <Search className={`${isOpen ? 'absolute left-3' : ''} top-1/2 -translate-y-1/2 text-cyan-400`} size={18} />
        {isOpen && (
          <input 
            type="text" 
            placeholder="Search..." 
            className="w-full bg-slate-800 border border-slate-700 rounded-xl py-2 pl-10 pr-4 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-500 transition-all" 
          />
        )}
      </div>

      {/* Main Menu - Fixed Vertical Scroll (No horizontal bug) */}
      <nav className="space-y-1 mb-6 overflow-y-auto overflow-x-hidden custom-scrollbar flex-none">
        {isOpen && <p className="text-[11px] uppercase tracking-[0.25em] text-slate-400 font-bold mb-3 px-3">Main Menu</p>}
        {menuItems.map((item) => (
          <button 
            key={item.label} 
            className={`flex items-center gap-4 py-2.5 rounded-xl transition-all group ${item.active ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20' : 'text-slate-300 hover:bg-slate-800 hover:text-white'} ${isOpen ? 'w-full px-4' : 'justify-center w-12'}`}
          >
            <span className={`${item.active ? 'text-cyan-400' : 'text-slate-400 group-hover:text-cyan-400'} shrink-0`}>
              {item.icon}
            </span>
            {isOpen && <span className="text-sm font-bold whitespace-nowrap">{item.label}</span>}
          </button>
        ))}
      </nav>

      {/* Projects Section - Fixed Vertical Scroll */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden custom-scrollbar mb-4">
        {isOpen && <p className="text-[11px] uppercase tracking-[0.25em] text-slate-400 font-bold mb-3 px-3">Recent Projects</p>}
        <div className="space-y-1">
          {projects.map((project) => (
            <button 
              key={project} 
              className={`flex items-center gap-3 py-2.5 rounded-xl text-slate-400 hover:bg-slate-800 hover:text-emerald-400 transition-all group ${isOpen ? 'w-full px-4' : 'justify-center w-12'}`}
            >
              <Folder size={18} className="shrink-0 group-hover:text-emerald-400" />
              {isOpen && <span className="text-[13px] truncate font-semibold">{project}</span>}
            </button>
          ))}
        </div>
      </div>

      {/* Logout Button Section */}
      <div className="pt-4 border-t border-white/5 mt-auto">
        <button 
          onClick={handleLogout}
          className={`flex items-center gap-4 py-3 rounded-xl text-red-400 hover:bg-red-500/10 transition-all group ${isOpen ? 'w-full px-4' : 'justify-center w-12'}`}
        >
          <LogOut size={20} className="shrink-0" />
          {isOpen && <span className="text-sm font-bold">Logout</span>}
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;