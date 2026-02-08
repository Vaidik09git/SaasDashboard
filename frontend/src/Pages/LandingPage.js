import Navbar from "../Components/Navbar.js";
import UploadCard from "../Components/UploadCard.js";

function LandingPage() {
  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-blue-500/30 overflow-hidden">
      <Navbar />

      <main className="max-w-4xl mx-auto pt-24 pb-12 px-4 flex flex-col items-center relative">
        {/* Ambient Background Glow - This makes the card visible on black */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="text-center mb-12 relative z-10">
          <h1 className="text-6xl font-extrabold tracking-tighter mb-4 bg-gradient-to-b from-white to-zinc-500 bg-clip-text text-transparent">
            Upload your data
          </h1>
          <p className="text-zinc-500 text-lg max-w-md mx-auto leading-relaxed">
            Instantly turn your business documents into interactive AI dashboards.
          </p>
        </div>

        {/* Elevated Glassmorphic Card */}
        <div className="w-full max-w-md relative group z-10">
          {/* Subtle Outer Glow on Hover */}
          <div className="absolute -inset-px bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-[2.5rem] blur-sm opacity-0 group-hover:opacity-100 transition duration-500" />
          
          {/* The Card Body */}
          <div className="relative bg-zinc-900/40 border border-white/10 p-10 rounded-[2.5rem] backdrop-blur-2xl shadow-2xl">
            <UploadCard
              title="Secure Upload"
              description="Supports CSV, Excel, Word, and PDF"
              accept=".csv, .xls, .xlsx, .doc, .docx, .pdf"
            />
            
            {/* Minimalist Footer Detail */}
            <div className="mt-8 pt-6 border-t border-white/5 flex items-center justify-center gap-2">
              <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse" />
              <span className="text-[10px] uppercase tracking-[0.2em] text-zinc-500 font-bold">
                AI Pipeline Ready
              </span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default LandingPage;