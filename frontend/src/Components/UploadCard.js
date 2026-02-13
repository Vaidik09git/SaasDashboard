import React, { useRef, useState } from 'react';
import { Upload } from 'lucide-react';
import Papa from 'papaparse';
import axios from 'axios';

const UploadCard = ({ onUploadSuccess }) => {
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef(null);

  // Simple Linear Regression for Forecasting
  const calculateForecast = (data, key, monthsToPredict = 6) => {
    const n = data.length;
    if (n < 2) return [];
    
    let sumX = 0, sumY = 0, sumXY = 0, sumXX = 0;
    data.forEach((val, i) => {
      sumX += i;
      sumY += val;
      sumXY += i * val;
      sumXX += i * i;
    });

    const slope = (n * sumXY - sumX * sumY) / (n * sumXX - sumX * sumX);
    const intercept = (sumY - slope * sumX) / n;

    const forecast = [];
    for (let i = 1; i <= monthsToPredict; i++) {
      forecast.push(Math.max(0, slope * (n + i - 1) + intercept));
    }
    return forecast;
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setIsUploading(true);

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: async (results) => {
        let totals = { revenue: 0, profit: 0, salaries: 0, marketing: 0, cloud: 0, rent: 0 };
        const rowCount = results.data.length;

        const revHistory = results.data.map(r => parseFloat(r.Total_Revenue || 0));
        const profHistory = results.data.map(r => parseFloat(r.Net_Profit || 0));

        // Generate AI Forecasts
        const revForecast = calculateForecast(revHistory, 'revenue');
        const profForecast = calculateForecast(profHistory, 'profit');
        
        const monthlyTrends = results.data.map((row, index) => ({
          month: row.Month || `Month ${index + 1}`,
          revenue: parseFloat(row.Total_Revenue || 0),
          profit: parseFloat(row.Net_Profit || 0)
        }));

        const forecastData = revForecast.map((val, i) => ({
          month: `P+${i + 1}`,
          revenue: val,
          profit: profForecast[i]
        }));

        results.data.forEach(row => {
          totals.revenue += parseFloat(row.Total_Revenue || 0);
          totals.profit += parseFloat(row.Net_Profit || 0);
          totals.salaries += parseFloat(row.Salaries || 0);
          totals.marketing += parseFloat(row.Marketing_Spend || 0);
          totals.cloud += parseFloat(row.Cloud_Server_Costs || 0);
          totals.rent += parseFloat(row.Rent_and_Misc || 0);
        });

        const totalOpEx = totals.salaries + totals.marketing + totals.cloud + totals.rent;
        const burnRate = rowCount > 0 ? totalOpEx / rowCount : 0;
        const runway = burnRate > 0 ? (totals.revenue * 0.5 / burnRate).toFixed(1) : "0";

        // Persistent Storage Update
        localStorage.setItem('analyzed_revenue', totals.revenue);
        localStorage.setItem('analyzed_profit', totals.profit);
        localStorage.setItem('analyzed_opex', totalOpEx);
        localStorage.setItem('burn_rate', burnRate);
        localStorage.setItem('runway', runway);
        localStorage.setItem('monthly_trends', JSON.stringify(monthlyTrends));
        localStorage.setItem('ai_forecast', JSON.stringify(forecastData)); // NEW
        localStorage.setItem('expense_breakdown', JSON.stringify({
          Salaries: totals.salaries, Marketing: totals.marketing, Cloud: totals.cloud, Rent: totals.rent
        }));

        const user = JSON.parse(localStorage.getItem('user'));
        const projectData = {
          userId: user.id,
          projectName: file.name,
          revenue: totals.revenue,
          profit: totals.profit,
          opex: totalOpEx,
          burnRate: burnRate,
          runway: runway,
          monthlyTrends,
          aiForecast: forecastData, // Save to DB
          expenseBreakdown: { Salaries: totals.salaries, Marketing: totals.marketing, Cloud: totals.cloud, Rent: totals.rent }
        };

        try {
          const token = localStorage.getItem('token');
          await axios.post("http://localhost:5000/api/projects", projectData, {
            headers: { Authorization: `Bearer ${token}` }
          });
        } catch (err) { console.error("Sync error", err); }

        onUploadSuccess(projectData);
        setIsUploading(false);
      }
    });
  };

  return (
    <div className="flex flex-col items-center justify-center text-center">
      <button onClick={() => fileInputRef.current.click()} className="w-16 h-16 bg-slate-900 rounded-2xl flex items-center justify-center text-white mb-6 shadow-xl hover:bg-slate-800 transition-all active:scale-95 group">
        <Upload size={28} className={isUploading ? "animate-bounce text-cyan-400" : "group-hover:scale-110 transition-transform"} />
      </button>
      <h3 className="text-2xl font-black text-slate-900 mb-2">Secure Data Vault</h3>
      <button onClick={() => fileInputRef.current.click()} className="w-full bg-[#0f172a] text-white font-bold py-4 rounded-2xl hover:bg-slate-800 transition-all shadow-lg active:scale-95">
        {isUploading ? "Processing AI Pipeline..." : "Select File from Computer"}
      </button>
      <input type="file" ref={fileInputRef} accept=".csv" className="hidden" onChange={handleFileUpload} />
    </div>
  );
};

export default UploadCard;