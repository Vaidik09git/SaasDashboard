import React, { useRef } from 'react';
import { Upload } from 'lucide-react';

function UploadCard({ title, description, accept }) {
  const fileInputRef = useRef(null);

  const handleTriggerClick = (e) => {
    e.stopPropagation();
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      console.log("Selected file:", file.name);
    }
  };

  return (
    <div className="flex flex-col items-center w-full">
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept={accept}
        className="hidden"
      />

      {/* Trigger: Icon */}
      <div 
        onClick={handleTriggerClick}
        className="bg-white p-4 rounded-full mb-6 cursor-pointer hover:scale-110 transition-transform shadow-xl"
      >
        <Upload size={32} className="text-blue-600" />
      </div>

      <h3 className="text-white text-xl font-bold mb-2 tracking-tight">
        {title || "Secure Upload"}
      </h3>
      
      <p className="text-zinc-500 text-sm mb-8 text-center px-4">
        {description || "Supports CSV, Excel, Word, and PDF"}
      </p>

      {/* Trigger: Button */}
      <button 
        onClick={handleTriggerClick}
        className="w-full py-3 px-6 bg-white text-black font-bold rounded-xl hover:bg-zinc-200 transition-colors active:scale-95"
      >
        Select File from Computer
      </button>

      {/* Internal Component Footer */}
      <div className="w-full mt-8 pt-6 border-t border-white/5 flex items-center justify-center gap-2">
        <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse" />
        <span className="text-[10px] uppercase tracking-[0.2em] text-zinc-500 font-bold">
          AI Pipeline Ready
        </span>
      </div>
    </div>
  );
}

export default UploadCard;