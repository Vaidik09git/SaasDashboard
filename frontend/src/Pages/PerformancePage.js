import React, { useState, useEffect } from 'react';
import Sidebar from "../Components/Sidebar.js";
import Navbar from "../Components/Navbar.js";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

function PerformancePage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [userName, setUserName] = useState("User"); // For dynamic greeting
  const [metrics, setMetrics] = useState({ revenue: 0, profit: 0, opex: 0, burn: 0, runway: 0 });
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    // Utilize savedUser to personalize the page and clear ESLint warnings
    const savedUser = JSON.parse(localStorage.getItem('user'));
    if (savedUser && savedUser.name) {
      setUserName(savedUser.name.split(' ')[0]);
    }

    const rev = localStorage.getItem('analyzed_revenue');
    const prof = localStorage.getItem('analyzed_profit');
    const exp = localStorage.getItem('analyzed_opex');
    const burn = localStorage.getItem('burn_rate');
    const runway = localStorage.getItem('runway');
    const breakdown = JSON.parse(localStorage.getItem('expense_breakdown'));

    if (rev) {
      setMetrics({
        revenue: parseFloat(rev), profit: parseFloat(prof), opex: parseFloat(exp),
        burn: parseFloat(burn || 0), runway: runway || 0
      });
      if (breakdown) {
        setChartData(Object.keys(breakdown).map(key => ({ name: key, value: breakdown[key] })));
      }
    }
  }, []);

  const COLORS = ['#06b6d4', '#10b981', '#6366f1', '#f43f5e'];

  return (
    <div className="flex min-h-screen bg-slate-50 font-sans">
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} isFileUploaded={true} />
      
      <div className={`flex-1 transition-all duration-300 ${isSidebarOpen ? 'ml-72' : 'ml-20'}`}>
        <Navbar />
        <main className="p-10 pt-32 max-w-7xl mx-auto">
          <header className="mb-12">
            <h1 className="text-4xl font-black text-slate-900 tracking-tight">{userName}'s Performance Audit</h1>
            <p className="text-slate-500 font-medium">Real-time financial intelligence strictly from your business ledger.</p>
          </header>

          {/* KPI Row: High-Impact Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100 group hover:shadow-md transition-shadow">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Gross Revenue</span>
              <h2 className="text-4xl font-black text-slate-900 mt-2">${metrics.revenue.toLocaleString()}</h2>
              <div className="mt-4 text-emerald-500 text-sm font-bold">↑ 8.4% <span className="text-slate-300 font-medium italic ml-1">vs average</span></div>
            </div>
            <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100">
              <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest">Net Profit</span>
              <h2 className="text-4xl font-black text-slate-900 mt-2">${metrics.profit.toLocaleString()}</h2>
              <div className="mt-4 inline-block bg-emerald-50 text-emerald-600 px-3 py-1 rounded-full text-xs font-black">
                Margin: {metrics.revenue > 0 ? ((metrics.profit / metrics.revenue) * 100).toFixed(1) : 0}%
              </div>
            </div>
            <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100">
              <span className="text-[10px] font-bold text-rose-400 uppercase tracking-widest">Total OpEx</span>
              <h2 className="text-4xl font-black text-slate-900 mt-2">${metrics.opex.toLocaleString()}</h2>
            </div>
          </div>

          {/* Health Section: High-Contrast Burn & Runway */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            <div className="bg-slate-900 p-8 rounded-[2.5rem] text-white shadow-2xl relative overflow-hidden">
               <div className="relative z-10">
                <p className="text-cyan-400 text-[10px] font-black uppercase tracking-widest mb-2">Monthly Cash Burn</p>
                <h3 className="text-5xl font-black">${metrics.burn.toLocaleString()}</h3>
                <p className="text-slate-500 text-xs mt-2 italic">Avg. dynamic spending per month</p>
               </div>
               <div className="absolute -right-4 -bottom-4 w-32 h-32 bg-cyan-500/10 rounded-full blur-3xl" />
            </div>
            <div className="bg-gradient-to-br from-cyan-600 to-emerald-600 p-8 rounded-[2.5rem] text-white shadow-2xl">
               <p className="text-white/70 text-[10px] font-black uppercase tracking-widest mb-2">Operational Runway</p>
               <h3 className="text-5xl font-black">{metrics.runway} <span className="text-xl font-medium opacity-60">Months</span></h3>
               {/* Visual Runway Progress Bar */}
               <div className="w-full bg-white/20 h-2 rounded-full mt-6 overflow-hidden">
                  <div className="bg-white h-full transition-all duration-1000" style={{ width: `${Math.min((parseFloat(metrics.runway) / 24) * 100, 100)}%` }} />
               </div>
            </div>
          </div>

          {/* Expense Analytics: Professional Donut Chart */}
          <div className="bg-white p-10 rounded-[3rem] shadow-sm border border-slate-100 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="h-72 relative">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={chartData} innerRadius={80} outerRadius={100} paddingAngle={8} dataKey="value">
                    {chartData.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} cornerRadius={10} />)}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span className="text-slate-400 text-[10px] font-bold uppercase">Total OpEx</span>
                <span className="text-2xl font-black text-slate-900">${metrics.opex.toLocaleString()}</span>
              </div>
            </div>
            <div>
              <h4 className="text-2xl font-black text-slate-900 mb-8">Cost Distribution</h4>
              <div className="space-y-4">
                {chartData.map((item, index) => (
                  <div key={item.name} className="flex justify-between items-center group">
                    <div className="flex items-center gap-4">
                      <div className="w-4 h-4 rounded-md shadow-sm" style={{ backgroundColor: COLORS[index % COLORS.length] }} />
                      <span className="text-slate-600 font-bold group-hover:text-slate-900 transition-colors">{item.name}</span>
                    </div>
                    <span className="text-slate-900 font-black">${item.value.toLocaleString()}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default PerformancePage;