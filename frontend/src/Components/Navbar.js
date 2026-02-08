import { Link } from "react-router"; // Import Link for SPA navigation
import { LayoutDashboard } from 'lucide-react';

function Navbar() {
  return (
    <nav className="flex justify-between items-center px-10 py-4 bg-white/80 backdrop-blur-md border-b border-zinc-200/50 sticky top-0 z-50">
      <div className="flex items-center gap-2">
        <LayoutDashboard size={24} className="text-blue-600" />
        <h2 className="text-xl font-bold text-zinc-900 tracking-tight">SaaS Dashboard AI</h2>
      </div>
      <div className="flex items-center gap-4">
        {/* Link to the Login page defined in App.js */}
        <Link 
          to="/login" 
          className="text-sm font-medium text-zinc-500 hover:text-zinc-900 transition-colors px-4 py-2"
        >
          Login
        </Link>
        <button className="bg-zinc-900 text-white px-6 py-2 rounded-lg text-sm font-semibold hover:bg-zinc-800 transition-all shadow-lg active:scale-95">
          Get Started
        </button>
      </div>
    </nav>
  );
}

export default Navbar;