import React, { useState, useEffect } from 'react';
import Sidebar from "../Components/Sidebar.js";
import Navbar from "../Components/Navbar.js";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

function PerformancePage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [userName, setUserName] = useState("User");
  const [metrics, setMetrics] = useState({ revenue: 0, profit: 0, opex: 0, burn: 0, runway: 0 });
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    // Correctly using 'savedUser' to clear the warning
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
        revenue: parseFloat(rev),
        profit: parseFloat(prof),
        opex: parseFloat(exp),
        burn: parseFloat(burn || 0),
        runway: runway || 0
      });
      
      if (breakdown) {
        setChartData(Object.keys(breakdown).map(key => ({ name: key, value: breakdown[key] })));
      }
    }
  }, []);

  return (
    <div className="flex min-h-screen bg-slate-50 relative font-sans">
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} isFileUploaded={metrics.revenue > 0} />
      
      <div className={`flex-1 transition-all duration-300 ${isSidebarOpen ? 'ml-72' : 'ml-20'}`}>
        <Navbar />
        <main className="p-10 pt-32">
          <header className="mb-10 animate-section">
            <h1 className="text-4xl font-black text-slate-900 tracking-tight">
              {userName}'s Performance Audit
            </h1>
            <p className="text-slate-500 font-medium">Dynamic business health based on your latest data.</p>
          </header>

          {/* Primary KPIs */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div className="bg-white p-8 rounded-[3rem] shadow-xl border-2 border-white">
              <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">Total Revenue</p>
              <h3 className="text-4xl font-black text-slate-900">${metrics.revenue.toLocaleString()}</h3>
            </div>
            <div className="bg-white p-8 rounded-[3rem] shadow-xl border-2 border-white">
              <p className="text-emerald-500 text-xs font-bold uppercase tracking-widest">Net Profit</p>
              <h3 className="text-4xl font-black text-slate-900">${metrics.profit.toLocaleString()}</h3>
            </div>
            <div className="bg-white p-8 rounded-[3rem] shadow-xl border-2 border-white">
              <p className="text-rose-500 text-xs font-bold uppercase tracking-widest">Operating Expenses</p>
              <h3 className="text-4xl font-black text-slate-900">${metrics.opex.toLocaleString()}</h3>
            </div>
          </div>

          {/* Dynamic Burn & Runway */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
             <div className="bg-[#0f172a] p-8 rounded-[3rem] shadow-2xl text-white">
                <p className="text-cyan-400 text-xs font-bold uppercase tracking-widest mb-2">Dynamic Burn Rate</p>
                <h3 className="text-5xl font-black mb-4">${metrics.burn.toLocaleString()}<span className="text-lg text-slate-500">/mo</span></h3>
                <p className="text-slate-400 text-sm italic">Calculated average across the provided dataset.</p>
             </div>
             <div className="bg-gradient-to-br from-cyan-500 to-emerald-500 p-8 rounded-[3rem] shadow-2xl text-white">
                <p className="text-white/80 text-xs font-bold uppercase tracking-widest mb-2">Estimated Runway</p>
                <h3 className="text-5xl font-black mb-4">{metrics.runway} <span className="text-lg text-white/60">Months</span></h3>
                <p className="text-white/80 text-sm italic font-medium">Business survival timeline based on dynamic spending.</p>
             </div>
          </div>

          {/* Expense Breakdown Pie Chart */}
          <div className="bg-white p-10 rounded-[3rem] shadow-xl border-2 border-white flex flex-col md:flex-row items-center">
            <div className="w-full md:w-1/2 h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={chartData} innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
                    {chartData.map((entry, index) => <Cell key={`cell-${index}`} fill={['#06b6d4', '#10b981', '#6366f1', '#f43f5e'][index % 4]} />)}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="w-full md:w-1/2 space-y-4">
              <h4 className="text-xl font-black text-slate-900 mb-6">Expense Distribution</h4>
              {chartData.map((item, index) => (
                <div key={item.name} className="flex justify-between items-center border-b border-slate-50 pb-2">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: ['#06b6d4', '#10b981', '#6366f1', '#f43f5e'][index % 4] }} />
                    <span className="text-slate-600 font-bold">{item.name}</span>
                  </div>
                  <span className="text-slate-900 font-black">${item.value.toLocaleString()}</span>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default PerformancePage;