import React, { useRef, useState } from 'react';
import { Upload } from 'lucide-react';
import Papa from 'papaparse';

const UploadCard = ({ onUploadSuccess }) => {
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef(null);

  // Restored functionality: Clicking the symbol triggers file selection
  const handleIconClick = () => {
    fileInputRef.current.click();
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setIsUploading(true);

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        let totals = { revenue: 0, profit: 0, salaries: 0, marketing: 0, cloud: 0, rent: 0 };
        const rowCount = results.data.length;

        results.data.forEach(row => {
          totals.revenue += parseFloat(row.Total_Revenue || 0);
          totals.profit += parseFloat(row.Net_Profit || 0);
          totals.salaries += parseFloat(row.Salaries || 0);
          totals.marketing += parseFloat(row.Marketing_Spend || 0);
          totals.cloud += parseFloat(row.Cloud_Server_Costs || 0);
          totals.rent += parseFloat(row.Rent_and_Misc || 0);
        });

        const totalOpEx = totals.salaries + totals.marketing + totals.cloud + totals.rent;
        
        // DYNAMIC LOGIC: Burn rate is avg monthly expense
        const burnRate = rowCount > 0 ? totalOpEx / rowCount : 0;
        
        // DYNAMIC LOGIC: Runway uses last month's revenue baseline
        const lastMonthRevenue = parseFloat(results.data[rowCount - 1]?.Total_Revenue || 0);
        const dynamicCashBalance = lastMonthRevenue * 6; 
        const runway = burnRate > 0 ? (dynamicCashBalance / burnRate).toFixed(1) : "∞";

        localStorage.setItem('analyzed_revenue', totals.revenue);
        localStorage.setItem('analyzed_profit', totals.profit);
        localStorage.setItem('analyzed_opex', totalOpEx);
        localStorage.setItem('burn_rate', burnRate);
        localStorage.setItem('runway', runway);
        localStorage.setItem('expense_breakdown', JSON.stringify({
          Salaries: totals.salaries, Marketing: totals.marketing, Cloud: totals.cloud, Rent: totals.rent
        }));

        onUploadSuccess({ 
          revenue: totals.revenue, 
          opex: totalOpEx, 
          burnRate, 
          runway 
        });

        setIsUploading(false);
      },
      error: () => setIsUploading(false)
    });
  };

  return (
    <div className="flex flex-col items-center justify-center text-center">
      {/* Restored clickable icon functionality */}
      <button 
        onClick={handleIconClick}
        className="w-16 h-16 bg-slate-900 rounded-2xl flex items-center justify-center text-white mb-6 shadow-xl hover:bg-slate-800 transition-all active:scale-95 group"
      >
        <Upload size={28} className={`${isUploading ? "animate-bounce text-cyan-400" : "group-hover:scale-110 transition-transform"}`} />
      </button>

      <h3 className="text-2xl font-black text-slate-900 mb-2">Secure Data Vault</h3>
      <p className="text-slate-500 text-sm mb-8 font-medium">Supports CSV and Excel Business Ledgers</p>
      
      <button 
        onClick={handleIconClick}
        className="w-full bg-[#0f172a] text-white font-bold py-4 rounded-2xl hover:bg-slate-800 transition-all shadow-lg active:scale-95"
      >
        {isUploading ? "Processing AI Pipeline..." : "Select File from Computer"}
      </button>
      
      <input 
        type="file" 
        ref={fileInputRef}
        accept=".csv" 
        className="hidden" 
        onChange={handleFileUpload} 
      />
      
      <div className="mt-8 flex items-center gap-2">
        <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
        <span className="text-[10px] uppercase tracking-[0.2em] font-black text-slate-400">AI Pipeline Ready</span>
      </div>
    </div>
  );
};

export default UploadCard;