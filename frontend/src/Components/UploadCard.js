import React, { useRef } from 'react';
import { Upload } from 'lucide-react';

function UploadCard({ title, description, accept }) {
  const fileInputRef = useRef(null);

  const handleTriggerClick = (e) => {
    e.stopPropagation();
    fileInputRef.current.click();
  };

  return (
    <div className="flex flex-col items-center">
      <input type="file" ref={fileInputRef} accept={accept} className="hidden" />

      {/* Trigger: Symbol with Color-Shift Hover */}
      <div 
        onClick={handleTriggerClick}
        className="bg-slate-900 p-5 rounded-full mb-6 cursor-pointer group-hover:bg-cyan-600 transition-all duration-300 shadow-xl group-hover:scale-110"
      >
        <Upload size={32} className="text-white transition-colors" />
      </div>

      <h3 className="text-slate-900 text-2xl font-black mb-2 tracking-tight">
        {title || "Secure Data Vault"}
      </h3>
      
      <p className="text-slate-500 text-sm mb-8 text-center px-4 font-medium">
        {description || "Supports CSV, Excel, Word, and PDF"}
      </p>

      {/* Trigger: Button with Gradient Hover */}
      <button 
        onClick={handleTriggerClick}
        className="w-full py-4 px-8 bg-slate-900 text-white font-bold rounded-2xl hover:bg-gradient-to-r hover:from-cyan-600 hover:to-emerald-600 transition-all duration-500 active:scale-95 shadow-lg"
      >
        Select File from Computer
      </button>
      
      <div className="w-full mt-8 pt-6 border-t border-slate-200 flex items-center justify-center gap-2">
        <div className="w-2 h-2 bg-cyan-500 rounded-full animate-pulse" />
        <span className="text-[10px] uppercase tracking-[0.3em] text-slate-400 font-black">
          AI Pipeline Ready
        </span>
      </div>
    </div>
  );
}

export default UploadCard;